
# ![ico-30 icon] Переменные. Типы данных

_____________________________________________________________

## ![ico-25 icon] Оператор typeof

Оператор  ~typeof~  возвращает строку

Возможные значения, возвращаемые оператором ~typeof~:

• ~string~
• ~number~
• ~boolean~
• ~object~
• ~undefined~
• ~function~
• ~symbol~

![ico-25 cap]  

^^Наберите в консоли:^^

~~~javascript
var x = 10
typeof x      // "number"
~~~

^^А теперь выполните код в консоли:^^

~~~javascript
x = "google"
typeof x     // "string"
~~~

^^Теперь выполните в консоли следующий код:^^

~~~javascript
var x = false
typeof typeof x  // "boolean"
~~~

_____________________________________________________________

## ![ico-25 icon] string

Строки состоят из символов и заворачиваются в двойные ( *"мама"* ) или одинарные ( *'мама'* ) кавычки

Также можно завернуть строку в обратные кавычки **~ ` ~**

~~~javascript
var sample = `This is a sample`
~~~

Если внутри строки встречаются двойные кавычки, то сама строка должна быть завернута в одинарные, и наоброт

![ico-25 cap]

~~~javascript
var first = 'Капитаном корабля "Наутилус" был Немо'
var second = "Капитаном корабля 'Наутилус' был Немо"
var third = `Капитаном корабля "Наутилус" был Немо`
~~~

_____________________________________________________________

## ![ico-25 icon] number

Число может быть:

• целым ( 5 )
• с плавающей точкой ( 5.80 )
• **~Infinity~** ^^( бесконечность )^^
• **~NaN~** ^^( Not a Number - не число )^^

![ico-20 warn] Значение **~Infinity~** может получиться при делении на ноль:

~~~javascript
var x = 1, y = 0
var z = x / y
~~~

^^Значением переменной ** z ** будет  *Infinity*^^

![ico-20 warn] Значение **~NaN~** может получиться при попытке выполнения арифметических операций с операндами, которые не являются числами, например:  ~5 * "total"~, а так же при попытке разделить ноль на ноль: ~0/0~

![ico-20 warn] Значение **~NaN~** не равно никакому другому значению, включая само значение **~NaN~**

![ico-20 warn] Никакие арифметические операции в JS никогда не будут завершены с ошибкой, поскольку в случае ошибки операция вернет **~NaN~**

________________________________________________________

## ![ico-25 icon] boolean

Логический тип

Данные логического типа могут принимать только одно из двух значений:

• ~true~ ( истина )
• ~false~ ( ложь )

_____________________________________________________________

## ![ico-25 icon] object

К данным типа ~object~ относятся:

• [**~объекты~**](data-structures.md#object)
• [**~массивы~**](data-structures.md#array)
• [**~null~**](NaN-null-Infinity.md#null)

________________________________________________________

## ![ico-25 icon] undefined

Специальный тип данных, означающий, что значение переменной не определено

![icon-25 cap]

~~~javascript
var  sample
console.log ( sample )
~~~

В консоль будет выведено ~undefined~, поскольку мы не присвоили переменной  **sample** никакого значения

________________________________________________________

## ![ico-25 icon] function

С помощью ключевого слова ~function~ создаются объекты, содержащие фрагмент кода

Объекты типа ~function~ являются контейнерами для скриптов

Если вывести в консоль такой объект

![ico-25 cap] 1

~~~javascript
function sample ( arg ) {
     console.log ( arg )
}
console.log ( sample )
~~~

то мы увидим следующее:

~~~console
ƒ sample ( arg ) {
    console.log ( arg )
}
~~~

Такие объекты имеют тип данных ~function~

__________________________________________________________

![ico-25 cap] 2

~~~javascript
function sample ( arg ) {
     console.log ( arg )
}
console.log ( typeof sample ) // function
~~~

Особенность этого типа данных заключается в том, что в любой момент можно инициировать выполнение кода, находящегося в объекте, по его имени ( для этого необходимо после имени функции использовать круглые скобки )

_________________________________________________________

![ico-25 cap] 3

~~~javascript
function sample () {
     console.log ( "Привет, студент!" )
}
sample ()   // "Привет, студент!"
~~~

^^Мы будем подробнее изучать объекты типа function далее^^

_____________________________________________________________

## [![ico-30 hw] Упражнения](https://docs.google.com/forms/d/e/1FAIpQLSdegQYfzld6s0CYJekJ2uvu84fUU2-BXiu7g9X2wzcutF1CWQ/viewform)
