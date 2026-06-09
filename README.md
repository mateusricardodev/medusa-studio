# Medusa Studio — Site & Sistema

Demo navegável do sistema Medusa Studio. Frontend only, sem backend.

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Site público — hero, serviços, avaliações, localização |
| `/agendar` | Fluxo de agendamento simulado |
| `/tatuagem` | Formulário de orçamento de tatuagem |
| `/loja` | Catálogo de roupas e tênis |
| `/painel` | Painel do dono (somente visual) |
| `/diagnostico` | Simulador de perdas — ferramenta de pitch |

## Onde estão os dados

Todos em `lib/mock/`:

- `services.ts` — lista de serviços e preços
- `professionals.ts` — profissionais do estúdio
- `slots.ts` — lógica de geração de slots de horário
- `products.ts` — catálogo de roupas e tênis
- `reviews.ts` — avaliações
- `clients.ts` — dados do CRM
- `appointments.ts` — agenda do dia e métricas
- `revenue.ts` — faturamento por mês e KPIs do painel

## Onde trocar logo e fotos reais

- **Logo**: substituir o componente `components/ui/MedusaLogo.tsx` por um `<Image>` apontando para o arquivo real em `public/`.
- **Fotos dos produtos**: em `components/loja/ProductGrid.tsx`, o componente `ProductPlaceholder` pode ser substituído por `<Image src={product.imageUrl} ... />` após adicionar a propriedade `imageUrl` em `lib/mock/products.ts`.
- **Fotos dos profissionais**: em `components/agendar/AgendarFlow.tsx`, o avatar com inicial pode virar uma `<Image>`.

## Deploy na Vercel

```bash
git init && git add . && git commit -m "init: medusa studio"
vercel
```

Ou conectar o repositório no painel da Vercel diretamente.
Para domínio próprio: Vercel → Project Settings → Domains.

## WhatsApp

O número está em 5 lugares como `5512991234567`. Substituir em:
- `components/home/Location.tsx`
- `components/agendar/AgendarFlow.tsx`
- `components/tatuagem/TattooForm.tsx`
- `components/loja/ProductGrid.tsx`
- `components/diagnostico/LossSimulator.tsx`

> Todos os dados são fictícios, gerados exclusivamente para demonstração.
