'use client'

import { useState, useEffect } from 'react'
import { apiClient, Post } from '@/lib/api'

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const postData = await apiClient.getPosts()
        setPosts(postData)
        setError(null)
      } catch (err) {
        setError('投稿データの取得に失敗しました')
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
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
      <h2 className="text-2xl font-semibold mb-6">投稿一覧</h2>
      
      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">投稿が見つかりません</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <header className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>作成者 ID: {post.author_id}</span>
                  <span>•</span>
                  <time dateTime={post.created_at}>
                    {new Date(post.created_at).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </time>
                </div>
              </header>
              
              {post.content && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {post.content}
                  </p>
                </div>
              )}
              
              {post.updated_at !== post.created_at && (
                <footer className="mt-4 pt-4 border-t text-xs text-gray-400">
                  最終更新: {new Date(post.updated_at).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </footer>
              )}
            </article>
          ))}
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-500 text-center">
        合計 {posts.length} 件の投稿
      </div>
    </div>
  )
}