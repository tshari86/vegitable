
"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import type { Transaction, PaymentDetail, Supplier, Customer } from '@/lib/types';
import { initialTransactions } from '@/lib/transactions';
import { 
    initialSupplierPaymentDetails, 
    initialCustomerPaymentDetails,
    suppliers as initialSuppliers,
    customers as initialCustomers
} from '@/lib/data';

interface TransactionContextType {
    transactions: Transaction[];
    addTransaction: (transactions: Omit<Transaction, 'id'>[]) => void;
    supplierPayments: PaymentDetail[];
    customerPayments: PaymentDetail[];
    updateSupplierPayment: (payment: PaymentDetail) => void;
    updateCustomerPayment: (payment: PaymentDetail) => void;
    suppliers: Supplier[];
    updateSupplier: (supplier: Supplier) => void;
    customers: Customer[];
    updateCustomer: (customer: Customer) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [supplierPayments, setSupplierPayments] = useState<PaymentDetail[]>(initialSupplierPaymentDetails);
    const [customerPayments, setCustomerPayments] = useState<PaymentDetail[]>(initialCustomerPaymentDetails);
    const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
    const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
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

                const storedSuppliers = window.localStorage.getItem('suppliers');
                if (storedSuppliers) setSuppliers(JSON.parse(storedSuppliers));
                
                const storedCustomers = window.localStorage.getItem('customers');
                if (storedCustomers) setCustomers(JSON.parse(storedCustomers));

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

    useEffect(() => {
        if (isClient) {
            try {
                window.localStorage.setItem('suppliers', JSON.stringify(suppliers));
            } catch (error) {
                console.error('Error writing to localStorage for key "suppliers":', error);
            }
        }
    }, [suppliers, isClient]);

    useEffect(() => {
        if (isClient) {
            try {
                window.localStorage.setItem('customers', JSON.stringify(customers));
            } catch (error) {
                console.error('Error writing to localStorage for key "customers":', error);
            }
        }
    }, [customers, isClient]);


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
        setCustomerPayments(prev => prev.map(c => c.id === updatedPayment.id ? updatedPayment : c));
    }

    const updateSupplier = (updatedSupplier: Supplier) => {
        setSuppliers(prev => prev.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
    }

    const updateCustomer = (updatedCustomer: Customer) => {
        setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    }


    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, supplierPayments, customerPayments, updateSupplierPayment, updateCustomerPayment, suppliers, updateSupplier, customers, updateCustomer }}>
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
