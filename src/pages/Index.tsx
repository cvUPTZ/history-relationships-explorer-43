
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "@/components/Search";
import { Timeline } from "@/components/Timeline";
import { EntityCard } from "@/components/EntityCard";

const sampleEvents = [
  {
    id: "1",
    date: "1939",
    title: "World War II Begins",
    description: "Germany invades Poland, triggering the start of World War II in Europe.",
  },
  {
    id: "2",
    date: "1941",
    title: "Pearl Harbor Attack",
    description: "Japan attacks Pearl Harbor, leading to the United States entering World War II.",
  },
  {
    id: "3",
    date: "1945",
    title: "World War II Ends",
    description: "Germany and Japan surrender, marking the end of World War II.",
  },
];

const sampleEntity = {
  title: "World War II",
  type: "Event",
  description: "A global war that lasted from 1939 to 1945, involving most of the world's nations.",
  relationships: ["Nazi Germany", "Allied Powers", "Pearl Harbor", "Holocaust"],
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <header className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="sf-pro-display mb-2 text-4xl font-bold"
          >
            HistoryFlow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="sf-pro-text text-lg text-muted-foreground"
          >
            Explore historical relationships and events
          </motion.p>
        </header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Search onSearch={handleSearch} />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="sf-pro-display mb-4 text-2xl font-semibold">Timeline</h2>
            <Timeline events={sampleEvents} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="sf-pro-display mb-4 text-2xl font-semibold">Featured</h2>
            <EntityCard {...sampleEntity} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
