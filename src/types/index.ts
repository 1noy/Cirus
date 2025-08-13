/**
 * Types TypeScript pour l'application de chat
 * Définitions complètes des interfaces et types
 */

// === TYPES DE BASE ===

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  online: boolean;
  lastSeen: number;
  status?: 'online' | 'away' | 'busy' | 'offline';
  customStatus?: string;
}

export interface Contact extends User {
  isFavorite: boolean;
  lastContact: number;
  unreadCount: number;
  isBlocked: boolean;
}

// === TYPES DE CHAT ===

export interface Chat {
  id: string;
  type: 'direct' | 'group' | 'channel';
  participants: string[];
  metadata: ChatMetadata;
  settings: ChatSettings;
  lastActivity: number;
  unreadCount: number;
  isArchived: boolean;
  isMuted: boolean;
}

export interface ChatMetadata {
  name?: string;
  description?: string;
  avatar?: string;
  createdAt: number;
  createdBy: string;
  lastMessage?: LastMessage;
  memberCount?: number;
  isPrivate: boolean;
}

export interface ChatSettings {
  notifications: boolean;
  sound: boolean;
  theme: 'default' | 'dark' | 'light' | 'custom';
  language: string;
  autoDelete: boolean;
  deleteAfter: number; // en jours
}

export interface LastMessage {
  content: string;
  senderId: string;
  timestamp: number;
  type: MessageType;
}

// === TYPES DE MESSAGES ===

export type MessageType = 'text' | 'image' | 'file' | 'voice' | 'video' | 'location' | 'contact' | 'system';

export interface Message {
  id: string;
  chatId: string;
  content: string | File | Blob;
  type: MessageType;
  senderId: string;
  timestamp: number;
  status: MessageStatus;
  metadata?: MessageMetadata;
  replyTo?: string;
  reactions?: MessageReaction[];
  readBy?: string[];
  readAt?: number;
  editedAt?: number;
  isEdited: boolean;
  isDeleted: boolean;
  deletedAt?: number;
}

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface MessageMetadata {
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  duration?: number; // pour les messages vocaux/vidéo
  dimensions?: {
    width: number;
    height: number;
  };
  thumbnail?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  contact?: {
    name: string;
    phone?: string;
    email?: string;
  };
}

export interface MessageReaction {
  emoji: string;
  userId: string;
  timestamp: number;
}

// === TYPES D'INTERFACE ===

export interface UIState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  theme: 'light' | 'dark' | 'auto';
  compactMode: boolean;
  showTimestamps: boolean;
  showReadReceipts: boolean;
  enableAnimations: boolean;
  enableSounds: boolean;
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reduceMotion: boolean;
}

export interface PerformanceMetrics {
  lastRender: number;
  memoryUsage: number;
  networkStatus: 'online' | 'offline' | 'slow';
  bundleSize: number;
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

export interface NotificationSettings {
  sound: boolean;
  vibration: boolean;
  desktop: boolean;
  mobile: boolean;
  email: boolean;
  push: boolean;
  quietHours: boolean;
  quietStart: string; // HH:mm
  quietEnd: string; // HH:mm
}

export interface Notification {
  id: string;
  type: 'message' | 'mention' | 'reaction' | 'system' | 'error';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  action?: {
    type: 'navigate' | 'open' | 'dismiss';
    target?: string;
    data?: any;
  };
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

// === TYPES DE FORMULAIRES ===

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
  value: any;
  required: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: ValidationRule[];
  error?: string;
  touched: boolean;
  disabled: boolean;
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'email' | 'url' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean | string;
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  submitCount: number;
}

// === TYPES DE PERFORMANCE ===

export interface PerformanceThreshold {
  name: string;
  category: string;
  threshold: number; // en millisecondes
  current: number;
  exceeded: boolean;
  timestamp: number;
}

export interface CacheEntry {
  key: string;
  value: any;
  timestamp: number;
  expiry?: number;
  size: number;
  compressed: boolean;
  hits: number;
  lastAccessed: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  entries: number;
  hitRate: number;
  averageHits: number;
  compressionRatio: number;
  memoryUsage: string;
}

// === TYPES D'API ===

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: number;
  requestId: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
  requestId: string;
}

