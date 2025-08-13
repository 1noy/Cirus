var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,s=(t,r,a)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[r]=a,n=(e,t)=>{for(var r in t||(t={}))o.call(t,r)&&s(e,r,t[r]);if(a)for(var r of a(t))i.call(t,r)&&s(e,r,t[r]);return e},l=(e,a)=>t(e,r(a));import{r as d}from"./vendor-Be9Gvr8Z.js";let c,p,u,m={data:""},f=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,y=/\/\*[^]*?\*\/|  +/g,g=/\n+/g,b=(e,t)=>{let r="",a="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":a+="f"==i[1]?b(s,i):i+"{"+b(s,"k"==i[1]?"":t)+"}":"object"==typeof s?a+=b(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=b.p?b.p(i,s):i+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+a},h={},v=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+v(e[r]);return t}return e};function x(e){let t=this||{},r=e.call?e(t.p):e;return((e,t,r,a,o)=>{let i=v(e),s=h[i]||(h[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!h[s]){let t=i!==e?e:(e=>{let t,r,a=[{}];for(;t=f.exec(e.replace(y,""));)t[4]?a.shift():t[3]?(r=t[3].replace(g," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(g," ").trim();return a[0]})(e);h[s]=b(o?{["@keyframes "+s]:t}:t,r?"":"."+s)}let n=r&&h.g?h.g:null;return r&&(h.g=h[s]),l=h[s],d=t,c=a,(p=n)?d.data=d.data.replace(p,l):-1===d.data.indexOf(l)&&(d.data=c?l+d.data:d.data+l),s;var l,d,c,p})(r.unshift?r.raw?((e,t,r)=>e.reduce((e,a,o)=>{let i=t[o];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":b(e,""):!1===e?"":e}return e+a+(null==i?"":i)},""))(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,(a=t.target,"object"==typeof window?((a?a.querySelector("#_goober"):window._goober)||Object.assign((a||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:a||m),t.g,t.o,t.k);var a}x.bind({g:1});let w=x.bind({k:1});function E(e,t){let r=this||{};return function(){let t=arguments;return function a(o,i){let s=Object.assign({},o),n=s.className||a.className;r.p=Object.assign({theme:p&&p()},s),r.o=/ *go\d+/.test(n),s.className=x.apply(r,t)+(n?" "+n:"");let l=e;return e[0]&&(l=s.as||e,delete s.as),u&&l[0]&&u(s),c(l,s)}}}var O=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,j=(()=>{let e=0;return()=>(++e).toString()})(),$=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),k=(e,t)=>{switch(t.type){case 0:return l(n({},e),{toasts:[t.toast,...e.toasts].slice(0,20)});case 1:return l(n({},e),{toasts:e.toasts.map(e=>e.id===t.toast.id?n(n({},e),t.toast):e)});case 2:let{toast:r}=t;return k(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return l(n({},e),{toasts:e.toasts.map(e=>e.id===a||void 0===a?l(n({},e),{dismissed:!0,visible:!1}):e)});case 4:return void 0===t.toastId?l(n({},e),{toasts:[]}):l(n({},e),{toasts:e.toasts.filter(e=>e.id!==t.toastId)});case 5:return l(n({},e),{pausedAt:t.time});case 6:let o=t.time-(e.pausedAt||0);return l(n({},e),{pausedAt:void 0,toasts:e.toasts.map(e=>l(n({},e),{pauseDuration:e.pauseDuration+o}))})}},D=[],P={toasts:[],pausedAt:void 0},C=e=>{P=k(P,e),D.forEach(e=>{e(P)})},N={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=e=>(t,r)=>{let a=((e,t="blank",r)=>l(n({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0},r),{id:(null==r?void 0:r.id)||j()}))(t,e,r);return C({type:2,toast:a}),a.id},A=(e,t)=>z("blank")(e,t);A.error=z("error"),A.success=z("success"),A.loading=z("loading"),A.custom=z("custom"),A.dismiss=e=>{C({type:3,toastId:e})},A.remove=e=>C({type:4,toastId:e}),A.promise=(e,t,r)=>{let a=A.loading(t.loading,n(n({},r),null==r?void 0:r.loading));return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?O(t.success,e):void 0;return o?A.success(o,n(n({id:a},r),null==r?void 0:r.success)):A.dismiss(a),e}).catch(e=>{let o=t.error?O(t.error,e):void 0;o?A.error(o,n(n({id:a},r),null==r?void 0:r.error)):A.dismiss(a)}),e};var I,M=(e,t)=>{C({type:1,toast:{id:e,height:t}})},S=()=>{C({type:5,time:Date.now()})},T=new Map,F=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,H=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,_=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,L=E("div")`
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
    animation: ${H} 0.15s ease-out forwards;
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
    animation: ${_} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,R=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=E("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${R} 1s linear infinite;
`,q=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=w`
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
}`,V=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${B} 0.2s ease-out forwards;
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
`,Y=E("div")`
  position: absolute;
`,Z=E("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,G=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,J=E("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${G} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,K=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?d.createElement(J,null,t):t:"blank"===r?null:d.createElement(Z,null,d.createElement(U,n({},a)),"loading"!==r&&d.createElement(Y,null,"error"===r?d.createElement(L,n({},a)):d.createElement(V,n({},a))))},Q=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,W=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,X=E("div")`
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
`,ee=E("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,te=d.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,o]=$()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Q(r),W(r)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},i=d.createElement(K,{toast:e}),s=d.createElement(ee,n({},e.ariaProps),O(e.message,e));return d.createElement(X,{className:e.className,style:n(n(n({},o),r),e.style)},"function"==typeof a?a({icon:i,message:s}):d.createElement(d.Fragment,null,i,s))});I=d.createElement,b.p=undefined,c=I,p=undefined,u=undefined;var re=({id:e,className:t,style:r,onHeightUpdate:a,children:o})=>{let i=d.useCallback(t=>{if(t){let r=()=>{let r=t.getBoundingClientRect().height;a(e,r)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return d.createElement("div",{ref:i,className:t,style:r},o)},ae=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,oe=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:o,containerStyle:i,containerClassName:s})=>{let{toasts:c,handlers:p}=(e=>{let{toasts:t,pausedAt:r}=((e={})=>{let[t,r]=d.useState(P),a=d.useRef(P);d.useEffect(()=>(a.current!==P&&r(P),D.push(r),()=>{let e=D.indexOf(r);e>-1&&D.splice(e,1)}),[]);let o=t.toasts.map(t=>{var r,a,o;return l(n(n(n({},e),e[t.type]),t),{removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||N[t.type],style:n(n(n({},e.style),null==(o=e[t.type])?void 0:o.style),t.style)})});return l(n({},t),{toasts:o})})(e);d.useEffect(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(!(r<0))return setTimeout(()=>A.dismiss(t.id),r);t.visible&&A.dismiss(t.id)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=d.useCallback(()=>{r&&C({type:6,time:Date.now()})},[r]),o=d.useCallback((e,r)=>{let{reverseOrder:a=!1,gutter:o=8,defaultPosition:i}=r||{},s=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[t]);return d.useEffect(()=>{t.forEach(e=>{if(e.dismissed)((e,t=1e3)=>{if(T.has(e))return;let r=setTimeout(()=>{T.delete(e),C({type:4,toastId:e})},t);T.set(e,r)})(e.id,e.removeDelay);else{let t=T.get(e.id);t&&(clearTimeout(t),T.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:M,startPause:S,endPause:a,calculateOffset:o}}})(r);return d.createElement("div",{id:"_rht_toaster",style:n({position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none"},i),className:s,onMouseEnter:p.startPause,onMouseLeave:p.endPause},c.map(r=>{let i=r.position||t,s=((e,t)=>{let r=e.includes("top"),a=r?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return n(n({left:0,right:0,display:"flex",position:"absolute",transition:$()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`},a),o)})(i,p.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return d.createElement(re,{id:r.id,key:r.id,onHeightUpdate:p.updateHeight,className:r.visible?ae:"",style:s},"custom"===r.type?O(r.message,r):o?o(r):d.createElement(te,{toast:r,position:i}))}))},ie=A;export{oe as O,ie as V};
