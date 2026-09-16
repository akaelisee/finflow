export type Category = {
  id: string;
  userId: string | null;    
  name: string;
  color: string;
  icon: string;
  isDefault: boolean;
  createdAt: string;
};

// Ce qu'on envoie pour créer (pas d'id, pas de createdAt)
export type CreateCategoryInput = {
  name: string;
  color: string;
  icon: string;
};

// Ce qu'on envoie pour modifier (tout optionnel)
export type UpdateCategoryInput = {
  name?: string;
  color?: string;
  icon?: string;
};