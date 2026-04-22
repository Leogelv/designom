# OM Health — Brand Gradient

Official 5-stop palette. Use via `var(--grad-brand)` or the CSS vars below.

| Token | Hex | RGB | Role |
|---|---|---|---|
| `--grad-stop-1` | `#EB74AA` | 235, 116, 170 | Rose |
| `--grad-stop-2` | `#FD897A` | 253, 137, 122 | Coral |
| `--grad-stop-3` | `#FFB2A5` | 255, 178, 165 | Peach |
| `--grad-stop-4` | `#F7A2C9` | 247, 162, 201 | Pink |
| `--grad-stop-5` | `#CB76DE` | 203, 118, 222 | Orchid |

### Canonical linear

```css
background: linear-gradient(135deg,
  #EB74AA 0%,
  #FD897A 28%,
  #FFB2A5 52%,
  #F7A2C9 76%,
  #CB76DE 100%);
```

### Rich variant (used on BioAge / Прогресс tiles — adds corner glows for depth)

```css
background:
  radial-gradient(95% 70% at 0% 100%, #FFB2A5 0%, transparent 60%),
  radial-gradient(90% 70% at 100% 0%, #F7A2C9 0%, transparent 60%),
  radial-gradient(100% 90% at 100% 100%, #CB76DE 0%, transparent 65%),
  linear-gradient(135deg,
    #EB74AA 0%, #FD897A 28%, #FFB2A5 52%, #F7A2C9 76%, #CB76DE 100%);
```
