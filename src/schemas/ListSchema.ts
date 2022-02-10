import { Data } from "../stores/ListStore";

import getRealm from "./index";

export default class ListSchema {

    name = "List"

    static schema = {
        name: this.name,
        primaryKey: "id",
        properties: {
            id: { type: "string", indexed: true },
            title: "string",
            createdDate: "date",
            description: "string",
            imagesPaths: "string[]"
        },
    }

    addUpdateListSchema = async (data: Data) => {

        const realm = await getRealm();
    
        realm.write(() => {
            realm.create((new ListSchema()).name, data, Realm.UpdateMode.Modified);
        })
    
    };

    getListSchema = async () => {

        const realm = await getRealm();
    
        return realm.objects((new ListSchema()).name);
    
    };
    
    deleteListSchema = async (data: Data) => {
        const realm = await getRealm();
    
        realm.write(() => {
            let dataDelete: Data | null = data;
    
            realm.delete(dataDelete);
    
            dataDelete = null;
        })
    };
}