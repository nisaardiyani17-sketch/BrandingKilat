import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditBranding: React.FC = () => {
  const navigate = useNavigate();
  
  // State for brand colors
  const [brandColors, setBrandColors] = useState({
    primary: '#1313ec',
    secondary: '#111118',
    accent: '#FF6B6B'
  });
  
  const [font, setFont] = useState('Manrope');

  // State for brand guidelines
  const [guidelines, setGuidelines] = useState({
    logoRules: 'Do not stretch or distort the logo. Maintain at least 20px clear space around the mark.',
    colorRules: 'Use Primary Blue for main actions and backgrounds. Use Accent Red sparingly for alerts.',
    typographyRules: 'Headings should always be bold. Body text size must be at least 16px for readability.'
  });

  const themes = [
    { name: 'Classic Blue', primary: '#1313ec', secondary: '#111118', accent: '#FF6B6B' },
    { name: 'Emerald', primary: '#059669', secondary: '#064e3b', accent: '#fbbf24' },
    { name: 'Vibrant Pink', primary: '#ec135a', secondary: '#1f1015', accent: '#3b82f6' },
    { name: 'Dark Mode', primary: '#111827', secondary: '#f3f4f6', accent: '#8b5cf6' },
  ];

  const handleColorChange = (key: keyof typeof brandColors, value: string) => {
    setBrandColors(prev => ({ ...prev, [key]: value }));
  };

  const handleGuidelineChange = (key: keyof typeof guidelines, value: string) => {
    setGuidelines(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background-light">
      {/* Top Nav */}
      <header className="flex items-center justify-between border-b border-[#dbdbe6] bg-white px-6 py-3 z-20">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="hover:bg-gray-100 p-1 rounded-md">
                 <div className="size-8 text-primary">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 48 48">
                    <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                </div>
            </button>
          <h2 className="text-lg font-bold">BrandingKilat</h2>
        </div>
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')} className="text-[#616189] text-sm font-medium hover:text-primary">Dashboard</button>
            <span className="material-symbols-outlined text-[#616189] text-base">chevron_right</span>
            <span className="text-[#111118] text-sm font-bold">Edit Branding</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex h-9 items-center justify-center rounded-lg bg-primary/10 px-4 text-sm font-bold text-primary hover:bg-primary/20">
            Export Assets
          </button>
          <button className="flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative">
        {/* Editor Sidebar */}
        <aside className="w-full md:w-[360px] flex flex-col border-r border-[#dbdbe6] bg-white overflow-y-auto shrink-0 z-10 shadow-lg md:shadow-none absolute md:relative h-full">
          <div className="p-5 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-black tracking-tight text-[#111118]">Fine-tune Brand</h1>
              <p className="text-[#616189] text-sm">Customize your AI-generated identity.</p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Color Palette Accordion */}
              <details className="group rounded-xl border border-[#dbdbe6] open:bg-white transition-all">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 bg-[#fbfbfc] hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-blue-100 text-primary rounded-md">
                      <span className="material-symbols-outlined text-[18px]">palette</span>
                    </div>
                    <span className="text-[#111118] text-sm font-bold">Color Palette</span>
                  </div>
                  <span className="material-symbols-outlined text-[#616189] group-open:-rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-4 pt-4 pb-4 flex flex-col gap-5">
                  
                  {/* Primary Color Control */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="relative overflow-hidden size-10 rounded-full shadow-sm ring-1 ring-black/10 shrink-0">
                           <input 
                              type="color" 
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 border-0 cursor-pointer" 
                              value={brandColors.primary} 
                              onChange={(e) => handleColorChange('primary', e.target.value)} 
                           />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-[#111118]">Primary</span>
                            <span className="text-[10px] text-[#616189]">Dominant brand color</span>
                        </div>
                    </div>
                    <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-[#616189] select-none">#</span>
                        <input 
                            type="text" 
                            value={brandColors.primary.replace('#', '')}
                            onChange={(e) => handleColorChange('primary', `#${e.target.value}`)}
                            className="w-20 pl-4 pr-2 py-1 text-xs font-mono border border-[#dbdbe6] rounded focus:ring-1 focus:ring-primary focus:border-primary uppercase"
                            maxLength={6}
                        />
                    </div>
                  </div>

                  {/* Secondary Color Control */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="relative overflow-hidden size-10 rounded-full shadow-sm ring-1 ring-black/10 shrink-0">
                           <input 
                              type="color" 
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 border-0 cursor-pointer" 
                              value={brandColors.secondary} 
                              onChange={(e) => handleColorChange('secondary', e.target.value)} 
                           />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-[#111118]">Secondary</span>
                            <span className="text-[10px] text-[#616189]">Text & backgrounds</span>
                        </div>
                    </div>
                    <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-[#616189] select-none">#</span>
                        <input 
                            type="text" 
                            value={brandColors.secondary.replace('#', '')}
                            onChange={(e) => handleColorChange('secondary', `#${e.target.value}`)}
                            className="w-20 pl-4 pr-2 py-1 text-xs font-mono border border-[#dbdbe6] rounded focus:ring-1 focus:ring-primary focus:border-primary uppercase"
                            maxLength={6}
                        />
                    </div>
                  </div>

                  {/* Accent Color Control */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="relative overflow-hidden size-10 rounded-full shadow-sm ring-1 ring-black/10 shrink-0">
                           <input 
                              type="color" 
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 border-0 cursor-pointer" 
                              value={brandColors.accent} 
                              onChange={(e) => handleColorChange('accent', e.target.value)} 
                           />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-[#111118]">Accent</span>
                            <span className="text-[10px] text-[#616189]">Highlights & CTAs</span>
                        </div>
                    </div>
                    <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-[#616189] select-none">#</span>
                        <input 
                            type="text" 
                            value={brandColors.accent.replace('#', '')}
                            onChange={(e) => handleColorChange('accent', `#${e.target.value}`)}
                            className="w-20 pl-4 pr-2 py-1 text-xs font-mono border border-[#dbdbe6] rounded focus:ring-1 focus:ring-primary focus:border-primary uppercase"
                            maxLength={6}
                        />
                    </div>
                  </div>

                   <div className="h-px bg-[#dbdbe6] w-full mt-2"></div>
                   
                   {/* Presets */}
                   <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold uppercase text-[#616189] tracking-wider">Theme Presets</span>
                        <div className="grid grid-cols-4 gap-2">
                            {themes.map((theme) => (
                                <button 
                                    key={theme.name}
                                    onClick={() => setBrandColors({
                                        primary: theme.primary,
                                        secondary: theme.secondary,
                                        accent: theme.accent
                                    })} 
                                    className="flex flex-col items-center gap-1 group"
                                    title={theme.name}
                                >
                                    <div className="size-8 rounded-full border-2 border-white ring-1 ring-gray-200 overflow-hidden flex transform group-hover:scale-110 transition-transform">
                                        <div className="w-1/2 h-full" style={{backgroundColor: theme.primary}}></div>
                                        <div className="w-1/2 h-full flex flex-col">
                                            <div className="h-1/2 w-full" style={{backgroundColor: theme.secondary}}></div>
                                            <div className="h-1/2 w-full" style={{backgroundColor: theme.accent}}></div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                   </div>
                </div>
              </details>

              {/* Typography */}
              <details className="group rounded-xl border border-[#dbdbe6] open:bg-white transition-all">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 bg-[#fbfbfc] hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-orange-100 text-orange-600 rounded-md">
                      <span className="material-symbols-outlined text-[18px]">match_case</span>
                    </div>
                    <span className="text-[#111118] text-sm font-bold">Typography</span>
                  </div>
                  <span className="material-symbols-outlined text-[#616189] group-open:-rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-4 pt-4 pb-5 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#616189]">Heading Font</label>
                    <select 
                        value={font}
                        onChange={(e) => setFont(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg border border-[#dbdbe6] text-sm focus:ring-primary focus:border-primary"
                    >
                      <option value="Manrope">Manrope (Bold)</option>
                      <option value="Inter">Inter (Bold)</option>
                      <option value="Playfair Display">Playfair Display</option>
                    </select>
                  </div>
                </div>
              </details>

              {/* Brand Guidelines (NEW) */}
              <details className="group rounded-xl border border-[#dbdbe6] open:bg-white transition-all" open>
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 bg-[#fbfbfc] hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-purple-100 text-purple-600 rounded-md">
                      <span className="material-symbols-outlined text-[18px]">menu_book</span>
                    </div>
                    <span className="text-[#111118] text-sm font-bold">Brand Guidelines</span>
                  </div>
                  <span className="material-symbols-outlined text-[#616189] group-open:-rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-4 pt-4 pb-5 flex flex-col gap-4">
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#616189] flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">pentagon</span>
                        Logo Usage Rules
                    </label>
                    <textarea 
                        value={guidelines.logoRules}
                        onChange={(e) => handleGuidelineChange('logoRules', e.target.value)}
                        rows={3}
                        className="w-full p-3 rounded-lg border border-[#dbdbe6] text-xs font-medium focus:ring-primary focus:border-primary resize-none bg-slate-50"
                        placeholder="e.g. Do not rotate..."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#616189] flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">palette</span>
                        Color System
                    </label>
                    <textarea 
                        value={guidelines.colorRules}
                        onChange={(e) => handleGuidelineChange('colorRules', e.target.value)}
                        rows={3}
                        className="w-full p-3 rounded-lg border border-[#dbdbe6] text-xs font-medium focus:ring-primary focus:border-primary resize-none bg-slate-50"
                        placeholder="e.g. Primary for CTA..."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#616189] flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">text_fields</span>
                        Typography
                    </label>
                    <textarea 
                        value={guidelines.typographyRules}
                        onChange={(e) => handleGuidelineChange('typographyRules', e.target.value)}
                        rows={3}
                        className="w-full p-3 rounded-lg border border-[#dbdbe6] text-xs font-medium focus:ring-primary focus:border-primary resize-none bg-slate-50"
                        placeholder="e.g. H1 for Hero..."
                    />
                  </div>

                </div>
              </details>

            </div>
          </div>
        </aside>

        {/* Canvas */}
        <section className="flex-1 bg-[#f0f0f4] relative overflow-hidden flex flex-col">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg border border-[#dbdbe6] px-4 py-2 flex items-center gap-4 z-20">
                <button className="p-1 text-[#616189] hover:text-[#111118]"><span className="material-symbols-outlined text-[20px]">undo</span></button>
                <div className="h-4 w-px bg-[#dbdbe6]"></div>
                <span className="text-xs font-bold">100%</span>
                <div className="h-4 w-px bg-[#dbdbe6]"></div>
                <button className="p-1 text-[#616189] hover:text-[#111118]"><span className="material-symbols-outlined text-[20px]">grid_view</span></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 pt-20 pb-20">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Main Logo Card */}
                    <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-[#dbdbe6]/50 p-10 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
                        <div className="flex items-center gap-6 transform scale-110 sm:scale-125">
                             <div 
                                className="size-20 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500" 
                                style={{backgroundColor: brandColors.primary}}
                             >
                                <svg className="size-12 text-white" fill="none" viewBox="0 0 48 48"><path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path></svg>
                            </div>
                            <div className="flex flex-col">
                                <h2 
                                    className="text-4xl md:text-5xl font-extrabold tracking-tight transition-all" 
                                    style={{fontFamily: font, color: brandColors.secondary}}
                                >
                                    BrandingKilat
                                </h2>
                                <p 
                                    className="font-bold tracking-widest text-xs uppercase mt-1" 
                                    style={{color: brandColors.accent}}
                                >
                                    Future of Branding
                                </p>
                            </div>
                        </div>
                        <span className="absolute bottom-4 text-xs text-[#616189] font-medium bg-gray-50 px-2 py-1 rounded">Primary Logo Lockup</span>
                    </div>

                    {/* Mobile App Mockup */}
                    <div className="lg:col-span-4 bg-[#f8f9fa] rounded-2xl shadow-sm border border-[#dbdbe6]/50 p-8 flex flex-col items-center justify-center min-h-[300px] relative">
                         <div className="relative w-[160px] h-[300px] bg-black rounded-[24px] border-[4px] border-[#333] shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-white" style={{backgroundImage: "url('https://picsum.photos/400/800')"}}>
                                <div className="absolute inset-0 bg-black/40"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 w-full px-4">
                                     <div 
                                        className="size-16 rounded-xl shadow-lg flex items-center justify-center mb-2" 
                                        style={{backgroundColor: brandColors.primary}}
                                     >
                                        <svg className="size-8 text-white" fill="none" viewBox="0 0 48 48"><path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path></svg>
                                    </div>
                                    <button 
                                        className="w-full py-2 rounded-lg text-xs font-bold text-white shadow-lg"
                                        style={{backgroundColor: brandColors.accent}}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                         </div>
                    </div>

                    {/* Guidelines Preview Card (New) */}
                    <div className="lg:col-span-12 bg-white rounded-2xl shadow-sm border border-[#dbdbe6]/50 p-6">
                        <h3 className="text-lg font-bold text-[#111118] mb-4 flex items-center gap-2">
                             <span className="material-symbols-outlined text-purple-600">menu_book</span>
                             Guidelines Preview
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-4 bg-[#fbfbfc] rounded-xl border border-[#f0f0f4]">
                                <span className="text-xs font-bold uppercase text-[#616189] mb-2 block">Logo Rules</span>
                                <p className="text-sm text-[#111118] leading-relaxed whitespace-pre-wrap">{guidelines.logoRules}</p>
                            </div>
                            <div className="p-4 bg-[#fbfbfc] rounded-xl border border-[#f0f0f4]">
                                <span className="text-xs font-bold uppercase text-[#616189] mb-2 block">Color System</span>
                                <p className="text-sm text-[#111118] leading-relaxed whitespace-pre-wrap">{guidelines.colorRules}</p>
                            </div>
                            <div className="p-4 bg-[#fbfbfc] rounded-xl border border-[#f0f0f4]">
                                <span className="text-xs font-bold uppercase text-[#616189] mb-2 block">Typography</span>
                                <p className="text-sm text-[#111118] leading-relaxed whitespace-pre-wrap">{guidelines.typographyRules}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default EditBranding;