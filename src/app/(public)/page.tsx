"use client";
import dynamic from "next/dynamic";

// Lazy load components
const HeroSection = dynamic(
  () => import("@/features/home-page/components/HeroSection"),
);
const FAQSection = dynamic(
  () => import("@/features/home-page/components/FAQSection"),
);
const DownloadAppSection = dynamic(
  () => import("@/features/home-page/components/DownloadAppSection"),
);
const CTASection = dynamic(
  () => import("@/features/home-page/components/CTASection"),
);
const CampusSection = dynamic(
  () => import("@/features/home-page/components/CampusSection"),
);

const JoinAsOwnerSection = dynamic(
  () => import("@/features/home-page/components/JoinAsOwnerSection"),
);
import AnimateSection from "@/components/common/AnimatedSection";
import FeaturesSection from "@/features/home-page/components/FeaturesSection";
import KostRecomendedSection from "@/features/home-page/components/KostRecomendedSection";
import CitySection from "@/features/home-page/components/CitySection";
import { useAuthStore } from "@/stores/auth.store";
import { usePreference } from "@/features/preference/hooks/usePreference";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isAuthenticated } = useAuthStore();
  const { preferences } = usePreference();
  const router = useRouter();

  const canShowRecommendations =
    isAuthenticated && user?.role === "tenant" && preferences.data;

  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) return;
    router.push(`/kosts?search=${encodeURIComponent(keyword)}`);
  };

  return (
    <>
      <div className="bg-gray-50">
        {/* <Navbar /> */}

        <AnimateSection id="hero" forceAnimate>
          <HeroSection onSearch={handleSearch} />
        </AnimateSection>

        {canShowRecommendations && (
          <AnimateSection id="recomended">
            <KostRecomendedSection />
          </AnimateSection>
        )}
        <AnimateSection id="city">
          <CitySection />
        </AnimateSection>

        <AnimateSection id="campus">
          <CampusSection />
        </AnimateSection>

        <AnimateSection id="features">
          <FeaturesSection />
        </AnimateSection>

        <AnimateSection id="join-as-owner">
          <JoinAsOwnerSection />
        </AnimateSection>

        <AnimateSection id="faq">
          <FAQSection />
        </AnimateSection>

        <AnimateSection id="download-app">
          <DownloadAppSection />
        </AnimateSection>

        <AnimateSection id="cta">
          <CTASection />
        </AnimateSection>
      </div>
    </>
  );
}
