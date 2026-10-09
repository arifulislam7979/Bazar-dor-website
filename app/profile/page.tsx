"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, signOut, updateUser } from "@/lib/auth-client";
import { Form, Input, Label, TextField, Button } from "@heroui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user?.name) {
        setName(user.name);
      }
    });
    return ()=> clearTimeout(timer)
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/signin");
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম ফাঁকা রাখা যাবে না");
      return;
    }

    setLoading(true);
    try {
      await updateUser({
        name: name,
      });
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch {
      toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f4f7f4] flex items-center justify-center">
        <p className="text-sm font-semibold text-gray-500">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f4f7f4] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Card */}
        <div className="w-full bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={64}
                height={64}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover"
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#009944] text-white font-extrabold text-xl sm:text-2xl flex items-center justify-center">
                {user?.name?.charAt(0)}
              </div>
            )}

            <div className="flex flex-col">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                {user?.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            type="button"
            className="flex items-center gap-2 border border-red-300 text-red-500 hover:bg-red-50 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap"
          >
            <FaSignOutAlt className="text-xs rotate-180" />
            <span>সাইন আউট</span>
          </button>
        </div>

        {/* Info Update Form Card */}
        <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col gap-4">
          <h3 className="text-sm sm:text-base font-bold text-gray-900">তথ্য</h3>

          <Form className="flex flex-col gap-4" onSubmit={handleUpdateProfile}>
            <TextField className="flex flex-col gap-1.5 w-full">
              <Label className="text-xs font-bold text-gray-700">নাম</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009944] focus:bg-white transition-all text-gray-800 font-medium"
              />
            </TextField>

            <Button
              type="submit"
              className="w-full bg-[#009944] hover:bg-[#008039] text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-[0.99] text-xs sm:text-sm cursor-pointer mt-1"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </Button>
          </Form>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-gray-400 font-medium hover:text-gray-600 transition-colors"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
