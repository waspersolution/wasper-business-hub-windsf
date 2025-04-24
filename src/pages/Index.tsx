
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/contexts/SessionContext";

const Index = () => {
  const navigate = useNavigate();
  const { session } = useSession();

  useEffect(() => {
    // Redirect based on authentication status
    if (session.isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate, session.isAuthenticated]);

  // This content won't be visible as we redirect immediately
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Wasper Business Hub</h1>
        <p className="text-xl text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default Index;
