import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso - Multivit',
  description: 'Termos de Uso da Multivit',
}

export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Termos de Uso
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e usar o site da Multivit, você concorda em cumprir e
              estar vinculado a estes Termos de Uso. Se você não concordar com
              qualquer parte destes termos, não use nosso site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Uso do Site
            </h2>
            <p>
              Você concorda em usar o site apenas para fins legais e de maneira
              que não infrinja os direitos de terceiros ou restrinja ou iniba o
              uso e aproveitamento do site por qualquer outra pessoa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Produtos e Preços
            </h2>
            <p>
              Todos os produtos estão sujeitos à disponibilidade. Reservamo-nos
              o direito de descontinuar qualquer produto a qualquer momento. Os
              preços estão sujeitos a alterações sem aviso prévio.
            </p>
            <p className="mt-3">
              Fazemos todos os esforços para garantir que os preços em nosso
              site sejam precisos, mas erros podem ocorrer. Se descobrirmos um
              erro de preço, entraremos em contato com você.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Pedidos e Pagamento
            </h2>
            <p>
              Ao fazer um pedido, você garante que:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Você tem mais de 18 anos</li>
              <li>As informações fornecidas são verdadeiras e completas</li>
              <li>Você tem autoridade para usar o método de pagamento fornecido</li>
            </ul>
            <p className="mt-3">
              Reservamo-nos o direito de recusar ou cancelar qualquer pedido por
              qualquer motivo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Entrega
            </h2>
            <p>
              Os prazos de entrega são estimativas e podem variar. Não nos
              responsabilizamos por atrasos causados por transportadoras ou
              circunstâncias fora do nosso controle.
            </p>
            <p className="mt-3">
              Frete grátis para pedidos acima de R$ 150,00 para todo o Brasil.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Política de Devolução
            </h2>
            <p>
              Você pode devolver produtos não abertos dentro de 30 dias após o
              recebimento para um reembolso total. Produtos abertos não podem ser
              devolvidos por motivos de segurança e higiene.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo deste site, incluindo textos, gráficos, logos e
              imagens, é propriedade da Multivit e protegido por leis de direitos
              autorais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Limitação de Responsabilidade
            </h2>
            <p>
              A Multivit não será responsável por quaisquer danos indiretos,
              especiais, incidentais ou consequenciais resultantes do uso ou
              incapacidade de usar nossos produtos ou serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Alterações aos Termos
            </h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer
              momento. As alterações entrarão em vigor imediatamente após a
              publicação no site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Contato
            </h2>
            <p>
              Para questões sobre estes Termos de Uso, entre em contato:
            </p>
            <p className="mt-2">
              E-mail: contato@multivit.com.br<br />
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
