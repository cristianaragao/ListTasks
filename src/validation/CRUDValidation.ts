import * as Yup from "yup";

const messageRequerid: string = "Campo obrigatório";
const messageAtLeast1: string = "Adicione pelo menos 1 imagem";
const messageAtMost5: string = "Máximo de 5 imagens.";

const validation = {
    title: Yup.string().required(messageRequerid),
    description: Yup.string().required(messageRequerid),
    imagesPaths: Yup.array().of(Yup.string()).min(1, messageAtLeast1).max(5, messageAtMost5).required(messageAtLeast1),
}

export default Yup.object(validation);