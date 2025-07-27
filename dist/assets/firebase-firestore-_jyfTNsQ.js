var t=Object.defineProperty,e=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,o=(e,n,r)=>n in e?t(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,a=(t,e)=>{for(var n in e||(e={}))s.call(e,n)&&o(t,n,e[n]);if(r)for(var n of r(e))i.call(e,n)&&o(t,n,e[n]);return t},u=(t,r)=>e(t,n(r)),c=(t,e,n)=>new Promise((r,s)=>{var i=t=>{try{a(n.next(t))}catch(e){s(e)}},o=t=>{try{a(n.throw(t))}catch(e){s(e)}},a=t=>t.done?r(t.value):Promise.resolve(t.value).then(i,o);a((n=n.apply(t,e)).next())});import{g as l,a as h,_ as d,b as f,F as g,i as m,p,u as y,d as v,c as w,L as T,e as E,f as _,h as b,S,j as I,C,r as A,k as N}from"./firebase-auth-Dy6ffJkg.js";var D,k,R="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function e(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function n(t,e,n){n||(n=0);var r=Array(16);if("string"==typeof e)for(var s=0;16>s;++s)r[s]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(s=0;16>s;++s)r[s]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],s=t.g[2];var i=t.g[3],o=e+(i^n&(s^i))+r[0]+3614090360&4294967295;o=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=(n=(s=(i=(e=n+(o<<7&4294967295|o>>>25))+((o=i+(s^e&(n^s))+r[1]+3905402710&4294967295)<<12&4294967295|o>>>20))+((o=s+(n^i&(e^n))+r[2]+606105819&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^s&(i^e))+r[3]+3250441966&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(s^i))+r[4]+4118548399&4294967295)<<7&4294967295|o>>>25))+((o=i+(s^e&(n^s))+r[5]+1200080426&4294967295)<<12&4294967295|o>>>20))+((o=s+(n^i&(e^n))+r[6]+2821735955&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^s&(i^e))+r[7]+4249261313&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(s^i))+r[8]+1770035416&4294967295)<<7&4294967295|o>>>25))+((o=i+(s^e&(n^s))+r[9]+2336552879&4294967295)<<12&4294967295|o>>>20))+((o=s+(n^i&(e^n))+r[10]+4294925233&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^s&(i^e))+r[11]+2304563134&4294967295)<<22&4294967295|o>>>10))+((o=e+(i^n&(s^i))+r[12]+1804603682&4294967295)<<7&4294967295|o>>>25))+((o=i+(s^e&(n^s))+r[13]+4254626195&4294967295)<<12&4294967295|o>>>20))+((o=s+(n^i&(e^n))+r[14]+2792965006&4294967295)<<17&4294967295|o>>>15))+((o=n+(e^s&(i^e))+r[15]+1236535329&4294967295)<<22&4294967295|o>>>10))+((o=e+(s^i&(n^s))+r[1]+4129170786&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^s&(e^n))+r[6]+3225465664&4294967295)<<9&4294967295|o>>>23))+((o=s+(e^n&(i^e))+r[11]+643717713&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(s^i))+r[0]+3921069994&4294967295)<<20&4294967295|o>>>12))+((o=e+(s^i&(n^s))+r[5]+3593408605&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^s&(e^n))+r[10]+38016083&4294967295)<<9&4294967295|o>>>23))+((o=s+(e^n&(i^e))+r[15]+3634488961&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(s^i))+r[4]+3889429448&4294967295)<<20&4294967295|o>>>12))+((o=e+(s^i&(n^s))+r[9]+568446438&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^s&(e^n))+r[14]+3275163606&4294967295)<<9&4294967295|o>>>23))+((o=s+(e^n&(i^e))+r[3]+4107603335&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(s^i))+r[8]+1163531501&4294967295)<<20&4294967295|o>>>12))+((o=e+(s^i&(n^s))+r[13]+2850285829&4294967295)<<5&4294967295|o>>>27))+((o=i+(n^s&(e^n))+r[2]+4243563512&4294967295)<<9&4294967295|o>>>23))+((o=s+(e^n&(i^e))+r[7]+1735328473&4294967295)<<14&4294967295|o>>>18))+((o=n+(i^e&(s^i))+r[12]+2368359562&4294967295)<<20&4294967295|o>>>12))+((o=e+(n^s^i)+r[5]+4294588738&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^s)+r[8]+2272392833&4294967295)<<11&4294967295|o>>>21))+((o=s+(i^e^n)+r[11]+1839030562&4294967295)<<16&4294967295|o>>>16))+((o=n+(s^i^e)+r[14]+4259657740&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^s^i)+r[1]+2763975236&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^s)+r[4]+1272893353&4294967295)<<11&4294967295|o>>>21))+((o=s+(i^e^n)+r[7]+4139469664&4294967295)<<16&4294967295|o>>>16))+((o=n+(s^i^e)+r[10]+3200236656&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^s^i)+r[13]+681279174&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^s)+r[0]+3936430074&4294967295)<<11&4294967295|o>>>21))+((o=s+(i^e^n)+r[3]+3572445317&4294967295)<<16&4294967295|o>>>16))+((o=n+(s^i^e)+r[6]+76029189&4294967295)<<23&4294967295|o>>>9))+((o=e+(n^s^i)+r[9]+3654602809&4294967295)<<4&4294967295|o>>>28))+((o=i+(e^n^s)+r[12]+3873151461&4294967295)<<11&4294967295|o>>>21))+((o=s+(i^e^n)+r[15]+530742520&4294967295)<<16&4294967295|o>>>16))+((o=n+(s^i^e)+r[2]+3299628645&4294967295)<<23&4294967295|o>>>9))+((o=e+(s^(n|~i))+r[0]+4096336452&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~s))+r[7]+1126891415&4294967295)<<10&4294967295|o>>>22))+((o=s+(e^(i|~n))+r[14]+2878612391&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(s|~e))+r[5]+4237533241&4294967295)<<21&4294967295|o>>>11))+((o=e+(s^(n|~i))+r[12]+1700485571&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~s))+r[3]+2399980690&4294967295)<<10&4294967295|o>>>22))+((o=s+(e^(i|~n))+r[10]+4293915773&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(s|~e))+r[1]+2240044497&4294967295)<<21&4294967295|o>>>11))+((o=e+(s^(n|~i))+r[8]+1873313359&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~s))+r[15]+4264355552&4294967295)<<10&4294967295|o>>>22))+((o=s+(e^(i|~n))+r[6]+2734768916&4294967295)<<15&4294967295|o>>>17))+((o=n+(i^(s|~e))+r[13]+1309151649&4294967295)<<21&4294967295|o>>>11))+((i=(e=n+((o=e+(s^(n|~i))+r[4]+4149444226&4294967295)<<6&4294967295|o>>>26))+((o=i+(n^(e|~s))+r[11]+3174756917&4294967295)<<10&4294967295|o>>>22))^((s=i+((o=s+(e^(i|~n))+r[2]+718787259&4294967295)<<15&4294967295|o>>>17))|~e))+r[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(s+(o<<21&4294967295|o>>>11))&4294967295,t.g[2]=t.g[2]+s&4294967295,t.g[3]=t.g[3]+i&4294967295}function r(t,e){this.h=e;for(var n=[],r=!0,s=t.length-1;0<=s;s--){var i=0|t[s];r&&i==e||(n[s]=i,r=!1)}this.g=n}!function(t,e){function n(){}n.prototype=e.prototype,t.D=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.C=function(t,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return e.prototype[n].apply(t,s)}}(e,function(){this.blockSize=-1}),e.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},e.prototype.u=function(t,e){void 0===e&&(e=t.length);for(var r=e-this.blockSize,s=this.B,i=this.h,o=0;o<e;){if(0==i)for(;o<=r;)n(this,t,o),o+=this.blockSize;if("string"==typeof t){for(;o<e;)if(s[i++]=t.charCodeAt(o++),i==this.blockSize){n(this,s),i=0;break}}else for(;o<e;)if(s[i++]=t[o++],i==this.blockSize){n(this,s),i=0;break}}this.h=i,this.o+=e},e.prototype.v=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.o;for(e=t.length-8;e<t.length;++e)t[e]=255&n,n/=256;for(this.u(t),t=Array(16),e=n=0;4>e;++e)for(var r=0;32>r;r+=8)t[n++]=this.g[e]>>>r&255;return t};var s={};function i(t){return-128<=t&&128>t?function(t){var e,n=s;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=new r([0|(e=t)],0>e?-1:0)}(t):new r([0|t],0>t?-1:0)}function o(t){if(isNaN(t)||!isFinite(t))return a;if(0>t)return d(o(-t));for(var e=[],n=1,s=0;t>=n;s++)e[s]=t/n|0,n*=4294967296;return new r(e,0)}var a=i(0),u=i(1),c=i(16777216);function l(t){if(0!=t.h)return!1;for(var e=0;e<t.g.length;e++)if(0!=t.g[e])return!1;return!0}function h(t){return-1==t.h}function d(t){for(var e=t.g.length,n=[],s=0;s<e;s++)n[s]=~t.g[s];return new r(n,~t.h).add(u)}function f(t,e){return t.add(d(e))}function g(t,e){for(;(65535&t[e])!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function m(t,e){this.g=t,this.h=e}function p(t,e){if(l(e))throw Error("division by zero");if(l(t))return new m(a,a);if(h(t))return e=p(d(t),e),new m(d(e.g),d(e.h));if(h(e))return e=p(t,d(e)),new m(d(e.g),e.h);if(30<t.g.length){if(h(t)||h(e))throw Error("slowDivide_ only works with positive integers.");for(var n=u,r=e;0>=r.l(t);)n=y(n),r=y(r);var s=v(n,1),i=v(r,1);for(r=v(r,2),n=v(n,2);!l(r);){var c=i.add(r);0>=c.l(t)&&(s=s.add(n),i=c),r=v(r,1),n=v(n,1)}return e=f(t,s.j(e)),new m(s,e)}for(s=a;0<=t.l(e);){for(n=Math.max(1,Math.floor(t.m()/e.m())),r=48>=(r=Math.ceil(Math.log(n)/Math.LN2))?1:Math.pow(2,r-48),c=(i=o(n)).j(e);h(c)||0<c.l(t);)c=(i=o(n-=r)).j(e);l(i)&&(i=u),s=s.add(i),t=f(t,c)}return new m(s,t)}function y(t){for(var e=t.g.length+1,n=[],s=0;s<e;s++)n[s]=t.i(s)<<1|t.i(s-1)>>>31;return new r(n,t.h)}function v(t,e){var n=e>>5;e%=32;for(var s=t.g.length-n,i=[],o=0;o<s;o++)i[o]=0<e?t.i(o+n)>>>e|t.i(o+n+1)<<32-e:t.i(o+n);return new r(i,t.h)}(t=r.prototype).m=function(){if(h(this))return-d(this).m();for(var t=0,e=1,n=0;n<this.g.length;n++){var r=this.i(n);t+=(0<=r?r:4294967296+r)*e,e*=4294967296}return t},t.toString=function(t){if(2>(t=t||10)||36<t)throw Error("radix out of range: "+t);if(l(this))return"0";if(h(this))return"-"+d(this).toString(t);for(var e=o(Math.pow(t,6)),n=this,r="";;){var s=p(n,e).g,i=((0<(n=f(n,s.j(e))).g.length?n.g[0]:n.h)>>>0).toString(t);if(l(n=s))return i+r;for(;6>i.length;)i="0"+i;r=i+r}},t.i=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h},t.l=function(t){return h(t=f(this,t))?-1:l(t)?0:1},t.abs=function(){return h(this)?d(this):this},t.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0,i=0;i<=e;i++){var o=s+(65535&this.i(i))+(65535&t.i(i)),a=(o>>>16)+(this.i(i)>>>16)+(t.i(i)>>>16);s=a>>>16,o&=65535,a&=65535,n[i]=a<<16|o}return new r(n,-2147483648&n[n.length-1]?-1:0)},t.j=function(t){if(l(this)||l(t))return a;if(h(this))return h(t)?d(this).j(d(t)):d(d(this).j(t));if(h(t))return d(this.j(d(t)));if(0>this.l(c)&&0>t.l(c))return o(this.m()*t.m());for(var e=this.g.length+t.g.length,n=[],s=0;s<2*e;s++)n[s]=0;for(s=0;s<this.g.length;s++)for(var i=0;i<t.g.length;i++){var u=this.i(s)>>>16,f=65535&this.i(s),m=t.i(i)>>>16,p=65535&t.i(i);n[2*s+2*i]+=f*p,g(n,2*s+2*i),n[2*s+2*i+1]+=u*p,g(n,2*s+2*i+1),n[2*s+2*i+1]+=f*m,g(n,2*s+2*i+1),n[2*s+2*i+2]+=u*m,g(n,2*s+2*i+2)}for(s=0;s<e;s++)n[s]=n[2*s+1]<<16|n[2*s];for(s=e;s<2*e;s++)n[s]=0;return new r(n,0)},t.A=function(t){return p(this,t).h},t.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.i(s)&t.i(s);return new r(n,this.h&t.h)},t.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.i(s)|t.i(s);return new r(n,this.h|t.h)},t.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.i(s)^t.i(s);return new r(n,this.h^t.h)},e.prototype.digest=e.prototype.v,e.prototype.reset=e.prototype.s,e.prototype.update=e.prototype.u,k=e,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.A,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=o,r.fromString=function t(e,n){if(0==e.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==e.charAt(0))return d(t(e.substring(1),n));if(0<=e.indexOf("-"))throw Error('number format error: interior "-" character');for(var r=o(Math.pow(n,8)),s=a,i=0;i<e.length;i+=8){var u=Math.min(8,e.length-i),c=parseInt(e.substring(i,i+u),n);8>u?(u=o(Math.pow(n,u)),s=s.j(u).add(o(c))):s=(s=s.j(r)).add(o(c))}return s},D=r}).apply(void 0!==R?R:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var x,O,M,L,V,P,F,U,q="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var t,e="function"==typeof Object.defineProperties?Object.defineProperty:function(t,e,n){return t==Array.prototype||t==Object.prototype||(t[e]=n.value),t},n=function(t){t=["object"==typeof globalThis&&globalThis,t,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof q&&q];for(var e=0;e<t.length;++e){var n=t[e];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);!function(t,r){if(r)t:{var s=n;t=t.split(".");for(var i=0;i<t.length-1;i++){var o=t[i];if(!(o in s))break t;s=s[o]}(r=r(i=s[t=t[t.length-1]]))!=i&&null!=r&&e(s,t,{configurable:!0,writable:!0,value:r})}}("Array.prototype.values",function(t){return t||function(){return function(t,e){t instanceof String&&(t+="");var n=0,r=!1,s={next:function(){if(!r&&n<t.length){var s=n++;return{value:e(0,t[s]),done:!1}}return r=!0,{done:!0,value:void 0}}};return s[Symbol.iterator]=function(){return s},s}(this,function(t,e){return e})}});
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var r=r||{},s=this||self;function i(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function o(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}function a(t,e,n){return t.call.apply(t.bind,arguments)}function u(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function c(t,e,n){return(c=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?a:u).apply(null,arguments)}function l(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function h(t,e){function n(){}n.prototype=e.prototype,t.aa=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Qb=function(t,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return e.prototype[n].apply(t,s)}}function d(t){const e=t.length;if(0<e){const n=Array(e);for(let r=0;r<e;r++)n[r]=t[r];return n}return[]}function f(t,e){for(let n=1;n<arguments.length;n++){const e=arguments[n];if(i(e)){const n=t.length||0,r=e.length||0;t.length=n+r;for(let s=0;s<r;s++)t[n+s]=e[s]}else t.push(e)}}function g(t){return/^[\s\xa0]*$/.test(t)}function m(){var t=s.navigator;return t&&(t=t.userAgent)?t:""}function p(t){return p[" "](t),t}p[" "]=function(){};var y=!(-1==m().indexOf("Gecko")||-1!=m().toLowerCase().indexOf("webkit")&&-1==m().indexOf("Edge")||-1!=m().indexOf("Trident")||-1!=m().indexOf("MSIE")||-1!=m().indexOf("Edge"));function v(t,e,n){for(const r in t)e.call(n,t[r],r,t)}function w(t){const e={};for(const n in t)e[n]=t[n];return e}const T="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(t,e){let n,r;for(let s=1;s<arguments.length;s++){for(n in r=arguments[s],r)t[n]=r[n];for(let e=0;e<T.length;e++)n=T[e],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function _(t){var e=1;t=t.split(":");const n=[];for(;0<e&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function b(t){s.setTimeout(()=>{throw t},0)}function S(){var t=D;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}var I=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new C,t=>t.reset());class C{constructor(){this.next=this.g=this.h=null}set(t,e){this.h=t,this.g=e,this.next=null}reset(){this.next=this.g=this.h=null}}let A,N=!1,D=new class{constructor(){this.h=this.g=null}add(t,e){const n=I.get();n.set(t,e),this.h?this.h.next=n:this.g=n,this.h=n}},k=()=>{const t=s.Promise.resolve(void 0);A=()=>{t.then(R)}};var R=()=>{for(var t;t=S();){try{t.h.call(t.g)}catch(n){b(n)}var e=I;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}N=!1};function j(){this.s=this.s,this.C=this.C}function B(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}j.prototype.s=!1,j.prototype.ma=function(){this.s||(this.s=!0,this.N())},j.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},B.prototype.h=function(){this.defaultPrevented=!0};var z=function(){if(!s.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{const t=()=>{};s.addEventListener("test",t,e),s.removeEventListener("test",t,e)}catch(n){}return t}();function $(t,e){if(B.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(y){t:{try{p(e.nodeName);var s=!0;break t}catch(i){}s=!1}s||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:G[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&$.aa.h.call(this)}}h($,B);var G={2:"touch",3:"pen",4:"mouse"};$.prototype.h=function(){$.aa.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var K="closure_listenable_"+(1e6*Math.random()|0),Q=0;function H(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.ha=s,this.key=++Q,this.da=this.fa=!1}function X(t){t.da=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function Y(t){this.src=t,this.g={},this.h=0}function W(t,e){var n=e.type;if(n in t.g){var r,s=t.g[n],i=Array.prototype.indexOf.call(s,e,void 0);(r=0<=i)&&Array.prototype.splice.call(s,i,1),r&&(X(e),0==t.g[n].length&&(delete t.g[n],t.h--))}}function J(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.da&&i.listener==e&&i.capture==!!n&&i.ha==r)return s}return-1}Y.prototype.add=function(t,e,n,r,s){var i=t.toString();(t=this.g[i])||(t=this.g[i]=[],this.h++);var o=J(t,e,r,s);return-1<o?(e=t[o],n||(e.fa=!1)):((e=new H(e,this.src,i,!!r,s)).fa=n,t.push(e)),e};var Z="closure_lm_"+(1e6*Math.random()|0),tt={};function et(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)et(t,e[i],n,r,s);return null}return n=ut(n),t&&t[K]?t.K(e,n,!!o(r)&&!!r.capture,s):function(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var a=o(s)?!!s.capture:!!s,u=ot(t);if(u||(t[Z]=u=new Y(t)),(n=u.add(e,n,r,a,i)).proxy)return n;if(r=function(){const t=it;return function e(n){return t.call(e.src,e.listener,n)}}(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)z||(s=a),void 0===s&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(st(e.toString()),r);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(r)}return n}(t,e,n,!1,r,s)}function nt(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)nt(t,e[i],n,r,s);else r=o(r)?!!r.capture:!!r,n=ut(n),t&&t[K]?(t=t.i,(e=String(e).toString())in t.g&&-1<(n=J(i=t.g[e],n,r,s))&&(X(i[n]),Array.prototype.splice.call(i,n,1),0==i.length&&(delete t.g[e],t.h--))):t&&(t=ot(t))&&(e=t.g[e.toString()],t=-1,e&&(t=J(e,n,r,s)),(n=-1<t?e[t]:null)&&rt(n))}function rt(t){if("number"!=typeof t&&t&&!t.da){var e=t.src;if(e&&e[K])W(e.i,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(st(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=ot(e))?(W(n,t),0==n.h&&(n.src=null,e[Z]=null)):X(t)}}}function st(t){return t in tt?tt[t]:tt[t]="on"+t}function it(t,e){if(t.da)t=!0;else{e=new $(e,this);var n=t.listener,r=t.ha||t.src;t.fa&&rt(t),t=n.call(r,e)}return t}function ot(t){return(t=t[Z])instanceof Y?t:null}var at="__closure_events_fn_"+(1e9*Math.random()>>>0);function ut(t){return"function"==typeof t?t:(t[at]||(t[at]=function(e){return t.handleEvent(e)}),t[at])}function ct(){j.call(this),this.i=new Y(this),this.M=this,this.F=null}function lt(t,e){var n,r=t.F;if(r)for(n=[];r;r=r.F)n.push(r);if(t=t.M,r=e.type||e,"string"==typeof e)e=new B(e,t);else if(e instanceof B)e.target=e.target||t;else{var s=e;E(e=new B(r,t),s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];s=ht(o,r,!0,e)&&s}if(s=ht(o=e.g=t,r,!0,e)&&s,s=ht(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)s=ht(o=e.g=n[i],r,!1,e)&&s}function ht(t,e,n,r){if(!(e=t.i.g[String(e)]))return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.da&&o.capture==n){var a=o.listener,u=o.ha||o.src;o.fa&&W(t.i,o),s=!1!==a.call(u,r)&&s}}return s&&!r.defaultPrevented}function dt(t,e,n){if("function"==typeof t)n&&(t=c(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=c(t.handleEvent,t)}return 2147483647<Number(e)?-1:s.setTimeout(t,e||0)}function ft(t){t.g=dt(()=>{t.g=null,t.i&&(t.i=!1,ft(t))},t.l);const e=t.h;t.h=null,t.m.apply(null,e)}h(ct,j),ct.prototype[K]=!0,ct.prototype.removeEventListener=function(t,e,n,r){nt(this,t,e,n,r)},ct.prototype.N=function(){if(ct.aa.N.call(this),this.i){var t,e=this.i;for(t in e.g){for(var n=e.g[t],r=0;r<n.length;r++)X(n[r]);delete e.g[t],e.h--}}this.F=null},ct.prototype.K=function(t,e,n,r){return this.i.add(String(t),e,!1,n,r)},ct.prototype.L=function(t,e,n,r){return this.i.add(String(t),e,!0,n,r)};class gt extends j{constructor(t,e){super(),this.m=t,this.l=e,this.h=null,this.i=!1,this.g=null}j(t){this.h=arguments,this.g?this.i=!0:ft(this)}N(){super.N(),this.g&&(s.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function mt(t){j.call(this),this.h=t,this.g={}}h(mt,j);var pt=[];function yt(t){v(t.g,function(t,e){this.g.hasOwnProperty(e)&&rt(t)},t),t.g={}}mt.prototype.N=function(){mt.aa.N.call(this),yt(this)},mt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var vt=s.JSON.stringify,wt=s.JSON.parse,Tt=class{stringify(t){return s.JSON.stringify(t,void 0)}parse(t){return s.JSON.parse(t,void 0)}};function Et(){}function _t(t){return t.h||(t.h=t.i())}function bt(){}Et.prototype.h=null;var St={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function It(){B.call(this,"d")}function Ct(){B.call(this,"c")}h(It,B),h(Ct,B);var At={},Nt=null;function Dt(){return Nt=Nt||new ct}function kt(t){B.call(this,At.La,t)}function Rt(t){const e=Dt();lt(e,new kt(e))}function xt(t,e){B.call(this,At.STAT_EVENT,t),this.stat=e}function Ot(t){const e=Dt();lt(e,new xt(e,t))}function Mt(t,e){B.call(this,At.Ma,t),this.size=e}function Lt(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return s.setTimeout(function(){t()},e)}function Vt(){this.g=!0}function Pt(t,e,n,r){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(var o=1;o<s.length;o++)s[o]=""}}}return vt(n)}catch(a){return e}}(t,n)+(r?" "+r:"")})}At.La="serverreachability",h(kt,B),At.STAT_EVENT="statevent",h(xt,B),At.Ma="timingevent",h(Mt,B),Vt.prototype.xa=function(){this.g=!1},Vt.prototype.info=function(){};var Ft,Ut={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},qt={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"};function jt(){}function Bt(t,e,n,r){this.j=t,this.i=e,this.l=n,this.R=r||1,this.U=new mt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new zt}function zt(){this.i=null,this.g="",this.h=!1}h(jt,Et),jt.prototype.g=function(){return new XMLHttpRequest},jt.prototype.i=function(){return{}},Ft=new jt;var $t={},Gt={};function Kt(t,e,n){t.L=1,t.v=ve(fe(e)),t.m=n,t.P=!0,Qt(t,null)}function Qt(t,e){t.F=Date.now(),Yt(t),t.A=fe(t.v);var n=t.A,r=t.R;Array.isArray(r)||(r=[String(r)]),Re(n.i,"t",r),t.C=0,n=t.j.J,t.h=new zt,t.g=wn(t.j,n?e:null,!t.m),0<t.O&&(t.M=new gt(c(t.Y,t,t.g),t.O)),e=t.U,n=t.g,r=t.ca;var s="readystatechange";Array.isArray(s)||(s&&(pt[0]=s.toString()),s=pt);for(var i=0;i<s.length;i++){var o=et(n,s[i],r||e.handleEvent,!1,e.h||e);if(!o)break;e.g[o.key]=o}e=t.H?w(t.H):{},t.m?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.m,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),Rt(),function(t,e,n,r,s,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),u=0;u<a.length;u++){var c=a[u].split("=");if(1<c.length){var l=c[0];c=c[1];var h=l.split("_");o=2<=h.length&&"type"==h[1]?o+(l+"=")+c+"&":o+(l+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+"\n"+n+"\n"+o})}(t.i,t.u,t.A,t.l,t.R,t.m)}function Ht(t){return!!t.g&&"GET"==t.u&&2!=t.L&&t.j.Ca}function Xt(t,e){var n=t.C,r=e.indexOf("\n",n);return-1==r?Gt:(n=Number(e.substring(n,r)),isNaN(n)?$t:(r+=1)+n>e.length?Gt:(e=e.slice(r,r+n),t.C=r+n,e))}function Yt(t){t.S=Date.now()+t.I,Wt(t,t.I)}function Wt(t,e){if(null!=t.B)throw Error("WatchDog timer not null");t.B=Lt(c(t.ba,t),e)}function Jt(t){t.B&&(s.clearTimeout(t.B),t.B=null)}function Zt(t){0==t.j.G||t.J||gn(t.j,t)}function te(t){Jt(t);var e=t.M;e&&"function"==typeof e.ma&&e.ma(),t.M=null,yt(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.ma())}function ee(t,e){try{var n=t.j;if(0!=n.G&&(n.g==t||oe(n.h,t)))if(!t.K&&oe(n.h,t)&&3==n.G){try{var r=n.Da.g.parse(e)}catch(l){r=null}if(Array.isArray(r)&&3==r.length){var s=r;if(0==s[0]){t:if(!n.u){if(n.g){if(!(n.g.F+3e3<t.F))break t;fn(n),nn(n)}ln(n),Ot(18)}}else n.za=s[1],0<n.za-n.T&&37500>s[2]&&n.F&&0==n.v&&!n.C&&(n.C=Lt(c(n.Za,n),6e3));if(1>=ie(n.h)&&n.ca){try{n.ca()}catch(l){}n.ca=void 0}}else pn(n,11)}else if((t.K||n.g==t)&&fn(n),!g(e))for(s=n.Da.g.parse(e),e=0;e<s.length;e++){let c=s[e];if(n.T=c[0],c=c[1],2==n.G)if("c"==c[0]){n.K=c[1],n.ia=c[2];const e=c[3];null!=e&&(n.la=e,n.j.info("VER="+n.la));const s=c[4];null!=s&&(n.Aa=s,n.j.info("SVER="+n.Aa));const l=c[5];null!=l&&"number"==typeof l&&0<l&&(r=1.5*l,n.L=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const h=t.g;if(h){const t=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(t){var i=r.h;i.g||-1==t.indexOf("spdy")&&-1==t.indexOf("quic")&&-1==t.indexOf("h2")||(i.j=i.l,i.g=new Set,i.h&&(ae(i,i.h),i.h=null))}if(r.D){const t=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;t&&(r.ya=t,ye(r.I,r.D,t))}}n.G=3,n.l&&n.l.ua(),n.ba&&(n.R=Date.now()-t.F,n.j.info("Handshake RTT: "+n.R+"ms"));var o=t;if((r=n).qa=vn(r,r.J?r.ia:null,r.W),o.K){ue(r.h,o);var a=o,u=r.L;u&&(a.I=u),a.B&&(Jt(a),Yt(a)),r.g=o}else cn(r);0<n.i.length&&sn(n)}else"stop"!=c[0]&&"close"!=c[0]||pn(n,7);else 3==n.G&&("stop"==c[0]||"close"==c[0]?"stop"==c[0]?pn(n,7):en(n):"noop"!=c[0]&&n.l&&n.l.ta(c),n.v=0)}Rt()}catch(l){}}Bt.prototype.ca=function(t){t=t.target;const e=this.M;e&&3==We(t)?e.j():this.Y(t)},Bt.prototype.Y=function(t){try{if(t==this.g)t:{const d=We(this.g);var e=this.g.Ba();if(this.g.Z(),!(3>d)&&(3!=d||this.g&&(this.h.h||this.g.oa()||Je(this.g)))){this.J||4!=d||7==e||Rt(),Jt(this);var n=this.g.Z();this.X=n;e:if(Ht(this)){var r=Je(this.g);t="";var i=r.length,o=4==We(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){te(this),Zt(this);var a="";break e}this.h.i=new s.TextDecoder}for(e=0;e<i;e++)this.h.h=!0,t+=this.h.i.decode(r[e],{stream:!(o&&e==i-1)});r.length=0,this.h.g+=t,this.C=0,a=this.h.g}else a=this.g.oa();if(this.o=200==n,function(t,e,n,r,s,i,o){t.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+"\n"+n+"\n"+i+" "+o})}(this.i,this.u,this.A,this.l,this.R,d,n),this.o){if(this.T&&!this.K){e:{if(this.g){var u,c=this.g;if((u=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(u)){var l=u;break e}}l=null}if(!(n=l)){this.o=!1,this.s=3,Ot(12),te(this),Zt(this);break t}Pt(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ee(this,n)}if(this.P){let t;for(n=!0;!this.J&&this.C<a.length;){if(t=Xt(this,a),t==Gt){4==d&&(this.s=4,Ot(14),n=!1),Pt(this.i,this.l,null,"[Incomplete Response]");break}if(t==$t){this.s=4,Ot(15),Pt(this.i,this.l,a,"[Invalid Chunk]"),n=!1;break}Pt(this.i,this.l,t,null),ee(this,t)}if(Ht(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=d||0!=a.length||this.h.h||(this.s=1,Ot(16),n=!1),this.o=this.o&&n,n){if(0<a.length&&!this.W){this.W=!0;var h=this.j;h.g==this&&h.ba&&!h.M&&(h.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),hn(h),h.M=!0,Ot(11))}}else Pt(this.i,this.l,a,"[Invalid Chunked Response]"),te(this),Zt(this)}else Pt(this.i,this.l,a,null),ee(this,a);4==d&&te(this),this.o&&!this.J&&(4==d?gn(this.j,this):(this.o=!1,Yt(this)))}else(function(t){const e={};t=(t.g&&2<=We(t)&&t.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<t.length;r++){if(g(t[r]))continue;var n=_(t[r]);const s=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const i=e[s]||[];e[s]=i,i.push(n)}!function(t,e){for(const n in t)e.call(void 0,t[n],n,t)}(e,function(t){return t.join(", ")})})(this.g),400==n&&0<a.indexOf("Unknown SID")?(this.s=3,Ot(12)):(this.s=0,Ot(13)),te(this),Zt(this)}}}catch(d){}},Bt.prototype.cancel=function(){this.J=!0,te(this)},Bt.prototype.ba=function(){this.B=null;const t=Date.now();0<=t-this.S?(function(t,e){t.info(function(){return"TIMEOUT: "+e})}(this.i,this.A),2!=this.L&&(Rt(),Ot(17)),te(this),this.s=2,Zt(this)):Wt(this,this.S-t)};var ne=class{constructor(t,e){this.g=t,this.map=e}};function re(t){this.l=t||10,t=s.PerformanceNavigationTiming?0<(t=s.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):!!(s.chrome&&s.chrome.loadTimes&&s.chrome.loadTimes()&&s.chrome.loadTimes().wasFetchedViaSpdy),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function se(t){return!!t.h||!!t.g&&t.g.size>=t.j}function ie(t){return t.h?1:t.g?t.g.size:0}function oe(t,e){return t.h?t.h==e:!!t.g&&t.g.has(e)}function ae(t,e){t.g?t.g.add(e):t.h=e}function ue(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}function ce(t){if(null!=t.h)return t.i.concat(t.h.D);if(null!=t.g&&0!==t.g.size){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return d(t.i)}function le(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(i(t)||"string"==typeof t)Array.prototype.forEach.call(t,e,void 0);else for(var n=function(t){if(t.na&&"function"==typeof t.na)return t.na();if(!t.V||"function"!=typeof t.V){if("undefined"!=typeof Map&&t instanceof Map)return Array.from(t.keys());if(!("undefined"!=typeof Set&&t instanceof Set)){if(i(t)||"string"==typeof t){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const r in t)e[n++]=r;return e}}}(t),r=function(t){if(t.V&&"function"==typeof t.V)return t.V();if("undefined"!=typeof Map&&t instanceof Map||"undefined"!=typeof Set&&t instanceof Set)return Array.from(t.values());if("string"==typeof t)return t.split("");if(i(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}for(r in e=[],n=0,t)e[n++]=t[r];return e}(t),s=r.length,o=0;o<s;o++)e.call(void 0,r[o],n&&n[o],t)}re.prototype.cancel=function(){if(this.i=ce(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const t of this.g.values())t.cancel();this.g.clear()}};var he=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function de(t){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,t instanceof de){this.h=t.h,ge(this,t.j),this.o=t.o,this.g=t.g,me(this,t.s),this.l=t.l;var e=t.i,n=new Ae;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),pe(this,n),this.m=t.m}else t&&(e=String(t).match(he))?(this.h=!1,ge(this,e[1]||"",!0),this.o=we(e[2]||""),this.g=we(e[3]||"",!0),me(this,e[4]),this.l=we(e[5]||"",!0),pe(this,e[6]||"",!0),this.m=we(e[7]||"")):(this.h=!1,this.i=new Ae(null,this.h))}function fe(t){return new de(t)}function ge(t,e,n){t.j=n?we(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function me(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.s=e}else t.s=null}function pe(t,e,n){e instanceof Ae?(t.i=e,function(t,e){e&&!t.j&&(Ne(t),t.i=null,t.g.forEach(function(t,e){var n=e.toLowerCase();e!=n&&(De(this,e),Re(this,n,t))},t)),t.j=e}(t.i,t.h)):(n||(e=Te(e,Ie)),t.i=new Ae(e,t.h))}function ye(t,e,n){t.i.set(e,n)}function ve(t){return ye(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function we(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Te(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,Ee),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function Ee(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}de.prototype.toString=function(){var t=[],e=this.j;e&&t.push(Te(e,_e,!0),":");var n=this.g;return(n||"file"==e)&&(t.push("//"),(e=this.o)&&t.push(Te(e,_e,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.s)&&t.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&t.push("/"),t.push(Te(n,"/"==n.charAt(0)?Se:be,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.m)&&t.push("#",Te(n,Ce)),t.join("")};var _e=/[#\/\?@]/g,be=/[#\?:]/g,Se=/[#\?]/g,Ie=/[#\?@]/g,Ce=/#/g;function Ae(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function Ne(t){t.g||(t.g=new Map,t.h=0,t.i&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}function De(t,e){Ne(t),e=xe(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function ke(t,e){return Ne(t),e=xe(t,e),t.g.has(e)}function Re(t,e,n){De(t,e),0<n.length&&(t.i=null,t.g.set(xe(t,e),d(n)),t.h+=n.length)}function xe(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function Oe(t,e,n,r,s){try{s&&(s.onload=null,s.onerror=null,s.onabort=null,s.ontimeout=null),r(n)}catch(i){}}function Me(){this.g=new Tt}function Le(t,e,n){const r=n||"";try{le(t,function(t,n){let s=t;o(t)&&(s=vt(t)),e.push(r+n+"="+encodeURIComponent(s))})}catch(s){throw e.push(r+"type="+encodeURIComponent("_badmap")),s}}function Ve(t){this.l=t.Ub||null,this.j=t.eb||!1}function Pe(t,e){ct.call(this),this.D=t,this.o=e,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function Fe(t){t.j.read().then(t.Pa.bind(t)).catch(t.ga.bind(t))}function Ue(t){t.readyState=4,t.l=null,t.j=null,t.v=null,qe(t)}function qe(t){t.onreadystatechange&&t.onreadystatechange.call(t)}function je(t){let e="";return v(t,function(t,n){e+=n,e+=":",e+=t,e+="\r\n"}),e}function Be(t,e,n){t:{for(r in n){var r=!1;break t}r=!0}r||(n=je(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):ye(t,e,n))}function ze(t){ct.call(this),this.headers=new Map,this.o=t||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}(t=Ae.prototype).add=function(t,e){Ne(this),this.i=null,t=xe(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this},t.forEach=function(t,e){Ne(this),this.g.forEach(function(n,r){n.forEach(function(n){t.call(e,n,r,this)},this)},this)},t.na=function(){Ne(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let r=0;r<e.length;r++){const s=t[r];for(let t=0;t<s.length;t++)n.push(e[r])}return n},t.V=function(t){Ne(this);let e=[];if("string"==typeof t)ke(this,t)&&(e=e.concat(this.g.get(xe(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e},t.set=function(t,e){return Ne(this),this.i=null,ke(this,t=xe(this,t))&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},t.get=function(t,e){return t&&0<(t=this.V(t)).length?String(t[0]):e},t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var r=e[n];const i=encodeURIComponent(String(r)),o=this.V(r);for(r=0;r<o.length;r++){var s=i;""!==o[r]&&(s+="="+encodeURIComponent(String(o[r]))),t.push(s)}}return this.i=t.join("&")},h(Ve,Et),Ve.prototype.g=function(){return new Pe(this.l,this.j)},Ve.prototype.i=function(t){return function(){return t}}({}),h(Pe,ct),(t=Pe.prototype).open=function(t,e){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=t,this.A=e,this.readyState=1,qe(this)},t.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.u,method:this.B,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||s).fetch(new Request(this.A,e)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Ue(this)),this.readyState=0},t.Sa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,qe(this)),this.g&&(this.readyState=3,qe(this),this.g)))if("arraybuffer"===this.responseType)t.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(void 0!==s.ReadableStream&&"body"in t){if(this.j=t.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Fe(this)}else t.text().then(this.Ra.bind(this),this.ga.bind(this))},t.Pa=function(t){if(this.g){if(this.o&&t.value)this.response.push(t.value);else if(!this.o){var e=t.value?t.value:new Uint8Array(0);(e=this.v.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Ue(this):qe(this),3==this.readyState&&Fe(this)}},t.Ra=function(t){this.g&&(this.response=this.responseText=t,Ue(this))},t.Qa=function(t){this.g&&(this.response=t,Ue(this))},t.ga=function(){this.g&&Ue(this)},t.setRequestHeader=function(t,e){this.u.append(t,e)},t.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(Pe.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(t){this.m=t?"include":"same-origin"}}),h(ze,ct);var $e=/^https?$/i,Ge=["POST","PUT"];function Ke(t,e){t.h=!1,t.g&&(t.j=!0,t.g.abort(),t.j=!1),t.l=e,t.m=5,Qe(t),Xe(t)}function Qe(t){t.A||(t.A=!0,lt(t,"complete"),lt(t,"error"))}function He(t){if(t.h&&void 0!==r&&(!t.v[1]||4!=We(t)||2!=t.Z()))if(t.u&&4==We(t))dt(t.Ea,0,t);else if(lt(t,"readystatechange"),4==We(t)){t.h=!1;try{const r=t.Z();t:switch(r){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break t;default:e=!1}var n;if(!(n=e)){var i;if(i=0===r){var o=String(t.D).match(he)[1]||null;!o&&s.self&&s.self.location&&(o=s.self.location.protocol.slice(0,-1)),i=!$e.test(o?o.toLowerCase():"")}n=i}if(n)lt(t,"complete"),lt(t,"success");else{t.m=6;try{var a=2<We(t)?t.g.statusText:""}catch(u){a=""}t.l=a+" ["+t.Z()+"]",Qe(t)}}finally{Xe(t)}}}function Xe(t,e){if(t.g){Ye(t);const r=t.g,s=t.v[0]?()=>{}:null;t.g=null,t.v=null,e||lt(t,"ready");try{r.onreadystatechange=s}catch(n){}}}function Ye(t){t.I&&(s.clearTimeout(t.I),t.I=null)}function We(t){return t.g?t.g.readyState:0}function Je(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.H){case"":case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch(e){return null}}function Ze(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function tn(t){this.Aa=0,this.i=[],this.j=new Vt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ze("failFast",!1,t),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ze("baseRetryDelayMs",5e3,t),this.cb=Ze("retryDelaySeedMs",1e4,t),this.Wa=Ze("forwardChannelMaxRetries",2,t),this.wa=Ze("forwardChannelRequestTimeoutMs",2e4,t),this.pa=t&&t.xmlHttpFactory||void 0,this.Xa=t&&t.Tb||void 0,this.Ca=t&&t.useFetchStreams||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.h=new re(t&&t.concurrentRequestLimit),this.Da=new Me,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=t&&t.Rb||!1,t&&t.xa&&this.j.xa(),t&&t.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&t&&t.detectBufferingProxy||!1,this.ja=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.ja=t.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function en(t){if(rn(t),3==t.G){var e=t.U++,n=fe(t.I);if(ye(n,"SID",t.K),ye(n,"RID",e),ye(n,"TYPE","terminate"),an(t,n),(e=new Bt(t,t.j,e)).L=2,e.v=ve(fe(n)),n=!1,s.navigator&&s.navigator.sendBeacon)try{n=s.navigator.sendBeacon(e.v.toString(),"")}catch(r){}!n&&s.Image&&((new Image).src=e.v,n=!0),n||(e.g=wn(e.j,null),e.g.ea(e.v)),e.F=Date.now(),Yt(e)}yn(t)}function nn(t){t.g&&(hn(t),t.g.cancel(),t.g=null)}function rn(t){nn(t),t.u&&(s.clearTimeout(t.u),t.u=null),fn(t),t.h.cancel(),t.s&&("number"==typeof t.s&&s.clearTimeout(t.s),t.s=null)}function sn(t){if(!se(t.h)&&!t.s){t.s=!0;var e=t.Ga;A||k(),N||(A(),N=!0),D.add(e,t),t.B=0}}function on(t,e){var n;n=e?e.l:t.U++;const r=fe(t.I);ye(r,"SID",t.K),ye(r,"RID",n),ye(r,"AID",t.T),an(t,r),t.m&&t.o&&Be(r,t.m,t.o),n=new Bt(t,t.j,n,t.B+1),null===t.m&&(n.H=t.o),e&&(t.i=e.D.concat(t.i)),e=un(t,n,1e3),n.I=Math.round(.5*t.wa)+Math.round(.5*t.wa*Math.random()),ae(t.h,n),Kt(n,r,e)}function an(t,e){t.H&&v(t.H,function(t,n){ye(e,n,t)}),t.l&&le({},function(t,n){ye(e,n,t)})}function un(t,e,n){n=Math.min(t.i.length,n);var r=t.l?c(t.l.Na,t.l,t):null;t:{var s=t.i;let e=-1;for(;;){const t=["count="+n];-1==e?0<n?(e=s[0].g,t.push("ofs="+e)):e=0:t.push("ofs="+e);let o=!0;for(let a=0;a<n;a++){let n=s[a].g;const u=s[a].map;if(n-=e,0>n)e=Math.max(0,s[a].g-100),o=!1;else try{Le(u,t,"req"+n+"_")}catch(i){r&&r(u)}}if(o){r=t.join("&");break t}}}return t=t.i.splice(0,n),e.D=t,r}function cn(t){if(!t.g&&!t.u){t.Y=1;var e=t.Fa;A||k(),N||(A(),N=!0),D.add(e,t),t.v=0}}function ln(t){return!(t.g||t.u||3<=t.v||(t.Y++,t.u=Lt(c(t.Fa,t),mn(t,t.v)),t.v++,0))}function hn(t){null!=t.A&&(s.clearTimeout(t.A),t.A=null)}function dn(t){t.g=new Bt(t,t.j,"rpc",t.Y),null===t.m&&(t.g.H=t.o),t.g.O=0;var e=fe(t.qa);ye(e,"RID","rpc"),ye(e,"SID",t.K),ye(e,"AID",t.T),ye(e,"CI",t.F?"0":"1"),!t.F&&t.ja&&ye(e,"TO",t.ja),ye(e,"TYPE","xmlhttp"),an(t,e),t.m&&t.o&&Be(e,t.m,t.o),t.L&&(t.g.I=t.L);var n=t.g;t=t.ia,n.L=1,n.v=ve(fe(e)),n.m=null,n.P=!0,Qt(n,t)}function fn(t){null!=t.C&&(s.clearTimeout(t.C),t.C=null)}function gn(t,e){var n=null;if(t.g==e){fn(t),hn(t),t.g=null;var r=2}else{if(!oe(t.h,e))return;n=e.D,ue(t.h,e),r=1}if(0!=t.G)if(e.o)if(1==r){n=e.m?e.m.length:0,e=Date.now()-e.F;var s=t.B;lt(r=Dt(),new Mt(r,n)),sn(t)}else cn(t);else if(3==(s=e.s)||0==s&&0<e.X||!(1==r&&function(t,e){return!(ie(t.h)>=t.h.j-(t.s?1:0)||(t.s?(t.i=e.D.concat(t.i),0):1==t.G||2==t.G||t.B>=(t.Va?0:t.Wa)||(t.s=Lt(c(t.Ga,t,e),mn(t,t.B)),t.B++,0)))}(t,e)||2==r&&ln(t)))switch(n&&0<n.length&&(e=t.h,e.i=e.i.concat(n)),s){case 1:pn(t,5);break;case 4:pn(t,10);break;case 3:pn(t,6);break;default:pn(t,2)}}function mn(t,e){let n=t.Ta+Math.floor(Math.random()*t.cb);return t.isActive()||(n*=2),n*e}function pn(t,e){if(t.j.info("Error code "+e),2==e){var n=c(t.fb,t),r=t.Xa;const e=!r;r=new de(r||"//www.google.com/images/cleardot.gif"),s.location&&"http"==s.location.protocol||ge(r,"https"),ve(r),e?function(t,e){const n=new Vt;if(s.Image){const r=new Image;r.onload=l(Oe,n,"TestLoadImage: loaded",!0,e,r),r.onerror=l(Oe,n,"TestLoadImage: error",!1,e,r),r.onabort=l(Oe,n,"TestLoadImage: abort",!1,e,r),r.ontimeout=l(Oe,n,"TestLoadImage: timeout",!1,e,r),s.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=t}else e(!1)}(r.toString(),n):function(t,e){new Vt;const n=new AbortController,r=setTimeout(()=>{n.abort(),Oe(0,0,!1,e)},1e4);fetch(t,{signal:n.signal}).then(t=>{clearTimeout(r),t.ok?Oe(0,0,!0,e):Oe(0,0,!1,e)}).catch(()=>{clearTimeout(r),Oe(0,0,!1,e)})}(r.toString(),n)}else Ot(2);t.G=0,t.l&&t.l.sa(e),yn(t),rn(t)}function yn(t){if(t.G=0,t.ka=[],t.l){const e=ce(t.h);0==e.length&&0==t.i.length||(f(t.ka,e),f(t.ka,t.i),t.h.i.length=0,d(t.i),t.i.length=0),t.l.ra()}}function vn(t,e,n){var r=n instanceof de?fe(n):new de(n);if(""!=r.g)e&&(r.g=e+"."+r.g),me(r,r.s);else{var i=s.location;r=i.protocol,e=e?e+"."+i.hostname:i.hostname,i=+i.port;var o=new de(null);r&&ge(o,r),e&&(o.g=e),i&&me(o,i),n&&(o.l=n),r=o}return n=t.D,e=t.ya,n&&e&&ye(r,n,e),ye(r,"VER",t.la),an(t,r),r}function wn(t,e,n){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return(e=t.Ca&&!t.pa?new ze(new Ve({eb:n})):new ze(t.pa)).Ha(t.J),e}function Tn(){}function En(){}function _n(t,e){ct.call(this),this.g=new tn(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.o=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.va&&(t?t["X-WebChannel-Client-Profile"]=e.va:t={"X-WebChannel-Client-Profile":e.va}),this.g.S=t,(t=e&&e.Sb)&&!g(t)&&(this.g.m=t),this.v=e&&e.supportsCrossDomainXhr||!1,this.u=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!g(e)&&(this.g.D=e,null!==(t=this.h)&&e in t&&e in(t=this.h)&&delete t[e]),this.j=new In(this)}function bn(t){It.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){t:{for(const n in e){t=n;break t}t=void 0}(this.i=t)&&(t=this.i,e=null!==e&&t in e?e[t]:void 0),this.data=e}else this.data=t}function Sn(){Ct.call(this),this.status=1}function In(t){this.g=t}(t=ze.prototype).Ha=function(t){this.J=t},t.ea=function(t,e,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);e=e?e.toUpperCase():"GET",this.D=t,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ft.g(),this.v=this.o?_t(this.o):_t(Ft),this.g.onreadystatechange=c(this.Ea,this);try{this.B=!0,this.g.open(e,String(t),!0),this.B=!1}catch(o){return void Ke(this,o)}if(t=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else{if("function"!=typeof r.keys||"function"!=typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const t of r.keys())n.set(t,r.get(t))}r=Array.from(n.keys()).find(t=>"content-type"==t.toLowerCase()),i=s.FormData&&t instanceof s.FormData,!(0<=Array.prototype.indexOf.call(Ge,e,void 0))||r||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[s,a]of n)this.g.setRequestHeader(s,a);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ye(this),this.u=!0,this.g.send(t),this.u=!1}catch(o){Ke(this,o)}},t.abort=function(t){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=t||7,lt(this,"complete"),lt(this,"abort"),Xe(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Xe(this,!0)),ze.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?He(this):this.bb())},t.bb=function(){He(this)},t.isActive=function(){return!!this.g},t.Z=function(){try{return 2<We(this)?this.g.status:-1}catch(t){return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch(t){return""}},t.Oa=function(t){if(this.g){var e=this.g.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),wt(e)}},t.Ba=function(){return this.m},t.Ka=function(){return"string"==typeof this.l?this.l:String(this.l)},(t=tn.prototype).la=8,t.G=1,t.connect=function(t,e,n,r){Ot(0),this.W=t,this.H=e||{},n&&void 0!==r&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.I=vn(this,null,this.W),sn(this)},t.Ga=function(t){if(this.s)if(this.s=null,1==this.G){if(!t){this.U=Math.floor(1e5*Math.random()),t=this.U++;const s=new Bt(this,this.j,t);let i=this.o;if(this.S&&(i?(i=w(i),E(i,this.S)):i=this.S),null!==this.m||this.O||(s.H=i,i=null),this.P)t:{for(var e=0,n=0;n<this.i.length;n++){var r=this.i[n];if(void 0===(r="__data__"in r.map&&"string"==typeof(r=r.map.__data__)?r.length:void 0))break;if(4096<(e+=r)){e=n;break t}if(4096===e||n===this.i.length-1){e=n+1;break t}}e=1e3}else e=1e3;e=un(this,s,e),ye(n=fe(this.I),"RID",t),ye(n,"CVER",22),this.D&&ye(n,"X-HTTP-Session-Id",this.D),an(this,n),i&&(this.O?e="headers="+encodeURIComponent(String(je(i)))+"&"+e:this.m&&Be(n,this.m,i)),ae(this.h,s),this.Ua&&ye(n,"TYPE","init"),this.P?(ye(n,"$req",e),ye(n,"SID","null"),s.T=!0,Kt(s,n,null)):Kt(s,n,e),this.G=2}}else 3==this.G&&(t?on(this,t):0==this.i.length||se(this.h)||on(this))},t.Fa=function(){if(this.u=null,dn(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var t=2*this.R;this.j.info("BP detection timer enabled: "+t),this.A=Lt(c(this.ab,this),t)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ot(10),nn(this),dn(this))},t.Za=function(){null!=this.C&&(this.C=null,nn(this),ln(this),Ot(19))},t.fb=function(t){t?(this.j.info("Successfully pinged google.com"),Ot(2)):(this.j.info("Failed to ping google.com"),Ot(1))},t.isActive=function(){return!!this.l&&this.l.isActive(this)},(t=Tn.prototype).ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){},En.prototype.g=function(t,e){return new _n(t,e)},h(_n,ct),_n.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},_n.prototype.close=function(){en(this.g)},_n.prototype.o=function(t){var e=this.g;if("string"==typeof t){var n={};n.__data__=t,t=n}else this.u&&((n={}).__data__=vt(t),t=n);e.i.push(new ne(e.Ya++,t)),3==e.G&&sn(e)},_n.prototype.N=function(){this.g.l=null,delete this.j,en(this.g),delete this.g,_n.aa.N.call(this)},h(bn,It),h(Sn,Ct),h(In,Tn),In.prototype.ua=function(){lt(this.g,"a")},In.prototype.ta=function(t){lt(this.g,new bn(t))},In.prototype.sa=function(t){lt(this.g,new Sn)},In.prototype.ra=function(){lt(this.g,"b")},En.prototype.createWebChannel=En.prototype.g,_n.prototype.send=_n.prototype.o,_n.prototype.open=_n.prototype.m,_n.prototype.close=_n.prototype.close,U=function(){return new En},F=function(){return Dt()},P=At,V={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ut.NO_ERROR=0,Ut.TIMEOUT=8,Ut.HTTP_ERROR=6,L=Ut,qt.COMPLETE="complete",M=qt,bt.EventType=St,St.OPEN="a",St.CLOSE="b",St.ERROR="c",St.MESSAGE="d",ct.prototype.listen=ct.prototype.K,O=bt,ze.prototype.listenOnce=ze.prototype.L,ze.prototype.getLastError=ze.prototype.Ka,ze.prototype.getLastErrorCode=ze.prototype.Ba,ze.prototype.getStatus=ze.prototype.Z,ze.prototype.getResponseJson=ze.prototype.Oa,ze.prototype.getResponseText=ze.prototype.oa,ze.prototype.send=ze.prototype.ea,ze.prototype.setWithCredentials=ze.prototype.Ha,x=ze}).apply(void 0!==q?q:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const j="@firebase/firestore",B="4.9.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}z.UNAUTHENTICATED=new z(null),z.GOOGLE_CREDENTIALS=new z("google-credentials-uid"),z.FIRST_PARTY=new z("first-party-uid"),z.MOCK_USER=new z("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let $="12.0.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G=new T("@firebase/firestore");function K(){return G.logLevel}function Q(t,...e){if(G.logLevel<=E.DEBUG){const n=e.map(Y);G.debug(`Firestore (${$}): ${t}`,...n)}}function H(t,...e){if(G.logLevel<=E.ERROR){const n=e.map(Y);G.error(`Firestore (${$}): ${t}`,...n)}}function X(t,...e){if(G.logLevel<=E.WARN){const n=e.map(Y);G.warn(`Firestore (${$}): ${t}`,...n)}}function Y(t){if("string"==typeof t)return t;try{
/**
    * @license
    * Copyright 2020 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */
return e=t,JSON.stringify(e)}catch(n){return t}var e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(t,e,n){let r="Unexpected state";"string"==typeof e?r=e:n=e,J(t,r,n)}function J(t,e,n){let r=`FIRESTORE (${$}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(s){r+=" CONTEXT: "+n}throw H(r),new Error(r)}function Z(t,e,n,r){let s="Unexpected state";"string"==typeof n?s=n:r=n,t||J(e,s,r)}function tt(t,e){return t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class nt extends g{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class it{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(z.UNAUTHENTICATED))}shutdown(){}}class ot{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class at{constructor(t){this.t=t,this.currentUser=z.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Z(void 0===this.o,42304);let n=this.i;const r=t=>this.i!==n?(n=this.i,e(t)):Promise.resolve();let s=new rt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new rt,t.enqueueRetryable(()=>r(this.currentUser))};const i=()=>{const e=s;t.enqueueRetryable(()=>c(this,null,function*(){yield e.promise,yield r(this.currentUser)}))},o=t=>{Q("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=t,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(t=>o(t)),setTimeout(()=>{if(!this.auth){const t=this.t.getImmediate({optional:!0});t?o(t):(Q("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new rt)}},0),i()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(e=>this.i!==t?(Q("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(Z("string"==typeof e.accessToken,31837,{l:e}),new st(e.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Z(null===t||"string"==typeof t,2055,{h:t}),new z(t)}}class ut{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=z.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class ct{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new ut(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(z.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class lt{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ht{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,N(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Z(void 0===this.o,3512);const n=t=>{null!=t.error&&Q("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`);const n=t.token!==this.m;return this.m=t.token,Q("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?e(t.token):Promise.resolve()};this.o=e=>{t.enqueueRetryable(()=>n(e))};const r=t=>{Q("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=t,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(t=>r(t)),setTimeout(()=>{if(!this.appCheck){const t=this.V.getImmediate({optional:!0});t?r(t):Q("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new lt(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(t=>t?(Z("string"==typeof t.token,44558,{tokenResult:t}),this.m=t.token,new lt(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{static newId(){const t=62*Math.floor(256/62);let e="";for(;e.length<20;){const n=dt(40);for(let r=0;r<n.length;++r)e.length<20&&n[r]<t&&(e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return e}}function gt(t,e){return t<e?-1:t>e?1:0}function mt(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=t.charAt(r),s=e.charAt(r);if(n!==s)return vt(n)===vt(s)?gt(n,s):vt(n)?1:-1}return gt(t.length,e.length)}const pt=55296,yt=57343;function vt(t){const e=t.charCodeAt(0);return e>=pt&&e<=yt}function wt(t,e,n){return t.length===e.length&&t.every((t,r)=>n(t,e[r]))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt="__name__";class Et{constructor(t,e,n){void 0===e?e=0:e>t.length&&W(637,{offset:e,range:t.length}),void 0===n?n=t.length-e:n>t.length-e&&W(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===Et.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Et?t.forEach(t=>{e.push(t)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=Et.compareSegments(t.get(r),e.get(r));if(0!==n)return n}return gt(t.length,e.length)}static compareSegments(t,e){const n=Et.isNumericId(t),r=Et.isNumericId(e);return n&&!r?-1:!n&&r?1:n&&r?Et.extractNumericId(t).compare(Et.extractNumericId(e)):mt(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return D.fromString(t.substring(4,t.length-2))}}class _t extends Et{construct(t,e,n){return new _t(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new nt(et.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(t=>t.length>0))}return new _t(e)}static emptyPath(){return new _t([])}}const bt=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class St extends Et{construct(t,e,n){return new St(t,e,n)}static isValidIdentifier(t){return bt.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),St.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===Tt}static keyField(){return new St([Tt])}static fromServerFormat(t){const e=[];let n="",r=0;const s=()=>{if(0===n.length)throw new nt(et.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new nt(et.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new nt(et.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(i=!i,r++):"."!==e||i?(n+=e,r++):(s(),r++)}if(s(),i)throw new nt(et.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new St(e)}static emptyPath(){return new St([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(t){this.path=t}static fromPath(t){return new It(_t.fromString(t))}static fromName(t){return new It(_t.fromString(t).popFirst(5))}static empty(){return new It(_t.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return null!==t&&0===_t.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return _t.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new It(new _t(t.slice()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(t,e,n){if(!n)throw new nt(et.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function At(t){if(!It.isDocumentKey(t))throw new nt(et.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Nt(t){if(It.isDocumentKey(t))throw new nt(et.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Dt(t){return"object"==typeof t&&null!==t&&(Object.getPrototypeOf(t)===Object.prototype||null===Object.getPrototypeOf(t))}function kt(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const n=(e=t).constructor?e.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var e;return"function"==typeof t?"a function":W(12329,{type:typeof t})}function Rt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new nt(et.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=kt(t);throw new nt(et.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(t,e){const n={typeString:t};return e&&(n.value=e),n}function Ot(t,e){if(!Dt(t))throw new nt(et.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const o=t[r];if(s&&typeof o!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(void 0!==i&&o!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new nt(et.INVALID_ARGUMENT,n);return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mt=-62135596800,Lt=1e6;class Vt{static now(){return Vt.fromMillis(Date.now())}static fromDate(t){return Vt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*Lt);return new Vt(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new nt(et.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new nt(et.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Mt)throw new nt(et.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new nt(et.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Lt}_compareTo(t){return this.seconds===t.seconds?gt(this.nanoseconds,t.nanoseconds):gt(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Vt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(Ot(t,Vt._jsonSchema))return new Vt(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Mt;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Vt._jsonSchemaVersion="firestore/timestamp/1.0",Vt._jsonSchema={type:xt("string",Vt._jsonSchemaVersion),seconds:xt("number"),nanoseconds:xt("number")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pt{static fromTimestamp(t){return new Pt(t)}static min(){return new Pt(new Vt(0,0))}static max(){return new Pt(new Vt(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ft(t){return new Ut(t.readTime,t.key,-1)}class Ut{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Ut(Pt.min(),It.empty(),-1)}static max(){return new Ut(Pt.max(),It.empty(),-1)}}function qt(t,e){let n=t.readTime.compareTo(e.readTime);return 0!==n?n:(n=It.comparator(t.documentKey,e.documentKey),0!==n?n:gt(t.largestBatchId,e.largestBatchId)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */)}class jt{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(t){return c(this,null,function*(){if(t.code!==et.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==t.message)throw t;Q("LocalStore","Unexpectedly lost primary lease")})}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&W(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new zt((n,r)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,r)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,r)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof zt?e:zt.resolve(e)}catch(e){return zt.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):zt.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):zt.reject(e)}static resolve(t){return new zt((e,n)=>{e(t)})}static reject(t){return new zt((e,n)=>{n(t)})}static waitFor(t){return new zt((e,n)=>{let r=0,s=0,i=!1;t.forEach(t=>{++r,t.next(()=>{++s,i&&s===r&&e()},t=>n(t))}),i=!0,s===r&&e()})}static or(t){let e=zt.resolve(!1);for(const n of t)e=e.next(t=>t?zt.resolve(t):n());return e}static forEach(t,e){const n=[];return t.forEach((t,r)=>{n.push(e.call(this,t,r))}),this.waitFor(n)}static mapArray(t,e){return new zt((n,r)=>{const s=t.length,i=new Array(s);let o=0;for(let a=0;a<s;a++){const u=a;e(t[u]).next(t=>{i[u]=t,++o,o===s&&n(i)},t=>r(t))}})}static doWhile(t,e){return new zt((n,r)=>{const s=()=>{!0===t()?e().next(()=>{s()},r):n()};s()})}}function $t(t){return"IndexedDbTransactionError"===t.name}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.ae(t),this.ue=t=>e.writeSequenceNumber(t))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}function Kt(t){return null==t}function Qt(t){return 0===t&&1/t==-1/0}function Ht(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const e=t.charAt(s);switch(e){case"\0":n+="";break;case"":n+="";break;default:n+=e}}return n}function Xt(t){return t+""}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yt(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Wt(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Jt(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Gt.ce=-1;class Zt{constructor(t,e){this.comparator=t,this.root=e||ee.EMPTY}insert(t,e){return new Zt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ee.BLACK,null,null))}remove(t){return new Zt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ee.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(0===r)return e+n.left.size;r<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new te(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new te(this.root,t,this.comparator,!1)}getReverseIterator(){return new te(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new te(this.root,t,this.comparator,!0)}}class te{constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!t.isEmpty();)if(s=e?n(t.key,e):1,e&&r&&(s*=-1),s<0)t=this.isReverse?t.left:t.right;else{if(0===s){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ee{constructor(t,e,n,r,s){this.key=t,this.value=e,this.color=null!=n?n:ee.RED,this.left=null!=r?r:ee.EMPTY,this.right=null!=s?s:ee.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,r,s){return new ee(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let r=this;const s=n(t,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(t,e,n),null):0===s?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return ee.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,r=this;if(e(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===e(t,r.key)){if(r.right.isEmpty())return ee.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ee.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ee.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw W(43730,{key:this.key,value:this.value});if(this.right.isRed())throw W(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw W(27949);return t+(this.isRed()?0:1)}}ee.EMPTY=null,ee.RED=!0,ee.BLACK=!1,ee.EMPTY=new class{constructor(){this.size=0}get key(){throw W(57766)}get value(){throw W(16141)}get color(){throw W(16727)}get left(){throw W(29726)}get right(){throw W(36894)}copy(t,e,n,r,s){return this}insert(t,e,n){return new ee(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ne{constructor(t){this.comparator=t,this.data=new Zt(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,t[1])>=0)return;e(r.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new re(this.data.getIterator())}getIteratorFrom(t){return new re(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(t=>{e=e.add(t)}),e}isEqual(t){if(!(t instanceof ne))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(0!==this.comparator(t,r))return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new ne(this.comparator);return e.data=t,e}}class re{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(t){this.fields=t,t.sort(St.comparator)}static empty(){return new se([])}unionWith(t){let e=new ne(St.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new se(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return wt(this.fields,t.fields,(t,e)=>t.isEqual(e))}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(t){try{return atob(t)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new ie("Invalid base64 string: "+e):e}}(t);return new oe(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new oe(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return gt(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}oe.EMPTY_BYTE_STRING=new oe("");const ae=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ue(t){if(Z(!!t,39018),"string"==typeof t){let e=0;const n=ae.exec(t);if(Z(!!n,46558,{timestamp:t}),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ce(t.seconds),nanos:ce(t.nanos)}}function ce(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function le(t){return"string"==typeof t?oe.fromBase64String(t):oe.fromUint8Array(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const he="server_timestamp",de="__type__",fe="__previous_value__",ge="__local_write_time__";function me(t){var e,n;return(null==(n=((null==(e=null==t?void 0:t.mapValue)?void 0:e.fields)||{})[de])?void 0:n.stringValue)===he}function pe(t){const e=t.mapValue.fields[fe];return me(e)?pe(e):e}function ye(t){const e=ue(t.mapValue.fields[ge].timestampValue);return new Vt(e.seconds,e.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(t,e,n,r,s,i,o,a,u,c){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=u,this.isUsingEmulator=c}}const we="(default)";class Te{constructor(t,e){this.projectId=t,this.database=e||we}static empty(){return new Te("","")}get isDefaultDatabase(){return this.database===we}isEqual(t){return t instanceof Te&&t.projectId===this.projectId&&t.database===this.database}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ee="__type__",_e={},be="__vector__",Se="value";function Ie(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?me(t)?4:function(t){return"__max__"===(((t.mapValue||{}).fields||{}).__type__||{}).stringValue}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)?9007199254740991:function(t){var e,n;return(null==(n=((null==(e=null==t?void 0:t.mapValue)?void 0:e.fields)||{})[Ee])?void 0:n.stringValue)===be}(t)?10:11:W(28295,{value:t})}function Ce(t,e){if(t===e)return!0;const n=Ie(t);if(n!==Ie(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return ye(t).isEqual(ye(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=ue(t.timestampValue),r=ue(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return r=e,le(t.bytesValue).isEqual(le(r.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return ce(t.geoPointValue.latitude)===ce(e.geoPointValue.latitude)&&ce(t.geoPointValue.longitude)===ce(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return ce(t.integerValue)===ce(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=ce(t.doubleValue),r=ce(e.doubleValue);return n===r?Qt(n)===Qt(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return wt(t.arrayValue.values||[],e.arrayValue.values||[],Ce);case 10:case 11:return function(t,e){const n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(Yt(n)!==Yt(r))return!1;for(const s in n)if(n.hasOwnProperty(s)&&(void 0===r[s]||!Ce(n[s],r[s])))return!1;return!0}(t,e);default:return W(52216,{left:t})}var r}function Ae(t,e){return void 0!==(t.values||[]).find(t=>Ce(t,e))}function Ne(t,e){if(t===e)return 0;const n=Ie(t),r=Ie(e);if(n!==r)return gt(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return gt(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=ce(t.integerValue||t.doubleValue),r=ce(e.integerValue||e.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(t,e);case 3:return De(t.timestampValue,e.timestampValue);case 4:return De(ye(t),ye(e));case 5:return mt(t.stringValue,e.stringValue);case 6:return function(t,e){const n=le(t),r=le(e);return n.compareTo(r)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),r=e.split("/");for(let s=0;s<n.length&&s<r.length;s++){const t=gt(n[s],r[s]);if(0!==t)return t}return gt(n.length,r.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=gt(ce(t.latitude),ce(e.latitude));return 0!==n?n:gt(ce(t.longitude),ce(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return ke(t.arrayValue,e.arrayValue);case 10:return function(t,e){var n,r,s,i;const o=t.fields||{},a=e.fields||{},u=null==(n=o[Se])?void 0:n.arrayValue,c=null==(r=a[Se])?void 0:r.arrayValue,l=gt((null==(s=null==u?void 0:u.values)?void 0:s.length)||0,(null==(i=null==c?void 0:c.values)?void 0:i.length)||0);return 0!==l?l:ke(u,c)}(t.mapValue,e.mapValue);case 11:return function(t,e){if(t===_e&&e===_e)return 0;if(t===_e)return 1;if(e===_e)return-1;const n=t.fields||{},r=Object.keys(n),s=e.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let o=0;o<r.length&&o<i.length;++o){const t=mt(r[o],i[o]);if(0!==t)return t;const e=Ne(n[r[o]],s[i[o]]);if(0!==e)return e}return gt(r.length,i.length)}(t.mapValue,e.mapValue);default:throw W(23264,{he:n})}}function De(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return gt(t,e);const n=ue(t),r=ue(e),s=gt(n.seconds,r.seconds);return 0!==s?s:gt(n.nanos,r.nanos)}function ke(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const t=Ne(n[s],r[s]);if(t)return t}return gt(n.length,r.length)}function Re(t){return xe(t)}function xe(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=ue(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?le(t.bytesValue).toBase64():"referenceValue"in t?(e=t.referenceValue,It.fromName(e).toString()):"geoPointValue"in t?function(t){return`geo(${t.latitude},${t.longitude})`}(t.geoPointValue):"arrayValue"in t?function(t){let e="[",n=!0;for(const r of t.values||[])n?n=!1:e+=",",e+=xe(r);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",r=!0;for(const s of e)r?r=!1:n+=",",n+=`${s}:${xe(t.fields[s])}`;return n+"}"}(t.mapValue):W(61005,{value:t});var e}function Oe(t){switch(Ie(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=pe(t);return e?16+Oe(e):16;case 5:return 2*t.stringValue.length;case 6:return le(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(t.arrayValue.values||[]).reduce((t,e)=>t+Oe(e),0);case 10:case 11:return function(t){let e=0;return Wt(t.fields,(t,n)=>{e+=t.length+Oe(n)}),e}(t.mapValue);default:throw W(13486,{value:t})}}function Me(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Le(t){return!!t&&"integerValue"in t}function Ve(t){return!!t&&"arrayValue"in t}function Pe(t){return!!t&&"nullValue"in t}function Fe(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ue(t){return!!t&&"mapValue"in t}function qe(t){if(t.geoPointValue)return{geoPointValue:a({},t.geoPointValue)};if(t.timestampValue&&"object"==typeof t.timestampValue)return{timestampValue:a({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Wt(t.mapValue.fields,(t,n)=>e.mapValue.fields[t]=qe(n)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=qe(t.arrayValue.values[n]);return e}return a({},t)}class je{constructor(t){this.value=t}static empty(){return new je({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Ue(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=qe(e)}setAll(t){let e=St.emptyPath(),n={},r=[];t.forEach((t,s)=>{if(!e.isImmediateParentOf(s)){const t=this.getFieldsMap(e);this.applyChanges(t,n,r),n={},r=[],e=s.popLast()}t?n[s.lastSegment()]=qe(t):r.push(s.lastSegment())});const s=this.getFieldsMap(e);this.applyChanges(s,n,r)}delete(t){const e=this.field(t.popLast());Ue(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Ce(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let r=e.mapValue.fields[t.get(n)];Ue(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=r),e=r}return e.mapValue.fields}applyChanges(t,e,n){Wt(e,(e,n)=>t[e]=n);for(const r of n)delete t[r]}clone(){return new je(qe(this.value))}}function Be(t){const e=[];return Wt(t.fields,(t,n)=>{const r=new St([t]);if(Ue(n)){const t=Be(n.mapValue).fields;if(0===t.length)e.push(r);else for(const n of t)e.push(r.child(n))}else e.push(r)}),new se(e)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class ze{constructor(t,e,n,r,s,i,o){this.key=t,this.documentType=e,this.version=n,this.readTime=r,this.createTime=s,this.data=i,this.documentState=o}static newInvalidDocument(t){return new ze(t,0,Pt.min(),Pt.min(),Pt.min(),je.empty(),0)}static newFoundDocument(t,e,n,r){return new ze(t,1,e,Pt.min(),n,r,0)}static newNoDocument(t,e){return new ze(t,2,e,Pt.min(),Pt.min(),je.empty(),0)}static newUnknownDocument(t,e){return new ze(t,3,e,Pt.min(),Pt.min(),je.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(Pt.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=je.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=je.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Pt.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof ze&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new ze(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(t,e){this.position=t,this.inclusive=e}}function Ge(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(r=i.field.isKeyField()?It.comparator(It.fromName(o.referenceValue),n.key):Ne(o,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return r}function Ke(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Ce(t.position[n],e.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(t,e="asc"){this.field=t,this.dir=e}}function He(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{}class Ye extends Xe{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.createKeyFieldInFilter(t,e,n):new rn(t,e,n):"array-contains"===e?new un(t,n):"in"===e?new cn(t,n):"not-in"===e?new ln(t,n):"array-contains-any"===e?new hn(t,n):new Ye(t,e,n)}static createKeyFieldInFilter(t,e,n){return"in"===e?new sn(t,n):new on(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&void 0===e.nullValue&&this.matchesComparison(Ne(e,this.value)):null!==e&&Ie(this.value)===Ie(e)&&this.matchesComparison(Ne(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return W(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class We extends Xe{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new We(t,e)}matches(t){return Je(this)?void 0===this.filters.find(e=>!e.matches(t)):void 0!==this.filters.find(e=>e.matches(t))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Je(t){return"and"===t.op}function Ze(t){return function(t){for(const e of t.filters)if(e instanceof We)return!1;return!0}(t)&&Je(t)}function tn(t){if(t instanceof Ye)return t.field.canonicalString()+t.op.toString()+Re(t.value);if(Ze(t))return t.filters.map(t=>tn(t)).join(",");{const e=t.filters.map(t=>tn(t)).join(",");return`${t.op}(${e})`}}function en(t,e){return t instanceof Ye?(n=t,(r=e)instanceof Ye&&n.op===r.op&&n.field.isEqual(r.field)&&Ce(n.value,r.value)):t instanceof We?function(t,e){return e instanceof We&&t.op===e.op&&t.filters.length===e.filters.length&&t.filters.reduce((t,n,r)=>t&&en(n,e.filters[r]),!0)}(t,e):void W(19439);var n,r}function nn(t){return t instanceof Ye?`${(e=t).field.canonicalString()} ${e.op} ${Re(e.value)}`:t instanceof We?function(t){return t.op.toString()+" {"+t.getFilters().map(nn).join(" ,")+"}"}(t):"Filter";var e}class rn extends Ye{constructor(t,e,n){super(t,e,n),this.key=It.fromName(n.referenceValue)}matches(t){const e=It.comparator(t.key,this.key);return this.matchesComparison(e)}}class sn extends Ye{constructor(t,e){super(t,"in",e),this.keys=an(0,e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class on extends Ye{constructor(t,e){super(t,"not-in",e),this.keys=an(0,e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function an(t,e){var n;return((null==(n=e.arrayValue)?void 0:n.values)||[]).map(t=>It.fromName(t.referenceValue))}class un extends Ye{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Ve(e)&&Ae(e.arrayValue,this.value)}}class cn extends Ye{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&Ae(this.value.arrayValue,e)}}class ln extends Ye{constructor(t,e){super(t,"not-in",e)}matches(t){if(Ae(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&void 0===e.nullValue&&!Ae(this.value.arrayValue,e)}}class hn extends Ye{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Ve(e)||!e.arrayValue.values)&&e.arrayValue.values.some(t=>Ae(this.value.arrayValue,t))}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn{constructor(t,e=null,n=[],r=[],s=null,i=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.Te=null}}function fn(t,e=null,n=[],r=[],s=null,i=null,o=null){return new dn(t,e,n,r,s,i,o)}function gn(t){const e=tt(t);if(null===e.Te){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(t=>tn(t)).join(","),t+="|ob:",t+=e.orderBy.map(t=>{return(e=t).field.canonicalString()+e.dir;var e}).join(","),Kt(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(t=>Re(t)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(t=>Re(t)).join(",")),e.Te=t}return e.Te}function mn(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!He(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!en(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Ke(t.startAt,e.startAt)&&Ke(t.endAt,e.endAt)}function pn(t){return It.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(t,e=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function vn(t){return new yn(t)}function wn(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())}function Tn(t){return null!==t.collectionGroup}function En(t){const e=tt(t);if(null===e.Ie){e.Ie=[];const t=new Set;for(const r of e.explicitOrderBy)e.Ie.push(r),t.add(r.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(t){let e=new ne(St.comparator);return t.filters.forEach(t=>{t.getFlattenedFilters().forEach(t=>{t.isInequality()&&(e=e.add(t.field))})}),e})(e).forEach(r=>{t.has(r.canonicalString())||r.isKeyField()||e.Ie.push(new Qe(r,n))}),t.has(St.keyField().canonicalString())||e.Ie.push(new Qe(St.keyField(),n))}return e.Ie}function _n(t){const e=tt(t);return e.Ee||(e.Ee=function(t,e){if("F"===t.limitType)return fn(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(t=>{const e="desc"===t.dir?"asc":"desc";return new Qe(t.field,e)});const n=t.endAt?new $e(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new $e(t.startAt.position,t.startAt.inclusive):null;return fn(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}(e,En(t))),e.Ee}function bn(t,e){const n=t.filters.concat([e]);return new yn(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Sn(t,e,n){return new yn(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function In(t,e){return mn(_n(t),_n(e))&&t.limitType===e.limitType}function Cn(t){return`${gn(_n(t))}|lt:${t.limitType}`}function An(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map(t=>nn(t)).join(", ")}]`),Kt(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map(t=>{return`${(e=t).field.canonicalString()} (${e.dir})`;var e}).join(", ")}]`),t.startAt&&(e+=", startAt: ",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(t=>Re(t)).join(",")),t.endAt&&(e+=", endAt: ",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(t=>Re(t)).join(",")),`Target(${e})`}(_n(t))}; limitType=${t.limitType})`}function Nn(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):It.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of En(t))if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&(r=e,!((n=t).startAt&&!function(t,e,n){const r=Ge(t,e,n);return t.inclusive?r<=0:r<0}(n.startAt,En(n),r)||n.endAt&&!function(t,e,n){const r=Ge(t,e,n);return t.inclusive?r>=0:r>0}(n.endAt,En(n),r)));var n,r}function Dn(t){return(e,n)=>{let r=!1;for(const s of En(t)){const t=kn(s,e,n);if(0!==t)return t;r=r||s.field.isKeyField()}return 0}}function kn(t,e,n){const r=t.field.isKeyField()?It.comparator(e.key,n.key):function(t,e,n){const r=e.data.field(t),s=n.data.field(t);return null!==r&&null!==s?Ne(r,s):W(42886)}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return W(19790,{direction:t.dir})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[r,s]of n)if(this.equalsFn(r,t))return s}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),r=this.inner[n];if(void 0===r)return this.inner[n]=[[t,e]],void this.innerSize++;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return void(r[s]=[t,e]);r.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],t))return 1===n.length?delete this.inner[e]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(t){Wt(this.inner,(e,n)=>{for(const[r,s]of n)t(r,s)})}isEmpty(){return Jt(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xn=new Zt(It.comparator);function On(){return xn}const Mn=new Zt(It.comparator);function Ln(...t){let e=Mn;for(const n of t)e=e.insert(n.key,n);return e}function Vn(t){let e=Mn;return t.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function Pn(){return Un()}function Fn(){return Un()}function Un(){return new Rn(t=>t.toString(),(t,e)=>t.isEqual(e))}const qn=new Zt(It.comparator),jn=new ne(It.comparator);function Bn(...t){let e=jn;for(const n of t)e=e.add(n);return e}const zn=new ne(gt);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function $n(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Qt(e)?"-0":e}}function Gn(t){return{integerValue:""+t}}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Kn{constructor(){this._=void 0}}function Qn(t,e,n){return t instanceof Yn?function(t,e){const n={fields:{[de]:{stringValue:he},[ge]:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&me(e)&&(e=pe(e)),e&&(n.fields[fe]=e),{mapValue:n}}(n,e):t instanceof Wn?Jn(t,e):t instanceof Zn?tr(t,e):function(t,e){const n=Xn(t,e),r=nr(n)+nr(t.Ae);return Le(n)&&Le(t.Ae)?Gn(r):$n(t.serializer,r)}(t,e)}function Hn(t,e,n){return t instanceof Wn?Jn(t,e):t instanceof Zn?tr(t,e):n}function Xn(t,e){return t instanceof er?Le(n=e)||(r=n)&&"doubleValue"in r?e:{integerValue:0}:null;var n,r}class Yn extends Kn{}class Wn extends Kn{constructor(t){super(),this.elements=t}}function Jn(t,e){const n=rr(e);for(const r of t.elements)n.some(t=>Ce(t,r))||n.push(r);return{arrayValue:{values:n}}}class Zn extends Kn{constructor(t){super(),this.elements=t}}function tr(t,e){let n=rr(e);for(const r of t.elements)n=n.filter(t=>!Ce(t,r));return{arrayValue:{values:n}}}class er extends Kn{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function nr(t){return ce(t.integerValue||t.doubleValue)}function rr(t){return Ve(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}class sr{constructor(t,e){this.version=t,this.transformResults=e}}class ir{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new ir}static exists(t){return new ir(void 0,t)}static updateTime(t){return new ir(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function or(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class ar{}function ur(t,e){if(!t.hasLocalMutations||e&&0===e.fields.length)return null;if(null===e)return t.isNoDocument()?new vr(t.key,ir.none()):new fr(t.key,t.data,ir.none());{const n=t.data,r=je.empty();let s=new ne(St.comparator);for(let t of e.fields)if(!s.has(t)){let e=n.field(t);null===e&&t.length>1&&(t=t.popLast(),e=n.field(t)),null===e?r.delete(t):r.set(t,e),s=s.add(t)}return new gr(t.key,r,new se(s.toArray()),ir.none())}}function cr(t,e,n){var r;t instanceof fr?function(t,e,n){const r=t.value.clone(),s=pr(t.fieldTransforms,e,n.transformResults);r.setAll(s),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):t instanceof gr?function(t,e,n){if(!or(t.precondition,e))return void e.convertToUnknownDocument(n.version);const r=pr(t.fieldTransforms,e,n.transformResults),s=e.data;s.setAll(mr(t)),s.setAll(r),e.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(t,e,n):(r=n,e.convertToNoDocument(r.version).setHasCommittedMutations())}function lr(t,e,n,r){return t instanceof fr?function(t,e,n,r){if(!or(t.precondition,e))return n;const s=t.value.clone(),i=yr(t.fieldTransforms,r,e);return s.setAll(i),e.convertToFoundDocument(e.version,s).setHasLocalMutations(),null}(t,e,n,r):t instanceof gr?function(t,e,n,r){if(!or(t.precondition,e))return n;const s=yr(t.fieldTransforms,r,e),i=e.data;return i.setAll(mr(t)),i.setAll(s),e.convertToFoundDocument(e.version,i).setHasLocalMutations(),null===n?null:n.unionWith(t.fieldMask.fields).unionWith(t.fieldTransforms.map(t=>t.field))}(t,e,n,r):(s=e,i=n,or(t.precondition,s)?(s.convertToNoDocument(s.version).setHasLocalMutations(),null):i);var s,i}function hr(t,e){let n=null;for(const r of t.fieldTransforms){const t=e.data.field(r.field),s=Xn(r.transform,t||null);null!=s&&(null===n&&(n=je.empty()),n.set(r.field,s))}return n||null}function dr(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&(n=t.fieldTransforms,r=e.fieldTransforms,!!(void 0===n&&void 0===r||n&&r&&wt(n,r,(t,e)=>function(t,e){return t.field.isEqual(e.field)&&(n=t.transform,r=e.transform,n instanceof Wn&&r instanceof Wn||n instanceof Zn&&r instanceof Zn?wt(n.elements,r.elements,Ce):n instanceof er&&r instanceof er?Ce(n.Ae,r.Ae):n instanceof Yn&&r instanceof Yn);var n,r}(t,e)))&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask)));var n,r}class fr extends ar{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class gr extends ar{constructor(t,e,n,r,s=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function mr(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function pr(t,e,n){const r=new Map;Z(t.length===n.length,32656,{Re:n.length,Ve:t.length});for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,Hn(o,a,n[s]))}return r}function yr(t,e,n){const r=new Map;for(const s of t){const t=s.transform,i=n.data.field(s.field);r.set(s.field,Qn(t,i,e))}return r}class vr extends ar{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class wr extends ar{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(t,e,n,r){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let r=0;r<this.mutations.length;r++){const e=this.mutations[r];e.key.isEqual(t.key)&&cr(e,t,n[r])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=lr(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=lr(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Fn();return this.mutations.forEach(r=>{const s=t.get(r.key),i=s.overlayedDocument;let o=this.applyToLocalView(i,s.mutatedFields);o=e.has(r.key)?null:o;const a=ur(i,o);null!==a&&n.set(r.key,a),i.isValidDocument()||i.convertToNoDocument(Pt.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),Bn())}isEqual(t){return this.batchId===t.batchId&&wt(this.mutations,t.mutations,(t,e)=>dr(t,e))&&wt(this.baseMutations,t.baseMutations,(t,e)=>dr(t,e))}}class Er{constructor(t,e,n,r){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=r}static from(t,e,n){Z(t.mutations.length===n.length,58842,{me:t.mutations.length,fe:n.length});let r=function(){return qn}();const s=t.mutations;for(let i=0;i<s.length;i++)r=r.insert(s[i].key,n[i].version);return new Er(t,e,n,r)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return null!==t&&this.mutation===t.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(t,e){this.count=t,this.unchangedNames=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Sr,Ir;function Cr(t){if(void 0===t)return H("GRPC error has no .code"),et.UNKNOWN;switch(t){case Sr.OK:return et.OK;case Sr.CANCELLED:return et.CANCELLED;case Sr.UNKNOWN:return et.UNKNOWN;case Sr.DEADLINE_EXCEEDED:return et.DEADLINE_EXCEEDED;case Sr.RESOURCE_EXHAUSTED:return et.RESOURCE_EXHAUSTED;case Sr.INTERNAL:return et.INTERNAL;case Sr.UNAVAILABLE:return et.UNAVAILABLE;case Sr.UNAUTHENTICATED:return et.UNAUTHENTICATED;case Sr.INVALID_ARGUMENT:return et.INVALID_ARGUMENT;case Sr.NOT_FOUND:return et.NOT_FOUND;case Sr.ALREADY_EXISTS:return et.ALREADY_EXISTS;case Sr.PERMISSION_DENIED:return et.PERMISSION_DENIED;case Sr.FAILED_PRECONDITION:return et.FAILED_PRECONDITION;case Sr.ABORTED:return et.ABORTED;case Sr.OUT_OF_RANGE:return et.OUT_OF_RANGE;case Sr.UNIMPLEMENTED:return et.UNIMPLEMENTED;case Sr.DATA_LOSS:return et.DATA_LOSS;default:return W(39323,{code:t})}}(Ir=Sr||(Sr={}))[Ir.OK=0]="OK",Ir[Ir.CANCELLED=1]="CANCELLED",Ir[Ir.UNKNOWN=2]="UNKNOWN",Ir[Ir.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ir[Ir.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ir[Ir.NOT_FOUND=5]="NOT_FOUND",Ir[Ir.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ir[Ir.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ir[Ir.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ir[Ir.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ir[Ir.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ir[Ir.ABORTED=10]="ABORTED",Ir[Ir.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ir[Ir.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ir[Ir.INTERNAL=13]="INTERNAL",Ir[Ir.UNAVAILABLE=14]="UNAVAILABLE",Ir[Ir.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ar=new D([4294967295,4294967295],0);function Nr(t){const e=(new TextEncoder).encode(t),n=new k;return n.update(e),new Uint8Array(n.digest())}function Dr(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new D([n,r],0),new D([s,i],0)]}class kr{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new Rr(`Invalid padding: ${e}`);if(n<0)throw new Rr(`Invalid hash count: ${n}`);if(t.length>0&&0===this.hashCount)throw new Rr(`Invalid hash count: ${n}`);if(0===t.length&&0!==e)throw new Rr(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=D.fromNumber(this.ge)}ye(t,e,n){let r=t.add(e.multiply(D.fromNumber(n)));return 1===r.compare(Ar)&&(r=new D([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(0===this.ge)return!1;const e=Nr(t),[n,r]=Dr(e);for(let s=0;s<this.hashCount;s++){const t=this.ye(n,r,s);if(!this.we(t))return!1}return!0}static create(t,e,n){const r=t%8==0?0:8-t%8,s=new Uint8Array(Math.ceil(t/8)),i=new kr(s,r,e);return n.forEach(t=>i.insert(t)),i}insert(t){if(0===this.ge)return;const e=Nr(t),[n,r]=Dr(e);for(let s=0;s<this.hashCount;s++){const t=this.ye(n,r,s);this.Se(t)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class Rr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(t,e,n,r,s){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const r=new Map;return r.set(t,Or.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new xr(Pt.min(),r,new Zt(gt),On(),Bn())}}class Or{constructor(t,e,n,r,s){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new Or(n,e,Bn(),Bn(),Bn())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(t,e,n,r){this.be=t,this.removedTargetIds=e,this.key=n,this.De=r}}class Lr{constructor(t,e){this.targetId=t,this.Ce=e}}class Vr{constructor(t,e,n=oe.EMPTY_BYTE_STRING,r=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=r}}class Pr{constructor(){this.ve=0,this.Fe=qr(),this.Me=oe.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=Bn(),e=Bn(),n=Bn();return this.Fe.forEach((r,s)=>{switch(s){case 0:t=t.add(r);break;case 2:e=e.add(r);break;case 1:n=n.add(r);break;default:W(38017,{changeType:s})}}),new Or(this.Me,this.xe,t,e,n)}qe(){this.Oe=!1,this.Fe=qr()}Qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,Z(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Fr{constructor(t){this.Ge=t,this.ze=new Map,this.je=On(),this.Je=Ur(),this.He=Ur(),this.Ye=new Zt(gt)}Ze(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Xe(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,e=>{const n=this.nt(e);switch(t.state){case 0:this.rt(e)&&n.Le(t.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(t.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(n.We(),n.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),n.Le(t.resumeToken));break;default:W(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach((t,n)=>{this.rt(n)&&e(n)})}st(t){const e=t.targetId,n=t.Ce.count,r=this.ot(e);if(r){const s=r.target;if(pn(s))if(0===n){const t=new It(s.path);this.et(e,t,ze.newNoDocument(t,Pt.min()))}else Z(1===n,20013,{expectedCount:n});else{const r=this._t(e);if(r!==n){const n=this.ut(t),s=n?this.ct(n,t,r):1;if(0!==s){this.it(e);const t=2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(e,t)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:s=0}=e;let i,o;try{i=le(n).toUint8Array()}catch(a){if(a instanceof ie)return X("Decoding the base64 bloom filter in existence filter failed ("+a.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw a}try{o=new kr(i,r,s)}catch(a){return X(a instanceof Rr?"BloomFilter error: ":"Applying bloom filter failed: ",a),null}return 0===o.ge?null:o}ct(t,e,n){return e.Ce.count===n-this.Pt(t,e.targetId)?0:2}Pt(t,e){const n=this.Ge.getRemoteKeysForTarget(e);let r=0;return n.forEach(n=>{const s=this.Ge.ht(),i=`projects/${s.projectId}/databases/${s.database}/documents/${n.path.canonicalString()}`;t.mightContain(i)||(this.et(e,n,null),r++)}),r}Tt(t){const e=new Map;this.ze.forEach((n,r)=>{const s=this.ot(r);if(s){if(n.current&&pn(s.target)){const e=new It(s.target.path);this.It(e).has(r)||this.Et(r,e)||this.et(r,e,ze.newNoDocument(e,t))}n.Be&&(e.set(r,n.ke()),n.qe())}});let n=Bn();this.He.forEach((t,e)=>{let r=!0;e.forEachWhile(t=>{const e=this.ot(t);return!e||"TargetPurposeLimboResolution"===e.purpose||(r=!1,!1)}),r&&(n=n.add(t))}),this.je.forEach((e,n)=>n.setReadTime(t));const r=new xr(t,e,this.Ye,this.je,n);return this.je=On(),this.Je=Ur(),this.He=Ur(),this.Ye=new Zt(gt),r}Xe(t,e){if(!this.rt(t))return;const n=this.Et(t,e.key)?2:0;this.nt(t).Qe(e.key,n),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.dt(e.key).add(t))}et(t,e,n){if(!this.rt(t))return;const r=this.nt(t);this.Et(t,e)?r.Qe(e,1):r.$e(e),this.He=this.He.insert(e,this.dt(e).delete(t)),this.He=this.He.insert(e,this.dt(e).add(t)),n&&(this.je=this.je.insert(e,n))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let e=this.ze.get(t);return e||(e=new Pr,this.ze.set(t,e)),e}dt(t){let e=this.He.get(t);return e||(e=new ne(gt),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new ne(gt),this.Je=this.Je.insert(t,e)),e}rt(t){const e=null!==this.ot(t);return e||Q("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new Pr),this.Ge.getRemoteKeysForTarget(t).forEach(e=>{this.et(t,e,null)})}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function Ur(){return new Zt(It.comparator)}function qr(){return new Zt(It.comparator)}const jr=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),Br=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),zr=(()=>({and:"AND",or:"OR"}))();class $r{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Gr(t,e){return t.useProto3Json||Kt(e)?e:{value:e}}function Kr(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Qr(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Hr(t,e){return Kr(t,e.toTimestamp())}function Xr(t){return Z(!!t,49232),Pt.fromTimestamp(function(t){const e=ue(t);return new Vt(e.seconds,e.nanos)}(t))}function Yr(t,e){return Wr(t,e).canonicalString()}function Wr(t,e){const n=(r=t,new _t(["projects",r.projectId,"databases",r.database])).child("documents");var r;return void 0===e?n:n.child(e)}function Jr(t){const e=_t.fromString(t);return Z(ps(e),10190,{key:e.toString()}),e}function Zr(t,e){return Yr(t.databaseId,e.path)}function ts(t,e){const n=Jr(e);if(n.get(1)!==t.databaseId.projectId)throw new nt(et.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new nt(et.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new It(rs(n))}function es(t,e){return Yr(t.databaseId,e)}function ns(t){return new _t(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function rs(t){return Z(t.length>4&&"documents"===t.get(4),29091,{key:t.toString()}),t.popFirst(5)}function ss(t,e,n){return{name:Zr(t,e),fields:n.value.mapValue.fields}}function is(t,e){return{documents:[es(t,e.path)]}}function os(t,e){const n={structuredQuery:{}},r=e.path;let s;null!==e.collectionGroup?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=es(t,s);const i=function(t){if(0!==t.length)return gs(We.create(t,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(t){if(0!==t.length)return t.map(t=>{return{field:ds((e=t).field),direction:cs(e.dir)};var e})}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Gr(t,e.limit);return null!==a&&(n.structuredQuery.limit=a),e.startAt&&(n.structuredQuery.startAt={before:(u=e.startAt).inclusive,values:u.position}),e.endAt&&(n.structuredQuery.endAt=function(t){return{before:!t.inclusive,values:t.position}}(e.endAt)),{ft:n,parent:s};var u}function as(t){let e=function(t){const e=Jr(t);return 4===e.length?_t.emptyPath():rs(e)}(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Z(1===r,65062);const t=n.from[0];t.allDescendants?s=t.collectionId:e=e.child(t.collectionId)}let i=[];n.where&&(i=function(t){const e=us(t);return e instanceof We&&Ze(e)?e.getFilters():[e]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(t=>{return new Qe(fs((e=t).field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction));var e}));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,Kt(e)?null:e}(n.limit));let u=null;n.startAt&&(u=function(t){const e=!!t.before,n=t.values||[];return new $e(n,e)}(n.startAt));let c=null;return n.endAt&&(c=function(t){const e=!t.before,n=t.values||[];return new $e(n,e)}(n.endAt)),function(t,e,n,r,s,i,o,a){return new yn(t,e,n,r,s,"F",o,a)}(e,s,o,i,a,0,u,c)}function us(t){return void 0!==t.unaryFilter?function(t){switch(t.unaryFilter.op){case"IS_NAN":const e=fs(t.unaryFilter.field);return Ye.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=fs(t.unaryFilter.field);return Ye.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=fs(t.unaryFilter.field);return Ye.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=fs(t.unaryFilter.field);return Ye.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return W(61313);default:return W(60726)}}(t):void 0!==t.fieldFilter?(e=t,Ye.create(fs(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return W(58110);default:return W(50506)}}(e.fieldFilter.op),e.fieldFilter.value)):void 0!==t.compositeFilter?function(t){return We.create(t.compositeFilter.filters.map(t=>us(t)),function(t){switch(t){case"AND":return"and";case"OR":return"or";default:return W(1026)}}(t.compositeFilter.op))}(t):W(30097,{filter:t});var e}function cs(t){return jr[t]}function ls(t){return Br[t]}function hs(t){return zr[t]}function ds(t){return{fieldPath:t.canonicalString()}}function fs(t){return St.fromServerFormat(t.fieldPath)}function gs(t){return t instanceof Ye?function(t){if("=="===t.op){if(Fe(t.value))return{unaryFilter:{field:ds(t.field),op:"IS_NAN"}};if(Pe(t.value))return{unaryFilter:{field:ds(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(Fe(t.value))return{unaryFilter:{field:ds(t.field),op:"IS_NOT_NAN"}};if(Pe(t.value))return{unaryFilter:{field:ds(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ds(t.field),op:ls(t.op),value:t.value}}}(t):t instanceof We?function(t){const e=t.getFilters().map(t=>gs(t));return 1===e.length?e[0]:{compositeFilter:{op:hs(t.op),filters:e}}}(t):W(54877,{filter:t})}function ms(t){const e=[];return t.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ps(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(t,e,n,r,s=Pt.min(),i=Pt.min(),o=oe.EMPTY_BYTE_STRING,a=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(t){return new ys(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new ys(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new ys(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new ys(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(t){this.yt=t}}function ws(t){const e=as({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?Sn(e,e.limit,"L"):e}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(){this.Cn=new Es}addToCollectionParentIndex(t,e){return this.Cn.add(e),zt.resolve()}getCollectionParents(t,e){return zt.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return zt.resolve()}deleteFieldIndex(t,e){return zt.resolve()}deleteAllFieldIndexes(t){return zt.resolve()}createTargetIndexes(t,e){return zt.resolve()}getDocumentsMatchingTarget(t,e){return zt.resolve(null)}getIndexType(t,e){return zt.resolve(0)}getFieldIndexes(t,e){return zt.resolve([])}getNextCollectionGroupToUpdate(t){return zt.resolve(null)}getMinOffset(t,e){return zt.resolve(Ut.min())}getMinOffsetFromCollectionGroup(t,e){return zt.resolve(Ut.min())}updateCollectionGroup(t,e,n){return zt.resolve()}updateIndexEntries(t,e){return zt.resolve()}}class Es{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e]||new ne(_t.comparator),s=!r.has(n);return this.index[e]=r.add(n),s}has(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e];return r&&r.has(n)}getEntries(t){return(this.index[t]||new ne(_t.comparator)).toArray()}}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},bs=41943040;class Ss{static withCacheSize(t){return new Ss(t,Ss.DEFAULT_COLLECTION_PERCENTILE,Ss.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ss.DEFAULT_COLLECTION_PERCENTILE=10,Ss.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ss.DEFAULT=new Ss(bs,Ss.DEFAULT_COLLECTION_PERCENTILE,Ss.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ss.DISABLED=new Ss(-1,0,0);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Is{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new Is(0)}static cr(){return new Is(-1)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cs="LruGarbageCollector";function As([t,e],[n,r]){const s=gt(t,n);return 0===s?gt(e,r):s}class Ns{constructor(t){this.Ir=t,this.buffer=new ne(As),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const t=this.buffer.last();As(e,t)<0&&(this.buffer=this.buffer.delete(t).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Ds{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Vr(t){Q(Cs,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,()=>c(this,null,function*(){this.Rr=null;try{yield this.localStore.collectGarbage(this.garbageCollector)}catch(t){$t(t)?Q(Cs,"Ignoring IndexedDB error during garbage collection: ",t):yield Bt(t)}yield this.Vr(3e5)}))}}class ks{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next(t=>Math.floor(e/100*t))}nthSequenceNumber(t,e){if(0===e)return zt.resolve(Gt.ce);const n=new Ns(e);return this.mr.forEachTarget(t,t=>n.Ar(t.sequenceNumber)).next(()=>this.mr.pr(t,t=>n.Ar(t))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.mr.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return-1===this.params.cacheSizeCollectionThreshold?(Q("LruGarbageCollector","Garbage collection skipped; disabled"),zt.resolve(_s)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(Q("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),_s):this.yr(t,e))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let n,r,s,i,o,a,u;const c=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(e=>(e>this.params.maximumSequenceNumbersToCollect?(Q("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`),r=this.params.maximumSequenceNumbersToCollect):r=e,i=Date.now(),this.nthSequenceNumber(t,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(t,n,e))).next(e=>(s=e,a=Date.now(),this.removeOrphanedDocuments(t,n))).next(t=>(u=Date.now(),K()<=E.DEBUG&&Q("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-c}ms\n\tDetermined least recently used ${r} in `+(o-i)+`ms\n\tRemoved ${s} targets in `+(a-o)+`ms\n\tRemoved ${t} documents in `+(u-a)+`ms\nTotal Duration: ${u-c}ms`),zt.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:t})))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Rs{constructor(){this.changes=new Rn(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,ze.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?zt.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(t,e,n,r){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=r}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(r=>(n=r,this.remoteDocumentCache.getEntry(t,e))).next(t=>(null!==n&&lr(n.mutation,t,se.empty(),Vt.now()),t))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(e=>this.getLocalViewOfDocuments(t,e,Bn()).next(()=>e))}getLocalViewOfDocuments(t,e,n=Bn()){const r=Pn();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,n).next(t=>{let e=Ln();return t.forEach((t,n)=>{e=e.insert(t,n.overlayedDocument)}),e}))}getOverlayedDocuments(t,e){const n=Pn();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,Bn()))}populateOverlays(t,e,n){const r=[];return n.forEach(t=>{e.has(t)||r.push(t)}),this.documentOverlayCache.getOverlays(t,r).next(t=>{t.forEach((t,n)=>{e.set(t,n)})})}computeViews(t,e,n,r){let s=On();const i=Un(),o=Un();return e.forEach((t,e)=>{const o=n.get(e.key);r.has(e.key)&&(void 0===o||o.mutation instanceof gr)?s=s.insert(e.key,e):void 0!==o?(i.set(e.key,o.mutation.getFieldMask()),lr(o.mutation,e,o.mutation.getFieldMask(),Vt.now())):i.set(e.key,se.empty())}),this.recalculateAndSaveOverlays(t,s).next(t=>(t.forEach((t,e)=>i.set(t,e)),e.forEach((t,e)=>{var n;return o.set(t,new xs(e,null!=(n=i.get(t))?n:null))}),o))}recalculateAndSaveOverlays(t,e){const n=Un();let r=new Zt((t,e)=>t-e),s=Bn();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(t=>{for(const s of t)s.keys().forEach(t=>{const i=e.get(t);if(null===i)return;let o=n.get(t)||se.empty();o=s.applyToLocalView(i,o),n.set(t,o);const a=(r.get(s.batchId)||Bn()).add(t);r=r.insert(s.batchId,a)})}).next(()=>{const i=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,u=r.value,c=Fn();u.forEach(t=>{if(!s.has(t)){const r=ur(e.get(t),n.get(t));null!==r&&c.set(t,r),s=s.add(t)}}),i.push(this.documentOverlayCache.saveOverlays(t,a,c))}return zt.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(e=>this.recalculateAndSaveOverlays(t,e))}getDocumentsMatchingQuery(t,e,n,r){return s=e,It.isDocumentKey(s.path)&&null===s.collectionGroup&&0===s.filters.length?this.getDocumentsMatchingDocumentQuery(t,e.path):Tn(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,r):this.getDocumentsMatchingCollectionQuery(t,e,n,r);var s}getNextDocuments(t,e,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,r).next(s=>{const i=r-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,r-s.size):zt.resolve(Pn());let o=-1,a=s;return i.next(e=>zt.forEach(e,(e,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),s.get(e)?zt.resolve():this.remoteDocumentCache.getEntry(t,e).next(t=>{a=a.insert(e,t)}))).next(()=>this.populateOverlays(t,e,s)).next(()=>this.computeViews(t,a,e,Bn())).next(t=>({batchId:o,changes:Vn(t)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new It(e)).next(t=>{let e=Ln();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e})}getDocumentsMatchingCollectionGroupQuery(t,e,n,r){const s=e.collectionGroup;let i=Ln();return this.indexManager.getCollectionParents(t,s).next(o=>zt.forEach(o,o=>{const a=(u=e,c=o.child(s),new yn(c,null,u.explicitOrderBy.slice(),u.filters.slice(),u.limit,u.limitType,u.startAt,u.endAt));var u,c;return this.getDocumentsMatchingCollectionQuery(t,a,n,r).next(t=>{t.forEach((t,e)=>{i=i.insert(t,e)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(t,e,n,r){let s;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,s,r))).next(t=>{s.forEach((e,n)=>{const r=n.getKey();null===t.get(r)&&(t=t.insert(r,ze.newInvalidDocument(r)))});let n=Ln();return t.forEach((t,r)=>{const i=s.get(t);void 0!==i&&lr(i.mutation,r,se.empty(),Vt.now()),Nn(e,r)&&(n=n.insert(t,r))}),n})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return zt.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,{id:(n=e).id,version:n.version,createTime:Xr(n.createTime)}),zt.resolve();var n}getNamedQuery(t,e){return zt.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,{name:(n=e).name,query:ws(n.bundledQuery),readTime:Xr(n.readTime)}),zt.resolve();var n}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(){this.overlays=new Zt(It.comparator),this.qr=new Map}getOverlay(t,e){return zt.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Pn();return zt.forEach(e,e=>this.getOverlay(t,e).next(t=>{null!==t&&n.set(e,t)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((n,r)=>{this.St(t,e,r)}),zt.resolve()}removeOverlaysForBatchId(t,e,n){const r=this.qr.get(n);return void 0!==r&&(r.forEach(t=>this.overlays=this.overlays.remove(t)),this.qr.delete(n)),zt.resolve()}getOverlaysForCollection(t,e,n){const r=Pn(),s=e.length+1,i=new It(e.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const t=o.getNext().value,i=t.getKey();if(!e.isPrefixOf(i.path))break;i.path.length===s&&t.largestBatchId>n&&r.set(t.getKey(),t)}return zt.resolve(r)}getOverlaysForCollectionGroup(t,e,n,r){let s=new Zt((t,e)=>t-e);const i=this.overlays.getIterator();for(;i.hasNext();){const t=i.getNext().value;if(t.getKey().getCollectionGroup()===e&&t.largestBatchId>n){let e=s.get(t.largestBatchId);null===e&&(e=Pn(),s=s.insert(t.largestBatchId,e)),e.set(t.getKey(),t)}}const o=Pn(),a=s.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((t,e)=>o.set(t,e)),!(o.size()>=r)););return zt.resolve(o)}St(t,e,n){const r=this.overlays.get(n.key);if(null!==r){const t=this.qr.get(r.largestBatchId).delete(n.key);this.qr.set(r.largestBatchId,t)}this.overlays=this.overlays.insert(n.key,new _r(e,n));let s=this.qr.get(e);void 0===s&&(s=Bn(),this.qr.set(e,s)),this.qr.set(e,s.add(n.key))}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(){this.sessionToken=oe.EMPTY_BYTE_STRING}getSessionToken(t){return zt.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,zt.resolve()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(){this.Qr=new ne(Fs.$r),this.Ur=new ne(Fs.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const n=new Fs(t,e);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(t,e){t.forEach(t=>this.addReference(t,e))}removeReference(t,e){this.Gr(new Fs(t,e))}zr(t,e){t.forEach(t=>this.removeReference(t,e))}jr(t){const e=new It(new _t([])),n=new Fs(e,t),r=new Fs(e,t+1),s=[];return this.Ur.forEachInRange([n,r],t=>{this.Gr(t),s.push(t.key)}),s}Jr(){this.Qr.forEach(t=>this.Gr(t))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new It(new _t([])),n=new Fs(e,t),r=new Fs(e,t+1);let s=Bn();return this.Ur.forEachInRange([n,r],t=>{s=s.add(t.key)}),s}containsKey(t){const e=new Fs(t,0),n=this.Qr.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class Fs{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return It.comparator(t.key,e.key)||gt(t.Yr,e.Yr)}static Kr(t,e){return gt(t.Yr,e.Yr)||It.comparator(t.key,e.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new ne(Fs.$r)}checkEmpty(t){return zt.resolve(0===this.mutationQueue.length)}addMutationBatch(t,e,n,r){const s=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new Tr(s,e,n,r);this.mutationQueue.push(i);for(const o of r)this.Zr=this.Zr.add(new Fs(o.key,s)),this.indexManager.addToCollectionParentIndex(t,o.key.path.popLast());return zt.resolve(i)}lookupMutationBatch(t,e){return zt.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=this.ei(n),s=r<0?0:r;return zt.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return zt.resolve(0===this.mutationQueue.length?-1:this.tr-1)}getAllMutationBatches(t){return zt.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new Fs(e,0),r=new Fs(e,Number.POSITIVE_INFINITY),s=[];return this.Zr.forEachInRange([n,r],t=>{const e=this.Xr(t.Yr);s.push(e)}),zt.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new ne(gt);return e.forEach(t=>{const e=new Fs(t,0),r=new Fs(t,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([e,r],t=>{n=n.add(t.Yr)})}),zt.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1;let s=n;It.isDocumentKey(s)||(s=s.child(""));const i=new Fs(new It(s),0);let o=new ne(gt);return this.Zr.forEachWhile(t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===r&&(o=o.add(t.Yr)),!0)},i),zt.resolve(this.ti(o))}ti(t){const e=[];return t.forEach(t=>{const n=this.Xr(t);null!==n&&e.push(n)}),e}removeMutationBatch(t,e){Z(0===this.ni(e.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Zr;return zt.forEach(e.mutations,r=>{const s=new Fs(r.key,e.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(t,r.key)}).next(()=>{this.Zr=n})}ir(t){}containsKey(t,e){const n=new Fs(e,0),r=this.Zr.firstAfterOrEqual(n);return zt.resolve(e.isEqual(r&&r.key))}performConsistencyCheck(t){return this.mutationQueue.length,zt.resolve()}ni(t,e){return this.ei(t)}ei(t){return 0===this.mutationQueue.length?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(t){this.ri=t,this.docs=new Zt(It.comparator),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,r=this.docs.get(n),s=r?r.size:0,i=this.ri(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:i}),this.size+=i-s,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return zt.resolve(n?n.document.mutableCopy():ze.newInvalidDocument(e))}getEntries(t,e){let n=On();return e.forEach(t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.mutableCopy():ze.newInvalidDocument(t))}),zt.resolve(n)}getDocumentsMatchingQuery(t,e,n,r){let s=On();const i=e.path,o=new It(i.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:t,value:{document:o}}=a.getNext();if(!i.isPrefixOf(t.path))break;t.path.length>i.length+1||qt(Ft(o),n)<=0||(r.has(o.key)||Nn(e,o))&&(s=s.insert(o.key,o.mutableCopy()))}return zt.resolve(s)}getAllFromCollectionGroup(t,e,n,r){W(9500)}ii(t,e){return zt.forEach(this.docs,t=>e(t))}newChangeBuffer(t){return new js(this)}getSize(t){return zt.resolve(this.size)}}class js extends Rs{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?e.push(this.Nr.addEntry(t,r)):this.Nr.removeEntry(n)}),zt.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(t){this.persistence=t,this.si=new Rn(t=>gn(t),mn),this.lastRemoteSnapshotVersion=Pt.min(),this.highestTargetId=0,this.oi=0,this._i=new Ps,this.targetCount=0,this.ai=Is.ur()}forEachTarget(t,e){return this.si.forEach((t,n)=>e(n)),zt.resolve()}getLastRemoteSnapshotVersion(t){return zt.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return zt.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),zt.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.oi&&(this.oi=e),zt.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new Is(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,zt.resolve()}updateTargetData(t,e){return this.Pr(e),zt.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,zt.resolve()}removeTargets(t,e,n){let r=0;const s=[];return this.si.forEach((i,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.si.delete(i),s.push(this.removeMatchingKeysForTargetId(t,o.targetId)),r++)}),zt.waitFor(s).next(()=>r)}getTargetCount(t){return zt.resolve(this.targetCount)}getTargetData(t,e){const n=this.si.get(e)||null;return zt.resolve(n)}addMatchingKeys(t,e,n){return this._i.Wr(e,n),zt.resolve()}removeMatchingKeys(t,e,n){this._i.zr(e,n);const r=this.persistence.referenceDelegate,s=[];return r&&e.forEach(e=>{s.push(r.markPotentiallyOrphaned(t,e))}),zt.waitFor(s)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),zt.resolve()}getMatchingKeysForTargetId(t,e){const n=this._i.Hr(e);return zt.resolve(n)}containsKey(t,e){return zt.resolve(this._i.containsKey(e))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(t,e){this.ui={},this.overlays={},this.ci=new Gt(0),this.li=!1,this.li=!0,this.hi=new Vs,this.referenceDelegate=t(this),this.Pi=new Bs(this),this.indexManager=new Ts,this.remoteDocumentCache=new qs(t=>this.referenceDelegate.Ti(t)),this.serializer=new vs(e),this.Ii=new Ms(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Ls,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.ui[t.toKey()];return n||(n=new Us(e,this.referenceDelegate),this.ui[t.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,n){Q("MemoryPersistence","Starting transaction:",t);const r=new $s(this.ci.next());return this.referenceDelegate.Ei(),n(r).next(t=>this.referenceDelegate.di(r).next(()=>t)).toPromise().then(t=>(r.raiseOnCommittedEvent(),t))}Ai(t,e){return zt.or(Object.values(this.ui).map(n=>()=>n.containsKey(t,e)))}}class $s extends jt{constructor(t){super(),this.currentSequenceNumber=t}}class Gs{constructor(t){this.persistence=t,this.Ri=new Ps,this.Vi=null}static mi(t){return new Gs(t)}get fi(){if(this.Vi)return this.Vi;throw W(60996)}addReference(t,e,n){return this.Ri.addReference(n,e),this.fi.delete(n.toString()),zt.resolve()}removeReference(t,e,n){return this.Ri.removeReference(n,e),this.fi.add(n.toString()),zt.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),zt.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach(t=>this.fi.add(t.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(t=>{t.forEach(t=>this.fi.add(t.toString()))}).next(()=>n.removeTargetData(t,e))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return zt.forEach(this.fi,n=>{const r=It.fromPath(n);return this.gi(t,r).next(t=>{t||e.removeEntry(r,Pt.min())})}).next(()=>(this.Vi=null,e.apply(t)))}updateLimboDocument(t,e){return this.gi(t,e).next(t=>{t?this.fi.delete(e.toString()):this.fi.add(e.toString())})}Ti(t){return 0}gi(t,e){return zt.or([()=>zt.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class Ks{constructor(t,e){this.persistence=t,this.pi=new Rn(t=>function(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Xt(e)),e=Ht(t.get(n),e);return Xt(e)}(t.path),(t,e)=>t.isEqual(e)),this.garbageCollector=function(t,e){return new ks(t,e)}(this,e)}static mi(t,e){return new Ks(t,e)}Ei(){}di(t){return zt.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next(t=>e.next(e=>t+e))}wr(t){let e=0;return this.pr(t,t=>{e++}).next(()=>e)}pr(t,e){return zt.forEach(this.pi,(n,r)=>this.br(t,n,r).next(t=>t?zt.resolve():e(r)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const r=this.persistence.getRemoteDocumentCache(),s=r.newChangeBuffer();return r.ii(t,r=>this.br(t,r,e).next(t=>{t||(n++,s.removeEntry(r,Pt.min()))})).next(()=>s.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),zt.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.pi.set(n,t.currentSequenceNumber),zt.resolve()}removeReference(t,e,n){return this.pi.set(n,t.currentSequenceNumber),zt.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),zt.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Oe(t.data.value)),e}br(t,e,n){return zt.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const t=this.pi.get(e);return zt.resolve(void 0!==t&&t>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(t,e,n,r){this.targetId=t,this.fromCache=e,this.Es=n,this.ds=r}static As(t,e){let n=Bn(),r=Bn();for(const s of e.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:r=r.add(s.doc.key)}return new Qs(t,e.fromCache,n,r)}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=_()?8:function(){const t=b().match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}()>0?6:4}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,n,r){const s={result:null};return this.ys(t,e).next(t=>{s.result=t}).next(()=>{if(!s.result)return this.ws(t,e,r,n).next(t=>{s.result=t})}).next(()=>{if(s.result)return;const n=new Hs;return this.Ss(t,e,n).next(r=>{if(s.result=r,this.Vs)return this.bs(t,e,n,r.size)})}).next(()=>s.result)}bs(t,e,n,r){return n.documentReadCount<this.fs?(K()<=E.DEBUG&&Q("QueryEngine","SDK will not create cache indexes for query:",An(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),zt.resolve()):(K()<=E.DEBUG&&Q("QueryEngine","Query:",An(e),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.gs*r?(K()<=E.DEBUG&&Q("QueryEngine","The SDK decides to create cache indexes for query:",An(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,_n(e))):zt.resolve())}ys(t,e){if(wn(e))return zt.resolve(null);let n=_n(e);return this.indexManager.getIndexType(t,n).next(r=>0===r?null:(null!==e.limit&&1===r&&(e=Sn(e,null,"F"),n=_n(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(r=>{const s=Bn(...r);return this.ps.getDocuments(t,s).next(r=>this.indexManager.getMinOffset(t,n).next(n=>{const i=this.Ds(e,r);return this.Cs(e,i,s,n.readTime)?this.ys(t,Sn(e,null,"F")):this.vs(t,i,e,n)}))})))}ws(t,e,n,r){return wn(e)||r.isEqual(Pt.min())?zt.resolve(null):this.ps.getDocuments(t,n).next(s=>{const i=this.Ds(e,s);return this.Cs(e,i,n,r)?zt.resolve(null):(K()<=E.DEBUG&&Q("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),An(e)),this.vs(t,i,e,function(t){const e=t.toTimestamp().seconds,n=t.toTimestamp().nanoseconds+1,r=Pt.fromTimestamp(1e9===n?new Vt(e+1,0):new Vt(e,n));return new Ut(r,It.empty(),-1)}(r)).next(t=>t))})}Ds(t,e){let n=new ne(Dn(t));return e.forEach((e,r)=>{Nn(t,r)&&(n=n.add(r))}),n}Cs(t,e,n,r){if(null===t.limit)return!1;if(n.size!==e.size)return!0;const s="F"===t.limitType?e.last():e.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}Ss(t,e,n){return K()<=E.DEBUG&&Q("QueryEngine","Using full collection scan to execute query:",An(e)),this.ps.getDocumentsMatchingQuery(t,e,Ut.min(),n)}vs(t,e,n,r){return this.ps.getDocumentsMatchingQuery(t,n,r).next(t=>(e.forEach(e=>{t=t.insert(e.key,e)}),t))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ys="LocalStore";class Ws{constructor(t,e,n,r){this.persistence=t,this.Fs=e,this.serializer=r,this.Ms=new Zt(gt),this.xs=new Rn(t=>gn(t),mn),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(n)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Os(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Ms))}}function Js(t,e){return c(this,null,function*(){const n=tt(t);return yield n.persistence.runTransaction("Handle user change","readonly",t=>{let r;return n.mutationQueue.getAllMutationBatches(t).next(s=>(r=s,n.Bs(e),n.mutationQueue.getAllMutationBatches(t))).next(e=>{const s=[],i=[];let o=Bn();for(const t of r){s.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){i.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return n.localDocuments.getDocuments(t,o).next(t=>({Ls:t,removedBatchIds:s,addedBatchIds:i}))})})})}function Zs(t){const e=tt(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function ti(t,e){const n=tt(t);return n.persistence.runTransaction("Get next mutation batch","readonly",t=>(void 0===e&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(t,e)))}function ei(t,e,n){return c(this,null,function*(){const r=tt(t),s=r.Ms.get(e),i=n?"readwrite":"readwrite-primary";try{n||(yield r.persistence.runTransaction("Release target",i,t=>r.persistence.referenceDelegate.removeTarget(t,s)))}catch(o){if(!$t(o))throw o;Q(Ys,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)})}function ni(t,e,n){const r=tt(t);let s=Pt.min(),i=Bn();return r.persistence.runTransaction("Execute query","readwrite",t=>function(t,e,n){const r=tt(t),s=r.xs.get(n);return void 0!==s?zt.resolve(r.Ms.get(s)):r.Pi.getTargetData(e,n)}(r,t,_n(e)).next(e=>{if(e)return s=e.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(t,e.targetId).next(t=>{i=t})}).next(()=>r.Fs.getDocumentsMatchingQuery(t,e,n?s:Pt.min(),n?i:Bn())).next(t=>(function(t,e,n){let r=t.Os.get(e)||Pt.min();n.forEach((t,e)=>{e.readTime.compareTo(r)>0&&(r=e.readTime)}),t.Os.set(e,r)}(r,function(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}(e),t),{documents:t,Qs:i})))}class ri{constructor(){this.activeTargetIds=zn}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class si{constructor(){this.Mo=new ri,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,n){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new ri,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{Oo(t){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi="ConnectivityMonitor";class ai{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){Q(oi,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){Q(oi,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ui=null;function ci(){return null===ui?ui=268435456+Math.round(2147483648*Math.random()):ui++,"0x"+ui.toString(16)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const li="RestConnection",hi={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class di{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${n}/databases/${r}`,this.Wo=this.databaseId.database===we?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Go(t,e,n,r,s){const i=ci(),o=this.zo(t,e.toUriEncodedString());Q(li,`Sending RPC '${t}' ${i}:`,o,n);const a={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(a,r,s);const{host:u}=new URL(o),c=m(u);return this.Jo(t,o,a,n,c).then(e=>(Q(li,`Received RPC '${t}' ${i}: `,e),e),e=>{throw X(li,`RPC '${t}' ${i} failed with error: `,e,"url: ",o,"request:",n),e})}Ho(t,e,n,r,s,i){return this.Go(t,e,n,r,s)}jo(t,e,n){t["X-Goog-Api-Client"]="gl-js/ fire/"+$,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((e,n)=>t[n]=e),n&&n.headers.forEach((e,n)=>t[n]=e)}zo(t,e){const n=hi[t];return`${this.Uo}/v1/${e}:${n}`}terminate(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gi="WebChannelConnection";class mi extends di{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,n,r,s){const i=ci();return new Promise((s,o)=>{const a=new x;a.setWithCredentials(!0),a.listenOnce(M.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case L.NO_ERROR:const e=a.getResponseJson();Q(gi,`XHR for RPC '${t}' ${i} received:`,JSON.stringify(e)),s(e);break;case L.TIMEOUT:Q(gi,`RPC '${t}' ${i} timed out`),o(new nt(et.DEADLINE_EXCEEDED,"Request time out"));break;case L.HTTP_ERROR:const n=a.getStatus();if(Q(gi,`RPC '${t}' ${i} failed with status:`,n,"response text:",a.getResponseText()),n>0){let t=a.getResponseJson();Array.isArray(t)&&(t=t[0]);const e=null==t?void 0:t.error;if(e&&e.status&&e.message){const t=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(et).indexOf(e)>=0?e:et.UNKNOWN}(e.status);o(new nt(t,e.message))}else o(new nt(et.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new nt(et.UNAVAILABLE,"Connection failed."));break;default:W(9055,{l_:t,streamId:i,h_:a.getLastErrorCode(),P_:a.getLastError()})}}finally{Q(gi,`RPC '${t}' ${i} completed.`)}});const u=JSON.stringify(r);Q(gi,`RPC '${t}' ${i} sending request:`,r),a.send(e,"POST",u,n,15)})}T_(t,e,n){const r=ci(),s=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],i=U(),o=F(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;void 0!==u&&(a.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(a.useFetchStreams=!0),this.jo(a.initMessageHeaders,e,n),a.encodeInitMessageHeaders=!0;const c=s.join("");Q(gi,`Creating RPC '${t}' stream ${r}: ${c}`,a);const l=i.createWebChannel(c,a);this.I_(l);let h=!1,d=!1;const f=new fi({Yo:e=>{d?Q(gi,`Not sending because RPC '${t}' stream ${r} is closed:`,e):(h||(Q(gi,`Opening RPC '${t}' stream ${r} transport.`),l.open(),h=!0),Q(gi,`RPC '${t}' stream ${r} sending:`,e),l.send(e))},Zo:()=>l.close()}),g=(t,e,n)=>{t.listen(e,t=>{try{n(t)}catch(e){setTimeout(()=>{throw e},0)}})};return g(l,O.EventType.OPEN,()=>{d||(Q(gi,`RPC '${t}' stream ${r} transport opened.`),f.o_())}),g(l,O.EventType.CLOSE,()=>{d||(d=!0,Q(gi,`RPC '${t}' stream ${r} transport closed`),f.a_(),this.E_(l))}),g(l,O.EventType.ERROR,e=>{d||(d=!0,X(gi,`RPC '${t}' stream ${r} transport errored. Name:`,e.name,"Message:",e.message),f.a_(new nt(et.UNAVAILABLE,"The operation could not be completed")))}),g(l,O.EventType.MESSAGE,e=>{var n;if(!d){const s=e.data[0];Z(!!s,16349);const i=s,o=(null==i?void 0:i.error)||(null==(n=i[0])?void 0:n.error);if(o){Q(gi,`RPC '${t}' stream ${r} received error:`,o);const e=o.status;let n=function(t){const e=Sr[t];if(void 0!==e)return Cr(e)}(e),s=o.message;void 0===n&&(n=et.INTERNAL,s="Unknown error status: "+e+" with message "+o.message),d=!0,f.a_(new nt(n,s)),l.close()}else Q(gi,`RPC '${t}' stream ${r} received:`,s),f.u_(s)}}),g(o,P.STAT_EVENT,e=>{e.stat===V.PROXY?Q(gi,`RPC '${t}' stream ${r} detected buffering proxy`):e.stat===V.NOPROXY&&Q(gi,`RPC '${t}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{f.__()},0),f}terminate(){this.c_.forEach(t=>t.close()),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter(e=>e===t)}}function pi(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(t){return new $r(t,!0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(t,e,n=1e3,r=1.5,s=6e4){this.Mi=t,this.timerId=e,this.d_=n,this.A_=r,this.R_=s,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),r=Math.max(0,e-n);r>0&&Q("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),t())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wi="PersistentStream";class Ti{constructor(t,e,n,r,s,i,o,a){this.Mi=t,this.S_=n,this.b_=r,this.connection=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new vi(t,e)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}stop(){return c(this,null,function*(){this.x_()&&(yield this.close(0))})}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(t){this.Q_(),this.stream.send(t)}k_(){return c(this,null,function*(){if(this.O_())return this.close(0)})}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}close(t,e){return c(this,null,function*(){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,4!==t?this.M_.reset():e&&e.code===et.RESOURCE_EXHAUSTED?(H(e.toString()),H("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===et.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,yield this.listener.r_(e)})}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([t,n])=>{this.D_===e&&this.G_(t,n)},e=>{t(()=>{const t=new nt(et.UNKNOWN,"Fetching auth token failed: "+e.message);return this.z_(t)})})}G_(t,e){const n=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo(()=>{n(()=>this.listener.Xo())}),this.stream.t_(()=>{n(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(t=>{n(()=>this.z_(t))}),this.stream.onMessage(t=>{n(()=>1==++this.F_?this.J_(t):this.onNext(t))})}N_(){this.state=5,this.M_.p_(()=>c(this,null,function*(){this.state=0,this.start()}))}z_(t){return Q(wi,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget(()=>this.D_===t?e():(Q(wi,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Ei extends Ti{constructor(t,e,n,r,s,i){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,r,i),this.serializer=s}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const s="NO_CHANGE"===(r=e.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:W(39313,{state:r}),i=e.targetChange.targetIds||[],o=function(t,e){return t.useProto3Json?(Z(void 0===e||"string"==typeof e,58123),oe.fromBase64String(e||"")):(Z(void 0===e||e instanceof Buffer||e instanceof Uint8Array,16193),oe.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&function(t){const e=void 0===t.code?et.UNKNOWN:Cr(t.code);return new nt(e,t.message||"")}(a);n=new Vr(s,i,o,u||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=ts(t,r.document.name),i=Xr(r.document.updateTime),o=r.document.createTime?Xr(r.document.createTime):Pt.min(),a=new je({mapValue:{fields:r.document.fields}}),u=ze.newFoundDocument(s,i,o,a),c=r.targetIds||[],l=r.removedTargetIds||[];n=new Mr(c,l,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=ts(t,r.document),i=r.readTime?Xr(r.readTime):Pt.min(),o=ze.newNoDocument(s,i),a=r.removedTargetIds||[];n=new Mr([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=ts(t,r.document),i=r.removedTargetIds||[];n=new Mr([],i,s,null)}else{if(!("filter"in e))return W(11601,{Rt:e});{e.filter;const t=e.filter;t.targetId;const{count:r=0,unchangedNames:s}=t,i=new br(r,s),o=t.targetId;n=new Lr(o,i)}}var r;return n}(this.serializer,t),n=function(t){if(!("targetChange"in t))return Pt.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?Pt.min():e.readTime?Xr(e.readTime):Pt.min()}(t);return this.listener.H_(e,n)}Y_(t){const e={};e.database=ns(this.serializer),e.addTarget=function(t,e){let n;const r=e.target;if(n=pn(r)?{documents:is(t,r)}:{query:os(t,r).ft},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0){n.resumeToken=Qr(t,e.resumeToken);const r=Gr(t,e.expectedCount);null!==r&&(n.expectedCount=r)}else if(e.snapshotVersion.compareTo(Pt.min())>0){n.readTime=Kr(t,e.snapshotVersion.toTimestamp());const r=Gr(t,e.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,t);const n=function(t,e){const n=function(t){switch(t){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return W(28987,{purpose:t})}}(e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,t);n&&(e.labels=n),this.q_(e)}Z_(t){const e={};e.database=ns(this.serializer),e.removeTarget=t,this.q_(e)}}class _i extends Ti{constructor(t,e,n,r,s,i){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,r,i),this.serializer=s}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return Z(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,Z(!t.writeResults||0===t.writeResults.length,55816),this.listener.ta()}onNext(t){Z(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=function(t,e){return t&&t.length>0?(Z(void 0!==e,14353),t.map(t=>function(t,e){let n=t.updateTime?Xr(t.updateTime):Xr(e);return n.isEqual(Pt.min())&&(n=Xr(e)),new sr(n,t.transformResults||[])}(t,e))):[]}(t.writeResults,t.commitTime),n=Xr(t.commitTime);return this.listener.na(n,e)}ra(){const t={};t.database=ns(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map(t=>function(t,e){let n;if(e instanceof fr)n={update:ss(t,e.key,e.value)};else if(e instanceof vr)n={delete:Zr(t,e.key)};else if(e instanceof gr)n={update:ss(t,e.key,e.data),updateMask:ms(e.fieldMask)};else{if(!(e instanceof wr))return W(16599,{Vt:e.type});n={verify:Zr(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(t=>function(t,e){const n=e.transform;if(n instanceof Yn)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Wn)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Zn)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof er)return{fieldPath:e.field.canonicalString(),increment:n.Ae};throw W(20930,{transform:e.transform})}(0,t))),e.precondition.isNone||(n.currentDocument=(r=t,void 0!==(s=e.precondition).updateTime?{updateTime:Hr(r,s.updateTime)}:void 0!==s.exists?{exists:s.exists}:W(27497))),n;var r,s}(this.serializer,t))};this.q_(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{}class Si extends bi{constructor(t,e,n,r){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new nt(et.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,n,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Go(t,Wr(e,n),r,s,i)).catch(t=>{throw"FirebaseError"===t.name?(t.code===et.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new nt(et.UNKNOWN,t.toString())})}Ho(t,e,n,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Ho(t,Wr(e,n),r,i,o,s)).catch(t=>{throw"FirebaseError"===t.name?(t.code===et.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new nt(et.UNKNOWN,t.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class Ii{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(t){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,"Online"===t&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(H(e),this.aa=!1):Q("OnlineStateTracker",e)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ci="RemoteStore";class Ai{constructor(t,e,n,r,s){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=s,this.Aa.Oo(t=>{n.enqueueAndForget(()=>c(this,null,function*(){Vi(this)&&(Q(Ci,"Restarting streams for network reachability change."),yield function(t){return c(this,null,function*(){const e=tt(t);e.Ea.add(4),yield Di(e),e.Ra.set("Unknown"),e.Ea.delete(4),yield Ni(e)})}(this))}))}),this.Ra=new Ii(n,r)}}function Ni(t){return c(this,null,function*(){if(Vi(t))for(const e of t.da)yield e(!0)})}function Di(t){return c(this,null,function*(){for(const e of t.da)yield e(!1)})}function ki(t,e){const n=tt(t);n.Ia.has(e.targetId)||(n.Ia.set(e.targetId,e),Li(n)?Mi(n):to(n).O_()&&xi(n,e))}function Ri(t,e){const n=tt(t),r=to(n);n.Ia.delete(e),r.O_()&&Oi(n,e),0===n.Ia.size&&(r.O_()?r.L_():Vi(n)&&n.Ra.set("Unknown"))}function xi(t,e){if(t.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Pt.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}to(t).Y_(e)}function Oi(t,e){t.Va.Ue(e),to(t).Z_(e)}function Mi(t){t.Va=new Fr({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ia.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),to(t).start(),t.Ra.ua()}function Li(t){return Vi(t)&&!to(t).x_()&&t.Ia.size>0}function Vi(t){return 0===tt(t).Ea.size}function Pi(t){t.Va=void 0}function Fi(t){return c(this,null,function*(){t.Ra.set("Online")})}function Ui(t){return c(this,null,function*(){t.Ia.forEach((e,n)=>{xi(t,e)})})}function qi(t,e){return c(this,null,function*(){Pi(t),Li(t)?(t.Ra.ha(e),Mi(t)):t.Ra.set("Unknown")})}function ji(t,e,n){return c(this,null,function*(){if(t.Ra.set("Online"),e instanceof Vr&&2===e.state&&e.cause)try{yield function(t,e){return c(this,null,function*(){const n=e.cause;for(const r of e.targetIds)t.Ia.has(r)&&(yield t.remoteSyncer.rejectListen(r,n),t.Ia.delete(r),t.Va.removeTarget(r))})}(t,e)}catch(r){Q(Ci,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),yield Bi(t,r)}else if(e instanceof Mr?t.Va.Ze(e):e instanceof Lr?t.Va.st(e):t.Va.tt(e),!n.isEqual(Pt.min()))try{const e=yield Zs(t.localStore);n.compareTo(e)>=0&&(yield function(t,e){const n=t.Va.Tt(e);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=t.Ia.get(r);s&&t.Ia.set(r,s.withResumeToken(n.resumeToken,e))}}),n.targetMismatches.forEach((e,n)=>{const r=t.Ia.get(e);if(!r)return;t.Ia.set(e,r.withResumeToken(oe.EMPTY_BYTE_STRING,r.snapshotVersion)),Oi(t,e);const s=new ys(r.target,e,n,r.sequenceNumber);xi(t,s)}),t.remoteSyncer.applyRemoteEvent(n)}(t,n))}catch(s){Q(Ci,"Failed to raise snapshot:",s),yield Bi(t,s)}})}function Bi(t,e,n){return c(this,null,function*(){if(!$t(e))throw e;t.Ea.add(1),yield Di(t),t.Ra.set("Offline"),n||(n=()=>Zs(t.localStore)),t.asyncQueue.enqueueRetryable(()=>c(null,null,function*(){Q(Ci,"Retrying IndexedDB access"),yield n(),t.Ea.delete(1),yield Ni(t)}))})}function zi(t,e){return e().catch(n=>Bi(t,n,e))}function $i(t){return c(this,null,function*(){const e=tt(t),n=eo(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:-1;for(;Gi(e);)try{const t=yield ti(e.localStore,r);if(null===t){0===e.Ta.length&&n.L_();break}r=t.batchId,Ki(e,t)}catch(s){yield Bi(e,s)}Qi(e)&&Hi(e)})}function Gi(t){return Vi(t)&&t.Ta.length<10}function Ki(t,e){t.Ta.push(e);const n=eo(t);n.O_()&&n.X_&&n.ea(e.mutations)}function Qi(t){return Vi(t)&&!eo(t).x_()&&t.Ta.length>0}function Hi(t){eo(t).start()}function Xi(t){return c(this,null,function*(){eo(t).ra()})}function Yi(t){return c(this,null,function*(){const e=eo(t);for(const n of t.Ta)e.ea(n.mutations)})}function Wi(t,e,n){return c(this,null,function*(){const r=t.Ta.shift(),s=Er.from(r,e,n);yield zi(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),yield $i(t)})}function Ji(t,e){return c(this,null,function*(){e&&eo(t).X_&&(yield function(t,e){return c(this,null,function*(){if(function(t){switch(t){case et.OK:return W(64938);case et.CANCELLED:case et.UNKNOWN:case et.DEADLINE_EXCEEDED:case et.RESOURCE_EXHAUSTED:case et.INTERNAL:case et.UNAVAILABLE:case et.UNAUTHENTICATED:return!1;case et.INVALID_ARGUMENT:case et.NOT_FOUND:case et.ALREADY_EXISTS:case et.PERMISSION_DENIED:case et.FAILED_PRECONDITION:case et.ABORTED:case et.OUT_OF_RANGE:case et.UNIMPLEMENTED:case et.DATA_LOSS:return!0;default:return W(15467,{code:t})}}(n=e.code)&&n!==et.ABORTED){const n=t.Ta.shift();eo(t).B_(),yield zi(t,()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e)),yield $i(t)}var n})}(t,e)),Qi(t)&&Hi(t)})}function Zi(t,e){return c(this,null,function*(){const n=tt(t);n.asyncQueue.verifyOperationInProgress(),Q(Ci,"RemoteStore received new credentials");const r=Vi(n);n.Ea.add(3),yield Di(n),r&&n.Ra.set("Unknown"),yield n.remoteSyncer.handleCredentialChange(e),n.Ea.delete(3),yield Ni(n)})}function to(t){return t.ma||(t.ma=function(t,e,n){const r=tt(t);return r.sa(),new Ei(e,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(t.datastore,t.asyncQueue,{Xo:Fi.bind(null,t),t_:Ui.bind(null,t),r_:qi.bind(null,t),H_:ji.bind(null,t)}),t.da.push(e=>c(null,null,function*(){e?(t.ma.B_(),Li(t)?Mi(t):t.Ra.set("Unknown")):(yield t.ma.stop(),Pi(t))}))),t.ma}function eo(t){return t.fa||(t.fa=function(t,e,n){const r=tt(t);return r.sa(),new _i(e,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(t.datastore,t.asyncQueue,{Xo:()=>Promise.resolve(),t_:Xi.bind(null,t),r_:Ji.bind(null,t),ta:Yi.bind(null,t),na:Wi.bind(null,t)}),t.da.push(e=>c(null,null,function*(){e?(t.fa.B_(),yield $i(t)):(yield t.fa.stop(),t.Ta.length>0&&(Q(Ci,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))}))),t.fa
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class no{constructor(t,e,n,r,s){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new rt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(t=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,r,s){const i=Date.now()+n,o=new no(t,e,i,r,s);return o.start(n),o}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new nt(et.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ro(t,e){if(H("AsyncQueue",`${e}: ${t}`),$t(t))return new nt(et.UNAVAILABLE,`${e}: ${t}`);throw t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{static emptySet(t){return new so(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||It.comparator(e.key,n.key):(t,e)=>It.comparator(t.key,e.key),this.keyedMap=Ln(),this.sortedSet=new Zt(this.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof so))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(!t.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new so;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class io{constructor(){this.ga=new Zt(It.comparator)}track(t){const e=t.doc.key,n=this.ga.get(e);n?0!==t.type&&3===n.type?this.ga=this.ga.insert(e,t):3===t.type&&1!==n.type?this.ga=this.ga.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.ga=this.ga.remove(e):1===t.type&&2===n.type?this.ga=this.ga.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):W(63341,{Rt:t,pa:n}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal((e,n)=>{t.push(n)}),t}}class oo{constructor(t,e,n,r,s,i,o,a,u){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=u}static fromInitialDocuments(t,e,n,r,s){const i=[];return e.forEach(t=>{i.push({type:0,doc:t})}),new oo(t,e,so.emptySet(e),i,n,r,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&In(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let r=0;r<e.length;r++)if(e[r].type!==n[r].type||!e[r].doc.isEqual(n[r].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(t=>t.Da())}}class uo{constructor(){this.queries=co(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(t,e){const n=tt(t),r=n.queries;n.queries=co(),r.forEach((t,n)=>{for(const r of n.Sa)r.onError(e)})}(this,new nt(et.ABORTED,"Firestore shutting down"))}}function co(){return new Rn(t=>Cn(t),In)}function lo(t,e){return c(this,null,function*(){const n=tt(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new ao,r=e.Da()?0:1);try{switch(r){case 0:i.wa=yield n.onListen(s,!0);break;case 1:i.wa=yield n.onListen(s,!1);break;case 2:yield n.onFirstRemoteStoreListen(s)}}catch(o){const t=ro(o,`Initialization of query '${An(e.query)}' failed`);return void e.onError(t)}n.queries.set(s,i),i.Sa.push(e),e.va(n.onlineState),i.wa&&e.Fa(i.wa)&&mo(n)})}function ho(t,e){return c(this,null,function*(){const n=tt(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const t=i.Sa.indexOf(e);t>=0&&(i.Sa.splice(t,1),0===i.Sa.length?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}})}function fo(t,e){const n=tt(t);let r=!1;for(const s of e){const t=s.query,e=n.queries.get(t);if(e){for(const t of e.Sa)t.Fa(s)&&(r=!0);e.wa=s}}r&&mo(n)}function go(t,e,n){const r=tt(t),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(n);r.queries.delete(e)}function mo(t){t.Ca.forEach(t=>{t.next()})}var po,yo;(yo=po||(po={})).Ma="default",yo.Cache="cache";class vo{constructor(t,e,n){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new oo(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache)return!0;if(!this.Da())return!0;const n="Offline"!==e;return(!this.options.qa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||"Offline"===e)}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}ka(t){t=oo.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==po.Cache}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(t){this.key=t}}class To{constructor(t){this.key=t}}class Eo{constructor(t,e){this.query=t,this.Ya=e,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Bn(),this.mutatedKeys=Bn(),this.eu=Dn(t),this.tu=new so(this.eu)}get nu(){return this.Ya}ru(t,e){const n=e?e.iu:new io,r=e?e.tu:this.tu;let s=e?e.mutatedKeys:this.mutatedKeys,i=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,u="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(t.inorderTraversal((t,e)=>{const c=r.get(t),l=Nn(this.query,e)?e:null,h=!!c&&this.mutatedKeys.has(c.key),d=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let f=!1;c&&l?c.data.isEqual(l.data)?h!==d&&(n.track({type:3,doc:l}),f=!0):this.su(c,l)||(n.track({type:2,doc:l}),f=!0,(a&&this.eu(l,a)>0||u&&this.eu(l,u)<0)&&(o=!0)):!c&&l?(n.track({type:0,doc:l}),f=!0):c&&!l&&(n.track({type:1,doc:c}),f=!0,(a||u)&&(o=!0)),f&&(l?(i=i.add(l),s=d?s.add(t):s.delete(t)):(i=i.delete(t),s=s.delete(t)))}),null!==this.query.limit)for(;i.size>this.query.limit;){const t="F"===this.query.limitType?i.last():i.first();i=i.delete(t.key),s=s.delete(t.key),n.track({type:1,doc:t})}return{tu:i,iu:n,Cs:o,mutatedKeys:s}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,r){const s=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const i=t.iu.ya();i.sort((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return W(20277,{Rt:t})}};return n(t)-n(e)}(t.type,e.type)||this.eu(t.doc,e.doc)),this.ou(n),r=null!=r&&r;const o=e&&!r?this._u():[],a=0===this.Xa.size&&this.current&&!r?1:0,u=a!==this.Za;return this.Za=a,0!==i.length||u?{snapshot:new oo(this.query,t.tu,s,i,t.mutatedKeys,0===a,u,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({tu:this.tu,iu:new io,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),t.modifiedDocuments.forEach(t=>{}),t.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=Bn(),this.tu.forEach(t=>{this.uu(t.key)&&(this.Xa=this.Xa.add(t.key))});const e=[];return t.forEach(t=>{this.Xa.has(t)||e.push(new To(t))}),this.Xa.forEach(n=>{t.has(n)||e.push(new wo(n))}),e}cu(t){this.Ya=t.Qs,this.Xa=Bn();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return oo.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Za,this.hasCachedResults)}}const _o="SyncEngine";class bo{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class So{constructor(t){this.key=t,this.hu=!1}}class Io{constructor(t,e,n,r,s,i){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.Pu={},this.Tu=new Rn(t=>Cn(t),In),this.Iu=new Map,this.Eu=new Set,this.du=new Zt(It.comparator),this.Au=new Map,this.Ru=new Ps,this.Vu={},this.mu=new Map,this.fu=Is.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}function Co(t,e,n=!0){return c(this,null,function*(){const r=Qo(t);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=yield No(r,e,n,!0),s})}function Ao(t,e){return c(this,null,function*(){const n=Qo(t);yield No(n,e,!0,!1)})}function No(t,e,n,r){return c(this,null,function*(){const s=yield function(t,e){const n=tt(t);return n.persistence.runTransaction("Allocate target","readwrite",t=>{let r;return n.Pi.getTargetData(t,e).next(s=>s?(r=s,zt.resolve(r)):n.Pi.allocateTargetId(t).next(s=>(r=new ys(e,s,"TargetPurposeListen",t.currentSequenceNumber),n.Pi.addTargetData(t,r).next(()=>r))))}).then(t=>{const r=n.Ms.get(t.targetId);return(null===r||t.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(t.targetId,t),n.xs.set(e,t.targetId)),t})}(t.localStore,_n(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let a;return r&&(a=yield function(t,e,n,r,s){return c(this,null,function*(){t.pu=(e,n,r)=>function(t,e,n,r){return c(this,null,function*(){let s=e.view.ru(n);s.Cs&&(s=yield ni(t.localStore,e.query,!1).then(({documents:t})=>e.view.ru(t,s)));const i=r&&r.targetChanges.get(e.targetId),o=r&&null!=r.targetMismatches.get(e.targetId),a=e.view.applyChanges(s,t.isPrimaryClient,i,o);return jo(t,e.targetId,a.au),a.snapshot})}(t,e,n,r);const i=yield ni(t.localStore,e,!0),o=new Eo(e,i.Qs),a=o.ru(i.documents),u=Or.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==t.onlineState,s),l=o.applyChanges(a,t.isPrimaryClient,u);jo(t,n,l.au);const h=new bo(e,n,o);return t.Tu.set(e,h),t.Iu.has(n)?t.Iu.get(n).push(e):t.Iu.set(n,[e]),l.snapshot})}(t,e,i,"current"===o,s.resumeToken)),t.isPrimaryClient&&n&&ki(t.remoteStore,s),a})}function Do(t,e,n){return c(this,null,function*(){const r=tt(t),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(t=>!In(t,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||(yield ei(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Ri(r.remoteStore,s.targetId),Uo(r,s.targetId)}).catch(Bt))):(Uo(r,s.targetId),yield ei(r.localStore,s.targetId,!0))})}function ko(t,e){return c(this,null,function*(){const n=tt(t),r=n.Tu.get(e),s=n.Iu.get(r.targetId);n.isPrimaryClient&&1===s.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Ri(n.remoteStore,r.targetId))})}function Ro(t,e,n){return c(this,null,function*(){const r=function(t){const e=tt(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Lo.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Vo.bind(null,e),e}(t);try{const t=yield function(t,e){const n=tt(t),r=Vt.now(),s=e.reduce((t,e)=>t.add(e.key),Bn());let i,o;return n.persistence.runTransaction("Locally write mutations","readwrite",t=>{let a=On(),u=Bn();return n.Ns.getEntries(t,s).next(t=>{a=t,a.forEach((t,e)=>{e.isValidDocument()||(u=u.add(t))})}).next(()=>n.localDocuments.getOverlayedDocuments(t,a)).next(s=>{i=s;const o=[];for(const t of e){const e=hr(t,i.get(t.key).overlayedDocument);null!=e&&o.push(new gr(t.key,e,Be(e.value.mapValue),ir.exists(!0)))}return n.mutationQueue.addMutationBatch(t,r,o,e)}).next(e=>{o=e;const r=e.applyToLocalDocumentSet(i,u);return n.documentOverlayCache.saveOverlays(t,e.batchId,r)})}).then(()=>({batchId:o.batchId,changes:Vn(i)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let r=t.Vu[t.currentUser.toKey()];r||(r=new Zt(gt)),r=r.insert(e,n),t.Vu[t.currentUser.toKey()]=r}(r,t.batchId,n),yield $o(r,t.changes),yield $i(r.remoteStore)}catch(s){const t=ro(s,"Failed to persist write");n.reject(t)}})}function xo(t,e){return c(this,null,function*(){const n=tt(t);try{const t=yield function(t,e){const n=tt(t),r=e.snapshotVersion;let s=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",t=>{const i=n.Ns.newChangeBuffer({trackRemovals:!0});s=n.Ms;const o=[];e.targetChanges.forEach((i,a)=>{const u=s.get(a);if(!u)return;o.push(n.Pi.removeMatchingKeys(t,i.removedDocuments,a).next(()=>n.Pi.addMatchingKeys(t,i.addedDocuments,a)));let c=u.withSequenceNumber(t.currentSequenceNumber);var l,h,d;null!==e.targetMismatches.get(a)?c=c.withResumeToken(oe.EMPTY_BYTE_STRING,Pt.min()).withLastLimboFreeSnapshotVersion(Pt.min()):i.resumeToken.approximateByteSize()>0&&(c=c.withResumeToken(i.resumeToken,r)),s=s.insert(a,c),h=c,d=i,(0===(l=u).resumeToken.approximateByteSize()||h.snapshotVersion.toMicroseconds()-l.snapshotVersion.toMicroseconds()>=3e8||d.addedDocuments.size+d.modifiedDocuments.size+d.removedDocuments.size>0)&&o.push(n.Pi.updateTargetData(t,c))});let a=On(),u=Bn();if(e.documentUpdates.forEach(r=>{e.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,r))}),o.push(function(t,e,n){let r=Bn(),s=Bn();return n.forEach(t=>r=r.add(t)),e.getEntries(t,r).next(t=>{let r=On();return n.forEach((n,i)=>{const o=t.get(n);i.isFoundDocument()!==o.isFoundDocument()&&(s=s.add(n)),i.isNoDocument()&&i.version.isEqual(Pt.min())?(e.removeEntry(n,i.readTime),r=r.insert(n,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(e.addEntry(i),r=r.insert(n,i)):Q(Ys,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",i.version)}),{ks:r,qs:s}})}(t,i,e.documentUpdates).next(t=>{a=t.ks,u=t.qs})),!r.isEqual(Pt.min())){const e=n.Pi.getLastRemoteSnapshotVersion(t).next(e=>n.Pi.setTargetsMetadata(t,t.currentSequenceNumber,r));o.push(e)}return zt.waitFor(o).next(()=>i.apply(t)).next(()=>n.localDocuments.getLocalViewOfDocuments(t,a,u)).next(()=>a)}).then(t=>(n.Ms=s,t))}(n.localStore,e);e.targetChanges.forEach((t,e)=>{const r=n.Au.get(e);r&&(Z(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1,22616),t.addedDocuments.size>0?r.hu=!0:t.modifiedDocuments.size>0?Z(r.hu,14607):t.removedDocuments.size>0&&(Z(r.hu,42227),r.hu=!1))}),yield $o(n,t,e)}catch(r){yield Bt(r)}})}function Oo(t,e,n){const r=tt(t);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const t=[];r.Tu.forEach((n,r)=>{const s=r.view.va(e);s.snapshot&&t.push(s.snapshot)}),function(t,e){const n=tt(t);n.onlineState=e;let r=!1;n.queries.forEach((t,n)=>{for(const s of n.Sa)s.va(e)&&(r=!0)}),r&&mo(n)}(r.eventManager,e),t.length&&r.Pu.H_(t),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}function Mo(t,e,n){return c(this,null,function*(){const r=tt(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Au.get(e),i=s&&s.key;if(i){let t=new Zt(It.comparator);t=t.insert(i,ze.newNoDocument(i,Pt.min()));const n=Bn().add(i),s=new xr(Pt.min(),new Map,new Zt(gt),t,n);yield xo(r,s),r.du=r.du.remove(i),r.Au.delete(e),zo(r)}else yield ei(r.localStore,e,!1).then(()=>Uo(r,e,n)).catch(Bt)})}function Lo(t,e){return c(this,null,function*(){const n=tt(t),r=e.batch.batchId;try{const t=yield function(t,e){const n=tt(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",t=>{const r=e.batch.keys(),s=n.Ns.newChangeBuffer({trackRemovals:!0});return function(t,e,n,r){const s=n.batch,i=s.keys();let o=zt.resolve();return i.forEach(t=>{o=o.next(()=>r.getEntry(e,t)).next(e=>{const i=n.docVersions.get(t);Z(null!==i,48541),e.version.compareTo(i)<0&&(s.applyToRemoteDocument(e,n),e.isValidDocument()&&(e.setReadTime(n.commitVersion),r.addEntry(e)))})}),o.next(()=>t.mutationQueue.removeMutationBatch(e,s))}(n,t,e,s).next(()=>s.apply(t)).next(()=>n.mutationQueue.performConsistencyCheck(t)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(t,r,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,function(t){let e=Bn();for(let n=0;n<t.mutationResults.length;++n)t.mutationResults[n].transformResults.length>0&&(e=e.add(t.batch.mutations[n].key));return e}(e))).next(()=>n.localDocuments.getDocuments(t,r))})}(n.localStore,e);Fo(n,r,null),Po(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),yield $o(n,t)}catch(s){yield Bt(s)}})}function Vo(t,e,n){return c(this,null,function*(){const r=tt(t);try{const t=yield function(t,e){const n=tt(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",t=>{let r;return n.mutationQueue.lookupMutationBatch(t,e).next(e=>(Z(null!==e,37113),r=e.keys(),n.mutationQueue.removeMutationBatch(t,e))).next(()=>n.mutationQueue.performConsistencyCheck(t)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(t,r,e)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,r)).next(()=>n.localDocuments.getDocuments(t,r))})}(r.localStore,e);Fo(r,e,n),Po(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),yield $o(r,t)}catch(s){yield Bt(s)}})}function Po(t,e){(t.mu.get(e)||[]).forEach(t=>{t.resolve()}),t.mu.delete(e)}function Fo(t,e,n){const r=tt(t);let s=r.Vu[r.currentUser.toKey()];if(s){const t=s.get(e);t&&(n?t.reject(n):t.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Uo(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Iu.get(e))t.Tu.delete(r),n&&t.Pu.yu(r,n);t.Iu.delete(e),t.isPrimaryClient&&t.Ru.jr(e).forEach(e=>{t.Ru.containsKey(e)||qo(t,e)})}function qo(t,e){t.Eu.delete(e.path.canonicalString());const n=t.du.get(e);null!==n&&(Ri(t.remoteStore,n),t.du=t.du.remove(e),t.Au.delete(n),zo(t))}function jo(t,e,n){for(const r of n)r instanceof wo?(t.Ru.addReference(r.key,e),Bo(t,r)):r instanceof To?(Q(_o,"Document no longer in limbo: "+r.key),t.Ru.removeReference(r.key,e),t.Ru.containsKey(r.key)||qo(t,r.key)):W(19791,{wu:r})}function Bo(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Eu.has(r)||(Q(_o,"New document in limbo: "+n),t.Eu.add(r),zo(t))}function zo(t){for(;t.Eu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Eu.values().next().value;t.Eu.delete(e);const n=new It(_t.fromString(e)),r=t.fu.next();t.Au.set(r,new So(n)),t.du=t.du.insert(n,r),ki(t.remoteStore,new ys(_n(vn(n.path)),r,"TargetPurposeLimboResolution",Gt.ce))}}function $o(t,e,n){return c(this,null,function*(){const r=tt(t),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((t,a)=>{o.push(r.pu(a,e,n).then(t=>{var e;if((t||n)&&r.isPrimaryClient){const s=t?!t.fromCache:null==(e=null==n?void 0:n.targetChanges.get(a.targetId))?void 0:e.current;r.sharedClientState.updateQueryState(a.targetId,s?"current":"not-current")}if(t){s.push(t);const e=Qs.As(a.targetId,t);i.push(e)}}))}),yield Promise.all(o),r.Pu.H_(s),yield function(t,e){return c(this,null,function*(){const n=tt(t);try{yield n.persistence.runTransaction("notifyLocalViewChanges","readwrite",t=>zt.forEach(e,e=>zt.forEach(e.Es,r=>n.persistence.referenceDelegate.addReference(t,e.targetId,r)).next(()=>zt.forEach(e.ds,r=>n.persistence.referenceDelegate.removeReference(t,e.targetId,r)))))}catch(r){if(!$t(r))throw r;Q(Ys,"Failed to update sequence numbers: "+r)}for(const t of e){const e=t.targetId;if(!t.fromCache){const t=n.Ms.get(e),r=t.snapshotVersion,s=t.withLastLimboFreeSnapshotVersion(r);n.Ms=n.Ms.insert(e,s)}}})}(r.localStore,i))})}function Go(t,e){return c(this,null,function*(){const n=tt(t);if(!n.currentUser.isEqual(e)){Q(_o,"User change. New user:",e.toKey());const t=yield Js(n.localStore,e);n.currentUser=e,(r=n).mu.forEach(t=>{t.forEach(t=>{t.reject(new nt(et.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),r.mu.clear(),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),yield $o(n,t.Ls)}var r})}function Ko(t,e){const n=tt(t),r=n.Au.get(e);if(r&&r.hu)return Bn().add(r.key);{let t=Bn();const r=n.Iu.get(e);if(!r)return t;for(const e of r){const r=n.Tu.get(e);t=t.unionWith(r.view.nu)}return t}}function Qo(t){const e=tt(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=xo.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ko.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Mo.bind(null,e),e.Pu.H_=fo.bind(null,e.eventManager),e.Pu.yu=go.bind(null,e.eventManager),e}class Ho{constructor(){this.kind="memory",this.synchronizeTabs=!1}initialize(t){return c(this,null,function*(){this.serializer=yi(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),yield this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)})}Fu(t,e){return null}Mu(t,e){return null}vu(t){return function(t,e,n,r){return new Ws(t,e,n,r)}(this.persistence,new Xs,t.initialUser,this.serializer)}Cu(t){return new zs(Gs.mi,this.serializer)}Du(t){return new si}terminate(){return c(this,null,function*(){var t,e;null==(t=this.gcScheduler)||t.stop(),null==(e=this.indexBackfillerScheduler)||e.stop(),this.sharedClientState.shutdown(),yield this.persistence.shutdown()})}}Ho.provider={build:()=>new Ho};class Xo extends Ho{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){Z(this.persistence.referenceDelegate instanceof Ks,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Ds(n,t.asyncQueue,e)}Cu(t){const e=void 0!==this.cacheSizeBytes?Ss.withCacheSize(this.cacheSizeBytes):Ss.DEFAULT;return new zs(t=>Ks.mi(t,e),this.serializer)}}class Yo{initialize(t,e){return c(this,null,function*(){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>Oo(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=Go.bind(null,this.syncEngine),yield function(t,e){return c(this,null,function*(){const n=tt(t);e?(n.Ea.delete(2),yield Ni(n)):e||(n.Ea.add(2),yield Di(n),n.Ra.set("Unknown"))})}(this.remoteStore,this.syncEngine.isPrimaryClient))})}createEventManager(t){return new uo}createDatastore(t){const e=yi(t.databaseInfo.databaseId),n=(r=t.databaseInfo,new mi(r));var r;return function(t,e,n,r){return new Si(t,e,n,r)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,r=t.asyncQueue,s=t=>Oo(this.syncEngine,t,0),i=ai.v()?new ai:new ii,new Ai(e,n,r,s,i);var e,n,r,s,i}createSyncEngine(t,e){return function(t,e,n,r,s,i,o){const a=new Io(t,e,n,r,s,i);return o&&(a.gu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return c(this,null,function*(){var t,e;yield function(t){return c(this,null,function*(){const e=tt(t);Q(Ci,"RemoteStore shutting down."),e.Ea.add(5),yield Di(e),e.Aa.shutdown(),e.Ra.set("Unknown")})}(this.remoteStore),null==(t=this.datastore)||t.terminate(),null==(e=this.eventManager)||e.terminate()})}}Yo.provider={build:()=>new Yo};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Wo{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):H("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout(()=>{this.muted||t(e)},0)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jo="FirestoreClient";class Zo{constructor(t,e,n,r,s){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=r,this.user=z.UNAUTHENTICATED,this.clientId=ft.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,t=>c(this,null,function*(){Q(Jo,"Received user=",t.uid),yield this.authCredentialListener(t),this.user=t})),this.appCheckCredentials.start(n,t=>(Q(Jo,"Received new app check token=",t),this.appCheckCredentialListener(t,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new rt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(()=>c(this,null,function*(){try{this._onlineComponents&&(yield this._onlineComponents.terminate()),this._offlineComponents&&(yield this._offlineComponents.terminate()),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=ro(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}function ta(t,e){return c(this,null,function*(){t.asyncQueue.verifyOperationInProgress(),Q(Jo,"Initializing OfflineComponentProvider");const n=t.configuration;yield e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(t=>c(null,null,function*(){r.isEqual(t)||(yield Js(e.localStore,t),r=t)})),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e})}function ea(t,e){return c(this,null,function*(){t.asyncQueue.verifyOperationInProgress();const n=yield function(t){return c(this,null,function*(){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){Q(Jo,"Using user provided OfflineComponentProvider");try{yield ta(t,t._uninitializedComponentsProvider._offline)}catch(e){const s=e;if(!("FirebaseError"===(n=s).name?n.code===et.FAILED_PRECONDITION||n.code===et.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&n instanceof DOMException)||22===n.code||20===n.code||11===n.code))throw s;X("Error using user provided cache. Falling back to memory cache: "+s),yield ta(t,new Ho)}}else Q(Jo,"Using default OfflineComponentProvider"),yield ta(t,new Xo(void 0));var n;return t._offlineComponents})}(t);Q(Jo,"Initializing OnlineComponentProvider"),yield e.initialize(n,t.configuration),t.setCredentialChangeListener(t=>Zi(e.remoteStore,t)),t.setAppCheckTokenChangeListener((t,n)=>Zi(e.remoteStore,n)),t._onlineComponents=e})}function na(t){return c(this,null,function*(){return t._onlineComponents||(t._uninitializedComponentsProvider?(Q(Jo,"Using user provided OnlineComponentProvider"),yield ea(t,t._uninitializedComponentsProvider._online)):(Q(Jo,"Using default OnlineComponentProvider"),yield ea(t,new Yo))),t._onlineComponents})}function ra(t){return c(this,null,function*(){const e=yield na(t),n=e.eventManager;return n.onListen=Co.bind(null,e.syncEngine),n.onUnlisten=Do.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=Ao.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=ko.bind(null,e.syncEngine),n})}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function sa(t){const e={};return void 0!==t.timeoutSeconds&&(e.timeoutSeconds=t.timeoutSeconds),e
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const ia=new Map,oa="firestore.googleapis.com",aa=!0;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{constructor(t){var e,n;if(void 0===t.host){if(void 0!==t.ssl)throw new nt(et.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=oa,this.ssl=aa}else this.host=t.host,this.ssl=null!=(e=t.ssl)?e:aa;if(this.isUsingEmulator=void 0!==t.emulatorOptions,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,void 0===t.cacheSizeBytes)this.cacheSizeBytes=bs;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new nt(et.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}(function(t,e,n,r){if(!0===e&&!0===r)throw new nt(et.INVALID_ARGUMENT,"experimentalForceLongPolling and experimentalAutoDetectLongPolling cannot be used together.")})(0,t.experimentalForceLongPolling,0,t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===t.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=sa(null!=(n=t.experimentalLongPollingOptions)?n:{}),function(t){if(void 0!==t.timeoutSeconds){if(isNaN(t.timeoutSeconds))throw new nt(et.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (must not be NaN)`);if(t.timeoutSeconds<5)throw new nt(et.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (minimum allowed value is 5)`);if(t.timeoutSeconds>30)throw new nt(et.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(e=this.experimentalLongPollingOptions,n=t.experimentalLongPollingOptions,e.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams;var e,n}}class ca{constructor(t,e,n,r){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ua({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new nt(et.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new nt(et.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ua(t),this._emulatorOptions=t.emulatorOptions||{},void 0!==t.credentials&&(this._authCredentials=function(t){if(!t)return new it;switch(t.type){case"firstParty":return new ct(t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new nt(et.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}_restart(){return c(this,null,function*(){"notTerminated"===this._terminateTask?yield this._terminate():this._terminateTask="notTerminated"})}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=ia.get(t);e&&(Q("ComponentProvider","Removing Datastore"),ia.delete(t),e.terminate())}(this),Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class la{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new la(this.firestore,t,this._query)}}class ha{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new da(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ha(this.firestore,t,this._key)}toJSON(){return{type:ha._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,n){if(Ot(e,ha._jsonSchema))return new ha(t,n||null,new It(_t.fromString(e.referencePath)))}}ha._jsonSchemaVersion="firestore/documentReference/1.0",ha._jsonSchema={type:xt("string",ha._jsonSchemaVersion),referencePath:xt("string")};class da extends la{constructor(t,e,n){super(t,e,vn(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new ha(this.firestore,null,new It(t))}withConverter(t){return new da(this.firestore,t,this._path)}}function fa(t,e,...n){if(t=l(t),Ct("collection","path",e),t instanceof ca){const r=_t.fromString(e,...n);return Nt(r),new da(t,null,r)}{if(!(t instanceof ha||t instanceof da))throw new nt(et.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(_t.fromString(e,...n));return Nt(r),new da(t.firestore,null,r)}}function ga(t,e,...n){if(t=l(t),1===arguments.length&&(e=ft.newId()),Ct("doc","path",e),t instanceof ca){const r=_t.fromString(e,...n);return At(r),new ha(t,null,new It(r))}{if(!(t instanceof ha||t instanceof da))throw new nt(et.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(_t.fromString(e,...n));return At(r),new ha(t.firestore,t instanceof da?t.converter:null,new It(r))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma="AsyncQueue";class pa{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new vi(this,"async_queue_retry"),this._c=()=>{const t=pi();t&&Q(ma,"Visibility state changed to "+t.visibilityState),this.M_.w_()},this.ac=t;const e=pi();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=pi();e&&"function"==typeof e.removeEventListener&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise(()=>{});const e=new rt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Xu.push(t),this.lc()))}lc(){return c(this,null,function*(){if(0!==this.Xu.length){try{yield this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!$t(t))throw t;Q(ma,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}})}cc(t){const e=this.ac.then(()=>(this.rc=!0,t().catch(t=>{throw this.nc=t,this.rc=!1,H("INTERNAL UNHANDLED ERROR: ",ya(t)),t}).then(t=>(this.rc=!1,t))));return this.ac=e,e}enqueueAfterDelay(t,e,n){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const r=no.createAndSchedule(this,t,e,n,t=>this.hc(t));return this.tc.push(r),r}uc(){this.nc&&W(47125,{Pc:ya(this.nc)})}verifyOperationInProgress(){}Tc(){return c(this,null,function*(){let t;do{t=this.ac,yield t}while(t!==this.ac)})}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then(()=>{this.tc.sort((t,e)=>t.targetTimeMs-e.targetTimeMs);for(const e of this.tc)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.Tc()})}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function ya(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}function va(t){return function(t){if("object"!=typeof t||null===t)return!1;const e=t;for(const n of["next","error","complete"])if(n in e&&"function"==typeof e[n])return!0;return!1}(t)}class wa extends ca{constructor(t,e,n,r){super(t,e,n,r),this.type="firestore",this._queue=new pa,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}_terminate(){return c(this,null,function*(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new pa(t),this._firestoreClient=void 0,yield t}})}}function Ta(t,e){const n="object"==typeof t?t:h(),r="string"==typeof t?t:we,s=d(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const t=f("firestore");t&&function(t,e,n,r={}){var s;t=Rt(t,ca);const i=m(e),o=t._getSettings(),c=u(a({},o),{emulatorOptions:t._getEmulatorOptions()}),l=`${e}:${n}`;i&&(p(`https://${l}`),y("Firestore",!0)),o.host!==oa&&o.host!==l&&X("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=u(a({},o),{host:l,ssl:i,emulatorOptions:r});if(!v(h,c)&&(t._setSettings(h),r.mockUserToken)){let e,n;if("string"==typeof r.mockUserToken)e=r.mockUserToken,n=z.MOCK_USER;else{e=w(r.mockUserToken,null==(s=t._app)?void 0:s.options.projectId);const i=r.mockUserToken.sub||r.mockUserToken.user_id;if(!i)throw new nt(et.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new z(i)}t._authCredentials=new ot(new st(e,n))}}(s,...t)}return s}function Ea(t){if(t._terminated)throw new nt(et.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||function(t){var e,n,r;const s=t._freezeSettings(),i=(o=t._databaseId,a=(null==(e=t._app)?void 0:e.options.appId)||"",u=t._persistenceKey,new ve(o,a,u,(c=s).host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,sa(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator));var o,a,u,c;t._componentsProvider||(null==(n=s.localCache)?void 0:n._offlineComponentProvider)&&(null==(r=s.localCache)?void 0:r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new Zo(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(t){const e=null==t?void 0:t._online.build();return{_offline:null==t?void 0:t._offline.build(e),_online:e}}(t._componentsProvider))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t),t._firestoreClient}class _a{constructor(t){this._byteString=t}static fromBase64String(t){try{return new _a(oe.fromBase64String(t))}catch(e){throw new nt(et.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new _a(oe.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:_a._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(Ot(t,_a._jsonSchema))return _a.fromBase64String(t.bytes)}}_a._jsonSchemaVersion="firestore/bytes/1.0",_a._jsonSchema={type:xt("string",_a._jsonSchemaVersion),bytes:xt("string")};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ba{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new nt(et.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new St(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(t){this._methodName=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new nt(et.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new nt(et.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return gt(this._lat,t._lat)||gt(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ia._jsonSchemaVersion}}static fromJSON(t){if(Ot(t,Ia._jsonSchema))return new Ia(t.latitude,t.longitude)}}Ia._jsonSchemaVersion="firestore/geoPoint/1.0",Ia._jsonSchema={type:xt("string",Ia._jsonSchemaVersion),latitude:xt("number"),longitude:xt("number")};
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ca{constructor(t){this._values=(t||[]).map(t=>t)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;++n)if(t[n]!==e[n])return!1;return!0}(this._values,t._values)}toJSON(){return{type:Ca._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(Ot(t,Ca._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(t=>"number"==typeof t))return new Ca(t.vectorValues);throw new nt(et.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ca._jsonSchemaVersion="firestore/vectorValue/1.0",Ca._jsonSchema={type:xt("string",Ca._jsonSchemaVersion),vectorValues:xt("object")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Aa=/^__.*__$/;class Na{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new gr(t,this.data,this.fieldMask,e,this.fieldTransforms):new fr(t,this.data,e,this.fieldTransforms)}}class Da{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new gr(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function ka(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw W(40011,{Ac:t})}}class Ra{constructor(t,e,n,r,s,i){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===s&&this.Rc(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new Ra(a(a({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){var e;const n=null==(e=this.path)?void 0:e.child(t),r=this.Vc({path:n,fc:!1});return r.gc(t),r}yc(t){var e;const n=null==(e=this.path)?void 0:e.child(t),r=this.Vc({path:n,fc:!1});return r.Rc(),r}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return za(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return void 0!==this.fieldMask.find(e=>t.isPrefixOf(e))||void 0!==this.fieldTransforms.find(e=>t.isPrefixOf(e.field))}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(0===t.length)throw this.Sc("Document fields must not be empty");if(ka(this.Ac)&&Aa.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class xa{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||yi(t)}Cc(t,e,n,r=!1){return new Ra({Ac:t,methodName:e,Dc:n,path:St.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Oa(t){const e=t._freezeSettings(),n=yi(t._databaseId);return new xa(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Ma(t,e,n,r,s,i={}){const o=t.Cc(i.merge||i.mergeFields?2:0,e,n,s);Ua("Data must be an object, but it was:",o,r);const a=Pa(r,o);let u,c;if(i.merge)u=new se(o.fieldMask),c=o.fieldTransforms;else if(i.mergeFields){const t=[];for(const r of i.mergeFields){const s=qa(e,r,n);if(!o.contains(s))throw new nt(et.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);$a(t,s)||t.push(s)}u=new se(t),c=o.fieldTransforms.filter(t=>u.covers(t.field))}else u=null,c=o.fieldTransforms;return new Na(new je(a),u,c)}class La extends Sa{_toFieldTransform(t){if(2!==t.Ac)throw 1===t.Ac?t.Sc(`${this._methodName}() can only appear at the top level of your update data`):t.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof La}}function Va(t,e){if(Fa(t=l(t)))return Ua("Unsupported field value:",e,t),Pa(t,e);if(t instanceof Sa)return function(t,e){if(!ka(e.Ac))throw e.Sc(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.Sc(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.fc&&4!==e.Ac)throw e.Sc("Nested arrays are not supported");return function(t,e){const n=[];let r=0;for(const s of t){let t=Va(s,e.wc(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=l(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return function(t,e){return function(t){return"number"==typeof t&&Number.isInteger(t)&&!Qt(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)?Gn(e):$n(t,e)}(e.serializer,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=Vt.fromDate(t);return{timestampValue:Kr(e.serializer,n)}}if(t instanceof Vt){const n=new Vt(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Kr(e.serializer,n)}}if(t instanceof Ia)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof _a)return{bytesValue:Qr(e.serializer,t._byteString)};if(t instanceof ha){const n=e.databaseId,r=t.firestore._databaseId;if(!r.isEqual(n))throw e.Sc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Yr(t.firestore._databaseId||e.databaseId,t._key.path)}}if(t instanceof Ca)return n=t,r=e,{mapValue:{fields:{[Ee]:{stringValue:be},[Se]:{arrayValue:{values:n.toArray().map(t=>{if("number"!=typeof t)throw r.Sc("VectorValues must only contain numeric values.");return $n(r.serializer,t)})}}}}};var n,r;throw e.Sc(`Unsupported field value: ${kt(t)}`)}(t,e)}function Pa(t,e){const n={};return Jt(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Wt(t,(t,r)=>{const s=Va(r,e.mc(t));null!=s&&(n[t]=s)}),{mapValue:{fields:n}}}function Fa(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof Vt||t instanceof Ia||t instanceof _a||t instanceof ha||t instanceof Sa||t instanceof Ca)}function Ua(t,e,n){if(!Fa(n)||!Dt(n)){const r=kt(n);throw"an object"===r?e.Sc(t+" a custom object"):e.Sc(t+" "+r)}}function qa(t,e,n){if((e=l(e))instanceof ba)return e._internalPath;if("string"==typeof e)return Ba(t,e);throw za("Field path arguments must be of type string or ",t,!1,void 0,n)}const ja=new RegExp("[~\\*/\\[\\]]");function Ba(t,e,n){if(e.search(ja)>=0)throw za(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new ba(...e.split("."))._internalPath}catch(r){throw za(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function za(t,e,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new nt(et.INVALID_ARGUMENT,a+t+u)}function $a(t,e){return t.some(t=>t.isEqual(e))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(t,e,n,r,s){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new ha(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new Ka(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Qa("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class Ka extends Ga{data(){return super.data()}}function Qa(t,e){return"string"==typeof e?Ba(t,e):e instanceof ba?e._internalPath:e._delegate._internalPath}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ha(t){if("L"===t.limitType&&0===t.explicitOrderBy.length)throw new nt(et.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Xa{}class Ya extends Xa{}function Wa(t,e,...n){let r=[];e instanceof Xa&&r.push(e),r=r.concat(n),function(t){const e=t.filter(t=>t instanceof tu).length,n=t.filter(t=>t instanceof Ja).length;if(e>1||e>0&&n>0)throw new nt(et.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class Ja extends Ya{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new Ja(t,e,n)}_apply(t){const e=this._parse(t);return au(t._query,e),new la(t.firestore,t.converter,bn(t._query,e))}_parse(t){const e=Oa(t.firestore),n=function(t,e,n,r,s,i,o){let a;if(s.isKeyField()){if("array-contains"===i||"array-contains-any"===i)throw new nt(et.INVALID_ARGUMENT,`Invalid Query. You can't perform '${i}' queries on documentId().`);if("in"===i||"not-in"===i){ou(o,i);const e=[];for(const n of o)e.push(iu(r,t,n));a={arrayValue:{values:e}}}else a=iu(r,t,o)}else"in"!==i&&"not-in"!==i&&"array-contains-any"!==i||ou(o,i),a=function(t,e,n,r=!1){return Va(n,t.Cc(r?4:3,e))}(n,"where",o,"in"===i||"not-in"===i);return Ye.create(s,i,a)}(t._query,0,e,t.firestore._databaseId,this._field,this._op,this._value);return n}}function Za(t,e,n){const r=e,s=Qa("where",t);return Ja._create(s,r,n)}class tu extends Xa{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new tu(t,e)}_parse(t){const e=this._queryConstraints.map(e=>e._parse(t)).filter(t=>t.getFilters().length>0);return 1===e.length?e[0]:We.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return 0===e.getFilters().length?t:(function(t,e){let n=t;const r=e.getFlattenedFilters();for(const s of r)au(n,s),n=bn(n,s)}(t._query,e),new la(t.firestore,t.converter,bn(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class eu extends Ya{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new eu(t,e)}_apply(t){const e=function(t,e,n){if(null!==t.startAt)throw new nt(et.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==t.endAt)throw new nt(et.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Qe(e,n)}(t._query,this._field,this._direction);return new la(t.firestore,t.converter,function(t,e){const n=t.explicitOrderBy.concat([e]);return new yn(t.path,t.collectionGroup,n,t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(t._query,e))}}function nu(t,e="asc"){const n=e,r=Qa("orderBy",t);return eu._create(r,n)}class ru extends Ya{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new ru(t,e,n)}_apply(t){return new la(t.firestore,t.converter,Sn(t._query,this._limit,this._limitType))}}function su(t){return ru._create("limit",t,"F")}function iu(t,e,n){if("string"==typeof(n=l(n))){if(""===n)throw new nt(et.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Tn(e)&&-1!==n.indexOf("/"))throw new nt(et.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(_t.fromString(n));if(!It.isDocumentKey(r))throw new nt(et.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Me(t,new It(r))}if(n instanceof ha)return Me(t,n._key);throw new nt(et.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${kt(n)}.`)}function ou(t,e){if(!Array.isArray(t)||0===t.length)throw new nt(et.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function au(t,e){const n=function(t,e){for(const n of t)for(const t of n.getFlattenedFilters())if(e.indexOf(t.op)>=0)return t.op;return null}(t.filters,function(t){switch(t){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(null!==n)throw n===e.op?new nt(et.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new nt(et.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class uu{convertValue(t,e="none"){switch(Ie(t)){case 0:return null;case 1:return t.booleanValue;case 2:return ce(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(le(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw W(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Wt(t,(t,r)=>{n[t]=this.convertValue(r,e)}),n}convertVectorValue(t){var e,n,r;const s=null==(r=null==(n=null==(e=t.fields)?void 0:e[Se].arrayValue)?void 0:n.values)?void 0:r.map(t=>ce(t.doubleValue));return new Ca(s)}convertGeoPoint(t){return new Ia(ce(t.latitude),ce(t.longitude))}convertArray(t,e){return(t.values||[]).map(t=>this.convertValue(t,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=pe(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(ye(t));default:return null}}convertTimestamp(t){const e=ue(t);return new Vt(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=_t.fromString(t);Z(ps(n),9688,{name:t});const r=new Te(n.get(1),n.get(3)),s=new It(n.popFirst(5));return r.isEqual(e)||H(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),s}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cu(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class lu{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class hu extends Ga{constructor(t,e,n,r,s,i){super(t,e,n,r,i),this._firestore=t,this._firestoreImpl=t,this.metadata=s}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new du(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Qa("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new nt(et.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=hu._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),t&&t.isValidDocument()&&t.isFoundDocument()?(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e):e}}hu._jsonSchemaVersion="firestore/documentSnapshot/1.0",hu._jsonSchema={type:xt("string",hu._jsonSchemaVersion),bundleSource:xt("string","DocumentSnapshot"),bundleName:xt("string"),bundle:xt("string")};class du extends hu{data(t={}){return super.data(t)}}class fu{constructor(t,e,n,r){this._firestore=t,this._userDataWriter=e,this._snapshot=r,this.metadata=new lu(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new du(this._firestore,this._userDataWriter,n.key,n,new lu(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new nt(et.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(t,e){if(t._snapshot.oldDocs.isEmpty()){let e=0;return t._snapshot.docChanges.map(n=>{const r=new du(t._firestore,t._userDataWriter,n.doc.key,n.doc,new lu(t._snapshot.mutatedKeys.has(n.doc.key),t._snapshot.fromCache),t.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:e++}})}{let n=t._snapshot.oldDocs;return t._snapshot.docChanges.filter(t=>e||3!==t.type).map(e=>{const r=new du(t._firestore,t._userDataWriter,e.doc.key,e.doc,new lu(t._snapshot.mutatedKeys.has(e.doc.key),t._snapshot.fromCache),t.query.converter);let s=-1,i=-1;return 0!==e.type&&(s=n.indexOf(e.doc.key),n=n.delete(e.doc.key)),1!==e.type&&(n=n.add(e.doc),i=n.indexOf(e.doc.key)),{type:gu(e.type),doc:r,oldIndex:s,newIndex:i}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new nt(et.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=fu._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=ft.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],n=[],r=[];return this.docs.forEach(t=>{null!==t._document&&(e.push(t._document),n.push(this._userDataWriter.convertObjectMap(t._document.data.value.mapValue.fields,"previous")),r.push(t.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function gu(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return W(61501,{type:t})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mu(t){t=Rt(t,ha);const e=Rt(t.firestore,wa);return function(t,e,n={}){const r=new rt;return t.asyncQueue.enqueueAndForget(()=>c(null,null,function*(){return function(t,e,n,r,s){const i=new Wo({next:a=>{i.Nu(),e.enqueueAndForget(()=>ho(t,o));const u=a.docs.has(n);!u&&a.fromCache?s.reject(new nt(et.UNAVAILABLE,"Failed to get document because the client is offline.")):u&&a.fromCache&&r&&"server"===r.source?s.reject(new nt(et.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(a)},error:t=>s.reject(t)}),o=new vo(vn(n.path),i,{includeMetadataChanges:!0,qa:!0});return lo(t,o)}(yield ra(t),t.asyncQueue,e,n,r)})),r.promise}(Ea(e),t._key).then(n=>Su(e,t,n))}fu._jsonSchemaVersion="firestore/querySnapshot/1.0",fu._jsonSchema={type:xt("string",fu._jsonSchemaVersion),bundleSource:xt("string","QuerySnapshot"),bundleName:xt("string"),bundle:xt("string")};class pu extends uu{constructor(t){super(),this.firestore=t}convertBytes(t){return new _a(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ha(this.firestore,null,e)}}function yu(t){t=Rt(t,la);const e=Rt(t.firestore,wa),n=Ea(e),r=new pu(e);return Ha(t._query),function(t,e,n={}){const r=new rt;return t.asyncQueue.enqueueAndForget(()=>c(null,null,function*(){return function(t,e,n,r,s){const i=new Wo({next:n=>{i.Nu(),e.enqueueAndForget(()=>ho(t,o)),n.fromCache&&"server"===r.source?s.reject(new nt(et.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:t=>s.reject(t)}),o=new vo(n,i,{includeMetadataChanges:!0,qa:!0});return lo(t,o)}(yield ra(t),t.asyncQueue,e,n,r)})),r.promise}(n,t._query).then(n=>new fu(e,r,t,n))}function vu(t,e,n){t=Rt(t,ha);const r=Rt(t.firestore,wa),s=cu(t.converter,e,n);return bu(r,[Ma(Oa(r),"setDoc",t._key,s,null!==t.converter,n).toMutation(t._key,ir.none())])}function wu(t,e,n,...r){t=Rt(t,ha);const s=Rt(t.firestore,wa),i=Oa(s);let o;return o="string"==typeof(e=l(e))||e instanceof ba?function(t,e,n,r,s,i){const o=t.Cc(1,e,n),a=[qa(e,r,n)],u=[s];if(i.length%2!=0)throw new nt(et.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let l=0;l<i.length;l+=2)a.push(qa(e,i[l])),u.push(i[l+1]);const c=[],h=je.empty();for(let f=a.length-1;f>=0;--f)if(!$a(c,a[f])){const t=a[f];let e=u[f];e=l(e);const n=o.yc(t);if(e instanceof La)c.push(t);else{const r=Va(e,n);null!=r&&(c.push(t),h.set(t,r))}}const d=new se(c);return new Da(h,d,o.fieldTransforms)}(i,"updateDoc",t._key,e,n,r):function(t,e,n,r){const s=t.Cc(1,e,n);Ua("Data must be an object, but it was:",s,r);const i=[],o=je.empty();Wt(r,(t,r)=>{const a=Ba(e,t,n);r=l(r);const u=s.yc(a);if(r instanceof La)i.push(a);else{const t=Va(r,u);null!=t&&(i.push(a),o.set(a,t))}});const a=new se(i);return new Da(o,a,s.fieldTransforms)}(i,"updateDoc",t._key,e),bu(s,[o.toMutation(t._key,ir.exists(!0))])}function Tu(t){return bu(Rt(t.firestore,wa),[new vr(t._key,ir.none())])}function Eu(t,e){const n=Rt(t.firestore,wa),r=ga(t),s=cu(t.converter,e);return bu(n,[Ma(Oa(t.firestore),"addDoc",r._key,s,null!==t.converter,{}).toMutation(r._key,ir.exists(!1))]).then(()=>r)}function _u(t,...e){var n,r,s;t=l(t);let i={includeMetadataChanges:!1,source:"default"},o=0;"object"!=typeof e[o]||va(e[o])||(i=e[o++]);const a={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(va(e[o])){const t=e[o];e[o]=null==(n=t.next)?void 0:n.bind(t),e[o+1]=null==(r=t.error)?void 0:r.bind(t),e[o+2]=null==(s=t.complete)?void 0:s.bind(t)}let u,h,d;if(t instanceof ha)h=Rt(t.firestore,wa),d=vn(t._key.path),u={next:n=>{e[o]&&e[o](Su(h,t,n))},error:e[o+1],complete:e[o+2]};else{const n=Rt(t,la);h=Rt(n.firestore,wa),d=n._query;const r=new pu(h);u={next:t=>{e[o]&&e[o](new fu(h,r,n,t))},error:e[o+1],complete:e[o+2]},Ha(t._query)}return function(t,e,n,r){const s=new Wo(r),i=new vo(e,s,n);return t.asyncQueue.enqueueAndForget(()=>c(null,null,function*(){return lo(yield ra(t),i)})),()=>{s.Nu(),t.asyncQueue.enqueueAndForget(()=>c(null,null,function*(){return ho(yield ra(t),i)}))}}(Ea(h),d,a,u)}function bu(t,e){return function(t,e){const n=new rt;return t.asyncQueue.enqueueAndForget(()=>c(null,null,function*(){return Ro(yield function(t){return na(t).then(t=>t.syncEngine)}(t),e,n)})),n.promise}(Ea(t),e)}function Su(t,e,n){const r=n.docs.get(e._key),s=new pu(t);return new hu(t,s,e._key,r,new lu(n.hasPendingWrites,n.fromCache),e.converter)}!function(t,e=!0){$=S,I(new C("firestore",(t,{instanceIdentifier:n,options:r})=>{const s=t.getProvider("app").getImmediate(),i=new wa(new at(t.getProvider("auth-internal")),new ht(s,t.getProvider("app-check-internal")),function(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new nt(et.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Te(t.options.projectId,e)}(s,n),s);return r=a({useFetchStreams:e},r),i._setSettings(r),i},"PUBLIC").setMultipleInstances(!0)),A(j,B,t),A(j,B,"esm2020")}();export{_u as a,Eu as b,fa as c,ga as d,mu as e,Ta as f,yu as g,Tu as h,su as l,nu as o,Wa as q,vu as s,wu as u,Za as w};
