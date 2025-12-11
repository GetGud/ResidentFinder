import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
            <div className="max-w-[1920px] mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                {/* Brand Column */}
                <div className="lg:col-span-1">
                    <Link to="/" className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-[#134e4a] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">ResidentFinder</span>
                    </Link>
                    <p className="text-sm leading-relaxed mb-6">
                        The most trusted rental resource. We verify listings so you can search with confidence and find your perfect home.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#134e4a] hover:text-white transition-colors">
                            <Facebook size={16} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#134e4a] hover:text-white transition-colors">
                            <Twitter size={16} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#134e4a] hover:text-white transition-colors">
                            <Instagram size={16} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#134e4a] hover:text-white transition-colors">
                            <Linkedin size={16} />
                        </a>
                    </div>
                </div>

                {/* Links Column 1 */}
                <div>
                    <h4 className="text-white font-bold mb-6">Renters</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/search" className="hover:text-white transition-colors">Find Apartments</Link></li>
                        <li><Link to="/search?type=buy" className="hover:text-white transition-colors">Homes for Sale</Link></li>
                        <li><Link to="/search?type=stays" className="hover:text-white transition-colors">Short-term Stays</Link></li>
                        <li><a href="#" className="hover:text-white transition-colors">Rental Guides</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Rent Affordability Calculator</a></li>
                    </ul>
                </div>

                {/* Links Column 2 */}
                <div>
                    <h4 className="text-white font-bold mb-6">Property Managers</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/manager" className="hover:text-white transition-colors">List a Property</Link></li>
                        <li><Link to="/manager" className="hover:text-white transition-colors">Manager Dashboard</Link></li>
                        <li><a href="#" className="hover:text-white transition-colors">Screening Services</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Rent Payments</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Resource Center</a></li>
                    </ul>
                </div>

                {/* Links Column 3 */}
                <div>
                    <h4 className="text-white font-bold mb-6">Company</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div>
                    <h4 className="text-white font-bold mb-6">Stay Updated</h4>
                    <p className="text-sm mb-4">Subscribe to our newsletter for the latest rental trends and updates.</p>
                    <form className="space-y-2">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#134e4a] focus:border-[#134e4a]"
                            />
                        </div>
                        <button type="button" className="w-full bg-[#134e4a] hover:bg-[#0f3f3c] text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                            Subscribe <ArrowRight size={16} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-[1920px] mx-auto px-4 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <p>© 2024 ResidentFinder. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                </div>
            </div>
        </footer>
    );
};
