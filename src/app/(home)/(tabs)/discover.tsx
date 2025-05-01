import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import UserListItem from "../../../components/UserListItem";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../providers/AuthProvider";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user.id); // exclude me

      setUsers(profiles);
    };
    fetchUsers();
  }, []);
  return (
    <FlatList
      data={users}
      contentContainerStyle={{
        backgroundColor: "#F2F2F2",
        gap: 1,
      }}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
}
