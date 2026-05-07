'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import InventoryTab from './InventoryTab';
import OverviewTab from './OverviewTab';
import CollectionsTab from './CollectionsTab';
import EnquiriesTab from './EnquiriesTab';
import CMSTab from './CMSTab';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

type Tab = 'overview' | 'inventory' | 'collections' | 'enquiries' | 'cms';

interface AdminDashboardProps {
  userEmail: string;
  initialProducts: any[];
}

export default function AdminDashboard({ userEmail, initialProducts }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'inventory':
        return <InventoryTab userEmail={userEmail} initialProducts={initialProducts} isEmbedded={true} />;
      case 'collections':
        return <CollectionsTab />;
      case 'enquiries':
        return <EnquiriesTab />;
      case 'cms':
        return <CMSTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-brand-black selection:bg-brand-gold selection:text-brand-black relative">
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-6 right-6 z-[55] w-12 h-12 bg-brand-black text-brand-gold rounded-2xl flex items-center justify-center shadow-2xl border border-brand-gold/20"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userEmail={userEmail}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-grow overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full min-h-screen"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
