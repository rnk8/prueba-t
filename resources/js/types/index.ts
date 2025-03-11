import { LucideIcon } from 'lucide-react';

/** 🔹 Definición de Usuario */
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  role: string;
  // Permite propiedades adicionales si se requieren
  [key: string]: unknown;
}

/** 🔹 Definición de Categoría */
export interface Category {
  id: number;
  name: string;
  description?: string; // Opcional
  slug: string;
}

/** 🔹 Definición de Unidad de Medida */
export interface Unit {
  id: number;
  name: string;
  abbreviation?: string; // Abreviatura opcional, ej. "kg", "L"
}

/** 🔹 Estructura de enlaces de paginación (Laravel) */
export interface PaginationLinks {
  first: string;
  last: string;
  prev?: string;
  next?: string;
}

/** 🔹 Estructura de meta de paginación (Laravel) */
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

/** 🔹 Estructura genérica para datos paginados */
export interface PaginatedData<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

/** 🔹 Datos compartidos en la app */
export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  [key: string]: unknown;
}

/** 🔹 Tipado de datos de autenticación */
export interface Auth {
  user: User;
}

/** 🔹 Item de Breadcrumb */
export interface BreadcrumbItem {
  title: string;
  href: string;
}

/** 🔹 Item de navegación */
export interface NavItem {
  title: string;
  url?: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
  children?: NavItem[];
}

/** 🔹 Grupo de navegación */
export interface NavGroup {
  title: string;
  items: NavItem[];
}
export interface CreateProductProps {
  categories: { id: number; name: string }[];
  measurementUnits: { id: number; name: string; abbreviation: string }[];
  productTypes: Record<string, string>;
  // Puedes agregar otras propiedades que necesites, sin forzar que sean paginadas
  [key: string]: any;
}
export interface CreateCategoryProps {
  categories?: {
    id: number;
    name: string;
    // Otros campos si es necesario
  }[];
}
export interface EditProductProps {
  product: Product;
  categories: { id: number; name: string }[];
  measurementUnits: { id: number; name: string; abbreviation: string }[];
  productTypes: Record<string, string>;
  [key: string]: any;
}

export interface Sale {
  id: number;
  total: number;
  created_at: string;
  user: {
    id: number;
    name: string;
  };
  products: {
    id: number;
    name: string;
    pivot: {
      quantity: number;
      unit_price: number;
    };
  }[];
}

export interface FlashMessage {
  success?: string;
  error?: string;
}

/** 🔹 Props genéricos de página */
export interface PageProps {
  [key: string]: any;
  users?: PaginatedData<User>;
  categories?: PaginatedData<Category>;
  products?: PaginatedData<Product>;
  units?: PaginatedData<Unit>;
  sales?: PaginatedData<Sale>;
  flash?: FlashMessage;
}

export interface Product {
  id: number;
  product_name: string;
  description?: string;
  type: 'platillo' | 'bebida' | 'otro';
  buying_price: number;
  selling_price: number;
  stock: number;
  category_id: number;
  measurement_unit_id: number;
  category?: Category;
  measurementUnit?: Unit;
}
