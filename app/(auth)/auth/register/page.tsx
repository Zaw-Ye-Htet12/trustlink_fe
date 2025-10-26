"use client";

import { useState } from "react";
import { useRegister } from "@/hooks/useRegister";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, UserPlus, Users, Briefcase, Home } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const {
    onRegisterSubmit,
    isRegisterLoading,
    registerForm: form,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TL</span>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-br from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              TrustLink
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Join TrustLink</h1>
          <p className="text-gray-600 mt-2">
            Create your account and start connecting
          </p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create Account
            </CardTitle>
            <CardDescription className="text-center">
              Choose your role and fill in your details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onRegisterSubmit)}
                className="space-y-4"
              >
                {/* Role Selection */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I want to join as:</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div>
                            <RadioGroupItem
                              value="customer"
                              id="customer"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="customer"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                            >
                              <Users className="mb-3 h-6 w-6" />
                              Customer
                              <span className="text-sm text-muted-foreground text-center">
                                Looking for services
                              </span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="agent"
                              id="agent"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="agent"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                            >
                              <Briefcase className="mb-3 h-6 w-6" />
                              Agent
                              <span className="text-sm text-muted-foreground text-center">
                                Providing services
                              </span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          type="tel"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Create a password"
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="h-11 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-br from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600"
                  disabled={isRegisterLoading}
                >
                  {isRegisterLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Home className="w-4 h-4 mr-1" />
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
