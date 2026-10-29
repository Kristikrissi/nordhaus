const big = [
  "/images/opfevx4o6401n1ma5oh25je9z8psrfiy.jpg",
  "/images/j99gqs8omyn4wrsw5ksis2o7zu18rr6v.jpg",
  "/images/u4kxrbtoy4cv4tlu3mzyho9w7bgaiblt.jpg",
  "/images/j01h4fq8o9r17lrdb7yx1evpgolwxz5u.jpg",
  "/images/fcm5saszguzbsr4vayfxbahxzcd70jk1.jpg",
  "/images/yo6tn60n37larhf5k81gh10qwsoes2i9.jpg",
  "/images/1ftvl98shmd3e3p553m0nlfpy9e8te5c.jpg",
  "/images/ombwg2yvwpj7dko2drpmdn62affqkok7.jpg",
  "/images/7uxab3r6q2ttasxttu6edroetaigcm1k.jpg",
  "/images/tphkpk410syoczefqvjwdletmzxajdnx.jpg",
  "/images/p205t8z71drcy6suf6oizgz7c813ri9n.jpg",
  "/images/2b9yvefvnn0o2ziumzr6p7jqm251u685.jpg",
  "/images/400ycf8t9deuo2cjwi3nzstgpvksgri0.jpg",
  "/images/bq1hz53oadbltktmh1tusjxyvgxeotrq.jpg",
  "/images/rpfgjiuqhgmy03i8ecz1vtrmu7zlsj0s.jpg",
  "/images/nyqj8toe5jh2ri0vg15w2ks7ey5vnypa.jpg",
  "/images/hib7d1txsfu7g4gebck5eeu7gzp8t2oc.jpg",
  "/images/tnchydjkdpew480znv0hcha6lkiyfpco.jpg",
  "/images/jico17u9pr32vh39mujc5j38e1mdv1jv.jpg",
  "/images/19mialw2nazpf1rm8cy3svklqj61rnih.jpg",
  "/images/zobxacytugk024kyadyvcfn6jh9mi3pq.jpg",
  "/images/hsr0yze9rpnijh0zpokz0j8pai4fw9e7.jpg",
  "/images/u16nzt8ri2mxwbytjwvgn85y6y7j63vl.jpg",
  "/images/03s4ekd3k4152q39nljnb9pm5bp2gs9c.jpg",
  "/images/ff3y7zjgcb14nspbh4a79q07c9yzewn5.jpg",
];

const gallery = [
  "/images/l10lhrhx7rofclizusr7tzthfal8llss.jpg",
  "/images/ntebky3zo0w0sbr17lo3tafvg7zisv1x.jpg",
  "/images/e9oev89s9qu9u37ufe1mmzqc3pe0elxn.jpg",
  "/images/qt4lmz65qewy8zlfo66nire6bkn98s09.jpg",
  "/images/pby7kb3r44abn1cvppwy4pxhtirnln9j.jpg",
  "/images/70g67mq2quk2rbk4kbsxvnkekqrsyjys.jpg",
  "/images/c9ekv0jgimgttqacfv5qxlfxvu71blzp.jpg",
  "/images/3mrbnuwcnnpe55epjunuzdp9qcd12af3.jpg",
  "/images/l76mwxs6h9w6kmqr79v4baeotgvda46u.jpg",
  "/images/79e3mzft7hyheqe5golqkg8uqczzvk8p.jpg",
  "/images/77c8erzldvphd1sbfb2i09uamj3ag5l3.jpg",
  "/images/0k4z4xsitwn6nftshqnr8b13ma49mzua.jpg",
  "/images/o07cf77yocsmyrisj2g0w7e1dky3jr7h.jpg",
  "/images/hasr0dviylbsq0cbvueqknhsieyoklmz.jpg",
  "/images/dk4v45yp16md8qt7dah3hgp86p432b32.jpg",
  "/images/4vq9txo3dl39ttzrd08i2rz3mrrhdivx.jpg",
  "/images/m6qg4aggina17fsbrfp610bwn9hx1g8e.jpg",
  "/images/oe0q9mnk82d7s68f87jiaw71mnm0kmyk.jpg",
];

