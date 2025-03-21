# Guia de Configuração do Projeto React Native no VSCode

Siga os passos abaixo para rodar seu projeto React Native no VSCode e instalar as dependências necessárias.

## 1. **Instalar o Node.js e npm**

Instale o [Node.js](https://nodejs.org/) para ter o npm e o Node.js no seu sistema.

## 2. **Instalar o Expo (se aplicável)**

Se o projeto usa **Expo**, instale o Expo CLI globalmente:

```bash
npm install -g expo-cli
```

Caso contrário, siga as instruções do React Native CLI.

## 3. **Abrir o Projeto no VSCode**

No terminal, navegue até a pasta do seu projeto:

```bash
cd /caminho/para/seu/projeto
```

## 4. **Instalar as Dependências**

Instale as dependências do projeto:

```bash
npm install
```

## 5. **Instalar Dependências do React Native**

Se necessário, instale as dependências do React Native:

```bash
npm install react-native react-native-gesture-handler
```

Para projetos Expo, instale também o pacote do Expo:

```bash
npm install expo
```

## 6. **Rodar o Projeto**

- **Expo**: 

```bash
expo start
```

- **React Native CLI**:

```bash
npx react-native run-android  # Para Android
npx react-native run-ios      # Para iOS (Mac com Xcode necessário)
```

## 7. **Outros Ajustes**

- Para rodar em emuladores, instale e configure o **Android Studio** ou **Xcode**.
- Conecte o dispositivo físico e execute o comando de execução.

## 8. **Solução de Problemas**

- Limpe o cache caso encontre erros:

```bash
npm cache clean --force
```

- Para erros de build, tente:

```bash
npx react-native run-android --variant=release
```

## 9. **Reiniciar o Servidor de Desenvolvimento**

Caso as mudanças não apareçam, reinicie o servidor:

- **Expo**: Pressione `r` no terminal.
- **React Native CLI**:

```bash
npm start --reset-cache
```

Agora você está pronto para rodar seu projeto React Native no VSCode!
