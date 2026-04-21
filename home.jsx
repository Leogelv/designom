/* eslint-disable */
// Home screen — "Живой свет"

import React from 'react';
import { Icon, StatusBar, LiquidBlob, Bead, TabBar, TopBar, IconChip } from './atoms.jsx';

const bottomPad = 'calc(110px + env(safe-area-inset-bottom, 0px))';

export function HomeScreen({ onOpenLibrary, onTab }) {
  const [meals, setMeals] = React.useState({ b: true, l: true, d: false });
  const [morning, setMorning] = React.useState(false);
  const [evening, setEvening] = React.useState(false);

  return (
    <div className="om" style={{ position:'relative', width: '100%', minHeight: '100%', background: 'var(--bone)', paddingBottom: bottomPad }}>
      {/* ambient warmth */}
      <div style={{ position:'absolute', inset:'-20px 0 auto 0', height: 360, pointerEvents:'none',
        background: 'radial-gradient(70% 60% at 85% 0%, rgba(107,76,245,0.16), transparent 60%), radial-gradient(60% 50% at 0% 20%, rgba(190,210,255,0.28), transparent 65%)',
      }}/>

      <StatusBar />
      <TopBar />

      {/* Greeting + hero */}
      <div style={{ padding: '22px 22px 4px', position:'relative' }}>
        <div className="t-kicker">Вторник · 21 апреля</div>
        <h1 className="t-display" style={{ margin:'10px 0 0', fontSize: 42, color:'var(--ink)' }}>
          Привет,<br/><em>Надежда</em>.
        </h1>
        <div style={{ marginTop: 10, fontSize: 14.5, color:'var(--muted)', lineHeight: 1.4, maxWidth: 300 }}>
          Сегодня мягко восстанавливаемся. Утро уже идёт хорошо — держим этот темп.
        </div>
      </div>

      {/* BioAge hero — доминирующий объект */}
      <div style={{ padding: '24px 18px 0' }}>
        <BioAgeHero />
      </div>

      {/* Progress strip */}
      <div style={{ padding: '12px 18px 0' }}>
        <ProgressStrip />
      </div>

      {/* Protocol */}
      <Section label="Твой протокол" note="3 действия">
        <NutritionCard meals={meals} setMeals={setMeals} />
        <RitualCard
          tone="sand"
          icon="sun"
          title="Утренний чекап"
          score={30}
          desc="Сегодня лучше обойтись без высокой нагрузки и сделать день бодрым."
          done={morning}
          onToggle={() => setMorning(v => !v)}
        />
        <RitualCard
          tone="lavender"
          icon="moon"
          title="Вечерний чекап"
          score={50}
          desc="День был напряжённым — можно завершить его короткой практикой на 5 минут."
          done={evening}
          onToggle={() => setEvening(v => !v)}
        />
      </Section>

      {/* Recommendations */}
      <Section label="Для тебя сегодня">
        <div style={{ display:'grid', gridTemplateColumns:'1.15fr 1fr', gap: 12 }}>
          <InsightCard />
          <AdviceCard />
        </div>
        <MediaRow />
      </Section>

      {/* Material of the day */}
      <Section label="Материал дня">
        <ArticleHero onClick={onOpenLibrary} />
      </Section>

      {/* Dynamics */}
      <Section label="Динамика недели">
        <DynamicsCard />
      </Section>

      <TabBar active="home" onTab={onTab} />
    </div>
  );
}

const Section = ({ label, note, children }) => (
  <div style={{ padding: '28px 18px 0' }}>
    <div style={{ display:'flex', alignItems:'baseline', gap:10, padding:'0 4px 12px' }}>
      <div className="t-kicker" style={{ color:'var(--ink-2)' }}>{label}</div>
      {note && <div style={{ fontSize: 11, color:'var(--muted-2)', marginLeft:'auto' }}>{note}</div>}
    </div>
    <div style={{ display:'flex', flexDirection:'column', gap: 12 }}>{children}</div>
  </div>
);

