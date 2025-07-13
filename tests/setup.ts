import { config } from '@vue/test-utils'
import { vi } from 'vitest'


// Mock Nuxt-specific globals
vi.mock('#app', () => ({
    useNuxtApp: () => ({}),
}))

// Ensure TextEncoder is available in jsdom
if (typeof global.TextEncoder === 'undefined') {
    const { TextEncoder, TextDecoder } = require('util')
    global.TextEncoder = TextEncoder
    global.TextDecoder = TextDecoder
}

// Configure global stubs
config.global.stubs = {}