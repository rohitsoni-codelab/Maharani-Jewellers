'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const PREDEFINED_CATEGORIES = [
  "Gold Jewellery", 
  "Diamond Jewellery", 
  "Bridal Collection", 
  "Rings", 
  "Earrings", 
  "Other"
];

export default function AdminForm({ userEmail, initialProducts = [] }: { userEmail: string, initialProducts: any[] }) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    customCategory: '',
    description: '',
    images: '',
    keywords: '',
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');
    setLoading(true);
    
    try {
      const finalCategory = formData.category === 'Other' ? formData.customCategory : formData.category;
      
      if (formData.category === 'Other' && !formData.customCategory) {
        setStatus('Error: Please enter a custom category name');
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        category: finalCategory,
        images: formData.images.split(',').map(s => s.trim()).filter(Boolean),
        keywords: formData.keywords.split(',').map(s => s.trim()).filter(Boolean),
      };
      
      const endpoint = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      if (data.success) {
        setStatus(editingId ? 'Product updated successfully!' : 'Product added successfully!');
        resetForm();
        router.refresh();
      } else {
        setStatus('Error: ' + data.error);
      }
    } catch (err) {
      setStatus('Failed to submit.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: any) => {
    const isPredefined = PREDEFINED_CATEGORIES.includes(product.category);
    
    setFormData({
      name: product.name || '',
      slug: product.slug || '',
      category: isPredefined ? product.category : 'Other',
      customCategory: isPredefined ? '' : product.category,
      description: product.description || '',
      images: (product.images || []).join(', '),
      keywords: (product.keywords || []).join(', '),
    });
    setEditingId(product._id);
    setStatus('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete ${name} permanently?`)) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete product");
      }
    } catch(e) {
      alert("Error deleting product");
    }
  };

  const resetForm = () => {
    setFormData({ name: '', slug: '', category: '', customCategory: '', description: '', images: '', keywords: '' });
    setEditingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-playfair">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden sm:block">{userEmail}</span>
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              {editingId && (
                <button type="button" onClick={resetForm} className="text-xs text-gray-500 hover:text-brand-black underline">
                  Cancel Edit
                </button>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input required type="text" className="w-full border p-2 rounded focus:ring-brand-gold focus:border-brand-gold text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug (URL)</label>
              <input required type="text" className="w-full border p-2 rounded focus:ring-brand-gold focus:border-brand-gold text-sm" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select required className="w-full border p-2 rounded focus:ring-brand-gold focus:border-brand-gold text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="">Select Category...</option>
                {PREDEFINED_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {formData.category === 'Other' && (
              <div>
                <label className="block text-sm font-medium mb-1">Custom Category Name</label>
                <input required type="text" className="w-full border p-2 rounded focus:ring-brand-gold focus:border-brand-gold text-sm" value={formData.customCategory} onChange={e => setFormData({...formData, customCategory: e.target.value})} placeholder="e.g. Platinum Chains" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea required className="w-full border p-2 rounded h-20 focus:ring-brand-gold focus:border-brand-gold text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Images (Comma separated URLs)</label>
              <input required type="text" className="w-full border p-2 rounded focus:ring-brand-gold focus:border-brand-gold text-sm" placeholder="/images/product.png" value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Keywords (Comma separated)</label>
              <input required type="text" className="w-full border p-2 rounded focus:ring-brand-gold focus:border-brand-gold text-sm" placeholder="gold ring, jewellery" value={formData.keywords} onChange={e => setFormData({...formData, keywords: e.target.value})} />
            </div>
            <button disabled={loading} type="submit" className="w-full bg-brand-black text-white py-3 rounded hover:bg-brand-gold transition-colors disabled:opacity-50 font-medium">
              {loading ? 'Processing...' : (editingId ? 'Update Product' : 'Add Product')}
            </button>
            {status && <p className="text-center text-sm font-medium mt-2">{status}</p>}
          </form>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-medium">Manage Products</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-sm border-b">
                    <th className="p-4 font-medium text-gray-600">Product</th>
                    <th className="p-4 font-medium text-gray-600">Category</th>
                    <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {initialProducts.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-gray-500">No products found. Add your first product!</td>
                    </tr>
                  ) : (
                    initialProducts.map(product => (
                      <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded object-cover border" />
                            ) : (
                              <div className="w-10 h-10 rounded bg-gray-100 border flex items-center justify-center text-xs text-gray-400">No Img</div>
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-xs text-gray-500 truncate max-w-[200px]">{product.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{product.category}</span>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleEdit(product)} className="text-blue-600 hover:underline px-3 py-1 mr-2 text-xs font-medium">Edit</button>
                          <button onClick={() => handleDelete(product._id, product.name)} className="text-red-600 hover:underline px-3 py-1 text-xs font-medium">Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
