import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
    return (
        <main className="relative">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Gallery />
            <Contact />
            <Footer />
        </main>
    );
}
