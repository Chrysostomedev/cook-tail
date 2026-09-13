// components/cards/ParticipantCard.tsx
"use client";

import React from "react";
import { User, Phone, Ticket, CheckCircle, XCircle } from "lucide-react";

interface ParticipantCardProps {
  name: string;
  reference: string;
  phone: string;
  guestsCount: number;
  // "pending"   = en attente de check-in (peut encore être validé ou refusé)
  // "checked_in"= déjà validé à l'entrée (état final, aucun bouton)
  // "cancelled" = refusé (état final, aucun bouton)
  status: "pending" | "checked_in" | "cancelled";
  paymentStatus?: "paid" | "unpaid";
  onCheckIn?: () => void;
  onReject?: () => void;
}

export const ParticipantCard: React.FC<ParticipantCardProps> = ({
  name,
  reference,
  phone,
  guestsCount,
  status,
  paymentStatus = "paid",
  onCheckIn,
  onReject,
}) => {
  const statusColors = {
    checked_in: { bg: "var(--theme-secondary)", text: "white" },
    cancelled: { bg: "var(--theme-danger)", text: "white" },
    pending: { bg: "var(--theme-borderColor)", text: "black" },
  };

  const statusLabels = {
    checked_in: "Présent",
    cancelled: "Refusé",
    pending: "En attente",
  };

  const currentStatus = statusColors[status];
  // Seul un statut "pending" peut encore recevoir une action.
  const isActionable = status === "pending";

  return (
    <div style={{
      backgroundColor: "var(--theme-bgPrimary)",
      borderWidth: "2px",
      borderColor: "var(--theme-borderColor)",
      padding: "1rem",
      borderRadius: "8px",
      boxShadow: "var(--shadow-retro-md)",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "1rem",
      flexWrap: "wrap",
      opacity: status === "cancelled" ? 0.6 : 1,
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontWeight: 800, color: "var(--theme-textPrimary)", fontSize: "1rem" }}>
            {name}
          </span>
          <span style={{
            fontSize: "0.625rem",
            fontFamily: "var(--ff-space-mono)",
            fontWeight: 700,
            textTransform: "uppercase",
            padding: "0.25rem 0.5rem",
            borderRadius: "8px",
            border: "1px solid var(--theme-borderColor)",
            backgroundColor: currentStatus.bg,
            color: currentStatus.text
          }}>
            {statusLabels[status]}
          </span>

          {paymentStatus === "unpaid" && (
            <span style={{
              fontSize: "0.625rem",
              fontFamily: "var(--ff-space-mono)",
              fontWeight: 700,
              textTransform: "uppercase",
              padding: "0.25rem 0.5rem",
              borderRadius: "8px",
              border: "1px solid #f59e0b",
              backgroundColor: "#fef3c7",
              color: "#92400e"
            }}>
              Paiement non vérifié
            </span>
          )}
        </div>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.75rem",
          fontSize: "0.75rem",
          fontFamily: "var(--ff-space-mono)",
          color: "var(--theme-textSecondary)"
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontWeight: 700, color: "var(--theme-primary)" }}>
            <Ticket className="w-3.5 h-3.5" /> {reference}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <Phone className="w-3.5 h-3.5" /> {phone}
          </span>
          <span style={{
            backgroundColor: "var(--theme-primary)",
            color: "white",
            padding: "0.25rem 0.375rem",
            borderRadius: "8px",
            fontWeight: 700
          }}>
            {guestsCount} pers.
          </span>
        </div>
      </div>

      {isActionable && (onCheckIn || onReject) && (
        <div className="flex gap-2">
          {onReject && (
            <button
              onClick={onReject}
              style={{ backgroundColor: "var(--theme-danger)", color: "white", fontWeight: 900, fontSize: "0.75rem", padding: "0.5rem 1rem", borderRadius: "8px", border: "2px solid var(--theme-borderColor)", display: "flex", alignItems: "center", gap: "0.375rem", cursor: "pointer" }}
            >
              <XCircle className="w-4 h-4" /> Refuser
            </button>
          )}
          {onCheckIn && (
            <button
              onClick={onCheckIn}
              disabled={paymentStatus === "unpaid"}
              title={paymentStatus === "unpaid" ? "Paiement non vérifié — confirmez le paiement Wave avant le check-in" : undefined}
              style={{
                backgroundColor: paymentStatus === "unpaid" ? "var(--theme-borderColor)" : "var(--theme-secondary)",
                color: paymentStatus === "unpaid" ? "var(--theme-textSecondary)" : "white",
                fontWeight: 900,
                fontSize: "0.75rem",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                border: "2px solid var(--theme-borderColor)",
                boxShadow: paymentStatus === "unpaid" ? "none" : "var(--shadow-retro-md)",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.375rem",
                cursor: paymentStatus === "unpaid" ? "not-allowed" : "pointer",
                transition: "all 200ms ease-out"
              }}
              onMouseEnter={(e) => {
                if (paymentStatus === "unpaid") return;
                e.currentTarget.style.transform = "translate(2px, 2px)";
                e.currentTarget.style.boxShadow = "var(--shadow-retro-sm)";
              }}
              onMouseLeave={(e) => {
                if (paymentStatus === "unpaid") return;
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "var(--shadow-retro-md)";
              }}
            >
              <CheckCircle className="w-4 h-4" /> Valider
            </button>
          )}
        </div>
      )}
    </div>
  );
};