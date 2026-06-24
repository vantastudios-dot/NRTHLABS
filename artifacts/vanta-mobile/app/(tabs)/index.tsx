import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const { width } = Dimensions.get("window");

const STATS = [
  { value: "$250M+", label: "Capital raised\nby our clients" },
  { value: "-65%", label: "Backlog cleared\nin under 8 weeks" },
  { value: "40+", label: "Products shipped\nglobally" },
];

const PROCESS_STEPS = [
  { number: "01", title: "Discover", description: "We embed deep to understand your product, users, and business goals." },
  { number: "02", title: "Architect", description: "Systems, flows, and design language aligned before a single pixel is placed." },
  { number: "03", title: "Build", description: "Rapid, high-quality execution. Design and engineering in lockstep." },
  { number: "04", title: "Ship", description: "Launch-ready delivery with ongoing iteration support." },
];

function StatCard({ value, label }: { value: string; label: string }) {
  const colors = useColors();
  return (
    <View style={[styles.statCard, { borderColor: colors.border, backgroundColor: colors.card }]}>
      <Text style={[styles.statValue, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>{label}</Text>
    </View>
  );
}

function ProcessStep({ step, index }: { step: typeof PROCESS_STEPS[0]; index: number }) {
  const colors = useColors();
  return (
    <View style={[styles.processStep, { borderTopColor: colors.border }]}>
      <Text style={[styles.processNumber, { color: colors.primary, fontFamily: "Inter_400Regular" }]}>{step.number}</Text>
      <View style={styles.processContent}>
        <Text style={[styles.processTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>{step.title}</Text>
        <Text style={[styles.processDescription, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>{step.description}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handleCtaPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.96, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.hero, { paddingTop: topPad + 24 }]}>
        <View style={styles.heroBadge}>
          <View style={[styles.heroDot, { backgroundColor: colors.primary }]} />
          <Text style={[styles.heroBadgeText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            Design & Engineering Studio
          </Text>
        </View>

        <Text style={[styles.heroHeading, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          We build{"\n"}
          <Text style={{ color: colors.primary }}>world-class</Text>
          {"\n"}digital products.
        </Text>

        <Text style={[styles.heroSubtitle, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          Vanta Studios is an independent design and engineering studio focused on craft, speed, and long-term impact.
        </Text>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Pressable
            style={[styles.ctaButton, { backgroundColor: colors.foreground }]}
            onPress={handleCtaPress}
            testID="cta-button"
          >
            <Text style={[styles.ctaText, { color: colors.background, fontFamily: "Inter_600SemiBold" }]}>View our work</Text>
            <Feather name="arrow-up-right" size={16} color={colors.background} />
          </Pressable>
        </Animated.View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={styles.statsSection}>
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>BY THE NUMBERS</Text>
        <View style={styles.statsGrid}>
          {STATS.map((stat) => (
            <StatCard key={stat.value} value={stat.value} label={stat.label} />
          ))}
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={styles.processSection}>
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>OUR APPROACH</Text>
        <Text style={[styles.sectionHeading, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          How we work
        </Text>
        {PROCESS_STEPS.map((step, i) => (
          <ProcessStep key={step.number} step={step} index={i} />
        ))}
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={[styles.closingSection, { borderColor: colors.border }]}>
        <Text style={[styles.closingText, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          Ready to build something great?
        </Text>
        <Text style={[styles.closingSubtext, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          We take on a limited number of projects each quarter to ensure quality.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { paddingHorizontal: 24, paddingBottom: 40 },
  heroBadge: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 28 },
  heroDot: { width: 6, height: 6, borderRadius: 3 },
  heroBadgeText: { fontSize: 12, letterSpacing: 0.5 },
  heroHeading: { fontSize: 44, lineHeight: 50, marginBottom: 20 },
  heroSubtitle: { fontSize: 15, lineHeight: 24, marginBottom: 32 },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    alignSelf: "flex-start",
  },
  ctaText: { fontSize: 15 },
  divider: { height: 1, marginHorizontal: 24, marginVertical: 8 },
  statsSection: { paddingHorizontal: 24, paddingVertical: 32 },
  sectionLabel: { fontSize: 11, letterSpacing: 2, marginBottom: 20 },
  statsGrid: { gap: 12 },
  statCard: {
    padding: 20,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  statValue: { fontSize: 36, lineHeight: 40, minWidth: 90 },
  statLabel: { fontSize: 14, lineHeight: 20, flex: 1 },
  processSection: { paddingHorizontal: 24, paddingVertical: 32 },
  sectionHeading: { fontSize: 28, lineHeight: 34, marginBottom: 24 },
  processStep: { paddingVertical: 20, borderTopWidth: 1, flexDirection: "row", gap: 16 },
  processNumber: { fontSize: 12, letterSpacing: 1, width: 28, paddingTop: 3 },
  processContent: { flex: 1 },
  processTitle: { fontSize: 17, marginBottom: 6 },
  processDescription: { fontSize: 14, lineHeight: 22 },
  closingSection: { marginHorizontal: 24, marginVertical: 32, padding: 28, borderWidth: 1 },
  closingText: { fontSize: 24, lineHeight: 30, marginBottom: 12 },
  closingSubtext: { fontSize: 14, lineHeight: 22 },
});
