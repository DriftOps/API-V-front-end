# API-V Front-End

Este projeto é o front-end da aplicação **API-V**. Ele foi desenvolvido utilizando o **React Native** e **Expo**, proporcionando uma maneira fácil e rápida de iniciar e desenvolver para dispositivos móveis.

## Instruções para Instalação e Execução

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão recomendada: LTS)
- **npm** (gerenciador de pacotes do Node.js)
- **Expo CLI** (se não tiver, use `npm install -g expo-cli`)

### Passos para rodar o projeto

1. **Acesse o diretório do projeto**:
    ```bash
    cd src
    ```

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
Get-ExecutionPolicy -List


npm install -g expo-cli

npx expo install @react-native-community/datetimepicker
npm install react-native-modal-datetime-picker

npm install react-native-mask-input

2. **Instale as dependências**:
    ```bash
    npm install
    ```

3. **Inicie o servidor de desenvolvimento**:
    ```bash
    npx expo start
    ```

    Isso irá abrir a interface do Expo no seu navegador e você poderá escanear o QR code com o app Expo Go no seu celular para testar o app.

### Caso o comando `npx expo start` não funcione corretamente:

Se o `npx expo start` não funcionar ou o servidor não conseguir iniciar, tente rodar o comando abaixo para usar o túnel, o que pode ajudar a contornar problemas de rede:

```bash
npx expo start --tunnel
