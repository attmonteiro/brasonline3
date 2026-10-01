# 🏢 Atacado Online — Documentação Completa da API Backend B2B

Este documento apresenta a especificação, arquitetura, endpoints e instruções de configuração da API Backend completa do marketplace B2B **Atacado Online**.

---

## 🛠️ Stack Tecnológica
* **Runtime / Framework:** Node.js com Express (`server.ts` e suporte integrado a ES Modules via `tsx`)
* **Banco de Dados:** PostgreSQL (modelo relacional de alta performance para catálogos e pedidos B2B)
* **ORM / Migrações:** Prisma ORM (`@prisma/client` + `prisma/schema.prisma` e `prisma/seed.ts`)
* **Autenticação & Segurança:** JSON Web Tokens (`jwt`) com senhas protegidas com hash (`bcryptjs` cost 10)
* **Armazenamento de Imagens:** Suporte a Object Storage (AWS S3, Cloudflare R2 ou Supabase Storage) via Multer + multipart/form-data
* **Validação de Entradas & CORS:** Libs integradas com CORS configurado para proteção do frontend

---

## 📦 Estrutura do Projeto & Entidades (Prisma Schema)

O banco de dados relacional está modelado em `prisma/schema.prisma` contendo:

1. **`Usuario` (`usuarios`)**
   * Campos: `id`, `tipo` (`comprador`, `vendedor`, `admin`), `nome`, `email` (unique), `senha_hash`, `telefone`, `cidade`, `estado`, `cep`, timestamps.
2. **`Assinatura` (`assinaturas`)**
   * Campos: `id`, `usuario_id` (FK), `status` (`ativa`, `inativa`, `cancelada`, `atrasada`), `data_inicio`, `data_expiracao`, `valor_mensal`, `forma_pagamento`.
3. **`Loja` (`lojas`)**
   * Campos: `id`, `vendedor_id` (FK -> Usuario), `nome_loja`, `endereco_completo`, `cidade`, `estado`, `cep`, `telefone_contato`, `whatsapp`, `email_contato`, `site_redes_sociais`, `criado_em`.
4. **`Produto` (`produtos`)**
   * Campos: `id`, `loja_id` (FK -> Loja), `titulo`, `preco`, `quantidade_minima`, `categoria`, `cores` (JSON), `tamanhos` (JSON), `ativo`, timestamps.
5. **`FotoProduto` (`fotos_produto`)**
   * Campos: `id`, `produto_id` (FK -> Produto), `url_imagem`, `ordem` (0 = Capa Principal), `criado_em`.
6. **`EnderecoComprador` (`enderecos_comprador`)**
   * Campos: `id`, `usuario_id` (FK), `logradouro`, `numero`, `bairro`, `cidade`, `estado`, `cep`, `principal`.

---

## 🚀 Como Executar Localmente (Instalação, Migrations e Seed)

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente (`.env`)
Copie o arquivo `.env.example` para `.env` e ajuste sua string de conexão PostgreSQL:
```env
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/atacado_online?schema=public"
JWT_SECRET="chave-secreta-jwt-atacado-online-b2b"
STORAGE_BUCKET_URL="https://s3.sa-east-1.amazonaws.com/atacado-online-images"
PORT=3000
```

### 3. Rodar Migrations do Banco de Dados
Para criar as tabelas no seu PostgreSQL:
```bash
npx prisma migrate dev --name init_atacado_online
# ou pelo script do package.json:
npm run db:migrate
```

### 4. Rodar o Seed de Dados Iniciais
Para popular o banco com usuários de teste, loja, produtos e assinaturas ativas:
```bash
npm run db:seed
# ou via Prisma direto:
npx prisma db seed
```

#### 🔑 Contas Iniciais de Teste criadas pelo Seed:
* **Comprador VIP (com assinatura ativa):**
  * **Email:** `comprador@atacado.com` (ou usuário `comprador`)
  * **Senha:** `000`
* **Vendedor Atacadista (com loja "Bela Moda Brás Atacado" e produtos cadastrados):**
  * **Email:** `vendedor@atacado.com` (ou usuário `vendedor`)
  * **Senha:** `000`
* **Administrador Geral do Portal:**
  * **Email:** `admin@atacado.com`
  * **Senha:** `admin123`

