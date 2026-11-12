---
block: areasBlock
---

Shows the sub-areas of an area as cards, under a headline. Use it on an `Area` page to list the areas that belong to it. The block is available only on content of the `Area` type.

The block stores only its `title`, the headline shown above the cards. The cards are not stored in the block: they are read from the `areas` field of the `Area` content that the block is placed on, so the list is changed on the area itself and not on the page's block.

### Fields

- `title`: the headline shown above the cards. Defaults to `Áreas` when omitted. It is required in the editor.

### Data read from the Area content

- `areas`: the list of sub-areas of the content, each shown as a card. When the list is empty, only the headline is shown in edit mode, and nothing is shown in view mode.

### Example

```json
{
  "@type": "areasBlock",
  "title": "Áreas"
}
```
