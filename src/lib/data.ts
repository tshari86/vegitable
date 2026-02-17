import type { Product, Supplier, Customer, PaymentDetail } from './types';

export const products: Product[] = [
    { id: '1', itemCode: 'VEG001', name: 'Tomato', rate1: 30, rate2: 28, rate3: 25 },
    { id: '2', itemCode: 'VEG002', name: 'Onion', rate1: 40, rate2: 38, rate3: 35 },
    { id: '3', itemCode: 'VEG003', name: 'Potato', rate1: 25, rate2: 23, rate3: 20 },
    { id: '4', itemCode: 'VEG004', name: 'Carrot', rate1: 50, rate2: 48, rate3: 45 },
    { id: '5', itemCode: 'VEG005', name: 'Cabbage', rate1: 20, rate2: 18, rate3: 15 },
];

export const suppliers: Supplier[] = [];

export const customers: Customer[] = [];

export const initialSupplierPaymentDetails: PaymentDetail[] = [];

export const initialCustomerPaymentDetails: PaymentDetail[] = [];
