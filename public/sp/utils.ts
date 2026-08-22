// Public utilities - placeholder for future Firebase integration

export async function generateQRCode(text: string): Promise<string> {
  // TODO: Implement with qrcode library after Firebase setup
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString("fr-FR")} F CFA`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  return `${hours}h${minutes}`;
}
