import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  Gem,
  Heart,
  MessageCircleHeart,
  Moon,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const storyCards = [
  "Bazı insanlar kalabalığın içinde bile sakin bir ışık gibi fark edilir. Sen öylesin.",
  "Seninle konuşurken cümleler daha yumuşak, zaman daha hızlı, gün daha güzel oluyor.",
  "Bu sayfayı gösterişli olsun diye değil, sana verdiğim değeri biraz olsun hissettirsin diye yaptım.",
  "Belki küçük bir cesaret, belki tatlı bir itiraf... ama tamamen içten.",
];

const reasons = [
  {
    icon: Heart,
    title: "Gülüşün",
    text: "Bir anı sıradanlıktan çıkarıp akılda kalan bir şeye dönüştürüyor.",
  },
  {
    icon: Sparkles,
    title: "Enerjin",
    text: "Konuşmaya zarif bir sıcaklık katıyorsun; yanında her şey daha hafif hissettiriyor.",
  },
  {
    icon: Moon,
    title: "Duruşun",
    text: "Hem sakin hem etkileyici. Kendine has, kolay unutulmayan bir havan var.",
  },
  {
    icon: Gem,
    title: "Samimiyetin",
    text: "Küçük detaylarda bile insanın yüzünü gülümseten bir incelik taşıyorsun.",
  },
];

const timeline = [
  {
    kicker: "İlk fark ediş",
    title: "Bir şey farklıydı",
    text: "Bazen biri gelir ve hiçbir şey yapmadan bile atmosferi değiştirir.",
  },
  {
    kicker: "Konuşmalar",
    title: "Zaman kayboldu",
    text: "Sohbet uzadıkça dakikalar sessizce hızlandı, ben de bunu fark etmeden sevdim.",
  },
  {
    kicker: "Küçük detaylar",
    title: "Aklımda kaldı",
    text: "Bir bakış, bir cümle, bir gülüş... hepsi bir şekilde günün en güzel yerine yerleşti.",
  },
  {
    kicker: "Bugün",
    title: "Cesaret zamanı",
    text: "Bu yüzden sana bunu zarif, saygılı ve biraz da büyülü bir şekilde söylemek istedim.",
  },
];

const compliments = [
  "Bugünün en güzel detayı kesinlikle sensin.",
  "Gülüşün, en sıradan günü bile özel hissettiriyor.",
  "Senin enerjin bir odanın ışığını değiştirebilir.",
  "Konuşma tarzında insanı sakinleştiren çok güzel bir zarafet var.",
  "Sen farkında olmadan bile akılda kalıyorsun.",
  "Yanında zaman biraz daha nazik akıyor.",
];

type CelebrationParticle = {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
  kind: "heart" | "spark" | "dot";
};

