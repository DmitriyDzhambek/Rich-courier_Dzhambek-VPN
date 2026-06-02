'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
}

interface BlogTabProps {
  tabId: string;
  title: string;
  placeholder: string;
}

export default function BlogTab({ tabId, title, placeholder }: BlogTabProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');

  const storageKey = `blog-${tabId}`;

  // Загрузка постов из localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (err) {
        console.error('Ошибка при загрузке постов:', err);
      }
    }
  }, [storageKey]);

  // Сохранение постов в localStorage
  const savePosts = (newPosts: BlogPost[]) => {
    localStorage.setItem(storageKey, JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  const handleAddPost = () => {
    setIsEditing(true);
    setEditingId(null);
    setFormTitle('');
    setFormContent('');
  };

  const handleEditPost = (post: BlogPost) => {
    setIsEditing(true);
    setEditingId(post.id);
    setFormTitle(post.title);
    setFormContent(post.content);
  };

  const handleSavePost = () => {
    if (!formTitle.trim() || !formContent.trim()) {
      alert('Заполните заголовок и содержание');
      return;
    }

    const now = new Date();
    const date = now.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const time = now.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });

    let newPosts: BlogPost[];

    if (editingId) {
      newPosts = posts.map((post) =>
        post.id === editingId
          ? { ...post, title: formTitle, content: formContent, date, time }
          : post
      );
    } else {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: formTitle,
        content: formContent,
        date,
        time,
      };
      newPosts = [newPost, ...posts];
    }

    savePosts(newPosts);
    setIsEditing(false);
    setEditingId(null);
    setFormTitle('');
    setFormContent('');
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить пост?')) {
      savePosts(posts.filter((post) => post.id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormTitle('');
    setFormContent('');
  };

  return (
    <section className="w-full space-y-6">
      {/* Заголовок и кнопка добавления */}
      <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-[0_35px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Ваш блог</p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{title}</h2>
          </div>
          <button
            onClick={handleAddPost}
            disabled={isEditing}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            Новая запись
          </button>
        </div>
      </div>

      {/* Форма редактирования */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_35px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white/80">Заголовок</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Введите заголовок записи..."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#061a1b] px-4 py-3 text-sm text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/80">Содержание</label>
                <textarea
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder={placeholder}
                  className="mt-2 h-56 w-full rounded-2xl border border-white/10 bg-[#061a1b] px-4 py-3 text-sm text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSavePost}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5"
                >
                  <Save className="h-4 w-4" />
                  Сохранить
                </button>
                <button
                  onClick={handleCancel}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                  Отмена
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Список постов */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-12 text-center shadow-[0_35px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <p className="text-sm text-white/60">Нет записей. Создайте первую!</p>
          </div>
        ) : (
          posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_35px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl transition hover:border-primary/30"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-black text-white">{post.title}</h3>
                  <p className="mt-1 text-xs text-white/60">
                    {post.date} в {post.time}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditPost(post)}
                    disabled={isEditing}
                    className="rounded-full bg-white/10 p-2 text-white/70 transition hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    disabled={isEditing}
                    className="rounded-full bg-white/10 p-2 text-white/70 transition hover:bg-destructive hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-6 text-white/80">{post.content}</p>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
