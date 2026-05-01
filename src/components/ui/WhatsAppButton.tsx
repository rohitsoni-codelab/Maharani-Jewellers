"use client";

import { MessageCircle } from "lucide-react";
import { STORE_DETAILS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function WhatsAppButton({ message = "Hi, I'm interested in your jewellery collection." }: { message?: string }) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsapp}?text=${encodedMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 md:bottom-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:scale-105 transition-transform"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}
