'use client'

import { loginAdmin } from "@/app/admin/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function LoginForm() {
  const [pending, setPending] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setPending(true)
    try {
      await loginAdmin(formData)
    } catch (error) {
      setPending(false)
      alert('Credenciales inválidas')
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">Usuario</Label>
        <Input 
          id="username" 
          name="username" 
          type="text" 
          required 
          placeholder="admin"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input 
          id="password" 
          name="password" 
          type="password" 
          required 
          placeholder="••••••••"
          className="w-full"
        />
      </div>

      <Button type="submit" className="w-full bg-classic-gold hover:bg-classic-gold/90" disabled={pending}>
        {pending ? "Verificando..." : "Iniciar Sesión"}
      </Button>
    </form>
  )
}