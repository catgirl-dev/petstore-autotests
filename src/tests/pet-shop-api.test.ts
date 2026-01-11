import { PetStoreAPI } from "../api/client";
import { describe, it, expect } from "vitest";

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


describe("E2E Pet Lifecycle", () => {
    it("Проверка жизненного цикла питомца в зоомагазине", async () => {

        if (!allure) {
            throw new Error('Allure is not initialized. Check vitest.config.ts setupFiles.');
        }

        allure.epic("Pet Store");
        allure.feature("Pet Lifecycle");
        allure.story("CRUD операции с питомцем");
        allure.severity("critical");
        allure.tag("e2e");
        allure.tag("pet");

        await allure.step("Добавление питомца", async () => {
            const res = await PetStoreAPI.addPet(petId);
            const json = await res.json();

            allure.attachment("Response Body", JSON.stringify(json, null, 2), "application/json");
            expect(res.status).toBe(200);
            expect(json.id).toBe(petId);
        });

        await allure.step("Получение информации после добавления", async () => {
            const res = await PetStoreAPI.findPetById(petId);
            const json = await res.json();

            allure.attachment("Response Body", JSON.stringify(json, null, 2), "application/json");
            expect(res.status).toBe(200);
            expect(json.id).toBe(petId);
        });

        await allure.step("Изменение статуса на sold", async () => {
            const res = await PetStoreAPI.putPet(petId);
            const json = await res.json();

            allure.attachment("Request Body", JSON.stringify({ status: "sold" }), "application/json");
            allure.attachment("Response Body", JSON.stringify(json, null, 2), "application/json");
            expect(res.status).toBe(200);
            expect(json.id).toBe(petId);
        });

        await allure.step("Проверка нового статуса", async () => {
            const res = await PetStoreAPI.findPetById(petId);
            const json = await res.json();

            allure.attachment("Response Body", JSON.stringify(json, null, 2), "application/json");
            expect(json.status).toBe("sold");
        });

        await allure.step("Удаление питомца", async () => {
            const res = await PetStoreAPI.deletePetById(petId);
            const json = await res.json();

            allure.attachment("Response Body", JSON.stringify(json, null, 2), "application/json");
            expect(res.status).toBe(200);
        });

        await allure.step("Проверка отсутствия питомца", async () => {
            const res = await PetStoreAPI.findPetById(petId);
            allure.attachment("Response Status", res.status.toString(), "text/plain");
            expect(res.status).toBe(404);
        });
    });
});