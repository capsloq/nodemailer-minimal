"use client"

import { useMediaQuery } from "@mantine/hooks"
import { useState } from "react"
import { Button } from "@/components/ui/button"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ContactForm } from "@/app/components/contact/contact-form"

type ContactCallToActionProps = {
   button: React.ReactNode
   title: string
   description: string
}

export function ContactCallToAction({ button, title, description }: ContactCallToActionProps) {
   const [open, setOpen] = useState(false)
   const isDesktop = useMediaQuery("(min-width: 768px)")

   if (isDesktop) {
      return (
         <Dialog
            open={open}
            onOpenChange={setOpen}
         >
            <DialogTrigger asChild>{button}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  <DialogDescription>{description}</DialogDescription>
               </DialogHeader>
               <ContactForm />
            </DialogContent>
         </Dialog>
      )
   }

   return (
      <Drawer
         open={open}
         onOpenChange={setOpen}
      >
         <DrawerTrigger asChild>{button}</DrawerTrigger>
         <DrawerContent>
            <DrawerHeader className="text-left">
               <DrawerTitle>{title}</DrawerTitle>
               <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <ContactForm className="px-4" />
            <DrawerFooter className="pt-2">
               <DrawerClose asChild>
                  <Button variant="outline">Abbrechen</Button>
               </DrawerClose>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   )
}