// ── BioAge hero ──
const BioAgeHero = () => (
  <div className="s-paper" style={{
    position:'relative', padding: '22px 22px 18px',
    borderRadius: 'var(--r-xl)',
    overflow: 'hidden',
  }}>
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 10 }}>
      <div className="t-kicker">BioAge</div>
      <span style={{
        fontSize: 11, fontWeight: 600, color:'var(--sage-ink)',
        background:'#E3EED9', padding:'3px 9px', borderRadius: 999,
        display:'inline-flex', alignItems:'center', gap:4,
      }}>
        <Icon name="arrowdn" size={11} color="#2B4A2A" stroke={2.2}/> −0.4 за месяц
      </span>
    </div>
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap: 12 }}>
      <div>
        <div style={{ display:'flex', alignItems:'baseline', gap: 6 }}>
          <span className="t-display t-mono-num" style={{ fontSize: 84, lineHeight:.95, fontWeight: 300, color:'var(--ink)' }}>38</span>
          <span style={{ fontSize: 15, color:'var(--muted)', fontFamily:'var(--font-ui)' }}>/ 35 лет</span>
        </div>
        <div style={{ marginTop: 6, fontSize: 13, color:'var(--ink-2)', lineHeight: 1.35, maxWidth: 190, textWrap:'pretty' }}>
          Сон был длиннее среднего. Низкий уровень нагрузки — это работает.
        </div>
      </div>
      <div style={{ position:'relative', width: 110, height: 110, flexShrink:0 }}>
        <LiquidBlob tone="amber" size={110} />
      </div>
    </div>

    {/* micro-timeline */}
    <div style={{ marginTop: 18, display:'flex', alignItems:'end', gap: 4, height: 36 }}>
      {[0.55,0.58,0.62,0.54,0.5,0.48,0.46].map((v,i)=>(
        <div key={i} style={{ flex:1, height: `${v*100}%`, borderRadius: 6,
          background: i===6? 'linear-gradient(180deg, var(--amber-hi), var(--amber))' : 'var(--bone-2)',
          boxShadow: i===6? '0 4px 10px -4px var(--accent-glow)' : 'inset 0 1px 0 rgba(255,255,255,0.6)',
        }}/>
      ))}
    </div>
    <div style={{ display:'flex', justifyContent:'space-between', marginTop: 6, fontSize: 10, color:'var(--muted-2)', fontFamily:'var(--font-mono)' }}>
      <span>ПН</span><span>ВТ</span><span>СР</span><span>ЧТ</span><span>ПТ</span><span>СБ</span><span>ВС</span>
    </div>
  </div>
);

const ProgressStrip = () => {
  const pct = 420/800;
  return (
    <div className="s-ink" style={{
      padding: '14px 18px', borderRadius: 'var(--r-lg)',
      display:'flex', alignItems:'center', gap: 14,
    }}>
      <div style={{ display:'flex', flexDirection:'column', gap: 2 }}>
        <span style={{ fontSize: 11, letterSpacing: 0.14, textTransform:'uppercase', color:'rgba(240,236,255,0.55)' }}>Путь</span>
        <span className="t-mono-num" style={{ fontSize: 20, fontWeight: 500, color:'#F0ECFF' }}>420 / 800</span>
      </div>
      <div style={{ flex:1, position:'relative', height: 8, borderRadius: 999, background:'rgba(255,255,255,0.07)', overflow:'hidden' }}>
        <div style={{ width: `${pct*100}%`, height:'100%', borderRadius: 999,
          background:'linear-gradient(90deg, var(--amber-wash), var(--amber-hi), var(--amber))',
          boxShadow:'0 0 12px var(--accent-glow-strong)',
        }}/>
        {[0.25,0.5,0.75].map(t=>(
          <span key={t} style={{ position:'absolute', top:-2, left:`${t*100}%`, width:1, height:12, background:'rgba(255,255,255,0.15)' }}/>
        ))}
      </div>
      <span style={{ fontSize: 11, color:'rgba(240,236,255,0.55)', whiteSpace:'nowrap' }}>380 до след.</span>
    </div>
  );
};

