export enum InvoiceStatus {
    PAID = "PAID",
    UNPAID = "UNPAID",
  }
  
  // Interface
export interface Invoice {
    type: string;
    remark: string;
    price: number;
    status: InvoiceStatus;
    date: Date;
}

// Invoices data
export var invoices: Invoice[] = [
  {
    type: "Poulet",
    remark: "25kg blanc poulet + 2.5kg cuisse",
    price: 250,
    status: InvoiceStatus.UNPAID,
    date: new Date(),
  },
  {
    type: "Frites",
    remark: "15kg frites 20DH/KG",
    price: 450,
    status: InvoiceStatus.PAID,
    date: new Date("2024-01-09"),
  },
  {
    type: "Fournitures",
    remark: "Voir la photo",
    price: 250,
    status: InvoiceStatus.UNPAID,
    date: new Date("2024-01-09"),
  },
]