function Background() {
  const particles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 53) % 100}%`,
        delay: (index % 9) * 0.42,
        size: 3 + (index % 6),
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,122,182,.26),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(116,215,255,.22),transparent_28%),radial-gradient(circle_at_50%_82%,rgba(176,107,255,.22),transparent_36%)]" />
      <div className="aurora absolute -inset-40 opacity-80" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle absolute rounded-full bg-white/70"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 400, damping: 35 });
  const smoothY = useSpring(y, { stiffness: 400, damping: 35 });

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, x, y]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="custom-cursor hidden md:block"
      style={{ left: smoothX, top: smoothY }}
    />
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-night"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <motion.div
        className="relative flex flex-col items-center gap-6"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="loader-ring" />
        <p className="font-display text-2xl text-cream">Bir şey hazırlanıyor...</p>
        <p className="max-w-xs text-center text-sm text-white/54">Sakin, zarif ve tamamen sana özel.</p>
      </motion.div>
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <motion.div
      className="mx-auto mb-12 max-w-3xl text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8 }}
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.36em] text-blush">{eyebrow}</p>
      <h2 className="font-display text-4xl font-semibold text-cream md:text-6xl">{title}</h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/64 md:text-lg">{text}</p>
    </motion.div>
  );
}

function Celebration({ active }: { active: boolean }) {
  const particles = useMemo<CelebrationParticle[]>(
    () =>
      Array.from({ length: 90 }, (_, id) => ({
        id,
        x: (id * 47) % 100,
        color: ["#ff7ab6", "#b06bff", "#74d7ff", "#fff5fb", "#ffd166"][id % 5],
        delay: (id % 12) * 0.08,
        size: 7 + (id % 12),
        kind: id % 5 === 0 ? "heart" : id % 3 === 0 ? "spark" : "dot",
      })),
    [],
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute top-[-40px] flex items-center justify-center"
          style={{ left: `${particle.x}%`, color: particle.color }}
          initial={{ y: -60, rotate: 0, opacity: 0, scale: 0.6 }}
          animate={{
            y: ["0vh", "45vh", "108vh"],
            x: [0, particle.id % 2 ? 55 : -55, particle.id % 4 ? -22 : 36],
            rotate: 360 + particle.id * 9,
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1.15, 0.8],
          }}
          transition={{ duration: 3.6, delay: particle.delay, ease: "easeOut" }}
        >
          {particle.kind === "heart" ? (
            <Heart fill="currentColor" size={particle.size + 7} />
          ) : particle.kind === "spark" ? (
            <Sparkles size={particle.size + 5} />
          ) : (
            <span
              className="block rounded-full"
              style={{ width: particle.size, height: particle.size, background: particle.color }}
            />
          )}
        </motion.span>
      ))}
      <motion.div
        className="firework left-[20%] top-[24%]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 0.2], opacity: [0, 1, 0] }}
        transition={{ duration: 1.2, repeat: 2 }}
      />
      <motion.div
        className="firework right-[18%] top-[34%]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.4, 0.2], opacity: [0, 1, 0] }}
        transition={{ duration: 1.4, delay: 0.25, repeat: 2 }}
      />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [storyOpen, setStoryOpen] = useState(false);
  const [compliment, setCompliment] = useState(compliments[0]);
  const [celebrate, setCelebrate] = useState(false);
  const [softAnswer, setSoftAnswer] = useState(false);
  const storyRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const revealStory = () => {
    setStoryOpen(true);
    window.setTimeout(() => storyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 160);
  };

  const generateCompliment = () => {
    setCompliment((current) => {
      const next = compliments[Math.floor(Math.random() * compliments.length)];
      return next === current ? compliments[(compliments.indexOf(current) + 1) % compliments.length] : next;
    });
  };

  const accept = () => {
    setSoftAnswer(false);
    setCelebrate(true);
    window.setTimeout(() => setCelebrate(false), 5600);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-night text-white selection:bg-blush/40 selection:text-white">
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <Background />
      <CustomCursor />
      <Celebration active={celebrate} />
      <motion.div className="fixed left-0 top-0 z-40 h-1 bg-gradient-to-r from-blush via-orchid to-aurora" style={{ width: progressWidth }} />

      <section className="relative grid min-h-screen place-items-center px-5 py-24">
        <motion.div
          className="absolute top-8 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/58 backdrop-blur-xl"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55 }}
        >
          Kalpten gelen küçük bir evren
        </motion.div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-full border border-white/15 bg-white/10 shadow-glow backdrop-blur-2xl"
            initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 1.65, type: "spring", stiffness: 140 }}
          >
            <Heart className="text-blush" fill="currentColor" size={34} />
          </motion.div>
          <motion.h1
            className="font-display text-5xl font-semibold leading-tight text-cream md:text-8xl"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.75, duration: 0.9 }}
          >
            Sana Anlatmak İstediğim Bir Şey Var...
          </motion.h1>
          <motion.p
            className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/66 md:text-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.95, duration: 0.8 }}
          >
            Bu sayfa, kelimelerin tek başına yetmediği yerde biraz ışık, biraz cesaret ve çokça incelik olsun diye hazırlandı.
          </motion.p>
          <motion.button
            type="button"
            onClick={revealStory}
            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/16 bg-gradient-to-r from-blush via-orchid to-aurora bg-[length:200%_100%] px-8 py-4 text-base font-bold text-white shadow-glow outline-none transition hover:scale-105 focus-visible:ring-4 focus-visible:ring-blush/45"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.15, duration: 0.7 }}
            whileTap={{ scale: 0.97 }}
          >
            Tıkla <span aria-hidden="true">❤️</span>
            <ArrowDown className="transition group-hover:translate-y-1" size={18} />
          </motion.button>
        </div>
      </section>

      <section ref={storyRef} className="relative px-5 py-24 md:py-32">
        <SectionHeading
          eyebrow="Hikaye"
          title="Küçük Bir İtiraf"
          text="Butona dokunduğun an açılan bu bölüm, aslında tek bir şeyi anlatıyor: bazı hisler güzelce söylenmeyi hak eder."
        />
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <AnimatePresence>
            {storyOpen &&
              storyCards.map((card, index) => (
                <motion.article
                  key={card}
                  className="glass-card group relative overflow-hidden p-7"
                  initial={{ opacity: 0, y: 36, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.16, duration: 0.7, ease: "easeOut" }}
                  whileHover={{ y: -8 }}
                >
                  <Sparkles className="mb-8 text-aurora transition group-hover:rotate-12" />
                  <p className="text-xl leading-9 text-cream">{card}</p>
                  <span className="absolute right-6 top-5 text-3xl text-blush/45">♥</span>
                </motion.article>
              ))}
          </AnimatePresence>
        </div>
      </section>

      <section className="relative px-5 py-24 md:py-32">
        <SectionHeading
          eyebrow="Neden sen?"
          title="Çünkü Farklısın"
          text="Bazı güzellikler yüksek sesle değil, detaylarda parlar. Sende en çok bunu seviyorum."
        />
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.article
                key={reason.title}
                className="glass-card min-h-[260px] p-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08, duration: 0.7 }}
                whileHover={{ y: -10, rotateX: 3 }}
              >
                <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-blush shadow-glow">
                  <Icon size={26} />
                </div>
                <h3 className="mb-4 font-display text-2xl text-cream">{reason.title}</h3>
                <p className="leading-7 text-white/62">{reason.text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="relative px-5 py-24 md:py-32">
        <SectionHeading
          eyebrow="Zaman çizgisi"
          title="Akılda Kalan Anlar"
          text="Bu sadece bir timeline değil; bir duygunun usul usul belirginleşmesi."
        />
        <div className="mx-auto max-w-4xl">
          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 ? 48 : -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.75 }}
            >
              <div className="timeline-dot" />
              <div className="glass-card p-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-aurora">{item.kicker}</p>
                <h3 className="font-display text-3xl text-cream">{item.title}</h3>
                <p className="mt-3 leading-8 text-white/64">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative px-5 py-24 md:py-32">
        <SectionHeading
          eyebrow="Mini sihir"
          title="İltifat Üretici"
          text="Bir buton, birkaç tatlı cümle ve belki yüzünde küçük bir gülümseme."
        />
        <div className="mx-auto max-w-3xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={compliment}
              className="glass-card mx-auto min-h-[190px] p-8"
              initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            >
              <MessageCircleHeart className="mx-auto mb-6 text-blush" size={34} />
              <p className="font-display text-3xl leading-tight text-cream md:text-5xl">{compliment}</p>
            </motion.div>
          </AnimatePresence>
          <button type="button" onClick={generateCompliment} className="premium-button mt-8">
            <WandSparkles size={18} />
            Yeni iltifat
          </button>
        </div>
      </section>

      <section className="relative min-h-[80vh] overflow-hidden px-5 py-24 md:py-32">
        <motion.div
          className="absolute inset-x-0 top-16 mx-auto h-72 max-w-4xl rounded-full bg-aurora/10 blur-3xl"
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-160px" }}
          transition={{ duration: 1 }}
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.36em] text-blush">Sürpriz</p>
          <h2 className="font-display text-5xl text-cream md:text-8xl">Buraya kadar geldiysen...</h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/66">
            Demek ki bu küçük evrenin son ışığına ulaştın. En önemli cümleler şimdi geliyor.
          </p>
        </motion.div>
        <div className="floating-lights" />
      </section>

      <section className="relative grid min-h-screen place-items-center px-5 py-24">
        <motion.div
          className="confession-card relative z-10 mx-auto max-w-4xl p-7 text-center md:p-12"
          initial={{ opacity: 0, scale: 0.92, y: 45 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-160px" }}
          transition={{ duration: 0.9 }}
        >
          <Star className="mx-auto mb-7 text-aurora" size={36} />
          <p className="whitespace-pre-line font-display text-3xl leading-tight text-cream md:text-5xl">
            {`Seninle konuşurken zamanın nasıl geçtiğini anlamıyorum.
Gülüşün günümü güzelleştiriyor.
Seni daha yakından tanımayı gerçekten isterim.`}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button type="button" onClick={accept} className="premium-button justify-center">
              Ben de isterim <span aria-hidden="true">❤️</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCelebrate(false);
                setSoftAnswer(true);
              }}
              className="soft-button"
            >
              Biraz daha düşünelim 😊
            </button>
          </div>
          <AnimatePresence>
            {celebrate && (
              <motion.p
                className="mt-8 rounded-3xl border border-aurora/25 bg-aurora/10 px-5 py-4 text-lg font-semibold text-cream"
                initial={{ opacity: 0, y: 18, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
              >
                Belki de bu hikayenin en güzel sayfası şimdi başlıyor.
              </motion.p>
            )}
            {softAnswer && (
              <motion.p
                className="mt-8 rounded-3xl border border-white/12 bg-white/8 px-5 py-4 text-lg text-white/76"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                Sorun değil, seni tanımaya devam etmek bile güzel.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}

export default App;