// ── Nutrition ──
const NutritionCard = ({ meals, setMeals }) => (
  <div className="s-paper" style={{ padding: 16, borderRadius: 'var(--r-lg)' }}>
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 14 }}>
      <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
        <IconChip tone="sage" icon="leaf" />
        <div>
          <div style={{ fontSize: 15.5, fontWeight: 600, letterSpacing:-0.2 }}>Дневник питания</div>
          <div style={{ fontSize: 11.5, color:'var(--muted)' }}>2 из 3 приёмов отмечено</div>
        </div>
      </div>
      <span style={{ fontSize: 11, color:'var(--muted-2)' }}>сегодня</span>
    </div>
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 10 }}>
      {[['b','Завтрак','08:30'],['l','Обед','13:15'],['d','Ужин','—']].map(([k,l,t])=>{
        const done = meals[k];
        return (
          <button key={k} type="button" onClick={()=>setMeals(m=>({...m,[k]:!m[k]}))} style={{
            position:'relative', textAlign:'left', padding:'10px 10px 12px',
            borderRadius: 16, border:'none', cursor:'pointer',
            background: done? 'linear-gradient(180deg,#DDEBD1,#C9D9C2)' : 'var(--bone-2)',
            color: done? 'var(--sage-ink)' : 'var(--muted)',
            boxShadow: done
              ? 'inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 12px -8px rgba(75,107,63,0.4)'
              : 'inset 0 1px 2px rgba(60,40,20,0.08)',
          }}>
            <span style={{ position:'absolute', top:8, right:8, fontSize:9.5, fontWeight:700,
              background: done? 'rgba(255,255,255,0.55)' : 'var(--amber-wash)',
              color: done? '#2B4A2A' : 'var(--amber-lo)',
              padding:'2px 6px', borderRadius:999,
            }}>+20</span>
            <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 14 }}>{l}</div>
            <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
              <span style={{
                width: 20, height: 20, borderRadius: 99,
                background: done? 'var(--sage-ink)' : 'transparent',
                border: done? 'none':'1.5px dashed rgba(20,18,15,0.22)',
                display:'grid', placeItems:'center', color:'#fff',
              }}>{done && <Icon name="check" size={11} color="#fff" stroke={3}/>}</span>
              <span style={{ fontSize: 10.5, color: done? 'var(--sage-ink)' : 'var(--muted-2)', fontFamily:'var(--font-mono)' }}>{t}</span>
            </div>
          </button>
        );
      })}
    </div>
    <button type="button" className="pill pill-ink" style={{ marginTop: 14, width:'100%', height: 46, justifyContent:'space-between', padding: '0 8px 0 18px' }}>
      <span>Открыть дневник</span>
      <span style={{ width:32, height:32, borderRadius:99, background:'#F4EEE4', display:'grid', placeItems:'center' }}>
        <Icon name="arrow" size={14} color="#14120F" stroke={2}/>
      </span>
    </button>
  </div>
);

// ── Ritual ──
const RitualCard = ({ tone, icon, title, score, desc, done, onToggle }) => (
  <div className="s-paper" style={{ padding: 16, borderRadius:'var(--r-lg)' }}>
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 10 }}>
      <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
        <IconChip tone={tone} icon={icon}/>
        <div style={{ fontSize: 15.5, fontWeight: 600, letterSpacing:-0.2 }}>{title}</div>
      </div>
      <Bead n={score}/>
    </div>
    <p style={{ margin:'0 0 12px', fontSize: 13, color:'var(--graphite)', lineHeight: 1.45, textWrap:'pretty' }}>{desc}</p>
    <button type="button" onClick={onToggle} style={{
      width:'100%', height: 44, borderRadius: 999, cursor:'pointer',
      background: done? '#DDEBD1' : 'var(--bone-2)',
      border: done? '0.5px solid rgba(43,74,42,0.2)' : '0.5px solid var(--hairline)',
      color: done? 'var(--sage-ink)' : 'var(--ink)',
      fontSize: 14, fontWeight: 600,
      display:'inline-flex', alignItems:'center', justifyContent:'center', gap: 8,
    }}>
      <span style={{
        width: 18, height: 18, borderRadius: 99, display:'grid', placeItems:'center',
        background: done? 'var(--sage-ink)' : 'transparent',
        border: done? 'none' : '1.5px solid var(--ink)',
      }}>{done && <Icon name="check" size={10} color="#fff" stroke={3}/>}</span>
      {done? 'Чекап пройден' : 'Пройти чекап'}
    </button>
  </div>
);

