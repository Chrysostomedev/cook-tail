// components/cards/ServiceCard.tsx
"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, badge }) => {
  return (
    <div className="bg-[#F4EBD9] border-2 border-[#0B1B33] p-5 rounded-xs shadow-[4px_4px_0px_0px_#0B1B33] space-y-3">
      {badge && (
        <span className="bg-[#FEF08A] text-[#0B1B33] font-mono font-bold text-[9px] uppercase px-2 py-0.5 border border-black">
          {badge}
        </span>
      )}
      <div className="w-10 h-10 bg-[#0B1B33] text-white border border-black rounded-xs flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#FEF08A]" />
      </div>
      <h4 className="font-extrabold text-sm uppercase text-[#0B1B33]">{title}</h4>
      <p className="text-xs font-mono text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
};