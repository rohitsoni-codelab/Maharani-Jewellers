'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Library, MessageSquare, TrendingUp, Eye, Star } from 'lucide-react';

export default function OverviewTab() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.success) setStats(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { name: 'Catalogue Size', value: stats?.totalProducts || 0, icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Live Products', value: stats?.publishedProducts || 0, icon: Eye, color: 'text-green-500', bg: 'bg-green-500/10' },
    { name: 'Collections', value: stats?.totalCollections || 0, icon: Library, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
    { name: 'New Enquiries', value: stats?.newEnquiries || 0, icon: MessageSquare, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  if (loading) {
    return <div className="p-8 lg:p-12 animate-pulse space-y-8">
      <div className="h-12 w-64 bg-gray-200 rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-3xl" />)}
      </div>
    </div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-playfair mb-2">Executive Overview</h1>
          <p className="text-sm text-gray-500 tracking-wider font-medium">Business metrics for Maharani Jewellers</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">System Live</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white rounded-[2rem] shadow-sm border border-gray-50 relative overflow-hidden group hover:shadow-xl hover:shadow-brand-gold/5 transition-all duration-500"
          >
            <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
              <card.icon className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">{card.name}</p>
            <h3 className="text-3xl font-playfair text-brand-black">{card.value}</h3>
            
            {/* Subtle Gradient Decor */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-brand-gold/10 transition-colors" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-10 bg-white rounded-[2.5rem] shadow-sm border border-gray-50">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-playfair">Performance Trends</h3>
              <div className="flex gap-2">
                 <span className="px-3 py-1 bg-gray-50 text-[10px] font-bold uppercase text-gray-400 rounded-lg">Last 30 Days</span>
              </div>
           </div>
           <div className="h-64 flex flex-col items-center justify-center text-gray-300 border-2 border-dashed border-gray-50 rounded-3xl">
              <TrendingUp className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Predictive analytics coming in Phase 3</p>
           </div>
        </div>

        <div className="p-10 bg-brand-black rounded-[2.5rem] text-white relative overflow-hidden">
           <h3 className="text-xl font-playfair mb-8 text-brand-gold">Pro Tips</h3>
           <div className="space-y-6 relative z-10">
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-brand-gold" />
                 </div>
                 <p className="text-xs leading-relaxed text-gray-400">Mark high-demand pieces as <span className="text-brand-gold">Featured</span> to boost visibility on the homepage.</p>
              </div>
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-brand-gold" />
                 </div>
                 <p className="text-xs leading-relaxed text-gray-400">Keep descriptions under 150 words for the best mobile browsing experience.</p>
              </div>
           </div>
           
           <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
