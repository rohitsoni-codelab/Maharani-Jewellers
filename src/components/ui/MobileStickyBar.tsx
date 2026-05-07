"use client";

import { Phone, MessageCircle, MapPin } from "lucide-react";
import { STORE_DETAILS, GEO } from "@/lib/constants";
import { usePathname } from "next/navigation";

export default function MobileStickyBar() {
  const pathname = usePathname();
  
  // Hide on admin and login pages
  if (pathname?.startsWith('/admin') || pathname === '/login') return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 flex items-center justify-around py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]" role="navigation" aria-label="Quick actions">
      <a href={`tel:${STORE_DETAILS.phone}`} className="flex flex-col items-center justify-center text-brand-black hover:text-brand-gold transition-colors" aria-label="Call store">
        <Phone size={20} className="mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
      </a>
      <a href={`https://wa.me/${STORE_DETAILS.whatsapp}?text=${encodeURIComponent("Hi, I want to enquire about jewellery.")}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center text-[#25D366] hover:opacity-80 transition-opacity" aria-label="Message on WhatsApp">
        <MessageCircle size={20} className="mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
      </a>
      <a href={`https://www.google.com/maps/dir/?api=1&destination=${GEO.lat},${GEO.lng}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center text-brand-black hover:text-brand-gold transition-colors" aria-label="Get directions to store">
        <MapPin size={20} className="mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Directions</span>
      </a>
    </div>
  );
}
