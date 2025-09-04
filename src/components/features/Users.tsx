import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { 
  Users as UsersIcon, 
  UserPlus, 
  Search, 
  Filter,
  MoreVertical,
  Mail,
  Phone
} from 'lucide-react';

export function Users() {
  const { theme } = useTheme();

  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active', lastLogin: '1 day ago' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'Moderator', status: 'Inactive', lastLogin: '3 days ago' },
    { id: 4, name: 'David Wilson', email: 'david@example.com', role: 'User', status: 'Active', lastLogin: '5 minutes ago' },
    { id: 5, name: 'Eva Brown', email: 'eva@example.com', role: 'User', status: 'Active', lastLogin: '1 hour ago' }
  ];

  return (
    <div className={`p-6 space-y-6 ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-900'}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Users</h1>
        <button className={`px-4 py-2 ${theme === 'light' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg font-medium transition-colors flex items-center space-x-2`}>
          <UserPlus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card-container relative overflow-hidden">
        <div className={`relative z-10 p-6 ${theme === 'light' ? 'bg-white/90' : 'bg-slate-800/90'} rounded-3xl`}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search users..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  theme === 'light' 
                    ? 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500' 
                    : 'border-slate-600 bg-slate-700 text-white placeholder-gray-400 focus:border-blue-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
            <button className={`px-4 py-2 border ${
              theme === 'light' 
                ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                : 'border-slate-600 text-gray-300 hover:bg-slate-700'
            } rounded-lg transition-colors flex items-center space-x-2`}>
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card-container relative overflow-hidden">
        <div className={`relative z-10 ${theme === 'light' ? 'bg-white/90' : 'bg-slate-800/90'} rounded-3xl overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${theme === 'light' ? 'bg-gray-50' : 'bg-slate-700/50'}`}>
                <tr>
                  <th className={`px-6 py-4 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>
                    User
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>
                    Role
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>
                    Status
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>
                    Last Login
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600">
                {users.map((user) => (
                  <tr key={user.id} className={`${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-slate-700/50'} transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-500/20'} flex items-center justify-center`}>
                          <span className={`text-sm font-medium ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            {user.name}
                          </div>
                          <div className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'Admin' 
                          ? theme === 'light' ? 'bg-purple-100 text-purple-800' : 'bg-purple-500/20 text-purple-400'
                          : user.role === 'Moderator'
                          ? theme === 'light' ? 'bg-blue-100 text-blue-800' : 'bg-blue-500/20 text-blue-400'
                          : theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'Active' 
                          ? theme === 'light' ? 'bg-green-100 text-green-800' : 'bg-green-500/20 text-green-400'
                          : theme === 'light' ? 'bg-red-100 text-red-800' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className={`${theme === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-gray-400 hover:text-gray-200'} transition-colors`}>
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}