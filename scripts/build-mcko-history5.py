"""Rebuild the 20 author-written history variants and code-native figures.
Inputs: lib/mcko/humanities5/history-{content,sources}.json. Coastline: Natural Earth, public domain.
"""
import json,math
from itertools import combinations
from pathlib import Path
from html import escape
ROOT=Path(__file__).resolve().parents[1];D=ROOT/'lib/mcko/humanities5';OUT=ROOT/'public/images/mcko-5-history';OUT.mkdir(parents=True,exist_ok=True)
content=json.loads((D/'history-content.json').read_text());sources=json.loads((D/'history-sources.json').read_text())
ONE='1 балл — верный ответ; иначе 0. Равнозначная формулировка допускается.'
SEQ='2 балла — все соответствия верны; 1 — ошибка или пропуск ровно в одной позиции; 0 — ошибки в двух или более позициях.'
TWO='Укажите ровно два номера. 2 балла — оба верны; 1 — один верный и один неверный либо указан только один верный; 0 — нет верных или указано больше двух номеров. Повтор номера не считается вторым ответом.'
def rotate(a,n):n%=len(a);return a[n:]+a[:n]
def lines(a):return '\n'.join(f'{i+1}) {v}' for i,v in enumerate(a))
def pick(question,options,n):
 items=rotate(list(enumerate(options)),n)
 return question+'\nВыберите один ответ.\n'+lines([x[1] for x in items]),str(next(i+1 for i,x in enumerate(items) if x[0]==0))+' — '+options[0]
def two(question,options,n):
 items=rotate(list(enumerate(options)),n);return question+'\nВыберите два верных утверждения и запишите их номера.\n'+lines([x[1] for x in items]),', '.join(str(i+1) for i,x in enumerate(items) if x[0]<2)
def task(n,text,answer,points=1,solution='',**extra):return dict(n=n,text=text,answer=answer,solution=solution,points=points,level='Б',rubric=ONE,**extra)
def part(l,text,answer,points=1,solution='',rubric=ONE):return dict(label=l,text=text,answer=answer,points=points,solution=solution,rubric=rubric)
def group(n,text,parts,**extra):
 t=task(n,text,'\n'.join(p['label']+': '+p['answer'] for p in parts),sum(p['points'] for p in parts),**extra);t['parts']=parts;return t
def txt(x,y,s,size=16,anchor='start'):return f'<text x="{x}" y="{y}" font-size="{size}" text-anchor="{anchor}">{escape(str(s))}</text>'
def line(x,y,X,Y,stroke='#334155',w=1):return f'<line x1="{x}" y1="{y}" x2="{X}" y2="{Y}" stroke="{stroke}" stroke-width="{w}"/>'
def mark(x,y,s):return f'<circle cx="{x}" cy="{y}" r="12" fill="white" stroke="#0f172a" stroke-width="2"/>'+txt(x,y+5,s,15,'middle')
def svg(name,body,w=760,h=360):
 (OUT/f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}"><rect width="100%" height="100%" fill="white"/><g font-family="Arial,sans-serif" fill="#172033">{body}</g></svg>')
def figure(name,alt):return dict(kind='image',src=f'/images/mcko-5-history/{name}.svg',alt=alt)
land=json.loads((ROOT/'scripts/data/ne_110m_land.geojson').read_text())
def xy(lon,lat):return round(25+(lon+12)*710/74,1),round(35+(53-lat)*300/34,1)
base='<defs><clipPath id="map"><rect x="25" y="35" width="710" height="300"/></clipPath></defs><rect x="25" y="35" width="710" height="300" fill="#e5f3fa" stroke="#475569"/><g clip-path="url(#map)">'
for f in land['features']:
 g=f['geometry'];polys=g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
 for poly in polys:
  d=' '.join('M'+' L'.join(f'{x},{y}' for x,y in (xy(*p[:2]) for p in ring))+' Z' for ring in poly)
  base+=f'<path d="{d}" fill="#ede9d8" stroke="#64748b" stroke-width="0.7"/>'
for river in [[(31.2,30.5),(31.1,28),(32.6,25.7),(32.9,24.1),(32.6,23),(31,20)],[(39,39),(38,37),(40,35),(42,34),(44,32),(47,30.5)],[(40,38),(42,37),(43,35),(44.5,33),(47,30.5)]]:
 base+='<polyline points="'+' '.join(f'{x},{y}' for x,y in map(lambda p:xy(*p),river))+'" fill="none" stroke="#3987b0" stroke-width="1.5"/>'
