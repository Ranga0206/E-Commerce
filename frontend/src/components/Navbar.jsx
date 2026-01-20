import { Link } from "react-router-dom";
import { Search, ShoppingBag, ShoppingCart, User } from "lucide-react";
const Navbar = () => {
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

                    <Link className="hidden sm:flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" to="/register">
                        <User size={18} />
                        Register
                    </Link>
                </div>
            </div>
        </nav >
    )
}

export default Navbar