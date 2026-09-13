"use client";

import { useEffect, useState } from "react";
import { Check, Eye, Mail, MessageSquare, Phone, Trash2, X } from "lucide-react";
import { deleteContactMessage, getContactMessages, updateContactMessageStatus, type ContactMessage } from "@/lib/services/contactService";

const serviceLabels: Record<string, string> = { brunch: "Pass Brunch", traiteur: "Traiteur", bar: "Bar & Cocktails", autre: "Autre" };

export default function AdminCommandesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try { setMessages(await getContactMessages()); } catch (loadError) { console.error(loadError); setError("Impossible de charger les messages Contact. Vérifie la règle contactMessages dans Firestore."); } finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);

  const setStatus = async (message: ContactMessage, status: ContactMessage["status"]) => {
    await updateContactMessageStatus(message.id, status);
    const next = { ...message, status };
    setMessages((current) => current.map((item) => item.id === message.id ? next : item));
    setSelected(next);
  };
  const remove = async (id: string) => {
    if (!window.confirm("Supprimer ce message ?")) return;
    await deleteContactMessage(id);
    setMessages((current) => current.filter((item) => item.id !== id));
    setSelected(null);
  };

  return <div className="mx-auto max-w-7xl space-y-8"><div><h1 className="text-3xl font-black uppercase" style={{ color: "var(--theme-textPrimary)" }}>Commandes & Messages</h1><p className="mt-2 text-sm" style={{ color: "var(--theme-textSecondary)" }}>Demandes envoyées depuis le formulaire Contact.</p></div>{error && <div className="rounded-lg p-4 text-sm font-bold" style={{ backgroundColor: "color-mix(in srgb, var(--theme-danger) 12%, transparent)", color: "var(--theme-danger)" }}>{error}</div>}{loading ? <p style={{ color: "var(--theme-textSecondary)" }}>Chargement...</p> : <div className="overflow-x-auto rounded-2xl border-2" style={{ borderColor: "var(--theme-borderColor)" }}><table className="w-full min-w-[760px] text-left"><thead style={{ backgroundColor: "var(--theme-bgSecondary)" }}><tr className="text-[10px] uppercase" style={{ color: "var(--theme-textSecondary)" }}><th className="p-4">Statut</th><th className="p-4">Contact</th><th className="p-4">Service</th><th className="p-4">Date</th><th className="p-4 text-right">Actions</th></tr></thead><tbody>{messages.map((message) => <tr key={message.id} className="border-t" style={{ borderColor: "var(--theme-borderColor)" }}><td className="p-4"><span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase" style={{ backgroundColor: message.status === "new" ? "var(--theme-accent)" : "var(--theme-bgSecondary)", color: "var(--theme-primary)" }}>{message.status === "new" ? "Nouveau" : message.status === "closed" ? "Fermé" : "Lu"}</span></td><td className="p-4"><p className="text-sm font-bold" style={{ color: "var(--theme-textPrimary)" }}>{message.name}</p><p className="text-xs" style={{ color: "var(--theme-textSecondary)" }}>{message.email}</p></td><td className="p-4 text-xs" style={{ color: "var(--theme-textSecondary)" }}>{serviceLabels[message.service] || message.service}</td><td className="p-4 text-xs" style={{ color: "var(--theme-textSecondary)" }}>{message.createdAt.toLocaleString("fr-FR")}</td><td className="p-4"><div className="flex justify-end gap-2"><button type="button" onClick={() => { setSelected(message); if (message.status === "new") void setStatus(message, "read"); }} className="flex items-center gap-1 rounded-lg border-2 px-3 py-2 text-xs font-bold" style={{ borderColor: "var(--theme-primary)", color: "var(--theme-primary)" }}><Eye className="h-3.5 w-3.5" /> Détail</button><button type="button" onClick={() => void remove(message.id)} aria-label="Supprimer" className="rounded-lg border-2 p-2" style={{ borderColor: "var(--theme-danger)", color: "var(--theme-danger)" }}><Trash2 className="h-4 w-4" /></button></div></td></tr>)}</tbody></table>{messages.length === 0 && <p className="p-8 text-center text-sm" style={{ color: "var(--theme-textSecondary)" }}>Aucun message.</p>}</div>}{selected && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border-2 p-6" style={{ backgroundColor: "var(--theme-bgPrimary)", borderColor: "var(--theme-borderColor)" }}><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase" style={{ color: "var(--theme-secondary)" }}>Détail de la demande</p><h2 className="text-2xl font-black" style={{ color: "var(--theme-textPrimary)" }}>{selected.name}</h2></div><button type="button" onClick={() => setSelected(null)} aria-label="Fermer"><X className="h-5 w-5" /></button></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><a href={`mailto:${selected.email}`} className="flex items-center gap-2 rounded-lg p-3 text-sm" style={{ backgroundColor: "var(--theme-bgSecondary)", color: "var(--theme-textPrimary)" }}><Mail className="h-4 w-4" />{selected.email}</a>{selected.phone && <a href={`tel:${selected.phone}`} className="flex items-center gap-2 rounded-lg p-3 text-sm" style={{ backgroundColor: "var(--theme-bgSecondary)", color: "var(--theme-textPrimary)" }}><Phone className="h-4 w-4" />{selected.phone}</a>}</div><p className="mt-5 text-xs font-bold uppercase" style={{ color: "var(--theme-textSecondary)" }}>{serviceLabels[selected.service] || selected.service}</p><div className="mt-2 rounded-xl p-4 text-sm" style={{ backgroundColor: "var(--theme-bgSecondary)", color: "var(--theme-textPrimary)" }}><MessageSquare className="mb-2 h-5 w-5" />{selected.message}</div><div className="mt-6 flex flex-wrap justify-end gap-2"><button type="button" onClick={() => void setStatus(selected, "read")} className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold text-white" style={{ backgroundColor: "var(--theme-secondary)" }}><Check className="h-4 w-4" /> Marquer lu</button><button type="button" onClick={() => void setStatus(selected, "closed")} className="rounded-lg border-2 px-4 py-2 text-xs font-bold" style={{ borderColor: "var(--theme-borderColor)", color: "var(--theme-textPrimary)" }}>Fermer la demande</button></div></div></div>}</div>;
}
