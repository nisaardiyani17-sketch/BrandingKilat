import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // WhatsApp Integration State
  const [showWaModal, setShowWaModal] = useState(false);
  const [waPhoneNumber, setWaPhoneNumber] = useState('');
  const [waStatus, setWaStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  
  // User Personalization State
  const [userName, setUserName] = useState('Pengguna');
  const [businessCategory, setBusinessCategory] = useState('Uncategorized');

  useEffect(() => {
    // Load personalization data from localStorage
    const storedName = localStorage.getItem('userIdentifier');
    const storedCategory = localStorage.getItem('businessCategory');
    
    if (storedName) setUserName(storedName);
    if (storedCategory) setBusinessCategory(storedCategory);
  }, []);

  const handleConnectWhatsApp = () => {
    setWaStatus('connecting');
    // Simulate API call
    setTimeout(() => {
        setWaStatus('connected');
        setShowWaModal(false);
    }, 2000);
  };

  const handleQuickCreateClick = (toolName: string) => {
    alert(`Quick Generator Tool ${toolName} aktif! Fitur ini tersedia untuk aset yang sudah dibeli di Asset Library.`);
  };

  return (
    <div className="flex h-screen w-full bg-background-light">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-y-auto relative">
        {/* Header */}
        <header className="sticky top-0 z-20 flex w-full items-center justify-between border-b border-[#f0f0f4] bg-white/90 px-6 py-4 backdrop-blur-md md:px-10">
          <div className="flex items-center gap-4">
            <button className="flex md:hidden text-[#616189]">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-[#111118]">Halo, {userName}!</h2>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden items-center gap-3 rounded-full bg-[#f6f6f8] px-3 py-1.5 md:flex">
              <span className="material-symbols-outlined text-lg text-[#616189]">search</span>
              <input 
                className="border-none bg-transparent text-sm text-[#111118] placeholder-[#616189] focus:ring-0 w-64" 
                placeholder="Search assets..." 
                type="text"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative text-[#616189] hover:text-primary">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 ring-2 ring-white">
                <img alt="Profile" className="h-full w-full object-cover" src="https://picsum.photos/200" />
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1200px] flex-1 p-6 md:p-10">
          
          {/* Hero Section */}
          <section className="mb-8 rounded-2xl border border-[#f0f0f4] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-1 gap-6">
                <div className="relative aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[#f0f0f4] bg-[#f8f9fa] p-2">
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
                    <span className="material-symbols-outlined text-4xl text-primary">auto_awesome</span>
                  </div>
                  <div className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 ring-2 ring-white">
                    <span className="material-symbols-outlined text-[14px] text-white">check</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold tracking-tight text-[#111118]">Mulai Branding Anda</h3>
                  <p className="text-base text-[#616189] mt-1">
                    Konsultasikan visi bisnis <span className="font-bold text-primary">{businessCategory}</span> Anda dengan AI kami untuk hasil instan.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{businessCategory}</span>
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Active</span>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                <button 
                  onClick={() => navigate('/editor')}
                  className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dbdbe6] bg-white px-4 text-sm font-bold text-[#111118] transition hover:bg-[#f6f6f8]"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  Edit Brand
                </button>
                <button 
                  onClick={() => navigate('/generator')}
                  className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
                >
                  <span className="material-symbols-outlined text-[18px]">chat_spark</span>
                  Start Chat Branding
                </button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column */}
            <div className="flex flex-col gap-8 lg:col-span-2">
              
              {/* Quick Create Section */}
              <div className="rounded-2xl border border-[#f0f0f4] bg-white p-5">
                  <h4 className="mb-4 text-base font-bold text-[#111118]">Quick Create</h4>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <button 
                        onClick={() => handleQuickCreateClick("Social Post")}
                        className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#f0f0f4] bg-[#fbfbfc] py-6 px-4 transition-all hover:border-primary hover:bg-primary/5 group"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-primary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[20px]">post_add</span>
                        </div>
                        <span className="text-sm font-bold text-[#111118]">Social Post</span>
                    </button>

                    <button 
                        onClick={() => handleQuickCreateClick("Business Card")}
                        className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#f0f0f4] bg-[#fbfbfc] py-6 px-4 transition-all hover:border-purple-500 hover:bg-purple-50 group"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform">
                             <span className="material-symbols-outlined text-[20px]">badge</span>
                        </div>
                        <span className="text-sm font-bold text-[#111118]">Business Card</span>
                    </button>

                    <button 
                        onClick={() => handleQuickCreateClick("Ad Campaign")}
                        className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#f0f0f4] bg-[#fbfbfc] py-6 px-4 transition-all hover:border-orange-500 hover:bg-orange-50 group"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 group-hover:scale-110 transition-transform">
                             <span className="material-symbols-outlined text-[20px]">campaign</span>
                        </div>
                        <span className="text-sm font-bold text-[#111118]">Ad Campaign</span>
                    </button>
                  </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Color Palette */}
                <div className="rounded-2xl border border-[#f0f0f4] bg-white p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-base font-bold text-[#111118]">Color Palette</h4>
                    <button onClick={() => navigate('/editor')} className="text-[#616189] hover:text-primary">
                      <span className="material-symbols-outlined text-[20px]">tune</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { color: '#1313EC', label: '#1313EC' },
                      { color: '#111118', label: '#111118' },
                      { color: '#616189', label: '#616189' },
                      { color: '#F6F6F8', label: '#F6F6F8' },
                    ].map((c) => (
                      <div key={c.label} className="group flex flex-col items-center gap-2">
                        <div 
                          className="h-12 w-12 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-100 transition group-hover:scale-110"
                          style={{ backgroundColor: c.color }}
                        ></div>
                        <span className="text-xs font-medium text-[#616189]">{c.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div className="rounded-2xl border border-[#f0f0f4] bg-white p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-base font-bold text-[#111118]">Typography</h4>
                    <button onClick={() => navigate('/editor')} className="text-[#616189] hover:text-primary">
                      <span className="material-symbols-outlined text-[20px]">tune</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#f6f6f8] text-3xl font-bold text-[#111118]">
                      Aa
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-[#111118]">Manrope</span>
                      <span className="text-sm text-[#616189]">Primary Font Family</span>
                      <div className="mt-1 flex gap-2">
                        <span className="text-xs font-normal text-[#616189]">Regular</span>
                        <span className="text-xs font-medium text-[#616189]">Medium</span>
                        <span className="text-xs font-bold text-[#616189]">Bold</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Asset Table */}
              <div className="rounded-2xl border border-[#f0f0f4] bg-white">
                <div className="flex items-center justify-between border-b border-[#f0f0f4] px-6 py-4">
                  <h3 className="text-lg font-bold text-[#111118]">Recent Assets</h3>
                  <a className="text-sm font-semibold text-primary hover:underline" href="#">View All</a>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-[#616189]">
                    <thead className="bg-[#f6f6f8] text-xs uppercase text-[#616189]">
                      <tr>
                        <th className="px-6 py-3 font-semibold">Asset Name</th>
                        <th className="px-6 py-3 font-semibold">Type</th>
                        <th className="px-6 py-3 font-semibold">Date</th>
                        <th className="px-6 py-3 font-semibold">Status</th>
                        <th className="px-6 py-3 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f4]">
                      <tr className="group hover:bg-[#fcfcfd]">
                        <td className="px-6 py-4 font-medium text-[#111118]">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-blue-100"></div>
                            Q3 Marketing Deck
                          </div>
                        </td>
                        <td className="px-6 py-4">Presentation</td>
                        <td className="px-6 py-4">Oct 24, 2023</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Ready</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-[#616189] hover:text-primary">
                            <span className="material-symbols-outlined text-[20px]">download</span>
                          </button>
                        </td>
                      </tr>
                      {/* More Rows */}
                      <tr className="group hover:bg-[#fcfcfd]">
                        <td className="px-6 py-4 font-medium text-[#111118]">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-purple-100"></div>
                            Instagram Story Set
                          </div>
                        </td>
                        <td className="px-6 py-4">Social Media</td>
                        <td className="px-6 py-4">Oct 22, 2023</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Ready</span>
                        </td>
                         <td className="px-6 py-4 text-right">
                          <button className="text-[#616189] hover:text-primary">
                            <span className="material-symbols-outlined text-[20px]">download</span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {/* Notifications */}
              <div className="rounded-2xl border border-[#f0f0f4] bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#111118]">Notifications</h3>
                  <button className="text-xs font-semibold text-primary hover:underline">Mark all read</button>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: 'check_circle', title: 'Assets Ready', desc: 'Your "Q3 Marketing Deck" is ready.', time: '2 hours ago', color: 'text-primary', bg: 'bg-blue-50' },
                    { icon: 'auto_awesome', title: 'New Feature', desc: 'AI Video Generation is now available.', time: '1 day ago', color: 'text-purple-600', bg: 'bg-purple-50' },
                    { icon: 'warning', title: 'Subscription Alert', desc: 'You have used 50% of your credits.', time: '3 days ago', color: 'text-yellow-600', bg: 'bg-yellow-50' },
                  ].map((notif, i) => (
                    <div key={i} className="flex gap-3">
                      <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${notif.bg} ${notif.color}`}>
                        <span className="material-symbols-outlined text-[16px]">{notif.icon}</span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-[#111118]">{notif.title}</p>
                        <p className="text-xs text-[#616189]">{notif.desc}</p>
                        <span className="mt-1 text-[10px] text-[#9ca3af]">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo / WhatsApp Status */}
              <div 
                className={`relative overflow-hidden rounded-2xl p-5 text-white transition-all ${waStatus === 'connected' ? 'bg-[#25D366]' : 'bg-[#128C7E]'}`}
              >
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined">chat</span>
                        <h3 className="font-bold">WhatsApp Bot</h3>
                     </div>
                     {waStatus === 'connected' && (
                        <span className="bg-white/20 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-white/30">Active</span>
                     )}
                  </div>
                  
                  <p className="text-xs font-medium opacity-90">
                    {waStatus === 'connected' 
                        ? 'Your BrandingKilat bot is active on +62 812-555-0199. Auto-reply enabled.' 
                        : 'Prefer chatting? Connect your account to our WhatsApp bot.'}
                  </p>
                  
                  {waStatus !== 'connected' ? (
                      <button 
                        onClick={() => setShowWaModal(true)}
                        className="mt-1 w-full rounded-lg bg-white py-2 text-xs font-bold text-[#128C7E] shadow-sm hover:bg-gray-50"
                      >
                        Connect WhatsApp
                      </button>
                  ) : (
                      <button 
                        onClick={() => setWaStatus('disconnected')}
                        className="mt-1 w-full rounded-lg border border-white/40 bg-transparent py-2 text-xs font-bold text-white hover:bg-white/10"
                      >
                        Manage Connection
                      </button>
                  )}
                </div>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-black opacity-10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Integration Modal */}
        {showWaModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
                    <div className="bg-[#128C7E] px-6 py-4 flex items-center justify-between">
                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                            <span className="material-symbols-outlined">chat</span>
                            WhatsApp Integration
                        </h3>
                        <button onClick={() => setShowWaModal(false)} className="text-white/80 hover:text-white">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    
                    <div className="p-6">
                        {waStatus === 'connecting' ? (
                            <div className="flex flex-col items-center justify-center py-8 gap-4">
                                <div className="size-12 rounded-full border-4 border-[#128C7E]/20 border-t-[#128C7E] animate-spin"></div>
                                <p className="text-sm font-semibold text-[#111118]">Connecting to WhatsApp Business API...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <p className="text-sm text-[#616189]">Enter your WhatsApp Business number to enable AI auto-replies and instant asset generation via chat.</p>
                                
                                <div>
                                    <label className="block text-xs font-bold text-[#616189] mb-1.5 uppercase">Phone Number</label>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-[#dbdbe6] bg-[#f6f6f8] text-gray-500 text-sm">
                                            +62
                                        </span>
                                        <input 
                                            type="tel" 
                                            className="block w-full rounded-r-lg border border-[#dbdbe6] text-sm focus:border-[#128C7E] focus:ring-[#128C7E]" 
                                            placeholder="812 3456 7890"
                                            value={waPhoneNumber}
                                            onChange={(e) => setWaPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg text-xs">
                                    <span className="material-symbols-outlined text-sm shrink-0">info</span>
                                    <p>We will send a verification code to this number.</p>
                                </div>

                                <div className="mt-2 flex justify-end gap-3">
                                    <button 
                                        onClick={() => setShowWaModal(false)}
                                        className="px-4 py-2 text-sm font-semibold text-[#616189] hover:bg-gray-100 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleConnectWhatsApp}
                                        disabled={!waPhoneNumber}
                                        className="px-4 py-2 text-sm font-bold text-white bg-[#128C7E] hover:bg-[#075E54] rounded-lg shadow-lg disabled:opacity-50 disabled:shadow-none transition-all"
                                    >
                                        Verify & Connect
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;