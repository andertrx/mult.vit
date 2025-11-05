import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/cart-context'

export const metadata: Metadata = {
  title: 'Multivit - Vitaminas e Suplementos para Toda a Família',
  description:
    'Encontre os melhores multivitamínicos para sua saúde e bem-estar. Produtos de qualidade com entrega rápida.',
  keywords: [
    'multivitamínicos',
    'vitaminas',
    'suplementos',
    'saúde',
    'bem-estar',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
