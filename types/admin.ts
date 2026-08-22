import { Timestamp } from "firebase/firestore";
import { CloudinaryImage } from "./image";

export type AdminRole = "super_admin" | "moderator" | "viewer" | "editor";

export interface AdminPermissions {
  canManageReservations: boolean;
  canManageEvents: boolean;
  canManageUsers: boolean;
  canUploadImages: boolean;
  canViewStatistics: boolean;
  canManageAdmins?: boolean;
  canDeleteContent?: boolean;
}

export interface Admin {
  id: string; // Firebase UID
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  permissions: AdminPermissions;
  profileImage?: CloudinaryImage;

  createdAt: Timestamp;
  lastLogin: Timestamp;
  isActive: boolean;
  lastActivity?: Timestamp;

  phone?: string;
  notes?: string;
}

export interface CreateAdminDTO {
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  permissions: AdminPermissions;
}

export interface UpdateAdminDTO {
  firstName?: string;
  lastName?: string;
  role?: AdminRole;
  permissions?: Partial<AdminPermissions>;
  isActive?: boolean;
  notes?: string;
}

export interface AdminLog {
  id: string;
  adminId: string;
  action: string;
  resource: string;
  resourceId: string;
  changes?: Record<string, any>;
  timestamp: Timestamp;
  ipAddress?: string;
}

export interface ActivityLog {
  id: string;
  type: "reservation" | "event" | "admin" | "image" | "system";
  action: "create" | "update" | "delete" | "publish" | "login" | "logout";
  userId?: string;
  metadata?: Record<string, any>;
  timestamp: Timestamp;
}
