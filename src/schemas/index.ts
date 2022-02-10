import Realm from "realm";

import ListSchema from "./ListSchema";

const databaseOptions = {
    schema: [
        ListSchema
    ]
}

const getRealm = async () => {
    return await Realm.open(databaseOptions);
}

export default getRealm;