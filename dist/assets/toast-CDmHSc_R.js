var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,s=(t,r,a)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[r]=a,n=(e,t)=>{for(var r in t||(t={}))o.call(t,r)&&s(e,r,t[r]);if(a)for(var r of a(t))i.call(t,r)&&s(e,r,t[r]);return e},l=(e,a)=>t(e,r(a));import{r as c}from"./vendor-a6qBUclc.js";let d,p,m,u={data:""},f=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,g=/\/\*[^]*?\*\/|  +/g,b=/\n+/g,y=(e,t)=>{let r="",a="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":a+="f"==i[1]?y(s,i):i+"{"+y(s,"k"==i[1]?"":t)+"}":"object"==typeof s?a+=y(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=y.p?y.p(i,s):i+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+a},h={},x=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+x(e[r]);return t}return e};function v(e){let t=this||{},r=e.call?e(t.p):e;return((e,t,r,a,o)=>{let i=x(e),s=h[i]||(h[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!h[s]){let t=i!==e?e:(e=>{let t,r,a=[{}];for(;t=f.exec(e.replace(g,""));)t[4]?a.shift():t[3]?(r=t[3].replace(b," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(b," ").trim();return a[0]})(e);h[s]=y(o?{["@keyframes "+s]:t}:t,r?"":"."+s)}let n=r&&h.g?h.g:null;return r&&(h.g=h[s]),l=h[s],c=t,d=a,(p=n)?c.data=c.data.replace(p,l):-1===c.data.indexOf(l)&&(c.data=d?l+c.data:c.data+l),s;var l,c,d,p})(r.unshift?r.raw?((e,t,r)=>e.reduce((e,a,o)=>{let i=t[o];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":y(e,""):!1===e?"":e}return e+a+(null==i?"":i)},""))(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,(a=t.target,"object"==typeof window?((a?a.querySelector("#_goober"):window._goober)||Object.assign((a||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:a||u),t.g,t.o,t.k);var a}v.bind({g:1});let w=v.bind({k:1});function $(e,t){let r=this||{};return function(){let t=arguments;return function a(o,i){let s=Object.assign({},o),n=s.className||a.className;r.p=Object.assign({theme:p&&p()},s),r.o=/ *go\d+/.test(n),s.className=v.apply(r,t)+(n?" "+n:"");let l=e;return e[0]&&(l=s.as||e,delete s.as),m&&l[0]&&m(s),d(l,s)}}}var j=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,E=(()=>{let e=0;return()=>(++e).toString()})(),O=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),k=(e,t)=>{switch(t.type){case 0:return l(n({},e),{toasts:[t.toast,...e.toasts].slice(0,20)});case 1:return l(n({},e),{toasts:e.toasts.map(e=>e.id===t.toast.id?n(n({},e),t.toast):e)});case 2:let{toast:r}=t;return k(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return l(n({},e),{toasts:e.toasts.map(e=>e.id===a||void 0===a?l(n({},e),{dismissed:!0,visible:!1}):e)});case 4:return void 0===t.toastId?l(n({},e),{toasts:[]}):l(n({},e),{toasts:e.toasts.filter(e=>e.id!==t.toastId)});case 5:return l(n({},e),{pausedAt:t.time});case 6:let o=t.time-(e.pausedAt||0);return l(n({},e),{pausedAt:void 0,toasts:e.toasts.map(e=>l(n({},e),{pauseDuration:e.pauseDuration+o}))})}},z=[],A={toasts:[],pausedAt:void 0},P=e=>{A=k(A,e),z.forEach(e=>{e(A)})},I=e=>(t,r)=>{let a=((e,t="blank",r)=>l(n({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0},r),{id:(null==r?void 0:r.id)||E()}))(t,e,r);return P({type:2,toast:a}),a.id},N=(e,t)=>I("blank")(e,t);N.error=I("error"),N.success=I("success"),N.loading=I("loading"),N.custom=I("custom"),N.dismiss=e=>{P({type:3,toastId:e})},N.remove=e=>P({type:4,toastId:e}),N.promise=(e,t,r)=>{let a=N.loading(t.loading,n(n({},r),null==r?void 0:r.loading));return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?j(t.success,e):void 0;return o?N.success(o,n(n({id:a},r),null==r?void 0:r.success)):N.dismiss(a),e}).catch(e=>{let o=t.error?j(t.error,e):void 0;o?N.error(o,n(n({id:a},r),null==r?void 0:r.error)):N.dismiss(a)}),e};var D,F=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,C=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,S=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,_=$("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${C} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${S} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,L=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,M=$("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${L} 1s linear infinite;
`,T=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,q=w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,H=$("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${q} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,V=$("div")`
  position: absolute;
`,Z=$("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,B=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=$("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${B} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,J=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?c.createElement(G,null,t):t:"blank"===r?null:c.createElement(Z,null,c.createElement(M,n({},a)),"loading"!==r&&c.createElement(V,null,"error"===r?c.createElement(_,n({},a)):c.createElement(H,n({},a))))},K=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,Q=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,R=$("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,U=$("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;c.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,o]=O()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[K(r),Q(r)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},i=c.createElement(J,{toast:e}),s=c.createElement(U,n({},e.ariaProps),j(e.message,e));return c.createElement(R,{className:e.className,style:n(n(n({},o),r),e.style)},"function"==typeof a?a({icon:i,message:s}):c.createElement(c.Fragment,null,i,s))}),D=c.createElement,y.p=undefined,d=D,p=undefined,m=undefined,v`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var W=N;export{W as V};
