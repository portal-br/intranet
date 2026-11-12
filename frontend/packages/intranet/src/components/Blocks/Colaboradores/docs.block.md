---
block: colaboradoresBlock
---

Shows the staff (colaboradores) of an area as cards, under a headline. The block is listed as `Equipe` in the block chooser. Use it on an `Area` page to show the people who work in that area. The block is available only on content of the `Area` type.

The block stores only its `title` field. The people shown are not stored in the block: they are read from the `colaboradores` field of the `Area` content that the block is placed on, so the list is changed on the area itself.

### Fields

- `title`: the title of the block. Defaults to `Colaboradores` when omitted. It is required in the editor, and it is shown as the headline above the cards.

### Data read from the Area content

- `colaboradores`: the list of people of the area, each shown as a card. When the list is empty, only the headline is shown in edit mode, and nothing is shown in view mode.

### Example

```json
{
  "@type": "colaboradoresBlock",
  "title": "Colaboradores"
}
```
