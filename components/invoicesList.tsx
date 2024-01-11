import * as React from "react";
import { Invoice } from "./invoice";
import InvoiceSummary from "./InvoiceSummary";
import { NoInvoices } from "./noInvoice";
import { Drawer, DrawerContent, DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";

interface InvoiceListProps {
    selectedInvoices: Invoice[] | undefined;
}

const InvoiceList: React.FC<InvoiceListProps> = ({ selectedInvoices }) => {
    return (
        <div className="flex flex-col w-full md:w-[400px] mt-6">
            {selectedInvoices !== undefined && selectedInvoices.length > 0 ? (
                selectedInvoices.map((invoice) => (
                    <Drawer key={invoice.remark}>
                        <DrawerTrigger>
                            <InvoiceSummary invoice={invoice} />
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Invoice Detail for {invoice.type}</DrawerTitle>
                                <DrawerDescription>{invoice.remark}</DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <Button>Submit</Button>
                                <DrawerClose>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                ))
            ) : (
                <NoInvoices />
            )}
        </div>
    );
};

export default InvoiceList;