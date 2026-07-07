import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useRef } from "react";
import {
  Animated,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const SERVICES = [
  {
    id: "starter",
    label: "Starter",
    price: "$8,000",
    period: "/ month",
    description: "For early-stage teams that need design velocity.",
    features: [
      "Up to 2 active streams",
      "Weekly design reviews",
      "Figma source files",
      "48hr turnaround",
    ],
    highlight: false,
  },
  {
    id: "growth",
    label: "Growth",
    price: "$16,000",
    period: "/ month",
    description: "For funded teams scaling design and engineering together.",
    features: [
      "Up to 4 active streams",
      "Dedicated design engineer",
      "Daily async standups",
      "24hr turnaround",
      "Engineering handoff",
    ],
    highlight: true,
  },
  {
    id: "scale",
    label: "Scale",
    price: "Custom",
    period: "",
    description: "For enterprise teams with complex multi-product needs.",
    features: [
      "Unlimited streams",
      "Embedded team",
      "On-site workshops",
      "Priority access",
      "Custom SLAs",
    ],
    highlight: false,
  },
];

function PricingCard({ service }: { service: typeof SERVICES[0] }) {
  const colors = useColors();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  const bgColor = service.highlight ? colors.foreground : colors.card;
  const textColor = service.highlight ? colors.background : colors.foreground;
  const subColor = service.highlight ? (colors.background + "99") : colors.mutedForeground;
  const borderColor = service.highlight ? "transparent" : colors.border;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={handlePress}
        style={[styles.pricingCard, { backgroundColor: bgColor, borderColor }]}
        testID={`pricing-${service.id}`}
      >
        {service.highlight && (
          <View style={[styles.popularBadge, { backgroundColor: colors.primary }]}>
            <Text style={[styles.popularText, { color: colors.primaryForeground, fontFamily: "Inter_600SemiBold" }]}>
              MOST POPULAR
            </Text>
          </View>
        )}
        <Text style={[styles.pricingLabel, { color: subColor, fontFamily: "Inter_500Medium" }]}>
          {service.label}
        </Text>
        <View style={styles.pricingRow}>
          <Text style={[styles.pricingValue, { color: textColor, fontFamily: "Inter_700Bold" }]}>
            {service.price}
          </Text>
          {service.period ? (
            <Text style={[styles.pricingPeriod, { color: subColor, fontFamily: "Inter_400Regular" }]}>
              {service.period}
            </Text>
          ) : null}
        </View>
        <Text style={[styles.pricingDesc, { color: subColor, fontFamily: "Inter_400Regular" }]}>
          {service.description}
        </Text>
        <View style={[styles.featureDivider, { backgroundColor: service.highlight ? "rgba(0,0,0,0.15)" : colors.border }]} />
        {service.features.map((feat) => (
          <View key={feat} style={styles.featureRow}>
            <Feather name="check" size={13} color={service.highlight ? colors.primary : colors.primary} style={{ marginTop: 2 }} />
            <Text style={[styles.featureText, { color: textColor, fontFamily: "Inter_400Regular" }]}>{feat}</Text>
          </View>
        ))}
      </Pressable>
    </Animated.View>
  );
}

export default function ContactScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const handleEmail = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL("mailto:hello@nrthlabs.in");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { paddingTop: topPad + 24 }]}>
        <Text style={[styles.headerLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          PRICING & CONTACT
        </Text>
        <Text style={[styles.headerTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          Simple,{"\n"}transparent{"\n"}pricing.
        </Text>
        <Text style={[styles.headerNote, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          Subscription-based retainers. No surprise invoices. Pause or cancel anytime.
        </Text>
      </View>

      <View style={styles.pricingList}>
        {SERVICES.map((service) => (
          <PricingCard key={service.id} service={service} />
        ))}
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={styles.contactSection}>
        <Text style={[styles.contactHeading, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          Have a project in mind?
        </Text>
        <Text style={[styles.contactNote, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          We respond to all inquiries within 24 hours. Let's build something great together.
        </Text>

        <Pressable
          onPress={handleEmail}
          style={[styles.emailButton, { backgroundColor: colors.foreground }]}
          testID="contact-email"
        >
          <Feather name="mail" size={16} color={colors.background} />
          <Text style={[styles.emailText, { color: colors.background, fontFamily: "Inter_600SemiBold" }]}>
            hello@nrthlabs.in
          </Text>
        </Pressable>

        <View style={styles.socialRow}>
          {["Twitter", "LinkedIn", "Dribbble"].map((platform) => (
            <Pressable
              key={platform}
              style={[styles.socialChip, { borderColor: colors.border }]}
              onPress={() => Haptics.selectionAsync()}
            >
              <Text style={[styles.socialText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                {platform}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 24, paddingBottom: 32 },
  headerLabel: { fontSize: 11, letterSpacing: 2, marginBottom: 16 },
  headerTitle: { fontSize: 44, lineHeight: 50, marginBottom: 16 },
  headerNote: { fontSize: 15, lineHeight: 24 },
  pricingList: { paddingHorizontal: 16, gap: 12, marginBottom: 8 },
  pricingCard: {
    padding: 24,
    borderWidth: 1,
  },
  popularBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 16,
  },
  popularText: { fontSize: 10, letterSpacing: 1 },
  pricingLabel: { fontSize: 12, letterSpacing: 1, marginBottom: 8 },
  pricingRow: { flexDirection: "row", alignItems: "baseline", gap: 4, marginBottom: 12 },
  pricingValue: { fontSize: 40, lineHeight: 44 },
  pricingPeriod: { fontSize: 14 },
  pricingDesc: { fontSize: 14, lineHeight: 22, marginBottom: 4 },
  featureDivider: { height: 1, marginVertical: 16 },
  featureRow: { flexDirection: "row", gap: 10, marginBottom: 10, alignItems: "flex-start" },
  featureText: { fontSize: 14, lineHeight: 20, flex: 1 },
  divider: { height: 1, marginHorizontal: 24, marginVertical: 8 },
  contactSection: { paddingHorizontal: 24, paddingVertical: 32 },
  contactHeading: { fontSize: 26, lineHeight: 32, marginBottom: 12 },
  contactNote: { fontSize: 15, lineHeight: 24, marginBottom: 28 },
  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 22,
    paddingVertical: 14,
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  emailText: { fontSize: 15 },
  socialRow: { flexDirection: "row", gap: 10 },
  socialChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  socialText: { fontSize: 13 },
});
