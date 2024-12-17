import { ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import { useState } from 'react'

import { MakerHeader } from '@/components/Headers/MakerHeader'
import {
  ThemedView,
  ThemedDateTimePicker,
  ThemedTextInput,
  ThemedTextareaInput,
  ThemedImagePicker
} from '@/components/Themed'

import { usePosts } from '@/hooks/usePosts'
import { router } from 'expo-router'
import { useUser } from '@/hooks/useUser'

export default function Maker() {
  const [imageUri, setImageUri] = useState<string>()
  const [date, setDate] = useState(new Date())
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')

  const addPost = usePosts(state => state.addPost)
  const bunnyId = useUser(state => state.bunnyId!)

  const canUpload = title || imageUri

  const handleUpload = () => {
    if (!canUpload) return

    addPost(bunnyId, {
      imageUri,
      date,
      title,
      notes
    })

    router.back()
  }

  return (
    <ThemedView className="flex-1">
      <ScrollView>
        <MakerHeader />

        <ThemedImagePicker imageUri={imageUri} setImageUri={setImageUri} />

        <ThemedDateTimePicker date={date} setDate={setDate} />

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
          icon="text-box"
          rows={4}
        />

        <Button onPress={handleUpload} mode="outlined" disabled={!canUpload}>
          Upload Post
        </Button>
      </ScrollView>
    </ThemedView>
  )
}
