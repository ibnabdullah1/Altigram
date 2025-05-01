import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = () => {
  const router = useRouter();

  const handleStartChat = () => {
    router.push("/(home)/(tabs)");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#01534a" />

      <FontAwesome name="send" size={64} color="white" style={styles.icon} />
      <Text style={styles.title}>Welcome to Altigram</Text>
      <Text style={styles.subtitle}>
        Seamlessly connect and chat with friends, anytime, anywhere.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleStartChat}>
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>

      {/* Future: Add recent chats, notifications, or onboarding carousel */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01534a",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 16,
    color: "#d4f2ed",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: "#01534a",
    fontSize: 18,
    fontWeight: "600",
  },
});
