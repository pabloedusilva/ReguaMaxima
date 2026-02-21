import { CLIENT_DASHBOARD_DATA, BARBER_DASHBOARD_DATA } from '@/constants';

interface DashboardProps {
  title: string;
  data: typeof CLIENT_DASHBOARD_DATA;
  id: string;
}

const Dashboard = ({ title, data, id }: DashboardProps) => (
  <section id={`${id}-dashboard`} className="px-4 py-8 max-w-[1100px] mx-auto reveal">
    <h2 className="font-display text-gold text-[clamp(1.8rem,3vw,2.6rem)] m-0 mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((panel) => (
        <article
          key={panel.title}
          className="bg-gradient-to-br from-[#141414] to-[#0f0f0f] border border-border rounded-[18px] p-4 shadow-custom relative overflow-hidden transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:border-[#2b2b2b] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-transparent before:via-gold before:to-transparent before:opacity-35"
        >
          <h3 className="m-0 mb-1 text-lg">{panel.title}</h3>
          <p className="text-text-dim m-0 mb-3 text-sm">{panel.description}</p>
          <ul className="mt-3 p-0 list-none grid gap-1.5">
            {panel.items.map((item) => (
              <li key={item} className="inline-flex items-center gap-2 text-text-dim text-sm before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-gold before:shadow-[0_0_0_1px_rgba(201,149,59,0.45)] before:opacity-85">
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
    <p className="text-center mt-6 text-muted">E muito mais.</p>
  </section>
);

export const ClientDashboard = () => (
  <Dashboard title="Dashboard do Cliente" data={CLIENT_DASHBOARD_DATA} id="cliente" />
);

export const BarberDashboard = () => (
  <Dashboard title="Dashboard do Barbeiro" data={BARBER_DASHBOARD_DATA} id="barber" />
);

export const ClientExperience = () => (
  <section id="cliente" className="px-4 py-8 max-w-[1100px] mx-auto text-center reveal">
    <h2 className="font-display text-gold text-[clamp(1.8rem,3vw,2.6rem)] m-0 mb-4">
      Experiência do Cliente
    </h2>
    <div className="grid place-items-center">
      <div className="w-full max-w-[240px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[330px] aspect-[9/18] rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] p-2.5 sm:p-3.5 shadow-custom border border-black outline outline-2 outline-[#222] outline-offset-2 md:scale-95 lg:scale-95">
        <div className="h-2 sm:h-2.5 w-[40%] bg-[#222] rounded-full mx-auto mb-1.5 sm:mb-2 opacity-60" />
        <div className="h-[calc(100%-14px)] sm:h-[calc(100%-18px)] bg-surface rounded-2xl sm:rounded-3xl overflow-hidden border border-border grid">
          <video playsInline muted loop controls className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
);

export const BarberExperience = () => (
  <section id="barber" className="px-4 py-8 max-w-[1100px] mx-auto text-center reveal">
    <h2 className="font-display text-gold text-[clamp(1.8rem,3vw,2.6rem)] m-0 mb-4">
      Experiência do Barbeiro
    </h2>
    <div className="grid place-items-center">
      <div className="w-full max-w-[240px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[330px] aspect-[9/18] rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] p-2.5 sm:p-3.5 shadow-custom border border-black outline outline-2 outline-[#222] outline-offset-2 md:scale-95 lg:scale-95">
        <div className="h-2 sm:h-2.5 w-[40%] bg-[#222] rounded-full mx-auto mb-1.5 sm:mb-2 opacity-60" />
        <div className="h-[calc(100%-14px)] sm:h-[calc(100%-18px)] bg-surface rounded-2xl sm:rounded-3xl overflow-hidden border border-border grid">
          <video playsInline muted loop controls className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
);

export const ScreenReview = ({ title, screens, id }: { title: string; screens: string[]; id: string }) => (
  <section id={id} className="px-4 py-8 max-w-[1100px] mx-auto reveal">
    <h2 className="font-display text-gold text-[clamp(1.8rem,3vw,2.6rem)] m-0 mb-4">{title}</h2>
    <div className="flex gap-3 overflow-x-auto py-1 pb-2 snap-x snap-mandatory -webkit-overflow-scrolling-touch scrollbar-thin scrollbar-thumb-[#2a2a2a] scrollbar-track-transparent">
      {screens.map((screen) => (
        <div
          key={screen}
          className="bg-[#141414] border-2 border-border rounded-[14px] p-3 sm:p-4 grid place-items-center text-muted text-sm sm:text-base flex-shrink-0 w-[min(220px,75vw)] sm:w-[min(300px,82vw)] h-[340px] sm:h-[420px] aspect-[9/18] snap-center"
        >
          {screen}
        </div>
      ))}
    </div>
  </section>
);
