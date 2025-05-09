import { z } from "zod"

export interface Artist {
  name: string;
  specialty: string;
  rating: number;
  imageUrl?: string;
}

export interface Category {
  name: string;
  icon: React.ReactNode;
}

export interface Competition {
  title: string;
  deadline: string;
  prize: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}