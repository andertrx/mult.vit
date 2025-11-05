import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Produto não encontrado
        </h2>
        <p className="text-gray-600 mb-8">
          Desculpe, não encontramos o produto que você está procurando.
        </p>
        <Link href="/">
          <ButtonLink>Voltar para a página inicial</ButtonLink>
        </Link>
      </div>
    </div>
  )
}
