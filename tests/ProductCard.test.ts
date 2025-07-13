import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import type { Product } from '~/types/Product'

// Mock NuxtLink and NuxtImg components
const mocks = {
    NuxtLink: {
        name: 'NuxtLink',
        props: ['to'],
        setup(props: any, { slots }: any) {
            return () => h('a', { href: props.to }, slots.default())
        },
    },
    NuxtImg: {
        name: 'NuxtImg',
        props: ['src', 'alt', 'width', 'height', 'loading'],
        setup(props: any) {
            return () => h('img', { src: props.src, alt: props.alt, width: props.width, height: props.height })
        },
    },
}

// Sample product data for testing
const validProduct: Product = {
    id: 1,
    title: 'Sample Product',
    category: 'Electronics',
    thumbnail: 'https://example.com/image.jpg',
    price: 99.99,
    rating: 4.5,
    description: 'Test description',
    images: ['https://example.com/image.jpg'],
}

// Incomplete product data for testing
const incompleteProduct: Product = {
    id: 2,
    title: '',
    category: undefined as any,
    thumbnail: undefined as any,
    price: undefined as any,
    rating: undefined as any,
    description: '',
    images: [''],
}

describe('ProductCard', () => {
    let wrapper: any

    beforeEach(() => {
        // Reset wrapper before each test
        wrapper = null
    })

    it('renders correctly with valid product data', () => {
        wrapper = mount(ProductCard, {
            props: { product: validProduct },
            global: {
                components: {
                    NuxtLink: mocks.NuxtLink,
                    NuxtImg: mocks.NuxtImg,
                },
            },
        })

        // Check if the component renders
        expect(wrapper.exists()).toBe(true)

        // Check NuxtLink href
        expect(wrapper.find('a').attributes('href')).toBe('/products/1')

        // Check product title
        expect(wrapper.find('h3').text()).toBe('Sample Product')

        // Check category badge
        expect(wrapper.find('.badge').text()).toBe('Electronics')

        // Check NuxtImg attributes
        const img = wrapper.find('img')
        expect(img.attributes('src')).toBe('https://example.com/image.jpg')
        expect(img.attributes('alt')).toBe('Sample Product')
        expect(img.attributes('width')).toBe('140')
        expect(img.attributes('height')).toBe('140')

        // Check price and rating
        expect(wrapper.text()).toContain('Price: 99.99')
        expect(wrapper.text()).toContain('Rating: 4.5')
    })

    it('handles missing or incomplete product data gracefully', () => {
        wrapper = mount(ProductCard, {
            props: { product: incompleteProduct },
            global: {
                components: {
                    NuxtLink: mocks.NuxtLink,
                    NuxtImg: mocks.NuxtImg,
                },
            },
        })

        // Check if the component renders without crashing
        expect(wrapper.exists()).toBe(true)

        // Check NuxtLink href
        expect(wrapper.find('a').attributes('href')).toBe('/products/2')

        // Check title (empty string)
        expect(wrapper.find('h3').text()).toBe('')

        // Check category badge (undefined should not break rendering)
        expect(wrapper.find('.badge').exists()).toBe(true)
        expect(wrapper.find('.badge').text()).toBe('')

        // Check NuxtImg (should handle undefined thumbnail)
        const img = wrapper.find('img')
        expect(img.attributes('src')).toBe(undefined)
        expect(img.attributes('alt')).toBe('')

        // Check price and rating (should not break with undefined)
        expect(wrapper.text()).toContain('Price:')
        expect(wrapper.text()).toContain('Rating:')
    })
})