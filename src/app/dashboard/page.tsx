import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { getAIProvider } from "@/lib/ai/provider"

export default async function DashboardPage() {
  const provider = getAIProvider();
  // Call mock API for projects
  const projects = await provider.generateProjects({});

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back, Student</h1>
          <p className="text-gray-500">Here are your personalized project recommendations.</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline">Improve My Idea</Button>
          <Button>Generate New Ideas</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <Card key={project.id} className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <Badge variant={project.difficulty === 'Intermediate' ? 'default' : 'secondary'}>{project.difficulty}</Badge>
              </div>
              <CardDescription>{project.pitch}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Feasibility</span>
                  <span className="font-medium">{project.scores.feasibility}%</span>
                </div>
                <Progress value={project.scores.feasibility} className="h-2" />
                
                <div className="flex justify-between pt-2">
                  <span className="text-gray-500">Innovation</span>
                  <span className="font-medium">{project.scores.innovation}/10</span>
                </div>
                <Progress value={project.scores.innovation * 10} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Link href={`/projects/${project.id}`}>
                <Button variant="default">View Blueprint</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
