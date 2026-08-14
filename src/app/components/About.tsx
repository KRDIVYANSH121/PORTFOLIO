import Image from "next/image";

export default function About(): React.JSX.Element {

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">About Me</h2>
          <p className="text-lg lg:text-xl max-w-4xl mx-auto text-white/90 leading-relaxed">
            I am a Computer Science and Engineering student at SRM University-AP with a passion for systems programming, Linux administration, and scalable cloud infrastructure. My technical foundation centers on C and core algorithms, combined with hands-on engagement in the Google Cloud ecosystem. Beyond coding, I actively contribute to technical campus communities through ACM and IEEE, coordinate large-scale academic events, and continuously expand my skill set through competitive problem-solving and cloud engineering programs.
          </p>
        </div>
        <Image 
          src="/assets/illustration.png"
          alt="Skills"
          width={800}
          height={800}
          className="object-cover mx-auto"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    </section>
  );
}

