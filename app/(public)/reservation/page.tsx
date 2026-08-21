// app/(public)/reservation/page.tsx
"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Ticket,
  Copy,
  CheckCircle2,
  GraduationCap,
  Zap,
  CreditCard,
  X,
  PhoneCall,
  Lock,
  ArrowRight
} from "lucide-react";
import { EVENT_INFO } from "@/lib/constants";
import { formatCFA, generateReference } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ReservationPage() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({ name: "", phone: "", guests: 1 });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState<"wave" | "om" | "momo" | "moov">("wave");
  const [paymentPhone, setPaymentPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [passData, setPassData] = useState<{ ref: string; name: string; guests: number; amount: number } | null>(null);

  const totalAmount = EVENT_INFO.price * formData.guests;

  const handleOpenPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast("Veuillez remplir votre nom et numéro WhatsApp.", "error");
      return;
    }
    setPaymentPhone(formData.phone);
    setIsPaymentModalOpen(true);
  };

  const handleConfirmPayment = () => {
    if (!paymentPhone) {
      showToast("Veuillez saisir le numéro pour le prélèvement.", "error");
      return;
    }

    setIsProcessing(true);
    showToast("Initialisation de la transaction Mobile Money...", "info");

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentModalOpen(false);

      const ref = generateReference();
      setPassData({
        ref,
        name: formData.name,
        guests: formData.guests,
        amount: totalAmount,
      });

      showToast("Paiement validé ! Votre Pass QR est généré.", "success");
    }, 2000);
  };

  const handleCopyRef = () => {
    if (passData) {
      navigator.clipboard.writeText(passData.ref);
      showToast("Référence copiée!", "info");
    }
  };

  return (
    <div style={{ maxWidth: "56rem", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>

      {!passData ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          alignItems: "flex-start"
        }}>

          {/* Avantages */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            backgroundColor: "rgba(236, 72, 153, 0.1)",
            border: "1px solid rgba(236, 72, 153, 0.2)",
            padding: "1.5rem",
            borderRadius: "1.5rem"
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--theme-primary)",
              backgroundColor: "rgba(236, 72, 153, 0.15)",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              border: "1px solid rgba(236, 72, 153, 0.2)",
              width: "fit-content"
            }}>
              ⚡ Pass Tout Inclus
            </div>

            <h2 style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "var(--theme-textPrimary)",
              letterSpacing: "-0.02em"
            }}>
              Ce qui vous attend
            </h2>

            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.75rem", color: "var(--theme-textSecondary)", fontWeight: 500 }}>
              <li>✓ Buffet chaud illimité</li>
              <li>✓ Bar à boissons</li>
              <li>✓ Olympiades Rétro</li>
              <li>✓ Badge personnalisé</li>
            </ul>
          </div>

          {/* Formulaire */}
          <div style={{
            backgroundColor: "white",
            border: "1px solid var(--theme-borderColor)",
            padding: "1.5rem 2rem",
            borderRadius: "1.5rem",
            boxShadow: "var(--shadow-soft-sm)"
          }}>
            <span style={{
              fontSize: "0.625rem",
              fontFamily: "var(--ff-space-mono)",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--theme-primary)",
              backgroundColor: "rgba(236, 72, 153, 0.1)",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              display: "inline-block",
              marginBottom: "1rem"
            }}>
              Étape 1 sur 2
            </span>
            <h1 style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--theme-textPrimary)",
              margin: "0.5rem 0 0 0"
            }}>
              Réserver Mes Pass
            </h1>

            <form onSubmit={handleOpenPayment} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
              <div>
                <label style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--theme-textPrimary)",
                  textTransform: "uppercase",
                  marginBottom: "0.375rem"
                }}>
                  Nom & Prénoms *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Kouassi Amenan Jean"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    backgroundColor: "var(--theme-bgSecondary)",
                    border: "1px solid var(--theme-borderColor)",
                    borderRadius: "12px",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "var(--theme-textPrimary)",
                    fontFamily: "var(--ff-manrope)",
                    transition: "all 200ms"
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--theme-textPrimary)",
                  textTransform: "uppercase",
                  marginBottom: "0.375rem"
                }}>
                  Numéro WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="ex: 07 00 00 00 00"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    backgroundColor: "var(--theme-bgSecondary)",
                    border: "1px solid var(--theme-borderColor)",
                    borderRadius: "12px",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "var(--theme-textPrimary)",
                    fontFamily: "var(--ff-manrope)",
                    transition: "all 200ms"
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--theme-textPrimary)",
                  textTransform: "uppercase",
                  marginBottom: "0.375rem"
                }}>
                  Nombre de Places
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    backgroundColor: "var(--theme-bgSecondary)",
                    border: "1px solid var(--theme-borderColor)",
                    borderRadius: "12px",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "var(--theme-textPrimary)",
                    fontFamily: "var(--ff-manrope)"
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} Personne{n > 1 ? "s" : ""} ({formatCFA(EVENT_INFO.price * n)})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{
                backgroundColor: "var(--theme-bgSecondary)",
                padding: "1rem",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                fontWeight: 600
              }}>
                <span style={{ color: "var(--theme-textSecondary)" }}>Total:</span>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--theme-textPrimary)" }}>
                  {formatCFA(totalAmount)}
                </span>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  backgroundColor: "var(--theme-primary)",
                  color: "white",
                  fontWeight: 700,
                  padding: "1rem",
                  borderRadius: "12px",
                  boxShadow: "var(--shadow-soft-md)",
                  border: "none",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  transition: "all 200ms"
                }}
              >
                <CreditCard className="w-4 h-4" />
                Procéder au Paiement
              </button>
            </form>
          </div>

        </div>
      ) : (
        /* QR Pass */
        <div style={{
          maxWidth: "24rem",
          margin: "0 auto",
          backgroundColor: "var(--theme-primary)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "2rem",
          borderRadius: "1.5rem",
          boxShadow: "var(--shadow-soft-lg)"
        }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <span style={{
              display: "inline-block",
              fontSize: "0.625rem",
              fontFamily: "var(--ff-space-mono)",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "var(--theme-secondary)",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              marginBottom: "0.5rem"
            }}>
              ✓ Pass Validé
            </span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0.5rem 0 0 0" }}>
              {EVENT_INFO.title}
            </h2>
            <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--theme-secondary)", margin: "0.5rem 0" }}>
              {passData.name}
            </p>
          </div>

          <div style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem"
          }}>
            <QRCodeSVG value={passData.ref} size={150} level="H" />
            <span style={{ fontSize: "0.625rem", fontFamily: "var(--ff-space-mono)", color: "var(--theme-textSecondary)" }}>
              {passData.ref}
            </span>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={handleCopyRef}
              style={{
                flex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                padding: "0.75rem",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 600
              }}
            >
              <Copy className="w-4 h-4 inline" /> Copier
            </button>
            <button
              onClick={() => setPassData(null)}
              style={{
                flex: 1,
                backgroundColor: "var(--theme-secondary)",
                color: "black",
                padding: "0.75rem",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 600
              }}
            >
              Nouveau
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {isPaymentModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isProcessing && setIsPaymentModalOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(4px)",
                zIndex: 50
              }}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                maxWidth: "28rem",
                backgroundColor: "white",
                border: "1px solid var(--theme-borderColor)",
                borderRadius: "1.5rem",
                padding: "2rem",
                zIndex: 50,
                boxShadow: "var(--shadow-soft-lg)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid var(--theme-borderColor)", paddingBottom: "1rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--theme-textPrimary)", margin: 0 }}>
                  🔒 Paiement
                </h3>
                <button onClick={() => setIsPaymentModalOpen(false)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: "1.5rem" }}>×</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--theme-textPrimary)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                    Opérateur
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem" }}>
                    {["Wave", "Orange Money", "MTN MoMo", "Moov Money"].map((op) => (
                      <button key={op} style={{
                        padding: "0.75rem",
                        border: "1px solid var(--theme-borderColor)",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        backgroundColor: paymentProvider === op ? "rgba(236, 72, 153, 0.1)" : "white"
                      }} onClick={() => setPaymentProvider(op as any)}>
                        {op}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--theme-textPrimary)", display: "block", marginBottom: "0.5rem" }}>
                    Numéro
                  </label>
                  <input
                    type="tel"
                    value={paymentPhone}
                    onChange={(e) => setPaymentPhone(e.target.value)}
                    placeholder="07 00 00 00 00"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid var(--theme-borderColor)",
                      borderRadius: "12px",
                      fontSize: "0.875rem"
                    }}
                  />
                </div>

                <button
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  style={{
                    width: "100%",
                    backgroundColor: "var(--theme-primary)",
                    color: "white",
                    fontWeight: 700,
                    padding: "1rem",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    opacity: isProcessing ? 0.5 : 1
                  }}
                >
                  {isProcessing ? "Validation..." : `Payer ${formatCFA(totalAmount)}`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
