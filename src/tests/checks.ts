import Ajv, { JSONSchemaType, ValidateFunction } from "ajv";
import {DeletePetResponse, Pet, ValidateBodyType, ValidateSchemaType} from "../api/types";

const ajv = new Ajv({ allErrors: true });

export const validateSchema = (schema: ValidateSchemaType, responseJson: ValidateBodyType): void => {
    const validate: ValidateFunction<unknown> = ajv.compile(schema);

    const valid: boolean = validate(responseJson);

    if (!valid) {
        console.error("Ошибки валидации по JSON-схеме:");
        validate.errors?.forEach(err => {
            console.error(`Путь: ${err.instancePath}`);
            console.error(`Ошибка: ${err.message}`);
            if (err.params) console.error(`Параметры: ${JSON.stringify(err.params)}`);
            console.error("----------");
        });

        throw new Error("Ошибка валидации по JSON-схеме");
    }
};
