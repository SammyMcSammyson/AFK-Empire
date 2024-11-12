import LandingPage from "../components/LandingPage.jsx";
import EncounterButton from "@/components/FaceEncounterButton.jsx";
import Image from "next/image";
import waterfall from "@/../public/waterfall.jpg";

export default function Homepage() {
  return (
    <div className="relative text-white min-h-screen flex flex-col items-center justify-center -z-10">
      <Image
        src={waterfall}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="-z-10"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gray opacity-90 -z-10"></div>

      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse mb-4 tracking-wider">
        AFK EMPIRE
      </h1>
      <p className="text-lg text-gray-300 max-w-lg text-center mb-8">
        Welcome. Collect money. Upgrade your Gear. Defeat the Boss. Simple.
      </p>
      <LandingPage />
      <EncounterButton />
    </div>
  );
}
