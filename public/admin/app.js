const API = "/api";

const DEFAULT_KZ = {
  contacts: {
    whatsappMessage: "Сәлеметсіз бе! Шынылау бойынша кеңес алғым келеді.",
    company: 'ТОО «ART OFFICE GROUP»',
    address: "Алматы қ., Сырбayı Мауленов к-сі, 111, 2-кеңсе",
    addressMeta: "Алмалы ауданы, 050012",
    hours: "Дс–Жм, 9:00–18:00",
  },
  header: {
    ctaButton: "Кері қоңырауға тапсырыс",
    navLinks: [
      { href: "#services", label: "Қызметтер" },
      { href: "#portfolio", label: "Жобалар" },
      { href: "#clients", label: "Клиенттер" },
      { href: "#partners", label: "Серіктестеріміз" },
      { href: "#contacts", label: "Байланыс" },
    ],
  },
  hero: {
    badge: "16 жыл · Алматы",
    title: "Кілтпен тапсырылатын кәсіби шынылау",
    titleAccent: "",
    subtitle1: "Алматыдағы меншікті өндіріс пен монтаждау жұмыстары",
    subtitle2: "Тегін өлшеу жұмыстары",
    ctaPrimary: "Есептеуге тапсырыс беру",
    yearsLabel: "жыл нарықта",
    scrollHint: "Төмен қарай",
  },
  homeSections: {
    services: {
      label: "Бағыттар",
      title: "Біз өндіретін және орнататын конструкциялар",
      extraOption: "Басқа",
      items: [
        { title: "Қалқалар", description: "Шыны, алюминий, өртке төзімді және жылжымалы қалқалар" },
        { title: "Есіктер", description: "Шыны, алюминий, металл және автоматты есіктер" },
        { title: "Терезелер", description: "Тұрғын және коммерциялық нысандарға арналған алюминий терезелер" },
        { title: "Витраждар мен қасбеттер", description: "Қасбеттік шынылау және витраж жүйелері" },
        { title: "Қоршау жүйелері", description: "Баспалдақ, балкон және террасаларға арналған шыны қоршаулар" },
        { title: "Шыны күнқағарлар", description: "Күнқағарлар, шыны едендер, айналар және басқа конструкциялар" },
        { title: "Шыны душ кабиналары", description: "Өлшемге сай жасалатын шыны душ кабиналары, қалқалар және қоршаулар" },
        { title: "Жобалау", description: "Өз жобалау бөліміміз және өндіруші зауыттармен серіктестік" },
      ],
    },
    advantages: {
      label: "Артықшылықтар",
      title: "Неліктен бізді таңдайды",
      items: [
        { title: "Кілтпен тапсырылатын жұмыстардың толық циклі", shortTitle: "Кілтпен тапсыру", lead: "Барлық жұмысты өз мойнымызға аламыз: идеядан бастап дайын нысанды тапсыруға дейін.", text: "Жобалаушыларды, өндірісті және монтаждау бригадасын бөлек іздеудің қажеті жоқ. Біз жобаны бірыңғай командамен жүргіземіз: конструкцияны келісеміз, өз өндірісімізде дайындаймыз, нысанға жеткіземіз және монтаждаймыз. Мерзім, сапа және жауапкершілік — бір тарапта.", highlights: ["Барлық кезеңге арналған бірыңғай мердігер", "Жасырын шығындарсыз ашық смета", "Нысанды келісілген мерзімде тапсыру"] },
        { title: "Толық циклді өндіріс", shortTitle: "Толық цикл", lead: "Меншікті жобалау бөлімі, цех және қойма — бәрі бір жерде.", text: "Конструкцияларды нысаныңызға сай жобалаймыз, өз жабдығымызда өндіреміз және қоймадан жинақтаймыз. Өндіруші зауыттармен серіктестік оңтайлы материалдарды таңдауға және делдалдардың үстеме бағасынсыз тиімді бағаны сақтауға мүмкіндік береді.", highlights: ["Меншікті жобалау бөлімі", "Өндірістік цех пен қойма", "Зауыттардан тікелей жеткізу"] },
        { title: "Мемлекеттік құрылыс лицензиясы", shortTitle: "Лицензия", lead: "Ресми түрде жұмыс істейміз және құжаттардың толық пакетін ұсынамыз.", text: "Лицензия барлық жұмыс түрлерін орындау құқығын растайды. Келісімшарт жасасып, актілер мен кепілдік міндеттемелерін береміз — делдалдарсыз және жасырын схемаларсыз.", highlights: ["Барлық жұмыс түріне лицензия", "Ресми келісімшарт пен актілер", "Делдалдарсыз"] },
        { title: "Нысанға тегін бару, өлшеу және жобаны есептеу", shortTitle: "Тегін өлшеу", lead: "Инженер нысанға барып, өлшем алып, есепті тегін дайындайды.", text: "Нысанға бару мен өлшеу тапсырыс беруге міндеттемейді. Маман нысанды қарап, тапсырманы нақтылайды, конструкциялар мен материалдардың нұсқаларын ұсынады. Ынтымақтастық туралы шешім қабылдамай тұрып, түсінікті смета мен мерзімді аласыз.", highlights: ["Құнын міндеттемесіз есептеу"] },
      ],
    },
    portfolio: {
      label: "Портфолио",
      title: "Орындалған жобалар",
      ctaText: "Жобаларды көру",
      galleryButton: "Галереяны көру",
      allProjectsLabel: "Барлық нысандар",
      items: [
        { type: "Шоурум" },
        { type: "Қонақ үй" },
        { type: "Сауда кешені" },
        { type: "Кешен" },
        { type: "Мейрамхана" },
        { type: "Мейрамхана" },
        { type: "Бизнес орталық" },
        { type: "Тұрғын үй кешені" },
        { type: "Сауда орталығы" },
        { type: "Кеңсе" },
        { type: "Мейрамхана" },
        { type: "Қонақ үй" },
        { type: "Медициналық орталық" },
        { type: "Банк" },
        { type: "Спорт нысаны" },
        { type: "Тұрғын үй" },
        { type: "Салон" },
        { type: "Білім беру нысаны" },
      ],
    },
    clients: {
      label: "Клиенттер",
      title: "Бізге сенеді",
      ctaText: "Барлық клиенттер",
      items: [
        { category: "Автокөлік саласы", highlight: "Премиум дилерлік орталыққа арналған шынылау және қасбет жұмыстары" },
        { category: "HoReCa", highlight: "Жылдам тамақтану мейрамханаларына арналған шыны шешімдер" },
        { category: "Мұнай және энергетика", highlight: "Отын-энергетика нысандарына арналған конструкциялар" },
        { category: "Сауда орталығы", highlight: "Сауда кешендеріне арналған витраждар мен қасбеттік шынылау" },
        { category: "Қонақүй бизнесі", highlight: "Люкс санатындағы қонақүйлерге арналған панорамалық шынылау және қалқалар" },
        { category: "Автокөлік саласы", highlight: "Автосалонға арналған архитектуралық шынылау" },
        { category: "Автокөлік саласы", highlight: "Шыны қасбеттер мен кіреберіс аймақтары" },
        { category: "Қонақүй бизнесі", highlight: "Қонақүй кешеніне арналған жеке конструкциялар" },
        { category: "Сауда орталығы", highlight: "Сауда нысанына арналған шынылау және металл конструкциялар" },
        { category: "Ритейл", highlight: "Бренд аймағына арналған шыны қалқалар мен витриналар" },
        { category: "Автокөлік саласы", highlight: "Қасбеттік және интерьерлік шыны жүйелері" },
        { category: "Автокөлік саласы", highlight: "Өкілдік салонға арналған премиум шынылау" },
      ],
    },
    partners: {
      label: "Серіктестер",
      title: "Серіктестеріміз",
      subtitle: "Өндірісте қолданылатын материалдарды өндірушілер мен жеткізушілер",
      ctaText: "Барлық серіктестер",
    },
    process: {
      label: "Процесс",
      title: "Өтінімнен дайын нысанды\nтапсырғанға дейін",
      accent: "— 3 қадам",
      items: [
        { title: "Өтінім және кеңес беру", text: "Тапсырманы, нысанды, материалдарды және мерзімді талқылаймыз" },
        { title: "Маманның шығуы, өлшеуі және есептеу", text: "Маманның тегін шығуы және өлшеуі. Жоба мен сметаны дайындаймыз" },
        { title: "Өндіріс және монтаж", text: "Дайындаймыз, жеткіземіз, орнатамыз және 10 жылға дейінгі кепілдікпен тапсырамыз", highlight: null },
      ],
    },
    contacts: {
      label: "Байланыс",
      title: "Өтінім қалдырыңыз — жобаңызды тегін есептеп береміз",
      formTitle: "Жобаны тегін есептеу",
      formSubtitle: "Жұмыс уақытында хабарласып, мәліметтерді нақтылаймыз",
      submitButton: "Өтінім қалдыру",
      whatsappButton: "WhatsApp арқылы жазу",
    },
  },
  footer: {
    location: "Алматы · Қазақстан",
    copyrightSuffix: "Барлық құқықтар қорғалған.",
  },
  pages: {
    projects: { title: "Жобалар", description: "ART OFFICE GROUP орындаған жобалар: Алматыдағы шынылау, қасбеттер және қалқалар.", label: "Портфолио", heading: "Барлық орындалған жобалар" },
    clients: { title: "Клиенттер", description: "Шынылау және монтаж жұмыстарын ART OFFICE GROUP-қа сеніп тапсырған компаниялар.", label: "Клиенттер", heading: "Бізге жетекші компаниялар сенеді" },
    partners: { title: "Серіктестер", description: "ART OFFICE GROUP жұмыс істейтін материал өндірушілер мен жеткізушілер.", label: "Серіктестер", heading: "Серіктестеріміз" },
  },
};

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

