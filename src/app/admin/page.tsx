"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">MPC Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome, Admin</span>
              <button className="text-sm text-red-600 hover:text-red-800">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'articles', name: 'Articles', icon: '📝' },
              { id: 'blog', name: 'Blog Posts', icon: '📰' },
              { id: 'theories', name: 'Theories', icon: '🧠' },
              { id: 'assessments', name: 'Assessments', icon: '📋' },
              { id: 'consultations', name: 'Consultations', icon: '📞' },
              { id: 'settings', name: 'Settings', icon: '⚙️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">📝</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Articles</dt>
                        <dd className="text-lg font-medium text-gray-900">12</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">📰</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Blog Posts</dt>
                        <dd className="text-lg font-medium text-gray-900">8</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">📞</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">New Consultations</dt>
                        <dd className="text-lg font-medium text-gray-900">5</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">👥</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Visitors</dt>
                        <dd className="text-lg font-medium text-gray-900">1,234</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Consultations</h3>
                <div className="space-y-4">
                  {[
                    { name: 'John Doe', email: 'john@example.com', urgency: 'high', time: '2 hours ago' },
                    { name: 'Jane Smith', email: 'jane@example.com', urgency: 'medium', time: '4 hours ago' },
                    { name: 'Mike Johnson', email: 'mike@example.com', urgency: 'low', time: '6 hours ago' },
                  ].map((consultation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{consultation.name}</p>
                        <p className="text-sm text-gray-500">{consultation.email}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          consultation.urgency === 'high' ? 'bg-red-100 text-red-800' :
                          consultation.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {consultation.urgency}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{consultation.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/admin/articles/new" className="block w-full text-left p-3 bg-cyan-50 border border-cyan-200 rounded-lg hover:bg-cyan-100 transition-colors">
                    <div className="flex items-center">
                      <span className="text-cyan-600 mr-3">➕</span>
                      <span className="font-medium text-cyan-900">Create New Article</span>
                    </div>
                  </Link>
                  <Link href="/admin/blog/new" className="block w-full text-left p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="flex items-center">
                      <span className="text-green-600 mr-3">📝</span>
                      <span className="font-medium text-green-900">Write Blog Post</span>
                    </div>
                  </Link>
                  <Link href="/admin/consultations" className="block w-full text-left p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="flex items-center">
                      <span className="text-purple-600 mr-3">📞</span>
                      <span className="font-medium text-purple-900">View Consultations</span>
                    </div>
                  </Link>
                  <Link href="/admin/settings" className="block w-full text-left p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-3">⚙️</span>
                      <span className="font-medium text-gray-900">Site Settings</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Articles Management</h3>
                <Link href="/admin/articles/new" className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700">
                  Add New Article
                </Link>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-500">Article management interface will be implemented here.</p>
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Blog Posts Management</h3>
                <Link href="/admin/blog/new" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Write New Post
                </Link>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-500">Blog post management interface will be implemented here.</p>
            </div>
          </div>
        )}

        {/* Theories Tab */}
        {activeTab === 'theories' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Psychological Theories</h3>
                <Link href="/admin/theories/new" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  Add Theory
                </Link>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-500">Theory management interface will be implemented here.</p>
            </div>
          </div>
        )}

        {/* Consultations Tab */}
        {activeTab === 'consultations' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Consultation Requests</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-500">Consultation management interface will be implemented here.</p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Site Settings</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-500">Settings management interface will be implemented here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
