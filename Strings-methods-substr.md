# :mortar_board: Методы работы со строками

:file_folder: `Операции со строками`

* [`+`](Strings-methods-concat)

:file_folder: `Методы строк`

* [`indexOf()`](Strings-methods-indexOf)
* [`slice()`](Strings-methods-slice)
* [`substring()`](Strings-methods-substring)

***

### substr()

Извлекает подстроку из строки

Этот метод похож на `slice()`, но второй аргумент указывает длину извлекаемой подстроки

Исходная строка не меняется

:coffee: :one:

```javascript
var str = "Веселый денек был сегодня"
console.log ( str.substr ( 8, 5 ) )
```

в консоли будет:
```
денек
```

:coffee: :two:

```javascript
var str = "Веселый денек был сегодня"
console.log ( str.substr ( 0, 7 ) )
```
> `в консоли будет: Веселый`

***

* [`toLowerCase()`](Strings-methods-toLowerCase)
* [`toUpperCase()`](Strings-methods-toUpperCase)
* [`split()`](Strings-methods-split)
* [`trim()`](Strings-methods-trim)
* [`charAt()`](Strings-methods-charAt)
* [`charCodeAt()`](Strings-methods-charCodeAt)
* [`repeat()`](Strings-methods-repeat)
* [`replace()`](Strings-methods-replace)
* [`padStart & padEnd`](Strings-methods-padStart-padEnd)

:file_folder:` Дополнительно`

* [`String.fromCharCode()`](String-fromCharCode)
* [`Переменные в литералах`](Strings-vars-and-literals)

***

#### [:briefcase: Тесты](https://garevna.github.io/js-quiz/#stringMethods)

***

| [:link:` MDN`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String "Открывайте в новой вкладке") | [:link:` String Methods`](https://www.w3schools.com/js/js_string_methods.asp "Открывайте в новой вкладке") | [:link:` String Reference`](https://www.w3schools.com/jsref/jsref_obj_string.asp "Открывайте в новой вкладке") |
|-|-|-|