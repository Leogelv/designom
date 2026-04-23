# Дизайн-система · ОМ-здоровье

Единый источник правды для всех UI-решений в приложении. Любая визуальная правка начинается здесь.

---

## 0. Логические основания

- **Вещь** — атомарная единица UI (кнопка, карточка, тег).
- **Свойство** — токен, который ею управляет (радиус, высота, цвет, отступ).
- **Отношение** — связь: одно свойство используется несколькими вещами.

Поэтому **токены первичны**, компоненты — их потребители. Меняем токен — меняется вся система.

---

## 1. Источники правды

| Слой | Файл | Что здесь |
|---|---|---|
| Токены (CSS custom properties) | `public/ds-tokens.css` | `:root { --bg-*, --text-*, --primary-*, --sp-*, --r-*, --btn-*, --grad-*, --shadow-*, --font-* }` |
| Базовые стили и классы | `src/styles.css` | `@import url('/ds-tokens.css')` и все классы (`.card`, `.btn-*`, `.tag`, `.screen-*`) |
| Стартовый экран | `public/splash.css` + `index.html` | Сплэш до бандла; также подтягивает `/ds-tokens.css` |
| React-компоненты | `src/components/ui/` | Тонкие обёртки над классами; barrel: `src/components/ui/index.js` |

**Правило:** не задавай размеры / радиусы / цвета числами в компонентах. Только через токен.

---

## 2. Токены

### 2.1 Цвета

- **Фоны:** `--bg-app`, `--bg-app-alt`, `--bg-elevated`, `--bg-muted`, `--bg-soft-tint`.
- **Текст:** `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-inverse`, `--text-link`.
- **Primary (фиолетовый):** `--primary-50 … --primary-900` (основной акцент — `--primary-600`).
- **Лаванды:** `--lavender-1 … --lavender-3`.
- **Акценты:** `--accent-pink | coral | peach | blue | violet`.
- **Семантика:** `--success / --success-soft`, `--warning / --warning-soft`, `--error / --error-soft`, `--info / --info-soft`.
- **Бордеры:** `--border-subtle | default | strong`.
- **Градиенты:** `--grad-brand`, `--grad-hero-main`, `--grad-hero-soft`, `--grad-orb`, `--grad-protocol`, `--grad-warm-metric`.

Хелперы цвета текста: `.c-primary`, `.c-secondary`, `.c-tertiary`, `.c-inverse`, `.c-brand`, `.c-pink`.

### 2.2 Радиусы

| Назначение | Токен | Значение |
|---|---|---|
| «Карточный» UI | `--r-sm` / `--r-md` / `--r-lg` / `--r-xl` / `--r-xxl` | 12 / 16 / 20 / 24 / 28 |
| Карточка списка | `--r-card` | 24 |
| Hero-карточка | `--r-hero-card` | 28 |
| Инпуты | `--r-input` | 16 |
| Кнопки (единый) | **`--btn-radius`** | **12** |
| Спец. утилитарный | `--r-control` | 12 (тот же «контрольный» радиус) |

Правило: **для всех прямоугольных/«пилюлеобразных» кнопок — `var(--btn-radius)`**. Для круглых — `border-radius: 50%`, а размер — через `--btn-icon-*`. Капсула `9999px` не используется.

### 2.3 Кнопки — единый блок

```css
--btn-radius: 12px;

--btn-height-sm: 36px;   /* сегменты / мелкие контролы */
--btn-height-md: 48px;   /* стандарт */
--btn-height-lg: 52px;   /* основной CTA */

--btn-padding-x: var(--sp-5);      /* 20px */
--btn-padding-x-sm: var(--sp-4);   /* 16px */

--btn-icon-sm: 32px;
--btn-icon-md: 40px;
--btn-icon-lg: 44px;
```

Меняешь `--btn-radius` — ок, **все** кнопки меняют форму. Меняешь `--btn-height-md` — в одном токене правится высота `.btn-secondary`, `.pill-action`, сплэш-кнопки «Начать».

### 2.4 Пространство (spacing 4-scale)

`--sp-1: 4px`, `--sp-2: 8px`, `--sp-3: 12px`, `--sp-4: 16px`, `--sp-5: 20px`, `--sp-6: 24px`, `--sp-7: 28px`, `--sp-8: 32px`, `--sp-10: 40px`, `--sp-12: 48px`, `--sp-14: 56px`, `--sp-16: 64px`.

Производные:

