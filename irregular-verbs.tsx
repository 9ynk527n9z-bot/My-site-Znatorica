import { useState } from "react";

const verbs = [
  { base: "be", past: "was/were", pp: "been", ru: "быть", pron: ["biː", "wɒz/wɜː", "biːn"] },
  { base: "become", past: "became", pp: "become", ru: "становиться", pron: ["bɪˈkʌm", "bɪˈkeɪm", "bɪˈkʌm"] },
  { base: "begin", past: "began", pp: "begun", ru: "начинать", pron: ["bɪˈɡɪn", "bɪˈɡæn", "bɪˈɡʌn"] },
  { base: "break", past: "broke", pp: "broken", ru: "ломать", pron: ["breɪk", "brəʊk", "ˈbrəʊkən"] },
  { base: "bring", past: "brought", pp: "brought", ru: "приносить", pron: ["brɪŋ", "brɔːt", "brɔːt"] },
  { base: "build", past: "built", pp: "built", ru: "строить", pron: ["bɪld", "bɪlt", "bɪlt"] },
  { base: "buy", past: "bought", pp: "bought", ru: "покупать", pron: ["baɪ", "bɔːt", "bɔːt"] },
  { base: "catch", past: "caught", pp: "caught", ru: "ловить", pron: ["kætʃ", "kɔːt", "kɔːt"] },
  { base: "choose", past: "chose", pp: "chosen", ru: "выбирать", pron: ["tʃuːz", "tʃəʊz", "ˈtʃəʊzən"] },
  { base: "come", past: "came", pp: "come", ru: "приходить", pron: ["kʌm", "keɪm", "kʌm"] },
  { base: "cost", past: "cost", pp: "cost", ru: "стоить", pron: ["kɒst", "kɒst", "kɒst"] },
  { base: "cut", past: "cut", pp: "cut", ru: "резать", pron: ["kʌt", "kʌt", "kʌt"] },
  { base: "do", past: "did", pp: "done", ru: "делать", pron: ["duː", "dɪd", "dʌn"] },
  { base: "draw", past: "drew", pp: "drawn", ru: "рисовать", pron: ["drɔː", "druː", "drɔːn"] },
  { base: "drink", past: "drank", pp: "drunk", ru: "пить", pron: ["drɪŋk", "dræŋk", "drʌŋk"] },
  { base: "drive", past: "drove", pp: "driven", ru: "водить", pron: ["draɪv", "drəʊv", "ˈdrɪvən"] },
  { base: "eat", past: "ate", pp: "eaten", ru: "есть", pron: ["iːt", "eɪt", "ˈiːtən"] },
  { base: "fall", past: "fell", pp: "fallen", ru: "падать", pron: ["fɔːl", "fel", "ˈfɔːlən"] },
  { base: "feel", past: "felt", pp: "felt", ru: "чувствовать", pron: ["fiːl", "felt", "felt"] },
  { base: "find", past: "found", pp: "found", ru: "находить", pron: ["faɪnd", "faʊnd", "faʊnd"] },
  { base: "fly", past: "flew", pp: "flown", ru: "летать", pron: ["flaɪ", "fluː", "fləʊn"] },
  { base: "forget", past: "forgot", pp: "forgotten", ru: "забывать", pron: ["fəˈɡet", "fəˈɡɒt", "fəˈɡɒtən"] },
  { base: "get", past: "got", pp: "got/gotten", ru: "получать", pron: ["ɡet", "ɡɒt", "ɡɒt"] },
  { base: "give", past: "gave", pp: "given", ru: "давать", pron: ["ɡɪv", "ɡeɪv", "ˈɡɪvən"] },
  { base: "go", past: "went", pp: "gone", ru: "идти", pron: ["ɡəʊ", "went", "ɡɒn"] },
  { base: "grow", past: "grew", pp: "grown", ru: "расти", pron: ["ɡrəʊ", "ɡruː", "ɡrəʊn"] },
  { base: "have", past: "had", pp: "had", ru: "иметь", pron: ["hæv", "hæd", "hæd"] },
  { base: "hear", past: "heard", pp: "heard", ru: "слышать", pron: ["hɪə", "hɜːd", "hɜːd"] },
  { base: "hold", past: "held", pp: "held", ru: "держать", pron: ["həʊld", "held", "held"] },
  { base: "keep", past: "kept", pp: "kept", ru: "хранить", pron: ["kiːp", "kept", "kept"] },
  { base: "know", past: "knew", pp: "known", ru: "знать", pron: ["nəʊ", "njuː", "nəʊn"] },
  { base: "leave", past: "left", pp: "left", ru: "уходить", pron: ["liːv", "left", "left"] },
  { base: "let", past: "let", pp: "let", ru: "позволять", pron: ["let", "let", "let"] },
  { base: "lose", past: "lost", pp: "lost", ru: "терять", pron: ["luːz", "lɒst", "lɒst"] },
  { base: "make", past: "made", pp: "made", ru: "делать", pron: ["meɪk", "meɪd", "meɪd"] },
  { base: "meet", past: "met", pp: "met", ru: "встречать", pron: ["miːt", "met", "met"] },
  { base: "pay", past: "paid", pp: "paid", ru: "платить", pron: ["peɪ", "peɪd", "peɪd"] },
  { base: "put", past: "put", pp: "put", ru: "класть", pron: ["pʊt", "pʊt", "pʊt"] },
  { base: "read", past: "read", pp: "read", ru: "читать", pron: ["riːd", "red", "red"] },
  { base: "ride", past: "rode", pp: "ridden", ru: "ехать", pron: ["raɪd", "rəʊd", "ˈrɪdən"] },
  { base: "run", past: "ran", pp: "run", ru: "бежать", pron: ["rʌn", "ræn", "rʌn"] },
  { base: "say", past: "said", pp: "said", ru: "говорить", pron: ["seɪ", "sed", "sed"] },
  { base: "see", past: "saw", pp: "seen", ru: "видеть", pron: ["siː", "sɔː", "siːn"] },
  { base: "sell", past: "sold", pp: "sold", ru: "продавать", pron: ["sel", "səʊld", "səʊld"] },
  { base: "send", past: "sent", pp: "sent", ru: "отправлять", pron: ["send", "sent", "sent"] },
  { base: "show", past: "showed", pp: "shown", ru: "показывать", pron: ["ʃəʊ", "ʃəʊd", "ʃəʊn"] },
  { base: "sing", past: "sang", pp: "sung", ru: "петь", pron: ["sɪŋ", "sæŋ", "sʌŋ"] },
  { base: "sit", past: "sat", pp: "sat", ru: "сидеть", pron: ["sɪt", "sæt", "sæt"] },
  { base: "sleep", past: "slept", pp: "slept", ru: "спать", pron: ["sliːp", "slept", "slept"] },
  { base: "speak", past: "spoke", pp: "spoken", ru: "говорить", pron: ["spiːk", "spəʊk", "ˈspəʊkən"] },
  { base: "spend", past: "spent", pp: "spent", ru: "тратить", pron: ["spend", "spent", "spent"] },
  { base: "stand", past: "stood", pp: "stood", ru: "стоять", pron: ["stænd", "stʊd", "stʊd"] },
  { base: "swim", past: "swam", pp: "swum", ru: "плавать", pron: ["swɪm", "swæm", "swʌm"] },
  { base: "take", past: "took", pp: "taken", ru: "брать", pron: ["teɪk", "tʊk", "ˈteɪkən"] },
  { base: "teach", past: "taught", pp: "taught", ru: "учить", pron: ["tiːtʃ", "tɔːt", "tɔːt"] },
  { base: "tell", past: "told", pp: "told", ru: "рассказывать", pron: ["tel", "təʊld", "təʊld"] },
  { base: "think", past: "thought", pp: "thought", ru: "думать", pron: ["θɪŋk", "θɔːt", "θɔːt"] },
  { base: "throw", past: "threw", pp: "thrown", ru: "бросать", pron: ["θrəʊ", "θruː", "θrəʊn"] },

  { base: "wake", past: "woke", pp: "woken", ru: "просыпаться", pron: ["weɪk", "wəʊk", "ˈwəʊkən"] },
  { base: "wear", past: "wore", pp: "worn", ru: "носить", pron: ["weə", "wɔː", "wɔːn"] },
  { base: "win", past: "won", pp: "won", ru: "побеждать", pron: ["wɪn", "wʌn", "wʌn"] },
  { base: "write", past: "wrote", pp: "written", ru: "писать", pron: ["raɪt", "rəʊt", "ˈrɪtən"] },
];

