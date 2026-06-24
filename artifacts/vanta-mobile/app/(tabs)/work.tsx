import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const BASE_URL = process.env.EXPO_PUBLIC_DOMAIN
  ? `https://${process.env.EXPO_PUBLIC_DOMAIN}`
  : "";

const PROJECTS = [
  { id: "1", name: "Wood Pecker Bar", tags: "Web Design · Branding · UI/UX", location: "Lucknow", image: `${BASE_URL}/case-studies/woodpecker-bar.png` },
  { id: "2", name: "Hikari Modern Restaurant", tags: "Web Design · Branding · Motion", location: "Tokyo", image: `${BASE_URL}/case-studies/hikari-restaurant.jpg` },
  { id: "3", name: "5Monkey", tags: "Web Design · CMS · Branding", location: "Sonipat", image: `${BASE_URL}/case-studies/fivemonkey.png` },
  { id: "4", name: "Oreos Café & Bistro", tags: "Web Design · Menu UI · Branding", location: "India", image: `${BASE_URL}/case-studies/oreos-cafe.png` },
  { id: "5", name: "Focal", tags: "Product Design · SaaS · UI/UX", location: "Global", image: `${BASE_URL}/case-studies/focal/hero.webp` },
  { id: "6", name: "Vigil", tags: "Web App · Dashboard · Branding", location: "Global", image: `${BASE_URL}/case-studies/vigil/hero.webp` },
  { id: "7", name: "Sift", tags: "Web App · Data · UI/UX", location: "Global", image: `${BASE_URL}/case-studies/sift/hero.webp` },
  { id: "8", name: "Mal AI", tags: "AI Product · Branding · Motion", location: "Global", image: `${BASE_URL}/case-studies/mal-ai/banner.webp` },
];

type Project = typeof PROJECTS[0];

function WorkCard({ item }: { item: Project }) {
  const colors = useColors();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Haptics.selectionAsync();
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.98, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable onPress={handlePress} style={[styles.card, { borderBottomColor: colors.border }]} testID={`work-card-${item.id}`}>
        <View style={[styles.imageContainer, { backgroundColor: colors.card }]}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardMeta}>
            <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
              {item.name}
            </Text>
            <Feather name="arrow-up-right" size={16} color={colors.mutedForeground} />
          </View>
          <Text style={[styles.cardTags, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            {item.tags}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function WorkScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <FlatList
      data={PROJECTS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <WorkCard item={item} />}
      scrollEnabled={!!PROJECTS.length}
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 100 }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={[styles.header, { paddingTop: topPad + 24, borderBottomColor: colors.border }]}>
          <Text style={[styles.headerLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            SELECTED WORK
          </Text>
          <Text style={[styles.headerTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            {PROJECTS.length} Projects
          </Text>
          <Text style={[styles.headerNote, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            More of our work includes dashboards and on-going projects that we can't build full case studies for.
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  headerLabel: { fontSize: 11, letterSpacing: 2, marginBottom: 12 },
  headerTitle: { fontSize: 36, lineHeight: 42, marginBottom: 12 },
  headerNote: { fontSize: 13, lineHeight: 20 },
  card: { paddingHorizontal: 24, paddingVertical: 20, borderBottomWidth: 1 },
  imageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: { width: "100%", height: "100%" },
  cardContent: {},
  cardMeta: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 },
  cardTitle: { fontSize: 18, flex: 1, paddingRight: 8 },
  cardTags: { fontSize: 13 },
});
