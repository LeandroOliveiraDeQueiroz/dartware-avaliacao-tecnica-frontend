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

-----------------------------------
# Há coisas a mudar aqui para baixo principalmente no useState

### useState

```
[value, setValue] = useState(initialValue);
```

Uma diferença do Hook para o Class-based Component é que o Hook pode guardar outras coisas além de um objeto.


Obs.: Os Reacts Events são como os events do JavaScript, porém são guardados em objetos pelo React, que os manipula e reutiliza. 


Só é permitido utilizar Hooks na raiz do componente(root). Não é possível fazer isso dentro de uma outra função ou de um condição(if).


Quando são feitas duas ou mais atualizações de estados em uma função síncrona o React junta e executa elas ao mesmo tempo, assim evitando renderizações desnecessárias

Como seria representado o ComponetDidWillUnmount method com hooks?


### useEfect

```
useEfect(()=>{}, [dependências]);
```

- O primeiro argumento é a função que será executada.

- O segundo argumento é um array com todas as variáveis/funções(dependências) externas necessárias dentro do primeiro argumento, as depedências.

- Hooks não são consideradas dependências. O segundo argumento do useState também não; Hooks ou React Hooks?

- Possíveis valores e resultados do segundo argumento:
  - null : A função será executada sempre após de toda renderização. Obs.: Se usar esse valor e atualizar o estado dentro desse método causa um loop.
  - []: A função será executada uma vez após a primeira renderização, como o ComponentDidMount faz no Class-based Component.
  - [x,y]: A função será executada sempre que a variáveis/funções x e y mudarem. Toda vez que renderiza um Functional Component funções escritas internamentes são recriadas, mesmo que não mudem nada. **Obs.:. Isso ocorre porque variáveis e funções (são objetos em JavaScript, então a referência muda) representam valor e podem ser tratadas como quase a mesma coisa.**
  
- **Obs. Extra: Caso uma dependência seja uma função recebida do componente pai e essa função atualize o estado do pai causará loop.**

Valor inicial  => acionar useEffect => muda estado do pai => função é recriada => acionar useEffect => muda estado do pai

-------------Fazer imagem dessse ciclo

Ex:

```
const Pai = (props) => {
  [value, setValue] = useState(“c”);

  const changeState = (v) =>{
    setValue(v);
  }

  return(<Filho changeState={changeState} />);
}

const Filho = (props) =>{
  {changeState} = props

  useEfect(()=>{
  changeState(“a”);
  },[changeState])
  
  return(<div/>);
}
```
**Para resolver isso usasse useCallback**

### useCallback

```
useCallback(()=>{}, [dependências])
```

- Embrulha funções para que essas sejam gravadas em memória cache, somente sendo renderizadas novamente caso alguma dependência mude.

- Caso nenhuma depedência mude a função da renderização atual é a mesma função da última renderização.


