const $=s=>document.querySelector(s);
/* ---- Settings: yahan birthday date badal sakte hain ---- */
const BDAY={month:11,day:17};
const WISHES=["Wishing you all the happiness in the world, Munthahanaha! 🌍💖","May all your dreams come true! ✨","May you always smile and shine bright! 😊","Stay happy always, Munthahanaha! 🎀","You are special, amazing and loved! 💕"];

/* Name animation */
const name=$('#name');
[...'Munthahanaha'].forEach((c,i)=>{const s=document.createElement('span');s.textContent=c;s.style.animationDelay=(.3+i*.15)+'s';name.appendChild(s)});

/* Balloons */
const cols=['#ff8fb8','#f6d77a','#ffc1d9','#e91e63','#ffe9a8','#ffadc8'];
for(let i=0;i<9;i++){const b=document.createElement('div');b.className='balloon';
 b.style.cssText=`left:${5+i*11}%;background:${cols[i%6]};animation-duration:${14+Math.random()*10}s;animation-delay:${-Math.random()*14}s`;$('#balloons').appendChild(b)}

/* Falling hearts */
const hs=['💖','💗','💕','🌸','✨','💛'];
setInterval(()=>{if(document.hidden)return;const h=document.createElement('span');h.className='heart';h.textContent=hs[Math.random()*hs.length|0];
 h.style.left=Math.random()*100+'vw';h.style.fontSize=12+Math.random()*18+'px';h.style.animationDuration=6+Math.random()*6+'s';
 $('#fall').appendChild(h);setTimeout(()=>h.remove(),12000)},700);

/* Confetti */
const cv=$('#confetti'),cx=cv.getContext('2d');let parts=[],running=false;
const fit=()=>{cv.width=innerWidth;cv.height=innerHeight};fit();addEventListener('resize',fit);
function confetti(n=160){const c=['#e91e63','#ff8fb8','#f6d77a','#d4a017','#fff','#c2185b'];
 for(let i=0;i<n;i++)parts.push({x:innerWidth/2,y:innerHeight*.45,vx:(Math.random()-.5)*16,vy:-Math.random()*16-4,s:5+Math.random()*7,r:Math.random()*6,vr:(Math.random()-.5)*.4,c:c[i%6]});
 if(!running){running=true;loop()}}
function loop(){cx.clearRect(0,0,cv.width,cv.height);
 parts.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.r+=p.vr;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6);cx.restore()});
 parts=parts.filter(p=>p.y<cv.height+20);
 if(parts.length)requestAnimationFrame(loop);else{running=false;cx.clearRect(0,0,cv.width,cv.height)}}

/* Candles */
let blown=false;
$('#blowBtn').onclick=e=>{const cake=$('#cake'),b=e.currentTarget;
 blown=!blown;cake.classList.toggle('out',blown);
 b.textContent=blown?'🕯️ Light Candles Again':'🕯️ Blow Candles';
 if(blown){confetti();setTimeout(openModal,900)}};

/* Start surprise */
$('#startBtn').onclick=()=>{confetti(220);$('#gift').scrollIntoView({behavior:'smooth'})};

/* Gift */
const gift=$('#gift-box');
function toggleGift(){if(gift.classList.contains('open'))return;gift.classList.add('open');confetti(200);setTimeout(openModal,1200);setTimeout(()=>gift.classList.remove('open'),6000)}
gift.onclick=toggleGift;gift.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleGift()}};

