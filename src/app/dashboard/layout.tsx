import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gray-50">
      <aside className="w-full md:w-64 bg-white border-r flex flex-col">
        <div className="h-14 flex items-center border-b px-4">
          <Link href="/dashboard" className="font-bold text-lg">PromptForge AI</Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2 text-sm font-medium">
            <li>
              <Link href="/dashboard" className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100">
                Dashboard Overview
              </Link>
            </li>
            <li>
              <Link href="/dashboard/projects" className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100">
                My Projects
              </Link>
            </li>
            <li>
              <Link href="/improve-idea" className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100">
                Improve Idea
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-14 flex items-center border-b bg-white px-4 lg:px-6">
          <div className="ml-auto">
            <form action="/api/logout" method="POST">
              <button className="text-sm font-medium hover:underline text-gray-500">Sign Out</button>
            </form>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
