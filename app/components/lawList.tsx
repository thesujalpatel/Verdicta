"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("/indian_laws_public_safety_final.json")
      .then((res) => res.json())
      .then((data: Law[]) => setLaws(data));
  }, []);

  const filteredLaws = laws.filter((law) => {
    const matchCategory = category === "all" || law.category === category;
    const matchSearch =
      law.title.toLowerCase().includes(search.toLowerCase()) ||
      law.section.toLowerCase().includes(search.toLowerCase()) ||
      law.explanation.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const categories = ["all", ...Array.from(new Set(laws.map((law) => law.category)))];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-primary mb-3">Know Your Rights <span className="text-foreground">🇮🇳</span></h2>

      <input
        type="text"
        placeholder="Search by keyword..."
        className="w-full border px-3 py-2 mb-4 rounded text-foreground bg-background"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex items-center gap-2 mb-6">
        <label htmlFor="category-select" className="text-sm text-muted-foreground">
          Sort by:
        </label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-sm px-3 py-1 rounded border text-foreground bg-background"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.replace("_", " ").toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredLaws.map((law, idx) => (
          <div
            key={idx}
            className="bg-background border border-foreground rounded-lg p-4 shadow-sm cursor-pointer hover:bg-muted"
            onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
          >
            <p className="text-sm text-muted-foreground">{law.section}</p>
            <h3 className="font-semibold text-md text-primary">{law.title}</h3>
            <p className="text-sm text-foreground mt-1"><strong>Law:</strong> {law.law_text}</p>

            {expandedIndex === idx && (
              <div className="text-sm mt-3 space-y-1 text-foreground">
                <p><strong>Explanation:</strong> {law.explanation}</p>
                <p><strong>Why It Matters:</strong> {law.why_it_matters}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
