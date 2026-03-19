# Sistema ERP Imobiliário

Aplicação web de gestão imobiliária com foco em operação comercial, organização de carteira e acompanhamento de indicadores em tempo real.

## Visão Geral

Este projeto entrega um ERP front-end completo para imobiliárias, com módulos para:

- Dashboard executivo com métricas e gráficos
- Gestão de imóveis com filtros avançados
- Gestão de clientes e histórico de interesse
- Gestão de contratos de venda e aluguel
- Pipeline comercial com arrastar e soltar
- Personalização visual (white-label)

## Principais Funcionalidades

### 1) Dashboard de Performance
- Indicadores operacionais: total de imóveis, novos clientes, contratos fechados e receita mensal
- Visualizações de evolução de negócios e distribuição da carteira
- Filtro por período (30 dias, trimestre e ano)

### 2) Gestão de Imóveis
- Cadastro e edição de imóveis
- Filtros por tipo, status, faixa de preço e características
- Modal de detalhes do imóvel
- Ação integrada para iniciar contrato a partir do imóvel

### 3) Gestão de Clientes
- Cadastro e edição de clientes
- Segmentação por tipo de cliente e tipo de imóvel de interesse
- Busca e filtragem avançada

### 4) Gestão de Contratos
- Registro de contratos de venda e aluguel
- Controle de status contratual
- Relacionamento entre cliente, imóvel e contrato

### 5) Pipeline Comercial
- Kanban com etapas de funil de vendas
- Interação drag-and-drop entre colunas
- Cálculo automático de métricas (valor total, taxa de conversão e negociações ativas)
- Inclusão rápida de nova negociação por etapa

### 6) White-Label
- Definição do nome da imobiliária
- Personalização da cor primária
- Configuração persistida em armazenamento local

## Stack Técnica

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router DOM
- Zustand (estado global persistente)
- React Hook Form + Zod (formulários e validação)
- Recharts (gráficos)
- Framer Motion (animações)
- Vitest + Testing Library (testes)

## Estrutura de Rotas

- `/` → Dashboard
- `/imoveis` → Gestão de Imóveis
- `/clientes` → Gestão de Clientes
- `/contratos` → Gestão de Contratos
- `/pipeline` → Pipeline Comercial
- `/settings` → Configurações White-Label

## Estrutura do Projeto

```text
src/
├── components/
│   ├── layout/         # Estrutura principal (sidebar + header)
│   └── ui/             # Componentes reutilizáveis de interface
├── data/               # Dados mockados (imóveis, clientes, contratos)
├── features/
│   ├── dashboard/
│   ├── properties/
│   ├── clientes/
│   ├── contratos/
│   ├── pipeline/
│   └── settings/
├── store/              # Estado global (tema, sidebar, branding)
└── test/               # Testes automatizados
```

## Como Executar

### Pré-requisitos

- Node.js 20+
- npm 10+

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Preview local da build

```bash
npm run preview
```

### Testes

```bash
npm run test
```

### Lint

```bash
npm run lint
```

## Padrões e Arquitetura

- Organização por feature para facilitar evolução por domínio
- Componentização de UI para reaproveitamento
- Lazy loading nas páginas principais para otimizar carregamento inicial
- Estado global apenas para informações transversais (tema, layout e branding)
- Dados locais mockados para desenvolvimento rápido e desacoplado

## Próximos Passos Recomendados

- Integrar API real para imóveis, clientes, contratos e pipeline
- Implementar autenticação e autorização por perfil
- Adicionar testes de integração para fluxos críticos
- Criar observabilidade de erros e métricas de uso

## Licença

Uso interno e/ou portfólio. Ajuste a licença conforme a estratégia do projeto antes de distribuição pública.
