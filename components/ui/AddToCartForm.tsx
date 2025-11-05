'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/types'
import { Button } from './Button'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/utils/price'

interface AddToCartFormProps {
  product: Product
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants?.[0]?.name || ''
  )
  const [quantity, setQuantity] = useState(1)

  const currentVariant = product.variants?.find(
    v => v.name === selectedVariant
  )
  const currentPrice = product.price + (currentVariant?.priceModifier || 0)

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      title: product.title,
      price: currentPrice,
      quantity,
      variant: selectedVariant || undefined,
      image: product.images[0],
    })

    // Show success message (you could use a toast notification here)
    alert('Produto adicionado ao carrinho!')
  }

  const handleBuyNow = () => {
    addItem({
      productId: product.id,
      title: product.title,
      price: currentPrice,
      quantity,
      variant: selectedVariant || undefined,
      image: product.images[0],
    })

    // Redirect to cart
    router.push('/cart')
  }

  if (product.stock === 0) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg">
        <p className="text-gray-600 text-center">
          Este produto está temporariamente indisponível
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-6">
      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione a opção:
          </label>
          <div className="grid grid-cols-2 gap-3">
            {product.variants.map(variant => {
              const variantPrice = product.price + variant.priceModifier
              return (
                <button
                  key={variant.name}
                  type="button"
                  onClick={() => setSelectedVariant(variant.name)}
                  className={`p-3 border-2 rounded-lg text-left transition-all ${
                    selectedVariant === variant.name
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium text-gray-900">
                    {variant.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatPrice(variantPrice)}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantidade:
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary-600 transition-colors"
            aria-label="Diminuir quantidade"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={e =>
              setQuantity(
                Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1))
              )
            }
            className="w-20 h-10 text-center border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary-600 transition-colors"
            aria-label="Aumentar quantidade"
          >
            +
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">Subtotal:</span>
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(currentPrice * quantity)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleBuyNow}
          className="w-full"
          size="lg"
        >
          Comprar Agora
        </Button>
        <Button
          onClick={handleAddToCart}
          variant="outline"
          className="w-full"
          size="lg"
        >
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  )
}
