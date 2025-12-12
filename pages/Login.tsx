import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const [identifier, setIdentifier] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save identifier to localStorage for Dashboard personalization
    if (identifier.trim()) {
        localStorage.setItem('userIdentifier', identifier);
    } else {
        localStorage.setItem('userIdentifier', 'Pengguna');
    }

    // Proceed to Plan Selection
    navigate('/plans');
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background-light p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        
        {/* Left Side - Form */}
        <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12">
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </div>
              <h1 className="text-xl font-bold text-[#111118]">BrandingKilat</h1>
            </div>
            <h2 className="text-3xl font-black text-[#111118]">Selamat Datang</h2>
            <p className="mt-2 text-[#616189]">Bangun identitas brand Anda dalam hitungan detik.</p>
          </div>

          {/* Auth Method Tabs */}
          <div className="mb-6 flex rounded-lg bg-[#f6f6f8] p-1">
            <button 
              onClick={() => setMethod('whatsapp')}
              className={`flex-1 rounded-md py-2 text-sm font-bold transition-all ${method === 'whatsapp' ? 'bg-white text-primary shadow-sm' : 'text-[#616189] hover:text-[#111118]'}`}
            >
              WhatsApp
            </button>
            <button 
              onClick={() => setMethod('email')}
              className={`flex-1 rounded-md py-2 text-sm font-bold transition-all ${method === 'email' ? 'bg-white text-primary shadow-sm' : 'text-[#616189] hover:text-[#111118]'}`}
            >
              Email
            </button>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {method === 'whatsapp' ? (
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase text-[#616189]">Nomor WhatsApp</label>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l-lg border border-r-0 border-[#dbdbe6] bg-[#f6f6f8] px-3 text-sm font-bold text-gray-500">
                    +62
                  </span>
                  <input 
                    type="tel" 
                    required
                    placeholder="812 3456 7890"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="block w-full rounded-r-lg border border-[#dbdbe6] px-4 py-2.5 text-sm font-semibold text-[#111118] focus:border-primary focus:ring-primary" 
                  />
                </div>
                <p className="mt-2 text-[11px] text-[#616189]">Kami akan mengirimkan kode verifikasi OTP ke nomor ini.</p>
              </div>
            ) : (
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase text-[#616189]">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="nama@bisnis.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="block w-full rounded-lg border border-[#dbdbe6] px-4 py-2.5 text-sm font-semibold text-[#111118] focus:border-primary focus:ring-primary" 
                />
              </div>
            )}

            <button 
              type="submit" 
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-transform hover:bg-blue-700 active:scale-[0.98]"
            >
              Masuk / Daftar
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#dbdbe6]"></div>
            <span className="text-xs font-medium text-[#616189]">Atau masuk dengan</span>
            <div className="h-px flex-1 bg-[#dbdbe6]"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-[#dbdbe6] bg-white py-2.5 text-sm font-bold text-[#111118] transition-colors hover:bg-gray-50">
               <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
               Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-[#dbdbe6] bg-white py-2.5 text-sm font-bold text-[#111118] transition-colors hover:bg-gray-50">
               <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="h-5 w-5" />
               Facebook
            </button>
          </div>
        </div>

        {/* Right Side - Image/Hero */}
        <div className="hidden w-1/2 bg-[#111118] md:flex relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-[#111118] z-10"></div>
            <img src="https://picsum.photos/800/1200" alt="Branding" className="h-full w-full object-cover opacity-60" />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 text-white">
                <h3 className="text-2xl font-bold mb-2">Revolusi Branding UMKM</h3>
                <p className="text-white/80 leading-relaxed">Gunakan kekuatan AI untuk membuat logo, palet warna, dan konten sosial media dalam hitungan detik. Hemat waktu, hemat biaya.</p>
                
                <div className="flex gap-2 mt-6">
                    <div className="h-1.5 w-8 rounded-full bg-white"></div>
                    <div className="h-1.5 w-2 rounded-full bg-white/30"></div>
                    <div className="h-1.5 w-2 rounded-full bg-white/30"></div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Login;