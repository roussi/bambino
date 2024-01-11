// Import statements
"use client"

import * as React from "react"
import { Inter } from "next/font/google"
import { cn } from '@/lib/utils'
import { Calendar } from "@/components/ui/calendar"
import { Invoice, invoices } from '../components/invoice';
import InvoiceCreationSheep from "@/components/invoiceCreationSheep"
import InvoiceList from "@/components/invoicesList"

const fontSans = Inter({
  subsets: ["latin"],
})

export default function Home() {
  const [date, setDate] = React.useState<Date>(new Date())
  const [selectedInvoices, seSelectedInvoices] = React.useState<Invoice[]>()

  // Function to filter invoices based on selected date
  function getInvoices(date: Date | undefined) {
    var matchedInvoices = invoices.filter((invoice) => {
      return (
        invoice.date.getDay() === date?.getDay() &&
        invoice.date.getMonth() === date?.getMonth() &&
        invoice.date.getFullYear() === date?.getFullYear()
      );
    });
    seSelectedInvoices(matchedInvoices);
  }

  React.useEffect(() => {
    getInvoices(date);
  }, [date]);
  

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans inter",
          fontSans
        )}
      >
        {/* Header */}
        <header className="flex items-center justify-center flex-1 w-full px-20 mt-3 text-center md:mt-20">
          <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            Bambino food - Invoices
          </h1>
        </header>

        {/* Main content */}
        <div className="flex flex-col items-center justify-center py-2 mt-4">
            <InvoiceCreationSheep seSelectedInvoices={seSelectedInvoices} />
            <div className="flex items-center justify-center flex-1 w-full px-20 text-center">
              {/* Calendar */}
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => {
                  setDate(date!);
                  getInvoices(date);
                }}
              />
            </div>
            {/* Invoices display */}
            <InvoiceList selectedInvoices={selectedInvoices} />
        </div>
      </body>
    </html>
  )
}
