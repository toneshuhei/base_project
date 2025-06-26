'use client'

import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api'

export function ApiStatus() {
  const [status, setStatus] = useState<{
    fastapi: 'loading' | 'success' | 'error'
    message?: string
  }>({ fastapi: 'loading' })

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await apiClient.healthCheck()
        setStatus({
          fastapi: 'success',
          message: response.message
        })
      } catch (error) {
        setStatus({
          fastapi: 'error',
          message: 'FastAPI に接続できません'
        })
      }
    }

    checkApiStatus()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      default:
        return '⏳'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      default:
        return 'text-yellow-600'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold mb-6">API 接続状態</h2>
      
      <div className="space-y-4">
        {/* FastAPI Status */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">FastAPI</h3>
            <p className="text-sm text-gray-500">REST API サーバー</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getStatusIcon(status.fastapi)}</span>
            <span className={`font-medium ${getStatusColor(status.fastapi)}`}>
              {status.fastapi === 'loading' ? '確認中...' : 
               status.fastapi === 'success' ? '接続OK' : '接続エラー'}
            </span>
          </div>
        </div>

        {/* Django Status */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">Django Admin</h3>
            <p className="text-sm text-gray-500">管理画面サーバー</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">ℹ️</span>
            <span className="font-medium text-blue-600">
              <a href="http://localhost:8001/admin" target="_blank" rel="noopener noreferrer" className="hover:underline">
                管理画面へ
              </a>
            </span>
          </div>
        </div>

        {/* Database Status */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">PostgreSQL</h3>
            <p className="text-sm text-gray-500">データベース</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🗄️</span>
            <span className="font-medium text-indigo-600">
              Docker 環境で稼働中
            </span>
          </div>
        </div>
      </div>

      {status.message && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>レスポンス:</strong> {status.message}
          </p>
        </div>
      )}
    </div>
  )
}