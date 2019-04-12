const template = document.body.appendChild (
    document.createElement ( "template" )
)

template.innerHTML = `
    <style>
        * { user-select: none; }
        a {
              text-decoration: none;
              color: #777;
        }
        input[type='checkbox'] {
              display: none;
        }
        .lbl-toggle {
              display: block;
              font-weight: bold;
              font-family: monospace;
              font-size: 1.2rem;
              text-transform: uppercase;
              text-align: center;
              padding: 1rem;
              color: #fff;
              background: #FA0;
              cursor: pointer;
              border-radius: 7px;
              transition: all 0.25s ease-out;
        }
        .lbl-toggle:hover {
              text-shadow: 1px 1px 1.5px #00000090;
        }
        .lbl-toggle::before {
              content: ' ';
              display: inline-block;
              border-top: 5px solid transparent;
              border-bottom: 5px solid transparent;
              border-left: 5px solid currentColor;
              vertical-align: middle;
              margin-right: .7rem;
              transform: translateY(-2px);
              transition: transform .2s ease-out;
        }
        .collapsible-content .content-inner {
              background-color: #000;
              color: #bbb;
              border-bottom-left-radius: 7px;
              border-bottom-right-radius: 7px;
              /*box-shadow: 2px 2px 3px #00000090;*/
              padding: .5rem 1.2rem;
              font-size: 0.8rem;
        }
        .collapsible-content {
              max-height: 0px;
              overflow: auto;
              transition: max-height .25s ease-in-out;
              background-color: #000;
        }
        .toggle:checked + .lbl-toggle + .collapsible-content {
              max-height: 350px;
        }
        .toggle:checked + .lbl-toggle::before {
              transform: rotate(90deg) translateX(-3px);
        }
        .toggle:checked + .lbl-toggle {
              border-bottom-right-radius: 0;
              border-bottom-left-radius: 0;
        }
        code span { background-color: black; }
    </style>

    <section>
      <div class="wrap-collabsible">
        <input id="collapsible" class="toggle" type="checkbox">

        <label for="collapsible" class="lbl-toggle">
          <slot name="header">***</slot>
        </label>
        <div class="collapsible-content">
          <div class="content-inner">
            <code>
            <slot name="scriptContent">***</slot>
            </code>
          </div>
        </div>
      </div>
    </section>
`

customElements.define( 'sample-element',
  class extends HTMLElement {
    constructor() {
      super()
      const file = this.getAttribute ( "file" )
      const title = this.getAttribute ( "header" )
      const lang = this.getAttribute ( "lang" )
      const shadowRoot = this.attachShadow({ mode: 'open' })
        .appendChild( template.content.cloneNode(true) )
      let header = document.createElement ( "span" )
      header.setAttribute ( "slot", "header" )
      header.innerText = title
      this.appendChild ( header )
      fetch( file ).then(
        response => response.text()
          .then(
            response => this.appendChild(
              ( function ( text, lang ) {
                  let wrapper = document.createElement ( "pre" )
                  wrapper.setAttribute ( "slot", "scriptContent" )
                  let script = document.createElement ( "code" )
                  script.setAttribute( "data-language", lang )
                  wrapper.appendChild(script)
                  Rainbow.color(
                    text,
                    lang,
                    function( highlightedCode ) {
                      script.innerHTML = highlightedCode
                    }
                  )
                  return wrapper
              })( response, lang )
            )
          )
      )
    }
})