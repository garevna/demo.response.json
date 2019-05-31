# ![ico-30 study] async | await

**ES7**

Иногда нужно синхронизировать несколько асинхронных операций

В ES7 это достигается легко с помощью асинхронной функции

Для объявления асинхронной функции используется ключевое слово **~async~** ( перед **_function_** )

в теле асинхронной функции перед каждым выражением, возвращающим промис, ставится ключевое слово  **~await~**

Результатом будет объект класса **AsyncFunction**

~~~javascript
async function test () {}
console.dir ( test )
~~~

~~~~console
▼ async ƒ test()
    arguments: (...)
    caller: (...)
    length: 0
    name: "test"
  ▼ __proto__: AsyncFunction
        arguments: (...)
        caller: (...)
      ► constructor: ƒ AsyncFunction()
        Symbol(Symbol.toStringTag): "AsyncFunction"
      ▼ __proto__: ƒ ()
        ► apply: ƒ apply()
          arguments: (...)
        ► bind: ƒ bind()
        ► call: ƒ call()
          caller: (...)
        ► constructor: ƒ Function()
          length: 0
          name: ""
        ► toString: ƒ toString()
        ► Symbol(Symbol.hasInstance): ƒ [Symbol.hasInstance]()
        ► get arguments: ƒ ()
        ► set arguments: ƒ ()
        ► get caller: ƒ ()
        ► set caller: ƒ ()
        ► __proto__: Object
~~~~

__________________________________

^^^[AsyncFunction]

^^![ico-20 warn] **AsyncFunction** не является глобальным объектом^^

^^Попытка отратиться к объекту **AsyncFunction** вызовет исключение:^^

~~~javascript
test instanceof AsyncFunction
~~~

![ico-20 err] ~Uncaught ReferenceError: AsyncFunction is not defined~

^^поэтому получить ссылку на нее можно, например, так:^^

~~~javascript
var AsyncFunctionConstructor = test.__proto__.constructor
~~~

^^или:^^

~~~javascript
var AsyncFunction = ( async function () {} ).__proto__.constructor
~~~

^^Теперь исключения не будет:^^

~~~javascript
test instanceof AsyncFunction  // true
~~~

^^^

![ico-20 warn] Асинхронная функция всегда возвращает промис

^^Поэтому нельзя конструктор объявить как асинхронную функцию - конструктор должен возвращать экземпляр объекта, а не обещание^^

_______________________________

## ![ico-25 icon] Принцип работы

Асинхронная функция является промисом, который обещает, что все асинхронные операции внутри него будут выполнены в строго заданном порядке, но когда это произойдет - неизвестно, поскольку каждая из операций будет выполнятся неизвестно сколько времени

В принципе, того же эффекта можно достичь с помощью цепочки промисов

Однако асинхронная функция делает код линейным и прозрачным

Внутри асинхронной функции синхронизируются вызовы коллбэков промисов

Ключевое слово  **~await~**  выполняет ту же роль, что и метод **~then()~** каждого промиса

### ![ico-25 cap] Пример 1

~~~js
let promise = message => new Promise (
    resolve => {
        let time = Math.round ( Math.random() * 3000 )
        setTimeout (
            () => resolve ( `${message}: ${time}` ),
            time
        )
    }
)

async function test () {
    return await promise (
        await promise (
            await promise ( "start" )
        )
    )
}

test ().then ( response => console.log ( response ) )
~~~

### ![ico-25 cap] Пример 2

~~~js
async function getUser ( userNum ) {
    return await ( await fetch ( `https://api.github.com/users/${userNum}` ) ).json()
}

getUser ( 5 ).then ( response => console.log ( response ) )
~~~

![ico-20 warn] Если бы сама асинхронная функция не была промисом, при ее вызове мы получили бы блокирующую операцию, что недопустимо

Итак, асинхронная функция является "оберткой" для нескольких асинхронных операций, которые строго упорядочиваются, т.е. их коллбэки вызываются в заданной последовательности

![ico-20 warn] Ключевое слово  **~await~**  можно использовать только внутри асинхронных функций

В противном случае будет сгенерировано исключение

![ico-20 err] ~Uncaught SyntaxError: await is only valid in async function~

______________________________________________

### ![ico-25 cap] Пример 3

Асинхронные процессы

~~~~javascript
function common ( message ) {
    return new Promise (
        ( resolve, reject ) => {
            setTimeout (
                () => resolve ( message ),
                Math.random() * 8000
            )
        }
    )
}

function first () {
    return common ( "first" )
}

function second () {
    return common ( "second" )
}

function third () {
    return common ( "third" )
}
~~~~

^^Задача - синхронизировать вызов коллбэков так, чтобы первым в консоль было выведено "**_first_**", затем "**_second_**", а затем "**_third_**"^^

