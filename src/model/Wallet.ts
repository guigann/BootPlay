import { UserModel } from "./UserModel"

export class Wallet {
    id?: number
    balance?: number
    points?: number
    lastUpdate?: string
    users?: UserModel
}