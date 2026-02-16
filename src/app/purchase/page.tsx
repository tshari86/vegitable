
"use client";

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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Edit, MoreHorizontal, PlusCircle } from "lucide-react";
import { suppliers, supplierPaymentDetails } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { AddPurchaseDialog } from "@/components/purchase/add-purchase-dialog";
import { useState } from "react";
import type { PaymentDetail } from "@/lib/types";
import { EditPaymentDialog } from "@/components/purchase/edit-payment-dialog";


export default function PurchasePage() {
    const [editPayment, setEditPayment] = useState<PaymentDetail | null>(null);

  return (
    <>
      <Header title="Purchase Management">
        <div className="flex items-center gap-2">
            <AddPurchaseDialog>
            <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Purchase
            </Button>
            </AddPurchaseDialog>
            <Button size="sm" variant="outline" className="gap-1">
                <Download className="h-4 w-4" />
                Export CSV
            </Button>
        </div>
      </Header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Details</CardTitle>
              <CardDescription>
                Manage your suppliers and their information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier ID</TableHead>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.id}</TableCell>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>{supplier.contact}</TableCell>
                      <TableCell>{supplier.address}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="sm"
                              variant="ghost"
                            >
                                Actions
                              <MoreHorizontal className="h-4 w-4 ml-2" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Edit className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supplier Payment Details</CardTitle>
              <CardDescription>
                Overview of payments made to suppliers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier ID</TableHead>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Total Amount</TableHead>
                    <TableHead className="text-right">Paid Amount</TableHead>
                    <TableHead className="text-right">Due Amount</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplierPaymentDetails.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.partyId}
                      </TableCell>
                      <TableCell>{payment.partyName}</TableCell>
                      <TableCell>{payment.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(payment.totalAmount)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(payment.paidAmount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={payment.dueAmount > 0 ? 'destructive' : 'default'} className={payment.dueAmount > 0 ? '' : 'bg-primary/80'}>
                          {formatCurrency(payment.dueAmount)}
                        </Badge>
                      </TableCell>
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
                            <DropdownMenuItem onClick={() => setEditPayment(payment)}>
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
        </div>
        <EditPaymentDialog 
            payment={editPayment}
            open={!!editPayment}
            onOpenChange={(open) => !open && setEditPayment(null)}
            onSave={(values) => console.log(values)}
        />
      </main>
    </>
  );
}
