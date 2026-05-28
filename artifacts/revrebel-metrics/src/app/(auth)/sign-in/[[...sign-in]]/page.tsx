import { useLocation } from "wouter"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [, navigate] = useLocation()
  return (
    <div className="flex h-screen w-full items-center justify-center -mt-16">
      <div className="flex flex-col items-center gap-4">
        <p className="text-muted-foreground">Authentication not configured.</p>
        <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
      </div>
    </div>
  )
}