### 5. Iniciar o Servidor Full-Stack (API + Frontend SPA)
```bash
npm run dev
```
O servidor estará disponível em `http://localhost:3000`.

---

## 🔒 Regra de Negócio Crítica Implementada no Backend

Nos endpoints `GET /api/produtos` e `GET /api/produtos/:id`, **a proteção não ocorre apenas no Frontend**:
1. O backend inspeciona o token JWT no cabeçalho `Authorization: Bearer <token>`.
2. Se o requisitante for **Comprador com assinatura ativa** (ou Vendedor / Admin), o backend retorna os dados completos do fabricante (`loja: { id, nome_loja, whatsapp, endereco_completo, ... }`) com `loja_bloqueada: false`.
3. Se o requisitante **não for autenticado ou não tiver assinatura VIP ativa**, o backend **omite o objeto da loja na resposta da API** e envia a flag `loja_bloqueada: true`.
4. Isso impede tentativas de scraping ou acesso indevido por chamadas diretas via Postman / curl.

---

## 📡 Lista de Endpoints da API

### 🔑 Autenticação (`/api/auth`)
* `POST /api/auth/registrar`
  * Body: `{ "nome": "...", "email": "...", "senha": "...", "tipo": "comprador"|"vendedor" }`
  * Retorno `201 Created`: `{ "token": "jwt...", "user": { ... } }`
* `POST /api/auth/login`
  * Body: `{ "email": "comprador@atacado.com", "senha": "000" }`
  * Retorno `200 OK`: `{ "token": "jwt...", "user": { ... } }`
* `POST /api/auth/logout`
  * Retorno: `{ "message": "Sessão encerrada..." }`
* `GET /api/auth/me` *(Requer Authorization: Bearer <token>)*
  * Retorno: Dados do usuário logado.

### 👤 Usuários (`/api/usuarios`)
* `GET /api/usuarios/:id`
* `PUT /api/usuarios/:id` *(Editar perfil do usuário logado)*
* `DELETE /api/usuarios/:id`

### 💳 Assinaturas (`/api/assinaturas`)
* `GET /api/assinaturas/:usuario_id` *(Retorna status da assinatura: ativa, cancelada, atrasada)*
* `POST /api/assinaturas/ativar`
  * Simula pagamento no cartão e ativa plano VIP por 1 ano.
* `POST /api/assinaturas/cancelar`

### 🏬 Lojas e Fabricantes (`/api/lojas`)
* `POST /api/lojas` *(Apenas vendedores autenticados)*
  * Body: `{ "nome_loja": "...", "cidade": "...", "estado": "...", "whatsapp": "..." }`
* `GET /api/lojas/:id`
* `GET /api/lojas/:id/produtos`

### 👗 Produtos do Catálogo (`/api/produtos`)
* `GET /api/produtos?categoria=Feminino&busca=vestido&precoMin=10&precoMax=100`
  * Retorna catálogo filtrado **com regra de sigilo de contato do fabricante**.
* `GET /api/produtos/:id`
  * Retorna detalhes do produto (com ou sem dados de loja conforme plano do comprador).
* `POST /api/produtos` *(Apenas vendedores com assinatura ativa)*
  * Body: `{ "titulo": "...", "preco": 38.9, "quantidade_minima": 6, "categoria": "...", "cores": [...], "tamanhos": [...], "fotos": [...] }`
* `PUT /api/produtos/:id` *(Apenas dono do produto)*
* `DELETE /api/produtos/:id` *(Apenas dono do produto)*

### 📸 Upload de Imagens (`/api/upload`)
* `POST /api/upload`
  * Formato: `multipart/form-data` com chave `fotos` (aceita até 8 imagens em JPG, PNG, WEBP, máximo 5MB por arquivo).
  * Retorno: `{ "message": "...", "urls": ["data:image/jpeg;base64,...", ...] }`

### 🛡️ Administração (`/api/admin` - Requer token de tipo `admin`)
* `GET /api/admin/vendedores` *(Lista vendedores com seus status de assinatura)*
* `GET /api/admin/compradores` *(Lista compradores e status)*
* `GET /api/admin/produtos` *(Catálogo geral para moderação)*
* `GET /api/admin/metricas` *(Retorna totais e receita mensal simulada)*
