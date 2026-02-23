import type { Product, Supplier, Customer, PaymentDetail } from './types';

export const products: Product[] = [
    { id: '1', itemCode: 'VEG001', name: 'Tomato' },
    { id: '2', itemCode: 'VEG002', name: 'Onion' },
    { id: '3', itemCode: 'VEG003', name: 'Potato' },
    { id: '4', itemCode: 'VEG004', name: 'Carrot' },
    { id: '5', itemCode: 'VEG005', name: 'Cabbage' },
];

export const suppliers: Supplier[] = [];

export const customers: Customer[] = [];

export const initialSupplierPaymentDetails: PaymentDetail[] = [];

export const initialCustomerPaymentDetails: PaymentDetail[] = [];
