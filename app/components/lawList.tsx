"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiCaretDown,
  PiMagnifyingGlass,
  PiInfoBold,
  PiCheckCircle,
} from "react-icons/pi";

interface Law {
  section: string;
  title: string;
  law_text: string;
  explanation: string;
  why_it_matters: string;
  category: string;
  tags: string[];
}

export default function LawList() {
  const [laws, setLaws] = useState<Law[]>([]);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("/indian_laws_public_safety_final.json")
      .then((res) => res.json())
      .then((data: Law[]) => {
        setLaws(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading laws:", error);
        setIsLoading(false);
      });
  }, []);

  // Extract all unique tags
  const allTags = Array.from(new Set(laws.flatMap((law) => law.tags || [])));

  // Filter laws based on search, category, and tags
  const filteredLaws = laws.filter((law) => {
    const matchCategory = category === "all" || law.category === category;
    const matchSearch =
      search === "" ||
      law.title.toLowerCase().includes(search.toLowerCase()) ||
      law.section.toLowerCase().includes(search.toLowerCase()) ||
      law.explanation.toLowerCase().includes(search.toLowerCase()) ||
      law.law_text.toLowerCase().includes(search.toLowerCase());

    const matchTags =
      activeTags.length === 0 ||
      (law.tags && activeTags.every((tag) => law.tags.includes(tag)));

    return matchCategory && matchSearch && matchTags;
  });

  // Extract categories for filter dropdown
  const categories = [
    "all",
    ...Array.from(new Set(laws.map((law) => law.category))),
  ];

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="py-8 px-4 md:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-cinzel)] text-primary mb-2">
          Indian Legal Code
        </h1>
        <p className="text-foreground/80 mb-8 max-w-2xl">
          Explore key laws from the Indian legal system, explained in simple
          language. Search, filter, and learn about your rights and
          responsibilities.
        </p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        className="bg-background rounded-lg p-5 shadow-md border border-foreground/10 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Search Bar */}
        <div className="relative mb-6">
          <PiMagnifyingGlass
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
            size={20}
          />
          <input
            type="text"
            placeholder="Search laws by keyword, section, or explanation..."
            className="w-full border border-foreground/20 px-10 py-3 rounded-md text-foreground bg-background placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <label
              htmlFor="category-select"
              className="block text-sm font-medium text-foreground/70 mb-1"
            >
              Filter by Category:
            </label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-foreground/20 text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all"
                    ? "All Categories"
                    : cat
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                </option>
              ))}
            </select>
          </div>

          {/* Tags Filter */}
          <div className="w-full md:w-2/3">
            <p className="text-sm font-medium text-foreground/70 mb-1">
              Filter by Tags:
            </p>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-colors ${
                    activeTags.includes(tag)
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-foreground/10 text-foreground/70 border border-transparent hover:bg-foreground/15"
                  }`}
                >
                  {activeTags.includes(tag) && <PiCheckCircle size={14} />}
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        className="mb-6 text-foreground/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {isLoading ? (
          <p>Loading laws...</p>
        ) : (
          <p>
            Found <span className="font-semibold">{filteredLaws.length}</span>{" "}
            laws matching your criteria
          </p>
        )}
      </motion.div>

      {/* Law Cards */}
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredLaws.length === 0 ? (
            <motion.div
              className="text-center py-16 text-foreground/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <PiInfoBold
                size={40}
                className="mx-auto mb-4 text-foreground/40"
              />
              <p className="text-lg">
                No laws found matching your search criteria.
              </p>
              <p className="mt-2">Try adjusting your filters or search term.</p>
            </motion.div>
          ) : (
            filteredLaws.map((law, idx) => (
              <motion.div
                layout
                key={law.section + idx}
                className="bg-background border border-foreground/20 rounded-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(0.1 + idx * 0.05, 1),
                }}
              >
                <div
                  className={`p-5 cursor-pointer hover:bg-foreground/5 transition-colors ${
                    expandedIndex === idx ? "border-b border-foreground/10" : ""
                  }`}
                  onClick={() =>
                    setExpandedIndex(expandedIndex === idx ? null : idx)
                  }
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">
                        {law.section}
                      </p>
                      <h3 className="font-semibold text-lg text-primary">
                        {law.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedIndex === idx ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PiCaretDown className="text-foreground/60" size={20} />
                    </motion.div>
                  </div>

                  <p className="text-base text-foreground/90 mt-2 leading-relaxed">
                    {law.law_text.length > 150 && expandedIndex !== idx
                      ? `${law.law_text.substring(0, 150)}...`
                      : law.law_text}
                  </p>

                  {/* Tags */}
                  {law.tags && law.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {law.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-foreground/10 rounded-full text-foreground/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-3 bg-foreground/5">
                        <div className="space-y-4 text-foreground/90">
                          <div>
                            <h4 className="font-medium text-foreground mb-1">
                              In Simple Terms:
                            </h4>
                            <p>{law.explanation}</p>
                          </div>

                          <div>
                            <h4 className="font-medium text-foreground mb-1">
                              Why It Matters:
                            </h4>
                            <p>{law.why_it_matters}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
