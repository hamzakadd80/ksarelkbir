'use client';

import { useState, useRef } from 'react';
import { Image as ImageIcon, Video, Smile, Send, X } from 'lucide-react';

export default function CreatePostBox() {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gestion du clic sur l'icône "Image"
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Gestion du fichier sélectionné
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
      
      {/* 1. Zone de saisie (Haut) */}
      <div className="flex gap-3 mb-4">
        {/* Avatar Utilisateur (Simulé) */}
        <div className="h-10 w-10 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden">
           {/* Remplace par <img src="..." /> si tu as l'avatar */}
           <div className="w-full h-full bg-[#0f4c81] flex items-center justify-center text-white font-bold">
             M
           </div>
        </div>

        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Quoi de neuf, Ksar El Kébir ?"
            className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all resize-none text-slate-700 placeholder:text-slate-400 min-h-[80px]"
          />
        </div>
      </div>

      {/* 2. Prévisualisation de l'image (Si une image est choisie) */}
      {selectedImage && (
        <div className="relative mb-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
          <img src={selectedImage} alt="Preview" className="w-full max-h-80 object-cover" />
          <button 
            onClick={removeImage}
            className="absolute top-2 right-2 bg-slate-900/70 hover:bg-slate-900 text-white p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Séparateur */}
      <hr className="border-slate-100 mb-3" />

      {/* 3. Actions (Bas) */}
      <div className="flex items-center justify-between">
        
        {/* Boutons d'ajout (Photo/Vidéo/Humeur) */}
        <div className="flex gap-2">
          
          {/* Input caché pour le fichier */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />

          <button 
            onClick={handleImageClick}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 font-medium"
          >
            <ImageIcon size={20} className="text-green-500" />
            <span className="hidden sm:inline">Photo/Vidéo</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 font-medium">
            <Smile size={20} className="text-yellow-500" />
            <span className="hidden sm:inline">Humeur</span>
          </button>
        </div>

        {/* Bouton Publier */}
        <button 
          disabled={!content && !selectedImage}
          className={`
            px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all
            ${(content || selectedImage)
              ? 'bg-[#0f4c81] text-white hover:bg-blue-800 shadow-md'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          <span>Publier</span>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}