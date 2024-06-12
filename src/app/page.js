import Link from 'next/link'

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-lexend">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-700">Welcome to Chayan.AI</h1>
        <div className="mt-6 space-y-4">
          <Link href="/login" className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Login
          </Link>
          <Link href="/dashboard" className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Dashboard
          </Link>
          <Link href="/interview" className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Interview
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