/* Modal */
const modal=$('#modal');
function openModal(){modal.classList.add('show');modal.setAttribute('aria-hidden','false')}
function closeModal(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true')}
$('#closeM').onclick=closeModal;modal.onclick=e=>{if(e.target===modal)closeModal()};
addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.querySelectorAll('figure').forEach(f=>f.onclick=()=>confetti(60));
$('#againBtn').onclick=()=>{confetti(260);scrollTo({top:0,behavior:'smooth'})};

/* Wishes slider */
let wi=0;const wEl=$('#wish'),dots=$('#dots');
WISHES.forEach((_,i)=>{const d=document.createElement('i');d.onclick=()=>{wi=i;showWish()};dots.appendChild(d)});
function showWish(){wEl.style.opacity=0;setTimeout(()=>{wEl.textContent=WISHES[wi];wEl.style.opacity=1;[...dots.children].forEach((d,i)=>d.classList.toggle('on',i===wi))},250)}
showWish();setInterval(()=>{wi=(wi+1)%WISHES.length;showWish()},4500);

/* Countdown */
function tick(){const now=new Date();let t=new Date(now.getFullYear(),BDAY.month-1,BDAY.day);
 const el=$('#timer');
 if(now.toDateString()===t.toDateString()){el.innerHTML='<div class="today">Aaj Munthahanaha ka birthday hai! 🎉</div>';return}
 if(t<now)t=new Date(now.getFullYear()+1,BDAY.month-1,BDAY.day);
 let d=t-now,D=d/864e5|0,H=d/36e5%24|0,M=d/6e4%60|0,S=d/1e3%60|0;
 el.innerHTML=[[D,'Days'],[H,'Hours'],[M,'Mins'],[S,'Secs']].map(x=>`<div><b>${x[0]}</b><small>${x[1]}</small></div>`).join('')}
tick();setInterval(tick,1000);

/* Munthahasic: munthahasic/birthday.mp3 ho to wo chalega, warna built-in Happy Birthday tune */
const audio=$('#audio'),playBtn=$('#play'),disc=$('#disc'),fill=$('#barfill');
let playing=false,munthahated=false,ac,gain,synthTimer,useSynth=false,noteIdx=0;
const N={C:261.6,D:293.7,E:329.6,F:349.2,G:392,A:440,B:493.9,C2:523.3};
const TUNE=[['G',.75],['G',.25],['A',1],['G',1],['C2',1],['B',2],['G',.75],['G',.25],['A',1],['G',1],['D',1],['C2',2],['G',.75],['G',.25],['G',1],['E',1],['C2',1],['B',1],['A',1],['F',.75],['F',.25],['E',1],['C2',1],['D',1],['C2',2]];
function synthStart(){ac=ac||new (window.AudioContext||window.webkitAudioContext)();gain=gain||ac.createGain();gain.gain.value=munthahated?0:.25;gain.connect(ac.destination);ac.resume();step()}
function step(){const [n,b]=TUNE[noteIdx],o=ac.createOscillator(),g=ac.createGain(),t=ac.currentTime,d=b*.5;
 o.type='triangle';o.frequency.value=N[n];g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(1,t+.03);g.gain.exponentialRampToValueAtTime(.001,t+d*.95);
 o.connect(g);g.connect(gain);o.start(t);o.stop(t+d);
 fill.style.width=(noteIdx+1)/TUNE.length*100+'%';noteIdx=(noteIdx+1)%TUNE.length;
 synthTimer=setTimeout(step,d*1000+30)}
function setUI(p){playing=p;playBtn.textContent=p?'❚❚':'▶';disc.classList.toggle('spin',p)}
playBtn.onclick=async()=>{
 if(playing){clearTimeout(synthTimer);audio.pause();setUI(false);return}
 setUI(true);
 if(!useSynth){try{await audio.play();return}catch(e){useSynth=true}}
 synthStart()};
$('#prev').onclick=()=>{noteIdx=0;audio.currentTime=0};
$('#munthahate').onclick=e=>{munthahated=!munthahated;audio.munthahated=munthahated;if(gain)gain.gain.value=munthahated?0:.25;e.currentTarget.textContent=munthahated?'🔇':'🔊'};
audio.ontimeupdate=()=>{if(audio.duration)fill.style.width=audio.currentTime/audio.duration*100+'%'};
audio.onended=()=>setUI(false);

/* Nav, back to top */
$('#burger').onclick=()=>$('#menu').classList.toggle('open');
document.querySelectorAll('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));
$('#top').onclick=()=>scrollTo({top:0,behavior:'smooth'});
addEventListener('scroll',()=>$('#top').classList.toggle('show',scrollY>500));

/* Active nav link on scroll */
const links=[...document.querySelectorAll('#menu a')];
addEventListener('scroll',()=>{let cur='#home';['gallery','wishes','munthahasic','gift'].forEach(id=>{const e=document.getElementById(id);if(e&&e.getBoundingClientRect().top<innerHeight*.45)cur='#'+id});
 links.forEach(a=>a.classList.toggle('act',a.getAttribute('href')===cur))});
