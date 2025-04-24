
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { startOfYear } from "date-fns";
import { CompanyDetailsForm } from "./auth/components/CompanyDetailsForm";
import { AccountingSettingsForm } from "./auth/components/AccountingSettingsForm";
import { registerSchema, type RegisterFormValues } from "./auth/schemas/registerSchema";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);

  const currentYear = new Date().getFullYear();
  const fiscalYearStart = startOfYear(new Date());
  const accountingStart = new Date();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      companyName: "",
      currency: "NGN",
      timezone: "Africa/Lagos",
      fiscalYearStart: fiscalYearStart,
      accountingStart: accountingStart,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login page after successful registration
      navigate("/login", { 
        state: { message: "Registration successful! Please sign in." } 
      });
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedLogo(event.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-wasper-primary">Wasper Business Hub</h1>
          <p className="text-gray-600 mt-2">Create your account to get started</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Create an account for your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <CompanyDetailsForm form={form} isLoading={isLoading} />
                <AccountingSettingsForm 
                  form={form} 
                  isLoading={isLoading}
                  handleLogoChange={handleLogoChange}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-wasper-secondary text-white hover:bg-wasper-accent"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-wasper-secondary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            powered by waspersolution.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
