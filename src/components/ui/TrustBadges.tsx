import { Award, Users, ShieldCheck } from "lucide-react";
import { STORE_DETAILS } from "@/lib/constants";

export default function TrustBadges() {
  return (
    <section className="py-16 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <Award className="text-brand-gold w-12 h-12 mb-4" />
            <h3 className="font-playfair text-xl mb-2">Hallmark Certified</h3>
            <p className="text-gray-500 text-sm">100% pure & certified gold and diamond jewellery.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <Users className="text-brand-gold w-12 h-12 mb-4" />
            <h3 className="font-playfair text-xl mb-2">Trusted in Dhanbad</h3>
            <p className="text-gray-500 text-sm">Trusted by hundreds of happy customers in Dhanbad.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <ShieldCheck className="text-brand-gold w-12 h-12 mb-4" />
            <h3 className="font-playfair text-xl mb-2">Since {STORE_DETAILS.since}</h3>
            <p className="text-gray-500 text-sm">A legacy of purity, trust, and exceptional craftsmanship.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
