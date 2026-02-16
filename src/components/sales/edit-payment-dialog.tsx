
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { PaymentDetail } from "@/lib/types";
import { useEffect } from "react";
import { formatCurrency } from "@/lib/utils";

const paymentFormSchema = z.object({
  paidAmount: z.coerce.number().min(0, "Paid amount must be non-negative"),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface EditPaymentDialogProps {
  payment: PaymentDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: PaymentDetail) => void;
}

export function EditPaymentDialog({ payment, open, onOpenChange, onSave }: EditPaymentDialogProps) {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
        paidAmount: 0,
    }
  });

  useEffect(() => {
    if (payment) {
        form.reset({ paidAmount: payment.paidAmount });
    }
  }, [payment, form]);

  function onSubmit(data: PaymentFormValues) {
    if (payment) {
        const newDueAmount = payment.totalAmount - data.paidAmount;
        const updatedPayment = { 
            ...payment, 
            paidAmount: data.paidAmount, 
            dueAmount: newDueAmount > 0 ? newDueAmount : 0,
        };
        onSave(updatedPayment);
    }
    onOpenChange(false);
  }

  const watchedPaidAmount = form.watch("paidAmount");
  const dueAmount = payment && typeof watchedPaidAmount === 'number' ? payment.totalAmount - watchedPaidAmount : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Payment</DialogTitle>
          <DialogDescription>
            Update the payment for {payment?.partyName}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <p><strong>Total Amount:</strong> {formatCurrency(payment?.totalAmount || 0)}</p>
            <FormField
              control={form.control}
              name="paidAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid Amount</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p><strong>Due Amount:</strong> {formatCurrency(dueAmount >= 0 ? dueAmount : 0)}</p>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
