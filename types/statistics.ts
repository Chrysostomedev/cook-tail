import { Timestamp } from "firebase/firestore";

export interface DailyStats {
  date: string;
  reservations: number;
  revenue: number;
  avgGroupSize: number;
  newClients: number;
  confirmationRate: number;
}

export interface WeeklyStats {
  week: number;
  year: number;
  reservations: number;
  revenue: number;
  avgGroupSize: number;
}

export interface MonthlyStats {
  month: string; // "YYYY-MM"
  reservations: number;
  revenue: number;
  avgGroupSize: number;
  conversionRate: number;
  topDayOfWeek?: string;
}

export interface RevenueStats {
  totalRevenue: number;
  averageOrderValue: number;
  revenue30Days: number;
  revenue90Days: number;
  revenue365Days: number;
}

export interface ConversionStats {
  totalVisits: number;
  totalReservations: number;
  conversionRate: number;
  visitsToReservation: number; // Average visits per reservation
}

export interface Statistics {
  id: "stats_aggregated";

  // Totals
  totalReservations: number;
  totalRevenue: number;
  totalAttendees: number;
  totalEvents: number;

  // Averages
  avgGroupSize: number;
  avgRevenuePerReservation: number;

  // Rates
  confirmationRate: number;
  cancellationRate: number;
  conversionRate: number;

  // Time series
  daily: DailyStats[];
  weekly: WeeklyStats[];
  monthly: MonthlyStats[];

  // Peak times
  peakHour?: string;
  peakDayOfWeek?: string;
  peakMonth?: string;

  lastUpdated: Timestamp;
  lastCalculated?: Timestamp;
}

export interface StatisticsFilters {
  startDate?: Date;
  endDate?: Date;
  status?: string;
  paymentStatus?: string;
  source?: string;
  groupSizeMin?: number;
  groupSizeMax?: number;
}

export interface TopMetrics {
  topCountry: { country: string; count: number };
  topGroupSize: number;
  topReservationDay: string;
  topSource: string;
}

export interface RevenueBreakdown {
  byMonth: Record<string, number>;
  byPaymentMethod: Record<string, number>;
  bySource: Record<string, number>;
  total: number;
}
