import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Product } from '@/types'
import { formatPrice } from '@/utils/price'
import { AddToCartForm } from '@/components/ui/AddToCartForm'
import productsData from '@/data/products.json'

interface ProductPageProps {
  params: { slug: string }
}

async function getProduct(slug: string): Promise<Product | null> {
  const products = productsData as Product[]
  return products.find(p => p.slug === slug) || null
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug)

  if (!product) {
    return {
      title: 'Produto não encontrado',
    }
  }

  return {
    title: `${product.title} - Multivit`,
    description: product.description,
    keywords: [product.category, product.title, 'multivitamínico', 'vitaminas'],
  }
}

export async function generateStaticParams() {
  const products = productsData as Product[]
  return products.map(product => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <Image
                  src={image}
                  alt={`${product.title} - Imagem ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </span>
              {product.variants && product.variants.length > 0 && (
                <span className="text-gray-500">a partir de</span>
              )}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-3">Benefícios:</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-primary-600 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stock Status */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <p className="text-green-600 font-medium">
                ✓ Em estoque ({product.stock} unidades disponíveis)
              </p>
            ) : (
              <p className="text-red-600 font-medium">
                Produto indisponível no momento
              </p>
            )}
          </div>

          {/* Add to Cart Form */}
          <AddToCartForm product={product} />

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl mb-2">🚚</div>
                <p className="text-sm text-gray-600">
                  Frete grátis acima de R$ 150
                </p>
              </div>
              <div>
                <div className="text-2xl mb-2">🔒</div>
                <p className="text-sm text-gray-600">
                  Pagamento seguro
                </p>
              </div>
              <div>
                <div className="text-2xl mb-2">✅</div>
                <p className="text-sm text-gray-600">
                  Garantia de qualidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