^^Асинхронный код выводит их в случайном порядке:^^

~~~javascript
first().then( res => console.log ( res) )
second().then( res => console.log ( res) )
third().then( res => console.log ( res) )
~~~

^^**цепочка промисов**^^

~~~~javascript
first().then(
    res => {
        console.log ( res )
        second().then(
            res => {
                console.log ( res )
                third().then(
                    res => console.log ( res )
                )
            }
        )
    }
)
~~~~

^^**асинхронная функция**^^

~~~~javascript
let test = async () => {
    console.log ( await first() )
    console.log ( await second() )
    console.log ( await third() )
}

test()
~~~~

^^Как видно из примера, код асинхронной функции проще, чем цепочка промисов^^

________________________________

### ![ico-25 cap] Пример 4

~~~javascript
async function getUsersData ( userName ) {

    let userData = await ( await fetch ( `https://api.github.com/users/${userName}` ) ).json()

    document.body.appendChild (
        document.createElement ( "img" )
    ).src = userData.avatar_url

    let userRepos = await ( await fetch ( userData.repos_url ) ).json()

    return userRepos[0].events_url
}

getUsersData( 'josh' )
    .then ( events => console.log ( events ) )
~~~

_________________________________________

### ![ico-25 cap] Пример 5

Синхронизация асинхронных процессов приводит к увеличению времени выполнения

^^Предположим, есть две функции, возвращающие промис:^^

~~~javascript
var getNames = () =>
    new Promise ( ( resolve, reject ) =>
        setTimeout (
            () => resolve ( "Names" ),
            1000
        )  
    )

var getPosts = () =>
    new Promise ( ( resolve, reject ) =>  
        setTimeout (
            () => resolve ( "Posts" ),
            1000
        )
    )
~~~

^^Каждый вызов длится 1 секунду^^

^^Если мы будем использовать асинхронную функцию для последовательного вызова **getNames** и **getPosts**, то суммарная продолжительность выполнения этих двух асинхронных операций составит не менее 2 сек^^

~~~javascript
async function getData () {
    console.time ( 'time' )
    var posts = await getPosts ()
    var names = await getNames ()
    console.timeEnd ( 'time' )
    console.info ( `\n${ names } | ${ posts }\n\n` )
}

getData ()
~~~

**Результат в консоли**

~~~console

Names | Posts

time: 2002.258056640625ms
~~~

^^Что плохо?^^

^^То, что несвязанные между собой асинхронные процессы выстраиваются в очередь^^

^^Посмотрим на альтернативный вариант^^

~~~javascript
function getData () {
    console.time ( 'time' )
    Promise.all ([
        getNames (),
        getPosts ()
    ])
        .then (
            result => {
                console.info ( `\n${ result[0] } | ${ result[1] }\n\n` )
                console.timeEnd ( 'time' )
            }
        )
}
~~~

**Результат в консоли**

~~~console

Names | Posts

time: 1001.474365234375ms
~~~

_________________________________

### ![ico-25 cap] Пример 6

~~~javascript
function getData ( typ ) {
    return new Promise ( function ( resolve, reject ) {
        setTimeout ( () => {
            console.log ( 'Promise resolved: ', typ )
            resolve ( typ )
        }, 1000 )
    })
}

function getAllData () {
    console.time ( "Total" )
    let promises = Array.from ( arguments )
        .map ( x => getData ( x ) )
    Promise.all ( promises )
         .then ( response => {
             console.timeEnd ( "Total" )
             console.log ( "response: ", response )
          })
}

getAllData ( "figures", "colors", "diameters" )
~~~

^^Функция  **getData()**  возвращает промис^^

^^Промис будет разрешен через 1 сек^^

^^Функция  **getAllData()** формирует  массив промисов  **promises** и запускает сразу все асинхронные процессы с помощью метода  **_Promise.all ()_**^^

^^Что происходит в этом случае:^^

^^Мы не выстраиваем очередь, а запускаем сразу все асинхронные процессы параллельно^^

^^Однако упорядоченность возвращаемых данных контролирует **_Promise.all ()_**^^

^^В возвращаемом массиве данные будут упорядочены в той последовательности, в которой упорядочены промисы в массиве промисов^^

^^В этом случае **_Promise.all ()_** является удобной альтернативой асинхронной функции^^

^^Общая продолжительность операции не будет суммой продолжительности всех асинхронных процессов^^

^^В этом примере вместо 3 секунд, которые выполнялся бы код в случае последовательной обработки запросов, общая продолжительность составила 1 сек^^

___________________________

[![ico-25 cap] Пример 7 ](https://plnkr.co/edit/jsH8XKmc0B6g4q8iPZBf?p=preview)

_______________________

[![ico-30 hw] Тесты](https://garevna.github.io/js-quiz/#async)