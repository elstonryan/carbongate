import { AuthShell } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";

export default function SignInPage() {
  return (
    <AuthShell>
      <AuthForm mode="signin" />
    </AuthShell>
  );
}
