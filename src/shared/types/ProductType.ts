import { CategoryType } from './CategoryType';

export interface ProductType {
  id: number;
  name: string;
  image: string;
  price: number;
  descricao: string;
  category?: CategoryType;
}
