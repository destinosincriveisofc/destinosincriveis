"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ThumbsUp, MessageSquare, Image as ImageIcon, Send, X, Loader } from 'lucide-react';
import styles from './page.module.css';

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
  const [token, setToken] = React.useState<string | null>(null);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [newPostText, setNewPostText] = React.useState("");
  
  // Image Upload States
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = React.useState<string | null>(null);
  
  const [uploading, setUploading] = React.useState(false);
  const [commentInputs, setCommentInputs] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
      fetchFeed(storedToken);
    }
  }, [router]);

  const fetchFeed = async (authToken: string) => {
    setLoading(true);
    try {
      const res = await fetch("https://destinosincriveis.vps-kinghost.net/api/posts/feed", {
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
        
        const uploadRes = await fetch("https://destinosincriveis.vps-kinghost.net/api/posts/upload", {
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

      const createRes = await fetch("https://destinosincriveis.vps-kinghost.net/api/posts/create", {
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
    
    // Optimistic Update
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
      const res = await fetch("https://destinosincriveis.vps-kinghost.net/api/posts/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ post_id: postId })
      });
      if (!res.ok) {
        // Revert on error
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
      const res = await fetch("https://destinosincriveis.vps-kinghost.net/api/posts/comment", {
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
        alert("Falha ao adicionar comentário.");
      }
    } catch (err) {
      console.error("Error commenting on post:", err);
    }
  };

  const handleCommentInputChange = (postId: string, text: string) => {
    setCommentInputs(prev => ({ ...prev, [postId]: text }));
  };

  const getInitials = (name: string) => {
    if (!name) return "VIP";
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className={styles.comunidadeContainer}>
      {/* Create Post Card */}
      <form onSubmit={handleCreatePost} className={styles.createPostForm}>
        <textarea
          placeholder="Dúvidas sobre milhas? Dicas de viagem? Compartilhe com a nossa comunidade VIP!"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          className={styles.postTextarea}
          required={!selectedImage}
        />

        {selectedImagePreview && (
          <div className={styles.imagePreviewContainer}>
            <img src={selectedImagePreview} alt="Preview" className={styles.imagePreview} />
            <button type="button" onClick={handleRemoveImage} className={styles.removeImageBtn}>
              <X size={18} />
            </button>
          </div>
        )}

        <div className={styles.formActions}>
          <div className={styles.fileInputWrapper}>
            <button type="button" className={styles.uploadLabelBtn}>
              <ImageIcon size={18} />
              <span>Adicionar Foto</span>
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
          </div>

          <button
            type="submit"
            disabled={uploading || (!newPostText.trim() && !selectedImage)}
            className={styles.postSubmitBtn}
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

      {/* Feed Area */}
      {loading ? (
        <div className={styles.loadingText}>Carregando publicações da comunidade...</div>
      ) : posts.length === 0 ? (
        <div className={styles.noPostsText}>Nenhum post publicado ainda. Seja o primeiro! ✈️</div>
      ) : (
        <div className={styles.postsFeed}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <div className={styles.postAvatar}>{getInitials(post.member_nome)}</div>
                <div className={styles.postAuthorInfo}>
                  <h4 className={styles.postAuthorName}>{post.member_nome}</h4>
                  <span className={styles.postMeta}>
                    {post.member_role === 'admin' ? '👑 Fundador CLUB DIJA' : '🌎 Membro VIP'} • {new Date(post.criado_em).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {post.conteudo && <p className={styles.postContent}>{post.conteudo}</p>}

              {post.midia_url && (
                <div className={styles.postImageWrapper}>
                  <img
                    src={post.midia_url}
                    alt="Post media"
                    className={styles.postImage}
                    onError={(e) => {
                      // fallback logic if port is wrong or domain is local
                      const target = e.target as HTMLImageElement;
                      if (target.src.includes('host.docker.internal')) {
                        target.src = target.src.replace('host.docker.internal:5001', 'destinosincriveis.vps-kinghost.net');
                      }
                    }}
                  />
                </div>
              )}

              <div className={styles.postStats}>
                <button
                  onClick={() => handleLike(post.id)}
                  className={`${styles.likeBtn} ${post.liked_by_me ? styles.liked : ''}`}
                >
                  <ThumbsUp size={18} fill={post.liked_by_me ? "#FFC107" : "transparent"} />
                  <span>{post.likes_count} Curtidas</span>
                </button>
                <div className={styles.commentCountBtn}>
                  <MessageSquare size={18} />
                  <span>{post.comments.length} Comentários</span>
                </div>
              </div>

              {/* Comments Section */}
              <div className={styles.commentsSection}>
                {post.comments.map((comment) => (
                  <div key={comment.id} className={styles.commentItem}>
                    <span className={styles.commentAuthor}>{comment.member_nome}:</span>
                    <span>{comment.comentario}</span>
                  </div>
                ))}

                {/* Comment input form */}
                <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className={styles.commentForm}>
                  <input
                    type="text"
                    placeholder="Escreva um comentário..."
                    value={commentInputs[post.id] || ""}
                    onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                    className={styles.commentInput}
                  />
                  <button
                    type="submit"
                    disabled={!commentInputs[post.id] || !commentInputs[post.id].trim()}
                    className={styles.commentSubmitBtn}
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
