'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

export function Header() {
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-3xl font-bold text-primary-600">Multivit</div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Início
            </Link>
            <Link
              href="/#produtos"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Produtos
            </Link>
            <Link
              href="/contato"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Contato
            </Link>
          </nav>

          <Link
            href="/cart"
            className="relative inline-flex items-center px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Carrinho
            {cartCount > 0 && (
              <span className="ml-2 bg-white text-primary-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
