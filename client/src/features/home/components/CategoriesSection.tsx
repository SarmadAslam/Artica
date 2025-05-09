import React from 'react';
import CategoryCard from './CategoryCard';
import { Category } from '../../../types/types';
import { Palette, Pencil, Hammer } from 'lucide-react';

const categories: Category[] = [
  { icon: <Palette className="w-8 h-8" />, name: 'Painting' },
  { icon: <Pencil className="w-8 h-8" />, name: 'Sketching' },
  { icon: <Hammer className="w-8 h-8" />, name: 'Crafts' }
];

const CategoriesSection: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Explore Art Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;