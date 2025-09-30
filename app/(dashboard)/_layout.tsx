import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'; 


const tabs: { label: string; name: string; icon: "home-outline" | "list-outline" | "person-outline" | "settings-outline" }[] = [
    {label: "Home", name: "home", icon: "home-outline"},
    {label: "Tasks", name: "tasks", icon: "list-outline"},
    {label: "Profile", name: "profile", icon: "person-outline"},
    {label: "Setting", name: "setting", icon: "settings-outline"}
]

const DashboardLayout = () => {
  return (
    <Tabs>
        {tabs.map(({ label, name, icon }) => (
            <Tabs.Screen 
            key={name}
            name={name}
            options={{
                title: label,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name={icon} size={size} color={color} />
                )
            }}
        />
        ))}
    </Tabs>
  )
}

export default DashboardLayout