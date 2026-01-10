import {PetStoreAPI} from "../api/client";

export class testPetLyfecycle {
    async testPetLyfecycle() {
        // POST. Добавляем питомца
        const result: Response = await PetStoreAPI.addPet()

    }
}