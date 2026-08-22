// types/game.ts
// Game types for Ivoirian traditional games

export interface GameImage {
  url: string;
  cloudinaryId: string;
  thumb: string;
}

export interface Game {
  id: string;
  name: string; // Ex: "Marel", "Bille", "Dame"
  description: string;
  rules: string;
  image: GameImage;
  category: "traditional" | "board" | "card" | "outdoor";
  minPlayers: number;
  maxPlayers: number;
  difficulty: "easy" | "medium" | "hard";
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // Admin ID
  isActive: boolean;
}

export interface CreateGameDTO {
  name: string;
  description: string;
  rules: string;
  category: "traditional" | "board" | "card" | "outdoor";
  minPlayers: number;
  maxPlayers: number;
  difficulty: "easy" | "medium" | "hard";
  imageUrl?: string; // Cloudinary URL
}

export interface UpdateGameDTO {
  name?: string;
  description?: string;
  rules?: string;
  category?: "traditional" | "board" | "card" | "outdoor";
  minPlayers?: number;
  maxPlayers?: number;
  difficulty?: "easy" | "medium" | "hard";
  isActive?: boolean;
}

export interface UserGamePreference {
  id: string;
  userId: string;
  gameId: string;
  gameName: string;
  selectedAt: Date;
  preferenceLevel: "interested" | "very_interested" | "must_play";
}

export interface CreateUserGamePreferenceDTO {
  gameId: string;
  preferenceLevel: "interested" | "very_interested" | "must_play";
}
