
"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import type { Transaction, PaymentDetail } from '@/lib/types';
import { initialTransactions } from '@/lib/transactions';
import { initialSupplierPaymentDetails, initialCustomerPaymentDetails } from '@/lib/data';

// Helper to get initial state from localStorage or defaults
const getInitialState = <T,>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') {
        return defaultValue;
    }
    try {
        const storedValue = window.localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage for key "${key}":`, error);
        return defaultValue;
    }
};

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
    const [transactions, setTransactions] = useState<Transaction[]>(() => getInitialState('transactions', initialTransactions));
    const [supplierPayments, setSupplierPayments] = useState<PaymentDetail[]>(() => getInitialState('supplierPayments', initialSupplierPaymentDetails));
    const [customerPayments, setCustomerPayments] = useState<PaymentDetail[]>(() => getInitialState('customerPayments', initialCustomerPaymentDetails));

    useEffect(() => {
        try {
            window.localStorage.setItem('transactions', JSON.stringify(transactions));
        } catch (error) {
            console.error('Error writing to localStorage for key "transactions":', error);
        }
    }, [transactions]);

    useEffect(() => {
        try {
            window.localStorage.setItem('supplierPayments', JSON.stringify(supplierPayments));
        } catch (error) {
            console.error('Error writing to localStorage for key "supplierPayments":', error);
        }
    }, [supplierPayments]);

    useEffect(() => {
        try {
            window.localStorage.setItem('customerPayments', JSON.stringify(customerPayments));
        } catch (error) {
            console.error('Error writing to localStorage for key "customerPayments":', error);
        }
    }, [customerPayments]);


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
