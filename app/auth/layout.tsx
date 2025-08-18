import Logo from "@/components/Logo"
import { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="bg-gray-900 border-1 border-gray-600 p-6 sm:p-8 rounded-lg shadow-xl max-w-md w-full">
        <Logo/>
        <div className="pt-4">
          { children }
        </div>
      </div>
    </div>
  )
}

export default AuthLayout