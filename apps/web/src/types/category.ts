export type Categories = {
    id: string,
    userId: string,
    name: string,
    color: string,
    icon: string,
    isDefault: boolean
}

export interface CategoriesPlayload {
    id: string,
    userId: string,
    name: string,
    color: string,
    icon: string,
    isDefault: boolean
}