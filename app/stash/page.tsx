import React from "react"
import { redirect } from "next/navigation"
import { prisma } from "@/prisma/db"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth/auth-options"
import { CategorySelector } from "@/components/stash/category-selector"
import { DisplayStash } from "@/components/stash/display-stash"

import { addBookmark, addCategory } from "../actions"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  const categories = await prisma.category.findMany()

  const bookmarks = await prisma.bookmark.findMany()

  return (
    <div className="mt-4">
      <CategorySelector categories={categories} />

      <div className="border" />

      <form action={addBookmark}>
        <label htmlFor="title">Name</label>
        <input type="text" name="title" id="title" />

        <label htmlFor="category">category</label>
        <input type="text" name="category" id="category" />

        <button type="submit">Submit</button>
      </form>

      <div className="mx-auto mt-4 max-w-xl">
        <DisplayStash bookmarks={bookmarks} categories={categories} />
      </div>
    </div>
  )
}
