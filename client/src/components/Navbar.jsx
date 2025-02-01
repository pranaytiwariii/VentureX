import { useState, useEffect } from "react";
import { Menu, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AuthModal from "../components/HomePage/AuthModel";
import logo from "../../public/HeroSection/layers.svg";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.7;
      setIsScrolled(window.scrollY > (isHomePage ? heroHeight - 80 : 0));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHomePage ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="" />
              <span
                className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled || !isHomePage ? "text-gray-900" : "text-black"
                }`}
              >
                VentureX
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <Link
                  to="/host"
                  className={`hidden md:flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                    isScrolled || !isHomePage
                      ? "border border-gray-300 hover:shadow-md"
                      : "text-black hover:bg-white/10"
                  }`}
                >
                  <span className="text-sm font-medium">Browse Start up</span>
                </Link>
              </div>

              <button
                onClick={() => setIsAuthModalOpen(true)}
                className={`hidden md:flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                  isScrolled || !isHomePage
                    ? "border border-gray-300 hover:shadow-md"
                    : "text-black hover:bg-white/10"
                }`}
              >
                <span className="text-sm font-medium">Sign In</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`flex items-center space-x-2 p-2 rounded-full cursor-pointer transition-all duration-300 ${
                    isScrolled || !isHomePage
                      ? "border border-gray-300 hover:shadow-md"
                      : "text-black hover:bg-white/10"
                  }`}
                >
                  <Menu className="w-5 h-5" />
                  <User className="w-5 h-5" />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <div className="flex items-center space-x-4">
                      <Link
                        to="/host"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <span className="text-sm font-medium">
                          Browse Start Ups
                        </span>
                      </Link>
                    </div>
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
