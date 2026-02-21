import { WA_NUMBER, WA_MESSAGES } from '@/constants';
import { WAMessageType, ContactFormData } from '@/types';

export const buildWhatsAppUrl = (type: WAMessageType): string => {
  const message = WA_MESSAGES[type];
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WA_NUMBER}?text=${encoded}`;
};

export const buildWhatsAppMessage = ({ nome, email, mensagem }: ContactFormData): string => {
  const linhas = [
    `👤 Nome: ${nome || '—'}`,
    email ? `📧 E-mail: ${email}` : '📧 E-mail: (não informado)',
    '🗨️ Mensagem:',
    mensagem || '—',
  ];
  return linhas.join('\n');
};

export const sendWhatsAppMessage = (data: ContactFormData): void => {
  const text = buildWhatsAppMessage(data);
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener');
};
