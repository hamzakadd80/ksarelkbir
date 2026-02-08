'use client';

import { useState, useEffect } from 'react';
import { X, Send, User, MessageCircle, Heart, Reply } from 'lucide-react';

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
      const res = await fetch('http://localhost:3001/api/posts/comment', {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      {/* Conteneur Principal (Style Facebook : Max hauteur, scrollable) */}
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
        
        {/* PARTIE GAUCHE : LE POST (Image + Contenu) */}
        <div className="flex-1 bg-slate-900 flex flex-col justify-center items-center relative overflow-y-auto custom-scrollbar">
          <button onClick={onClose} className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 md:hidden z-10">
            <X size={20} />
          </button>
          
          {post.imageUrl ? (
            <img src={post.imageUrl} alt="Post content" className="max-w-full max-h-full object-contain" />
          ) : (
            <div className="p-10 text-center">
              <p className="text-white/80 text-xl italic">"{post.content}"</p>
            </div>
          )}
        </div>

        {/* PARTIE DROITE : COMMENTAIRES & INTERACTION */}
        <div className="w-full md:w-[400px] bg-white flex flex-col h-full border-l border-slate-200">
          
          {/* Header Mobile Close */}
          <div className="hidden md:flex justify-end p-2">
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>

          {/* Info Auteur */}
          <div className="px-4 pb-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{post.user.fullName}</h3>
              <p className="text-xs text-slate-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          {/* Contenu Texte (si image présente, on le remet ici aussi pour contexte) */}
          {post.imageUrl && (
            <div className="p-4 text-sm text-slate-800 border-b border-slate-100">
              {post.content}
            </div>
          )}

          {/* LISTE DES COMMENTAIRES (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {rootComments.length === 0 ? (
              <p className="text-center text-slate-400 text-sm mt-10">Soyez le premier à commenter !</p>
            ) : (
              rootComments.map((comment: any) => (
                <div key={comment.id} className="group">
                  {/* Commentaire Parent */}
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                      <span className="text-xs font-bold">{comment.user.fullName[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-slate-100 rounded-2xl px-4 py-2 inline-block">
                        <p className="text-xs font-bold text-slate-900">{comment.user.fullName}</p>
                        <p className="text-sm text-slate-700">{comment.content}</p>
                      </div>
                      {/* Actions (Répondre) */}
                      <div className="flex items-center gap-4 mt-1 ml-2">
                        <span className="text-xs text-slate-400">
                           {new Date(comment.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                        <button 
                          onClick={() => setReplyingTo(comment)}
                          className="text-xs font-bold text-slate-500 hover:text-emerald-600 cursor-pointer"
                        >
                          Répondre
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Réponses (Sous-commentaires) */}
                  {getReplies(comment.id).map((reply: any) => (
                    <div key={reply.id} className="flex gap-2 mt-2 ml-10">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                         <span className="text-[10px] font-bold">{reply.user.fullName[0]}</span>
                      </div>
                      <div>
                        <div className="bg-slate-100 rounded-2xl px-3 py-2 inline-block">
                          <p className="text-xs font-bold text-slate-900">{reply.user.fullName}</p>
                          <p className="text-sm text-slate-700">{reply.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* INPUT ZONE */}
          <div className="p-4 border-t border-slate-100 bg-white">
            {/* Indicateur de réponse */}
            {replyingTo && (
              <div className="flex justify-between items-center bg-emerald-50 px-3 py-1 rounded-lg mb-2 text-xs text-emerald-700">
                <span>Réponse à <b>{replyingTo.user.fullName}</b></span>
                <button onClick={() => setReplyingTo(null)}><X size={14}/></button>
              </div>
            )}
            
            <form onSubmit={handleSendComment} className="flex items-center gap-2">
              <input
                className="flex-1 bg-slate-100 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-900"
                placeholder={replyingTo ? "Écrivez une réponse..." : "Écrivez un commentaire..."}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                autoFocus={!!replyingTo}
              />
              <button 
                type="submit" 
                disabled={!commentContent.trim()}
                className="p-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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