"use server"

import nodemailer from "nodemailer"
import type Mail from "nodemailer/lib/mailer"
import { z } from "zod"

// ZOD Schema for the form
const contactFormSchema = z.object({
  email: z
    .string({
      required_error: "Ihre Email ist ein Pflichtfeld.",
      message: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    })
    .email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),
  phone: z.string().optional(),
  message: z
    .string({
      required_error: "Bitte geben Sie eine Nachricht ein.",
    })
    .min(1, {
      message: "Bitte geben Sie eine Nachricht ein.",
    }),
  // Terms is "on" or null but only "on" is valid
  terms: z
    .literal("on")
    .nullable()
    .refine((value) => value === "on", {
      message: "Bitte akzeptieren Sie die Datenschutzbestimmungen.",
    }),
})

export type ContactForm = z.infer<typeof contactFormSchema>

export default async function sendContactForm(
  prevState: ContactForm,
  formData: FormData
) {
  const userInput = {
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    terms: formData.get("terms"),
  }

  const validatefields = contactFormSchema.safeParse({
    ...userInput,
  })

  // Return ealry if the form data is invalid
  if (!validatefields.success) {
    return {
      data: userInput,
      success: false,
      status: 400,
      errors: validatefields.error.flatten().fieldErrors,
    }
  }

  // Send an Email

  const transport = nodemailer.createTransport({
    host: "smtp.office365.com", // Office 365 server
    port: 587, // secure SMTP
    secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
    tls: {
      ciphers: "SSLv3",
      //requireTLS: true,
    },
    requireTLS: true,

    

    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_EMAIL_PASSWORD,
    },
  })

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: "info@capsloq.de",
    replyTo: validatefields.data.email,

    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Kontaktanfrage für Erstberatung`,
    text:
      validatefields.data.message +
      "\n\n" +
      validatefields.data.phone +
      "\n\n" +
      validatefields.data.email,
  }

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent")
        } else {
          reject(err.message)
        }
      })
    })

  try {
    await sendMailPromise()
    return {
      success: true,
      status: 200,
      data: validatefields.data,
    }
  } catch (error) {
    console.error("Error sending email", error)
    return {
      success: false,
      status: 500,
      data: userInput,
    }
  }
}
