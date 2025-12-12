import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategorySelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<string>('');

  const categories = [
    { id: 'fb', icon: 'coffee', label: 'F&B / Coffee Shop' },
    { id: 'tech', icon: 'dns', label: 'Technology / SaaS' },
    { id: 'fashion', icon: 'styler', label: 'Fashion / Retail' },
    { id: 'service', icon: 'handshake', label: 'Jasa Professional' },
    { id: 'beauty', icon: 'spa', label: 'Beauty & Wellness' },
    { id: 'content', icon: 'video_camera_front', label: 'Content Creator' },
  ];

  const handleContinue = () => {
    const finalCategory = customCategory.trim() ? customCategory : selectedCategory;
    if (finalCategory) {
      localStorage.setItem('businessCategory', finalCategory);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 md:p-12">
        
        <div className="text-center mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
            <span className="material-symbols-outlined text-2xl">category</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#111118]">Satu langkah lagi...</h1>
          <p className="mt-2 text-[#616189]">Apa kategori bisnis yang sedang Anda bangun?</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.label);
                setCustomCategory('');
              }}
              className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                selectedCategory === cat.label && !customCategory 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-[#f0f0f4] hover:border-primary/50 text-[#616189] hover:text-[#111118]'
              }`}
            >
              <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
              <span className="text-xs font-bold text-center">{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="mb-8">
          <label className="block text-xs font-bold text-[#616189] uppercase mb-2 text-center">Atau ketik kategori lain</label>
          <input
            type="text"
            value={customCategory}
            onChange={(e) => {
              setCustomCategory(e.target.value);
              setSelectedCategory('');
            }}
            placeholder="Contoh: Otomotif, Pendidikan, Real Estate..."
            className="w-full h-12 px-4 rounded-xl border border-[#dbdbe6] text-center text-sm font-semibold focus:border-primary focus:ring-primary"
          />
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedCategory && !customCategory}
          className="w-full h-12 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none"
        >
          Masuk Dashboard
        </button>

      </div>
    </div>
  );
};

export default CategorySelection;