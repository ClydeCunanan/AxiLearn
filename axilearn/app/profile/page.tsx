import React from 'react';
// Import icons from a library like lucide-react if installed
// import { User, Settings, Package, Dumbbell } from 'lucide-react';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header / Cover Section */}
      <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 w-full" />
      
      {/* Profile Header */}
      <div className="px-4 -mt-12">
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white shadow-md overflow-hidden">
             {/* Replace with your actual image or a placeholder */}
            <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl">
              CA
            </div>
          </div>
          <h1 className="mt-4 text-xl font-bold text-gray-900">Clyde Andrei</h1>
          <p className="text-sm text-gray-500">Computer Engineering | HAU</p>
          
          <div className="mt-6 flex gap-3 w-full">
            <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium shadow-sm active:scale-95 transition-transform">
              Edit Profile
            </button>
            <button className="px-3 bg-gray-100 text-gray-600 py-2 rounded-lg active:scale-95 transition-transform">
              {/* Settings Icon Placeholder */}
              ⚙️
            </button>
          </div>
        </div>
      </div>

      {/* Stats/Quick Info Grid */}
      <div className="grid grid-cols-2 gap-4 px-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Business</span>
          <p className="text-lg font-bold text-gray-800">LoopedByKlayd</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Goal</span>
          <p className="text-lg font-bold text-gray-800">Spring Shred</p>
        </div>
      </div>

      {/* Navigation List */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <ProfileNavItem icon="📚" label="AxiLearn Dashboard" sub="Your learning progress" />
          <ProfileNavItem icon="🧶" label="My Crochet Shop" sub="Manage LoopedByKlayd" />
          <ProfileNavItem icon="💪" label="Fitness Log" sub="PPL Split Progress" />
          <ProfileNavItem icon="🔒" label="Account Security" sub="Password and 2FA" last />
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-6">
        <button className="w-full py-3 text-red-500 font-semibold bg-red-50 rounded-xl active:bg-red-100 transition-colors">
          Log Out
        </button>
      </div>
    </main>
  );
}

function ProfileNavItem({ icon, label, sub, last = false }: { icon: string, label: string, sub: string, last?: boolean }) {
  return (
    <button className={`w-full flex items-center p-4 active:bg-gray-50 transition-colors ${!last ? 'border-bottom border-gray-100 border-b' : ''}`}>
      <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-lg mr-4">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-bold text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{sub}</p>
      </div>
      <span className="text-gray-300">❯</span>
    </button>
  );
}