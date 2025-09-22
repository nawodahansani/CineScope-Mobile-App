import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import { router, useRouter } from 'expo-router';

export default function LoginScreen() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView 
      className="flex-1 bg-[#1A1A2E]"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 justify-center px-6 py-12">
        {/* Header */}
        <View className="items-center mb-10">
          <View className="w-24 h-24 rounded-full bg-[#E94560] items-center justify-center mb-6">
            <Text className="text-white text-3xl font-bold">CS</Text>
          </View>
          <Text className="text-white text-3xl font-bold mb-2">
            Welcome Back
          </Text>
          <Text className="text-[#D1D1D1] text-center">
            Sign in to continue your movie journey
          </Text>
        </View>

        {/* Form */}
        <View className="mb-8">
          {/* Email */}
          <View className="mb-4">
            <View className="flex-row items-center bg-[#0F3460] rounded-xl px-4 py-3 mb-2">
              <Mail color="#D1D1D1" size={20} />
              <TextInput
                className="flex-1 text-white ml-3"
                placeholder="Email"
                placeholderTextColor="#D1D1D1"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-6">
            <View className="flex-row items-center bg-[#0F3460] rounded-xl px-4 py-3 mb-2">
              <Lock color="#D1D1D1" size={20} />
              <TextInput
                className="flex-1 text-white ml-3"
                placeholder="Password"
                placeholderTextColor="#D1D1D1"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff color="#D1D1D1" size={20} />
                ) : (
                  <Eye color="#D1D1D1" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <View className="items-end mb-6">
            <TouchableOpacity>
              <Text className="text-[#E94560] font-medium">Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity className="bg-[#E94560] rounded-xl py-4 mb-6 items-center">
            <Text className="text-white text-lg font-bold">Sign In</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row justify-center items-center mb-6">
            <View className="flex-1 h-px bg-[#0F3460]" />
            <Text className="text-[#D1D1D1] mx-4">or</Text>
            <View className="flex-1 h-px bg-[#0F3460]" />
          </View>

          {/* Social Buttons */}
          <View className="flex-row justify-center mb-8">
            <TouchableOpacity className="bg-[#0F3460] rounded-full p-3 mx-2">
              <Text className="text-white font-bold">G</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#0F3460] rounded-full p-3 mx-2">
              <Text className="text-white font-bold">f</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#0F3460] rounded-full p-3 mx-2">
              <Text className="text-white font-bold">in</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-center">
            <Pressable onPress={() => router.push('/register')}>
                <Text className="text-[#D1D1D1]">Don't have an account? 
                    <Text className="text-[#E94560] font-bold">Sign Up</Text></Text>
            </Pressable>
        </View>

      </View>
    </ScrollView>
  );
}
