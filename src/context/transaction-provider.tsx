"use client";

import { createContext, useContext, useState } from 'react';
import type { Transaction } from '@/lib/types';
import { initialTransactions } from '@/lib/transactions';

interface TransactionContextType {
    transactions: Transaction[];
    addTransaction: (transactions: Omit<Transaction, 'id'>[]) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

    const addTransaction = (newTransactions: Omit<Transaction, 'id'>[]) => {
        setTransactions(prev => [
            ...prev, 
            ...newTransactions.map((t, i) => ({...t, id: prev.length + i + 1}))
        ]);
    };

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction }}>
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
