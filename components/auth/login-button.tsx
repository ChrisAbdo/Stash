"use client"

import * as React from "react"
import { signIn } from "next-auth/react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { IconGitHub, IconSpinner } from "@/components/ui/icons"

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean
  text?: string
}

export function LoginButton({
  text = "Login with GitHub",
  showGithubIcon = true,
  className,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true)
        signIn("github", { callbackUrl: `/stash` })
      }}
      disabled={isLoading}
      className="w-full"
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGithubIcon ? (
        <IconGitHub className="mr-2" />
      ) : null}
      {text}
    </Button>
  )
}

export function GoogleLoginButton({
  text = "Login with Google",
  showGithubIcon = true,
  className,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true)
        signIn("google", { callbackUrl: `/stash` })
      }}
      disabled={isLoading}
      className="w-full"
      {...props}
    >
      {isLoading ? <IconSpinner className="mr-2 animate-spin" /> : null}
      {text}
    </Button>
  )
}
