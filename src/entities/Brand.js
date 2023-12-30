import { EntitySchema } from "typeorm";

export const Brand  = new EntitySchema({
    name: "Brand",
    tableName: "brands",
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