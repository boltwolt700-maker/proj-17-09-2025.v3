import React, { useState } from 'react';
import { X, User, Bell, Shield, Globe, Palette, Save, Mail, Phone, MapPin, Settings as SettingsIcon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      weekly: true,
      achievements: true
    },
    privacy: {
      profileVisible: true,
      analyticsSharing: false,
      dataExport: true
    },
    preferences: {
      language: 'en',
      timezone: 'UTC-5',
      dateFormat: 'MM/DD/YYYY'
    }
  });

  if (!isOpen) return null;

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'account', name: 'Account', icon: SettingsIcon },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: Globe }
  ];

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden ${
        theme === 'light' 
          ? 'bg-white border border-gray-200' 
          : 'bg-slate-800 border border-slate-700'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          theme === 'light' ? 'border-gray-200' : 'border-slate-700'
        }`}>
          <h2 className={`text-2xl font-bold ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Settings
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'light' 
                ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-96">
          {/* Sidebar */}
          <div className={`w-64 border-r ${
            theme === 'light' ? 'border-gray-200 bg-gray-50' : 'border-slate-700 bg-slate-900'
          }`}>
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? theme === 'light'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-700 text-white'
                        : theme === 'light'
                          ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className={`text-lg font-semibold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Profile Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                    }`}>
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John"
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:outline-none ${
                        theme === 'light'
                          ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                          : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                    }`}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:outline-none ${
                        theme === 'light'
                          ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                          : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                    }`}>
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="john.doe@email.com"
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:outline-none ${
                        theme === 'light'
                          ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                          : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <h3 className={`text-lg font-semibold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Account Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                    }`}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Career Clarified Inc."
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:outline-none ${
                        theme === 'light'
                          ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                          : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                    }`}>
                      Industry
                    </label>
                    <select className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:outline-none ${
                      theme === 'light'
                        ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                        : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20'
                    }`}>
                      <option>Technology</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                      <option>Healthcare</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                    }`}>
                      Company Size
                    </label>
                    <select className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:outline-none ${
                      theme === 'light'
                        ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                        : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20'
                    }`}>
                      <option>1-10 employees</option>
                      <option>11-50 employees</option>
                      <option>51-200 employees</option>
                      <option>200+ employees</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                    }`}>
                      Time Zone
                    </label>
                    <select className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:outline-none ${
                      theme === 'light'
                        ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                        : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20'
                    }`}>
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC-6 (Central Time)</option>
                      <option>UTC-7 (Mountain Time)</option>
                      <option>UTC-8 (Pacific Time)</option>
                    </select>
                  </div>
                </div>

                <h4 className={`text-md font-semibold mt-8 mb-4 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Contact Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                    }`}>
                      <Mail className="w-4 h-4 inline mr-2" />
                      Primary Email
                    </label>
                    <input
                      type="email"
                      defaultValue="admin@careerclarified.com"
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:outline-none ${
                        theme === 'light'
                          ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                          : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                    }`}>
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:outline-none ${
                        theme === 'light'
                          ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                          : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                    }`}>
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Address
                    </label>
                    <input
                      type="text"
                      defaultValue="123 Business St, San Francisco, CA 94105"
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:outline-none ${
                        theme === 'light'
                          ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                          : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className={`text-lg font-semibold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Notification Preferences
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-medium ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        Email Notifications
                      </h4>
                      <p className={`text-sm ${
                        theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                      }`}>
                        Receive updates about your account and content
                      </p>
                    </div>
                    <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-blue-600">
                      <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-medium ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        Weekly Reports
                      </h4>
                      <p className={`text-sm ${
                        theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                      }`}>
                        Weekly analytics and insights
                      </p>
                    </div>
                    <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-blue-600">
                      <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                    </button>
                  </div>
                </div>
              
              <h4 className={`text-md font-semibold mt-8 mb-4 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Notification Preferences
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Performance Reports</h4>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-slate-400'}`}>Weekly analytics and insights</p>
                  </div>
                  <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-indigo-600">
                    <span className="sr-only">Enable reports</span>
                    <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Team Activity</h4>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-slate-400'}`}>Notifications when team members post or comment</p>
                  </div>
                  <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-600">
                    <span className="sr-only">Enable team notifications</span>
                    <span className="inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                  </button>
                </div>
              </div>
            )}
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className={`text-lg font-semibold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Privacy Settings
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-medium ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        Profile Visibility
                      </h4>
                      <p className={`text-sm ${
                        theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                      }`}>
                        Make your profile visible to other users
                      </p>
                    </div>
                    <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-blue-600">
                      <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-medium ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        Analytics Sharing
                      </h4>
                      <p className={`text-sm ${
                        theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                      }`}>
                        Share anonymous analytics to improve the platform
                      </p>
                    </div>
                    <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-600">
                      <span className="inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h3 className={`text-lg font-semibold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Preferences
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                    }`}>
                      Language
                    </label>
                    <select className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:outline-none ${
                      theme === 'light'
                        ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                        : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20'
                    }`}>
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                    }`}>
                      Time Zone
                    </label>
                    <select className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:outline-none ${
                      theme === 'light'
                        ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                        : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20'
                    }`}>
                      <option>UTC-5 (Eastern)</option>
                      <option>UTC-6 (Central)</option>
                      <option>UTC-7 (Mountain)</option>
                      <option>UTC-8 (Pacific)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-end gap-3 p-6 border-t ${
          theme === 'light' ? 'border-gray-200' : 'border-slate-700'
        }`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              theme === 'light'
                ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                : 'border border-slate-600 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;