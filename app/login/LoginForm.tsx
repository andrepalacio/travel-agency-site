'use client'

import { loginAdmin } from "@/app/admin/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function LoginForm() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setPending(true)
    setError(null)
    try {
      await loginAdmin(formData)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Credenciales inválidas')
      setPending(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          required 
          placeholder="admin@ejemplo.com"
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

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      <Button type="submit" className="w-full bg-expery-blue hover:bg-expery-blue/90" disabled={pending}>
        {pending ? "Verificando..." : "Iniciar Sesión"}
      </Button>
    </form>
  )
}