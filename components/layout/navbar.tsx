import React from "react"
import Link from "next/link"
import { BackpackIcon } from "@radix-ui/react-icons"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth/auth-options"
import { Badge } from "@/components/ui/badge"
import { LoginModal } from "@/components/auth/login-modal"
import ProfileDropdown from "@/components/auth/profile-dropdown"
import { ModeToggle } from "@/components/layout/mode-toggle"

export async function Navbar() {
  const session = await getServerSession(authOptions)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        className="flex items-center justify-between px-3 py-3"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12">
          <Link href="/" className="flex items-center space-x-2">
            <BackpackIcon className="h-5 w-5 text-foreground" />
            <span className="overflow-auto font-semibold">Stash</span>
            <Badge variant="secondary" className="rounded-sm">
              Beta
            </Badge>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            {/* <Menu className="h-6 w-6" aria-hidden="true" /> */}
          </button>
        </div>
        <div className="flex items-center space-x-1">
          {session ? <ProfileDropdown /> : <LoginModal />}
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
