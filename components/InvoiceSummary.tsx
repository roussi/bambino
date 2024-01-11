import React from 'react';
import { Invoice, InvoiceStatus } from './invoice';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';
import { Separator } from '../components/ui/separator';

interface InvoiceSummaryProps {
    invoice: Invoice
}

const InvoiceSummary : React.FC<InvoiceSummaryProps> = ({invoice}) => {
    return (
        <div className="p-4 mx-3 mt-2 border rounded-md shadow-sm bg-gray-100/40 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{invoice.type} : <span className='text-slate-500'>{invoice.price} {' DH'}</span></h3>
            {/* <p className="font-semibold text-blue-600">{invoice.price} {' DH'}</p> */}
            <Badge className={cn(
              invoice.status === InvoiceStatus.PAID ? "bg-green-400" : "bg-red-400",
              "px-1 py-1 rounded-sm"
            )}>{invoice.status}</Badge>
          </div>
          <Separator className="my-4 bg-blue-100" />
          <div className='flex justify-between w-full'>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
                {invoice.remark}
              </p>  
          </div>          
        </div>
      );
}
 
export default InvoiceSummary;