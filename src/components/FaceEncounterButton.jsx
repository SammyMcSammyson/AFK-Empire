"use client";
import Link
 from "next/link";

export default function EncounterButton(){

    return(
        <div>
       <Link href="/dungeon">
          <button className="mt-8 px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 hover:shadow-lg transition-all duration-300 animate-pulse">
            Face Encounter
          </button>
        </Link>

        </div>
    );
}