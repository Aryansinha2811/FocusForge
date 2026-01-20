// src/Pages/Auth/SignUp.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import Google from "../../assets/Icons/Google.png";

export function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { signup, loginWithGoogle } = useAuth();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            await signup(email, password);
            // Navigation happens automatically in AuthContext
        } catch (err: any) {
            console.error("Signup error:", err);
            setError(err.message || "Failed to create account. Email may already be in use.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setIsLoading(true);
        setError("");

        try {
            await loginWithGoogle();
            // Navigation happens automatically in AuthContext
        } catch (err: any) {
            console.error("Google signup error:", err);
            setError(err.message || "Google sign up failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-hero font-bold mb-2">Get Started!</h2>
                <p className="text-foreground/70 font-paragraph">Create your account and start forging your focus</p>
            </div>

            {error && (
                <div className="p-4 bg-destructive/10 border-2 border-destructive rounded-base">
                    <p className="text-destructive text-sm font-button">{error}</p>
                </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="signup-email" className="font-button">Email</Label>
                    <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className="font-paragraph"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="signup-password" className="font-button">Password</Label>
                    <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="font-paragraph"
                    />
                    <p className="text-xs text-foreground/60 font-paragraph">Must be at least 6 characters</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="font-button">Confirm Password</Label>
                    <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                        className="font-paragraph"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full font-button font-bold text-lg"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-foreground/60 font-button">OR</span>
                </div>
            </div>

            <Button
                type="button"
                variant="neutral"
                className="w-full font-button font-bold text-lg"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
            >
                <img 
                    className="h-5 w-5"
                    src={Google} 
                    alt="Google" 
                />
                Continue with Google
            </Button>

            <p className="text-xs text-center text-foreground/60 font-paragraph">
                By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
        </div>
    );
}