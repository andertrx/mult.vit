import {
  formatPrice,
  calculateSubtotal,
  calculateShipping,
  calculateTotal,
} from '@/utils/price'

describe('Price Utilities', () => {
  describe('formatPrice', () => {
    it('should format price as Brazilian currency', () => {
      expect(formatPrice(89.9)).toBe('R$ 89,90')
      expect(formatPrice(100)).toBe('R$ 100,00')
      expect(formatPrice(1234.56)).toBe('R$ 1.234,56')
    })

    it('should handle zero', () => {
      expect(formatPrice(0)).toBe('R$ 0,00')
    })
  })

  describe('calculateSubtotal', () => {
    it('should calculate subtotal correctly for single item', () => {
      const items = [{ price: 89.9, quantity: 1 }]
      expect(calculateSubtotal(items)).toBe(89.9)
    })

    it('should calculate subtotal correctly for multiple items', () => {
      const items = [
        { price: 89.9, quantity: 2 },
        { price: 99.9, quantity: 1 },
      ]
      expect(calculateSubtotal(items)).toBe(279.7)
    })

    it('should handle empty cart', () => {
      expect(calculateSubtotal([])).toBe(0)
    })

    it('should calculate correctly with different quantities', () => {
      const items = [
        { price: 50, quantity: 3 },
        { price: 25, quantity: 2 },
      ]
      expect(calculateSubtotal(items)).toBe(200)
    })
  })

  describe('calculateShipping', () => {
    it('should return 15 for subtotal less than 150', () => {
      expect(calculateShipping(100)).toBe(15)
      expect(calculateShipping(149.99)).toBe(15)
      expect(calculateShipping(0)).toBe(15)
    })

    it('should return 0 for subtotal equal to or greater than 150', () => {
      expect(calculateShipping(150)).toBe(0)
      expect(calculateShipping(200)).toBe(0)
      expect(calculateShipping(1000)).toBe(0)
    })
  })

  describe('calculateTotal', () => {
    it('should calculate total correctly', () => {
      expect(calculateTotal(100, 15)).toBe(115)
      expect(calculateTotal(150, 0)).toBe(150)
      expect(calculateTotal(200, 0)).toBe(200)
    })

    it('should handle zero values', () => {
      expect(calculateTotal(0, 0)).toBe(0)
      expect(calculateTotal(0, 15)).toBe(15)
    })
  })

  describe('Complete cart calculation flow', () => {
    it('should calculate total correctly for cart below free shipping threshold', () => {
      const items = [
        { price: 89.9, quantity: 1 },
        { price: 50, quantity: 1 },
      ]
      const subtotal = calculateSubtotal(items)
      const shipping = calculateShipping(subtotal)
      const total = calculateTotal(subtotal, shipping)

      expect(subtotal).toBe(139.9)
      expect(shipping).toBe(15)
      expect(total).toBe(154.9)
    })

    it('should calculate total correctly for cart above free shipping threshold', () => {
      const items = [
        { price: 89.9, quantity: 2 },
        { price: 50, quantity: 1 },
      ]
      const subtotal = calculateSubtotal(items)
      const shipping = calculateShipping(subtotal)
      const total = calculateTotal(subtotal, shipping)

      expect(subtotal).toBe(229.8)
      expect(shipping).toBe(0)
      expect(total).toBe(229.8)
    })

    it('should calculate total correctly for cart exactly at threshold', () => {
      const items = [{ price: 150, quantity: 1 }]
      const subtotal = calculateSubtotal(items)
      const shipping = calculateShipping(subtotal)
      const total = calculateTotal(subtotal, shipping)

      expect(subtotal).toBe(150)
      expect(shipping).toBe(0)
      expect(total).toBe(150)
    })
  })
})
