// components/layout/Footer.tsx
"use client";

import React from "react";
import { Phone, MapPin, Heart } from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";

export const Footer: React.FC = () => {
  return (
    <footer style={{
      width: "100%",
      paddingTop: "3rem",
      paddingBottom: "2rem",
      backgroundColor: "var(--theme-bgSecondary)",
      borderTopWidth: "1px",
      borderTopColor: "var(--theme-borderColor)"
    }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1rem" }}>

        {/* Carte Principale */}
        <div style={{
          backgroundColor: "var(--theme-primary)",
          color: "white",
          borderRadius: "1.5rem",
          padding: "2rem",
          boxShadow: "var(--shadow-soft-lg)",
          border: "1px solid var(--theme-borderColor)",
          position: "relative",
          overflow: "hidden"
        }}>

          {/* Halo lumineux */}
          <div style={{
            position: "absolute",
            top: "-6rem",
            right: "-6rem",
            width: "16rem",
            height: "16rem",
            backgroundColor: "var(--theme-secondary)",
            borderRadius: "9999px",
            opacity: 0.1,
            filter: "blur(3rem)",
            pointerEvents: "none"
          }} />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            position: "relative",
            zIndex: 10
          }}>

            {/* Marque & Description */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                padding: "0.25rem 0.75rem",
                borderRadius: "9999px",
                color: "white",
                fontSize: "0.625rem",
                fontFamily: "var(--ff-space-mono)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                width: "fit-content"
              }}>
                <span>Brunch Récréation</span>
              </div>
              <h4 style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                letterSpacing: "-0.02em"
              }}>
                COOK'TAIL <span style={{ fontFamily: "var(--ff-fraunces)", fontStyle: "italic", fontWeight: 400 }}>Service</span>
              </h4>
              <p style={{
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: 1.5,
                fontFamily: "var(--ff-fraunces)",
                fontStyle: "italic",
                maxWidth: "20rem"
              }}>
                Une expérience immersive dédiée aux souvenirs d'enfance et aux retrouvailles des années collèges & lycées à Abidjan.
              </p>
            </div>

            {/* Contacts */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <h5 style={{
                fontFamily: "var(--ff-space-mono)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--theme-secondary)",
                letterSpacing: "0.05em"
              }}>
                Assistance & Réservations
              </h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a
                  href={`https://wa.me/${EVENT_INFO.whatsapp.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "0.625rem 0.875rem",
                    borderRadius: "0.75rem",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "white",
                    transition: "all 200ms",
                    textDecoration: "none",
                    width: "fit-content"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  <Phone className="w-4 h-4" style={{ color: "var(--theme-secondary)" }} />
                  <span>WhatsApp : {EVENT_INFO.whatsapp}</span>
                </a>
              </div>
            </div>

            {/* Lieu */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <h5 style={{
                fontFamily: "var(--ff-space-mono)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--theme-secondary)",
                letterSpacing: "0.05em"
              }}>
                Lieu & Rentrée
              </h5>
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.625rem",
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: 1.4
              }}>
                <MapPin className="w-4 h-4" style={{ color: "var(--theme-secondary)", marginTop: "0.125rem", flexShrink: 0 }} />
                <span>
                  {EVENT_INFO.location}
                  <strong style={{ display: "block", color: "white", fontWeight: 600, marginTop: "0.25rem" }}>
                    Côte d'Ivoire, Abidjan
                  </strong>
                </span>
              </div>
            </div>

          </div>

          {/* Ligne de séparation */}
          <div style={{
            marginTop: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            fontSize: "0.6875rem",
            fontFamily: "var(--ff-space-mono)",
            color: "rgba(255, 255, 255, 0.6)",
            position: "relative",
            zIndex: 10
          }}>
            <p>© 2026 Cook'Tail Service. Tous droits réservés.</p>
          </div>

        </div>

      </div>
    </footer>
  );
};