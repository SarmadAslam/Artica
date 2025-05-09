import React from 'react';
import { Card, CardContent } from "../../../components/ui/card";
import { Category } from '../../../types/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Card className="text-center card-hover cursor-pointer">
      <CardContent className="pt-6">
        <div className="mb-4 text-[#421983]">{category.icon}</div>
        <h3 className="font-semibold text-lg">{category.name}</h3>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;