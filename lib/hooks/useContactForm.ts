"use client";

import { useState } from "react";
import { submitContactMessage, ContactMessageDTO } from "@/lib/services/contactService";

export function useContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: ContactMessageDTO): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await submitContactMessage(data);
      return true;
    } catch (err) {
      console.error("Error submitting contact message:", err);
      setError("Une erreur est survenue, réessayez.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}