# Multivit E-commerce

E-commerce responsivo e dinâmico desenvolvido com Next.js, TypeScript e Tailwind CSS para a marca Multivit.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)

## 🚀 Funcionalidades

- ✅ Listagem de produtos com grid responsivo
- ✅ Páginas dinâmicas de produto com galeria de imagens
- ✅ Carrinho de compras com persistência em localStorage
- ✅ Cálculo automático de frete (grátis acima de R$ 150)
- ✅ Sistema de variações de produto (tamanhos/quantidades)
- ✅ Checkout integrado (mock para demonstração)
- ✅ SEO otimizado com meta tags dinâmicas
- ✅ Design responsivo mobile-first
- ✅ Acessibilidade (semantic HTML, alt text)
- ✅ Páginas estáticas (Política, Termos, Contato)

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd mult.vit
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (opcional):
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:
```env
NEXT_PUBLIC_URL=http://localhost:3000

# Para integração com Stripe (veja seção abaixo)
# STRIPE_SECRET_KEY=sk_test_...
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Para integração com PayPal (veja seção abaixo)
# PAYPAL_CLIENT_ID=...
# PAYPAL_CLIENT_SECRET=...
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 📦 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Cria build de produção
npm start            # Inicia o servidor de produção
npm run lint         # Executa o ESLint
npm run format       # Formata o código com Prettier
npm test             # Executa os testes unitários
npm test:watch       # Executa testes em modo watch
```

## 🏗️ Estrutura do Projeto

```
mult.vit/
├── app/                          # App Router do Next.js 14
│   ├── api/                      # API Routes
│   │   ├── products/             # Endpoints de produtos
│   │   │   ├── route.ts          # GET /api/products
│   │   │   └── [id]/route.ts     # GET /api/products/:id
│   │   └── checkout/             # Endpoint de checkout
│   │       └── route.ts          # POST /api/checkout
│   ├── cart/                     # Página do carrinho
│   ├── checkout/success/         # Página de sucesso
│   ├── product/[slug]/           # Páginas dinâmicas de produto
│   ├── politica-privacidade/     # Política de privacidade
│   ├── termos-uso/               # Termos de uso
│   ├── contato/                  # Página de contato
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Estilos globais
├── components/                   # Componentes React
│   ├── layout/                   # Componentes de layout
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                       # Componentes de UI
│       ├── Button.tsx
│       ├── ProductCard.tsx
│       └── AddToCartForm.tsx
├── lib/                          # Bibliotecas e utilitários
│   └── cart-context.tsx          # Context API do carrinho
├── utils/                        # Funções utilitárias
│   └── price.ts                  # Funções de cálculo de preço
├── types/                        # TypeScript types
│   └── index.ts
├── data/                         # Dados estáticos
│   └── products.json             # 6 produtos de exemplo
├── public/                       # Arquivos estáticos
│   └── images/                   # Imagens dos produtos
└── __tests__/                    # Testes unitários
    └── price.test.ts
```

## 🛒 Dados dos Produtos

Os produtos estão definidos em `data/products.json`. Cada produto contém:

```json
{
  "id": "1",
  "title": "Multivit Complete",
  "slug": "multivit-complete",
  "description": "Descrição do produto...",
  "price": 89.90,
  "images": ["/images/multivit-complete-1.jpg", "..."],
  "stock": 150,
  "category": "Multivitamínicos",
  "variants": [
    { "name": "60 cápsulas", "priceModifier": 0 },
    { "name": "120 cápsulas", "priceModifier": 30 }
  ],
  "benefits": ["Benefício 1", "Benefício 2"]
}
```

## 💳 Integração com Plataformas de Pagamento

### Implementação Atual (Mock)

Atualmente, o endpoint `/api/checkout` retorna uma URL mock para demonstração. O código está em `app/api/checkout/route.ts`.

### Como Integrar com Stripe

1. **Instale o SDK do Stripe:**
```bash
npm install stripe
```

