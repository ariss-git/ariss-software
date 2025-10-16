export interface FetchCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  created_at: string;
  panel_user_id: string;
}

export type AddCategory = {
  title: string;
  description?: string | null;
  image: string;
  panel_user_id: string;
};
