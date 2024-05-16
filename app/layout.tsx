import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ContactCallToAction } from "@/app/components/contact/contact-call-to-action"
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <nav className="h-24 bg-gray-100 flex justify-end px-4 items-center">
               <ContactCallToAction
                  button={
                     <Button className="h-12 whitespace-normal break-words p-3">
                        If some-child exports runtime="edge" and i am here in the layout, the build fails
                     </Button>
                  }
                  title="Angebot anfordern"
                  description="Lassen Sie uns wissen, wie wir Ihnen helfen können. Wir melden uns bei Ihnen."
               />
            </nav>
            {children}
         </body>
      </html>
   )
}
