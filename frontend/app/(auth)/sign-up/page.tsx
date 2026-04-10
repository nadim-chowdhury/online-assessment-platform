"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.enum(["employer", "candidate"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "candidate",
    },
  });

  const onSubmit = async (data: SignUpValues) => {
    setIsSubmitting(true);

    // Mock registration — just redirect to sign-in with a toast
    try {
      // Simulate a short delay
      await new Promise((r) => setTimeout(r, 600));

      toast.success("Account created! Please sign in.");
      router.push("/sign-in");
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
        Sign Up
      </h2>

      {/* Card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="sign-up-name">Full Name</Label>
            <Input
              id="sign-up-name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              className="h-10 sm:h-11 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="sign-up-email">Email</Label>
            <Input
              id="sign-up-email"
              type="email"
              placeholder="Your primary email address"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className="h-10 sm:h-11 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="sign-up-role">Role</Label>
            <select
              id="sign-up-role"
              className="h-10 w-full rounded-md border border-input bg-transparent px-2.5 py-1 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 sm:h-11"
              {...register("role")}
            >
              <option value="candidate">Candidate</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="sign-up-password">Password</Label>
            <div className="relative">
              <Input
                id="sign-up-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
                className="h-10 pr-10 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 sm:h-11"
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="sign-up-confirm">Confirm Password</Label>
            <div className="relative">
              <Input
                id="sign-up-confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
                className="h-10 pr-10 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 sm:h-11"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
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
                Creating account…
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        {/* Sign in link */}
        <p className="mt-5 text-center text-xs text-muted-foreground sm:text-sm">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-accent transition-colors hover:text-accent/80"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
