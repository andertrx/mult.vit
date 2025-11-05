import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <svg
              className="w-12 h-12 text-green-600"
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
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pedido Realizado com Sucesso!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Obrigado pela sua compra. Você receberá um e-mail de confirmação em
            breve com os detalhes do seu pedido e informações de rastreamento.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            O que acontece agora?
          </h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Confirmação por E-mail
                </h3>
                <p className="text-sm text-gray-600">
                  Você receberá um e-mail com todos os detalhes do seu pedido.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Preparação do Pedido
                </h3>
                <p className="text-sm text-gray-600">
                  Nossa equipe começará a preparar seu pedido para envio.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Envio e Rastreamento
                </h3>
                <p className="text-sm text-gray-600">
                  Assim que enviado, você receberá o código de rastreamento.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Entrega no Endereço
                </h3>
                <p className="text-sm text-gray-600">
                  Seu pedido será entregue no endereço cadastrado.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <ButtonLink size="lg">Voltar para a Loja</ButtonLink>
          </Link>
          <Link href="/contato">
            <ButtonLink variant="outline" size="lg">
              Falar com Suporte
            </ButtonLink>
          </Link>
        </div>
      </div>
    </div>
  )
}
