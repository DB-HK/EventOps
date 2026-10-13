export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'operador' | 'leitor';
  email: string;
}

export interface EventItem {
  id: string;
  name: string;
  client: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  location: string;
  time: string;
  status: 'em_andamento' | 'planejamento' | 'concluido' | 'cancelado';
  isCustomDays?: boolean;
  customDaysCount?: number;
  quoteId?: string;
  staffCount: number;
}

export interface Contact {
  id: string;
  name: string;
  nickname?: string;
  type: 'cliente' | 'fornecedor' | 'freelancer';
  roleOrCategory: string;
  cpf?: string;
  rg?: string;
  cnpj?: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  bank?: string;
  agency?: string;
  accountNumber?: string;
  accountType?: 'corrente' | 'poupanca';
  pix?: string;
  pixType?: 'CPF' | 'CNPJ' | 'Telefone' | 'E-mail' | 'Chave aleatória';
  rating?: number;
}

export interface Transaction {
  id: string;
  reference: string;
  contactId?: string;
  description: string;
  amount: number;
  type: 'entrada' | 'saida';
  isPaid: boolean;
  dueDate: string; // YYYY-MM-DD
  paymentDate?: string; // YYYY-MM-DD
  eventId?: string;
  category: 'Cachê Staff' | 'Faturamento Cliente' | 'Catering & Alim.' | 'Transporte' | 'Uniformes & EPI' | 'Custos Fixos' | 'Impostos';
}

export interface Invoice {
  id: string;
  number: number;
  eventId: string;
  amount: number;
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  serviceCode: string;
  status: 'emitida' | 'paga' | 'cancelada';
}

export interface ServiceCode {
  id: string;
  code: string;
  description: string;
  retentionRate: number; // e.g. 0.1133 (11.33%)
  totalTaxRate: number; // e.g. 0.1703 (17.03%)
}

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitCost: number;
  days: number;
}

export interface Quote {
  id: string;
  clientName: string;
  projectName: string;
  status: 'Pendente' | 'Aprovada' | 'Recusada';
  rejectionReason?: 'Preço' | 'Perdeu concorrência' | 'Evento cancelado' | 'Outros';
  rejectionNotes?: string;
  margin: number; // 0.25 (25%)
  overhead: number; // 0.10 (10%)
  commission: number; // 0.05 (5%)
  taxes: number; // 0.12 (12%)
  items: QuoteItem[];
  priceOverride?: number;
  eventId?: string;
  createdAt: string;
}

export interface DailyObservation {
  id: string;
  date: string; // YYYY-MM-DD
  text: string;
}

export const INITIAL_SERVICE_CODES: ServiceCode[] = [
  {
    id: 'sc-1',
    code: '07161',
    description: 'Agenciamento e fornecimento de mão de obra temporária',
    retentionRate: 0.1133,
    totalTaxRate: 0.1703,
  },
  {
    id: 'sc-2',
    code: '07022',
    description: 'Serviços de recepção, promoção, hospitalidade e assessoria comercial',
    retentionRate: 0.085,
    totalTaxRate: 0.112,
  },
  {
    id: 'sc-3',
    code: '07030',
    description: 'Coordenação e supervisão técnica de eventos corporativos',
    retentionRate: 0.092,
    totalTaxRate: 0.135,
  },
];

export const INITIAL_USERS: User[] = [
  { id: 'usr-1', username: 'admin', name: 'Diretoria Executiva', role: 'admin', email: 'diretoria@eventops.io' },
  { id: 'usr-2', username: 'editor', name: 'Coordenação Operacional', role: 'operador', email: 'operacoes@eventops.io' },
  { id: 'usr-3', username: 'leitor', name: 'Auditor Externo', role: 'leitor', email: 'auditor@consultoria.com' },
];

