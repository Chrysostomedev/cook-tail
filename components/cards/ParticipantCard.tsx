// components/cards/ParticipantCard.tsx
"use client";

import React from "react";
import { User, Phone, Ticket, CheckCircle, Clock } from "lucide-react";

interface ParticipantCardProps {
  name: string;
  reference: string;
  phone: string;
  guestsCount: number;
  status: "pending" | "confirmed" | "checked_in";
  onCheckIn?: () => void;
}

export const ParticipantCard: React.FC<ParticipantCardProps> = ({
  name,
  reference,
  phone,
  guestsCount,
  status,
  onCheckIn,
}) => {
  const statusColors = {
    checked_in: { bg: "var(--theme-secondary)", text: "white" },
    confirmed: { bg: "var(--theme-accent)", text: "black" },
    pending: { bg: "var(--theme-borderColor)", text: "black" }
  };

  const currentStatus = statusColors[status];

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
      flexWrap: "wrap"
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
            {status === "checked_in" ? "Présent" : status === "confirmed" ? "Validé" : "En attente"}
          </span>
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

      {status !== "checked_in" && onCheckIn && (
        <button
          onClick={onCheckIn}
          style={{
            backgroundColor: "var(--theme-secondary)",
            color: "white",
            fontWeight: 900,
            fontSize: "0.75rem",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "2px solid var(--theme-borderColor)",
            boxShadow: "var(--shadow-retro-md)",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.375rem",
            cursor: "pointer",
            transition: "all 200ms ease-out"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translate(2px, 2px)";
            e.currentTarget.style.boxShadow = "var(--shadow-retro-sm)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translate(0, 0)";
            e.currentTarget.style.boxShadow = "var(--shadow-retro-md)";
          }}
        >
          <CheckCircle className="w-4 h-4" /> Valider
        </button>
      )}
    </div>
  );
};