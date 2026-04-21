/* eslint-disable */
// Library screen — "Живой свет"

import React from 'react';
import { Icon, StatusBar, LiquidBlob, TabBar, TopBar } from './atoms.jsx';

const bottomPad = 'calc(110px + env(safe-area-inset-bottom, 0px))';

export function LibraryScreen({ onClose, onTab }) {
  const [cat, setCat] = React.useState('content');

  const items = [
    { title:'Как сон влияет на организм и возраст', duration:'10 минут', tone:'amber' },
    { title:'Зачем считать окно питания и с чего начать', duration:'8 минут', tone:'sage' },
    { title:'Дыхание 4-7-8 перед сном', duration:'5 минут', tone:'lavender' },
    { title:'Почему стресс ускоряет BioAge', duration:'9 минут', tone:'amber' },
    { title:'Микронутриенты: магний, D3, омега-3', duration:'12 минут', tone:'sand' },
  ];

  return (
    <div className="om" style={{ position:'relative', width:'100%', minHeight:'100%', background:'var(--bone)', paddingBottom: bottomPad }}>
      {/* warm glow */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height: 420, pointerEvents:'none',
        background:'radial-gradient(70% 60% at 50% 0%, rgba(232,90,43,0.18), transparent 65%)' }}/>

      <StatusBar/>
      <TopBar onClose={onClose}/>

      {/* title */}
      <div style={{ padding: '22px 22px 12px' }}>
        <div className="t-kicker">Материалы</div>
        <h1 className="t-display" style={{ margin:'8px 0 0', fontSize: 40 }}>
          <em>Библиотека</em>
        </h1>
        <div style={{ fontSize: 14, color:'var(--muted)', marginTop: 8, maxWidth: 280 }}>
          Короткие материалы, которые помогут продвинуться на твоём протоколе.
        </div>
      </div>

      {/* Featured */}
      <div style={{ padding: '6px 18px 0' }}>
        <FeaturedHero/>
      </div>

      {/* List drawer — приподнятая "шторка" */}
      <div style={{ marginTop: 22, position:'relative', padding:'0 0 0' }}>
        <div style={{
          background:'var(--shell)', borderTopLeftRadius: 28, borderTopRightRadius: 28,
          boxShadow:'0 -8px 28px -10px rgba(60,40,20,0.18), inset 0 1px 0 rgba(255,255,255,0.8)',
          padding: '14px 18px 24px',
          borderTop: '0.5px solid var(--hairline)',
        }}>
          {/* grabber */}
          <div style={{ width: 38, height: 4, background:'var(--bone-2)', borderRadius: 99, margin:'0 auto 14px' }}/>

          {/* Category chips + search */}
          <div style={{ display:'flex', gap: 8, alignItems:'center', overflowX:'auto', marginBottom: 12 }}>
            <CatChip active={cat==='content'} onClick={()=>setCat('content')}>Контент</CatChip>
            <CatChip active={cat==='practice'} onClick={()=>setCat('practice')}>Практики</CatChip>
            <CatChip active={cat==='breath'} onClick={()=>setCat('breath')}>Дыхание</CatChip>
            <CatChip active={cat==='nutrition'} onClick={()=>setCat('nutrition')}>Питание</CatChip>
            <span style={{ marginLeft:'auto' }}>
              <button type="button" style={{
                width: 36, height: 36, borderRadius: 999, border:'0.5px solid var(--hairline)',
                background:'var(--paper)', display:'grid', placeItems:'center', cursor:'pointer',
              }}>
                <Icon name="search" size={15} color="#14120F" stroke={2}/>
              </button>
            </span>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
            {items.map((it,i)=>(
              <LibItem key={i} {...it} />
            ))}
          </div>
        </div>
      </div>

      <TabBar active="library" onTab={onTab}/>
    </div>
  );
}

const CatChip = ({ active, children, onClick }) => (
  <button type="button" onClick={onClick} style={{
    height: 36, padding:'0 16px', borderRadius: 999,
    border: active? 'none' : '0.5px solid var(--hairline)',
    background: active? 'linear-gradient(180deg,#FF7A4A,#E85A2B)' : 'var(--paper)',
    color: active? '#fff' : 'var(--ink)',
    fontSize: 13.5, fontWeight: 600, letterSpacing: -0.1, cursor:'pointer',
    whiteSpace:'nowrap', flexShrink: 0,
    boxShadow: active
      ? 'inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 18px -6px rgba(232,90,43,0.5)'
      : 'inset 0 1px 0 rgba(255,255,255,0.8)',
  }}>{children}</button>
);

