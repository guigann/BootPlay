import { UserModel } from "./UserModel"

export class Album {
    artistName?: string
    id?: string
    idSpotify?: string
    name?: string
    imageUrl?: string
    users?: UserModel[]
    value?: number
}