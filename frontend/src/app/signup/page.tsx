'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, Loader2, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erreur d'inscription");

      // Redirection vers le login après succès
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden">
        
        {/* En-tête */}
        <div className="bg-amber-500 p-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Créer un compte</h1>
          <p className="text-amber-100">Rejoignez la communauté de Ksar El Kébir</p>
        </div>

        {/* Formulaire */}
        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom Complet */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" placeholder="Nom complet" required
                className="w-full pl-12 p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-900"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" placeholder="Adresse Email" required
                className="w-full pl-12 p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-900"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Téléphone */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="tel" placeholder="Téléphone (ex: 06...)" required
                className="w-full pl-12 p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-900"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            {/* Mot de passe */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" placeholder="Mot de passe" required
                className="w-full pl-12 p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-900"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>S'inscrire <ArrowRight size={20} /></>}
            </button>
          </form>

          <p className="text-center text-slate-500 mt-6">
            Déjà un compte ? <Link href="/login" className="text-amber-600 font-bold hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}