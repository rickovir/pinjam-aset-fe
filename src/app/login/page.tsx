import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in · PinjamAset" };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-canvas p-32">
      <LoginForm />
    </main>
  );
}