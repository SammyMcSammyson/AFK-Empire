import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";

export default async function CreateProfile() {
  const user = await currentUser();
  const id = user.id;
  const name = user.username;
  const health = 100;
  const damage = 10;
  const counter = 0;

  async function handleSave(formData) {
    "use server";
    const bio = formData.get("bio");
    const avatar = formData.get("player-avatar");
    await db.query(
      `INSERT INTO user_info (user_id, user_name, characternumber, health, dps, user_bio, counter) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (user_id) DO UPDATE SET user_bio = EXCLUDED.user_bio, characternumber = EXCLUDED.characternumber, health = EXCLUDED.health, dps = EXCLUDED.dps`,
      [id, name, avatar, health, damage, bio, counter]
    );

    revalidatePath("/profile");
    revalidatePath("/create-profile");
    redirect("/profile");
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Create Profile</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-yellow-400">Username:</p>
          <p className="text-white">{user.username}</p>
          <p className="text-lg font-semibold text-yellow-400 mt-2">Health:</p>
          <p className="text-white">{health}</p>
          <p className="text-lg font-semibold text-yellow-400 mt-2">Damage:</p>
          <p className="text-white">{damage}</p>
        </div>

        <form className="space-y-4" action={handleSave}>
          <div>
            <label htmlFor="bio" className="text-yellow-400 font-semibold">Bio:</label>
            <textarea
              name="bio"
              id="bio"
              rows="3"
              className="w-full mt-2 p-2 text-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Tell us about yourself..."
            />
          </div>

          <p className="text-yellow-400 font-semibold">Player Avatar</p>
          <div className="flex justify-center space-x-4 my-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} className="text-center">
                <input
                  type="radio"
                  name="player-avatar"
                  value={num}
                  className="hidden peer"
                />
                <div className="p-2 border-2 border-gray-600 rounded-lg cursor-pointer hover:border-yellow-400 peer-checked:border-yellow-400 transition duration-300">
                  <img src={`/images/av${num}.png`} width={50} alt={`Avatar ${num}`} />
                  <span className="text-sm mt-2 text-yellow-400">{num}</span>
                </div>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 hover:shadow-lg transition duration-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