base+='</g>'+txt(30,24,'Средиземноморье и Передняя Азия. Север сверху.',16)+txt(305,209,'Средиземное море',13,'middle')+txt(725,355,'Современные береговые контуры; границы государств не показаны.',11,'end')
cities=[('Рим',12.5,41.9),('Афины',23.7,38),('Спарта',22.4,37.1),('Александрия Египетская',29.9,31.2),('Вавилон',44.4,32.5),('Мемфис',31.25,29.85),('Фивы в Египте',32.65,25.7),('Тир',35.2,33.3),('Сидон',35.4,33.55),('Карфаген',10.3,36.85),('Ниневия',43.15,36.35),('Ур',46.1,30.96),('Иерусалим',35.2,31.77),('Олимпия',21.63,37.64),('Троя',26.24,39.96),('Коринф',22.88,37.91),('Милет',27.3,37.53),('Сиракузы',15.3,37.08),('Византий',28.98,41),('Персеполь',52.9,29.94)]
dates=[[-776,-490,79],[-753,-221,476],[-594,-31,313],[-480,-44,395],[-509,-146,330],[-300,-100,200],[-700,-400,100],[-600,-200,400],[-800,-500,300],[-900,-300,500],[-750,-250,150],[-650,-150,250],[-550,-350,450],[-850,-450,350],[-950,-550,50],[-720,-320,180],[-620,-120,280],[-520,-220,380],[-820,-420,480],[-920,-520,80]]
def year(y):return f'{abs(y)} г. '+('до н. э.' if y<0 else 'н. э.')
# Clearly labelled educational sketches, not reproductions of particular museum objects.
def artifact(k):
 if k=='pyramid':return '<path d="M15 115 L92 18 L165 115 Z" fill="#e8c88c" stroke="#6b4e2a" stroke-width="2"/><path d="M92 18 L112 115 L165 115" fill="#c39a59" stroke="#6b4e2a"/>'+txt(90,145,'Пирамида',14,'middle')
 if k=='ziggurat':return '<path d="M15 115 V92 H36 V70 H57 V48 H77 V26 H105 V48 H127 V70 H148 V92 H169 V115 Z" fill="#d3ae8f" stroke="#705137" stroke-width="2"/><path d="M79 115 L88 26 H96 L107 115 Z" fill="#ede0c9"/>'+txt(90,145,'Ступенчатый храм',14,'middle')
 if k=='temple':
  return '<path d="M15 42 L90 15 L165 42 Z M15 112 H165 V123 H15 Z" fill="#e5e7eb" stroke="#475569" stroke-width="2"/>'+''.join(f'<rect x="{x}" y="45" width="12" height="67" fill="#e5e7eb" stroke="#475569"/>' for x in range(25,155,24))+txt(90,145,'Храм с колоннами',14,'middle')
 if k=='amphitheatre':
  return '<ellipse cx="90" cy="50" rx="75" ry="26" fill="#e3cfb5" stroke="#68543e"/><path d="M15 50 V110 Q90 148 165 110 V50 Q90 89 15 50" fill="#e3cfb5" stroke="#68543e"/>'+''.join(f'<path d="M{x} {y+17} V{y+6} Q{x+5} {y-3} {x+10} {y+6} V{y+17} Z" fill="#675645"/>' for y in [63,89] for x in [28,50,73,96,120,142])+txt(90,155,'Амфитеатр',14,'middle')
 if k=='wall':return '<path d="M5 118 L43 92 L74 97 L113 55 L171 37 V17 L113 35 L74 77 L43 72 L5 98 Z" fill="#cab7a1" stroke="#6d5b48" stroke-width="2"/>'+''.join(f'<path d="M{x} {y} v-32 h10 v6 h10 v-6 h10 v32 Z" fill="#cab7a1" stroke="#6d5b48"/>' for x,y in [(28,83),(100,50),(147,28)])+txt(90,145,'Стена с башнями',14,'middle')
 if k=='stupa':return '<path d="M15 111 Q90 5 165 111 Z" fill="#d6c1a0" stroke="#6d5b48" stroke-width="2"/><rect x="76" y="47" width="28" height="16" fill="#d6c1a0" stroke="#6d5b48"/><path d="M90 47 V15 M73 25 H107 M78 17 H102" stroke="#6d5b48" stroke-width="3"/><path d="M20 115 H160 V125 H20 Z" fill="#d6c1a0" stroke="#6d5b48"/>'+txt(90,150,'Ступа',14,'middle')
 if k=='obelisk':return '<path d="M70 120 L77 28 L90 7 L103 28 L110 120 Z" fill="#e0c696" stroke="#705432" stroke-width="2"/>'+''.join(txt(90,y,'⊙',12,'middle') for y in [53,75,97])+txt(90,150,'Обелиск',14,'middle')
 if k=='theatre':return ''.join(f'<path d="M{90-r} 45 A{r} {r} 0 0 0 {90+r} 45" fill="none" stroke="#94856f" stroke-width="6"/>' for r in [25,39,53,67,81])+line(10,45,170,45)+txt(90,150,'Театр на склоне',14,'middle')
