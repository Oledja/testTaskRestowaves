import { EntitySchema } from "typeorm";

export const Category  = new EntitySchema({
    name: "Category",
    tableName: "categories",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid"
        },

        name: {
            name: "name",
            type: "varchar",
        },
    },

    relations: {
        parentCategory: {
            target: "Category",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
        },
    },
})