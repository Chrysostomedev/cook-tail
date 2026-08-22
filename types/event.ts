import { Timestamp } from "firebase/firestore";
import { CloudinaryImage } from "./image";

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
  icon?: string;
  category?: string;
}

export interface MenuItemEvent {
  id: string;
  name: string;
  description: string;
  price?: number;
  category: "cocktail" | "food" | "dessert" | "drink";
  image?: CloudinaryImage;
  tags?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Timestamp;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  currentAttendees: number;
  status: "draft" | "published" | "archived" | "cancelled";

  coverImage?: CloudinaryImage;
  gallery: CloudinaryImage[];

  agenda: AgendaItem[];
  menu: MenuItemEvent[];
  rules: string;
  services: string[];

  createdBy: string;
  updatedAt: Timestamp;
  createdAt: Timestamp;
  publishedAt?: Timestamp;

  tags?: string[];
  notes?: string;
}

export interface CreateEventDTO {
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  rules?: string;
  services?: string[];
  agenda?: AgendaItem[];
  menu?: MenuItemEvent[];
}

export interface UpdateEventDTO {
  title?: string;
  description?: string;
  date?: Date;
  startTime?: string;
  endTime?: string;
  location?: string;
  capacity?: number;
  status?: Event["status"];
  rules?: string;
  agenda?: AgendaItem[];
  menu?: MenuItemEvent[];
  notes?: string;
}
