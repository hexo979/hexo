// Math Dive question engine. Every generator returns {q, a} with a whole-number answer.
(function(){
const ri=(r,a,b)=>a+Math.floor(r()*(b-a+1)),rs=(r,a,b)=>{const lo=a<=1?a:Math.max(2,Math.round(a*.8)),hi=Math.max(lo,Math.round(b*.8));return ri(r,lo,hi)},pick=(r,a)=>a[Math.floor(r()*a.length)];
const M="\u00d7",S="\u2212",SQ="\u00b2";
const gcd=(a,b)=>b?gcd(b,a%b):a;
const mp=(b,e,m)=>{let x=1;for(let i=0;i<e;i++)x=x*b%m;return x};
const divs=n=>{let c=1,m=n;for(let p=2;p*p<=m;p++){let k=0;while(m%p===0){m/=p;k++}c*=k+1}return m>1?c*2:c};
const nCr=(n,k)=>{let x=1;for(let i=1;i<=k;i++)x=x*(n-k+i)/i;return Math.round(x)};
const PCT=[12,15,35,45,65,85];
const pn=(r,p)=>{const st=100/gcd(p,100);return st*ri(r,Math.ceil(240/st),Math.floor(960/st))};
const G={
1:[r=>{const a=rs(r,12,29),b=rs(r,12,29),c=rs(r,11,25),d=rs(r,11,25);return{q:`${a} ${M} ${b} + ${c} ${M} ${d}`,a:a*b+c*d}},
   r=>{const a=rs(r,20,60),b=rs(r,20,60),c=rs(r,6,15),d=ri(r,40,150);return{q:`(${a} + ${b}) ${M} ${c} ${S} ${d}`,a:(a+b)*c-d}},
   r=>{const a=rs(r,40,70),b=rs(r,15,30),c=rs(r,10,20),d=rs(r,10,20);return{q:`${a} ${M} ${b} ${S} ${c} ${M} ${d}`,a:a*b-c*d}}],
2:[r=>{const c=rs(r,2,6),a=c+rs(r,2,7),x=rs(r,3,20),b=rs(r,5,40);return{q:`${a}x + ${b} = ${c}x + ${b+(a-c)*x}.  x = ?`,a:x}},
   r=>{const c=rs(r,2,6),a=c+rs(r,3,7),x=rs(r,8,25),b=rs(r,3,20);return{q:`${a}x ${S} ${b} = ${c}x + ${(a-c)*x-b}.  x = ?`,a:x}},
   r=>{const p=pick(r,PCT),n=pn(r,p),a=rs(r,12,25),b=rs(r,12,25);return{q:`${p}% of ${n} + ${a} ${M} ${b}`,a:p*n/100+a*b}}],
3:[r=>{const p=pick(r,PCT),q=pick(r,PCT),n=pn(r,p),m=pn(r,q);return{q:`${p}% of ${n} + ${q}% of ${m}`,a:p*n/100+q*m/100}},
   r=>{const a=rs(r,5,15),b=rs(r,5,15),c=rs(r,3,9),d=rs(r,3,9);return{q:`(${a} + ${b})${SQ} ${S} ${c} ${M} ${d}`,a:(a+b)**2-c*d}},
   r=>{const a=rs(r,12,25),b=rs(r,12,25),c=rs(r,5,15);return{q:`${a}${SQ} + ${b}${SQ} ${S} ${c}${SQ}`,a:a*a+b*b-c*c}}],
4:[r=>{const a=rs(r,2,25);let b=rs(r,2,25);if(b===a)b++;return{q:`Larger root of x${SQ} ${S} ${a+b}x + ${a*b} = 0`,a:Math.max(a,b)}},
   r=>{const y=rs(r,3,20),x=y+rs(r,2,15);return{q:`x + y = ${x+y} and x ${S} y = ${x-y}. Find x ${M} y`,a:x*y}},
   r=>{const a=rs(r,2,12),b=rs(r,2,12);return{q:`(x + ${a})(x + ${b}) = x${SQ} + kx + m. Find k + m`,a:a+b+a*b}}],
5:[r=>{const n=rs(r,15,30),a=rs(r,3,12),d=rs(r,3,9);return{q:`Sum of the first ${n} terms of ${a}, ${a+d}, ${a+2*d}, ...`,a:n*(2*a+(n-1)*d)/2}},
   r=>{const n=rs(r,5,8),a=rs(r,2,9),k=rs(r,2,3);return{q:`Sum of the first ${n} terms of ${a}, ${a*k}, ${a*k*k}, ...`,a:a*(k**n-1)/(k-1)}},
   r=>{const n=rs(r,30,80),a=rs(r,3,12),d=rs(r,3,9);return{q:`The ${ord(n)} term of ${a}, ${a+d}, ${a+2*d}, ...`,a:a+(n-1)*d}}],
6:[r=>{const m=pick(r,[7,11,13]);let b=rs(r,3,9);if(b%m===0)b=2;const e=rs(r,25,60);return{q:`Remainder when ${b}^${e} is divided by ${m}`,a:mp(b,e,m)}},
   r=>{const g=rs(r,6,17),x=g*rs(r,4,13);let y=g*rs(r,4,13);if(y===x)y+=g;return{q:`GCD of ${x} and ${y}`,a:gcd(x,y)}},
   r=>{const x=rs(r,12,48);let y=rs(r,12,48);if(y===x)y++;return{q:`LCM of ${x} and ${y}`,a:x*y/gcd(x,y)}}],
7:[r=>{const n=2**rs(r,2,5)*3**rs(r,1,3)*5**rs(r,1,2)*pick(r,[1,7,11]);return{q:`How many positive divisors does ${n} have?`,a:divs(n)}},
   r=>{const n=rs(r,40,200);let z=0;for(let p=5;p<=n;p*=5)z+=Math.floor(n/p);return{q:`How many trailing zeros does ${n}! have?`,a:z}},
   r=>{const n=rs(r,8,12),k=rs(r,3,5);return{q:`How many ways to choose ${k} items from ${n}?`,a:nCr(n,k)}}]
};
function evalExpr(src,v){const t=String(src).match(/\d+\.?\d*|[a-z]|\*\*|[-+*\/%^()]/gi)||[];let i=0;
 const prim=()=>{const x=t[i++];if(x==="("){const r=add();if(t[i++]!==")")throw 0;return r}if(x==="-")return -prim();if(x&&/^\d/.test(x))return +x;if(x&&/^[a-z]$/i.test(x)&&x in v)return v[x];throw 0};
 const pow=()=>{let b=prim();while(t[i]==="^"||t[i]==="**"){i++;b=Math.pow(b,prim())}return b};
 const mul=()=>{let a=pow();while(t[i]==="*"||t[i]==="/"||t[i]==="%"){const o=t[i++],b=pow();a=o==="*"?a*b:o==="/"?a/b:a%b}return a};
 const add=()=>{let a=mul();while(t[i]==="+"||t[i]==="-"){const o=t[i++],b=mul();a=o==="+"?a+b:a-b}return a};
 const r=add();if(i!==t.length)throw 0;return r}
const D="\u00b0",PI="\u03c0",TH="\u03b8",RT="\u221a",CR="\u221b",DIV="\u00f7";
const ord=n=>n+["th","st","nd","rd"][(n%100>=11&&n%100<=13)?0:(n%10<4?n%10:0)];
const sub=b=>String(b).replace(/\d/g,d=>"\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089"[d]);
const TRI=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]];
const SIN=[["sin "+TH+" = 1/2",30],["sin "+TH+" = "+RT+"2/2",45],["sin "+TH+" = "+RT+"3/2",60],["cos "+TH+" = 1/2",60],["cos "+TH+" = "+RT+"2/2",45],["cos "+TH+" = "+RT+"3/2",30],["tan "+TH+" = 1",45],["tan "+TH+" = "+RT+"3",60],["tan "+TH+" = 1/"+RT+"3",30]];
const WORDS=["MATHS","ANGLE","RADIUS","CIRCLE","SQUARE","PARABOLA","FRACTION","VERTEX"];
const ADD={
1:[["Estimate a product (slider)",r=>{const a=rs(r,31,69),b=rs(r,31,69);return{q:`Estimate ${a} ${M} ${b} (use the slider)`,a:a*b,sl:{min:0,max:3500,step:10},est:true}}],
 ["Roots and cubes",r=>{const n=rs(r,12,30),m=rs(r,3,9),k=rs(r,3,9);return{q:`${RT}${n*n} + ${CR}${m**3} ${M} ${k}`,a:n+m*k}}]],
2:[["Percent of total (slider)",r=>{const p=5*rs(r,2,19),y=20*rs(r,3,15);return{q:`${p*y/100} is what percent of ${y}?`,a:p,sl:{min:0,max:100,step:1,unit:"%"}}}],
 ["Triangle angles (slider)",r=>{const a=rs(r,30,80),b=rs(r,30,80);return{q:`Two angles of a triangle are ${a}${D} and ${b}${D}. Find the third angle.`,a:180-a-b,sl:{min:0,max:180,step:1,unit:D}}}],
 ["Evaluate f(x)",r=>{const a=rs(r,2,9),b=rs(r,2,30),k=rs(r,3,15);return{q:`f(x) = ${a}x + ${b}. Find f(${k})`,a:a*k+b}}],
 ["Triangle area",r=>{const b=2*rs(r,6,20),h=rs(r,7,25);return{q:`Area of a triangle with base ${b} and height ${h}`,a:b*h/2}}]],
3:[["Right triangle hypotenuse",r=>{const t=pick(r,TRI),k=rs(r,1,3);return{q:`A right triangle has legs ${t[0]*k} and ${t[1]*k}. Find the hypotenuse.`,a:t[2]*k}}],
 ["Regular polygon angle (slider)",r=>{const n=pick(r,[5,6,8,9,10,12,15,18,20]);return{q:`Each interior angle of a regular polygon with ${n} sides`,a:180-360/n,sl:{min:0,max:180,step:1,unit:D}}}],
 ["Angle from trig value (slider)",r=>{const t=pick(r,SIN);return{q:`Find ${TH} (0${D} to 90${D}) if ${t[0]}`,a:t[1],sl:{min:0,max:90,step:1,unit:D}}}],
 ["Evaluate quadratic f(x)",r=>{const a=rs(r,2,5),b=rs(r,2,9),c=rs(r,2,20),k=rs(r,3,9);return{q:`f(x) = ${a}x${SQ} + ${b}x + ${c}. Find f(${k})`,a:a*k*k+b*k+c}}],
 ["Circle area in pi",r=>{const d=2*rs(r,4,15);return{q:`A circle has diameter ${d}. Its area is k${PI}. Find k.`,a:(d/2)**2}}]],
4:[["Radians to degrees (slider)",r=>{let m=pick(r,[2,3,4,5,6,9,10,12]),k=rs(r,1,2*m-1);const deg=180*k/m,g=gcd(k,m);k/=g;m/=g;return{q:`Convert ${k===1?"":k}${PI}${m===1?"":"/"+m} radians to degrees`,a:deg,sl:{min:0,max:360,step:1,unit:D}}}],
 ["Logarithm",r=>{const b=pick(r,[2,3,5,10]),k=rs(r,3,b===2?12:b===3?7:b===5?5:6);return{q:`log${sub(b)} ${b**k}`,a:k}}],
 ["Composite function",r=>{const a=rs(r,2,6),b=rs(r,1,9),c=rs(r,2,6),d=rs(r,1,9),k=rs(r,2,9);return{q:`f(x) = ${a}x + ${b} and g(x) = ${c}x + ${d}. Find f(g(${k})).`,a:a*(c*k+d)+b}}],
 ["Combine exponents",r=>{const b=pick(r,[2,3,5]),x=rs(r,3,9),y=rs(r,3,9),z=rs(r,1,4);return{q:`${b}^x = ${b}^${x} ${M} ${b}^${y} ${DIV} ${b}^${z}. Find x.`,a:x+y-z}}],
 ["Trig value sum",r=>{const a=2*rs(r,1,6),b=2*rs(r,1,6),c=rs(r,1,9);return{q:`${a} sin 30${D} + ${b} cos 60${D} + ${c} tan 45${D}`,a:a/2+b/2+c}}],
 ["Cylinder volume in pi",r=>{const R=rs(r,2,9),h=rs(r,3,15);return{q:`A cylinder has radius ${R} and height ${h}. Its volume is k${PI}. Find k.`,a:R*R*h}}]],
5:[["Distance between points",r=>{const t=pick(r,TRI),k=rs(r,1,3),x=rs(r,1,9),y=rs(r,1,9);return{q:`Distance between (${x}, ${y}) and (${x+t[0]*k}, ${y+t[1]*k})`,a:t[2]*k}}],
 ["Side from a 30 degree angle",r=>{const h=2*rs(r,5,30);return{q:`A right triangle has hypotenuse ${h} and an angle of 30${D}. Find the side opposite that angle.`,a:h/2}}],
 ["Polygon diagonals",r=>{const n=rs(r,8,25);return{q:`How many diagonals does a polygon with ${n} sides have?`,a:n*(n-3)/2}}],
 ["Binary to decimal",r=>{const n=rs(r,20,63);return{q:`Convert binary ${n.toString(2)} to decimal`,a:n}}],
 ["Log sum and difference",r=>{const b=pick(r,[2,3]),i=rs(r,3,7),j=rs(r,3,7),k=rs(r,1,3);return{q:`log${sub(b)} ${b**i} + log${sub(b)} ${b**j} ${S} log${sub(b)} ${b**k}`,a:i+j-k}}],
 ["Find f(10) from two values",r=>{const a=rs(r,2,9),b=rs(r,1,20);return{q:`f(x) = ax + b, f(2) = ${2*a+b} and f(5) = ${5*a+b}. Find f(10).`,a:10*a+b}}]],
6:[["Arrangements of letters",r=>{const w=pick(r,WORDS),c={};let f=1;for(let i=2;i<=w.length;i++)f*=i;for(const ch of w)c[ch]=(c[ch]||0)+1;for(const k in c)for(let i=2;i<=c[k];i++)f/=i;return{q:`How many different arrangements of the letters in ${w}?`,a:f}}],
 ["Digits of a power of 2",r=>{const k=rs(r,15,40);return{q:`Sum of the digits of 2^${k}`,a:[...String(2n**BigInt(k))].reduce((t,ch)=>t+ +ch,0)}}],
 ["Count primes",r=>{const n=rs(r,30,100);let c=0;for(let i=2;i<n;i++){let p=1;for(let j=2;j*j<=i;j++)if(i%j===0){p=0;break}c+=p}return{q:`How many primes are less than ${n}?`,a:c}}],
 ["Fibonacci term",r=>{const n=rs(r,10,20);let a=1,b=1;for(let i=3;i<=n;i++){[a,b]=[b,a+b]}return{q:`The ${ord(n)} Fibonacci number (1, 1, 2, 3, 5, ...)`,a:b}}]],
7:[["Largest prime factor",r=>{const p=pick(r,[11,13,17,19,23,29,31,37,41,43]),a=rs(r,2,9),b=rs(r,2,9);return{q:`Largest prime factor of ${a*b*p}`,a:p}}],
 ["Decimal to binary",r=>{const n=rs(r,20,127);return{q:`Convert ${n} to binary`,a:Number(n.toString(2))}}],
 ["Sum of a function",r=>{const a=rs(r,2,9),b=rs(r,1,9),n=rs(r,8,20);return{q:`f(x) = ${a}x + ${b}. Find f(1) + f(2) + ... + f(${n})`,a:a*n*(n+1)/2+b*n}}]]
};
const NAMES=["Warm-up","Algebra","Percentages","Quadratics","Series","Number theory","Boss"];
const E={names:NAMES,cfg:{w:{},custom:[]},labels:[["Multiply and add","Brackets and subtract","Multiply and subtract"],["Linear equation A","Linear equation B","Percent plus product"],["Two percentages","Brackets squared","Sum of squares"],["Quadratic roots","Two unknowns","Expand brackets"],["Arithmetic sum","Geometric sum","Nth term"],["Remainders","GCD","LCM"],["Divisor count","Trailing zeros","Combinations"]],evalExpr,presets:{Easy:[1,1,2,2,3,3,4],Normal:[1,2,3,4,5,6,7],Hard:[3,4,4,5,6,7,7]},
 fromCustom(c,r){if(c.t!=="tpl")return{q:c.q,a:Number(c.a)};
  for(let n=0;n<30;n++){const v={};String(c.r||"").split(",").forEach(p=>{const m=p.trim().match(/^([a-z])\s*=\s*(-?\d+)\s*\.\.\s*(-?\d+)$/i);if(m)v[m[1]]=ri(r,+m[2],+m[3])});
   let a;try{a=evalExpr(c.e,v)}catch(e){continue}
   if(Number.isInteger(a)&&a>0)return{q:String(c.q).replace(/\{([a-z])\}/gi,(_,k)=>k in v?v[k]:"?"),a}}
  return null},
 gen(level,r){const cf=E.cfg||{},W=cf.w||{};const items=G[level].map((g,i)=>({w:W[level+"."+i]==null?1:+W[level+"."+i],f:()=>g(r)}));
  (cf.custom||[]).forEach(c=>{const w=c.w==null?1:+c.w;if(+c.lv===level&&w>0)items.push({w,f:()=>E.fromCustom(c,r)})});
  let tot=items.reduce((a,x)=>a+x.w,0);if(!(tot>0)){items.forEach(x=>x.w=1);tot=items.length}
  let k=r()*tot,it=items[items.length-1];for(const x of items){if((k-=x.w)<0){it=x;break}}
  let o=null;try{o=it.f()}catch(e){}if(!o||!Number.isFinite(o.a))o=G[level][0](r);
  return{q:o.q,a:o.a,sl:o.sl,est:o.est,tier:{n:NAMES[level-1]}}},
 set(r,levels){const seen={};return(levels||E.presets.Normal).map(l=>{let o,t=0;do{o=E.gen(l,r)}while(seen[o.q]&&++t<5);seen[o.q]=1;return o})}};
