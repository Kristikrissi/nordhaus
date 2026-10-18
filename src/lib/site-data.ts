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

export const socials = [
  { label: "YouTube", href: "https://www.youtube.com/channel/UCgkVDDQG-Ky0wQ8V16I_2zg" },
  { label: "Телеграм", href: "https://t.me/StroyiHouse" },
  { label: "Дзен", href: "https://dzen.ru/stroyhouse" },
  { label: "Вконтакте", href: "https://vk.com/stroyhous" },
  { label: "Pinterest", href: "https://www.pinterest.ru/stroyhouse/" },
];

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
    title: "Индивидуальность – ваше главное преимущество",
    text: [
      "Мы создаем дома, которые подчеркивают уникальность их владельцев. Сотрудничая с нашей компанией, вы можете быть уверены: второго такого дома не будет.",
      "Индивидуальность начинается с проекта. Наши архитекторы и дизайнеры воплотят ваши самые смелые идеи, создавая пространство, идеально отражающее ваш стиль и образ жизни. Мы учитываем каждую деталь: от выбора материалов премиум-класса до уникальных дизайнерских решений, которые делают ваш дом настоящим произведением искусства.",
    ],
  },
  {
    image: "/images/company-2.jpg",
    title: "Беспрецедентное качество – основа нашего подхода",
    text: [
      "Мы строим дома, к которым невозможно придраться. Наши проекты – эталон безупречности, где каждая деталь выполнена с максимальной тщательностью и вниманием.",
      "Мы принципиально не экономим на материалах и не оптимизируем процессы в ущерб качеству. Для нас важно, чтобы ваш дом стал воплощением совершенства, которое выдержит испытание временем. Мы сотрудничаем только с лучшими поставщиками премиальных материалов и используем передовые технологии строительства.",
      "Вы заслуживаете совершенства. И мы его создаем.",
    ],
  },
  {
    image: "/images/company-3.jpg",
    title: "Сервис без стресса – ваша уверенность в каждом этапе",
    text: [
      "Мы понимаем, что ваше время — самое ценное, и делаем все, чтобы сотрудничество с нами было комфортным и спокойным. Наша главная цель — оградить вас от любых хлопот, связанных со строительством дома.",
      "Каждый клиент получает личного менеджера, который сопровождает проект от начала до конца. Он всегда на связи, оперативно информирует о ходе работ, присылает фото- и видеоматериалы, решает возникающие вопросы и обеспечивает четкую координацию всех процессов.",
      "С нами строительство вашего дома превращается в удобный и комфортный процесс, оставляя только радость от воплощения вашей мечты.",
    ],
  },
  {
    image: "/images/company-4.jpg",
    title: "Честность и прозрачность – наша репутация, проверенная временем",
    text: [
      "Строим не только дома, но и доверие. С 2003 года наша компания реализует премиальные проекты, и за это время мы заслужили репутацию надежного партнера. Мы работаем открыто и прозрачно: от обсуждения проекта до сдачи готового дома. Наши клиенты знают, за что они платят, и уверены, что каждый этап строительства выполняется без компромиссов. С нами вы можете быть уверены, что ваш дом будет построен без рисков и с абсолютной прозрачностью во всем.",
    ],
  },
  {
    image: "/images/company-5.jpg",
    title: "Безопасность – ваш комфорт и уверенность",
    text: [
      "Мы берем на себя все риски, чтобы вы могли сосредоточиться на главном – ожидании дома вашей мечты. С нами вы защищены от неожиданных расходов и неприятных сюрпризов.",
      "При подписании договора мы фиксируем цену проекта. Она остается неизменной на протяжении всей работы, независимо от внешних факторов. Мы также обеспечиваем четкий и прозрачный график платежей, благодаря которому вы всегда понимаете, за что платите и на каком этапе находитесь.",
      "Наша цель – ваше спокойствие. Мы гарантируем, что процесс строительства будет для вас предсказуемым, безопасным и полностью под контролем.",
    ],
  },
  {
    image: "/images/company-6.jpg",
    title: "Конфиденциальность – ваш дом, ваша личная территория",
    text: [
      "Мы работаем с клиентами, для которых конфиденциальность — это не просто требование, а жизненная необходимость. Среди наших заказчиков — политики, топ-менеджеры госкорпораций, ведущие бизнесмены страны и другие влиятельные личности. Мы понимаем, что их доверие — это ценность, которую нельзя подвести.",
      "Мы тщательно контролируем доступ к проекту, защищая ваши личные данные на каждом этапе.",
      "Вы можете быть уверены: с нами вы не только получите дом мечты, но и сохраните полную анонимность. Ваше доверие — наш главный приоритет.",
    ],
  },
  {
    image: "/images/company-7.jpg",
    title: "Узлы и конструкции – уникальные решения для надежности вашего дома",
    text: [
      "За годы работы мы создали десятки собственных конструкционных решений, которые применяются только на наших объектах. Эти инновации стали результатом многолетнего опыта, тщательных расчетов и стремления к совершенству.",
      "Каждый узел, каждая деталь продуманы до мельчайших нюансов, чтобы ваш дом был не только красивым, но и долговечным, безопасным и комфортным. Технологии, используемые только нами, подчеркивают эксклюзивность каждого проекта и гарантируют его надежность на десятилетия вперед.",
      "Мы гордимся тем, что создаем дома, которые выдерживают любые испытания времени и становятся настоящим наследием. Ваш дом — это наша работа, доведенная до идеала.",
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
