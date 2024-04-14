import { SignUp } from "@clerk/nextjs";
import React from "react";

function SignUpPage() {
  return (
    <SignUp
      appearance={{
        elements: {
          headerTitle: {
            color: "oklch(var(--bc))",
            fontWeight: 800,
            fontSize: "1.5rem",
          },
          headerSubtitle: {
            color: "oklch(var(--nc))",
            opacity: 0.8,
          },
          socialButtonsBlockButton: {
            backgroundColor: "oklch(var(--n))",
            color: "oklch(var(--nc))",
            paddingBlock: "1rem",
            borderRadius: "0.5rem",
            "&:hover": {
              backgroundColor: "oklch(var(--n))",
              opacity: 0.8,
            },
          },
          dividerLine: {
            backgroundColor: "oklch(var(--n))",
          },
          dividerText: {
            color: "oklch(var(--nc))",
          },
          formFieldLabel: {
            color: "oklch(var(--nc))",
          },
          formFieldInput: {
            backgroundColor: "oklch(var(--b2))",
            color: "oklch(var(--nc))",
            paddingBlock: "1rem",
            borderRadius: "0.5rem",
            borderColor: "oklch(var(--n))",
            "&:focus": {
              backgroundColor: "oklch(var(--b1))",
            },
          },
          card: {
            backgroundColor: "oklch(var(--b2))",
          },
          formButtonPrimary: {
            backgroundColor: "oklch(var(--p))",
            color: "oklch(var(--pc))",
            paddingBlock: "1.2rem",
            borderRadius: "0.5rem",
            "&:hover": {
              backgroundColor: "oklch(var(--p))",
              opacity: 0.8,
            },
          },
          formFieldErrorText: {
            color: "oklch(var(--er))",
          },
          formFieldInfoText: {
            color: "oklch(var(--nc))",
          },
          formFieldSuccessText: {
            color: "oklch(var(--nc))",
          },
          footerActionText: {
            color: "oklch(var(--nc))",
          },
          footerActionLink: {
            color: "oklch(var(--a))",
          },
        },
      }}
    />
  );
}

export default SignUpPage;
