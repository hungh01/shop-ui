
import { ProductType } from "./product/productType";

export interface OrderOfUser {
    id: number;
    status: string;
    orderItems: [{
        product: ProductType;
        quantity: number;
    }]
    userId?: number;
    name?: string;
    phone: string;
    city: string;
    district: string;
    ward: string;
    address: string;
    note?: string;
    totalPrice: number;
    createdAt: string;
}