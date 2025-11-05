'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItem, Cart } from '@/types'

interface CartContextType {
  cart: Cart
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variant?: string) => void
  updateQuantity: (productId: string, quantity: number, variant?: string) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [] })
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('multivit-cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('multivit-cart', JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const addItem = (item: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        i => i.productId === item.productId && i.variant === item.variant
      )

      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        const updatedItems = [...prevCart.items]
        updatedItems[existingItemIndex].quantity += item.quantity
        return { items: updatedItems }
      } else {
        // Add new item
        return { items: [...prevCart.items, item] }
      }
    })
  }

  const removeItem = (productId: string, variant?: string) => {
    setCart(prevCart => ({
      items: prevCart.items.filter(
        item => !(item.productId === productId && item.variant === variant)
      ),
    }))
  }

  const updateQuantity = (
    productId: string,
    quantity: number,
    variant?: string
  ) => {
    if (quantity <= 0) {
      removeItem(productId, variant)
      return
    }

    setCart(prevCart => ({
      items: prevCart.items.map(item =>
        item.productId === productId && item.variant === variant
          ? { ...item, quantity }
          : item
      ),
    }))
  }

  const clearCart = () => {
    setCart({ items: [] })
  }

  const getCartTotal = () => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  const getCartCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
