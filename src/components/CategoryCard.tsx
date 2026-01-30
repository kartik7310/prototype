import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';


interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
  description: string;
}

export default function CategoryCard({ title, icon: Icon, color, onClick, description }: CategoryCardProps) {
  return (
    <button 
      onClick={onClick}
      className="group relative flex flex-col items-start p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300 text-left overflow-hidden active:scale-[0.98]"
    >
      {/* Background Accent */}
      <div className={cn(
        "absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500",
        color
      )} />

      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
        color,
        "bg-opacity-10"
      )}>
        <Icon className={cn("w-7 h-7", color.replace('bg-', 'text-'))} />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed pr-4">
        {description}
      </p>

      <div className="mt-8 flex items-center text-sm font-bold text-slate-900 group-hover:translate-x-1 transition-transform">
        <span>Explore module</span>
        <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </button>
  );
}
