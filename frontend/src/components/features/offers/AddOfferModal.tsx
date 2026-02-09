'use client';

import { useState } from 'react';
import { X, Loader2, MapPin, Phone, HeartHandshake, User } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


interface AddOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddOfferModal({ isOpen, onClose, onSuccess }: AddOfferModalProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'VETEMENTS',
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
      const response = await fetch(`${apiUrl}/api/offers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'envoi');

      onSuccess();
      onClose();
      setFormData({
        title: '', description: '', category: 'VETEMENTS',
        locationName: '', contactName: '', contactPhone: ''
      });

    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout de l'offre.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

        {/* En-tête (Thème Bleu) */}
        <div className="bg-sky-50 px-6 py-4 border-b border-sky-100 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-lg font-bold text-sky-800 flex items-center gap-2">
              <HeartHandshake size={20} /> {t.offers_page.modal_title}
            </h2>
            <p className="text-xs text-sky-600/80">{t.offers_page.modal_subtitle}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-sky-100 rounded-full text-sky-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Formulaire */}
        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.offers_page.form_title} <span className="text-red-500">*</span></label>
              <input
                name="title"
                required
                // placeholder="Ex: Distribution de repas..."
                className="w-full p-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.needs_page.form_category}</label>
              <select
                name="category"
                className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-sky-500/20 outline-none"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="VETEMENTS">{t.categories.VETEMENTS}</option>
                <option value="SANTE">{t.categories.SANTE}</option>
                <option value="LOGEMENT">{t.categories.LOGEMENT}</option>
                <option value="ALIMENTATION">{t.categories.ALIMENTATION}</option>
                <option value="LOGISTIQUE">{t.categories.LOGISTIQUE}</option>
                <option value="AUTRE">{t.categories.AUTRE}</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.needs_page.form_description} <span className="text-red-500">*</span></label>
              <textarea
                name="description"
                required
                rows={3}
                // placeholder="Détails de votre offre..."
                className="w-full p-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500/20 outline-none resize-none"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* --- SECTION CONTACT --- */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-sm font-bold text-slate-700 mb-3">{t.needs_page.form_contact_section}</p>

              <div className="grid grid-cols-1 gap-3">
                {/* Nom */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    name="contactName"
                    required
                    placeholder={t.needs_page.form_name}
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500/20 outline-none"
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
                      placeholder={t.needs_page.form_phone}
                      className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500/20 outline-none"
                      value={formData.contactPhone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      name="locationName"
                      required
                      placeholder={t.needs_page.form_location}
                      className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500/20 outline-none"
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
                {t.needs_page.btn_cancel}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : t.offers_page.btn_submit}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}