2. **Configure as variáveis de ambiente:**
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

3. **Substitua o código em `app/api/checkout/route.ts`:**

Localize o comentário `// MOCK IMPLEMENTATION` e substitua por:

```typescript
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Dentro da função POST:
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: body.items.map(item => ({
    price_data: {
      currency: 'brl',
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: Math.round(item.price * 100), // Stripe usa centavos
    },
    quantity: item.quantity,
  })),
  mode: 'payment',
  success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
})

return NextResponse.json({ checkoutUrl: session.url })
```

**Documentação:** [Stripe Checkout Quickstart](https://stripe.com/docs/checkout/quickstart)

### Como Integrar com PayPal

1. **Instale o SDK do PayPal:**
```bash
npm install @paypal/checkout-server-sdk
```

2. **Configure as variáveis de ambiente:**
```env
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
PAYPAL_MODE=sandbox  # ou 'live' para produção
```

3. **Implemente a integração no endpoint de checkout:**

Consulte a documentação oficial do PayPal para criar uma ordem e redirecionar para o checkout.

**Documentação:** [PayPal Checkout Integration](https://developer.paypal.com/docs/checkout/)

### Testando o Checkout

Para testar o fluxo completo sem integração real:

1. Adicione produtos ao carrinho
2. Vá para `/cart`
3. Clique em "Finalizar Compra"
4. Você será redirecionado para `/checkout/success?id=...`

## 🎨 Personalização de Imagens

As imagens de produto atuais são placeholders SVG. Para substituí-las:

1. Adicione suas imagens em `public/images/`
2. Atualize os caminhos em `data/products.json`
3. Formatos recomendados: JPG ou WebP
4. Tamanho recomendado: 800x800px ou superior

Exemplo:
```json
{
  "images": [
    "/images/seu-produto-1.jpg",
    "/images/seu-produto-2.jpg",
    "/images/seu-produto-3.jpg"
  ]
}
```

## 🧪 Testes

Execute os testes unitários:

```bash
npm test
```

Os testes cobrem as funções de cálculo de preço, incluindo:
- Formatação de preço em Real (R$)
- Cálculo de subtotal do carrinho
- Cálculo de frete (grátis acima de R$ 150)
- Cálculo de total do pedido

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## ♿ Acessibilidade

- Semantic HTML5
- Atributos ARIA apropriados
- Textos alternativos em todas as imagens
- Navegação por teclado
- Contraste de cores adequado

## 🔍 SEO

- Meta tags dinâmicas por página
- Open Graph tags para redes sociais
- URLs amigáveis (slugs)
- Sitemap.xml (adicionar conforme necessário)
- Robots.txt configurável

Para adicionar um sitemap:

```bash
# Crie app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: 'https://multivit.com.br',
      lastModified: new Date(),
    },
    // ... adicione mais URLs
  ]
}
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub/GitLab/Bitbucket
2. Importe o projeto na [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy automático!

### Outros Provedores

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Railway
- Render

Execute o build de produção:
```bash
npm run build
npm start
```

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **React Context API** - Gerenciamento de estado do carrinho
- **Jest + Testing Library** - Testes unitários
- **ESLint + Prettier** - Qualidade e formatação de código

## 📝 Licença

Este projeto é fornecido como exemplo e pode ser utilizado livremente.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📞 Suporte

Para dúvidas ou suporte:
- Email: contato@multivit.com.br
- Telefone: (11) 3000-0000

## 🎯 Roadmap

- [ ] Integração com gateway de pagamento real (Stripe/PayPal)
- [ ] Sistema de autenticação de usuários
- [ ] Histórico de pedidos
- [ ] Sistema de reviews de produtos
- [ ] Filtros e busca de produtos
- [ ] Integração com sistema de estoque
- [ ] Notificações por email
- [ ] PWA (Progressive Web App)
- [ ] Modo escuro

---

Desenvolvido com ❤️ para Multivit
