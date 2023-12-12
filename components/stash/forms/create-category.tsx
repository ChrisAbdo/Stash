import React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addCategory } from "@/app/actions"

export default function CategoryForm({
  showNewCategoryDialog,
  setShowNewCategoryDialog,
}: any) {
  return (
    <form
      action={async (formData: FormData) => {
        const result = await addCategory(formData)
        if (result?.error) {
          toast.error(
            "Error creating category. Usually, this is because the category already exists."
          )
        } else {
          toast.success("Created category!")
          setShowNewCategoryDialog(false)
        }
      }}
      className="mt-4 flex gap-2"
    >
      <Input type="text" name="name" id="name" placeholder="ex: Design" />
      <Button type="submit">Submit</Button>
    </form>
  )
}
