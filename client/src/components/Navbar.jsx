import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
import { useTheme } from "../contexts/ThemeContext";

const BookIcon = () => (
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
)

const Navbar = (props) => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experience', path: '/' },
        { name: 'About', path: '/' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {openSignIn} = useClerk()
    const {user} = useUser()
    const navigate = useNavigate()
    const location = useLocation()
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        setIsScrolled(prev => location.pathname !== '/' ? true : prev) 
        
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    const navStateClass = isScrolled
      ? (theme === 'dark'
          ? "bg-surface/95 shadow-card text-[var(--text)] backdrop-blur-lg py-3 md:py-4"
          : "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4")
      : (theme === 'dark' ? "py-4 md:py-6 text-[var(--text)]" : "py-4 md:py-6");

    return (
            <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${navStateClass}`}>

                {/* Logo */}
                <Link to='/'>
                    <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled ? (theme === 'dark' ? 'opacity-80' : 'invert opacity-80') : (theme === 'dark' ? 'opacity-100' : '')}`} />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <a
                          key={i}
                          href={link.path}
                          className={`group flex flex-col gap-0.5 ${
                            isScrolled
                              ? (theme === 'dark' ? "text-[var(--text)]" : "text-gray-700")
                              : (theme === 'dark' ? "text-[var(--text)]" : "text-white")
                          }`}
                        >
                            {link.name}
                            <div className={`${isScrolled ? (theme === 'dark' ? "bg-[rgba(255,255,255,0.06)]" : "bg-gray-700") : (theme === 'dark' ? "bg-[rgba(255,255,255,0.06)]" : "bg-white")} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </a>
                    ))}
                    <button
                      className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all ${isScrolled ? (theme === 'dark' ? 'text-[var(--text)]' : 'text-black') : (theme === 'dark' ? 'text-[var(--text)]' : 'text-white')}`}
                      onClick={()=> navigate('/owner')}
                    >
                        Dashboard
                    </button>
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    <img src={assets.searchIcon} alt="search" className={`${isScrolled && theme !== 'dark' ? 'invert' : ''} h-7 transition-all duration-500 hover:cursor-pointer`}/>

                    {/* Theme toggle placed between search icon and user/profile */}
                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        {theme === "dark" ? (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
                        </svg>
                        ) : (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                        )}
                    </button>

                    {user ? (<UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label="My Bookings" labelIcon={<BookIcon/>} onClick={()=> navigate('/my-bookings')}/>
                        </UserButton.MenuItems>
                    </UserButton>) : (<button onClick={openSignIn} className={`${theme === 'dark' ? 'bg-[var(--primary)] text-white px-4 py-2.5 rounded-full' : 'bg-black text-white px-8 py-2.5 rounded-full ml-4'} transition-all duration-500`}>
                        Login
                    </button>)}
                    
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    {user && <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label="My Bookings" labelIcon={<BookIcon/>} onClick={()=> navigate('/my-bookings')}/>
                        </UserButton.MenuItems>
                    </UserButton>}
                    <img onClick={()=> setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="" className={`${isScrolled && theme !== 'dark' ? 'invert' : ''} h-4`}/>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen flex flex-col md:hidden items-center justify-center gap-6 font-medium transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} ${theme === 'dark' ? 'bg-surface text-[var(--text)]' : 'bg-white text-gray-800'}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <img src={assets.closeIcon} alt="close-menu" className={`h-6.5 ${theme === 'dark' ? '' : ''}`}/>
                    </button>

                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)} className={`${theme === 'dark' ? 'text-[var(--text)]' : ''}`}>
                            {link.name}
                        </a>
                    ))}

                    {user && <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all ${theme === 'dark' ? 'text-[var(--text)] border-card-border' : ''}`} onClick={()=> navigate('/owner')}>
                        Dashboard
                    </button>}

                    {!user && <button onClick={openSignIn} className={`px-8 py-2.5 rounded-full transition-all duration-500 ${theme === 'dark' ? 'bg-[var(--primary)] text-white' : 'bg-black text-white'}`}>
                        Login
                    </button>}
                </div>

            </nav>
    );
}

export default Navbar