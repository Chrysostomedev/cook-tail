// components/cards/ParticipantCard.tsx
"use client";

import React from "react";
import { User, Phone, Ticket, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <div className="bg-[#F4EBD9] border-2 border-[#0B1B33] p-4 rounded-xs shadow-[4px_4px_0px_0px_#0B1B33] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-[#0B1B33] text-base">{name}</span>
          <span
            className={cn(
              "text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-xs border border-black",
              status === "checked_in" && "bg-[#8FBC8F] text-[#0B1B33]",
              status === "confirmed" && "bg-[#FEF08A] text-[#0B1B33]",
              status === "pending" && "bg-gray-300 text-gray-700"
            )}
          >
            {status === "checked_in" ? "Présent" : status === "confirmed" ? "Validé" : "En attente"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-700">
          <span className="flex items-center gap-1 font-bold text-[#556B2F]">
            <Ticket className="w-3.5 h-3.5" /> {reference}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" /> {phone}
          </span>
          <span className="bg-[#0B1B33] text-white px-1.5 py-0.5 rounded-xs font-bold">
            {guestsCount} pers.
          </span>
        </div>
      </div>

      {status !== "checked_in" && onCheckIn && (
        <button
          onClick={onCheckIn}
          className="w-full sm:w-auto bg-[#556B2F] text-white font-black text-xs px-4 py-2 rounded-xs border-2 border-black shadow-[2px_2px_0px_0px_#0B1B33] hover:translate-x-0.5 flex items-center justify-center gap-1.5 uppercase"
        >
          <CheckCircle className="w-4 h-4" /> Valider l'entrée
        </button>
      )}
    </div>
  );
};