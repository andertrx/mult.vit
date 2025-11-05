import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary-400 mb-4">
              Multivit
            </h3>
            <p className="text-gray-400 text-sm">
              Sua saúde e bem-estar em primeiro lugar. Produtos de qualidade
              para toda a família.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/#produtos"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">
                Segunda a Sexta: 8h às 18h
              </li>
              <li className="text-gray-400">
                Sábado: 8h às 14h
              </li>
              <li className="text-gray-400">
                Email: contato@multivit.com.br
              </li>
              <li className="text-gray-400">
                Tel: (11) 3000-0000
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Políticas</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/politica-privacidade"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos-uso"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Multivit. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
