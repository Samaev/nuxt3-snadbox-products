// components/ProductCard.test.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest'; // No need to import vi, as it's mocked in setup.ts
import ProductCard from './ProductCard.vue'; // Adjust path if necessary

// Define a mock Product interface for type safety in tests
// This should mirror your actual Product type from ~/types/Product
interface MockProduct {
    id: number;
    title: string;
    category: string;
    thumbnail: string;
    price: number;
    rating: number;
    images: string[];
    description: string;
}

describe('ProductCard', () => {
    // Scenario 1: The component renders correctly with valid product data.
    it('renders correctly with valid product data', () => {
        const mockProduct: MockProduct = {
            id: 1,
            title: 'Awesome Gadget Pro',
            category: 'Electronics',
            thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
            images: ['https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp'],
            price: 999.99,
            rating: 4.8,
            description: 'This is an amazing gadget with advanced features.'
        };

        const wrapper = mount(ProductCard, {
            props: {
                product: mockProduct,
            },
        });

        // Assertions for text content
        expect(wrapper.find('h3').text()).toBe('Awesome Gadget Pro');
        expect(wrapper.find('.badge').text()).toBe('Electronics');
        expect(wrapper.text()).toContain('Price: 999.99');
        expect(wrapper.text()).toContain('Rating: 4.8');

        // Assertions for NuxtLink (mocked as <a>)
        const link = wrapper.find('a');
        expect(link.exists()).toBe(true);
        expect(link.attributes('href')).toBe('/products/1');
        expect(link.classes()).toContain('card'); // Check if base classes are applied

        // Assertions for NuxtImg (mocked as <img>)
        const img = wrapper.find('img');
        expect(img.exists()).toBe(true);
        expect(img.attributes('src')).toBe('https://cdn.dummyjson.com/product-images/1/thumbnail.jpg');
        expect(img.attributes('alt')).toBe('Awesome Gadget Pro');
        expect(img.attributes('width')).toBe('140');
        expect(img.attributes('height')).toBe('140');
    });

    // Scenario 2: The component handles missing or incomplete product data gracefully.
    it('handles incomplete product data gracefully', () => {
        // For this scenario, we'll provide a product object where some expected
        // properties are empty strings or default numbers, simulating incomplete data.
        // Note: Since 'product: Product' is a required prop, we must pass a Product object.
        // If 'Product' interface allowed properties to be optional (e.g., 'title?: string'),
        // we could omit them here.
        const incompleteProduct: MockProduct = {
            id: 2,
            title: '',
            category: 'Books',
            thumbnail: 'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg',
            price: 0,
            rating: 0,
            description: '',
            images: ['']
        };

        const wrapper = mount(ProductCard, {
            props: {
                product: incompleteProduct,
            },
        });

        // Assert that empty title renders as an empty string (graceful)
        expect(wrapper.find('h3').text()).toBe('');

        // Assert that category still renders
        expect(wrapper.find('.badge').text()).toBe('Books');

        // Assert that price and rating render their zero values (graceful)
        expect(wrapper.text()).toContain('Price: 0');
        expect(wrapper.text()).toContain('Rating: 0');

        // Assert image alt text handles empty title gracefully
        const img = wrapper.find('img');
        expect(img.exists()).toBe(true);
        expect(img.attributes('alt')).toBe(''); // Alt text should be empty if title is empty

        // Assert link still works with ID
        expect(wrapper.find('a').attributes('href')).toBe('/products/2');
    });
});