sets=[[('pyramid','Древний Египет'),('ziggurat','Древнее Междуречье'),('temple','Древняя Греция'),('amphitheatre','Древний Рим')],[('wall','Древний Китай'),('amphitheatre','Древний Рим'),('pyramid','Древний Египет'),('theatre','Древняя Греция')]]
memories=json.loads((D/'history-memory.json').read_text())
variants=[]
for i in range(20):
 n=i+1;tasks=[];values=dates[i];display=rotate(values,i+1);labels=rotate(list('АБВ'),i)
 body=txt(25,24,'Лента времени. Деления подписаны через 100 лет.',16)
 # Historical year -1 is immediately followed by +1; there is no year zero.
 def tx(y):return 55+((y if y<0 else y-1)+1000)*650/1500
 body+=line(50,110,718,110,w=2)+'<path d="M718 110 l-10 -5 v10 Z" fill="#334155"/>'
 for y in list(range(-1000,0,100))+list(range(100,501,100)):
  x=tx(y);body+=line(x,105,x,116)+txt(x,140,abs(y),11,'middle')
 boundary=tx(0);body+=line(boundary,75,boundary,155,'#64748b')+txt(boundary,175,'Начало нашей эры',13,'middle')
 for val,lab in zip(sorted(values),labels):body+=line(tx(val),83,tx(val),109,'#9f1239',2)+mark(tx(val),68,lab)
 body+=txt(90,190,'до н. э.',14)+txt(642,190,'н. э.',14)+txt(25,215,'Буквы отмечают годы; года 0 в историческом летосчислении нет.',13)
 svg(f'timeline-{n}',body,760,230)
 ans='; '.join(l+': '+year(v) for l,v in sorted(zip(labels,sorted(values))))
 t=task(1,'Соотнесите годы с точками А, Б, В на ленте времени. Запишите год и обозначение эры для каждой буквы.\nГоды: '+', '.join(year(v) for v in display)+'.',ans,2,'До нашей эры более раннему событию соответствует больший номер года; в нашей эре номера возрастают слева направо.',figure=figure(f'timeline-{n}','Лента времени с делениями и тремя буквенными метками.'));t['rubric']=SEQ;tasks.append(t)
 target=cities[i];others=[]
 for c in rotate(cities,i+5):
  if c==target or any(math.hypot(c[1]-p[1],c[2]-p[2])<7 for p in [target]+others):continue
  others.append(c)
  if len(others)==3:break
 points=rotate([target]+others,i);body=base
 for j,c in enumerate(points):body+=mark(*xy(c[1],c[2]),j+1)
 svg(f'map-{n}',body)
 tasks.append(task(2,f'Какой цифрой на карте обозначен город {target[0]}? Запишите одну цифру.',str(points.index(target)+1),solution=f'{target[0]} обозначен цифрой {points.index(target)+1}. Другие точки: '+', '.join(f'{j+1} — {c[0]}' for j,c in enumerate(points) if c!=target)+'.',figure=figure(f'map-{n}','Контурная карта с четырьмя пронумерованными городами.')))
 arts=rotate(sets[i%2],i//2);countries=rotate([a[1] for a in arts],1+i%3);body=txt(25,26,'Учебные рисунки типов древних сооружений (не в масштабе)',17)
 for j,(kind,_) in enumerate(arts):
  x=20+j*185;body+=f'<g transform="translate({x},55)">'+artifact(kind)+mark(90,186,'АБВГ'[j])+'</g>'
 svg(f'artifacts-{n}',body,780,265)
 text='Соотнесите изображения А–Г с цивилизациями, для которых эти типы сооружений особенно характерны. Каждую цифру используйте один раз.\n'+lines(countries)
 answer='; '.join(f'{"АБВГ"[j]} — {countries.index(c)+1}' for j,(_,c) in enumerate(arts))
 t=task(3,text,answer,2,'Соответствия: '+', '.join(f'{"АБВГ"[j]} — {c}' for j,(_,c) in enumerate(arts))+'.',figure=figure(f'artifacts-{n}','Четыре рисунка сооружений с буквами А–Г.'));t['rubric']=SEQ;tasks.append(t)
 s=sources[i];options=[s['region']]+[r for r in ['Древний Египет','Древняя Греция','Древний Рим','Древний Китай','Древняя Индия','Древний Вавилон'] if r!=s['region']][:3];q,a=pick('Историю какой страны или цивилизации помогает изучать этот текст?',options,i)
 tasks.append(task(4,q,a,reading=s['text'],solution='В тексте названы деятели, обычаи или места, связанные с этой цивилизацией.'))
 tasks.append(group(5,'Ответьте на два вопроса по тексту задания 4. Достаточно коротких, но точных ответов.',[part('А',*s['questions'][0],solution=s['questions'][0][1]),part('Б',*s['questions'][1],solution=s['questions'][1][1])]))
 term=content['terms'][i]
 ids=list(combinations(range(len(content['idioms'])),3))[i];phrases=[content['idioms'][j] for j in ids];meanings=rotate([p[1] for p in phrases],i+1)
 q='Соотнесите выражения с их значениями. Каждую цифру используйте один раз.\n'+'\n'.join(f'{"АБВ"[j]}) {p[0]}' for j,p in enumerate(phrases))+'\n\nЗначения:\n'+lines(meanings)
 a='; '.join(f'{"АБВ"[j]} — {meanings.index(p[1])+1}' for j,p in enumerate(phrases))
 tasks.append(group(6,'Понятия и выражения школьного курса. Сюжеты мифов — представления древних людей, а не подтверждённые события.',[part('А',term[0],term[1],solution=term[2]),part('Б',q,a,2,'; '.join(p[0]+' — '+p[1] for p in phrases),SEQ)]))
 c=content['causes'][i];q,a=two(c[0],c[1],i);t=task(7,q,a,2,c[2]);t['rubric']=TWO;tasks.append(t)
 m=memories[i];statements=m['statements']
 body='<rect x="15" y="15" width="730" height="235" rx="12" fill="#f8fafc" stroke="#94a3b8"/>'+txt(380,48,'ПАМЯТЬ О ВЕЛИКОЙ ОТЕЧЕСТВЕННОЙ ВОЙНЕ',17,'middle')+txt(380,92,m['date'],23,'middle')+txt(380,131,m['title'],20,'middle')
 body+='<path d="M350 209 Q352 190 365 172 Q367 188 376 181 Q397 157 387 147 Q415 177 405 197 Q397 219 380 222 Q359 222 350 209 Z" fill="#b45309"/><path d="M330 228 H430" stroke="#475569" stroke-width="4"/>'
 svg(f'memory-{n}',body,760,290);q,a=two('Выберите утверждения, верные для события или его сохранения в памяти людей.',statements,i+2)
 t=group(8,'Рассмотрите памятную карточку и выполните задания.',[part('А',m['question'],m['answer'],solution=m['answer']+'.'),part('Б',q,a,2,'Верные утверждения: '+statements[0]+' '+statements[1],TWO)],figure=figure(f'memory-{n}','Памятная карточка с названием события и днём его памяти.'));t['level']='П';tasks.append(t)
 variants.append(dict(id=n,title=f'История Древнего мира и память о прошлом · вариант {n}',tasks=tasks))
data=dict(grade=5,subject='istoriya',subjectTitle='История',year=2026,durationMinutes=45,breakMinutes=5,maxScore=16,instructions='20 тренировочных вариантов для подготовки к МЦКО по истории: 8 заданий, максимум 16 баллов. Выполняйте задания письменно, затем откройте ответы и оцените работу по критериям. В заданиях с картой и лентой времени используйте рисунки; их размер на экране не влияет на ответ. Задание 8 посвящено памяти Великой Отечественной войны. Мифы рассматриваются как представления древних людей. Иллюстрации — учебные схемы.',variants=variants)
(D/'istoriya-5.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n');print('History:',len(variants),'variants;',sum(len(v['tasks']) for v in variants),'tasks;',len(list(OUT.glob('*.svg'))),'figures')
assert all(len(v['tasks'])==8 and sum(t['points'] for t in v['tasks'])==16 for v in variants)