const FeaturedHero = () => (
  <div style={{
    position:'relative', borderRadius: 'var(--r-xl)', overflow:'hidden',
    boxShadow:'var(--shadow-lift)',
    background:'linear-gradient(180deg,#1C1915 0%,#2B2621 100%)',
    padding: 16,
  }}>
    <div style={{
      position:'absolute', inset:0,
      background:'radial-gradient(80% 60% at 50% 40%, rgba(255,180,140,0.45), transparent 70%)',
      pointerEvents:'none',
    }}/>
    <div style={{ position:'relative', height: 160, display:'flex', alignItems:'center', justifyContent:'center', marginBottom: 10 }}>
      <div style={{ position:'absolute', left: 30 }}>
        <LiquidBlob tone="amber" size={130}/>
      </div>
      <div style={{ position:'absolute', right: 40, top: 25 }}>
        <LiquidBlob tone="amber" size={90}/>
      </div>
      <div style={{ position:'absolute', right: 10, top: 10 }}>
        <span style={{
          background:'rgba(244,238,228,0.12)', backdropFilter:'blur(14px)',
          color:'#F4EEE4', borderRadius: 999, padding:'6px 12px',
          fontSize: 11, fontWeight: 600, letterSpacing: 0.06,
          border:'0.5px solid rgba(255,255,255,0.12)',
        }}>Материал дня</span>
      </div>
    </div>
    <div style={{ position:'relative', display:'flex', alignItems:'center', gap: 12 }}>
      <div style={{ flex:1 }}>
        <h2 className="t-display" style={{ margin:0, fontSize: 22, lineHeight: 1.15, color:'#F4EEE4', letterSpacing:-0.3 }}>
          Как <em>питание</em> влияет на организм и возраст
        </h2>
        <div style={{ fontSize: 12, color:'rgba(244,238,228,0.6)', marginTop: 6 }}>
          6 минут · Питание
        </div>
      </div>
      <span style={{ width: 44, height: 44, borderRadius: 99, background:'#F4EEE4', display:'grid', placeItems:'center', flexShrink:0 }}>
        <Icon name="arrow" size={16} color="#14120F" stroke={2}/>
      </span>
    </div>
  </div>
);

const LibItem = ({ title, duration, tone }) => (
  <button type="button" style={{
    background:'var(--paper)', border:'0.5px solid var(--hairline)',
    borderRadius: 'var(--r-md)', padding: 10,
    display:'flex', alignItems:'center', gap: 12, cursor:'pointer', textAlign:'left',
    boxShadow:'inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 14px -8px rgba(60,40,20,0.1)',
  }}>
    <div style={{ width: 56, height: 56, borderRadius: 14, overflow:'hidden', flexShrink:0,
      background: tone==='sage'? 'radial-gradient(60% 60% at 35% 30%, #E6F0DB, #9ABF8A 60%, #4B6B3F)'
               : tone==='lavender'? 'radial-gradient(60% 60% at 35% 30%, #ECE6F5, #9A8CC8 60%, #433477)'
               : tone==='sand'? 'radial-gradient(60% 60% at 35% 30%, #F4EBD3, #C9AE74 60%, #715A2C)'
               : 'radial-gradient(60% 60% at 35% 30%, #FFE2CC, #F2804F 60%, #C23E14)',
      display:'grid', placeItems:'center',
      boxShadow:'inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -6px 14px rgba(60,20,0,0.3)',
    }}>
      <Icon name="play" size={16} color="#fff"/>
    </div>
    <div style={{ flex:1 }}>
      <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.25, letterSpacing:-0.1, textWrap:'pretty' }}>{title}</div>
      <div style={{ fontSize: 11.5, color:'var(--muted)', marginTop: 3 }}>{duration}</div>
    </div>
    <span style={{ width: 36, height: 36, borderRadius: 99, background:'var(--ink)', display:'grid', placeItems:'center', flexShrink:0 }}>
      <Icon name="arrow" size={14} color="#fff" stroke={2}/>
    </span>
  </button>
);
