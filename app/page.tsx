import { ProductCard } from '@/components/ui/ProductCard'
import { ButtonLink } from '@/components/ui/Button'
import { Product } from '@/types'
import Link from 'next/link'

async function getProducts(): Promise<Product[]> {
  // Em produção, use a URL completa do seu domínio
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/products`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    // Durante build, leia diretamente do arquivo
    const productsData = await import('@/data/products.json')
    return productsData.default as Product[]
  }

  return res.json()
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Sua Saúde em{' '}
              <span className="text-primary-600">Primeiro Lugar</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Descubra os melhores multivitamínicos e suplementos para toda a
              família. Qualidade, eficácia e confiança em cada produto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#produtos">
                <ButtonLink size="lg">Ver Produtos</ButtonLink>
              </Link>
              <Link href="/contato">
                <ButtonLink variant="outline" size="lg">Entre em Contato</ButtonLink>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos Produtos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Desenvolvidos com os melhores ingredientes e tecnologia de ponta
              para garantir sua saúde e bem-estar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que escolher a Multivit?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Qualidade Garantida</h3>
              <p className="text-gray-600">
                Todos os produtos são testados e certificados, garantindo
                máxima eficácia e segurança.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Entrega Rápida</h3>
              <p className="text-gray-600">
                Frete grátis para compras acima de R$ 150. Receba em casa com
                segurança e agilidade.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Suporte Especializado</h3>
              <p className="text-gray-600">
                Nossa equipe está pronta para ajudar você a escolher o produto
                ideal para suas necessidades.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
