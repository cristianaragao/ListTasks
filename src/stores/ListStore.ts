import { makeAutoObservable } from "mobx";

import Realm from "realm";

import getRealm from "../schemas/index";

export interface Data {
    id: string;
    createdDate: Date;
    title: string;
    description: string;
    imagesPaths: string[];
}

class ListStore {

    list: Data[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    realmList = async () => {
        return await getRealm()
    }

    addUpdateItem = async (data: Data) => {

        const realm = await getRealm();

        realm.write(() => {
            realm.create("ListSchema", data, Realm.UpdateMode.Modified);
        })

        await this.getList();

        return true;
    }

    removeItem = async (id: string) => {

        const realm = await getRealm();

        realm.write(() => {

            const deletedItem: Realm.Object | undefined = realm.objectForPrimaryKey("ListSchema", id);

            realm.delete(deletedItem);

        })

        await this.getList();

        return true;

    }

    getList = async () => {

        const realm = await getRealm();

        const list = realm.objects("ListSchema");

        this.setList(list);

        if (list) return true;

    }

    setList = (l: Realm.Results<Realm.Object>) => {

        let data: Data[] = []

        l.forEach((item: any) => {
            data.push({
                id: item.id,
                createdDate: item.createdDate,
                title: item.title,
                description: item.description,
                imagesPaths: item.imagesPaths
            })
        })

        this.list = data;
    }

}

export default ListStore;