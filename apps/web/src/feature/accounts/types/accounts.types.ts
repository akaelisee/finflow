
export type AccountType = "CHECKING" | "SAVINGS" | "CREDIT"

export type Accounts = {
  id: string
  name:string,
  bank:string,
  type: AccountType,
  initialBalance: number,
  currency:string,
  color:string 
  createdAt: string
  updatedAt: string
}

export type CreateAccountInput = {
    name:string,
    bank:string,
    type: AccountType,
    initialBalance: number,
    currency:string,
    color:string 
}

export type UpdateAccountInput = {
    name:string,
    bank:string,
    type: AccountType,
    initialBalance: number,
    currency:string,
    color:string 
}