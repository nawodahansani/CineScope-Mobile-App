import "./../global.css"
import React from 'react'
import { Slot, useRouter } from "expo-router"
import { AuthProvider } from "./../context/AuthContext"

const RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  )
}

export default RootLayout