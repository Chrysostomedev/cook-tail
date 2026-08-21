// app/(public)/cgu/page.tsx
"use client";

export default function CGUPage() {
  return (
    <div style={{
      maxWidth: "56rem",
      margin: "0 auto",
      padding: "2rem 0"
    }}>
      <h1 style={{
        fontSize: "2rem",
        fontWeight: 800,
        color: "var(--theme-textPrimary)",
        marginBottom: "1.5rem"
      }}>
        Conditions Générales d'Utilisation
      </h1>
      <div style={{
        fontSize: "0.875rem",
        lineHeight: 1.6,
        color: "var(--theme-textPrimary)"
      }}>
        <p>Contenu des CGU à ajouter.</p>
      </div>
    </div>
  );
}
