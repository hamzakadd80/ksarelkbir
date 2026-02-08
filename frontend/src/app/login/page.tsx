'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2, LogIn } from 'lucide-react';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Identifiants incorrects");

      // SUCCÈS : On sauvegarde le token et l'user
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirection vers l'accueil
      router.push('/');
      
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
        <div className="bg-slate-900 p-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Bon retour !</h1>
          <p className="text-slate-400">Connectez-vous pour continuer</p>
        </div>

        {/* Formulaire */}
        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" placeholder="Votre Email" required
                className="w-full pl-12 p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-900"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Mot de passe */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" placeholder="Votre mot de passe" required
                className="w-full pl-12 p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-900"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-amber-500 text-white font-bold py-4 rounded-xl hover:bg-amber-600 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-amber-500/20"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Se connecter <LogIn size={20} /></>}
            </button>
          </form>

          <p className="text-center text-slate-500 mt-6">
            Pas encore de compte ? <Link href="/signup" className="text-amber-600 font-bold hover:underline">S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
}