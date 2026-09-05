"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function OnboardingWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  
  // Dummy state
  const [profile, setProfile] = useState({
    domain: "",
    experience: "",
    skills: [] as string[],
    interests: [] as string[],
    projectType: "",
    time: "",
    difficulty: ""
  })

  const handleNext = () => setStep((s) => Math.min(s + 1, 5))
  const handleBack = () => setStep((s) => Math.max(s - 1, 1))

  const handleComplete = () => {
    // In a real app we would call generateProjects API here, 
    // but we can just redirect to dashboard for the flow.
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Welcome to PromptForge AI</CardTitle>
          <CardDescription>Let's personalize your project recommendations.</CardDescription>
          <Progress value={(step / 5) * 100} className="mt-4" />
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Step 1: Academic Background</h2>
              <div className="space-y-2">
                <Label htmlFor="domain">Academic Domain (e.g. Computer Science)</Label>
                <Input 
                  id="domain" 
                  value={profile.domain}
                  onChange={(e) => setProfile({...profile, domain: e.target.value})}
                  placeholder="Computer Science" 
                />
              </div>
              <div className="space-y-2">
                <Label>Experience Level</Label>
                <div className="flex gap-4">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <Button 
                      key={level}
                      variant={profile.experience === level ? "default" : "outline"}
                      onClick={() => setProfile({...profile, experience: level})}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Step 2: Technical Skills</h2>
              <p className="text-sm text-gray-500">Select skills you are familiar with.</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Python', 'Java', 'SQL', 'MongoDB', 'AWS', 'Docker'].map((skill) => (
                  <Button
                    key={skill}
                    variant={profile.skills.includes(skill) ? "default" : "outline"}
                    onClick={() => {
                      const newSkills = profile.skills.includes(skill)
                        ? profile.skills.filter(s => s !== skill)
                        : [...profile.skills, skill]
                      setProfile({...profile, skills: newSkills})
                    }}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Step 3: Interests</h2>
              <p className="text-sm text-gray-500">What areas interest you the most?</p>
              <div className="flex flex-wrap gap-2">
                {['Artificial Intelligence', 'Healthcare', 'Education', 'Finance', 'E-Commerce', 'Cybersecurity'].map((interest) => (
                  <Button
                    key={interest}
                    variant={profile.interests.includes(interest) ? "default" : "outline"}
                    onClick={() => {
                      const newInterests = profile.interests.includes(interest)
                        ? profile.interests.filter(i => i !== interest)
                        : [...profile.interests, interest]
                      setProfile({...profile, interests: newInterests})
                    }}
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Step 4: Project Preferences</h2>
              <div className="space-y-2">
                <Label>Available Time</Label>
                <div className="flex flex-wrap gap-2">
                  {['2 Weeks', '1 Month', '3 Months'].map((time) => (
                    <Button 
                      key={time}
                      variant={profile.time === time ? "default" : "outline"}
                      onClick={() => setProfile({...profile, time: time})}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Desired Difficulty</Label>
                <div className="flex gap-4">
                  {['Beginner Friendly', 'Intermediate', 'Advanced'].map((diff) => (
                    <Button 
                      key={diff}
                      variant={profile.difficulty === diff ? "default" : "outline"}
                      onClick={() => setProfile({...profile, difficulty: diff})}
                    >
                      {diff}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="space-y-4 text-center py-8">
              <h2 className="text-2xl font-bold">You're all set!</h2>
              <p className="text-gray-500">We have everything we need to generate your personalized project ideas.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          {step < 5 ? (
            <Button onClick={handleNext}>Next Step</Button>
          ) : (
            <Button onClick={handleComplete}>Generate My AI Project Ideas ✨</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
