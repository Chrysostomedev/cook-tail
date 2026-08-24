"use client";

import React, { useState, useEffect } from "react";
import {
  Plus, Edit2, Trash2, X, Search, Upload, Image as ImageIcon, Save, Loader,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import {
  getAllGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  GalleryItem,
  GalleryCategory,
} from "@/lib/services/galleryService";

const CATEGORIES: { value: GalleryCategory; label: string }[] = [
  { value: "cocktails", label: "Cocktails & Bar" },
  { value: "traiteur", label: "Service Traiteur" },
  { value: "evenements", label: "Événements & Décor" },
];

export default function AdminGaleriePage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "evenements" as GalleryCategory,
    tag: "",
    description: "",
    imageUrl: "",
    cloudinaryId: "",
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getAllGalleryItems();
      setItems(data);
    } catch (error) {
      console.error("Error loading gallery items:", error);
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
      setImagePreview(URL.createObjectURL(file));

      const result = await uploadImageToCloudinary(file, "gallery");
      setFormData((prev) => ({
        ...prev,
        imageUrl: result.secure_url,
        cloudinaryId: result.public_id,
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

  const handleNewItem = () => {
    setSelectedItem(null);
    setFormData({
      title: "",
      category: "evenements",
      tag: "",
      description: "",
      imageUrl: "",
      cloudinaryId: "",
    });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: GalleryItem) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      tag: item.tag,
      description: item.description,
      imageUrl: item.image?.url || "",
      cloudinaryId: item.image?.cloudinaryId || "",
    });
    setImagePreview(item.image?.url || null);
    setIsModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.imageUrl) {
      showToast("Le titre et l'image sont requis", "error");
      return;
    }

    try {
      setLoading(true);

      if (selectedItem) {
        await updateGalleryItem(selectedItem.id, formData);
        setItems((prev) =>
          prev.map((item) =>
            item.id === selectedItem.id
              ? { ...item, ...formData, image: { url: formData.imageUrl, cloudinaryId: formData.cloudinaryId } }
              : item
          )
        );
        showToast("Photo modifiée", "success");
      } else {
        const newItem = await createGalleryItem({
          title: formData.title,
          category: formData.category,
          tag: formData.tag,
          description: formData.description,
          imageUrl: formData.imageUrl,
          cloudinaryId: formData.cloudinaryId,
        });
        setItems((prev) => [newItem, ...prev]);
        showToast("Photo ajoutée", "success");
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving gallery item:", error);
      showToast("Erreur lors de l'enregistrement", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Confirmer la suppression ?")) return;

    try {
      setLoading(true);
      await deleteGalleryItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      showToast("Photo supprimée", "success");
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      showToast("Erreur lors de la suppression", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-[var(--theme-primary)] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-[var(--theme-secondary)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Galerie Photo</h1>
        </div>
        <button
          onClick={handleNewItem}
          className="bg-[var(--theme-secondary)] hover:bg-[var(--theme-secondary)]/90 text-white font-bold px-5 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0 relative z-10"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Photo</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-200/80 p-5 rounded-2xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une photo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 focus:border-[var(--theme-secondary)] transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="w-6 h-6 text-slate-400 animate-spin" />
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="w-full h-40 bg-slate-100 overflow-hidden">
                <img src={item.image.url} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-extrabold text-slate-900">{item.title}</h3>
                    <span className="text-xs font-bold bg-[var(--theme-secondary)]/10 text-[var(--theme-secondary)] px-2 py-1 rounded-lg shrink-0">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.description}</p>
                </div>
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all"
                  >
                    <Edit2 className="w-3 h-3" /> Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition-all"
                  >
                    <Trash2 className="w-3 h-3" /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-xs font-bold text-slate-600">Aucune photo trouvée</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[1000]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-2xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl z-[1001] overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-[var(--theme-primary)] text-white p-5 flex items-center justify-between sticky top-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[var(--theme-secondary)] text-white rounded-xl">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm">{selectedItem ? "Modifier" : "Ajouter"} une Photo</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveItem} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase">Image *</label>
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-xl mb-2" />
                  )}
                  <label className="block w-full p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-[var(--theme-secondary)] transition-all cursor-pointer text-center">
                    <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                    <span className="text-xs font-semibold text-slate-600">
                      {uploading ? "Téléchargement..." : "Cliquez ou déposez une image"}
                    </span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Titre *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Catégorie</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as GalleryCategory })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tag / Étiquette</label>
                    <input
                      type="text"
                      placeholder="ex: Bar Mobile"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--theme-secondary)]/20 resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase transition-all">
                    Annuler
                  </button>
                  <button type="submit" className="flex-1 px-4 py-2.5 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-[var(--theme-secondary)] rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> Enregistrer
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