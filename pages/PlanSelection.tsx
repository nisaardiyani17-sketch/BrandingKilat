import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlanSelection: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSelectPlan = (plan: 'Free' | 'Pro') => {
    // Store plan in localStorage to simulate state persistence
    localStorage.setItem('userPlan', plan);
    // Navigate to Category Selection (Next Onboarding Step)
    navigate('/category');
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] py-12 px-4 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-black text-[#111118] md:text-4xl">Pilih Paket Branding Anda</h1>
            <p className="text-[#616189] max-w-2xl mx-auto">Mulai dengan gratis atau buka potensi penuh brand Anda dengan fitur Pro. Anda bisa mengubah paket kapan saja.</p>
            
            <div className="mt-8 inline-flex items-center rounded-full border border-[#dbdbe6] bg-white p-1">
                <button 
                    onClick={() => setBillingCycle('monthly')}
                    className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-[#111118] text-white shadow-md' : 'text-[#616189] hover:text-[#111118]'}`}
                >
                    Bulanan
                </button>
                <button 
                    onClick={() => setBillingCycle('yearly')}
                    className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${billingCycle === 'yearly' ? 'bg-[#111118] text-white shadow-md' : 'text-[#616189] hover:text-[#111118]'}`}
                >
                    Tahunan <span className="ml-1 text-[10px] text-green-400">Hemat 20%</span>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Free Plan */}
            <div className="relative rounded-3xl border border-[#dbdbe6] bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-xl font-bold text-[#111118]">Starter / Free</h3>
                <div className="my-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-[#111118]">Rp 0</span>
                    <span className="text-[#616189]">/ bulan</span>
                </div>
                <p className="mb-6 text-sm text-[#616189] min-h-[40px]">Cocok untuk UMKM yang baru memulai perjalanan branding mereka.</p>
                
                <button 
                    onClick={() => handleSelectPlan('Free')}
                    className="w-full rounded-xl border-2 border-[#111118] bg-transparent py-3 text-sm font-bold text-[#111118] transition-colors hover:bg-[#111118] hover:text-white"
                >
                    Pilih Paket Gratis
                </button>

                <div className="mt-8 flex flex-col gap-4">
                    <p className="text-xs font-bold uppercase text-[#616189]">Apa yang Anda dapatkan:</p>
                    <ul className="flex flex-col gap-3">
                        {['1 Brand Identity', 'Generate Logo Dasar', 'Palet Warna AI', '5 Kredit Generasi / bulan', 'Akses Komunitas'].map((item) => (
                            <li key={item} className="flex items-center gap-3 text-sm text-[#111118]">
                                <span className="material-symbols-outlined text-[18px] text-green-500">check_circle</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-3xl border-2 border-primary bg-white p-8 shadow-xl transition-all transform md:-mt-4">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white shadow-md uppercase tracking-wider">
                    Rekomendasi
                </div>
                <h3 className="text-xl font-bold text-[#111118]">Pro Business</h3>
                <div className="my-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-[#111118]">{billingCycle === 'monthly' ? 'Rp 99rb' : 'Rp 79rb'}</span>
                    <span className="text-[#616189]">/ bulan</span>
                </div>
                <p className="mb-6 text-sm text-[#616189] min-h-[40px]">Untuk bisnis yang serius ingin meningkatkan citra brand di semua platform.</p>
                
                <button 
                    onClick={() => handleSelectPlan('Pro')}
                    className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-blue-700 hover:shadow-primary/40 active:scale-[0.98]"
                >
                    Mulai Trial Pro
                </button>

                <div className="mt-8 flex flex-col gap-4">
                    <p className="text-xs font-bold uppercase text-[#616189]">Semua fitur gratis, plus:</p>
                    <ul className="flex flex-col gap-3">
                        {[
                            'Unlimited Brand Identities', 
                            'Export Vector (SVG, EPS)', 
                            'Generate Social Media Posts', 
                            'Integrasi WhatsApp Bot',
                            '100 Kredit Generasi / bulan',
                            'Prioritas Support'
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-3 text-sm text-[#111118] font-medium">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                                    <span className="material-symbols-outlined text-[14px] text-primary">check</span>
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;