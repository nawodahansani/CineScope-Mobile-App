import { View, ActivityIndicator } from 'react-native'
import { useAuth } from './../context/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { useEffect } from 'react';

const Index = () => {
  console.log("Index page...............................................");
  const router = useRouter();
  const {user, loading} = useAuth();
  console.log("user data : " ,user);

   useEffect(() => {
    if(!loading){
      if(user) {
        router.replace("/(dashboard)/home")
      } else {
        router.replace("/login")
      }
  }
  }, [user, loading])

  if(loading){
    return(
      <View className="flex-1 w-full justify-center align-items-center">
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return null
}

export default Index
