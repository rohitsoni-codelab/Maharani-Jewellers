'use client';

import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const PREDEFINED_CATEGORIES = [
  "Gold Jewellery", 
  "Diamond Jewellery", 
  "Bridal Collection", 
  "Rings", 
  "Earrings", 
  "Necklaces",
  "Bangles",
  "Other"
];

export default function InventoryTab({ userEmail, initialProducts = [], isEmbedded = false }: { userEmail: string, initialProducts: any[], isEmbedded?: boolean }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [images, setImages] = useState<string[]>([]); 
  const imagesRef = useRef<string[]>([]); 
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('published');
  const [isFeatured, setIsFeatured] = useState(false);

  // Sync Ref with State to avoid stale closure issues in async submit
  useEffect(() => {
    imagesRef.current = images;
    console.log("DEBUG: Images State Updated:", images);
  }, [images]);

  // Intelligent Keyword Suggestion
  useEffect(() => {
    if (!editingId && name) {
      const n = name.toLowerCase();
      const suggestions = new Set<string>();
      suggestions.add(`${n} in Katrash`);
      if (n.includes('gold')) suggestions.add('22k gold jewellery');
      if (n.includes('diamond')) suggestions.add('certified diamond');
      if (n.includes('bridal')) suggestions.add('bridal jewellery');
      setKeywords(Array.from(suggestions).join(', '));
    }
  }, [name, editingId]);

  const handleNameChange = (val: string) => {
    setName(val);
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setSlug(generatedSlug);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    setUploadStatus("Uploading...");

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !preset) {
      console.error("DEBUG: Missing Cloudinary Config. Please check your .env.local");
      setUploadStatus("Config Missing (.env)");
      setUploading(false);
      return;
    }

    try {
      const newUrls: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData
        });

        const data = await res.json();
        
        if (data.secure_url) {
          console.log("DEBUG: Cloudinary Success ->", data.secure_url);
          newUrls.push(data.secure_url);
        } else {
          console.error("DEBUG: Cloudinary Error Response ->", data);
          setUploadStatus(`Error: ${data.error?.message || "Check Console"}`);
        }
      }

      if (newUrls.length > 0) {
        setImages(prev => [...prev, ...newUrls]);
        setUploadStatus("✓ Image added");
      } else {
        setUploadStatus("Upload failed (No secure_url)");
      }
    } catch (err) {
      console.error("DEBUG: Upload Error ->", err);
      setUploadStatus("Upload failed (Network/API)");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setUploadStatus(""), 3000);
    }
  };

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentImages = imagesRef.current;
    console.log("DEBUG: Images at Submit (Ref):", currentImages);
    
    if (currentImages.length === 0) {
      alert("FRONTEND ERROR: Please upload at least one image before publishing.");
      return;
    }
    
    setLoading(true);
    try {
      const finalCategory = category === 'Other' ? customCategory : category;
      
      const bodyData = {
        name,
        slug,
        description,
        images: currentImages,
        keywords: keywords.split(',').map(s => s.trim()).filter(Boolean),
        category: finalCategory,
        status,
        isFeatured
      };

      console.log("DEBUG: Final Payload ->", bodyData);

      const endpoint = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
      
      const data = await res.json();
      if (data.success) {
        alert(editingId ? 'SUCCESS: Masterpiece Refined!' : 'SUCCESS: Masterpiece Published!');
        resetForm();
        router.refresh();
      } else {
        alert('BACKEND ERROR: ' + data.error);
      }
    } catch (err) {
      alert('SYSTEM ERROR: Failed to reach API.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: any) => {
    setName(product.name || '');
    setSlug(product.slug || '');
    setCategory(PREDEFINED_CATEGORIES.includes(product.category) ? product.category : 'Other');
    setCustomCategory(PREDEFINED_CATEGORIES.includes(product.category) ? '' : product.category);
    setDescription(product.description || '');
    setKeywords((product.keywords || []).join(', '));
    setImages(product.images || []);
    setEditingId(product._id);
    setStatus(product.status || 'published');
    setIsFeatured(product.isFeatured || false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setName('');
    setSlug('');
    setCategory('');
    setCustomCategory('');
    setDescription('');
    setKeywords('');
    setImages([]);
    setEditingId(null);
    setStatus('published');
    setIsFeatured(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete product permanently?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) router.refresh();
    } catch(e) {
      alert("Error deleting product");
    }
  };

  return (
    <div className={`container mx-auto px-4 py-8 max-w-7xl font-sans text-brand-black ${isEmbedded ? 'mt-0' : 'py-12'}`}>
      {/* Header */}
      {!isEmbedded && (
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 p-8 bg-brand-black rounded-[2.5rem] text-white shadow-2xl border-b-2 border-brand-gold relative overflow-hidden">
          <div className="z-10 text-center md:text-left">
            <h1 className="text-4xl font-playfair mb-1 text-brand-gold">Maharani Vault</h1>
            <p className="text-[10px] tracking-[0.4em] uppercase opacity-50 font-bold">Authority Registry System</p>
          </div>
          <div className="z-10 mt-6 md:mt-0 flex items-center gap-6">
             <span className="text-xs opacity-60 hidden md:block">{userEmail}</span>
             <button onClick={() => signOut()} className="px-6 py-2 border border-brand-gold/30 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-black transition-all">
                Sign Out
             </button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-50 sticky top-24 space-y-6">
            <h2 className="text-2xl font-playfair border-b border-gray-50 pb-4">
              {editingId ? 'Refine Masterpiece' : 'Register Creation'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Product Name</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:border-brand-gold transition-all outline-none text-sm" placeholder="Maharani Necklace" value={name} onChange={e => handleNameChange(e.target.value)} />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Collection</label>
                <select required className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:border-brand-gold transition-all outline-none text-sm" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="">Select Collection...</option>
                  {PREDEFINED_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {category === 'Other' && (
                <input required type="text" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:border-brand-gold transition-all outline-none text-sm" placeholder="Enter collection name" value={customCategory} onChange={e => setCustomCategory(e.target.value)} />
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Description</label>
                <textarea required className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl h-24 focus:border-brand-gold transition-all outline-none text-sm resize-none" placeholder="Heritage details..." value={description} onChange={e => setDescription(e.target.value)} />
              </div>

              <div className="p-4 bg-brand-light/20 rounded-2xl border border-brand-gold/10">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Visual Portfolio <span className="text-red-500">*</span></label>
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">{uploadStatus}</span>
                </div>
                
                <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleUpload} />
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full py-4 bg-brand-gold text-brand-black rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-gold/80 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {uploading ? "Visualizing..." : "↑ Upload Masterpiece"}
                </button>

                {images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {images.map((url, i) => (
                      <div key={url} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                        <img src={url} className="w-full h-full object-cover" alt="Preview" />
                        <button type="button" onClick={() => removeImage(i)} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-bold">Remove</button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-[8px] text-gray-400 mt-2 text-center uppercase tracking-widest">Images uploaded to Cloudinary: {images.length}</p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Status</label>
                  <select className="w-full bg-gray-50 border border-gray-100 p-3 rounded-2xl focus:border-brand-gold outline-none text-xs" value={status} onChange={e => setStatus(e.target.value as any)}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="flex-1 flex flex-col justify-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 accent-brand-gold" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-brand-gold transition-colors">Featured Product</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">SEO Blueprint</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:border-brand-gold transition-all outline-none text-[11px] text-gray-500" placeholder="Keywords" value={keywords} onChange={e => setKeywords(e.target.value)} />
              </div>
            </div>

            <button disabled={loading || uploading || images.length === 0} type="submit" className="w-full py-5 bg-brand-black text-brand-gold rounded-xl font-bold uppercase tracking-[0.3em] shadow-xl hover:bg-brand-black/90 transition-all disabled:opacity-30 disabled:grayscale">
              {loading ? 'Committing...' : uploading ? 'Waiting for Assets...' : (editingId ? 'Refine Product' : 'Publish Product')}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white rounded-[2rem] shadow-xl border border-gray-50 overflow-hidden">
             <div className="p-8 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-playfair">Catalogue Inventory</h2>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{initialProducts.length} Pieces Live</span>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-bold uppercase tracking-widest text-gray-300 border-b border-gray-50">
                      <th className="p-6">Creation</th>
                      <th className="p-6">Collection</th>
                      <th className="p-6">Status</th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-sm">
                    {initialProducts.length === 0 ? (
                      <tr><td colSpan={4} className="p-20 text-center text-gray-300 italic">No products found.</td></tr>
                    ) : (
                      initialProducts.map(p => (
                        <tr key={p._id} className="group hover:bg-brand-gold/5 transition-all">
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                               <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100">
                                  <img src={p.images?.[0] || 'https://placehold.co/100x100'} className="w-full h-full object-cover" alt={p.name} />
                               </div>
                               <div>
                                  <p className="font-bold">{p.name}</p>
                                  <p className="text-[10px] text-gray-400 font-mono">/{p.slug}</p>
                               </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <span className="px-3 py-1 bg-brand-light text-brand-black rounded-lg text-[10px] font-bold uppercase tracking-widest">
                              {p.category}
                            </span>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'published' ? 'bg-green-500' : p.status === 'draft' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
                              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{p.status || 'published'}</span>
                            </div>
                            {p.isFeatured && <span className="text-[8px] text-brand-gold font-bold uppercase tracking-tighter mt-1 block">★ Featured</span>}
                          </td>
                          <td className="p-6 text-right space-x-2">
                             <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline font-bold text-[10px] uppercase">Edit</button>
                             <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline font-bold text-[10px] uppercase">Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
