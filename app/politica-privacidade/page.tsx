import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade - Multivit',
  description: 'Política de Privacidade da Multivit',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Política de Privacidade
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Informações que Coletamos
            </h2>
            <p>
              A Multivit coleta informações que você nos fornece diretamente ao
              criar uma conta, fazer uma compra ou entrar em contato conosco.
              Essas informações podem incluir:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Endereço de entrega</li>
              <li>Número de telefone</li>
              <li>Informações de pagamento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Como Usamos Suas Informações
            </h2>
            <p>
              Utilizamos as informações coletadas para:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Processar e entregar seus pedidos</li>
              <li>Enviar atualizações sobre seus pedidos</li>
              <li>Responder às suas dúvidas e solicitações</li>
              <li>Melhorar nossos produtos e serviços</li>
              <li>Enviar comunicações de marketing (com seu consentimento)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Proteção de Dados
            </h2>
            <p>
              A Multivit implementa medidas de segurança técnicas e
              organizacionais adequadas para proteger suas informações pessoais
              contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Compartilhamento de Informações
            </h2>
            <p>
              Não vendemos, alugamos ou compartilhamos suas informações pessoais
              com terceiros para fins de marketing. Podemos compartilhar suas
              informações com:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Prestadores de serviços necessários para processar pedidos</li>
              <li>Empresas de pagamento e entrega</li>
              <li>Autoridades legais quando exigido por lei</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Seus Direitos
            </h2>
            <p>
              Você tem o direito de:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir informações imprecisas</li>
              <li>Solicitar a exclusão de suas informações</li>
              <li>Retirar o consentimento para comunicações de marketing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Contato
            </h2>
            <p>
              Para questões sobre esta Política de Privacidade, entre em contato
              conosco em:
            </p>
            <p className="mt-2">
              E-mail: privacidade@multivit.com.br<br />
              Telefone: (11) 3000-0000
            </p>
          </section>

          <section className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
