
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const AuthButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" asChild>
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link to="/register">Register</Link>
      </Button>
    </div>
  );
};
