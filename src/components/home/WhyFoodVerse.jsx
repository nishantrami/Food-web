import React from 'react';
import { motion } from 'framer-motion';

export const WhyFoodVerse = () => {
  const features = [
    {
      faIcon: "fa-solid fa-bolt",
      title: "Swift 25-Min Delivery",
      description: "Smart algorithmic dispatching ensures your meal arrives piping hot and fresh from the kitchen.",
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      faIcon: "fa-solid fa-store",
      title: "Handpicked Kitchens",
      description: "Only inspected and top-rated restaurants with consistent 4.5+ quality scores make our catalog.",
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      faIcon: "fa-solid fa-shield-halved",
      title: "Hygiene & Safety Sealed",
      description: "Tamper-evident food packaging and sanitized temperature-controlled bags protect your meals.",
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      faIcon: "fa-solid fa-location-dot",
      title: "Live GPS Tracking",
      description: "Real-time kitchen order preparation and live rider route tracking straight to your door.",
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  return (
    <section className="my-16 sm:my-20 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full mb-3">
          <i className="fa-solid fa-sparkles text-xs text-amber-500" aria-hidden="true" />
          <span>The FoodVerse Promise</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Why Foodies Love Ordering With Us
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2 font-normal">
          We combine culinary passion with fast digital ordering to bring you unforgettable dining at home.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => {
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-orange-300 hover:shadow-card-hover flex flex-col items-start transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4 text-xl border border-slate-200/60`}>
                <i className={item.faIcon} aria-hidden="true" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
