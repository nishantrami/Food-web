import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../hooks/useToast';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, logout, updateProfile } = useAuth();
  const { favoriteFoods } = useFavorites();
  const { success } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || ''
      });
    }
  }, [currentUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (updateProfile) {
      await updateProfile(formData);
    }
    setIsEditModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Page Header Banner */}
      <div className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-8 border border-slate-100 shadow-card flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-orange-600 shadow-md ring-4 ring-orange-100">
              <i className="fa-solid fa-user text-4xl" aria-hidden="true" />
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {currentUser?.name || "Foodie Explorer"}
              </h1>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700">
                Premier Member
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-2 font-medium">
              <i className="fa-solid fa-envelope text-slate-400 text-xs" aria-hidden="true" />
              <span>{currentUser?.email || "No email provided"}</span>
            </p>

            <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-2 font-medium">
              <i className="fa-solid fa-phone text-slate-400 text-xs" aria-hidden="true" />
              <span>{currentUser?.phone || "No phone provided"}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon="fa-solid fa-pen-to-square"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Profile
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon="fa-solid fa-arrow-right-from-bracket"
            onClick={handleLogout}
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Quick Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/orders"
          className="bg-white p-5 rounded-3xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl">
              <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
            </div>
            <div>
              <p className="text-base font-black text-slate-900">Orders</p>
              <p className="text-xs text-slate-400 font-semibold">Track & Reorder</p>
            </div>
          </div>
        </Link>

        <Link
          to="/favorites"
          className="bg-white p-5 rounded-3xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl">
              <i className="fa-solid fa-heart" aria-hidden="true" />
            </div>
            <div>
              <p className="text-base font-black text-slate-900">Favorites</p>
              <p className="text-xs text-slate-400 font-semibold">{favoriteFoods.length} Saved Dishes</p>
            </div>
          </div>
        </Link>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-card flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
              <i className="fa-solid fa-shield-halved" aria-hidden="true" />
            </div>
            <div>
              <p className="text-base font-black text-slate-900">Verified</p>
              <p className="text-xs text-slate-400 font-semibold">100% Secure Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Addresses Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Saved Delivery Addresses</h2>
            <p className="text-xs text-slate-400 font-medium">Manage where you want your meals delivered</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(currentUser?.addresses || [
            {
              id: '1',
              label: 'Home',
              street: 'Flat 402, Skyline Towers, Sector 18',
              city: 'Mumbai',
              pincode: '400050',
              isDefault: true
            },
            {
              id: '2',
              label: 'Office',
              street: 'Cyber Hub Tech Park, 5th Floor, Tower B',
              city: 'Mumbai',
              pincode: '400051',
              isDefault: false
            }
          ]).map((addr, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 relative space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {addr.label}
                </span>
                {addr.isDefault && (
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Default
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-slate-700 leading-relaxed pt-1">
                {addr.street}, {addr.city} - {addr.pincode}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile Information"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-600 uppercase mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-600 uppercase mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-600 uppercase mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" icon="fa-solid fa-check" className="bg-orange-500 hover:bg-orange-600 text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
