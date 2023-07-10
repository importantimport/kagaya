import { getBlocksuiteReader } from 'affine-reader'
import { LitElement, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { Task } from '@lit-labs/task'

import { mdToHTML } from '../../utils/md-to-html.js'

export class KagayaAffinePost extends LitElement {
  static properties = {
    workspaceId: '',
    pageId: '',
    target: ''
  }

  constructor() {
    super()
    this.workspaceId = globalThis.kagaya?.affine?.workspaceId
    this.target = globalThis.kagaya?.affine?.target
  }

  #apiTask = new Task(
    this,
    async ([workspaceId, pageId, target]) => {
      const reader = getBlocksuiteReader({ workspaceId, target })
      const page = await reader.getWorkspacePage(pageId)
      return page
    },
    () => [this.workspaceId, this.pageId, this.target]
  )

  render() {
    return this.#apiTask.render({
      pending: () => html`Loading post...`,
      complete: (page) => html`
        <article>
          <h1>${page.title}</h1>
          <section>${unsafeHTML(mdToHTML(page.md))}</section>
        </article>
      `,
    })
  }
}

customElements.define('kagaya-affine-post', KagayaAffinePost)