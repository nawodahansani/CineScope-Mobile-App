import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          <Text className="text-white text-3xl font-bold mb-2">Create Account</Text>
          <Text className="text-[#D1D1D1] text-center">
            Join CineScope to discover amazing movies
          </Text>
        </View>

        {/* Form */}
        <View className="mb-8">
          {/* Name */}
          <View className="mb-4">
            <View className="flex-row items-center bg-[#0F3460] rounded-xl px-4 py-3 mb-2">
              <User color="#D1D1D1" size={20} />
              <TextInput
                className="flex-1 text-white ml-3"
                placeholder="Full Name"
                placeholderTextColor="#D1D1D1"
              />
            </View>
          </View>

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
          <View className="mb-4">
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

          {/* Confirm Password */}
          <View className="mb-6">
            <View className="flex-row items-center bg-[#0F3460] rounded-xl px-4 py-3 mb-2">
              <Lock color="#D1D1D1" size={20} />
              <TextInput
                className="flex-1 text-white ml-3"
                placeholder="Confirm Password"
                placeholderTextColor="#D1D1D1"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff color="#D1D1D1" size={20} />
                ) : (
                  <Eye color="#D1D1D1" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Signup Button */}
          <TouchableOpacity className="bg-[#E94560] rounded-xl py-4 mb-6 items-center">
            <Text className="text-white text-lg font-bold">Create Account</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row justify-center items-center mb-6">
            <View className="flex-1 h-px bg-[#0F3460]" />
            <Text className="text-[#D1D1D1] mx-4">or</Text>
            <View className="flex-1 h-px bg-[#0F3460]" />
          </View>

          {/* Social Signup */}
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

        {/* Back to Login */}
        <View className="flex-row justify-center">
          <Pressable onPress={() => router.back()}>
            <Text className="text-[#D1D1D1]">Already have an account? </Text>
            <Text className="text-[#E94560] font-bold">Sign In</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

export default Register;
