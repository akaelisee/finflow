export type Budgets = {
    id: string,
    userId: string,
    categoryId: string
    month: string,
    amount: number,
    createdAt: string
}

export type CreateBudgetsInput = {
    categoryId: string,
    amount: number,
    month: string
}

export type UpdateBudgetsInput = {
    categoryId: string, 
    amount: number,
    month: string
}