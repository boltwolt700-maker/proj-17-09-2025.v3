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
      <div className="w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden glass-card-strong">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-[var(--color-border)]">
          <h2 className="text-3xl font-bold text-[var(--color-text)]">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-3 rounded-xl btn-glass transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[500px]">
          {/* Sidebar */}
          <div className="w-80 border-r border-[var(--color-border)] surface-card">
            <nav className="p-6 space-y-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'nav-item active'
                        : 'nav-item'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-semibold">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-8 overflow-y-auto bg-white">
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-[var(--color-text)]">
                  Profile Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold mb-3 text-[var(--color-text)]">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-4 py-3 rounded-xl surface-card-alt border-[var(--color-border)] text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-3 text-[var(--color-text)]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full px-4 py-3 rounded-xl surface-card-alt border-[var(--color-border)] text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-3 text-[var(--color-text)]">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="john.doe@email.com"
                      className="w-full px-4 py-3 rounded-xl surface-card-alt border-[var(--color-border)] text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-[var(--color-text)]">
                  Account Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold mb-3 text-[var(--color-text)]">
                      Company Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Career Clarified Inc."
                      className="w-full px-4 py-3 rounded-xl surface-card-alt border-[var(--color-border)] text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-3 text-[var(--color-text)]">
                      Industry
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl surface-card-alt border-[var(--color-border)] text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all">
                      <option>Technology</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                      <option>Healthcare</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-3 text-[var(--color-text)]">
                      Company Size
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl surface-card-alt border-[var(--color-border)] text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all">
                      <option>1-10 employees</option>
                      <option>11-50 employees</option>
                      <option>51-200 employees</option>
                      <option>200+ employees</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-3 text-[var(--color-text)]">
                      Time Zone
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl surface-card-alt border-[var(--color-border)] text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all">
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC-6 (Central Time)</option>
                      <option>UTC-7 (Mountain Time)</option>
                      <option>UTC-8 (Pacific Time)</option>
                    </select>
                  </div>
                </div>

                <h4 className="text-xl font-bold mt-10 mb-6 text-[var(--color-text)]">
                  Contact Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold mb-3 text-[var(--color-text)]">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Primary Email
                    </label>
                    <input
                      type="email"
                      defaultValue="admin@careerclarified.com"
                      className="w-full px-4 py-3 rounded-xl surface-card-alt border-[var(--color-border)] text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-3 text-[var(--color-text)]">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-3 rounded-xl surface-card-alt border-[var(--color-border)] text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-3 text-[var(--color-text)]">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Address
                    </label>
                    <input
                      type="text"
                      defaultValue="123 Business St, San Francisco, CA 94105"
                      className="w-full px-4 py-3 rounded-xl surface-card-alt border-[var(--color-border)] text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-[var(--color-text)]">
                  Notification Preferences
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl surface-card-alt">
                    <div>
                      <h4 className="font-bold text-[var(--color-text)]">
                        Email Notifications
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        Receive updates about your account and content
                      </p>
                    </div>
                    <button className="relative inline-flex items-center h-7 rounded-full w-12 bg-[var(--color-primary)]">
                      <span className="translate-x-6 inline-block w-5 h-5 transform bg-white rounded-full transition shadow-lg"></span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-2xl surface-card-alt">
                    <div>
                      <h4 className="font-bold text-[var(--color-text)]">
                        Weekly Reports
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        Weekly analytics and insights
                      </p>
                    </div>
                    <button className="relative inline-flex items-center h-7 rounded-full w-12 bg-[var(--color-primary)]">
                      <span className="translate-x-6 inline-block w-5 h-5 transform bg-white rounded-full transition shadow-lg"></span>
                    </button>
                  </div>
                </div>
              
                <h4 className="text-xl font-bold mt-10 mb-6 text-[var(--color-text)]">
                  Notification Preferences
                </h4>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl surface-card-alt">
                    <div>
                      <h4 className="font-bold text-[var(--color-text)]">Performance Reports</h4>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">Weekly analytics and insights</p>
                    </div>
                    <button className="relative inline-flex items-center h-7 rounded-full w-12 bg-[var(--color-primary)]">
                      <span className="sr-only">Enable reports</span>
                      <span className="translate-x-6 inline-block w-5 h-5 transform bg-white rounded-full transition shadow-lg"></span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-2xl surface-card-alt">
                    <div>
                      <h4 className="font-bold text-[var(--color-text)]">Team Activity</h4>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">Notifications when team members post or comment</p>
                    </div>
                    <button className="relative inline-flex items-center h-7 rounded-full w-12 bg-gray-400">
                      <span className="sr-only">Enable team notifications</span>
                      <span className="inline-block w-5 h-5 transform bg-white rounded-full transition shadow-lg"></span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-[var(--color-text)]">
                  Privacy Settings
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl surface-card-alt">
                    <div>
                      <h4 className="font-bold text-[var(--color-text)]">
                        Profile Visibility
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        Make your profile visible to other users
                      </p>
                    </div>
                    <button className="relative inline-flex items-center h-7 rounded-full w-12 bg-[var(--color-primary)]">
                      <span className="translate-x-6 inline-block w-5 h-5 transform bg-white rounded-full transition shadow-lg"></span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-2xl surface-card-alt">
                    <div>
                      <h4 className="font-bold text-[var(--color-text)]">
                        Analytics Sharing
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        Share anonymous analytics to improve the platform
                      </p>
                    </div>
                    <button className="relative inline-flex items-center h-7 rounded-full w-12 bg-gray-400">
                      <span className="inline-block w-5 h-5 transform bg-white rounded-full transition shadow-lg"></span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-[var(--color-text)]">
                  Preferences
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold mb-3 text-[var(--color-text)]">
                      Language
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl surface-card-alt border-[var(--color-border)] text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-3 text-[var(--color-text)]">
                      Time Zone
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl surface-card-alt border-[var(--color-border)] text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none transition-all">
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
        <div className="flex items-center justify-end gap-4 p-8 border-t border-[var(--color-border)]">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-semibold transition-colors btn-glass"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 btn-primary rounded-xl font-semibold transition-all"
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