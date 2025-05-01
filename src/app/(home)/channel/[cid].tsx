import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Channel as ChannelType } from "stream-chat";
import {
  Channel,
  MessageInput,
  MessageList,
  ThemeProvider,
  useChatContext,
} from "stream-chat-expo";

export default function ChannelScreen() {
  const theme = {
    messageList: {
      container: {
        backgroundColor: "transparent",
      },
    },
    messageSimple: {
      content: {
        textContainer: {
          backgroundColor: "white",
        },
      },
    },
    messageInput: {
      cooldownTimer: {
        container: {
          backgroundColor: "red",
        },
        text: { color: "white" },
      },
    },
  };
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const { cid } = useLocalSearchParams<{ cid: string }>();
  const { client } = useChatContext();

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid });

      if (channels.length > 0) {
        const selectedChannel = channels[0];
        await selectedChannel.watch(); // member info আনবে
        setChannel(selectedChannel);
      }
    };

    fetchChannel();
  }, [cid]);

  if (!channel) {
    return <ActivityIndicator />;
  }

  // Other member খুঁজে বের করা
  const members = Object.values(channel.state.members || {});
  const otherMember = members.find((m) => m.user?.id !== client.userID);
  const displayName = otherMember?.user?.name || "Chat";
  const IMAGE_URI =
    "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png";

  return (
    <ThemeProvider style={theme}>
      <Channel channel={channel} audioRecordingEnabled>
        <ImageBackground
          style={{ flex: 1, backgroundColor: "#01534a" }}
          source={{
            uri: IMAGE_URI,
          }}
        >
          <Stack.Screen
            options={{
              title: displayName,
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerTitleStyle: {
                color: "white",
              },
              headerRight: () => (
                <Ionicons name="call" size={20} color="white" />
              ),
              headerStyle: {
                backgroundColor: "#01534a",
              },
            }}
          />

          <View style={{ flex: 2 }}>
            <MaskedView
              style={{ flex: 1 }}
              maskElement={
                <LinearGradient
                  colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
                  style={{
                    flex: 1,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  locations={[0, 0.5]}
                />
              }
            >
              <MessageList EmptyStateIndicator={() => <View />} />
            </MaskedView>
          </View>
          <SafeAreaView edges={["bottom"]}>
            <MessageInput />
          </SafeAreaView>
        </ImageBackground>
      </Channel>
    </ThemeProvider>
  );
}
