// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatCFA(amount: number): string {
  return new Intl.NumberFormat("fr-CI", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("XOF", "FCFA");
}

export function generateReference(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `BR-2026-${randomDigits}`;
}

export function truncateText(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.substring(0, length)}...`;
}