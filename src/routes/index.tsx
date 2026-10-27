import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { categories, offices, site } from "@/lib/site-data";
import { CallbackForm } from "@/components/callback-form";

const showcase = ["/images/home/c1.jpg", "/images/home/c2.jpg", "/images/home/c3.jpg", "/images/home/c4.webp", "/images/home/c5.jpg"];
const aboutSlides = Array.from({ length: 12 }, (_, i) => `/images/home/a${i + 1}.jpg`);
const thinTitle = "font-light uppercase tracking-[0.04em] text-foreground/80";

function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden rounded-b-[32px]">
      <img src="/images/home/hero.jpg" alt="Усадьба из клееного бруса" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
      <div className="container-wide relative z-10 flex h-full flex-col justify-end pb-14">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="hero-eyebrow text-white">NORDHAUS · Производство в Костромской области</div>
            <h1 className="max-w-4xl text-2xl font-bold uppercase leading-tight tracking-wide text-background sm:text-4xl lg:text-[44px]">
              Строим дома и бани
              <br />
              из бруса и бревна
            </h1>
          </div>
          <Link to="/projects" className="btn-primary">Каталог проектов</Link>
        </div>
      </div>
    </section>
  );
}

function ProjectsShowcase() {
  const [active, setActive] = useState(categories[0]!.slug);
  const [idx, setIdx] = useState(0);
  const category = categories.find((c) => c.slug === active) ?? categories[0]!;
  const imgs = active === categories[0]!.slug || category.images.length === 0 ? showcase : category.images.slice(0, 5);
  const main = imgs[idx] ?? imgs[0]!;
  return (
    <section className="container-wide pt-16">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => { setActive(c.slug); setIdx(0); }}
            className={`rounded-full border px-6 py-3 text-[12px] font-semibold uppercase tracking-wider transition-colors ${
              c.slug === active ? "border-foreground/70 bg-foreground/70 text-background" : "border-foreground/40 text-foreground/80 hover:border-primary hover:text-primary"
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>
      <div className="mt-10 overflow-hidden rounded-[24px]">
        <img key={main} src={main} alt="Проект дома" className="aspect-[16/9] w-full object-cover lg:aspect-[1216/700]" />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-5 sm:grid-cols-6">
        {imgs.map((img, i) => (
          <button key={img} type="button" onClick={() => setIdx(i)} className={`overflow-hidden rounded-xl border-2 ${i === idx ? "border-foreground/50" : "border-transparent"}`}>
            <img src={img} alt="" className="aspect-[182/100] w-full object-cover" loading="lazy" />
          </button>
        ))}
        <Link to="/projects" search={{ category: active }} className="flex flex-col justify-between rounded-xl bg-primary p-4 text-primary-foreground">
          <span className="self-end text-lg leading-none">↗</span>
          <span className="text-[12px] font-semibold uppercase tracking-wider">Перейти в проекты</span>
        </Link>
      </div>
    </section>
  );
}

function Engineering() {
  return (
    <section className="container-wide pt-24 text-center">
      <h2 className={`text-xl sm:text-[26px] leading-snug ${thinTitle}`}>
        Проектирование деревянных домов
      </h2>
      <p className="mx-auto mt-4 max-w-[640px] text-[15px] font-semibold leading-relaxed">
        Продумано для жизни. Создано на поколения.
      </p>
      <p className="mx-auto mt-8 max-w-[640px] text-[15px] leading-relaxed text-muted-foreground">
        Каждый деревянный дом NORDHAUS начинается с идеи — создать пространство, в котором будет тепло, уютно и комфортно всей семье. Мы объединяем красоту натурального дерева, продуманную архитектуру и современные инженерные решения, чтобы дом отвечал вашим потребностям и сохранял свою ценность на долгие годы.
      </p>
      <p className="mx-auto mt-5 max-w-[640px] text-[15px] leading-relaxed text-muted-foreground">
        Мы внимательно относимся к каждой детали: учитываем особенности участка, ваши пожелания и образ жизни семьи. Продумываем планировку, конструктивные решения и инженерные системы, чтобы всё было гармонично и работало как единое целое.
      </p>
      <p className="mx-auto mt-8 max-w-[640px] text-[15px] font-semibold leading-relaxed">
        NORDHAUS — создаём деревянные дома, в которых хочется жить, расти и собираться всей семьёй.
      </p>
    </section>
  );
}

function About() {
  const [i, setI] = useState(0);
  const n = aboutSlides.length;
  return (
    <section className="container-wide pt-24">
      <div className="grid gap-10 rounded-[24px] bg-card p-8 shadow-sm sm:p-10 lg:grid-cols-2">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-wider text-foreground/70">О компании</p>
          <h2 className={`mt-6 text-3xl leading-tight sm:text-[36px] ${thinTitle}`}>Создаём дома, в которых хочется жить</h2>
          <p className="mt-10 text-[15px] leading-relaxed text-muted-foreground">
            Мы строим красивые и надёжные деревянные дома из бруса и бревна, объединяя природную красоту дерева, продуманную архитектуру и современный комфорт.
          </p>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            С 2014 года мы воплощаем в жизнь проекты, в которых отражаются характер, мечты и образ жизни их владельцев. Создаём загородные дома, бани, SPA-комплексы и другие постройки, уделяя внимание каждой детали — от архитектурного замысла до его воплощения.
          </p>
          <p className="mt-5 text-[15px] font-semibold leading-relaxed">
            NORDHAUS — дома из дерева, созданные с душой, вниманием к деталям и уважением к традициям деревянного зодчества.
          </p>
        </div>
        <div>
          <div className="min-w-0 overflow-hidden rounded-[20px]">
            <img src={aboutSlides[i]} alt="Наши дома" className="aspect-[4/3] w-full object-cover" loading="lazy" />
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-foreground/70">
            <button type="button" aria-label="Назад" onClick={() => setI((i - 1 + n) % n)} className="grid h-10 w-10 place-items-center rounded-full border border-foreground/60">←</button>
            <span className="text-sm">{i + 1} / {n}</span>
            <button type="button" aria-label="Вперёд" onClick={() => setI((i + 1) % n)} className="grid h-10 w-10 place-items-center rounded-full border border-foreground/60">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  return (
    <section className="container-wide pt-20">
      <div className="mx-auto max-w-[1090px] rounded-[16px] bg-foreground/85 p-8 text-background sm:p-10">
        <h2 className="text-2xl font-light uppercase tracking-[0.04em] sm:text-[34px] leading-tight">Рассчитайте стоимость дома вашей мечты</h2>
        <p className="mt-3 text-sm">Мы перезвоним для уточнения деталей и ваших указаний к предстоящему обсуждению</p>
        <div className="mt-10 rounded-xl bg-background p-5 text-foreground">
          <CallbackForm />
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="container-wide pt-20">
      <div className="grid gap-10 rounded-[24px] bg-card p-8 shadow-sm sm:p-10 lg:grid-cols-2">
        <div className="flex flex-col">
          <h2 className={`text-3xl leading-tight sm:text-[36px] ${thinTitle}`}>Ваш дом — наша ответственность</h2>
          <ul className="mt-10 list-disc space-y-2 pl-6 font-serif text-lg italic text-foreground/70">
            {["Индивидуальный подход к каждому проекту", "Контроль качества на каждом этапе", "Проверенные материалы и технологии", "Соблюдение сроков и бюджета", "Гарантия на все виды работ"].map((t) => <li key={t}>{t}</li>)}
          </ul>
          <Link to="/projects" className="btn-primary mt-6 self-start lg:mt-auto">Проекты</Link>
        </div>
        <div className="min-w-0 overflow-hidden rounded-[20px]">
          <img src="/images/portfolio.jpg" alt="Портфолио" className="aspect-[4/3] w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="container-wide pt-20">
      <div className="mx-auto max-w-[1090px] rounded-[8px] bg-foreground/85 p-8 text-background sm:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_276px]">
          <div className="font-serif text-[17px] italic leading-relaxed">
            <p className="mt-1">Мы верим, что настоящий дом — это не просто стены и крыша. Это место, где рождаются семейные традиции, хранятся самые тёплые воспоминания и создаётся история, которую однажды продолжат наши дети.</p>
            <p className="mt-1">Именно эту философию мы вкладываем в каждый дом NORDHAUS. С любовью к дереву, уважением к природе и вниманием к каждой детали мы создаём пространства, в которых хочется жить, расти, возвращаться и оставаться.</p>
            <p className="mt-1">NORDHAUS — это больше, чем дом. Это тепло, которое передаётся из поколения в поколение. Ценность, которая не теряет своего смысла с годами, а становится только глубже.</p>
            <img
              src="/images/12.png"
              alt="NORDHAUS"
              className="mx-auto mt-6 block max-w-[420px] rounded-lg object-cover"
              loading="lazy"
            />
          </div>
          <img src="/images/sergey.jpg" alt="Сергей" className="h-full w-full rounded-lg object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  );
}


function Contacts() {
  const [o, setO] = useState(0);
  const office = offices[o] ?? offices[0]!;
  return (
    <section className="container-wide py-24">
      <div className="flex items-end justify-between">
        <h2 className={`text-2xl ${thinTitle}`}>Контакты</h2>
        <Link to="/contacts" className="text-[12px] text-muted-foreground hover:text-primary">Перейти в раздел ›</Link>
      </div>
      <div className="mt-8 grid gap-8 rounded-[24px] bg-card p-8 shadow-sm sm:p-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <h3 className={`text-2xl ${thinTitle}`}>Наш офис</h3>
          <div className="mt-8 inline-flex rounded-full bg-secondary p-1">
            {offices.map((of, i) => (
              <button key={i} type="button" onClick={() => setO(i)} className={`rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-wider ${i === o ? "bg-foreground/80 text-background" : "text-foreground/70"}`}>
                {of.region}
              </button>
            ))}
          </div>
          <p className="mt-6 text-[15px] leading-relaxed">{office.address}</p>
          <p className="mt-3 text-sm text-muted-foreground">Пн - Пт: с 10:00 до 19:00<br />Сб: с 11:00 до 17:00</p>
          <a href={site.phoneHref} className="mt-3 block text-sm">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="mt-1 block text-sm">{site.email}</a>
        </div>
        <iframe
          title="Карта"
          src={`https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(office.address)}&z=12`}
          className="h-[340px] w-full rounded-[16px] border-0"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="-mt-[var(--header-offset,0px)] bg-secondary/40">
      <Hero />
      <ProjectsShowcase />
      <Engineering />
      <About />
      <Calculator />
      <Approach />
      <Quote />
      <Contacts />
    </main>
  );
}

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Строительство домов и бань из бруса и бревна по индивидуальным проектам в Москве и области | NORDHAUS" },
      { name: "description", content: "Строим дома и бани из бруса и бревна по индивидуальным проектам в Москве и области. Влюбляем в эстетику загородной жизни с 2014 года." },
      { property: "og:title", content: "Строительство домов и бань из бруса и бревна | NORDHAUS" },
      { property: "og:description", content: "Дома и бани из бруса и бревна. Индивидуальное проектирование, полный цикл строительства." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${site.url}/` }],
  }),
  component: Index,
});
