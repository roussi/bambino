import { Button } from "@/components/ui/button";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InvoiceStatus, invoices } from "./invoice";
import { format } from "date-fns"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useState } from "react";

const formSchema = z.object({
    type: z.string().min(1, { message: "Type is required!" }),
    price: z.string().min(1).max(8000),
    date: z.date(),
    remark: z.string().min(1),
});

const InvoiceCreationSheep = () => {
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "",
            date: new Date(),
            price: "",
            remark: "",
        },
    });

    function addInvoice(values: z.infer<typeof formSchema>) {
        invoices.push({
            type: values.type,
            date: new Date(values.date),
            price: parseFloat(values.price),
            remark: values.remark,
            status: InvoiceStatus.UNPAID,
        });
        setSheetOpen(false);
    }

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger>
                <Button className="">
                    <PlusIcon size={15} />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <Label className="p-2 text-sm font-semibold text-purple-700 bg-purple-100 rounded-sm"> Add Invoice </Label>
                    </SheetTitle>
                    <SheetDescription>
                        <div className="flex flex-col items-center justify-center w-full mt-10 ">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(addInvoice)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <SelectTrigger className="w-full my-4">
                                                            <SelectValue placeholder="Select an invoice type" {...field} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Poulet">Poulet</SelectItem>
                                                            <SelectItem value="Frites">Frites</SelectItem>
                                                            <SelectItem value="Fournitures">Fournitures</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input {...field} type="number" placeholder="Prix" className="w-full my-4 mt-2" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="w-[90%]">
                                                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[240px] justify-start text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="center">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={(d) => {
                                                                        field.onChange(d);
                                                                        setCalendarOpen(false);
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="remark"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea {...field} placeholder="prix au kg ?" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full mt-20"> Add </Button>
                                </form>
                            </Form>
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default InvoiceCreationSheep;
