import { useLocation } from "wouter";
import { useEffect } from "react";

export default function SignUpPage() {
  const [, navigate] = useLocation();
  useEffect(() => {
    navigate("/dashboard", { replace: true });
  }, [navigate]);
  return null;
}
