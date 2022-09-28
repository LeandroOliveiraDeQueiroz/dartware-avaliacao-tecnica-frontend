dartware-avalicao-tecnica
=============================

Irei anotar aqui tudo do curso de [React.js](https://www.udemy.com/course/react-the-complete-guide-incl-redux/) que eu não sabia, não lembrava ou achei interessante. Também fica aqui como um repositório público, caso alguém tenha algum interesse vou anotar algumas coisas básica também. 

# React

"A JavaScript Library for building User Intefaces"

- Baseando em Componentes, assim é mais fácil de modificar e reutilizar.

## React DOM

- Renderiza um Componente React para o verdadeiro DOM. **Obs: Antes disso acontecer o Componente é transformado de JSX para JavaScript**

- ReactDOM.render(<Component/>, document.getElementById('root'))

## Why React ?

- É mais fácil de lidar com o UI State que o JavaScript puro (document.querySelector) ou JQuery.

- Por ser mais fácil o desenvolvedor pode focar mais na lógica do negócio.

## Single Page Applications X Multi Page Applications

............

## Next Generation JavaScript (ES6 e ES7)

- Variáveis: var, let, const
- É preferível usar let que var porque ela sempre existe somente no menor escopo. **Obs.: Ao criar um let dentro de uma condição, esss não poderá ser acessado fora dela**


- **Não esquecer os tipos de uma linguagem** - Matéria de LP

  - Primitivos: Em geral cópia por valor
  - Compostos: Em geral cópia por referência

É uma boa pratica em React não alterar o estado diretamente - [Ver Spread operation](#spread)





## ES7

...

- Cria armazena funções dentro de váriaveis para evitar a utilização do mesmo nome para duas coisas. Ex:

const myMethod = () => {
}


### Spread (#spread)

Causa um efeito de join dentro de arrays ou objetos pela utilização de 3 pontos. Pode ser usado para copiar um array ou objeto

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

## Webpack:

Quando estamos desenvolvendo uma aplicação queremos que ela seja modular com cada método e classe tendo um foco. Assim é mais fácil de entender, encontrar bugs e refatorar caso seja necessário. O problema disso é que em geral, os browsers não aceitam arquivos separados, por isso é necessário de um bundle (empacotador) para lidar com esses arquivos.

## Babel:

Transpila o código em React.js e o JXS para javascript puro, assim qualquer navegador consegue executar a aplicação em React. Além disso, muitos browsers não aceitam ECMA Script 6 e 7, por isso o código é transformado para o ECMA Script 5.

## GraphQL:


Query language for API's like SQL is for Databases. Facebook created to speed up theis mobile apps that made alot of calls to the server and avoid overfetching and underfetching. RestFull API (follow Rest constraints).

Advantages:
- Client can control which data he want from the server.
- Get many resourses in a single resquest. No need to made two request for two routes.
- Describe schema that describe the API. So is easy to know what the API can proved. Like a clean contract.

Is possible open a web interface in localhost:API_PORT/graph-ql/

Create a project with Apollo server in GraphQL

Under the hood Apollo uses express but is possible use another packages too. Use apollo-server-express attach Apollo(like a middleware) on Express server. The difference is the second way expose the Express enabling make additional configutarions

![image](https://user-images.githubusercontent.com/36925470/192650154-44a31d00-63a7-468b-99d0-7b144e87dd78.png)

easterEgg: Apollo always do POST's for send all the required needs: selected fields like a JSON

Apollo sandbox make a API a Documentation based on the graphQL types

Basic Scalar(leaves of a query - the most simple object part of GraphQL):
Int
Float
Boolean
ID

Custom scalar:
Date
Cash

![image](https://user-images.githubusercontent.com/36925470/192653565-084d251a-fd49-433f-9354-c334b98681a4.png)

The resolvers can be async with we want.

Query, Mutation and Custom Types:

Query: Describe all the queries that is possible make to the server
Mutation: Describe all the mutations ('Changes in the database')
Custom types: Can be created to describe a object. Is created based on GraphQL Scalars and anothers Custom Types.

'!': define a atribute mandatory 
'[]': define a array of a Custom Type or a Scalar

# Field Selection

GraphQL make like a contratct of the API with possible the FrontEnd's. For example: if the API don't send a required field will cause a error. And the Frontend can't get a not specidied field.
The mandatory signal obrigat the Server provide a field but the FrontEnd don't need to get that field if don't need

# Associate types - Creating API for database relationship

Create a another type and make the relationship. Of course the backend must to get the other table in the database

```
type Company {
  id: ID!
}

type Job {
 id: ID!
 title: String!
 company: Company
}
```

If we create a resolver with the name Company, if we query a list of Jobs of length N, the method Company will be called N times which one reciving a job and expecting the response of the type job.

