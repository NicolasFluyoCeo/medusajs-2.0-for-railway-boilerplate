import { Metadata } from "next"
import ContactsTemplate from "@modules/contacts/templates"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our team",
}

export default async function Contacts({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  return <ContactsTemplate countryCode={countryCode} />
} 