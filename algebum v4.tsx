import { useState } from "react";

// ─── PALETTE ──────────────────────────────────────────────────
const C = {
  bg:"#1a0a2e", surface:"#210d3f", card:"#2d1259", card2:"#3a186e",
  border:"rgba(130,90,255,.25)", a1:"#8B2FE8", a2:"#B44FF0", a3:"#CF8FF5",
  neon:"#D44FE8", gold:"#f59e0b", green:"#4DB848", red:"#f43f5e",
  text:"#e8e0ff", muted:"#8b7fc4",
};

// ─── GLOBAL CSS ───────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Unbounded:wght@700;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
body{background:${C.bg};}
::-webkit-scrollbar{width:0;height:0;}
.app-root{font-family:'Nunito',sans-serif;background:${C.bg};color:${C.text};height:100vh;max-width:430px;margin:0 auto;display:flex;flex-direction:column;overflow:hidden;position:relative;}
.scroll-body{flex:1;overflow-y:auto;overflow-x:hidden;padding:0 16px 110px;}
.blob1{position:absolute;top:-120px;left:-80px;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,255,.3) 0%,transparent 70%);pointer-events:none;z-index:0;animation:pulse 6s ease-in-out infinite alternate;}
.blob2{position:absolute;bottom:-100px;right:-60px;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(224,64,251,.2) 0%,transparent 70%);pointer-events:none;z-index:0;animation:pulse 8s ease-in-out infinite alternate-reverse;}
@keyframes pulse{from{transform:scale(1)}to{transform:scale(1.15)}}
.fade{animation:fadeIn .3s ease both;}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.xp-fill{height:100%;border-radius:6px;width:65%;background:linear-gradient(to right,${C.a1},${C.neon});animation:xpGrow 1.2s cubic-bezier(.22,1,.36,1) both;}
@keyframes xpGrow{from{width:0}}
.donut-fill{fill:none;stroke:url(#dg);stroke-width:8;stroke-linecap:round;stroke-dasharray:220;stroke-dashoffset:48;animation:donutAnim 1.5s cubic-bezier(.22,1,.36,1) both;}
@keyframes donutAnim{from{stroke-dashoffset:220}to{stroke-dashoffset:48}}
.confetti-item{position:absolute;border-radius:3px;animation:fall 3s ease-in infinite;opacity:.8;}
@keyframes fall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}
.trophy-anim{animation:trophyIn 1s cubic-bezier(.34,1.56,.64,1) both;}
@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes trophyIn{from{transform:scale(0) rotate(-20deg)}to{transform:scale(1) rotate(0deg)}}
.tap:active{transform:scale(.97);opacity:.85;}
.ripple{transition:background .2s;}
`;

// ─── DATA ─────────────────────────────────────────────────────
const FORMULA_TOPICS = [
  {
    icon:"x²", title:"Квадратные выражения", count:12, grad:["#8B2FE8","#B44FF0"],
    formulas:[
      {tag:"(a+b)²", expr:"(a+b)² = a² + 2ab + b²", explain:"Квадрат суммы двух выражений равен квадрату первого плюс удвоенное произведение первого и второго плюс квадрат второго.", example:"(x+3)² = x²+6x+9", hint:"Площадь квадрата со стороной (a+b)"},
      {tag:"(a−b)²", expr:"(a−b)² = a² − 2ab + b²", explain:"Квадрат разности двух выражений.", example:"(x−4)² = x²−8x+16", hint:"Та же формула, только знак перед 2ab меняется"},
      {tag:"a²−b²", expr:"a² − b² = (a+b)(a−b)", explain:"Разность квадратов раскладывается в произведение суммы и разности.", example:"x²−9 = (x+3)(x−3)", hint:"Ищи квадраты — оба слагаемых должны быть степенью 2"},
      {tag:"(a+b)³", expr:"(a+b)³ = a³+3a²b+3ab²+b³", explain:"Куб суммы двух выражений.", example:"(x+1)³ = x³+3x²+3x+1", hint:"Коэффициенты: 1 3 3 1 — строка треугольника Паскаля"},
    ]
  },
  {
    icon:"ax²", title:"Квадратные уравнения", count:9, grad:["#be185d","#D44FE8"],
    formulas:[
      {tag:"D", expr:"D = b² − 4ac", explain:"Дискриминант определяет количество корней квадратного уравнения.", example:"x²−5x+6=0 → D=25−24=1", hint:"D>0: два корня, D=0: один корень, D<0: нет корней"},
      {tag:"x₁₂", expr:"x = (−b ± √D) / 2a", explain:"Формула корней квадратного уравнения ax²+bx+c=0.", example:"x²−5x+6=0 → x=(5±1)/2 → x=3 или x=2", hint:"Сначала считай D, потом подставляй"},
      {tag:"Вьет", expr:"x₁+x₂ = −b/a,  x₁·x₂ = c/a", explain:"Теорема Виета связывает корни с коэффициентами.", example:"x²−5x+6=0 → сумма=5, произведение=6", hint:"Подбери два числа с нужной суммой и произведением"},
    ]
  },
  {
    icon:"<>", title:"Неравенства", count:8, grad:["#dc2626","#f97316"],
    formulas:[
      {tag:"линейн.", expr:"ax + b > 0  →  x > −b/a  (при a>0)", explain:"При делении или умножении на отрицательное число знак неравенства меняется.", example:"2x−6>0 → x>3", hint:"Следи за знаком коэффициента при x!"},
      {tag:"квадр.", expr:"ax²+bx+c > 0: метод интервалов", explain:"Найди корни, расставь знаки на интервалах числовой оси.", example:"x²−x−6>0 → (x−3)(x+2)>0 → x<−2 или x>3", hint:"Нарисуй числовую ось и расставь корни"},
    ]
  },
  {
    icon:"f(x)", title:"Функции и графики", count:11, grad:["#0891b2","#4DB848"],
    formulas:[
      {tag:"линейн.", expr:"y = kx + b", explain:"k — угловой коэффициент (наклон), b — смещение по оси Y.", example:"y=2x+1: наклон вверх, пересекает Y в точке (0,1)", hint:"k>0 — возрастает, k<0 — убывает"},
      {tag:"парабола", expr:"y = ax² + bx + c", explain:"Парабола: вершина при x=−b/2a. При a>0 ветви вверх, a<0 — вниз.", example:"y=x²−4x+3, вершина x=2, y=−1", hint:"Вершина параболы — минимум или максимум функции"},
      {tag:"гипербола", expr:"y = k/x", explain:"Обратная пропорциональность. График — гипербола.", example:"y=6/x: при x=2, y=3", hint:"k>0 — в I и III четвертях, k<0 — во II и IV"},
    ]
  },
  {
    icon:"√x", title:"Степени и корни", count:10, grad:["#d97706","#f59e0b"],
    formulas:[
      {tag:"aⁿ·aᵐ", expr:"aⁿ · aᵐ = aⁿ⁺ᵐ", explain:"При умножении степеней с одинаковым основанием показатели складываются.", example:"x³·x⁴ = x⁷", hint:"Одинаковые основания — складывай степени"},
      {tag:"aⁿ/aᵐ", expr:"aⁿ / aᵐ = aⁿ⁻ᵐ", explain:"При делении степеней с одинаковым основанием показатели вычитаются.", example:"x⁷/x³ = x⁴", hint:"Делишь — вычитай степени"},
      {tag:"√a·√b", expr:"√a · √b = √(ab)", explain:"Корень из произведения равен произведению корней.", example:"√12 = √4·√3 = 2√3", hint:"Выноси квадратный множитель за знак корня"},
    ]
  },
  {
    icon:"aₙ", title:"Прогрессии", count:7, grad:["#065f46","#4DB848"],
    formulas:[
      {tag:"aₙ АП", expr:"aₙ = a₁ + (n−1)·d", explain:"n-й член арифметической прогрессии через первый член и разность.", example:"a₁=2, d=3: a₅=2+4·3=14", hint:"d — разность соседних членов"},
      {tag:"Sₙ АП", expr:"Sₙ = n(a₁+aₙ)/2", explain:"Сумма первых n членов арифметической прогрессии.", example:"1+2+…+10 = 10·11/2 = 55", hint:"Первый плюс последний, умножь на n, раздели на 2"},
      {tag:"bₙ ГП", expr:"bₙ = b₁ · qⁿ⁻¹", explain:"n-й член геометрической прогрессии. q — знаменатель прогрессии.", example:"b₁=3, q=2: b₄=3·2³=24", hint:"q>1 — растёт, 0<q<1 — убывает"},
    ]
  },
];

const QUESTIONS = [
  {expr:"(2a − b)²", hint:"Квадрат разности: (a−b)²=a²−2ab+b². Подставь a=2a, b=b.", answers:["4a²−4ab+b²","4a²+4ab+b²","2a²−2ab+b²","2a²−b²"], correct:0, hint:"Формула квадрата разности: (a−b)²=a²−2ab+b². Здесь a=2a, b=b"},
  {expr:"(a + b)²", hint:"Квадрат суммы: (a+b)²=a²+2ab+b². Не забудь удвоенное произведение!",  answers:["a²+b²","a²−2ab+b²","a²+2ab+b²","2a+2b"], correct:2},
  {expr:"a²−b²", hint:"Разность квадратов: a²−b²=(a+b)(a−b). Два квадрата — два множителя.",     answers:["(a+b)²","(a−b)²","(a+b)(a−b)","(a−b)(a+b)²"], correct:2},
  {expr:"D = ?", hint:"Дискриминант: D=b²−4ac. Знак D говорит о количестве корней.",      answers:["b²+4ac","b²−4ac","−b/2a","√(b²−4ac)"], correct:1},
  {expr:"(3x+2)²", hint:"Квадрат суммы: (a+b)²=a²+2ab+b². Здесь a=3x, b=2.",   answers:["9x²+4","9x²+12x+4","9x²−12x+4","6x+4"], correct:1},
  {expr:"(5−y)²", hint:"Квадрат разности: (a−b)²=a²−2ab+b². Здесь a=5, b=y.",    answers:["25−10y+y²","25+10y+y²","25−y²","10−2y"], correct:0},
  {expr:"x³·x⁴ = ?", hint:"При умножении степеней с одинаковым основанием показатели складываются: aⁿ·aᵐ=aⁿ⁺ᵐ.", answers:["x⁷","x¹²","2x⁷","x"], correct:0},
  {expr:"√4·√9 = ?", hint:"Корень из произведения: √a·√b=√(ab). Или посчитай каждый корень отдельно.", answers:["√13","6","5","36"], correct:1},
  {expr:"aₙ АП, d=3, a₁=1, n=5", hint:"Формула n-го члена АП: aₙ=a₁+(n−1)·d. Подставь значения.", answers:["13","15","14","12"], correct:0},
  {expr:"(a−b)(a+b) = ?", hint:"Разность квадратов: (a−b)(a+b)=a²−b². Классическая формула!", answers:["a²+b²","a²−b²","a²+2ab−b²","2ab"], correct:1},
];

const TOPICS_STATS = [
  {name:"Квадратные выражения", pct:90, grad:["#8B2FE8","#B44FF0"]},
  {name:"Квадратные уравнения", pct:80, grad:["#be185d","#D44FE8"]},
  {name:"Неравенства",          pct:70, grad:["#dc2626","#f97316"]},
  {name:"Функции и графики",    pct:65, grad:["#0891b2","#4DB848"]},
  {name:"Степени и корни",      pct:60, grad:["#d97706","#f59e0b"]},
  {name:"Прогрессии",           pct:50, grad:["#065f46","#4DB848"]},
];

const ACHIEVEMENTS = [
  {icon:"🌱",name:"Первые шаги",   desc:"Пройди 5 тестов",       pct:100,locked:false},
  {icon:"⭐",name:"Знаток формул", desc:"Изучи 50 формул",       pct:100,locked:false},
  {icon:"🎓",name:"Отличник",      desc:"100% в тесте",          pct:100,locked:false},
  {icon:"🔥",name:"7 дней подряд", desc:"Серия 7 дней",          pct:100,locked:false},
  {icon:"⏱️",name:"Скорость",      desc:"10 вопросов за минуту", pct:70, locked:false},
  {icon:"👑",name:"Мастер",        desc:"Достигни уровня 10",    pct:70, locked:true },
  {icon:"🔒",name:"К вершине",     desc:"Набери 5000 XP",        pct:13, locked:true },
  {icon:"🔒",name:"Битва умов",    desc:"Выиграй 10 турниров",   pct:0,  locked:true },
  {icon:"🔒",name:"Легенда",       desc:"Все формулы изучены",   pct:0,  locked:true },
];

const LEADERBOARD = [
  {name:"Алексей Смирнов",  level:9, xp:2450, me:false},
  {name:"Ты (Максим)",       level:7, xp:1980, me:true },
  {name:"Мария Иванова",    level:8, xp:1760, me:false},
  {name:"Даниил Кузнецов",  level:7, xp:1540, me:false},
  {name:"Екатерина Орлова", level:6, xp:1380, me:false},
  {name:"Игорь Петров",     level:6, xp:1200, me:false},
];

const TOTAL_Q = 10;

// ─── HELPERS ──────────────────────────────────────────────────
const grad = (c1,c2,deg=135) => `linear-gradient(${deg}deg,${c1},${c2})`;
const card = (extra={}) => ({background:grad(C.card,C.card2), border:`1px solid ${C.border}`, borderRadius:18, ...extra});
const pill = (txt,active) => ({
  flexShrink:0, padding:"7px 15px", borderRadius:20,
  background: active ? grad(C.a1,C.a2) : C.card,
  border:`1px solid ${active?"transparent":C.border}`,
  fontSize:12, fontWeight:700, cursor:"pointer",
  color: active ? "#fff" : C.muted,
  boxShadow: active ? `0 4px 14px rgba(124,58,255,.4)` : "none",
});

// ─── SHARED UI ────────────────────────────────────────────────
function Btn({children, onClick, style={}, variant="primary"}) {
  const base = {border:"none", borderRadius:12, padding:"14px 20px", fontFamily:"'Nunito',sans-serif", fontSize:15, fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:".2s"};
  const variants = {
    primary: {background:grad(C.a1,C.a2), color:"#fff", boxShadow:`0 4px 18px rgba(124,58,255,.4)`},
    secondary: {background:C.card, border:`1px solid ${C.border}`, color:C.text},
    ghost: {background:"transparent", color:C.a3},
  };
  return <div className="tap" onClick={onClick} style={{...base,...variants[variant],...style}}>{children}</div>;
}

function BackHeader({title, onBack, right=null}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px 8px",flexShrink:0,zIndex:10,position:"relative"}}>
      <div className="tap" onClick={onBack} style={{width:36,height:36,borderRadius:10,background:C.card,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:20}}>←</div>
      <div style={{flex:1,fontFamily:"'Unbounded',sans-serif",fontSize:15}}>{title}</div>
      {right}
    </div>
  );
}

function BottomNav({active, go}) {
  const items = [{id:"home",icon:"🏠",label:"Главная"},{id:"formulas",icon:"∑",label:"Формулы"},{id:"training",icon:"⚡",label:"Тренировка"},{id:"stats",icon:"👤",label:"Профиль"}];
  return (
    <div style={{display:"flex",background:C.surface,borderTop:`1px solid ${C.border}`,padding:"10px 0 16px",flexShrink:0,zIndex:100,position:"relative"}}>
      {items.map(it => (
        <div key={it.id} className="tap" onClick={()=>go(it.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer"}}>
          <span style={{fontSize:22,lineHeight:1,filter:active===it.id?`drop-shadow(0 0 6px ${C.a2})`:""}}>{it.icon}</span>
          <span style={{fontSize:10,fontWeight:700,color:active===it.id?C.a3:C.muted}}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

function SectionTitle({children, mt=20}) {
  return <div style={{fontFamily:"'Unbounded',sans-serif",fontSize:11,color:C.muted,letterSpacing:".1em",margin:`${mt}px 0 10px`,textTransform:"uppercase"}}>{children}</div>;
}

// ─── HOME ─────────────────────────────────────────────────────
function HomeScreen({go}) {
  const menu = [
    {id:"formulas",    icon:"📐",bg:["#8B2FE8","#B44FF0"],title:"УЧИТЬ ФОРМУЛЫ",  sub:"Изучай и запоминай",  badge:null},
    {id:"training",    icon:"🎯",bg:["#be185d","#D44FE8"],title:"ТРЕНИРОВКА",      sub:"Тесты и экзамены",    badge:"+3"},
    {id:"leaderboard", icon:"🏅",bg:["#d97706","#f59e0b"],title:"ТУРНИР",          sub:"Сразись с другими",   badge:null},
    {id:"stats",       icon:"📊",bg:["#0891b2","#4DB848"],title:"СТАТИСТИКА",      sub:"Следи за прогрессом", badge:null},
    {id:"achievements",icon:"🏆",bg:["#8B2FE8","#CF8FF5"],title:"ДОСТИЖЕНИЯ",      sub:"Открывай награды",    badge:"2"},
    {id:"settings",    icon:"⚙️",bg:["#374151","#6b7280"],title:"НАСТРОЙКИ",       sub:"Персонализация",      badge:null},
  ];
  return (
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px 10px",flexShrink:0,zIndex:10,position:"relative"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <img src="data:image/png;base64,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" alt="Знаторика" style={{width:52,height:52,borderRadius:14,objectFit:"cover",flexShrink:0,boxShadow:"0 0 20px rgba(139,47,232,.6)"}}/>
          <div>
            <div style={{fontFamily:"'Unbounded',sans-serif",fontSize:17,letterSpacing:".02em"}}>ЗНАТОРИКА</div>
            <div style={{fontSize:10,color:C.muted}}>Знания в игре.</div>
          </div>
        </div>
        <div className="tap" style={{width:36,height:36,borderRadius:10,background:C.card,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,position:"relative",cursor:"pointer"}}>
          🔔<div style={{position:"absolute",top:-3,right:-3,width:8,height:8,borderRadius:"50%",background:C.neon,border:`2px solid ${C.bg}`}}/>
        </div>
      </div>
      <div className="scroll-body">
        {/* User card */}
        <div className="fade" style={{...card({padding:16,margin:"4px 0 16px",boxShadow:`0 8px 32px rgba(124,58,255,.15)`}),display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:52,height:52,borderRadius:"50%",background:grad(C.a1,C.neon),display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:`0 0 16px rgba(224,64,251,.4)`,flexShrink:0}}>🐿️</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:800,fontSize:15}}>Максим</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:6}}>⚡ Уровень 7 · Знаток</div>
            <div style={{background:"rgba(255,255,255,.1)",borderRadius:6,height:6,overflow:"hidden"}}><div className="xp-fill"/></div>
            <div style={{fontSize:10,color:C.muted,marginTop:4}}>650 / 1000 XP</div>
          </div>
          <div style={{background:"linear-gradient(135deg,#8B2FE8,#B44FF0)",borderRadius:10,padding:"6px 10px",textAlign:"center",boxShadow:`0 4px 14px rgba(139,47,232,.4)`}}>
            <div style={{fontSize:9,color:"rgba(255,255,255,.8)"}}>КЛАССЫ</div>
            <div style={{fontFamily:"'Unbounded',sans-serif",fontSize:13,fontWeight:900}}>6–11</div>
          </div>
        </div>

        {/* Daily streak */}
        <div className="fade" style={{background:`linear-gradient(135deg,rgba(245,158,11,.15),rgba(249,115,22,.1))`,border:`1px solid rgba(245,158,11,.3)`,borderRadius:14,padding:"12px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:12,animationDelay:".05s"}}>
          <span style={{fontSize:28}}>🔥</span>
          <div>
            <div style={{fontWeight:800,fontSize:14}}>Серия 12 дней!</div>
            <div style={{fontSize:11,color:C.muted}}>Занимайся каждый день, чтобы не потерять серию</div>
          </div>
          <div style={{marginLeft:"auto",fontFamily:"'Unbounded',sans-serif",fontSize:20,fontWeight:900,color:C.gold}}>12</div>
        </div>

        <SectionTitle mt={4}>Разделы</SectionTitle>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {menu.map((it,i) => (
            <div key={it.id} className="tap fade" onClick={()=>go(it.id)}
              style={{animationDelay:`${i*0.05}s`,display:"flex",alignItems:"center",gap:14,padding:"14px 16px",background:C.card,border:`1px solid ${C.border}`,borderRadius:16,cursor:"pointer"}}>
              <div style={{width:42,height:42,borderRadius:12,background:grad(it.bg[0],it.bg[1]),display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{it.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:14}}>{it.title}</div>
                <div style={{fontSize:11,color:C.muted}}>{it.sub}</div>
              </div>
              {it.badge&&<div style={{background:C.neon,color:"#fff",borderRadius:8,padding:"2px 8px",fontSize:10,fontWeight:900}}>{it.badge}</div>}
              <div style={{color:C.muted,fontSize:20}}>›</div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="home" go={go}/>
    </>
  );
}

// ─── FORMULAS LIST ────────────────────────────────────────────
function FormulasScreen({go}) {
  const [cls,setCls] = useState(2);
  const classes = ["6 класс","7 класс","8 класс","9 класс","10–11"];
  return (
    <>
      <BackHeader title="ФОРМУЛЫ" onBack={()=>go("home")}
        right={<div className="tap" style={{width:36,height:36,borderRadius:10,background:C.card,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,cursor:"pointer"}}>🔍</div>}/>
      <div className="scroll-body">
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:6,marginBottom:16}}>
          {classes.map((c,i)=><div key={i} className="tap" onClick={()=>setCls(i)} style={pill(c,cls===i)}>{c}</div>)}
        </div>
        {FORMULA_TOPICS.map((t,i)=>(
          <div key={i} className="tap fade" onClick={()=>go("topic",{topicIdx:i})}
            style={{animationDelay:`${i*0.05}s`,display:"flex",alignItems:"center",gap:14,padding:14,background:C.card,border:`1px solid ${C.border}`,borderRadius:18,marginBottom:10,cursor:"pointer"}}>
            <div style={{width:48,height:48,borderRadius:14,background:grad(t.grad[0],t.grad[1]),display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,fontFamily:"'Unbounded',sans-serif",flexShrink:0,color:"#fff"}}>{t.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:14}}>{t.title}</div>
              <div style={{fontSize:11,color:C.muted,margin:"2px 0"}}>{t.formulas[0].expr}</div>
              <div style={{fontSize:10,color:C.a3}}>{t.count} формул</div>
            </div>
            <div style={{color:C.muted,fontSize:20}}>›</div>
          </div>
        ))}
      </div>
      <BottomNav active="formulas" go={go}/>
    </>
  );
}

// ─── TOPIC (formula list) ─────────────────────────────────────
function TopicScreen({go, topicIdx=0}) {
  const topic = FORMULA_TOPICS[topicIdx];
  return (
    <>
      <BackHeader title={topic.title.toUpperCase()} onBack={()=>go("formulas")}/>
      <div className="scroll-body">
        {topic.formulas.map((f,i)=>(
          <div key={i} className="tap fade" onClick={()=>go("detail",{topicIdx,formulaIdx:i})}
            style={{animationDelay:`${i*0.06}s`,padding:16,background:C.card,border:`1px solid ${C.border}`,borderRadius:18,marginBottom:10,cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
              <div style={{background:grad(topic.grad[0],topic.grad[1]),borderRadius:8,padding:"4px 10px",fontSize:12,fontWeight:800,color:"#fff"}}>{f.tag}</div>
              <div style={{fontSize:16,fontWeight:800,flex:1}}>{f.expr}</div>
              <div style={{color:C.muted,fontSize:18}}>›</div>
            </div>
            <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{f.explain.slice(0,70)}…</div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── DETAIL (one formula) ─────────────────────────────────────
function DetailScreen({go, topicIdx=0, formulaIdx=0}) {
  const topic = FORMULA_TOPICS[topicIdx];
  const [fi, setFi] = useState(formulaIdx);
  const f = topic.formulas[fi];
  const total = topic.formulas.length;
  return (
    <>
      <BackHeader title={topic.title.toUpperCase()} onBack={()=>go("topic",{topicIdx})}
        right={<span style={{fontSize:20,cursor:"pointer"}}>🔖</span>}/>
      <div className="scroll-body">
        <div className="fade" style={{...card({padding:22,marginBottom:16,textAlign:"center",boxShadow:`0 8px 32px rgba(124,58,255,.15)`})}}>
          <div style={{display:"inline-block",background:grad(topic.grad[0],topic.grad[1]),borderRadius:8,padding:"4px 14px",fontSize:12,marginBottom:12,color:"#fff",fontWeight:700}}>{f.tag}</div>
          <div style={{fontSize:20,fontWeight:800,lineHeight:1.6}}>{f.expr}</div>
        </div>
        <div className="fade" style={{marginBottom:14,animationDelay:".08s"}}>
          <div style={{fontWeight:800,fontSize:15,marginBottom:6}}>Объяснение</div>
          <div style={{fontSize:13,color:C.muted,lineHeight:1.7}}>{f.explain}</div>
        </div>
        <div className="fade" style={{marginBottom:14,animationDelay:".14s"}}>
          <div style={{fontWeight:800,fontSize:15,marginBottom:6}}>Пример</div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:14,fontSize:14,lineHeight:1.6}}>{f.example}</div>
        </div>
        <div className="fade" style={{background:`linear-gradient(135deg,rgba(124,58,255,.18),rgba(224,64,251,.1))`,border:`1px solid rgba(124,58,255,.4)`,borderRadius:12,padding:14,display:"flex",gap:10,marginBottom:20,animationDelay:".2s"}}>
          <span style={{fontSize:20}}>💡</span>
          <div style={{fontSize:12,lineHeight:1.6,color:C.text}}><strong>Лайфхак:</strong> {f.hint}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div className="tap" onClick={()=>setFi(Math.max(0,fi-1))} style={{width:44,height:44,borderRadius:"50%",background:fi===0?"rgba(255,255,255,.05)":C.card,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:fi===0?"default":"pointer",fontSize:18,opacity:fi===0?.4:1}}>←</div>
          <div style={{fontSize:12,color:C.muted}}>{fi+1} / {total}</div>
          <div className="tap" onClick={()=>setFi(Math.min(total-1,fi+1))} style={{width:44,height:44,borderRadius:"50%",background:fi===total-1?"rgba(255,255,255,.05)":C.card,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:fi===total-1?"default":"pointer",fontSize:18,opacity:fi===total-1?.4:1}}>→</div>
        </div>
      </div>
    </>
  );
}

// ─── HINT POPUP ───────────────────────────────────────────────
function HintPopup({hint, onClose}) {
  return (
    <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.65)",display:"flex",alignItems:"flex-end",zIndex:200,backdropFilter:"blur(4px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",background:"#210d3f",borderTop:"1px solid rgba(130,90,255,.25)",borderRadius:"24px 24px 0 0",padding:24,animation:"slideUp .35s cubic-bezier(.34,1.56,.64,1) both"}}>
        <div style={{width:40,height:4,borderRadius:2,background:"rgba(130,90,255,.3)",margin:"0 auto 20px"}}/>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <div style={{width:44,height:44,borderRadius:14,background:"linear-gradient(135deg,rgba(224,64,251,.25),rgba(124,58,255,.2))",border:"1px solid rgba(224,64,251,.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>💡</div>
          <div>
            <div style={{fontWeight:900,fontSize:16}}>Подсказка</div>
            <div style={{fontSize:11,color:"#8b7fc4"}}>Используй, если застрял</div>
          </div>
        </div>
        <div style={{background:"linear-gradient(135deg,rgba(124,58,255,.18),rgba(224,64,251,.1))",border:"1px solid rgba(124,58,255,.4)",borderRadius:14,padding:16,fontSize:14,lineHeight:1.7,marginBottom:20,color:"#e8e0ff"}}>{hint}</div>
        <div className="tap" onClick={onClose} style={{background:"linear-gradient(135deg,#7c3aff,#a855f7)",borderRadius:12,padding:14,textAlign:"center",fontWeight:800,fontSize:15,cursor:"pointer",color:"#fff",boxShadow:"0 4px 18px rgba(124,58,255,.4)"}}>Понятно!</div>
      </div>
    </div>
  );
}

// ─── TRAINING ─────────────────────────────────────────────────
function TrainingScreen({go}) {
  const [qIdx,setQIdx] = useState(0);
  const [selected,setSelected] = useState(null);
  const [lives,setLives] = useState(3);
  const [correct,setCorrect] = useState(0);
  const [hintOpen,setHintOpen] = useState(false);
  const [hintsLeft,setHintsLeft] = useState(3);
  const q = QUESTIONS[qIdx % QUESTIONS.length];
  const letters = ["A","B","C","D"];

  function pick(i) {
    if (selected!==null) return;
    setSelected(i);
    if (i===q.correct) setCorrect(c=>c+1); else setLives(l=>Math.max(0,l-1));
  }
  function next() {
    if (selected===null) return;
    setHintOpen(false);
    if (qIdx+1>=TOTAL_Q) { go("victory",{correct:correct+(selected===q.correct?0:0),total:TOTAL_Q}); return; }
    setQIdx(v=>v+1); setSelected(null);
  }
  function openHint() {
    if (hintsLeft===0) return;
    setHintsLeft(h=>h-1);
    setHintOpen(true);
  }
  const pct = Math.round(qIdx/TOTAL_Q*100);
  const hint = q.hint || "Вспомни нужную формулу из раздела «Формулы»!";
  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",position:"relative"}}>
      <BackHeader title="ТРЕНИРОВКА" onBack={()=>go("home")}
        right={<div style={{display:"flex",gap:2,fontSize:18}}>{"❤️".repeat(lives)}{"🖤".repeat(3-lives)}</div>}/>
      <div className="scroll-body">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <div style={{flex:1,background:"rgba(255,255,255,.1)",borderRadius:8,height:8,overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:8,width:`${pct}%`,background:grad(C.a1,C.neon,90),transition:"width .5s cubic-bezier(.34,1.56,.64,1)"}}/>
          </div>
          <div style={{fontSize:12,color:C.muted,whiteSpace:"nowrap"}}>Вопрос {qIdx+1} из {TOTAL_Q}</div>
        </div>
        <div style={{...card({padding:24,marginBottom:18,textAlign:"center",boxShadow:"0 8px 32px rgba(124,58,255,.15)"})}}>
          <div style={{fontSize:12,color:C.muted,marginBottom:8}}>Упростите выражение:</div>
          <div style={{fontSize:28,fontWeight:900,lineHeight:1.4}}>{q.expr}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:22}}>
          {q.answers.map((ans,i)=>{
            let bg=C.card,brd=C.border,lBg=C.card2;
            if (selected!==null) {
              if (i===q.correct){bg="rgba(34,211,165,.15)";brd=C.green;lBg=C.green;}
              else if (i===selected){bg="rgba(244,63,94,.15)";brd=C.red;lBg=C.red;}
            }
            return (
              <div key={i} className={selected===null?"tap":""} onClick={()=>pick(i)}
                style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",background:bg,border:`1.5px solid ${brd}`,borderRadius:12,cursor:selected!==null?"default":"pointer",fontSize:14,fontWeight:700,transition:".25s"}}>
                <div style={{width:28,height:28,borderRadius:8,background:lBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,flexShrink:0,color:"#fff"}}>{letters[i]}</div>
                {ans}
                {selected!==null&&i===q.correct&&<span style={{marginLeft:"auto",fontSize:18}}>✓</span>}
              </div>
            );
          })}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div className="tap" onClick={openHint}
            style={{background:hintsLeft>0?"rgba(224,64,251,.12)":"rgba(255,255,255,.04)",border:`1px solid ${hintsLeft>0?"rgba(224,64,251,.35)":"rgba(255,255,255,.08)"}`,borderRadius:12,padding:"10px 16px",display:"inline-flex",alignItems:"center",gap:8,fontSize:13,fontWeight:700,cursor:hintsLeft>0?"pointer":"default",color:hintsLeft>0?"#CF8FF5":"#8b7fc4",opacity:hintsLeft>0?1:.5}}>
            💡 Подсказка
            <div style={{background:hintsLeft>0?"#f59e0b":"#444",color:hintsLeft>0?"#111":"#888",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900}}>{hintsLeft}</div>
          </div>
          <Btn onClick={next} style={{opacity:selected!==null?1:.4,pointerEvents:selected!==null?"auto":"none",padding:"12px 22px"}}>Далее →</Btn>
        </div>
      </div>
      {hintOpen && <HintPopup hint={hint} onClose={()=>setHintOpen(false)}/>}
      <BottomNav active="training" go={go}/>
    </div>
  );
}

// ─── LEADERBOARD ──────────────────────────────────────────────
function LeaderboardScreen({go}) {
  const [tab,setTab] = useState(0);
  const tabs = ["Рейтинг","Друзья","Школа"];
  const medals = ["🥇","🥈","🥉"];
  return (
    <>
      <BackHeader title="ТУРНИР" onBack={()=>go("home")}
        right={<div style={{fontSize:20,cursor:"pointer"}}>ℹ️</div>}/>
      <div className="scroll-body">
        <div className="fade" style={{background:`linear-gradient(135deg,rgba(245,158,11,.18),rgba(249,115,22,.12))`,border:`1px solid rgba(245,158,11,.35)`,borderRadius:18,padding:18,marginBottom:16,display:"flex",alignItems:"center",gap:14}}>
          <span style={{fontSize:40}}>🏆</span>
          <div>
            <div style={{fontWeight:900,fontSize:17}}>Битва Знатоков</div>
            <div style={{fontSize:12,color:C.muted,marginTop:3}}>До конца: 2д 14ч 35м</div>
          </div>
          <div style={{marginLeft:"auto",textAlign:"right"}}>
            <div style={{fontSize:11,color:C.muted}}>Твоё место</div>
            <div style={{fontFamily:"'Unbounded',sans-serif",fontSize:22,fontWeight:900,color:C.gold}}>#2</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {tabs.map((t,i)=><div key={i} className="tap" onClick={()=>setTab(i)} style={{...pill(t,tab===i),flex:1,textAlign:"center"}}>{t}</div>)}
        </div>
        {LEADERBOARD.map((p,i)=>(
          <div key={i} className="fade" style={{animationDelay:`${i*0.05}s`,display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:p.me?`linear-gradient(135deg,rgba(124,58,255,.25),rgba(168,85,247,.15))`:C.card,border:`1.5px solid ${p.me?C.a1:C.border}`,borderRadius:14,marginBottom:8}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:i<3?grad(C.gold,"#f97316"):C.card2,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Unbounded',sans-serif",fontWeight:900,fontSize:i<3?18:13,flexShrink:0}}>{i<3?medals[i]:i+1}</div>
            <div style={{width:36,height:36,borderRadius:"50%",background:grad(C.a1,C.neon),display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🐿️</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:14}}>{p.name}</div>
              <div style={{fontSize:11,color:C.muted}}>Уровень {p.level}</div>
            </div>
            <div style={{fontFamily:"'Unbounded',sans-serif",fontWeight:900,fontSize:16,color:p.me?C.a3:C.text}}>{p.xp.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── STATS ────────────────────────────────────────────────────
function StatsScreen({go}) {
  return (
    <>
      <BackHeader title="СТАТИСТИКА" onBack={()=>go("home")} right={<span style={{fontSize:20}}>📅</span>}/>
      <div className="scroll-body">
        <div className="fade" style={{...card({padding:20,marginBottom:14})}}>
          <div style={{fontWeight:800,fontSize:15,marginBottom:14}}>Общий прогресс</div>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div style={{position:"relative",width:90,height:90,flexShrink:0}}>
              <svg width="90" height="90" viewBox="0 0 90 90" style={{transform:"rotate(-90deg)"}}>
                <defs><linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#8B2FE8"/><stop offset="100%" stopColor="#D44FE8"/></linearGradient></defs>
                <circle fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="8" cx="45" cy="45" r="35"/>
                <circle className="donut-fill" cx="45" cy="45" r="35"/>
              </svg>
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Unbounded',sans-serif",fontSize:18,fontWeight:900}}>78%</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[[C.a1,"Изучено формул","65/83"],[C.neon,"Пройдено тестов","24"],[C.gold,"Дней подряд","12 🔥"]].map(([col,label,val])=>(
                <div key={label} style={{display:"flex",alignItems:"center",gap:8,fontSize:13}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:col,flexShrink:0}}/>
                  <span style={{color:C.muted,fontSize:12}}>{label}</span>
                  <div style={{fontWeight:800,marginLeft:"auto"}}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="fade" style={{...card({padding:20,marginBottom:14}),animationDelay:".1s"}}>
          <div style={{fontWeight:800,fontSize:15,marginBottom:14}}>Успеваемость по темам</div>
          {TOPICS_STATS.map(t=>(
            <div key={t.name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:11}}>
              <div style={{width:130,color:C.muted,flexShrink:0,fontSize:11}}>{t.name}</div>
              <div style={{flex:1,background:"rgba(255,255,255,.08)",borderRadius:6,height:6,overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:6,width:`${t.pct}%`,background:grad(t.grad[0],t.grad[1],90),transition:"width 1s ease"}}/>
              </div>
              <div style={{width:34,textAlign:"right",fontWeight:800,fontSize:12}}>{t.pct}%</div>
            </div>
          ))}
        </div>
        {/* Weekly activity */}
        <div className="fade" style={{...card({padding:20}),animationDelay:".18s"}}>
          <div style={{fontWeight:800,fontSize:15,marginBottom:14}}>Активность за неделю</div>
          <div style={{display:"flex",gap:8,alignItems:"flex-end",height:70}}>
            {[40,80,60,100,70,90,65].map((h,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{width:"100%",borderRadius:6,background:i===6?grad(C.a1,C.neon):grad(C.a1+"55",C.a2+"55"),height:`${h}%`,transition:"height 1s ease"}}/>
                <div style={{fontSize:9,color:C.muted}}>{"ПВСЧПСВ"[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav active="stats" go={go}/>
    </>
  );
}

// ─── ACHIEVEMENTS ─────────────────────────────────────────────
function AchievementsScreen({go}) {
  return (
    <>
      <BackHeader title="ДОСТИЖЕНИЯ" onBack={()=>go("home")}/>
      <div className="scroll-body">
        <SectionTitle mt={8}>Получено</SectionTitle>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
          {ACHIEVEMENTS.map((a,i)=>(
            <div key={i} className="fade" style={{animationDelay:`${i*0.05}s`,background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px 10px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:8,opacity:a.locked?.5:1,filter:a.locked?"grayscale(.6)":"none"}}>
              <div style={{fontSize:30}}>{a.icon}</div>
              <div style={{fontSize:11,fontWeight:800,lineHeight:1.3}}>{a.name}</div>
              <div style={{fontSize:10,color:C.muted}}>{a.desc}</div>
              <div style={{width:"100%",background:"rgba(255,255,255,.08)",borderRadius:4,height:4,overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:4,width:`${a.pct}%`,background:grad(C.a1,C.neon,90)}}/>
              </div>
              {a.pct>0&&a.pct<100&&<div style={{fontSize:9,color:C.a3}}>{a.pct}%</div>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────
function SettingsScreen({go}) {
  const [notif,setNotif] = useState(true);
  const [sound,setSound] = useState(true);
  const Toggle = ({on,set})=>(
    <div className="tap" onClick={()=>set(!on)} style={{width:44,height:26,borderRadius:13,background:on?grad(C.a1,C.neon):C.card2,border:`1px solid ${C.border}`,position:"relative",cursor:"pointer",transition:".3s",flexShrink:0}}>
      <div style={{position:"absolute",top:3,left:on?20:3,width:20,height:20,borderRadius:"50%",background:"#fff",transition:"left .3s cubic-bezier(.34,1.56,.64,1)",boxShadow:"0 2px 6px rgba(0,0,0,.3)"}}/>
    </div>
  );
  const items = [
    {icon:"🔔",title:"Уведомления",sub:"Напоминания о занятиях",toggle:<Toggle on={notif} set={setNotif}/>},
    {icon:"🔊",title:"Звуки",sub:"Звуки при ответах",toggle:<Toggle on={sound} set={setSound}/>},
    {icon:"🎨",title:"Тема",sub:"Тёмная",arrow:true},
    {icon:"🌍",title:"Язык",sub:"Русский",arrow:true},
    {icon:"📊",title:"Мой прогресс",sub:"Подробная статистика",arrow:true},
  ];
  return (
    <>
      <BackHeader title="НАСТРОЙКИ" onBack={()=>go("home")}/>
      <div className="scroll-body">
        {/* Profile block */}
        <div className="fade" style={{...card({padding:18,marginBottom:16}),display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:grad(C.a1,C.neon),display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>🐿️</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:800,fontSize:16}}>Максим</div>
            <div style={{fontSize:12,color:C.muted}}>⚡ Уровень 7 · 650 XP</div>
          </div>
          <div className="tap" style={{background:grad(C.a1,C.a2),borderRadius:10,padding:"8px 14px",fontSize:12,fontWeight:800,cursor:"pointer",color:"#fff"}}>Изменить</div>
        </div>
        <SectionTitle mt={4}>Основные</SectionTitle>
        {items.map((it,i)=>(
          <div key={i} className="tap fade" style={{animationDelay:`${i*0.05}s`,display:"flex",alignItems:"center",gap:14,padding:"14px 16px",background:C.card,border:`1px solid ${C.border}`,borderRadius:14,marginBottom:10,cursor:"pointer"}}>
            <span style={{fontSize:22}}>{it.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:14}}>{it.title}</div>
              <div style={{fontSize:11,color:C.muted}}>{it.sub}</div>
            </div>
            {it.toggle||<div style={{color:C.muted,fontSize:20}}>›</div>}
          </div>
        ))}
        <SectionTitle>Аккаунт</SectionTitle>
        <div className="tap" style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",background:"rgba(244,63,94,.08)",border:`1px solid rgba(244,63,94,.25)`,borderRadius:14,cursor:"pointer"}}>
          <span style={{fontSize:22}}>🗑️</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:800,fontSize:14,color:C.red}}>Сбросить прогресс</div>
            <div style={{fontSize:11,color:C.muted}}>Начать с нуля</div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── VICTORY ──────────────────────────────────────────────────
function VictoryScreen({go, correct=8, total=10}) {
  const pct = Math.round(correct/total*100);
  const stars = pct===100?3:pct>=70?2:1;
  const confetti = Array.from({length:30},(_,i)=>({
    left:Math.random()*100, delay:Math.random()*2, dur:2+Math.random()*2,
    size:6+Math.random()*8, rot:Math.random()*360,
    color:["#8B2FE8","#D44FE8","#f59e0b","#4DB848","#f43f5e","#CF8FF5"][i%6],
  }));
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 24px",textAlign:"center",position:"relative",overflow:"hidden",zIndex:1}}>
      {confetti.map((c,i)=>(
        <div key={i} className="confetti-item" style={{left:`${c.left}%`,top:-20,width:c.size,height:c.size,background:c.color,animationDelay:`${c.delay}s`,animationDuration:`${c.dur}s`,transform:`rotate(${c.rot}deg)`}}/>
      ))}
      <div className="trophy-anim" style={{fontSize:80,marginBottom:4}}>🏆</div>
      <div style={{fontSize:28,marginBottom:10}}>{"⭐".repeat(stars)}{"☆".repeat(3-stars)}</div>
      <div style={{fontFamily:"'Unbounded',sans-serif",fontSize:28,fontWeight:900,background:`linear-gradient(135deg,#fff,${C.a3})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:6}}>ПОБЕДА!</div>
      <div style={{fontSize:13,color:C.muted,marginBottom:24}}>Ты отлично знаешь формулы!</div>
      <div style={{display:"flex",gap:12,marginBottom:28}}>
        {[[`${correct}/${total}`,"✅","правильно"],["01:25","⏱️","время"],[ "+30","⚡","XP"]].map(([val,icon,label])=>(
          <div key={label} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 10px",textAlign:"center",flex:1}}>
            <div style={{fontSize:20,marginBottom:4}}>{icon}</div>
            <div style={{fontFamily:"'Unbounded',sans-serif",fontSize:15,fontWeight:900}}>{val}</div>
            <div style={{fontSize:10,color:C.muted,marginTop:2}}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%"}}>
        <Btn onClick={()=>go("training")} style={{width:"100%"}}>🔄 Ещё раз</Btn>
        <Btn onClick={()=>go("home")} variant="secondary" style={{width:"100%"}}>🏠 На главную</Btn>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────
export default function App() {
  const [stack, setStack] = useState([{name:"home",props:{}}]);

  function go(name, props={}) {
    setStack(s => [...s, {name, props}]);
  }
  function goBack() {
    setStack(s => s.length > 1 ? s.slice(0,-1) : s);
  }

  const {name, props} = stack[stack.length-1];

  const screens = {
    home:         <HomeScreen go={go}/>,
    formulas:     <FormulasScreen go={go}/>,
    topic:        <TopicScreen go={go} topicIdx={props.topicIdx||0}/>,
    detail:       <DetailScreen go={go} topicIdx={props.topicIdx||0} formulaIdx={props.formulaIdx||0}/>,
    training:     <TrainingScreen go={go}/>,
    leaderboard:  <LeaderboardScreen go={go}/>,
    stats:        <StatsScreen go={go}/>,
    achievements: <AchievementsScreen go={go}/>,
    settings:     <SettingsScreen go={go}/>,
    victory:      <VictoryScreen go={go} correct={props.correct} total={props.total}/>,
  };

  return (
    <>
      <style>{css}</style>
      <div className="app-root">
        <div className="blob1"/><div className="blob2"/>
        {screens[name] || screens.home}
      </div>
    </>
  );
}
