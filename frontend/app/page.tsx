import Features from "@/components/home/features";
import Header from "@/components/home/header";
import Intro from "@/components/home/intro";
import Pricing from "@/components/home/pricing";
import Scalability from "@/components/home/scalability";
import Subscribe from "@/components/home/subscribe";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <Intro />
        <Features />
        <Pricing />
        <Scalability />
        <Subscribe />
      </main>
      <Footer />
    </div>
  )
}
