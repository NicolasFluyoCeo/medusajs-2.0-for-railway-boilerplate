import { Metadata } from "next"
import ContactsTemplate from "@modules/contacts/templates"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our team",
}

export default async function Contacts(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  return <ContactsTemplate countryCode={countryCode} />
}
