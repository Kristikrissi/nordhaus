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
  name: "Норд Хаус",
  latinName: "NORDHAUS",
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

export const categories: Category[] = [
  { slug: "doma-iz-brusa", title: "Дома из бруса", images: big.slice(0, 5) },
  { slug: "doma-iz-brevna", title: "Дома из бревна", images: big.slice(5, 10) },
  { slug: "bani-iz-brusa", title: "Бани из бруса", images: big.slice(10, 15) },
  { slug: "bani-iz-brevna", title: "Бани из бревна", images: big.slice(15, 20) },
];

export type Project = {
  slug: string;
  name: string;
  area: number;
  floors?: number;
  status?: "Построен" | "Строится";
  tags?: string[];
  categories: string[];
  images: string[];
};

export const projects: Project[] = [
  { slug: "u-les", name: "У-ЛЕС", area: 1749, floors: 2, status: "Построен", categories: ["doma-iz-brusa"], images: big.slice(0, 5) },
  { slug: "razliv", name: "Разлив", area: 471, floors: 1, status: "Строится", tags: ["Фахверк"], categories: ["doma-iz-brusa"], images: big.slice(5, 10) },
  { slug: "lyeshina-nora", name: "Лёшина нора", area: 1230, floors: 2, categories: ["doma-iz-brusa"], images: big.slice(10, 15) },
  { slug: "nazarevskoe", name: "Назарьевское", area: 2175, floors: 3, categories: ["doma-iz-brusa"], images: big.slice(15, 20) },
  { slug: "villa-ad-aquas", name: "Вилла Аква", area: 1447, floors: 2, categories: ["doma-iz-brusa"], images: [big[20]!, big[21]!, big[22]!, big[23]!, big[24]!] },
  { slug: "proekt-djey", name: "Проект Джей", area: 1063, floors: 2, categories: ["doma-iz-brusa"], images: [big[11]!, big[12]!, big[13]!, big[14]!, big[15]!] },
  { slug: "villa-olga", name: "Вилла Ольга", area: 583, categories: ["doma-iz-brusa"], images: [big[16]!, big[17]!, big[18]!, big[19]!, big[20]!] },
  { slug: "yauza", name: "Яуза", area: 341, floors: 1, categories: ["bani-iz-brusa"], images: [big[21]!, big[22]!, big[23]!, big[24]!, big[0]!] },
  { slug: "bolshoe-sareevo", name: "Большое Сареево", area: 400, categories: ["doma-iz-brevna"], images: [big[2]!, big[3]!, big[4]!, big[5]!, big[6]!] },
  { slug: "volga-p", name: "Волга П", area: 520, floors: 2, categories: ["doma-iz-brevna"], images: [big[7]!, big[8]!, big[9]!, big[10]!, big[11]!] },
  { slug: "uspenskoe", name: "Успенское", area: 868, floors: 2, status: "Построен", categories: ["doma-iz-brevna"], images: [big[12]!, big[13]!, big[14]!, big[15]!, big[16]!] },
  { slug: "dom-puhovyh", name: "Дом Пуховых", area: 950, floors: 2, status: "Строится", categories: ["doma-iz-brevna"], images: [big[17]!, big[18]!, big[19]!, big[20]!, big[21]!] },
  { slug: "nepovtorimyy", name: "Неповторимый", area: 625, floors: 2, categories: ["doma-iz-brevna"], images: [big[22]!, big[23]!, big[24]!, big[0]!, big[1]!] },
  { slug: "belaya-kolp", name: "Белая Колпь", area: 130, floors: 1, categories: ["bani-iz-brevna"], images: [big[3]!, big[4]!, big[5]!, big[6]!, big[7]!] },
  { slug: "usadba-anastasiya", name: "Усадьба Анастасия", area: 428, floors: 2, status: "Построен", categories: ["doma-iz-brevna"], images: [big[8]!, big[9]!, big[10]!, big[11]!, big[12]!] },
];

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
    title: "Монтаж окон в доме из клееного бруса: основные ошибки и особенности деревянных стен",
    excerpt: "В Норд Хаус (NORDHAUS) мы рассматриваем оконный узел как часть архитектуры и конструктивной системы резиденции.",
    readTime: "12 мин.",
    views: "3 просмотра",
    image: gallery[0]!,
  },
  {
    tag: "статьи",
    date: "27 сентября 2026",
    title: "Межэтажные перекрытия в доме из клееного бруса: конструкция, жесткость и вибрации",
    excerpt: "Мы проектируем межэтажное перекрытие в доме из клееного бруса как единую систему: оно разделяет этажи, воспринимает нагрузки от людей, мебели и перегородок.",
    readTime: "7 мин.",
    views: "16 просмотров",
    image: gallery[1]!,
  },
  {
    tag: "статьи",
    date: "28 августа 2026",
    title: "Теплопроводность клееного бруса: насколько теплым получается дом",
    excerpt: "В Норд Хаус мы рассматриваем тепловой комфорт как результат точного инженерного расчета, а не как отдельное свойство клееного бруса.",
    readTime: "23 мин.",
    views: "135 просмотров",
    image: gallery[2]!,
  },
  {
    tag: "статьи",
    date: "28 августа 2026",
    title: "Усадка дома из клееного бруса: сколько длится и как учитывается при строительстве",
    excerpt: "Усадку клееного бруса в Норд Хаус рассматриваем не как проблему, с которой приходится мириться после строительства, а как заранее рассчитанный параметр.",
    readTime: "15 мин.",
    views: "112 просмотров",
    image: gallery[3]!,
  },
  {
    tag: "статьи",
    date: "28 августа 2026",
    title: "Уход и обслуживание дома из клееного бруса: что и когда необходимо проверять",
    excerpt: "Мы проектируем загородную резиденцию так, чтобы после заселения она не превращалась для владельца в постоянный технический проект.",
    readTime: "12 мин.",
    views: "103 просмотра",
    image: gallery[4]!,
  },
  {
    tag: "статьи",
    date: "11 августа 2026",
    title: "Сколько соток нужно для строительства дома: как рассчитать оптимальный размер участка",
    excerpt: "Участок для загородной резиденции выбирают не только по общей площади. Важно заранее определить, как на территории будут расположены основной дом и постройки.",
    readTime: "11 мин.",
    views: "265 просмотров",
    image: gallery[5]!,
  },
  {
    tag: "статьи",
    date: "11 августа 2026",
    title: "Внутренняя отделка дома из клееного бруса: материалы и дизайнерские решения",
    excerpt: "Внутренняя отделка дома из клееного бруса должна раскрывать природную фактуру дерева и одновременно поддерживать архитектуру современной загородной резиденции.",
    readTime: "15 мин.",
    views: "122 просмотра",
    image: gallery[6]!,
  },
  {
    tag: "статьи",
    date: "11 августа 2026",
    title: "Архитектурные стили загородных домов: как выбрать стиль будущего проекта",
    excerpt: "Архитектурный стиль загородного дома определяет не только оформление фасадов. От выбранного направления зависят пропорции здания, конфигурация кровли и характер интерьеров.",
    readTime: "21 мин.",
    views: "113 просмотров",
    image: gallery[7]!,
  },
  {
    tag: "новости",
    date: "5 августа 2026",
    title: "Обзор выставки Арх Москва 2026",
    excerpt: "Побывали на главной выставке архитектуры и дизайна, рассказываем, что интересно для загородного деревянного домостроения.",
    readTime: "5 мин.",
    views: "48 просмотров",
    image: gallery[8]!,
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
  { label: "Сокращенное наименование", value: "ООО «Норд Хаус»" },
  { label: "ИНН/КПП", value: "7729780129/770201001" },
  { label: "ОГРН", value: "1147746946126 от 20.08.2014г." },
  { label: "Телефон", value: "+7 (950) 246-54-77" },
  { label: "Адрес", value: "157720, Костромская область, г. Чухлома" },
];
