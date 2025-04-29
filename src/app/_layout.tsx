import { Slot } from "expo-router";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthProvider from "../providers/AuthProvider";

export default function RootLayout() {
  useEffect(() => {
    const run = async () => {
      if (Platform.OS === "android") {
        await PermissionsAndroid.requestMultiple([
          "android.permission.POST_NOTIFICATIONS",
          "android.permission.BLUETOOTH_CONNECT",
          "android.permission.RECORD_AUDIO",
        ]);
      }
    };
    run();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
