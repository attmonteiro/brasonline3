// @ts-nocheck
import { PrismaClient, TipoUsuario, StatusAssinatura } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados Atacado Online...');

  // Limpar tabelas existentes em ambiente de desenvolvimento
  await prisma.fotoProduto.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.loja.deleteMany();
  await prisma.assinatura.deleteMany();
  await prisma.enderecoComprador.deleteMany();
  await prisma.usuario.deleteMany();

  const senhaCompradorHash = await bcrypt.hash('000', 10);
  const senhaVendedorHash = await bcrypt.hash('000', 10);
  const senhaAdminHash = await bcrypt.hash('admin123', 10);

  // 1. Criar usuário COMPRADOR DE TESTE (comprador / senha 000) com assinatura ativa
  const comprador = await prisma.usuario.create({
    data: {
      nome: 'Comprador Lojista VIP',
      email: 'comprador@atacado.com',
      senha_hash: senhaCompradorHash,
      tipo: TipoUsuario.comprador,
      telefone: '(11) 99888-1122',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01001-000',
      assinaturas: {
        create: {
          status: StatusAssinatura.ativa,
          data_inicio: new Date(),
          data_expiracao: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // +1 ano
          valor_mensal: 49.90,
          forma_pagamento: 'simulada_cartao_vip',
        },
      },
      enderecos: {
        create: {
          logradouro: 'Rua 25 de Março',
          numero: '100',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01001-000',
          principal: true,
        },
      },
    },
  });

  // 2. Criar usuário VENDEDOR DE TESTE (vendedor / senha 000) com loja e produtos
  const vendedor = await prisma.usuario.create({
    data: {
      nome: 'Confeção Bela Moda Brás',
      email: 'vendedor@atacado.com',
      senha_hash: senhaVendedorHash,
      tipo: TipoUsuario.vendedor,
      telefone: '(11) 3322-1100',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '03001-000',
      assinaturas: {
        create: {
          status: StatusAssinatura.ativa,
          data_inicio: new Date(),
          data_expiracao: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          valor_mensal: 89.90,
          forma_pagamento: 'simulada_plano_fabricante',
        },
      },
    },
  });

  // Criar Loja do vendedor
  const lojaVendedor = await prisma.loja.create({
    data: {
      vendedor_id: vendedor.id,
      nome_loja: 'Bela Moda Brás Atacado',
      endereco_completo: 'Rua Oriente, 450 - Brás',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '03016-000',
      telefone_contato: '(11) 3322-1100',
      whatsapp: '11999998888',
      email_contato: 'contato@belamodabras.com.br',
      site_redes_sociais: '@belamodabras',
    },
  });

  // Criar Produtos da loja
  await prisma.produto.create({
    data: {
      loja_id: lojaVendedor.id,
      titulo: 'Vestido Midi Canelado Premium',
      preco: 38.90,
      quantidade_minima: 6,
      categoria: 'Feminino',
      cores: ['Preto', 'Terracota', 'Verde Militar'],
      tamanhos: ['P', 'M', 'G', 'GG'],
      ativo: true,
      fotos: {
        create: [
          {
            url_imagem: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
            ordem: 0,
          },
          {
            url_imagem: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
            ordem: 1,
          },
        ],
      },
    },
  });

  await prisma.produto.create({
    data: {
      loja_id: lojaVendedor.id,
      titulo: 'Conjunto Alfaiataria Feminino Cores Tendência',
      preco: 65.00,
      quantidade_minima: 10,
      categoria: 'Conjuntos',
      cores: ['Azul Caneta', 'Fúcsia', 'Preto', 'Bege'],
      tamanhos: ['P', 'M', 'G'],
      ativo: true,
      fotos: {
        create: [
          {
            url_imagem: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
            ordem: 0,
          },
        ],
      },
    },
  });

  // 3. Criar usuário ADMIN DE TESTE
  const admin = await prisma.usuario.create({
    data: {
      nome: 'Administrador Atacado Online',
      email: 'admin@atacado.com',
      senha_hash: senhaAdminHash,
      tipo: TipoUsuario.admin,
      cidade: 'São Paulo',
      estado: 'SP',
    },
  });

  console.log('✅ Seed concluído com sucesso!');
  console.log('👤 Comprador VIP -> email: comprador@atacado.com | senha: 000');
  console.log('🏬 Vendedor Atacado -> email: vendedor@atacado.com | senha: 000');
  console.log('🛡️ Admin Portal -> email: admin@atacado.com | senha: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
