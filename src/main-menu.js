class MainMenuComponent extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow( { mode: "closed" } )
  }
  connectedCallback () {

    this.shadow.innerHTML += `
      <nav role="navigation">
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <h3><div class="home"></div>Lessons</h3>
          </ul>
        </div>
      </nav>
      `

      this.shadow.querySelector ( ".home" )
        .onclick = function ( event ) {
            let page = document.getElementsByTagName ( "page-element" )[0]
            page.getAttribute ( "src" ) !== "src/lessons/start-page.md" ?
                    page.setAttribute ( "src", "src/lessons/start-page.md" ) : null
        }

      fetch("src/main-menu.css")
        .then (
          response => response.text()
              .then(
                  css => this.shadow.appendChild(
                    document.createElement("style")
                  ).textContent = css
              )
        )

      fetch ("src/main-menu.json")
        .then ( response => response.json() )
          .then (
            menuData => {
              menuData[Symbol.iterator] = function* () {
                let end = Math.max ( ...Object.keys ( menuData ) )
                for ( let num = 1; num <= end; num++ )
                    yield menuData [num]
              }
              let lessonNum = 1

              for ( let lesson of menuData ) {

                let topLevel = this.shadow.querySelector ( "#menu" )
                let lessonItem = topLevel.appendChild (
                  document.createElement ( "li" )
                )

                lessonItem.innerHTML = `
                  <input type="radio" id="lesson-${lessonNum}" name="lessons">
                  <label for="lesson-${lessonNum}">
                    <div class = "icon"></div>
                    <b>${lessonNum++}</b>
                  </label>
                  <ul class="sub-level"></ul>`

                lessonItem.subLevel = lessonItem.querySelector ("ul.sub-level")

                for ( let topic in lesson ) {
                  let item = lessonItem.subLevel.appendChild (
                    document.createElement ( "li" )
                  )
                  item.innerHTML = `${topic}`
                  item.ref = lesson [ topic ]
                  item.onclick = function ( event ) {
                    document.getElementsByTagName ( "page-element" )[0]
                      .setAttribute ( "src",  `${lessons}${event.target.ref}.md` )
                  }
                }
              }
            }
          )
  }
}

customElements.define(
  "main-menu-component",
  MainMenuComponent
)