export const heroImage = big[0]!;

export const site = {
  name: "NORDHAUS",
  url: "https://nordhaus-swart.vercel.app",
  phone: "+7 (950) 246-54-77",
  phoneHref: "tel:+79502465477",
  email: "n99511285@gmail.com",
  logoDark: "/images/__images/logo_nordhaus.svg",
};

export type Category = {
  slug: string;
  title: string;
  images: string[];
};

export type Project = {
  slug: string;
  name: string;
  code?: string;
  /** Габариты сруба по проекту, например «8 × 11 м». */
  size: string;
  /** Площадь застройки в м² (произведение габаритов). */
  area: number;
  floors?: number;
  material?: string;
  status?: "Построен" | "Строится";
  categories: string[];
  images: string[];
  /** Индивидуальное описание проекта. Если не задано — генерируется из габаритов. */
  description?: string[];
  /** Комплектность проекта по данным проекта строительства. */
  specs?: string[];
};

const pImages = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/images/projects/${slug}/${i + 1}.jpg`);

const brusSpecs = [
  "Внешние стены из бруса 150 × 150 мм",
  "Высота потолков 1 этажа — 2,7 м, 2 этажа — 2,5 м",
  "Сборка стен сруба на деревянные нагеля (шканты)",
  "Рубка угловых соединений в «ласточкин хвост» (тёплый угол)",
  "Внутренние стены по проекту из бруса 100 × 150 мм",
  "Половые и потолочные балки из бруса 100 × 150 мм",
  "Черновой пол из доски 25 × 100 мм",
  "Фронтоны крыши из бруса 150 × 150 мм",
  "Стропильная система (стропила, стойки) — брус 50 × 150 мм",
  "Обрешётка крыши из доски 25 × 150 или 25 × 100 мм",
  "Временное покрытие крыши рубероидом",
  "Обработка антисептиком первого венца и половых балок",
  "Гидроизоляция фундамента, межвенцовый лён/джут, усадочные домкраты",
  "Доставка по Московской области и разгрузка на участке",
];

const banyaSpecs = [
  "Гидроизоляция фундамента рубероидом",
  "Обработка закладного венца и половых балок антисептиком",
  "Наружные и внутренние стены из бревна согласно проекту",
  "Рубленые фронтоны из бревна высотой 2,0 м",
  "Высота потолков 2,2 м в чистоте после усадки",
  "Сборка сруба на деревянные нагеля по технологии",
  "Межвенцовый утеплитель — красный натуральный мох",
  "Лаги пола и потолочные балки из лафета 150 мм с шагом 0,6 м",
  "Компенсационные домкраты под террасу и крыльцо",
  "Доставка и разгрузка сруба бани с комплектующими",
  "Монтаж сруба опытной бригадой плотников",
  "Технадзор за качеством материала и работ",
];

export const projects: Project[] = [
  {
    slug: "proekt-6-na-6",
    name: "Ельник",
    code: "б-1",
    size: "6 × 6 м",
    area: 36,
    floors: 2,
    material: "Брус 150 × 150 мм",
    categories: ["doma-iz-brusa"],
    images: pImages("proekt-6-na-6", 5),
    specs: brusSpecs,
  },
  {
    slug: "dachnyj-domik-6-na-6",
    name: "Дачный берег",
    code: "б-2",
    size: "6 × 6 м",
    area: 36,
    floors: 2,
    material: "Брус 150 × 150 мм",
    categories: ["doma-iz-brusa"],
    images: pImages("dachnyj-domik-6-na-6", 4),
    description: [
      "Проект «Дачный берег» — двухэтажный дом из бруса. Габариты сруба по проекту — 6 × 6 м, площадь застройки — 36 м², этажность — 2 этажа. Материал наружных стен — брус 150 × 150 мм.",
      "Компания NORDHAUS занимается строительством домов и бань из бруса и бревна по типовым и индивидуальным проектам. Сборка выполняется в соответствии с проектной документацией с учётом особенностей усадки деревянного сруба.",
      "NORDHAUS реализует проекты деревянных домов и бань с учётом пожеланий заказчика. Возможны согласование комплектации, выбор дополнительных опций и организация доставки к месту строительства.",
      "Стоимость, сроки строительства и условия доставки рассчитываются индивидуально.",
    ],
    specs: [
      "Наружные стены из бруса 150 × 150 мм",
      "Высота потолков первого этажа — 2,7 м, второго этажа — 2,5 м",
      "Сборка стен сруба на деревянные нагели (шканты)",
      "Рубка угловых соединений «ласточкин хвост» («тёплый угол»)",
      "Внутренние стены по проекту из бруса 100 × 150 мм",
      "Половые и потолочные балки из бруса 100 × 150 мм",
      "Черновой пол из доски 25 × 100 мм",
      "Фронтоны крыши из бруса 150 × 150 мм",
      "Стропильная система (стропила и стойки) из бруса 50 × 150 мм",
      "Обрешётка крыши из доски 25 × 150 или 25 × 100 мм",
      "Обработка антисептиком первого венца и половых балок",
      "Гидроизоляция фундамента",
      "Межвенцовый утеплитель — лён или джут",
      "Усадочные домкраты",
      "Доставка и разгрузка материалов на участке по согласованию",
    ],
  },
  {
    slug: "proekt-doma-iz-brusa-6h8",
    name: "Клён",
    code: "б-3",
    size: "6 × 8 м",
    area: 48,
    material: "Брус 150 × 150 мм",
    categories: ["doma-iz-brusa"],
    images: pImages("proekt-doma-iz-brusa-6h8", 5),
    description: [
      "Проект «Клён» — деревянный дом с габаритами сруба 6 × 8 м и площадью застройки 48 м². Для возведения стен используется брус сечением 150 × 150 мм.",
      "Сборка выполняется по проекту с учётом особенностей деревянной конструкции и естественной усадки сруба.",
      "NORDHAUS специализируется на строительстве домов и бань из бруса и бревна, реализуя решения как по готовым проектам, так и с учётом индивидуальных пожеланий заказчика.",
    ],
  },
  {
    slug: "proekt-dachnogo-doma-iz-brusa-6-h-8",
    name: "Лиственница",
    code: "б-4",
    size: "6 × 8 м",
    area: 48,
    material: "Брус 150 × 150 мм",
    categories: ["doma-iz-brusa"],
    images: pImages("proekt-dachnogo-doma-iz-brusa-6-h-8", 5),
  },
  {
    slug: "proekt-doma-iz-brusa-s-otkrytoj-terrasoj-6h6",
    name: "Теремок",
    code: "б-5",
    size: "6 × 6 м",
    area: 36,
    material: "Брус 150 × 150 мм",
    categories: ["doma-iz-brusa"],
    images: pImages("proekt-doma-iz-brusa-s-otkrytoj-terrasoj-6h6", 5),
  },
  {
    slug: "proekt-doma-iz-brusa-dlya-dachi-6h6",
    name: "Ясень",
    code: "б-6",
    size: "6 × 6 м",
    area: 36,
    material: "Брус 150 × 150 мм",
    categories: ["doma-iz-brusa"],
    images: pImages("proekt-doma-iz-brusa-dlya-dachi-6h6", 6),
  },
  {
    slug: "proekt-doma-iz-brusa-6-h-6-m",
    name: "Осина",
    code: "б-7",
    size: "6 × 6 м",
    area: 36,
    material: "Брус 150 × 150 мм",
    categories: ["doma-iz-brusa"],
    images: pImages("proekt-doma-iz-brusa-6-h-6-m", 6),
  },
  {
    slug: "proekt-doma-iz-brusa-8-h-11-5-m",
    name: "Простор",
    code: "б-8",
    size: "8 × 11,5 м",
    area: 92,
    material: "Брус 150 × 150 мм",
    categories: ["doma-iz-brusa"],
    images: pImages("proekt-doma-iz-brusa-8-h-11-5-m", 6),
  },
  {
    slug: "proekt-doma-iz-profilirovannogo-brusa-6-h-6-m",
    name: "Пихтовый",
    code: "б-9",
    size: "6 × 6 м",
    area: 36,
    material: "Профилированный брус 140 × 140 мм",
    categories: ["doma-iz-brusa"],
    images: pImages("proekt-doma-iz-profilirovannogo-brusa-6-h-6-m", 6),
  },
  {
    slug: "proekt-doma-iz-brusa-8-h-8-m",
    name: "Вековой бор",
    code: "б-10",
    size: "8 × 8 м",
    area: 64,
    material: "Брус 150 × 150 мм",
    categories: ["doma-iz-brusa"],
    images: pImages("proekt-doma-iz-brusa-8-h-8-m", 5),
  },
  {
    slug: "dom-iz-profilirovannogo-brusa-9-h-11",
    name: "Кедровая усадьба",
    code: "б-12",
    size: "9 × 11 м",
    area: 99,
    material: "Профилированный брус 140 × 140 мм",
    categories: ["doma-iz-brusa"],
    images: pImages("dom-iz-profilirovannogo-brusa-9-h-11", 6),
  },
  {
    slug: "dom-iz-profilirovannogo-brusa-8-h-8",
    name: "Тайговый",
    code: "б-13",
    size: "8 × 8 м",
    area: 64,
    material: "Профилированный брус 140 × 140 мм",
    categories: ["doma-iz-brusa"],
    images: pImages("dom-iz-profilirovannogo-brusa-8-h-8", 5),
  },
  {
    slug: "dom-iz-brevna-8-93",
    name: "Журавушка",
    code: "ДО-1",
    size: "8 × 9,3 м",
    area: 74,
    material: "Бревно",
    categories: ["doma-iz-brevna"],
    images: pImages("dom-iz-brevna-8-93", 7),
  },
  {
    slug: "proyekt-doma-iz-brevna-7-5x9",
    name: "Светлица",
    code: "ДО-2",
    size: "7,5 × 9 м",
    area: 68,
    material: "Бревно",
    categories: ["doma-iz-brevna"],
    images: pImages("proyekt-doma-iz-brevna-7-5x9", 7),
  },
  {
    slug: "proyekt-doma-iz-brevna-7x9-5",
    name: "Заря",
    code: "ДО-3",
    size: "7 × 9,5 м",
    area: 67,
    material: "Бревно",
    categories: ["doma-iz-brevna"],
    images: pImages("proyekt-doma-iz-brevna-7x9-5", 7),
  },
  {
    slug: "proyekt-doma-iz-brevna-8x11",
    name: "Богатырь",
    code: "ДО-4",
    size: "8 × 11 м",
    area: 88,
    material: "Бревно",
    categories: ["doma-iz-brevna"],
    images: pImages("proyekt-doma-iz-brevna-8x11", 7),
  },
  {
    slug: "proyekt-doma-iz-brevna-9x10",
    name: "Купеческий",
    code: "ДО-5",
    size: "9 × 10 м",
    area: 90,
    material: "Бревно",
    categories: ["doma-iz-brevna"],
    images: pImages("proyekt-doma-iz-brevna-9x10", 7),
  },
  {
    slug: "proyekt-doma-iz-brevna-8x10-5",
    name: "Дубравушка",
    code: "ДО-6",
    size: "8 × 10,5 м",
    area: 84,
    material: "Бревно",
    categories: ["doma-iz-brevna"],
    images: pImages("proyekt-doma-iz-brevna-8x10-5", 7),
  },
  {
    slug: "proyekt-doma-iz-brevna-13x12",
    name: "Боярыня",
    code: "ДО-7",
    size: "13 × 12 м",
    area: 156,
    material: "Бревно",
    categories: ["doma-iz-brevna"],
    images: pImages("proyekt-doma-iz-brevna-13x12", 6),
  },
  {
    slug: "proyekt-doma-iz-brevna-12-6x9",
    name: "Злато",
    code: "ДО-8",
    size: "12,6 × 9 м",
    area: 113,
    material: "Бревно",
    categories: ["doma-iz-brevna"],
    images: pImages("proyekt-doma-iz-brevna-12-6x9", 7),
  },
  {
    slug: "proyekt-doma-iz-brevna-11x9-7",
    name: "Витязь",
    code: "ДО-9",
    size: "11 × 9,7 м",
    area: 107,
    material: "Бревно",
    categories: ["doma-iz-brevna"],
    images: pImages("proyekt-doma-iz-brevna-11x9-7", 7),
  },
  {
    slug: "proyekt-doma-iz-brevna-7-3x7",
    name: "Уютный",
    code: "ДО-10",
    size: "7,3 × 7 м",
    area: 51,
    material: "Бревно",
    categories: ["doma-iz-brevna"],
    images: pImages("proyekt-doma-iz-brevna-7-3x7", 7),
  },
  {
    slug: "proyekt-bani-4-6x5-5",
    name: "Легкопарная",
    code: "БР-1",
    size: "4,6 × 5,5 м",
    area: 25,
    material: "Бревно ручной рубки",
    categories: ["bani-iz-brevna"],
    images: pImages("proyekt-bani", 5),
    specs: banyaSpecs,
  },
  {
    slug: "proyekt-bani-5-5x6-5",
    name: "Сосновая",
    code: "БР-2",
    size: "5,5 × 6,5 м",
    area: 36,
    material: "Бревно ручной рубки",
    categories: ["bani-iz-brevna"],
    images: pImages("proyekt-bani-5-5x6-5", 4),
    specs: banyaSpecs,
  },
  {
    slug: "proyekt-bani-5-4x5-4",
    name: "Корабелка",
    code: "БР-3",
    size: "5,4 × 5,4 м",
    area: 29,
    material: "Бревно ручной рубки",
    categories: ["bani-iz-brevna"],
    images: pImages("proyekt-bani-5-4x5-4", 4),
    specs: banyaSpecs,
  },
  {
    slug: "proyekt-bani-5-4x6-3",
    name: "Паровка",
    code: "БР-4",
    size: "5,4 × 6,3 м",
    area: 34,
    material: "Бревно ручной рубки",
    categories: ["bani-iz-brevna"],
    images: pImages("proyekt-bani-5-4x6-3", 4),
    specs: banyaSpecs,
  },
  {
    slug: "proyekt-bani-5-6x8-1",
    name: "Заветная",
    code: "БР-5",
    size: "5,6 × 8,1 м",
    area: 45,
    material: "Бревно ручной рубки",
    categories: ["bani-iz-brevna"],
    images: pImages("proyekt-bani-5-6x8-1", 3),
    specs: banyaSpecs,
  },
  {
    slug: "proyekt-bani-6-2x8",
    name: "Теплушка",
    code: "БР-6",
    size: "6,2 × 8 м",
    area: 50,
    material: "Бревно ручной рубки",
    categories: ["bani-iz-brevna"],
    images: pImages("proyekt-bani-6-2x8", 4),
    specs: banyaSpecs,
  },
  {
    slug: "proyekt-bani-5-4x7-7",
    name: "Купавка",
    code: "БР-7",
    size: "5,4 × 7,7 м",
    area: 42,
    material: "Бревно ручной рубки",
    categories: ["bani-iz-brevna"],
    images: pImages("proyekt-bani-5-4x7-7", 4),
    specs: banyaSpecs,
  },
  {
    slug: "proyekt-bani-5-4x7-4",
    name: "Медвежий угол",
    code: "БР-8",
    size: "5,4 × 7,4 м",
    area: 40,
    material: "Бревно ручной рубки",
    categories: ["bani-iz-brevna"],
    images: pImages("proyekt-bani-5-4x7-4", 4),
    specs: banyaSpecs,
  },
];

export const categories: Category[] = [
  { slug: "doma-iz-brusa", title: "Дома из бруса", images: [] },
  { slug: "doma-iz-brevna", title: "Дома из бревна", images: [] },
  { slug: "bani-iz-brusa", title: "Бани из бруса", images: [] },
  { slug: "bani-iz-brevna", title: "Бани из бревна", images: [] },
];

// Обложки категорий собираются из проектов, чтобы витрина на главной
// всегда показывала актуальный каталог.
for (const c of categories) {
  c.images = projects.filter((p) => p.categories.includes(c.slug)).flatMap((p) => p.images.slice(0, 1)).slice(0, 5);
}

export const logos = [
  "/images/logo/group635.96697fa7.png",
  "/images/logo/segezha2.40615e91.png",
  "/images/logo/fodd.17fb7fb9.png",
  "/images/logo/r4s.14d5e831.png",
  "/images/logo/sber.35d3bbe2.png",
  "/images/logo/crocusgroup.679b0d21.png",
  "/images/logo/finex.c5899743.png",
  "/images/logo/cosmos.71f7ddc0.png",
  "/images/logo/porsche.2168eb4d.png",
  "/images/logo/rixos.2d0a273c.png",
  "/images/logo/togas.e146ae4b.png",
  "/images/logo/vtb.f27bdfe5.png",
  "/images/logo/sistemagroup.8f7ef856.png",
];

export const homeGallery = gallery;

export const companyValues = [
  {
    image: "/images/company-1.jpg",
    title: "Дом, который подходит именно вам",
    text: [
      "У каждого своё представление об идеальном доме. Мы помогаем воплотить его в архитектуре и планировке, учитывая образ жизни, привычки и пожелания будущих владельцев.",
      "Вместе определяем, каким должен быть ваш дом: от общей концепции и расположения комнат до особенностей фасада и организации пространства. Наша задача — найти решения, которые будут не только эстетичными, но и удобными именно для вас.",
      "В итоге рождается проект со своим характером, в котором архитектура отвечает вашим представлениям о загородной жизни.",
    ],
  },
  {
    image: "/images/company-2.jpg",
    title: "Качество, которое начинается с деталей",
    text: [
      "Надёжность дома складывается из качества материалов, точности исполнения и соблюдения технологии строительства. Поэтому мы внимательно подходим к выбору древесины, проверяем соответствие материалов требованиям проекта и следим за качеством работ.",
      "Для нас важно, чтобы каждый этап выполнялся с должной тщательностью, а результат соответствовал согласованным решениям. Мы не рассматриваем качество как отдельную характеристику — это принцип, которым руководствуемся на протяжении всего строительства.",
    ],
  },
  {
    image: "/images/company-3.jpg",
    title: "Строительство с вниманием к вам",
    text: [
      "Строительство дома не должно превращаться в череду нерешённых вопросов и постоянных звонков. Мы организуем взаимодействие так, чтобы вы понимали, как продвигается проект, и всегда знали, к кому обратиться.",
      "Персональный менеджер координирует коммуникацию, информирует о ходе работ, предоставляет фото- и видеоматериалы и помогает оперативно решать возникающие вопросы.",
      "Вы остаётесь в курсе происходящего, не погружаясь в каждую организационную мелочь. Мы ценим ваше время и стараемся сделать сотрудничество удобным от начала до завершения проекта.",
    ],
  },
  {
    image: "/images/company-4.jpg",
    title: "Открытые договорённости и честный подход",
    text: [
      "Хорошее сотрудничество строится на доверии, а доверие — на открытом диалоге. Поэтому мы заранее обсуждаем условия работы, состав проекта, сроки и стоимость, уделяя внимание всем существенным деталям.",
      "Мы объясняем принятые решения, не оставляем важные вопросы без ответа и согласовываем изменения до их реализации. Такой подход помогает избежать недопонимания и поддерживать конструктивный диалог на протяжении всего проекта.",
      "Нам важно, чтобы вы понимали, как устроена работа, и могли принимать решения, располагая необходимой информацией.",
    ],
  },
  {
    image: "/images/company-5.jpg",
    title: "Понятный бюджет и согласованные условия",
    text: [
      "Планирование строительства начинается с понимания расходов. Мы подробно прорабатываем смету и порядок оплаты, чтобы вы могли заранее оценить бюджет и распределить затраты.",
      "Основные финансовые условия фиксируются в договоре. Если в ходе работы меняются исходные требования или появляются дополнительные пожелания, мы предварительно обсуждаем их влияние на стоимость и сроки.",
      "Так вы можете планировать расходы и принимать решения на основе понятных цифр, а не неожиданных расчётов по ходу строительства.",
    ],
  },
  {
    image: "/images/company-6.jpg",
    title: "Решения, продуманные для деревянного дома",
    text: [
      "Дерево — живой материал со своими особенностями, которые важно учитывать при проектировании и строительстве. От грамотной работы с ним зависит не только внешний вид дома, но и то, как конструкция будет вести себя в процессе эксплуатации.",
      "Мы уделяем особое внимание конструктивным узлам, соединениям и техническим решениям, учитывая особенности конкретного проекта. Важно, чтобы все элементы конструкции были согласованы между собой и отвечали поставленным задачам.",
      "Именно такая работа остаётся за пределами эффектных фотографий, но становится важной частью дома, рассчитанного на долгие годы.",
    ],
  },
  {
    image: "/images/company-7.jpg",
    title: "Персональный подход к реализации проекта",
    text: [
      "У каждого проекта свои особенности: участок, архитектурная концепция, выбранные материалы и задачи будущих владельцев. Поэтому мы не стремимся сводить строительство к единому шаблону, а подбираем решения с учётом конкретных условий.",
      "Мы рассматриваем проект в комплексе, сопоставляем пожелания с техническими возможностями и помогаем определить оптимальный путь реализации. Это позволяет сохранять целостность замысла и находить баланс между эстетикой, функциональностью и практичностью.",
      "В результате каждый дом получает собственный характер, а все решения складываются в единую архитектурную идею.",
    ],
  },
];

export type NewsItem = {
  tag: "новости" | "статьи";
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  views: string;
  image: string;
};

export const news: NewsItem[] = [
  {
    tag: "статьи",
    date: "30 сентября 2026",
    title: "Установка окон и дверей в домах и банях из бруса и бревна: окосячка, обсадная коробка и частые ошибки",
    excerpt: "Установка окон и дверей в деревянном доме требует особого подхода: стены из бруса и бревна продолжают менять свои размеры после сборки. Разбираем окосячку «шип-ройка», обсадную коробку и частые ошибки.",
    readTime: "9 мин.",
    views: "3 просмотра",
    image: gallery[0]!,
  },
  {
    tag: "статьи",
    date: "27 сентября 2026",
    title: "Межэтажные перекрытия в домах и банях из бруса и бревна: конструкция, жёсткость и звукоизоляция",
    excerpt: "Перекрытия в деревянном доме или бане разделяют помещения, воспринимают нагрузки и влияют на тепло- и звукоизоляцию. Разбираем виды перекрытий, расчёт балок, вибрации, шум и особенности бань.",
    readTime: "12 мин.",
    views: "16 просмотров",
    image: gallery[1]!,
  },
  {
    tag: "статьи",
    date: "28 августа 2026",
    title: "Теплопроводность бруса и бревна: насколько тёплым будет деревянный дом",
    excerpt: "Тепло в деревянном доме зависит не только от материала стен, но и от толщины древесины, качества сборки, герметичности соединений, остекления и отопления. Разбираем, как сохранить тепло в доме и бане из бруса и бревна.",
    readTime: "12 мин.",
    views: "135 просмотров",
    image: gallery[2]!,
  },
  {
    tag: "статьи",
    date: "28 августа 2026",
    title: "Усадка дома из бруса и бревна: сколько длится, от чего зависит и как её учитывают при строительстве",
    excerpt: "Деревянный дом продолжает менять свои размеры и после сборки: древесина реагирует на влажность, венцы уплотняются. Разбираем, сколько длится усадка, как её учитывают для разного бруса и бревна, а также роль шкантов и силовых узлов.",
    readTime: "19 мин.",
    views: "112 просмотров",
    image: gallery[3]!,
  },
  {
    tag: "статьи",
    date: "11 августа 2026",
    title: "Сколько соток нужно для строительства дома: как рассчитать оптимальный размер участка",
    excerpt: "Участок для загородного дома выбирают не только по общей площади. Важно заранее определить, как на территории будут расположены сам дом, баня, парковка, сад и зоны отдыха. Разберёмся, сколько соток стоит рассматривать для дома площадью около 100 м².",
    readTime: "7 мин.",
    views: "265 просмотров",
    image: gallery[5]!,
  },
  {
    tag: "статьи",
    date: "11 августа 2026",
    title: "Внутренняя отделка дома и бани из бруса и бревна: материалы, стили и практические решения",
    excerpt: "Разбираем, как выбрать покрытие для деревянных стен, сочетать материалы, проектировать кухню и санузел, а также учитывать особенности бани и бревенчатых стен.",
    readTime: "18 мин.",
    views: "122 просмотра",
    image: gallery[6]!,
  },
  {
    tag: "статьи",
    date: "11 августа 2026",
    title: "Архитектурные стили загородных домов: как выбрать стиль будущего проекта",
    excerpt: "Архитектурный стиль загородного дома определяет его характер, пропорции и то, как здание будет выглядеть в окружении природы. Разберём основные стили деревянных домов и на что обратить внимание при выборе проекта.",
    readTime: "10 мин.",
    views: "113 просмотров",
    image: gallery[7]!,
  },
  {
    tag: "статьи",
    date: "21 октября 2026",
    title: "Строительные и отделочные материалы для деревянного дома и бани: виды бруса, доски, вагонки и блок-хауса",
    excerpt: "Разбираем строганный и профилированный брус, обрезную доску, блок-хаус и вагонку: назначение, размеры, влажность и особенности выбора для дома и бани.",
    readTime: "14 мин.",
    views: "0 просмотров",
    image: gallery[8]!,
  },
  {
    tag: "статьи",
    date: "21 октября 2026",
    title: "Технологии строительства деревянного дома: закладной венец, рубка углов и устройство стропильной системы",
    excerpt: "Закладной венец, рубка углов «ласточкин хвост» и «сковородень», шканты, межвенцовый утеплитель, стропильная система и ломаная крыша.",
    readTime: "12 мин.",
    views: "0 просмотров",
    image: gallery[9]!,
  },
  {
    tag: "статьи",
    date: "21 октября 2026",
    title: "Виды фундаментов для деревянного дома и бани: как выбрать подходящее основание",
    excerpt: "Ленточный, свайно-винтовой, свайный, столбчатый, плитный и свайно-ростверковый фундаменты: устройство, преимущества, ограничения и ошибки при монтаже.",
    readTime: "20 мин.",
    views: "0 просмотров",
    image: gallery[10]!,
  },
];

export const offices = [
  {
    region: "В Чухломе",
    address: "Костромская область, г. Чухлома",
    hours: ["Пн - Пт: с 10:00 до 19:00", "Сб: с 11:00 до 17:00"],
    mapUrl: "https://yandex.ru/maps/?rtext=~58.762200,42.682000",
  },
];

export const requisites = [
  { label: "Сокращенное наименование", value: "«NORDHAUS»" },
  { label: "Телефон", value: "+7 (950) 246-54-77" },
  { label: "Адрес", value: "157720, Костромская область, г. Чухлома" },
];
