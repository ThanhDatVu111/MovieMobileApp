import { Tabs } from "expo-router";

const _Layout = () => {
  return (
    // Tab layout that manages navigation inside the (tabs) folder; hides headers for all tab screens
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="save"
        options={{
          title: "Savee",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Searchh",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _Layout;