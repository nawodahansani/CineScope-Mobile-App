import "./../global.css"
import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link, useRouter } from "expo-router"

const RootLayout = () => {
    const router = useRouter()
  return (
    <View>
      <Text>_layout</Text>
    </View>
  )
}

export default RootLayout