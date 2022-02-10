export default class ListSchema {
    static schema = {
        name: "ListSchema",
        primaryKey: "id",
        properties: {
            id: { type: "string", indexed: true },
            title: "string",
            createdDate: "date",
            description: "string",
            imagesPaths: "string[]"
        },
    }

}