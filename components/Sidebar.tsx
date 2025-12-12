import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [userPlan, setUserPlan] = useState('Free');

  useEffect(() => {
    // Check local storage for plan selection, default to Free
    const storedPlan = localStorage.getItem('userPlan');
    if (storedPlan) {
      setUserPlan(storedPlan);
    }
  }, []);

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return "flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary font-bold";
    }
    return "group flex items-center gap-3 rounded-lg px-3 py-2 text-[#616189] hover:bg-[#f0f0f4] hover:text-[#111118] font-medium transition-colors";
  };

  // Fungsi Alert untuk Sidebar Links
  const handleSidebarToolClick = (toolName: string, description: string) => {
    alert(`${toolName}: ${description}`);
  };

  return (
    <aside className="hidden w-64 flex-col border-r border-[#f0f0f4] bg-white flex-shrink-0 md:flex z-30">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col px-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </div>
              <h1 className="text-lg font-bold leading-normal text-[#111118]">BrandingKilat</h1>
            </div>
            <p className="mt-1 text-xs font-normal text-[#616189]">AI Branding Suite</p>
          </div>
          <nav className="flex flex-col gap-2">
            <NavLink to="/" className={({ isActive }) => getLinkClass('/')}>
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span className="text-sm">Dashboard</span>
            </NavLink>
            <NavLink to="/generator" className={({ isActive }) => getLinkClass('/generator')}>
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              <span className="text-sm">Brand Generator</span>
            </NavLink>
             <NavLink to="/assets" className={({ isActive }) => getLinkClass('/assets')}>
              <span className="material-symbols-outlined text-[20px]">folder_open</span>
              <span className="text-sm">Asset Library</span>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => getLinkClass('/settings')}>
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="text-sm">Settings</span>
            </NavLink>
            <NavLink to="/help" className={({ isActive }) => getLinkClass('/help')}>
              <span className="material-symbols-outlined text-[20px]">help</span>
              <span className="text-sm">Help</span>
            </NavLink>

            <div className="mt-4 pt-4 border-t border-[#f0f0f4]">
                <p className="text-xs font-bold uppercase text-[#616189] mb-3 px-2">Integrations</p>
                
                {/* Link 1: Quick Generator Tools */}
                <button 
                    onClick={() => handleSidebarToolClick("Quick Generator Tools", "Fitur ini tersedia untuk aset yang sudah dibeli di Asset Library.")}
                    className="w-full text-left flex items-center p-2 rounded-lg text-sm font-medium text-[#111118] hover:bg-primary/5 transition-colors"
                >
                    <span className="material-symbols-outlined mr-3 text-lg">magic_button</span>
                    Quick Generator Tools
                </button>
                
                {/* Link 2: Asisten Regulasi P-IRT */}
                <button 
                    onClick={() => handleSidebarToolClick("Asisten Regulasi P-IRT", "Modul Label P-IRT dan QR Code sudah siap digunakan.")}
                    className="w-full text-left flex items-center p-2 rounded-lg text-sm font-medium text-[#111118] hover:bg-primary/5 transition-colors"
                >
                    <span className="material-symbols-outlined mr-3 text-lg">gavel</span>
                    Asisten Regulasi P-IRT
                </button>
            </div>
          </nav>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="rounded-xl bg-gradient-to-br from-[#f0f0f4] to-white p-4 border border-[#f0f0f4]">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#616189]">Credits Used</span>
              <span className="text-xs font-bold text-[#111118]">{userPlan === 'Pro' ? '12/100' : '5/5'}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#dbdbe6]">
              <div 
                className={`h-full rounded-full ${userPlan === 'Pro' ? 'bg-primary w-[12%]' : 'bg-red-500 w-full'}`}
              ></div>
            </div>
            {userPlan !== 'Pro' && (
                <button 
                    onClick={() => window.location.hash = '#/plans'}
                    className="mt-3 w-full rounded text-xs font-bold text-primary hover:underline"
                >
                    Upgrade to Pro
                </button>
            )}
          </div>
          
           <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="size-9 rounded-full bg-slate-200 bg-center bg-cover border border-slate-200" style={{backgroundImage: "url('https://picsum.photos/100')"}}></div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900 leading-tight">Alex Designer</span>
              <div className="flex items-center gap-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${userPlan === 'Pro' ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-600'}`}>
                    {userPlan} Plan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;