"use client"

import * as React from "react"

import { format } from "date-fns"
import { Calendar as CalendarIcon, FolderIcon, Trash2 } from "lucide-react"
import { Inter as FontSans } from "next/font/google"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RocketIcon } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

interface Invoice {
  type: string;
  remark: string;
  price: number;
  date: Date;
}

export default function Home() {
  const [date, setDate] = React.useState<Date>()
  const [selectedInvoices, seSelectedInvoices] = React.useState<Invoice[]>([])

  // declare invoices list
  const invoices = [
    {
      type: "DJAJ",
      remark: "25 Sder + 2.5 fkhad",
      price: 250,
      date: new Date(),
    },
    {
      type: "SEL3A",
      remark: "25 Sder + 2.5 fkhad",
      price: 450,
      date: new Date("2024-01-09"),
    },
    {
      type: "FRITES",
      remark: "25 Sder + 2.5 fkhad",
      price: 250,
      date: new Date("2024-01-09"),
    },
  ]

  function getInvoices(date: Date | undefined) {
    var matchedInvoices = invoices.filter((invoice) => {
      console.log("getInvoices: invoice.date: " + invoice.date);
      console.log("getInvoices: date: " + date);

      return invoice.date.getDay() === date?.getDay() && invoice.date.getMonth() === date?.getMonth() && invoice.date.getFullYear() === date?.getFullYear();
    });
    seSelectedInvoices(matchedInvoices);
    console.log(">> selectedInvoices: " + matchedInvoices);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
       <div className="flex flex-col items-center justify-center py-2 mt-4">
        <div className="flex items-center justify-center flex-1 w-full px-20 text-center">
        <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date);
                getInvoices(date);
              }}
              initialFocus
            />
        </div>
        <div className="flex flex-col w-full mt-6">
              {selectedInvoices.length > 0 && selectedInvoices.map((invoice) => (
                <div key={invoice.remark} className="p-4 mx-3 mt-2 rounded-sm shadow-sm bg-blue-300/10 dark:bg-gray-900">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{invoice.type}</h3>
                    <p className="font-semibold text-blue-600">{invoice.price} {' DH'}</p>
                  </div>
                  <Separator className="my-4 bg-blue-100" />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {invoice.remark}
                  </p>
                </div>
              ))}
              {selectedInvoices.length == 0 && 
                <div className="p-4 mx-3 mt-2 rounded-sm shadow-sm bg-blue-300/10 dark:bg-gray-900">
                  <div className="flex flex-row items-center justify-center">
                    <FolderIcon color="#616fed" /> <h3 className="mx-2 font-semibold text-[#616fed]">No invoices</h3>
                  </div>
                </div>
              }
        </div>
        </div>

      </body>
    </html>
  )
}