export const INITIAL_CONTACTS: Contact[] = [
  // Clientes
  {
    id: 'ct-1',
    name: 'Warner Bros Discovery Brasil',
    nickname: 'Warner Bros',
    type: 'cliente',
    roleOrCategory: 'Entretenimento & Mídia',
    cnpj: '03.221.844/0001-92',
    phone: '(11) 3500-8800',
    email: 'eventos.br@wbd.com',
    city: 'São Paulo',
    state: 'SP',
  },
  {
    id: 'ct-2',
    name: 'Itaú Unibanco S.A. - Setor de Eventos',
    nickname: 'Itaú Cultural',
    type: 'cliente',
    roleOrCategory: 'Instituição Financeira',
    cnpj: '60.701.190/0001-04',
    phone: '(11) 4004-4828',
    email: 'marketing.eventos@itau-unibanco.com.br',
    city: 'São Paulo',
    state: 'SP',
  },
  {
    id: 'ct-3',
    name: 'Natura Cosméticos S/A',
    nickname: 'Natura &Co',
    type: 'cliente',
    roleOrCategory: 'Beleza & Ativação de Marca',
    cnpj: '71.673.990/0001-77',
    phone: '(11) 4446-2000',
    email: 'brand.activation@natura.net',
    city: 'Cajamar',
    state: 'SP',
  },
  {
    id: 'ct-4',
    name: 'Ambev S/A - Divisão Festivais',
    nickname: 'Ambev Festivais',
    type: 'cliente',
    roleOrCategory: 'Bebidas & Festivais',
    cnpj: '07.526.557/0001-00',
    phone: '(11) 2122-1200',
    email: 'live.experience@ambev.com.br',
    city: 'São Paulo',
    state: 'SP',
  },

  // Freelancers
  {
    id: 'ct-5',
    name: 'Camila Rocha Silveira',
    nickname: 'Camila Rocha',
    type: 'freelancer',
    roleOrCategory: 'Recepcionista Bilíngue (Inglês/Espanhol)',
    cpf: '344.892.108-45',
    rg: '42.991.023-0',
    phone: '(11) 98711-2034',
    email: 'camila.rocha.eventos@gmail.com',
    city: 'São Paulo',
    state: 'SP',
    bank: 'Nubank (260)',
    agency: '0001',
    accountNumber: '9841203-1',
    accountType: 'corrente',
    pix: '344.892.108-45',
    pixType: 'CPF',
    rating: 5,
  },
  {
    id: 'ct-6',
    name: 'Lucas Mendonça de Alencar',
    nickname: 'Lucas Alencar',
    type: 'freelancer',
    roleOrCategory: 'Coordenador Geral de Staff',
    cpf: '219.450.778-12',
    rg: '38.412.009-0',
    phone: '(11) 97120-4491',
    email: 'lucas.alencar.coord@outlook.com',
    city: 'São Paulo',
    state: 'SP',
    bank: 'Itaú (341)',
    agency: '1540',
    accountNumber: '29381-0',
    accountType: 'corrente',
    pix: 'lucas.alencar.coord@outlook.com',
    pixType: 'E-mail',
    rating: 5,
  },
  {
    id: 'ct-7',
    name: 'Beatriz Lima Vasconcelos',
    nickname: 'Bia Lima',
    type: 'freelancer',
    roleOrCategory: 'Promotora de Degustação & Vendas',
    cpf: '401.782.908-77',
    rg: '50.119.332-0',
    phone: '(11) 96455-8812',
    email: 'bia.vasconcelos.prom@gmail.com',
    city: 'Campinas',
    state: 'SP',
    bank: 'Inter (077)',
    agency: '0001',
    accountNumber: '1459021-9',
    accountType: 'corrente',
    pix: '11964558812',
    pixType: 'Telefone',
    rating: 4.8,
  },
  {
    id: 'ct-8',
    name: 'Gabriel Santos Nogueira',
    nickname: 'Gabriel Nogueira',
    type: 'freelancer',
    roleOrCategory: 'Supervisor de Credenciamento & Acessos',
    cpf: '188.920.318-63',
    rg: '36.882.114-0',
    phone: '(21) 98112-9900',
    email: 'gabriel.nogueira.tech@gmail.com',
    city: 'Rio de Janeiro',
    state: 'RJ',
    bank: 'Bradesco (237)',
    agency: '2410',
    accountNumber: '44819-2',
    accountType: 'corrente',
    pix: '188.920.318-63',
    pixType: 'CPF',
    rating: 4.9,
  },
  {
    id: 'ct-9',
    name: 'Juliana Paes Fagundes',
    nickname: 'Ju Fagundes',
    type: 'freelancer',
    roleOrCategory: 'Recepcionista VIP & Cerimonial',
    cpf: '299.418.665-21',
    rg: '44.331.098-0',
    phone: '(11) 99182-3344',
    email: 'ju.fagundes.vip@gmail.com',
    city: 'São Paulo',
    state: 'SP',
    bank: 'Santander (033)',
    agency: '0412',
    accountNumber: '1300982-1',
    accountType: 'corrente',
    pix: '4e29f8a1-8933-4db2-a9b0-918204918293',
    pixType: 'Chave aleatória',
    rating: 5,
  },

  // Fornecedores
  {
    id: 'ct-10',
    name: 'Gráfica Express & Sinalização Ltda',
    nickname: 'Gráfica Express',
    type: 'fornecedor',
    roleOrCategory: 'Crachás, Cordões e Banners',
    cnpj: '18.441.229/0001-55',
    phone: '(11) 3102-5500',
    email: 'contato@graficaexpress.com.br',
    city: 'São Paulo',
    state: 'SP',
    bank: 'Itaú (341)',
    agency: '0980',
    accountNumber: '55901-4',
    accountType: 'corrente',
    pix: '18.441.229/0001-55',
    pixType: 'CNPJ',
  },
  {
    id: 'ct-11',
    name: 'Catering Gourmet Eventos Corporativos',
    nickname: 'Buffet Gourmet Staff',
    type: 'fornecedor',
    roleOrCategory: 'Lanches e Refeições de Equipe',
    cnpj: '24.901.882/0001-40',
    phone: '(11) 4509-2210',
    email: 'comercial@gourmeteventos.com.br',
    city: 'São Paulo',
    state: 'SP',
    bank: 'Bradesco (237)',
    agency: '1102',
    accountNumber: '29104-9',
    accountType: 'corrente',
    pix: 'comercial@gourmeteventos.com.br',
    pixType: 'E-mail',
  },
  {
    id: 'ct-12',
    name: 'Uniformes & Alfaiataria Corporativa',
    nickname: 'Uniformes SP',
    type: 'fornecedor',
    roleOrCategory: 'Blazers, Camisas e Vestuário',
    cnpj: '31.882.110/0001-78',
    phone: '(11) 2291-7788',
    email: 'vendas@uniformespaulista.com.br',
    city: 'São Paulo',
    state: 'SP',
    bank: 'Banco do Brasil (001)',
    agency: '3201-9',
    accountNumber: '19402-8',
    accountType: 'corrente',
    pix: '31.882.110/0001-78',
    pixType: 'CNPJ',
  },
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    name: 'Comic Con Experience (CCXP) 2026 - Ativação Warner',
    client: 'Warner Bros Discovery Brasil',
    startDate: '2026-10-12',
    endDate: '2026-10-16',
    location: 'São Paulo Expo - Pavilhão Principal',
    time: '09:00 às 21:00',
    status: 'em_andamento',
    staffCount: 28,
  },
  {
    id: 'evt-2',
    name: 'Web Summit Rio 2026 - Staff Credenciamento & VIP',
    client: 'Itaú Unibanco S.A. - Setor de Eventos',
    startDate: '2026-10-18',
    endDate: '2026-10-22',
    location: 'Riocentro - Barra da Tijuca, RJ',
    time: '08:00 às 19:30',
    status: 'planejamento',
    staffCount: 35,
  },
  {
    id: 'evt-3',
    name: 'Festival Lollapalooza 2026 - Lounge Experiência Heineken',
    client: 'Ambev S/A - Divisão Festivais',
    startDate: '2026-10-24',
    endDate: '2026-10-26',
    location: 'Autódromo de Interlagos, SP',
    time: '11:00 às 23:00',
    status: 'planejamento',
    staffCount: 42,
  },
  {
    id: 'evt-4',
    name: 'Convenção Nacional de Lançamento Natura Ekos',
    client: 'Natura Cosméticos S/A',
    startDate: '2026-10-05',
    endDate: '2026-10-08',
    location: 'Transamerica Expo Center, SP',
    time: '08:30 às 18:00',
    status: 'concluido',
    staffCount: 20,
  },
  {
    id: 'evt-5',
    name: 'Fórmula 1 Grande Prêmio SP - Recepção Paddock Club',
    client: 'Itaú Unibanco S.A. - Setor de Eventos',
    startDate: '2026-11-06',
    endDate: '2026-11-08',
    location: 'Autódromo de Interlagos - Paddock',
    time: '07:30 às 18:30',
    status: 'planejamento',
    staffCount: 18,
  },
  {
    id: 'evt-6',
    name: 'Bienal Internacional do Livro - Estandes Corporativos',
    client: 'Warner Bros Discovery Brasil',
    startDate: '2026-09-20',
    endDate: '2026-09-25',
    location: 'Distrito Anhembi, SP',
    time: '09:00 às 22:00',
    status: 'concluido',
    staffCount: 16,
  },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  // Entradas (Clientes)
  {
    id: 'tx-1',
    reference: 'Warner Bros Discovery Brasil',
    contactId: 'ct-1',
    description: '1ª Parcela - Contrato Staff CCXP 2026 (Ativação Warner)',
    amount: 54000.0,
    type: 'entrada',
    isPaid: true,
    dueDate: '2026-10-05',
    paymentDate: '2026-10-04',
    eventId: 'evt-1',
    category: 'Faturamento Cliente',
  },
  {
    id: 'tx-2',
    reference: 'Warner Bros Discovery Brasil',
    contactId: 'ct-1',
    description: '2ª Parcela Final - Fechamento CCXP 2026',
    amount: 54000.0,
    type: 'entrada',
    isPaid: false,
    dueDate: '2026-10-18',
    eventId: 'evt-1',
    category: 'Faturamento Cliente',
  },
  {
    id: 'tx-3',
    reference: 'Itaú Unibanco S.A. - Setor de Eventos',
    contactId: 'ct-2',
    description: 'Sinal 50% - Operação Credenciamento Web Summit Rio',
    amount: 68500.0,
    type: 'entrada',
    isPaid: true,
    dueDate: '2026-10-10',
    paymentDate: '2026-10-10',
    eventId: 'evt-2',
    category: 'Faturamento Cliente',
  },
  {
    id: 'tx-4',
    reference: 'Natura Cosméticos S/A',
    contactId: 'ct-3',
    description: 'Pagamento Integral NF 1042 - Convenção Natura Ekos',
    amount: 38200.0,
    type: 'entrada',
    isPaid: true,
    dueDate: '2026-10-14',
    paymentDate: '2026-10-13',
    eventId: 'evt-4',
    category: 'Faturamento Cliente',
  },
  {
    id: 'tx-5',
    reference: 'Ambev S/A - Divisão Festivais',
    contactId: 'ct-4',
    description: 'Entrada 40% - Operação Lounge Lollapalooza 2026',
    amount: 49000.0,
    type: 'entrada',
    isPaid: false,
    dueDate: '2026-10-20',
    eventId: 'evt-3',
    category: 'Faturamento Cliente',
  },
  {
    id: 'tx-6',
    reference: 'Itaú Unibanco S.A. - Setor de Eventos',
    contactId: 'ct-2',
    description: 'Sinal Cotação F1 GP Paddock Club 2026',
    amount: 32000.0,
    type: 'entrada',
    isPaid: false,
    dueDate: '2026-10-28',
    eventId: 'evt-5',
    category: 'Faturamento Cliente',
  },

  // Saídas (Cachês & Custos Operacionais)
  {
    id: 'tx-7',
    reference: 'Camila Rocha Silveira',
    contactId: 'ct-5',
    description: 'Cachê 5 diárias - Recepção Bilíngue CCXP',
    amount: 1750.0,
    type: 'saida',
    isPaid: false,
    dueDate: '2026-10-16',
    eventId: 'evt-1',
    category: 'Cachê Staff',
  },
  {
    id: 'tx-8',
    reference: 'Lucas Mendonça de Alencar',
    contactId: 'ct-6',
    description: 'Coordenação Geral 5 dias + Pré-produção CCXP',
    amount: 3500.0,
    type: 'saida',
    isPaid: false,
    dueDate: '2026-10-16',
    eventId: 'evt-1',
    category: 'Cachê Staff',
  },
  {
    id: 'tx-9',
    reference: 'Beatriz Lima Vasconcelos',
    contactId: 'ct-7',
    description: 'Cachê Promotora - Lançamento Natura Ekos',
    amount: 1200.0,
    type: 'saida',
    isPaid: true,
    dueDate: '2026-10-09',
    paymentDate: '2026-10-09',
    eventId: 'evt-4',
    category: 'Cachê Staff',
  },
  {
    id: 'tx-10',
    reference: 'Gabriel Santos Nogueira',
    contactId: 'ct-8',
    description: 'Adiantamento Logística & Diárias Web Summit Rio',
    amount: 2800.0,
    type: 'saida',
    isPaid: false,
    dueDate: '2026-10-15',
    eventId: 'evt-2',
    category: 'Cachê Staff',
  },
  {
    id: 'tx-11',
    reference: 'Juliana Paes Fagundes',
    contactId: 'ct-9',
    description: 'Cachê Cerimonial VIP - Convenção Natura',
    amount: 1600.0,
    type: 'saida',
    isPaid: true,
    dueDate: '2026-10-09',
    paymentDate: '2026-10-09',
    eventId: 'evt-4',
    category: 'Cachê Staff',
  },
  {
    id: 'tx-12',
    reference: 'Catering Gourmet Eventos Corporativos',
    contactId: 'ct-11',
    description: 'Refeições e Kit Lanche Staff - CCXP (28 pessoas / 5 dias)',
    amount: 9800.0,
    type: 'saida',
    isPaid: false,
    dueDate: '2026-10-13',
    eventId: 'evt-1',
    category: 'Catering & Alim.',
  },
  {
    id: 'tx-13',
    reference: 'Uniformes & Alfaiataria Corporativa',
    contactId: 'ct-12',
    description: 'Confecção 35 Camisas Polo Bordadas - Web Summit',
    amount: 4200.0,
    type: 'saida',
    isPaid: true,
    dueDate: '2026-10-08',
    paymentDate: '2026-10-07',
    eventId: 'evt-2',
    category: 'Uniformes & EPI',
  },
  {
    id: 'tx-14',
    reference: 'Gráfica Express & Sinalização Ltda',
    contactId: 'ct-10',
    description: 'Crachás em PVC com cordão personalizado - CCXP',
    amount: 1450.0,
    type: 'saida',
    isPaid: true,
    dueDate: '2026-10-06',
    paymentDate: '2026-10-06',
    eventId: 'evt-1',
    category: 'Uniformes & EPI',
  },

  // Custos Fixos & Avulsos (Sem evento vinculado)
  {
    id: 'tx-15',
    reference: 'Imobiliária Edifício Paulista Tower',
    description: 'Aluguel Escritório Operacional & Coworking',
    amount: 6200.0,
    type: 'saida',
    isPaid: true,
    dueDate: '2026-10-05',
    paymentDate: '2026-10-05',
    category: 'Custos Fixos',
  },
  {
    id: 'tx-16',
    reference: 'Office & Tech Softwares',
    description: 'Assinaturas Cloud, Domínio, Telefonia e Slack',
    amount: 1150.0,
    type: 'saida',
    isPaid: true,
    dueDate: '2026-10-10',
    paymentDate: '2026-10-10',
    category: 'Custos Fixos',
  },
  {
    id: 'tx-17',
    reference: 'Receita Federal / Simples Nacional',
    description: 'DAS - Guia Única de Tributos Competência Setembro',
    amount: 8940.0,
    type: 'saida',
    isPaid: false,
    dueDate: '2026-10-20',
    category: 'Impostos',
  },
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    number: 1041,
    eventId: 'evt-1',
    amount: 108000.0,
    issueDate: '2026-10-02',
    dueDate: '2026-10-18',
    serviceCode: '07161',
    status: 'emitida',
  },
  {
    id: 'inv-2',
    number: 1042,
    eventId: 'evt-4',
    amount: 38200.0,
    issueDate: '2026-09-28',
    dueDate: '2026-10-14',
    serviceCode: '07022',
    status: 'paga',
  },
  {
    id: 'inv-3',
    number: 1043,
    eventId: 'evt-2',
    amount: 137000.0,
    issueDate: '2026-10-08',
    dueDate: '2026-10-25',
    serviceCode: '07161',
    status: 'emitida',
  },
  {
    id: 'inv-4',
    number: 1044,
    eventId: 'evt-6',
    amount: 29500.0,
    issueDate: '2026-09-18',
    dueDate: '2026-10-05',
    serviceCode: '07022',
    status: 'paga',
  },
];

