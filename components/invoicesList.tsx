import * as React from "react";
import { Invoice } from "./invoice";
import InvoiceSummary from "./InvoiceSummary";
import { NoInvoices } from "./noInvoice";
import { Drawer, DrawerContent, DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import Image from "next/image";

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
                        <DrawerContent className="h-[90%]">
                            <DrawerHeader>
                                <DrawerTitle>Invoice Detail for : {invoice.type}</DrawerTitle>
                                <DrawerDescription className="items-center mt-4">
                                    <div className="my-1">
                                    {invoice.remark}
                                    </div>
                                    
                                    <div className="w-full h-[60%]">
                                        <DrawerDescription className="items-center mt-6">
                                            <div className="w-full min-h-[200px] border border-slate-400 rounded-md">
                                                <Image 
                                                    src={invoice.img} 
                                                    alt="Invoice Image" 
                                                    width={225}
                                                    height={1000}
                                                    className="inline-block"
                                                    />
                                            </div>
                                        </DrawerDescription>
                                    </div>
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter className="flex items-center justify-center">
                                <Button className="w-[50%]" variant={"success"} size="lg">Mark as payed</Button>
                                <DrawerClose className="w-full">
                                    <Button className="w-[50%]" variant={"outline"} >Cancel</Button>
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