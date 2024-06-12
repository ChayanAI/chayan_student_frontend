import '../styles/globals.css';

export default function InputLayout({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="w-full p-6 bg-white rounded-md shadow-md">
        {children}
      </main>
    </div>
  );
}
