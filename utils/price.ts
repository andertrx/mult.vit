/**
 * Formata um número como moeda brasileira (R$)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}

/**
 * Calcula o subtotal do carrinho
 */
export function calculateSubtotal(
  items: Array<{ price: number; quantity: number }>
): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

/**
 * Calcula o frete baseado no subtotal
 * Frete grátis para pedidos acima de R$ 150
 */
export function calculateShipping(subtotal: number): number {
  if (subtotal >= 150) {
    return 0
  }
  return 15.0
}

/**
 * Calcula o total do pedido (subtotal + frete)
 */
export function calculateTotal(subtotal: number, shipping: number): number {
  return subtotal + shipping
}