- `--card-pad: var(--sp-4)` — внутренний паддинг карточки.
- `--card-row-gap: var(--sp-3)` — зазор `lead → body → tail`.
- `--card-lead: 58px` — фиксированная колонка для иконки/орба/иллюстрации.
- `--list-gap: var(--sp-3)` — между карточками списка.
- `--stack-tight | --stack-text | --stack-block` — вертикальные зазоры внутри карточки.
- `--section-title-gap` — от подзаголовка секции до первой карточки.

Утилиты-хелперы: `.stack-2 … .stack-6`, `.gap-2…5`, `.flex`, `.flex-col`, `.items-center`, `.justify-between`, `.flex-1`, `.w-full`, `.mt-stack-*`, `.section-gap`, `.section-gap-sm`.

### 2.5 Типографика

Два семейства: `--font-primary` (SF Pro Display → Inter fallback) и `--font-secondary` (SF Pro Text → Inter). Google Fonts: Inter + Unbounded (для бренд-лого).

Базовые классы:

| Класс | Назначение |
|---|---|
| `.t-display-lg / md` | Экранные заголовки / метрики |
| `.t-h1 / h2 / h3` | Заголовки |
| `.t-title-lg / md` | Заголовки секций |
| `.t-body-lg / md / sm` | Основной текст |
| `.t-label-lg / md / sm` | Подписи и label-капсы |
| `.t-metric-lg / xl` | Цифры-метрики |
| `.t-card-title` | **Заголовок сущности** в карточке списка (16/600) |
| `.t-card-points` | **«N баллов»** в карточке (13/600, цвет brand) |
| `.t-card-points--muted` | Тот же ритм, цвет tertiary (строки дневника) |

Правило: один визуальный юнит — **один токен типографики**. Не смешиваем `t-title-lg + t-body-md + fontWeight:600` для «N баллов» в разных карточках.

### 2.6 Тени и анимация

- `--shadow-card`, `--shadow-card-soft`, `--shadow-button`, `--shadow-floating`.
- Длительности: `--dur-fast 120ms`, `--dur-base 180ms`, `--dur-slow 280ms`.
- Ease: `--ease-std`, `--ease-emph`.

View Transitions — общий хелпер в `src/viewTransition.js`: `withViewTransition(() => setState(…))`. Именованные группы задаются через `view-transition-name:` (см. `bottom-nav`, `chat-mic-orb`, `chat-surface`).

---

## 3. Компоненты UI (React)

Импорт через barrel:

```jsx
import {
  Button,
  IconButton,
  Card, CardRow, CardStack, CardBleedX,
  PillAction,
  Tag, TagDone,
  Segmented,
  Screen, ScreenScroll,
  Stack,
} from '../components/ui';
```

### 3.1 `Button`

```jsx
<Button variant="primary" size="lg" fullWidth onClick={…}>CTA</Button>
<Button variant="secondary" fullWidth>Отмена</Button>
```

- `variant`: `primary` (фиолетовый) | `secondary` (лавандовый).
- `size`: `md` (по умолчанию у `btn-secondary`) | `lg` (по умолчанию у `btn-primary`).
- `fullWidth`: добавляет `.btn-full`.

Размеры/радиусы — только токены `--btn-*`.

### 3.2 `IconButton`

Круглая кнопка-иконка, `border-radius: 50%`, размер из токенов `--btn-icon-*`.

```jsx
<IconButton label="Открыть" size="md" onClick={…}>
  <IconChevR size={16} />
</IconButton>
```

### 3.3 `Card`, `CardRow`, `CardStack`, `CardBleedX`

Универсальная карточка списка.

```jsx
<Card tappable onClick={open}>
  <CardRow
    lead={<div className="icon-square tint-peach"><IconSun /></div>}
    tail={<ArrowChip onClick={openInner} />}
  >
    <CardStack>
      <div className="t-card-title">Утренний чекап</div>
      <div className="t-card-points">50 баллов</div>
      <div className="t-body-sm c-secondary">Описание…</div>
    </CardStack>
  </CardRow>
</Card>
```

- `Card` применяет `.card` (радиус, тень, паддинг, бордер).
- `tappable` → hover/active.
- `CardRow` — строгий 3-слотовый layout: **lead | body | tail**, визуал центрируется по тексту.
- `CardStack` — вертикальный стек без inline-margin (для читаемого body).
- `CardBleedX` — блок, выходящий на края карточки (график «Динамика»).

