"use client";

import { MessageCircle } from "lucide-react";
import { STORE_DETAILS } from "@/lib/constants";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function WhatsAppButton({ message = "Hi, I'm interested in your jewellery collection at Katrash." }: { message?: string }) {
  const pathname = usePathname();
  
  // Hide on admin and login pages
  if (pathname?.startsWith('/admin') || pathname === '/login') return null;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsapp}?text=${encodedMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-24 right-6 md:bottom-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.4)] transition-shadow will-change-transform"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}
