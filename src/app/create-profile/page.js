export default function CreateProfile() {
  // user variables that wont be in the form but will be in the database

  // all of these will use const
  // user id
  // user name
  // base health
  // base dps

  // counter colomn will be done elsewhere and item slots will be done via purchases from the shop

  // handle submit function
  // this handle submit will have const variables with formData parameter (formData.get("form element name")) and the sql query for the database

  return (
    <>
      <div className="text-center  p-3">
        <h1 className=" bg-slate-600 mb-10 rounded-xl">create profile page</h1>

        <p>username: clerk </p>
        <p>health: variable</p>
        <p>damage: variable</p>

        <form>
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
