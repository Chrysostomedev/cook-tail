"use client";

import React, { useState } from "react";
import {
  Phone,
  MapPin,
  LucideGalleryHorizontalEnd,
  Wallet,
} from "lucide-react";

import { EVENT_INFO } from "@/lib/constants";
import { useVisibility } from "@/context/VisibilityContext";
import type { FooterContent } from "@/lib/content";
import { useContent } from "@/context/ContentContext"; // ajouter cet import


export const Footer: React.FC = () => {
  const [showVisibilityTools, setShowVisibilityTools] = useState(false);
  const { content } = useContent();
  const footer = content.footer; // ← remplace TOUT le const footer = { ... } codé en dur

  let visibilityContext: any = null;
  try {
    visibilityContext = useVisibility();
  } catch {
    // Context not available
  }
  const whatsappUrl = `https://wa.me/${footer.whatsappNumber.replace(
    /\s+/g,
    ""
  )}`;

  const instagramUrl = `https://instagram.com/${footer.instagramHandle.replace(
    /^@/,
    ""
  )}`;

  return (
    <footer
      style={{
        width: "100%",
        paddingTop: "3rem",
        paddingBottom: "2rem",
        backgroundColor: "var(--theme-bgSecondary)",
        borderTopWidth: "1px",
        borderTopColor: "var(--theme-borderColor)",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        {/* Carte principale */}
        <div
          style={{
            backgroundColor: "var(--theme-primary)",
            color: "white",
            borderRadius: "1.5rem",
            padding: "2rem",
            boxShadow: "var(--shadow-soft-lg)",
            border: "1px solid var(--theme-borderColor)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Halo lumineux */}
          <div
            style={{
              position: "absolute",
              top: "-6rem",
              right: "-6rem",
              width: "16rem",
              height: "16rem",
              backgroundColor: "var(--theme-secondary)",
              borderRadius: "9999px",
              opacity: 0.1,
              filter: "blur(3rem)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
              position: "relative",
              zIndex: 10,
            }}
          >
            {/* Marque & Description */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
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
                  width: "fit-content",
                }}
              >
                <span>{footer.badge}</span>
              </div>

             <h4 style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
  {`${footer.brandName} `}
  <span style={{ fontFamily: "var(--ff-fraunces)", fontStyle: "italic", fontWeight: 400 }}>
    {footer.brandSuffix}
  </span>
</h4>

              <p
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 1.5,
                  fontFamily: "var(--ff-fraunces)",
                  fontStyle: "italic",
                  maxWidth: "20rem",
                }}
              >
                {footer.description}
              </p>
            </div>

            {/* Contacts */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <h5
                style={{
                  fontFamily: "var(--ff-space-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--theme-secondary)",
                  letterSpacing: "0.05em",
                }}
              >
                {footer.contactsTitle}
              </h5>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <a
                  href={whatsappUrl}
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
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  <Phone
                    className="w-4 h-4"
                    style={{ color: "var(--theme-secondary)" }}
                  />

                  <span>
                    WhatsApp : {footer.whatsappNumber}
                  </span>
                </a>
              </div>
            </div>

            {/* Lieu */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <h5
                style={{
                  fontFamily: "var(--ff-space-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--theme-secondary)",
                  letterSpacing: "0.05em",
                }}
              >
                {footer.locationTitle}
              </h5>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.625rem",
                  fontSize: "0.75rem",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 1.4,
                }}
              >
                <MapPin
                  className="w-4 h-4"
                  style={{
                    color: "var(--theme-secondary)",
                    marginTop: "0.125rem",
                    flexShrink: 0,
                  }}
                />

                <span>
                  {footer.locationText}

                  <strong
                    style={{
                      display: "block",
                      color: "white",
                      fontWeight: 600,
                      marginTop: "0.25rem",
                    }}
                  >
                    {footer.locationCity}
                  </strong>

                  <p
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.6875rem",
                      color: "var(--theme-secondary)",
                      fontFamily: "var(--ff-space-mono)",
                      fontWeight: 700,
                    }}
                  >
                    {footer.eventDate}
                  </p>
                </span>
              </div>
            </div>

            {/* Réseaux & Paiement */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <h5
                style={{
                  fontFamily: "var(--ff-space-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--theme-secondary)",
                  letterSpacing: "0.05em",
                }}
              >
                {footer.socialTitle}
              </h5>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <a
                  href={instagramUrl}
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
                    textDecoration: "none",
                    width: "fit-content",
                  }}
                >
                  <LucideGalleryHorizontalEnd
                    className="w-4 h-4"
                    style={{ color: "var(--theme-secondary)" }}
                  />

                  <span>{footer.instagramHandle}</span>
                </a>

                {footer.waveNumber && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.625rem",
                      fontSize: "0.75rem",
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: 1.4,
                    }}
                  >
                    <Wallet
                      className="w-4 h-4"
                      style={{
                        color: "var(--theme-secondary)",
                        marginTop: "0.125rem",
                        flexShrink: 0,
                      }}
                    />

                    <span>
                      Wave : {footer.waveNumber}

                      {footer.waveDisplayName && (
                        <strong
                          style={{
                            display: "block",
                            color: "white",
                            fontWeight: 600,
                            marginTop: "0.25rem",
                          }}
                        >
                          {footer.waveDisplayName}
                        </strong>
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ligne de séparation */}
          <div
            style={{
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
              zIndex: 10,
            }}
          >
            <p>{footer.copyright}</p>
          </div>

          {/* Visibility Tools */}
          {false && visibilityContext && (
            <div
              style={{
                marginTop: "1rem",
                paddingTop: "1rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                position: "relative",
                zIndex: 10,
              }}
            >
              {Object.keys(visibilityContext.visibility)
                .slice(0, 8)
                .map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      visibilityContext.toggleComponent(key)
                    }
                    style={{
                      fontSize: "0.625rem",
                      padding: "0.375rem 0.625rem",
                      backgroundColor:
                        visibilityContext.visibility[key]
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(255, 0, 0, 0.2)",
                      border:
                        "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "0.375rem",
                      color: "white",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 200ms",
                    }}
                  >
                    {visibilityContext.visibility[key]
                      ? "✓"
                      : "✕"}{" "}
                    {key.split(".")[1]}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};