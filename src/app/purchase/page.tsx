
"use client";

import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, PlusCircle, Users, CreditCard } from "lucide-react";
import { AddPurchaseDialog } from "@/components/purchase/add-purchase-dialog";
import Link from "next/link";


export default function PurchasePage() {
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
        </div>
      </Header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
            <Link href="/purchase/suppliers">
                <Card className="hover:bg-accent transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Supplier Details</CardTitle>
                        <Users className="h-6 w-6 text-muted-foreground" />
                    </CardHeader>
                    <CardDescription className="p-6 pt-0">
                        Manage your suppliers and their information.
                    </CardDescription>
                </Card>
            </Link>
            <Link href="/purchase/payments">
                <Card className="hover:bg-accent transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Supplier Payment Details</CardTitle>
                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                    </CardHeader>
                    <CardDescription className="p-6 pt-0">
                         Overview of payments made to suppliers.
                    </CardDescription>
                </Card>
            </Link>
        </div>
      </main>
    </>
  );
}
