import { memo } from 'react';
import { ClipboardList } from 'lucide-react';

function HeaderComponent() {
  return (
    <header className="bg-primary-500 text-white py-4 px-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
        <ClipboardList className="w-8 h-8" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
          TO DO LIST
        </h1>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
