import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  slug: string;
  price?: string;
  image: string;
  category: string;
  priority?: boolean;
}

export default function ProductCard({ name, slug, price, image, category, priority = false }: ProductCardProps) {
  return (
    <Link href={`/product/${slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all duration-500 hover:-translate-y-2 hover:scale-105">
        <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
          <Image
            src={image}
            alt={`${name} in Dhanbad`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="p-6 text-center">
          <p className="text-xs text-brand-gold uppercase tracking-widest mb-2">{category}</p>
          <h3 className="font-playfair text-lg text-brand-black mb-2">{name}</h3>
          {price && <p className="text-sm font-medium text-gray-600">{price}</p>}
          <div className="mt-4 inline-block px-6 py-2 border border-brand-gold text-brand-black text-xs uppercase tracking-wider group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
}
