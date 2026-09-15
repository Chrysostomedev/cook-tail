// data/index.ts
import { PROGRAMME_DATA } from "./programme";

export const MOCK_PARTICIPANTS = [
  { id: "1", name: "Lorraine Ade", ref: "BR-2026-0012", status: "confirmed", guests: 2 },
  { id: "2", name: "Marc-Arthur Yao", ref: "BR-2026-0045", status: "checked_in", guests: 1 },
  { id: "3", name: "Sarah Bamba", ref: "BR-2026-0089", status: "pending", guests: 3 },
];

export const MOCK_STATS = {
  totalRevenue: 270000,
  reservedSpots: 27,
  remainingSpots: 3,
  checkedInCount: 14,
};

export { PROGRAMME_DATA };