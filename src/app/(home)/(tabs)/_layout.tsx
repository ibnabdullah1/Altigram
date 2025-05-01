// import { FontAwesome5, Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";
// export default function TabsNavigator() {
//   return (
//     <Tabs>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Chats",
//           tabBarIcon: ({ size, color }) => (
//             <FontAwesome5 name="home" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="calls"
//         options={{
//           title: "Calls",
//           tabBarIcon: ({ size, color }) => (
//             <Ionicons name="call" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ size, color }) => (
//             <FontAwesome5 name="user-alt" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { router, withLayoutContext } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

export default function Layout() {
  const { Navigator } = createMaterialTopTabNavigator();
  const Tabs = withLayoutContext(Navigator);

  return (
    <View style={{ flex: 1 }}>
      {/* Custom Header */}
      <View
        style={{
          backgroundColor: "#01534a",
          paddingVertical: 20,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={require("../../../../assets/images/altigram.png")}
          style={{ width: 120, height: 40, resizeMode: "contain" }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <TouchableOpacity onPress={() => console.log("Search")}>
            <Ionicons name="search" size={24} color="#f2f2f2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace("/(home)/profile")}>
            <FontAwesome6 name="user" size={20} color="#f2f2f2" />
          </TouchableOpacity>
        </View>
      </View>

      <Tabs
        id="top-tabs"
        screenOptions={{
          tabBarShowIcon: false,
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "600",
            textTransform: "capitalize",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "white",
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: "#01534a",
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#ccc",
        }}
      >
        <Tabs.Screen
          name="index" // corresponds to index.tsx (Chat)
          options={{
            title: "Chat",
          }}
        />
        <Tabs.Screen
          name="call" // corresponds to call.tsx
          options={{
            title: "Call",
          }}
        />
        <Tabs.Screen
          name="discover" // corresponds to discover.tsx
          options={{
            title: "Discover",
          }}
        />
      </Tabs>
    </View>
  );
}
