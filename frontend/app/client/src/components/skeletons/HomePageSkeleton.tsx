import Skeleton from '@components/ui/Skeleton'
import InstagramSection from '@components/InstagramSection'

export default function HomePageSkeleton() {
  return (
    <div className="grid gap-8 md:gap-10 relative" aria-busy="true" aria-label="Carregando página">

      {/* Fixed clipboard button — w-12 h-12 rounded-xl (exact match) */}
      <div className="fixed top-4 right-4 z-10">
        <Skeleton className="w-12 h-12 rounded-xl" />
      </div>

      {/* ── Profile Section — text-center grid gap-2 ── */}
      <div className="text-center grid gap-2">

        {/* ProfileAvatar size={112} → 112×112px rounded-full border-2 */}
        <Skeleton className="w-[112px] h-[112px] rounded-full mx-auto" delay="0ms" />

        {/* h1 font-display text-3xl (lh=2.25rem=36px) → h-9 */}
        <Skeleton className="w-56 h-9 rounded-lg mx-auto" delay="40ms" />

        {/* Social links — flex items-center justify-center gap-4 mt-1 */}
        {/* Each <a> is w-11 h-11 (44px), svg inside is 40px */}
        <div className="flex items-center justify-center gap-4 mt-1">
          <Skeleton className="w-11 h-11 rounded-full" delay="70ms" />
          <Skeleton className="w-11 h-11 rounded-full" delay="85ms" />
        </div>

        {/* Greeting + date — mt-6 md:mt-8 text-left */}
        <div className="mt-6 md:mt-8 text-left">
          {/* h2 font-semibold text-xl (lh=1.75rem=28px) → h-7 */}
          <Skeleton className="w-44 h-7 rounded-lg" delay="110ms" />
          {/* div text-sm (lh=1.25rem=20px) → h-5, mt matches inline line gap */}
          <Skeleton className="w-52 h-5 rounded-md mt-1" delay="130ms" />
        </div>
      </div>

      {/* ── Business Hours — grid gap-3 ── */}
      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          {/* h2 font-semibold text-base (lh=1.5rem=24px) → h-6 */}
          <Skeleton className="w-20 h-6 rounded-md" delay="150ms" />
          {/* status — text-sm inline-flex items-center gap-2 */}
          <div className="inline-flex items-center gap-2">
            <Skeleton className="w-2.5 h-2.5 rounded-full" delay="160ms" />
            {/* "Fechado" / "Aberto" — text-sm font-medium → h-5 */}
            <Skeleton className="w-16 h-5 rounded-md" delay="160ms" />
          </div>
        </div>

        {/* Card: card border border-border rounded-xl bg-surface overflow-hidden */}
        <div className="card border border-border rounded-xl bg-surface overflow-hidden">
          {/* button w-full px-4 py-3 flex items-center justify-between */}
          <div className="w-full px-4 py-3 flex items-center justify-between">
            {/* span text-sm font-medium → h-5 */}
            <Skeleton className="w-52 h-5 rounded-md" delay="175ms" />
            {/* svg w-5 h-5 */}
            <Skeleton className="w-5 h-5 rounded-md" delay="175ms" />
          </div>
        </div>
      </div>

      {/* ── Booking CTA — Card = card p-4 min-w-0 ── */}
      <div className="card p-4 min-w-0">
        <div className="grid gap-4 md:gap-5 text-center">

          {/* Icon div: mx-auto h-16 w-16 rounded-full */}
          <Skeleton className="mx-auto h-16 w-16 rounded-full" delay="195ms" />

          {/* h3 font-semibold text-base (lh=1.5rem=24px) → h-6 */}
          <Skeleton className="w-44 h-6 rounded-lg mx-auto" delay="215ms" />

          {/* p text-text/70 text-base — 1.5rem lh, 2 lines */}
          <div className="grid gap-1.5">
            <Skeleton className="w-full h-5 rounded-md" delay="230ms" />
            <Skeleton className="w-3/4 h-5 rounded-md mx-auto" delay="240ms" />
          </div>

          {/* flex flex-col items-stretch gap-3 md:gap-4 */}
          <div className="flex flex-col items-stretch gap-3 md:gap-4">
            {/* Primary button: py-3 text-base → lh(1.5)+2×0.75=3rem=48px → h-12 rounded-full */}
            <Skeleton className="w-full h-12 rounded-full" delay="255ms" />
            {/* Outline button: py-2 text-base → lh(1.5)+2×0.5=2.5rem=40px → h-10 rounded-full */}
            <Skeleton className="w-full h-10 rounded-full" delay="275ms" />
          </div>
        </div>
      </div>

      {/* Instagram section — fully interactive, identical to the real page */}
      <InstagramSection />
    </div>
  )
}
