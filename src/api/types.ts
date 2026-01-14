export interface Category {
    id: number;
    name: string;
}

export interface Tag {
    id: number;
    name: string;
}

export type Status = 'available' | 'pending' | 'sold';

export interface Pet {
    id: number;
    category: Category;
    name: string;
    photoUrls: string[];
    tags: Tag[];
    status: Status;
}

export interface DeletePetResponse {
    code: number;
    type: string;
    message: string;
}

export type ValidateJson = Pet | DeletePetResponse;

export type Headers = Record<string, string>;

export interface statusBody {
    status: string;
}

