import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { 
  User, 
  Bell, 
  Shield, 
  Palette,
  Save,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

export function Settings() {
  const { theme } = useTheme();

  return (
    <div className={`p-6 space-y-6 ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-900'}`}>
      <h1 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Settings</h1>
      
      {/* Profile Settings */}
      <div className="card-container relative overflow-hidden">
        <div className={`relative z-10 p-6 ${theme === 'light' ? 'bg-white/90' : 'bg-slate-800/90'} rounded-3xl`}>
          <div className="flex items-center space-x-3 mb-6">
            <User className={`w-6 h-6 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
            <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Profile Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-2`}>
                Full Name
              </label>
              <input 
                type="text" 
                defaultValue="John Doe"
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'light' 
                    ? 'border-gray-300 bg-white text-gray-900 focus:border-blue-500' 
                    : 'border-slate-600 bg-slate-700 text-white focus:border-blue-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-2`}>
                Email Address
              </label>
              <input 
                type="email" 
                defaultValue="john@example.com"
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'light' 
                    ? 'border-gray-300 bg-white text-gray-900 focus:border-blue-500' 
                    : 'border-slate-600 bg-slate-700 text-white focus:border-blue-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card-container relative overflow-hidden">
        <div className={`relative z-10 p-6 ${theme === 'light' ? 'bg-white/90' : 'bg-slate-800/90'} rounded-3xl`}>
          <div className="flex items-center space-x-3 mb-6">
            <Bell className={`w-6 h-6 ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`} />
            <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Notifications</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Email Notifications', description: 'Receive updates via email' },
              { label: 'Push Notifications', description: 'Browser push notifications' },
              { label: 'SMS Alerts', description: 'Important alerts via SMS' },
              { label: 'Weekly Reports', description: 'Weekly analytics summary' }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'} font-medium`}>{setting.label}</p>
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm`}>{setting.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                  <div className={`relative w-11 h-6 ${theme === 'light' ? 'bg-gray-200' : 'bg-slate-600'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="card-container relative overflow-hidden">
        <div className={`relative z-10 p-6 ${theme === 'light' ? 'bg-white/90' : 'bg-slate-800/90'} rounded-3xl`}>
          <div className="flex items-center space-x-3 mb-6">
            <Shield className={`w-6 h-6 ${theme === 'light' ? 'text-red-600' : 'text-red-400'}`} />
            <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Privacy & Security</h3>
          </div>
          
          <div className="space-y-4">
            <button className={`w-full text-left p-4 rounded-lg border ${
              theme === 'light' 
                ? 'border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100' 
                : 'border-slate-600 hover:border-slate-500 bg-slate-700/50 hover:bg-slate-700'
            } transition-colors`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'} font-medium`}>Change Password</p>
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm`}>Update your account password</p>
                </div>
                <Shield className={`w-5 h-5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
            </button>
            
            <button className={`w-full text-left p-4 rounded-lg border ${
              theme === 'light' 
                ? 'border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100' 
                : 'border-slate-600 hover:border-slate-500 bg-slate-700/50 hover:bg-slate-700'
            } transition-colors`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'} font-medium`}>Two-Factor Authentication</p>
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm`}>Add an extra layer of security</p>
                </div>
                <Shield className={`w-5 h-5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className={`px-6 py-3 ${theme === 'light' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg font-medium transition-colors flex items-center space-x-2`}>
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}