# Aplicativo ListTasks

Aplicativo CRUD de Tarefas com: 
- React Native
- MOBX
- RealmDB
- Native Base

<hr/>

🛠 Instalação e configuração:

Esse projeto foi criado e configurado com o Expo CLI.

Nota: nas versões anteriores à versão 44 do Expo SDK, o framework não tem possibilidade de integração com o RealmDB. Porém, na versão atual, o Expo necessita do [EAS](https://docs.expo.dev/eas/) para compilar o aplicativo com Realm nativamente. 
Logo, é necessário a configuração abaixo para a correta instalação do aplicativo.

Supondo que você já tem o ambiente de desenvolvimento pronto (NodeJS, GIT, ), siga abaixo para os passos de instalação. Caso contrário,
entre neste link para configurar o ambiente.

Siga as etapas abaixo para rodar o aplicativo (somente para dispositivos Android!).

* ```bash
npm install
```
instala as dependências do projeto

* ```bash
npm install -g expo-cli eas-cli
```
instala o comando de linha do Expo e o comando de linha do Expo Aplication Services, que servirá para rodar a build do Android.

* ```bash
eas build --profile development --platform android
```
e Voilà: uma compilação de desenvolvimento do projeto (build do projeto para Android).
Mas isso não é o suficiente para rodar o projeto no dispositivo.
Você vai criar e/ou logar em uma conta Expo e instalar a compilação do projeto (pelo dispositivo físico ou emulador).

* ```bash
 expo start --dev-client
```
O comando acima inicia a compilação e, então, o aplicativo estará pronto para uso (de desenvolvimento).

Os passos acima, você encontra com mais detalhes [neste link](https://docs.expo.dev/development/getting-started/), no site da Expo.

## Obrigado pela visita! :)