const inputBindings = new Map();

function getApp() {
  return document.getElementById("app");
}

async function api(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      data.error ||
      (res.status === 401 ? "Нужно войти в админку" : null) ||
      (res.status === 500 ? "Ошибка сервера. Проверьте PostgreSQL: npm run setup" : null) ||
      `Ошибка запроса (${res.status})`;
    throw new Error(message);
  }
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

function getByPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function setByPath(obj, path, value) {
  const keys = path.split(".");
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
}

function bindInput(input, onChange) {
  const apply = (value) => {
    state.dirty = true;
    onChange(value);
    updateDirtyHint();
  };

  input.addEventListener("input", (e) => apply(e.target.value));
  input.addEventListener("change", (e) => apply(e.target.value));
  inputBindings.set(input, onChange);
}

function syncFormToState() {
  document.querySelectorAll("[data-content-path]").forEach((el) => {
    setByPath(state.content, el.dataset.contentPath, el.value);
  });
  for (const [el, onChange] of inputBindings.entries()) {
    if (!document.body.contains(el)) {
      inputBindings.delete(el);
      continue;
    }
    onChange(el.value);
  }
}

function field(label, value, onChange, type = "text", hint = "", path = "") {
  const wrap = document.createElement("div");
  wrap.className = "field";
  wrap.innerHTML = `<label>${label}</label>`;
  const input = document.createElement(type === "textarea" ? "textarea" : "input");
  if (type !== "textarea") input.type = type;
  input.value = value ?? "";
  if (path) input.dataset.contentPath = path;
  bindInput(input, onChange);
  wrap.appendChild(input);
  if (hint) {
    const h = document.createElement("div");
    h.className = "hint";
    h.textContent = hint;
    wrap.appendChild(h);
  }
  return wrap;
}

