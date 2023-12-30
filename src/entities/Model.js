import { EntitySchema } from "typeorm";

export const Model  = new EntitySchema({
    name: "Model",
    tableName: "models",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid",
        },

        name: {
            name: "name",
            type: "varchar",
        },
    },
})