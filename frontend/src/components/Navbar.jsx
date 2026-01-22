import { Link } from "react-router-dom";
import { Menu, Search, ShoppingBag, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const isAuthenticated = false;
    return (
        <nav className="sticky top-0 w-full bg-white shadow-md z-50">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* logo */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
                    <ShoppingBag />
                    <span>Shopping Hub</span>
                </Link>
                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/">Home</Link>
                    <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="">Products</Link>
                    <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="">About Us</Link>
                    <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="">Contact Us</Link>
                </div>
                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <form className="hidden sm:flex items-center border-slate-300 rounded-lg border overflow-hidden">
                        <input className="px-3 py-2 text-sm w-60 focus:outline-none" type="text" placeholder="Search Product" />
                        <button className="px-3 text-gray-500 hover:text-blue-600 transition">
                            <Search size={18} />
                        </button>
                    </form>
                    {/* cart */}
                    <Link className="relative  text-gray-700 hover:text-blue-600 transition" to="/cart">
                        <ShoppingCart size={24} />
                        <span className="absolute min-w-5 h-5 text-white bg-blue-600 text-xs font-semibold flex justify-center rounded-full -top-2 -right-2 items-center">6</span>
                    </Link>

                    {!isAuthenticated &&
                        <Link className="hidden sm:flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" to="/register">
                            <User size={18} />
                            Register
                        </Link>
                    }

                    {/* Hamburger */}
                    <button onClick={() => setOpen(!open)} className="text-gray-700 md:hidden">
                        {open ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 -translate-y-2"}`}>
                <div className="flex flex-col p-4 gap-4">
                    <Link onClick={() => setOpen(!open)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/">Home</Link>
                    <Link onClick={() => setOpen(!open)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="">Products</Link>
                    <Link onClick={() => setOpen(!open)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="">About Us</Link>
                    <Link onClick={() => setOpen(!open)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="">Contact Us</Link>
                </div>
            </div>
        </nav >
    )
}

export default Navbar