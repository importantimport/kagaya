import { getBlocksuiteReader } from 'affine-reader'
import { LitElement, html } from 'lit'
import { Task } from '@lit-labs/task'

export class KagayaAffinePosts extends LitElement {
  static properties = {
    workspaceId: '',
    target: '',
  }

  constructor() {
    super()
    this.workspaceId = globalThis.kagaya?.affine?.workspaceId
    this.target = globalThis.kagaya?.affine?.target
  }

  #apiTask = new Task(
    this,
    async ([workspaceId, target]) => {
      const reader = getBlocksuiteReader({ workspaceId, target })
      const pages = await reader.getWorkspacePages()
      return pages
    },
    () => [this.workspaceId, this.target]
  )

  render() {
    return this.#apiTask.render({
      pending: () => html`Loading posts...`,
      complete: (pages) => html`
        <ul>
          ${pages.map(page => html`<li>
            <a href=${`/post/${page.id}`}>
              ${page.title}
            </a>
          </li>`)}
        </ul>
      `,
    })
  }
}

customElements.define('kagaya-affine-posts', KagayaAffinePosts)