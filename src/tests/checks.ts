import Ajv, { JSONSchemaType, ValidateFunction } from "ajv";
import { Pet } from "../api/types";

const ajv = new Ajv({ allErrors: true });

export const validateSchema = (schema: any, responseJson: any): void => {
    const validate: ValidateFunction<unknown> = ajv.compile(schema);

    const valid: boolean = validate(responseJson);

    if (!valid) {
        console.error("Ошибки валидации по JSON-схеме:");
        validate.errors?.forEach(err => {
            console.error(`Path: ${err.instancePath}`);
            console.error(`Error: ${err.message}`);
            if (err.params) console.error(`Params: ${JSON.stringify(err.params)}`);
            console.error("----------");
        });

        throw new Error("Ошибка валидации по JSON-схеме");
    }
};
