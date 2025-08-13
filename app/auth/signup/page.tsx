import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="bg-gray-900 p-6 sm:p-8 rounded-lg shadow-xl max-w-md w-full">
        <Logo/>
        <h2 className="text-center text-gray-500 mb-8">Create your account and enjoy the experience</h2>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:border-green-500"
              type="email"
              id="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:border-green-500"
              type="password"
              id="password"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md text-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center text-gray-400">
          <p>or</p>
        </div>
        <button className="w-full mt-4 bg-gray-800 text-white py-[10px] rounded-md text-md font-semibold flex items-center justify-center gap-4 hover:bg-gray-700 transition duration-300">
          <Image src="/assets/googleLogo.png" alt="Google logo" width={24} height={24} />
          Continue with Google
        </button>
        <p className="mt-6 text-center text-gray-300 text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}