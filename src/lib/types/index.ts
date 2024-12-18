// Common interfaces and types used across the application
export interface AppConfig {
  name: string;
  description: string;
}

export interface MenuItem {
  href: string;
  label: string;
  exact?: boolean;
}

export interface CardProps {
  title?: string;
  className?: string;
}