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
            color: "oklch(var(--bc))",
            opacity: 0.8,
          },
          socialButtonsBlockButton: {
            backgroundColor: "oklch(var(--b3))",
            color: "oklch(var(--bc))",
            paddingBlock: "1rem",
            borderRadius: "var(--rounded-btn, 0.5rem)",
            "&:hover": {
              backgroundColor: "oklch(var(--b2))",
              opacity: 0.8,
            },
          },
          dividerLine: {
            backgroundColor: "oklch(var(--n))",
          },
          dividerText: {
            color: "oklch(var(--bc))",
          },
          formFieldLabel: {
            color: "oklch(var(--bc))",
          },
          formFieldInput: {
            backgroundColor: "oklch(var(--b2))",
            color: "oklch(var(--bc))",
            paddingBlock: "1rem",
            borderRadius: "var(--rounded-btn, 0.5rem)",
            borderColor: "oklch(var(--n))",
            "&:focus": {
              backgroundColor: "oklch(var(--b1))",
            },
          },
          card: {
            backgroundColor: "oklch(var(--b1))",
          },
          formButtonPrimary: {
            backgroundColor: "oklch(var(--p))",
            color: "oklch(var(--pc))",
            paddingBlock: "1.2rem",
            borderRadius: "var(--rounded-btn, 0.5rem)",
            "&:hover": {
              backgroundColor: "oklch(var(--p))",
              opacity: 0.8,
            },
          },
          formFieldErrorText: {
            color: "oklch(var(--er))",
          },
          formFieldInfoText: {
            color: "oklch(var(--bc))",
          },
          formFieldSuccessText: {
            color: "oklch(var(--bc))",
          },
          footerActionText: {
            color: "oklch(var(--bc))",
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
