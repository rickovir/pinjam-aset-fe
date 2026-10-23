"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Alert } from "@/components/molecules/Alert";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { roleHome, roles, roleLabels, type Role } from "@/lib/roles";

/**
 * Demo sign-in. There is no auth backend — picking a role writes the role
 * cookie and lands on that role's home screen.
 */
export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("employee");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  return (
    <div className="flex w-440 max-w-full flex-col gap-24 rounded-card border border-border-default bg-card-bg p-32">
      <div className="flex flex-col gap-8">
        <span className="flex size-48 items-center justify-center rounded-card bg-action-primary text-text-inverse">
          <Icon name="package" size="lg" />
        </span>
        <h1 className="text-3xl font-bold">Sign in to PinjamAset</h1>
        <p className="text-sm text-text-secondary">
          Use your work account to request and manage equipment loans.
        </p>
      </div>

      {error ? (
        <Alert type="error" title="Could not sign in">
          Check the email address and try again.
        </Alert>
      ) : null}

      <form
        className="flex flex-col gap-16"
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.includes("@")) {
            setError(true);
            return;
          }
          document.cookie = `pa-role=${role}; path=/; max-age=31536000; samesite=lax`;
          router.push(roleHome[role]);
          router.refresh();
        }}
      >
        <Input
          type="text"
          label="Work email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
          }}
        />

        <Input
          type="select"
          label="Demo role"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {roleLabels[r]}
            </option>
          ))}
        </Input>

        <Button variant="primary" type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </div>
  );
}