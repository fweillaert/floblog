"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/app/lib/session";

export async function login(formData) {
  if (
    !(await bcrypt.compare(
      formData.get("password"),
      process.env.ADMIN_PASSWORD,
    ))
  ) {
    return {
      message: "Wrong password",
    };
  }

  await createSession();
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
