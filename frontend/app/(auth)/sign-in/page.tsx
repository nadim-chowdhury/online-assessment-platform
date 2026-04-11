"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signInSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInValues) => {
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.success("Signed in successfully!");

        // Fetch session to get role for redirect
        const { getSession } = await import("next-auth/react");
        const session = await getSession();
        const role = session?.user?.role;

        if (role === "employer") {
          router.push("/employer-dashboard");
        } else if (role === "candidate") {
          router.push("/candidate-dashboard");
        } else {
          router.push("/");
        }
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Heading */}
      <h2 className="mb-6 text-center text-xl font-bold text-foreground sm:mb-8 sm:text-2xl">
        Sign In
      </h2>

      {/* Card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="sign-in-email">Email/ User ID</Label>
            <Input
              id="sign-in-email"
              type="email"
              placeholder="Enter your email/User ID"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className="h-10 sm:h-11 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="sign-in-password">Password</Label>
            <div className="relative">
              <Input
                id="sign-in-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                className="h-10 pr-10 sm:h-11 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forget password link */}
          <div className="flex justify-end">
            <Link
              href="#"
              className="text-xs font-medium text-foreground transition-colors hover:text-accent sm:text-sm"
            >
              Forget Password?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:h-11"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Sign up link */}
        <p className="mt-5 text-center text-xs text-muted-foreground sm:text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-accent transition-colors hover:text-accent/80"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
