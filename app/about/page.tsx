import type { Metadata } from "next";
import StorySection from "@/components/StorySection";

export const metadata: Metadata = {
  title: "Our Story — Cook & CO",
  description: "How Cook & CO started, and why we choose every piece of crockery ourselves.",
};

export default function AboutPage() {
  return (
    <div className="pt-10">
      <StorySection />
    </div>
  );
}
