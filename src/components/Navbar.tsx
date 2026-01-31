import { LogOut, User, Bell, Search, Menu } from 'lucide-react';

export default function Navbar({ onLogout }: { onLogout: () => void }) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2 cursor-pointer group">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
            P  
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">Prototype</span>
        </div>

        <div className="hidden md:flex items-center bg-slate-100 px-3 py-1.5 rounded-full w-64 group focus-within:ring-2 focus-within:ring-primary/10 transition-all border border-transparent focus-within:border-primary/20">
          <Search size={16} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            className="bg-transparent text-sm w-full outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        
        <div className="h-8 w-[1px] bg-slate-100 hidden sm:block" />

        <div className="flex items-center space-x-3 group cursor-pointer pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">Paramveer Kushwaha</p>
            <p className="text-xs text-slate-500 mt-1">Enterprise Plan</p>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
              <User size={24} className="text-slate-400 translate-y-1" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          
          <div className="absolute top-14 right-6 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <button className="w-full px-4 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center">
              <User size={16} className="mr-2" /> Profile
            </button>
            <div className="h-[1px] bg-slate-50 my-1" />
            <button 
              onClick={onLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
            >
              <LogOut size={16} className="mr-2" /> Sign out
            </button>
          </div>
        </div>
        
        <button className="md:hidden p-2 text-slate-500">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
}
