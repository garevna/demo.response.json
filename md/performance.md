# :mortar_board: Performance

| [`performance.timing`](#mortar_board-performancetiming) |
|:-|
| [**`Performance.prototype`**](#performanceprototype) |
| :wrench: [`метод now()`](#now) |
| :wrench: [`метод mark()`](#mark) |
| :wrench: [`метод measure()`](#measure) |
| :wrench: [`метод getEntries()`](#getEntries) |
| :wrench: [`метод getEntriesByName()`](#getEntriesByName) |
| [**`PerformanceResourceTiming`**](#PerformanceResourceTiming) | [`метод getEntriesByType()`](#getEntriesByType) |

Для оценки производительности приложения можно использовать встроенный в браузеры интерфейс **performance**

Этот интерфейс обеспечивает доступ к следующим API:<br/>
> `Performance Timeline API`<br/>
> `High Resolution Time API`<br/>
> `Navigation Timing API`<br/>
> `User Timing API`<br/>
> `Resource Timing API`<br/>

Если в консоли любой веб-страницы вывести объект **performance**, то можно увидеть примерно следующее:

###### performance
```console
▼ Performance {timeOrigin: 1546006432906.767, onresourcetimingbufferfull: null, memory: MemoryInfo, navigation: PerformanceNavigation, timing: PerformanceTiming}
  ▼ memory: MemoryInfo
        jsHeapSizeLimit: 2217857988
        totalJSHeapSize: 33243136
        usedJSHeapSize: 19358120
      ► __proto__: MemoryInfo
  ► navigation: PerformanceNavigation {type: 0, redirectCount: 0}
    onresourcetimingbufferfull: null
    timeOrigin: 1546006432906.767
  ▼ timing: PerformanceTiming
        connectEnd: 1546006433378
        connectStart: 1546006432960
        domComplete: 1546006435228
        domContentLoadedEventEnd: 1546006434216
        domContentLoadedEventStart: 1546006434216
        domInteractive: 1546006434216
        domLoading: 1546006433576
        domainLookupEnd: 1546006432960
        domainLookupStart: 1546006432915
        fetchStart: 1546006432910
        loadEventEnd: 1546006435231
        loadEventStart: 1546006435228
        navigationStart: 1546006432906
        redirectEnd: 0
        redirectStart: 0
        requestStart: 1546006433379
        responseEnd: 1546006433563
        responseStart: 1546006433534
        secureConnectionStart: 1546006433015
        unloadEventEnd: 0
        unloadEventStart: 0
      ► __proto__: PerformanceTiming
  ► __proto__: Performance
```
При запуске страницы браузер создает объект **`performance`**, содержащий все временные характеристики процессов загрузки ресурсов и отрисовки страницы с использованием <span title="измеренное в миллисекундах с полуночи 1 января 1970 года (UTC)">_времени высокой точности_</span>

Скрипт может получать данные ( `getEntries()`, `getEntriesByName()`, `getEntriesByType()` ) из этого буфера, а так же динамически создавать и удалять кастомные временные метки ( `mark` ) и измерения ( `measure` )

| [:arrow_double_up:](#mortar_board-performance) | 
|-|
***
## :mortar_board: performance.timing

#### Загрузка документа

| `document.readyState` | `performance.timing` |
|-|-|
| <code title="документ в процессе загрузки">loading</code> | `domLoading` |
| <code title="документ загружен и распарсен, но подключаемые ресурсы ( стили, картинки и т.д. ) еще загружаются">interactive</code> | `domInteractive` |
| <code title="документ полностью готов ( инициируется событие load )">complete</code> | `domComplete` |

```javascript
console.log (
    performance.timing.domComplete - 
    performance.timing.domInteractive,
    performance.timing.domInteractive - 
    performance.timing.domLoading
)
```
| [:arrow_double_up:](#mortar_board-performance) | 
|-|

***
## :mortar_board: Унаследованные методы **`performance`**
###### Performance.prototype
```console
▼ Performance {now: ƒ, getEntries: ƒ, getEntriesByType: ƒ, …}
  ► clearMarks: ƒ clearMarks()
  ► clearMeasures: ƒ clearMeasures()
  ► clearResourceTimings: ƒ clearResourceTimings()
  ► getEntries: ƒ getEntries()
  ► getEntriesByName: ƒ getEntriesByName()
  ► getEntriesByType: ƒ getEntriesByType()
  ► mark: ƒ mark()
  ► measure: ƒ measure()
    memory: (...)
    navigation: (...)
  ► now: ƒ now()
    onresourcetimingbufferfull: (...)
  ► setResourceTimingBufferSize: ƒ setResourceTimingBufferSize()
    timeOrigin: (...)
    timing: (...)
  ► toJSON: ƒ toJSON()
  ► constructor: ƒ Performance()
    Symbol(Symbol.toStringTag): "Performance"
  ► get memory: ƒ memory()
  ► get navigation: ƒ navigation()
  ► get onresourcetimingbufferfull: ƒ onresourcetimingbufferfull()
  ► set onresourcetimingbufferfull: ƒ onresourcetimingbufferfull()
  ► get timeOrigin: ƒ timeOrigin()
  ► get timing: ƒ timing()
  ► __proto__: EventTarget
```
| [:arrow_double_up:](#mortar_board-performance) | 
|-|

***
#### now
Метод `performance.now()` позволяет получить текущее время высокой точности с момента начала отсчета

:coffee: 
```javascript
console.log ( `Старт: ${performance.now()}` )
setTimeout (
    () => console.log ( `Стоп: ${performance.now()}` ),
    2000
)
```
###### Результат в консоли:
```console
Старт: 207385.50000003306
Стоп: 209385.9999999986
```
Таким образом, точное время, которое прошло с момента первого вызова performance.now() до второго вызова этого метода, составляет
```
209385.9999999986 - 207385.50000003306 = 2000.499999965541 (ms)
```
| [:arrow_double_up:](#mortar_board-performance) | 
|-|

***
#### mark
Установка временных меток

:coffee: 
```javascript
performance.mark ( "start" )
for ( var x = 0; x < 1000; x++ )
    document.write ( `${x}<br/>` )
performance.mark ( "end" )

var items = window.performance
        .getEntriesByType('mark')
console.log ( items )
```
###### Результат в консоли:
```console
▼ (2) [PerformanceMark, PerformanceMark]
  ▼ 0: PerformanceMark
        duration: 0
        entryType: "mark"
        name: "start"
        startTime: 2677.5999999954365
      ► __proto__: PerformanceMark
  ▼ 1: PerformanceMark
        duration: 0
        entryType: "mark"
        name: "end"
        startTime: 2725.9000000049127
      ► __proto__: PerformanceMark
    length: 2
  ► __proto__: Array(0)
```
| [:arrow_double_up:](#mortar_board-performance) | 
|-|

***
#### measure
Измерение производительности

:coffee: 
```javascript
performance.mark ( "start1" )

let elem = document.body.appendChild (
    document.createElement ( "img" )
)

elem.src = "http://ogo.ua/images/articles/1567/big/1395958980.jpg"
elem.width = "200"

performance.mark ( "end1" )

performance.measure (
    "insertElement",
    "start1",
    "end1"
)

performance.mark ( "start2" )

document.body.innerHTML += `
    <img src="http://ogo.ua/images/articles/1567/big/1395958980.jpg" width="200"/>
`

performance.mark ( "end2" )

performance.measure (
    "insertElement",
    "start2",
    "end2"
)

let measures = performance.getEntriesByName ( "insertElement" )

console.log ( `1: duration: ${measures[0].duration}ms` )
console.log ( `2: duration: ${measures[1].duration}ms` )

performance.clearMarks()
performance.clearMeasures()
```
###### Результат в консоли:
```console
1: duration: 0.20000000949949026ms
2: duration: 0.20000000949949026ms
```
Обратите внимание на методы
###### clearMarks()
###### clearMeasures()

| [:arrow_double_up:](#mortar_board-performance) | 
|-|

***
### :mortar_board: Entries
        getEntries()
        getEntriesByName()
        getEntriesByType()

С помощью этих методов можно получить массив объектов

Каждый такой объект имеет свойства **`entryType`** и **`name`**

Возможные значения этих свойств:

| `entryType` | `name` |
|-|-|
| `resource` | `URL запрошенного ресурса` |
| `mark` | <code>имя метки, созданной с помощью <a href="#performancemark"><b>`performance.mark()`</b></a></code> |
| `measure` | <code>имя, использованное при вызове <a href="#performancemeasure"><b>`performance.measure()`</b></a></code> |
| `paint` | <code>либо <b>`first-paint`</b>, либо <b>`first-contentful-paint`</b></code> |
| `frame, navigation` | `URL документа` |

***

#### getEntries

Этот метод вернет все объекты

    PerformanceResourceTiming
    PerformancePaintTiming
    PerformanceMark
    PerformanceMeasure

хранящие данные о временных характеристиках процессов, связанных:
* с получением ресурсов: экземпляр [**`PerformanceResourceTiming`**](#performanceresourcetiming-1)
* с отрисовкой страницы: экземпляр **`PerformancePaintTiming`**

а так же:
* с маркерами, установленными с помощью метода <a href="#performancemark"><b>`performance.mark()`</b></a>: экземпляр **`PerformanceMark`**
* измерениями, созданными с помощью метода <a href="#performancemeasure"><b>`performance.measure()`</b></a>: экземпляр **`PerformanceMeasure`**

:coffee:
```javascript
performance.mark ( "start" )

let elem = document.body.appendChild (
    document.createElement ( "img" )
)
elem.src = "http://ogo.ua/images/articles/1567/big/1395958980.jpg"
elem.width = "200"

performance.mark ( "end" )

console.log (
    performance.getEntries()
)
```
###### Результат в консоли:
```console
▼ (2) [PerformanceMark, PerformanceMark]
  ▼ 0: PerformanceMark
        duration: 0
        entryType: "mark"
        name: "start"
        startTime: 3348.8999999826774
      ► __proto__: PerformanceMark
  ▼ 1: PerformanceMark
        duration: 0
        entryType: "mark"
        name: "end"
        startTime: 3349.099999992177
      ► __proto__: PerformanceMark
    length: 2
  ► __proto__: Array(0)
```
:coffee:
```javascript
performance.mark ( "start" )

fetch ( "https://httpbin.org" )
    .then (
        x => {
            performance.mark ( "end" )
            performance.measure (
                "fetchDuration",
                "start",
                "end"
            )
            console.log (
                performance.getEntries()
            )
        }
    )
```
###### results:
```console
▼ (4) [PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceMark]
  ▼ 0: PerformanceMark
        duration: 0
        entryType: "mark"
        name: "start"
        startTime: 2684.400000027381
      ► __proto__: PerformanceMark
  ▼ 1: PerformanceMeasure
        duration: 453.5999999498017
        entryType: "measure"
        name: "fetchDuration"
        startTime: 2684.400000027381
      ► __proto__: PerformanceMeasure
  ▼ 2: PerformanceResourceTiming
        connectEnd: 0
        connectStart: 0
        decodedBodySize: 0
        domainLookupEnd: 0
        domainLookupStart: 0
        duration: 452.70000002346933
        encodedBodySize: 0
        entryType: "resource"
        fetchStart: 2684.5999999786727
        initiatorType: "fetch"
        name: "https://httpbin.org/"
        nextHopProtocol: "http/1.1"
        redirectEnd: 0
        redirectStart: 0
        requestStart: 0
        responseEnd: 3137.300000002142
        responseStart: 0
        secureConnectionStart: 0
      ► serverTiming: []
        startTime: 2684.5999999786727
        transferSize: 0
        workerStart: 0
      ► __proto__: PerformanceResourceTiming
  ▼ 3: PerformanceMark
        duration: 0
        entryType: "mark"
        name: "end"
        startTime: 3137.9999999771826
      ► __proto__: PerformanceMark
    length: 4
  ► __proto__: Array(0)
```
| [:arrow_double_up:](#mortar_board-performance) | 
|-|

***
#### getEntriesByName
:coffee: :one:
```javascript
performance.mark ( "start" )

fetch ( "https://httpbin.org" )
    .then (
        x => {
            performance.mark ( "end" )
            performance.measure (
                "fetchDuration",
                "start",
                "end"
            )
            console.log (
                performance.getEntriesByName( "https://httpbin.org/" )
            )
        }
    )
```
###### Результат в консоли:
```console
▼ [ PerformanceResourceTiming ]
  ▼ 0: PerformanceResourceTiming
        connectEnd: 0
        connectStart: 0
        decodedBodySize: 0
        domainLookupEnd: 0
        domainLookupStart: 0
        duration: 146.99999999720603
        encodedBodySize: 0
        entryType: "resource"
        fetchStart: 6048.500000033528
        initiatorType: "fetch"
        name: "https://httpbin.org/"
        nextHopProtocol: "http/1.1"
        redirectEnd: 0
        redirectStart: 0
        requestStart: 0
        responseEnd: 6195.500000030734
        responseStart: 0
        secureConnectionStart: 0
      ► serverTiming: []
        startTime: 6048.500000033528
        transferSize: 0
        workerStart: 0
      ► __proto__: PerformanceMark
    length: 1
  ► __proto__: Array(0)
```

:coffee: :two:
```javascript
const pictures = [
    "http://ogo.ua/images/articles/1567/big/1395958980.jpg",
    "https://wxpcdn.gcdn.co/dcont/fb/image/crew3_1024.png",
    "https://mixpix.in/post_imgs/2015/04/10/141025/00009.jpg",
    "https://mixpix.in/post_imgs/2015/04/10/141025/00006.jpg"
]
pictures.forEach (
    item => {
        performance.mark ( "start" )

        let elem = document.body.appendChild (
            document.createElement ( "img" )
        )
        elem.src = item
        elem.width = "200"

        performance.mark ( "end" )
    }
)

console.log (
    performance.getEntriesByName ( "start" )
)
```
###### Результат в консоли:
```console
▼ (4) [PerformanceMark, PerformanceMark, PerformanceMark, PerformanceMark]
  ► 0: PerformanceMark {name: "start", entryType: "mark", startTime: 2465.700000000652, duration: 0}
  ► 1: PerformanceMark {name: "start", entryType: "mark", startTime: 2467.000000004191, duration: 0}
  ► 2: PerformanceMark {name: "start", entryType: "mark", startTime: 2467.1000000089407, duration: 0}
  ► 3: PerformanceMark {name: "start", entryType: "mark", startTime: 2467.30000001844, duration: 0}
    length: 4
  ► __proto__: Array(0)
```
| [:arrow_double_up:](#mortar_board-performance) | 
|-|

***
#### getEntriesByType

:coffee: :one:
```javascript
console.log (
    performance.getEntriesByType ( "resource" )
)
```
###### Результат в консоли:
```console
▼ [PerformanceResourceTiming]
  ▼ 0: PerformanceResourceTiming
        connectEnd: 0
        connectStart: 0
        decodedBodySize: 0
        domainLookupEnd: 0
        domainLookupStart: 0
        duration: 1.400000008288771
        encodedBodySize: 0
        entryType: "resource"
        fetchStart: 19113.49999997765
        initiatorType: "img"
        name: "http://ogo.ua/images/articles/1567/big/1395958980.jpg"
        nextHopProtocol: "h2"
        redirectEnd: 0
        redirectStart: 0
        requestStart: 0
        responseEnd: 19114.899999985937
        responseStart: 0
        secureConnectionStart: 0
      ► serverTiming: []
        startTime: 19113.49999997765
        transferSize: 0
        workerStart: 0
      ► __proto__: PerformanceResourceTiming
        length: 1
  ► __proto__: Array(0)
```

:coffee: :two:
```javascript
fetch ( 'https://httpbin.org/' )
    .then (
        response => console.log (
            performance.getEntriesByType ( "resource" )
        )
    )
```
###### Результат в консоли:
```console
▼ [PerformanceResourceTiming]
  ▼ 0: PerformanceResourceTiming
        connectEnd: 0
        connectStart: 0
        decodedBodySize: 0
        domainLookupEnd: 0
        domainLookupStart: 0
        duration: 144.70000000437722
        encodedBodySize: 0
        entryType: "resource"
        fetchStart: 24782.19999995781
        initiatorType: "fetch"
        name: "https://httpbin.org/"
        nextHopProtocol: "http/1.1"
        redirectEnd: 0
        redirectStart: 0
        requestStart: 0
        responseEnd: 24926.89999996219
        responseStart: 0
        secureConnectionStart: 0
      ► serverTiming: []
        startTime: 24782.19999995781
        transferSize: 0
        workerStart: 0
      ► __proto__: PerformanceResourceTiming
        length: 1
  ► __proto__: Array(0)
```
| [:arrow_double_up:](#mortar_board-performance) | 
|-|

***
### PerformanceResourceTiming
Для каждого процесса загрузки ресурсов приложения создается свой экземпляр **`PerformanceResourceTiming`**

###### initiatorType
Свойство **_`initiatorType`_** этого экземпляра идентифицирует источник запроса

* <code title="Запрос инициирован элементом <link>"><b>`link`</b></code>
* <code title="Запрос инициирован элементом <script>"><b>`script`</b></code>
* <code title="Запрос инициирован элементом <img>"><b>`img`</b></code>
* <code title="Запрос инициирован элементом <style> ( например, при загрузке шрифтов )"><b>`css`</b></code>
* <code title="Запрос инициирован объектом XMLHttpRequest"><b>`xmlhttprequest`</b></code>
###### name
Свойство **_`name`_** этого экземпляра идентифицирует **`url`** запрошенного ресурса

:coffee:
```javascript
const pictures = [
    "http://ogo.ua/images/articles/1567/big/1395958980.jpg",
    "https://wxpcdn.gcdn.co/dcont/fb/image/crew3_1024.png",
    "https://mixpix.in/post_imgs/2015/04/10/141025/00009.jpg",
    "https://mixpix.in/post_imgs/2015/04/10/141025/00006.jpg"
]

let promises = []

pictures.forEach (
    item => 
        promises.push (
            new Promise (
                function ( resolve, reject ) {
                    let elem = document.createElement ( "img" )
                    elem.onload = function ( event ) {
                        let res = performance
                            .getEntriesByName ( event.target.src )
                        resolve ({
                            name: res[0].name,
                            duration: res[0].duration
                        })
                    }
                    elem.onerror = function ( event ) {
                        reject ( event.target.src )
                    }
                    elem.src = item
                }
            )
        )
)

Promise.all ( promises )
    .then (
        result => {
            result.forEach (
                item =>
                    document.body.innerHTML += `
                        <img src="${item.name}" width="120"/><br/>
                        <small>${item.duration} (ms)</small><br/>
                    `
            )
        }
    )
    .catch (
        file => console.error ( `Error loading file: ${file}` )
    )
```
###### Результат на странице:
<table>
<tr>
<td>
<img src="http://ogo.ua/images/articles/1567/big/1395958980.jpg" width="120"/><br/>
<code>`2.3999999975785613 (ms)`</code><br/>

<img src="https://wxpcdn.gcdn.co/dcont/fb/image/crew3_1024.png" width="120"/><br/>
<code>`7.400000002235174 (ms)`</code><br/>

<img src="https://mixpix.in/post_imgs/2015/04/10/141025/00009.jpg" width="120"/><br/>
<code>`2.5000000023283064 (ms)`</code><br/>

<img src="https://mixpix.in/post_imgs/2015/04/10/141025/00006.jpg" width="120"/><br/>
<code>`2.900000021327287 (ms)`</code><br/>
</td>
</tr>
</table>

***

| [:arrow_double_up:](#mortar_board-performance) | 
|-|