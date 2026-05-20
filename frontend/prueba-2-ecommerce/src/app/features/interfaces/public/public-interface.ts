export interface IProduct{
    id: number;
    brand: string;
    category: string;
    sku: string;
    price: number;
    title: string;
    thumbnail: string;
    description: string;
    discountPercentage: number;
    rating: number;
    images: string[];
    stock: number;
}