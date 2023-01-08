import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import Navigation from "./src/navigation";
import {
  useFonts,
  Sora_600SemiBold as SoraSemiBold,
  Sora_700Bold as SoraBold,
  Sora_400Regular as SoraRegular,
  Sora_500Medium as SoraMedium,
  Sora_300Light as SoraLight,
  Sora_200ExtraLight as SoraExtraLight,
} from "@expo-google-fonts/sora";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./types";

export default function App() {
  const [fontsLoaded] = useFonts({
    SoraSemiBold,
    SoraBold,
    SoraRegular,
    SoraMedium,
    SoraLight,
    SoraExtraLight,
  });

  if (!fontsLoaded) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar style="auto" />
        <Navigation />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
