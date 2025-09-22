import "./../global.css"
import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link, Slot, useRouter } from "expo-router"
import { AuthProvider } from "@/context/AuthContext"

const RootLayout = () => {
    const router = useRouter()
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  )
}

export default RootLayout