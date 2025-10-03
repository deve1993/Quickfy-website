'use client';

import { MessageSquare, Send, Users, Phone, Video, MoreHorizontal, Search } from 'lucide-react';
import { memo } from 'react';

interface AppMockupProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'detailed';
}

export const AppMockup = memo(function AppMockup({
  className = ''
}: AppMockupProps) {
  return (
    <div className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 ${className}`}>
      {/* Phone Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Support Team</h3>
            <p className="text-green-100 text-xs">3 members online</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Video className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Phone className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="p-4 bg-gray-50 min-h-[300px] space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Customer Message */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">M</span>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-xl rounded-tl-sm p-3 shadow-sm border border-gray-100">
              <p className="text-gray-800 text-sm">Hi! I need help with my order #12345. When will it be delivered?</p>
              <span className="text-gray-400 text-xs mt-1 block">9:41 AM</span>
            </div>
          </div>
        </div>

        {/* Team Assignment Badge */}
        <div className="flex justify-center">
          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            💼 Assigned to Sarah from Sales
          </div>
        </div>

        {/* Team Response */}
        <div className="flex items-start space-x-3 justify-end">
          <div className="flex-1 text-right">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl rounded-tr-sm p-3 shadow-sm inline-block">
              <p className="text-sm">Hello Marco! Your order is being processed and will be shipped today. You&apos;ll receive tracking info shortly. 📦</p>
              <span className="text-blue-100 text-xs mt-1 block">9:43 AM</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">✓✓ Read by Marco</div>
          </div>
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">S</span>
          </div>
        </div>

        {/* Internal Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-yellow-700 text-xs font-medium">Internal Note</span>
          </div>
          <p className="text-yellow-800 text-sm">Customer is a VIP - expedite shipping. Last order was €1,200. - John</p>
        </div>

        {/* Platform Integration Badges */}
        <div className="flex justify-center space-x-4 pt-2">
          <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>WhatsApp</span>
          </div>
          <div className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Telegram</span>
          </div>
          <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Messenger</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MessageSquare className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex-1 bg-gray-100 rounded-xl px-4 py-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full bg-transparent text-sm focus:outline-none"
            />
          </div>
          <button className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Subtle Animation Overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"></div>
    </div>
  );
});