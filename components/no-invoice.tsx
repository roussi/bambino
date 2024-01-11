import { FolderIcon } from "lucide-react";

export function NoInvoices() {
    return (
      <div className="p-4 mx-3 mt-2 rounded-sm shadow-sm bg-blue-300/10 dark:bg-gray-900">
        <div className="flex flex-row items-center justify-center">
          <FolderIcon color="#616fed" /> <h3 className="mx-2 font-semibold text-[#616fed]">No invoices</h3>
        </div>
      </div>
    );
  }