import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800 mb-12">
          <div className="flex items-center gap-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
            <div className="w-12 h-12 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0 text-xl">
              <i className="fa-solid fa-truck-fast" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-white font-extrabold text-sm">Lightning Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Average delivery within 28 mins straight to your door.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 text-xl">
              <i className="fa-solid fa-shield-halved" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-white font-extrabold text-sm">Strict Hygiene Standards</h4>
              <p className="text-xs text-slate-400 mt-0.5">100% certified kitchen inspections & clean safe packaging.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/15 text-yellow-400 flex items-center justify-center shrink-0 text-xl">
              <i className="fa-solid fa-clock" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-white font-extrabold text-sm">Live Order Tracking</h4>
              <p className="text-xs text-slate-400 mt-0.5">Real-time GPS dispatch & preparation notifications.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <BrandLogo size="md" light={true} />
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-normal">
              Discover delicious meals from top restaurants and artisan eateries. Handcrafted pizzas, juicy burgers, fresh sushi, and traditional recipes delivered fresh and fast.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://github.com/nishantrami/Food-web" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-orange-500 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-base"
                aria-label="GitHub Repository"
                title="View on GitHub"
              >
                <i className="fa-brands fa-github" aria-hidden="true" />
              </a>
              <a 
                href="#instagram" 
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-orange-500 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-base"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram" aria-hidden="true" />
              </a>
              <a 
                href="#facebook" 
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-orange-500 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-base"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f" aria-hidden="true" />
              </a>
              <a 
                href="#twitter" 
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-orange-500 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-base"
                aria-label="Twitter X"
              >
                <i className="fa-brands fa-x-twitter" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/explore" className="hover:text-amber-400 transition-colors">About FoodVerse</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/restaurants" className="hover:text-amber-400 transition-colors">Partner With Us</Link></li>
              <li><Link to="/explore" className="hover:text-amber-400 transition-colors">Careers & News</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/restaurants" className="hover:text-amber-400 transition-colors">Restaurants</Link></li>
              <li><Link to="/explore" className="hover:text-amber-400 transition-colors">All Dishes</Link></li>
              <li><Link to="/explore?category=pizza" className="hover:text-amber-400 transition-colors">Wood-fired Pizza</Link></li>
              <li><Link to="/explore?category=burger" className="hover:text-amber-400 transition-colors">Gourmet Burgers</Link></li>
              <li><Link to="/favorites" className="hover:text-amber-400 transition-colors">My Favorites</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact & Support</Link></li>
              <li><a href="#privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
              <li><Link to="/orders" className="hover:text-amber-400 transition-colors">Track Order</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">24/7 Helpline</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 FoodVerse. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/nishantrami/Food-web"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-orange-400 transition-colors font-semibold"
            >
              <i className="fa-brands fa-github text-sm" aria-hidden="true" />
              <span>GitHub Repo</span>
            </a>
            <span className="text-slate-700">•</span>
            <p className="flex items-center gap-1.5">
              Crafted with <i className="fa-solid fa-heart text-orange-500 inline" aria-hidden="true" /> for great food everywhere.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
