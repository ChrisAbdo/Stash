import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { GoogleLoginButton, LoginButton } from "@/components/auth/login-button"

export function LoginModal() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Get Started</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Login to Stash</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <LoginButton />
            <GoogleLoginButton />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