export const INITIAL_QUOTES: Quote[] = [
  {
    id: 'qt-1',
    clientName: 'Ambev S/A - Divisão Festivais',
    projectName: 'Ativação Corona Sunset - Réveillon Trancoso 2027',
    status: 'Pendente',
    margin: 0.28,
    overhead: 0.1,
    commission: 0.05,
    taxes: 0.12,
    items: [
      { id: 'qi-1', description: 'Coordenador Operacional Bilingue', quantity: 2, unitCost: 450, days: 6 },
      { id: 'qi-2', description: 'Promotores de Ativação / Sampling', quantity: 14, unitCost: 220, days: 5 },
      { id: 'qi-3', description: 'Bartenders Especializados & Barback', quantity: 8, unitCost: 320, days: 4 },
      { id: 'qi-4', description: 'Kit Uniformes Linho Personalizado', quantity: 24, unitCost: 110, days: 1 },
    ],
    createdAt: '2026-10-04',
  },
  {
    id: 'qt-2',
    clientName: 'Itaú Unibanco S.A. - Setor de Eventos',
    projectName: 'Fórmula 1 Grande Prêmio SP - Recepção Paddock Club',
    status: 'Aprovada',
    margin: 0.3,
    overhead: 0.12,
    commission: 0.05,
    taxes: 0.12,
    items: [
      { id: 'qi-5', description: 'Recepcionistas Executivas Trilingues', quantity: 12, unitCost: 550, days: 3 },
      { id: 'qi-6', description: 'Supervisor de Logística e VIP', quantity: 2, unitCost: 600, days: 4 },
      { id: 'qi-7', description: 'Produção Executiva de Trajes e Maquiagem', quantity: 1, unitCost: 4500, days: 1 },
    ],
    eventId: 'evt-5',
    createdAt: '2026-09-25',
  },
  {
    id: 'qt-3',
    clientName: 'Agência Publicis Brasil',
    projectName: 'Roadshow de Tecnologia B2B - 4 Capitais',
    status: 'Recusada',
    rejectionReason: 'Preço',
    rejectionNotes: 'Cliente optou por agência local de cada estado para evitar custos de diárias e viagens da equipe de supervisão.',
    margin: 0.25,
    overhead: 0.15,
    commission: 0.05,
    taxes: 0.12,
    items: [
      { id: 'qi-8', description: 'Coordenador Itinerante', quantity: 1, unitCost: 800, days: 10 },
      { id: 'qi-9', description: 'Staff Local Credenciamento', quantity: 8, unitCost: 240, days: 8 },
    ],
    createdAt: '2026-09-12',
  },
];

export const INITIAL_OBSERVATIONS: DailyObservation[] = [
  { id: 'obs-1', date: '2026-10-05', text: 'Início da Convenção Natura no Transamerica. Equipe 100% pontual no briefing das 07h.' },
  { id: 'obs-2', date: '2026-10-12', text: 'Abertura CCXP - Pavilhão São Paulo Expo. Fila intensa na ativação Warner, staff extra acionado.' },
  { id: 'obs-3', date: '2026-10-13', text: 'Hoje: Vistoria técnica da montagem Web Summit no Riocentro. Crachás e uniformes entregues.' },
  { id: 'obs-4', date: '2026-10-18', text: 'Credenciamento geral Web Summit Rio inicia às 08h00. Supervisão Gabriel Nogueira.' },
];
