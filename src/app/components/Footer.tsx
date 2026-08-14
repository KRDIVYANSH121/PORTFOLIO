import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaGoogle } from "react-icons/fa";

export default function Footer(): React.JSX.Element {
  return (
    <footer id="contact" className="py-10  px-6 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Contact
          </h2>
          <p className="text-md text-white/80 max-w-2xl mx-auto mb-8">
            I&apos;m currently looking to join a cross-functional team that values 
            improving people&apos;s lives through accessible design, or have a project 
            in mind? Let&apos;s connect.
          </p>
          <a
            href="mailto:darkphoenix795x@gmail.com"
            className="text-md text-rose-400 hover:text-rose-300 transition-colors"
          >
            darkphoenix795x@gmail.com
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center flex-wrap gap-4 lg:gap-6 mt-12">
          <Link
            href="https://github.com/KRDIVYANSH121"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-rose-500/30 hover:border-blue-500/50 transition-all group"
            aria-label="GitHub"
          >
            <FaGithub className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/k-r-divyansh-66abb436a/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-rose-500/30 hover:border-blue-500/50 transition-all group"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </Link>

          <Link
            href="https://www.instagram.com/krdivyansh.dev?igsh=MWpjZ3htcmVieDR4dA=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-rose-500/30 hover:border-blue-500/50 transition-all group"
            aria-label="Instagram"
          >
            <FaInstagram className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </Link>

          <Link
            href="https://youtube.com/@krdivyansh-dev?si=czOVTqqZ4yJIJ1GO"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-rose-500/30 hover:border-blue-500/50 transition-all group"
            aria-label="YouTube"
          >
            <FaYoutube className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </Link>

          <Link
            href="https://www.skills.google/public_profiles/ca212786-8826-4d02-8a4f-eddac2c4d21d"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-rose-500/30 hover:border-blue-500/50 transition-all group"
            aria-label="Google Skills"
          >
            <FaGoogle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </Link>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-white/10">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Divyansh K R. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

