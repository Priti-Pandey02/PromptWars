"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const isMock = process.env.NEXT_PUBLIC_SUPABASE_URL === "[NEXT_PUBLIC_SUPABASE_URL]" || !process.env.NEXT_PUBLIC_SUPABASE_URL;

export async function login(formData: FormData) {
  if (isMock) {
    const cookieStore = await cookies();
    cookieStore.set("mock-session", "true");
    redirect("/dashboard");
  }
  // Otherwise use Supabase (omitted for brevity in mock fallback)
  // ...
}

export async function signup(formData: FormData) {
  if (isMock) {
    const cookieStore = await cookies();
    cookieStore.set("mock-session", "true");
    redirect("/onboarding");
  }
  // Otherwise use Supabase
  // ...
}

export async function logout() {
  if (isMock) {
    const cookieStore = await cookies();
    cookieStore.delete("mock-session");
    redirect("/");
  }
}
