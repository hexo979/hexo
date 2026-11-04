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
  return{q:o.q,a:o.a,tier:{n:NAMES[level-1]}}},
 set(r,levels){const seen={};return(levels||E.presets.Normal).map(l=>{let o,t=0;do{o=E.gen(l,r)}while(seen[o.q]&&++t<5);seen[o.q]=1;return o})}};
if(typeof window!=="undefined")window.MD_ENGINE=E;else module.exports=E;
})();
