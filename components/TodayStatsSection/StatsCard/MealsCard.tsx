import { StatsCard } from './StatsCard'

export function MealsCard({ meals }: { meals: number }) {
  return <StatsCard title="Meals" value={meals} icon="restaurant" />
}
