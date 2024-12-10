import type { IconName } from '@/components/ui'
import { StatsCard } from './StatsCard'

export function EmojiCard({ score }: { score: number }) {
  const getIcon = () => {
    return 'sentiment-neutral' as IconName
  }

  return <StatsCard title="Emoji" value={score} icon={getIcon()} />
}