function mediaField(label, value, onChange, path = "") {
  const wrap = document.createElement("div");
  wrap.className = "field";
  wrap.innerHTML = `<label>${label}</label>`;

  const row = document.createElement("div");
  row.className = "media-row";

  const input = document.createElement("input");
  input.value = value ?? "";
  input.placeholder = "/api/media/file.jpg или /assets/hero.mp4";
  if (path) input.dataset.contentPath = path;
  bindInput(input, (v) => {
    onChange(v);
    preview.src = v;
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
  uploadBtn.onclick = () => uploadFile(onChange, preview, input);

  row.append(preview, input, uploadBtn);
  wrap.appendChild(row);
  return wrap;
}

function updateDirtyHint() {
  let hint = document.getElementById("dirty-hint");
  if (!hint && state.dirty) {
    const main = document.querySelector(".main");
    if (!main) return;
    hint = document.createElement("div");
    hint.id = "dirty-hint";
    hint.className = "chip";
    hint.style.marginTop = "12px";
    hint.textContent = "Есть несохранённые изменения";
    main.appendChild(hint);
  }
  if (hint) {
    hint.style.display = state.dirty ? "inline-block" : "none";
  }
}

async function uploadFile(onChange, preview, textInput) {
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
      if (textInput) textInput.value = data.url;
      preview.src = data.url;
      updateDirtyHint();
      toast("Файл загружен — нажмите «Сохранить изменения»");
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
  const app = getApp();
  if (!app) return;
  app.innerHTML = `
    <div class="login-screen">
      <form class="login-card" id="login-form">
        <div class="login-logo">ART OFFICE GROUP</div>
        <h1 class="login-title">Админ-панель</h1>
        <p class="login-sub">Управление контентом сайта art-office.kz</p>
        <div class="panel-grid">
          <div class="field"><label>Email</label><input name="email" type="email" autocomplete="username" required placeholder="Введите email" /></div>
          <div class="field"><label>Пароль</label><input name="password" type="password" autocomplete="current-password" required placeholder="Введите пароль" /></div>
        </div>
        <button class="btn btn-primary" style="width:100%;margin-top:16px" type="submit">Войти</button>
        <p class="login-sub" style="margin-top:16px;margin-bottom:0;font-size:12px">Админка: <strong>/admin</strong> на том же сайте. После входа откройте «Инструкция».</p>
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
      state.content = normalizeContent(await api("/content"));
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
  if (state.saving) return;
  state.saving = true;
  render();

  try {
    syncFormToState();
    normalizeKz(state.content);
    state.content = await api("/content", { method: "PUT", body: JSON.stringify(state.content) });
    state.content = normalizeContent(state.content);
    state.dirty = false;
    updateDirtyHint();
    localStorage.setItem("site-content-version", String(state.content.version ?? Date.now()));
    try {
      new BroadcastChannel("site-content").postMessage({ version: state.content.version });
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event("site-content-saved"));
    toast(`Сохранено (версия ${state.content.version}). Изменения на сайте обновятся автоматически.`);
  } catch (e) {
    toast(e.message, true);
  } finally {
    state.saving = false;
    render();
  }
}

function renderHero() {
  const c = state.content.hero;
  const kz = state.content.kz.hero;
  const root = document.createElement("div");
  root.appendChild(panel("Главный экран (Hero)", [
    field("Бейдж", c.badge, (v) => (c.badge = v), "text", "Под Hero-заголовком на главной", "hero.badge"),
    field("Заголовок", c.title, (v) => (c.title = v), "text", "", "hero.title"),
    field("Акцент в заголовке", c.titleAccent, (v) => (c.titleAccent = v), "text", "", "hero.titleAccent"),
    field("Подзаголовок 1", c.subtitle1, (v) => (c.subtitle1 = v), "text", "", "hero.subtitle1"),
    field("Подзаголовок 2", c.subtitle2, (v) => (c.subtitle2 = v), "text", "", "hero.subtitle2"),
    field("Кнопка CTA", c.ctaPrimary, (v) => (c.ctaPrimary = v), "text", "", "hero.ctaPrimary"),
    field("Число лет", c.yearsCount, (v) => (c.yearsCount = v), "text", "", "hero.yearsCount"),
    field("Текст «лет»", c.yearsLabel, (v) => (c.yearsLabel = v), "text", "", "hero.yearsLabel"),
    field("Подсказка «Листайте»", c.scrollHint, (v) => (c.scrollHint = v), "text", "", "hero.scrollHint"),
    mediaField("Постер (фото)", c.poster, (v) => (c.poster = v), "hero.poster"),
    mediaField("Видео (MP4)", c.video, (v) => (c.video = v), "hero.video"),
  ]));
  root.appendChild(kzSection("Бас экран (Hero) — қазақша нұсқа", [
    kzField("Бейдж", kz.badge || "", (v) => (kz.badge = v)),
    kzField("Тақырып", kz.title || "", (v) => (kz.title = v)),
    kzField("Тақырып акценті", kz.titleAccent || "", (v) => (kz.titleAccent = v)),
    kzField("Тақырыпша 1", kz.subtitle1 || "", (v) => (kz.subtitle1 = v)),
    kzField("Тақырыпша 2", kz.subtitle2 || "", (v) => (kz.subtitle2 = v)),
    kzField("CTA батырмасы", kz.ctaPrimary || "", (v) => (kz.ctaPrimary = v)),
    kzField("«Жыл» мәтіні", kz.yearsLabel || "", (v) => (kz.yearsLabel = v)),
    kzField("«Айналдыру» мәтіні", kz.scrollHint || "", (v) => (kz.scrollHint = v)),
  ]));
  return root;
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

function ensureSectionItems(section) {
  if (!section) return [];
  if (!Array.isArray(section.items)) {
    section.items = section.items ? Object.values(section.items) : [];
  }
  return section.items;
}

function sectionCountChip(count) {
  return `<span class="chip" title="Количество элементов — ограничений нет">${count}</span>`;
}

function normalizeContent(content) {
  if (!content?.homeSections) return content;

  for (const key of ["services", "advantages", "portfolio", "clients", "partners", "process"]) {
    const section = content.homeSections[key];
    if (!section) continue;
    if (!Array.isArray(section.items)) {
      section.items = section.items ? Object.values(section.items) : [];
    }
  }

  if (!Array.isArray(content.homeSections.order)) {
    content.homeSections.order = content.homeSections.order
      ? Object.values(content.homeSections.order)
      : [];
  }

  normalizeKz(content);
  return content;
}

function fillDefaults(target, defaults) {
  if (!defaults) return;
  for (const key of Object.keys(defaults)) {
    if (target[key] === undefined || target[key] === null || target[key] === "") {
      target[key] = defaults[key];
    } else if (typeof defaults[key] === "object" && !Array.isArray(defaults[key]) && typeof target[key] === "object") {
      fillDefaults(target[key], defaults[key]);
    }
  }
}

function mergeItemArrays(baseItems, overrideItems) {
  const base = Array.isArray(baseItems) ? baseItems : [];
  const override = Array.isArray(overrideItems) ? overrideItems : [];
  const len = Math.max(base.length, override.length);
  const result = [];
  for (let i = 0; i < len; i++) {
    const baseItem = base[i];
    const overrideItem = override[i];
    if (overrideItem === undefined) {
      if (baseItem !== undefined) result.push({ ...baseItem });
      continue;
    }
    if (baseItem && typeof baseItem === "object" && overrideItem && typeof overrideItem === "object") {
      result.push({ ...baseItem, ...overrideItem });
    } else {
      result.push(overrideItem);
    }
  }
  return result;
}

function getKzItemForMain(kzItems, mainItem, index) {
  if (!Array.isArray(kzItems)) return {};
  if (mainItem?.id) {
    const found = kzItems.find((item) => item?.id === mainItem.id);
    if (found) return found;
  }
  const byIndex = kzItems[index];
  if (byIndex && mainItem?.id && !byIndex.id) byIndex.id = mainItem.id;
  return byIndex || {};
}

function normalizeKz(content) {
  if (!content.kz) content.kz = {};
  const kz = content.kz;

  // Pre-fill section-level fields from DEFAULT_KZ when missing
  fillDefaults(kz, { header: {}, hero: {}, homeSections: {}, footer: {}, pages: {} });
  fillDefaults(kz.header, DEFAULT_KZ.header);
  fillDefaults(kz.hero, DEFAULT_KZ.hero);
  fillDefaults(kz.footer, DEFAULT_KZ.footer);
  fillDefaults(kz.pages, DEFAULT_KZ.pages);
  if (!kz.contacts) kz.contacts = {};
  fillDefaults(kz.contacts, DEFAULT_KZ.contacts);

  if (!kz.homeSections) kz.homeSections = {};
  const kzHs = kz.homeSections;

  // Pre-fill section headers from defaults
  const simpleSections = ["portfolio", "clients", "partners", "contacts"];
  for (const key of simpleSections) {
    if (!kzHs[key]) kzHs[key] = {};
    if (DEFAULT_KZ.homeSections[key]) fillDefaults(kzHs[key], DEFAULT_KZ.homeSections[key]);
  }

  // Sections with items
  const withItems = ["services", "advantages", "process"];
  for (const key of withItems) {
    if (!kzHs[key]) kzHs[key] = {};
    const defSec = DEFAULT_KZ.homeSections[key];
    if (defSec) {
      fillDefaults(kzHs[key], { label: defSec.label, title: defSec.title, accent: defSec.accent, extraOption: defSec.extraOption });
    }
    if (!Array.isArray(kzHs[key].items)) kzHs[key].items = [];
    const mainItems = content.homeSections?.[key]?.items;
    const defItems = defSec?.items || [];
    if (Array.isArray(mainItems)) {
      kzHs[key].items = mergeItemArrays(defItems, kzHs[key].items);
      while (kzHs[key].items.length < mainItems.length) {
        const i = kzHs[key].items.length;
        kzHs[key].items.push(defItems[i] ? { ...defItems[i] } : {});
      }
      if (kzHs[key].items.length > mainItems.length) {
        kzHs[key].items.length = mainItems.length;
      }
    }
  }

  // Sync items for sections that don't have default item translations
  for (const key of ["portfolio", "clients", "partners"]) {
    if (!kzHs[key]) kzHs[key] = {};
    if (!Array.isArray(kzHs[key].items)) kzHs[key].items = [];
    const mainItems = content.homeSections?.[key]?.items;
    const defItems = DEFAULT_KZ.homeSections?.[key]?.items || [];
    if (Array.isArray(mainItems)) {
      const oldItems = kzHs[key].items;
      kzHs[key].items = mainItems.map((mainItem, index) => {
        const existing = getKzItemForMain(oldItems, mainItem, index);
        const fallback = defItems[index] ? { ...defItems[index] } : {};
        return { ...fallback, ...existing, ...(mainItem?.id ? { id: mainItem.id } : {}) };
      });
    }
  }

  if (!kzHs.contacts) kzHs.contacts = {};
  fillDefaults(kzHs.contacts, DEFAULT_KZ.homeSections.contacts);
}

function kzSection(title, fields) {
  const sec = document.createElement("section");
  sec.className = "panel";
  sec.style.borderTop = "2px solid #4a7fc1";
  sec.innerHTML = `<h2 class="panel-title" style="display:flex;align-items:center;gap:8px"><span style="font-size:18px">🇰🇿</span> ${title} <span class="chip" style="background:#1a3a5c;color:#7eb8f7;font-size:11px">Қазақша</span></h2>`;
  const grid = document.createElement("div");
  grid.className = "panel-grid panel-grid-2";
  for (const f of fields) grid.appendChild(f);
  sec.appendChild(grid);
  return sec;
}

function kzField(label, value, onChange, type = "text", hint = "") {
  return field(`🇰🇿 ${label}`, value, onChange, type, hint);
}

function addListItem(section, createItem, label = "Элемент") {
  ensureSectionItems(section);
  section.items.unshift(createItem());
  state.dirty = true;
  updateDirtyHint();
  render();
  requestAnimationFrame(() => {
    const card = document.querySelector(".item-list .item-card");
    card?.classList.add("item-card-new");
    card?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => card?.classList.remove("item-card-new"), 2200);
    toast(`${label} добавлен в начало списка`);
  });
}

function renderListSection(key, itemRenderer, createItem, itemLabel) {
  const section = state.content.homeSections[key];
  const root = document.createElement("div");

  if (!section) {
    root.innerHTML = `<div class="empty">Раздел «${key}» не найден в контенте</div>`;
    return root;
  }

  if (!Array.isArray(section.items)) {
    section.items = section.items ? Object.values(section.items) : [];
  }

  const itemCount = section.items.length;

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
  const listHead = document.createElement("div");
  listHead.className = "item-card-head";
  listHead.innerHTML = `<h2 class="panel-title" style="margin:0">Элементы ${sectionCountChip(itemCount)}</h2>`;

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "btn btn-secondary btn-sm";
  addBtn.textContent = "+ Добавить";
  addBtn.addEventListener("click", () => addListItem(section, createItem, itemLabel || "Элемент"));
  listHead.appendChild(addBtn);

  const list = document.createElement("div");
  list.className = "item-list";
  for (const [index, item] of section.items.entries()) {
    list.appendChild(itemRenderer(item, index, section.items));
  }

  listPanel.append(listHead, list);
  root.appendChild(listPanel);

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
  const section = state.content.homeSections.services;
  const kzSec = state.content.kz.homeSections.services;
  const root = document.createElement("div");

  if (!section) {
    root.innerHTML = `<div class="empty">Раздел «services» не найден в контенте</div>`;
    return root;
  }
  if (!Array.isArray(section.items)) section.items = section.items ? Object.values(section.items) : [];

  root.appendChild(panel("Заголовок секции", [
    field("Метка", section.label, (v) => (section.label = v)),
    field("Заголовок", section.title, (v) => (section.title = v)),
    field("Опция «Другое»", section.extraOption, (v) => (section.extraOption = v)),
  ]));

  root.appendChild(kzSection("Қызметтер бөлімінің тақырыбы — қазақша", [
    kzField("Бөлім белгісі", kzSec.label || "", (v) => (kzSec.label = v)),
    kzField("Тақырып", kzSec.title || "", (v) => (kzSec.title = v)),
    kzField("«Басқа» опциясы", kzSec.extraOption || "", (v) => (kzSec.extraOption = v)),
  ]));

  const listPanel = document.createElement("section");
  listPanel.className = "panel";
  const listHead = document.createElement("div");
  listHead.className = "item-card-head";
  listHead.innerHTML = `<h2 class="panel-title" style="margin:0">Элементы ${sectionCountChip(section.items.length)}</h2>`;

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "btn btn-secondary btn-sm";
  addBtn.textContent = "+ Добавить";
  addBtn.addEventListener("click", () => {
    addListItem(section, () => ({ id: uid("service"), title: "Новая услуга", description: "", icon: "partitions", image: "" }), "Услуга");
    normalizeKz(state.content);
  });
  listHead.appendChild(addBtn);

  const list = document.createElement("div");
  list.className = "item-list";
  for (const [index, item] of section.items.entries()) {
    const kzItem = kzSec.items[index] || (kzSec.items[index] = {});
    const grid = document.createElement("div");
    grid.className = "panel-grid panel-grid-2";
    grid.append(
      field("Название", item.title, (v) => (item.title = v)),
      field("Описание", item.description, (v) => (item.description = v), "textarea"),
      field("ID иконки", item.icon, (v) => (item.icon = v), "text", "partitions, doors, windows, facades, railings, glass, shower, design"),
      mediaField("Фото", item.image, (v) => (item.image = v)),
      kzField("Атауы", kzItem.title || "", (v) => (kzItem.title = v)),
      kzField("Сипаттама", kzItem.description || "", (v) => (kzItem.description = v), "textarea"),
    );
    list.appendChild(itemCard(item.title || `Услуга ${index + 1}`, grid, () => {
      section.items.splice(index, 1);
      kzSec.items.splice(index, 1);
      state.dirty = true;
      render();
    }, index > 0 ? () => swap(section.items, index, index - 1) : null, index < section.items.length - 1 ? () => swap(section.items, index, index + 1) : null));
  }

  listPanel.append(listHead, list);
  root.appendChild(listPanel);
  return root;
}

function renderAdvantages() {
  const section = state.content.homeSections.advantages;
  const kzSec = state.content.kz.homeSections.advantages;
  const root = document.createElement("div");

  if (!section) {
    root.innerHTML = `<div class="empty">Раздел «advantages» не найден в контенте</div>`;
    return root;
  }
  if (!Array.isArray(section.items)) section.items = section.items ? Object.values(section.items) : [];

  root.appendChild(panel("Заголовок секции", [
    field("Метка", section.label, (v) => (section.label = v)),
    field("Заголовок", section.title, (v) => (section.title = v)),
  ]));

  root.appendChild(kzSection("Артықшылықтар бөлімінің тақырыбы — қазақша", [
    kzField("Бөлім белгісі", kzSec.label || "", (v) => (kzSec.label = v)),
    kzField("Тақырып", kzSec.title || "", (v) => (kzSec.title = v)),
  ]));

  const listPanel = document.createElement("section");
  listPanel.className = "panel";
  const listHead = document.createElement("div");
  listHead.className = "item-card-head";
  listHead.innerHTML = `<h2 class="panel-title" style="margin:0">Элементы ${sectionCountChip(section.items.length)}</h2>`;

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "btn btn-secondary btn-sm";
  addBtn.textContent = "+ Добавить";
  addBtn.addEventListener("click", () => {
    addListItem(section, () => ({ id: uid("adv"), icon: "turnkey", title: "", shortTitle: "", lead: "", text: "", highlights: [] }), "Преимущество");
    normalizeKz(state.content);
  });
  listHead.appendChild(addBtn);

  const list = document.createElement("div");
  list.className = "item-list";
  for (const [index, item] of section.items.entries()) {
    const kzItem = kzSec.items[index] || (kzSec.items[index] = {});
    const grid = document.createElement("div");
    grid.className = "panel-grid panel-grid-2";
    grid.append(
      field("Заголовок", item.title, (v) => (item.title = v)),
      field("Короткое название", item.shortTitle, (v) => (item.shortTitle = v)),
      field("Lead", item.lead, (v) => (item.lead = v), "textarea"),
      field("Текст", item.text, (v) => (item.text = v), "textarea"),
      field("Пункты (через |)", item.highlights.join(" | "), (v) => (item.highlights = v.split("|").map((s) => s.trim()).filter(Boolean)), "textarea"),
      field("Иконка", item.icon, (v) => (item.icon = v), "text", "turnkey, design, license, measure"),
      kzField("Тақырып", kzItem.title || "", (v) => (kzItem.title = v)),
      kzField("Қысқа атауы", kzItem.shortTitle || "", (v) => (kzItem.shortTitle = v)),
      kzField("Кіріспе мәтін", kzItem.lead || "", (v) => (kzItem.lead = v), "textarea"),
      kzField("Мәтін", kzItem.text || "", (v) => (kzItem.text = v), "textarea"),
      kzField("Тармақтар (| арқылы)", Array.isArray(kzItem.highlights) ? kzItem.highlights.join(" | ") : "", (v) => (kzItem.highlights = v.split("|").map((s) => s.trim()).filter(Boolean)), "textarea"),
    );
    list.appendChild(itemCard(item.shortTitle || `Преимущество ${index + 1}`, grid, () => {
      section.items.splice(index, 1);
      kzSec.items.splice(index, 1);
      state.dirty = true;
      render();
    }));
  }

  listPanel.append(listHead, list);
  root.appendChild(listPanel);
  return root;
}

function renderPortfolio() {
  const section = state.content.homeSections.portfolio;
  const kzSec = state.content.kz.homeSections.portfolio;
  const items = ensureSectionItems(section);
  const root = document.createElement("div");
  root.appendChild(
    panel("Настройки портфолио", [
      field("Метка", section.label, (v) => (section.label = v)),
      field("Заголовок", section.title, (v) => (section.title = v)),
      field("Текст кнопки", section.ctaText, (v) => (section.ctaText = v)),
      field("Ссылка", section.ctaLink, (v) => (section.ctaLink = v)),
    ]),
  );
  root.appendChild(kzSection("Портфолио бөлімі — қазақша", [
    kzField("Бөлім белгісі", kzSec.label || "", (v) => (kzSec.label = v)),
    kzField("Тақырып", kzSec.title || "", (v) => (kzSec.title = v)),
    kzField("Батырма мәтіні", kzSec.ctaText || "", (v) => (kzSec.ctaText = v)),
    kzField("Галерея батырмасы", kzSec.galleryButton || "", (v) => (kzSec.galleryButton = v)),
    kzField("«Барлық нысандар»", kzSec.allProjectsLabel || "", (v) => (kzSec.allProjectsLabel = v)),
  ]));

  const listPanel = document.createElement("section");
  listPanel.className = "panel";
  const listHead = document.createElement("div");
  listHead.className = "item-card-head";
  listHead.innerHTML = `<h2 class="panel-title" style="margin:0">Проекты ${sectionCountChip(items.length)}</h2>`;

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "btn btn-secondary btn-sm";
  addBtn.textContent = "+ Добавить проект";
  addBtn.addEventListener("click", () => {
    addListItem(section, () => ({
      id: uid("project"),
      name: "Новый проект",
      type: "",
      cover: "",
      gallery: [],
      showOnHome: false,
    }), "Проект");
  });
  listHead.appendChild(addBtn);

  const list = document.createElement("div");
  list.className = "item-list";
  for (const [index, item] of items.entries()) {
    const kzItem = getKzItemForMain(kzSec.items, item, index);
    if (!kzSec.items[index]) kzSec.items[index] = kzItem;
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
      mediaField("Фото", item.cover, (v) => (item.cover = v)),
      kzField("Түрі", kzItem.type || "", (v) => (kzItem.type = v)),
      toggle,
    );
    list.appendChild(
      itemCard(item.name || `Проект ${index + 1}`, grid, () => {
        section.items.splice(index, 1);
        kzSec.items.splice(index, 1);
        state.dirty = true;
        render();
      }),
    );
  }

  listPanel.append(listHead, list);
  root.appendChild(listPanel);
  return root;
}

function renderLogoSection(key) {
  const section = state.content.homeSections[key];
  const kzSec = state.content.kz.homeSections[key];
  const root = document.createElement("div");

  if (!section) {
    root.innerHTML = `<div class="empty">Раздел «${key}» не найден в контенте</div>`;
    return root;
  }
  if (!Array.isArray(section.items)) section.items = section.items ? Object.values(section.items) : [];

  const isClients = key === "clients";
  const isPartners = key === "partners";

  const sectionHeaderFields = [
    field("Метка", section.label, (v) => (section.label = v)),
    field("Заголовок", section.title, (v) => (section.title = v)),
    ...(section.ctaText !== undefined ? [field("Текст кнопки", section.ctaText, (v) => (section.ctaText = v))] : []),
    ...(section.subtitle !== undefined ? [field("Подзаголовок", section.subtitle, (v) => (section.subtitle = v), "textarea")] : []),
  ];
  root.appendChild(panel("Заголовок секции", sectionHeaderFields));

  const kzHeaderFields = [
    kzField("Бөлім белгісі", kzSec.label || "", (v) => (kzSec.label = v)),
    kzField("Тақырып", kzSec.title || "", (v) => (kzSec.title = v)),
    ...(section.ctaText !== undefined ? [kzField("Батырма мәтіні", kzSec.ctaText || "", (v) => (kzSec.ctaText = v))] : []),
    ...(section.subtitle !== undefined ? [kzField("Тақырыпша", kzSec.subtitle || "", (v) => (kzSec.subtitle = v), "textarea")] : []),
  ];
  root.appendChild(kzSection(`${isClients ? "Клиенттер" : isPartners ? "Серіктестер" : key} бөлімі — қазақша`, kzHeaderFields));

  const listPanel = document.createElement("section");
  listPanel.className = "panel";
  const listHead = document.createElement("div");
  listHead.className = "item-card-head";
  listHead.innerHTML = `<h2 class="panel-title" style="margin:0">Элементы ${sectionCountChip(section.items.length)}</h2>`;

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "btn btn-secondary btn-sm";
  addBtn.textContent = "+ Добавить";
  addBtn.addEventListener("click", () => {
    const newItem = isClients
      ? { id: uid("client"), name: "", src: "", category: "", highlight: "" }
      : { id: uid("partner"), name: "", src: "" };
    addListItem(section, () => newItem, isClients ? "Клиент" : "Партнёр");
    normalizeKz(state.content);
  });
  listHead.appendChild(addBtn);

  const list = document.createElement("div");
  list.className = "item-list";
  for (const [index, item] of section.items.entries()) {
    const kzItem = isClients ? (kzSec.items[index] || (kzSec.items[index] = {})) : null;
    const grid = document.createElement("div");
    grid.className = "panel-grid panel-grid-2";
    grid.append(field("Название", item.name, (v) => (item.name = v)), mediaField("Логотип", item.src, (v) => (item.src = v)));
    if (item.category !== undefined) {
      grid.append(
        field("Категория", item.category, (v) => (item.category = v)),
        field("Описание", item.highlight, (v) => (item.highlight = v), "textarea"),
      );
      if (kzItem) {
        grid.append(
          kzField("Санат", kzItem.category || "", (v) => (kzItem.category = v)),
          kzField("Сипаттама", kzItem.highlight || "", (v) => (kzItem.highlight = v), "textarea"),
        );
      }
    }
    list.appendChild(itemCard(item.name || `Элемент ${index + 1}`, grid, () => {
      section.items.splice(index, 1);
      if (kzSec.items) kzSec.items.splice(index, 1);
      state.dirty = true;
      render();
    }));
  }

  listPanel.append(listHead, list);
  root.appendChild(listPanel);
  return root;
}

function renderProcess() {
  const section = state.content.homeSections.process;
  const kzSec = state.content.kz.homeSections.process;
  const root = document.createElement("div");

  if (!section) {
    root.innerHTML = `<div class="empty">Раздел «process» не найден в контенте</div>`;
    return root;
  }
  if (!Array.isArray(section.items)) section.items = section.items ? Object.values(section.items) : [];

  root.appendChild(panel("Заголовок секции", [
    field("Метка", section.label, (v) => (section.label = v)),
    field("Заголовок", section.title, (v) => (section.title = v)),
    field("Акцент", section.accent, (v) => (section.accent = v)),
  ]));

  root.appendChild(kzSection("Процесс бөлімінің тақырыбы — қазақша", [
    kzField("Бөлім белгісі", kzSec.label || "", (v) => (kzSec.label = v)),
    kzField("Тақырып", kzSec.title || "", (v) => (kzSec.title = v)),
    kzField("Акцент", kzSec.accent || "", (v) => (kzSec.accent = v)),
  ]));

  const listPanel = document.createElement("section");
  listPanel.className = "panel";
  const listHead = document.createElement("div");
  listHead.className = "item-card-head";
  listHead.innerHTML = `<h2 class="panel-title" style="margin:0">Элементы ${sectionCountChip(section.items.length)}</h2>`;

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "btn btn-secondary btn-sm";
  addBtn.textContent = "+ Добавить";
  addBtn.addEventListener("click", () => {
    addListItem(section, () => ({ id: uid("step"), num: "00", title: "", text: "", highlight: "" }), "Шаг");
    normalizeKz(state.content);
  });
  listHead.appendChild(addBtn);

  const list = document.createElement("div");
  list.className = "item-list";
  for (const [index, item] of section.items.entries()) {
    const kzItem = kzSec.items[index] || (kzSec.items[index] = {});
    const grid = document.createElement("div");
    grid.className = "panel-grid panel-grid-2";
    grid.append(
      field("Номер", item.num, (v) => (item.num = v)),
      field("Заголовок", item.title, (v) => (item.title = v)),
      field("Текст", item.text, (v) => (item.text = v), "textarea"),
      field("Выделение (необязательно)", item.highlight || "", (v) => (item.highlight = v)),
      kzField("Тақырып", kzItem.title || "", (v) => (kzItem.title = v)),
      kzField("Мәтін", kzItem.text || "", (v) => (kzItem.text = v), "textarea"),
      kzField("Бөлектеу (міндетті емес)", kzItem.highlight || "", (v) => (kzItem.highlight = v)),
    );
    list.appendChild(itemCard(`${item.num}. ${item.title}`, grid, () => {
      section.items.splice(index, 1);
      kzSec.items.splice(index, 1);
      state.dirty = true;
      render();
    }));
  }

  listPanel.append(listHead, list);
  root.appendChild(listPanel);
  return root;
}

function renderContacts() {
  const c = state.content.contacts;
  const kzC = state.content.kz.contacts;
  const s = state.content.homeSections.contacts;
  const kzS = state.content.kz.homeSections.contacts;
  const root = document.createElement("div");
  root.appendChild(
    panel("Форма на главной", [
      field("Метка", s.label, (v) => (s.label = v)),
      field("Заголовок", s.title, (v) => (s.title = v)),
      field("Подзаголовок", s.formSubtitle, (v) => (s.formSubtitle = v), "textarea"),
      field("Кнопка отправки", s.submitButton, (v) => (s.submitButton = v)),
      field("Кнопка WhatsApp", s.whatsappButton, (v) => (s.whatsappButton = v)),
    ]),
  );
  root.appendChild(kzSection("Байланыс формасы — қазақша", [
    kzField("Бөлім белгісі", kzS.label || "", (v) => (kzS.label = v)),
    kzField("Тақырып", kzS.title || "", (v) => (kzS.title = v)),
    kzField("Форма тақырыбы", kzS.formTitle || "", (v) => (kzS.formTitle = v)),
    kzField("Тақырыпша", kzS.formSubtitle || "", (v) => (kzS.formSubtitle = v), "textarea"),
    kzField("Жіберу батырмасы", kzS.submitButton || "", (v) => (kzS.submitButton = v)),
    kzField("WhatsApp батырмасы", kzS.whatsappButton || "", (v) => (kzS.whatsappButton = v)),
  ]));
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
  root.appendChild(kzSection("Байланыс деректері — қазақша", [
    kzField("Компания", kzC.company || "", (v) => (kzC.company = v)),
    kzField("Мекенжай", kzC.address || "", (v) => (kzC.address = v), "textarea"),
    kzField("Мекенжай қосымшасы", kzC.addressMeta || "", (v) => (kzC.addressMeta = v)),
    kzField("WhatsApp хабарламасы", kzC.whatsappMessage || "", (v) => (kzC.whatsappMessage = v), "textarea"),
    kzField("Жұмыс уақыты", kzC.hours || "", (v) => (kzC.hours = v)),
  ]));
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
        <li><strong>Весь контент</strong> хранится в PostgreSQL (таблица <code>site_content</code>).</li>
        <li><strong>Сайт</strong> при открытии читает данные из базы и показывает актуальные тексты, фото и видео.</li>
        <li><strong>Админ-панель</strong> редактирует контент через удобные формы — без программирования.</li>
        <li>После сохранения изменения появляются на сайте автоматически. Если вкладка сайта была открыта давно — обновите её (F5).</li>
      </ol>
      <div class="guide-callout">
        Загруженные файлы сохраняются в PostgreSQL. При сохранении контента неиспользуемые медиа удаляются автоматически — старые фото не копятся.
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
          <p>Все проекты. Ограничений по количеству нет. Одно фото на проект — клик по фото на сайте увеличивает его. Галочка «Показывать на главной» — только отмеченные попадают в слайдер.</p>
        </article>
        <article class="guide-card">
          <h3>Клиенты и партнёры</h3>
          <p>Логотипы компаний. Ограничений по количеству нет. Кнопка «+ Добавить» — новая карточка в начале списка, «Загрузить файл» — логотип с компьютера.</p>
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
        <li>URL подставится автоматически — нажмите <strong>«Сохранить изменения»</strong>. Старый файл удалится из базы, если на него больше нет ссылок.</li>
      </ol>
      <p class="guide-note">Ограничений по размеру и длительности нет — можно загружать фото и видео любого объёма. Для Hero-видео рекомендуется MP4 (H.264).</p>
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
    header: () => {
      const root = document.createElement("div");
      const kzH = state.content.kz.header;
      root.appendChild(panel("Навигация", [
        field("Кнопка в шапке", state.content.header.ctaButton, (v) => (state.content.header.ctaButton = v)),
        field("Пункты меню (JSON)", JSON.stringify(state.content.header.navLinks, null, 2), (v) => {
          try { state.content.header.navLinks = JSON.parse(v); } catch { toast("Некорректный JSON меню", true); }
        }, "textarea", "Формат: [{\"href\":\"#services\",\"label\":\"Услуги\"}]"),
      ]));
      root.appendChild(kzSection("Шапка — қазақша нұсқа", [
        kzField("Батырма мәтіні", kzH.ctaButton || "", (v) => (kzH.ctaButton = v)),
        kzField("Мәзір элементтері (JSON)", JSON.stringify(kzH.navLinks?.length ? kzH.navLinks : state.content.header.navLinks, null, 2), (v) => {
          try { kzH.navLinks = JSON.parse(v); } catch { toast("Некорректный JSON меню KZ", true); }
        }, "textarea", "Формат: [{\"href\":\"#services\",\"label\":\"Қызметтер\"}]"),
      ]));
      return root;
    },
    services: renderServices,
    advantages: renderAdvantages,
    portfolio: renderPortfolio,
    clients: () => renderLogoSection("clients"),
    partners: () => renderLogoSection("partners"),
    process: renderProcess,
    contacts: renderContacts,
    footer: () => {
      const root = document.createElement("div");
      const kzF = state.content.kz.footer;
      root.appendChild(panel("Подвал", [
        field("Год", String(state.content.footer.year), (v) => (state.content.footer.year = Number(v))),
        field("Локация", state.content.footer.location, (v) => (state.content.footer.location = v)),
        field("Copyright", state.content.footer.copyrightSuffix, (v) => (state.content.footer.copyrightSuffix = v)),
      ]));
      root.appendChild(kzSection("Подвал — қазақша нұсқа", [
        kzField("Орналасқан жер", kzF.location || "", (v) => (kzF.location = v)),
        kzField("Copyright мәтіні", kzF.copyrightSuffix || "", (v) => (kzF.copyrightSuffix = v)),
      ]));
      return root;
    },
    pages: () => {
      const root = document.createElement("div");
      root.appendChild(panel("Внутренние страницы (JSON) — RU", [
        field("pages", JSON.stringify(state.content.pages, null, 2), (v) => {
          try { state.content.pages = JSON.parse(v); } catch { toast("Некорректный JSON", true); }
        }, "textarea"),
      ]));
      root.appendChild(kzSection("Ішкі беттер (JSON) — KZ", [
        kzField("kz.pages", JSON.stringify(state.content.kz.pages || {}, null, 2), (v) => {
          try { state.content.kz.pages = JSON.parse(v); } catch { toast("Некорректный JSON KZ", true); }
        }, "textarea"),
      ]));
      return root;
    },
    blocks: renderBlocks,
    settings: renderSettings,
    guide: renderGuide,
  };

  const view = views[state.view]?.();
  if (view) main.appendChild(view);
  else main.innerHTML += `<div class="empty">Раздел в разработке</div>`;

  if (state.dirty) {
    updateDirtyHint();
  }

  return main;
}

function renderDashboard() {
  const app = getApp();
  if (!app) return;
  app.innerHTML = "";
  const layout = document.createElement("div");
  layout.className = "layout";
  layout.append(renderSidebar(), renderContent());
  app.appendChild(layout);
}

async function boot() {
  try {
    const res = await fetch(`${API}/auth/me`, { credentials: "include" });
    const me = await res.json();
    if (!me.authenticated) {
      renderLogin();
      return;
    }
    state.user = me;
    state.content = normalizeContent(await api("/content"));
    renderDashboard();
  } catch {
    renderLogin();
    toast("Не удалось подключиться к серверу. Запустите: npm run setup", true);
  }
}

function render() {
  if (!state.user) renderLogin();
  else renderDashboard();
}

boot();
