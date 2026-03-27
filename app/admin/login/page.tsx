import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tighter">Panel de Administración</h1>
          <p className="text-slate-500 mt-2">Ingresa tus credenciales para continuar</p>
        </div>

        <LoginForm />

        <p className="text-xs text-slate-400 text-center mt-6">
          Área restringida. Solo personal autorizado.
        </p>
      </div>
    </div>
  );
}