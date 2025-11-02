import AsyncStorage from '@react-native-async-storage/async-storage'
import { MMKV } from 'react-native-mmkv'

/**
 * REACT NATIVE STORAGE PATTERNS
 *
 * AsyncStorage, MMKV, and state persistence
 */

/**
 * PATTERN 1: AsyncStorage Wrapper
 */

export const asyncStorage = {
  // Save string
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (error) {
      console.error('AsyncStorage setItem error:', error)
      throw error
    }
  },

  // Get string
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key)
    } catch (error) {
      console.error('AsyncStorage getItem error:', error)
      return null
    }
  },

  // Save object
  async setObject<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (error) {
      console.error('AsyncStorage setObject error:', error)
      throw error
    }
  },

  // Get object
  async getObject<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue ? JSON.parse(jsonValue) : null
    } catch (error) {
      console.error('AsyncStorage getObject error:', error)
      return null
    }
  },

  // Remove item
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.error('AsyncStorage removeItem error:', error)
      throw error
    }
  },

  // Clear all
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear()
    } catch (error) {
      console.error('AsyncStorage clear error:', error)
      throw error
    }
  },

  // Get all keys
  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys()
    } catch (error) {
      console.error('AsyncStorage getAllKeys error:', error)
      return []
    }
  },

  // Batch operations
  async multiSet(keyValuePairs: [string, string][]): Promise<void> {
    try {
      await AsyncStorage.multiSet(keyValuePairs)
    } catch (error) {
      console.error('AsyncStorage multiSet error:', error)
      throw error
    }
  },

  async multiGet(keys: string[]): Promise<[string, string | null][]> {
    try {
      return await AsyncStorage.multiGet(keys)
    } catch (error) {
      console.error('AsyncStorage multiGet error:', error)
      return []
    }
  },
}

/**
 * PATTERN 2: MMKV Storage (Fast Alternative)
 *
 * 30x faster than AsyncStorage
 */

const storage = new MMKV()

export const mmkvStorage = {
  // String
  set(key: string, value: string): void {
    storage.set(key, value)
  },

  get(key: string): string | undefined {
    return storage.getString(key)
  },

  // Number
  setNumber(key: string, value: number): void {
    storage.set(key, value)
  },

  getNumber(key: string): number | undefined {
    return storage.getNumber(key)
  },

  // Boolean
  setBoolean(key: string, value: boolean): void {
    storage.set(key, value)
  },

  getBoolean(key: string): boolean | undefined {
    return storage.getBoolean(key)
  },

  // Object
  setObject<T>(key: string, value: T): void {
    storage.set(key, JSON.stringify(value))
  },

  getObject<T>(key: string): T | undefined {
    const json = storage.getString(key)
    return json ? JSON.parse(json) : undefined
  },

  // Delete
  delete(key: string): void {
    storage.delete(key)
  },

  // Clear all
  clearAll(): void {
    storage.clearAll()
  },

  // Check if key exists
  contains(key: string): boolean {
    return storage.contains(key)
  },

  // Get all keys
  getAllKeys(): string[] {
    return storage.getAllKeys()
  },
}

/**
 * PATTERN 3: Type-Safe Storage
 */

interface StorageSchema {
  user: { id: string; name: string; email: string }
  settings: { theme: 'light' | 'dark'; notifications: boolean }
  token: string
  onboarding_complete: boolean
}

export const typedStorage = {
  async set<K extends keyof StorageSchema>(
    key: K,
    value: StorageSchema[K]
  ): Promise<void> {
    return asyncStorage.setObject(key, value)
  },

  async get<K extends keyof StorageSchema>(key: K): Promise<StorageSchema[K] | null> {
    return asyncStorage.getObject<StorageSchema[K]>(key)
  },

  async remove<K extends keyof StorageSchema>(key: K): Promise<void> {
    return asyncStorage.removeItem(key)
  },
}

/**
 * PATTERN 4: Encrypted Storage
 */

import * as Keychain from 'react-native-keychain'

