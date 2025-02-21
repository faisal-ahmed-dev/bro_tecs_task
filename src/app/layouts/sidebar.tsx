"use client"; // Mark as a client component if needed

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <a href="/" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li className="mb-2">
            <a href="/about" className="hover:text-gray-300">
              About
            </a>
          </li>
          <li className="mb-2">
            <a href="/contact" className="hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}