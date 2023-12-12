"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Command } from "cmdk"

import { Badge } from "@/components/ui/badge"
import { addBookmark } from "@/app/actions"

import { Button } from "../ui/button"
import { IconArrowElbow } from "../ui/icons"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"

export function DisplayStash({
  bookmarks,
  categories,
}: {
  bookmarks: any[]
  categories: any[]
}) {
  const searchParams = useSearchParams()
  const search = searchParams.get("category")
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [inputValue, setInputValue] = React.useState("")

  const [pages, setPages] = React.useState<string[]>(["general"])
  const activePage = pages[pages.length - 1]
  const isHome = activePage === "home"

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (isHome || inputValue.length) {
        return
      }
    },
    [inputValue.length, isHome]
  )

  function bounce() {
    if (ref.current) {
      ref.current.style.transform = "scale(0.96)"
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = ""
        }
      }, 100)

      setInputValue("")
    }
  }

  return (
    <div className="vercel rounded-xl border">
      <div className="p-2">
        <div>
          {pages.map((i) => (
            <Badge key={i} variant="secondary" className="rounded-sm">
              {search ? search : "General"}
            </Badge>
          ))}
        </div>
        <form action={addBookmark} className="mt-2 flex gap-2">
          <Input
            autoFocus
            type="text"
            name="title"
            id="title"
            placeholder="Enter URL or plain text"
          />
          <Input
            type="hidden"
            name="category"
            id="category"
            value={search ? search : "General"}
          />
          <Button type="submit" size="icon">
            <IconArrowElbow />
          </Button>
        </form>
      </div>
      <Separator className="mt-1" />
      <Command ref={ref}>
        <Command.Input
          placeholder="Search..."
          onValueChange={(value) => {
            setInputValue(value)
          }}
        />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          {activePage === "general" && <Home bookmarks={bookmarks} />}
        </Command.List>
      </Command>
    </div>
  )
}

function Home({ bookmarks }: { bookmarks: any[] }) {
  return (
    <>
      <Command.Group heading="Stash" className="w-full">
        {bookmarks.map((bookmark) => (
          <Item key={bookmark.id}>
            <div className="flex w-full items-center justify-between">
              {bookmark.title}
              <Badge className="rounded-sm">{bookmark.category}</Badge>
            </div>
          </Item>
        ))}
      </Command.Group>
    </>
  )
}

function Item({
  children,
  shortcut,
  onSelect = () => {},
}: {
  children: React.ReactNode
  shortcut?: string
  onSelect?: (value: string) => void
}) {
  return (
    <Command.Item onSelect={onSelect}>
      {children}
      {shortcut && (
        <div cmdk-vercel-shortcuts="">
          {shortcut.split(" ").map((key) => {
            return <kbd key={key}>{key}</kbd>
          })}
        </div>
      )}
    </Command.Item>
  )
}