export const secureStorage = {
  // Save credentials
  async setCredentials(username: string, password: string): Promise<boolean> {
    try {
      await Keychain.setGenericPassword(username, password)
      return true
    } catch (error) {
      console.error('Keychain setCredentials error:', error)
      return false
    }
  },

  // Get credentials
  async getCredentials(): Promise<{ username: string; password: string } | null> {
    try {
      const credentials = await Keychain.getGenericPassword()
      if (credentials) {
        return {
          username: credentials.username,
          password: credentials.password,
        }
      }
      return null
    } catch (error) {
      console.error('Keychain getCredentials error:', error)
      return null
    }
  },

  // Save secure data
  async setSecure(key: string, value: string): Promise<boolean> {
    try {
      await Keychain.setInternetCredentials(key, key, value)
      return true
    } catch (error) {
      console.error('Keychain setSecure error:', error)
      return false
    }
  },

  // Get secure data
  async getSecure(key: string): Promise<string | null> {
    try {
      const credentials = await Keychain.getInternetCredentials(key)
      if (credentials) {
        return credentials.password
      }
      return null
    } catch (error) {
      console.error('Keychain getSecure error:', error)
      return null
    }
  },

  // Remove credentials
  async removeCredentials(): Promise<boolean> {
    try {
      await Keychain.resetGenericPassword()
      return true
    } catch (error) {
      console.error('Keychain removeCredentials error:', error)
      return false
    }
  },
}

/**
 * PATTERN 5: Cache with Expiration
 */

interface CacheItem<T> {
  value: T
  expiry: number
}

export const cacheStorage = {
  async set<T>(key: string, value: T, ttlSeconds: number = 3600): Promise<void> {
    const item: CacheItem<T> = {
      value,
      expiry: Date.now() + ttlSeconds * 1000,
    }
    await asyncStorage.setObject(key, item)
  },

  async get<T>(key: string): Promise<T | null> {
    const item = await asyncStorage.getObject<CacheItem<T>>(key)

    if (!item) return null

    // Check if expired
    if (Date.now() > item.expiry) {
      await asyncStorage.removeItem(key)
      return null
    }

    return item.value
  },

  async remove(key: string): Promise<void> {
    await asyncStorage.removeItem(key)
  },

  async clear(): Promise<void> {
    // Clear all cache keys (you might want to use a prefix)
    await asyncStorage.clear()
  },
}

/**
 * PATTERN 6: React Hooks for Storage
 */

import { useState, useEffect, useCallback } from 'react'

export function useAsyncStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => Promise<void>, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load from storage
    asyncStorage
      .getObject<T>(key)
      .then((value) => {
        if (value !== null) {
          setStoredValue(value)
        }
      })
      .finally(() => setLoading(false))
  }, [key])

  const setValue = useCallback(
    async (value: T) => {
      try {
        setStoredValue(value)
        await asyncStorage.setObject(key, value)
      } catch (error) {
        console.error('Error setting storage:', error)
      }
    },
    [key]
  )

  return [storedValue, setValue, loading]
}

// Usage example
export function ExampleComponent() {
  const [user, setUser, loading] = useAsyncStorage<{ name: string }>('user', {
    name: 'Guest',
  })

  if (loading) return null

  return null // Your JSX
}

/**
 * PATTERN 7: Persisted Zustand Store
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserStore {
  user: { id: string; name: string } | null
  token: string | null
  setUser: (user: { id: string; name: string }) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => ({
        getItem: async (name) => {
          return (await asyncStorage.getItem(name)) || null
        },
        setItem: async (name, value) => {
          await asyncStorage.setItem(name, value)
        },
        removeItem: async (name) => {
          await asyncStorage.removeItem(name)
        },
      })),
    }
  )
)

/**
 * PATTERN 8: Migration Helper
 */

export const storageMigration = {
  async migrate(from: string, to: string): Promise<void> {
    const value = await asyncStorage.getItem(from)
    if (value) {
      await asyncStorage.setItem(to, value)
      await asyncStorage.removeItem(from)
    }
  },

  async migrateKeys(migrations: Record<string, string>): Promise<void> {
    for (const [from, to] of Object.entries(migrations)) {
      await this.migrate(from, to)
    }
  },
}

/**
 * PATTERN 9: Storage Events
 */

type StorageListener = (key: string, value: any) => void

class StorageEventEmitter {
  private listeners: StorageListener[] = []

  subscribe(listener: StorageListener): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  emit(key: string, value: any): void {
    this.listeners.forEach((listener) => listener(key, value))
  }
}

export const storageEvents = new StorageEventEmitter()

// Enhanced storage with events
export const storageWithEvents = {
  async setItem(key: string, value: string): Promise<void> {
    await asyncStorage.setItem(key, value)
    storageEvents.emit(key, value)
  },

  async setObject<T>(key: string, value: T): Promise<void> {
    await asyncStorage.setObject(key, value)
    storageEvents.emit(key, value)
  },

  subscribe(listener: StorageListener): () => void {
    return storageEvents.subscribe(listener)
  },
}
