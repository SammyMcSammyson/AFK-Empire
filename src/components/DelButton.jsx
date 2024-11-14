"use client";

import { useState } from "react";

export default function DelButton() {
  const [showInfo, SetShowInfo] = useState(false);

  function handleClick() {
    SetShowInfo(!showInfo);
  }

  return (
    <>
      {showInfo ? (
        <button
          className="text-white font-bold bg-red-500 p-1 rounded-xl"
          id="del-button"
          type="submit"
        >
          delete
        </button>
      ) : null}
      <p
        onClick={handleClick}
        className="m-3 px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 hover:shadow-lg transition-all"
      >
        X
      </p>
    </>
  );
}