const MODES = { TABLE: "table", CARDS: "cards" };

const V = {
  pageBg:    "linear-gradient(160deg, #110d22 0%, #0c1428 55%, #130e20 100%)",
  headerBg:  "linear-gradient(90deg, #1a1040 0%, #0f1e3a 100%)",
  panelBg:   "linear-gradient(145deg, #1c1238 0%, #111b30 100%)",
  rowEven:   "rgba(167,139,250,.04)",
  rowOdd:    "rgba(100,160,255,.03)",
  col1:  "#e0d4ff",
  col2:  "#a78bfa",
  col3:  "#67e8f9",
  col4:  "#fbbf24",
  bdr:    "rgba(167,139,250,.22)",
  bdrDim: "rgba(167,139,250,.10)",
  hCol1: "rgba(224,212,255,.6)",
  hCol2: "rgba(167,139,250,.6)",
  hCol3: "rgba(103,232,249,.6)",
  hCol4: "rgba(251,191,36,.6)",
  accent:       "#a78bfa",
  accent2:      "#c4b5fd",
  accentDim:    "rgba(167,139,250,.18)",
  accentBorder: "rgba(167,139,250,.4)",
  text:      "#f1eeff",
  textDim:   "#7c6fa0",
  textFaint: "#3a3058",
  green: "#86efac",
};

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const clean = text.replace("/", " or ");
  const trySpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const gbVoice = voices.find(v =>
      v.lang === "en-GB" || v.name.includes("Daniel") || v.name.includes("British")
    );
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = "en-GB"; u.rate = 0.82;
    if (gbVoice) u.voice = gbVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };
  if (window.speechSynthesis.getVoices().length) trySpeak();
  else window.speechSynthesis.onvoiceschanged = trySpeak;
}

