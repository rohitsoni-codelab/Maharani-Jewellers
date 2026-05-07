'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Library, Plus, Trash2, Edit2, Eye, EyeOff, SortAsc } from 'lucide-react';

export default function CollectionsTab() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [status, setStatus] = useState('draft');

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const res = await fetch('/api/collections?admin=true');
      const data = await res.json();
      if (data.success) setCollections(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, bannerImage, status })
      });
      const data = await res.json();
      if (data.success) {
        fetchCollections();
        setIsAdding(false);
        resetForm();
      }
    } catch (err) {
      alert('Error creating collection');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setBannerImage('');
    setStatus('draft');
  };

  if (loading) {
    return <div className="p-12 animate-pulse space-y-4">
      <div className="h-10 w-64 bg-gray-200 rounded-xl" />
      <div className="grid grid-cols-3 gap-6">
        {[1,2,3].map(i => <div key={i} className="h-48 bg-gray-200 rounded-[2rem]" />)}
      </div>
    </div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 text-brand-black">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-playfair mb-2">Editorial Collections</h1>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold">Category Curation System</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-8 py-3.5 bg-brand-black text-brand-gold rounded-2xl font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
        >
          {isAdding ? 'Close Editor' : <><Plus className="w-4 h-4" /> New Collection</>}
        </button>
      </header>

      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-brand-gold/10 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <div>
                 <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Collection Title</label>
                 <input required type="text" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:border-brand-gold outline-none text-sm" placeholder="e.g. Royal Bridal 2024" value={title} onChange={e => setTitle(e.target.value)} />
               </div>
               <div>
                 <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Description</label>
                 <textarea className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl h-32 focus:border-brand-gold outline-none text-sm resize-none" placeholder="Narrative for this collection..." value={description} onChange={e => setDescription(e.target.value)} />
               </div>
            </div>
            <div className="space-y-6">
               <div>
                 <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Banner Image URL</label>
                 <input type="text" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:border-brand-gold outline-none text-sm" placeholder="Cloudinary Link" value={bannerImage} onChange={e => setBannerImage(e.target.value)} />
               </div>
               <div>
                 <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Visibility Status</label>
                 <select className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:border-brand-gold outline-none text-sm" value={status} onChange={e => setStatus(e.target.value)}>
                   <option value="draft">Draft (Hidden)</option>
                   <option value="published">Published (Live)</option>
                   <option value="archived">Archived</option>
                 </select>
               </div>
               <button type="submit" className="w-full py-5 bg-brand-gold text-brand-black rounded-2xl font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg">
                 Create Editorial Collection
               </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((col, i) => (
          <motion.div 
            key={col._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden hover:shadow-2xl hover:shadow-brand-gold/10 transition-all duration-500"
          >
            <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
               {col.bannerImage ? (
                 <img src={col.bannerImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={col.title} />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-200">
                    <Library className="w-12 h-12" />
                 </div>
               )}
               <div className="absolute top-4 right-4 flex gap-2">
                 <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-sm ${col.status === 'published' ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}>
                   {col.status}
                 </span>
               </div>
            </div>
            
            <div className="p-8">
               <h3 className="text-xl font-playfair mb-2 group-hover:text-brand-gold transition-colors">{col.title}</h3>
               <p className="text-xs text-gray-500 line-clamp-2 mb-6 h-8">{col.description || 'No description provided.'}</p>
               
               <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-4">
                     <button className="text-gray-400 hover:text-brand-black transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                     </button>
                     <button className="text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                     </button>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                     <SortAsc className="w-3 h-3" />
                     Order: {col.sortOrder || 0}
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
