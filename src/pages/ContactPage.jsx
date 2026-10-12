import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { Button } from '../components/common/Button';

export const ContactPage = () => {
  const { success: toastSuccess, error: toastError } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'order-help',
    orderId: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [activeFaq, setActiveFaq] = useState(0);

  const contactCards = [
    {
      icon: 'fa-solid fa-phone-volume',
      title: 'Customer Helpline',
      subtitle: '24/7 Instant Order Assistance',
      primaryText: '+91 98765 43210',
      secondaryText: 'Toll-Free: 1800-FOOD-VERSE',
      actionText: 'Call Helpline',
      actionLink: 'tel:+919876543210',
      badge: '24/7 Online',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      icon: 'fa-solid fa-envelope-open-text',
      title: 'Email Support',
      subtitle: 'Average response under 15 mins',
      primaryText: 'support@foodverse.com',
      secondaryText: 'partners@foodverse.com',
      actionText: 'Compose Email',
      actionLink: 'mailto:support@foodverse.com',
      badge: '< 15m Response',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      icon: 'fa-brands fa-whatsapp',
      title: 'WhatsApp Live Chat',
      subtitle: 'Fast messaging for live orders',
      primaryText: '+91 98765 43211',
      secondaryText: 'Chat directly with support agents',
      actionText: 'Start WhatsApp Chat',
      actionLink: 'https://wa.me/919876543211',
      badge: 'Instant Chat',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      icon: 'fa-solid fa-map-location-dot',
      title: 'Culinary Central HQ',
      subtitle: 'Visit our regional headquarters',
      primaryText: '402 Gourmet Boulevard, Culinary Hub',
      secondaryText: 'Ahmedabad, Gujarat 380015',
      actionText: 'Directions',
      actionLink: 'https://maps.google.com',
      badge: 'Mon - Sat',
      badgeColor: 'bg-amber-100 text-amber-800'
    }
  ];

  const faqs = [
    {
      q: 'How can I track my food order in real-time?',
      a: 'Once your order is confirmed, go to the "Orders" page from your navigation menu. You will find real-time live status updates (Order Placed → Preparing in Kitchen → Out for Delivery → Delivered) with live courier notes.'
    },
    {
      q: 'Can I cancel or change dish items after placing an order?',
      a: 'Orders can be modified or cancelled within 60 seconds of checkout while the restaurant hasn’t started firing the kitchen stoves. Call our 24/7 hotline at +91 98765 43210 with your order ID for immediate assistance.'
    },
    {
      q: 'What should I do if my food arrives delayed or with missing items?',
      a: 'We maintain a 100% Satisfaction Guarantee. Simply reach out via the contact form with your Order ID, or WhatsApp our support line. We process instant replacement orders or complete wallet credits.'
    },
    {
      q: 'How do restaurants partner and list dishes on FoodVerse?',
      a: 'Select "Restaurant Partnership" in the contact form below or email partners@foodverse.com. Our onboarding team reviews menu safety protocols and sets up your digital kitchen within 24-48 hours.'
    },
    {
      q: 'Are all kitchen hygiene standards verified?',
      a: 'Yes. Every partner restaurant undergoes mandatory bi-weekly sanitary reviews, thermal temperature audits, and food grade safety packaging protocols before food dispatch.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toastError("Please fill in all required fields (Name, Email, and Message).");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const ticketNumber = `FV-SUP-${Math.floor(1000 + Math.random() * 9000)}`;
      const newInquiry = {
        id: ticketNumber,
        ...formData,
        timestamp: new Date().toISOString()
      };

      try {
        const existing = JSON.parse(localStorage.getItem('foodverse_contact_inquiries') || '[]');
        existing.unshift(newInquiry);
        localStorage.setItem('foodverse_contact_inquiries', JSON.stringify(existing));
      } catch (err) {
        console.error("Storage error:", err);
      }

      setSubmittedTicket(ticketNumber);
      setIsSubmitting(false);
      toastSuccess(`Inquiry submitted! Ticket #${ticketNumber} created successfully.`);
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'order-help',
        orderId: '',
        subject: '',
        message: ''
      });
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-wider shadow-2xs">
          <i className="fa-solid fa-headset text-xs" aria-hidden="true" />
          <span>24/7 Dedicated Customer Care</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          We’re Here to Help,{' '}
          <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Every Step of the Way
          </span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
          Whether you need assistance with an ongoing order, have questions regarding kitchen safety, or want to partner with us, our support specialists are standing by 24 hours a day.
        </p>

        {/* Live Status Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold text-slate-700">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Support Line: Active (24/7)</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Average Wait Time: &lt; 2 Mins</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
            <i className="fa-solid fa-shield-halved text-amber-500 text-xs" aria-hidden="true" />
            <span>100% Satisfaction SLA</span>
          </span>
        </div>
      </div>

      {/* 4 Contact Channels Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {contactCards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-orange-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl shadow-xs">
                  <i className={card.icon} aria-hidden="true" />
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>

              <div>
                <h3 className="font-black text-base text-slate-900">{card.title}</h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{card.subtitle}</p>
              </div>

              <div className="space-y-1 pt-1 border-t border-slate-100">
                <p className="text-xs font-black text-slate-800 truncate">{card.primaryText}</p>
                <p className="text-[11px] text-slate-500 font-semibold truncate">{card.secondaryText}</p>
              </div>
            </div>

            <a
              href={card.actionLink}
              target={card.actionLink.startsWith('http') ? '_blank' : undefined}
              rel={card.actionLink.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="mt-5 w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-orange-500 text-slate-700 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-200 hover:border-orange-500 shadow-2xs cursor-pointer"
            >
              <span>{card.actionText}</span>
              <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
            </a>
          </motion.div>
        ))}
      </div>

      {/* Main Grid: Contact Form (Left) & FAQs / Office Info (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* Contact Form Container (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 border border-slate-200/90 shadow-card space-y-6">
          <div className="space-y-1.5 pb-4 border-b border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Fill out the inquiry form below and our dedicated support team will respond to your email with a reference ticket.
            </p>
          </div>

          {/* Ticket Confirmation Alert if just submitted */}
          <AnimatePresence>
            {submittedTicket && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-check text-sm" aria-hidden="true" />
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-black text-sm text-emerald-900">
                    Inquiry Created Successfully! (Ticket #{submittedTicket})
                  </p>
                  <p className="text-emerald-700 font-medium">
                    Our support team has queued your ticket. A senior representative will contact you via email or phone within 15 minutes.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 00000"
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Inquiry Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all font-semibold text-slate-800 cursor-pointer"
                >
                  <option value="order-help">Order Status & Delivery Help</option>
                  <option value="partner">Restaurant Partnership Onboarding</option>
                  <option value="quality">Food Quality & Safety Feedback</option>
                  <option value="refund">Cancellation or Refund Issue</option>
                  <option value="technical">Website & Technical Support</option>
                  <option value="other">General Inquiries</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Order ID (If Applicable)
                </label>
                <input
                  type="text"
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                  placeholder="e.g. FV-1024"
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Question regarding delivery time"
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all font-semibold text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Detailed Message *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your inquiry or order details in depth..."
                className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-all font-semibold text-slate-800 resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              loading={isSubmitting}
              icon="fa-solid fa-paper-plane"
              className="w-full rounded-2xl bg-orange-500 hover:bg-orange-600 text-white shadow-md font-black"
            >
              Submit Support Ticket
            </Button>
          </form>
        </div>

        {/* Right Column: FAQs & Hub Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Quick FAQ Accordion */}
          <div className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-black">
                <i className="fa-solid fa-circle-question" aria-hidden="true" />
              </div>
              <h3 className="font-black text-lg text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = activeFaq === i;
                return (
                  <div
                    key={i}
                    className="border border-slate-200/80 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? -1 : i)}
                      className="w-full text-left p-4 bg-slate-50/60 hover:bg-slate-100/80 transition-colors flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                        {faq.q}
                      </span>
                      <i
                        className={`fa-solid fa-chevron-down text-xs text-slate-400 transition-transform ${
                          isOpen ? 'rotate-180 text-orange-600' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 py-3 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Kitchen Hub Location Box */}
          <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/10 border border-orange-200/80 rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-card space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-lg shadow-xs">
                <i className="fa-solid fa-utensils" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-black text-base text-slate-900">FoodVerse Kitchen Hub</h4>
                <p className="text-xs text-slate-500 font-semibold">Ahmedabad Central Operations</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Operating over 18+ high-speed cloud partner kitchens across town with certified hygiene standards and 28-minute guaranteed doorstep delivery.
            </p>

            <div className="pt-2 border-t border-orange-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Operating Hours:</span>
              <span className="text-orange-600 font-black">Open 24 Hours / 7 Days</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
