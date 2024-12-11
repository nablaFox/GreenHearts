import { StatsCard } from './StatsCard'

export function KcalCard({ kcal }: { kcal: number }) {
  return <StatsCard title="Kcal" value={kcal} icon="fire" />
}
