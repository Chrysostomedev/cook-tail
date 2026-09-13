// app/admin/menu/page.tsx
// Admin page for managing menu items

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
  Utensils,
  Save,
  Loader,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import {
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "@/lib/services/menuService";

interface MenuItem {
  id: string;
  name: string;
  category: "appetizer" | "main" | "dessert" | "beverage";
  price?: number;
  description: string;
  image?: {
    url: string;
    cloudinaryId: string;
  };
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CATEGORIES = [
  { value: "appetizer", label: "Entrée" },
  { value: "main", label: "Plat Principal" },
  { value: "dessert", label: "Dessert" },
  { value: "beverage", label: "Boisson" },
];

interface MenuFormData {
  name: string;
  category: "main" | "appetizer" | "dessert" | "beverage";
  price?: number;
  description: string;
  imageUrl: string;
  cloudinaryId: string;
}

export default function AdminMenuPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

const [formData, setFormData] = useState<MenuFormData>({
  name: "",
  category: "main" as "main" | "appetizer" | "dessert" | "beverage",
  price: undefined,
  description: "",
  imageUrl: "",
  cloudinaryId: "", // <-- ajouté
});

  // Load items on mount
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      console.log("Loading menu items from Firebase...");
      const firebaseItems = await getAllMenuItems();
      console.log("Menu items loaded:", firebaseItems);
      setItems(firebaseItems);
      if (firebaseItems.length === 0) {
        console.warn("No menu items found in Firebase");
      }
    } catch (error) {
      console.error("Error loading items:", error);
      showToast("Erreur lors du chargement", "error");
    } finally {
      setLoading(false);
    }
  };

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    setUploading(true);
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);

    const result = await uploadImageToCloudinary(file, "menu");
    setFormData((prev) => ({
      ...prev,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id, // <-- ajouté
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

// Open modal for new item
const handleNewItem = () => {
  setSelectedItem(null);
  setFormData({
    name: "",
    category: "main",
    price: undefined,
    description: "",
    imageUrl: "",
    cloudinaryId: "", // <-- ajouté
  });
  setImagePreview(null);
  setIsModalOpen(true);
};

// Open modal for editing
const handleEditItem = (item: MenuItem) => {
  setSelectedItem(item);
  setFormData({
    name: item.name,
    category: item.category,
    price: item.price,
    description: item.description,
    imageUrl: item.image?.url || "",
    cloudinaryId: item.image?.cloudinaryId || "", // <-- ajouté
  });
  setImagePreview(item.image?.url || null);
  setIsModalOpen(true);
};

  // Save item
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      showToast("Le nom du plat est obligatoire", "error");
      return;
    }

    try {
      setLoading(true);

      if (selectedItem) {
        // Update Firebase
        await updateMenuItem(selectedItem.id, {
          name: formData.name,
          category: formData.category,
          price: formData.price,
          description: formData.description,
          imageUrl: formData.imageUrl,
        });

        // Update local state
        setItems((prev) =>
          prev.map((item) =>
            item.id === selectedItem.id
              ? {
                  ...item,
                  ...formData,
                }
              : item
          )
        );
        showToast("Plat modifié", "success");
      } else {
        // Create in Firebase
        const newItem = await createMenuItem({
          name: formData.name,
          category: formData.category,
          price: formData.price,
          description: formData.description,
          imageUrl: formData.imageUrl,
        });

        setItems((prev) => [...prev, newItem]);
        showToast("Plat créé", "success");
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving item:", error);
      showToast("Erreur lors de l'enregistrement", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete item
  const handleDeleteItem = async (id: string) => {
    if (!confirm("Confirmer la suppression ?")) return;

    try {
      setLoading(true);
      await deleteMenuItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      showToast("Plat supprimé", "success");
    } catch (error) {
      console.error("Error deleting item:", error);
      showToast("Erreur lors de la suppression", "error");
    } finally {
      setLoading(false);
    }
  };

  // Filter items
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterCategory || item.category === filterCategory)
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-[var(--theme-primary)] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-[var(--theme-secondary)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
         
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Menu de l'Événement
          </h1>
          
        </div>

        <button
          onClick={handleNewItem}
          className="bg-[var(--theme-secondary)] hover:bg-[var(--theme-secondary)]/90 text-white font-bold px-5 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0 relative z-10"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Plat</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white border border-slate-200/80 p-5 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher un plat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
            />
          </div>
          <select
            value={filterCategory || ""}
            onChange={(e) => setFilterCategory(e.target.value || null)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20"
          >
            <option value="">Toutes les catégories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader className="w-6 h-6 text-slate-400 animate-spin" />
            <p className="text-xs text-slate-400">Chargement des plats...</p>
          </div>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            {/* Image */}
            {item.image && (
              <div className="w-full h-40 bg-slate-100 overflow-hidden">
                <img
                  src={item.image.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-extrabold text-slate-900">{item.name}</h3>
                  <span className="text-xs font-bold bg-[var(--theme-secondary)]/10 text-[var(--theme-secondary)] px-2 py-1 rounded-lg">
                    {CATEGORIES.find((c) => c.value === item.category)?.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {item.description}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-extrabold text-lg text-[var(--theme-primary)]">
                  {item.price ? `${item.price.toLocaleString("fr-FR")} FCFA` : "Prix sur demande"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleEditItem(item)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all"
                >
                  <Edit2 className="w-3 h-3" />
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
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
          <p className="text-xs font-bold text-slate-600">Aucun plat trouvé</p>
          <p className="text-[11px] text-slate-400 mt-1">Créez un nouveau plat pour commencer.</p>
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
                    <Utensils className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm">
                    {selectedItem ? "Modifier" : "Ajouter"} un Plat
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
              <form onSubmit={handleSaveItem} className="p-6 space-y-4">
                {/* Image */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Image du Plat
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
                    Nom du Plat *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
                  />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Catégorie
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Prix (FCFA) (facultatif)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      value={formData.price ?? ""}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : undefined })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20"
                    />
                  </div>
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
                    rows={3}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 resize-none"
                  />
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
