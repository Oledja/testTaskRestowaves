import { EntitySchema } from "typeorm";


export const Product  = new EntitySchema({
    name: "Product",
    tableName: "products",
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

        code: {
            name: "code",
            type: "varchar"
        },

        price: {
            name: "price",
            type: "int"
        },

        sizes: {
            name: "sizes",
            type: "int",
            array: true
        },
    },

    relations: {
        categories: {
            name: "categories",
            target: "Category",
            type: "many-to-many",
            joinTable: {
                name: "products_categories",
                joinColumn: {
                    name: 'product_id',
                    referencedColumnName: 'id',
                },
                inverseJoinColumn: {
                    name: 'category_id',
                    referencedColumnName: 'id',
                },
                inverseSide: 'Category',
                cascade: true
            },
        },

        brand: {
            target: "Brand",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
        },

        model: {
            target: "Model",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
        },
    },
})