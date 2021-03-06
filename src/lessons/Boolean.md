# ![ico-30 study] Логические выражения

Выражение "_Яблоко красное и круглое_" можно разложить на два выражения:

• "_Яблоко красное_"
• "_Яблоко круглое_"

которые называются **операндами**, а "**_ и _**" является логической операцией

Каждое из этих двух выражений будет либо верно, либо нет

Выражение: "_Яблоко красное и круглое_" будет правдой тогда и только тогда, когда верно то, что яблоко красное, и то, что яблоко круглое

Выражение: "_Завтра будет контрольная или диктант_" будет справедливо в любом из случаев: либо если будет диктант, либо если будет контрольная

Выражение: "_Моя кузина не умеет петь_" будет ложным, если кузина хорошо поет

Поэтому все вышеперечисленное является логическими выражениями

Однако выражения:

• "_Пять и восемь_"
• "_Селедка или семга_"

не являются логическими, поскольку операнды ( "_пять_", "_восемь_", "_селедка_", "_семга_", ) логических операций "_ и _" и "_или_" не являются логическими выражениями

__________________________________________________________________


## ![ico-25 icon] Логические значения

Логических значений всего два:  **~true~** (истина)  и  **~false~**  (ложь)

_________________________________________________________________________

## ![ico-25 icon] Операторы сравнения

Сравнивают две переменных ( или два выражения ) и возвращают логическое значение

| Оператор | Описание |
| **~==~** | ^^нестрогое равенство  ( равенство значений )^^ |
| **~===~** | ^^строгое равенство ( равенство значений и типов данных )^^ |
| **~!=~** | ^^нестрогое неравенство ( значения не равны )^^ |
| **~!==~** | ^^строгое неравенство ( сравниваются не только  значения, но и типы данных )^^ |
| **~ > ~** | ^^больше^^ |
| **~ < ~** | ^^меньше^^ |
| **~>=~** | ^^больше или равно^^ |
| **~<=~** | ^^меньше или равно^^ |

__________________________________________________________________________

![ico-25 cap] ** 1 **

~~~javascript
var x = 5
~~~

| Выражение | Результат |
| ~x == 8~ | ^^false^^ |
| ~x == 5~ | ^^true^^ |
| ~x == "5"~ | ^^true^^ |
| ~x === 5~ | ^^true^^ |
| ~x === "5"~ | ^^false^^ |
| ~x != 8~ | ^^true^^ |
| ~x !== 5~ | ^^false^^ |
| ~x !== "5"~ | ^^true^^ |
| ~x !== 8~ | ^^true^^ |
| ~x > 8~ | ^^false^^ |
| ~x < 8~ | ^^true^^ |
| ~x >= 8~ | ^^false^^ |
| ~x <= 8~ | ^^true^^ |
| ~x <= 5~ | ^^true^^ |
| ~x >= 5~ | ^^true^^ |

_________________________________________________________________________

## ![ico-25 icon] Логические операции

### &&

**логическое "И" ( умножение )**

~~~javascript
true  && true    //    true
true  && false   //    false
false && true    //    false
false && false   //    false
~~~

![ico-25 cap] ** 2 **

~~~javascript
5 > 8 && 4 < 5   // false  
// explanation:
5 > 8            // false,
4 < 5            // true,
false && true    // false
~~~

_________________________________________________________________________

![ico-25 cap] ** 3 **

~~~javascript
8 > 5 && 4 < 5   // true
// explanation:
8 > 5            // true,
4 < 5            // true,
true && true     // true
~~~

_________________________________________________________________________

![ico-25 cap] ** 4 **

~~~javascript
var    x = 4,    y = 10,    z = 8

x > y && z < y   // false
// explanation:
x > y            // false,
z < y            // true,
false && true    // false
~~~

_________________________________________________________________________

![ico-25 cap] ** 5 **

~~~javascript
x < y && z < y   // true
// explanation:
x < y            // true,
z < y            // true,
true && true     // true
~~~

_________________________________________________________________________

### ||

**логическое "_ИЛИ_" ( сложение )**

