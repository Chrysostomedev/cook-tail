export const ADMIN_ROLES = {
  SUPER_ADMIN: "super_admin",
  MODERATOR: "moderator",
  VIEWER: "viewer",
} as const;

export const DIETARY_RESTRICTIONS = [
  "végétarien",
  "végétalien",
  "sans gluten",
  "sans lactose",
  "hallal",
  "kasher",
] as const;

export const MENU_CATEGORIES = [
  "cocktail",
  "food",
  "dessert",
] as const;

export const IMAGE_CATEGORIES = [
  "event",
  "menu",
  "testimonial",
  "general",
] as const;

export const PRICE_RESERVATION = 15000; // F CFA
