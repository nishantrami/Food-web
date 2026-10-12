import React from 'react';

export const Testimonials = () => {
  const reviews = [
    {
      name: "Priya Sharma",
      role: "Verified Foodie",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      content: "The Tuscan Farmhouse Pizza arrived piping hot with crispy crusts and gooey mozzarella. FoodVerse is miles ahead in delivery speed!",
      rating: 5,
      favoriteDish: "Tuscan Farmhouse Pizza"
    },
    {
      name: "Rohan Varma",
      role: "Architect & Regular Customer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      content: "Royal Biryani Hub's Dum Biryani here tastes just like authentic Nizami weddings. Clean packaging and accurate live tracking.",
      rating: 5,
      favoriteDish: "Hyderabadi Dum Biryani"
    },
    {
      name: "Ananya Patel",
      role: "Graphic Designer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      content: "The coupon codes actually work with instant discounts, and the pure veg filtering for Gujarati thalis is extraordinarily convenient.",
      rating: 5,
      favoriteDish: "Royal Gujarati Thali"
    }
  ];

  return (
    <section className="my-16 sm:my-20">
      <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-100/80 px-3.5 py-1.5 rounded-full mb-3">
          Happy Diners
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          What Food Lovers Say
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all flex flex-col justify-between relative"
          >
            <i className="fa-solid fa-quote-left text-2xl text-orange-200/70 mb-4" aria-hidden="true" />
            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
              "{r.content}"
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-100"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">{r.name}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{r.role}</p>
                </div>
              </div>
              <div className="flex text-amber-400 gap-0.5 text-xs">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <i key={i} className="fa-solid fa-star" aria-hidden="true" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
