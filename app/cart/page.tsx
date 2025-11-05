'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { Button, ButtonLink } from '@/components/ui/Button'
import { formatPrice, calculateShipping, calculateTotal } from '@/utils/price'
import { CheckoutRequest } from '@/types'

export default function CartPage() {
  const router = useRouter()
  const { cart, removeItem, updateQuantity, getCartTotal, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = getCartTotal()
  const shipping = calculateShipping(subtotal)
  const total = calculateTotal(subtotal, shipping)

  const handleCheckout = async () => {
    if (cart.items.length === 0) return

    setIsProcessing(true)

    try {
      const checkoutData: CheckoutRequest = {
        items: cart.items,
        subtotal,
        shipping,
        total,
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      })

      if (!response.ok) {
        throw new Error('Failed to process checkout')
      }

      const data = await response.json()

      // Clear cart and redirect to checkout URL
      clearCart()
      window.location.href = data.checkoutUrl
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Erro ao processar o checkout. Por favor, tente novamente.')
      setIsProcessing(false)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Seu carrinho está vazio
          </h1>
          <p className="text-gray-600 mb-8">
            Adicione produtos ao seu carrinho para continuar comprando.
          </p>
          <Link href="/">
            <ButtonLink size="lg">Ver Produtos</ButtonLink>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Carrinho de Compras
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map(item => (
            <div
              key={`${item.productId}-${item.variant || 'default'}`}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex gap-6">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="96px"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  {item.variant && (
                    <p className="text-sm text-gray-600 mb-2">{item.variant}</p>
                  )}
                  <p className="text-lg font-bold text-primary-600">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.productId, item.variant)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                    aria-label="Remover item"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity - 1,
                          item.variant
                        )
                      }
                      className="w-8 h-8 rounded border-2 border-gray-300 hover:border-primary-600 transition-colors"
                      aria-label="Diminuir quantidade"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity + 1,
                          item.variant
                        )
                      }
                      className="w-8 h-8 rounded border-2 border-gray-300 hover:border-primary-600 transition-colors"
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Resumo do Pedido
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Frete:</span>
                <span className="font-medium">
                  {shipping === 0 ? 'GRÁTIS' : formatPrice(shipping)}
                </span>
              </div>
              {subtotal < 150 && (
                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                  Adicione {formatPrice(150 - subtotal)} para frete grátis!
                </p>
              )}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full mb-4"
              size="lg"
            >
              {isProcessing ? 'Processando...' : 'Finalizar Compra'}
            </Button>

            <Link href="/">
              <ButtonLink variant="outline" className="w-full">
                Continuar Comprando
              </ButtonLink>
            </Link>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Pagamento 100% seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
