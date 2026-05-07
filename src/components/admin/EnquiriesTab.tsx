'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, CheckCircle, Clock, Trash2, ExternalLink, Library } from 'lucide-react';

export default function EnquiriesTab() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      if (data.success) setEnquiries(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    // API logic to update status would go here
    // For now, let's just mock it
    setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: newStatus } : e));
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm('Discard this enquiry?')) return;
    setEnquiries(prev => prev.filter(e => e._id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-500 text-white';
      case 'contacted': return 'bg-blue-500 text-white';
      case 'converted': return 'bg-green-500 text-white';
      case 'closed': return 'bg-gray-500 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-12 animate-pulse space-y-4">
      <div className="h-10 w-64 bg-gray-200 rounded-xl" />
      {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-200 rounded-2xl" />)}
    </div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-playfair mb-2 text-brand-black">Business Enquiries</h1>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold">Client Communication Registry</p>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100">
           <MessageSquare className="w-4 h-4 text-brand-gold" />
           <span className="text-sm font-bold text-brand-black">{enquiries.length} Active Leads</span>
        </div>
      </header>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-50">
                <th className="p-8">Customer Details</th>
                <th className="p-8">Message</th>
                <th className="p-8">Status</th>
                <th className="p-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center text-gray-300 italic">No enquiries recorded yet.</td>
                </tr>
              ) : (
                enquiries.map((enq, i) => (
                  <motion.tr 
                    key={enq._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group hover:bg-gray-50/80 transition-all"
                  >
                    <td className="p-8">
                      <div className="space-y-1">
                        <p className="font-bold text-brand-black">{enq.name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Phone className="w-3 h-3" />
                          {enq.phone}
                        </div>
                        {enq.productRef && (
                          <div className="mt-2 flex items-center gap-2 text-[10px] text-brand-gold font-bold uppercase tracking-wider">
                            <Library className="w-3 h-3" />
                            Ref: {enq.productRef.name}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-8">
                      <p className="text-sm text-gray-600 max-w-xs line-clamp-2">{enq.message}</p>
                      <p className="text-[10px] text-gray-400 mt-2 font-mono">
                        {new Date(enq.createdAt).toLocaleDateString()} at {new Date(enq.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="p-8">
                      <select 
                        value={enq.status} 
                        onChange={(e) => updateStatus(enq._id, e.target.value)}
                        className={`text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border-none outline-none appearance-none cursor-pointer ${getStatusColor(enq.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-8 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a 
                          href={`https://wa.me/${enq.whatsapp?.replace(/\D/g, '') || enq.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="WhatsApp Reply"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button 
                          onClick={() => deleteEnquiry(enq._id)}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
