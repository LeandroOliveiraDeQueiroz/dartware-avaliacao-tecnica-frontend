# dartware-avalicao-tecnica

## React Hooks

Modo criado para usar Functions Components (componentes criados como função) como Stateful Components.

No React são boas práticas ter o máximo de Stateless Components que for possível, os quais são criados usando Function Components. Assim a lógica do negócio fica concentrada em pouca classes, que são normalmente criadas utilizando Class-based Components. Então, sem utilizar Hooks, caso exista uma componente que não tinha estados e agora precisa ter, será necessário mudar esse componente de uma Função para uma Classe, causando assim um grande retrabalho.

Com o Hooks não é necessário utilizar Class-based Componentes, porque ele substitui suas funcionalidades.

### Definição

- Hooks são funções em JavaScript que podem só ser usadas dentro de Functional Components ou dentro de outros Hooks.

- A lógica do Hook é compartilhável.

- O nome dos Hooks por padrão do React tem o nome como: “useX”.

- Entra na versão 16.8 do React.

- Uma diferença do Hook para o Class-based Component é que o Hook pode guardar outras coisas além de um objeto.
