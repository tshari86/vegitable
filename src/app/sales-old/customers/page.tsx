
"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Edit, MoreHorizontal, ArrowLeft } from "lucide-react";
import { downloadCsv } from "@/lib/utils";
import { useTransactions } from "@/context/transaction-provider";
import type { Customer } from "@/lib/types";
import { EditCustomerDialog } from "@/components/sales-old/edit-customer-dialog";

export default function SalesCustomersPage() {
    const { customers, updateCustomer } = useTransactions();
    const [editCustomer, setEditCustomer] = useState<Customer | null>(null);

    const handleExport = () => {
        const dataToExport = [...customers];
        const totalRow = {
            id: 'TOTAL',
            name: `Total Customers: ${dataToExport.length}`,
            contact: '',
            address: '',
        }
        downloadCsv([...dataToExport, totalRow as any], "customers.csv");
    }

    const handleSave = (updatedCustomer: Customer) => {
      updateCustomer(updatedCustomer);
      setEditCustomer(null);
    }

  return (
    <>
      <Header title="Customer Details">
        <div className="flex items-center gap-2">
             <Link href="/sales-old">
                <Button size="sm" variant="outline" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back
                </Button>
            </Link>
            <Button size="sm" variant="outline" className="gap-1" onClick={handleExport}>
                <Download className="h-4 w-4" />
                Export CSV
            </Button>
        </div>
      </Header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
              <CardDescription>
                Manage your customers and their information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.contact}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditCustomer(customer)}>
                                <Edit className="h-4 w-4 mr-2" /> Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <EditCustomerDialog
            customer={editCustomer}
            open={!!editCustomer}
            onOpenChange={(open) => !open && setEditCustomer(null)}
            onSave={handleSave}
          />
      </main>
    </>
  );
}
