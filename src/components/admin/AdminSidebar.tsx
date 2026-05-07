'use client';

import { 
  LayoutDashboard, 
  Package, 
  Library, 
  MessageSquare, 
  Home, 
  LogOut,
  ChevronRight,
  X
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

type Tab = 'overview' | 'inventory' | 'collections' | 'enquiries' | 'cms';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  userEmail: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ activeTab, setActiveTab, userEmail, isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'collections', name: 'Collections', icon: Library },
    { id: 'enquiries', name: 'Enquiries', icon: MessageSquare },
    { id: 'cms', name: 'Homepage CMS', icon: Home },
  ];

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed lg:sticky top-0 left-0 z-[70] w-64 h-screen bg-brand-black border-r border-brand-gold/10 flex flex-col py-8 px-4 text-white overflow-hidden transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="lg:hidden absolute top-6 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="mb-12 px-2 flex flex-col items-start group">
          <span className="font-cinzel text-2xl font-bold tracking-[0.15em] text-gradient group-hover:brightness-125 transition-all duration-300">
            MAHARANI
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] tracking-[0.25em] text-brand-gold uppercase font-bold">
              Vault
            </span>
            <div className="h-[1px] w-8 bg-brand-gold/30" />
          </div>
        </div>

        {/* Nav Menu */}
        <nav className="flex-grow space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id as Tab)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-brand-gold text-brand-black shadow-lg shadow-brand-gold/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-brand-black' : 'text-brand-gold/60 group-hover:text-brand-gold'}`} />
                {item.name}
              </div>
              {activeTab === item.id && (
                <motion.div layoutId="sidebar-dot">
                  <ChevronRight className="w-3 h-3 text-brand-black/40" />
                </motion.div>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Profile */}
        <div className="mt-auto pt-8 border-t border-white/5">
          <div className="px-4 mb-6">
            <p className="text-[8px] uppercase tracking-[0.3em] text-brand-gold/40 mb-1 font-bold">Connected As</p>
            <p className="text-[10px] truncate opacity-60 font-medium">{userEmail}</p>
          </div>
          
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-red-400/80 hover:text-red-400 hover:bg-red-500/5 transition-all group"
          >
            <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>

        {/* Luxury Blur Accent */}
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      </aside>
    </>
  );
}
