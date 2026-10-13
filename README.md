# EventOps ERP/CRM

**Sistema híbrido de gestão operacional e comercial para fornecimento de mão de obra temporária em eventos.**

> **Status:** Projeto descontinuado · Disponibilizado publicamente como **Template e Estudo de Caso de Portfólio** (`v0.9.5-alpha`)

---

> ### 📌 Nota de Portfólio & Contexto de Negócio (Ressalva)
>
> Este sistema foi **inteiramente desenvolvido utilizando Inteligência Artificial (AI-assisted engineering)**, servindo como uma demonstração prática de arquitetura de software, prototipagem ágil full-stack e modelagem de regras de negócio complexas com apoio de IA generativa.
>
> **O Caso de Negócio:**  
> A aplicação foi concebida para substituir um fluxo operacional pré-existente baseado na planilha **"FINANCEIRO LARANJA"** (também disponível aqui no meu GitHub). No entanto, o projeto foi descontinuado antes da migração definitiva em produção devido à alta eficácia e consolidação da rotina das planilhas para a equipe, somada à natural resistência cultural à mudança operacional — um clássico desafio de *Product Adoption* e *Change Management*.
>
> O código foi higienizado, desvinculado de qualquer dado corporativo sensível e disponibilizado integralmente como **template open-source de referência**, evidenciando competências em design de interfaces SPA modernas, APIs REST escaláveis, cache em camadas e governança de dados.

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Arquitetura do Sistema](#2-arquitetura-do-sistema)
3. [Tecnologias Utilizadas](#3-tecnologias-utilizadas)
4. [Módulos e Funcionalidades](#4-módulos-e-funcionalidades)
5. [Controle de Acesso e Perfis de Usuário](#5-controle-de-acesso-e-perfis-de-usuário)
6. [Instalação e Execução Local](#6-instalação-e-execução-local)
7. [Variáveis de Ambiente](#7-variáveis-de-ambiente)
8. [Estrutura do Banco de Dados (Schema Lógico)](#8-estrutura-do-banco-de-dados-schema-lógico)
9. [Limitações Conhecidas e Lições Aprendidas](#9-limitações-conhecidas-e-lições-aprendidas)
10. [Licença e Créditos](#10-licença-e-créditos)

---

## 1. Visão Geral

O **EventOps ERP/CRM** é uma aplicação web full-stack desenvolvida para empresas e agências especializadas no fornecimento e gestão de mão de obra temporária em eventos (promoção, recepção em estandes, ativações de marca, feiras e convenções corporativas).

O sistema centraliza em uma única interface:

- Gestão de **eventos/projetos** com visão financeira e cronograma integrados
- Controle de **movimentações financeiras** (contas a pagar e a receber vinculadas ou avulsas)
- Emissão e registro de **notas fiscais** com cálculo automático de retenções e impostos
- **Fluxo de caixa** relacional e projetado por dia com suporte a saldo inicial manual
- **Orçamentos comerciais** com fórmula automatizada de precificação, margem e conversão em evento
- Cadastro unificado de **contatos** (clientes, fornecedores e freelancers)
- **Relatórios** gerenciais com exportação de dados

### Público-alvo e Perfis

| Perfil | Descrição |
|---|---|
| **Diretoria / Gestão** | Acesso analítico e visualização executiva (dashboards, relatórios consolidados e fluxo de caixa). |
| **Operadores (Equipe Técnica)** | Alimentam o sistema com eventos, movimentações, cadastros e notas. Possuem permissão total operacional (CRUD). |
| **Leitor / Auditor** | Acesso somente leitura para auditoria externa ou visualização rápida sem permissão de alteração. |

---

## 2. Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                     │
│              React 19 + TypeScript + Tailwind CSS            │
│          (SPA — Single Page Application, sem roteamento)     │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST (JSON)
                           │ Bearer Token (session token)
┌──────────────────────────▼──────────────────────────────────┐
│                   SERVIDOR (Node.js / Express)               │
│              Express 4 + Node.js + TypeScript                │
│                                                              │
│  ┌─────────────────┐    ┌──────────────────────────────┐    │
│  │  API REST        │    │  Static File Server           │    │
│  │  /api/*          │    │  dist/ (build do Vite)        │    │
│  └────────┬────────┘    └──────────────────────────────┘    │
│           │                                                   │
│  ┌────────▼────────────────────────────────────────────┐     │
│  │  Camada de Dados (server-db.ts)                      │     │
│  │                                                      │     │
│  │  RAM Cache ──► db.json (backup local)               │     │
│  │       │                                              │     │
│  │       └──────────────► Supabase (cloud sync async)  │     │
│  └──────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                     SUPABASE (PostgreSQL)                     │
│                                                              │
│  Tabela: sistema_estado                                      │
│  ┌──────────────┬───────────────────────────┬─────────────┐ │
│  │ chave (PK)   │ valor (JSONB)             │ atualizado_em│ │
│  │ app_erp_db   │ { users, events, ... }    │ timestamp   │ │
│  └──────────────┴───────────────────────────┴─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Estratégia de persistência de dados em 3 camadas

O sistema adota uma arquitetura resiliente e de baixa latência:

1. **Cache em RAM** — todas as leituras durante a sessão do servidor ocorrem diretamente da memória, proporcionando respostas em milissegundos.
2. **`data/db.json`** — backup local sincronizado a cada gravação, servindo como fallback caso o banco remoto apresente instabilidade.
3. **Supabase (PostgreSQL JSONB)** — o estado do banco é armazenado de forma estruturada e sincronizado de maneira **assíncrona** (non-blocking) a cada mutação.

Na inicialização do servidor, a prioridade de restauração é: **Supabase → db.json local → estado padrão inicial**.

---

## 3. Tecnologias Utilizadas

| Camada | Tecnologia | Finalidade |
|---|---|---|
| **Frontend** | React 19 | Interface declarativa em componentes funcionais |
| **Frontend** | TypeScript 5.8 | Tipagem estática rigorosa e segurança de compilação |
| **Frontend** | Tailwind CSS 4 | Estilização utilitária de alta fidelidade e responsividade |
| **Frontend** | Vite 6 | Ferramenta de build moderna e ambiente de desenvolvimento |
| **Frontend** | Lucide React | Conjunto moderno e consistente de ícones |
| **Frontend** | Motion | Animações fluidas de transição de abas e modais |
| **Backend** | Node.js + Express 4 | Servidor HTTP e endpoints RESTful |
| **Backend** | TypeScript + tsx | Tipagem no backend com execução direta |
| **Backend** | esbuild | Compilação ultra-rápida do servidor para produção |
| **Banco / Nuvem** | Supabase (PostgreSQL) | Persistência cloud e sincronização de dados |
| **Segurança** | Crypto (Node built-in) | Hash de credenciais e geração de tokens de sessão |

---

## 4. Módulos e Funcionalidades

### 4.1 Dashboard Executivo
* Visão rápida do dia: eventos em andamento hoje, contas a pagar e contas a receber.
* Resumo dos próximos 7 dias com saldo previsto.
* Ações rápidas para criação de eventos e lançamento de transações.

### 4.2 Gestão de Eventos
* Cadastro de eventos com período, local, horários e cliente contratante.
* Painel analítico por evento: consolidação em tempo real de entradas, saídas, margem e notas fiscais vinculadas.

### 4.3 Calendário e Cronograma (Gantt)
* Visualização temporal de sobreposição de eventos e disponibilidade de equipe.
* Anotações diárias contextualizadas (*Daily Observations*).
* Implementado em CSS Grid nativo de alto desempenho.

### 4.4 Orçamentos & CRM Comercial
* Pipeline de cotações com status: `Pendente`, `Aprovada` ou `Recusada` (com registro de motivo para perda).
* **Precificação inteligente:**
  $$\text{Preço de Venda} = \frac{\text{Custo com Overhead}}{(1 - \text{Margem}) \times (1 - (\text{Comissão} + \text{Impostos}))}$$
* Conversão automática de cotação aprovada em evento com lançamento financeiro vinculado.

### 4.5 Movimentações Financeiras
* Lançamento detalhado de receitas e despesas com vencimento, data de liquidação e categorização.
* Suporte a despesas avulsas (custos fixos da empresa) e despesas atreladas a eventos específicos.

### 4.6 Fluxo de Caixa Dinâmico
* Matriz de projeção diária mensal.
* Recurso de **Saldo Inicial Manual**: permite calibrar a projeção financeira a partir do saldo bancário real do dia.

### 4.7 Gestão de Notas Fiscais
* Registro de notas de prestação de serviços com cálculos automáticos de:
  * Valor líquido pós-retenção na fonte.
  * Valor líquido após alíquota total de impostos.
* Tabela pré-configurada de códigos de serviço municipais/federais.

### 4.8 Cadastro Unificado de Contatos
* Diretório de clientes, fornecedores e freelancers.
* Validações de CPF, RG, CNPJ e dados de pagamento (contas bancárias e chaves Pix).

### 4.9 Relatórios Gerenciais
* Lucro mensal por evento e categoria.
* Previsão de liquidez para 30, 60 e 90 dias.
* Comparativo orçado vs. realizado.
* Exportação completa de dados em formato CSV.

### 4.10 Gestão de Usuários (RBAC)
* Controle de acesso baseado em papéis (`admin`, `operador`, `leitor`).
* Proteção contra exclusão acidental da conta administradora principal.

---

## 5. Controle de Acesso e Perfis de Usuário

| Papel | Permissões | Nível de Acesso |
|---|---|---|
| `admin` | Criação, leitura, edição, exclusão e gestão de usuários | Completo (Diretoria / Tech Lead) |
| `operador` | Operações completas de rotina (eventos, financeiro, NFs, contatos) | Operacional (Equipe) |
| `leitor` | Visualização de dashboards, relatórios e eventos (sem alteração) | Somente Leitura (Auditores / Externo) |

A restrição é aplicada tanto em nível de interface (ocultação de ações) quanto no backend via middleware (`requireWrite` retorna `HTTP 403 Forbidden` para leitores).

---

## 6. Instalação e Execução Local

### Pré-requisitos
- Node.js 18+ instalado
- Conta no Supabase (ou uso do fallback local via arquivo `data/db.json`)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/eventops-erp.git
cd eventops-erp

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Preencha SUPABASE_URL e SUPABASE_KEY (caso deseje sincronização em nuvem)

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O aplicativo estará acessível em `http://localhost:3000`.

---

## 7. Variáveis de Ambiente

Arquivo `.env` na raiz do projeto:

```env
# Configurações do Supabase (Opcional caso utilize apenas persistência local)
SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_KEY="sua-chave-anon-ou-service-role"

# Porta do servidor (padrão: 3000)
PORT=3000
```

---

## 8. Estrutura do Banco de Dados (Schema Lógico)

```
┌────────────────┐       ┌───────────────┐       ┌─────────────────┐
│     Quotes     │──────▶│    Events     │──────▶│   Invoices      │
└────────────────┘ (1:1) └───────┬───────┘ (1:N) └─────────────────┘
                                 │ (1:N)
                                 ▼
                         ┌───────────────┐       ┌─────────────────┐
                         │  Transactions │◀──────│    Contacts     │
                         └───────────────┘ (N:1) └─────────────────┘
```

* **users**: Contas de acesso, papéis de permissão e credenciais com hash.
* **events**: Cadastro mestre de projetos com prazos, local e cliente.
* **transactions**: Lançamentos de contas a pagar e receber.
* **invoices**: Notas fiscais com cálculo de tributos e retenções.
* **quotes**: Pipeline de propostas comerciais e orçamentos.
* **contacts**: Cadastro de clientes, fornecedores e freelancers com chaves Pix.

---

## 9. Limitações Conhecidas e Lições Aprendidas

Por se tratar de um estudo de caso e template funcional, algumas decisões arquiteturais foram documentadas para futuras iterações em produção:

1. **Gestão de Sessões em Memória:** As sessões ativas são gerenciadas em cache no servidor; uma evolução recomendada é a transição para tokens JWT assinados stateless ou integração direta com o Supabase Auth.
2. **Criptografia de Senhas:** Para ambientes corporativos críticos, o hash SHA-256 pode ser substituído por algoritmos com fator de custo configurável como *bcrypt* ou *Argon2id*.
3. **Escalar Concorrência:** Para alto volume simultâneo de escrita, o modelo de estado unificado JSONB pode ser normalizado em tabelas relacionais clássicas com transações ACID no PostgreSQL.
4. **Resistência à Mudança em Software:** A principal lição de produto deste projeto foi que sistemas digitais bem construídos tecnicamente ainda dependem de alinhamento com a cultura dos usuários e ergonomia operacional prévia (como o apego à flexibilidade de planilhas).

---

## 10. Licença e Créditos

Este projeto foi construído para fins de demonstração técnica, aprendizado e composição de portfólio. Fique à vontade para clonar, estudar e utilizar como base para novas soluções.

Desenvolvido com foco em **agilidade orientada por IA**, design limpo e arquitetura pragmática.
