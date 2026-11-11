export const colors = {mint:'#83e5bb', blue:'#86b4ff', lilac:'#c0a6ff', peach:'#f4ae8c', rose:'#f2a4cf', lemon:'#e9d88c', teal:'#76d9dd', red:'#f5909e'};
export const iconNames = {drop:'Eau',book:'Lecture',dumbbell:'Sport',moon:'Sommeil',sun:'Matin',leaf:'Nature',heart:'Santé',coffee:'Pause',pen:'Écriture',music:'Musique',code:'Code',walk:'Marche',bike:'Vélo',globe:'Langues',spark:'Bien-être',grid:'Autre'};
export const days = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
export const dateKey = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const asDate = key => new Date(key+'T12:00:00');
export function shift(key, delta) {
  const d = asDate(key);
  d.setDate(d.getDate()+delta);
  return dateKey(d);
}
export const today = () => dateKey(new Date());
export const dayIndex = key => (asDate(key).getDay()+6)%7;
export const weekStart = key => shift(key,-dayIndex(key));
const monthStart = key => key.slice(0,7)+'-01';
export const range = (start,n) => Array.from({length:n},(_,i)=>shift(start,i));
const diff = (a,b) => Math.round((asDate(a)-asDate(b))/86400000);
const validDate = key => typeof key==='string' && /^\d{4}-\d{2}-\d{2}$/.test(key) && key>='1900-01-01' && key<='9999-12-31' && !Number.isNaN(+asDate(key)) && dateKey(asDate(key))===key;
export const amount = (h,d) => h.entries[d]?.value ?? 0;
export function due(h,d) {
  if (d<h.start) return false;
  if (h.repeat==='days') return h.days.includes(dayIndex(d));
  if (h.repeat==='interval') return diff(d,h.start)%h.frequency===0;
  return true;
}
export function done(h,d) {
  if (!due(h,d) || d>today()) return false;
  if (h.mode==='quit') return h.kind==='check' ? amount(h,d)===0 : amount(h,d)<=h.target;
  return amount(h,d)>=h.target;
}
export function period(h,d) {
  if (h.repeat==='weekly') return [weekStart(d),7];
  const start=monthStart(d);
  const date=asDate(start);
  return [start,new Date(date.getFullYear(),date.getMonth()+1,0).getDate()];
}
export function streaks(h,end) {
  if (end<h.start || h.repeat==='none') return {current:0,best:0,unit:'j'};
  let best=0, current=0;
  if (['weekly','monthly'].includes(h.repeat)) {
    let [key]=period(h,h.start);
    while (key<=end) {
      const [,length]=period(h,key);
      const last=shift(key,length-1);
      const eligible=range(key,length).filter(d=>d>=h.start && d<=end);
      if (eligible.filter(d=>done(h,d)).length>=h.frequency) current++;
      else if (last<=end) current=0;
      best=Math.max(best,current);
      key=shift(last,1);
    }
    return {current,best,unit:h.repeat==='weekly'?'sem.':'mois'};
  }
  for (let d=h.start; d<=end; d=shift(d,1)) {
    if (!due(h,d)) continue;
    if (done(h,d)) current++;
    else if (d!==today()) current=0;
    best=Math.max(best,current);
  }
  return {current,best,unit:'j'};
}
export function scheduleLabel(h) {
  if (h.repeat==='days') return h.days.map(i=>days[i]).join(' · ');
  if (h.repeat==='weekly') return `${h.frequency} × / semaine`;
  if (h.repeat==='monthly') return `${h.frequency} × / mois`;
  if (h.repeat==='interval') return `Tous les ${h.frequency} jours`;
  if (h.repeat==='none') return 'Sans série';
  return 'Quotidien';
}
const modes=['build','quit'], kinds=['check','count','measure'], schedules=['daily','days','weekly','monthly','interval','none'];
const str=(v,max)=>typeof v==='string'?v.trim().slice(0,max):'';
const num=(v,min,max,fallback)=>Number.isFinite(v)&&v>=min&&v<=max?v:fallback;
export function normalize(data) {
  if (!data || data.format!=='mosaique' || data.version!==1 || !Array.isArray(data.habits) || data.habits.length>1000) throw Error('Ce fichier ne correspond pas à une sauvegarde Cadence.');
  const ids=new Set();
  const habits=data.habits.filter(h=>!h?.demo).map(h=>{
    if (!h || !/^[\w-]{1,80}$/.test(h.id) || typeof h.id!=='string' || ids.has(h.id) || !str(h.name,64) || !validDate(h.start)) throw Error('Une habitude du fichier est invalide.');
    ids.add(h.id);
    const entries={};
    if (h.entries && typeof h.entries==='object') {
      for (const [d,entry] of Object.entries(h.entries)) {
        if (validDate(d) && entry && typeof entry==='object') entries[d]={value:num(entry.value,0,1e9,0),note:str(entry.note,500)};
      }
    }
    const mode=modes.includes(h.mode)?h.mode:'build';
    const kind=kinds.includes(h.kind)?h.kind:'check';
    const repeat=schedules.includes(h.repeat)?h.repeat:'daily';
    const frequency=Math.trunc(num(h.frequency,1,repeat==='weekly'?7:repeat==='monthly'?31:365,repeat==='interval'?2:1));
    const selectedDays=Array.isArray(h.days)?[...new Set(h.days.filter(d=>Number.isInteger(d)&&d>=0&&d<=6))].sort():[];
    const reminderDays=Array.isArray(h.reminderDays)?[...new Set(h.reminderDays.filter(d=>Number.isInteger(d)&&d>=0&&d<=6))].sort():[];
    return {id:h.id,name:str(h.name,64),description:str(h.description,160),category:str(h.category,35),
      start:h.start, mode,kind,repeat,frequency,days:selectedDays.length?selectedDays:[0,1,2,3,4,5,6],
      unit:str(h.unit,18),target:kind==='check'?1:num(h.target,mode==='quit'?0:0.01,1e6,1),
      icon:Object.hasOwn(iconNames,h.icon)?h.icon:'spark',color:Object.hasOwn(colors,h.color)?h.color:'lilac',
      reminder:typeof h.reminder==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(h.reminder)?h.reminder:'',
      reminderDays:reminderDays.length?reminderDays:[0,1,2,3,4,5,6],
      archived:!!h.archived,entries};
  });
  return {format:'mosaique',version:1,settings:{theme:data.settings?.theme==='light'?'light':'dark',range:[35,91,182].includes(data.settings?.range)?data.settings.range:91,view:data.settings?.view==='list'?'list':'grid'},habits};
}
export const emptyData = () => normalize({format:'mosaique',version:1,habits:[]});
