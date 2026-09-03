const API = "/api";
const SECTION_LABELS = {
  hero: "Главный экран",
  meta: "SEO и метаданные",
  branding: "Брендинг",
  header: "Шапка сайта",
  services: "Услуги",
  advantages: "Преимущества",
  portfolio: "Портфолио",
  clients: "Клиенты",
  partners: "Партнёры",
  process: "Процесс работы",
  contacts: "Контакты и форма",
  footer: "Подвал",
  pages: "Внутренние страницы",
  blocks: "Порядок блоков",
  settings: "Настройки аккаунта",
  guide: "Инструкция",
};

const state = {
  user: null,
  content: null,
  view: "hero",
  saving: false,
  dirty: false,
};

const app = document.getElementById("app");

async function api(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Ошибка запроса");
  return data;
}

function toast(message, error = false) {
  const el = document.createElement("div");
  el.className = `toast${error ? " error" : ""}`;
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

function uid(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function field(label, value, onChange, type = "text", hint = "") {
  const wrap = document.createElement("div");
  wrap.className = "field";
  wrap.innerHTML = `<label>${label}</label>`;
  const input = document.createElement(type === "textarea" ? "textarea" : "input");
  if (type !== "textarea") input.type = type;
  input.value = value ?? "";
  input.addEventListener("input", (e) => {
    state.dirty = true;
    onChange(e.target.value);
    render();
  });
  wrap.appendChild(input);
  if (hint) {
    const h = document.createElement("div");
    h.className = "hint";
    h.textContent = hint;
    wrap.appendChild(h);
  }
  return wrap;
}

function mediaField(label, value, onChange) {
  const wrap = document.createElement("div");
  wrap.className = "field";
  wrap.innerHTML = `<label>${label}</label>`;

  const row = document.createElement("div");
  row.className = "media-row";

  const input = document.createElement("input");
  input.value = value ?? "";
  input.placeholder = "/uploads/file.jpg или /assets/hero.mp4";
  input.addEventListener("input", (e) => {
    state.dirty = true;
    onChange(e.target.value);
    preview.src = e.target.value;
  });

  const preview = document.createElement(value?.match(/\.(mp4|webm|mov)$/i) ? "video" : "img");
  preview.className = "media-preview";
  if (value) preview.src = value;
  if (preview.tagName === "VIDEO") {
    preview.controls = true;
    preview.muted = true;
  }

  const uploadBtn = document.createElement("button");
  uploadBtn.type = "button";
  uploadBtn.className = "btn btn-secondary btn-sm";
  uploadBtn.textContent = "Загрузить файл";
  uploadBtn.onclick = () => uploadFile(onChange, preview);

  row.append(preview, input, uploadBtn);
  wrap.appendChild(row);
  return wrap;
}

async function uploadFile(onChange, preview) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*,video/*";
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch(`${API}/upload`, { method: "POST", body: form, credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка загрузки");
      state.dirty = true;
      onChange(data.url);
      preview.src = data.url;
      toast("Файл загружен");
      render();
    } catch (e) {
      toast(e.message, true);
    }
  };
  input.click();
}

function panel(title, children) {
  const el = document.createElement("section");
  el.className = "panel";
  el.innerHTML = `<h2 class="panel-title">${title}</h2>`;
  const grid = document.createElement("div");
  grid.className = "panel-grid panel-grid-2";
  for (const child of children) grid.appendChild(child);
  el.appendChild(grid);
  return el;
}

function renderLogin() {
  app.innerHTML = `
    <div class="login-screen">
      <form class="login-card" id="login-form">
        <div class="login-logo">ART OFFICE GROUP</div>
        <h1 class="login-title">Админ-панель</h1>
        <p class="login-sub">Управление контентом сайта art-office.kz</p>
        <div class="panel-grid">
          <div class="field"><label>Email</label><input name="email" type="email" required value="artoffice@gmail.com" /></div>
          <div class="field"><label>Пароль</label><input name="password" type="password" required /></div>
        </div>
        <button class="btn btn-primary" style="width:100%;margin-top:16px" type="submit">Войти</button>
        <p class="login-sub" style="margin-top:16px;margin-bottom:0;font-size:12px">После входа откройте раздел «Инструкция» в меню слева.</p>
      </form>
    </div>`;

  document.getElementById("login-form").onsubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      state.user = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }),
      });
      state.content = await api("/content");
      state.view = "hero";
      render();
    } catch (err) {
      toast(err.message, true);
    }
  };
}

function renderSidebar() {
  const nav = document.createElement("aside");
  nav.className = "sidebar";
  nav.innerHTML = `<div class="sidebar-brand"><strong>ART OFFICE</strong><span>Панель управления</span></div>`;

  const groups = [
    ["Помощь", ["guide"]],
    ["Сайт", ["hero", "meta", "branding", "header", "blocks"]],
    ["Блоки главной", ["services", "advantages", "portfolio", "clients", "partners", "process", "contacts", "footer"]],
    ["Страницы", ["pages"]],
    ["Аккаунт", ["settings"]],
  ];

  for (const [label, items] of groups) {
    const group = document.createElement("div");
    group.className = "nav-group";
    group.innerHTML = `<div class="nav-label">${label}</div>`;
    for (const id of items) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `nav-btn${state.view === id ? " active" : ""}`;
      btn.innerHTML = `<span class="nav-dot"></span>${SECTION_LABELS[id]}`;
      btn.onclick = () => {
        state.view = id;
        render();
      };
      group.appendChild(btn);
    }
    nav.appendChild(group);
  }

  const logout = document.createElement("button");
  logout.type = "button";
  logout.className = "btn btn-secondary";
  logout.style.margin = "12px";
  logout.textContent = "Выйти";
  logout.onclick = async () => {
    await api("/auth/logout", { method: "POST" });
    state.user = null;
    state.content = null;
    render();
  };
  nav.appendChild(logout);
  return nav;
}

function renderTopbar(title) {
  const bar = document.createElement("div");
  bar.className = "topbar";
  bar.innerHTML = `<h1>${title}</h1>`;
  const actions = document.createElement("div");
  actions.className = "topbar-actions";

  const preview = document.createElement("a");
  preview.href = "/";
  preview.target = "_blank";
  preview.className = "btn btn-secondary";
  preview.textContent = "Открыть сайт";

  actions.append(preview);

  if (state.view !== "guide") {
    const save = document.createElement("button");
    save.type = "button";
    save.className = "btn btn-primary";
    save.textContent = state.saving ? "Сохранение..." : "Сохранить изменения";
    save.disabled = state.saving;
    save.onclick = saveContent;
    actions.appendChild(save);
  }

  bar.appendChild(actions);
  return bar;
}

async function saveContent() {
  state.saving = true;
  render();
  try {
    state.content = await api("/content", { method: "PUT", body: JSON.stringify(state.content) });
    state.dirty = false;
    toast("Изменения сохранены и опубликованы на сайте");
  } catch (e) {
    toast(e.message, true);
  } finally {
    state.saving = false;
    render();
  }
}

function renderHero() {
  const c = state.content.hero;
  return panel("Главный экран (Hero)", [
    field("Бейдж (моб.)", c.badge, (v) => (c.badge = v)),
    field("Заголовок", c.title, (v) => (c.title = v)),
    field("Акцент в заголовке", c.titleAccent, (v) => (c.titleAccent = v)),
    field("Подзаголовок 1", c.subtitle1, (v) => (c.subtitle1 = v)),
    field("Подзаголовок 2", c.subtitle2, (v) => (c.subtitle2 = v)),
    field("Кнопка CTA", c.ctaPrimary, (v) => (c.ctaPrimary = v)),
    field("Число лет", c.yearsCount, (v) => (c.yearsCount = v)),
    field("Текст «лет»", c.yearsLabel, (v) => (c.yearsLabel = v)),
    field("Подсказка «Листайте»", c.scrollHint, (v) => (c.scrollHint = v)),
    mediaField("Постер (фото)", c.poster, (v) => (c.poster = v)),
    mediaField("Видео (MP4)", c.video, (v) => (c.video = v)),
  ]);
}

function renderMeta() {
  const c = state.content.meta;
  return panel("SEO", [
    field("Title", c.title, (v) => (c.title = v)),
    field("Title template", c.titleTemplate, (v) => (c.titleTemplate = v)),
    field("Description", c.description, (v) => (c.description = v), "textarea"),
    field("OG Title", c.ogTitle, (v) => (c.ogTitle = v)),
    field("OG Description", c.ogDescription, (v) => (c.ogDescription = v), "textarea"),
    field("URL сайта", c.siteUrl, (v) => (c.siteUrl = v)),
  ]);
}

function renderListSection(key, itemRenderer, createItem) {
  const section = state.content.homeSections[key];
  const root = document.createElement("div");

  root.appendChild(
    panel(`Заголовок секции`, [
      field("Метка", section.label, (v) => (section.label = v)),
      field("Заголовок", section.title, (v) => (section.title = v)),
      ...(section.subtitle !== undefined ? [field("Подзаголовок", section.subtitle, (v) => (section.subtitle = v), "textarea")] : []),
      ...(section.accent !== undefined ? [field("Акцент", section.accent, (v) => (section.accent = v))] : []),
    ]),
  );

  const listPanel = document.createElement("section");
  listPanel.className = "panel";
  listPanel.innerHTML = `<div class="item-card-head"><h2 class="panel-title" style="margin:0">Элементы</h2>
    <button type="button" class="btn btn-secondary btn-sm" id="add-item">+ Добавить</button></div>`;

  const list = document.createElement("div");
  for (const [index, item] of section.items.entries()) {
    list.appendChild(itemRenderer(item, index, section.items));
  }
  listPanel.appendChild(list);
  root.appendChild(listPanel);

  root.querySelector("#add-item").onclick = () => {
    section.items.push(createItem());
    state.dirty = true;
    render();
  };

  return root;
}

function itemCard(title, bodyEl, onDelete, onMoveUp, onMoveDown) {
  const card = document.createElement("article");
  card.className = "item-card";
  const head = document.createElement("div");
  head.className = "item-card-head";
  head.innerHTML = `<h3>${title}</h3>`;
  const actions = document.createElement("div");
  actions.className = "order-actions";
  if (onMoveUp) {
    const up = document.createElement("button");
    up.className = "btn btn-secondary btn-sm";
    up.textContent = "↑";
    up.onclick = onMoveUp;
    actions.appendChild(up);
  }
  if (onMoveDown) {
    const down = document.createElement("button");
    down.className = "btn btn-secondary btn-sm";
    down.textContent = "↓";
    down.onclick = onMoveDown;
    actions.appendChild(down);
  }
  const del = document.createElement("button");
  del.className = "btn btn-danger btn-sm";
  del.textContent = "Удалить";
  del.onclick = onDelete;
  actions.appendChild(del);
  head.appendChild(actions);
  card.appendChild(head);
  card.appendChild(bodyEl);
  return card;
}

function renderServices() {
  return renderListSection(
    "services",
    (item, index, items) => {
      const grid = document.createElement("div");
      grid.className = "panel-grid panel-grid-2";
      grid.append(
        field("Название", item.title, (v) => (item.title = v)),
        field("Описание", item.description, (v) => (item.description = v), "textarea"),
        field("ID иконки", item.icon, (v) => (item.icon = v), "text", "partitions, doors, windows, facades, railings, glass, shower, design"),
        mediaField("Фото", item.image, (v) => (item.image = v)),
      );
      return itemCard(item.title || `Услуга ${index + 1}`, grid, () => {
        items.splice(index, 1);
        state.dirty = true;
        render();
      }, index > 0 ? () => swap(items, index, index - 1) : null, index < items.length - 1 ? () => swap(items, index, index + 1) : null);
    },
    () => ({ id: uid("service"), title: "Новая услуга", description: "", icon: "partitions", image: "" }),
  );
}

function renderAdvantages() {
  return renderListSection(
    "advantages",
    (item, index, items) => {
      const grid = document.createElement("div");
      grid.className = "panel-grid panel-grid-2";
      grid.append(
        field("Заголовок", item.title, (v) => (item.title = v)),
        field("Короткое название", item.shortTitle, (v) => (item.shortTitle = v)),
        field("Lead", item.lead, (v) => (item.lead = v), "textarea"),
        field("Текст", item.text, (v) => (item.text = v), "textarea"),
        field("Пункты (через |)", item.highlights.join(" | "), (v) => (item.highlights = v.split("|").map((s) => s.trim()).filter(Boolean)), "textarea"),
        field("Иконка", item.icon, (v) => (item.icon = v), "text", "turnkey, design, license, measure"),
      );
      return itemCard(item.shortTitle || `Преимущество ${index + 1}`, grid, () => {
        items.splice(index, 1);
        state.dirty = true;
        render();
      });
    },
    () => ({ id: uid("adv"), icon: "turnkey", title: "", shortTitle: "", lead: "", text: "", highlights: [] }),
  );
}

function renderPortfolio() {
  const section = state.content.homeSections.portfolio;
  const root = document.createElement("div");
  root.appendChild(
    panel("Настройки портфолио", [
      field("Метка", section.label, (v) => (section.label = v)),
      field("Заголовок", section.title, (v) => (section.title = v)),
      field("Текст кнопки", section.ctaText, (v) => (section.ctaText = v)),
      field("Ссылка", section.ctaLink, (v) => (section.ctaLink = v)),
      field("Кнопка галереи", section.galleryButton, (v) => (section.galleryButton = v)),
    ]),
  );

  const listPanel = document.createElement("section");
  listPanel.className = "panel";
  listPanel.innerHTML = `<div class="item-card-head"><h2 class="panel-title" style="margin:0">Проекты</h2>
    <button type="button" class="btn btn-secondary btn-sm" id="add-project">+ Добавить проект</button></div>`;

  for (const [index, item] of section.items.entries()) {
    const grid = document.createElement("div");
    grid.className = "panel-grid panel-grid-2";
    const toggle = document.createElement("label");
    toggle.className = "toggle";
    toggle.innerHTML = `<input type="checkbox" ${item.showOnHome ? "checked" : ""} /> Показывать на главной`;
    toggle.querySelector("input").onchange = (e) => {
      item.showOnHome = e.target.checked;
      state.dirty = true;
    };
    grid.append(
      field("Название", item.name, (v) => (item.name = v)),
      field("Тип", item.type, (v) => (item.type = v)),
      mediaField("Обложка", item.cover, (v) => (item.cover = v)),
      field("Галерея (URL через |)", item.gallery.join(" | "), (v) => (item.gallery = v.split("|").map((s) => s.trim()).filter(Boolean)), "textarea"),
      toggle,
    );
    listPanel.appendChild(
      itemCard(item.name || `Проект ${index + 1}`, grid, () => {
        section.items.splice(index, 1);
        state.dirty = true;
        render();
      }),
    );
  }

  root.appendChild(listPanel);
  root.querySelector("#add-project").onclick = () => {
    section.items.push({ id: uid("project"), name: "Новый проект", type: "", cover: "", gallery: [], showOnHome: false });
    state.dirty = true;
    render();
  };
  return root;
}

function renderLogoSection(key) {
  return renderListSection(
    key,
    (item, index, items) => {
      const grid = document.createElement("div");
      grid.className = "panel-grid panel-grid-2";
      grid.append(field("Название", item.name, (v) => (item.name = v)), mediaField("Логотип", item.src, (v) => (item.src = v)));
      if (item.category !== undefined) {
        grid.append(field("Категория", item.category, (v) => (item.category = v)), field("Описание", item.highlight, (v) => (item.highlight = v), "textarea"));
      }
      return itemCard(item.name || `Элемент ${index + 1}`, grid, () => {
        items.splice(index, 1);
        state.dirty = true;
        render();
      });
    },
    () => (key === "clients"
      ? { id: uid("client"), name: "", src: "", category: "", highlight: "" }
      : { id: uid("partner"), name: "", src: "" }),
  );
}

function renderProcess() {
  return renderListSection(
    "process",
    (item, index, items) => {
      const grid = document.createElement("div");
      grid.className = "panel-grid panel-grid-2";
      grid.append(
        field("Номер", item.num, (v) => (item.num = v)),
        field("Заголовок", item.title, (v) => (item.title = v)),
        field("Текст", item.text, (v) => (item.text = v), "textarea"),
        field("Выделение (необязательно)", item.highlight || "", (v) => (item.highlight = v)),
      );
      return itemCard(`${item.num}. ${item.title}`, grid, () => {
        items.splice(index, 1);
        state.dirty = true;
        render();
      });
    },
    () => ({ id: uid("step"), num: "00", title: "", text: "", highlight: "" }),
  );
}

function renderContacts() {
  const c = state.content.contacts;
  const s = state.content.homeSections.contacts;
  const root = document.createElement("div");
  root.appendChild(
    panel("Форма на главной", [
      field("Метка", s.label, (v) => (s.label = v)),
      field("Заголовок", s.title, (v) => (s.title = v)),
      field("Подзаголовок", s.formSubtitle, (v) => (s.formSubtitle = v), "textarea"),
      field("Кнопка отправки", s.submitButton, (v) => (s.submitButton = v)),
    ]),
  );
  root.appendChild(
    panel("Контактные данные", [
      field("Компания", c.company, (v) => (c.company = v)),
      field("Адрес", c.address, (v) => (c.address = v), "textarea"),
      field("Дополнение к адресу", c.addressMeta, (v) => (c.addressMeta = v)),
      field("Телефон основной", c.phonePrimary, (v) => (c.phonePrimary = v)),
      field("Tel href основной", c.phonePrimaryHref, (v) => (c.phonePrimaryHref = v)),
      field("Дополнительный телефон", c.phoneSecondary, (v) => (c.phoneSecondary = v)),
      field("Tel href дополнительного телефона", c.phoneSecondaryHref, (v) => (c.phoneSecondaryHref = v)),
      field("Email", c.email, (v) => (c.email = v)),
      field("WhatsApp номер", c.whatsappPhone, (v) => (c.whatsappPhone = v)),
      field("WhatsApp сообщение", c.whatsappMessage, (v) => (c.whatsappMessage = v), "textarea"),
      field("Часы работы", c.hours, (v) => (c.hours = v)),
      field("Instagram", c.instagram, (v) => (c.instagram = v)),
      field("Широта карты", String(c.mapCoordinates.lat), (v) => (c.mapCoordinates.lat = Number(v))),
      field("Долгота карты", String(c.mapCoordinates.lng), (v) => (c.mapCoordinates.lng = Number(v))),
    ]),
  );
  return root;
}

function renderBlocks() {
  const order = state.content.homeSections.order;
  const wrap = document.createElement("section");
  wrap.className = "panel";
  wrap.innerHTML = `<h2 class="panel-title">Порядок и видимость блоков на главной</h2><div class="order-list" id="order-list"></div>`;
  const list = wrap.querySelector("#order-list");

  for (const [index, id] of order.entries()) {
    const section = state.content.homeSections[id];
    const row = document.createElement("div");
    row.className = "order-item";
    row.innerHTML = `<div><strong>${SECTION_LABELS[id] || id}</strong><div class="chip">${id}</div></div>`;

    const actions = document.createElement("div");
    actions.className = "order-actions";

    const toggle = document.createElement("label");
    toggle.className = "toggle";
    toggle.innerHTML = `<input type="checkbox" ${section.enabled ? "checked" : ""} /> Вкл`;
    toggle.querySelector("input").onchange = (e) => {
      section.enabled = e.target.checked;
      state.dirty = true;
    };

    if (index > 0) {
      const up = document.createElement("button");
      up.className = "btn btn-secondary btn-sm";
      up.textContent = "↑";
      up.onclick = () => swap(order, index, index - 1);
      actions.appendChild(up);
    }
    if (index < order.length - 1) {
      const down = document.createElement("button");
      down.className = "btn btn-secondary btn-sm";
      down.textContent = "↓";
      down.onclick = () => swap(order, index, index + 1);
      actions.appendChild(down);
    }

    actions.appendChild(toggle);
    row.appendChild(actions);
    list.appendChild(row);
  }

  return wrap;
}

function renderSettings() {
  const form = document.createElement("form");
  form.className = "panel";
  form.innerHTML = `
    <h2 class="panel-title">Настройки аккаунта</h2>
    <div class="panel-grid panel-grid-2">
      <div class="field"><label>Имя</label><input name="name" value="${state.user.name || ""}" /></div>
      <div class="field"><label>Новый email</label><input name="newEmail" type="email" value="${state.user.email || ""}" /></div>
      <div class="field"><label>Новый пароль</label><input name="newPassword" type="password" placeholder="Оставьте пустым, если не меняете" /></div>
      <div class="field"><label>Текущий пароль</label><input name="currentPassword" type="password" required /></div>
    </div>
    <button class="btn btn-primary" type="submit" style="margin-top:16px">Обновить профиль</button>`;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    try {
      const user = await api("/auth/profile", {
        method: "PUT",
        body: JSON.stringify({
          name: fd.get("name"),
          newEmail: fd.get("newEmail"),
          newPassword: fd.get("newPassword") || undefined,
          currentPassword: fd.get("currentPassword"),
        }),
      });
      state.user = user;
      toast("Профиль обновлён");
      render();
    } catch (err) {
      toast(err.message, true);
    }
  };
  return form;
}

function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
  state.dirty = true;
  render();
}

function renderGuide() {
  const wrap = document.createElement("div");
  wrap.className = "guide-wrap";

  wrap.innerHTML = `
    <section class="guide-hero panel">
      <p class="guide-kicker">Руководство пользователя</p>
      <h2 class="guide-hero-title">Как управлять сайтом art-office.kz</h2>
      <p class="guide-hero-text">Здесь собрана полная инструкция: что можно менять, как загружать файлы и как публиковать изменения на сайт.</p>
      <div class="guide-quick-grid">
        <div class="guide-quick-card">
          <span class="guide-quick-label">Шаг 1</span>
          <strong>Выберите раздел</strong>
          <p>В меню слева — Hero, услуги, портфолио и другие блоки.</p>
        </div>
        <div class="guide-quick-card">
          <span class="guide-quick-label">Шаг 2</span>
          <strong>Измените контент</strong>
          <p>Тексты, фото и видео. Для медиа — кнопка «Загрузить файл».</p>
        </div>
        <div class="guide-quick-card">
          <span class="guide-quick-label">Шаг 3</span>
          <strong>Сохраните</strong>
          <p>Нажмите «Сохранить изменения» — сайт обновится автоматически.</p>
        </div>
      </div>
    </section>

    <section class="panel guide-section">
      <h2>Как это работает</h2>
      <ol class="guide-steps">
        <li><strong>Весь контент</strong> хранится в одном файле на сервере.</li>
        <li><strong>Сайт</strong> при открытии подгружает этот файл и показывает актуальные тексты, фото и видео.</li>
        <li><strong>Админ-панель</strong> редактирует контент через удобные формы — без программирования.</li>
        <li>После сохранения изменения сразу видны на сайте — <strong>пересборка не нужна</strong>.</li>
      </ol>
      <div class="guide-callout">
        Загруженные файлы сохраняются в папку <code>/uploads/</code> и доступны на сайте по адресу вида <code>/uploads/имя-файла.jpg</code>
      </div>
    </section>

    <section class="panel guide-section">
      <h2>Разделы панели</h2>
      <div class="guide-cards">
        <article class="guide-card">
          <h3>Главный экран (Hero)</h3>
          <p>Заголовки, подзаголовки, кнопки. Постер для мобильных и видео MP4 для десктопа.</p>
        </article>
        <article class="guide-card">
          <h3>SEO и метаданные</h3>
          <p>Title и description для Google, Open Graph для соцсетей.</p>
        </article>
        <article class="guide-card">
          <h3>Брендинг и шапка</h3>
          <p>Логотип, название компании, пункты меню, кнопка «Заказать звонок».</p>
        </article>
        <article class="guide-card">
          <h3>Порядок блоков</h3>
          <p>Включить/выключить любой блок на главной. Менять порядок стрелками ↑ ↓.</p>
        </article>
        <article class="guide-card">
          <h3>Услуги</h3>
          <p>Добавлять, удалять, менять название, описание и фото. Иконки: partitions, doors, windows, facades, railings, glass, shower, design.</p>
        </article>
        <article class="guide-card">
          <h3>Преимущества</h3>
          <p>Карточки с заголовком и текстом. Пункты списка вводите через символ <code>|</code>.</p>
        </article>
        <article class="guide-card">
          <h3>Портфолио</h3>
          <p>Все проекты. Галочка «Показывать на главной» — только отмеченные попадают в слайдер. Галерея — несколько URL через <code>|</code>.</p>
        </article>
        <article class="guide-card">
          <h3>Клиенты и партнёры</h3>
          <p>Логотипы компаний. Кнопка «+ Добавить» — новая карточка, «Загрузить файл» — логотип с компьютера.</p>
        </article>
        <article class="guide-card">
          <h3>Процесс работы</h3>
          <p>3 шага: номер, заголовок, текст. Поле «Выделение» — подсвеченный фрагмент (например «гарантией 5 лет»).</p>
        </article>
        <article class="guide-card">
          <h3>Контакты и форма</h3>
          <p>Телефоны, email, WhatsApp, адрес, часы, координаты карты, Instagram, тексты формы заявки.</p>
        </article>
        <article class="guide-card">
          <h3>Подвал и страницы</h3>
          <p>Copyright, локация. Заголовки внутренних страниц /projects, /clients, /partners.</p>
        </article>
        <article class="guide-card">
          <h3>Настройки аккаунта</h3>
          <p>Смена имени, email и пароля. Для сохранения нужен текущий пароль.</p>
        </article>
      </div>
    </section>

    <section class="panel guide-section">
      <h2>Загрузка фото и видео</h2>
      <ol class="guide-steps">
        <li>Откройте нужный раздел (Hero, услуги, портфолио и т.д.).</li>
        <li>Найдите поле с превью и нажмите <strong>«Загрузить файл»</strong>.</li>
        <li>Выберите файл: JPG, PNG, WebP, GIF, SVG или видео MP4, WebM, MOV.</li>
        <li>URL подставится автоматически — нажмите <strong>«Сохранить изменения»</strong>.</li>
      </ol>
      <p class="guide-note">Максимальный размер файла — <strong>100 МБ</strong>. Для Hero-видео рекомендуется MP4 (H.264).</p>
    </section>

    <section class="panel guide-section">
      <h2>Частые вопросы</h2>
      <div class="guide-faq">
        <details class="guide-faq-item" open>
          <summary>Изменения не видны на сайте?</summary>
          <p>Убедитесь, что нажали «Сохранить изменения». Затем обновите сайт с очисткой кэша — Ctrl+F5 (Windows) или Cmd+Shift+R (Mac).</p>
        </details>
        <details class="guide-faq-item">
          <summary>Видео на главной не воспроизводится?</summary>
          <p>Используйте формат MP4 (кодек H.264). На мобильных показывается постер — видео только на десктопе.</p>
        </details>
        <details class="guide-faq-item">
          <summary>Как добавить клиента или партнёра?</summary>
          <p>Раздел «Клиенты» или «Партнёры» → «+ Добавить» → загрузите логотип → заполните название → «Сохранить изменения».</p>
        </details>
        <details class="guide-faq-item">
          <summary>Как скрыть блок с главной страницы?</summary>
          <p>Раздел «Порядок блоков» → снимите галочку «Вкл» у нужного блока → сохраните.</p>
        </details>
        <details class="guide-faq-item">
          <summary>Как добавить проект в слайдер на главной?</summary>
          <p>Раздел «Портфолио» → откройте проект → включите «Показывать на главной» → сохраните.</p>
        </details>
        <details class="guide-faq-item">
          <summary>Как сменить пароль?</summary>
          <p>Раздел «Настройки аккаунта» → введите новый пароль и текущий для подтверждения → сохраните профиль.</p>
        </details>
      </div>
    </section>

    <section class="panel guide-section">
      <h2>Безопасность</h2>
      <ul class="guide-list">
        <li>Смените пароль после первого входа в «Настройках аккаунта».</li>
        <li>Не передавайте доступ к админке посторонним.</li>
        <li>Выходите из панели на чужих компьютерах — кнопка «Выйти» внизу меню.</li>
        <li>Сессия активна 7 дней, затем потребуется повторный вход.</li>
      </ul>
    </section>

    <section class="panel guide-section guide-support">
      <h2>Нужна помощь?</h2>
      <p>Если что-то не работает, обратитесь к разработчику сайта и укажите:</p>
      <ul class="guide-list">
        <li>Какой раздел вы редактировали</li>
        <li>Что именно пытались изменить</li>
        <li>Скриншот ошибки (если есть)</li>
      </ul>
    </section>
  `;

  return wrap;
}

function renderContent() {
  const main = document.createElement("main");
  main.className = "main";
  main.appendChild(renderTopbar(SECTION_LABELS[state.view] || state.view));

  const views = {
    hero: renderHero,
    meta: renderMeta,
    branding: () => panel("Брендинг", [
      field("Название компании", state.content.branding.companyName, (v) => (state.content.branding.companyName = v)),
      mediaField("Логотип", state.content.branding.logo, (v) => (state.content.branding.logo = v)),
    ]),
    header: () => panel("Навигация", [
      field("Кнопка в шапке", state.content.header.ctaButton, (v) => (state.content.header.ctaButton = v)),
      field("Пункты меню (JSON)", JSON.stringify(state.content.header.navLinks, null, 2), (v) => {
        try { state.content.header.navLinks = JSON.parse(v); } catch { toast("Некорректный JSON меню", true); }
      }, "textarea", "Формат: [{\"href\":\"#services\",\"label\":\"Услуги\"}]"),
    ]),
    services: renderServices,
    advantages: renderAdvantages,
    portfolio: renderPortfolio,
    clients: () => renderLogoSection("clients"),
    partners: () => renderLogoSection("partners"),
    process: renderProcess,
    contacts: renderContacts,
    footer: () => panel("Подвал", [
      field("Год", String(state.content.footer.year), (v) => (state.content.footer.year = Number(v))),
      field("Локация", state.content.footer.location, (v) => (state.content.footer.location = v)),
      field("Copyright", state.content.footer.copyrightSuffix, (v) => (state.content.footer.copyrightSuffix = v)),
    ]),
    pages: () => panel("Внутренние страницы (JSON)", [
      field("pages", JSON.stringify(state.content.pages, null, 2), (v) => {
        try { state.content.pages = JSON.parse(v); } catch { toast("Некорректный JSON", true); }
      }, "textarea"),
    ]),
    blocks: renderBlocks,
    settings: renderSettings,
    guide: renderGuide,
  };

  const view = views[state.view]?.();
  if (view) main.appendChild(view);
  else main.innerHTML += `<div class="empty">Раздел в разработке</div>`;

  if (state.dirty) {
    const hint = document.createElement("div");
    hint.className = "chip";
    hint.style.marginTop = "12px";
    hint.textContent = "Есть несохранённые изменения";
    main.appendChild(hint);
  }

  return main;
}

function renderDashboard() {
  app.innerHTML = "";
  const layout = document.createElement("div");
  layout.className = "layout";
  layout.append(renderSidebar(), renderContent());
  app.appendChild(layout);
}

async function boot() {
  try {
    state.user = await api("/auth/me");
    state.content = await api("/content");
    renderDashboard();
  } catch {
    renderLogin();
  }
}

function render() {
  if (!state.user) renderLogin();
  else renderDashboard();
}

boot();
