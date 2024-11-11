"use client";
import Link
 from "next/link";

export default function EncounterButton(){

    return(
        <>
       <Link href="/dungeon">
          <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Face Encounter
          </button>
        </Link>

        </>
    );
}