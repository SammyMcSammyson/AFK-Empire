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

  async function handleSave(formData) {
    "use server";
    const bio = formData.get("bio");
    const avatar = formData.get("player-avatar");
    await db.query(
      `INSERT INTO user_info (user_id, user_name, characternumber, health, dps, user_bio) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (user_id) DO UPDATE SET user_bio = EXCLUDED.user_bio, characternumber = EXCLUDED.characternumber, health = EXCLUDED.health, dps = EXCLUDED.dps`,
      [id, name, avatar, health, damage, bio]
    );

    revalidatePath("/profile");
    revalidatePath("/create-profile");
    redirect("/profile");
  }

  return (
    <>
      <div className="text-center  p-3">
        <h1 className=" bg-slate-600 mb-10 rounded-xl">create profile page</h1>

        <p>username: {user.username} </p>
        <p>health: {health}</p>
        <p>damage: {damage}</p>

        <form action={handleSave}>
          <label htmlFor="bio">bio:</label>

          <br />

          <textarea
            name="bio"
            id="bio"
            type="text"
            className="text-black m-2 p-2"
          />
          <br />
          <p>player avatar</p>
          <div>
            <label htmlFor="1">1</label>
            <input name="player-avatar" type="radio" id="1" value={1} />
            <p>image preview</p>
            <label htmlFor="2">2</label>
            <input name="player-avatar" type="radio" id="2" value={2} />
            <p>image preview</p>
            <label htmlFor="3">3</label>
            <input name="player-avatar" type="radio" id="3" value={3} />
            <p>image preview</p>
            <label htmlFor="4">4</label>
            <input name="player-avatar" type="radio" id="4" value={4} />
            <p>image preview</p>
            <label htmlFor="5">5</label>
            <input name="player-avatar" type="radio" id="5" value={5} />
            <p>image preview</p>
          </div>
          <button type="submit" className="m-10 bg-slate-500 p-2 rounded-xl">
            save profile
          </button>
        </form>
      </div>
    </>
  );
}
