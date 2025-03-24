# Projeto API-V Front-End

## Como rodar o projeto

### Passo 1: Instalar as dependências
Primeiro, instale todas as dependências necessárias para o projeto:

```bash
npm install --save-dev @types/react@^19.0.0
```

### Passo 2: Iniciar o Expo
Depois de instalar as dependências, você pode iniciar o servidor do Expo com o seguinte comando:

```bash
npx expo start
```

### Passo 3: Instalar as dependências principais
Se as dependências essenciais como TypeScript e os tipos do React não foram instalados previamente, execute o seguinte comando:

```bash
npm install --save-dev typescript @types/react @types/react-native
```

### Passo 4: Instalar o Expo CLI globalmente
Se você não tem o Expo CLI instalado globalmente, pode instalar com o comando:

```bash
npm install -g expo-cli
```

### Passo 5: Instalar o React Native e outras dependências
Instale o React Native e o `react-native-gesture-handler` (caso não tenha sido instalado):

```bash
npm install react-native react-native-gesture-handler
```

### Passo 6: Instalar o Expo
Por fim, instale o pacote do Expo para garantir que o ambiente esteja configurado corretamente:

```bash
npm install expo
```

---

## Detalhes adicionais

- Certifique-se de ter o Node.js na versão compatível com o Expo.
- Caso esteja com problemas de versões conflitantes de dependências, tente usar o `--legacy-peer-deps` no npm.

## Problemas Comuns

Se você encontrar problemas durante a instalação, tente limpar o cache do npm com:

```bash
npm cache clean --force
```

Depois disso, tente rodar novamente o comando `npm install`.

---

Siga esses passos para garantir que seu projeto seja configurado corretamente. Caso tenha alguma dúvida ou encontre problemas, sinta-se à vontade para abrir uma *issue*.
```

### Explicação dos passos:

1. **Instalação de dependências**: Começamos com a instalação do `@types/react@^19.0.0`, que foi mencionado no erro.
2. **Iniciar Expo**: Depois de instalar as dependências, o próximo passo é iniciar o Expo.
3. **Instalação de dependências principais**: Caso a instalação de TypeScript e dos tipos do React não tenha sido feita corretamente, executamos o comando para instalá-las.
4. **Instalação do Expo CLI globalmente**: Se o Expo CLI não estiver instalado globalmente, ele é instalado.
5. **Instalação do React Native e outras bibliotecas**: Instalamos `react-native` e outras bibliotecas como `react-native-gesture-handler`.
6. **Instalação do Expo**: A instalação do pacote do Expo é feita por último.
```



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
cd /src
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

### **Erro ao Instalar o React Native CLI:**

Se você encontrar o erro ao executar `npm install -g react-native-cli`, relacionado à política de execução do PowerShell, siga estas etapas para resolver:

1. **Alterar a Política de Execução do PowerShell**:

   - Abra o **PowerShell como administrador**.
   - Verifique a política de execução com:

     ```bash
     Get-ExecutionPolicy
     ```

     Caso o retorno seja `Restricted`, altere a política de execução:

     ```bash
     Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
     ```

   - Confirme com `Y`.

2. **Tente Novamente o Comando**:

   Após alterar a política, tente executar o comando novamente:

   ```bash
   npm install -g react-native-cli
   ```

3. **Verifique a Instalação**:

   Verifique se a instalação foi bem-sucedida com:

   ```bash
   react-native --version
   ```

- Para outros erros, limpe o cache:

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

---
