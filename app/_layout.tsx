import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    // Root stack layout controlling screen navigation; hides headers for both tabs and movie detail screens
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="movies/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}