"use client";
import Link
 from "next/link";

export default function EncounterButton(){

    return(
        <>
       <Link href="/dungeon">
          <button className="bg-gradient-to-r from-purple-700 to-pink-600 text-white py-2 px-4 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:from-purple-500 hover:to-pink-500 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 
          focus:ring-opacity-50 animate-pulse">
            Face Encounter
          </button>
        </Link>

        </>
    );
}