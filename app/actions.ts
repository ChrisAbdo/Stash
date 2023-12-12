"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/prisma/db"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"

let sessionCache: any = null

async function getSession() {
  if (!sessionCache) {
    sessionCache = await getServerSession(authOptions)
  }
  return sessionCache
}

export async function addCategory(formData: FormData) {
  const session = await getSession()

  const name = String(formData.get("name"))

  const authorId = session?.user.id

  try {
    await prisma.category.create({
      data: {
        name,
        userId: authorId,
      },
    })
  } catch (error: any) {
    return {
      error: error.message,
    }
  }
  revalidatePath("/stash")
}

export async function addBookmark(formData: FormData) {
  const session = await getSession()

  const title = String(formData.get("title"))
  const category = String(formData.get("category"))

  const authorId = session?.user.id

  try {
    await prisma.bookmark.create({
      data: {
        title,
        category,
        authorId,
      },
    })
  } catch (error: any) {
    return {
      error: error.message,
    }
  }
  revalidatePath("/stash")
}
