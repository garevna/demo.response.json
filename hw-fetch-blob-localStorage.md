## :briefcase: Homework

###### :one: Blob
Загрузить картинку из сети с помощью `fetch` в виде объекта `Blob`

Создать временную ссылку на полученный объект

Разместить изображение на странице

###### :two: localStorage

Объявить функцию, которая будет вызываться в момент изменения хэш-части адреса страницы 

и сохранять в `localStorage` клиента hash-часть адреса страницы как  **_pageId_**

и время входа ( в секундах ) как  **_startTime_**
 
Назначить эту функцию обработчиком  события **`hashchange`**  объекта  `window`

Желательно, чтобы при изменении хеш-части адреса происходило обновление контента страницы без перезагрузки

( например, изменялся заголовок и картинка, чтобы создать иллюзию перехода на новую страницу )

Отслеживать в панели разработчика изменения в `localStorage`

#### [:coffee: Подсказка](https://garevna.github.io/js-samples/#16)
После загрузки страницы меняйте хеш-часть адреса на 0, 1, 2, 3 

и наблюдайте изменения на странице в `devTools` 

( вкладка **Application** | **_localStorage_** )

###### console
<img src="https://lh6.googleusercontent.com/3nNwdMTXnNKapAUHfSGIbpX0F7qJmdQv2Pb6EDcgg8RLE1976hJR3xJPWtlVOdXlNjJods0CdIFTy4yF0XHGnQgnzLE0ppReAe_TAHmD4UyxMD_VyXzYm9ajTt2sYKyhgq3Tg-TvZfOyA4g" width="700"/><br/>
###### localStorage
<img src="https://lh4.googleusercontent.com/FtfE2BA2q0C-1AyZbMFWRsEu8apWdse_XysNtgu1QQ4idtSsC7hLD55lc5SNfxq96r9zrjF4325cYmU4C6sttWAaWcLu1jXKeaWP1_yUaAynTwVkDEyVz0aL4zIMPlEL_Hsf1kGzUUC4D_w" width="700"/>