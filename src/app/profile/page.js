import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";

export default async function Profile() {
  const user = await currentUser();

  const userInfo = await db.query(
    `SELECT * FROM user_info WHERE user_id = $1`,
    [user.id]
  );
  const uiw = userInfo.rows;

  //   console.log(uiw);

  return (
    <>
      <h1> profile</h1>
      {uiw.map((item) => {
        return (
          <div key={item.id}>
            <p>username: {item.user_name}</p>
            <p>avatar: {item.characternumber}</p>
            <p>bio: {item.user_bio}</p>
            <p>health: {item.health}</p>
            <p>damage: {item.dps}</p>
            <p>counter: {item.counter}</p>
            <div>
              <p>your Gear:</p>
              <p>{item.itemslot_1}</p>
              <p>{item.itemslot_2}</p>
              <p>{item.itemslot_3}</p>
              <p>{item.itemslot_4}</p>
              <p>{item.itemslot_5}</p>
            </div>
          </div>
        );
      })}
      <Link href={"/create-profile"}>Edit profile</Link>
    </>
  );
}
