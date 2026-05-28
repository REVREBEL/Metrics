import { useLocation } from "wouter";
import { useEffect } from "react";

export default function SignInPage() {
  const [, navigate] = useLocation();
  // Since we have no Clerk auth in this Vite build, redirect to dashboard
  useEffect(() => {
    navigate("/dashboard", { replace: true });
  }, [navigate]);
  return null;
}
