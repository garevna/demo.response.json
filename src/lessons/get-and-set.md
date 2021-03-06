# ![ico-30 study] Вычисляемые свойства

У объекта могут быть свойства, значения которых вычисляются на основании значений других свойств

Такие свойства объявляются с помощью функций **~get~** ( геттера ) и **~set~** ( сеттера )

~~~js
var sample = {
    birth: 2004,
    get years () {
        return new Date().getFullYear() - this.birth
    },
    set years ( newVal ) {
       this.birth = new Date().getFullYear() - newVal
    }
}
~~~

Когда мы запрашиваем значение вычисляемого свойства, вызывается геттер свойства:

~~~js
console.log ( sample.years )  // 15
~~~

а когда мы присваиваем новое значение вычисляемому свойству:

~~~js
sample.years = 20
~~~

вызывается сеттер свойства, который меняет значение свойства ~birth~

~~~js
console.log ( sample.birth )  // 1999
~~~

_______________________________

## ![ico-25 cap] PriceUAH ( sample )

Предположим, есть объект **~commodity~**, описывающий товар

Цена товара **_~priceUSD~_** установлена в долларах

Предположим, курс доллара устанавливается значением переменной **~course~**

Для получения цены товара в гривне нужно умножить цену товара в долларах на курс доллара

Однако крайне неудобно производить подобные операции каждый раз, когда нужна цена товара в гривне

Создадим вычисляемое свойство **_~priceUAH~_**

Для этого объявим геттер и сеттер свойства

~~~javascript
var course = 28

var commodity = {
    name: "Утюг",
    mark: "Tefal",
    priceUSD: 20,

    get priceUAH () {
        return this.priceUSD * course
    },
    set priceUAH ( newPriceUAH ) {
        this.priceUSD = newPriceUAH / course
    }
}
~~~

**Геттер** - это функция, которая будет вычислять актуальное значение цены товара в гривне и возвращать результат как значение свойства **~commodity.priceUAH~**

![ico-20 warn] У геттера не может быть аргументов

**Сеттер** - это функция, которая будет получать новое значение цены товара в гривне ( **_~newPriceUAH~_** ) и пересчитывать цену товара в долларах ( **~commodity.priceUSD~** ) по текущему курсу ( **_~course~_** )

Каждый раз, когда мы будем обращаться к свойству **~commodity.priceUAH~**, будет срабатывать геттер

~~~javascript
console.log ( commodity.priceUAH ) // 560
~~~

Каждый раз, когда мы будем присваивать новое значение свойству **~commodity.priceUAH~**, на самом деле будет вызываться функция-сеттер, которая будет изменять значение свойства **~commodity.priceUSD~**


~~~javascript
commodity.priceUAH = 250

console.log ( commodity.priceUSD ) // 8.928571428571429
~~~

_____________________________________________________

Для вычисляемых свойств "под капотом" операция присваивания заменяется вызовом функции-сеттера

![ico-20 warn] Поэтому категорически нельзя внутри функции-сеттера использовать присваивание значения этому же свойству:

![ico-25 err]

~~~javascript
var commodity = {
    name: "Утюг",
    mark: "Tefal",
    priceUSD: 20,

    get priceUAH () {
        return this.priceUSD * course
    },
    set priceUAH ( newPriceUAH ) {
        this.priceUAH = newPriceUAH
    }
}
~~~

Это приведет к бесконечной рекурсии и генерации исключения:

~► Uncaught RangeError: Maximum call stack size exceeded~


____________________________________________________________

## ![ico-25 cap] Calculator ( sample )

Создадим простенький объект-калькулятор:

~~~javascript
var calculator = {
    firstValue: 0,
    secondValue: 0,
    operations: [ "+", "-", "*", "/", "%" ],
    operation: "+",
    get result () {
        return eval( `${this.firstValue}${this.operation}${this.secondValue}` )
    },
    set result ( newValue ) {

        for ( var x of this.operations ) {
            let vars = newValue.split ( x )
            if ( vars.length === 1 ) continue
            this.operation = x
            this.firstValue = Number ( vars[0] )
            this.secondValue = Number ( vars[1] )
            break
        }
    }
}
~~~

Вычисляемое свойство **~result~** этого объекта имеет геттер и сеттер

Когда мы обращамся к свойству **~result~** для получения его значения, срабатывает геттер

~~~javascript
console.log ( calculator.result )
~~~

Если же мы выполним присваивание нового значения свойству **~result~**

~~~javascript
calculator.result = "5 - 8 "
~~~

сработает сеттер свойства, и в результате будут изменены значения свойств **_~firstValue~_**, **_~secondValue~_** и **_~operation~_** объекта **~calculator~**

~~~console
▼ {firstValue: 5, secondValue: 8, operations: Array(5), operation: "-"}
    firstValue: 5
    operation: "-"
  ► operations: (5) ["+", "-", "*", "/", "%"]
    result: (...)
    secondValue: 8
  ► get result: ƒ result()
  ► set result: ƒ result( newValue )
  ► __proto__: Object
~~~

__________________________________________

## ![ico-25 cap] Human states ( sample )

Создадим вычисляемое свойство **_~state~_** объекта **~human~**

~~~javascript
var human = {
    name: "Иван Сидоренко",
    states: [ "work", "relax", "enjoy" ],
    currentState: 0,

    get state () {
        return this.states [ this.currentState ]
    },

    set state ( newState ) {
        this.states.indexOf ( newState ) < 0 ?
            this.states.push ( newState ) : null
        this.currentState = this.states.indexOf ( newState )
    },

    showState: function () {
        console.log ( `Current state: ${this.currentState} ( ${this.state} )` )
    }
}

human.showState()
~~~

**Результат:**

~~~console
Current state: 0 ( work )
~~~

Если вычисляемое свойство **_~state~_** фигурирует в левой части оператора присваивания, то вызывается сеттер свойства

Сеттер проверяет наличие такого значения в массиве **~human~**.**_~states~_**, и если такого значения там нет, то добавляет его

Затем сеттер свойства **_~state~_** устанавливает значение свойства **~human~**.**_~currentState~_** равным индексу элемента массива **~human~**.**_~states~_**, значение которого будет отображать геттер свойства **_~state~_**


~~~javascript
human.state = "swim"

human.showState()
~~~

**Результат:**

~~~console
Current state: 3 ( swim )
~~~
