import {colors,iconNames,days,dateKey,asDate,shift,today,dayIndex,weekStart,range,amount,due,done,period,streaks,scheduleLabel,normalize,emptyData} from './model.js';

const paths = {
 grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 chart:'<path d="M4 4v16h16M8 15v-3m5 3V8m5 7V5"/>',archive:'<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v12h14V8m-9 4h4"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="m10 3-.6 2.4-2.2 1.3-2.4-.7-2 3.5L4.5 11v2L2.8 14.5l2 3.5 2.4-.7 2.2 1.3.6 2.4h4l.6-2.4 2.2-1.3 2.4.7 2-3.5L19.5 13v-2l1.7-1.5-2-3.5-2.4.7-2.2-1.3L14 3z"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',check:'<path d="m5 12 4 4L19 6"/>',left:'<path d="m14 6-6 6 6 6"/>',right:'<path d="m10 6 6 6-6 6"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m-14 4h2m3 0h2m3 0h1m-11 3h2m3 0h2"/>',
 drop:'<path d="M12 2C8.5 6.5 5 10 5 14a7 7 0 1 0 14 0c0-4-3.5-7.5-7-12zM8 15a4 4 0 0 0 4 3"/>',book:'<path d="M12 6C9 4 6 4 3 5v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1zm0 0v14"/>',dumbbell:'<path d="M9 12h6M3 9v6m18-6v6M6 6h3v12H6zm9 0h3v12h-3z"/>',moon:'<path d="M20 15A8.5 8.5 0 0 1 9 4a8.5 8.5 0 1 0 11 11z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
 leaf:'<path d="M20 4C9 3 4 7 4 13a6 6 0 0 0 6 6c7 0 11-7 10-15zM4 20l10-10"/>',heart:'<path d="M20 5a5 5 0 0 0-8 2 5 5 0 0 0-8-2c-5 5 3 11 8 15 5-4 13-10 8-15z"/>',coffee:'<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zm13 1h2a2 2 0 1 1 0 4h-2M3 21h16M8 3v2m4-2v2"/>',
 pen:'<path d="m14 6 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15z"/>',music:'<path d="M9 18V5l11-2v13M9 9l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="17" cy="16" rx="3" ry="2"/>',code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',walk:'<circle cx="13" cy="4" r="2"/><path d="m6 12 4-4 4 1 3 4h3m-7-4-2 6 4 2 1 4m-5-6-4 6"/>',bike:'<circle cx="5" cy="16" r="4"/><circle cx="19" cy="16" r="4"/><path d="m5 16 5-8 4 8h-9m9 0 3-11h3M7 8h5"/>',globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
 spark:'<path d="M12 2c0 6-4 10-10 10 6 0 10 4 10 10 0-6 4-10 10-10-6 0-10-4-10-10z"/>',flame:'<path d="M12 22a7 7 0 0 0 7-7c0-4-2-6-4-8 0 4-2 4-2 4 1-5-1-8-4-10 1 5-4 8-4 14a7 7 0 0 0 7 7z"/><path d="M12 22c-4-2-3-5 0-8 3 3 4 6 0 8z"/>',phone:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',bell:'<path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 9h18c0-1-3-2-3-9m-8 12a2 2 0 0 0 4 0"/>',download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',upload:'<path d="M12 15V3m-5 5 5-5 5 5M4 16v5h16v-5"/>',shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 16-5-5L6 21"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 10v7m4-7v7"/>',up:'<path d="M12 20V4m-6 6 6-6 6 6"/>',down:'<path d="M12 4v16m-6-6 6 6 6-6"/>',
};
const svg=(name,size=20)=>`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]??paths.spark}</svg>`;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const capitalize=s=>s.charAt(0).toUpperCase()+s.slice(1);
const format=(d,opts)=>asDate(d).toLocaleDateString('fr-FR',opts);
const longDate=d=>format(d,{weekday:'long',day:'numeric',month:'long',year:'numeric'});
const shortDate=d=>format(d,{day:'numeric',month:'short'});
const pretty=v=>new Intl.NumberFormat('fr-FR',{maximumFractionDigits:2}).format(v);
const tint=h=>`style="--habit:${colors[h.color]}"`;
const appKey='mosaique.v1';
const main=document.querySelector('#main');
const dialog=document.querySelector('#dialog');
const toastNode=document.querySelector('#toast');
const fileInput=document.querySelector('#import-file');
const mainNav=[['today','grid','Accueil'],['habits','list','Habitudes'],['stats','chart','Stats'],['settings','settings','Paramètres']];
let db, page='today', selected=today(), category='', activeModal=null, installEvent=null, offlineReady=false, toastTimer, lastFocus, lastDay=today();
let storageError=false;
try {
  const stored=localStorage.getItem(appKey);
  const previous=stored?JSON.parse(stored):null;
  db=previous?normalize(previous):emptyData();
  if (!previous||previous.habits.some(h=>h?.demo)) localStorage.setItem(appKey,JSON.stringify(db));
} catch {
  db??=emptyData();
  storageError=true;
}
function persist(next) {
  try { localStorage.setItem(appKey,JSON.stringify(next)); db=next; storageError=false; return true; }
  catch { storageError=true; toast('Impossible d’enregistrer sur cet appareil. Vérifiez l’espace disponible.'); return false; }
}
function replaceHabit(h) {
  return persist({...db,habits:db.habits.map(item=>item.id===h.id?h:item)});
}
const get=id=>db.habits.find(h=>h.id===id);
const active=()=>db.habits.filter(h=>!h.archived);
function btn(icon,label,action,extra='',classes='icon-btn') {
  return `<button type="button" class="${classes}" aria-label="${esc(label)}" title="${esc(label)}" data-action="${action}" ${extra}>${svg(icon)}</button>`;
}
function brand() {
  return `<button class="brand" data-action="nav" data-page="today" aria-label="Cadence, accueil"><img src="./assets/icon.svg" alt=""><span><strong>Cadence<span>.</span></strong><small>Mon carnet d’habitudes</small></span></button>`;
}
function nav(items) {
  const current=page==='archive'?'settings':page;
  return items.map(([id,icon,label])=>`<button class="nav-item ${current===id?'active':''}" data-action="nav" data-page="${id}" ${current===id?'aria-current="page"':''}>${svg(icon,19)}<span>${label}</span></button>`).join('');
}
function chrome() {
  document.documentElement.dataset.theme=db.settings.theme;
  document.querySelector('meta[name=theme-color]').content=db.settings.theme==='light'?'#f4f1fa':'#17131f';
  document.querySelector('#top-header').innerHTML=`<div class="top-brand">${brand()}</div><nav class="top-nav" aria-label="Navigation principale">${nav(mainNav)}</nav>`;
  connection();
}
function connection() {
  const label=!navigator.onLine?'Hors ligne':offlineReady?'Prêt hors ligne':'Sur cet appareil';
  document.querySelector('#connection').innerHTML=`<i></i>${label}`;
}
function sprout() {
  const tiles=[
    '.................',
    '.........l.......',
    '...s........m....',
    '.......r...mmm...',
    '.......rr.mmmm...',
    '.......rrrmmm..s.',
    '........rrmm.....',
    '...bbbb..mm......',
    '....bbbb.mm..pp..',
    '.....bbb.m.pppp..',
    '......bb.mpppp...',
    '........mmmpp....',
    '..s......m.......',
    '.........m....s..',
    '....xx..mmm..xx..',
    '...xxx.xxxxx.xxx.',
  ];
  const tones={l:'#9180c4',s:'#b4a2ef',r:'#bea5ff',m:'#89e5ba',b:'#8fb7ff',p:'#ebaa97',x:'#574773'};
  return `<svg class="sprout" width="284" height="220" viewBox="0 0 272 224" aria-hidden="true"><defs><pattern id="tile-grid" width="16" height="14" patternUnits="userSpaceOnUse"><rect x="2" y="2" width="11" height="10" rx="2.8" fill="#8472b2" opacity=".22"/></pattern></defs><rect width="272" height="224" fill="url(#tile-grid)"/>${tiles.map((row,y)=>[...row].map((key,x)=>tones[key]?`<rect class="petal ${key==='s'?'twinkle':''}" style="--delay:${(x+y)*19}ms" x="${x*16+2}" y="${y*14+2}" width="11" height="10" rx="2.8" fill="${tones[key]}"/>`:'').join('')).join('')}</svg>`;
}
function summary() {
  const all=active().filter(h=>due(h,selected)), count=all.filter(h=>done(h,selected)).length;
  const ratio=all.length?Math.round(count*100/all.length):0;
  const isToday=selected===today();
  const start=weekStart(selected);
  const week=range(start,7);
  return `<section class="overview" aria-label="Vue d’ensemble">
  <article class="hero">
    ${sprout()}
    <div class="hero-copy"><div class="hero-tag">${svg('spark',13)} ${isToday?'LE POINT DU JOUR':esc(shortDate(selected).toUpperCase())}</div>
    <h2>${all.length&&count===all.length?'Objectif atteint !':'Un jour à la fois.'}</h2>
    <p>${all.length?'Les petits pas font les grands changements.':'Chaque habitude commence par un petit pas.'}</p>
    <div class="progress-label"><strong>${count}<span> / ${all.length}</span></strong><small>habitude${all.length>1?'s':''} validée${all.length>1?'s':''}</small><b>${ratio} %</b></div>
    <div class="progress" role="progressbar" aria-label="Habitudes validées" aria-valuenow="${ratio}" aria-valuemin="0" aria-valuemax="100"><i style="width:${ratio}%"></i></div></div>
  </article>
  <article class="week"><div class="week-head"><div><h2>Cette semaine</h2><p>${esc(shortDate(start))} – ${esc(shortDate(week[6]))}</p></div><div class="arrows">${btn('left','Semaine précédente','week','data-offset="-7"')}${btn('right','Semaine suivante','week',`data-offset="7" ${start>=weekStart(today())?'disabled':''}`)}</div></div>
  <div class="week-days">${week.map(d=>{
    const checked=active().some(h=>done(h,d));
    return `<button class="week-day ${d===selected?'chosen':''} ${checked?'has-entry':''}" data-action="select-day" data-date="${d}" aria-label="${longDate(d)}" aria-pressed="${d===selected}" ${d>today()?'disabled':''}><small>${days[dayIndex(d)].slice(0,2)}</small><b>${asDate(d).getDate()}</b><i></i></button>`;
  }).join('')}</div><div class="week-foot">${svg('calendar',15)}<span>${isToday?'Aujourd’hui':capitalize(longDate(selected))}</span>${!isToday?'<button class="text-btn" data-action="reset-day">Revenir</button>':''}</div></article>
  </section>`;
}
function heatmap(h,anchor=selected,n=db.settings.range,interactive=true) {
  const end=shift(weekStart(anchor),6), start=shift(end,1-n);
  const dates=range(start,n);
  const months=dates.filter((d,i)=>i%7===0).map((d,i)=>{
    const prev=i?dates[(i-1)*7]:null;
    return `<span>${!prev||d.slice(0,7)!==prev.slice(0,7)?esc(format(d,{month:'short'}).replace('.','')):''}</span>`;
  });
  return `<div class="heatmap ${n===35?'heatmap-short':''}" style="--cols:${n/7}"><div class="heatmap-content"><div class="heat-months" aria-hidden="true">${months.join('')}</div>
    <div class="heat-body"><div class="day-labels" aria-hidden="true"><span>L</span><span>M</span><span>V</span><span>D</span></div>
    <div class="heat-cells">${dates.map(d=>{
      const valid=d<=today()&&d>=h.start;
      const filled=valid&&done(h,d);
      const entry=h.entries[d];
      const partial=valid&&!filled&&(amount(h,d)>0||!!entry?.note);
      const state=filled?'validé':partial?'activité enregistrée':valid?(due(h,d)?'non validé':'jour libre'):'hors période';
      const cls=`tile ${filled?'filled':''} ${partial?'partial':''} ${d===anchor?'selected':''} ${!valid||!due(h,d)?'inactive':''}`;
      const label=`${longDate(d)} · ${state}`;
      return interactive&&valid?`<button class="${cls}" data-action="entry" data-id="${h.id}" data-date="${d}" aria-label="${label}" title="${label}" tabindex="-1"></button>`:`<span class="${cls}" title="${label}"></span>`;
    }).join('')}</div></div></div></div>`;
}
function card(h,index,view=db.settings.view) {
  const complete=done(h,selected), possible=due(h,selected)&&selected<=today(), series=streaks(h,selected);
  const meta=h.kind==='check'?scheduleLabel(h):`${pretty(amount(h,selected))} / ${pretty(h.target)} ${esc(h.unit||'fois')}`;
  const immediate=h.kind==='check' && h.mode==='build';
  return `<article class="habit-card appear"  style="--habit:${colors[h.color]};--card-delay:${Math.min(index,5)*58}ms">
  <div class="habit-top"><button class="habit-name" data-action="detail" data-id="${h.id}"><span class="habit-icon">${svg(h.icon,22)}</span><span><strong>${esc(h.name)}</strong><small>${esc(h.description||h.category||scheduleLabel(h))}</small></span></button>
  ${btn(complete?'check':immediate?'plus':'pen',complete?'Validé. Modifier le suivi':immediate?'Valider '+h.name:'Saisir '+h.name,immediate&&possible?'toggle':'entry',`data-id="${h.id}" data-date="${selected}" ${immediate&&possible?`aria-pressed="${complete}"`:''} ${selected<h.start?'disabled':''}`,`check-btn ${complete?'checked':''}`)}
  </div>
  ${view==='grid'?heatmap(h):''}
  <div class="habit-bottom"><span class="streak">${svg(series.current?'flame':'calendar',16)}<b>${series.current?series.current+' '+series.unit+' de suite':meta}</b></span><button class="detail-link" data-action="detail" data-id="${h.id}">Détails ${svg('arrow',15)}</button></div>
  </article>`;
}
function dashboard() {
  const all=active(), categories=[...new Set(all.map(h=>h.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'fr'));
  if (category&&!categories.includes(category)) category='';
  const list=all.filter(h=>!category||category===h.category);
  return `<header class="page-head"><div><p class="eyebrow"><i></i> ${esc(longDate(selected).toUpperCase())}</p><h1>Accueil<span>.</span></h1><p>Construisez la routine qui vous ressemble.</p></div>${addHabitButton()}</header>
  ${summary()}
  <section class="habits"><div class="section-head"><div><h2>Mes habitudes <span class="count">${list.length}</span></h2><p>Un petit geste, puis un autre.</p></div><div class="tools"><div class="seg" aria-label="Mode d’affichage">${btn('grid','Vue grille','view',`data-view="grid" aria-pressed="${db.settings.view==='grid'}"`)}${btn('list','Vue liste','view',`data-view="list" aria-pressed="${db.settings.view==='list'}"`)}</div></div></div>
  ${categories.length?`<div class="filters"><button class="chip ${category?'':'on'}" data-action="category" data-category="" aria-pressed="${!category}">Toutes</button>${categories.map(c=>`<button class="chip ${category===c?'on':''}" data-action="category" data-category="${esc(c)}" aria-pressed="${category===c}">${esc(c)}</button>`).join('')}</div>`:''}
  ${list.length?`<div class="habit-grid ${db.settings.view==='list'?'compact':''}">${list.map((h,i)=>card(h,i)).join('')}</div>`:empty('leaf','Tout commence ici','Ajoutez une habitude et validez-la chaque fois que vous la pratiquez.','new','Créer une habitude')}
  </section>`;
}
function addHabitButton() {
  return `<button class="primary add" aria-label="Nouvelle habitude" data-action="new">${svg('plus',21)} <span>Nouvelle habitude</span></button>`;
}
function habitList() {
  const list=active();
  return `<section class="habits-page"><header class="page-head"><div><p class="eyebrow"><i></i> VOTRE ROUTINE</p><h1>Habitudes<span>.</span></h1><p>${list.length} habitude${list.length===1?'':'s'} en cours</p></div>${addHabitButton()}</header>
  ${list.length?`<div class="habit-grid compact">${list.map((h,i)=>card(h,i,'list')).join('')}</div>`:empty('leaf','Aucune habitude','Ajoutez une première habitude pour commencer le suivi.','new','Créer une habitude')}</section>`;
}
function empty(icon,title,desc,action='',label='') {
  return `<div class="empty"><span>${svg(icon,26)}</span><h3>${title}</h3><p>${desc}</p>${action?`<button class="primary" data-action="${action}">${svg('plus',18)} ${label}</button>`:''}</div>`;
}
function pageHead(title,desc,eyebrow) {
  return `<header class="page-head"><div><p class="eyebrow"><i></i> ${eyebrow}</p><h1>${title}<span>.</span></h1><p>${desc}</p></div></header>`;
}
function stats() {
  const all=active(), last=range(shift(today(),-27),28);
  const tally=last.map(d=>({d,eligible:all.filter(h=>due(h,d)).length,done:all.filter(h=>done(h,d)).length}));
  const finished=tally.reduce((sum,t)=>sum+t.done,0), eligible=tally.reduce((sum,t)=>sum+t.eligible,0);
  const current=all.filter(h=>streaks(h,today()).current>0).length;
  return `${pageHead('Statistiques','Retrouvez vos progrès sur les 28 derniers jours.','VOTRE RYTHME')}
  ${all.length?`<div class="stat-grid"><article><span>${svg('check')} Validations</span><strong>${finished}</strong></article><article><span>${svg('chart')} Taux de réussite</span><strong>${eligible?Math.round(finished*100/eligible):0} %</strong></article><article><span>${svg('flame')} Séries en cours</span><strong>${current}</strong></article></div>
  <article class="panel chart"><div class="section-head"><div><h2>Activité des 28 derniers jours</h2><p>${shortDate(last[0])} – ${shortDate(last[27])}</p></div></div><div class="bars">${tally.map((t,i)=>`<div title="${longDate(t.d)} · ${t.done} / ${t.eligible}"><i style="--bar:${Math.max(3,100*t.done/Math.max(1,all.length))}%;--delay:${i*13}ms"></i></div>`).join('')}</div></article>
  <article class="panel"><h2>Par habitude</h2>${all.map(h=>{
    const s=streaks(h,today()), n=last.filter(d=>done(h,d)).length;
    return `<button class="stat-row" data-action="detail" data-id="${h.id}" ${tint(h)}><span class="habit-icon">${svg(h.icon)}</span><span><strong>${esc(h.name)}</strong><small>${n} validation${n===1?'':'s'} sur 28 jours</small></span><span class="stat-end">Record : ${s.best} ${s.unit} ${svg('right',16)}</span></button>`;
  }).join('')}</article>`:empty('chart','Vos progrès apparaîtront ici','Ajoutez une habitude pour commencer à suivre votre activité.','new','Nouvelle habitude')}`;
}
function archive() {
  const all=db.habits.filter(h=>h.archived);
  return `<button class="back-link" data-action="nav" data-page="settings">${svg('left',18)} Retour aux paramètres</button>${pageHead('Archives','Faites une pause et reprenez à votre rythme.','HABITUDES EN PAUSE')}${all.length?`<article class="panel">${all.map(h=>`<div class="stat-row" ${tint(h)}><span class="habit-icon">${svg(h.icon)}</span><button class="row-title" data-action="detail" data-id="${h.id}"><strong>${esc(h.name)}</strong><small>${esc(h.description||scheduleLabel(h))}</small></button><button class="secondary" data-action="restore" data-id="${h.id}">Restaurer</button></div>`).join('')}</article>`:empty('archive','Les archives sont vides','Vous pouvez archiver une habitude depuis sa fiche pour mettre son suivi en pause.')}`;
}
function settings() {
  return `${pageHead('Paramètres','Personnalisez votre carnet et gardez une copie de vos données.','VOTRE ESPACE')}
  <article class="panel settings"><h2>Apparence</h2>
    <label class="settings-row"><span><strong>Thème</strong><small>Adaptez la luminosité de l’interface.</small></span><select data-setting="theme"><option value="dark" ${db.settings.theme==='dark'?'selected':''}>Sombre</option><option value="light" ${db.settings.theme==='light'?'selected':''}>Clair</option></select></label>
    <label class="settings-row"><span><strong>Période de la grille</strong><small>Choisissez la durée visible sur vos cartes.</small></span><select data-setting="range">${[35,91,182].map(n=>`<option value="${n}" ${db.settings.range===n?'selected':''}>${n/7} semaines</option>`).join('')}</select></label>
  </article>
  <article class="panel settings"><h2>Habitudes</h2>
    <button class="settings-row settings-link" data-action="nav" data-page="archive"><span><strong>Archives</strong><small>Consultez ou restaurez vos habitudes mises en pause.</small></span>${svg('right',20)}</button>
  </article>
  <article class="panel settings"><h2>Application et données</h2>
    <div class="settings-row"><span><strong>Installer Cadence</strong><small>Ouvrez votre carnet depuis l’écran d’accueil.</small></span>${btn('phone','Installer Cadence','install')}</div>
    <div class="settings-row"><span><strong>Exporter une sauvegarde</strong><small>Téléchargez vos habitudes, l’historique et vos réglages.</small></span>${btn('download','Exporter','export')}</div>
    <div class="settings-row"><span><strong>Importer une sauvegarde Cadence</strong><small>Restaurez vos données depuis un fichier JSON.</small></span>${btn('upload','Importer','import')}</div>
  </article>
  <article class="panel settings"><h2>Rappels</h2><p>Configurez une heure et des jours dans la fiche d’une habitude. Les rappels s’affichent pendant que Cadence est ouverte. Pour un rappel lorsque l’appli est fermée, ajoutez-le au calendrier de votre téléphone depuis la fiche.</p></article>`;
}
function render() {
  chrome();
  const scroll=window.scrollY;
  main.innerHTML=(storageError?'<p class="warning">Le stockage local a rencontré un problème. Exportez vos données depuis les paramètres si vous en avez besoin.</p>':'')+({today:dashboard,habits:habitList,stats,archive,settings}[page])();
  if (scroll>0) window.scrollTo(0,scroll);
}
function openModal(type, title, body, sub='') {
  if (!dialog.open) lastFocus=document.activeElement;
  activeModal=type;
  dialog.innerHTML=`<div class="dialog-body"><div class="dialog-head"><div><h2 id="dialog-title">${esc(title)}</h2>${sub?`<p>${esc(sub)}</p>`:''}</div>${btn('close','Fermer','close')}</div>${body}</div>`;
  dialog.setAttribute('aria-labelledby','dialog-title');
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop=0;
  (dialog.querySelector('[autofocus]')||dialog.querySelector('button')).focus({preventScroll:true});
}
function closeModal() { if(dialog.open) dialog.close(); }
dialog.addEventListener('close',()=>{
  activeModal=null;
  if (lastFocus?.isConnected) lastFocus.focus({preventScroll:true});
});
dialog.addEventListener('click',event=>{ if(event.target===dialog) closeModal(); });
function options(items,value) {
  return Object.entries(items).map(([key,label])=>`<option value="${key}" ${key===value?'selected':''}>${label}</option>`).join('');
}
function choices(items,name,value,draw) {
  return `<div class="choices">${Object.entries(items).map(([key,label])=>`<label title="${esc(label)}"><input type="radio" name="${name}" value="${key}" ${key===value?'checked':''} aria-label="${esc(label)}"><span>${draw(key)}</span></label>`).join('')}</div>`;
}
const dayChecks=(name,selected)=>`<div class="day-checks">${days.map((d,i)=>`<label><input type="checkbox" name="${name}" value="${i}" ${selected.includes(i)?'checked':''}><span>${d}</span></label>`).join('')}</div>`;
function edit(h) {
  const recurring=['daily','days','weekly','monthly','interval','none'];
  const initial=h??{name:'',description:'',category:'',color:'lilac',icon:'spark',start:today(),mode:'build',kind:'check',target:1,unit:'',repeat:'daily',frequency:1,days:[0,1,2,3,4,5,6],reminder:'',reminderDays:[0,1,2,3,4,5,6]};
  const categories=[...new Set(db.habits.map(item=>item.category).filter(Boolean))];
  openModal({name:'edit',id:h?.id},h?'Modifier l’habitude':'Nouvelle habitude',`
  <form id="habit-form">
    <label>Nom <input name="name" maxlength="64" required value="${esc(initial.name)}" placeholder="Ex. Marcher 20 minutes" autofocus></label>
    <label>Description <span class="optional">facultatif</span><input name="description" maxlength="160" value="${esc(initial.description)}" placeholder="Ajoutez un petit rappel de votre intention"></label>
    <div class="fields"><label>Catégorie<input name="category" list="categories" maxlength="35" value="${esc(initial.category)}" placeholder="Ex. Bien-être"><datalist id="categories">${categories.map(c=>`<option value="${esc(c)}">`).join('')}</datalist></label><label>Début<input type="date" name="start" required min="1900-01-01" max="${today()}" value="${initial.start}"></label></div>
    <fieldset><legend>Couleur</legend>${choices({mint:'Menthe',blue:'Bleu',lilac:'Lilas',peach:'Pêche',rose:'Rose',lemon:'Jaune',teal:'Turquoise',red:'Corail'},'color',initial.color,key=>`<i style="background:${colors[key]}"></i>`)}</fieldset>
    <fieldset><legend>Icône</legend>${choices(iconNames,'icon',initial.icon,key=>svg(key,18))}</fieldset>
    <div class="fields"><label>Intention<select name="mode">${options({build:'Cultiver une habitude',quit:'Réduire ou arrêter'},initial.mode)}</select></label><label>Type de suivi<select name="kind">${options({check:'Oui / Non',count:'Compteur',measure:'Mesure'},initial.kind)}</select></label></div>
    <div class="fields" id="goal-fields"><label><span id="target-label">Objectif par jour</span><input type="number" name="target" value="${initial.target}" step="any" max="1000000"></label><label>Unité<input name="unit" maxlength="18" value="${esc(initial.unit)}" placeholder="Ex. verres, minutes"></label></div>
    <div class="fields"><label>Répétition<select name="repeat">${options(Object.fromEntries(recurring.map((v,i)=>[v,['Chaque jour','Jours choisis','Objectif hebdomadaire','Objectif mensuel','Tous les X jours','Sans série'][i]])),initial.repeat)}</select></label><label id="freq-field"><span id="freq-label">Fréquence</span><input type="number" name="frequency" value="${initial.frequency}" min="1" step="1"></label></div>
    <fieldset id="days-field"><legend>Jours de suivi</legend>${dayChecks('days',initial.days)}</fieldset>
    <details ${initial.reminder?'open':''}><summary>${svg('bell',17)} Rappel facultatif</summary><label>Heure<input type="time" name="reminder" value="${initial.reminder}"></label><fieldset><legend>Jours du rappel</legend>${dayChecks('reminderDays',initial.reminderDays)}</fieldset><small>Le rappel s’affiche pendant que Cadence est ouverte.</small></details>
    <p class="form-error" role="alert" hidden></p><div class="modal-actions"><button type="button" class="secondary" data-action="${h?'detail':'close'}" ${h?`data-id="${h.id}"`:''}>Annuler</button><button class="primary" type="submit">${svg(h?'check':'plus',19)} ${h?'Enregistrer':'Créer l’habitude'}</button></div>
  </form>`);
  syncForm();
}
function syncForm() {
  const f=document.querySelector('#habit-form');
  if (!f) return;
  const values=f.elements;
  const check=values.kind.value==='check', quit=values.mode.value==='quit', repeat=values.repeat.value;
  document.querySelector('#goal-fields').hidden=check;
  values.target.disabled=check;
  values.target.required=!check;
  values.target.min=quit?'0':values.kind.value==='count'?'1':'0.01';
  values.target.step=values.kind.value==='count'?'1':'any';
  document.querySelector('#target-label').textContent=quit?'Maximum par jour':'Objectif par jour';
  document.querySelector('#days-field').hidden=repeat!=='days';
  const frequency=['weekly','monthly','interval'].includes(repeat);
  document.querySelector('#freq-field').hidden=!frequency;
  values.frequency.disabled=!frequency;
  values.frequency.required=frequency;
  values.frequency.max={weekly:7,monthly:31,interval:365}[repeat]||365;
  document.querySelector('#freq-label').textContent=({weekly:'Jours par semaine',monthly:'Jours par mois',interval:'Intervalle en jours'})[repeat]||'Fréquence';
}
function monthOffset(key,delta) {
  const d=asDate(key.slice(0,7)+'-01'); d.setMonth(d.getMonth()+delta); return dateKey(d);
}
function detail(h,month=selected.slice(0,7)+'-01') {
  const current=today();
  const s=streaks(h,current);
  const start=weekStart(month);
  const last=shift(monthOffset(month,1),-1);
  const num=asDate(last).getDate();
  const count=range(month,num).filter(d=>done(h,d)).length;
  const periodTotal=range(month,num).filter(d=>d<=current&&due(h,d)).length;
  const calendar=range(start,Math.ceil((dayIndex(month)+num)/7)*7);
  const position=db.habits.indexOf(h);
  const quotas=['weekly','monthly'].includes(h.repeat)?period(h,current):null;
  const quotaCount=quotas?range(...quotas).filter(d=>done(h,d)).length:0;
  openModal({name:'detail',id:h.id,month},h.name,`
  <div class="detail" ${tint(h)}>
   <div class="detail-intro"><span class="habit-icon">${svg(h.icon,23)}</span><span><strong>${esc(h.category||scheduleLabel(h))}</strong><small>${esc(h.category?scheduleLabel(h):h.mode==='quit'?'Habitude à réduire':'Habitude à cultiver')}${h.reminder?' · Rappel à '+h.reminder:''}</small></span>${btn('pen','Modifier','edit',`data-id="${h.id}"`)}</div>
   <div class="detail-stats"><div><small>Série en cours</small><strong>${s.current} ${s.unit}</strong></div><div><small>Record</small><strong>${s.best} ${s.unit}</strong></div><div><small>Ce mois affiché</small><strong>${count} / ${periodTotal}</strong></div></div>
   ${quotas?`<p class="hint">Objectif ${h.repeat==='weekly'?'cette semaine':'ce mois-ci'} · ${quotaCount} / ${h.frequency} jours</p>`:''}
   <div class="month"><div class="week-head"><h3>${capitalize(format(month,{month:'long',year:'numeric'}))}</h3><div class="arrows">${btn('left','Mois précédent','month','data-offset="-1"')}${btn('right','Mois suivant','month',`data-offset="1" ${month.slice(0,7)>=current.slice(0,7)?'disabled':''}`)}</div></div>
    <div class="calendar-grid">${days.map(d=>`<span>${d}</span>`).join('')}${calendar.map(d=>{
      const inside=d.slice(0,7)===month.slice(0,7);
      const entry=h.entries[d], completed=inside&&done(h,d);
      if (!inside) return '<span aria-hidden="true"></span>';
      return `<button class="cal-day ${completed?'filled':''} ${d===current?'current':''} ${entry?.note?'has-note':''} ${!due(h,d)?'off':''}" data-action="entry" data-date="${d}" data-id="${h.id}" aria-label="${longDate(d)}${completed?', validé':''}${entry?.note?', avec note':''}" ${d>current||d<h.start?'disabled':''}>${asDate(d).getDate()}</button>`;
    }).join('')}</div><p class="hint">Touchez une date pour modifier le suivi ou ajouter une note.</p></div>
   <div class="detail-actions">
   <button class="secondary" data-action="share" data-id="${h.id}">${svg('image',17)} Partager la grille</button>
   ${h.reminder?`<button class="secondary" data-action="ics" data-id="${h.id}">${svg('bell',17)} Ajouter le rappel au calendrier</button>`:''}
   <button class="secondary" data-action="${h.archived?'restore':'archive'}" data-id="${h.id}">${svg('archive',17)} ${h.archived?'Restaurer':'Archiver'}</button>
   ${!h.archived?`<div class="order">${btn('up','Déplacer vers le haut','move',`data-id="${h.id}" data-offset="-1" ${!db.habits.slice(0,position).some(item=>!item.archived)?'disabled':''}`)}${btn('down','Déplacer vers le bas','move',`data-id="${h.id}" data-offset="1" ${!db.habits.slice(position+1).some(item=>!item.archived)?'disabled':''}`)}</div>`:''}
   <button class="secondary danger" data-action="delete" data-id="${h.id}">${svg('trash',17)} Supprimer</button>
   </div></div>`,h.description);
}
function entry(h,d) {
  if(d<h.start||d>today()) return;
  const current=h.entries[d]??{value:0,note:''};
  const prev=activeModal?.name==='detail'?activeModal.month:null;
  const isCheck=h.kind==='check', quit=h.mode==='quit';
  openModal({name:'entry',id:h.id,date:d,prev},h.name, `<form id="entry-form">
  ${!due(h,d)?'<p class="hint">Jour libre. Cette date ne compte pas dans votre série.</p>':''}
  ${isCheck?`<label class="entry-check"><input type="checkbox" name="checked" ${current.value>=1?'checked':''}> <span>${quit?'J’ai pratiqué l’habitude que je veux arrêter':'J’ai pratiqué cette habitude'}</span></label>`:
  `<label>Quantité ${h.unit?'('+esc(h.unit)+')':''}<div class="stepper">${btn('minus','Diminuer','step','data-offset="-1"')}<input name="amount" type="number" min="0" max="1000000000" step="${h.kind==='count'?1:'any'}" value="${current.value}" required>${btn('plus','Augmenter','step','data-offset="1"')}</div></label><p class="hint">${quit?'Maximum':'Objectif'} : ${pretty(h.target)} ${esc(h.unit||'fois')}</p>`}
  <label>Note <span class="optional">facultatif</span><textarea name="note" maxlength="500" rows="3" placeholder="Comment ça s’est passé ?">${esc(current.note)}</textarea></label>
  <div class="modal-actions"><button type="button" class="secondary" data-action="entry-back">Annuler</button><button type="submit" class="primary">${svg('check',18)} Enregistrer</button></div></form>`,capitalize(longDate(d)));
}
function confirm(title,desc,label,fn) {
  openModal({name:'confirm',fn},title,`<p class="confirm-copy">${esc(desc)}</p><div class="modal-actions"><button class="secondary" data-action="close" autofocus>Annuler</button><button class="primary" data-action="confirm">${esc(label)}</button></div>`);
}
function toast(message,icon='check') {
  clearTimeout(toastTimer);
  toastNode.innerHTML=svg(icon,18)+'<span>'+esc(message)+'</span>';
  toastNode.classList.add('visible');
  toastTimer=setTimeout(()=>toastNode.classList.remove('visible'),3600);
}
function celebrate(el,color) {
  if (!el||matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r=el.getBoundingClientRect(), wrap=document.querySelector('#sparks');
  for(let i=0;i<12;i++) {
    const piece=document.createElement('i'), angle=2*Math.PI*i/12, length=25+i%4*10;
    piece.style.cssText=`left:${r.left+r.width/2}px;top:${r.top+r.height/2}px;--dx:${Math.cos(angle)*length}px;--dy:${Math.sin(angle)*length}px;--color:${i%3===0?'#f4d88d':color}`;
    wrap.append(piece);
    piece.addEventListener('animationend',()=>piece.remove(),{once:true});
  }
}
function download(blob,filename) {
  const a=document.createElement('a'), url=URL.createObjectURL(blob);
  a.href=url; a.download=filename; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1500);
}
function exportData() {
  download(new Blob([JSON.stringify(db,null,2)],{type:'application/json'}),`cadence-${today()}.json`);
  toast('Sauvegarde téléchargée.');
}
function calendarReminder(h) {
  const now=new Date(), clock=now.toTimeString().slice(0,5), t=today();
  const first=range(t,8).find(d=>h.reminderDays.includes(dayIndex(d))&&(d!==t||h.reminder>clock));
  const toIcs=s=>s.replace(/\\/g,'\\\\').replace(/[;,]/g,'\\$&').replace(/\r?\n/g,'\\n');
  const timestamp=now.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Cadence//FR','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${h.id}@mosaique`,`DTSTAMP:${timestamp}`,`DTSTART:${first.replaceAll('-','')}T${h.reminder.replace(':','')}00`,'DURATION:PT5M',`SUMMARY:${toIcs(h.name)}`,`RRULE:FREQ=WEEKLY;BYDAY=${h.reminderDays.map(i=>['MO','TU','WE','TH','FR','SA','SU'][i]).join(',')}`,'BEGIN:VALARM','ACTION:DISPLAY','TRIGGER:PT0M',`DESCRIPTION:${toIcs(h.name)}`,'END:VALARM','END:VEVENT','END:VCALENDAR',''];
  download(new Blob([lines.join('\r\n')],{type:'text/calendar;charset=utf-8'}),'cadence-rappel.ics');
  toast('Ouvrez le fichier dans votre calendrier.', 'calendar');
}
async function shareGrid(h) {
  const cv=document.createElement('canvas'); cv.width=900; cv.height=650;
  const ctx=cv.getContext('2d');
  const tile=36, gap=10, start=shift(weekStart(today()),-84);
  ctx.fillStyle='#17131f';ctx.fillRect(0,0,900,650);
  ctx.fillStyle='#c0a6ff';ctx.font='bold 22px Noto, sans-serif';ctx.fillText('CADENCE  /  MON CARNET D’HABITUDES',58,68);
  ctx.fillStyle='#f9f6ff';ctx.font='bold 44px Noto, sans-serif';ctx.fillText(h.name,58,137,784);
  ctx.fillStyle='#aaa0b6';ctx.font='20px Noto, sans-serif';ctx.fillText(`${shortDate(start)} – ${shortDate(today())}`,58,182);
  range(start,91).forEach((d,i)=>{
    ctx.globalAlpha=d>today()||d<h.start?0.25:1;
    ctx.fillStyle=done(h,d)?colors[h.color]:amount(h,d)>0?'#74658f':'#352d44';
    ctx.beginPath(); ctx.roundRect(58+Math.floor(i/7)*(tile+gap),223+(i%7)*(tile+gap),tile,tile,7); ctx.fill();
  });
  ctx.globalAlpha=1;
  const s=streaks(h,today());
  ctx.fillStyle=colors[h.color];ctx.font='bold 23px Noto, sans-serif';ctx.fillText(`Série actuelle : ${s.current} ${s.unit}    •    Record : ${s.best} ${s.unit}`,58,596);
  const blob=await new Promise(resolve=>cv.toBlob(resolve,'image/png'));
  if (!blob) {toast('Impossible de créer l’image.','image');return;}
  const file=new File([blob],'cadence-progres.png',{type:'image/png'});
  if(navigator.canShare?.({files:[file]})) {
    try {await navigator.share({files:[file],title:h.name}); return;} catch (err) {if(err.name==='AbortError') return;}
  }
  download(blob,file.name);toast('Image téléchargée.','image');
}
async function install() {
  if(installEvent) {
    const prompt=installEvent; installEvent=null;
    await prompt.prompt();
    return;
  }
  if(matchMedia('(display-mode: standalone)').matches||navigator.standalone) {toast('Cadence est déjà installée.','phone');return;}
  openModal({name:'install'},'Installer Cadence',`<div class="install-guide"><img src="./assets/icon.svg" alt=""><div><strong>Android · Chrome</strong><p>Ouvrez le menu ⋮, puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».</p><strong>iPhone · Safari</strong><p>Ouvrez « Partager », puis « Sur l’écran d’accueil » et touchez « Ajouter ».</p></div></div><p class="hint">Ouvrez Cadence une première fois en ligne avant de l’utiliser sans connexion.</p><div class="modal-actions"><button class="primary" data-action="close">Compris</button></div>`);
}
function log(h,d,value,note) {
  const entries={...h.entries};
  if(value||note) entries[d]={value,note}; else delete entries[d];
  return replaceHabit({...h,entries});
}
function backFromEntry(h,prev) {
  if(prev) detail(h,prev); else closeModal();
}
document.addEventListener('submit',event=>{
  const f=event.target;
  if(!['habit-form','entry-form'].includes(f.id)) return;
  event.preventDefault();
  const data=new FormData(f);
  if(f.id==='habit-form') {
    const h=get(activeModal?.id), name=data.get('name').trim(), daysSelected=data.getAll('days').map(Number), reminderDays=data.getAll('reminderDays').map(Number);
    const err=f.querySelector('.form-error');
    const message=!name?'Donnez un nom à votre habitude.':data.get('repeat')==='days'&&!daysSelected.length?'Choisissez au moins un jour de suivi.':data.get('reminder')&&!reminderDays.length?'Choisissez au moins un jour de rappel.':'';
    if(message) {err.textContent=message;err.hidden=false;return;}
    const next={...Object.fromEntries(data),id:h?.id??crypto.randomUUID(),name,frequency:Number(data.get('frequency'))||1,days:daysSelected,reminderDays,target:data.get('kind')==='check'?1:Number(data.get('target')),entries:h?.entries??{},archived:h?.archived??false};
    if(!persist(normalize({...db,habits:h?db.habits.map(item=>item.id===h.id?next:item):[...db.habits,next]}))) return;
    render();
    if(h) detail(get(h.id)); else {closeModal();category='';selected=today();page='habits';render();window.scrollTo(0,0);}
    toast(h?'Habitude modifiée.':'Habitude créée.');
  } else {
    const {id,date,prev}=activeModal,h=get(id);
    if(!h) return;
    const value=h.kind==='check'?(data.has('checked')?1:0):Number(data.get('amount'));
    const wasDone=done(h,date);
    if(!log(h,date,value,data.get('note').trim())) return;
    if(!wasDone&&done(get(id),date)) celebrate(f.querySelector('[type=submit]'),colors[h.color]);
    render();backFromEntry(get(id),prev);toast('Suivi enregistré.');
  }
});
document.addEventListener('change',event=>{
  if(event.target.closest('#habit-form')) syncForm();
  const {setting}=event.target.dataset;
  if(setting && persist({...db,settings:{...db.settings,[setting]:setting==='range'?Number(event.target.value):event.target.value}})) render();
});
document.addEventListener('click',event=>{
  const el=event.target.closest('button[data-action]');
  if(!el||el.disabled) return;
  const {action,id,date,offset}=el.dataset;
  const h=id?get(id):null;
  switch(action) {
    case 'nav': page=el.dataset.page; if(page==='habits') selected=today(); render(); window.scrollTo(0,0); main.focus({preventScroll:true}); break;
    case 'new': edit(); break;
    case 'edit': edit(h); break;
    case 'detail': if(h) detail(h); break;
    case 'close': closeModal(); break;
    case 'select-day': selected=date; render(); break;
    case 'reset-day': selected=today(); render(); break;
    case 'week': selected=[shift(selected,Number(offset)),today()].sort()[0]; render(); break;
    case 'month': detail(get(activeModal.id),monthOffset(activeModal.month,Number(offset))); break;
    case 'category': category=el.dataset.category; render(); break;
    case 'view': if(persist({...db,settings:{...db.settings,view:el.dataset.view}})) render(); break;
    case 'toggle': {
      const wasDone=done(h,date);
      if(log(h,date,wasDone?0:1,h.entries[date]?.note??'')) {
        if(!wasDone) celebrate(el,colors[h.color]);
        render();
        main.querySelector(`[data-action="toggle"][data-id="${id}"]`)?.focus({preventScroll:true});
        toast(wasDone?'Validation retirée.':'Habitude validée !',wasDone?'calendar':'check');
      }
      break;
    }
    case 'entry': if(h) entry(h,date); break;
    case 'entry-back': backFromEntry(get(activeModal.id),activeModal.prev); break;
    case 'step': {
      const input=document.querySelector('#entry-form input[name=amount]');
      input.value=Math.min(1e9,Math.max(0,Math.round((Number(input.value)+Number(offset))*1000000)/1000000));
      break;
    }
    case 'archive':
    case 'restore':
      if(replaceHabit({...h,archived:action==='archive'})) {closeModal();render();toast(action==='archive'?'Habitude archivée.':'Habitude restaurée.','archive');}
      break;
    case 'move': {
      const index=db.habits.indexOf(h), delta=Number(offset), habits=[...db.habits];
      let to=index+delta;
      while(habits[to]?.archived) to+=delta;
      if(habits[to]) {[habits[index],habits[to]]=[habits[to],habits[index]]; if(persist({...db,habits})) {render();detail(h,activeModal.month);}}
      break;
    }
    case 'delete': confirm('Supprimer cette habitude ?',`« ${h.name} » et son historique seront effacés de cet appareil.`,'Supprimer',()=>{
      if(persist({...db,habits:db.habits.filter(item=>item.id!==h.id)})) {closeModal();render();toast('Habitude supprimée.','trash');}
    });break;
    case 'confirm': activeModal.fn();break;
    case 'install': install();break;
    case 'share': shareGrid(h);break;
    case 'ics': calendarReminder(h);break;
    case 'export': exportData();break;
    case 'import': fileInput.click();break;
  }
});
fileInput.addEventListener('change',async()=>{
  const file=fileInput.files[0];
  fileInput.value='';
  if(!file) return;
  try {
    if(file.size>15*1024*1024) throw Error('Le fichier dépasse 15 Mo.');
    let parsed;
    try {parsed=JSON.parse(await file.text());} catch {throw Error('Le fichier JSON ne peut pas être lu.');}
    const restored=normalize(parsed);
    confirm('Restaurer la sauvegarde ?',`Ce fichier contient ${restored.habits.length} habitude(s). L’import remplacera les données actuelles sur cet appareil.`,'Restaurer',()=>{
      if(persist(restored)) {closeModal();category='';selected=today();render();toast('Sauvegarde restaurée.');}
    });
  } catch(err) { openModal({name:'import-error'},'Import impossible',`<p>${esc(err.message)}</p><div class="modal-actions"><button class="primary" data-action="close">Fermer</button></div>`); }
});
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvent=e;});
window.addEventListener('appinstalled',()=>{installEvent=null;chrome();toast('Cadence est installée.','phone');});
window.addEventListener('online',connection);
window.addEventListener('offline',connection);
window.addEventListener('storage',event=>{
  if(event.key!==appKey||!event.newValue) return;
  try {db=normalize(JSON.parse(event.newValue)); closeModal(); render();} catch {}
});
const fired=new Set();
function tick() {
  const d=today(), now=new Date();
  if(lastDay!==d) {if(selected===lastDay) selected=d;lastDay=d;fired.clear();render();}
  if(document.hidden) return;
  const time=now.toTimeString().slice(0,5);
  const reminders=active().filter(h=>h.reminder===time&&h.reminderDays.includes(dayIndex(d))&&!fired.has(h.id)&&(h.mode==='quit'||!done(h,d)));
  if(reminders.length) {
    reminders.forEach(h=>fired.add(h.id));
    toast('Rappel : '+reminders.map(h=>h.name).join(' · '),'bell');
  }
}
setInterval(tick,15000);
document.addEventListener('visibilitychange',tick);
render();
tick();
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js?v=7').then(()=>navigator.serviceWorker.ready).then(()=>{offlineReady=true;connection();}).catch(()=>{});
}
