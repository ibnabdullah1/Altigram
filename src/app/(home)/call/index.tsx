import { User } from "@stream-io/video-react-native-sdk";
import { Text } from "react-native";

export default function CallScreen() {
  const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;
  const userId = "547ae08d-c6f6-4cd0-963c-3270caafd094";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTQ3YWUwOGQtYzZmNi00Y2QwLTk2M2MtMzI3MGNhYWZkMDk0In0";
  const callId = "my-call-id";

  const user: User = { id: userId };

  // const client = new StreamVideoClient({ apiKey, user, token });
  // const call = client.call("default", callId);
  // call.join({ create: true });
  return <Text>Call Screen</Text>;
}
