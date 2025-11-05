export interface ProductVariant {
  name: string
  priceModifier: number
}

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  price: number
  images: string[]
  stock: number
  category: string
  variants?: ProductVariant[]
  benefits?: string[]
}

export interface CartItem {
  productId: string
  title: string
  price: number
  quantity: number
  variant?: string
  image: string
}

export interface Cart {
  items: CartItem[]
}

export interface CheckoutRequest {
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
}

export interface CheckoutResponse {
  checkoutUrl: string
}
