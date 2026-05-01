"use client";

import { Phone, MessageCircle, MapPin } from "lucide-react";
import { STORE_DETAILS, GEO } from "@/lib/constants";

export default function MobileStickyBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex items-center justify-around py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <a href={`tel:${STORE_DETAILS.phone}`} className="flex flex-col items-center justify-center text-brand-black hover:text-brand-gold">
        <Phone size={20} className="mb-1" />
        <span className="text-xs font-medium">Call</span>
      </a>
      <a href={`https://wa.me/${STORE_DETAILS.whatsapp}?text=Hi`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center text-[#25D366] hover:opacity-80">
        <MessageCircle size={20} className="mb-1" />
        <span className="text-xs font-medium">WhatsApp</span>
      </a>
      <a href={`https://www.google.com/maps/dir/?api=1&destination=${GEO.lat},${GEO.lng}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center text-brand-black hover:text-brand-gold">
        <MapPin size={20} className="mb-1" />
        <span className="text-xs font-medium">Directions</span>
      </a>
    </div>
  );
}
