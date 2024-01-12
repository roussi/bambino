import { FolderIcon } from "lucide-react";

export function NoInvoices() {
    return (
      <div className="p-4 mx-3 mt-2 border rounded-sm shadow-sm bg-blue-300/10 dark:bg-gray-900">
        <div className="flex flex-row items-center justify-center">
          <FolderIcon color="#777db5" /> <h3 className="mx-2 text-base text-[#777db5]">No invoices</h3>
        </div>
      </div>
    );
  }