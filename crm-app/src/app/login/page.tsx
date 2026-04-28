"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  Mail, 
  Lock, 
  Loader2, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Authentication Failed", {
          description: "Invalid email or password. Please try again.",
        });
      } else {
        toast.success("Welcome back!", {
          description: "Logging you into 12xDesk...",
        });
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden p-4">
      {/* Abstract Background Decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-electric/10 blur-[120px] rounded-full" />
      
      <div className="w-full max-w-[400px] z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-electric flex items-center justify-center shadow-2xl shadow-primary/20 mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">12xDesk</h1>
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest mt-1">
            Real Estate CRM
          </p>
        </div>

        <Card className="glass-card border-border/50 shadow-2xl backdrop-blur-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-muted/30 border-border/50 h-11 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-muted/30 border-border/50 h-11 focus:ring-primary/50"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isPending}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all active:scale-[0.98] mt-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3 text-emerald-glow" />
              Secure Enterprise Encryption
            </div>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          &copy; 2024 12xDesk. All rights reserved.
        </p>
      </div>
    </div>
  );
}
