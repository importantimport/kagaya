import { micromark } from 'https://esm.sh/micromark'
import { gfm, gfmHtml } from 'https://esm.sh/micromark-extension-gfm'

export const mdToHTML = (value) => micromark(value, {
  extensions: [gfm()],
  htmlExtensions: [gfmHtml()]
})