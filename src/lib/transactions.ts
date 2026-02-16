import type { Transaction } from './types';

export const initialTransactions: Transaction[] = [
    { id: 1, date: "2024-07-20", party: "Venkatesh", type: "Sale", item: "Tomato", amount: 1250, payment: "UPI/Digital" },
    { id: 2, date: "2024-07-20", party: "Koyambedu Market", type: "Purchase", item: "Onion", amount: 5500, payment: "Credit" },
    { id: 3, date: "2024-07-19", party: "Anbu Retail", type: "Sale", item: "Carrot", amount: 800, payment: "Credit" },
    { id: 4, date: "2024-07-18", party: "Ooty Farms", type: "Purchase", item: "Potato", amount: 12000, payment: "Cash" },
    { id: 5, date: "2024-07-18", party: "Suresh Kumar", type: "Sale", item: "Cabbage", amount: 350, payment: "Cash" },
];
