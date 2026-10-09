"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { Form, Input, Label, TextField, Button } from "@heroui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "sonner";

export default function SigninPage() {
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await signIn.email({
      email: userData.email as string,
      password: userData.password as string,
      rememberMe: true,
      callbackURL: '/'
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন ইন করতে সমস্যা হয়েছে");
    }
    if (data) {
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f7f4] flex flex-col items-center justify-center p-4">
      {/* Top Heading */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
          সাইন ইন
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <Form className="flex flex-col gap-4" onSubmit={handleSignin}>
          {/* Email Field */}
          <TextField
            
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "সঠিক ইমেইল অ্যাড্রেস দিন";
              }
              return null;
            }}
          >
            <Label className="text-xs font-bold text-gray-700">ইমেইল</Label>
            <Input
              placeholder="ইমেইল"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009944] focus:bg-white transition-all"
            />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            autoComplete="new-password"
            name="password"
            type="password"
            className="flex flex-col gap-1.5"
          >
            <Label className="text-xs font-bold text-gray-700">
              পাসওয়ার্ড
            </Label>
            <Input
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009944] focus:bg-white transition-all"
            />
          </TextField>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#009944] hover:bg-[#008039] text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-[0.99] mt-2 text-xs sm:text-sm"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </Button>
        </Form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="border-t border-gray-200 w-full" />
          <span className="bg-white px-3 text-[11px] text-gray-400 font-medium absolute">
            অথবা
          </span>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 py-2.5 px-3 rounded-xl text-xs font-bold text-gray-700 transition-colors cursor-pointer"
          >
            <span className="text-[#4285F4]">
              <FaGoogle />
            </span>
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 py-2.5 px-3 rounded-xl text-xs font-bold text-gray-700 transition-colors cursor-pointer"
          >
            <span className="text-[#181717]">
              <FaGithub />
            </span>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        {/* Account Create Link */}
        <p className="text-center text-xs text-gray-500 font-medium mt-6">
          অ্যাকাউন্ট নেই?
          <Link
            href="/signup"
            className="text-[#009944] font-bold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      {/* Back to Home Link */}
      <Link
        href="/"
        className="text-xs text-gray-400 font-medium hover:text-gray-600 mt-6 transition-colors"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