~~~javascript
true  || true    //    true
true  || false   //    true
false || true    //    true
false || false   //    false
~~~

![ico-25 cap] ** 6 **

~~~javascript
5 > 8 || 4 < 5   // true
// explanation:
5 > 8            // false,
4 < 5            // true,
false || true    // true
~~~

_________________________________________________________________________

![ico-25 cap] ** 7 **

~~~javascript
5 > 8 || 4 > 5   // false
// explanation:
5 > 8            // false,
4 > 5            // false,
false || false   // false
~~~

_________________________________________________________________________

![ico-25 cap] ** 8 **

~~~javascript
var  x = 4,  y = 10,  z = 8

x > y || z < y   // true

// explanation:

x > y            // false,
z < y            // true,
false || true    // true
~~~

_________________________________________________________________________

![ico-25 cap] ** 9 **

~~~javascript
x > y || z > y   // false

// explanation:

x > y            // false,
z > y            // false,
false || false   // false
~~~

_________________________________________________________________________

### !


**Логическое отрицание**

~~~javascript
!true   // false
!false  // true
~~~

_________________________________________________________________________

![ico-25 cap] ** 10 **

~~~javascript
!(5 > 8)    // true

// explanation:

5 > 8      // false,
!false     // true
~~~

_________________________________________________________________________

![ico-25 cap] ** 11 **

~~~javascript
!(5 > 4)   // false

// explanation:

5 > 4      // true,
!true      // false
~~~

_________________________________________________________________________

![ico-20 warn] для логических значений **x**, а так же значений **~null~**, **~NaN~**, **~undefined~**

~~~javascript
x || !x    // всегда  true
~~~

![ico-20 warn] для логических значений **x**

~~~javascript
x && !x    // всегда  false
~~~

_________________________________________________________________________

![ico-25 cap] ** 12 **

~~~javascript
var x = undefined
var y = x || !x       // true
var z = x && !x       // undefined
~~~

_________________________________________________________________________

![ico-25 cap] ** 13 **

~~~javascript
var x = null
var y = x || !x       // true
var z = x && !x       // null
~~~

_________________________________________________________________________

![ico-25 cap] ** 14 **

~~~javascript
    var x = NaN
    var y = x || !x       // -->  true
    var z = x && !x       // -->  NaN
~~~

_________________________________________________________________________

![ico-25 cap] ** 15 **

~~~javascript
var x = 5
var y = x || !x       // 5
var z = x && !x       // false
~~~

_________________________________________________________________________

![ico-25 cap] ** 16 **

~~~javascript
var x = "h"
var y = x || !x       // "h"
var z = x && !x       // false
~~~

_________________________________________________________________________

![ico-25 cap] ** 17 **

~~~javascript
var x = ""        // ( пустая строка )
var y = x || !x   // true
var z = x && !x   // ""
~~~

_________________________________________________________________________

![ico-25 cap] ** 18 **

~~~javascript
var  x = 4,  y = 10

!( x > y )   // true

// explanation:

x > y        // false,
!( false )   // true
~~~

_________________________________________________________________________

## ![ico-25 icon] Логические выражения


Логические выражения - это конструкции из переменных и/или констант, связанных между собой операторами сравнения и/или логическими операторами

Логические выражения принимают значения **~true~** или **~false~**

![ico-25 cap] Примеры логических выражений

~~~javascript
x >= y
z == t
z === t
y != x  // значение y не равно значению x
y !== x // или значение y не равно значению x,
            // или тип данных y не совпадает с типом данных x

y != x
y !== x

x > 8 && y === 5
typeof x === "number" || x === null
!x === y
~~~

_________________________________________________________________________

[![ico-30 hw] **Упражнения**](https://docs.google.com/forms/d/e/1FAIpQLSexcuOpJS2d0KNNU1qTUlD5Exnf0FGI9Wb9d2I5YvViwuSKDA/viewform)

_________________________________________________________________________

[![ico-20 link] w3schools](https://www.w3schools.com/js/js_comparisons.asp)
