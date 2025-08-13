import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Tab = "feed" | "profile" | "settings";

const Navbar = () => {
  const [activeTab, setActiveTab] = useLocalStorage<Tab>("activeTab", "feed");

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="flex bg-gray-100 p-3 shadow">
      {(["feed", "profile", "settings"] as Tab[]).map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === tab
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600 hover:text-blue-500"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
