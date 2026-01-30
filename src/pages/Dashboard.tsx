import { useNavigate } from 'react-router-dom';
import {
  Languages,
  BookOpen,
  Calculator,
  Beaker,
  ScrollText,
  MoreHorizontal
} from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import Navbar from '../components/Navbar';

const CATEGORIES = [
  {
    id: 'hindi',
    title: 'Hindi',
    icon: Languages,
    color: 'bg-orange-500',
    description: 'Explore classic literature, grammar, and linguistic heritage of Northern India.'
  },
  {
    id: 'english',
    title: 'English',
    icon: BookOpen,
    color: 'bg-blue-500',
    description: 'Master global communication with literature analysis and writing proficiency.'
  },
  {
    id: 'maths',
    title: 'Maths',
    icon: Calculator,
    color: 'bg-emerald-500',
    description: 'Solve complex problems using advanced calculus, algebra, and geometry.'
  },
  {
    id: 'science',
    title: 'Science',
    icon: Beaker,
    color: 'bg-indigo-500',
    description: 'Uncover the laws of physics, chemical reactions, and biological wonders.'
  },
  {
    id: 'history',
    title: 'History',
    icon: ScrollText,
    color: 'bg-amber-600',
    description: 'Journey through time and understand the civilizations that shaped our world.'
  },
  {
    id: 'other',
    title: 'Other',
    icon: MoreHorizontal,
    color: 'bg-slate-500',
    description: 'Access miscellaneous learning resources and interdisciplinary studies.'
  }
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleCategoryClick = (id: string) => {
    navigate(`/chat/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Learning Pathways
          </h1>
          <p className="text-slate-500 mt-3 text-lg">
            Choose a specialized category to start your AI-assisted learning session.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {CATEGORIES.map((cat, index) => (
            <div 
              key={cat.id} 
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-in fade-in zoom-in duration-500"
            >
              <CategoryCard
                title={cat.title}
                icon={cat.icon}
                color={cat.color}
                description={cat.description}
                onClick={() => handleCategoryClick(cat.id)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
