# Guia de Deploy na Vercel - Multivit E-commerce

## ✅ PROBLEMA RESOLVIDO

**Erro anterior:** `Application error: a server-side exception has occurred (Digest: 138019437)`

**Causa:** A homepage estava fazendo fetch HTTP para a API durante o server-side rendering, o que não funciona na Vercel.

**Solução aplicada:** Homepage agora importa dados diretamente do JSON e é completamente estática.

---

## 🚀 PASSO A PASSO PARA FAZER DEPLOY NA VERCEL

### Opção 1: Redeploy Automático (Recomendado)

Se você já tem o projeto conectado na Vercel:

1. **A Vercel detectará automaticamente o novo commit**
2. Aguarde alguns minutos para o deploy automático
3. Acesse seu domínio na Vercel
4. ✅ O site deve carregar sem erros!

### Opção 2: Deploy Manual

1. **Acesse https://vercel.com**
2. Faça login com sua conta
3. Clique em **"Add New Project"**
4. Selecione o repositório **andertrx/mult.vit**
5. **Configure o projeto:**
   - **Framework Preset:** Next.js (detectado automaticamente)
   - **Branch:** `claude/multivit-ecommerce-vercel-fix-011CUqdKucQnzUdJ9dso79jt`
   - **Root Directory:** `./` (deixe vazio ou como está)
   - **Build Command:** `npm run build` (já detectado)
   - **Output Directory:** `.next` (já detectado)

6. **Variáveis de Ambiente (OPCIONAL - pode adicionar depois):**
   ```
   NEXT_PUBLIC_URL=https://seu-dominio.vercel.app
   ```

7. Clique em **"Deploy"**
8. Aguarde 2-3 minutos
9. ✅ Acesse o domínio gerado pela Vercel

---

## 📋 O QUE FOI CORRIGIDO

### Antes (❌ Com erro):
```typescript
// app/page.tsx
async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' })
  return res.json()
}

export default async function HomePage() {
  const products = await getProducts()  // ❌ Erro de runtime na Vercel
  // ...
}
```

**Resultado:** `ƒ /` (Dynamic - renderizado no servidor a cada requisição)

### Depois (✅ Funcionando):
```typescript
// app/page.tsx
import productsData from '@/data/products.json'

export default function HomePage() {
  const products = productsData as Product[]  // ✅ Importação direta do JSON
  // ...
}
```

**Resultado:** `○ /` (Static - pre-renderizado no build)

---

## ✅ CHECKLIST DE VERIFICAÇÃO

Após o deploy, verifique:

- [ ] Homepage (`/`) carrega sem erros
- [ ] Produtos aparecem na grade
- [ ] Clicar em um produto abre a página de detalhes
- [ ] Adicionar ao carrinho funciona
- [ ] Carrinho (`/cart`) funciona
- [ ] Checkout redireciona para página de sucesso
- [ ] Páginas estáticas (política, termos, contato) carregam

---

## 🔧 SE AINDA HOUVER PROBLEMAS

### 1. Limpar Cache da Vercel
```bash
# Na Vercel Dashboard:
Settings → General → Clear Cache
```

### 2. Verificar Logs
```bash
# Na Vercel Dashboard:
Deployments → [seu deploy] → View Function Logs
```

### 3. Verificar se a branch correta está selecionada
```
Branch: claude/multivit-ecommerce-vercel-fix-011CUqdKucQnzUdJ9dso79jt
```

### 4. Redeploy Manual
```bash
# Na Vercel Dashboard:
Deployments → [último deploy] → ⋯ → Redeploy
```

---

## 📊 COMMITS INCLUÍDOS

1. **fef8e17** - Corrigir erro de runtime (MAIS RECENTE) ✅
   - Homepage agora é estática
   - Importação direta do JSON
   - Resolve o erro "Application error"

2. **b542f6d** - Configurações para Vercel
   - vercel.json
   - .nvmrc
   - Engines no package.json

3. **d02c088** - E-commerce completo
   - Todas as funcionalidades

---

## 🎯 RESULTADO ESPERADO

Após o deploy, você deve ver:

✅ **Homepage:** Carrega instantaneamente (estática)
✅ **Produtos:** Todos os 6 produtos aparecem
✅ **Performance:** Nota alta no Lighthouse
✅ **SEO:** Meta tags corretas
✅ **Zero erros:** Nenhum erro de runtime

---

## 📞 SUPORTE

Se ainda houver problemas, envie:

1. Screenshot da tela de erro
2. URL do deploy na Vercel
3. Logs completos do Functions (na Vercel)

---

**Última atualização:** Commit fef8e17
**Branch:** claude/multivit-ecommerce-vercel-fix-011CUqdKucQnzUdJ9dso79jt
