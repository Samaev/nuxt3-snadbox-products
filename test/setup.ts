// test/setup.ts
import { vi } from 'vitest';
import { defineComponent } from 'vue';

// Mock NuxtLink:
// In unit tests, NuxtLink relies on Nuxt's router, which isn't present.
// We mock it as a simple <a> tag to ensure the href is correctly rendered.
vi.mock('#app', () => ({
    NuxtLink: defineComponent({
        name: 'NuxtLink',
        props: ['to'],
        template: '<a :href="to"><slot /></a>',
    }),
    // If you used other Nuxt composables directly in ProductCard (e.g., useRoute),
    // you'd mock them here too. But for ProductCard, it's just props.
}));

// Mock NuxtImg:
// NuxtImg is a module that handles image optimization. In unit tests,
// we just need it to render a standard <img> tag with its props.
vi.mock('@nuxt/image', () => ({
    NuxtImg: defineComponent({
        name: 'NuxtImg',
        props: ['src', 'alt', 'width', 'height', 'placeholder', 'loading'],
        template: '<img :src="src" :alt="alt" :width="width" :height="height" />',
    }),
}));