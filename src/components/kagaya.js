import { LitElement, html } from 'lit'
import { Router } from '@lit-labs/router'

export class KagayaApp extends LitElement {
  static properties = {
    title: '',
    provider: '',
  }

  constructor() {
    super()
    this.title = globalThis.kagaya?.title
    this.provider = globalThis.kagaya?.provider
  }

  #routes = new Router(this, [
    {
      path: '/',
      render: () => html`<kagaya-affine-posts></kagaya-affine-posts>`,
      enter: async () => {
        await import(`./${this.provider}/posts.js`)
      },
    },
    {
      path: '/post/:pageId',
      render: ({ pageId }) => html`<kagaya-affine-post .pageId=${pageId}></kagaya-affine-post>`,
      enter: async () => {
        await import(`./${this.provider}/post.js`)
      },
    },
  ])

  render() {
    return html`
      <header>
        <a href="/">
          <h1>
            ${this.title}
          </h1>
        </a>
      </header>
      <main>${this.#routes.outlet()}</main>
      <footer>
        <span>
          Made with
        </span>
        <a href="https://github.com/importantimport/kagaya">
          Kagaya
        </a>
      </footer>
    `
  }
}

customElements.define('kagaya-app', KagayaApp)