// Math Dive question engine. Every generator returns {q, a} with a whole-number answer.
(function(){
const ri=(r,a,b)=>a+Math.floor(r()*(b-a+1)),pick=(r,a)=>a[Math.floor(r()*a.length)];
const M="\u00d7",S="\u2212",SQ="\u00b2";
const gcd=(a,b)=>b?gcd(b,a%b):a;
const mp=(b,e,m)=>{let x=1;for(let i=0;i<e;i++)x=x*b%m;return x};
const divs=n=>{let c=1,m=n;for(let p=2;p*p<=m;p++){let k=0;while(m%p===0){m/=p;k++}c*=k+1}return m>1?c*2:c};
const nCr=(n,k)=>{let x=1;for(let i=1;i<=k;i++)x=x*(n-k+i)/i;return Math.round(x)};
const PCT=[12,15,35,45,65,85];
const pn=(r,p)=>{const st=100/gcd(p,100);return st*ri(r,Math.ceil(300/st),Math.floor(1200/st))};
const G={
1:[r=>{const a=ri(r,12,29),b=ri(r,12,29),c=ri(r,11,25),d=ri(r,11,25);return{q:`${a} ${M} ${b} + ${c} ${M} ${d}`,a:a*b+c*d}},
   r=>{const a=ri(r,20,60),b=ri(r,20,60),c=ri(r,6,15),d=ri(r,50,230);return{q:`(${a} + ${b}) ${M} ${c} ${S} ${d}`,a:(a+b)*c-d}},
   r=>{const a=ri(r,40,70),b=ri(r,15,30),c=ri(r,10,20),d=ri(r,10,20);return{q:`${a} ${M} ${b} ${S} ${c} ${M} ${d}`,a:a*b-c*d}}],
2:[r=>{const c=ri(r,2,6),a=c+ri(r,2,7),x=ri(r,3,20),b=ri(r,5,40);return{q:`${a}x + ${b} = ${c}x + ${b+(a-c)*x}.  x = ?`,a:x}},
   r=>{const c=ri(r,2,6),a=c+ri(r,3,7),x=ri(r,8,25),b=ri(r,3,20);return{q:`${a}x ${S} ${b} = ${c}x + ${(a-c)*x-b}.  x = ?`,a:x}},
   r=>{const p=pick(r,PCT),n=pn(r,p),a=ri(r,12,25),b=ri(r,12,25);return{q:`${p}% of ${n} + ${a} ${M} ${b}`,a:p*n/100+a*b}}],
3:[r=>{const p=pick(r,PCT),q=pick(r,PCT),n=pn(r,p),m=pn(r,q);return{q:`${p}% of ${n} + ${q}% of ${m}`,a:p*n/100+q*m/100}},
   r=>{const a=ri(r,5,15),b=ri(r,5,15),c=ri(r,3,9),d=ri(r,3,9);return{q:`(${a} + ${b})${SQ} ${S} ${c} ${M} ${d}`,a:(a+b)**2-c*d}},
   r=>{const a=ri(r,12,25),b=ri(r,12,25),c=ri(r,5,15);return{q:`${a}${SQ} + ${b}${SQ} ${S} ${c}${SQ}`,a:a*a+b*b-c*c}}],
4:[r=>{const a=ri(r,2,25);let b=ri(r,2,25);if(b===a)b++;return{q:`Larger root of x${SQ} ${S} ${a+b}x + ${a*b} = 0`,a:Math.max(a,b)}},
   r=>{const y=ri(r,3,20),x=y+ri(r,2,15);return{q:`x + y = ${x+y} and x ${S} y = ${x-y}. Find x ${M} y`,a:x*y}},
   r=>{const a=ri(r,2,12),b=ri(r,2,12);return{q:`(x + ${a})(x + ${b}) = x${SQ} + kx + ${a*b}. Find k ${M} ${a+b}`,a:(a+b)*(a+b)}}],
5:[r=>{const n=ri(r,15,30),a=ri(r,3,12),d=ri(r,3,9);return{q:`Sum of the first ${n} terms of ${a}, ${a+d}, ${a+2*d}, ...`,a:n*(2*a+(n-1)*d)/2}},
   r=>{const n=ri(r,5,8),a=ri(r,2,9),k=ri(r,2,3);return{q:`Sum of the first ${n} terms of ${a}, ${a*k}, ${a*k*k}, ...`,a:a*(k**n-1)/(k-1)}},
   r=>{const n=ri(r,30,80),a=ri(r,3,12),d=ri(r,3,9);return{q:`The ${n}th term of ${a}, ${a+d}, ${a+2*d}, ...`,a:a+(n-1)*d}}],
6:[r=>{const m=pick(r,[7,11,13]);let b=ri(r,3,9);if(b%m===0)b=2;const e=ri(r,25,60);return{q:`Remainder when ${b}^${e} is divided by ${m}`,a:mp(b,e,m)}},
   r=>{const g=ri(r,6,17),x=g*ri(r,4,13),y=g*ri(r,4,13);return{q:`GCD of ${x} and ${y}`,a:gcd(x,y)}},
   r=>{const x=ri(r,12,48),y=ri(r,12,48);return{q:`LCM of ${x} and ${y}`,a:x*y/gcd(x,y)}}],
7:[r=>{const n=2**ri(r,2,5)*3**ri(r,1,3)*5**ri(r,1,2)*pick(r,[1,7,11]);return{q:`How many positive divisors does ${n} have?`,a:divs(n)}},
   r=>{const n=ri(r,40,200);let z=0;for(let p=5;p<=n;p*=5)z+=Math.floor(n/p);return{q:`How many trailing zeros does ${n}! have?`,a:z}},
   r=>{const n=ri(r,8,12),k=ri(r,3,5);return{q:`How many ways to choose ${k} items from ${n}?`,a:nCr(n,k)}}]
};
function evalExpr(src,v){const t=String(src).match(/\d+\.?\d*|[a-z]|\*\*|[-+*\/%^()]/gi)||[];let i=0;
 const prim=()=>{const x=t[i++];if(x==="("){const r=add();if(t[i++]!==")")throw 0;return r}if(x==="-")return -prim();if(x&&/^\d/.test(x))return +x;if(x&&/^[a-z]$/i.test(x)&&x in v)return v[x];throw 0};
 const pow=()=>{let b=prim();while(t[i]==="^"||t[i]==="**"){i++;b=Math.pow(b,prim())}return b};
 const mul=()=>{let a=pow();while(t[i]==="*"||t[i]==="/"||t[i]==="%"){const o=t[i++],b=pow();a=o==="*"?a*b:o==="/"?a/b:a%b}return a};
 const add=()=>{let a=mul();while(t[i]==="+"||t[i]==="-"){const o=t[i++],b=mul();a=o==="+"?a+b:a-b}return a};
 const r=add();if(i!==t.length)throw 0;return r}
const D="\u00b0",PI="\u03c0",TH="\u03b8",RT="\u221a",CR="\u221b",DIV="\u00f7";
const sub=b=>String(b).replace(/\d/g,d=>"\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089"[d]);
const TRI=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]];
const SIN=[["sin "+TH+" = 1/2",30],["sin "+TH+" = "+RT+"2/2",45],["sin "+TH+" = "+RT+"3/2",60],["cos "+TH+" = 1/2",60],["cos "+TH+" = "+RT+"2/2",45],["cos "+TH+" = "+RT+"3/2",30],["tan "+TH+" = 1",45],["tan "+TH+" = "+RT+"3",60],["tan "+TH+" = 1/"+RT+"3",30]];
const WORDS=["MATHS","ANGLE","RADIUS","CIRCLE","SQUARE","PARABOLA","FRACTION","VERTEX"];
const ADD={
1:[["Estimate a product (slider)",r=>{const a=ri(r,31,69),b=ri(r,31,69);return{q:`Estimate ${a} ${M} ${b} (use the slider)`,a:a*b,sl:{min:0,max:5000,step:10},est:true}}],
 ["Roots and cubes",r=>{const n=ri(r,12,30),m=ri(r,3,9),k=ri(r,3,9);return{q:`${RT}${n*n} + ${CR}${m**3} ${M} ${k}`,a:n+m*k}}]],
2:[["Percent of total (slider)",r=>{const p=5*ri(r,2,19),y=20*ri(r,3,15);return{q:`${p*y/100} is what percent of ${y}?`,a:p,sl:{min:0,max:100,step:1,unit:"%"}}}],
 ["Triangle angles (slider)",r=>{const a=ri(r,30,80),b=ri(r,30,80);return{q:`Two angles of a triangle are ${a}${D} and ${b}${D}. Find the third angle.`,a:180-a-b,sl:{min:0,max:180,step:1,unit:D}}}],
 ["Evaluate f(x)",r=>{const a=ri(r,2,9),b=ri(r,2,30),k=ri(r,3,15);return{q:`f(x) = ${a}x + ${b}. Find f(${k})`,a:a*k+b}}],
 ["Triangle area",r=>{const b=2*ri(r,6,20),h=ri(r,7,25);return{q:`Area of a triangle with base ${b} and height ${h}`,a:b*h/2}}]],
3:[["Right triangle hypotenuse",r=>{const t=pick(r,TRI),k=ri(r,1,3);return{q:`A right triangle has legs ${t[0]*k} and ${t[1]*k}. Find the hypotenuse.`,a:t[2]*k}}],
 ["Regular polygon angle (slider)",r=>{const n=pick(r,[5,6,8,9,10,12,15,18,20]);return{q:`Each interior angle of a regular polygon with ${n} sides`,a:180-360/n,sl:{min:0,max:180,step:1,unit:D}}}],
 ["Angle from trig value (slider)",r=>{const t=pick(r,SIN);return{q:`Find ${TH} (0${D} to 90${D}) if ${t[0]}`,a:t[1],sl:{min:0,max:90,step:1,unit:D}}}],
 ["Evaluate quadratic f(x)",r=>{const a=ri(r,2,5),b=ri(r,2,9),c=ri(r,2,20),k=ri(r,3,9);return{q:`f(x) = ${a}x${SQ} + ${b}x + ${c}. Find f(${k})`,a:a*k*k+b*k+c}}],
 ["Circle area in pi",r=>{const d=2*ri(r,4,15);return{q:`A circle has diameter ${d}. Its area is k${PI}. Find k.`,a:(d/2)**2}}]],
4:[["Radians to degrees (slider)",r=>{const m=pick(r,[2,3,4,5,6,9,10,12]),k=ri(r,1,2*m-1);return{q:`Convert ${k===1?"":k}${PI}/${m} radians to degrees`,a:180*k/m,sl:{min:0,max:360,step:1,unit:D}}}],
 ["Logarithm",r=>{const b=pick(r,[2,3,5,10]),k=ri(r,3,b===2?12:b===3?7:b===5?5:6);return{q:`log${sub(b)} ${b**k}`,a:k}}],
 ["Composite function",r=>{const a=ri(r,2,6),b=ri(r,1,9),c=ri(r,2,6),d=ri(r,1,9),k=ri(r,2,9);return{q:`f(x) = ${a}x + ${b} and g(x) = ${c}x + ${d}. Find f(g(${k})).`,a:a*(c*k+d)+b}}],
 ["Combine exponents",r=>{const b=pick(r,[2,3,5]),x=ri(r,3,9),y=ri(r,3,9),z=ri(r,1,5);return{q:`${b}^x = ${b}^${x} ${M} ${b}^${y} ${DIV} ${b}^${z}. Find x.`,a:x+y-z}}],
 ["Trig value sum",r=>{const a=2*ri(r,1,6),b=2*ri(r,1,6),c=ri(r,1,9);return{q:`${a} sin 30${D} + ${b} cos 60${D} + ${c} tan 45${D}`,a:a/2+b/2+c}}],
 ["Cylinder volume in pi",r=>{const R=ri(r,2,9),h=ri(r,3,15);return{q:`A cylinder has radius ${R} and height ${h}. Its volume is k${PI}. Find k.`,a:R*R*h}}]],
5:[["Distance between points",r=>{const t=pick(r,TRI),k=ri(r,1,3),x=ri(r,1,9),y=ri(r,1,9);return{q:`Distance between (${x}, ${y}) and (${x+t[0]*k}, ${y+t[1]*k})`,a:t[2]*k}}],
 ["Side from a 30 degree angle",r=>{const h=2*ri(r,5,30);return{q:`A right triangle has hypotenuse ${h} and an angle of 30${D}. Find the side opposite that angle.`,a:h/2}}],
 ["Polygon diagonals",r=>{const n=ri(r,8,25);return{q:`How many diagonals does a polygon with ${n} sides have?`,a:n*(n-3)/2}}],
 ["Binary to decimal",r=>{const n=ri(r,20,63);return{q:`Convert binary ${n.toString(2)} to decimal`,a:n}}],
 ["Log sum and difference",r=>{const b=pick(r,[2,3]),i=ri(r,3,7),j=ri(r,3,7),k=ri(r,1,3);return{q:`log${sub(b)} ${b**i} + log${sub(b)} ${b**j} ${S} log${sub(b)} ${b**k}`,a:i+j-k}}],
 ["Find f(10) from two values",r=>{const a=ri(r,2,9),b=ri(r,1,20);return{q:`f(x) = ax + b, f(2) = ${2*a+b} and f(5) = ${5*a+b}. Find f(10).`,a:10*a+b}}]],
6:[["Arrangements of letters",r=>{const w=pick(r,WORDS),c={};let f=1;for(let i=2;i<=w.length;i++)f*=i;for(const ch of w)c[ch]=(c[ch]||0)+1;for(const k in c)for(let i=2;i<=c[k];i++)f/=i;return{q:`How many different arrangements of the letters in ${w}?`,a:f}}],
 ["Digits of a power of 2",r=>{const k=ri(r,15,40);return{q:`Sum of the digits of 2^${k}`,a:[...String(2n**BigInt(k))].reduce((t,ch)=>t+ +ch,0)}}],
 ["Count primes",r=>{const n=ri(r,30,100);let c=0;for(let i=2;i<n;i++){let p=1;for(let j=2;j*j<=i;j++)if(i%j===0){p=0;break}c+=p}return{q:`How many primes are less than ${n}?`,a:c}}],
 ["Fibonacci term",r=>{const n=ri(r,10,20);let a=1,b=1;for(let i=3;i<=n;i++){[a,b]=[b,a+b]}return{q:`The ${n}th Fibonacci number (1, 1, 2, 3, 5, ...)`,a:b}}]],
7:[["Largest prime factor",r=>{const p=pick(r,[11,13,17,19,23,29,31,37,41,43]),a=ri(r,2,9),b=ri(r,2,9);return{q:`Largest prime factor of ${a*b*p}`,a:p}}],
 ["Decimal to binary",r=>{const n=ri(r,20,127);return{q:`Convert ${n} to binary`,a:Number(n.toString(2))}}],
 ["Sum of a function",r=>{const a=ri(r,2,9),b=ri(r,1,9),n=ri(r,8,20);return{q:`f(x) = ${a}x + ${b}. Find f(1) + f(2) + ... + f(${n})`,a:a*n*(n+1)/2+b*n}}]]
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
if(typeof window!=="undefined")window.MD_ENGINE=E;else module.exports=E;
})();
