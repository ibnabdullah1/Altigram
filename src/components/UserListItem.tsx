import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useChatContext } from "stream-chat-expo";
import { useAuth } from "../providers/AuthProvider";

const UserListItem = ({ user }) => {
  const { client } = useChatContext();
  const { user: me } = useAuth();

  const onPress = async () => {
    try {
      // Create a new channel for chatting between current user and the selected user
      const channel = client.channel("messaging", {
        members: [me.id, user.id], // Both users must be in the channel
      });

      await channel.watch();
      console.log(channel);
      router.push(`/channel/${channel.cid}`);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      }}
    >
      <Image
        source={{
          uri: user?.avatar_url
            ? `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${user.avatar_url}`
            : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCX5TOKkOk3MBt8V-f8PbmGrdLHCi4BoUOs_yuZ1pekOp8U_yWcf40t66JZ4_e_JYpRTOVCl0m8ozEpLrs9Ip2Cm7kQz4fUnUFh8Jcv8fMFfPbfbyWEEKne0S9e_U6fWEmcz0oihuJM6sP1cGFqdJZbLjaEQnGdgJvcxctqhMbNw632OKuAMBMwL86/w640-h596/pp%20kosong%20wa%20default.jpg",
        }}
        style={{
          width: 45,
          height: 45,
          borderRadius: 25,
          marginRight: 12,
          backgroundColor: "#ccc",
        }}
      />

      <View>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          {user.full_name || "Unknown"}
        </Text>
      </View>
    </Pressable>
  );
};

export default UserListItem;
