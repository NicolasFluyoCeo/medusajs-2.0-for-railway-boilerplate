import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your NG Soccer Gloves account.",
}

export default function Login() {
  return <LoginTemplate />
}
