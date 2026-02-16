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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Edit, MoreHorizontal, ArrowLeft } from "lucide-react";
import { suppliers } from "@/lib/data";
import { downloadCsv } from "@/lib/utils";
import Link from "next/link";

export default function PurchaseSuppliersPage() {
  const handleExport = () => {
    downloadCsv(suppliers, "suppliers.csv");
  };

  return (
    <>
      <Header title="Supplier Details">
        <div className="flex items-center gap-2">
          <Link href="/purchase">
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
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
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
      </main>
    </>
  );
}
