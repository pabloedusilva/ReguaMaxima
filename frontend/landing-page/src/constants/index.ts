export const WA_NUMBER = '5531985079718';

export const WA_MESSAGES = {
  interest: 'Olá! Tenho interesse em saber mais sobre o aplicativo Régua Máxima Agendamentos e os planos disponíveis. Pode me enviar mais detalhes?',
  monthly: 'Olá! Tenho interesse em assinar o Plano Mensal do Régua Máxima Agendamentos. Pode me enviar os próximos passos para concluir a assinatura?',
  trimestral: 'Olá! Quero assinar o Plano Trimestral do Régua Máxima Agendamentos. Pode me informar como finalizar a assinatura?',
  pricing: 'Olá! Estou na página de preços e tenho dúvidas sobre os planos. Pode me ajudar a escolher o melhor plano para minha barbearia?',
  anual: 'Olá! Quero assinar o Plano Anual do Régua Máxima Agendamentos. Pode me informar como finalizar a assinatura?',
} as const;

export const NAV_LINKS = [
  { href: '#home', label: 'Início' },
  { href: '#features', label: 'Recursos' },
  { href: '#cliente', label: 'Cliente' },
  { href: '#barber', label: 'Barbeiro' },
  { href: '#planos', label: 'Planos' },
  { href: '#contato', label: 'Contato' },
];

export const FEATURES_DATA = [
  {
    title: 'Agendamentos rápidos',
    description: 'Escolha serviços, profissionais e horários em poucos toques.',
    icon: 'calendar',
  },
  {
    title: 'Lembretes inteligentes',
    description: 'Notificações para não perder nenhum horário.',
    icon: 'bell',
  },
  {
    title: 'Personalização',
    description: 'Ajuste temas, preferências e fluxo do app ao seu estilo.',
    icon: 'palette',
  },
  {
    title: 'Suporte 24h',
    description: 'Atendimento exclusivo via WhatsApp 24/7 para sua barbearia nunca parar.',
    icon: 'headphones',
  },
  {
    title: 'Sem anúncios',
    description: 'Experiência limpa sem propagandas ou interrupções.',
    icon: 'eyeOff',
  },
  {
    title: 'Sem burocracia',
    description: 'Configuração rápida e fácil — comece a usar em minutos.',
    icon: 'zap',
  },
  {
    title: 'Planos mensais',
    description: 'Sem anuidade ou contrato longo — cancele quando quiser.',
    icon: 'creditCard',
  },
  {
    title: 'Melhor preço',
    description: 'O valor mais competitivo do mercado para barbearias.',
    icon: 'star',
  },
];

export const CLIENT_DASHBOARD_DATA = [
  {
    title: 'Agendamentos',
    description: 'Agende, cancele ou reagende em poucos toques.',
    items: [
      'Escolha serviço e profissional',
      'Veja horários disponíveis',
      'Cancele ou reagende facilmente',
    ],
  },
  {
    title: 'Notificações',
    description: 'Receba lembretes e confirmações automáticas.',
    items: [
      'Alertas antes do horário',
      'Confirmação do agendamento',
      'Avisos de alterações',
    ],
  },
  {
    title: 'Histórico',
    description: 'Visualize todos os seus agendamentos passados.',
    items: [
      'Histórico completo',
      'Detalhes dos serviços',
      'Profissionais atendidos',
    ],
  },
  {
    title: 'Praticidade',
    description: 'Interface intuitiva que qualquer um consegue usar.',
    items: [
      'Experiência única e simples',
      'Sem complicação ou burocracia',
      'Agendamento em segundos',
    ],
  },
];

export const BARBER_DASHBOARD_DATA = [
  {
    title: 'Agenda do Dia',
    description: 'Veja horários, serviços e clientes rapidamente.',
    items: [
      'Visão diária/semana moderna',
      'Arraste para reagendar',
      'Filtros por serviço e profissional',
    ],
  },
  {
    title: 'Mensagens',
    description: 'Converse com clientes e confirme agendamentos.',
    items: [
      'Respostas rápidas',
      'Confirmação automática',
      'Alertas de não comparecimento',
    ],
  },
  {
    title: 'Estatísticas',
    description: 'Ganhos, avaliações e métricas essenciais.',
    items: [
      'Faturamento por período',
      'Taxa de ocupação',
      'Top serviços e horários',
    ],
  },
  {
    title: 'Serviços',
    description: 'Gerencie preços e duração dos serviços.',
    items: [
      'Preços dinâmicos',
      'Tempos de execução',
      'Pacotes e combos',
    ],
  },
];

export const CHAT_BUBBLES = [
  {
    id: 1,
    text: 'Esse dia não dá. Tem outro?',
    type: 'in' as const,
    size: 'sm' as const,
    position: { top: '2%', left: '50%', transform: 'translateX(-50%)' },
    delay: 0.2,
  },
  {
    id: 2,
    text: 'Que dia que tem horário aí?',
    type: 'out' as const,
    size: 'md' as const,
    position: { top: '18%', left: 'calc(50% - 215px)' },
    delay: 0.9,
  },
  {
    id: 3,
    text: 'Tem horário hoje?',
    type: 'in' as const,
    size: 'sm' as const,
    position: { top: '18%', right: 'calc(50% - 215px)' },
    delay: 1.6,
  },
  {
    id: 4,
    text: 'Tem vaga pra hoje mano?',
    type: 'out' as const,
    size: 'xl' as const,
    position: { top: '38%', left: 'calc(50% - 220px)' },
    delay: 2.4,
  },
  {
    id: 5,
    text: 'Na verdade, marca pra amanhã.',
    type: 'in' as const,
    size: 'md' as const,
    position: { top: '38%', right: 'calc(50% - 220px)' },
    delay: 3.2,
  },
  {
    id: 6,
    text: 'Ô mano, troca pra outro horário pra mim?',
    type: 'out' as const,
    size: 'xl' as const,
    position: { top: '60%', left: 'calc(50% - 220px)' },
    delay: 4,
  },
  {
    id: 7,
    text: 'Tô indo viajar, corta meu cabelo agora?',
    type: 'in' as const,
    size: 'sm' as const,
    position: { top: '60%', right: 'calc(50% - 220px)' },
    delay: 4.8,
    hideMobile: true,
  },
  {
    id: 8,
    text: 'Mano, tô precisando com urgência, dá um jeito aí.',
    type: 'out' as const,
    size: 'xl' as const,
    position: { top: '85%', left: 'calc(50% - 210px)' },
    delay: 5.6,
  },
  {
    id: 9,
    text: 'Se não der hoje, marca pro primeiro horário de amanhã.',
    type: 'in' as const,
    size: 'md' as const,
    position: { top: '73%', right: 'calc(50% - 215px)' },
    delay: 4.9,
  },
];
