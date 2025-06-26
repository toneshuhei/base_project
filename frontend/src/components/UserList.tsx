'use client'

import { useState, useEffect } from 'react'
import { apiClient, User } from '@/lib/api'

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const userData = await apiClient.getUsers()
        setUsers(userData)
        setError(null)
      } catch (err) {
        setError('ユーザーデータの取得に失敗しました')
        console.error('Error fetching users:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <span className="ml-2 text-gray-600">読み込み中...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center py-8">
          <div className="text-red-500 text-lg mb-2">❌ エラー</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold mb-6">ユーザー一覧</h2>
      
      {users.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">ユーザーが見つかりません</p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg">
                    {user.first_name || user.last_name 
                      ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
                      : user.username
                    }
                  </h3>
                  <p className="text-gray-600">@{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.is_active ? 'アクティブ' : '非アクティブ'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    登録日: {new Date(user.date_joined).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-500 text-center">
        合計 {users.length} 人のユーザー
      </div>
    </div>
  )
}