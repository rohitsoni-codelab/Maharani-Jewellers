'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Save, Plus, Trash2, MoveUp, MoveDown, Globe, MessageSquare } from 'lucide-react';

export default function CMSTab() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const defaultConfig = {
    heroSlides: [],
    announcementBar: { text: '', isVisible: true },
    whatsappCta: { text: 'Enquire on WhatsApp', phone: '', isVisible: true },
    seo: { title: '', description: '' }
  };

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/cms');
      const data = await res.json();
      if (data.success && data.data) {
        // Merge with defaults to ensure all nested fields exist
        setConfig({
          ...defaultConfig,
          ...data.data,
          announcementBar: { ...defaultConfig.announcementBar, ...(data.data.announcementBar || {}) },
          whatsappCta: { ...defaultConfig.whatsappCta, ...(data.data.whatsappCta || {}) },
          seo: { ...defaultConfig.seo, ...(data.data.seo || {}) }
        });
      } else {
        setConfig(defaultConfig);
      }
    } catch (err) {
      console.error(err);
      setConfig(defaultConfig);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (res.ok) alert('Homepage Configuration Updated Successfully!');
    } catch (err) {
      alert('Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  const addSlide = () => {
    const newSlide = { image: '', title: '', subtitle: '', ctaText: 'Explore Collection', ctaLink: '/', order: (config?.heroSlides || []).length };
    setConfig({ ...config, heroSlides: [...(config?.heroSlides || []), newSlide] });
  };

  const removeSlide = (idx: number) => {
    const slides = (config?.heroSlides || []).filter((_: any, i: number) => i !== idx);
    setConfig({ ...config, heroSlides: slides });
  };

  const updateSlide = (idx: number, field: string, val: string) => {
    const slides = [...(config?.heroSlides || [])];
    slides[idx] = { ...slides[idx], [field]: val };
    setConfig({ ...config, heroSlides: slides });
  };

  if (loading || !config) return <div className="p-12 animate-pulse space-y-8"><div className="h-10 w-64 bg-gray-200 rounded-xl" /><div className="h-64 bg-gray-200 rounded-[2rem]" /></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 text-brand-black pb-20">
      <header className="flex justify-between items-center sticky top-0 bg-gray-50/90 backdrop-blur-md py-4 z-20">
        <div>
          <h1 className="text-4xl font-playfair mb-2">Homepage CMS</h1>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold">Storefront Authority Control</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 px-10 py-4 bg-brand-black text-brand-gold rounded-2xl font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl disabled:opacity-50"
        >
          {saving ? 'Synchronizing...' : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </header>

      {/* Hero Banners Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
           <h2 className="text-xl font-playfair flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                <Globe className="w-4 h-4 text-brand-gold" />
             </div>
             Hero Cinematic Banners
           </h2>
           <button onClick={addSlide} className="text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:underline">
             + Add New Slide
           </button>
        </div>

        <div className="space-y-4">
          {config.heroSlides.map((slide: any, idx: number) => (
            <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8">
               <div className="w-full lg:w-1/3 aspect-video bg-gray-100 rounded-2xl overflow-hidden relative group">
                  {slide.image ? (
                    <img src={slide.image} className="w-full h-full object-cover" alt="Slide" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">Preview</div>
                  )}
                  <button onClick={() => removeSlide(idx)} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-4 h-4" />
                  </button>
               </div>
               <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <input type="text" placeholder="Slide Title" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl outline-none text-sm font-bold" value={slide.title} onChange={e => updateSlide(idx, 'title', e.target.value)} />
                    <input type="text" placeholder="Subtitle / Tagline" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl outline-none text-xs" value={slide.subtitle} onChange={e => updateSlide(idx, 'subtitle', e.target.value)} />
                  </div>
                  <div className="space-y-4">
                    <input type="text" placeholder="Image URL (Cloudinary)" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl outline-none text-[10px] font-mono" value={slide.image} onChange={e => updateSlide(idx, 'image', e.target.value)} />
                    <div className="flex gap-2">
                       <input type="text" placeholder="CTA Text" className="flex-grow bg-gray-50 border border-gray-100 p-3 rounded-xl outline-none text-xs" value={slide.ctaText} onChange={e => updateSlide(idx, 'ctaText', e.target.value)} />
                       <input type="text" placeholder="Link" className="w-1/3 bg-gray-50 border border-gray-100 p-3 rounded-xl outline-none text-xs" value={slide.ctaLink} onChange={e => updateSlide(idx, 'ctaLink', e.target.value)} />
                    </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements & CTAs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-xl font-playfair flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                 <Globe className="w-4 h-4" />
              </div>
              Announcement Bar
            </h2>
            <div className="space-y-4">
               <textarea 
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl h-24 focus:border-brand-gold outline-none text-sm resize-none" 
                  placeholder="e.g. Free insured shipping across India on all gold jewellery..." 
                  value={config.announcementBar.text}
                  onChange={e => setConfig({ ...config, announcementBar: { ...config.announcementBar, text: e.target.value } })}
               />
               <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 accent-brand-gold" 
                    checked={config.announcementBar.isVisible}
                    onChange={e => setConfig({ ...config, announcementBar: { ...config.announcementBar, isVisible: e.target.checked } })}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Show Announcement Bar</span>
               </label>
            </div>
         </section>

         <section className="bg-brand-black p-10 rounded-[2.5rem] shadow-xl text-white space-y-6">
            <h2 className="text-xl font-playfair flex items-center gap-3 text-brand-gold">
              <div className="w-8 h-8 rounded-lg bg-brand-gold/20 flex items-center justify-center">
                 <MessageSquare className="w-4 h-4" />
              </div>
              WhatsApp Support CTA
            </h2>
            <div className="space-y-4">
               <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-brand-gold outline-none text-sm" 
                  placeholder="Call to Action Text" 
                  value={config.whatsappCta.text}
                  onChange={e => setConfig({ ...config, whatsappCta: { ...config.whatsappCta, text: e.target.value } })}
               />
               <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-brand-gold outline-none text-sm font-mono" 
                  placeholder="Phone Number (+91...)" 
                  value={config.whatsappCta.phone}
                  onChange={e => setConfig({ ...config, whatsappCta: { ...config.whatsappCta, phone: e.target.value } })}
               />
            </div>
         </section>
      </div>

      {/* Global SEO */}
      <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-6">
         <h2 className="text-xl font-playfair">Global Homepage SEO</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
               <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Meta Title</label>
               <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:border-brand-gold outline-none text-sm" 
                  value={config.seo.title}
                  onChange={e => setConfig({ ...config, seo: { ...config.seo, title: e.target.value } })}
               />
            </div>
            <div className="space-y-4">
               <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Meta Description</label>
               <textarea 
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl h-24 focus:border-brand-gold outline-none text-xs resize-none" 
                  value={config.seo.description}
                  onChange={e => setConfig({ ...config, seo: { ...config.seo, description: e.target.value } })}
               />
            </div>
         </div>
      </section>
    </div>
  );
}
