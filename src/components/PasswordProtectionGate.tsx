import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const PASSWORD_KEY = import.meta.env.VITE_PASSWORD_KEY;

// Securely get the PIN from environment variables
const CORRECT_PIN = import.meta.env.VITE_CORRECT_PIN;

export function PasswordProtectionGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVerified, setIsVerified] = React.useState(false);
  const [pin, setPin] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const isVerifiedInStorage = localStorage.getItem(PASSWORD_KEY) === "true";
    if (isVerifiedInStorage) {
      setIsVerified(true);
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      localStorage.setItem(PASSWORD_KEY, "true");
      setIsVerified(true);
      setError("");
    } else {
      setError("Incorrect PIN. Please try again.");
    }
  };

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="blur-sm">{children}</div>
      <Dialog open={!isVerified} className="max-w-[200px]">
        <DialogContent className="sm:max-w-sm max-w-[200px]">
          <DialogHeader>
            <DialogTitle>A Private Collection of Memories</DialogTitle>
            <DialogDescription>
              This website is a private gift for Arthur and his family. Please
              enter the passcode to view the content.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePinSubmit} className="grid gap-4 py-4">
            <Input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="col-span-3"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit">Unlock</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
