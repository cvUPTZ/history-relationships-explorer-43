
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onSearch: (query: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, onSearch]);

  return (
    <div className="relative">
      <div className="relative rounded-lg border bg-card shadow-sm">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          className="w-full rounded-lg bg-transparent py-2 pl-10 pr-4 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Search historical events, people, or places..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute mt-2 w-full rounded-lg border bg-card p-2 shadow-lg"
          >
            <div className="text-sm text-muted-foreground">
              Start typing to search...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
