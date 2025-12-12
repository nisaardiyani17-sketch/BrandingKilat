import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

interface AssetFile {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  category: 'Logo' | 'Social' | 'Print' | 'Brand Kit';
  date: string;
  size: string;
  thumbnail: string;
}

const MOCK_ASSETS: AssetFile[] = [
  { id: '1', name: 'Primary Logo - Blue.png', type: 'image', category: 'Logo', date: 'Oct 24, 2023', size: '1.2 MB', thumbnail: 'https://picsum.photos/id/20/300/300' },
  { id: '2', name: 'Q3 Marketing Deck.pdf', type: 'document', category: 'Print', date: 'Oct 24, 2023', size: '4.5 MB', thumbnail: 'https://picsum.photos/id/24/300/300' },
  { id: '3', name: 'Instagram Story Frame.png', type: 'image', category: 'Social', date: 'Oct 22, 2023', size: '2.1 MB', thumbnail: 'https://picsum.photos/id/28/300/300' },
  { id: '4', name: 'Brand Guidelines v2.pdf', type: 'document', category: 'Brand Kit', date: 'Oct 20, 2023', size: '8.4 MB', thumbnail: 'https://picsum.photos/id/42/300/300' },
  { id: '5', name: 'Hero Banner Website.jpg', type: 'image', category: 'Social', date: 'Oct 18, 2023', size: '3.6 MB', thumbnail: 'https://picsum.photos/id/48/300/300' },
  { id: '6', name: 'Icon Set - Vector.svg', type: 'image', category: 'Logo', date: 'Oct 15, 2023', size: '0.5 MB', thumbnail: 'https://picsum.photos/id/60/300/300' },
];

const AssetLibrary: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = MOCK_ASSETS.filter(asset => {
    const matchesFilter = filter === 'All' || asset.type === filter.toLowerCase() || (filter === 'Logos' && asset.category === 'Logo');
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex h-screen w-full bg-background-light">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden relative">
        {/* Header */}
        <header className="flex w-full items-center justify-between border-b border-[#f0f0f4] bg-white px-6 py-4 md:px-8">
            <div>
                <h2 className="text-xl font-bold text-[#111118]">Asset Library</h2>
                <p className="text-sm text-[#616189]">Manage and organize your brand files.</p>
            </div>
            <div className="flex items-center gap-3">
                <button className="flex h-9 items-center justify-center gap-2 rounded-lg border border-[#dbdbe6] bg-white px-4 text-sm font-bold text-[#111118] hover:bg-[#f6f6f8]">
                    <span className="material-symbols-outlined text-[18px]">filter_list</span>
                    Filter
                </button>
                <button className="flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-sm shadow-primary/20 hover:bg-blue-700">
                    <span className="material-symbols-outlined text-[18px]">upload</span>
                    Upload
                </button>
            </div>
        </header>

        {/* Toolbar */}
        <div className="flex flex-col gap-4 p-6 md:px-8 pb-0">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-[#e0e0e6] p-1 rounded-lg self-start">
                    {['All', 'Image', 'Document', 'Logos'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${filter === tab ? 'bg-white text-[#111118] shadow-sm' : 'text-[#616189] hover:text-[#111118]'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                
                {/* Search */}
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#616189] text-[20px]">search</span>
                    <input 
                        type="text" 
                        placeholder="Search files..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-10 w-full md:w-64 rounded-lg border border-[#dbdbe6] pl-10 pr-4 text-sm focus:border-primary focus:ring-primary"
                    />
                </div>
             </div>
        </div>

        {/* Grid Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {filteredAssets.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredAssets.map((asset) => (
                        <div key={asset.id} className="group flex flex-col rounded-xl border border-[#f0f0f4] bg-white p-3 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                            <div className="relative aspect-square w-full mb-3 rounded-lg overflow-hidden bg-[#f6f6f8] border border-[#f0f0f4]">
                                {asset.type === 'image' ? (
                                    <img src={asset.thumbnail} alt={asset.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center flex-col gap-2">
                                        <span className="material-symbols-outlined text-4xl text-[#616189]">description</span>
                                        <span className="text-[10px] font-bold text-[#616189] uppercase">PDF</span>
                                    </div>
                                )}
                                
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button className="h-8 w-8 rounded-full bg-white text-[#111118] flex items-center justify-center hover:bg-primary hover:text-white transition-colors" title="Download">
                                        <span className="material-symbols-outlined text-[18px]">download</span>
                                    </button>
                                     <button className="h-8 w-8 rounded-full bg-white text-[#111118] flex items-center justify-center hover:bg-primary hover:text-white transition-colors" title="Preview">
                                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-1 px-1">
                                <h3 className="text-sm font-bold text-[#111118] truncate" title={asset.name}>{asset.name}</h3>
                                <div className="flex items-center justify-between text-xs text-[#616189]">
                                    <span>{asset.size}</span>
                                    <span>{asset.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-[#616189]">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">folder_off</span>
                    <p className="font-medium">No assets found</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default AssetLibrary;