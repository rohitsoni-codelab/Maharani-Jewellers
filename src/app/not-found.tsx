import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-playfair text-6xl text-brand-gold mb-4">404</h1>
      <h2 className="text-2xl text-brand-black mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        We couldn't find the page you're looking for. It seems you are lost in our Katrash store. Explore our finest jewellery collections instead.
      </p>
      <Link href="/collections/gold" className="px-8 py-3 bg-brand-black text-white hover:bg-brand-gold transition-colors">
        Explore Collections
      </Link>
    </div>
  );
}