// === TYPES DE CONFIGURATION ===

export interface AppConfig {
  name: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  features: {
    chat: boolean;
    voice: boolean;
    video: boolean;
    fileSharing: boolean;
    reactions: boolean;
    replies: boolean;
    search: boolean;
    notifications: boolean;
  };
  limits: {
    maxFileSize: number;
    maxMessageLength: number;
    maxParticipants: number;
    maxChats: number;
  };
}

// === TYPES D'ÉVÉNEMENTS ===

export interface AppEvent {
  type: string;
  payload: any;
  timestamp: number;
  userId?: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

export interface ErrorEvent extends AppEvent {
  type: 'error';
  payload: {
    error: Error;
    context: string;
    stack?: string;
    userAgent: string;
    url: string;
  };
}

export interface PerformanceEvent extends AppEvent {
  type: 'performance';
  payload: {
    metric: string;
    value: number;
    category: string;
    threshold?: number;
    exceeded?: boolean;
  };
}

// === TYPES DE TESTS ===

export interface TestResult {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
  metadata?: Record<string, any>;
}

export interface TestSuite {
  name: string;
  results: TestResult[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  duration: number;
  timestamp: number;
}

// === TYPES UTILITAIRES ===

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type EventHandler<T = any> = (event: T) => void | Promise<void>;

export type AsyncFunction<T = any, R = any> = (...args: T[]) => Promise<R>;

export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

// === TYPES DE COMPOSANTS ===

export interface ComponentConfig {
  name: string;
  version: string;
  props: Record<string, ComponentProp>;
  events: Record<string, ComponentEvent>;
  slots?: string[];
  styles?: string[];
}

export interface ComponentProp {
  type: string;
  required: boolean;
  default?: any;
  description?: string;
  validator?: (value: any) => boolean;
}

export interface ComponentEvent {
  name: string;
  description?: string;
  payload?: any;
}

// === TYPES D'ACCESSIBILITÉ ===

export interface AccessibilityConfig {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
  role?: string;
  tabIndex?: number;
  focusable?: boolean;
  keyboardNavigation?: boolean;
  screenReader?: boolean;
  highContrast?: boolean;
  reduceMotion?: boolean;
}

// === TYPES INTERNATIONAUX ===

export interface LocalizationConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, Record<string, string>>;
  dateFormat: string;
  timeFormat: string;
  numberFormat: {
    decimal: string;
    thousands: string;
    currency: string;
  };
}

// === TYPES DE SÉCURITÉ ===

export interface SecurityConfig {
  csrfProtection: boolean;
  xssProtection: boolean;
  contentSecurityPolicy: boolean;
  rateLimiting: boolean;
  inputSanitization: boolean;
  outputEncoding: boolean;
  secureHeaders: boolean;
}

export interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export interface UserPermissions {
  userId: string;
  permissions: Permission[];
  roles: string[];
  inheritedFrom?: string[];
}

// === TYPES DE MONITORING ===

export interface MonitoringConfig {
  enabled: boolean;
  metrics: boolean;
  logs: boolean;
  errors: boolean;
  performance: boolean;
  userBehavior: boolean;
  realTime: boolean;
}

export interface Metric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  tags: Record<string, string>;
  metadata?: Record<string, any>;
}

export interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  message: string;
  timestamp: number;
  context: string;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
  stack?: string;
}

// === EXPORT DES TYPES PRINCIPAUX ===

export type {
  User,
  Contact,
  Chat,
  Message,
  UIState,
  PerformanceMetrics,
  NotificationSettings,
  Notification,
  FormField,
  FormState,
  PerformanceThreshold,
  CacheEntry,
  CacheStats,
  ApiResponse,
  PaginatedResponse,
  ApiError,
  AppConfig,
  AppEvent,
  ErrorEvent,
  PerformanceEvent,
  TestResult,
  TestSuite,
  ComponentConfig,
  AccessibilityConfig,
  LocalizationConfig,
  SecurityConfig,
  Permission,
  UserPermissions,
  MonitoringConfig,
  Metric,
  LogEntry
};
