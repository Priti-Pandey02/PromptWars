import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-xl">PromptForge AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Sign In
          </Link>
          <Link
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            href="/signup"
          >
            Get Started
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Turn Your Skills Into Your Next Big Project.
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover personalized final-year project ideas and get AI-powered guidance from your first idea to a scalable real-world product.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  href="/signup"
                >
                  Generate My Project Ideas
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  href="#how-it-works"
                >
                  Explore How It Works
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-2">
                <h3 className="font-bold text-xl">AI Project Ideas</h3>
                <p className="text-gray-500">Personalized projects matching your exact skill level.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <h3 className="font-bold text-xl">Feasibility Analysis</h3>
                <p className="text-gray-500">Know beforehand how realistic your project is to build.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <h3 className="font-bold text-xl">Development Roadmaps</h3>
                <p className="text-gray-500">Structured tasks from start to finish.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <h3 className="font-bold text-xl">AI Technical Mentor</h3>
                <p className="text-gray-500">Context-aware chatbot for coding and architecture help.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2026 PromptForge AI. All rights reserved.</p>
      </footer>
    </div>
  )
}
