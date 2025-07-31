import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock des APIs du navigateur
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock de IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock de ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock de PerformanceObserver
global.PerformanceObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock de navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(),
    readText: vi.fn(),
  },
});

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock de sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock de fetch
global.fetch = vi.fn();

// Mock de Web Audio API
global.AudioContext = vi.fn().mockImplementation(() => ({
  createMediaStreamSource: vi.fn(),
  createAnalyser: vi.fn(),
  createGain: vi.fn(),
  createOscillator: vi.fn(),
  createMediaElementSource: vi.fn(),
  createScriptProcessor: vi.fn(),
  createBiquadFilter: vi.fn(),
  createDelay: vi.fn(),
  createConvolver: vi.fn(),
  createDynamicsCompressor: vi.fn(),
  createPanner: vi.fn(),
  createStereoPanner: vi.fn(),
  createWaveShaper: vi.fn(),
  createPeriodicWave: vi.fn(),
  createChannelSplitter: vi.fn(),
  createChannelMerger: vi.fn(),
  createMediaStreamDestination: vi.fn(),
  decodeAudioData: vi.fn(),
  suspend: vi.fn(),
  resume: vi.fn(),
  close: vi.fn(),
  state: 'running',
  sampleRate: 44100,
  destination: {},
  listener: {},
}));

// Mock de MediaRecorder
global.MediaRecorder = vi.fn().mockImplementation(() => ({
  start: vi.fn(),
  stop: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  requestData: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
  state: 'inactive',
  stream: {},
  mimeType: 'audio/webm',
}));

// Mock de getUserMedia
Object.defineProperty(navigator, 'mediaDevices', {
  value: {
    getUserMedia: vi.fn().mockResolvedValue({
      getTracks: () => [
        {
          stop: vi.fn(),
          getSettings: () => ({}),
        },
      ],
    }),
    enumerateDevices: vi.fn().mockResolvedValue([]),
  },
});

// Mock de Notification
global.Notification = vi.fn().mockImplementation(() => ({
  close: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));

// Mock de ServiceWorker
Object.defineProperty(navigator, 'serviceWorker', {
  value: {
    register: vi.fn().mockResolvedValue({
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      postMessage: vi.fn(),
    }),
    getRegistration: vi.fn().mockResolvedValue(null),
    getRegistrations: vi.fn().mockResolvedValue([]),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  },
});

// Mock de caches
global.caches = {
  open: vi.fn().mockResolvedValue({
    put: vi.fn(),
    match: vi.fn(),
    delete: vi.fn(),
    keys: vi.fn(),
  }),
  delete: vi.fn(),
  keys: vi.fn(),
  match: vi.fn(),
};

// Mock de requestAnimationFrame
global.requestAnimationFrame = vi.fn(cb => setTimeout(cb, 0));
global.cancelAnimationFrame = vi.fn();

// Mock de requestIdleCallback
global.requestIdleCallback = vi.fn(cb => setTimeout(cb, 0));
global.cancelIdleCallback = vi.fn();

// Mock de performance
global.performance = {
  now: vi.fn(() => Date.now()),
  mark: vi.fn(),
  measure: vi.fn(),
  getEntriesByType: vi.fn(() => []),
  getEntriesByName: vi.fn(() => []),
  clearMarks: vi.fn(),
  clearMeasures: vi.fn(),
  memory: {
    usedJSHeapSize: 1000000,
    totalJSHeapSize: 2000000,
    jsHeapSizeLimit: 4000000,
  },
};

// Mock de console pour les tests
const originalConsole = { ...console };
global.console = {
  ...console,
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  debug: vi.fn(),
};

// Restaurer console après les tests
afterEach(() => {
  global.console = originalConsole;
});

// Configuration des tests
beforeEach(() => {
  // Nettoyer les mocks
  vi.clearAllMocks();

  // Réinitialiser localStorage
  localStorageMock.getItem.mockReturnValue(null);
  localStorageMock.setItem.mockImplementation(() => {});
  localStorageMock.removeItem.mockImplementation(() => {});
  localStorageMock.clear.mockImplementation(() => {});

  // Réinitialiser sessionStorage
  sessionStorageMock.getItem.mockReturnValue(null);
  sessionStorageMock.setItem.mockImplementation(() => {});
  sessionStorageMock.removeItem.mockImplementation(() => {});
  sessionStorageMock.clear.mockImplementation(() => {});

  // Réinitialiser fetch
  global.fetch.mockReset();

  // Réinitialiser IntersectionObserver
  global.IntersectionObserver.mockClear();

  // Réinitialiser ResizeObserver
  global.ResizeObserver.mockClear();

  // Réinitialiser PerformanceObserver
  global.PerformanceObserver.mockClear();
});

// Configuration globale pour les tests
global.testUtils = {
  // Utilitaire pour attendre que les animations se terminent
  waitForAnimation: () => new Promise(resolve => setTimeout(resolve, 100)),

  // Utilitaire pour simuler un événement
  fireEvent: (element, eventName, options = {}) => {
    const event = new Event(eventName, { bubbles: true, ...options });
    element.dispatchEvent(event);
  },

  // Utilitaire pour simuler un événement personnalisé
  fireCustomEvent: (element, eventName, detail = {}) => {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      detail,
    });
    element.dispatchEvent(event);
  },

  // Utilitaire pour attendre qu'un élément soit visible
  waitForElement: (selector, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      const checkElement = () => {
        const element = document.querySelector(selector);
        if (element) {
          resolve(element);
        } else if (Date.now() - startTime > timeout) {
          reject(
            new Error(`Element ${selector} not found within ${timeout}ms`)
          );
        } else {
          setTimeout(checkElement, 100);
        }
      };

      checkElement();
    });
  },

  // Utilitaire pour simuler une touche
  pressKey: (element, key, options = {}) => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key, ...options }));
    element.dispatchEvent(new KeyboardEvent('keyup', { key, ...options }));
  },

  // Utilitaire pour simuler un clic
  click: element => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  },

  // Utilitaire pour simuler un focus
  focus: element => {
    element.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
  },

  // Utilitaire pour simuler un blur
  blur: element => {
    element.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
  },

  // Utilitaire pour simuler un changement de valeur
  change: (element, value) => {
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  },
};
