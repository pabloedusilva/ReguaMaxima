import Skeleton from '@components/ui/Skeleton'

/* ── Sub-skeletons ──────────────────────────────────────────────────────── */

/**
 * Mirrors <NextBookingHighlight> exactly.
 * Real: Card = card p-4 min-w-0 + border-gold/30 bg-gradient-to-br from-gold/5 to-transparent
 * Inside: grid gap-3 w-full min-w-0
 */
function NextBookingHighlightSkeleton() {
  return (
    <div className="card p-4 min-w-0 border-gold/30 bg-gradient-to-br from-gold/5 to-transparent">
      <div className="grid gap-3 w-full min-w-0">

        {/* flex items-center gap-2 */}
        <div className="flex items-center gap-2">
          {/* h-2 w-2 rounded-full bg-gold (dot) */}
          <Skeleton className="w-2 h-2 rounded-full flex-shrink-0" delay="60ms" />
          {/* h3 text-sm uppercase tracking-wide font-semibold (lh=1.25rem=20px) → h-5 */}
          <Skeleton className="w-40 h-5 rounded-md" delay="70ms" />
        </div>

        <div className="grid gap-2 w-full min-w-0">
          {/* flex items-baseline gap-2 flex-wrap */}
          <div className="flex items-baseline gap-2 flex-wrap">
            {/* time: text-2xl font-display (lh=2rem=32px) → h-8 */}
            <Skeleton className="w-16 h-8 rounded-md" delay="90ms" />
            {/* date: text-sm capitalize (lh=1.25rem=20px) → h-5 */}
            <Skeleton className="w-52 h-5 rounded-md" delay="100ms" />
          </div>

          {/* grid gap-1 text-sm w-full — 3 rows */}
          <div className="grid gap-1 text-sm w-full min-w-0">
            {/* flex items-center justify-between gap-2 */}
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="w-20 h-4 rounded-md flex-shrink-0" delay="115ms" />
              <Skeleton className="w-28 h-4 rounded-md" delay="115ms" />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="w-14 h-4 rounded-md flex-shrink-0" delay="130ms" />
              <Skeleton className="w-24 h-4 rounded-md" delay="130ms" />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="w-10 h-4 rounded-md flex-shrink-0" delay="145ms" />
              <Skeleton className="w-16 h-4 rounded-md" delay="145ms" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface BookingCardSkeletonProps {
  delay?: string
}

/**
 * Mirrors <BookingCard> exactly.
 * Real: Card = card p-4 min-w-0 → grid gap-3 min-w-0
 */
function BookingCardSkeleton({ delay = '0ms' }: BookingCardSkeletonProps) {
  return (
    <div className="card p-4 min-w-0">
      <div className="grid gap-3 min-w-0">

        {/* flex items-start justify-between gap-3 min-w-0 */}
        <div className="flex items-start justify-between gap-3 min-w-0">
          {/* left: min-w-0 */}
          <div className="min-w-0">
            {/* time: text-lg font-semibold (lh=1.75rem=28px) → h-7 */}
            <Skeleton className="w-16 h-7 rounded-md" delay={delay} />
            {/* date: text-sm text-text/70 (lh=1.25rem=20px) → h-5, mt=natural gap */}
            <Skeleton className="w-28 h-5 rounded-md mt-0.5" delay={delay} />
          </div>
          {/* status badge: px-2.5 py-1 rounded-lg text-xs (lh=1rem, h=1+0.5=1.5rem=24px) → h-6, flex-shrink-0 */}
          <Skeleton className="w-20 h-6 rounded-lg flex-shrink-0" delay={delay} />
        </div>

        {/* grid gap-1.5 text-sm min-w-0 — 3 detail rows */}
        <div className="grid gap-1.5 text-sm min-w-0">
          {/* Profissional */}
          <div className="flex justify-between gap-2 min-w-0">
            <Skeleton className="w-24 h-4 rounded-md flex-shrink-0" delay={delay} />
            <Skeleton className="w-24 h-4 rounded-md" delay={delay} />
          </div>
          {/* Serviço */}
          <div className="flex justify-between gap-2 min-w-0">
            <Skeleton className="w-16 h-4 rounded-md flex-shrink-0" delay={delay} />
            <Skeleton className="w-28 h-4 rounded-md" delay={delay} />
          </div>
          {/* Valor */}
          <div className="flex justify-between gap-2 min-w-0">
            <Skeleton className="w-12 h-4 rounded-md flex-shrink-0" delay={delay} />
            <Skeleton className="w-14 h-4 rounded-md" delay={delay} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Skeleton ──────────────────────────────────────────────────────── */

export default function MyBookingsPageSkeleton() {
  return (
    <div className="grid gap-8 md:gap-10 w-full min-w-0" aria-busy="true" aria-label="Carregando agendamentos">

      {/* ── Page title — text-center ── */}
      <div className="text-center">
        {/* h1 font-display text-4xl text-gold (lh=2.5rem=40px) → h-10 */}
        <Skeleton className="h-10 w-64 rounded-2xl mx-auto" delay="0ms" />
        {/* p text-text/70 text-base mt-2 (lh=1.5rem=24px) → h-6 */}
        <Skeleton className="h-6 w-72 rounded-lg mx-auto mt-2" delay="30ms" />
      </div>

      <div className="grid gap-6 md:gap-7 w-full min-w-0">

        {/* ── Em destaque — grid gap-2 ── */}
        <div className="grid gap-2">
          {/* h2 text-text/90 font-semibold text-lg (lh=1.75rem=28px) → h-7 */}
          <Skeleton className="w-24 h-7 rounded-lg" delay="55ms" />
          <NextBookingHighlightSkeleton />
        </div>

        <div className="grid gap-4">

          {/* ── Histórico + FilterTabs — grid gap-3 ── */}
          <div className="grid gap-3">
            {/* h2 text-text/90 font-semibold text-lg → h-7 */}
            <Skeleton className="w-20 h-7 rounded-lg" delay="195ms" />
            {/* FilterTabs: w-full overflow-x-auto → flex gap-2 pb-2 min-w-max */}
            {/* Each tab: px-3 py-1.5 rounded-lg text-xs (lh=1rem, h=1+0.75=1.75rem=28px) → h-7 */}
            <div className="flex gap-2 pb-2">
              <Skeleton className="w-14 h-7 rounded-lg flex-shrink-0" delay="215ms" />
              <Skeleton className="w-[84px] h-7 rounded-lg flex-shrink-0" delay="230ms" />
              <Skeleton className="w-[88px] h-7 rounded-lg flex-shrink-0" delay="245ms" />
              <Skeleton className="w-[88px] h-7 rounded-lg flex-shrink-0" delay="260ms" />
            </div>
          </div>

          {/* ── Booking cards — grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <BookingCardSkeleton delay="280ms" />
            <BookingCardSkeleton delay="310ms" />
            <BookingCardSkeleton delay="340ms" />
          </div>
        </div>

        {/* ── Back button — flex justify-center pt-4 ── */}
        {/* Button variant="outline": btn btn-outline py-2 → h-10 rounded-full */}
        <div className="flex justify-center pt-4">
          <Skeleton className="w-36 h-10 rounded-full" delay="370ms" />
        </div>
      </div>
    </div>
  )
}
