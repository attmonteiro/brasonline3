import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-for-atacado-online-b2b';

// Storage para upload de imagens (Multer na memória + simulador de Object Storage - S3 / Cloudflare R2)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB máximo por imagem
    files: 8,                  // Até 8 fotos por produto
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não suportado. Apenas JPEG, PNG e WEBP são permitidos.'));
    }
  },
});

// Tipos auxiliares
interface Usuario {
  id: string;
  tipo: 'comprador' | 'vendedor' | 'admin';
  nome: string;
  email: string;
  senha_hash: string;
  telefone?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  criado_em: string;
  atualizado_em: string;
}

interface Assinatura {
  id: string;
  usuario_id: string;
  status: 'ativa' | 'inativa' | 'cancelada' | 'atrasada';
  data_inicio: string;
  data_expiracao: string;
  valor_mensal: number;
  forma_pagamento: string;
}

interface Loja {
  id: string;
  vendedor_id: string;
  nome_loja: string;
  endereco_completo?: string;
  cidade: string;
  estado: string;
  cep?: string;
  telefone_contato?: string;
  whatsapp?: string;
  email_contato?: string;
  site_redes_sociais?: string;
  criado_em: string;
}

interface Produto {
  id: string;
  loja_id: string;
  titulo: string;
  preco: number;
  quantidade_minima: number;
  categoria: string;
  cores: string[];
  tamanhos: string[];
  ativo: boolean;
  fotos: { url_imagem: string; ordem: number }[];
  criado_em: string;
  atualizado_em: string;
}

// ============================================================================
// BANCO DE DADOS NA MEMÓRIA COM FALLBACK ROBUSTO
// Quando o PostgreSQL estiver conectado, pode ser substituído por @prisma/client
// ============================================================================
const db = {
  usuarios: [] as Usuario[],
  assinaturas: [] as Assinatura[],
  lojas: [] as Loja[],
  produtos: [] as Produto[],
};

// Seeder Inicialização Rápida (para teste imediato local)
async function initSeed() {
  const hash000 = await bcrypt.hash('000', 10);
  const hashAdmin = await bcrypt.hash('admin123', 10);

  // 1. Comprador VIP (senha 000)
  const compId = 'comp-001';
  db.usuarios.push({
    id: compId,
    tipo: 'comprador',
    nome: 'Comprador Lojista VIP',
    email: 'comprador@atacado.com',
    senha_hash: hash000,
    telefone: '(11) 99888-1122',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01001-000',
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString(),
  });

  db.assinaturas.push({
    id: 'ass-comp-001',
    usuario_id: compId,
    status: 'ativa',
    data_inicio: new Date().toISOString(),
    data_expiracao: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
    valor_mensal: 49.9,
    forma_pagamento: 'simulada_cartao_vip',
  });

  // 2. Vendedor com Loja e Produtos (senha 000)
  const vendId = 'vend-001';
  db.usuarios.push({
    id: vendId,
    tipo: 'vendedor',
    nome: 'Confeção Bela Moda Brás',
    email: 'vendedor@atacado.com',
    senha_hash: hash000,
    telefone: '(11) 3322-1100',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '03001-000',
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString(),
  });

  db.assinaturas.push({
    id: 'ass-vend-001',
    usuario_id: vendId,
    status: 'ativa',
    data_inicio: new Date().toISOString(),
    data_expiracao: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
    valor_mensal: 89.9,
    forma_pagamento: 'simulada_plano_fabricante',
  });

  const lojaId = 'loja-001';
  db.lojas.push({
    id: lojaId,
    vendedor_id: vendId,
    nome_loja: 'Bela Moda Brás Atacado',
    endereco_completo: 'Rua Oriente, 450 - Brás',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '03016-000',
    telefone_contato: '(11) 3322-1100',
    whatsapp: '11999998888',
    email_contato: 'contato@belamodabras.com.br',
    site_redes_sociais: '@belamodabras',
    criado_em: new Date().toISOString(),
  });

  db.produtos.push(
    {
      id: 'prod-001',
      loja_id: lojaId,
      titulo: 'Vestido Midi Canelado Premium',
      preco: 38.9,
      quantidade_minima: 6,
      categoria: 'Feminino',
      cores: ['Preto', 'Terracota', 'Verde Militar'],
      tamanhos: ['P', 'M', 'G', 'GG'],
      ativo: true,
      fotos: [
        {
          url_imagem: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
          ordem: 0,
        },
      ],
      criado_em: new Date().toISOString(),
      atualizado_em: new Date().toISOString(),
    },
    {
      id: 'prod-002',
      loja_id: lojaId,
      titulo: 'Conjunto Alfaiataria Feminino Cores Tendência',
      preco: 65.0,
      quantidade_minima: 10,
      categoria: 'Conjuntos',
      cores: ['Azul Caneta', 'Fúcsia', 'Preto', 'Bege'],
      tamanhos: ['P', 'M', 'G'],
      ativo: true,
      fotos: [
        {
          url_imagem: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
          ordem: 0,
        },
      ],
      criado_em: new Date().toISOString(),
      atualizado_em: new Date().toISOString(),
    }
  );

  // 3. Admin (senha admin123)
  db.usuarios.push({
    id: 'admin-001',
    tipo: 'admin',
    nome: 'Administrador Atacado Online',
    email: 'admin@atacado.com',
    senha_hash: hashAdmin,
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString(),
  });
}

