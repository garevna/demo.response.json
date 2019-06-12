# ![ico-30 icon] Event Loop

## ![ico-25 icon] Поток выполнения ( thread )

![ico-20 pin] **Поток** — это последовательность команд ( операторов языка, вызовов функций и т.д. ), которые выполняются последовательно друг за другом

Несколько потоков могут существовать в рамках одного и того же процесса и совместно использовать ресурсы ( память )

![ico-20 pin] **Процесс** — это экземпляр исполняемой программы, которому выделены системные ресурсы ( время процессора и память)

Каждый процесс выполняется в _отдельном адресном пространстве_
Один процесс не может получить доступ к данным другого процесса

В многопроцессорных ( многоядерных ) системах каждый процессор ( ядро ) обслуживает отдельный поток, поэтому потоки действительно выполняются параллельно ( одновременно )

При наличии только одного процессора ему приходится довольно часто переключаться с одного потока на другой, чтобы создать иллюзию одновременного выполнения кода во всех потоках

Каждая программа создает по меньшей мере один основной поток, который запускает функцию **~main()~**

Программа, использующая только основной поток, является **_однопоточной_**

Многопоточные языки используют несколько потоков

_________________________________________________

## ![ico-25 icon] Стек и куча ( heap )

**~Стек~** — это "быстрый" кусок оперативной памяти

Стек создаётся _для каждого потока_ в многопоточных языках

JS однопоточный язык, поэтому у нас только один стек ( **~Call Stack~** )

Стек организован по принципу LIFO ( первым пришел - последним ушел )

Размер стека ограничен

Он задаётся при создании потока

Переменные, находящиеся в стеке, всегда являются _локальными_

**~Heap~** ( "куча" ) — это оперативная память, где хранятся глобальные переменные

"Куча" допускает динамическое выделение памяти

Доступ к данным, хранящимся в "куче", обеспечивается посредством ссылок - переменных, значения которых являются адресами других переменных

Поэтому "куча" работает медленнее, чем стек

Процессор не контролирует "кучу" ( в отличие от стека ), поэтому для освобождения памяти "кучи" от ненужных переменных требуются  "сборщики мусора"

_________________________________________________

## ![ico-25 icon] Асинхронность

JS — однопоточный язык

Однако практически все движки — многопоточные

Неблокирующее поведение JS обеспечивается движком с помощью механизма **~Event Loop~**

Это событийно-ориентированная модель

Она держится на колбэках - функциях обратного вызова

Все асинхронные операции завершаются вызовом соответствующего колбэка

Для этого вызов колбэка должен вернуться в основной поток JS

Асинхронные операции не выполняются в основном потоке JS

Асинхронные операции попадают в Event Loop движка

Что там происходит?

У движка есть API, обеспечивающие

![ico-20 green-ok] работу таймеров ( ~setTimeout~, ~setInterval~ )
![ico-20 green-ok] выполнение операций AJAX
![ico-20 green-ok] отслеживание событий

Все это происходит в параллельных потоках движка

Когда истекает временной интервал таймера, или завершается операция AJAX, или происходит событие, вызов соответствующего колбэка помещается в очередь задач

В стек вызовов ( ~Call Stack~ ) основного потока он может попасть только отсюда,

и только тогда, когда стек вызовов будет пуст,

т.е. все текущие вызовы основного потока завершатся

[![ico-70 youtube]](https://youtu.be/w8hIMAszebU)

Итак, движок имеет очередь задач ( ~Task Queue~ )

Если событий не происходит, эта очередь пуста

В момент, когда происходит событие, его обработчик помещается в конец очереди

[![ico-70 youtube]](https://www.youtube.com/embed/P77ukSzbgS8)

______________________________

![ico-25 cap] ** 1**

В следующем коде есть только одна синхронная операция - это вызов функции **message**

~~~javascript
message ( 'start' )
~~~

Далее в скрипте запускается множество асинхронных операций ~setTimeout~ и ~fetch~

Расставив ~breakpoints~, можно отследить процесс работы ~Event Loop~

Все асинхронные операции передаются в параллельный поток движка

Что там происходит:

• если это таймер, то отсчет временного интервала
• если ~fetch~, то выполняется запрос на сервер

Когда истечет временной интервал таймера или завершится ~fetch~,

должны быть запущены соответствующие функции обратного вызова ( колбэки )

Однако они должны быть вызваны в основном процессе JS

их вызовы нужно туда "впихнуть"

но сделать это можно только при условии, что сейчас основной поток ничем не занят,

т.е. стек вызовов пуст

поэтому вызовы колбэков помещаются в очередь задач движка,

причем в том порядке, в каком их "выпихивали" в эту очередь API

теперь, как только стек вызовов будет свободен,

в него будут по очереди помещены вызовы ждущих в очереди обработчиков

~~~~javascript
function message ( text ) {
    document.body.innerText += `${text}\n\n`
}

message ( 'start' )

setTimeout ( () => message ( 'timeout 0' ) , 0 )

fetch ( "https://api.github.com/users" )
        .then (
            response => response.json ()
                .then (
                    users => message ( `1: ${users[0].login}` )
                )
        )

setTimeout ( () => message ( 'timeout 1' ), 0 )

fetch ( "https://api.github.com/users?since=250" )
        .then (
            response => response.json ()
                .then (
                    users => message ( `2: ${users[0].login}` )
                )
        )

setTimeout ( () => message ( 'timeout 2' ), 0 )

fetch ( "https://api.github.com/users?since=300" )
        .then (
            response => response.json ()
                .then (
                    users => message ( `3: ${users[0].login}` )
                )
        )

setTimeout ( () => message ( 'timeout 3' ), 0 )
~~~~

[![ico-70 youtube]](https://youtu.be/hS7QvR2Ro8o)