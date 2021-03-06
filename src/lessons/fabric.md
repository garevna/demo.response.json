# ![ico-30 study] Фабричные методы

| ![](https://github.com/garevna/js-course/raw/master/pictures/douglas-crockford.jpg) | «_Я думаю, что ООП без классов — это подарок человечеству от JavaScript_»<hr>[Дуглас Крокфорд](http://www.crockford.com/) |

Любая функция JS может вернуть объект

Если она делает это без использования ключевого слова **_~new~_**, то такая функция является **фабрикой**

______________________________

## ![ico-20 icon] ООП-объекты и структуры данных

| ^^Роберт Мартин, «Чистый код»:^^ |
| _~Объекты предоставляют поведение и скрывают данные<br/>Структуры данных предоставляют данные,<br/>но не обладают сколько-нибудь значительным поведением~_ |

![ico-25 cap] **Пример 1**

**Паттерн "_Модуль_"**

^^В этом примере с помощью IIFE и замыкания создается объект, данные которого скрыты от непосредственного доступа и доступны только через интерфейс, представленный методом _**getVar**_^^

~~~javascript
let google = ( function ( params, pin ) {
    return {
        getVar ( varName, pincode ) {
            return pin === pincode ?
                   params [ varName ] :
                   'No access'
        }
    }
} )( {
    name: "Google",
    token: "A7fgh14-771pd-ufr147"
}, '789541' )

console.log ( google.getVar ( "token" ) )            // No access
console.log ( google.getVar ( "name", "789541" ) )   // Google
~~~

^^Выведем объект **google** в консоль:^^

~~~console
▼ User {name: "Google", getVar: ƒ}
  ► getVar: ƒ getVar( varName, pincode )
    name: "Google"
  ► __proto__: Object
~~~

_____________________________

![ico-25 cap] **Пример 2**

^^В этом примере мы делаем то же самое, но используя расширение класса _User_<br/>Конструктор класса создает публичное свойство _name_<br/>Фабричный метод класса _updateUser_ позволяет расширить функционал класса, создать скрытые данные, доступные через интерфейс ( метод _**getVar**_ )^^

~~~~js
class User {
    constructor ( name ) {
        this.name = name || 'unknown'
    }
}
User.updateUser = function ( user, params, pin ) {
    return Object.assign ( user, {
        getVar ( varName, pincode ) {
            return pin === pincode ?
                   params [ varName ] :
                   'No access'
        }
    })
}

let google = User.updateUser ( new User ( "Google" ), {
        token: "AfG78-1nm*15ph",
        cash: 25000
}, "789451" )

google.getVar( "token", "789451" )  // "AfG78-1nm*15ph"
google.getVar( "cash", "789451" )   // 25000
~~~~

^^Выведем объект **google** в консоль:^^

~~~~google
▼ User {name: "Google", getVar: ƒ}
  ► getVar: ƒ getVar( varName, pincode )
    name: "Google"
  ▼ __proto__:
      ▼ constructor: class User
          ► updateUser: ƒ ( user, params, pin )
            arguments: (...)
            caller: (...)
            length: 1
            name: "User"
            prototype: {constructor: ƒ}
          ► __proto__: ƒ ()
      ► __proto__: Object
~~~~

__________________________________

## ![ico-25 icon] Полиморфизм

Фабричные методы дают возможность расширять функциональность конструктора, обеспечивая его полиморфизм

В следующем примере конструктор  **User**  имеет фабричный метод   **_createNewUser_**,
позволяющий создавать экземпляры класса с различным набором свойств и методов

экземпляры   **visitor**  и   **currentUser**,  созданные конструктором  **User**,
имеют различные свойства и методы

![ico-25 cap] **Пример 3**

~~~~js
function User () {
    this.talk = function ( key ) {
        document.write ( `<p>${key}: <b>${this [ key ]}</b></p>` )
    }
}

User.createNewUser = function( params ) {
    var user = new this
    for ( var key in params )
        user [ key ] = params [ key ]
    return user
}

var visitor = User.createNewUser( {
    name: 'migrant',
    timeVisit: new Date ().toLocaleString()
})
visitor.talk ( 'name' )
visitor.talk ( 'timeVisit' )

var currentUser = User.createNewUser ({
    name: prompt( 'What is your name?' ),
    age: prompt( 'How old are you?' ),
    id: Math.round ( Math.random () * 100000000 ),
    posts: {},
    registered: new Date ().toLocaleString().split( ', ' ),
    write: function ( text ) {
        this.posts = Object.assign ( this.posts, {
            [ new Date ().toLocaleString() ] : text
        } )  
    }
})
currentUser.talk ( 'name' )
currentUser.talk ( 'registered' )
currentUser.write ( `I'm here since ${new Date ().toLocaleString()}` )
~~~~

^^^[visitor]

~~~console
▼ User {talk: ƒ, name: "migrant", timeVisit: "01.11.2018, 13:40:41"}
    name: "migrant"
  ► talk: ƒ ( key )
    timeVisit: "01.11.2018, 13:40:41"
  ► __proto__: Object
~~~

^^^

^^^[currentUser]

~~~console
▼ User {talk: ƒ, name: "Nick", age: "25", id: 80661698, posts: {…}, …}
    age: "25"
    id: 80661698
    name: "Nick"
  ▼ posts:
        01.11.2018, 13:40:51: "I'm here since 01.11.2018, 13:40:51"
      ► __proto__: Object
  ► registered: (2) ["01.11.2018", "13:40:51"]
  ► talk: ƒ ( key )
  ► write: ƒ ( text )
  ► __proto__: Object
~~~

^^^

^^^[currentUser.__proto__.constructor]

~~~js
console.dir ( currentUser.__proto__.constructor )
~~~

~~~console
▼ ƒ User()
    createNewUser: ƒ ( params )
    arguments: null
    caller: null
    length: 0
    name: "User"
    prototype: {constructor: ƒ}
  ► __proto__: ƒ ()
~~~

^^^

Получили _перечислимый_ статический метод **_createNewUser_** конструктора

Сделаем то же самое с помощью класса

~~~javascript
class User {
    constructor () {
        this.talk = function ( key ) {
            document.write ( `<p>${key}: <b>${this [ key ]}</b></p>` )
        }
    }
    static createNewUser ( params ) {
        var user = new this
        for ( var key in params )
            user [ key ] = params [ key ]
        return user
    }
}
~~~
В этом случае статический метод класса **_createNewUser_** будет неперечислимым,<br/>
а в остальном все будет аналогично варианту с конструктором<br/>
^^Так что "под капотом" работает все то же прототипное наследование, только с косметическими "добавками"^^
