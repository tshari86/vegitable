
"use client";
import Header from "@/components/layout/header";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { customerPaymentDetails, supplierPaymentDetails } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";

export default function CreditsPage() {
  const [search, setSearch] = useState("");

  const filteredSupplierCredits = supplierPaymentDetails
    .filter(p => p.dueAmount > 0)
    .filter(p => p.partyName.toLowerCase().includes(search.toLowerCase()));
  
  const filteredCustomerCredits = customerPaymentDetails
    .filter(p => p.dueAmount > 0)
    .filter(p => p.partyName.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Header title="Credit Management">
        <Button size="sm" variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Export CSV
        </Button>
      </Header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search by party name..."
                className="pl-8 sm:w-[300px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
        <Tabs defaultValue="customer">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">Customer Credits</TabsTrigger>
            <TabsTrigger value="supplier">Supplier Credits</TabsTrigger>
          </TabsList>
          <TabsContent value="customer">
            <Card>
              <CardHeader>
                <CardTitle>Customer Credits</CardTitle>
                <CardDescription>
                  Outstanding payments to be received from customers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer ID</TableHead>
                      <TableHead>Customer Name</TableHead>
                      <TableHead className="text-right">Total Amount</TableHead>
                      <TableHead className="text-right">Paid Amount</TableHead>
                      <TableHead className="text-right">Due Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomerCredits.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.partyId}</TableCell>
                        <TableCell>{payment.partyName}</TableCell>
                        <TableCell className="text-right">{formatCurrency(payment.totalAmount)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(payment.paidAmount)}</TableCell>
                        <TableCell className="text-right font-medium text-destructive">{formatCurrency(payment.dueAmount)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="supplier">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Credits</CardTitle>
                <CardDescription>
                  Outstanding payments to be made to suppliers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier ID</TableHead>
                      <TableHead>Supplier Name</TableHead>
                      <TableHead className="text-right">Total Amount</TableHead>
                      <TableHead className="text-right">Paid Amount</TableHead>
                      <TableHead className="text-right">Due Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSupplierCredits.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.partyId}</TableCell>
                        <TableCell>{payment.partyName}</TableCell>
                        <TableCell className="text-right">{formatCurrency(payment.totalAmount)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(payment.paidAmount)}</TableCell>
                        <TableCell className="text-right font-medium text-destructive">{formatCurrency(payment.dueAmount)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
