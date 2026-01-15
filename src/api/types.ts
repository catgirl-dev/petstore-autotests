import {JSONSchemaType} from "ajv";

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

export type ValidateSchemaType<T> = JSONSchemaType<T>;
export type ValidateBodyType<T> = T;

export type Headers = Record<string, string>;

export interface statusBody {
    status: string;
}

