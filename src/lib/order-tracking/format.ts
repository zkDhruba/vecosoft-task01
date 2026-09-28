import type { DeliveryWindow, IsoDateTime, Money } from "./types";

const currencyFormatterCache = new Map<string, Intl.NumberFormat>();

function getCurrencyFormatter(currency: string): Intl.NumberFormat {
  const cached = currencyFormatterCache.get(currency);
  if (cached) return cached;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  currencyFormatterCache.set(currency, formatter);
  return formatter;
}

export function formatMoney(money: Money): string {
  return getCurrencyFormatter(money.currency).format(money.amount);
}

export function formatDateTime(value: IsoDateTime): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatDayLabel(value: IsoDateTime, now = new Date()): string {
  const date = new Date(value);
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTarget = new Date(date);
  startOfTarget.setHours(0, 0, 0, 0);

  const dayDiff = Math.round(
    (startOfTarget.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (dayDiff === 0) return "Today";
  if (dayDiff === 1) return "Tomorrow";
  if (dayDiff === -1) return "Yesterday";

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatTime(value: IsoDateTime): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

/** Human ETA copy for the status hero, e.g. "Arrives today · 5:00–7:00 PM". */
export function formatDeliveryEta(
  window: DeliveryWindow,
  options?: { prefix?: string; now?: Date },
): string {
  const prefix = options?.prefix ?? "Arrives";
  const now = options?.now ?? new Date();
  const day = formatDayLabel(window.end, now).toLowerCase();
  const startTime = formatTime(window.start);
  const endTime = formatTime(window.end);

  return `${prefix} ${day} · ${startTime}–${endTime}`;
}

export function sumMoney(amounts: Money[]): Money {
  if (amounts.length === 0) {
    return { amount: 0, currency: "USD" };
  }

  const currency = amounts[0].currency;
  const total = amounts.reduce((sum, item) => {
    if (item.currency !== currency) {
      throw new Error("Cannot sum Money values with mixed currencies");
    }
    return sum + item.amount;
  }, 0);

  return { amount: total, currency };
}
