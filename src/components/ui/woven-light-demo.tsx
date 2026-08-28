import { WovenLightHero } from "@/components/ui/woven-light-hero";

export default function WovenLightDemo() {
  return (
    <WovenLightHero 
      headline="WHAT ARE YOU&#10;BUILDING NEXT ?"
      subheadline="Tell us what you're trying to build, improve or automate."
      onSubmit={(val) => console.log("Submitted:", val)}
      onStartProject={() => console.log("Start Project clicked")}
      onViewWork={() => console.log("View Work clicked")}
    />
  );
}
