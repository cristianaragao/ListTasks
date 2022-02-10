import { makeObservable, observable, action } from "mobx";

import ListSchema from "../schemas/ListSchema";

export interface Data {
    id: string;
    createdDate: Date;
    title: string;
    description: string;
    imagesPaths: string[];
}

class ListStore {

    list: Data[] = [];

    private listSchema: ListSchema = new ListSchema();

    constructor() {
        makeObservable(this, {
            list: observable,
            addItem: action,
            updateItem: action,
            removeItem: action,
            getList: action
        })
    }

    addItem = (data: Data) => {

        this.list.push(data);

        return true;
    }

    getList = async () => {
        const data = await this.listSchema.getListSchema();
        console.log("results: ", data);
        console.log("results: ", typeof data);

    }

    updateItem = (data: Data) => {

        const { id } = data;

        const index = this.list.findIndex(item => item.id === id);

        this.list[index] = data;

        return true;
    }

    removeItem = (id: string) => {

        this.list = this.list.filter(item => item.id !== id);

        return true;

    }

}

export default ListStore;