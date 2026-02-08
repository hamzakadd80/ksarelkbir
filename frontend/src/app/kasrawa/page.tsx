'use client';

import { useState, useEffect } from 'react';
import { Send, MessageCircle, Heart, User, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import PostDetailModal from '../../components/features/community/PostDetailModal'; // <-- IMPORT
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export default function CommunityPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // États formulaire
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(''); // <-- Pour l'image
  const [showImageInput, setShowImageInput] = useState(false);

  // État Modal
  const [selectedPost, setSelectedPost] = useState<any>(null); // <-- Post ouvert

  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) setCurrentUser(JSON.parse(userStr));
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newPostContent.trim()) return;

    await fetch('http://localhost:3001/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId: currentUser.id, 
        content: newPostContent,
        imageUrl: newPostImage || null // <-- Envoi de l'image
      })
    });

    setNewPostContent('');
    setNewPostImage('');
    setShowImageInput(false);
    fetchPosts();
  };

  const handleLike = async (e: React.MouseEvent, postId: string) => {
    e.stopPropagation(); // Empêche d'ouvrir le modal quand on like
    if (!currentUser) return alert("Connectez-vous !");
    await fetch('http://localhost:3001/api/posts/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id, postId })
    });
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      {/* --- MODAL --- */}
      <PostDetailModal 
        isOpen={!!selectedPost} 
        onClose={() => setSelectedPost(null)} 
        post={selectedPost}
        currentUser={currentUser}
        onUpdate={fetchPosts}
      />

      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <span className="bg-emerald-500 text-white p-2 rounded-lg">💬</span>
          9asrawa Community
        </h1>

        {/* ZONE PUBLICATION */}
        {currentUser ? (
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 border border-slate-200">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shrink-0">
                {currentUser.fullName[0]}
              </div>
              <form onSubmit={handleCreatePost} className="flex-1">
                <textarea
                  className="w-full bg-slate-50 p-4 rounded-xl border-none focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none text-slate-900 mb-2"
                  rows={2}
                  placeholder={`Quoi de neuf, ${currentUser.fullName} ?`}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />

                {/* Input Image (Caché par défaut) */}
                {showImageInput && (
                  <input 
                    type="url"
                    placeholder="Collez le lien de l'image (https://...)"
                    className="w-full bg-slate-50 p-2 rounded-lg text-sm text-slate-600 mb-3 border border-slate-200 outline-none focus:border-emerald-500"
                    value={newPostImage}
                    onChange={(e) => setNewPostImage(e.target.value)}
                    autoFocus
                  />
                )}

                <div className="flex justify-between items-center">
                  <button 
                    type="button"
                    onClick={() => setShowImageInput(!showImageInput)}
                    className={`flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-lg transition-colors ${showImageInput ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <ImageIcon size={18} />
                    Photo
                  </button>

                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20">
                    Publier <Send size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 p-6 rounded-2xl mb-8 text-center border border-emerald-100">
            <Link href="/login" className="text-emerald-600 font-bold hover:underline">Se connecter pour publier</Link>
          </div>
        )}

        {/* FIL D'ACTUALITÉ */}
        {loading ? <div className="text-center p-10"><Loader2 className="animate-spin inline text-emerald-500" /></div> : (
          <div className="space-y-6">
            {posts.map((post) => {
              const isLiked = currentUser && post.likes.some((like: any) => like.userId === currentUser.id);

              return (
                <div 
                  key={post.id} 
                  // CLIC SUR LA CARTE OUVRE LE MODAL
                  onClick={() => setSelectedPost(post)}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                >
                  {/* Auteur */}
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                      {post.user.fullName[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{post.user.fullName}</h3>
                      <p className="text-xs text-slate-400">
                        {new Date(post.createdAt).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', hour: '2-digit', minute:'2-digit' })}
                      </p>
                    </div>
                  </div>

                  {/* Contenu Texte */}
                  {post.content && (
                    <div className="px-4 pb-2 text-slate-800 text-lg leading-relaxed">
                      {post.content}
                    </div>
                  )}

                  {/* Image Post */}
                  {post.imageUrl && (
                    <div className="w-full h-64 bg-slate-50 mt-2 overflow-hidden flex items-center justify-center">
                      <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="px-4 py-3 border-t border-slate-50 flex items-center gap-6 mt-2">
                    <button 
                      onClick={(e) => handleLike(e, post.id)}
                      className={`flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-lg transition-colors hover:bg-slate-50 ${isLiked ? 'text-red-500' : 'text-slate-500'}`}
                    >
                      <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                      {post.likes.length}
                    </button>
                    
                    <button className="flex items-center gap-2 text-slate-500 text-sm font-bold px-3 py-2 rounded-lg hover:bg-slate-50">
                      <MessageCircle size={20} />
                      {post.comments.length} commentaires
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}