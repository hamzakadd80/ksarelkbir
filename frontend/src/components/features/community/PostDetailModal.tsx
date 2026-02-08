'use client';

import { useState, useEffect } from 'react';
import { X, Send, User, MessageCircle, Heart, Reply } from 'lucide-react';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


interface PostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
  currentUser: any;
  onUpdate: () => void; // Pour rafraîchir la liste principale
}

export default function PostDetailModal({ isOpen, onClose, post, currentUser, onUpdate }: PostDetailModalProps) {
  const [commentContent, setCommentContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<any>(null); // Pour savoir à qui on répond
  const [localComments, setLocalComments] = useState<any[]>([]); // Copie locale pour affichage instantané

  // Mettre à jour les commentaires locaux quand le post change
  useEffect(() => {
    if (post) {
      setLocalComments(post.comments || []);
    }
  }, [post]);

  if (!isOpen || !post) return null;

  // Organiser les commentaires (Parents vs Réponses)
  const rootComments = localComments.filter((c: any) => !c.parentId);
  const getReplies = (commentId: string) => localComments.filter((c: any) => c.parentId === commentId);

  const handleSendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      const res = await fetch(`${apiUrl}/api/posts/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          postId: post.id,
          content: commentContent,
          parentId: replyingTo ? replyingTo.id : null // <-- Envoi du parentId si réponse
        })
      });

      if (res.ok) {
        const newComment = await res.json();
        // Ajout optimiste dans la liste locale
        setLocalComments([...localComments, newComment]);
        setCommentContent('');
        setReplyingTo(null);
        onUpdate(); // Rafraîchir la page principale en arrière-plan
      }
    } catch (error) {
      console.error("Erreur envoi commentaire", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* Conteneur Principal */}
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
        
        {/* --- PARTIE GAUCHE : LE POST (Image) --- */}
        <div className="flex-1 bg-black flex flex-col justify-center items-center relative overflow-hidden">
           {/* Bouton retour mobile (flottant sur l'image) */}
           <button 
             onClick={onClose} 
             className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 md:hidden z-20 backdrop-blur-md"
           >
            <X size={20} />
          </button>

          {post.imageUrl ? (
            <img src={post.imageUrl} alt="Post" className="max-w-full max-h-full object-contain" />
          ) : (
            <div className="p-10 text-center max-w-md">
               <p className="text-white/90 text-2xl font-medium leading-relaxed">"{post.content}"</p>
            </div>
          )}
        </div>

        {/* --- PARTIE DROITE : COMMENTAIRES (Modifiée) --- */}
        <div className="w-full md:w-[400px] bg-white flex flex-col h-full border-l border-slate-200">
          
          {/* ✨ NOUVEL EN-TÊTE AVEC BOUTON FERMER ✨ */}
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white shrink-0 z-10 shadow-sm">
            <div className="flex items-center gap-3">
               {/* Avatar de l'auteur du post */}
               <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                 {post.user.fullName[0]}
               </div>
               <div>
                 <h3 className="font-bold text-slate-900 text-sm">{post.user.fullName}</h3>
                 <p className="text-xs text-slate-500">Auteur du post</p>
               </div>
            </div>

            {/* LE BOUTON X QUE TU VOULAIS */}
            <button 
              onClick={onClose}
              className="p-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-full text-slate-500 transition-all duration-200"
              title="Fermer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Contenu Texte du post (si image présente) */}
          {post.imageUrl && post.content && (
            <div className="p-4 text-sm text-slate-800 bg-slate-50 border-b border-slate-100">
              <p>{post.content}</p>
            </div>
          )}

          {/* LISTE DES COMMENTAIRES (Reste identique) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-white">
            {rootComments.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-60">
                <MessageCircle size={48} className="mb-2"/>
                <p className="text-sm">Aucun commentaire pour l'instant.</p>
              </div>
            ) : (
              rootComments.map((comment: any) => (
                 // ... (Ton code d'affichage des commentaires reste ici) ...
                 <div key={comment.id} className="group">
                    {/* ... code commentaire ... */}
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 font-bold text-xs">
                        {comment.user.fullName[0]}
                      </div>
                      <div className="flex-1">
                        <div className="bg-slate-100 rounded-2xl px-3 py-2 inline-block">
                          <p className="text-xs font-bold text-slate-900">{comment.user.fullName}</p>
                          <p className="text-sm text-slate-700">{comment.content}</p>
                        </div>
                        {/* Bouton répondre */}
                        <div className="flex items-center gap-3 mt-1 ml-2">
                           <span className="text-[10px] text-slate-400">{new Date(comment.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                           <button onClick={() => setReplyingTo(comment)} className="text-xs font-bold text-slate-500 hover:text-emerald-600">Répondre</button>
                        </div>
                      </div>
                    </div>

                    {/* Réponses */}
                    {getReplies(comment.id).map((reply: any) => (
                      <div key={reply.id} className="flex gap-2 mt-2 ml-10">
                         <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 text-[10px] font-bold">
                            {reply.user.fullName[0]}
                         </div>
                         <div className="bg-slate-50 rounded-2xl px-3 py-2">
                            <p className="text-xs font-bold text-slate-900">{reply.user.fullName}</p>
                            <p className="text-xs text-slate-600">{reply.content}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              ))
            )}
          </div>

          {/* INPUT ZONE (Reste identique) */}
          <div className="p-3 border-t border-slate-100 bg-white">
            {replyingTo && (
              <div className="flex justify-between items-center bg-emerald-50 px-3 py-1.5 rounded-lg mb-2 text-xs text-emerald-700 border border-emerald-100">
                <span>Réponse à <b>{replyingTo.user.fullName}</b></span>
                <button onClick={() => setReplyingTo(null)} className="hover:text-emerald-900"><X size={14}/></button>
              </div>
            )}
            
            <form onSubmit={handleSendComment} className="flex items-center gap-2">
              <input
                className="flex-1 bg-slate-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-900 placeholder:text-slate-400"
                placeholder={replyingTo ? "Écrivez une réponse..." : "Écrivez un commentaire..."}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                autoFocus={!!replyingTo}
              />
              <button 
                type="submit" 
                disabled={!commentContent.trim()}
                className="p-2.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-emerald-500/20"
              >
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}