import { PetStoreAPI } from "../api/client";
import { describe, it, expect } from "vitest";
import { validateSchema } from "./checks";
import petSchemaJson from './schemas/pet.schema.json';
import deletePetSchemaJson from './schemas/delete-pet.schema.json';
import {JSONSchemaType} from "ajv";
import {DeletePetResponse, Pet} from "../api/types";

const petSchema: JSONSchemaType<Pet> = petSchemaJson as JSONSchemaType<Pet>;
const deletePetSchema: JSONSchemaType<DeletePetResponse> = deletePetSchemaJson as JSONSchemaType<DeletePetResponse>;

const petId = 10;

declare const allure: {
    epic: (name: string) => void;
    feature: (name: string) => void;
    story: (name: string) => void;
    severity: (name: string) => void;
    tag: (name: string) => void;
    step: <T>(name: string, fn: () => T | Promise<T>) => Promise<T>;
    attachment: (name: string, content: string, type: string) => void;
    parameter: (name: string, value: string) => void;
};


describe("E2E Жизненный цикл питомца в магазине", () => {
    it("Проверка жизненного цикла питомца в зоомагазине", async () => {

        if (!allure) {
            throw new Error("Аллюр не инициализирован. Настройте vitest.config.ts");
        }

        allure.epic("Магазин питомцев");
        allure.feature("Жизненный цикл питомца");
        allure.story("CRUD операции с питомцем");
        allure.severity("critical");
        allure.tag("e2e");
        allure.tag("pet");

        await allure.step("Добавление питомца", async () => {
            const res: Response = await PetStoreAPI.addPet(petId);
            const json: Pet = await res.json();

            allure.attachment("Response Body", JSON.stringify(json, null, 2), "application/json");

            expect(res.status).toBe(200);
            expect(json.id).toBe(petId);

            validateSchema(petSchema, json);
        });

        await allure.step("Получение информации после добавления", async () => {
            const res: Response = await PetStoreAPI.findPetById(petId);
            const json: Pet = await res.json();

            allure.attachment("Response Body", JSON.stringify(json, null, 2), "application/json");

            expect(res.status).toBe(200);
            expect(json.id).toBe(petId);

            validateSchema(petSchema, json);
        });

        await allure.step("Изменение статуса на sold", async () => {
            const res: Response = await PetStoreAPI.putPet(petId);
            const json: Pet = await res.json();

            allure.attachment("Request Body", JSON.stringify({ status: "sold" }), "application/json");
            allure.attachment("Response Body", JSON.stringify(json, null, 2), "application/json");

            expect(res.status).toBe(200);
            expect(json.id).toBe(petId);

            validateSchema(petSchema, json);
        });

        await allure.step("Проверка нового статуса", async () => {
            const res: Response = await PetStoreAPI.findPetById(petId);
            const json: Pet = await res.json();

            allure.attachment("Response Body", JSON.stringify(json, null, 2), "application/json");

            expect(json.status).toBe("sold");

            validateSchema(petSchema, json);
        });

        await allure.step("Удаление питомца из магазина", async () => {
            const res: Response = await PetStoreAPI.deletePetById(petId);
            const json: DeletePetResponse = await res.json();

            allure.attachment("Response Body", JSON.stringify(json, null, 2), "application/json");

            expect(res.status).toBe(200);

            validateSchema(deletePetSchema, json);
        });

        await allure.step("Проверка отсутствия питомца в магазине", async () => {
            const res: Response = await PetStoreAPI.findPetById(petId);

            allure.attachment("Response Status", res.status.toString(), "text/plain");

            expect(res.status).toBe(404);
        });
    });
});