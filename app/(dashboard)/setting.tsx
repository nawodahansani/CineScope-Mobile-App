import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { User, Mail, Lock, LogOut, EyeOff, Eye } from "lucide-react-native";
import { useRouter } from "expo-router";

import { getCurrentUser, updateEmail, updatePassword, logout } from "@/services/authservice";
import { saveUserProfile, getUserProfile } from "@/services/userService";
import { getWatchlistCount } from "@/helpers/watchlist";

const Setting = () => {
    const router = useRouter();

    const [name, setName] = useState("Admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState(""); // ✅ New: for reauth
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [watchlistCount, setWatchlistCount] = useState(0);


    useEffect(() => {
        const loadUserData = async () => {
            const user = getCurrentUser();
            if (user) {
                setEmail(user.email || "");
                const profile = await getUserProfile();
                if (profile?.fullName) setName(profile.fullName);

                const count = await getWatchlistCount();
                setWatchlistCount(count);
            }
        };

        loadUserData();
    }, []);

    const handleSave = async () => {
        try {
            const user = getCurrentUser();
            const profile = await getUserProfile();

            let changes: string[] = [];

            if (!currentPassword) {
                Alert.alert("Error", "Please enter your current password for security.");
                return;
            }

            // ✅ Password change
            if (password || confirmPassword) {
                if (password !== confirmPassword) {
                    Alert.alert("Error", "Passwords do not match");
                    return;
                }
                await updatePassword(password, currentPassword);
                changes.push("Password");
                setPassword("");
                setConfirmPassword("");
            }

            // ✅ Email change
            if (email && user?.email && email !== user.email) {
                await updateEmail(email, currentPassword);
                changes.push("Email");
            }

            // ✅ Name change
            if (name && (!profile?.fullName || name !== profile.fullName)) {
                await saveUserProfile(name);
                changes.push("Name");
}

            if (changes.length > 0) {
                Alert.alert("Success", `${changes.join(", ")} updated successfully`);
            } else {
                Alert.alert("No Changes", "No updates were made");
            }
        } catch (error: any) {
            Alert.alert("Error", error.message || "Something went wrong while updating profile");
        }
    };

    const handleLogout = async () => {
        await logout();
        router.replace("/login");
    };

    return (
        <ScrollView className="flex-1 bg-[#1A1A2E]" contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1">
                {/* Profile Header */}
                <View className="items-center py-6">
                    <View className="w-24 h-24 rounded-full bg-[#0F3460] items-center justify-center mb-4">
                        <Text className="text-white text-3xl font-bold">
                            {name.split(" ").map(n => n[0]).join("")}
                        </Text>
                    </View>
                    <Text className="text-white text-xl font-bold">{name}</Text>
                    <Text className="text-[#D1D1D1] mt-1">{email}</Text>
                    <View className="flex-row mt-4">
                        <View className="items-center px-4 border-r border-l border-[#0F3460]">
                            <Text className="text-white text-lg font-bold">{watchlistCount}</Text>
                            <Text className="text-[#D1D1D1] text-sm">Watchlist</Text>
                        </View>
                    </View>
                </View>

                {/* Profile Form */}
                {activeTab === "profile" && (
                    <View className="px-4 mb-8">
                        {/* Name */}
                        <View className="mb-4">
                            <Text className="text-[#D1D1D1] mb-2 ml-1">Full Name</Text>
                            <View className="flex-row items-center bg-[#0F3460] rounded-xl px-4 py-3">
                                <User color="#D1D1D1" size={20} />
                                <TextInput
                                    className="flex-1 text-white ml-3"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        </View>

                        {/* Email */}
                        <View className="mb-4">
                            <Text className="text-[#D1D1D1] mb-2 ml-1">Email</Text>
                            <View className="flex-row items-center bg-[#0F3460] rounded-xl px-4 py-3">
                                <Mail color="#D1D1D1" size={20} />
                                <TextInput
                                    className="flex-1 text-white ml-3"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                        </View>

                        {/* Current Password */}
                        <View className="mb-4">
                            <Text className="text-[#D1D1D1] mb-2 ml-1">Current Password</Text>
                            <View className="flex-row items-center bg-[#0F3460] rounded-xl px-4 py-3">
                                <Lock color="#D1D1D1" size={20} />
                                <TextInput
                                    className="flex-1 text-white ml-3"
                                    secureTextEntry={!showPassword}
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                />
                            </View>
                        </View>

                        {/* Password */}
                        <View className="mb-4">
                            <Text className="text-[#D1D1D1] mb-2 ml-1">New Password</Text>
                            <View className="flex-row items-center bg-[#0F3460] rounded-xl px-4 py-3">
                                <Lock color="#D1D1D1" size={20} />
                                <TextInput
                                    className="flex-1 text-white ml-3"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye color="#D1D1D1" size={20} /> : <EyeOff color="#D1D1D1" size={20} />}
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Confirm Password */}
                        <View className="mb-6">
                            <Text className="text-[#D1D1D1] mb-2 ml-1">Confirm New Password</Text>
                            <View className="flex-row items-center bg-[#0F3460] rounded-xl px-4 py-3">
                                <Lock color="#D1D1D1" size={20} />
                                <TextInput
                                    className="flex-1 text-white ml-3"
                                    secureTextEntry={!showPassword}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                            </View>
                        </View>

                        <TouchableOpacity className="bg-[#E94560] rounded-xl py-4 items-center" onPress={handleSave}>
                            <Text className="text-white text-lg font-bold">Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Logout */}
                <View className="px-4 pb-8">
                    <TouchableOpacity className="bg-[#0F3460] rounded-xl py-4 items-center flex-row justify-center" onPress={handleLogout}>
                        <LogOut color="#E94560" size={20} />
                        <Text className="text-[#E94560] text-lg font-bold ml-2">Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Setting;
