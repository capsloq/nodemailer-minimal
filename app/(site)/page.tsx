import { ContactCallToAction } from "@/app/components/contact/contact-call-to-action"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Home() {
   return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
         <ContactCallToAction
            button={<Button className="h-auto whitespace-normal break-words p-3">You can build the project with me here</Button>}
            title="Angebot anfordern"
            description="Lassen Sie uns wissen, wie wir Ihnen helfen können. Wir melden uns bei Ihnen."
         />
      </main>
   )
}
