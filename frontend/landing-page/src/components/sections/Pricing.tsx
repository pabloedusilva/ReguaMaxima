import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { PaymentIcon, CloseIcon } from '@/components/icons';
import { useDrawer } from '@/hooks/useDrawer';
const infinityPayLogo = '/imagens/elementos/logo-InfinityPay.svg';

export const Pricing = () => {
  const { isOpen, drawerRef, openDrawer, closeDrawer, handlePointerDown } = useDrawer();

  return (
    <>
      <section id="planos" className="px-4 py-8 max-w-[1200px] mx-auto text-center reveal">
        <h2 className="font-display text-gold text-[clamp(1.8rem,3vw,2.6rem)] m-0 mb-2">
          Planos simples e transparentes
        </h2>
        <p className="text-text-dim text-lg m-0 mb-8 max-w-[600px] mx-auto">
          Sem contrato, sem pegadinha. Pague apenas quando usar — cancele quando quiser.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
          {/* Plano Mensal */}
          <article className="group bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border border-border/50 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col relative transition-all duration-300 hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(201,149,59,0.15)] hover:-translate-y-1">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="mb-5 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-display text-[1.6rem] text-text m-0 mb-3">Plano Mensal</h3>
                <div className="inline-block bg-[#131f18] border border-wa/35 text-wa px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase shadow-[0_2px_10px_rgba(37,211,102,0.2)]">
                  Teste Grátis 7 Dias
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="line-through text-text-dim/50 text-sm">R$ 119,90</span>
                <span className="bg-gold/15 text-gold px-2 py-0.5 rounded text-xs font-bold">-42%</span>
              </div>
              <div className="flex items-baseline justify-center gap-1 leading-none mb-2">
                <span className="text-xl text-gold font-bold">R$</span>
                <span className="text-5xl font-bold bg-gradient-to-b from-gold to-gold/80 bg-clip-text text-transparent font-display">69</span>
                <span className="text-2xl text-gold font-semibold">,90</span>
              </div>
              <span className="block text-text-dim text-sm">/mês após o teste</span>
            </div>

            <ul className="list-none p-0 m-0 mb-6 text-left space-y-3 flex-grow">
              {['Todos os recursos inclusos', 'Suporte via WhatsApp 24h', 'Sem limite de agendamentos', 'Sem limite de profissionais', 'Cancele quando quiser'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-text-dim text-sm">
                  <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={buildWhatsAppUrl('monthly')}
              target="_blank"
              rel="noopener"
              className="w-full mt-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 bg-[#131f18] border border-wa/35 text-wa hover:bg-wa hover:text-bg shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:brightness-105"
            >
              Testar Grátis
            </a>
          </article>

          {/* Plano Trimestral - Destacado */}
          <article className="group bg-gradient-to-b from-[#1f1a0f] to-[#0f0d05] border-2 border-gold/50 rounded-2xl p-6 pt-8 shadow-[0_12px_40px_rgba(201,149,59,0.2)] flex flex-col relative transition-all duration-300 hover:border-gold hover:shadow-[0_20px_60px_rgba(201,149,59,0.3)] hover:-translate-y-2 lg:scale-105">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-bg px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg whitespace-nowrap z-10">
              Melhor Oferta
            </div>
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent rounded-t-2xl z-0" />
            
            <div className="mb-5">
              <h3 className="font-display text-[1.6rem] text-text m-0 mb-3">Plano Trimestral</h3>
              <div className="inline-block bg-gradient-to-r from-gold to-gold/80 text-bg px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase shadow-md">
                Melhor Custo-Benefício
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="line-through text-text-dim/50 text-sm">R$ 359,70</span>
                <span className="bg-wa/20 text-wa px-2 py-0.5 rounded text-xs font-bold">-50%</span>
              </div>
              <div className="flex items-baseline justify-center gap-1 leading-none mb-2">
                <span className="text-xl text-gold font-bold">R$</span>
                <span className="text-5xl font-bold bg-gradient-to-b from-gold to-gold/80 bg-clip-text text-transparent font-display">179</span>
                <span className="text-2xl text-gold font-semibold">,90</span>
              </div>
              <span className="block text-text-dim text-sm mb-3">/3 meses</span>
              <div className="inline-block bg-gradient-to-r from-wa/15 to-wa/5 border border-wa/30 text-wa px-3 py-1.5 rounded-lg text-xs font-bold">
                Economize R$ 179,80
              </div>
            </div>

            <ul className="list-none p-0 m-0 mb-6 text-left space-y-3 flex-grow">
              {['Todos os recursos inclusos', 'Suporte via WhatsApp 24h', 'Sem limite de agendamentos', 'Sem limite de profissionais', 'Cancele quando quiser', 'Acesso por 3 meses completos'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-text-dim text-sm">
                  <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={buildWhatsAppUrl('trimestral')}
              target="_blank"
              rel="noopener"
              className="w-full mt-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-gold to-gold/90 text-bg shadow-[0_4px_20px_rgba(201,149,59,0.3)] hover:shadow-[0_8px_30px_rgba(201,149,59,0.5)] hover:-translate-y-0.5"
            >
              Começar agora
            </a>
          </article>

          {/* Plano Anual - Super Destaque */}
          <article className="group bg-gradient-to-b from-[#1a1008] via-[#1a1a1a] to-[#0f0f0f] border-2 border-purple-500/40 rounded-2xl p-6 pt-8 shadow-[0_15px_50px_rgba(168,85,247,0.25)] flex flex-col relative transition-all duration-300 hover:border-purple-500/60 hover:shadow-[0_25px_70px_rgba(168,85,247,0.4)] hover:-translate-y-2 md:scale-[1.02] hover:md:scale-[1.05]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-[0_4px_20px_rgba(168,85,247,0.6)] whitespace-nowrap z-10">
              🔥 Maior Economia
            </div>
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-t-2xl z-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-2xl pointer-events-none z-0" />
            
            <div className="mb-5">
              <h3 className="font-display text-[1.6rem] bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent m-0 mb-3">Plano Anual</h3>
              <div className="inline-block bg-gradient-to-r from-purple-500/20 to-purple-600/10 border border-purple-500/40 text-purple-300 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase shadow-lg">
                Melhor Investimento
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="line-through text-text-dim/50 text-sm">R$ 1.438,80</span>
                <span className="bg-gradient-to-r from-purple-500/30 to-purple-600/20 text-purple-300 px-2.5 py-1 rounded-md text-xs font-bold shadow-lg">-58%</span>
              </div>
              <div className="flex items-baseline justify-center gap-1 leading-none mb-2">
                <span className="text-xl bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent font-bold">R$</span>
                <span className="text-6xl font-bold bg-gradient-to-b from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent font-display drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">599</span>
                <span className="text-3xl bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent font-semibold">,90</span>
              </div>
              <span className="block text-text-dim text-sm mb-3">/ano</span>
              <div className="inline-block bg-gradient-to-r from-purple-500/20 to-purple-600/10 border-2 border-purple-500/40 text-purple-300 px-4 py-2 rounded-lg text-sm font-bold shadow-[0_4px_20px_rgba(168,85,247,0.3)] animate-pulse-slow">
                Economize R$ 838,90
              </div>
            </div>

            <ul className="list-none p-0 m-0 mb-6 text-left space-y-3 flex-grow">
              {['Todos os recursos inclusos', 'Suporte via WhatsApp 24h', 'Sem limite de agendamentos', 'Sem limite de profissionais', 'Cancele quando quiser', 'Acesso por 12 meses completos', 'Equivale a R$ 49,99/mês'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-text-dim text-sm">
                  <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={buildWhatsAppUrl('anual')}
              target="_blank"
              rel="noopener"
              className="w-full mt-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 text-white shadow-[0_8px_25px_rgba(168,85,247,0.4)] hover:shadow-[0_12px_35px_rgba(168,85,247,0.6)] hover:-translate-y-1 hover:scale-105 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <span className="relative">Começar agora</span>
            </a>
          </article>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="m-0 text-muted text-xs max-w-[650px] leading-relaxed italic opacity-85">
            <strong className="text-gold font-semibold">Como funciona:</strong> Pagamento simples e recorrente — pague o mês e use todos os recursos. Se não renovar, o acesso é pausado automaticamente até o próximo pagamento. Sem multa, sem burocracia.
          </p>
          <button
            onClick={openDrawer}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full font-semibold border border-border transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 bg-transparent text-text"
          >
            <PaymentIcon className="w-[18px] h-[18px]" />
            <span>Sobre o pagamento</span>
          </button>
        </div>
      </section>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-bg/70 backdrop-blur-[6px] grid items-end justify-items-center"
          onClick={(e) => e.target === e.currentTarget && closeDrawer()}
        >
          <div
            ref={drawerRef}
            className={`w-full max-w-[1100px] h-[75vh] md:h-[78vh] bg-bg rounded-t-3xl border border-border shadow-[0_-12px_30px_rgba(0,0,0,0.5)] relative transition-all duration-[320ms] ease-in-out ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="plansDrawerTitle"
          >
            <div
              onPointerDown={handlePointerDown}
              className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-1.5 rounded-full bg-[#262626] cursor-grab active:cursor-grabbing"
              aria-label="Arraste para fechar"
            />

            <div className="flex items-center justify-between gap-3 px-4 py-4 pb-2 border-b border-border">
              <h3 id="plansDrawerTitle" className="m-0 text-[1.3rem] md:text-[1.2rem] text-gold font-display tracking-wide">
                Como funciona o pagamento
              </h3>
              <button
                onClick={closeDrawer}
                className="bg-transparent border border-border text-text w-9 h-9 rounded-[10px] inline-flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#171717] hover:text-text hover:border-[#2e2e2e]"
                aria-label="Fechar"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="h-[calc(100%-62px)] overflow-hidden">
              <div className="h-full overflow-y-auto px-4 py-4">
                <h4 className="text-text mb-2">Como funciona o pagamento</h4>
                <p className="text-text-dim leading-relaxed">
                  O pagamento da assinatura é feito através de links gerados pela <strong className="text-gold font-bold">InfinityPay</strong>. Ao escolher assinar, você seleciona a forma de pagamento desejada <strong>(Pix, cartão de crédito, cartão de débito ou boleto bancário)</strong> e é redirecionado para um link seguro onde faz a confirmação. A <strong className="text-gold font-bold">InfinityPay</strong> processa a transação e, assim que o pagamento é confirmado, sua assinatura é ativada automaticamente no Régua Máxima — sem necessidade de passos extras.
                </p>
                <p className="text-text-dim leading-relaxed">
                  Cada método de pagamento tem características próprias: o Pix costuma ser instantâneo e sem taxa pela plataforma; cartões podem ter cobrança de taxa pela operadora; e boletos envolvem a taxa bancária padrão. Essas taxas são exibidas no momento da escolha do pagamento, para que você saiba exatamente quanto será cobrado antes de confirmar.
                </p>
                <p className="text-text-dim leading-relaxed">
                  A segurança é prioridade: a <strong className="text-gold font-bold">InfinityPay</strong> utiliza mecanismos avançados de proteção e criptografia para garantir que seus dados e transações fiquem seguros. Além disso, o sistema confirma o pagamento rapidamente, o que minimiza erros e atrasos na ativação da assinatura.
                </p>
                <p className="text-text-dim leading-relaxed">
                  Você tem controle total sobre sua assinatura. No app você pode ver o valor que paga, a forma de pagamento cadastrada, a data da próxima renovação e as taxas aplicadas. Também é possível alterar o método de pagamento a qualquer momento ou cancelar a assinatura diretamente pelo painel — o Régua Máxima não retém seu dinheiro nem trava você em um único meio de pagamento.
                </p>
                <p className="text-text-dim leading-relaxed">
                  Por fim, prezamos pela transparência: todas as informações de cobrança, taxas e datas de renovação ficam claras no processo de assinatura e no histórico de pagamentos. Se houver alguma dúvida ou necessidade de ajuste, o suporte está disponível para ajudar.
                </p>
                <div className="mt-4 pt-3 border-t border-border flex justify-center">
                  <img src={infinityPayLogo} alt="InfinityPay" className="max-h-[34px] opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
