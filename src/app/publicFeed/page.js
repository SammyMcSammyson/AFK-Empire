import Link from "next/link";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import DelButton from "@/components/DelButton";

export default async function PublicFeed({ searchParams }) {
  const user = await currentUser();
  const SP = await searchParams;
  const Data = await db.query("SELECT * FROM user_posts");
  const wrangle = Data.rows;

  if (SP.sort === "desc") {
    wrangle.reverse();
  }

  return (
    <>
      <div>
        <h1 className="flex items-center justify-center mt-10 bg-blue-500 bg-opacity-25 p-4 rounded-xl">
          posts
        </h1>
        <div className="flex justify-center">
          <Link
            className="m-4 bg-blue-700 bg-opacity-25 p-3 rounded-xl"
            href="/publicFeed?sort=asc"
          >
            sort ascending
          </Link>
          <Link
            className="m-4  bg-blue-700 bg-opacity-25 p-3 rounded-xl"
            href="/publicFeed?sort=desc"
          >
            sort descending
          </Link>
        </div>

        {wrangle.map((item) => {
          return (
            <div
              className="flex flex-col items-center bg-slate-600 bg-opacity-30 p-10 m-5 rounded-3xl"
              key={item.id}
            >
              <div className="flex flex-col bg-slate-400 p-3 rounded-xl bg-opacity-50">
                <p className="bg-blue-800 p-2  border-lime-50 border-2 rounded-xl text-center">
                  {item.username}:
                </p>
                <p
                  id={item.id}
                  className=" bg-slate-800 m-3 p-2 mt-0.5 rounded-xl text-purple-200 text-center"
                >
                  {item.post_content}
                </p>
              </div>
              <div className="flex bg-slate-800 p-3 rounded-xl bg-opacity-50">
                <div className="flex">
                  <Link
                    href={`publicFeed/${item.id}`}
                    className="flex m-2 bg-purple-950 p-1.5 rounded-2xl w-40 justify-center items-center"
                  >
                    leave a comment
                  </Link>
                </div>
                <form
                  action={async function handleDel() {
                    "use server";
                    console.log(`delete`);
                    await db.query(
                      `DELETE FROM user_posts WHERE id = ${item.id}`
                    );

                    revalidatePath("/publicFeed");
                  }}
                >
                  <div className="flex flex-row-reverse">
                    {user.id === item.user_id && <DelButton />}
                  </div>
                </form>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center">
          <div className="px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 hover:shadow-lg transition-all text-center items-center">
            <Link href={"/newPost"}>add a new Post</Link>
          </div>
        </div>
      </div>
    </>
  );
}
