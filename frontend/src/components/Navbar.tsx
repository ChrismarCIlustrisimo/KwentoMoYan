import React, { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Tab = "feed" | "settings";

const Navbar = () => {
  const [activeTab, setActiveTab] = useLocalStorage<Tab>("activeTab", "feed");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    if (tab !== "settings") setSettingsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login after logout
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-xl font-bold text-blue-600">
            KwentoMoYan
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <button
              onClick={() => handleTabClick("feed")}
              className={`px-3 py-2 font-medium transition-colors ${
                activeTab === "feed"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Feed
            </button>

            {/* Settings dropdown */}
            <div className="relative">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className={`px-3 py-2 font-medium transition-colors ${
                  activeTab === "settings"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-700 hover:text-blue-500"
                }`}
              >
                Settings
              </button>

              {settingsOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md">
                  <button
                    onClick={() => (window.location.href = "/profile")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {settingsOpen && (
          <div className="md:hidden bg-white shadow">
            <button
              onClick={() => handleTabClick("feed")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Feed
            </button>
            <button
              onClick={() => (window.location.href = "/profile")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
