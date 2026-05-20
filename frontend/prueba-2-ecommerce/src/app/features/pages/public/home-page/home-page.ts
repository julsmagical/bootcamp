import { Component, signal } from '@angular/core';
import { IProduct } from '../../../interfaces/public/public-interface';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  products: IProduct[] = [
    {
      id: 1,
      price: 1313.1,
      description: "The Josh Chair is the latest in a series of sarcastic products from Rosenbaum, Morissette and Herzog",
      sku: "LFNPNTVB",
      category: "laptops",
      discountPercentage: 19.8,
      stock: 260,
      title: "Elegant Marble Ball",
      thumbnail: "https://picsum.photos/seed/product1/300/300",
      images: [
        "https://picsum.photos/seed/product1a/600/600",
        "https://picsum.photos/seed/product1b/600/600"
      ],
      rating: 2.4,
      brand: "Auer - Collins"
    },
    {
      id: 2,
      price: 899.99,
      description: "A lightweight and powerful laptop designed for professionals and students.",
      sku: "QWERTY12",
      category: "laptops",
      discountPercentage: 15.5,
      stock: 120,
      title: "Modern Steel Laptop",
      thumbnail: "https://picsum.photos/seed/product2/300/300",
      images: [
        "https://picsum.photos/seed/product2a/600/600",
        "https://picsum.photos/seed/product2b/600/600"
      ],
      rating: 4.5,
      brand: "TechNova"
    },
    {
      id: 3,
      price: 249.5,
      description: "Premium wireless headphones with crystal clear sound and active noise cancellation.",
      sku: "ZXCASD34",
      category: "audio",
      discountPercentage: 10.2,
      stock: 85,
      title: "Wireless Sound Pro",
      thumbnail: "https://picsum.photos/seed/product3/300/300",
      images: [
        "https://picsum.photos/seed/product3a/600/600",
        "https://picsum.photos/seed/product3b/600/600"
      ],
      rating: 4.8,
      brand: "Soundify"
    },
    {
      id: 4,
      price: 79.99,
      description: "Compact smartwatch with fitness tracking and long battery life.",
      sku: "SMART889",
      category: "wearables",
      discountPercentage: 5.7,
      stock: 340,
      title: "Smart Active Watch",
      thumbnail: "https://picsum.photos/seed/product4/300/300",
      images: [
        "https://picsum.photos/seed/product4a/600/600",
        "https://picsum.photos/seed/product4b/600/600"
      ],
      rating: 4.1,
      brand: "PulseTech"
    },
    {
      id: 5,
      price: 459.0,
      description: "Gaming console with ultra-fast performance and immersive graphics.",
      sku: "GAME5566",
      category: "gaming",
      discountPercentage: 12.4,
      stock: 60,
      title: "NextGen Console X",
      thumbnail: "https://picsum.photos/seed/product5/300/300",
      images: [
        "https://picsum.photos/seed/product5a/600/600",
        "https://picsum.photos/seed/product5b/600/600"
      ],
      rating: 4.9,
      brand: "GameSphere"
    },
    {
      id: 6,
      price: 39.95,
      description: "Minimalist mechanical keyboard with RGB lighting and silent switches.",
      sku: "KEYB2025",
      category: "accessories",
      discountPercentage: 8.9,
      stock: 190,
      title: "Mechanical RGB Keyboard",
      thumbnail: "https://picsum.photos/seed/product6/300/300",
      images: [
        "https://picsum.photos/seed/product6a/600/600",
        "https://picsum.photos/seed/product6b/600/600"
      ],
      rating: 4.3,
      brand: "KeyMotion"
    }
  ];
}
