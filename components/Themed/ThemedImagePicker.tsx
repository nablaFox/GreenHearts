import * as ImagePicker from 'expo-image-picker'
import { Image } from 'expo-image'
import { Button, IconButton } from 'react-native-paper'
import { View } from 'react-native'

import { useState } from 'react'

export function ThemedImagePicker({
  imageUri,
  setImageUri
}: {
  imageUri?: string
  setImageUri: (image?: string) => void
}) {
  const getRandomPlaceholder = () => {
    return 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=600&name=image8-2.jpg'
  }

  const [imageSource, setImageSource] = useState({
    uri: getRandomPlaceholder()
  })

  const onTakePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1
    })

    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri)
      setImageSource({ uri: result.assets[0].uri })
    }
  }

  const onDischargePhoto = () => {
    setImageUri()
    setImageSource({ uri: getRandomPlaceholder() })
  }

  return (
    <View className="justify-center items-center h-[440]">
      <Image source={imageSource} style={{ width: 320, height: 440 }} />
      <Button
        style={{ position: 'absolute', bottom: 10 }}
        mode="contained"
        onPress={onTakePhoto}
      >
        Take a photo
      </Button>

      {imageUri && <IconButton icon="trash-can" onPress={onDischargePhoto} />}
    </View>
  )
}