### 3.4 `PillAction`

«Кнопка-пилюля» внутри карточки, со стрелкой-чипом.

```jsx
<PillAction label="Перейти в дневник питания" onClick={open} />
```

### 3.5 `Tag`, `TagDone`

```jsx
<Tag tone="success">Новое</Tag>
<Tag tone="warning">Внимание</Tag>
<TagDone />  // зелёная «Выполнено»
```

`tone`: `success | warning | error | info | neutral`.

### 3.6 `Segmented`

```jsx
<Segmented
  ariaLabel="Категории"
  active={tab}
  onChange={setTab}
  items={[
    { id: 'practice', label: 'Практики' },
    { id: 'breath',   label: 'Дыхание' },
    { id: 'content',  label: 'Контент' },
  ]}
/>
```

### 3.7 `Screen`, `ScreenScroll`

Стандартная оболочка экрана (паддинги под safe-area, резерв под таббар, скролл с прокруткой).

```jsx
<Screen>
  <ScreenScroll>
    …
  </ScreenScroll>
</Screen>
```

### 3.8 `Stack`

Вертикальный стек с фиксированным `gap`.

```jsx
<Stack gap={3}>…</Stack>   // = .stack-3 (gap: var(--sp-3))
```

---

## 4. Правила использования

1. **Не** вставляй числовые значения (px) в JSX/CSS компонентов — только токены `--sp-*`, `--btn-*`, `--r-*`.
2. **Не** смешивай типографические классы в роли «новой стилизации»: если появляется новая сущность — добавь токен-класс в `styles.css` (см. `.t-card-title`, `.t-card-points`).
3. **Не** дублируй кнопки: все прямоугольные → `Button`, круглые иконки → `IconButton`. Уникальные «штучные» кнопки (чат-микрофон, чат-send) — задокументированные исключения.
4. **Не** копируй `div className="card ..." >` — используй `Card` / `CardRow`.
5. **Иконки** из `lucide-react` или SVG-примитивы из `shared.jsx` — размер через проп, цвет через `currentColor`.
6. **View Transitions**: смена стейта / маршрута — через `withViewTransition`. Крупный визуал, который «перерождается» между экранами, получает `view-transition-name`.
7. **Reduced motion**: все анимации спрятаны под `@media (prefers-reduced-motion: no-preference)`; редуцированный режим показывает финальное состояние без движения.

---

## 5. Как расширять систему

1. Появилась **новая визуальная сущность** (например, `pill-chip`):
   - Добавь токен-значения в `public/ds-tokens.css` (если нужны новые размеры).
   - Добавь CSS-класс(ы) в `src/styles.css`, используя токены.
   - Оберни класс(ы) в компонент в `src/components/ui/` и экспортни в `index.js`.
2. Появилась **новая страница**:
   - `Screen` + `ScreenScroll` как оболочка.
   - Заголовок: `<h1 className="t-h1 c-primary screen-title">…</h1>`.
   - Контент — через `Card`, `CardRow`, `Stack`, `Segmented`, `Button`.
3. **Аудит согласованности** (короткий чек-лист перед PR):
   - [ ] все числа заменены токенами?
   - [ ] все кнопки — `Button` / `IconButton` / `PillAction`?
   - [ ] все карточки — `Card` + `CardRow`?
   - [ ] все теги — `Tag` / `TagDone`?
   - [ ] типографические классы взяты из палитры `.t-*`, а не собраны вручную?

---

## 6. Кратко — где что

| Хочу изменить | Файл |
|---|---|
| Радиус/высоту/паддинг кнопок | `public/ds-tokens.css` → `--btn-*` |
| Цвета темы | `public/ds-tokens.css` |
| Поведение/поля карточки | `src/styles.css` → `.card`, `.card-row`, `.card__stack` |
| API `<Card/>`, `<CardRow/>` и пр. | `src/components/ui/Card.jsx`, `CardRow.jsx` |
| Вью-переходы | `src/viewTransition.js` + `src/styles.css` (::view-transition-*) |
| Сплэш до бандла | `index.html` + `public/splash.css` + `public/ds-tokens.css` |

---

## 7. Запуск и сборка

```bash
npm install
npm run dev       # локальная разработка
npm run build     # прод-сборка (Vite)
npm run preview   # предпросмотр dist/
```

Деплой: Vercel. Кэш статики управляется через `vercel.json` (`/uploads/(.*)` → `Cache-Control` с большим `max-age`).
