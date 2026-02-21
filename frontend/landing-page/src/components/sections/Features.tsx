import {
  CalendarIcon,
  BellIcon,
  PaletteIcon,
  HeadphonesIcon,
  EyeOffIcon,
  ZapIcon,
  CreditCardIcon,
  StarIcon,
} from '@/components/icons';
import { FEATURES_DATA } from '@/constants';

const iconMap: Record<string, React.ComponentType> = {
  calendar: CalendarIcon,
  bell: BellIcon,
  palette: PaletteIcon,
  headphones: HeadphonesIcon,
  eyeOff: EyeOffIcon,
  zap: ZapIcon,
  creditCard: CreditCardIcon,
  star: StarIcon,
};

export const Features = () => {
  return (
    <section id="features" className="px-4 py-8 max-w-[1100px] mx-auto reveal">
      <h2 className="font-display text-gold text-[clamp(1.8rem,3vw,2.6rem)] m-0 mb-4">
        Recursos que importam
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 reveal-stagger">
        {FEATURES_DATA.map((feature) => {
          const IconComponent = iconMap[feature.icon];
          return (
            <article
              key={feature.title}
              className="bg-[#141414] border border-border rounded-2xl p-4 shadow-custom lg:flex lg:flex-col lg:items-center lg:justify-start"
            >
              <div className="w-[46px] h-[46px] flex items-center justify-center mb-1.5 text-gold">
                <IconComponent />
              </div>
              <h3 className="my-1.5 mt-2 lg:text-center">{feature.title}</h3>
              <p className="text-text-dim text-sm m-0">{feature.description}</p>
            </article>
          );
        })}
      </div>
      <div className="flex justify-center mt-6">
        <a
          href="/precos"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold border border-border transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 bg-transparent text-text text-sm"
        >
          Ver planos
        </a>
      </div>
    </section>
  );
};
