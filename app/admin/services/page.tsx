// app/admin/services/page.tsx
// Admin page for managing services

"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Upload,
  Sparkles,
  Briefcase,
  Save,
  Check,
  Loader,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "@/lib/services/servicesService";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: {
    url: string;
    cloudinaryId: string;
  };
  features: string[];
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminServicesPage() {
  const { showToast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    features: [""],
    isPopular: false,
  });

  // Load services on mount
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      console.log("Loading services from Firebase...");
      const firebaseServices = await getAllServices();
      console.log("Services loaded:", firebaseServices);
      setServices(firebaseServices);
      if (firebaseServices.length === 0) {
        console.warn("No services found in Firebase");
      }
    } catch (error) {
      console.error("Error loading services:", error);
      showToast("Erreur lors du chargement", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);

      const result = await uploadImageToCloudinary(file, "events");
      setFormData((prev) => ({
        ...prev,
        imageUrl: result.secure_url,
      }));

      showToast("Image téléchargée", "success");
    } catch (error) {
      console.error("Error uploading image:", error);
      showToast("Erreur lors du téléchargement", "error");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleNewService = () => {
    setSelectedService(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      features: [""],
      isPopular: false,
    });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      imageUrl: service.image?.url || "",
      features: service.features,
      isPopular: service.isPopular,
    });
    setImagePreview(service.image?.url || null);
    setIsModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || formData.price <= 0) {
      showToast("Remplissez tous les champs", "error");
      return;
    }

    try {
      setLoading(true);

      if (selectedService) {
        // Update Firebase
        await updateService(selectedService.id, {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          features: formData.features.filter((f) => f),
          isPopular: formData.isPopular,
          imageUrl: formData.imageUrl,
        });

        // Update local state
        setServices((prev) =>
          prev.map((s) =>
            s.id === selectedService.id
              ? {
                  ...s,
                  ...formData,
                  features: formData.features.filter((f) => f),
                }
              : s
          )
        );
        showToast("Service modifié", "success");
      } else {
        // Create in Firebase
        const newService = await createService({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          features: formData.features.filter((f) => f),
          isPopular: formData.isPopular,
          imageUrl: formData.imageUrl,
        });

        setServices((prev) => [...prev, newService]);
        showToast("Service créé", "success");
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving service:", error);
      showToast("Erreur lors de l'enregistrement", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Confirmer la suppression ?")) return;

    try {
      setLoading(true);
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      showToast("Service supprimé", "success");
    } catch (error) {
      console.error("Error deleting service:", error);
      showToast("Erreur lors de la suppression", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-[var(--theme-primary)] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-[var(--theme-secondary)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[var(--theme-secondary)]/10 border border-[var(--theme-secondary)]/20 px-3 py-1 rounded-full text-[var(--theme-secondary)] text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Gestion des Services</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Forfaits & Services
          </h1>
          <p className="text-xs text-slate-300 max-w-lg leading-relaxed font-serif italic">
            Gérez les forfaits et services disponibles
          </p>
        </div>

        <button
          onClick={handleNewService}
          className="bg-[var(--theme-secondary)] hover:bg-[var(--theme-secondary)]/90 text-white font-bold px-5 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0 relative z-10"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Service</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-200/80 p-5 rounded-2xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
          />
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader className="w-6 h-6 text-slate-400 animate-spin" />
            <p className="text-xs text-slate-400">Chargement des services...</p>
          </div>
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((service) => (
          <div
            key={service.id}
            className={cn(
              "border-2 rounded-2xl overflow-hidden transition-all",
              service.isPopular
                ? "border-[var(--theme-secondary)] bg-[var(--theme-secondary)]/5"
                : "border-slate-200/80 bg-white"
            )}
          >
            {/* Popular Badge */}
            {service.isPopular && (
              <div className="bg-[var(--theme-secondary)] text-white py-1 text-center text-xs font-bold uppercase">
                ⭐ Populaire
              </div>
            )}

            {/* Image */}
            {service.image && (
              <div className="w-full h-40 bg-slate-100 overflow-hidden">
                <img
                  src={service.image.url}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {service.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-2xl font-extrabold text-[var(--theme-primary)]">
                {service.price.toLocaleString("fr-FR")} FCFA
              </div>

              {/* Features */}
              <div className="space-y-1">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleEditService(service)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all"
                >
                  <Edit2 className="w-3 h-3" />
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-xs font-bold text-slate-600">Aucun service trouvé</p>
          <p className="text-[11px] text-slate-400 mt-1">Créez un nouveau service pour commencer.</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[1000]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-2xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl z-[1001] overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="bg-[var(--theme-primary)] text-white p-5 flex items-center justify-between sticky top-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[var(--theme-secondary)] text-white rounded-xl">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm">
                    {selectedService ? "Modifier" : "Créer"} un Service
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveService} className="p-6 space-y-4">
                {/* Image */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Image
                  </label>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-xl mb-2"
                    />
                  )}
                  <label className="block w-full p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-[var(--theme-secondary)] transition-all cursor-pointer text-center">
                    <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                    <span className="text-xs font-semibold text-slate-600">
                      {uploading ? "Téléchargement..." : "Cliquez ou déposez une image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nom du Service *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={2}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 resize-none"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Prix (FCFA) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20"
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Caractéristiques
                  </label>
                  <div className="space-y-2">
                    {formData.features.map((feature, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...formData.features];
                          newFeatures[idx] = e.target.value;
                          setFormData({ ...formData, features: newFeatures });
                        }}
                        placeholder={`Caractéristique ${idx + 1}`}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20"
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          features: [...formData.features, ""],
                        })
                      }
                      className="w-full py-2 text-xs font-bold text-[var(--theme-secondary)] border-2 border-dashed border-[var(--theme-secondary)]/30 rounded-xl hover:bg-[var(--theme-secondary)]/5 transition-all"
                    >
                      + Ajouter une caractéristique
                    </button>
                  </div>
                </div>

                {/* Popular */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isPopular}
                    onChange={(e) =>
                      setFormData({ ...formData, isPopular: e.target.checked })
                    }
                    className="w-4 h-4 rounded"
                  />
                  <label className="text-xs font-semibold text-slate-700">
                    Marquer comme populaire
                  </label>
                </div>

                {/* Submit */}
                <div className="flex gap-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase transition-all"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-[var(--theme-secondary)] rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
