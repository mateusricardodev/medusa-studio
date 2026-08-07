# 🐍 Medusa Studio

> **Plataforma digital para estúdios de tatuagem — experiência do cliente, agendamento, loja e gestão em um só lugar.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge\&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge\&logo=tailwindcss)](https://tailwindcss.com/)

---

## ✨ Sobre o projeto

O **Medusa Studio** é uma aplicação web desenvolvida para demonstrar como um estúdio de tatuagem pode centralizar sua presença digital e operações em uma única plataforma.

O projeto combina uma **landing page comercial**, fluxo de **agendamento**, orçamento de tatuagens, **loja de produtos**, painel administrativo e uma ferramenta de diagnóstico comercial.

Atualmente, o projeto funciona como um **frontend demonstrativo**, utilizando dados mockados para simular as operações de um estúdio real.

### 🎯 Objetivo

Criar uma experiência digital moderna para conectar:

* 👤 Clientes
* 🎨 Tatuadores
* 📅 Agendamentos
* 🛍️ Produtos
* 📊 Gestão
* 💰 Indicadores financeiros

Tudo através de uma interface única e responsiva.

---

## 🚀 Funcionalidades

### 🌐 Site público

* Hero section
* Apresentação do estúdio
* Serviços e preços
* Avaliações de clientes
* Localização
* Informações comerciais

### 📅 Agendamento

* Seleção de serviço
* Seleção de profissional
* Escolha de horário
* Fluxo de agendamento simulado
* Disponibilidade baseada em dados mockados

### 🎨 Orçamento de tatuagem

* Formulário personalizado
* Coleta de informações do projeto
* Simulação de solicitação de orçamento

### 🛍️ Loja

* Catálogo de produtos
* Roupas
* Tênis
* Cards de produtos
* Estrutura preparada para imagens reais

### 📊 Painel administrativo

Dashboard demonstrativo contendo:

* Agenda
* Clientes
* Faturamento
* Métricas
* Indicadores
* Informações operacionais

### 📈 Diagnóstico comercial

Ferramenta desenvolvida para simular possíveis perdas financeiras e transformar dados operacionais em informações úteis para apresentação comercial.

---

## 🧩 Arquitetura

```text
medusa-studio/
├── app/
│   ├── agendar/
│   ├── diagnostico/
│   ├── loja/
│   ├── painel/
│   └── tatuagem/
│
├── components/
│   ├── agendar/
│   ├── home/
│   ├── loja/
│   ├── tatuagem/
│   └── ui/
│
├── lib/
│   └── mock/
│       ├── appointments.ts
│       ├── clients.ts
│       ├── professionals.ts
│       ├── products.ts
│       ├── revenue.ts
│       ├── reviews.ts
│       ├── services.ts
│       └── slots.ts
│
└── public/
```

A separação entre componentes, páginas e dados simulados permite evoluir o projeto posteriormente para uma arquitetura com API e banco de dados.

---

## 🛠️ Tecnologias

| Tecnologia         | Utilização            |
| ------------------ | --------------------- |
| **Next.js 16**     | Framework web         |
| **React 19**       | Interface             |
| **TypeScript**     | Tipagem estática      |
| **Tailwind CSS 4** | Estilização           |
| **Framer Motion**  | Animações             |
| **Recharts**       | Visualização de dados |
| **ESLint**         | Qualidade de código   |

---

## ⚡ Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/mateusricardodev/medusa-studio.git
cd medusa-studio
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute em desenvolvimento

```bash
npm run dev
```

### 4. Acesse

```text
http://localhost:3000
```

---

## 🗺️ Rotas

| Rota           | Descrição                |
| -------------- | ------------------------ |
| `/`            | Página principal         |
| `/agendar`     | Fluxo de agendamento     |
| `/tatuagem`    | Solicitação de orçamento |
| `/loja`        | Catálogo de produtos     |
| `/painel`      | Dashboard administrativo |
| `/diagnostico` | Simulador de perdas      |

---

## 🔮 Próximos passos

O projeto foi estruturado para permitir uma evolução natural para uma aplicação completa.

Possíveis melhorias:

* [ ] Backend com API REST
* [ ] Banco de dados
* [ ] Autenticação
* [ ] Integração com WhatsApp
* [ ] Agendamento real
* [ ] Gateway de pagamento
* [ ] CRM de clientes
* [ ] Upload de imagens
* [ ] Gestão real de estoque
* [ ] Dashboard conectado a dados reais

---

## 📌 Status

🟢 **Frontend demonstrativo / MVP**

Os dados utilizados atualmente são fictícios e destinados exclusivamente à demonstração.

---

## 👨‍💻 Autor

**Mateus Ricardo**

Desenvolvedor de Software com foco em desenvolvimento web, backend, automação e soluções orientadas a dados.

---

⭐ Se este projeto foi útil ou interessante para você, considere deixar uma estrela no repositório.
