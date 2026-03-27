'use client'

import { ReactNode } from "react"
import { EditorProvider } from "@/context/EditorContext"
import { HomeData } from "@/types/home"

export function AdminShell({ 
  children, 
  initialData 
}: { 
  children: ReactNode
  initialData: HomeData 
}) {
  return (
    <EditorProvider initialData={initialData}>
      {children}
    </EditorProvider>
  )
}