// ── Insight & advice ──
const InsightCard = () => (
  <div className="s-glass" style={{ padding: 14, borderRadius: 'var(--r-lg)', minHeight: 150, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
      <div className="t-kicker" style={{ color:'var(--amber-ink)' }}>Инсайт</div>
      <Icon name="spark" size={14} color="var(--amber-lo)" stroke={1.8}/>
    </div>
    <div style={{ fontSize: 13.5, lineHeight: 1.35, color:'var(--ink)', textWrap:'pretty', fontWeight: 500 }}>
      Твоя зона внимания на этом протоколе — <em style={{ color:'var(--amber-lo)', fontFamily:'var(--font-display)', fontSize: 15 }}>снижение стресса</em> и поддержка нутриентами.
    </div>
  </div>
);

const AdviceCard = () => (
  <div className="s-carved" style={{ padding: 14, borderRadius:'var(--r-lg)', minHeight: 150, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
      <div className="t-kicker">Совет</div>
      <Icon name="flame" size={14} color="#7A716A" stroke={1.8}/>
    </div>
    <div style={{ fontSize: 13.5, lineHeight: 1.35, color:'var(--ink-2)', textWrap:'pretty', fontWeight: 500 }}>
      Сегодня лучше обойтись без высокой нагрузки — выбери прогулку вместо силовой.
    </div>
  </div>
);

const MediaRow = () => (
  <div className="s-paper" style={{ padding: 12, borderRadius: 'var(--r-lg)', display:'flex', alignItems:'center', gap: 12 }}>
    <div style={{ position:'relative', width: 52, height: 52, borderRadius: 14, overflow:'hidden',
      background:'radial-gradient(60% 60% at 35% 30%, #E4D9FF, #8B6CFF 60%, #3D28A8)',
      flexShrink:0, display:'grid', placeItems:'center',
      boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -6px 14px rgba(100,20,0,0.3)',
    }}>
      <Icon name="play" size={18} color="#fff"/>
    </div>
    <div style={{ flex:1 }}>
      <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 2 }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>Медитация покоя</span>
        <Bead n={20}/>
      </div>
      <div style={{ fontSize: 12, color:'var(--muted)' }}>Аудио · 10 минут · Анна К.</div>
    </div>
    <span style={{ width: 36, height: 36, borderRadius: 99, background:'var(--ink)', display:'grid', placeItems:'center', flexShrink:0 }}>
      <Icon name="arrow" size={14} color="#fff" stroke={2}/>
    </span>
  </div>
);

// ── Article hero ──
const ArticleHero = ({ onClick }) => (
  <button type="button" onClick={onClick} style={{
    width:'100%', textAlign:'left', padding:0, border:'none', cursor:'pointer',
    background:'var(--paper)', borderRadius: 'var(--r-xl)', overflow:'hidden',
    boxShadow:'var(--shadow-lift)',
  }}>
    <div style={{
      height: 190, position:'relative',
      background: 'radial-gradient(90% 80% at 50% 45%, #D8CCFF 0%, #9B7CFF 55%, #4A32B8 100%)',
      overflow:'hidden',
    }}>
      <div style={{ position:'absolute', left: 40, top: 18 }}>
        <LiquidBlob tone="amber" size={120}/>
      </div>
      <div style={{ position:'absolute', right: 36, top: 80 }}>
        <LiquidBlob tone="amber" size={78}/>
      </div>
      <div style={{ position:'absolute', right: 14, top: 14,
        background:'rgba(20,18,15,0.85)', backdropFilter:'blur(12px)',
        color:'#F4EEE4', borderRadius: 999, padding:'6px 12px',
        fontSize: 11, fontWeight: 600, letterSpacing: 0.08,
      }}>Материал дня</div>
    </div>
    <div style={{ padding: 18, display:'flex', alignItems:'center', gap: 12 }}>
      <div style={{ flex:1 }}>
        <div className="t-display" style={{ fontSize: 22, lineHeight: 1.1, color:'var(--ink)', letterSpacing: -0.4, textWrap:'balance' }}>
          Как <em>питание</em> влияет на организм и возраст
        </div>
        <div style={{ fontSize: 12, color:'var(--muted)', marginTop: 6, display:'flex', alignItems:'center', gap: 8 }}>
          <span>6 минут чтения</span>
          <span style={{ width:3, height:3, borderRadius:99, background:'var(--muted-2)' }}/>
          <span>Питание</span>
        </div>
      </div>
      <span style={{ width: 44, height: 44, borderRadius: 99, background:'var(--ink)', display:'grid', placeItems:'center', flexShrink:0 }}>
        <Icon name="arrow" size={16} color="#fff" stroke={2}/>
      </span>
    </div>
  </button>
);

// ── Dynamics ──
const DynamicsCard = () => {
  const W = 280, H = 70;
  const lines = [
    { data:[0.55,0.6,0.52,0.7,0.68,0.8,0.82], color:'#2B4A2A', label:'Сон' },
    { data:[0.65,0.55,0.7,0.5,0.45,0.4,0.35], color:'#7C5CFF', label:'Стресс' },
    { data:[0.4,0.5,0.6,0.55,0.7,0.72,0.78],  color:'#30274A', label:'Питание' },
  ];
  return (
    <div className="s-paper" style={{ padding: 16, borderRadius: 'var(--r-lg)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>За эту неделю</div>
        <div style={{ display:'flex', gap: 10, fontSize: 11, color:'var(--muted)' }}>
          {lines.map(l=>(
            <span key={l.label} style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
              <span style={{ width:8, height:8, borderRadius:99, background:l.color }}/>{l.label}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%', height: H }}>
        {lines.map((l,i)=>{
          const pts = l.data.map((v,j)=>`${(j/(l.data.length-1))*W},${H-v*H}`).join(' ');
          return <polyline key={i} points={pts} fill="none" stroke={l.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>;
        })}
      </svg>
      <button type="button" className="pill pill-ink" style={{ marginTop: 14, width:'100%', height: 46, justifyContent:'space-between', padding:'0 8px 0 18px' }}>
        <span>Посмотреть динамику</span>
        <span style={{ width:32, height:32, borderRadius:99, background:'#F4EEE4', display:'grid', placeItems:'center' }}>
          <Icon name="arrow" size={14} color="#14120F" stroke={2}/>
        </span>
      </button>
    </div>
  );
};
