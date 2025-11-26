import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface SearchInputProps {
  initialQuery?: string;
}

const BlackSearchIcon = () => (
  <svg height="36" width="36" viewBox="0 0 24 24" fill="black">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const BsX = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-x"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </svg>
);

export default function SearchButton({ initialQuery = '' }: SearchInputProps) {
  const [value, setValue] = useState(initialQuery);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const url = new URL(window.location.href);
    if (term.trim()) {
      url.searchParams.set('q', term.trim());
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url);
    
    // Dispara un evento para que Astro reaccione
    window.dispatchEvent(new CustomEvent('search-change'));
  }, 600);

  const clearSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    setValue('');
    handleSearch('');
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
        <BlackSearchIcon />
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          setValue(val);
          handleSearch(val);
        }}
        placeholder="¿Qué quieres escuchar?"
        className="w-full h-12 pl-14 pr-12 bg-[#181818] text-white rounded-full placeholder-gray-400 text-base font-medium focus:outline-none focus:bg-[#282828] focus:ring-2 focus:ring-white/20 hover:bg-[#282828] transition-all duration-200 caret-green-400
        
        [&::-webkit-search-cancel-button]:hidden
        [&::-webkit-search-results-decoration]:hidden
        "
      />
      {value && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-4 flex items-center text-white/70 hover:text-white transition"
          aria-label="Limpiar búsqueda"
        >
          <BsX />
        </button>
      )}
    </div>
  );
}
