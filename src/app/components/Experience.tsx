import Image from "next/image";
import Link from "next/link";

interface ExperienceCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const experienceCards: ExperienceCard[] = [
  {
    id: 1,
    title: "Google Cloud Career Launchpad & Skills Boost",
    description: "Completed focused cloud engineering and architecture curriculum along with practical cloud infrastructure labs, badges, and technical milestones.",
    icon: "/cards/card-1.png",
  },
  {
    id: 2,
    title: "Competitive Problem Solving",
    description: "Active practice and algorithmic challenges on platforms like CodeChef and Kaggle.",
    icon: "/cards/card-2.png",
  },
  {
    id: 3,
    title: "Campus Ambassador @ Mosaique Pvt Ltd",
    description: "Represented brand initiatives, supported outreach campaigns, and drove student engagement across campus.",
    icon: "/cards/card-3.png",
  },
  {
    id: 4,
    title: "ACM Student Chapter",
    description: "Active student member and event organization/coordination team contributor.",
    icon: "/cards/card-4.png",
  },
  {
    id: 5,
    title: "IEEE Executive Committee",
    description: "Responsible for operational planning, event strategy, and technical workshop execution.",
    icon: "/cards/card-1.png",
  },
  {
    id: 6,
    title: "Conference Volunteering",
    description: "Supported event logistics and operations for the 50th All India Sociological Conference hosted at SRM University-AP.",
    icon: "/cards/card-2.png",
  },
];

export default function Experience(): React.JSX.Element {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
          Experience & Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experienceCards.map((card) => (
            <div
              key={card.id}
              className="bg-gradient-to-r from-slate-950 via-rose-950/30 to-blue-950/30 backdrop-blur-sm rounded-xl p-6 border-t-3 border-rose-700 hover:shadow-2xl hover:shadow-blue-900/50 flex items-center gap-4"
            >
              <div className="mb-4 ">
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </div>
              <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {card.title}
              </h3>
              <p className="text-white/70 text-sm mb-4">
                {card.description}
              </p>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors inline-block"
              >
                LEARN MORE →
              </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

