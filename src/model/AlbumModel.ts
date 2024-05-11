export class AlbumModel {
    albumType?: string
    artists?: Artist[]
    externalUrls?: ExternalUrls
    id?: string
    images?: Image[]
    name?: string
    releaseDate?: string
    type?: string
    value?: number
}

type Artist = {
    externalUrls: ExternalUrls
    href: string
    id: string
    name: string
    type: string
    uri: string
}

type ExternalUrls = {
    externalUrls: _ExternalUrls;
}

type _ExternalUrls = {
    spotify: string;
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
}

type Image = {
    height: number
    url: string
    width: number
}