for(const L in ADD)ADD[L].forEach(([lb,f])=>{G[L].push(f);E.labels[L-1].push(lb)});
const ADD2={
1:[["Fraction of a number",r=>{const q=pick(r,[2,3,4,5,8,10]),p=rs(r,1,q-1),n=q*rs(r,4,16);return{q:`${p}/${q} of ${n}`,a:p*n/q}}],
 ["Missing number",r=>{const a=rs(r,120,480),b=a+rs(r,35,390);return{q:`${a} + ? = ${b}`,a:b-a}}],
 ["Sum of three numbers",r=>{const a=rs(r,120,490),b=rs(r,120,490),c=rs(r,120,490);return{q:`${a} + ${b} + ${c}`,a:a+b+c}}]],
2:[["Average of five numbers",r=>{const m=rs(r,30,70),o=[0,0,0,0].map(()=>rs(r,0,8)-4);o.push(-o.reduce((x,y)=>x+y,0));return{q:`Mean of ${o.map(x=>m+x).join(", ")}`,a:m}}],
 ["Rectangle from perimeter",r=>{const l=rs(r,8,30),w=rs(r,4,l-1);return{q:`A rectangle has perimeter ${2*(l+w)} and length ${l}. Find its area.`,a:l*w}}],
 ["Simple interest",r=>{const p=100*rs(r,5,30),t=rs(r,2,9),y=rs(r,2,6);return{q:`Simple interest on ${p} at ${t}% per year for ${y} years`,a:p*t*y/100}}],
 ["Ratio sharing",r=>{const a=rs(r,2,7),b=a+rs(r,1,4),k=rs(r,3,15);return{q:`Share ${(a+b)*k} in the ratio ${a}:${b}. Find the larger share.`,a:b*k}}],
 ["Distance from speed and time",r=>{const v=rs(r,30,90),t=rs(r,2,9);return{q:`A car travels at ${v} km/h for ${t} hours. How many km?`,a:v*t}}],
 ["Volume of a cuboid",r=>{const a=rs(r,3,12),b=rs(r,3,12),c=rs(r,3,12);return{q:`Volume of a cuboid ${a} by ${b} by ${c}`,a:a*b*c}}]],
3:[["Median of seven numbers",r=>{const a=Array.from({length:7},()=>rs(r,12,90));return{q:`Median of ${a.join(", ")}`,a:[...a].sort((x,y)=>x-y)[3]}}],
 ["Price after discount",r=>{const p=20*rs(r,10,40),d=pick(r,[10,20,25,30,40,50]);return{q:`A ${p} item has ${d}% off. New price?`,a:p*(100-d)/100}}],
 ["Surface area of a cube",r=>{const s=rs(r,3,14);return{q:`Surface area of a cube with side ${s}`,a:6*s*s}}]],
4:[["Slope between two points",r=>{const x=rs(r,1,9),y=rs(r,1,9),dx=rs(r,2,9),m=rs(r,2,9);return{q:`Slope of the line through (${x}, ${y}) and (${x+dx}, ${y+m*dx})`,a:m}}],
 ["Find the fifth number",r=>{const a=[0,0,0,0].map(()=>rs(r,10,60)),s=a.reduce((x,y)=>x+y,0),e=(5-s%5)%5+5*rs(r,2,12);return{q:`The mean of five numbers is ${(s+e)/5}. Four of them are ${a.join(", ")}. Find the fifth.`,a:e}}],
 ["Cylinder surface area in pi",r=>{const R=rs(r,2,9),h=rs(r,3,15);return{q:`A cylinder has radius ${R} and height ${h}. Its surface area is k${PI}. Find k.`,a:2*R*(R+h)}}],
 ["Chickens and rabbits",r=>{const c=rs(r,3,15),b=rs(r,3,15);return{q:`A farm has ${c+b} animals (chickens and rabbits) with ${2*c+4*b} legs. How many rabbits?`,a:b}}],
 ["Doubling growth",r=>{const a=rs(r,2,9),t=rs(r,3,9);return{q:`A colony of ${a} cells doubles every hour. How many cells after ${t} hours?`,a:a*2**t}}]],
5:[["Handshakes",r=>{const n=rs(r,8,30);return{q:`${n} people each shake hands once with everyone else. How many handshakes?`,a:n*(n-1)/2}}],
 ["Sum of multiples",r=>{const k=rs(r,3,9),m=rs(r,8,20);return{q:`Sum of all multiples of ${k} up to ${k*m}`,a:k*m*(m+1)/2}}],
 ["Number of subsets",r=>{const n=rs(r,4,10);return{q:`How many subsets does a set with ${n} elements have?`,a:2**n}}],
 ["Interior angle sum",r=>{const n=rs(r,5,14);return{q:`Sum of the interior angles of a polygon with ${n} sides`,a:(n-2)*180}}]],
6:[["Circular arrangements",r=>{const n=rs(r,5,8);let f=1;for(let i=2;i<n;i++)f*=i;return{q:`In how many ways can ${n} people sit around a round table?`,a:f}}],
 ["Sum of first n squares",r=>{const n=rs(r,8,20);let t=0;for(let i=1;i<=n;i++)t+=i*i;return{q:`1${SQ} + 2${SQ} + 3${SQ} + ... + ${n}${SQ}`,a:t}}],
 ["Sum of first n cubes",r=>{const n=rs(r,5,12);let t=0;for(let i=1;i<=n;i++)t+=i**3;return{q:`1${"\u00b3"} + 2${"\u00b3"} + 3${"\u00b3"} + ... + ${n}${"\u00b3"}`,a:t}}],
 ["Euler totient",r=>{const n=rs(r,20,60);let c=0;for(let i=1;i<=n;i++)if(gcd(i,n)===1)c++;return{q:`How many numbers from 1 to ${n} share no factor with ${n} except 1?`,a:c}}]],
7:[["Grid paths",r=>{const a=rs(r,3,7),b=rs(r,3,7);return{q:`A grid path goes ${a} steps right and ${b} steps up. How many different paths?`,a:nCr(a+b,a)}}],
 ["Catalan number",r=>{const n=rs(r,4,8);return{q:`How many ways can ${n} pairs of brackets be correctly matched?`,a:nCr(2*n,n)/(n+1)}}],
 ["Divisible by either",r=>{const a=rs(r,3,7);let b=rs(r,3,9);if(b===a)b++;const N=rs(r,60,150);let c=0;for(let i=1;i<=N;i++)if(i%a===0||i%b===0)c++;return{q:`How many numbers from 1 to ${N} are divisible by ${a} or ${b}?`,a:c}}],
 ["Modular inverse",r=>{const m=pick(r,[7,11,13,17,19,23]),a=rs(r,2,m-1);let x=0;for(let i=1;i<m;i++)if(a*i%m===1){x=i;break}return{q:`Find x (1 to ${m-1}) so that ${a}x leaves remainder 1 when divided by ${m}`,a:x}}],
 ["Sum of proper divisors",r=>{const n=rs(r,30,90);let t=0;for(let i=1;i<n;i++)if(n%i===0)t+=i;return{q:`Sum of all divisors of ${n} that are smaller than ${n}`,a:t}}]]
};
for(const L in ADD2)ADD2[L].forEach(([lb,f])=>{G[L].push(f);E.labels[L-1].push(lb)});
if(typeof window!=="undefined")window.MD_ENGINE=E;else module.exports=E;
})();
