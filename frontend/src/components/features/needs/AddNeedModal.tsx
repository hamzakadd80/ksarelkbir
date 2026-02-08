'use client';

import { useState } from 'react';
import { X, Loader2, MapPin, Phone, AlertTriangle, User } from 'lucide-react';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


interface AddNeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddNeedModal({ isOpen, onClose, onSuccess }: AddNeedModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'VETEMENTS',
    urgency: '3',
    locationName: '',
    contactName: '',
    contactPhone: '',
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/api/needs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          urgency: parseInt(formData.urgency),
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'envoi');

      onSuccess();
      onClose();
      setFormData({ 
        title: '', description: '', category: 'VETEMENTS', urgency: '3', 
        locationName: '', contactName: '', contactPhone: '' 
      });

    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout du besoin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* En-tête */}
        <div className="bg-amber-50 px-6 py-4 border-b border-amber-100 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-lg font-bold text-amber-800">Signaler un besoin</h2>
            <p className="text-xs text-amber-600/80">Aucun compte nécessaire</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-amber-100 rounded-full text-amber-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Formulaire */}
        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Titre du besoin <span className="text-red-500">*</span></label>
              <input
                name="title"
                required
                placeholder="Ex: Besoin de couvertures..."
                // AJOUT DE 'text-slate-900' ICI
                className="w-full p-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Catégorie & Urgence */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
                <select
                  name="category"
                  // AJOUT DE 'text-slate-900' ICI
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-amber-500/20 outline-none"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="VETEMENTS">Vêtements</option>
                  <option value="SANTE">Santé</option>
                  <option value="LOGEMENT">Logement</option>
                  <option value="ALIMENTATION">Alimentation</option>
                  <option value="LOGISTIQUE">Logistique</option>
                  <option value="AUTRE">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                  <AlertTriangle size={14} className="text-red-500"/> Urgence
                </label>
                <select
                  name="urgency"
                  // AJOUT DE 'text-slate-900' ICI
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-amber-500/20 outline-none"
                  value={formData.urgency}
                  onChange={handleChange}
                >
                  <option value="5">Critique (Vie en danger)</option>
                  <option value="4">Très urgent (24h)</option>
                  <option value="3">Important</option>
                  <option value="2">Modéré</option>
                  <option value="1">Faible</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description <span className="text-red-500">*</span></label>
              <textarea
                name="description"
                required
                rows={3}
                placeholder="Détails de la situation..."
                // AJOUT DE 'text-slate-900' ICI
                className="w-full p-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/20 outline-none resize-none"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* --- SECTION CONTACT --- */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-sm font-bold text-slate-700 mb-3">Vos coordonnées (pour vous contacter)</p>
              
              <div className="grid grid-cols-1 gap-3">
                {/* Nom */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    name="contactName"
                    required
                    placeholder="Votre nom ou surnom *"
                    // AJOUT DE 'text-slate-900' ICI
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/20 outline-none"
                    value={formData.contactName}
                    onChange={handleChange}
                  />
                </div>

                {/* Téléphone & Localisation */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      name="contactPhone"
                      placeholder="Tél (Optionnel)"
                      // AJOUT DE 'text-slate-900' ICI
                      className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/20 outline-none"
                      value={formData.contactPhone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      name="locationName"
                      required
                      placeholder="Quartier *"
                      // AJOUT DE 'text-slate-900' ICI
                      className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/20 outline-none"
                      value={formData.locationName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Publier maintenant"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}