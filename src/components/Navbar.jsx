import { motion } from 'framer-motion';
import { Menu, X, Instagram, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Navbar = ({ scrolled }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { user, signOut } = useAuth();
    const isHome = location.pathname === '/';

    const navItems = [
        { name: 'Labs', path: '/labs' },
        { name: 'Library', path: '/library' },
        { name: 'Notes', path: '/notes', private: true }
    ];

    const scrollToSection = (id) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/70 backdrop-blur-xl border-b border-stone-200 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 z-50 group">
                    <Logo className="w-10 h-10 transition-transform group-hover:scale-110" />
                    <span className="font-serif font-bold text-xl tracking-tight text-stone-900 ml-2">
                        Piya LunaRose<span className="hidden sm:inline font-normal text-stone-400 ml-1 transition-colors group-hover:text-indigo-400">Studio</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {isHome && ['Services', 'Work', 'About', 'Investment', 'Contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 hover:text-stone-900 transition-all hover:translate-y-[-1px]"
                        >
                            {item}
                        </button>
                    ))}

                    <div className="h-4 w-px bg-stone-200 mx-2" />

                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:translate-y-[-1px] ${location.pathname === item.path ? 'text-indigo-600' : 'text-stone-500 hover:text-stone-900'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}

                    <a
                        href="mailto:Hello@lunarosedhealinghub.com?subject=Project Inquiry"
                        className="ml-4 px-6 py-2.5 bg-stone-900 text-white text-[10px] font-bold tracking-widest uppercase rounded-full hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-stone-900/10"
                    >
                        Request a Quote
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 p-2 text-stone-900"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-white/95 backdrop-blur-2xl z-40 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col items-center justify-center p-10`}>
                <div className="flex flex-col items-center gap-8 text-center">
                    {isHome && ['Services', 'Work', 'About'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className="text-3xl font-serif font-bold text-stone-900 hover:text-indigo-600 transition-colors"
                        >
                            {item}
                        </button>
                    ))}

                    <div className="w-12 h-px bg-stone-100 my-4" />

                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-3xl font-serif font-bold text-stone-900 hover:text-indigo-600 transition-colors"
                        >
                            LunaRose {item.name}
                        </Link>
                    ))}

                    <a
                        href="mailto:Hello@lunarosedhealinghub.com?subject=Project Inquiry"
                        className="mt-6 px-10 py-4 bg-stone-900 text-white font-bold rounded-2xl shadow-xl w-full"
                    >
                        Request a Quote
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
