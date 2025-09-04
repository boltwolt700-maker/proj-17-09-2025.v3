import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart
} from 'lucide-react';

export function Reports() {
  const { theme } = useTheme();

  const reports = [
    { name: 'Monthly Sales Report', type: 'Sales', date: '2024-01-15', size: '2.4 MB', status: 'Ready' },
    { name: 'User Analytics Report', type: 'Analytics', date: '2024-01-14', size: '1.8 MB', status: 'Ready' },
    { name: 'Performance Metrics', type: 'Performance', date: '2024-01-13', size: '3.1 MB', status: 'Processing' },
    { name: 'Customer Feedback', type: 'Feedback', date: '2024-01-12', size: '892 KB', status: 'Ready' }
  ];

  return (
    <div className={`p-6 space-y-6 ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-900'}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Reports</h1>
        <button className={`px-4 py-2 ${theme === 'light' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg font-medium transition-colors flex items-center space-x-2`}>
          <FileText className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-container relative overflow-hidden">
          <div className={`relative z-10 p-6 ${theme === 'light' ? 'bg-white/90' : 'bg-slate-800/90'} rounded-3xl h-full`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm`}>Total Reports</p>
                <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>47</p>
              </div>
              <FileText className={`w-8 h-8 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
            </div>
          </div>
        </div>
        
        <div className="card-container relative overflow-hidden">
          <div className={`relative z-10 p-6 ${theme === 'light' ? 'bg-white/90' : 'bg-slate-800/90'} rounded-3xl h-full`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm`}>This Month</p>
                <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>12</p>
              </div>
              <Calendar className={`w-8 h-8 ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`} />
            </div>
          </div>
        </div>
        
        <div className="card-container relative overflow-hidden">
          <div className={`relative z-10 p-6 ${theme === 'light' ? 'bg-white/90' : 'bg-slate-800/90'} rounded-3xl h-full`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm`}>Processing</p>
                <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>3</p>
              </div>
              <TrendingUp className={`w-8 h-8 ${theme === 'light' ? 'text-orange-600' : 'text-orange-400'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-container relative overflow-hidden">
          <div className={`relative z-10 p-6 ${theme === 'light' ? 'bg-white/90' : 'bg-slate-800/90'} rounded-3xl text-center`}>
            <BarChart3 className={`w-12 h-12 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} mx-auto mb-4`} />
            <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-2`}>Sales Reports</h3>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm mb-4`}>Detailed sales analytics and trends</p>
            <button className={`w-full px-4 py-2 ${theme === 'light' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg transition-colors`}>
              Generate
            </button>
          </div>
        </div>
        
        <div className="card-container relative overflow-hidden">
          <div className={`relative z-10 p-6 ${theme === 'light' ? 'bg-white/90' : 'bg-slate-800/90'} rounded-3xl text-center`}>
            <PieChart className={`w-12 h-12 ${theme === 'light' ? 'text-green-600' : 'text-green-400'} mx-auto mb-4`} />
            <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-2`}>User Analytics</h3>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm mb-4`}>User behavior and engagement metrics</p>
            <button className={`w-full px-4 py-2 ${theme === 'light' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg transition-colors`}>
              Generate
            </button>
          </div>
        </div>
        
        <div className="card-container relative overflow-hidden">
          <div className={`relative z-10 p-6 ${theme === 'light' ? 'bg-white/90' : 'bg-slate-800/90'} rounded-3xl text-center`}>
            <TrendingUp className={`w-12 h-12 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'} mx-auto mb-4`} />
            <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-2`}>Performance</h3>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm mb-4`}>System performance and optimization</p>
            <button className={`w-full px-4 py-2 ${theme === 'light' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white rounded-lg transition-colors`}>
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="card-container relative overflow-hidden">
        <div className={`relative z-10 p-6 ${theme === 'light' ? 'bg-white/90' : 'bg-slate-800/90'} rounded-3xl`}>
          <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-4`}>Recent Reports</h3>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                theme === 'light' 
                  ? 'border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100' 
                  : 'border-slate-600 hover:border-slate-500 bg-slate-700/50 hover:bg-slate-700'
              } transition-colors`}>
                <div className="flex items-center space-x-4">
                  <FileText className={`w-8 h-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} />
                  <div>
                    <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{report.name}</p>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {report.type} • {report.date} • {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    report.status === 'Ready' 
                      ? theme === 'light' ? 'bg-green-100 text-green-800' : 'bg-green-500/20 text-green-400'
                      : theme === 'light' ? 'bg-yellow-100 text-yellow-800' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {report.status}
                  </span>
                  {report.status === 'Ready' && (
                    <button className={`p-2 ${theme === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-200'} transition-colors`}>
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}