# dartware-avalicao-tecnica

## Anotações

Irei anotar aqui tudo do curso de [React.js](https://www.udemy.com/course/react-the-complete-guide-incl-redux/) que eu não sabia, não lembrava ou achei interessante. Também fica aqui como um repositório público, caso alguém tenha algum interesse vou anotar algumas coisas básica também. 

## React

"A JavaScript Library for building User Intefaces"

- Baseando em Componentes, assim é mais fácil de modificar e reutilizar.

### React DOM

- Renderiza um Componente React para o verdadeiro DOM. **Obs: Antes disso acontecer o Componente é transformado de JSX para JavaScript**

- ReactDOM.render(<Component/>, document.getElementById('root'))

### Why React ?

- É mais fácil de lidar com o UI State que o JavaScript puro (document.querySelector) ou JQuery.

- Por ser mais fácil o desenvolvedor pode focar mais na lógica do negócio.

### Single Page Applications X Multi Page Applications

............

### Next Generation JavaScript (ES6 e ES7)

- Variáveis: var, let, const
- É preferível usar let que var porque ela sempre existe somente no menor escopo. **Obs.: Ao criar um let dentro de uma condição, esss não poderá ser acessado fora dela**


- **Não esquecer os tipos de uma linguagem** - Matéria de LP

- Primitivos: Em geral cópia por valor
- Compostos: Em geral cópia por referência

**É uma boa pratica em React não alterar o estado diretamente**



#### ES7

...

- Cria armazena funções dentro de váriaveis para evitar a utilização do mesmo nome para duas coisas. Ex:

const myMethod = () => {
}

#### Spread

Causa um efeito de join dentro de arrays ou objetos pela utilização de 3 pontos

Ex. 1:
```
var x = [1,2,3]
var y = [...,3]
console.log(y)
- - - - - - - -
[1,2,3,4]
```

Ex. 2:

```
var x = {name: 'Lele', age: 21} 
var y = {...x, age: 22}
console.log(y)
- - - - - - - -
{name: 'Lele', age: 22}
```

### Rest

Causa um efeito de join nos argumentos de uma função


```
const sort = (...args) = > {
  return args.sort();
}

sort(1,3,4,2);
```
Destructuring

- Desestruturação de arrays ou objetos

Ex. 1:
```
[a, , c] = ['Lele, 'Lucas', 'Lucio']
console.log('a:' + a)
console.log('c: ' + c)
- - - - - - - -
a: Lele
c: Lucio
```

Ex.2:

```
{name} = {name 'Lele', age: 21}
console.log(name)
- - - - - - - -
Lele
```

### Webpack:

Quando estamos desenvolvendo uma aplicação queremos que ela seja modular com cada método e classe tendo um foco. Assim é mais fácil de entender, encontrar bugs e refatorar caso seja necessário. O problema disso é que em geral, os browsers não aceitam arquivos separados, por isso é necessário de um bundle (empacotador) para lidar com esses arquivos.

### Babel:

Transpila o código em React.js e o JXS para javascript puro, assim qualquer navegador consegue executar a aplicação em React. Além disso, muitos browsers não aceitam ECMA Script 6 e 7, por isso o código é transformado para o ECMA Script 5.
