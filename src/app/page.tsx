import Header from "./components/Header";
import Banner from "./components/Banner";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen text-white">
      <Header />
      <Banner />
      <Experience />
      <About />
      <Projects />
      <section className="py-20 px-6 text-center" id="booking">
        <div className="container mx-auto max-w-4xl bg-gradient-to-r from-rose-950/40 via-blue-950/40 to-rose-950/40 p-10 rounded-3xl border border-rose-500/30 shadow-[0_0_30px_rgba(225,29,72,0.2)]">
          <h2 className="text-4xl font-bold text-white mb-6">Book a Slot / Contact Me</h2>
          <p className="text-xl text-white/80 mb-8">
            Ready to secure your cloud infrastructure or discuss a project? Reach out via email.
          </p>
          <a
            href="mailto:darkphoenix795x@gmail.com"
            className="inline-block px-8 py-4 bg-gradient-to-r from-rose-600 to-blue-600 text-white font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            Email Me: darkphoenix795x@gmail.com
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
