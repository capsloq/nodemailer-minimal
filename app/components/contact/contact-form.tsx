"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import sendContactForm, {
  type ContactForm,
} from "@/app/components/contact/action-contact-form-send"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

import { Button } from "@/components/ui/button"
import { useActionState } from "react"



const initialState: ContactForm = {
    email: "",
    phone: "",
    message: "",
    terms: null,
  }

  
export function ContactForm({ className }: React.ComponentProps<"form">) {
    // @ts-expect-error fix useActionState type error
    const [formState, formAction] = useActionState(sendContactForm, initialState)
  
    if (formState.status === 500) {
      return (
        <Alert className="bg-red-600">
          <CheckCircle className="size-4" />
          <AlertTitle>Fehler</AlertTitle>
          <AlertDescription>
            Email konnte nicht gesendet werden. Bitte versuchen Sie es später
            erneut oder kontaktieren Sie uns direkt.
          </AlertDescription>
        </Alert>
      )
    }
  
    if (formState.success) {
      return (
        <Alert className="bg-green-600">
          <CheckCircle className="size-4" />
          <AlertTitle>Erfolg</AlertTitle>
          <AlertDescription>
            Ihre Anfrage wurde erfolgreich übermittelt.
          </AlertDescription>
        </Alert>
      )
    }
  
    return (
      <form
        className={cn("grid items-start gap-4", className)}
        action={formAction}
      >
        <div className="grid sm:grid-cols-2 sm:gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">
              Email<span className="ml-0.5 text-sm text-primary">*</span>
            </Label>
            <Input
              className="bg-muted"
              type="text"
              id="email"
              name="email"
              placeholder="ihre@email.de"
              defaultValue={formState.data?.email?.toString()}
              required
            />
            <p className="text-sm text-red-500">{formState?.errors?.email}</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              className="bg-muted"
              id="phone"
              name="phone"
              defaultValue={formState.data?.phone?.toString()}
            />
          </div>
        </div>
  
        <div className="grid gap-2">
          <Label htmlFor="message">
            Nachricht<span className="ml-0.5 text-sm text-primary">*</span>
          </Label>
          <Textarea
            className="bg-muted"
            id="message"
            name="message"
            rows={5}
            defaultValue={
              formState.data?.message?.toString() ??
              `Sehr geehrtes Capsloq Team,
  
  mit der Bitte um einen Terminvorschlag für ein kostenfreies Erstgespräch.
  `
            }
          />
          <p className="text-sm text-red-500">{formState?.errors?.message}</p>
        </div>
  
        <div className="flex space-x-2">
          <Checkbox className="bg-muted" id="terms" name="terms" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hiermit stimme ich den
              <Link href="/datenschutz" className="px-1 underline">
                Datenschutz&shy;bestimmungen
              </Link>
              zu.<span className="mr-0.5 text-sm text-primary">*</span>
            </label>
            <p className="text-sm text-red-500">{formState?.errors?.terms}</p>
          </div>
        </div>
  
        <SubmitButton />
      </form>
    )
  }
  
  function SubmitButton() {
    const { pending } = useFormStatus()
    return (
      <Button size="lg" disabled={pending} type="submit">
        {pending ? "Anfrage wird abgeschickt..." : "Anfrage abschicken"}
      </Button>
    )
  }