import { Link } from 'react-router-dom';
import { CHAT_BUBBLES } from '@/constants';
const barbeiroImg = '/imagens/elementos/barbeiro_estressado.png';

const ChatBubble = ({ bubble }: { bubble: typeof CHAT_BUBBLES[0] }) => {
  const sizeClasses = {
    sm: 'max-w-[85px] text-[0.5rem] sm:max-w-[95px] sm:text-[0.56rem] md:max-w-[100px] md:text-[0.56rem]',
    md: 'max-w-[120px] text-[0.54rem] sm:max-w-[145px] sm:text-[0.62rem] md:max-w-[140px] md:text-[0.58rem]',
    lg: 'max-w-[160px] text-[0.58rem] sm:max-w-[190px] sm:text-[0.68rem] md:max-w-[180px] md:text-[0.64rem]',
    xl: 'max-w-[180px] text-[0.62rem] font-medium sm:max-w-[240px] sm:text-[0.72rem] md:max-w-[220px] md:text-[0.68rem]',
  };

  const typeClasses = {
    in: 'bg-[#202c33] rounded-[12px_12px_12px_3px] sm:rounded-[14px_14px_14px_4px] after:left-[8px] sm:after:left-[10px] after:bg-[#202c33] after:border-white/5 after:border-t-0 after:border-r-0',
    out: 'bg-[#005c4b] rounded-[12px_12px_3px_12px] sm:rounded-[14px_14px_4px_14px] after:right-[8px] sm:after:right-[10px] after:bg-[#005c4b] after:border-white/5 after:border-t-0 after:border-l-0',
  };

  const mobilePositionClass = (() => {
    if (bubble.position.left && bubble.position.left.toString().includes('calc')) {
      return 'left-[5px] sm:left-[calc(50%-215px)] md:left-[calc(50%-220px)]';
    }
    if (bubble.position.right && bubble.position.right.toString().includes('calc')) {
      return 'right-[5px] sm:right-[calc(50%-215px)] md:right-[calc(50%-220px)]';
    }
    return '';
  })();

  return (
    <div
      className={`absolute leading-[1.25] px-[0.5rem] py-[0.4rem] pb-[0.35rem] sm:leading-[1.3] sm:px-[0.7rem] sm:py-[0.55rem] sm:pb-[0.5rem] text-[#e8ede9] shadow-[0_4px_12px_rgba(0,0,0,0.4)] sm:shadow-[0_6px_18px_rgba(0,0,0,0.5)] animate-bubble-float z-[4] pointer-events-none border border-white/5 ${sizeClasses[bubble.size]} ${typeClasses[bubble.type]} ${bubble.hideMobile ? 'hidden md:block' : ''} ${mobilePositionClass} after:content-[''] after:absolute after:bottom-[-5px] sm:after:bottom-[-6px] after:w-[12px] after:h-[12px] sm:after:w-[14px] sm:after:h-[14px] after:rotate-45 after:border`}
      style={{
        top: bubble.position.top,
        transform: bubble.position.transform,
        animationDelay: `${bubble.delay}s`,
      }}
    >
      {bubble.text}
    </div>
  );
};

export const Hero = () => {
  return (
    <main id="home" className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center lg:items-start px-4 py-8 lg:pt-12 max-w-[1200px] mx-auto">
      <div className="hero-content">
        <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-none m-0 mb-3 text-gold">
          Fique na régua, sem complicação
        </h1>
        <p className="text-text-dim m-0 mb-4">
          O app perfeito para barbearias e clientes. Rápido, bonito e otimizado para celulares pequenos e tablets.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link
            to="/precos"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold border transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 bg-gold/10 text-gold border-gold/60 hover:bg-gold hover:text-bg shadow-[0_2px_12px_rgba(201,149,59,0.2)]"
          >
            <span>Ver os preços</span>
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative w-full flex justify-center py-5 px-3">
          <div className="relative z-[3] w-full max-w-[240px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[330px] aspect-[9/18] rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] p-2.5 sm:p-3.5 shadow-custom border border-black outline outline-2 outline-[#222] outline-offset-2 md:scale-95 lg:scale-95">
            <div className="h-2 sm:h-2.5 w-[40%] bg-[#222] rounded-full mx-auto mb-1.5 sm:mb-2 opacity-60" />
            <div className="h-[calc(100%-14px)] sm:h-[calc(100%-18px)] bg-surface rounded-2xl sm:rounded-3xl overflow-hidden border border-border grid">
              <img
                src={barbeiroImg}
                alt="Barbeiro estressado — Régua Máxima"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {CHAT_BUBBLES.map((bubble) => (
            <ChatBubble key={bubble.id} bubble={bubble} />
          ))}
        </div>
      </div>
    </main>
  );
};
