import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Briefcase,
  DollarSign,
  TrendingUp,
  FileText,
  Users,
  BarChart3,
  ShieldCheck,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Building2,
  Phone,
  Mail,
  MapPin,
  Copy,
  Check,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw,
  Sparkles,
  Download,
  Eye,
  Trash2,
  ExternalLink,
  ChevronLeft,
  Sun,
  Moon,
  Contrast,
  Palette
} from 'lucide-react';
import {
  User,
  EventItem,
  Contact,
  Transaction,
  Invoice,
  Quote,
  DailyObservation,
  INITIAL_USERS,
  INITIAL_EVENTS,
  INITIAL_CONTACTS,
  INITIAL_TRANSACTIONS,
  INITIAL_INVOICES,
  INITIAL_QUOTES,
  INITIAL_OBSERVATIONS,
  INITIAL_SERVICE_CODES
} from './mockData.ts';

export type ThemeMode = 'dark' | 'soft-light' | 'high-contrast';

export default function App() {
  // Estado principal
  const [activeTab, setActiveTab] = useState<'dashboard' | 'eventos' | 'gantt' | 'orcamentos' | 'financeiro' | 'fluxo' | 'notas' | 'contatos' | 'relatorios' | 'usuarios'>('dashboard');
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]); // admin por padrão
  const [theme, setTheme] = useState<ThemeMode>('dark');
  
  // Entidades do sistema
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [quotes, setQuotes] = useState<Quote[]>(INITIAL_QUOTES);
  const [observations, setObservations] = useState<DailyObservation[]>(INITIAL_OBSERVATIONS);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  
  // Saldo inicial manual do fluxo de caixa
  const [initialCashBalance, setInitialCashBalance] = useState<number>(45250.0);

  // Estados de Modais
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);
  const [showNewEventModal, setShowNewEventModal] = useState<boolean>(false);
  const [showNewTxModal, setShowNewTxModal] = useState<boolean>(false);
  const [showNewQuoteModal, setShowNewQuoteModal] = useState<boolean>(false);
  const [showNewContactModal, setShowNewContactModal] = useState<boolean>(false);
  const [selectedDayObs, setSelectedDayObs] = useState<{ day: number; text: string } | null>(null);
  const [copiedPixId, setCopiedPixId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Filtros
  const [eventFilter, setEventFilter] = useState<'todos' | 'em_andamento' | 'planejamento' | 'concluido'>('todos');
  const [txFilter, setTxFilter] = useState<'todos' | 'entrada' | 'saida' | 'pendente' | 'pago'>('todos');
  const [contactFilter, setContactFilter] = useState<'todos' | 'cliente' | 'freelancer' | 'fornecedor'>('todos');
  const [txSearch, setTxSearch] = useState<string>('');
  const [contactSearch, setContactSearch] = useState<string>('');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Configuração Dinâmica de Tokens de Estilo por Tema
  const T = useMemo(() => {
    if (theme === 'soft-light') {
      return {
        mode: 'soft-light' as const,
        appBg: 'bg-[#f4f5f7] text-slate-800',
        sidebarBg: 'bg-[#ffffff] border-r border-slate-200 shadow-sm',
        headerBg: 'bg-[#ffffff]/90 border-b border-slate-200 backdrop-blur shadow-xs',
        mainBg: 'bg-[#f4f5f7]',
        cardBg: 'bg-[#ffffff] border border-slate-200/90 shadow-sm',
        subcardBg: 'bg-[#f9fafb] border border-slate-200/80',
        navActive: 'bg-indigo-600 text-white font-semibold shadow-sm',
        navInactive: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
        titleColor: 'text-slate-900 font-bold',
        mutedText: 'text-slate-500',
        inputText: 'bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:ring-indigo-500',
        tableHeader: 'bg-slate-100/90 text-slate-600 border-b border-slate-200 font-semibold',
        tableRowHover: 'hover:bg-slate-50',
        badgeNeutral: 'bg-slate-100 text-slate-700 border border-slate-200',
        accentText: 'text-indigo-600',
        accentBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs',
        divider: 'border-slate-200',
        contrastHighlight: 'border-indigo-500 ring-indigo-400',
      };
    }
    if (theme === 'high-contrast') {
      return {
        mode: 'high-contrast' as const,
        appBg: 'bg-black text-white font-medium',
        sidebarBg: 'bg-black border-r-2 border-yellow-400/80',
        headerBg: 'bg-black border-b-2 border-yellow-400/80',
        mainBg: 'bg-black',
        cardBg: 'bg-zinc-950 border-2 border-zinc-700 hover:border-yellow-400/70 shadow-none',
        subcardBg: 'bg-black border border-zinc-600',
        navActive: 'bg-yellow-400 text-black font-extrabold shadow-none',
        navInactive: 'text-zinc-300 hover:text-white hover:bg-zinc-900',
        titleColor: 'text-white font-extrabold tracking-tight',
        mutedText: 'text-zinc-300 font-medium',
        inputText: 'bg-black border-2 border-yellow-400 text-white placeholder-zinc-500 focus:ring-yellow-400',
        tableHeader: 'bg-zinc-900 text-yellow-300 border-b-2 border-zinc-700 font-bold',
        tableRowHover: 'hover:bg-zinc-900',
        badgeNeutral: 'bg-zinc-900 text-yellow-300 border border-yellow-400/60',
        accentText: 'text-yellow-400 font-bold',
        accentBtn: 'bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold',
        divider: 'border-zinc-800',
        contrastHighlight: 'border-yellow-400 ring-yellow-400',
      };
    }
    // dark (padrão)
    return {
      mode: 'dark' as const,
      appBg: 'bg-slate-950 text-slate-100',
      sidebarBg: 'bg-slate-900 border-r border-slate-800',
      headerBg: 'bg-slate-900/90 border-b border-slate-800 backdrop-blur',
      mainBg: 'bg-slate-950',
      cardBg: 'bg-slate-900 border border-slate-800 shadow-sm',
      subcardBg: 'bg-slate-950/80 border border-slate-800/80',
      navActive: 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/25',
      navInactive: 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60',
      titleColor: 'text-white font-bold',
      mutedText: 'text-slate-400',
      inputText: 'bg-slate-950 border-slate-700 text-slate-200 placeholder-slate-500 focus:ring-indigo-500',
      tableHeader: 'bg-slate-950/70 text-slate-400 border-b border-slate-800',
      tableRowHover: 'hover:bg-slate-800/40',
      badgeNeutral: 'bg-slate-800 text-slate-300',
      accentText: 'text-indigo-400',
      accentBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm',
      divider: 'border-slate-800',
      contrastHighlight: 'border-indigo-500 ring-indigo-400',
    };
  }, [theme]);

  const resetAllData = () => {
    setEvents(INITIAL_EVENTS);
    setContacts(INITIAL_CONTACTS);
    setTransactions(INITIAL_TRANSACTIONS);
    setInvoices(INITIAL_INVOICES);
    setQuotes(INITIAL_QUOTES);
    setObservations(INITIAL_OBSERVATIONS);
    setInitialCashBalance(45250.0);
    showToast('Dados restaurados para o padrão de demonstração!');
  };

  const handleCopyPix = (pixText: string, id: string) => {
    navigator.clipboard?.writeText(pixText);
    setCopiedPixId(id);
    showToast(`Chave Pix copiada: ${pixText}`);
    setTimeout(() => setCopiedPixId(null), 2500);
  };

  // Cálculos do Dashboard
  const metrics = useMemo(() => {
    const totalEntradasPagas = transactions
      .filter((t) => t.type === 'entrada' && t.isPaid)
      .reduce((acc, t) => acc + t.amount, 0);

    const totalSaidasPagas = transactions
      .filter((t) => t.type === 'saida' && t.isPaid)
      .reduce((acc, t) => acc + t.amount, 0);

    const aReceberPendente = transactions
      .filter((t) => t.type === 'entrada' && !t.isPaid)
      .reduce((acc, t) => acc + t.amount, 0);

    const aPagarPendente = transactions
      .filter((t) => t.type === 'saida' && !t.isPaid)
      .reduce((acc, t) => acc + t.amount, 0);

    const saldoAtual = initialCashBalance + totalEntradasPagas - totalSaidasPagas;

    const proximos7DiasPagar = transactions
      .filter((t) => t.type === 'saida' && !t.isPaid && t.dueDate >= '2026-10-13' && t.dueDate <= '2026-10-20')
      .reduce((acc, t) => acc + t.amount, 0);

    const proximos7DiasReceber = transactions
      .filter((t) => t.type === 'entrada' && !t.isPaid && t.dueDate >= '2026-10-13' && t.dueDate <= '2026-10-20')
      .reduce((acc, t) => acc + t.amount, 0);

    const eventosAtivos = events.filter((e) => e.status === 'em_andamento').length;

    return {
      totalEntradasPagas,
      totalSaidasPagas,
      aReceberPendente,
      aPagarPendente,
      saldoAtual,
      proximos7DiasPagar,
      proximos7DiasReceber,
      eventosAtivos,
    };
  }, [transactions, initialCashBalance, events]);

  // Converter Cotação em Evento
  const handleConvertQuoteToEvent = (quote: Quote) => {
    if (currentUser.role === 'leitor') {
      showToast('Acesso negado: perfil de leitor não pode converter orçamentos.');
      return;
    }

    const calculatedPrice = calculateQuotePrice(quote);
    const newEventId = `evt-${Date.now()}`;
    const newEvent: EventItem = {
      id: newEventId,
      name: quote.projectName,
      client: quote.clientName,
      startDate: '2026-11-15',
      endDate: '2026-11-18',
      location: 'Centro de Convenções São Paulo',
      time: '08:00 às 20:00',
      status: 'planejamento',
      quoteId: quote.id,
      staffCount: quote.items.reduce((acc, i) => acc + i.quantity, 0),
    };

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      reference: quote.clientName,
      description: `Faturamento aprovado - Orçamento #${quote.id} (${quote.projectName})`,
      amount: calculatedPrice,
      type: 'entrada',
      isPaid: false,
      dueDate: '2026-11-15',
      eventId: newEventId,
      category: 'Faturamento Cliente',
    };

    setEvents((prev) => [newEvent, ...prev]);
    setTransactions((prev) => [newTx, ...prev]);
    setQuotes((prev) =>
      prev.map((q) => (q.id === quote.id ? { ...q, status: 'Aprovada', eventId: newEventId } : q))
    );

    showToast(`Orçamento aprovado e convertido no Evento "${newEvent.name}"!`);
  };

  // Alternar status de pagamento
  const toggleTransactionPaid = (id: string) => {
    if (currentUser.role === 'leitor') {
      showToast('Acesso negado: Perfil somente leitura.');
      return;
    }
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newStatus = !t.isPaid;
          return {
            ...t,
            isPaid: newStatus,
            paymentDate: newStatus ? '2026-10-13' : undefined,
          };
        }
        return t;
      })
    );
    showToast('Status da movimentação financeira atualizado!');
  };

  // Cálculo da fórmula de precificação do README
  function calculateQuotePrice(quote: Quote) {
    if (quote.priceOverride) return quote.priceOverride;
    const directCost = quote.items.reduce(
      (acc, item) => acc + item.quantity * item.unitCost * item.days,
      0
    );
    const costWithOverhead = directCost * (1 + quote.overhead);
    const denominator = (1 - quote.margin) * (1 - (quote.commission + quote.taxes));
    return denominator > 0 ? costWithOverhead / denominator : costWithOverhead;
  }

  // Exportar dados em CSV
  const handleExportCSV = () => {
    const headers = 'ID,Referencia,Descricao,Valor,Tipo,Status,Vencimento,Categoria\n';
    const rows = transactions
      .map(
        (t) =>
          `"${t.id}","${t.reference}","${t.description.replace(/"/g, '""')}",${t.amount},"${t.type}","${t.isPaid ? 'Pago' : 'Pendente'}","${t.dueDate}","${t.category}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `eventops_relatorio_financeiro_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Relatório CSV gerado e baixado com sucesso!');
  };

  return (
    <div className={`flex h-screen ${T.appBg} font-sans overflow-hidden transition-colors duration-200`}>
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-400/40 animate-in fade-in slide-in-from-top-3">
          <Sparkles className="w-5 h-5 text-emerald-200" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`w-64 ${T.sidebarBg} flex flex-col justify-between shrink-0 select-none transition-colors duration-200`}>
        <div>
          {/* Logo & Marca Neutra */}
          <div className={`p-5 border-b ${T.divider}`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-md ${
                theme === 'high-contrast' ? 'bg-yellow-400 text-black font-extrabold' : 'bg-gradient-to-tr from-indigo-600 to-violet-500'
              }`}>
                EO
              </div>
              <div>
                <h1 className={`font-bold text-base tracking-tight ${T.titleColor} flex items-center gap-1.5`}>
                  EventOps <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${
                    theme === 'high-contrast' ? 'bg-yellow-400/20 text-yellow-300' : 'bg-indigo-500/20 text-indigo-400'
                  }`}>ERP</span>
                </h1>
                <p className={`text-[11px] ${T.mutedText}`}>Gestão de Mão de Obra & Eventos</p>
              </div>
            </div>

            {/* Banner de Demonstração / Portfólio */}
            <div className={`mt-3.5 px-2.5 py-1.5 rounded-lg border text-[11px] flex items-center justify-between ${
              theme === 'high-contrast' ? 'bg-zinc-900 border-yellow-400/40 text-yellow-300' : 'bg-amber-500/10 border-amber-500/20 text-amber-500 dark:text-amber-300'
            }`}>
              <span className="font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Template Portfólio
              </span>
              <span className="font-mono text-[10px]">v0.9.5</span>
            </div>
          </div>

          {/* Menu de Navegação */}
          <nav className="p-3 space-y-1 text-sm">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'dashboard' ? T.navActive : T.navInactive
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('eventos')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'eventos' ? T.navActive : T.navInactive
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Eventos</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${T.badgeNeutral}`}>{events.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('gantt')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'gantt' ? T.navActive : T.navInactive
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Cronograma (Gantt)</span>
            </button>

            <button
              onClick={() => setActiveTab('orcamentos')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'orcamentos' ? T.navActive : T.navInactive
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                <span>Orçamentos (CRM)</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${T.badgeNeutral}`}>{quotes.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('financeiro')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'financeiro' ? T.navActive : T.navInactive
              }`}
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4" />
                <span>Financeiro</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${T.badgeNeutral}`}>{transactions.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('fluxo')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'fluxo' ? T.navActive : T.navInactive
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Fluxo de Caixa</span>
            </button>

            <button
              onClick={() => setActiveTab('notas')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'notas' ? T.navActive : T.navInactive
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Notas Fiscais</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${T.badgeNeutral}`}>{invoices.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('contatos')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'contatos' ? T.navActive : T.navInactive
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Contatos (Base)</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${T.badgeNeutral}`}>{contacts.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('relatorios')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'relatorios' ? T.navActive : T.navInactive
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Relatórios</span>
            </button>

            <button
              onClick={() => setActiveTab('usuarios')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === 'usuarios' ? T.navActive : T.navInactive
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Usuários & Temas</span>
            </button>
          </nav>
        </div>

        {/* Rodapé da Sidebar: Seletor de Perfil RBAC & Reset */}
        <div className={`p-3 border-t ${T.divider} space-y-2`}>
          {/* Alternar Perfil */}
          <div className={`${T.subcardBg} p-2.5 rounded-xl border`}>
            <div className={`text-[10px] uppercase font-semibold tracking-wider ${T.mutedText} mb-1 flex items-center justify-between`}>
              <span>Simular Perfil</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                currentUser.role === 'admin' ? 'bg-indigo-500/20 text-indigo-400 font-bold' :
                currentUser.role === 'operador' ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'bg-slate-500/20 text-slate-400'
              }`}>
                {currentUser.role}
              </span>
            </div>
            <select
              value={currentUser.id}
              onChange={(e) => {
                const found = users.find((u) => u.id === e.target.value);
                if (found) {
                  setCurrentUser(found);
                  showToast(`Perfil alterado para: ${found.name} (${found.role})`);
                }
              }}
              className={`w-full ${T.inputText} text-xs rounded-lg p-1.5 focus:outline-none`}
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={resetAllData}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium ${T.mutedText} hover:text-amber-400 hover:bg-slate-800/40 transition-colors`}
            title="Recarrega a massa de dados fictícios para prints"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Dados Placebo</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className={`h-16 ${T.headerBg} flex items-center justify-between px-6 shrink-0 transition-colors duration-200`}>
          <div className="flex items-center gap-3">
            <h2 className={`text-lg font-bold ${T.titleColor} capitalize`}>
              {activeTab === 'dashboard' && 'Dashboard Executivo'}
              {activeTab === 'eventos' && 'Gestão de Eventos & Projetos'}
              {activeTab === 'gantt' && 'Cronograma de Sobreposição (Gantt)'}
              {activeTab === 'orcamentos' && 'Pipeline de Cotações & Precificação'}
              {activeTab === 'financeiro' && 'Movimentações Financeiras'}
              {activeTab === 'fluxo' && 'Fluxo de Caixa Projetado'}
              {activeTab === 'notas' && 'Emissão e Controle de Notas Fiscais'}
              {activeTab === 'contatos' && 'Diretório de Contatos & Freelancers'}
              {activeTab === 'relatorios' && 'Relatórios Gerenciais & Exportação'}
              {activeTab === 'usuarios' && 'Controle de Acesso, Perfis & Temas'}
            </h2>
            <span className={`text-xs ${T.mutedText} hidden sm:inline`}>
              Competência: <strong className={`${T.titleColor} font-medium`}>Outubro 2026</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Alternador Discreto de Tema (1 único ícone minimalista) */}
            <button
              onClick={() => {
                const nextTheme: ThemeMode =
                  theme === 'dark' ? 'soft-light' : theme === 'soft-light' ? 'high-contrast' : 'dark';
                setTheme(nextTheme);
                showToast(
                  nextTheme === 'dark'
                    ? 'Tema: Escuro Padrão'
                    : nextTheme === 'soft-light'
                    ? 'Tema: Claro Suave'
                    : 'Tema: Alto Contraste'
                );
              }}
              className={`p-2 rounded-xl border transition-all ${T.cardBg} ${T.mutedText} hover:${T.titleColor} flex items-center justify-center`}
              title={`Tema: ${
                theme === 'dark' ? 'Escuro Padrão' : theme === 'soft-light' ? 'Claro Suave' : 'Alto Contraste'
              } (clique para alternar)`}
              aria-label="Alternar tema de cores"
            >
              {theme === 'dark' && <Moon className="w-4 h-4 text-indigo-400" />}
              {theme === 'soft-light' && <Sun className="w-4 h-4 text-amber-500" />}
              {theme === 'high-contrast' && <Contrast className="w-4 h-4 text-yellow-400" />}
            </button>

            <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs ${T.cardBg}`}>
              <span className={T.mutedText}>Saldo Operacional:</span>
              <span className="font-semibold text-emerald-500 dark:text-emerald-400">
                {metrics.saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            {/* Ações contextuais rápidas no topo */}
            {activeTab === 'eventos' && currentUser.role !== 'leitor' && (
              <button
                onClick={() => setShowNewEventModal(true)}
                className={`flex items-center gap-1.5 ${T.accentBtn} text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors`}
              >
                <Plus className="w-3.5 h-3.5" /> Novo Evento
              </button>
            )}

            {activeTab === 'financeiro' && currentUser.role !== 'leitor' && (
              <button
                onClick={() => setShowNewTxModal(true)}
                className={`flex items-center gap-1.5 ${T.accentBtn} text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors`}
              >
                <Plus className="w-3.5 h-3.5" /> Lançar Movimentação
              </button>
            )}

            {activeTab === 'orcamentos' && currentUser.role !== 'leitor' && (
              <button
                onClick={() => setShowNewQuoteModal(true)}
                className={`flex items-center gap-1.5 ${T.accentBtn} text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors`}
              >
                <Plus className="w-3.5 h-3.5" /> Criar Cotação
              </button>
            )}

            {activeTab === 'contatos' && currentUser.role !== 'leitor' && (
              <button
                onClick={() => setShowNewContactModal(true)}
                className={`flex items-center gap-1.5 ${T.accentBtn} text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors`}
              >
                <Plus className="w-3.5 h-3.5" /> Cadastrar Contato
              </button>
            )}

            {activeTab === 'relatorios' && (
              <button
                onClick={handleExportCSV}
                className={`flex items-center gap-1.5 ${T.cardBg} ${T.mutedText} hover:text-indigo-400 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors`}
              >
                <Download className="w-3.5 h-3.5 text-indigo-400" /> Exportar CSV
              </button>
            )}
          </div>
        </header>

        {/* Scrollable View Area */}
        <main className={`flex-1 overflow-y-auto p-6 ${T.mainBg} transition-colors duration-200`}>
          {/* ========================================================================= */}
          {/* 1. DASHBOARD EXECUTIVO */}
          {/* ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* 4 Cards de Métricas Principais */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`${T.cardBg} rounded-2xl p-5 relative overflow-hidden`}>
                  <div className={`flex items-center justify-between ${T.mutedText} text-xs font-medium mb-2`}>
                    <span>Faturamento Recebido (Mês)</span>
                    <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                  <div className={`text-2xl font-bold ${T.titleColor}`}>
                    {metrics.totalEntradasPagas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </div>
                  <p className={`text-xs ${T.mutedText} mt-2 flex items-center gap-1`}>
                    <span className="text-emerald-500 dark:text-emerald-400 font-semibold">+18.4%</span> vs. mês anterior
                  </p>
                </div>

                <div className={`${T.cardBg} rounded-2xl p-5 relative overflow-hidden`}>
                  <div className={`flex items-center justify-between ${T.mutedText} text-xs font-medium mb-2`}>
                    <span>Eventos Ativos Hoje</span>
                    <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                      <Calendar className="w-4 h-4" />
                    </span>
                  </div>
                  <div className={`text-2xl font-bold ${T.titleColor}`}>{metrics.eventosAtivos} em andamento</div>
                  <p className={`text-xs ${T.mutedText} mt-2`}>
                    <strong className={`${T.accentText} font-medium`}>28 profissionais</strong> em campo hoje
                  </p>
                </div>

                <div className={`${T.cardBg} rounded-2xl p-5 relative overflow-hidden`}>
                  <div className={`flex items-center justify-between ${T.mutedText} text-xs font-medium mb-2`}>
                    <span>A Receber Pendente</span>
                    <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400">
                      <Clock3 className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-500 dark:text-blue-400">
                    {metrics.aReceberPendente.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </div>
                  <p className={`text-xs ${T.mutedText} mt-2`}>Contratos e faturamentos a liquidar</p>
                </div>

                <div className={`${T.cardBg} rounded-2xl p-5 relative overflow-hidden`}>
                  <div className={`flex items-center justify-between ${T.mutedText} text-xs font-medium mb-2`}>
                    <span>A Pagar Pendente</span>
                    <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 dark:text-rose-400">
                      <ArrowDownRight className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-rose-500 dark:text-rose-400">
                    {metrics.aPagarPendente.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </div>
                  <p className={`text-xs ${T.mutedText} mt-2`}>Cachês, catering e tributos previstos</p>
                </div>
              </div>

              {/* Banner de Previsão dos Próximos 7 Dias */}
              <div className={`${T.cardBg} rounded-2xl p-5`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className={`text-base font-semibold ${T.titleColor} flex items-center gap-2`}>
                      <Clock3 className="w-4 h-4 text-indigo-400" />
                      Projeção dos Próximos 7 Dias (13 a 20 de Outubro)
                    </h3>
                    <p className={`text-xs ${T.mutedText} mt-1`}>
                      Liquidez calculada com base nos vencimentos agendados de clientes e saídas operacionais.
                    </p>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className={`text-xs ${T.mutedText} block`}>Entradas previstas:</span>
                      <strong className="text-emerald-500 dark:text-emerald-400 font-semibold">
                        {metrics.proximos7DiasReceber.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </strong>
                    </div>
                    <div className={`h-8 w-px ${T.divider}`} />
                    <div>
                      <span className={`text-xs ${T.mutedText} block`}>Saídas previstas:</span>
                      <strong className="text-rose-500 dark:text-rose-400 font-semibold">
                        {metrics.proximos7DiasPagar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </strong>
                    </div>
                    <div className={`h-8 w-px ${T.divider}`} />
                    <div>
                      <span className={`text-xs ${T.mutedText} block`}>Saldo líquido no período:</span>
                      <strong className={`${T.accentText} font-bold`}>
                        {(metrics.proximos7DiasReceber - metrics.proximos7DiasPagar).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid 2 colunas: Eventos em Destaque & Próximas Contas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Eventos em Operação */}
                <div className={`${T.cardBg} rounded-2xl p-5`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-semibold ${T.titleColor} text-sm flex items-center gap-2`}>
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      Eventos Principais em Pauta
                    </h3>
                    <button
                      onClick={() => setActiveTab('eventos')}
                      className={`text-xs ${T.accentText} hover:underline flex items-center gap-1 font-medium`}
                    >
                      Ver todos ({events.length}) <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {events.slice(0, 4).map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => setSelectedEventModal(evt)}
                        className={`p-3.5 rounded-xl ${T.subcardBg} hover:border-indigo-500 cursor-pointer transition-all flex items-center justify-between group`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                evt.status === 'em_andamento'
                                  ? 'bg-emerald-400 animate-pulse'
                                  : evt.status === 'planejamento'
                                  ? 'bg-amber-400'
                                  : 'bg-slate-400'
                              }`}
                            />
                            <h4 className={`font-medium text-sm ${T.titleColor} group-hover:text-indigo-400 transition-colors`}>
                              {evt.name}
                            </h4>
                          </div>
                          <p className={`text-xs ${T.mutedText} flex items-center gap-3`}>
                            <span>{evt.client}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" /> {evt.location}
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${T.badgeNeutral}`}>
                            {evt.staffCount} staff
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Movimentações Recentes & Próximos Vencimentos */}
                <div className={`${T.cardBg} rounded-2xl p-5`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-semibold ${T.titleColor} text-sm flex items-center gap-2`}>
                      <DollarSign className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                      Vencimentos & Pagamentos Imediatos
                    </h3>
                    <button
                      onClick={() => setActiveTab('financeiro')}
                      className={`text-xs ${T.accentText} hover:underline flex items-center gap-1 font-medium`}
                    >
                      Abrir financeiro <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {transactions.slice(0, 4).map((tx) => (
                      <div
                        key={tx.id}
                        className={`p-3.5 rounded-xl ${T.subcardBg} flex items-center justify-between`}
                      >
                        <div className="space-y-0.5">
                          <p className={`font-medium text-sm ${T.titleColor}`}>{tx.description}</p>
                          <p className={`text-xs ${T.mutedText} flex items-center gap-2`}>
                            <span>{tx.reference}</span>
                            <span>•</span>
                            <span>Venc: {tx.dueDate}</span>
                            <span>•</span>
                            <span className="font-mono text-[11px]">{tx.category}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-semibold text-sm ${
                              tx.type === 'entrada' ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'
                            }`}
                          >
                            {tx.type === 'entrada' ? '+' : '-'}{' '}
                            {tx.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </div>
                          <button
                            onClick={() => toggleTransactionPaid(tx.id)}
                            className={`text-[11px] font-medium px-2 py-0.5 rounded-full mt-1 ${
                              tx.isPaid
                                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                                : 'bg-amber-500/20 text-amber-600 dark:text-amber-300 hover:bg-amber-500/30'
                            }`}
                          >
                            {tx.isPaid ? '✓ Liquidado' : 'Aguardando'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. EVENTOS & PROJETOS */}
          {/* ========================================================================= */}
          {activeTab === 'eventos' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Barra de Filtros */}
              <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${T.cardBg} p-4 rounded-2xl`}>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${T.mutedText} font-medium`}>Filtrar por Status:</span>
                  {(['todos', 'em_andamento', 'planejamento', 'concluido'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setEventFilter(st)}
                      className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-colors font-medium ${
                        eventFilter === st
                          ? 'bg-indigo-600 text-white'
                          : `${T.subcardBg} ${T.mutedText} hover:text-slate-900 dark:hover:text-slate-100`
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <div className={`text-xs ${T.mutedText}`}>
                  Exibindo{' '}
                  <strong className={T.titleColor}>
                    {events.filter((e) => eventFilter === 'todos' || e.status === eventFilter).length}
                  </strong>{' '}
                  eventos cadastrados
                </div>
              </div>

              {/* Grid de Cards de Eventos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {events
                  .filter((e) => eventFilter === 'todos' || e.status === eventFilter)
                  .map((evt) => {
                    const evtEntradas = transactions
                      .filter((t) => t.eventId === evt.id && t.type === 'entrada')
                      .reduce((acc, t) => acc + t.amount, 0);

                    const evtSaidas = transactions
                      .filter((t) => t.eventId === evt.id && t.type === 'saida')
                      .reduce((acc, t) => acc + t.amount, 0);

                    const margemBruta = evtEntradas > 0 ? ((evtEntradas - evtSaidas) / evtEntradas) * 100 : 0;
                    const evtNFs = invoices.filter((inv) => inv.eventId === evt.id);

                    return (
                      <div
                        key={evt.id}
                        className={`${T.cardBg} rounded-2xl p-5 hover:border-indigo-400 transition-all flex flex-col justify-between`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <span
                              className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                evt.status === 'em_andamento'
                                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                  : evt.status === 'planejamento'
                                  ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                  : 'bg-slate-500/20 text-slate-500 dark:text-slate-400'
                              }`}
                            >
                              {evt.status.replace('_', ' ')}
                            </span>
                            <span className={`text-xs ${T.mutedText} flex items-center gap-1 font-mono`}>
                              <Users className="w-3.5 h-3.5" /> {evt.staffCount} profissionais
                            </span>
                          </div>

                          <h3 className={`font-bold ${T.titleColor} text-base leading-snug`}>{evt.name}</h3>

                          <div className={`space-y-1.5 text-xs ${T.mutedText}`}>
                            <p className="flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-slate-400" />
                              <strong className={`${T.titleColor} font-medium`}>Cliente:</strong> {evt.client}
                            </p>
                            <p className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{evt.location}</span>
                            </p>
                            <p className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>{evt.startDate} até {evt.endDate} ({evt.time})</span>
                            </p>
                          </div>

                          {/* Balanço Financeiro do Evento */}
                          <div className={`pt-3 border-t ${T.divider} grid grid-cols-2 gap-2 text-xs`}>
                            <div className={`${T.subcardBg} p-2.5 rounded-xl`}>
                              <span className={`${T.mutedText} block text-[11px]`}>Faturamento</span>
                              <strong className="text-emerald-500 dark:text-emerald-400 font-semibold">
                                {evtEntradas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                              </strong>
                            </div>
                            <div className={`${T.subcardBg} p-2.5 rounded-xl`}>
                              <span className={`${T.mutedText} block text-[11px]`}>Custos Totais</span>
                              <strong className="text-rose-500 dark:text-rose-400 font-semibold">
                                {evtSaidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                              </strong>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs px-1">
                            <span className={T.mutedText}>Margem Operacional:</span>
                            <span className={`font-semibold ${margemBruta >= 25 ? 'text-emerald-500 dark:text-emerald-400' : 'text-amber-500 dark:text-amber-400'}`}>
                              {margemBruta.toFixed(1)}% ({(evtEntradas - evtSaidas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
                            </span>
                          </div>
                        </div>

                        <div className={`pt-4 mt-3 border-t ${T.divider} flex items-center justify-between`}>
                          <span className={`text-[11px] ${T.mutedText} font-mono`}>
                            {evtNFs.length > 0 ? `${evtNFs.length} NF(s) vinculada(s)` : 'Sem NF emitida'}
                          </span>
                          <button
                            onClick={() => setSelectedEventModal(evt)}
                            className={`text-xs ${T.subcardBg} hover:bg-indigo-600 hover:text-white px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1`}
                          >
                            <Eye className="w-3.5 h-3.5" /> Detalhes & Staff
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. CRONOGRAMA GANTT */}
          {/* ========================================================================= */}
          {activeTab === 'gantt' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className={`${T.cardBg} p-5 rounded-2xl`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className={`font-bold text-base ${T.titleColor} flex items-center gap-2`}>
                      <Clock className="w-4 h-4 text-indigo-400" />
                      Visualização de Sobreposição no Mês (Outubro 2026)
                    </h3>
                    <p className={`text-xs ${T.mutedText} mt-0.5`}>
                      Implementação pura em CSS Grid. Clique em qualquer dia para adicionar ou consultar observações diárias.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className={`flex items-center gap-1.5 ${T.mutedText}`}>
                      <span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Em andamento
                    </span>
                    <span className={`flex items-center gap-1.5 ${T.mutedText}`}>
                      <span className="w-3 h-3 rounded bg-amber-500 inline-block" /> Planejamento
                    </span>
                    <span className={`flex items-center gap-1.5 ${T.mutedText}`}>
                      <span className="w-3 h-3 rounded bg-slate-500 inline-block" /> Concluído
                    </span>
                  </div>
                </div>

                {/* Grade Horizontal Gantt (Dias 1 a 31) */}
                <div className={`overflow-x-auto rounded-xl p-3 ${T.subcardBg}`}>
                  <div className="min-w-[900px]">
                    {/* Linha dos dias */}
                    <div className={`grid grid-cols-31 gap-1 text-center text-[10px] font-mono ${T.mutedText} pb-2 border-b ${T.divider}`}>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                        const hasObs = observations.some(
                          (o) => o.date === `2026-10-${d.toString().padStart(2, '0')}`
                        );
                        const isToday = d === 13;
                        return (
                          <div
                            key={d}
                            onClick={() => {
                              const found = observations.find(
                                (o) => o.date === `2026-10-${d.toString().padStart(2, '0')}`
                              );
                              setSelectedDayObs({
                                day: d,
                                text: found ? found.text : '',
                              });
                            }}
                            className={`py-1 rounded cursor-pointer transition-all ${
                              isToday
                                ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-400'
                                : hasObs
                                ? 'bg-amber-500/20 text-amber-500 dark:text-amber-300 font-semibold'
                                : 'hover:bg-slate-500/10'
                            }`}
                            title={isToday ? 'Hoje (13 de Outubro)' : hasObs ? 'Possui anotação' : `Dia ${d}`}
                          >
                            {d}
                          </div>
                        );
                      })}
                    </div>

                    {/* Barras de Eventos */}
                    <div className="space-y-2.5 pt-3">
                      {events.map((evt) => {
                        const startDay = parseInt(evt.startDate.split('-')[2] || '1', 10);
                        const endDay = parseInt(evt.endDate.split('-')[2] || '31', 10);
                        const duration = Math.max(1, endDay - startDay + 1);

                        return (
                          <div key={evt.id} className="text-xs group">
                            <div className={`text-[11px] ${T.mutedText} mb-1 flex items-center justify-between`}>
                              <span className={`font-medium ${T.titleColor}`}>{evt.name}</span>
                              <span className="text-[10px]">
                                {evt.startDate} a {evt.endDate}
                              </span>
                            </div>
                            <div className={`grid grid-cols-31 gap-1 h-6 rounded p-0.5 relative ${
                              theme === 'soft-light' ? 'bg-slate-200/70' : 'bg-slate-900/60'
                            }`}>
                              <div
                                style={{
                                  gridColumnStart: Math.min(31, Math.max(1, startDay)),
                                  gridColumnEnd: `span ${Math.min(31, duration)}`,
                                }}
                                className={`rounded flex items-center px-2 text-[10px] font-semibold text-white truncate shadow-xs ${
                                  evt.status === 'em_andamento'
                                    ? 'bg-emerald-600'
                                    : evt.status === 'planejamento'
                                    ? 'bg-amber-600'
                                    : 'bg-slate-600'
                                }`}
                              >
                                {evt.client} ({evt.staffCount} staff)
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Anotações Diárias Recentes */}
                <div className={`mt-6 pt-5 border-t ${T.divider}`}>
                  <h4 className={`text-xs font-semibold ${T.titleColor} uppercase tracking-wider mb-3`}>
                    Anotações Operacionais do Mês (Daily Observations)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {observations.map((obs) => (
                      <div
                        key={obs.id}
                        className={`p-3 rounded-xl ${T.subcardBg} text-xs flex items-start gap-3`}
                      >
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono text-[10px] shrink-0 font-bold">
                          {obs.date}
                        </span>
                        <p className={`flex-1 ${T.mutedText}`}>{obs.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. ORÇAMENTOS & CRM */}
          {/* ========================================================================= */}
          {activeTab === 'orcamentos' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {(['Pendente', 'Aprovada', 'Recusada'] as const).map((colStatus) => {
                  const filteredQuotes = quotes.filter((q) => q.status === colStatus);
                  return (
                    <div key={colStatus} className={`${T.cardBg} rounded-2xl p-4 flex flex-col`}>
                      <div className={`flex items-center justify-between pb-3 mb-3 border-b ${T.divider}`}>
                        <h3 className={`font-semibold text-sm ${T.titleColor} flex items-center gap-2`}>
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              colStatus === 'Aprovada'
                                ? 'bg-emerald-400'
                                : colStatus === 'Pendente'
                                ? 'bg-amber-400'
                                : 'bg-rose-400'
                            }`}
                          />
                          {colStatus}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${T.badgeNeutral}`}>
                          {filteredQuotes.length}
                        </span>
                      </div>

                      <div className="space-y-3 flex-1 overflow-y-auto">
                        {filteredQuotes.map((q) => {
                          const calculatedPrice = calculateQuotePrice(q);
                          const directCost = q.items.reduce(
                            (acc, i) => acc + i.quantity * i.unitCost * i.days,
                            0
                          );

                          return (
                            <div
                              key={q.id}
                              className={`p-4 rounded-xl ${T.subcardBg} space-y-3`}
                            >
                              <div>
                                <h4 className={`font-bold text-sm ${T.titleColor}`}>{q.projectName}</h4>
                                <p className={`text-xs ${T.mutedText}`}>{q.clientName}</p>
                              </div>

                              {/* Memória de cálculo */}
                              <div className={`p-2.5 rounded-lg border text-[11px] space-y-1 ${
                                theme === 'soft-light' ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
                              }`}>
                                <div className="flex justify-between">
                                  <span className={T.mutedText}>Custo Direto:</span>
                                  <span>{directCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className={T.mutedText}>Overhead ({(q.overhead * 100).toFixed(0)}%):</span>
                                  <span>+{(directCost * q.overhead).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className={T.mutedText}>Margem Pretendida:</span>
                                  <span className="text-emerald-500 dark:text-emerald-400 font-medium">{(q.margin * 100).toFixed(0)}%</span>
                                </div>
                                <div className={`flex justify-between pt-1 border-t ${T.divider} font-bold text-xs`}>
                                  <span>Preço Calculado:</span>
                                  <span className={T.accentText}>
                                    {calculatedPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                  </span>
                                </div>
                              </div>

                              {q.status === 'Recusada' && (
                                <div className="p-2 rounded bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-500 dark:text-rose-300">
                                  <strong>Motivo:</strong> {q.rejectionReason} <br />
                                  <span className={T.mutedText}>{q.rejectionNotes}</span>
                                </div>
                              )}

                              {q.status === 'Pendente' && currentUser.role !== 'leitor' && (
                                <button
                                  onClick={() => handleConvertQuoteToEvent(q)}
                                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Aprovar e Converter em Evento
                                </button>
                              )}

                              {q.status === 'Aprovada' && (
                                <div className="flex items-center justify-between text-[11px] text-emerald-500 dark:text-emerald-400 font-medium pt-1">
                                  <span>✓ Convertido em Evento</span>
                                  {q.eventId && (
                                    <span className={`${T.mutedText} font-mono text-[10px]`}>ID: {q.eventId}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. FINANCEIRO (MOVIMENTAÇÕES) */}
          {/* ========================================================================= */}
          {activeTab === 'financeiro' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Filtros e Busca */}
              <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${T.cardBg} p-4 rounded-2xl`}>
                <div className="flex items-center gap-2 flex-wrap">
                  {(['todos', 'entrada', 'saida', 'pendente', 'pago'] as const).map((filtro) => (
                    <button
                      key={filtro}
                      onClick={() => setTxFilter(filtro)}
                      className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-colors font-medium ${
                        txFilter === filtro
                          ? 'bg-indigo-600 text-white'
                          : `${T.subcardBg} ${T.mutedText} hover:text-slate-900 dark:hover:text-slate-100`
                      }`}
                    >
                      {filtro === 'entrada' ? 'Receitas' : filtro === 'saida' ? 'Despesas' : filtro}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar por descrição, contato ou ID..."
                    value={txSearch}
                    onChange={(e) => setTxSearch(e.target.value)}
                    className={`w-full ${T.inputText} text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none`}
                  />
                </div>
              </div>

              {/* Tabela de Movimentações */}
              <div className={`${T.cardBg} rounded-2xl overflow-hidden shadow-sm`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className={`${T.tableHeader} uppercase text-[10px]`}>
                      <tr>
                        <th className="p-4">Tipo</th>
                        <th className="p-4">Descrição & Categoria</th>
                        <th className="p-4">Contato / Favorecido</th>
                        <th className="p-4">Evento Vinculado</th>
                        <th className="p-4">Vencimento</th>
                        <th className="p-4 text-right">Valor</th>
                        <th className="p-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${T.divider}`}>
                      {transactions
                        .filter((t) => {
                          if (txFilter === 'entrada') return t.type === 'entrada';
                          if (txFilter === 'saida') return t.type === 'saida';
                          if (txFilter === 'pendente') return !t.isPaid;
                          if (txFilter === 'pago') return t.isPaid;
                          return true;
                        })
                        .filter((t) => {
                          if (!txSearch) return true;
                          const s = txSearch.toLowerCase();
                          return (
                            t.description.toLowerCase().includes(s) ||
                            t.reference.toLowerCase().includes(s) ||
                            t.category.toLowerCase().includes(s)
                          );
                        })
                        .map((tx) => {
                          const linkedEvent = events.find((e) => e.id === tx.eventId);
                          return (
                            <tr key={tx.id} className={`${T.tableRowHover} transition-colors`}>
                              <td className="p-4">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    tx.type === 'entrada'
                                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                      : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                                  }`}
                                >
                                  {tx.type}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className={`font-medium ${T.titleColor}`}>{tx.description}</div>
                                <div className={`${T.mutedText} text-[11px] font-mono mt-0.5`}>{tx.category}</div>
                              </td>
                              <td className={`p-4 ${T.titleColor}`}>{tx.reference}</td>
                              <td className={`p-4 ${T.mutedText}`}>
                                {linkedEvent ? (
                                  <span className={`${T.accentText} font-medium hover:underline cursor-pointer`}>
                                    {linkedEvent.name}
                                  </span>
                                ) : (
                                  <span className="italic">Avulso (Custo Fixo)</span>
                                )}
                              </td>
                              <td className={`p-4 font-mono ${T.mutedText}`}>
                                {tx.dueDate}
                                {tx.paymentDate && (
                                  <span className="block text-[10px]">
                                    Pago: {tx.paymentDate}
                                  </span>
                                )}
                              </td>
                              <td className="p-4 text-right">
                                <span
                                  className={`font-semibold ${
                                    tx.type === 'entrada' ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'
                                  }`}
                                >
                                  {tx.type === 'entrada' ? '+' : '-'}{' '}
                                  {tx.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  onClick={() => toggleTransactionPaid(tx.id)}
                                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                                    tx.isPaid
                                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/30'
                                      : 'bg-amber-500/20 text-amber-600 dark:text-amber-300 hover:bg-amber-500/30'
                                  }`}
                                  title="Clique para alternar o status de liquidação"
                                >
                                  {tx.isPaid ? 'Pago' : 'Pendente'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 6. FLUXO DE CAIXA */}
          {/* ========================================================================= */}
          {activeTab === 'fluxo' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className={`${T.cardBg} rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                <div>
                  <h3 className={`font-bold ${T.titleColor} text-base`}>Projeção Relacional Dia a Dia (Outubro 2026)</h3>
                  <p className={`text-xs ${T.mutedText} mt-1`}>
                    Como documentado no README, você pode calibrar o <strong>Saldo Inicial Manual</strong> a qualquer momento
                    para reancorar a projeção a partir do saldo bancário verificado.
                  </p>
                </div>
                <div className={`flex items-center gap-3 ${T.subcardBg} p-2.5 rounded-xl border`}>
                  <span className={`text-xs ${T.mutedText} font-medium`}>Saldo Inicial:</span>
                  <input
                    type="number"
                    value={initialCashBalance}
                    onChange={(e) => setInitialCashBalance(parseFloat(e.target.value) || 0)}
                    className={`w-32 ${T.inputText} text-xs rounded-lg px-2 py-1 text-emerald-500 dark:text-emerald-400 font-semibold focus:outline-none`}
                  />
                </div>
              </div>

              {/* Matriz Diária (Dias 1 a 31) */}
              <div className={`${T.cardBg} rounded-2xl overflow-hidden shadow-sm`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-center border-collapse min-w-[1200px]">
                    <thead className={`${T.tableHeader} font-mono text-[11px]`}>
                      <tr>
                        <th className="p-3 text-left w-36 font-sans">Linha de Cálculo</th>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => (
                          <th
                            key={dia}
                            className={`p-2 border-r ${T.divider} ${
                              dia === 13 ? 'bg-indigo-600/30 text-indigo-400 font-bold' : ''
                            }`}
                          >
                            Dia {dia}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${T.divider} font-mono text-[11px]`}>
                      {/* Entradas */}
                      <tr className={`${theme === 'soft-light' ? 'bg-emerald-50/40' : 'bg-slate-900/60'}`}>
                        <td className="p-3 text-left font-sans font-medium text-emerald-500 dark:text-emerald-400">Entradas (+)</td>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => {
                          const dateStr = `2026-10-${dia.toString().padStart(2, '0')}`;
                          const dayEntradas = transactions
                            .filter((t) => t.type === 'entrada' && t.dueDate === dateStr)
                            .reduce((acc, t) => acc + t.amount, 0);

                          return (
                            <td key={dia} className={`p-2 border-r ${T.divider} text-emerald-500 dark:text-emerald-400`}>
                              {dayEntradas > 0 ? dayEntradas.toLocaleString('pt-BR', { maximumFractionDigits: 0 }) : '-'}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Saídas */}
                      <tr className={`${theme === 'soft-light' ? 'bg-rose-50/40' : 'bg-slate-900/40'}`}>
                        <td className="p-3 text-left font-sans font-medium text-rose-500 dark:text-rose-400">Saídas (-)</td>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => {
                          const dateStr = `2026-10-${dia.toString().padStart(2, '0')}`;
                          const daySaidas = transactions
                            .filter((t) => t.type === 'saida' && t.dueDate === dateStr)
                            .reduce((acc, t) => acc + t.amount, 0);

                          return (
                            <td key={dia} className={`p-2 border-r ${T.divider} text-rose-500 dark:text-rose-400`}>
                              {daySaidas > 0 ? daySaidas.toLocaleString('pt-BR', { maximumFractionDigits: 0 }) : '-'}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Saldo Acumulado */}
                      <tr className={`${theme === 'soft-light' ? 'bg-slate-100 font-bold' : 'bg-slate-950 font-bold'}`}>
                        <td className={`p-3 text-left font-sans ${T.accentText}`}>Saldo Acumulado</td>
                        {(() => {
                          let running = initialCashBalance;
                          return Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => {
                            const dateStr = `2026-10-${dia.toString().padStart(2, '0')}`;
                            const dayEntradas = transactions
                              .filter((t) => t.type === 'entrada' && t.dueDate === dateStr)
                              .reduce((acc, t) => acc + t.amount, 0);
                            const daySaidas = transactions
                              .filter((t) => t.type === 'saida' && t.dueDate === dateStr)
                              .reduce((acc, t) => acc + t.amount, 0);

                            running = running + dayEntradas - daySaidas;

                            return (
                              <td
                                key={dia}
                                className={`p-2 border-r ${T.divider} ${
                                  running >= 0 ? T.accentText : 'text-rose-500 dark:text-rose-400'
                                } ${dia === 13 ? 'bg-indigo-900/30' : ''}`}
                              >
                                {running.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                              </td>
                            );
                          });
                        })()}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 7. NOTAS FISCAIS */}
          {/* ========================================================================= */}
          {activeTab === 'notas' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className={`${T.cardBg} rounded-2xl p-5`}>
                <h3 className={`font-bold ${T.titleColor} text-sm mb-3`}>Tabela de Códigos de Serviço & Alíquotas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {INITIAL_SERVICE_CODES.map((sc) => (
                    <div key={sc.id} className={`p-3 rounded-xl ${T.subcardBg} text-xs space-y-1`}>
                      <div className="flex items-center justify-between">
                        <span className={`font-mono font-bold ${T.accentText}`}>Código {sc.code}</span>
                        <span className={`text-[10px] ${T.mutedText}`}>Retenção: {(sc.retentionRate * 100).toFixed(2)}%</span>
                      </div>
                      <p className={`text-[11px] leading-snug ${T.mutedText}`}>{sc.description}</p>
                      <div className={`text-[10px] ${T.mutedText} pt-1`}>
                        Imposto Total Estimado: <strong className={T.titleColor}>{(sc.totalTaxRate * 100).toFixed(2)}%</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Listagem de NFs */}
              <div className={`${T.cardBg} rounded-2xl overflow-hidden shadow-sm`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className={`${T.tableHeader} uppercase text-[10px]`}>
                      <tr>
                        <th className="p-4">Número NF</th>
                        <th className="p-4">Evento Vinculado</th>
                        <th className="p-4">Código Serviço</th>
                        <th className="p-4 text-right">Valor Bruto</th>
                        <th className="p-4 text-right">Retenção na Fonte</th>
                        <th className="p-4 text-right">Líquido Recebido</th>
                        <th className="p-4 text-right">Líquido Pós-Impostos</th>
                        <th className="p-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${T.divider} font-mono`}>
                      {invoices.map((inv) => {
                        const linkedEvent = events.find((e) => e.id === inv.eventId);
                        const sc = INITIAL_SERVICE_CODES.find((c) => c.code === inv.serviceCode) || INITIAL_SERVICE_CODES[0];
                        const retencao = inv.amount * sc.retentionRate;
                        const liquidoRecebido = inv.amount * (1 - sc.retentionRate);
                        const liquidoPosImposto = inv.amount * (1 - sc.totalTaxRate);

                        return (
                          <tr key={inv.id} className={`${T.tableRowHover} transition-colors`}>
                            <td className={`p-4 font-bold ${T.titleColor} font-mono`}>NF #{inv.number}</td>
                            <td className={`p-4 ${T.mutedText} font-sans`}>{linkedEvent?.name || 'Evento Desconhecido'}</td>
                            <td className={`p-4 ${T.mutedText} font-mono`}>{inv.serviceCode}</td>
                            <td className={`p-4 text-right font-bold ${T.titleColor}`}>
                              {inv.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                            <td className="p-4 text-right text-rose-500 dark:text-rose-400">
                              - {retencao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                            <td className="p-4 text-right text-emerald-500 dark:text-emerald-400 font-semibold">
                              {liquidoRecebido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                            <td className={`p-4 text-right ${T.accentText}`}>
                              {liquidoPosImposto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                            <td className="p-4 text-center">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-sans ${
                                  inv.status === 'paga'
                                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                }`}
                              >
                                {inv.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 8. CONTATOS & FREELANCERS */}
          {/* ========================================================================= */}
          {activeTab === 'contatos' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${T.cardBg} p-4 rounded-2xl`}>
                <div className="flex items-center gap-2">
                  {(['todos', 'cliente', 'freelancer', 'fornecedor'] as const).map((tipo) => (
                    <button
                      key={tipo}
                      onClick={() => setContactFilter(tipo)}
                      className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-colors font-medium ${
                        contactFilter === tipo
                          ? 'bg-indigo-600 text-white'
                          : `${T.subcardBg} ${T.mutedText} hover:text-slate-900 dark:hover:text-slate-100`
                      }`}
                    >
                      {tipo}s
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar contato por nome, CPF ou chave Pix..."
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    className={`w-full ${T.inputText} text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none`}
                  />
                </div>
              </div>

              {/* Grid de Cards de Contatos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {contacts
                  .filter((c) => contactFilter === 'todos' || c.type === contactFilter)
                  .filter((c) => {
                    if (!contactSearch) return true;
                    const s = contactSearch.toLowerCase();
                    return (
                      c.name.toLowerCase().includes(s) ||
                      c.roleOrCategory.toLowerCase().includes(s) ||
                      (c.cpf && c.cpf.includes(s)) ||
                      (c.pix && c.pix.toLowerCase().includes(s))
                    );
                  })
                  .map((c) => (
                    <div
                      key={c.id}
                      className={`${T.cardBg} rounded-2xl p-5 hover:border-indigo-400 transition-all flex flex-col justify-between space-y-4`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className={`font-bold ${T.titleColor} text-base leading-snug`}>{c.name}</h3>
                            <span className={`text-xs ${T.accentText} font-medium`}>{c.roleOrCategory}</span>
                          </div>
                          <span
                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                              c.type === 'cliente'
                                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-300'
                                : c.type === 'freelancer'
                                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                                : 'bg-purple-500/20 text-purple-600 dark:text-purple-300'
                            }`}
                          >
                            {c.type}
                          </span>
                        </div>

                        <div className={`text-xs ${T.mutedText} space-y-1 pt-1`}>
                          <p className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-slate-400" /> {c.phone}
                          </p>
                          <p className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-slate-400" /> {c.email}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {c.city} - {c.state}
                          </p>
                          {c.cpf && (
                            <p className="text-[11px] font-mono">
                              CPF: {c.cpf} {c.rg && `· RG: ${c.rg}`}
                            </p>
                          )}
                          {c.cnpj && <p className="text-[11px] font-mono">CNPJ: {c.cnpj}</p>}
                        </div>

                        {/* Dados Bancários & Pix */}
                        {c.pix && (
                          <div className={`${T.subcardBg} p-2.5 rounded-xl text-[11px] space-y-1`}>
                            <div className={`flex items-center justify-between ${T.mutedText}`}>
                              <span>Chave Pix ({c.pixType}):</span>
                              <button
                                onClick={() => handleCopyPix(c.pix!, c.id)}
                                className={`${T.accentText} hover:underline flex items-center gap-1 font-medium transition-colors`}
                              >
                                {copiedPixId === c.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" /> Copiado!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" /> Copiar
                                  </>
                                )}
                              </button>
                            </div>
                            <div className={`font-mono ${T.titleColor} truncate`}>{c.pix}</div>
                            {c.bank && (
                              <div className={`text-[10px] ${T.mutedText} pt-0.5 border-t ${T.divider}`}>
                                {c.bank} · Ag: {c.agency} · Conta: {c.accountNumber} ({c.accountType})
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {c.rating && (
                        <div className={`pt-2 border-t ${T.divider} flex items-center justify-between text-xs ${T.mutedText}`}>
                          <span>Avaliação de Desempenho:</span>
                          <span className="text-amber-500 dark:text-amber-400 font-semibold flex items-center gap-1">
                            ★ {c.rating.toFixed(1)} / 5.0
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 9. RELATÓRIOS */}
          {/* ========================================================================= */}
          {activeTab === 'relatorios' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lucro Mensal por Evento */}
                <div className={`${T.cardBg} rounded-2xl p-5`}>
                  <h3 className={`font-bold ${T.titleColor} text-sm mb-3`}>Margem e Lucro por Evento (Outubro 2026)</h3>
                  <div className="space-y-3">
                    {events.map((evt) => {
                      const entradas = transactions
                        .filter((t) => t.eventId === evt.id && t.type === 'entrada')
                        .reduce((acc, t) => acc + t.amount, 0);
                      const saidas = transactions
                        .filter((t) => t.eventId === evt.id && t.type === 'saida')
                        .reduce((acc, t) => acc + t.amount, 0);
                      const lucro = entradas - saidas;
                      const margem = entradas > 0 ? (lucro / entradas) * 100 : 0;

                      return (
                        <div key={evt.id} className={`p-3 ${T.subcardBg} rounded-xl text-xs space-y-1`}>
                          <div className="flex justify-between items-center">
                            <span className={`font-medium ${T.titleColor}`}>{evt.name}</span>
                            <span className={`font-bold ${lucro >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                              {lucro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                          </div>
                          <div className={`flex justify-between ${T.mutedText} text-[11px]`}>
                            <span>Receita: {entradas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            <span>Margem: {margem.toFixed(1)}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Previsão de Liquidez */}
                <div className={`${T.cardBg} rounded-2xl p-5 space-y-4`}>
                  <h3 className={`font-bold ${T.titleColor} text-sm`}>Previsão de Liquidez Acumulada</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className={`p-3 ${T.subcardBg} rounded-xl text-center`}>
                      <span className={`text-[11px] ${T.mutedText} block`}>30 Dias</span>
                      <strong className="text-sm text-emerald-500 dark:text-emerald-400 font-bold">R$ 112.400</strong>
                    </div>
                    <div className={`p-3 ${T.subcardBg} rounded-xl text-center`}>
                      <span className={`text-[11px] ${T.mutedText} block`}>60 Dias</span>
                      <strong className="text-sm text-emerald-500 dark:text-emerald-400 font-bold">R$ 189.600</strong>
                    </div>
                    <div className={`p-3 ${T.subcardBg} rounded-xl text-center`}>
                      <span className={`text-[11px] ${T.mutedText} block`}>90 Dias</span>
                      <strong className="text-sm text-emerald-500 dark:text-emerald-400 font-bold">R$ 264.200</strong>
                    </div>
                  </div>

                  <div className={`pt-3 border-t ${T.divider} text-xs ${T.mutedText} space-y-2`}>
                    <p>
                      O sistema calcula os fluxos futuros a partir dos parcelamentos aprovados em contratos comerciais
                      e retenções previsíveis de tributos.
                    </p>
                    <button
                      onClick={handleExportCSV}
                      className={`w-full py-2.5 rounded-xl ${T.accentBtn} font-medium text-xs transition-colors flex items-center justify-center gap-2`}
                    >
                      <Download className="w-4 h-4" /> Baixar Dados Consolidados (CSV)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 10. USUÁRIOS, RBAC & SELETOR DE TEMAS */}
          {/* ========================================================================= */}
          {activeTab === 'usuarios' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* NOVA SEÇÃO: SELETOR DE TEMA DO SISTEMA */}
              <div className={`${T.cardBg} rounded-2xl p-5 space-y-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-bold ${T.titleColor} text-base flex items-center gap-2`}>
                      <Palette className="w-5 h-5 text-indigo-500" />
                      Personalização Visual & Temas de Cores do Sistema
                    </h3>
                    <p className={`text-xs ${T.mutedText} mt-1`}>
                      Alterne a paleta de cores global para adaptar o ERP ao ambiente de visualização e capturar os prints desejados para o portfólio.
                    </p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-mono font-medium ${T.badgeNeutral}`}>
                    Tema Atual: <strong className={T.accentText}>{
                      theme === 'dark' ? 'Padrão Escuro' : theme === 'soft-light' ? 'Claro Suave' : 'Alto Contraste'
                    }</strong>
                  </span>
                </div>

                {/* Grid dos 3 Temas Solicitados */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {/* 1. Tema Padrão Escuro */}
                  <div
                    onClick={() => {
                      setTheme('dark');
                      showToast('Tema Padrão Noturno ativado!');
                    }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border-2 relative flex flex-col justify-between ${
                      theme === 'dark'
                        ? 'border-indigo-500 bg-slate-900 shadow-md ring-2 ring-indigo-500/30'
                        : `${T.subcardBg} hover:border-slate-500`
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-700 flex items-center justify-center text-indigo-400">
                            <Moon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-white">Escuro Padrão</h4>
                            <span className="text-[10px] text-slate-400 font-mono">Dark Slate Navy</span>
                          </div>
                        </div>
                        {theme === 'dark' && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[10px]">
                            ✓ Ativo
                          </span>
                        )}
                      </div>

                      {/* Paleta Swatch */}
                      <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-950 border border-slate-800">
                        <div className="w-5 h-5 rounded-md bg-slate-950 border border-slate-800" title="Fundo #020617" />
                        <div className="w-5 h-5 rounded-md bg-slate-900 border border-slate-700" title="Superfície #0f172a" />
                        <div className="w-5 h-5 rounded-md bg-indigo-600" title="Acento Índigo" />
                        <div className="w-5 h-5 rounded-md bg-emerald-500" title="Positivo" />
                        <span className="text-[11px] text-slate-400 font-mono ml-auto">Slate</span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        Azul escuro e ardósia balanceados com acentos em índigo. Conforto total para ambientes com pouca luz e longas jornadas operacionais.
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`w-full mt-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        theme === 'dark'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {theme === 'dark' ? 'Tema Selecionado' : 'Ativar Tema Escuro'}
                    </button>
                  </div>

                  {/* 2. Tema Claro Suave (Soft Warm Light - Menos agressivo) */}
                  <div
                    onClick={() => {
                      setTheme('soft-light');
                      showToast('Tema Claro Suave ativado!');
                    }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border-2 relative flex flex-col justify-between ${
                      theme === 'soft-light'
                        ? 'border-indigo-600 bg-white shadow-md ring-2 ring-indigo-500/30'
                        : `${T.subcardBg} hover:border-slate-400`
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-[#f0f2f5] border border-slate-300 flex items-center justify-center text-amber-500">
                            <Sun className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900">Claro Suave</h4>
                            <span className="text-[10px] text-slate-500 font-mono">Soft Warm Stone</span>
                          </div>
                        </div>
                        {theme === 'soft-light' && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[10px]">
                            ✓ Ativo
                          </span>
                        )}
                      </div>

                      {/* Paleta Swatch */}
                      <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-100 border border-slate-200">
                        <div className="w-5 h-5 rounded-md bg-[#f4f5f7] border border-slate-300" title="Fundo Off-White #f4f5f7" />
                        <div className="w-5 h-5 rounded-md bg-white border border-slate-300" title="Superfície Branca #ffffff" />
                        <div className="w-5 h-5 rounded-md bg-indigo-600" title="Acento Azul Royal" />
                        <div className="w-5 h-5 rounded-md bg-emerald-600" title="Positivo" />
                        <span className="text-[11px] text-slate-500 font-mono ml-auto">Soft</span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong>Não é full-white agressivo</strong>: fundo em linho/cinza suave (#f4f5f7) com elementos em branco puro e alto contraste de texto. Perfeito para prints corporativos e apresentações diurnas.
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`w-full mt-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        theme === 'soft-light'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                      }`}
                    >
                      {theme === 'soft-light' ? 'Tema Selecionado' : 'Ativar Claro Suave'}
                    </button>
                  </div>

                  {/* 3. Tema Alto Contraste (Cyber OLED Focus) */}
                  <div
                    onClick={() => {
                      setTheme('high-contrast');
                      showToast('Tema Alto Contraste ativado!');
                    }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border-2 relative flex flex-col justify-between ${
                      theme === 'high-contrast'
                        ? 'border-yellow-400 bg-black shadow-none ring-2 ring-yellow-400/50'
                        : `${T.subcardBg} hover:border-yellow-400/50`
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-black border-2 border-yellow-400 flex items-center justify-center text-yellow-400">
                            <Contrast className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-sm text-yellow-300">Alto Contraste</h4>
                            <span className="text-[10px] text-zinc-400 font-mono">Cyber OLED Focus</span>
                          </div>
                        </div>
                        {theme === 'high-contrast' && (
                          <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-black font-extrabold text-[10px]">
                            ✓ Ativo
                          </span>
                        )}
                      </div>

                      {/* Paleta Swatch */}
                      <div className="flex items-center gap-1.5 p-2 rounded-lg bg-black border border-zinc-700">
                        <div className="w-5 h-5 rounded-md bg-black border border-zinc-600" title="Preto Puro #000000" />
                        <div className="w-5 h-5 rounded-md bg-zinc-900 border border-zinc-700" title="Superfície #18181b" />
                        <div className="w-5 h-5 rounded-md bg-yellow-400" title="Acento Amarelo Neon" />
                        <div className="w-5 h-5 rounded-md bg-cyan-400" title="Ciano" />
                        <span className="text-[11px] text-yellow-300 font-mono font-bold ml-auto">OLED</span>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                        <strong>Foco e destaque extremo</strong>: fundo preto absoluto (#000000), bordas demarcadas e tipografia com realce amarelo e branco. Ideal para projetores, conferências e fotos de tela.
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`w-full mt-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                        theme === 'high-contrast'
                          ? 'bg-yellow-400 text-black'
                          : 'bg-zinc-800 text-yellow-300 hover:bg-zinc-700'
                      }`}
                    >
                      {theme === 'high-contrast' ? 'Tema Selecionado' : 'Ativar Alto Contraste'}
                    </button>
                  </div>
                </div>
              </div>

              {/* SEÇÃO DE PERFIS E RBAC */}
              <div className={`${T.cardBg} rounded-2xl p-5`}>
                <h3 className={`font-bold ${T.titleColor} text-base mb-1`}>Controle de Acesso Baseado em Papéis (RBAC)</h3>
                <p className={`text-xs ${T.mutedText} mb-5`}>
                  Proteção dupla implementada: no frontend (ocultação de ações restritas) e no backend com middleware HTTP 403.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className={`p-4 rounded-xl ${T.subcardBg} text-xs space-y-1.5`}>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold uppercase text-[10px]">
                      admin
                    </span>
                    <h4 className={`font-semibold ${T.titleColor}`}>Diretoria Executiva</h4>
                    <p className={`${T.mutedText} text-[11px]`}>
                      Acesso integral: leitura, criação, edição e exclusão em todos os módulos e gestão de usuários.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl ${T.subcardBg} text-xs space-y-1.5`}>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase text-[10px]">
                      operador
                    </span>
                    <h4 className={`font-semibold ${T.titleColor}`}>Equipe Técnica / Operações</h4>
                    <p className={`${T.mutedText} text-[11px]`}>
                      Permissão completa de lançamentos operacionais: eventos, contas a pagar/receber, NFs e contatos.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl ${T.subcardBg} text-xs space-y-1.5`}>
                    <span className="px-2 py-0.5 rounded bg-slate-500/20 text-slate-400 font-bold uppercase text-[10px]">
                      leitor
                    </span>
                    <h4 className={`font-semibold ${T.titleColor}`}>Auditor Externo</h4>
                    <p className={`${T.mutedText} text-[11px]`}>
                      Somente leitura. Acesso visual aos dashboards e relatórios para acompanhamento sem permissão de gravação.
                    </p>
                  </div>
                </div>

                {/* Tabela de Usuários */}
                <div className={`border ${T.divider} rounded-xl overflow-hidden`}>
                  <table className="w-full text-left text-xs">
                    <thead className={`${T.tableHeader} text-[10px] uppercase font-semibold`}>
                      <tr>
                        <th className="p-3">Nome</th>
                        <th className="p-3">Usuário</th>
                        <th className="p-3">E-mail</th>
                        <th className="p-3">Papel</th>
                        <th className="p-3 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${T.divider}`}>
                      {users.map((u) => (
                        <tr key={u.id} className={`${T.tableRowHover}`}>
                          <td className={`p-3 font-medium ${T.titleColor}`}>{u.name}</td>
                          <td className={`p-3 font-mono ${T.mutedText}`}>{u.username}</td>
                          <td className={`p-3 ${T.mutedText}`}>{u.email}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded font-mono text-[11px] ${T.badgeNeutral}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                setCurrentUser(u);
                                showToast(`Alternado para perfil: ${u.name}`);
                              }}
                              className={`${T.accentText} hover:underline font-medium`}
                            >
                              Simular Login
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: DETALHES DO EVENTO */}
      {/* ========================================================================= */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className={`${T.cardBg} rounded-2xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[11px] font-semibold uppercase tracking-wider ${T.accentText}`}>
                  Painel do Evento
                </span>
                <h3 className={`text-lg font-bold ${T.titleColor}`}>{selectedEventModal.name}</h3>
                <p className={`text-xs ${T.mutedText}`}>{selectedEventModal.client}</p>
              </div>
              <button
                onClick={() => setSelectedEventModal(null)}
                className={`text-slate-400 hover:${T.titleColor} text-sm p-1 rounded-lg hover:bg-slate-500/20`}
              >
                ✕
              </button>
            </div>

            <div className={`grid grid-cols-2 gap-3 text-xs ${T.subcardBg} p-3.5 rounded-xl`}>
              <div>
                <span className={`${T.mutedText} block text-[11px]`}>Localização:</span>
                <span className={T.titleColor}>{selectedEventModal.location}</span>
              </div>
              <div>
                <span className={`${T.mutedText} block text-[11px]`}>Período & Horário:</span>
                <span className={T.titleColor}>
                  {selectedEventModal.startDate} até {selectedEventModal.endDate} ({selectedEventModal.time})
                </span>
              </div>
            </div>

            {/* Balanço e Entradas/Saídas Vinculadas */}
            <div className="space-y-3">
              <h4 className={`text-xs font-semibold ${T.titleColor} uppercase tracking-wider`}>
                Lançamentos Financeiros Vinculados
              </h4>
              <div className="space-y-2">
                {transactions
                  .filter((t) => t.eventId === selectedEventModal.id)
                  .map((t) => (
                    <div
                      key={t.id}
                      className={`p-2.5 rounded-lg ${T.subcardBg} flex items-center justify-between text-xs`}
                    >
                      <div>
                        <span className={`font-medium ${T.titleColor}`}>{t.description}</span>
                        <span className={`block text-[10px] ${T.mutedText}`}>{t.reference} · Venc: {t.dueDate}</span>
                      </div>
                      <span className={`font-semibold ${t.type === 'entrada' ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                        {t.type === 'entrada' ? '+' : '-'} {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className={`flex justify-end pt-3 border-t ${T.divider}`}>
              <button
                onClick={() => setSelectedEventModal(null)}
                className={`px-4 py-2 rounded-xl ${T.subcardBg} hover:bg-slate-500/20 text-xs font-medium`}
              >
                Fechar Painel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: NOVO EVENTO */}
      {/* ========================================================================= */}
      {showNewEventModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${T.cardBg} rounded-2xl max-w-lg w-full p-6 space-y-4`}>
            <h3 className={`font-bold text-base ${T.titleColor}`}>Cadastrar Novo Evento</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const fd = new FormData(form);
                const newEvt: EventItem = {
                  id: `evt-${Date.now()}`,
                  name: String(fd.get('name')),
                  client: String(fd.get('client')),
                  startDate: String(fd.get('startDate')),
                  endDate: String(fd.get('endDate')),
                  location: String(fd.get('location')),
                  time: String(fd.get('time')),
                  status: 'planejamento',
                  staffCount: Number(fd.get('staffCount')) || 10,
                };
                setEvents((prev) => [newEvt, ...prev]);
                setShowNewEventModal(false);
                showToast(`Evento "${newEvt.name}" criado com sucesso!`);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className={`${T.mutedText} block mb-1`}>Nome do Evento</label>
                <input
                  name="name"
                  required
                  defaultValue="Festival Brasil Game Show 2026 - Staff Recepção"
                  className={`w-full ${T.inputText} rounded-lg p-2`}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`${T.mutedText} block mb-1`}>Cliente Contratante</label>
                  <input
                    name="client"
                    required
                    defaultValue="Warner Bros Discovery Brasil"
                    className={`w-full ${T.inputText} rounded-lg p-2`}
                  />
                </div>
                <div>
                  <label className={`${T.mutedText} block mb-1`}>Quantidade Staff</label>
                  <input
                    name="staffCount"
                    type="number"
                    defaultValue="25"
                    className={`w-full ${T.inputText} rounded-lg p-2`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`${T.mutedText} block mb-1`}>Data Início</label>
                  <input
                    name="startDate"
                    type="date"
                    defaultValue="2026-10-25"
                    className={`w-full ${T.inputText} rounded-lg p-2`}
                  />
                </div>
                <div>
                  <label className={`${T.mutedText} block mb-1`}>Data Término</label>
                  <input
                    name="endDate"
                    type="date"
                    defaultValue="2026-10-29"
                    className={`w-full ${T.inputText} rounded-lg p-2`}
                  />
                </div>
              </div>
              <div>
                <label className={`${T.mutedText} block mb-1`}>Local</label>
                <input
                  name="location"
                  defaultValue="Expo Center Norte, São Paulo - SP"
                  className={`w-full ${T.inputText} rounded-lg p-2`}
                />
              </div>
              <div>
                <label className={`${T.mutedText} block mb-1`}>Horário</label>
                <input
                  name="time"
                  defaultValue="08:00 às 20:00"
                  className={`w-full ${T.inputText} rounded-lg p-2`}
                />
              </div>

              <div className={`flex justify-end gap-2 pt-3 border-t ${T.divider}`}>
                <button
                  type="button"
                  onClick={() => setShowNewEventModal(false)}
                  className={`px-3 py-1.5 rounded-lg ${T.subcardBg} ${T.mutedText}`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-1.5 rounded-lg ${T.accentBtn} font-medium`}
                >
                  Salvar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: NOVA MOVIMENTAÇÃO */}
      {/* ========================================================================= */}
      {showNewTxModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${T.cardBg} rounded-2xl max-w-lg w-full p-6 space-y-4`}>
            <h3 className={`font-bold text-base ${T.titleColor}`}>Lançar Movimentação Financeira</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const fd = new FormData(form);
                const newTx: Transaction = {
                  id: `tx-${Date.now()}`,
                  description: String(fd.get('description')),
                  reference: String(fd.get('reference')),
                  amount: parseFloat(String(fd.get('amount'))) || 1000,
                  type: fd.get('type') as 'entrada' | 'saida',
                  isPaid: false,
                  dueDate: String(fd.get('dueDate')),
                  category: fd.get('category') as any,
                  eventId: (fd.get('eventId') as string) || undefined,
                };
                setTransactions((prev) => [newTx, ...prev]);
                setShowNewTxModal(false);
                showToast(`Lançamento de ${newTx.type} registrado!`);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className={`${T.mutedText} block mb-1`}>Descrição</label>
                <input
                  name="description"
                  required
                  defaultValue="Pagamento Staff Recepcionistas - Turno Noturno"
                  className={`w-full ${T.inputText} rounded-lg p-2`}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`${T.mutedText} block mb-1`}>Tipo</label>
                  <select name="type" className={`w-full ${T.inputText} rounded-lg p-2`}>
                    <option value="saida">Saída (Despesa / Cachê)</option>
                    <option value="entrada">Entrada (Receita Cliente)</option>
                  </select>
                </div>
                <div>
                  <label className={`${T.mutedText} block mb-1`}>Valor (R$)</label>
                  <input
                    name="amount"
                    type="number"
                    step="0.01"
                    defaultValue="3450.00"
                    className={`w-full ${T.inputText} rounded-lg p-2`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`${T.mutedText} block mb-1`}>Contato / Favorecido</label>
                  <input
                    name="reference"
                    defaultValue="Camila Rocha Silveira"
                    className={`w-full ${T.inputText} rounded-lg p-2`}
                  />
                </div>
                <div>
                  <label className={`${T.mutedText} block mb-1`}>Data de Vencimento</label>
                  <input
                    name="dueDate"
                    type="date"
                    defaultValue="2026-10-22"
                    className={`w-full ${T.inputText} rounded-lg p-2`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`${T.mutedText} block mb-1`}>Categoria</label>
                  <select name="category" className={`w-full ${T.inputText} rounded-lg p-2`}>
                    <option value="Cachê Staff">Cachê Staff</option>
                    <option value="Faturamento Cliente">Faturamento Cliente</option>
                    <option value="Catering & Alim.">Catering & Alim.</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Uniformes & EPI">Uniformes & EPI</option>
                    <option value="Custos Fixos">Custos Fixos</option>
                    <option value="Impostos">Impostos</option>
                  </select>
                </div>
                <div>
                  <label className={`${T.mutedText} block mb-1`}>Vincular a Evento</label>
                  <select name="eventId" className={`w-full ${T.inputText} rounded-lg p-2`}>
                    <option value="">Nenhum (Custo Avulso)</option>
                    {events.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={`flex justify-end gap-2 pt-3 border-t ${T.divider}`}>
                <button
                  type="button"
                  onClick={() => setShowNewTxModal(false)}
                  className={`px-3 py-1.5 rounded-lg ${T.subcardBg} ${T.mutedText}`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-1.5 rounded-lg ${T.accentBtn} font-medium`}
                >
                  Salvar Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: OBSERVAÇÃO DO DIA (GANTT) */}
      {/* ========================================================================= */}
      {selectedDayObs && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${T.cardBg} rounded-2xl max-w-md w-full p-6 space-y-4`}>
            <h3 className={`font-bold text-base ${T.titleColor}`}>
              Anotação do Dia {selectedDayObs.day} de Outubro de 2026
            </h3>
            <textarea
              rows={4}
              value={selectedDayObs.text}
              onChange={(e) => setSelectedDayObs({ ...selectedDayObs, text: e.target.value })}
              placeholder="Digite observações operacionais sobre staff, briefing ou transporte deste dia..."
              className={`w-full ${T.inputText} rounded-xl p-3 text-xs focus:outline-none`}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedDayObs(null)}
                className={`px-3 py-1.5 rounded-lg ${T.subcardBg} ${T.mutedText} text-xs`}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const dateStr = `2026-10-${selectedDayObs.day.toString().padStart(2, '0')}`;
                  setObservations((prev) => {
                    const filtered = prev.filter((o) => o.date !== dateStr);
                    if (selectedDayObs.text.trim()) {
                      return [...filtered, { id: `obs-${Date.now()}`, date: dateStr, text: selectedDayObs.text.trim() }];
                    }
                    return filtered;
                  });
                  setSelectedDayObs(null);
                  showToast('Anotação diária salva no cronograma!');
                }}
                className={`px-4 py-1.5 rounded-lg ${T.accentBtn} text-xs font-medium`}
              >
                Salvar Anotação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
