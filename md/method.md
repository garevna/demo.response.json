# 🎓 Методы

**Метод** - это свойство-функция

В следующем примере объект  **obj**  имеет два свойства:  **name**  и  **showMessage**
```javascript
var obj = {
        name: "Иван",
        showMessage: function ( message ) {
                console.log ( message ? message : "Привет!" )
        }
}
```
```javascript
typeof obj.name         // "string"
typeof obj.showMessage  // "function"
```
Обращение к любому свойству:   ```имя объекта``` + ```.``` + ```имя свойства```

С методами отличие только в том, что для вызова метода после его имени нужны круглые скобки,
и если у метода есть формальные параметры - то в круглых скобках нужно перечислить аргументы 
( входные данные )
```javascript
obj.showMessage ( "Я иду в магазин" )
```
>>В результате такого вызова в консоль будет выведено  "Я иду в магазин"

Таким образом, вызов метода отличается от вызова обычной функции только тем,
что перед именем метода должно быть имя "хозяина", отделенное точкой от
имени метода

У всех функций ( и всех переменных ) в *JS* есть "хозяин"

поэтому все функции в *JS* - методы

а все переменные - свойства

у обычных функций ( и переменных ) хозяин - глобальный объект ( ```window``` )

все, что не находится в "частной собственности", принадлежит ему

Если при обращении к свойству или вызове метода "хозяин" не указан, значит этот хозяин - глобальный объект

```javascript
var x = 235
window.x       //  вернет 235
```

### 📝 Метод charCodeAt()

Метод ```charCodeAt()``` работает только со строками

Т.е. любая строка является "хозяином" метода ```charCodeAt()```

Этот метод возвращает числовой код символа в заданной позиции в строке

Номер позиции символа в строке передается методу в качестве параметра

☕ 1
```javascript
var userName = "Василий Алибабаевич",
userName.charCodeAt ( 4 )              // 1083
```
>>**1083** - это десятичный код символа *"л"* - четвертого символа от начала строки 

>>( нумерация символов начинается с нуля )

***
[🔗 w3schools](https://www.w3schools.com/jsref/jsref_charCodeAt.asp)
[🔗 Коды символов](https://www.ascii.cl/htmlcodes.htm)

### 📝 Метод push()

Метод  `push ()`  работает только с массивами

Т.е. любой массив является "хозяином" метода `push()`

Этот метод добавляет новый элемент в конец массива

Новый элемент передается методу в качестве параметра

☕ 2
```javascript
var users = [ "Jon", "Helen", "Mary" ]
users.push ( "Henry" ) 
```
в конец массива **users** будет добавлен элемент  *"Henry"* 

В результате массив **users** будет:  `[ "Jon", "Helen", "Mary", "Henry" ]`

⚠️ Метод `push ()` возвращает новую длину массива

Т.е. после выполнения операции:
```javascript 
z = users.push ( "Henry" ) 
```
значение переменной **z** будет равно 4

## [💼 Упражнения](https://docs.google.com/forms/d/e/1FAIpQLSfhSiifjcwm7tLhcQftjAXByl-O93y3o31i91wAMr-uvi-MzQ/viewform)

***
[🔗 w3schools](https://www.w3schools.com/jsref/jsref_push.asp)