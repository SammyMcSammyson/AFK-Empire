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
        <h1 className="flex justify-center m-5">posts</h1>
        <div className="flex justify-center">
          <Link
            className="m-4 bg-amber-600 bg-opacity-25 p-3 rounded-xl"
            href="/publicFeed?sort=asc"
          >
            sort ascending
          </Link>
          <Link
            className="m-4 bg-amber-600 bg-opacity-25 p-3 rounded-xl"
            href="/publicFeed?sort=desc"
          >
            sort descending
          </Link>
        </div>

        {wrangle.map((item) => {
          return (
            <div className="flex flex-col m-2 items-center" key={item.id}>
              <div className="flex">
                <p className="bg-blue-800 p-2  border-lime-50 border-2 rounded-xl">
                  {item.username}
                </p>
                <p
                  id={item.id}
                  className=" bg-slate-800 p-2 h-10 mt-0.5 rounded-xl text-purple-200"
                >
                  :{item.post_content}
                </p>
              </div>
              <div className="flex">
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
                  {user.id === item.user_id && <DelButton />}
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
