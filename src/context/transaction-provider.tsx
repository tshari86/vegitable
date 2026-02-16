
"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import type { Transaction, PaymentDetail } from '@/lib/types';
import { initialTransactions } from '@/lib/transactions';
import { initialSupplierPaymentDetails, initialCustomerPaymentDetails } from '@/lib/data';

interface TransactionContextType {
    transactions: Transaction[];
    addTransaction: (transactions: Omit<Transaction, 'id'>[]) => void;
    supplierPayments: PaymentDetail[];
    customerPayments: PaymentDetail[];
    updateSupplierPayment: (payment: PaymentDetail) => void;
    updateCustomerPayment: (payment: PaymentDetail) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [supplierPayments, setSupplierPayments] = useState<PaymentDetail[]>(initialSupplierPaymentDetails);
    const [customerPayments, setCustomerPayments] = useState<PaymentDetail[]>(initialCustomerPaymentDetails);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            try {
                const storedTransactions = window.localStorage.getItem('transactions');
                if (storedTransactions) setTransactions(JSON.parse(storedTransactions));

                const storedSupplierPayments = window.localStorage.getItem('supplierPayments');
                if (storedSupplierPayments) setSupplierPayments(JSON.parse(storedSupplierPayments));
                
                const storedCustomerPayments = window.localStorage.getItem('customerPayments');
                if (storedCustomerPayments) setCustomerPayments(JSON.parse(storedCustomerPayments));
            } catch (error) {
                console.error("Failed to load from localStorage", error);
            }
        }
    }, [isClient]);

    useEffect(() => {
        if (isClient) {
            try {
                window.localStorage.setItem('transactions', JSON.stringify(transactions));
            } catch (error) {
                console.error('Error writing to localStorage for key "transactions":', error);
            }
        }
    }, [transactions, isClient]);

    useEffect(() => {
        if (isClient) {
            try {
                window.localStorage.setItem('supplierPayments', JSON.stringify(supplierPayments));
            } catch (error) {
                console.error('Error writing to localStorage for key "supplierPayments":', error);
            }
        }
    }, [supplierPayments, isClient]);

    useEffect(() => {
        if (isClient) {
            try {
                window.localStorage.setItem('customerPayments', JSON.stringify(customerPayments));
            } catch (error) {
                console.error('Error writing to localStorage for key "customerPayments":', error);
            }
        }
    }, [customerPayments, isClient]);


    const addTransaction = (newTransactions: Omit<Transaction, 'id'>[]) => {
        setTransactions(prev => [
            ...prev, 
            ...newTransactions.map((t, i) => ({...t, id: (prev.length > 0 ? Math.max(...prev.map(p => p.id)) : 0) + i + 1}))
        ]);
    };

    const updateSupplierPayment = (updatedPayment: PaymentDetail) => {
        setSupplierPayments(prev => prev.map(p => p.id === updatedPayment.id ? updatedPayment : p));
    }

    const updateCustomerPayment = (updatedPayment: PaymentDetail) => {
        setCustomerPayments(prev => prev.map(p => p.id === updatedPayment.id ? updatedPayment : p));
    }

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, supplierPayments, customerPayments, updateSupplierPayment, updateCustomerPayment }}>
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionContext);
    if (context === undefined) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    }
    return context;
}
