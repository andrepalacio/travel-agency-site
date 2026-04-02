import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-50 to-elegant-beige/30">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-elegant-beige/50">
        <div className="text-center mb-8">
          <p className="title-accent">Expery Admin</p>
          <h1 className="title-h3 text-expery-blue mt-2">Iniciar sesión</h1>
          <p className="text-expery-iron mt-2">Ingresa tus credenciales para continuar</p>
        </div>

        <LoginForm />

        <p className="text-xs text-expery-iron text-center mt-6">
          Área restringida. Solo personal autorizado.
        </p>
      </div>
    </div>
  );
}