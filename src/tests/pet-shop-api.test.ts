import {PetStoreAPI} from "../api/client";
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';

const petId: number = 10;

describe("E2E Pet Lyfecycle", () => {
    it("Проверка жизненного цикла питомца в зоомагазине", async () => {
        // Добавление питомца
        const addResponse: Response = await PetStoreAPI.addPet(petId);
        const addResponseJson = await addResponse.json();
        expect(addResponse.status).toBe(200);
        expect(addResponse.headers.get("content-type")).toBe("application/json");
        expect(addResponseJson.id).toBe(petId);

        // Получение информации о питомце после добавления
        const getAfterPostResponse: Response = await PetStoreAPI.findPetById(petId);
        const getAfterPostResponseJson = await getAfterPostResponse.json();
        expect(getAfterPostResponse.status).toBe(200);
        expect(getAfterPostResponse.headers.get("content-type")).toBe("application/json");
        expect(getAfterPostResponseJson.id).toBe(petId);
        console.log(`Тело ответа после GET: ${JSON.stringify(getAfterPostResponseJson)}`)

        // Изменение статуса питомца
        // ...

        // Получение информации о питомце после изменения статуса
        // ...

        // Удаление питомца
        // ...

        // Получение информации после удаления питомца
        // ...
    })
})