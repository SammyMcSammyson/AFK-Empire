import { SignInButton, SignUpButton } from "@clerk/nextjs";
export default function InitialPage() {
  return (
    <>
      <div className="flex flex-col justify-center" id="initial-page">
        <h1
          id="init-title"
          className="text-center mt-20 p-10 bg-purple-300 rounded-xl text-black font-bold text-xl"
        >
          Welcome to AFK Empire, a clicker game that'll have you earning money
          and fighting monsters. Please sign in to continue your journey
        </h1>
        <div
          id="sign-in"
          className="text-center mt-20 mb-20 px-6 py-2 bg-purple-800 text-white font-semibold rounded-lg hover:bg-purple-400 hover:shadow-lg transition-all"
        >
          <SignInButton mode="modal">sign in</SignInButton>
        </div>
        <div
          id="sign-up"
          className="text-center mt-10 mb-20 px-6 py-2 bg-purple-800 text-white font-semibold rounded-lg hover:bg-purple-400 hover:shadow-lg transition-all"
        >
          <SignUpButton>sign up</SignUpButton>
        </div>
      </div>
    </>
  );
}
