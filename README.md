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

If we create a resolver with the name Company, if we query a list of Jobs of length N, the method Company will be called N times which one reciving a job and expecting the response of the type job. Therefore the database will be called 1 time to the Jobs and N for the Companies (n+1). That is the N + 1 problem.(#n+1)

We GraphQL is possible navigate throw the objects. If there is a resolver for that field the frontend can resquest that field, if the a inner field of the first field have a resolver that can be queried too.
```
Query {
  job(id:ID!): Job
}
Company {
  name: String
  headquarters: String
  jobs: [Job]
  
}

Job {
  name: String
  sallary: Float
  company: Company
}
```
Query - front:
```
query ($id: ID!): {
  Job (id: $id){
    name
    company {
      name
      headquarters
      jobs {
        name
        sallary
      }
    }
  }
}
```
With that code is possible to know all the Jobs that are in the same company of the queried job($id). Facebook can uses to find friends of your friends and suggest for you.

# Fragment (#fragment)

Part of a object selected to be reused in a lot of places of the code. Nowadays the company is using strings to make it, but is better (code pattern) use the fragment. With it avoid errors to query different fields in differents queries that share some types (associate). That is really important for Apollo Client Cache.

Syntax: fragment "Name" on "Type" { "fields selection" }

```
const jobDetail = gql`
  fragment JobDetail on Job {
    name
    company {
      name
      headquarters
      jobs {
        name
        sallary
      }
    }
  }
`

gql`
  query ($id: ID!): {
    Job (id: $id){
      ...JobDetail
    }
  }, 
  ${jobDetail}
`
```
----

Note: async functions are a promise(return new Promise())

Input is a type to define the fields to be the Query or Mutation parameters,
Type is a output of a Query or a Mutation

In GraphQL is always deliveried what we queried. So if we queried a mutation createAJob, the server will response with the results inside of the object createAJob. In the end, createAJob return a job, therefore "make sense" the results outcome in a object job. For that situtations GraphQL allow create a allias for a resquest.

**Authetication**

GraphQL allow get data from the real request (POST) by the param context. That param expected a function that recieve the req (resquest) and return the data that need to by pass for the resolvers. Example: JWT (JSON Web Token) in attach in the request by the browser, can be parsed and send just the id for the resolver

# Apollo Client

**Apollo Client**

In general is the same of use the GraphQL resquest modules. The only difference is that Apollo cliente can cache the results of the resquest. Therefore if Apollo Cliente already a data of some resquest, it can access the cache and don't make the fecth.

### **Cache**

Apollo Client allow cache the graphQL objects in objects format, therefore if the next query resquest for the data a of a Job with id x, if this object is on the cache Apollo will return the cached object and won't make a resquest for the server.

****Warming****
If a document is cached by the user 1 and be updated by other user, when user try to query this document will recieve with the wrong value, the cached one.

Situation make sense use:
 - When want to create a document and redirect for the a page that show it. Update the cache in the creation component writting the job, the other component just need make the normal GraphQL resquest. Maybe delete the cache in this can be good

**Fragment**
Part of a object to be reused in a lot of place of the code. Nowadays we are using strings to make it, but is better (code pattern) use the fragment

**Apollo React Hooks**

Make queries, mutations by Hooks to make more easy make the requests

Apollo Provider: Provide a Apllo client to the App, therefore use the hooks inside of all components by props

**Apollo Hooks**

useQuey: 
- The return work like a state. If change the value re-render the JSX
- Params: query, variables, options (fetchPolicy)
- Return data, loading and error

useMutation(GraphQL_query):
- Return a array: [mutate, result]
- The mutate make the resquest. Is  async function (Promise). Return a result equal the useMutation result.
- The result is formed by: {data, loading, error}. 
- The result of the hook is a state, therefore when some intern propertie changes the component can be re-render if need. Example: Pass loading for show a loading spinner and disable the submit button. When submit the loading will change to true and re-rendering the page.
- The result of the mutate function is a variable for be used inside a method. Example: After submit the resquest in the same method is possible handle with erros (Snackbar, feedback) and successes (feedback, redirect).


#### Data loaders

- Created by a Facebook Enginier and came back to have relevance because of GraphQL to resolve the N+1 problem. [Ver N+1 problem](#n+1). The data loaders keep operations for create batchs to the database. Also can cache the database queries results. The Data Loader is creating passing a database query and instead of call the database in the resolver, it's call the loader. The loader will make a batch for all the equal queries and call the database just once. Example:
-
Instead of call a select id, name where id === "x" N times will use select id, name where id in ["x", "y","z"]







