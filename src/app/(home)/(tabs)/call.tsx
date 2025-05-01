import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
const callData = [
  {
    id: "1",
    name: "Mizko & Karencheng",
    time: "23 January, 10:53 pm",
    direction: "incoming",
    type: "video",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
  },
  {
    id: "2",
    name: "Danlok",
    time: "23 January, 10:35 pm",
    direction: "outgoing",
    type: "video",
    avatar: "https://randomuser.me/api/portraits/men/27.jpg",
  },
  {
    id: "3",
    name: "Shiny",
    time: "23 January, 10:33 pm",
    direction: "incoming",
    type: "voice",
    avatar: "https://randomuser.me/api/portraits/men/24.jpg",
  },
  {
    id: "4",
    name: "Kimalban",
    time: "23 January, 10:29 pm",
    direction: "outgoing",
    type: "video",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "5",
    name: "Mizko",
    time: "23 January, 8:46 pm",
    direction: "incoming",
    type: "voice",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: "6",
    name: "Maureen",
    time: "23 January, 8:18 pm",
    direction: "incoming",
    type: "voice",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: "7",
    name: "Kalypso",
    time: "23 January, 7:49 pm",
    direction: "outgoing",
    type: "video",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: "8",
    name: "Alyssa",
    time: "22 January, 9:12 pm",
    direction: "incoming",
    type: "video",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: "9",
    name: "Zayn",
    time: "22 January, 7:50 pm",
    direction: "outgoing",
    type: "voice",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    id: "10",
    name: "Emma Watson",
    time: "21 January, 11:13 am",
    direction: "incoming",
    type: "video",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
  },
];

const CallList = () => {
  const renderItem = ({ item }) => (
    <Pressable style={styles.itemContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.subRow}>
          <MaterialCommunityIcons
            name={
              item.direction === "incoming"
                ? "arrow-bottom-left"
                : "arrow-top-right"
            }
            size={14}
            color={item.direction === "incoming" ? "green" : "red"}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
      <View style={styles.icon}>
        {item.type === "video" ? (
          <Ionicons name="videocam" size={20} color="#1dd05d" />
        ) : (
          <Ionicons name="call" size={20} color="#1dd05d" />
        )}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={callData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CallList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "600",
  },
  subRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  time: {
    color: "#aaa",
    fontSize: 13,
  },
  icon: {
    marginLeft: 8,
  },
});
