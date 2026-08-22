// lib/utils/excelExport.ts
// Excel export utilities for admin tables

/**
 * Convert data to CSV format (Excel compatible)
 */
export const convertToCSV = (data: any[], headers: string[]): string => {
  // Create header row
  const headerRow = headers.map((h) => `"${h}"`).join(",");

  // Create data rows
  const dataRows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header];
        // Handle commas, quotes, newlines
        if (value === null || value === undefined) {
          return '""';
        }
        const stringValue = String(value)
          .replace(/"/g, '""')
          .replace(/\n/g, " ");
        return `"${stringValue}"`;
      })
      .join(",")
  );

  return [headerRow, ...dataRows].join("\n");
};

/**
 * Download CSV file
 */
export const downloadCSV = (
  data: any[],
  headers: string[],
  filename: string
): void => {
  const csv = convertToCSV(data, headers);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export reservations table
 */
export const exportReservations = (reservations: any[]): void => {
  const headers = [
    "Date",
    "Nom",
    "Téléphone",
    "Nombre de Personnes",
    "Prix",
    "Statut",
    "Référence",
  ];

  const data = reservations.map((r) => ({
    Date: new Date(r.createdAt).toLocaleDateString("fr-FR"),
    Nom: r.userName,
    Téléphone: r.userPhone || "N/A",
    "Nombre de Personnes": r.guestCount,
    Prix: `${r.totalPrice?.toLocaleString("fr-FR")} FCFA`,
    Statut: r.status,
    Référence: r.reference,
  }));

  downloadCSV(data, headers, "reservations");
};

/**
 * Export participants table
 */
export const exportParticipants = (participants: any[]): void => {
  const headers = ["Nom", "Téléphone", "Accompagnants", "Statut", "Référence", "Date"];

  const data = participants.map((p) => ({
    Nom: p.name,
    Téléphone: p.phone || "N/A",
    Accompagnants: p.guestCount,
    Statut: p.status,
    Référence: p.reference,
    Date: new Date(p.createdAt).toLocaleDateString("fr-FR"),
  }));

  downloadCSV(data, headers, "participants");
};

/**
 * Export games with user selections
 */
export const exportGamePreferences = (preferences: any[]): void => {
  const headers = ["Jeu", "Utilisateur", "Niveau d'Intérêt", "Date"];

  const data = preferences.map((p) => ({
    Jeu: p.gameName,
    Utilisateur: p.userName,
    "Niveau d'Intérêt": p.preferenceLevel,
    Date: new Date(p.selectedAt).toLocaleDateString("fr-FR"),
  }));

  downloadCSV(data, headers, "preferences_jeux");
};

/**
 * Export statistics
 */
export const exportStatistics = (stats: any): void => {
  const data = [
    { Métrique: "Total Recouvré", Valeur: `${stats.totalRevenue} FCFA` },
    { Métrique: "Réservations", Valeur: stats.totalReservations },
    { Métrique: "Présents", Valeur: stats.checkedInCount },
    { Métrique: "Places Restantes", Valeur: stats.remainingSpots },
    { Métrique: "Taux de Remplissage", Valeur: `${stats.occupancyRate}%` },
  ];

  const headers = ["Métrique", "Valeur"];
  downloadCSV(data, headers, "statistiques");
};

/**
 * Create XLSX file (requires external library, returns structure for future use)
 * For now, CSV is sufficient
 */
export interface ExcelExportOptions {
  filename: string;
  sheetName?: string;
  headers: string[];
  data: any[];
}

/**
 * Export data as table format
 */
export const createTableExport = (options: ExcelExportOptions): void => {
  downloadCSV(options.data, options.headers, options.filename);
};
