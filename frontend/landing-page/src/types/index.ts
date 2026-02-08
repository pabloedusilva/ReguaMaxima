export type WAMessageType = 'interest' | 'monthly' | 'trimestral' | 'pricing' | 'anual';

export interface ChatBubble {
  id: number;
  text: string;
  type: 'in' | 'out';
  size: 'sm' | 'md' | 'lg' | 'xl';
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    transform?: string;
  };
  delay: number;
  hideMobile?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface DashboardPanel {
  title: string;
  description: string;
  items: string[];
}

export interface ContactFormData {
  nome: string;
  email?: string;
  mensagem: string;
}
