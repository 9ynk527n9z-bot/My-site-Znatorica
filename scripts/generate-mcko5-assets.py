"""Авторские схемы МЦКО-5; контуры суши Natural Earth (public domain).
Запуск из корня проекта: python3 scripts/generate-mcko5-assets.py.
Геоданные: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson
"""
import json, math
from pathlib import Path
from html import escape
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/images/mcko-5';OUT.mkdir(parents=True,exist_ok=True)
def text(x,y,s,size=16,anchor='start'):
 return f'<text x="{x}" y="{y}" font-size="{size}" text-anchor="{anchor}">{escape(str(s))}</text>'
def line(x1,y1,x2,y2,color='#475569',width=1):
 return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{width}"/>'
def write(name,body,w=720,h=400):
 (OUT/f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img"><rect width="100%" height="100%" fill="white"/><g font-family="Arial, sans-serif" fill="#111827">{body}</g></svg>')
def label(x,y,s):
 return f'<circle cx="{x}" cy="{y}" r="12" fill="white" stroke="#111827" stroke-width="2"/>'+text(x,y+5,s,15,'middle')
land=json.loads((ROOT/'scripts/data/ne_110m_land.geojson').read_text())
def xy(lon,lat):return (round(30+(lon+180)*660/360,2),round(38+(90-lat)*330/180,2))
world='<rect x="30" y="38" width="660" height="330" fill="#e0f2fe" stroke="#334155"/>'
for f in land['features']:
 geom=f['geometry'];polys=geom['coordinates'] if geom['type']=='MultiPolygon' else [geom['coordinates']]
 for poly in polys:
  d=' '.join('M'+' L'.join(f'{x},{y}' for x,y in (xy(*p[:2]) for p in ring))+' Z' for ring in poly)
  world+=f'<path d="{d}" fill="#e2e8d6" stroke="#64748b" stroke-width="0.5"/>'
for lon in range(-180,181,30):
 x,_=xy(lon,0);world+=line(x,38,x,368,'#8aa4b7',.5)+text(x,385,abs(lon),10,'middle')
for lat in range(-60,61,30):
 _,y=xy(0,lat);world+=line(30,y,690,y,'#8aa4b7',.5)+text(25,y+4,abs(lat),10,'end')
world+=text(36,30,'Контурная карта мира. Север сверху; нулевой меридиан в центре.',14)
continents=[('Евразия',85,50),('Африка',20,5),('Северная Америка',-100,60),('Южная Америка',-60,-12),('Австралия',134,-25),('Антарктида',30,-80)]
features=[('Анды',-70,-25,'горная система на западе Южной Америки'),('Гималаи',85,29,'высочайшая горная система на юге Азии'),('Кордильеры',-115,45,'обширная горная система на западе Северной Америки'),('Альпы',10,46,'высокие горы в центральной части Европы'),('Уральские горы',60,58,'горы, вдоль которых проводят часть границы Европы и Азии'),('Большой Водораздельный хребет',149,-28,'горы вдоль восточной окраины Австралии'),('Атлас',-4,32,'горы на северо-западе Африки'),('Скандинавские горы',15,65,'горы в западной части Скандинавского полуострова'),('Кавказ',44,43,'горы между Чёрным и Каспийским морями'),('Аппалачи',-81,37,'древние горы на востоке Северной Америки')]
titles=['Маршрут школьной экспедиции','Карта дальнего плавания','Дневник юного географа','Ориентирование у лесного озера','Путешествие по материкам','Географическая мастерская','По следам исследователей','Станция наблюдений','Атлас и компас','Измеряем расстояния','Картографический практикум','От экватора к полюсам','Тропа через лес','План исследовательского лагеря','Меридианы и параллели','Земля на карте','Летняя полевая школа','Открытия и наблюдения','Экспедиционный дневник','География вокруг нас']
seeds=[]
for i in range(20):
 n=i+1;a=i%6;b=(a+1+i//6)%6
 if a==b:b=(b+1)%6
 feat=features[i%10]
 body=world+label(*xy(*continents[a][1:]),'А')+label(*xy(*continents[b][1:]),'Б')
 x,y=xy(feat[1],feat[2]);body+=f'<circle cx="{x}" cy="{y}" r="4" fill="#9f1239"/>'+text(x+7,y-7,'1',17)
 write(f'geo-{n}-world',body)
 lon=-30-2*(i%5);start=(20+10*(i//5))*(1 if i%2==0 else -1);end=-10*(1 if i%2==0 else -1)
 points=[xy(lon,start),xy(lon,end),xy(lon+25,end)]
 voyage=world
 for p,q in zip(points,points[1:]):voyage+=line(*p,*q,'#9f1239',3)
 for point,lab in zip(points,['P','Q','R']):voyage+=label(*point,lab)
 write(f'geo-{n}-voyage',voyage)
 # План в квадратной сетке: маршрут только по сторонам клеток.
 unit=[25,50,100,200][i%4];dx=2+i%3;dy=1+(i//3)%3
 ax,ay=90,90;cx,cy=ax+dx*50,ay;bx,by=cx,cy+dy*50
 body=text(30,25,f'План местности. Сторона клетки — {unit} м.',18)
 for x in range(40,491,50):body+=line(x,40,x,340,'#cbd5e1')
 for y in range(40,341,50):body+=line(40,y,490,y,'#cbd5e1')
 forest=['смешанный','хвойный','лиственный'][i%3]
 body+='<rect x="50" y="50" width="125" height="100" fill="#dcfce7" stroke="#166534"/>'
 def tree(x,y,t):
  return (f'<path d="M{x} {y-10} l-8 16 h16 Z" fill="#166534"/>' if t=='хвойный' else f'<circle cx="{x}" cy="{y}" r="8" fill="#65a30d" stroke="#365314"/>')+line(x,y+7,x,y+16,'#365314',2)
 for k,(x,y) in enumerate([(65,65),(140,65),(65,120),(140,120)]):body+=tree(x,y,('хвойный' if k%2 else 'лиственный') if forest=='смешанный' else forest)
 body+=line(ax,ay,cx,cy,'#9f1239',3)+line(cx,cy,bx,by,'#9f1239',3)+label(ax,ay,'А')+label(bx,by,'Б')
 # Два объекта отдельно от леса и маршрута. Смещение меняется по восьми направлениям.
 offsets=[(1,0),(1,-1),(0,-1),(-1,-1),(-1,0),(-1,1),(0,1),(1,1)];ox,oy=offsets[i%8];sx,sy=390,240;wx,wy=sx+ox*50,sy+oy*50
 body+=f'<rect x="{sx-8}" y="{sy-8}" width="16" height="16" fill="#64748b"/>'+text(sx,sy+30,'школа',12,'middle')
 body+=f'<circle cx="{wx}" cy="{wy}" r="7" fill="white" stroke="#0369a1" stroke-width="3"/>'+text(wx,wy-13,'колодец',12,'middle')
 body+=line(550,85,550,45,'#111827',2)+text(550,36,'С',16,'middle')+text(550,108,'Ю',16,'middle')+text(595,77,'В',16,'middle')+text(510,77,'З',16,'middle')
 body+=tree(535,155,'хвойный')+text(557,162,'хвойное дерево',13)+tree(535,195,'лиственный')+text(557,202,'лиственное дерево',13)
 body+=text(520,253,'Красная линия —',13)+text(520,273,'маршрут А–Б.',13)+text(40,375,'Считайте длину маршрута по сторонам клеток, независимо от размера экрана.',13)
 write(f'geo-{n}-plan',body)
 # Изолированный фрагмент градусной сети, обе координаты читаются по осям.
 latSign=1 if i%2==0 else -1;lonSign=1 if (i//2)%2==0 else -1
 lat0=10+(i%3)*10;lon0=10+(i%4)*10
 lats=[latSign*(lat0+j*10) for j in range(4)];lats.sort(reverse=True)
 lons=[lonSign*(lon0+j*10) for j in range(4)];lons.sort()
 body=text(30,28,'Фрагмент карты с градусной сетью',18)
 for j,la in enumerate(lats):body+=line(100,65+j*75,610,65+j*75,'#94a3b8')+text(85,70+j*75,f'{abs(la)}° '+('с. ш.' if la>0 else 'ю. ш.'),15,'end')
 for j,lo in enumerate(lons):body+=line(120+j*150,50,120+j*150,305,'#94a3b8')+text(120+j*150,333,f'{abs(lo)}° '+('в. д.' if lo>0 else 'з. д.'),15,'middle')
 cells=[(i%4,(i//2)%4),((i+1)%4,(i+2)%4),((i+2)%4,(i+1)%4),((i+3)%4,(i+3)%4)]
 coords=[]
 for lab,(col,row) in zip(['А','Б','В','Г'],cells):
  body+=label(120+150*col,65+75*row,lab);coords.append([lats[row],lons[col]])
 write(f'geo-{n}-grid',body,720,365)
 seeds.append(dict(id=n,title=titles[i],continents=[continents[a][0],continents[b][0]],feature=feat[0],featureHint=feat[3],voyageStart=start,voyageEnd=end,forest=forest,unit=unit,dx=dx,dy=dy,direction=['восток','северо-восток','север','северо-запад','запад','юго-запад','юг','юго-восток'][i%8],coordinates=coords))
 # Биологические схемы: буквенные метки переставляются; подписи не содержат ответов.
 letters=['А','Б','В','Г'];letters=letters[i%4:]+letters[:i%4]
 plant='<path d="M320 275 V100 M320 175 Q235 110 220 165 Q245 200 320 175 M320 210 Q390 145 420 178 Q375 225 320 210" fill="#bbf7d0" stroke="#166534" stroke-width="4"/>'
 plant+='<path d="M320 275 L275 330 M320 275 L345 337 M320 280 L310 345 M305 299 L280 307 M334 311 L360 315" fill="none" stroke="#92400e" stroke-width="3"/>'
 for a in range(0,360,60):
  x=320+math.cos(a*math.pi/180)*20;y=78+math.sin(a*math.pi/180)*20
  plant+=f'<ellipse cx="{x}" cy="{y}" rx="17" ry="13" fill="#fef08a" stroke="#a16207"/>'
 plant+='<circle cx="320" cy="78" r="13" fill="#eab308"/>'+line(80,275,620,275,'#92400e',2)
 for (x,y,tx,ty),lab in zip([(315,315,170,325),(320,140,460,120),(253,162,155,175),(320,78,465, 60)],letters):plant+=line(x,y,tx,ty)+label(tx,ty,lab)
 plant+=text(25,28,'Условная схема органов цветкового растения',18)+text(25,375,'Схема показывает органы, а не внешний облик конкретного вида.',14)
 write(f'bio-{n}-plant',plant)
 # Световой микроскоп, четыре перемещаемые метки: окуляр, объектив, столик, зеркало.
 micro=text(25,25,'Схема светового микроскопа',18)+'<path d="M380 70 Q490 100 470 270 H320" fill="none" stroke="#64748b" stroke-width="20"/><rect x="335" y="55" width="38" height="100" fill="#cbd5e1" stroke="#334155"/><rect x="329" y="42" width="50" height="18" fill="#334155"/><rect x="340" y="155" width="28" height="35" fill="#475569"/><rect x="280" y="208" width="130" height="12" fill="#94a3b8" stroke="#334155"/><ellipse cx="350" cy="265" rx="35" ry="12" fill="#e0f2fe" stroke="#334155"/><path d="M300 300 H490 L510 330 H270 Z" fill="#94a3b8" stroke="#334155"/>'
 for (x,y,tx,ty),lab in zip([(354,49,180,50),(354,174,180,170),(290,214,165,240),(350,265,540,275)],letters):micro+=line(x,y,tx,ty)+label(tx,ty,lab)
 write(f'bio-{n}-micro',micro,720,360)
 cell=text(25,27,'Условная схема клетки',18)+'<rect x="130" y="65" width="430" height="265" rx="35" fill="#dcfce7" stroke="#166534" stroke-width="10"/><rect x="142" y="77" width="406" height="241" rx="27" fill="#fef9c3" stroke="#854d0e" stroke-width="2"/><ellipse cx="354" cy="205" rx="112" ry="80" fill="#e0f2fe" stroke="#0284c7"/><circle cx="200" cy="240" r="26" fill="#ddd6fe" stroke="#6d28d9" stroke-width="2"/>'
 for x,y in [(205,115),(290,108),(465,116),(493,260),(230,292)]:cell+=f'<ellipse cx="{x}" cy="{y}" rx="22" ry="11" fill="#65a30d" stroke="#365314"/>'
 for (x,y,tx,ty),lab in zip([(200,240,62,250),(205,115,65,80),(355,205,645,185),(558,305,650,325)],letters):cell+=line(x,y,tx,ty)+label(tx,ty,lab)
 write(f'bio-{n}-cell',cell,720,365)
(ROOT/'lib/mcko/geografiya-5-seeds.json').write_text(json.dumps(seeds,ensure_ascii=False,indent=2)+'\n')
# Общая сравнительная схема земной коры.
body=text(25,25,'Схематические разрезы земной коры (не в масштабе)',18)
for j,name in enumerate(['А','Б']):
 x=40+j*350;body+=text(x+130,60,name,22,'middle')
 body+=f'<rect x="{x}" y="100" width="290" height="35" fill="#fde68a" stroke="#111"/>'+text(x+145,123,'осадочный слой',16,'middle')
 if j==0:body+=f'<rect x="{x}" y="135" width="290" height="75" fill="#fecaca" stroke="#111"/>'+text(x+145,180,'гранитный слой',16,'middle')
 y=210 if j==0 else 135
 body+=f'<rect x="{x}" y="{y}" width="290" height="70" fill="#cbd5e1" stroke="#111"/>'+text(x+145,y+40,'базальтовый слой',16,'middle')
write('geo-crust',body,740,320)
print(f'Generated {len(seeds)} seeds and {len(list(OUT.glob("*.svg")))} SVG files')
for i in range(20):
 letters=['А','Б','В','Г'];letters=letters[i%4:]+letters[:i%4]
 body=text(25,25,'Четыре схематических изображения организмов (масштаб разный)',17)
 # 1 — цветковое растение, 2 — шляпочный гриб, 3 — рыба, 4 — бактерии.
 body+='<path d="M100 205 V100 M100 160 Q55 120 50 150 Q70 180 100 160 M100 180 Q145 140 150 165 Q125 190 100 180" stroke="#166534" stroke-width="4" fill="#bbf7d0"/><circle cx="100" cy="80" r="23" fill="#fde68a" stroke="#a16207"/><circle cx="100" cy="80" r="9" fill="#ca8a04"/>'
 body+='<rect x="263" y="130" width="25" height="75" rx="8" fill="#e7d3b4" stroke="#713f12"/><path d="M225 140 Q275 45 325 140 Z" fill="#a16207" stroke="#713f12"/>'
 body+='<ellipse cx="448" cy="140" rx="53" ry="29" fill="#93c5fd" stroke="#1e3a8a"/><path d="M491 140 l35 -30 v60 Z M430 113 l20 -20 l18 24" fill="#60a5fa" stroke="#1e3a8a"/><circle cx="420" cy="134" r="4"/>'
 body+='<g fill="#ddd6fe" stroke="#5b21b6" stroke-width="2"><rect x="600" y="85" width="65" height="22" rx="11" transform="rotate(20 632 96)"/><rect x="610" y="133" width="65" height="22" rx="11" transform="rotate(-30 642 144)"/><rect x="605" y="185" width="65" height="22" rx="11"/></g>'
 for x,l in zip([100,275,450,635],letters):body+=label(x,250,l)
 write(f'bio-{i+1}-organisms',body,740,290)
print('Total SVG files:',len(list(OUT.glob('*.svg'))))
