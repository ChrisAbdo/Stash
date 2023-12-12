"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { addCategory } from "@/app/actions"

import { Input } from "../ui/input"
import CategoryForm from "./forms/create-category"

export function CategorySelector({ categories }: { categories: any[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get("category")

  const [open, setOpen] = React.useState(false)
  const [showNewCategoryDialog, setShowNewCategoryDialog] =
    React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState("")

  return (
    <Dialog
      open={showNewCategoryDialog}
      onOpenChange={setShowNewCategoryDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {search ? search : "General"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search category..." className="h-9" />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {search ? (
                  <CommandItem
                    onSelect={() => {
                      setSelectedCategory("General")
                      router.push(`/stash/`)
                      setOpen(false)
                    }}
                  >
                    General
                  </CommandItem>
                ) : null}
                {categories.map((category) => (
                  <CommandItem
                    key={category.name}
                    onSelect={() => {
                      setSelectedCategory(category)
                      router.push(`/stash/?category=${category.name}`)
                      setOpen(false)
                    }}
                  >
                    {category.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        //   @ts-ignore
                        selectedCategory.name === category.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewCategoryDialog(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Category
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription>
            <CategoryForm
              showNewCategoryDialog={showNewCategoryDialog}
              setShowNewCategoryDialog={setShowNewCategoryDialog}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