// ============================================================================
// MIDDLEWARES DE AUTENTICAÇÃO E PERMISSÃO
// ============================================================================
interface AuthRequest extends Request {
  user?: { id: string; tipo: 'comprador' | 'vendedor' | 'admin'; email: string };
}

function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token JWT não fornecido ou inválido' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string; tipo: 'comprador' | 'vendedor' | 'admin'; email: string };
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Token expirado ou inválido' });
  }
}

// Identifica se usuário está autenticado e tem assinatura VIP ativa (sem bloquear a requisição)
function checkSubscriberBuyer(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string; tipo: 'comprador' | 'vendedor' | 'admin'; email: string };
    req.user = payload;
  } catch {
    // ignorar token inválido no check opcional
  }
  next();
}

function verificaAssinaturaAtiva(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) return res.status(401).json({ error: 'Usuário não autenticado' });
  const assinatura = db.assinaturas.find((a) => a.usuario_id === req.user?.id && a.status === 'ativa');
  if (!assinatura && req.user.tipo !== 'admin') {
    return res.status(403).json({ error: 'Requer uma assinatura ativa para realizar esta ação no marketplace.' });
  }
  next();
}

// ============================================================================
// BOOTSTRAP DO EXPRESS SERVER
// ============================================================================
async function startServer() {
  await initSeed();

  const app = express();
  app.use(cors());
  app.use(express.json());

  // --------------------------------------------------------------------------
  // 1. ENDPOINTS DE AUTENTICAÇÃO (/api/auth)
  // --------------------------------------------------------------------------
  app.post('/api/auth/registrar', async (req, res) => {
    try {
      const { nome, email, senha, tipo = 'comprador', telefone, cidade, estado, cep } = req.body;
      if (!email || !senha || !nome) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
      }
      if (db.usuarios.some((u) => u.email === email)) {
        return res.status(409).json({ error: 'Email já cadastrado no portal.' });
      }

      const senha_hash = await bcrypt.hash(senha, 10);
      const novoUsuario: Usuario = {
        id: `user-${Date.now()}`,
        tipo: tipo === 'vendedor' ? 'vendedor' : 'comprador',
        nome,
        email,
        senha_hash,
        telefone,
        cidade,
        estado,
        cep,
        criado_em: new Date().toISOString(),
        atualizado_em: new Date().toISOString(),
      };
      db.usuarios.push(novoUsuario);

      // Criar assinatura VIP experimental (30 dias grátis de demonstração)
      db.assinaturas.push({
        id: `ass-${Date.now()}`,
        usuario_id: novoUsuario.id,
        status: 'ativa',
        data_inicio: new Date().toISOString(),
        data_expiracao: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
        valor_mensal: novoUsuario.tipo === 'vendedor' ? 89.9 : 49.9,
        forma_pagamento: 'simulada_trial',
      });

      const token = jwt.sign(
        { id: novoUsuario.id, tipo: novoUsuario.tipo, email: novoUsuario.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const { senha_hash: _, ...userSemSenha } = novoUsuario;
      return res.status(201).json({ token, user: userSemSenha });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, senha, username } = req.body;
      const loginQuery = email || username;
      if (!loginQuery || !senha) {
        return res.status(400).json({ error: 'Informe email e senha.' });
      }

      // Permite login rápido por 'email', ou 'comprador' / 'vendedor' / 'admin'
      const user = db.usuarios.find(
        (u) =>
          u.email.toLowerCase() === loginQuery.toLowerCase() ||
          u.tipo === loginQuery.toLowerCase() ||
          u.email.split('@')[0] === loginQuery.toLowerCase()
      );

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado no portal.' });
      }

      const senhaCorreta = await bcrypt.compare(senha, user.senha_hash);
      if (!senhaCorreta) {
        return res.status(401).json({ error: 'Senha incorreta.' });
      }

      const token = jwt.sign({ id: user.id, tipo: user.tipo, email: user.email }, JWT_SECRET, {
        expiresIn: '7d',
      });

      const { senha_hash: _, ...userSemSenha } = user;
      return res.json({ token, user: userSemSenha });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    return res.json({ message: 'Sessão encerrada com sucesso no backend.' });
  });

  app.get('/api/auth/me', authMiddleware, (req: AuthRequest, res) => {
    const user = db.usuarios.find((u) => u.id === req.user?.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    const { senha_hash: _, ...userSemSenha } = user;
    return res.json(userSemSenha);
  });

  // --------------------------------------------------------------------------
  // 2. ENDPOINTS DE USUÁRIOS (/api/usuarios)
  // --------------------------------------------------------------------------
  app.get('/api/usuarios/:id', authMiddleware, (req, res) => {
    const user = db.usuarios.find((u) => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    const { senha_hash: _, ...userSemSenha } = user;
    return res.json(userSemSenha);
  });

  app.put('/api/usuarios/:id', authMiddleware, async (req: AuthRequest, res) => {
    if (req.user?.id !== req.params.id && req.user?.tipo !== 'admin') {
      return res.status(403).json({ error: 'Sem permissão para alterar este usuário.' });
    }
    const idx = db.usuarios.findIndex((u) => u.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Usuário não encontrado.' });

    const { nome, telefone, cidade, estado, cep } = req.body;
    const userAtual = db.usuarios[idx];
    const userAtualizado: Usuario = {
      ...userAtual,
      nome: nome ?? userAtual.nome,
      telefone: telefone ?? userAtual.telefone,
      cidade: cidade ?? userAtual.cidade,
      estado: estado ?? userAtual.estado,
      cep: cep ?? userAtual.cep,
      atualizado_em: new Date().toISOString(),
    };
    db.usuarios[idx] = userAtualizado;
    const { senha_hash: _, ...retorno } = userAtualizado;
    return res.json(retorno);
  });

  app.delete('/api/usuarios/:id', authMiddleware, (req: AuthRequest, res) => {
    if (req.user?.id !== req.params.id && req.user?.tipo !== 'admin') {
      return res.status(403).json({ error: 'Sem permissão para excluir este usuário.' });
    }
    db.usuarios = db.usuarios.filter((u) => u.id !== req.params.id);
    return res.json({ message: 'Usuário removido com sucesso.' });
  });

  // --------------------------------------------------------------------------
  // 3. ENDPOINTS DE ASSINATURA (/api/assinaturas)
  // --------------------------------------------------------------------------
  app.get('/api/assinaturas/:usuario_id', authMiddleware, (req, res) => {
    const assinaturas = db.assinaturas.filter((a) => a.usuario_id === req.params.usuario_id);
    const atual = assinaturas[0] || null;
    return res.json(atual);
  });

  app.post('/api/assinaturas/ativar', authMiddleware, (req: AuthRequest, res) => {
    const { forma_pagamento = 'simulada_cartao' } = req.body;
    const userId = req.user?.id || '';
    const assExistente = db.assinaturas.find((a) => a.usuario_id === userId);

    if (assExistente) {
      assExistente.status = 'ativa';
      assExistente.data_expiracao = new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString();
      return res.json({ message: 'Assinatura renovada com sucesso!', assinatura: assExistente });
    }

    const nova: Assinatura = {
      id: `ass-${Date.now()}`,
      usuario_id: userId,
      status: 'ativa',
      data_inicio: new Date().toISOString(),
      data_expiracao: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
      valor_mensal: req.user?.tipo === 'vendedor' ? 89.9 : 49.9,
      forma_pagamento,
    };
    db.assinaturas.push(nova);
    return res.status(201).json({ message: 'Assinatura ativada com sucesso!', assinatura: nova });
  });

  app.post('/api/assinaturas/cancelar', authMiddleware, (req: AuthRequest, res) => {
    const ass = db.assinaturas.find((a) => a.usuario_id === req.user?.id);
    if (ass) ass.status = 'cancelada';
    return res.json({ message: 'Assinatura cancelada no backend.', assinatura: ass });
  });

  // --------------------------------------------------------------------------
  // 4. ENDPOINTS DE LOJAS (/api/lojas)
  // --------------------------------------------------------------------------
  app.post('/api/lojas', authMiddleware, (req: AuthRequest, res) => {
    if (req.user?.tipo !== 'vendedor' && req.user?.tipo !== 'admin') {
      return res.status(403).json({ error: 'Apenas vendedores podem criar uma loja no atacado.' });
    }
    const {
      nome_loja,
      endereco_completo,
      cidade,
      estado,
      cep,
      telefone_contato,
      whatsapp,
      email_contato,
      site_redes_sociais,
    } = req.body;

    if (!nome_loja || !cidade || !estado) {
      return res.status(400).json({ error: 'Nome da loja, cidade e estado são obrigatórios.' });
    }

    const novaLoja: Loja = {
      id: `loja-${Date.now()}`,
      vendedor_id: req.user.id,
      nome_loja,
      endereco_completo,
      cidade,
      estado,
      cep,
      telefone_contato,
      whatsapp,
      email_contato,
      site_redes_sociais,
      criado_em: new Date().toISOString(),
    };
    db.lojas.push(novaLoja);
    return res.status(201).json(novaLoja);
  });

  app.get('/api/lojas/:id', (req, res) => {
    const loja = db.lojas.find((l) => l.id === req.params.id);
    if (!loja) return res.status(404).json({ error: 'Loja não encontrada.' });
    return res.json(loja);
  });

  app.get('/api/lojas/:id/produtos', (req, res) => {
    const prods = db.produtos.filter((p) => p.loja_id === req.params.id && p.ativo);
    return res.json(prods);
  });

  // --------------------------------------------------------------------------
  // 5. ENDPOINTS DE PRODUTOS COM A REGRA DE NEGÓCIO CRÍTICA (/api/produtos)
  // --------------------------------------------------------------------------
  // REGRA DE NEGÓCIO CRÍTICA:
  // Se o usuário autenticado for COMPRADOR COM ASSINATURA ATIVA -> retorna produto COM dados da loja.
  // Se NÃO (visitante ou sem assinatura) -> retorna SEM loja e com loja_bloqueada: true!
  app.get('/api/produtos', checkSubscriberBuyer, (req: AuthRequest, res) => {
    const { categoria, busca, precoMin, precoMax } = req.query;

    let lista = [...db.produtos].filter((p) => p.ativo);
    if (categoria && categoria !== 'Todos') {
      lista = lista.filter((p) => p.categoria.toLowerCase() === String(categoria).toLowerCase());
    }
    if (busca) {
      const q = String(busca).toLowerCase();
      lista = lista.filter((p) => p.titulo.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q));
    }
    if (precoMin) {
      lista = lista.filter((p) => p.preco >= Number(precoMin));
    }
    if (precoMax) {
      lista = lista.filter((p) => p.preco <= Number(precoMax));
    }

    // Identificar se requisitante é comprador com assinatura ativa (ou admin/vendedor)
    const ehAssinanteAtivo = !!req.user && (
      req.user.tipo === 'admin' ||
      req.user.tipo === 'vendedor' ||
      db.assinaturas.some((a) => a.usuario_id === req.user?.id && a.status === 'ativa')
    );

    const resultado = lista.map((p) => {
      if (ehAssinanteAtivo) {
        const loja = db.lojas.find((l) => l.id === p.loja_id);
        return {
          ...p,
          loja_bloqueada: false,
          loja: loja || null,
        };
      } else {
        // Bloqueia contato e endereço do fabricante
        return {
          ...p,
          loja_bloqueada: true,
          loja: undefined, // omite objeto de loja na resposta da API
        };
      }
    });

    return res.json(resultado);
  });

  app.get('/api/produtos/:id', checkSubscriberBuyer, (req: AuthRequest, res) => {
    const p = db.produtos.find((prod) => prod.id === req.params.id);
    if (!p) return res.status(404).json({ error: 'Produto não encontrado.' });

    const ehAssinanteAtivo = !!req.user && (
      req.user.tipo === 'admin' ||
      req.user.tipo === 'vendedor' ||
      db.assinaturas.some((a) => a.usuario_id === req.user?.id && a.status === 'ativa')
    );

    if (ehAssinanteAtivo) {
      const loja = db.lojas.find((l) => l.id === p.loja_id);
      return res.json({
        ...p,
        loja_bloqueada: false,
        loja: loja || null,
      });
    } else {
      return res.json({
        ...p,
        loja_bloqueada: true,
        loja: undefined,
      });
    }
  });

  app.post('/api/produtos', authMiddleware, verificaAssinaturaAtiva, (req: AuthRequest, res) => {
    if (req.user?.tipo !== 'vendedor' && req.user?.tipo !== 'admin') {
      return res.status(403).json({ error: 'Apenas vendedores podem cadastrar produtos.' });
    }

    const { titulo, preco, quantidade_minima = 6, categoria, cores = [], tamanhos = [], fotos = [], loja_id } = req.body;
    if (!titulo || !preco || !categoria) {
      return res.status(400).json({ error: 'Título, preço e categoria são obrigatórios.' });
    }

    // Loja associada ao vendedor logado
    const loja = db.lojas.find((l) => l.id === loja_id || l.vendedor_id === req.user?.id);
    if (!loja) {
      return res.status(400).json({ error: 'Cadastre primeiro os dados da sua Loja para anunciar no atacado.' });
    }

    const novoProd: Produto = {
      id: `prod-${Date.now()}`,
      loja_id: loja.id,
      titulo,
      preco: Number(preco),
      quantidade_minima: Number(quantidade_minima),
      categoria,
      cores: Array.isArray(cores) ? cores : [cores],
      tamanhos: Array.isArray(tamanhos) ? tamanhos : [tamanhos],
      ativo: true,
      fotos: Array.isArray(fotos) ? fotos : [],
      criado_em: new Date().toISOString(),
      atualizado_em: new Date().toISOString(),
    };

    db.produtos.push(novoProd);
    return res.status(201).json(novoProd);
  });

  app.put('/api/produtos/:id', authMiddleware, (req: AuthRequest, res) => {
    const idx = db.produtos.findIndex((p) => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Produto não encontrado.' });

    const pAtual = db.produtos[idx];
    const loja = db.lojas.find((l) => l.id === pAtual.loja_id);
    if (loja?.vendedor_id !== req.user?.id && req.user?.tipo !== 'admin') {
      return res.status(403).json({ error: 'Sem permissão para alterar este produto.' });
    }

    const { titulo, preco, quantidade_minima, categoria, cores, tamanhos, ativo, fotos } = req.body;
    db.produtos[idx] = {
      ...pAtual,
      titulo: titulo ?? pAtual.titulo,
      preco: preco !== undefined ? Number(preco) : pAtual.preco,
      quantidade_minima: quantidade_minima !== undefined ? Number(quantidade_minima) : pAtual.quantidade_minima,
      categoria: categoria ?? pAtual.categoria,
      cores: cores ?? pAtual.cores,
      tamanhos: tamanhos ?? pAtual.tamanhos,
      ativo: ativo !== undefined ? Boolean(ativo) : pAtual.ativo,
      fotos: fotos ?? pAtual.fotos,
      atualizado_em: new Date().toISOString(),
    };

    return res.json(db.produtos[idx]);
  });

  app.delete('/api/produtos/:id', authMiddleware, (req: AuthRequest, res) => {
    const prod = db.produtos.find((p) => p.id === req.params.id);
    if (!prod) return res.status(404).json({ error: 'Produto não encontrado.' });

    const loja = db.lojas.find((l) => l.id === prod.loja_id);
    if (loja?.vendedor_id !== req.user?.id && req.user?.tipo !== 'admin') {
      return res.status(403).json({ error: 'Sem permissão para excluir este produto.' });
    }

    db.produtos = db.produtos.filter((p) => p.id !== req.params.id);
    return res.json({ message: 'Produto removido do catálogo com sucesso.' });
  });

  // --------------------------------------------------------------------------
  // 6. ENDPOINT DE UPLOAD DE IMAGENS (/api/upload)
  // --------------------------------------------------------------------------
  // Recebe multipart/form-data via Multer, simula armazenamento em Object Storage (S3/R2)
  app.post('/api/upload', authMiddleware, upload.array('fotos', 8), (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'Nenhuma foto foi enviada.' });
      }

      // Converte cada foto recebida na memória para uma URL de Object Storage ou DataURL para preview imediato
      const urls = files.map((file, idx) => {
        const base64 = file.buffer.toString('base64');
        return `data:${file.mimetype};base64,${base64}`;
      });

      return res.status(201).json({
        message: `${files.length} imagem(ns) enviada(s) para o object storage com sucesso!`,
        urls,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Falha no upload de imagem.' });
    }
  });

  // --------------------------------------------------------------------------
  // 7. ENDPOINTS DE ADMIN (/api/admin)
  // --------------------------------------------------------------------------
  const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.tipo !== 'admin') {
      return res.status(403).json({ error: 'Acesso restrito a administradores.' });
    }
    next();
  };

  app.get('/api/admin/vendedores', authMiddleware, adminOnly, (req, res) => {
    const vendedores = db.usuarios
      .filter((u) => u.tipo === 'vendedor')
      .map((v) => {
        const ass = db.assinaturas.find((a) => a.usuario_id === v.id);
        const { senha_hash: _, ...rest } = v;
        return { ...rest, assinatura: ass || null };
      });
    return res.json(vendedores);
  });

  app.get('/api/admin/compradores', authMiddleware, adminOnly, (req, res) => {
    const compradores = db.usuarios
      .filter((u) => u.tipo === 'comprador')
      .map((c) => {
        const ass = db.assinaturas.find((a) => a.usuario_id === c.id);
        const { senha_hash: _, ...rest } = c;
        return { ...rest, assinatura: ass || null };
      });
    return res.json(compradores);
  });

  app.get('/api/admin/produtos', authMiddleware, adminOnly, (req, res) => {
    return res.json(db.produtos);
  });

  app.get('/api/admin/metricas', authMiddleware, adminOnly, (req, res) => {
    const totalCompradores = db.usuarios.filter((u) => u.tipo === 'comprador').length;
    const totalVendedores = db.usuarios.filter((u) => u.tipo === 'vendedor').length;
    const totalProdutos = db.produtos.length;
    const assinantesAtivos = db.assinaturas.filter((a) => a.status === 'ativa').length;

    return res.json({
      totalCompradores,
      totalVendedores,
      totalProdutos,
      assinantesAtivos,
      receitaMensalEstimada: assinantesAtivos * 49.9,
    });
  });

  // --------------------------------------------------------------------------
  // 8. SERVIR FRONTEND E VITE MIDDLEWARE
  // --------------------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Atacado Online Backend API rodando em http://localhost:${PORT}`);
    console.log(`📡 Endpoints disponíveis:`);
    console.log(`   - POST /api/auth/registrar | /api/auth/login`);
    console.log(`   - GET  /api/produtos  (Regra CRÍTICA: bloqueia detalhes da loja sem assinatura VIP ativa)`);
    console.log(`   - POST /api/upload    (Upload multipart para Object Storage)`);
    console.log(`   - GET  /api/admin/metricas`);
  });
}

startServer();
