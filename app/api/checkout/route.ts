import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { CheckoutRequest, CheckoutResponse } from '@/types'
import { calculateSubtotal, calculateShipping, calculateTotal } from '@/utils/price'

/**
 * POST /api/checkout
 *
 * Processa o checkout e retorna uma URL de pagamento.
 *
 * IMPLEMENTAÇÃO ATUAL: Mock que gera uma URL com UUID para demonstração.
 *
 * COMO INTEGRAR COM STRIPE:
 * 1. Instale o SDK do Stripe: npm install stripe
 * 2. Configure a variável de ambiente: STRIPE_SECRET_KEY no arquivo .env.local
 * 3. Importe o Stripe: import Stripe from 'stripe'
 * 4. Inicialize: const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
 * 5. Substitua o código mock abaixo por:
 *
 *    const session = await stripe.checkout.sessions.create({
 *      payment_method_types: ['card'],
 *      line_items: request.items.map(item => ({
 *        price_data: {
 *          currency: 'brl',
 *          product_data: { name: item.title },
 *          unit_amount: Math.round(item.price * 100), // Stripe usa centavos
 *        },
 *        quantity: item.quantity,
 *      })),
 *      mode: 'payment',
 *      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
 *      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
 *    })
 *    return NextResponse.json({ checkoutUrl: session.url })
 *
 * COMO INTEGRAR COM PAYPAL:
 * 1. Instale o SDK do PayPal: npm install @paypal/checkout-server-sdk
 * 2. Configure as variáveis: PAYPAL_CLIENT_ID e PAYPAL_CLIENT_SECRET
 * 3. Crie uma ordem PayPal e retorne o approval_url
 *
 * Documentação:
 * - Stripe: https://stripe.com/docs/checkout/quickstart
 * - PayPal: https://developer.paypal.com/docs/checkout/
 */
export async function POST(request: Request) {
  try {
    const body: CheckoutRequest = await request.json()

    // Validação dos dados
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Recalcula os valores no backend para segurança
    const subtotal = calculateSubtotal(body.items)
    const shipping = calculateShipping(subtotal)
    const total = calculateTotal(subtotal, shipping)

    // Validação do total
    if (Math.abs(total - body.total) > 0.01) {
      return NextResponse.json(
        { error: 'Total mismatch. Please refresh and try again.' },
        { status: 400 }
      )
    }

    // ===============================================
    // MOCK IMPLEMENTATION - Gera URL de checkout fake
    // ===============================================
    const checkoutId = uuidv4()
    const mockCheckoutUrl = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/checkout/success?id=${checkoutId}`

    // TODO: Substituir pelo código de integração real (Stripe/PayPal)
    // Veja comentários acima para instruções detalhadas

    const response: CheckoutResponse = {
      checkoutUrl: mockCheckoutUrl,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    )
  }
}
