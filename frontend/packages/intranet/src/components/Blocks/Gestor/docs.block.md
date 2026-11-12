---
block: gestorBlock
---

Shows the manager (gestor) of an area as a single card, under a headline. Use it on an `Area` page to show who leads that area. The block is available only on content of the `Area` type.

The block stores only its `title` field. The manager is not stored in the block: it is read from the `gestor` field of the `Area` content that the block is placed on, so the manager is changed on the area itself.

### Fields

- `title`: the title of the block. Defaults to `Gestor` when omitted. It is required in the editor, and it is shown as the headline above the card.

### Data read from the Area content

- `gestor`: the manager of the area, shown as one card. When the area has no manager, the block shows nothing, in view and edit mode.

### Example

```json
{
  "@type": "gestorBlock",
  "title": "Gestor"
}
```
