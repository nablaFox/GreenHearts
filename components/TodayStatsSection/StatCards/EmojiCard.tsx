import { StatsCard } from './StatsCard'

export function EmojiCard({ score }: { score: number }) {
  const getIcon = () => {
    return 'emoticon-cry'
  }

  return <StatsCard title="Emoji" value={score} icon={getIcon()} />
}
