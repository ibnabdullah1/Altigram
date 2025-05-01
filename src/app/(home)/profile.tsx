import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Avatar from "../../components/Avatar";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";

export default function ProfileScreen() {
  const { session } = useAuth();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, full_name`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setFullname(data.full_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
    full_name,
  }: {
    username: string;
    website: string;
    avatar_url: string;
    full_name: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        full_name,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Profile",
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerTitleStyle: {
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#01534a",
          },
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              style={{ marginLeft: 10 }}
              onPress={() => {
                router.back();
              }}
            />
          ),
        }}
      />
      <ScrollView style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Avatar
            size={200}
            url={avatarUrl}
            onUpload={(url: string) => {
              setAvatarUrl(url);
              updateProfile({
                username,
                website,
                avatar_url: url,
                full_name: fullName,
              });
            }}
          />
        </View>

        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input label="Email" value={session?.user?.email} disabled />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Full name"
            value={fullName || ""}
            onChangeText={(text) => setFullname(text)}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Username"
            value={username || ""}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Website"
            value={website || ""}
            onChangeText={(text) => setWebsite(text)}
          />
        </View>

        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title={loading ? "Loading ..." : "Update Profile"}
            onPress={() =>
              updateProfile({
                username,
                website,
                avatar_url: avatarUrl,
                full_name: fullName,
              })
            }
            disabled={loading}
          />
        </View>

        <View style={styles.verticallySpaced}>
          <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: "white",
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