function SpeakBtn({ text }) {
  return (
    <button onClick={(e) => { e.stopPropagation(); speak(text); }}
      style={{ background: "none", border: "none", cursor: "pointer",
        padding: "1px 3px", color: V.accent, fontSize: "11px",
        lineHeight: 1, opacity: 0.65, flexShrink: 0 }}
      title="British English">🔊</button>
  );
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [mode, setMode] = useState(MODES.TABLE);
  const [search, setSearch] = useState("");
  const [learned, setLearned] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("lrnd") || "[]")); }
    catch { return new Set(); }
  });
  const [filterLearned, setFilterLearned] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cardOrder, setCardOrder] = useState(() => shuffle(verbs.map((_, i) => i)));

  const saveLearned = (s) => { setLearned(s); localStorage.setItem("lrnd", JSON.stringify([...s])); };
  const toggleLearned = (base) => {
    const s = new Set(learned);
    s.has(base) ? s.delete(base) : s.add(base);
    saveLearned(s);
  };

  const filtered = verbs.filter(v =>
    (!filterLearned || !learned.has(v.base)) &&
    (search === "" ||
      v.base.includes(search.toLowerCase()) ||
      v.past.includes(search.toLowerCase()) ||
      v.pp.includes(search.toLowerCase()) ||
      v.ru.includes(search.toLowerCase()))
  );

  const cardVerb = verbs[cardOrder[cardIndex % cardOrder.length]];

  return (
    <div style={{ minHeight: "100vh", background: V.pageBg, color: V.text, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0e0b1a; }
        ::-webkit-scrollbar-thumb { background: #2a1f50; border-radius: 3px; }
        .vrow { transition: filter .12s; }
        .vrow:hover { filter: brightness(1.2); }
        input:focus { outline: none; }
        .card-flip { perspective: 900px; }
        .card-inner { position:relative; width:100%; height:100%; transform-style:preserve-3d; transition:transform .45s cubic-bezier(.4,2,.55,.44); }
        .card-inner.flipped { transform:rotateY(180deg); }
        .card-face { position:absolute; width:100%; height:100%; backface-visibility:hidden; -webkit-backface-visibility:hidden; border-radius:18px; }
        .card-back { transform:rotateY(180deg); }
        @keyframes fadein { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:none} }
        .fin { animation: fadein .22s ease; }
        button { cursor: pointer; font-family: inherit; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: V.headerBg,
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${V.bdr}`,
        padding: "12px 20px",
        display: "flex", alignItems: "center", gap: "16px",
      }}>
        <div>
          <div style={{
            fontSize: "28px", fontWeight: 700, lineHeight: 1,
            background: "linear-gradient(90deg, #e0d4ff, #67e8f9)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-.5px",
          }}>
            Irregular Verbs
          </div>

        </div>

        {/* Mode tabs */}
        <div style={{
          marginLeft: "auto", display: "flex", gap: "3px",
          background: "rgba(0,0,0,.3)", border: `1px solid ${V.bdrDim}`,
          borderRadius: "10px", padding: "3px",
        }}>
          {[
            { id: MODES.TABLE, label: "📋 Таблица" },
            { id: MODES.CARDS, label: "🃏 Карточки" },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{
              background: mode === m.id
                ? "rgba(251,146,60,.18)"
                : "transparent",
              border: `1px solid ${mode === m.id ? "rgba(251,146,60,.6)" : "transparent"}`,
              color: mode === m.id ? "#fb923c" : "#a0836a",
              padding: "5px 16px", borderRadius: "7px",
              fontSize: "13px", fontWeight: mode === m.id ? 700 : 400,
              transition: "all .18s",
            }}>{m.label}</button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding: "14px 16px" }}>

        {/* ══ TABLE ══ */}
        {mode === MODES.TABLE && (
          <div className="fin">
            {/* Search */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px", alignItems: "center" }}>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Поиск..."
                style={{
                  flex: 1, background: "rgba(255,255,255,.05)",
                  border: `1px solid rgba(251,146,60,.25)`, borderRadius: "8px",
                  padding: "8px 14px", color: "#fb923c", fontSize: "14px",
                }}
              />
              <button onClick={() => setFilterLearned(f => !f)} style={{
                background: filterLearned ? "rgba(251,146,60,.15)" : "rgba(255,255,255,.05)",
                border: `1px solid ${filterLearned ? "rgba(251,146,60,.6)" : "rgba(251,146,60,.25)"}`,
                color: "#fb923c",
                padding: "8px 12px", borderRadius: "8px", fontSize: "13px",
                whiteSpace: "nowrap", transition: "all .18s", fontWeight: filterLearned ? 700 : 400,
              }}>
                {filterLearned ? "✓ Не выученные" : "Все"}
              </button>
              <span style={{ color: V.textFaint, fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
                {filtered.length}
              </span>
            </div>

            {/* Table */}
            <div style={{
              background: V.panelBg, border: `1px solid ${V.bdr}`,
              borderRadius: "14px", overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,.4)",
            }}>
              {/* Header */}
              <div style={{
                display: "grid", gridTemplateColumns: "0.9fr 0.9fr 1fr 1.1fr 26px",
                background: "linear-gradient(90deg, rgba(167,139,250,.12), rgba(103,232,249,.08))",
                borderBottom: `1px solid ${V.bdr}`,
                padding: "9px 12px", gap: "6px",
              }}>
                {[
                  { label: "Инфинитив",      color: V.hCol1 },
                  { label: "Past Simple",     color: V.hCol2 },
                  { label: "Past Participle", color: V.hCol3 },
                  { label: "Перевод",         color: V.hCol4 },
                  { label: "",               color: "transparent" },
                ].map((h, i) => (
                  <div key={i} style={{
                    fontSize: "10px", color: h.color, letterSpacing: "1px",
                    textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                  }}>{h.label}</div>
                ))}
              </div>

              {/* Rows */}
              {filtered.map((v, i) => (
                <div key={v.base} className="vrow" style={{
                  display: "grid", gridTemplateColumns: "0.9fr 0.9fr 1fr 1.1fr 26px",
                  padding: "7px 12px", gap: "6px", alignItems: "start",
                  borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none",
                  background: learned.has(v.base)
                    ? "rgba(134,239,172,.05)"
                    : i % 2 === 0 ? V.rowEven : V.rowOdd,
                  transition: "background .12s",
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                      <span style={{ color: V.col1, fontWeight: 700, fontSize: "15px" }}>{v.base}</span>
                      <SpeakBtn text={v.base} />
                    </div>
                    <div style={{ fontSize: "10px", color: V.textDim, fontFamily: "'JetBrains Mono', monospace", marginTop: "1px" }}>/{v.pron[0]}/</div>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                      <span style={{ color: V.col2, fontWeight: 600, fontSize: "15px" }}>{v.past}</span>
                      <SpeakBtn text={v.past} />
                    </div>
                    <div style={{ fontSize: "10px", color: V.textDim, fontFamily: "'JetBrains Mono', monospace", marginTop: "1px" }}>/{v.pron[1]}/</div>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                      <span style={{ color: V.col3, fontWeight: 600, fontSize: "15px" }}>{v.pp}</span>
                      <SpeakBtn text={v.pp} />
                    </div>
                    <div style={{ fontSize: "10px", color: V.textDim, fontFamily: "'JetBrains Mono', monospace", marginTop: "1px" }}>/{v.pron[2]}/</div>
                  </div>
                  <div style={{ color: V.col4, fontSize: "13px", fontStyle: "italic", paddingTop: "1px", overflow: "hidden", wordBreak: "break-all", lineHeight: 1.3, minWidth: 0 }}>{v.ru}</div>
                  <button onClick={() => toggleLearned(v.base)} style={{
                    background: "none", border: "none", fontSize: "15px",
                    color: learned.has(v.base) ? V.green : V.textFaint,
                    transition: "color .18s", paddingTop: "2px",
                  }}>✓</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ CARDS ══ */}
        {mode === MODES.CARDS && (
          <div className="fin" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", paddingTop: "8px" }}>
            <div style={{ color: V.textDim, fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
              {cardIndex % cardOrder.length + 1} / {cardOrder.length} · нажми чтобы перевернуть
            </div>

            <div className="card-flip" style={{ width: "min(420px, 100%)", height: "260px", cursor: "pointer" }}
              onClick={() => setFlipped(f => !f)}>
              <div className={`card-inner${flipped ? " flipped" : ""}`}>
                <div className="card-face" style={{
                  background: "linear-gradient(145deg, #1c1238, #111b30)",
                  border: `1px solid ${V.accentBorder}`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px",
                  boxShadow: "0 8px 40px rgba(167,139,250,.15)",
                }}>
                  <div style={{ fontSize: "11px", color: V.textDim, letterSpacing: "2px", textTransform: "uppercase" }}>Инфинитив</div>
                  <div style={{ fontSize: "52px", fontWeight: 700, color: V.col1, letterSpacing: "-1px" }}>{cardVerb.base}</div>
                  <div style={{ fontSize: "13px", color: V.textDim, fontFamily: "'JetBrains Mono', monospace" }}>/{cardVerb.pron[0]}/</div>
                  <div style={{ fontSize: "16px", color: V.col4, fontStyle: "italic" }}>{cardVerb.ru}</div>
                  <SpeakBtn text={cardVerb.base} />
                </div>
                <div className="card-face card-back" style={{
                  background: "linear-gradient(145deg, #1a1040, #0f1e3a)",
                  border: "1px solid rgba(103,232,249,.35)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px",
                  boxShadow: "0 8px 40px rgba(103,232,249,.12)", padding: "24px",
                }}>
                  {[
                    { label: "Инфинитив",      val: cardVerb.base, pron: cardVerb.pron[0], color: V.col1 },
                    { label: "Past Simple",     val: cardVerb.past, pron: cardVerb.pron[1], color: V.col2 },
                    { label: "Past Participle", val: cardVerb.pp,   pron: cardVerb.pron[2], color: V.col3 },
                  ].map(row => (
                    <div key={row.label} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: V.textFaint, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1px" }}>{row.label}</div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                        <span style={{ fontSize: "22px", fontWeight: 700, color: row.color }}>{row.val}</span>
                        <SpeakBtn text={row.val} />
                      </div>
                      <div style={{ fontSize: "11px", color: V.textDim, fontFamily: "'JetBrains Mono', monospace" }}>/{row.pron}/</div>
                    </div>
                  ))}
                  <div style={{ fontSize: "14px", color: V.col4, fontStyle: "italic", marginTop: "2px" }}>{cardVerb.ru}</div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button onClick={() => { setCardIndex(i => (i - 1 + cardOrder.length) % cardOrder.length); setFlipped(false); }} style={{
                background: "rgba(255,255,255,.05)", border: `1px solid ${V.bdrDim}`,
                color: V.textDim, padding: "8px 18px", borderRadius: "8px", fontSize: "18px",
              }}>←</button>
              <button onClick={() => toggleLearned(cardVerb.base)} style={{
                background: learned.has(cardVerb.base) ? "rgba(134,239,172,.12)" : "rgba(255,255,255,.05)",
                border: `1px solid ${learned.has(cardVerb.base) ? V.green : V.bdrDim}`,
                color: learned.has(cardVerb.base) ? V.green : V.textDim,
                padding: "8px 16px", borderRadius: "8px", fontSize: "13px", transition: "all .18s",
              }}>{learned.has(cardVerb.base) ? "✓ Выучено" : "Отметить"}</button>
              <button onClick={() => { setCardIndex(i => (i + 1) % cardOrder.length); setFlipped(false); }} style={{
                background: "rgba(255,255,255,.05)", border: `1px solid ${V.bdrDim}`,
                color: V.textDim, padding: "8px 18px", borderRadius: "8px", fontSize: "18px",
              }}>→</button>
            </div>
            <button onClick={() => { setCardOrder(shuffle(verbs.map((_, i) => i))); setCardIndex(0); setFlipped(false); }} style={{
              background: "none", border: "none", color: V.textFaint, fontSize: "12px",
            }}>🔀 Перемешать</button>
          </div>
        )}

      </div>
    </div>
  );
}
