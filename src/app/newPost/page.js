import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function NewPost() {
  const user = await currentUser();
  async function handleSave(formData) {
    "use server";
    const name = user.username;
    const post = formData.get("post");
    const userID = user.id;

    await db.query(
      `INSERT INTO user_posts (username, post_content, user_id) VALUES ($1, $2, $3)`,
      [name, post, userID]
    );

    revalidatePath("/publicFeed");
    redirect("/publicFeed");
  }
  return (
    <>
      <h1 className="text-center items-center justify-center bg-blue-500 bg-opacity-25 p-4 rounded-xl mt-10">
        new post
      </h1>
      <div className="flex flex-col justify-center text-center m-20">
        <form id="new-post" action={handleSave}>
          <label htmlFor="post">post</label>
          <br />
          <textarea
            className="post-comment"
            id="post"
            type="text"
            name="post"
            required
          />
          <br />
          <button
            className="px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 hover:shadow-lg transition-all text-center items-center"
            type="submit"
          >
            save post
          </button>
        </form>
      </div>
    </>
  );
}
