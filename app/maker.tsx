import { Button } from 'react-native-paper'
import { useState } from 'react'

import { MakerHeader } from '@/components/Headers/MakerHeader'
import {
  ThemedView,
  ThemedDatePicker,
  ThemedTextInput,
  ThemedTextareaInput,
  ThemedImagePicker
} from '@/components/Themed'

import { usePosts } from '@/hooks/usePosts'
import { router } from 'expo-router'

export default function Maker() {
  const [image, setImage] = useState<File | undefined>()
  const [date, setDate] = useState(new Date())
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')

  const { addPost } = usePosts()

  const canUpload = title || image

  const handleUpload = () => {
    if (!canUpload) return

    addPost({ image, date, title, notes })
    router.back()
  }

  return (
    <ThemedView className="flex-1">
      <MakerHeader />

      <ThemedImagePicker image={image} setImage={setImage} />

      <ThemedDatePicker date={date} setDate={setDate} />

      <ThemedTextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        icon="text"
      />

      <ThemedTextareaInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        icon="notes"
        rows={4}
      />

      <Button onPress={handleUpload} mode="outlined" disabled={!canUpload}>
        Upload Post
      </Button>
    </ThemedView>
  )
}
