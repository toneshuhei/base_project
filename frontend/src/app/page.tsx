'use client'

import { useState, useEffect } from 'react'
import { ApiStatus } from '@/components/ApiStatus'
import { UserList } from '@/components/UserList'
import { PostList } from '@/components/PostList'

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🚀 Base Project
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          フルスタック構成のWebアプリケーション開発用ベーステンプレート
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Next.js 14
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            FastAPI
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
            Django
          </span>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
            PostgreSQL
          </span>
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-md p-1">
          {[
            { id: 'overview', label: '概要' },
            { id: 'api', label: 'API状態' },
            { id: 'users', label: 'ユーザー' },
            { id: 'posts', label: '投稿' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'overview' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">プロジェクト概要</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-primary-600">
                  🎯 主要機能
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Next.js フロントエンド</li>
                  <li>• FastAPI REST API</li>
                  <li>• Django 管理画面</li>
                  <li>• PostgreSQL データベース</li>
                  <li>• Docker 統合環境</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 text-primary-600">
                  🔗 サービスURL
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    • Frontend:{' '}
                    <a href="http://localhost:3000" className="text-primary-500 hover:underline">
                      http://localhost:3000
                    </a>
                  </li>
                  <li>
                    • FastAPI:{' '}
                    <a href="http://localhost:8000/docs" className="text-primary-500 hover:underline">
                      http://localhost:8000/docs
                    </a>
                  </li>
                  <li>
                    • Django Admin:{' '}
                    <a href="http://localhost:8001/admin" className="text-primary-500 hover:underline">
                      http://localhost:8001/admin
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && <ApiStatus />}
        {activeTab === 'users' && <UserList />}
        {activeTab === 'posts' && <PostList />}
      </div>
    </div>
  )
}