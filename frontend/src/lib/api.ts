const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface User {
  id: number
  username: string
  email: string
  first_name?: string
  last_name?: string
  is_active: boolean
  date_joined: string
}

export interface Post {
  id: number
  title: string
  content?: string
  author_id: number
  created_at: string
  updated_at: string
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Health check
  async healthCheck(): Promise<{ message: string; status: string }> {
    return this.request('/api/hello')
  }

  // Users
  async getUsers(): Promise<User[]> {
    return this.request('/api/users')
  }

  async getUser(id: number): Promise<User> {
    return this.request(`/api/users/${id}`)
  }

  // Posts
  async getPosts(): Promise<Post[]> {
    return this.request('/api/posts')
  }

  async getPost(id: number): Promise<Post> {
    return this.request(`/api/posts/${id}`)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)