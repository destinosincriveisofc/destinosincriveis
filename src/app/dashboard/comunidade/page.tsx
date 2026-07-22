"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ThumbsUp, MessageSquare, Image as ImageIcon, Send, X, Loader } from 'lucide-react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

interface Comment {
  id: number;
  member_nome: string;
  comentario: string;
  criado_em: string;
}

interface Post {
  id: string;
  member_id: string;
  member_nome: string;
  member_role: string;
  conteudo: string;
  midia_url: string;
  criado_em: string;
  likes_count: number;
  liked_by_me: boolean;
  comments: Comment[];
}

export default function ComunidadePage() {
  const router = useRouter();
  const [token, setToken] = React.useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("token");
    }
    return null;
  });
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [newPostText, setNewPostText] = React.useState("");

  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = React.useState<string | null>(null);

  const [uploading, setUploading] = React.useState(false);
  const [commentInputs, setCommentInputs] = React.useState<Record<string, string>>({});

  const fetchFeed = async (authToken: string) => {
    setLoading(true);
    try {
      const res = await fetchWithTimeout("https://destinosincriveis.vps-kinghost.net/api/posts/feed", {
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch feed");
      }
    } catch (err) {
      console.error("Error fetching feed:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    } else {
      setTimeout(() => {
        fetchFeed(storedToken);
      }, 0);
    }
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setSelectedImagePreview(null);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim() && !selectedImage) return;
    if (!token) return;

    setUploading(true);
    try {
      let midiaUrl = "";
      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);

        const uploadRes = await fetchWithTimeout("https://destinosincriveis.vps-kinghost.net/api/posts/upload", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: formData
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          if (uploadData.success) {
            midiaUrl = uploadData.url;
          }
        } else {
          alert("Falha no upload da foto.");
          setUploading(false);
          return;
        }
      }

      const createRes = await fetchWithTimeout("https://destinosincriveis.vps-kinghost.net/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          conteudo: newPostText,
          midia_url: midiaUrl
        })
      });

      if (createRes.ok) {
        setNewPostText("");
        setSelectedImage(null);
        setSelectedImagePreview(null);
        fetchFeed(token);
      } else {
        alert("Falha ao publicar post.");
      }
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!token) return;

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            liked_by_me: !post.liked_by_me,
            likes_count: post.liked_by_me ? post.likes_count - 1 : post.likes_count + 1
          };
        }
        return post;
      })
    );

    try {
      const res = await fetchWithTimeout("https://destinosincriveis.vps-kinghost.net/api/posts/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ post_id: postId })
      });
      if (!res.ok) {
        fetchFeed(token);
      }
    } catch (err) {
      console.error("Error liking post:", err);
      fetchFeed(token);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim() || !token) return;

    try {
      const res = await fetchWithTimeout("https://destinosincriveis.vps-kinghost.net/api/posts/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ post_id: postId, comentario: commentText })
      });

      if (res.ok) {
        setCommentInputs(prev => ({ ...prev, [postId]: "" }));
        fetchFeed(token);
      } else {
        alert("Falha ao adicionar comentario.");
      }
    } catch (err) {
      console.error("Error commenting on post:", err);
    }
  };

  const handleCommentInputChange = (postId: string, text: string) => {
    setCommentInputs(prev => ({ ...prev, [postId]: text }));
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="max-w-[700px] mx-auto py-4 flex flex-col gap-6">
      <form onSubmit={handleCreatePost} className="rounded-[16px] p-5 bg-[var(--bg-secondary)] border border-[var(--border-default)] flex flex-col gap-4">
        <textarea
          placeholder="Duvidas sobre milhas? Dicas de viagem? Compartilhe com a nossa comunidade!"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          className="w-full min-h-[100px] bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-[12px] p-3.5 text-[var(--text-primary)] text-sm resize-vertical focus:outline-none focus:border-[var(--brand-blue)] focus:shadow-[0_0_0_3px_var(--brand-blue-light)]"
          required={!selectedImage}
        />

        {selectedImagePreview && (
          <div className="relative w-full max-h-[300px] rounded-[12px] overflow-hidden border border-[var(--border-default)]">
            <img src={selectedImagePreview} alt="Preview" className="w-full h-[250px] object-cover" />
            <button type="button" onClick={handleRemoveImage} className="absolute top-2.5 right-2.5 bg-black/60 text-white border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-red-500">
              <X size={18} />
            </button>
          </div>
        )}

        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="relative overflow-hidden inline-block">
            <button type="button" className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--brand-blue)] px-4 py-2.5 rounded-[10px] text-sm font-semibold cursor-pointer hover:bg-[var(--brand-blue-light)] hover:border-[var(--brand-blue)]">
              <ImageIcon size={18} />
              <span>Adicionar Foto</span>
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute left-0 top-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>

          <button
            type="submit"
            disabled={uploading || (!newPostText.trim() && !selectedImage)}
            className="flex items-center gap-2 bg-[var(--brand-blue)] text-white px-5 py-2.5 rounded-[10px] text-sm font-bold cursor-pointer hover:bg-[var(--brand-blue-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {uploading ? (
              <>
                <Loader size={16} className="animate-spin" />
                <span>Publicando...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Publicar</span>
              </>
            )}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center text-[var(--text-muted)] py-10 text-sm">Carregando publicacoes da comunidade...</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-[var(--text-muted)] py-10 text-sm">Nenhum post publicado ainda. Seja o primeiro!</div>
      ) : (
        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <div key={post.id} className="rounded-[16px] p-6 bg-[var(--bg-secondary)] border border-[var(--border-default)] flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[var(--brand-blue)] flex items-center justify-center text-white text-base font-bold">
                  {getInitials(post.member_nome)}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-[var(--text-primary)] m-0">{post.member_nome}</h4>
                  <span className="text-xs text-[var(--text-muted)]">
                    {post.member_role === 'admin' ? 'Fundador' : 'Membro'} • {new Date(post.criado_em).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {post.conteudo && <p className="text-sm leading-relaxed text-[var(--text-secondary)] m-0 whitespace-pre-wrap">{post.conteudo}</p>}

              {post.midia_url && (
                <div className="w-full max-h-[450px] rounded-[12px] overflow-hidden border border-[var(--border-subtle)]">
                  <img
                    src={post.midia_url}
                    alt="Post media"
                    className="w-full h-auto max-h-[450px] object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.includes('host.docker.internal')) {
                        target.src = target.src.replace('host.docker.internal:5001', 'destinosincriveis.vps-kinghost.net');
                      }
                    }}
                  />
                </div>
              )}

              <div className="flex gap-5 border-y border-[var(--border-subtle)] py-3">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 text-sm bg-transparent border-none cursor-pointer font-semibold transition-colors ${
                    post.liked_by_me ? 'text-[var(--brand-blue)]' : 'text-[var(--text-muted)] hover:text-[var(--brand-blue)]'
                  }`}
                >
                  <ThumbsUp size={18} fill={post.liked_by_me ? "var(--brand-blue)" : "transparent"} />
                  <span>{post.likes_count} Curtidas</span>
                </button>
                <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm font-semibold">
                  <MessageSquare size={18} />
                  <span>{post.comments.length} Comentarios</span>
                </div>
              </div>

              <div className="bg-[var(--bg-surface)] rounded-[12px] p-4 flex flex-col gap-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="text-sm text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-2 last:border-b-0 last:pb-0">
                    <span className="font-bold text-[var(--text-primary)] mr-1.5">{comment.member_nome}:</span>
                    <span>{comment.comentario}</span>
                  </div>
                ))}

                <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="flex gap-2.5 mt-2">
                  <input
                    type="text"
                    placeholder="Escreva um comentario..."
                    value={commentInputs[post.id] || ""}
                    onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                    className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-[8px] px-3 py-2 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--brand-blue)]"
                  />
                  <button
                    type="submit"
                    disabled={!commentInputs[post.id] || !commentInputs[post.id].trim()}
                    className="bg-[var(--brand-blue)] text-white rounded-[8px] px-3.5 py-2 text-sm font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--brand-blue-hover)] transition-colors"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
