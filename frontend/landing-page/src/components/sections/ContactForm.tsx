import { useState, FormEvent } from 'react';
import { sendWhatsAppMessage } from '@/utils/whatsapp';
import { WhatsAppIcon } from '@/components/icons';

export const ContactForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [errors, setErrors] = useState<{ nome?: boolean; mensagem?: boolean }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const newErrors: { nome?: boolean; mensagem?: boolean } = {};
    if (!nome.trim()) newErrors.nome = true;
    if (!mensagem.trim()) newErrors.mensagem = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    sendWhatsAppMessage({ nome, email, mensagem });
  };

  return (
    <section id="interesse" className="px-4 py-8 max-w-[1100px] mx-auto text-center reveal">
      <h2 className="font-display text-gold text-[clamp(1.8rem,3vw,2.6rem)] m-0 mb-2">
        Ficou interessado?
      </h2>
      <p className="text-text-dim mb-6">
        Entre em contato conosco para tirar dúvidas ou começar agora mesmo.
      </p>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[600px] mx-auto text-left"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="grid gap-1.5">
          <span>
            Seu nome <em className="text-gold not-italic text-[0.85em]">*</em>
          </span>
          <input
            type="text"
            name="nome"
            placeholder="Ex: João Silva"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              setErrors((prev) => ({ ...prev, nome: false }));
            }}
            className={`bg-[#131313] border ${
              errors.nome ? 'border-[#d84e4e] shadow-[0_0_0_1px_rgba(216,78,78,0.35)]' : 'border-border'
            } text-text px-3 py-2.5 rounded-xl font-sans`}
            required
          />
        </label>

        <label className="grid gap-1.5">
          <span>
            E-mail <small className="text-muted text-[0.65rem] font-medium tracking-wide">(opcional)</small>
          </span>
          <input
            type="email"
            name="email"
            placeholder="Ex: joao@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#131313] border border-border text-text px-3 py-2.5 rounded-xl font-sans"
          />
        </label>

        <label className="grid gap-1.5 md:col-span-2">
          <span>
            Mensagem <em className="text-gold not-italic text-[0.85em]">*</em>
          </span>
          <textarea
            name="mensagem"
            rows={3}
            placeholder="Descreva sua dúvida ou necessidade"
            value={mensagem}
            onChange={(e) => {
              setMensagem(e.target.value);
              setErrors((prev) => ({ ...prev, mensagem: false }));
            }}
            className={`bg-[#131313] border ${
              errors.mensagem ? 'border-[#d84e4e] shadow-[0_0_0_1px_rgba(216,78,78,0.35)]' : 'border-border'
            } text-text px-3 py-2.5 rounded-xl font-sans resize-none`}
            required
          />
        </label>

        <button
          type="submit"
          className="md:col-span-2 md:justify-self-center md:min-w-[280px] w-full mt-1.5 inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold border transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 bg-[#131f18] border-wa/35 text-wa shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:bg-wa hover:text-bg text-sm tracking-wide"
        >
          <WhatsAppIcon className="w-5 h-5" />
          <span>Enviar pelo WhatsApp</span>
        </button>
      </form>
    </section>
  );
};
