var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,i=Object.getPrototypeOf,s=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,a=Reflect.get,u=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,c=(e,t,n)=>a(i(e),n,t),l=(e,t,n)=>new Promise((r,i)=>{var s=e=>{try{a(n.next(e))}catch(t){i(t)}},o=e=>{try{a(n.throw(e))}catch(t){i(t)}},a=e=>e.done?r(e.value):Promise.resolve(e.value).then(s,o);a((n=n.apply(e,t)).next())}),h={};
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
const d=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},f={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const t=e[i],s=i+1<e.length,o=s?e[i+1]:0,a=i+2<e.length,u=a?e[i+2]:0,c=t>>2,l=(3&t)<<4|o>>4;let h=(15&o)<<2|u>>6,d=63&u;a||(d=64,s||(h=64)),r.push(n[c],n[l],n[h],n[d])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(d(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){const s=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(s>>10)),t[r++]=String.fromCharCode(56320+(1023&s))}else{const s=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],s=i<e.length?n[e.charAt(i)]:0;++i;const o=i<e.length?n[e.charAt(i)]:64;++i;const a=i<e.length?n[e.charAt(i)]:64;if(++i,null==t||null==s||null==o||null==a)throw new p;const u=t<<2|s>>4;if(r.push(u),64!==o){const e=s<<4&240|o>>2;if(r.push(e),64!==a){const e=o<<6&192|a;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class p extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const m=function(e){return function(e){const t=d(e);return f.encodeByteArray(t,!0)}(e).replace(/\./g,"")},g=function(e){try{return f.decodeString(e,!0)}catch(t){}return null},y=()=>{try{
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
return function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}
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
 */().__FIREBASE_DEFAULTS__||(()=>{if("undefined"==typeof process)return;const e=h.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&g(e[1]);return t&&JSON.parse(t)})()}catch(e){return}},v=e=>{var t,n;return null===(n=null===(t=y())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]},w=()=>{var e;return null===(e=y())||void 0===e?void 0:e.config},_=e=>{var t;return null===(t=y())||void 0===t?void 0:t[`_${e}`]};
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
class I{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
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
function b(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function T(){return!function(){var e;const t=null===(e=y())||void 0===e?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(n){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function E(){try{return"object"==typeof indexedDB}catch(e){return!1}}class S extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,S.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,C.prototype.create)}}class C{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?function(e,t){return e.replace(k,(e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`})}(i,n):"Error",o=`${this.serviceName}: ${s} (${r}).`;return new S(r,o,n)}}const k=/\{\$([^}]+)}/g;function A(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],s=t[i];if(N(n)&&N(s)){if(!A(n,s))return!1}else if(n!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function N(e){return null!==e&&"object"==typeof e}
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
 */function D(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function x(e){const t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function R(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}class O{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=function(e){if("object"!=typeof e||null===e)return!1;for(const t of["next","error","complete"])if(t in e&&"function"==typeof e[t])return!0;return!1}(e)?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=P),void 0===r.error&&(r.error=P),void 0===r.complete&&(r.complete=P);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!=typeof console&&console.error}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function P(){}
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
 */function L(e){return e&&e._delegate?e._delegate:e}class M{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
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
 */const V="[DEFAULT]";
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
 */class F{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new I;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
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
 */(e))try{this.getOrInitializeService({instanceIdentifier:V})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});n.resolve(e)}catch(t){}}}}clearInstance(e=V){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}delete(){return l(this,null,function*(){const e=Array.from(this.instances.values());yield Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])})}isComponentSet(){return null!=this.component}isInitialized(e=V){return this.instances.has(e)}getOptions(e=V){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,s]of this.instancesDeferred.entries())n===this.normalizeInstanceIdentifier(i)&&s.resolve(r);return r}onInit(e,t){var n;const r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch(r){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=e,r===V?void 0:r),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(i){}var r;return n||null}normalizeInstanceIdentifier(e=V){return this.component?this.component.multipleInstances?e:V:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class U{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new F(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
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
 */var B,j;(j=B||(B={}))[j.DEBUG=0]="DEBUG",j[j.VERBOSE=1]="VERBOSE",j[j.INFO=2]="INFO",j[j.WARN=3]="WARN",j[j.ERROR=4]="ERROR",j[j.SILENT=5]="SILENT";const q={debug:B.DEBUG,verbose:B.VERBOSE,info:B.INFO,warn:B.WARN,error:B.ERROR,silent:B.SILENT},z=B.INFO,K={[B.DEBUG]:"log",[B.VERBOSE]:"log",[B.INFO]:"info",[B.WARN]:"warn",[B.ERROR]:"error"},G=(e,t,...n)=>{if(!(t<e.logLevel||((new Date).toISOString(),K[t])))throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class ${constructor(e){this.name=e,this._logLevel=z,this._logHandler=G,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in B))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?q[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,B.DEBUG,...e),this._logHandler(this,B.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,B.VERBOSE,...e),this._logHandler(this,B.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,B.INFO,...e),this._logHandler(this,B.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,B.WARN,...e),this._logHandler(this,B.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,B.ERROR,...e),this._logHandler(this,B.ERROR,...e)}}let H,W;const Q=new WeakMap,J=new WeakMap,Y=new WeakMap,X=new WeakMap,Z=new WeakMap;let ee={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return J.get(e);if("objectStoreNames"===t)return e.objectStoreNames||Y.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ne(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function te(e){return"function"==typeof e?(t=e)!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(W||(W=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(re(this),e),ne(Q.get(this))}:function(...e){return ne(t.apply(re(this),e))}:function(e,...n){const r=t.call(re(this),e,...n);return Y.set(r,e.sort?e.sort():[e]),ne(r)}:(e instanceof IDBTransaction&&function(e){if(J.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});J.set(e,t)}(e),n=e,(H||(H=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>n instanceof e)?new Proxy(e,ee):e);var t,n}function ne(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(ne(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&Q.set(t,e)}).catch(()=>{}),Z.set(t,e),t}(e);if(X.has(e))return X.get(e);const t=te(e);return t!==e&&(X.set(e,t),Z.set(t,e)),t}const re=e=>Z.get(e),ie=["get","getKey","getAll","getAllKeys","count"],se=["put","add","delete","clear"],oe=new Map;function ae(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(oe.get(t))return oe.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=se.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!ie.includes(n))return;const s=function(e,...t){return l(this,null,function*(){const s=this.transaction(e,i?"readwrite":"readonly");let o=s.store;return r&&(o=o.index(t.shift())),(yield Promise.all([o[n](...t),i&&s.done]))[0]})};return oe.set(t,s),s}var ue,ce;ce=((e,t)=>{for(var n in t||(t={}))s.call(t,n)&&u(e,n,t[n]);if(r)for(var n of r(t))o.call(t,n)&&u(e,n,t[n]);return e})({},ue=ee),ee=t(ce,n({get:(e,t,n)=>ae(e,t)||ue.get(e,t,n),has:(e,t)=>!!ae(e,t)||ue.has(e,t)}));
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
 */
class le{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const he="@firebase/app",de="0.10.13",fe=new $("@firebase/app"),pe="@firebase/app-compat",me="@firebase/analytics-compat",ge="@firebase/analytics",ye="@firebase/app-check-compat",ve="@firebase/app-check",we="@firebase/auth",_e="@firebase/auth-compat",Ie="@firebase/database",be="@firebase/data-connect",Te="@firebase/database-compat",Ee="@firebase/functions",Se="@firebase/functions-compat",Ce="@firebase/installations",ke="@firebase/installations-compat",Ae="@firebase/messaging",Ne="@firebase/messaging-compat",De="@firebase/performance",xe="@firebase/performance-compat",Re="@firebase/remote-config",Oe="@firebase/remote-config-compat",Pe="@firebase/storage",Le="@firebase/storage-compat",Me="@firebase/firestore",Ve="@firebase/vertexai-preview",Fe="@firebase/firestore-compat",Ue="firebase",Be="[DEFAULT]",je={[he]:"fire-core",[pe]:"fire-core-compat",[ge]:"fire-analytics",[me]:"fire-analytics-compat",[ve]:"fire-app-check",[ye]:"fire-app-check-compat",[we]:"fire-auth",[_e]:"fire-auth-compat",[Ie]:"fire-rtdb",[be]:"fire-data-connect",[Te]:"fire-rtdb-compat",[Ee]:"fire-fn",[Se]:"fire-fn-compat",[Ce]:"fire-iid",[ke]:"fire-iid-compat",[Ae]:"fire-fcm",[Ne]:"fire-fcm-compat",[De]:"fire-perf",[xe]:"fire-perf-compat",[Re]:"fire-rc",[Oe]:"fire-rc-compat",[Pe]:"fire-gcs",[Le]:"fire-gcs-compat",[Me]:"fire-fst",[Fe]:"fire-fst-compat",[Ve]:"fire-vertex","fire-js":"fire-js",[Ue]:"fire-js-all"},qe=new Map,ze=new Map,Ke=new Map;function Ge(e,t){try{e.container.addComponent(t)}catch(n){fe.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function $e(e){const t=e.name;if(Ke.has(t))return fe.debug(`There were multiple attempts to register component ${t}.`),!1;Ke.set(t,e);for(const n of qe.values())Ge(n,e);for(const n of ze.values())Ge(n,e);return!0}function He(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function We(e){return void 0!==e.settings}
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
 */const Qe=new C("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
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
 */
class Je{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new M("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Qe.create("app-deleted",{appName:this._name})}}
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
 */const Ye="10.14.1";function Xe(e,t={}){let n=e;"object"!=typeof t&&(t={name:t});const r=Object.assign({name:Be,automaticDataCollectionEnabled:!1},t),i=r.name;if("string"!=typeof i||!i)throw Qe.create("bad-app-name",{appName:String(i)});if(n||(n=w()),!n)throw Qe.create("no-options");const s=qe.get(i);if(s){if(A(n,s.options)&&A(r,s.config))return s;throw Qe.create("duplicate-app",{appName:i})}const o=new U(i);for(const u of Ke.values())o.addComponent(u);const a=new Je(n,r,o);return qe.set(i,a),a}function Ze(e=Be){const t=qe.get(e);if(!t&&e===Be&&w())return Xe();if(!t)throw Qe.create("no-app",{appName:e});return t}function et(){return Array.from(qe.values())}function tt(e,t,n){var r;let i=null!==(r=je[e])&&void 0!==r?r:e;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const e=[`Unable to register library "${i}" with version "${t}":`];return s&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void fe.warn(e.join(" "))}$e(new M(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}
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
 */const nt="firebase-heartbeat-store";let rt=null;function it(){return rt||(rt=function(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(e,t),a=ne(o);return r&&o.addEventListener("upgradeneeded",e=>{r(ne(o.result),e.oldVersion,e.newVersion,ne(o.transaction),e)}),n&&o.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),a.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),a}("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(nt)}catch(n){}}}).catch(e=>{throw Qe.create("idb-open",{originalErrorMessage:e.message})})),rt}function st(e,t){return l(this,null,function*(){try{const n=(yield it()).transaction(nt,"readwrite"),r=n.objectStore(nt);yield r.put(t,ot(e)),yield n.done}catch(n){if(n instanceof S)fe.warn(n.message);else{const e=Qe.create("idb-set",{originalErrorMessage:null==n?void 0:n.message});fe.warn(e.message)}}})}function ot(e){return`${e.name}!${e.options.appId}`}
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
 */class at{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ct(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}triggerHeartbeat(){return l(this,null,function*(){var e,t;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=ut();if(null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)&&(this._heartbeatsCache=yield this._heartbeatsCachePromise,null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(e=>e.date===r))return;return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{const t=new Date(e.date).valueOf();return Date.now()-t<=2592e6}),this._storage.overwrite(this._heartbeatsCache)}catch(n){fe.warn(n)}})}getHeartbeatsHeader(){return l(this,null,function*(){var e;try{if(null===this._heartbeatsCache&&(yield this._heartbeatsCachePromise),null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const t=ut(),{heartbeatsToSend:n,unsentEntries:r}=function(e,t=1024){const n=[];let r=e.slice();for(const i of e){const e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),lt(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),lt(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),i=m(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,yield this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return fe.warn(t),""}})}}function ut(){return(new Date).toISOString().substring(0,10)}class ct{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}runIndexedDBEnvironmentCheck(){return l(this,null,function*(){return!!E()&&new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(n){t(n)}}).then(()=>!0).catch(()=>!1)})}read(){return l(this,null,function*(){if(yield this._canUseIndexedDBPromise){const e=yield function(e){return l(this,null,function*(){try{const t=(yield it()).transaction(nt),n=yield t.objectStore(nt).get(ot(e));return yield t.done,n}catch(t){if(t instanceof S)fe.warn(t.message);else{const e=Qe.create("idb-get",{originalErrorMessage:null==t?void 0:t.message});fe.warn(e.message)}}})}(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}return{heartbeats:[]}})}overwrite(e){return l(this,null,function*(){var t;if(yield this._canUseIndexedDBPromise){const n=yield this.read();return st(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}})}add(e){return l(this,null,function*(){var t;if(yield this._canUseIndexedDBPromise){const n=yield this.read();return st(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}})}}function lt(e){return m(JSON.stringify({version:2,heartbeats:e})).length}
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
 */function ht(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}$e(new M("platform-logger",e=>new le(e),"PRIVATE")),$e(new M("heartbeat",e=>new at(e),"PRIVATE")),tt(he,de,""),tt(he,de,"esm2017"),tt("fire-js",""),
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
tt("firebase","10.14.1","app"),"function"==typeof SuppressedError&&SuppressedError;const dt=function(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}},ft=new C("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),pt=new $("@firebase/auth");function mt(e,...t){pt.logLevel<=B.ERROR&&pt.error(`Auth (${Ye}): ${e}`,...t)}
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
 */function gt(e,...t){throw _t(e,...t)}function yt(e,...t){return _t(e,...t)}function vt(e,t,n){const r=Object.assign(Object.assign({},dt()),{[t]:n});return new C("auth","Firebase",r).create(t,{appName:e.name})}function wt(e){return vt(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function _t(e,...t){if("string"!=typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return ft.create(e,...t)}function It(e,t,...n){if(!e)throw _t(t,...n)}function bt(e){const t="INTERNAL ASSERTION FAILED: "+e;throw mt(t),new Error(t)}function Tt(e,t){e||bt(t)}
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
 */function Et(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function St(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}
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
class Ct{constructor(e,t){this.shortDelay=e,this.longDelay=t,Tt(t>e,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(b())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return"undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&("http:"===St()||"https:"===St()||function(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}()||"connection"in navigator)&&!navigator.onLine?Math.min(5e3,this.shortDelay):this.isMobile?this.longDelay:this.shortDelay}}
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
 */function kt(e,t){Tt(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
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
 */class At{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void bt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void bt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void bt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
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
 */const Nt={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},Dt=new Ct(3e4,6e4);
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
 */function xt(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}function Rt(e,t,n,r){return l(this,arguments,function*(e,t,n,r,i={}){return Ot(e,i,()=>l(this,null,function*(){let i={},s={};r&&("GET"===t?s=r:i={body:JSON.stringify(r)});const o=D(Object.assign({key:e.config.apiKey},s)).slice(1),a=yield e._getAdditionalHeaders();a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);const u=Object.assign({method:t,headers:a},i);return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent||(u.referrerPolicy="no-referrer"),At.fetch()(Lt(e,e.config.apiHost,n,o),u)}))})}function Ot(e,t,n){return l(this,null,function*(){e._canInitEmulator=!1;const r=Object.assign(Object.assign({},Nt),t);try{const t=new Vt(e),i=yield Promise.race([n(),t.promise]);t.clearNetworkTimeout();const s=yield i.json();if("needConfirmation"in s)throw Ft(e,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{const t=i.ok?s.errorMessage:s.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw Ft(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===n)throw Ft(e,"email-already-in-use",s);if("USER_DISABLED"===n)throw Ft(e,"user-disabled",s);const a=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw vt(e,a,o);gt(e,a)}}catch(i){if(i instanceof S)throw i;gt(e,"network-request-failed",{message:String(i)})}})}function Pt(e,t,n,r){return l(this,arguments,function*(e,t,n,r,i={}){const s=yield Rt(e,t,n,r,i);return"mfaPendingCredential"in s&&gt(e,"multi-factor-auth-required",{_serverResponse:s}),s})}function Lt(e,t,n,r){const i=`${t}${n}?${r}`;return e.config.emulator?kt(e.config,i):`${e.config.apiScheme}://${i}`}function Mt(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Vt{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(yt(this.auth,"network-request-failed")),Dt.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ft(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=yt(e,t,r);return i.customData._tokenResponse=n,i}function Ut(e){return void 0!==e&&void 0!==e.enterprise}class Bt{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Mt(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}}function jt(e,t){return l(this,null,function*(){return Rt(e,"POST","/v1/accounts:lookup",t)})}
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
 */function qt(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}function zt(e){return 1e3*Number(e)}function Kt(e){const[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return mt("JWT malformed, contained fewer than 3 sections"),null;try{const e=g(n);return e?JSON.parse(e):(mt("Failed to decode base64 JWT payload"),null)}catch(i){return mt("Caught error parsing JWT payload as JSON",null==i?void 0:i.toString()),null}}function Gt(e){const t=Kt(e);return It(t,"internal-error"),It(void 0!==t.exp,"internal-error"),It(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
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
 */function $t(e,t,n=!1){return l(this,null,function*(){if(n)return t;try{return yield t}catch(r){throw r instanceof S&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
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
 */(r)&&e.auth.currentUser===e&&(yield e.auth.signOut()),r}})}class Ht{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(()=>l(this,null,function*(){yield this.iteration()}),t)}iteration(){return l(this,null,function*(){try{yield this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===(null==e?void 0:e.code)&&this.schedule(!0))}this.schedule()})}}
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
 */class Wt{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=qt(this.lastLoginAt),this.creationTime=qt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
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
 */function Qt(e){return l(this,null,function*(){var t;const n=e.auth,r=yield e.getIdToken(),i=yield $t(e,jt(n,{idToken:r}));It(null==i?void 0:i.users.length,n,"internal-error");const s=i.users[0];e._notifyReloadListener(s);const o=(null===(t=s.providerUserInfo)||void 0===t?void 0:t.length)?Jt(s.providerUserInfo):[],a=(u=e.providerData,c=o,[...u.filter(e=>!c.some(t=>t.providerId===e.providerId)),...c]);var u,c;const l=e.isAnonymous,h=!(e.email&&s.passwordHash||(null==a?void 0:a.length)),d=!!l&&h,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Wt(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(e,f)})}function Jt(e){return e.map(e=>{var{providerId:t}=e,n=ht(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}
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
class Yt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){It(e.idToken,"internal-error"),It(void 0!==e.idToken,"internal-error"),It(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):Gt(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){It(0!==e.length,"internal-error");const t=Gt(e);this.updateTokensAndExpiration(e,null,t)}getToken(e,t=!1){return l(this,null,function*(){return t||!this.accessToken||this.isExpired?(It(this.refreshToken,e,"user-token-expired"),this.refreshToken?(yield this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken})}clearRefreshToken(){this.refreshToken=null}refresh(e,t){return l(this,null,function*(){const{accessToken:n,refreshToken:r,expiresIn:i}=yield function(e,t){return l(this,null,function*(){const n=yield Ot(e,{},()=>l(this,null,function*(){const n=D({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:i}=e.config,s=Lt(e,r,"/v1/token",`key=${i}`),o=yield e._getAdditionalHeaders();return o["Content-Type"]="application/x-www-form-urlencoded",At.fetch()(s,{method:"POST",headers:o,body:n})}));return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}})}(e,t);this.updateTokensAndExpiration(n,r,Number(i))})}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:i}=t,s=new Yt;return n&&(It("string"==typeof n,"internal-error",{appName:e}),s.refreshToken=n),r&&(It("string"==typeof r,"internal-error",{appName:e}),s.accessToken=r),i&&(It("number"==typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Yt,this.toJSON())}_performRefresh(){return bt("not implemented")}}
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
 */function Xt(e,t){It("string"==typeof e||void 0===e,"internal-error",{appName:t})}class Zt{constructor(e){var{uid:t,auth:n,stsTokenManager:r}=e,i=ht(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Ht(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Wt(i.createdAt||void 0,i.lastLoginAt||void 0)}getIdToken(e){return l(this,null,function*(){const t=yield $t(this,this.stsTokenManager.getToken(this.auth,e));return It(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,yield this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t})}getIdTokenResult(e){return function(e,t=!1){return l(this,null,function*(){const n=L(e),r=yield n.getIdToken(t),i=Kt(r);It(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s="object"==typeof i.firebase?i.firebase:void 0,o=null==s?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:qt(zt(i.auth_time)),issuedAtTime:qt(zt(i.iat)),expirationTime:qt(zt(i.exp)),signInProvider:o||null,signInSecondFactor:(null==s?void 0:s.sign_in_second_factor)||null}})}(this,e)}reload(){return function(e){return l(this,null,function*(){const t=L(e);yield Qt(t),yield t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)})}(this)}_assign(e){this!==e&&(It(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>Object.assign({},e)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Zt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){It(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}_updateTokensIfNecessary(e,t=!1){return l(this,null,function*(){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&(yield Qt(this)),yield this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)})}delete(){return l(this,null,function*(){if(We(this.auth.app))return Promise.reject(wt(this.auth));const e=yield this.getIdToken();return yield $t(this,
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
function(e,t){return l(this,null,function*(){return Rt(e,"POST","/v1/accounts:delete",t)})}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()})}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,r,i,s,o,a,u,c;const l=null!==(n=t.displayName)&&void 0!==n?n:void 0,h=null!==(r=t.email)&&void 0!==r?r:void 0,d=null!==(i=t.phoneNumber)&&void 0!==i?i:void 0,f=null!==(s=t.photoURL)&&void 0!==s?s:void 0,p=null!==(o=t.tenantId)&&void 0!==o?o:void 0,m=null!==(a=t._redirectEventId)&&void 0!==a?a:void 0,g=null!==(u=t.createdAt)&&void 0!==u?u:void 0,y=null!==(c=t.lastLoginAt)&&void 0!==c?c:void 0,{uid:v,emailVerified:w,isAnonymous:_,providerData:I,stsTokenManager:b}=t;It(v&&b,e,"internal-error");const T=Yt.fromJSON(this.name,b);It("string"==typeof v,e,"internal-error"),Xt(l,e.name),Xt(h,e.name),It("boolean"==typeof w,e,"internal-error"),It("boolean"==typeof _,e,"internal-error"),Xt(d,e.name),Xt(f,e.name),Xt(p,e.name),Xt(m,e.name),Xt(g,e.name),Xt(y,e.name);const E=new Zt({uid:v,auth:e,email:h,emailVerified:w,displayName:l,isAnonymous:_,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:T,createdAt:g,lastLoginAt:y});return I&&Array.isArray(I)&&(E.providerData=I.map(e=>Object.assign({},e))),m&&(E._redirectEventId=m),E}static _fromIdTokenResponse(e,t,n=!1){return l(this,null,function*(){const r=new Yt;r.updateFromServerResponse(t);const i=new Zt({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return yield Qt(i),i})}static _fromGetAccountInfoResponse(e,t,n){return l(this,null,function*(){const r=t.users[0];It(void 0!==r.localId,"internal-error");const i=void 0!==r.providerUserInfo?Jt(r.providerUserInfo):[],s=!(r.email&&r.passwordHash||(null==i?void 0:i.length)),o=new Yt;o.updateFromIdToken(n);const a=new Zt({uid:r.localId,auth:e,stsTokenManager:o,isAnonymous:s}),u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new Wt(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash||(null==i?void 0:i.length))};return Object.assign(a,u),a})}}
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
 */const en=new Map;function tn(e){Tt(e instanceof Function,"Expected a class definition");let t=en.get(e);return t?(Tt(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,en.set(e,t),t)}
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
 */class nn{constructor(){this.type="NONE",this.storage={}}_isAvailable(){return l(this,null,function*(){return!0})}_set(e,t){return l(this,null,function*(){this.storage[e]=t})}_get(e){return l(this,null,function*(){const t=this.storage[e];return void 0===t?null:t})}_remove(e){return l(this,null,function*(){delete this.storage[e]})}_addListener(e,t){}_removeListener(e,t){}}nn.type="NONE";const rn=nn;
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
 */function sn(e,t,n){return`firebase:${e}:${t}:${n}`}class on{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=sn(this.userKey,r.apiKey,i),this.fullPersistenceKey=sn("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}getCurrentUser(){return l(this,null,function*(){const e=yield this.persistence._get(this.fullUserKey);return e?Zt._fromJSON(this.auth,e):null})}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}setPersistence(e){return l(this,null,function*(){if(this.persistence===e)return;const t=yield this.getCurrentUser();return yield this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0})}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static create(e,t,n="authUser"){return l(this,null,function*(){if(!t.length)return new on(tn(rn),e,n);const r=(yield Promise.all(t.map(e=>l(this,null,function*(){if(yield e._isAvailable())return e})))).filter(e=>e);let i=r[0]||tn(rn);const s=sn(n,e.config.apiKey,e.name);let o=null;for(const n of t)try{const t=yield n._get(s);if(t){const r=Zt._fromJSON(e,t);n!==i&&(o=r),i=n;break}}catch(u){}const a=r.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&a.length?(i=a[0],o&&(yield i._set(s,o.toJSON())),yield Promise.all(t.map(e=>l(this,null,function*(){if(e!==i)try{yield e._remove(s)}catch(u){}}))),new on(i,e,n)):new on(i,e,n)})}}
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
 */function an(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(hn(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(un(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(fn(t))return"Blackberry";if(pn(t))return"Webos";if(cn(t))return"Safari";if((t.includes("chrome/")||ln(t))&&!t.includes("edge/"))return"Chrome";if(dn(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function un(e=b()){return/firefox\//i.test(e)}function cn(e=b()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function ln(e=b()){return/crios\//i.test(e)}function hn(e=b()){return/iemobile/i.test(e)}function dn(e=b()){return/android/i.test(e)}function fn(e=b()){return/blackberry/i.test(e)}function pn(e=b()){return/webos/i.test(e)}function mn(e=b()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function gn(e=b()){return mn(e)||dn(e)||pn(e)||fn(e)||/windows phone/i.test(e)||hn(e)}
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
 */function yn(e,t=[]){let n;switch(e){case"Browser":n=an(b());break;case"Worker":n=`${an(b())}-${e}`;break;default:n=e}const r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ye}/${r}`}
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
 */class vn{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,r)=>{try{n(e(t))}catch(i){r(i)}});n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}runMiddleware(e){return l(this,null,function*(){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)yield n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const e of t)try{e()}catch(r){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==n?void 0:n.message})}})}}
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
 */class wn{constructor(e){var t,n,r,i;const s=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=null!==(t=s.minPasswordLength)&&void 0!==t?t:6,s.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=s.maxPasswordLength),void 0!==s.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=s.containsLowercaseCharacter),void 0!==s.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=s.containsUppercaseCharacter),void 0!==s.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=s.containsNumericCharacter),void 0!==s.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=s.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=null!==(r=null===(n=e.allowedNonAlphanumericCharacters)||void 0===n?void 0:n.join(""))&&void 0!==r?r:"",this.forceUpgradeOnSignin=null!==(i=e.forceUpgradeOnSignin)&&void 0!==i&&i,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,r,i,s,o;const a={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,a),this.validatePasswordCharacterOptions(e,a),a.isValid&&(a.isValid=null===(t=a.meetsMinPasswordLength)||void 0===t||t),a.isValid&&(a.isValid=null===(n=a.meetsMaxPasswordLength)||void 0===n||n),a.isValid&&(a.isValid=null===(r=a.containsLowercaseLetter)||void 0===r||r),a.isValid&&(a.isValid=null===(i=a.containsUppercaseLetter)||void 0===i||i),a.isValid&&(a.isValid=null===(s=a.containsNumericCharacter)||void 0===s||s),a.isValid&&(a.isValid=null===(o=a.containsNonAlphanumericCharacter)||void 0===o||o),a}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}
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
 */class _n{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new bn(this),this.idTokenSubscription=new bn(this),this.beforeStateQueue=new vn(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ft,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=tn(t)),this._initializationPromise=this.queue(()=>l(this,null,function*(){var n,r;if(!this._deleted&&(this.persistenceManager=yield on.create(this,e),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{yield this._popupRedirectResolver._initialize(this)}catch(i){}yield this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(r=this.currentUser)||void 0===r?void 0:r.uid)||null,this._deleted||(this._isInitialized=!0)}})),this._initializationPromise}_onStorageEvent(){return l(this,null,function*(){if(this._deleted)return;const e=yield this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void(yield this.currentUser.getIdToken())):void(yield this._updateCurrentUser(e,!0)):void 0})}initializeCurrentUserFromIdToken(e){return l(this,null,function*(){try{const t=yield jt(this,{idToken:e}),n=yield Zt._fromGetAccountInfoResponse(this,t,e);yield this.directlySetCurrentUser(n)}catch(t){yield this.directlySetCurrentUser(null)}})}initializeCurrentUser(e){return l(this,null,function*(){var t;if(We(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const n=yield this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){yield this.getOrInitRedirectPersistenceManager();const n=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,s=null==r?void 0:r._redirectEventId,o=yield this.tryRedirectSignIn(e);n&&n!==s||!(null==o?void 0:o.user)||(r=o.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{yield this.beforeStateQueue.runMiddleware(r)}catch(s){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return It(this._popupRedirectResolver,this,"argument-error"),yield this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)})}tryRedirectSignIn(e){return l(this,null,function*(){let t=null;try{t=yield this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){yield this._setRedirectUser(null)}return t})}reloadAndSetCurrentUserOrClear(e){return l(this,null,function*(){try{yield Qt(e)}catch(t){if("auth/network-request-failed"!==(null==t?void 0:t.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)})}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}_delete(){return l(this,null,function*(){this._deleted=!0})}updateCurrentUser(e){return l(this,null,function*(){if(We(this.app))return Promise.reject(wt(this));const t=e?L(e):null;return t&&It(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))})}_updateCurrentUser(e,t=!1){return l(this,null,function*(){if(!this._deleted)return e&&It(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||(yield this.beforeStateQueue.runMiddleware(e)),this.queue(()=>l(this,null,function*(){yield this.directlySetCurrentUser(e),this.notifyAuthListeners()}))})}signOut(){return l(this,null,function*(){return We(this.app)?Promise.reject(wt(this)):(yield this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&(yield this._setRedirectUser(null)),this._updateCurrentUser(null,!0))})}setPersistence(e){return We(this.app)?Promise.reject(wt(this)):this.queue(()=>l(this,null,function*(){yield this.assertedPersistence.setPersistence(tn(e))}))}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}validatePassword(e){return l(this,null,function*(){this._getPasswordPolicyInternal()||(yield this._updatePasswordPolicy());const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)})}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}_updatePasswordPolicy(){return l(this,null,function*(){const e=yield function(e){return l(this,arguments,function*(e,t={}){return Rt(e,"GET","/v2/passwordPolicy",xt(e,t))})}
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
 */(this),t=new wn(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new C("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}revokeAccessToken(e){return l(this,null,function*(){if(this.currentUser){const t=yield this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};null!=this.tenantId&&(n.tenantId=this.tenantId),yield function(e,t){return l(this,null,function*(){return Rt(e,"POST","/v2/accounts:revokeToken",xt(e,t))})}(this,n)}})}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}_setRedirectUser(e,t){return l(this,null,function*(){const n=yield this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)})}getOrInitRedirectPersistenceManager(e){return l(this,null,function*(){if(!this.redirectPersistenceManager){const t=e&&tn(e)||this._popupRedirectResolver;It(t,this,"argument-error"),this.redirectPersistenceManager=yield on.create(this,[tn(t._redirectPersistence)],"redirectUser"),this.redirectUser=yield this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager})}_redirectUserForId(e){return l(this,null,function*(){var t,n;return this._isInitialized&&(yield this.queue(()=>l(this,null,function*(){}))),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?this.redirectUser:null})}_persistUserIfCurrent(e){return l(this,null,function*(){if(e===this.currentUser)return this.queue(()=>l(this,null,function*(){return this.directlySetCurrentUser(e)}))})}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const i="function"==typeof t?t:t.next.bind(t);let s=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(It(o,this,"internal-error"),o.then(()=>{s||i(this.currentUser)}),"function"==typeof t){const i=e.addObserver(t,n,r);return()=>{s=!0,i()}}{const n=e.addObserver(t);return()=>{s=!0,n()}}}directlySetCurrentUser(e){return l(this,null,function*(){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?yield this.assertedPersistence.setCurrentUser(e):yield this.assertedPersistence.removeCurrentUser()})}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return It(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=yn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}_getAdditionalHeaders(){return l(this,null,function*(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=yield null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader();n&&(t["X-Firebase-Client"]=n);const r=yield this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t})}_getAppCheckToken(){return l(this,null,function*(){var e;const t=yield null===(e=this.appCheckServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getToken();return(null==t?void 0:t.error)&&function(e,...t){pt.logLevel<=B.WARN&&pt.warn(`Auth (${Ye}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token})}}function In(e){return L(e)}class bn{constructor(e){this.auth=e,this.observer=null,this.addObserver=function(e){const t=new O(e,void 0);return t.subscribe.bind(t)}(e=>this.observer=e)}get next(){return It(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
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
 */let Tn={loadJS(){return l(this,null,function*(){throw new Error("Unable to load external scripts")})},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function En(e){return Tn.loadJS(e)}class Sn{constructor(e){this.type="recaptcha-enterprise",this.auth=In(e)}verify(e="verify",t=!1){return l(this,null,function*(){function n(t,n,r){const i=window.grecaptcha;Ut(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n("NO_RECAPTCHA")})}):r(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((e,r)=>{(function(e){return l(this,null,function*(){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise((t,n)=>l(this,null,function*(){(function(e,t){return l(this,null,function*(){return Rt(e,"GET","/v2/recaptchaConfig",xt(e,t))})})(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0!==r.recaptchaKey){const n=new Bt(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))}).catch(e=>{n(e)})}))})})(this.auth).then(i=>{if(!t&&Ut(window.grecaptcha))n(i,e,r);else{if("undefined"==typeof window)return void r(new Error("RecaptchaVerifier is only supported in browser"));let t=Tn.recaptchaEnterpriseScript;0!==t.length&&(t+=i),En(t).then(()=>{n(i,e,r)}).catch(e=>{r(e)})}}).catch(e=>{r(e)})})})}}function Cn(e,t,n,r=!1){return l(this,null,function*(){const i=new Sn(e);let s;try{s=yield i.verify(n)}catch(a){s=yield i.verify(n,!0)}const o=Object.assign({},t);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o})}function kn(e,t,n,r){return l(this,null,function*(){var i;if(null===(i=e._getRecaptchaConfig())||void 0===i?void 0:i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=yield Cn(e,t,n,"getOobCode"===n);return r(e,i)}return r(e,t).catch(i=>l(this,null,function*(){if("auth/missing-recaptcha-token"===i.code){const i=yield Cn(e,t,n,"getOobCode"===n);return r(e,i)}return Promise.reject(i)}))})}
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
 */function An(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function Nn(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}
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
class Dn{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return bt("not implemented")}_getIdTokenResponse(e){return bt("not implemented")}_linkToIdToken(e,t){return bt("not implemented")}_getReauthenticationResolver(e){return bt("not implemented")}}function xn(e,t){return l(this,null,function*(){return Rt(e,"POST","/v1/accounts:signUp",t)})}
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
 */function Rn(e,t){return l(this,null,function*(){return Pt(e,"POST","/v1/accounts:signInWithPassword",xt(e,t))})}function On(e,t){return l(this,null,function*(){return function(e,t){return l(this,null,function*(){return Rt(e,"POST","/v1/accounts:sendOobCode",xt(e,t))})}(e,t)})}
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
class Pn extends Dn{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new Pn(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Pn(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}_getIdTokenResponse(e){return l(this,null,function*(){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return kn(e,t,"signInWithPassword",Rn);case"emailLink":return function(e,t){return l(this,null,function*(){return Pt(e,"POST","/v1/accounts:signInWithEmailLink",xt(e,t))})}(e,{email:this._email,oobCode:this._password});default:gt(e,"internal-error")}})}_linkToIdToken(e,t){return l(this,null,function*(){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return kn(e,n,"signUpPassword",xn);case"emailLink":return function(e,t){return l(this,null,function*(){return Pt(e,"POST","/v1/accounts:signInWithEmailLink",xt(e,t))})}(e,{idToken:t,email:this._email,oobCode:this._password});default:gt(e,"internal-error")}})}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
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
 */function Ln(e,t){return l(this,null,function*(){return Pt(e,"POST","/v1/accounts:signInWithIdp",xt(e,t))})}
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
 */class Mn extends Dn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Mn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):gt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r}=t,i=ht(t,["providerId","signInMethod"]);if(!n||!r)return null;const s=new Mn(n,r);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){return Ln(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Ln(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ln(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=D(t)}return e}}
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
 */class Vn{constructor(e){var t,n,r,i,s,o;const a=x(R(e)),u=null!==(t=a.apiKey)&&void 0!==t?t:null,c=null!==(n=a.oobCode)&&void 0!==n?n:null,l=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(r=a.mode)&&void 0!==r?r:null);It(u&&c&&l,"argument-error"),this.apiKey=u,this.operation=l,this.code=c,this.continueUrl=null!==(i=a.continueUrl)&&void 0!==i?i:null,this.languageCode=null!==(s=a.languageCode)&&void 0!==s?s:null,this.tenantId=null!==(o=a.tenantId)&&void 0!==o?o:null}static parseLink(e){const t=function(e){const t=x(R(e)).link,n=t?x(R(t)).deep_link_id:null,r=x(R(e)).deep_link_id;return(r?x(R(r)).link:null)||r||n||t||e}(e);try{return new Vn(t)}catch(n){return null}}}
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
 */class Fn{constructor(){this.providerId=Fn.PROVIDER_ID}static credential(e,t){return Pn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Vn.parseLink(t);return It(n,"argument-error"),Pn._fromEmailAndCode(e,n.code,n.tenantId)}}Fn.PROVIDER_ID="password",Fn.EMAIL_PASSWORD_SIGN_IN_METHOD="password",Fn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
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
class Un{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
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
 */class Bn extends Un{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
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
 */class jn extends Bn{constructor(){super("facebook.com")}static credential(e){return Mn._fromParams({providerId:jn.PROVIDER_ID,signInMethod:jn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return jn.credentialFromTaggedObject(e)}static credentialFromError(e){return jn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return jn.credential(e.oauthAccessToken)}catch(t){return null}}}jn.FACEBOOK_SIGN_IN_METHOD="facebook.com",jn.PROVIDER_ID="facebook.com";
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
class qn extends Bn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Mn._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return qn.credentialFromTaggedObject(e)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return qn.credential(t,n)}catch(r){return null}}}qn.GOOGLE_SIGN_IN_METHOD="google.com",qn.PROVIDER_ID="google.com";
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
class zn extends Bn{constructor(){super("github.com")}static credential(e){return Mn._fromParams({providerId:zn.PROVIDER_ID,signInMethod:zn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return zn.credentialFromTaggedObject(e)}static credentialFromError(e){return zn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return zn.credential(e.oauthAccessToken)}catch(t){return null}}}zn.GITHUB_SIGN_IN_METHOD="github.com",zn.PROVIDER_ID="github.com";
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
class Kn extends Bn{constructor(){super("twitter.com")}static credential(e,t){return Mn._fromParams({providerId:Kn.PROVIDER_ID,signInMethod:Kn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Kn.credentialFromTaggedObject(e)}static credentialFromError(e){return Kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Kn.credential(t,n)}catch(r){return null}}}
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
function Gn(e,t){return l(this,null,function*(){return Pt(e,"POST","/v1/accounts:signUp",xt(e,t))})}
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
 */Kn.TWITTER_SIGN_IN_METHOD="twitter.com",Kn.PROVIDER_ID="twitter.com";class $n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static _fromIdTokenResponse(e,t,n,r=!1){return l(this,null,function*(){const i=yield Zt._fromIdTokenResponse(e,n,r),s=Hn(n);return new $n({user:i,providerId:s,_tokenResponse:n,operationType:t})})}static _forOperation(e,t,n){return l(this,null,function*(){yield e._updateTokensIfNecessary(n,!0);const r=Hn(n);return new $n({user:e,providerId:r,_tokenResponse:n,operationType:t})})}}function Hn(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
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
 */class Wn extends S{constructor(e,t,n,r){var i;super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,Wn.prototype),this.customData={appName:e.name,tenantId:null!==(i=e.tenantId)&&void 0!==i?i:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new Wn(e,t,n,r)}}function Qn(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw Wn._fromErrorAndOperation(e,n,t,r);throw n})}
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
function Jn(e,t,n=!1){return l(this,null,function*(){if(We(e.app))return Promise.reject(wt(e));const r="signIn",i=yield Qn(e,r,t),s=yield $n._fromIdTokenResponse(e,r,i);return n||(yield e._updateCurrentUser(s.user)),s})}
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
function Yn(e){return l(this,null,function*(){const t=In(e);t._getPasswordPolicyInternal()&&(yield t._updatePasswordPolicy())})}function Xn(e,t,n){return l(this,null,function*(){const n=In(e),r={requestType:"PASSWORD_RESET",email:t,clientType:"CLIENT_TYPE_WEB"};yield kn(n,r,"getOobCode",On)})}function Zn(e,t,n){return l(this,null,function*(){if(We(e.app))return Promise.reject(wt(e));const r=In(e),i=kn(r,{returnSecureToken:!0,email:t,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Gn),s=yield i.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&Yn(e),t}),o=yield $n._fromIdTokenResponse(r,"signIn",s);return yield r._updateCurrentUser(o.user),o})}function er(e,t,n){return We(e.app)?Promise.reject(wt(e)):function(e,t){return l(this,null,function*(){return Jn(In(e),t)})}(L(e),Fn.credential(t,n)).catch(t=>l(this,null,function*(){throw"auth/password-does-not-meet-requirements"===t.code&&Yn(e),t}))}
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
function tr(e,t){return l(this,arguments,function*(e,{displayName:t,photoURL:n}){if(void 0===t&&void 0===n)return;const r=L(e),i={idToken:yield r.getIdToken(),displayName:t,photoUrl:n,returnSecureToken:!0},s=yield $t(r,function(e,t){return l(this,null,function*(){return Rt(e,"POST","/v1/accounts:update",t)})}(r.auth,i));r.displayName=s.displayName||null,r.photoURL=s.photoUrl||null;const o=r.providerData.find(({providerId:e})=>"password"===e);o&&(o.displayName=r.displayName,o.photoURL=r.photoURL),yield r._updateTokensIfNecessary(s)})}const nr="__sak";
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
 */class rr{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(nr,"1"),this.storage.removeItem(nr),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
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
 */class ir extends rr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=gn(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);!function(){const e=b();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}()||10!==document.documentMode||i===e.newValue||e.newValue===e.oldValue?r():setTimeout(r,10)}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}_set(e,t){return l(this,null,function*(){yield c(ir.prototype,this,"_set").call(this,e,t),this.localCache[e]=JSON.stringify(t)})}_get(e){return l(this,null,function*(){const t=yield c(ir.prototype,this,"_get").call(this,e);return this.localCache[e]=JSON.stringify(t),t})}_remove(e){return l(this,null,function*(){yield c(ir.prototype,this,"_remove").call(this,e),delete this.localCache[e]})}}ir.type="LOCAL";const sr=ir;
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
 */class or extends rr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}or.type="SESSION";const ar=or;
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
 */
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
 */
class ur{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new ur(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}handleEvent(e){return l(this,null,function*(){const t=e,{eventId:n,eventType:r,data:i}=t.data,s=this.handlersMap[r];if(!(null==s?void 0:s.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(s).map(e=>l(this,null,function*(){return e(t.origin,i)})),a=yield function(e){return Promise.all(e.map(e=>l(this,null,function*(){try{return{fulfilled:!0,value:yield e}}catch(t){return{fulfilled:!1,reason:t}}})))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
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
function cr(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}
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
 */ur.receivers=[];class lr{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}_send(e,t,n=50){return l(this,null,function*(){const r="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,s;return new Promise((o,a)=>{const u=cr("",20);r.port1.start();const c=setTimeout(()=>{a(new Error("unsupported_event"))},n);s={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===u)switch(t.data.status){case"ack":clearTimeout(c),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),o(t.data.response);break;default:clearTimeout(c),clearTimeout(i),a(new Error("invalid_response"))}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[r.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})})}}
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
 */function hr(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
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
function dr(){return void 0!==hr().WorkerGlobalScope&&"function"==typeof hr().importScripts}
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
 */
const fr="firebaseLocalStorageDb",pr="firebaseLocalStorage",mr="fbase_key";class gr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function yr(e,t){return e.transaction([pr],t?"readwrite":"readonly").objectStore(pr)}function vr(){const e=indexedDB.open(fr,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(pr,{keyPath:mr})}catch(r){n(r)}}),e.addEventListener("success",()=>l(this,null,function*(){const n=e.result;n.objectStoreNames.contains(pr)?t(n):(n.close(),yield function(){const e=indexedDB.deleteDatabase(fr);return new gr(e).toPromise()}(),t(yield vr()))}))})}function wr(e,t,n){return l(this,null,function*(){const r=yr(e,!0).put({[mr]:t,value:n});return new gr(r).toPromise()})}function _r(e,t){const n=yr(e,!0).delete(t);return new gr(n).toPromise()}class Ir{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}_openDb(){return l(this,null,function*(){return this.db||(this.db=yield vr()),this.db})}_withRetries(e){return l(this,null,function*(){let t=0;for(;;)try{const t=yield this._openDb();return yield e(t)}catch(n){if(t++>3)throw n;this.db&&(this.db.close(),this.db=void 0)}})}initializeServiceWorkerMessaging(){return l(this,null,function*(){return dr()?this.initializeReceiver():this.initializeSender()})}initializeReceiver(){return l(this,null,function*(){this.receiver=ur._getInstance(dr()?self:null),this.receiver._subscribe("keyChanged",(e,t)=>l(this,null,function*(){return{keyProcessed:(yield this._poll()).includes(t.key)}})),this.receiver._subscribe("ping",(e,t)=>l(this,null,function*(){return["keyChanged"]}))})}initializeSender(){return l(this,null,function*(){var e,t;if(this.activeServiceWorker=yield function(){return l(this,null,function*(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{return(yield navigator.serviceWorker.ready).active}catch(e){return null}})}(),!this.activeServiceWorker)return;this.sender=new lr(this.activeServiceWorker);const n=yield this.sender._send("ping",{},800);n&&(null===(e=n[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=n[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)})}notifyServiceWorker(e){return l(this,null,function*(){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{yield this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}})}_isAvailable(){return l(this,null,function*(){try{if(!indexedDB)return!1;const e=yield vr();return yield wr(e,nr,"1"),yield _r(e,nr),!0}catch(e){}return!1})}_withPendingWrite(e){return l(this,null,function*(){this.pendingWrites++;try{yield e()}finally{this.pendingWrites--}})}_set(e,t){return l(this,null,function*(){return this._withPendingWrite(()=>l(this,null,function*(){return yield this._withRetries(n=>wr(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)}))})}_get(e){return l(this,null,function*(){const t=yield this._withRetries(t=>function(e,t){return l(this,null,function*(){const n=yr(e,!1).get(t),r=yield new gr(n).toPromise();return void 0===r?null:r.value})}(t,e));return this.localCache[e]=t,t})}_remove(e){return l(this,null,function*(){return this._withPendingWrite(()=>l(this,null,function*(){return yield this._withRetries(t=>_r(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)}))})}_poll(){return l(this,null,function*(){const e=yield this._withRetries(e=>{const t=yr(e,!1).getAll();return new gr(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t})}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>l(this,null,function*(){return this._poll()}),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}Ir.type="LOCAL";const br=Ir;
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
 */
function Tr(e,t){return t?tn(t):(It(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
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
 */new Ct(3e4,6e4);class Er extends Dn{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ln(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ln(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ln(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Sr(e){return Jn(e.auth,new Er(e),e.bypassAuthState)}function Cr(e){const{auth:t,user:n}=e;return It(n,t,"internal-error"),
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
 */
function(e,t,n=!1){return l(this,null,function*(){const{auth:r}=e;if(We(r.app))return Promise.reject(wt(r));const i="reauthenticate";try{const s=yield $t(e,Qn(r,i,t,e),n);It(s.idToken,r,"internal-error");const o=Kt(s.idToken);It(o,r,"internal-error");const{sub:a}=o;return It(e.uid===a,r,"user-mismatch"),$n._forOperation(e,i,s)}catch(s){throw"auth/user-not-found"===(null==s?void 0:s.code)&&gt(r,"user-mismatch"),s}})}(n,new Er(e),e.bypassAuthState)}function kr(e){return l(this,null,function*(){const{auth:t,user:n}=e;return It(n,t,"internal-error"),function(e,t,n=!1){return l(this,null,function*(){const r=yield $t(e,t._linkToIdToken(e.auth,yield e.getIdToken()),n);return $n._forOperation(e,"link",r)})}(n,new Er(e),e.bypassAuthState)})}
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
 */class Ar{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise((e,t)=>l(this,null,function*(){this.pendingPromise={resolve:e,reject:t};try{this.eventManager=yield this.resolver._initialize(this.auth),yield this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}}))}onAuthEvent(e){return l(this,null,function*(){const{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:s,type:o}=e;if(s)return void this.reject(s);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(yield this.getIdpTask(o)(a))}catch(u){this.reject(u)}})}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Sr;case"linkViaPopup":case"linkViaRedirect":return kr;case"reauthViaPopup":case"reauthViaRedirect":return Cr;default:gt(this.auth,"internal-error")}}resolve(e){Tt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Tt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
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
 */const Nr=new Ct(2e3,1e4);function Dr(e,t,n){return l(this,null,function*(){if(We(e.app))return Promise.reject(yt(e,"operation-not-supported-in-this-environment"));const r=In(e);!function(e,t){if(!(t instanceof Un))throw Un.name!==t.constructor.name&&gt(e,"argument-error"),vt(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}(e,t);const i=Tr(r,n);return new xr(r,"signInViaPopup",t,i).executeNotNull()})}class xr extends Ar{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,xr.currentPopupAction&&xr.currentPopupAction.cancel(),xr.currentPopupAction=this}executeNotNull(){return l(this,null,function*(){const e=yield this.execute();return It(e,this.auth,"internal-error"),e})}onExecution(){return l(this,null,function*(){Tt(1===this.filter.length,"Popup operations only handle one event");const e=cr();this.authWindow=yield this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(yt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()})}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(yt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,xr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;(null===(n=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===n?void 0:n.closed)?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(yt(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,Nr.get())};e()}}xr.currentPopupAction=null;
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
const Rr=new Map;class Or extends Ar{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}execute(){return l(this,null,function*(){let e=Rr.get(this.auth._key());if(!e){try{const t=(yield function(e,t){return l(this,null,function*(){const n=function(e){return sn("pendingRedirect",e.config.apiKey,e.name)}(t),r=function(e){return tn(e._redirectPersistence)}(e);if(!(yield r._isAvailable()))return!1;const i="true"===(yield r._get(n));return yield r._remove(n),i})}(this.resolver,this.auth))?yield c(Or.prototype,this,"execute").call(this):null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}Rr.set(this.auth._key(),e)}return this.bypassAuthState||Rr.set(this.auth._key(),()=>Promise.resolve(null)),e()})}onAuthEvent(e){return l(this,null,function*(){if("signInViaRedirect"===e.type)return c(Or.prototype,this,"onAuthEvent").call(this,e);if("unknown"!==e.type){if(e.eventId){const t=yield this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,c(Or.prototype,this,"onAuthEvent").call(this,e);this.resolve(null)}}else this.resolve(null)})}onExecution(){return l(this,null,function*(){})}cleanUp(){}}function Pr(e,t){Rr.set(e._key(),t)}function Lr(e,t,n=!1){return l(this,null,function*(){if(We(e.app))return Promise.reject(wt(e));const r=In(e),i=Tr(r,t),s=new Or(r,i,n),o=yield s.execute();return o&&!n&&(delete o.user._redirectEventId,yield r._persistUserIfCurrent(o.user),yield r._setRedirectUser(null,t)),o})}
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
 */class Mr{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Fr(e);default:return!1}}
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
 */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!Fr(e)){const r=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(yt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(Vr(e))}saveEventToCache(e){this.cachedEventUids.add(Vr(e)),this.lastProcessedEventTime=Date.now()}}function Vr(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function Fr({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===(null==t?void 0:t.code)}
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
const Ur=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Br=/^https?/;function jr(e){const t=Et(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!Br.test(n))return!1;if(Ur.test(e))return r===e;const i=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}
/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const qr=new Ct(3e4,6e4);function zr(){const e=hr().___jsl;if(null==e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}let Kr=null;
/**
 * @license
 * Copyright 2020 Google LLC.
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
const Gr=new Ct(5e3,15e3),$r={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Hr=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Wr(e){const t=e.config;It(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?kt(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,r={apiKey:t.apiKey,appName:e.name,v:Ye},i=Hr.get(e.config.apiHost);i&&(r.eid=i);const s=e._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${D(r).slice(1)}`}function Qr(e){return l(this,null,function*(){const t=yield function(e){return Kr=Kr||function(e){return new Promise((t,n)=>{var r,i,s;function o(){zr(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{zr(),n(yt(e,"network-request-failed"))},timeout:qr.get()})}if(null===(i=null===(r=hr().gapi)||void 0===r?void 0:r.iframes)||void 0===i?void 0:i.Iframe)t(gapi.iframes.getContext());else{if(!(null===(s=hr().gapi)||void 0===s?void 0:s.load)){const t=`__iframefcb${Math.floor(1e6*Math.random())}`;return hr()[t]=()=>{gapi.load?o():n(yt(e,"network-request-failed"))},En(`${Tn.gapiScript}?onload=${t}`).catch(e=>n(e))}o()}}).catch(e=>{throw Kr=null,e})}(e),Kr}(e),n=hr().gapi;return It(n,e,"internal-error"),t.open({where:document.body,url:Wr(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:$r,dontclear:!0},t=>new Promise((n,r)=>l(this,null,function*(){yield t.restyle({setHideOnLeave:!1});const i=yt(e,"network-request-failed"),s=hr().setTimeout(()=>{r(i)},Gr.get());function o(){hr().clearTimeout(s),n(t)}t.ping(o).then(o,()=>{r(i)})})))})}
/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const Jr={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class Yr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}
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
 */
const Xr=encodeURIComponent("fac");function Zr(e,t,n,r,i,s){return l(this,null,function*(){It(e.config.authDomain,e,"auth-domain-config-required"),It(e.config.apiKey,e,"invalid-api-key");const s={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:Ye,eventId:i};if(t instanceof Un){t.setDefaultLanguage(e.languageCode),s.providerId=t.providerId||"",function(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(t.getCustomParameters())||(s.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries({}))s[e]=t}if(t instanceof Bn){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(s.scopes=e.join(","))}e.tenantId&&(s.tid=e.tenantId);const o=s;for(const e of Object.keys(o))void 0===o[e]&&delete o[e];const a=yield e._getAppCheckToken(),u=a?`#${Xr}=${encodeURIComponent(a)}`:"";return`${function({config:e}){return e.emulator?kt(e,"emulator/auth/handler"):`https://${e.authDomain}/__/auth/handler`}
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
 */(e)}?${D(o).slice(1)}${u}`})}const ei="webStorageSupport",ti=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ar,this._completeRedirectFn=Lr,this._overrideRedirectResult=Pr}_openPopup(e,t,n,r){return l(this,null,function*(){var i;Tt(null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager,"_initialize() not called before _openPopup()");const s=yield Zr(e,t,n,Et(),r);return function(e,t,n,r=500,i=600){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const u=Object.assign(Object.assign({},Jr),{width:r.toString(),height:i.toString(),top:s,left:o}),c=b().toLowerCase();n&&(a=ln(c)?"_blank":n),un(c)&&(t=t||"http://localhost",u.scrollbars="yes");const l=Object.entries(u).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=b()){var t;return mn(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(c)&&"_self"!==a)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}(t||"",a),new Yr(null);const h=window.open(t||"",a,l);It(h,e,"popup-blocked");try{h.focus()}catch(d){}return new Yr(h)}(e,s,cr())})}_openRedirect(e,t,n,r){return l(this,null,function*(){return yield this._originValidation(e),i=yield Zr(e,t,n,Et(),r),hr().location.href=i,new Promise(()=>{});var i})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(Tt(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}initAndGetManager(e){return l(this,null,function*(){const t=yield Qr(e),n=new Mr(e);return t.register("authEvent",t=>(It(null==t?void 0:t.authEvent,e,"invalid-auth-event"),{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n})}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ei,{type:ei},n=>{var r;const i=null===(r=null==n?void 0:n[0])||void 0===r?void 0:r[ei];void 0!==i&&t(!!i),gt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=function(e){return l(this,null,function*(){if(e.config.emulator)return;const{authorizedDomains:t}=yield function(e){return l(this,arguments,function*(e,t={}){return Rt(e,"GET","/v1/projects",t)})}(e);for(const e of t)try{if(jr(e))return}catch(n){}gt(e,"unauthorized-domain")})}(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return gn()||cn()||mn()}};var ni="@firebase/auth",ri="1.7.9";
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
class ii{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}getToken(e){return l(this,null,function*(){return this.assertAuthConfigured(),yield this.auth._initializationPromise,this.auth.currentUser?{accessToken:yield this.auth.currentUser.getIdToken(e)}:null})}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){It(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
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
 */
const si=_("authIdTokenMaxAge")||300;let oi=null;function ai(e=Ze()){const t=He(e,"auth");if(t.isInitialized())return t.getImmediate();const n=function(e,t){const n=He(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(A(n.getOptions(),null!=t?t:{}))return e;gt(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:ti,persistence:[br,sr,ar]}),r=_("authTokenSyncURL");if(r&&"boolean"==typeof isSecureContext&&isSecureContext){const e=new URL(r,location.origin);if(location.origin===e.origin){const t=(i=e.toString(),e=>l(void 0,null,function*(){const t=e&&(yield e.getIdTokenResult()),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>si)return;const r=null==t?void 0:t.token;oi!==r&&(oi=r,yield fetch(i,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))}));!function(e,t,n){L(e).beforeAuthStateChanged(t,n)}(n,t,()=>t(n.currentUser)),function(e){L(e).onIdTokenChanged(e=>t(e),void 0,void 0)}(n)}}var i;const s=v("auth");return s&&function(e,t){const n=In(e);It(n._canInitEmulator,n,"emulator-config-failed"),It(/^https?:\/\//.test(t),n,"invalid-emulator-scheme");const r=An(t),{host:i,port:s}=function(e){const t=An(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const e=i[1];return{host:e,port:Nn(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:Nn(t)}}}(t),o=null===s?"":`:${s}`;n.config.emulator={url:`${r}//${i}${o}/`},n.settings.appVerificationDisabledForTesting=!0,n.emulatorConfig=Object.freeze({host:i,port:s,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:!1})}),function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&console.info,"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}()}(n,`http://${s}`),n}var ui;Tn={loadJS:e=>new Promise((t,n)=>{const r=document.createElement("script");var i,s;r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=yt("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",(null!==(s=null===(i=document.getElementsByTagName("head"))||void 0===i?void 0:i[0])&&void 0!==s?s:document).appendChild(r)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},ui="Browser",$e(new M("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:s,authDomain:o}=n.options;It(s&&!s.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:s,authDomain:o,clientPlatform:ui,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:yn(ui)},u=new _n(n,r,i,a);return function(e,t){const n=(null==t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(tn);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),$e(new M("auth-internal",e=>{const t=In(e.getProvider("auth").getImmediate());return new ii(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),tt(ni,ri,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(ui)),tt(ni,ri,"esm2017");var ci,li,hi="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function t(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function n(e,t,n){n||(n=0);var r=Array(16);if("string"==typeof t)for(var i=0;16>i;++i)r[i]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(i=0;16>i;++i)r[i]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],i=e.g[2];var s=e.g[3],o=t+(s^n&(i^s))+r[0]+3614090360&4294967295;o=(n=(i=(s=(t=(n=(i=(s=(t=(n=(i=(s=(t=(n=(i=(s=(t=(n=(i=(s=(t=(n=(i=(s=(t=(n=(i=(s=(t=(n=(i=(s=(t=(n=(i=(s=(t=(n=(i=(s=(t=(n=(i=(s=(t=(n=(i=(s=(t=(n=(i=(s=(t=(n=(i=(s=(t=(n=(i=(s=(t=n+(o<<7&4294967295|o>>>25))+((o=s+(i^t&(n^i))+r[1]+3905402710&4294967295)<<12&4294967295|o>>>20))+((o=i+(n^s&(t^n))+r[2]+606105819&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^i&(s^t))+r[3]+3250441966&4294967295)<<22&4294967295|o>>>10))+((o=t+(s^n&(i^s))+r[4]+4118548399&4294967295)<<7&4294967295|o>>>25))+((o=s+(i^t&(n^i))+r[5]+1200080426&4294967295)<<12&4294967295|o>>>20))+((o=i+(n^s&(t^n))+r[6]+2821735955&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^i&(s^t))+r[7]+4249261313&4294967295)<<22&4294967295|o>>>10))+((o=t+(s^n&(i^s))+r[8]+1770035416&4294967295)<<7&4294967295|o>>>25))+((o=s+(i^t&(n^i))+r[9]+2336552879&4294967295)<<12&4294967295|o>>>20))+((o=i+(n^s&(t^n))+r[10]+4294925233&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^i&(s^t))+r[11]+2304563134&4294967295)<<22&4294967295|o>>>10))+((o=t+(s^n&(i^s))+r[12]+1804603682&4294967295)<<7&4294967295|o>>>25))+((o=s+(i^t&(n^i))+r[13]+4254626195&4294967295)<<12&4294967295|o>>>20))+((o=i+(n^s&(t^n))+r[14]+2792965006&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^i&(s^t))+r[15]+1236535329&4294967295)<<22&4294967295|o>>>10))+((o=t+(i^s&(n^i))+r[1]+4129170786&4294967295)<<5&4294967295|o>>>27))+((o=s+(n^i&(t^n))+r[6]+3225465664&4294967295)<<9&4294967295|o>>>23))+((o=i+(t^n&(s^t))+r[11]+643717713&4294967295)<<14&4294967295|o>>>18))+((o=n+(s^t&(i^s))+r[0]+3921069994&4294967295)<<20&4294967295|o>>>12))+((o=t+(i^s&(n^i))+r[5]+3593408605&4294967295)<<5&4294967295|o>>>27))+((o=s+(n^i&(t^n))+r[10]+38016083&4294967295)<<9&4294967295|o>>>23))+((o=i+(t^n&(s^t))+r[15]+3634488961&4294967295)<<14&4294967295|o>>>18))+((o=n+(s^t&(i^s))+r[4]+3889429448&4294967295)<<20&4294967295|o>>>12))+((o=t+(i^s&(n^i))+r[9]+568446438&4294967295)<<5&4294967295|o>>>27))+((o=s+(n^i&(t^n))+r[14]+3275163606&4294967295)<<9&4294967295|o>>>23))+((o=i+(t^n&(s^t))+r[3]+4107603335&4294967295)<<14&4294967295|o>>>18))+((o=n+(s^t&(i^s))+r[8]+1163531501&4294967295)<<20&4294967295|o>>>12))+((o=t+(i^s&(n^i))+r[13]+2850285829&4294967295)<<5&4294967295|o>>>27))+((o=s+(n^i&(t^n))+r[2]+4243563512&4294967295)<<9&4294967295|o>>>23))+((o=i+(t^n&(s^t))+r[7]+1735328473&4294967295)<<14&4294967295|o>>>18))+((o=n+(s^t&(i^s))+r[12]+2368359562&4294967295)<<20&4294967295|o>>>12))+((o=t+(n^i^s)+r[5]+4294588738&4294967295)<<4&4294967295|o>>>28))+((o=s+(t^n^i)+r[8]+2272392833&4294967295)<<11&4294967295|o>>>21))+((o=i+(s^t^n)+r[11]+1839030562&4294967295)<<16&4294967295|o>>>16))+((o=n+(i^s^t)+r[14]+4259657740&4294967295)<<23&4294967295|o>>>9))+((o=t+(n^i^s)+r[1]+2763975236&4294967295)<<4&4294967295|o>>>28))+((o=s+(t^n^i)+r[4]+1272893353&4294967295)<<11&4294967295|o>>>21))+((o=i+(s^t^n)+r[7]+4139469664&4294967295)<<16&4294967295|o>>>16))+((o=n+(i^s^t)+r[10]+3200236656&4294967295)<<23&4294967295|o>>>9))+((o=t+(n^i^s)+r[13]+681279174&4294967295)<<4&4294967295|o>>>28))+((o=s+(t^n^i)+r[0]+3936430074&4294967295)<<11&4294967295|o>>>21))+((o=i+(s^t^n)+r[3]+3572445317&4294967295)<<16&4294967295|o>>>16))+((o=n+(i^s^t)+r[6]+76029189&4294967295)<<23&4294967295|o>>>9))+((o=t+(n^i^s)+r[9]+3654602809&4294967295)<<4&4294967295|o>>>28))+((o=s+(t^n^i)+r[12]+3873151461&4294967295)<<11&4294967295|o>>>21))+((o=i+(s^t^n)+r[15]+530742520&4294967295)<<16&4294967295|o>>>16))+((o=n+(i^s^t)+r[2]+3299628645&4294967295)<<23&4294967295|o>>>9))+((o=t+(i^(n|~s))+r[0]+4096336452&4294967295)<<6&4294967295|o>>>26))+((o=s+(n^(t|~i))+r[7]+1126891415&4294967295)<<10&4294967295|o>>>22))+((o=i+(t^(s|~n))+r[14]+2878612391&4294967295)<<15&4294967295|o>>>17))+((o=n+(s^(i|~t))+r[5]+4237533241&4294967295)<<21&4294967295|o>>>11))+((o=t+(i^(n|~s))+r[12]+1700485571&4294967295)<<6&4294967295|o>>>26))+((o=s+(n^(t|~i))+r[3]+2399980690&4294967295)<<10&4294967295|o>>>22))+((o=i+(t^(s|~n))+r[10]+4293915773&4294967295)<<15&4294967295|o>>>17))+((o=n+(s^(i|~t))+r[1]+2240044497&4294967295)<<21&4294967295|o>>>11))+((o=t+(i^(n|~s))+r[8]+1873313359&4294967295)<<6&4294967295|o>>>26))+((o=s+(n^(t|~i))+r[15]+4264355552&4294967295)<<10&4294967295|o>>>22))+((o=i+(t^(s|~n))+r[6]+2734768916&4294967295)<<15&4294967295|o>>>17))+((o=n+(s^(i|~t))+r[13]+1309151649&4294967295)<<21&4294967295|o>>>11))+((s=(t=n+((o=t+(i^(n|~s))+r[4]+4149444226&4294967295)<<6&4294967295|o>>>26))+((o=s+(n^(t|~i))+r[11]+3174756917&4294967295)<<10&4294967295|o>>>22))^((i=s+((o=i+(t^(s|~n))+r[2]+718787259&4294967295)<<15&4294967295|o>>>17))|~t))+r[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(o<<21&4294967295|o>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+s&4294967295}function r(e,t){this.h=t;for(var n=[],r=!0,i=e.length-1;0<=i;i--){var s=0|e[i];r&&s==t||(n[i]=s,r=!1)}this.g=n}!function(e,t){function n(){}n.prototype=t.prototype,e.D=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.C=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}(t,function(){this.blockSize=-1}),t.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},t.prototype.u=function(e,t){void 0===t&&(t=e.length);for(var r=t-this.blockSize,i=this.B,s=this.h,o=0;o<t;){if(0==s)for(;o<=r;)n(this,e,o),o+=this.blockSize;if("string"==typeof e){for(;o<t;)if(i[s++]=e.charCodeAt(o++),s==this.blockSize){n(this,i),s=0;break}}else for(;o<t;)if(i[s++]=e[o++],s==this.blockSize){n(this,i),s=0;break}}this.h=s,this.o+=t},t.prototype.v=function(){var e=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;var n=8*this.o;for(t=e.length-8;t<e.length;++t)e[t]=255&n,n/=256;for(this.u(e),e=Array(16),t=n=0;4>t;++t)for(var r=0;32>r;r+=8)e[n++]=this.g[t]>>>r&255;return e};var i={};function s(e){return-128<=e&&128>e?function(e){var t=i;return Object.prototype.hasOwnProperty.call(t,e)?t[e]:t[e]=function(e){return new r([0|e],0>e?-1:0)}(e)}(e):new r([0|e],0>e?-1:0)}function o(e){if(isNaN(e)||!isFinite(e))return a;if(0>e)return d(o(-e));for(var t=[],n=1,i=0;e>=n;i++)t[i]=e/n|0,n*=4294967296;return new r(t,0)}var a=s(0),u=s(1),c=s(16777216);function l(e){if(0!=e.h)return!1;for(var t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function h(e){return-1==e.h}function d(e){for(var t=e.g.length,n=[],i=0;i<t;i++)n[i]=~e.g[i];return new r(n,~e.h).add(u)}function f(e,t){return e.add(d(t))}function p(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function m(e,t){this.g=e,this.h=t}function g(e,t){if(l(t))throw Error("division by zero");if(l(e))return new m(a,a);if(h(e))return t=g(d(e),t),new m(d(t.g),d(t.h));if(h(t))return t=g(e,d(t)),new m(d(t.g),t.h);if(30<e.g.length){if(h(e)||h(t))throw Error("slowDivide_ only works with positive integers.");for(var n=u,r=t;0>=r.l(e);)n=y(n),r=y(r);var i=v(n,1),s=v(r,1);for(r=v(r,2),n=v(n,2);!l(r);){var c=s.add(r);0>=c.l(e)&&(i=i.add(n),s=c),r=v(r,1),n=v(n,1)}return t=f(e,i.j(t)),new m(i,t)}for(i=a;0<=e.l(t);){for(n=Math.max(1,Math.floor(e.m()/t.m())),r=48>=(r=Math.ceil(Math.log(n)/Math.LN2))?1:Math.pow(2,r-48),c=(s=o(n)).j(t);h(c)||0<c.l(e);)c=(s=o(n-=r)).j(t);l(s)&&(s=u),i=i.add(s),e=f(e,c)}return new m(i,e)}function y(e){for(var t=e.g.length+1,n=[],i=0;i<t;i++)n[i]=e.i(i)<<1|e.i(i-1)>>>31;return new r(n,e.h)}function v(e,t){var n=t>>5;t%=32;for(var i=e.g.length-n,s=[],o=0;o<i;o++)s[o]=0<t?e.i(o+n)>>>t|e.i(o+n+1)<<32-t:e.i(o+n);return new r(s,e.h)}(e=r.prototype).m=function(){if(h(this))return-d(this).m();for(var e=0,t=1,n=0;n<this.g.length;n++){var r=this.i(n);e+=(0<=r?r:4294967296+r)*t,t*=4294967296}return e},e.toString=function(e){if(2>(e=e||10)||36<e)throw Error("radix out of range: "+e);if(l(this))return"0";if(h(this))return"-"+d(this).toString(e);for(var t=o(Math.pow(e,6)),n=this,r="";;){var i=g(n,t).g,s=((0<(n=f(n,i.j(t))).g.length?n.g[0]:n.h)>>>0).toString(e);if(l(n=i))return s+r;for(;6>s.length;)s="0"+s;r=s+r}},e.i=function(e){return 0>e?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return h(e=f(this,e))?-1:l(e)?0:1},e.abs=function(){return h(this)?d(this):this},e.add=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0,s=0;s<=t;s++){var o=i+(65535&this.i(s))+(65535&e.i(s)),a=(o>>>16)+(this.i(s)>>>16)+(e.i(s)>>>16);i=a>>>16,o&=65535,a&=65535,n[s]=a<<16|o}return new r(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(l(this)||l(e))return a;if(h(this))return h(e)?d(this).j(d(e)):d(d(this).j(e));if(h(e))return d(this.j(d(e)));if(0>this.l(c)&&0>e.l(c))return o(this.m()*e.m());for(var t=this.g.length+e.g.length,n=[],i=0;i<2*t;i++)n[i]=0;for(i=0;i<this.g.length;i++)for(var s=0;s<e.g.length;s++){var u=this.i(i)>>>16,f=65535&this.i(i),m=e.i(s)>>>16,g=65535&e.i(s);n[2*i+2*s]+=f*g,p(n,2*i+2*s),n[2*i+2*s+1]+=u*g,p(n,2*i+2*s+1),n[2*i+2*s+1]+=f*m,p(n,2*i+2*s+1),n[2*i+2*s+2]+=u*m,p(n,2*i+2*s+2)}for(i=0;i<t;i++)n[i]=n[2*i+1]<<16|n[2*i];for(i=t;i<2*t;i++)n[i]=0;return new r(n,0)},e.A=function(e){return g(this,e).h},e.and=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0;i<t;i++)n[i]=this.i(i)&e.i(i);return new r(n,this.h&e.h)},e.or=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0;i<t;i++)n[i]=this.i(i)|e.i(i);return new r(n,this.h|e.h)},e.xor=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0;i<t;i++)n[i]=this.i(i)^e.i(i);return new r(n,this.h^e.h)},t.prototype.digest=t.prototype.v,t.prototype.reset=t.prototype.s,t.prototype.update=t.prototype.u,li=t,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.A,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=o,r.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return d(e(t.substring(1),n));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var r=o(Math.pow(n,8)),i=a,s=0;s<t.length;s+=8){var u=Math.min(8,t.length-s),c=parseInt(t.substring(s,s+u),n);8>u?(u=o(Math.pow(n,u)),i=i.j(u).add(o(c))):i=(i=i.j(r)).add(o(c))}return i},ci=r}).apply(void 0!==hi?hi:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var di,fi,pi,mi,gi,yi,vi,wi,_i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e,t="function"==typeof Object.defineProperties?Object.defineProperty:function(e,t,n){return e==Array.prototype||e==Object.prototype||(e[t]=n.value),e},n=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof _i&&_i];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);!function(e,r){if(r)e:{var i=n;e=e.split(".");for(var s=0;s<e.length-1;s++){var o=e[s];if(!(o in i))break e;i=i[o]}(r=r(s=i[e=e[e.length-1]]))!=s&&null!=r&&t(i,e,{configurable:!0,writable:!0,value:r})}}("Array.prototype.values",function(e){return e||function(){return function(e,t){e instanceof String&&(e+="");var n=0,r=!1,i={next:function(){if(!r&&n<e.length){var i=n++;return{value:t(0,e[i]),done:!1}}return r=!0,{done:!0,value:void 0}}};return i[Symbol.iterator]=function(){return i},i}(this,function(e,t){return t})}});
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var r=r||{},i=this||self;function s(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function o(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function a(e,t,n){return e.call.apply(e.bind,arguments)}function u(e,t,n){if(!e)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function c(e,t,n){return(c=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?a:u).apply(null,arguments)}function l(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function h(e,t){function n(){}n.prototype=t.prototype,e.aa=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Qb=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}function d(e){const t=e.length;if(0<t){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function f(e,t){for(let n=1;n<arguments.length;n++){const t=arguments[n];if(s(t)){const n=e.length||0,r=t.length||0;e.length=n+r;for(let i=0;i<r;i++)e[n+i]=t[i]}else e.push(t)}}function p(e){return/^[\s\xa0]*$/.test(e)}function m(){var e=i.navigator;return e&&(e=e.userAgent)?e:""}function g(e){return g[" "](e),e}g[" "]=function(){};var y=!(-1==m().indexOf("Gecko")||-1!=m().toLowerCase().indexOf("webkit")&&-1==m().indexOf("Edge")||-1!=m().indexOf("Trident")||-1!=m().indexOf("MSIE")||-1!=m().indexOf("Edge"));function v(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function w(e){const t={};for(const n in e)t[n]=e[n];return t}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(e,t){let n,r;for(let i=1;i<arguments.length;i++){for(n in r=arguments[i],r)e[n]=r[n];for(let t=0;t<_.length;t++)n=_[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function b(e){var t=1;e=e.split(":");const n=[];for(;0<t&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function T(e){i.setTimeout(()=>{throw e},0)}function E(){var e=N;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var S=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new C,e=>e.reset());class C{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let k,A=!1,N=new class{constructor(){this.h=this.g=null}add(e,t){const n=S.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}},D=()=>{const e=i.Promise.resolve(void 0);k=()=>{e.then(x)}};var x=()=>{for(var e;e=E();){try{e.h.call(e.g)}catch(n){T(n)}var t=S;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}A=!1};function R(){this.s=this.s,this.C=this.C}function O(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}R.prototype.s=!1,R.prototype.ma=function(){this.s||(this.s=!0,this.N())},R.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},O.prototype.h=function(){this.defaultPrevented=!0};var P=function(){if(!i.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};i.addEventListener("test",e,t),i.removeEventListener("test",e,t)}catch(n){}return e}();function L(e,t){if(O.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(y){e:{try{g(t.nodeName);var i=!0;break e}catch(s){}i=!1}i||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:M[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&L.aa.h.call(this)}}h(L,O);var M={2:"touch",3:"pen",4:"mouse"};L.prototype.h=function(){L.aa.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var V="closure_listenable_"+(1e6*Math.random()|0),F=0;function U(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=i,this.key=++F,this.da=this.fa=!1}function B(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function j(e){this.src=e,this.g={},this.h=0}function q(e,t){var n=t.type;if(n in e.g){var r,i=e.g[n],s=Array.prototype.indexOf.call(i,t,void 0);(r=0<=s)&&Array.prototype.splice.call(i,s,1),r&&(B(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function z(e,t,n,r){for(var i=0;i<e.length;++i){var s=e[i];if(!s.da&&s.listener==t&&s.capture==!!n&&s.ha==r)return i}return-1}j.prototype.add=function(e,t,n,r,i){var s=e.toString();(e=this.g[s])||(e=this.g[s]=[],this.h++);var o=z(e,t,r,i);return-1<o?(t=e[o],n||(t.fa=!1)):((t=new U(t,this.src,s,!!r,i)).fa=n,e.push(t)),t};var K="closure_lm_"+(1e6*Math.random()|0),G={};function $(e,t,n,r,i){if(Array.isArray(t)){for(var s=0;s<t.length;s++)$(e,t[s],n,r,i);return null}return n=Z(n),e&&e[V]?e.K(t,n,!!o(r)&&!!r.capture,i):function(e,t,n,r,i,s){if(!t)throw Error("Invalid event type");var a=o(i)?!!i.capture:!!i,u=Y(e);if(u||(e[K]=u=new j(e)),(n=u.add(t,n,r,a,s)).proxy)return n;if(r=function(){const e=J;return function t(n){return e.call(t.src,t.listener,n)}}(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)P||(i=a),void 0===i&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent(Q(t.toString()),r);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(r)}return n}(e,t,n,!1,r,i)}function H(e,t,n,r,i){if(Array.isArray(t))for(var s=0;s<t.length;s++)H(e,t[s],n,r,i);else r=o(r)?!!r.capture:!!r,n=Z(n),e&&e[V]?(e=e.i,(t=String(t).toString())in e.g&&-1<(n=z(s=e.g[t],n,r,i))&&(B(s[n]),Array.prototype.splice.call(s,n,1),0==s.length&&(delete e.g[t],e.h--))):e&&(e=Y(e))&&(t=e.g[t.toString()],e=-1,t&&(e=z(t,n,r,i)),(n=-1<e?t[e]:null)&&W(n))}function W(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[V])q(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(Q(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=Y(t))?(q(n,e),0==n.h&&(n.src=null,t[K]=null)):B(e)}}}function Q(e){return e in G?G[e]:G[e]="on"+e}function J(e,t){if(e.da)e=!0;else{t=new L(t,this);var n=e.listener,r=e.ha||e.src;e.fa&&W(e),e=n.call(r,t)}return e}function Y(e){return(e=e[K])instanceof j?e:null}var X="__closure_events_fn_"+(1e9*Math.random()>>>0);function Z(e){return"function"==typeof e?e:(e[X]||(e[X]=function(t){return e.handleEvent(t)}),e[X])}function ee(){R.call(this),this.i=new j(this),this.M=this,this.F=null}function te(e,t){var n,r=e.F;if(r)for(n=[];r;r=r.F)n.push(r);if(e=e.M,r=t.type||t,"string"==typeof t)t=new O(t,e);else if(t instanceof O)t.target=t.target||e;else{var i=t;I(t=new O(r,e),i)}if(i=!0,n)for(var s=n.length-1;0<=s;s--){var o=t.g=n[s];i=ne(o,r,!0,t)&&i}if(i=ne(o=t.g=e,r,!0,t)&&i,i=ne(o,r,!1,t)&&i,n)for(s=0;s<n.length;s++)i=ne(o=t.g=n[s],r,!1,t)&&i}function ne(e,t,n,r){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var i=!0,s=0;s<t.length;++s){var o=t[s];if(o&&!o.da&&o.capture==n){var a=o.listener,u=o.ha||o.src;o.fa&&q(e.i,o),i=!1!==a.call(u,r)&&i}}return i&&!r.defaultPrevented}function re(e,t,n){if("function"==typeof e)n&&(e=c(e,n));else{if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=c(e.handleEvent,e)}return 2147483647<Number(t)?-1:i.setTimeout(e,t||0)}function ie(e){e.g=re(()=>{e.g=null,e.i&&(e.i=!1,ie(e))},e.l);const t=e.h;e.h=null,e.m.apply(null,t)}h(ee,R),ee.prototype[V]=!0,ee.prototype.removeEventListener=function(e,t,n,r){H(this,e,t,n,r)},ee.prototype.N=function(){if(ee.aa.N.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)B(n[r]);delete t.g[e],t.h--}}this.F=null},ee.prototype.K=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},ee.prototype.L=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};class se extends R{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:ie(this)}N(){super.N(),this.g&&(i.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function oe(e){R.call(this),this.h=e,this.g={}}h(oe,R);var ae=[];function ue(e){v(e.g,function(e,t){this.g.hasOwnProperty(t)&&W(e)},e),e.g={}}oe.prototype.N=function(){oe.aa.N.call(this),ue(this)},oe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var le=i.JSON.stringify,he=i.JSON.parse,de=class{stringify(e){return i.JSON.stringify(e,void 0)}parse(e){return i.JSON.parse(e,void 0)}};function fe(){}function pe(e){return e.h||(e.h=e.i())}function me(){}fe.prototype.h=null;var ge={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ye(){O.call(this,"d")}function ve(){O.call(this,"c")}h(ye,O),h(ve,O);var we={},_e=null;function Ie(){return _e=_e||new ee}function be(e){O.call(this,we.La,e)}function Te(e){const t=Ie();te(t,new be(t))}function Ee(e,t){O.call(this,we.STAT_EVENT,e),this.stat=t}function Se(e){const t=Ie();te(t,new Ee(t,e))}function Ce(e,t){O.call(this,we.Ma,e),this.size=t}function ke(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return i.setTimeout(function(){e()},t)}function Ae(){this.g=!0}function Ne(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n)for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var r=n[e];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(var o=1;o<i.length;o++)i[o]=""}}}return le(n)}catch(a){return t}}(e,n)+(r?" "+r:"")})}we.La="serverreachability",h(be,O),we.STAT_EVENT="statevent",h(Ee,O),we.Ma="timingevent",h(Ce,O),Ae.prototype.xa=function(){this.g=!1},Ae.prototype.info=function(){};var De,xe={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Re={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"};function Oe(){}function Pe(e,t,n,r){this.j=e,this.i=t,this.l=n,this.R=r||1,this.U=new oe(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Le}function Le(){this.i=null,this.g="",this.h=!1}h(Oe,fe),Oe.prototype.g=function(){return new XMLHttpRequest},Oe.prototype.i=function(){return{}},De=new Oe;var Me={},Ve={};function Fe(e,t,n){e.L=1,e.v=lt(st(t)),e.m=n,e.P=!0,Ue(e,null)}function Ue(e,t){e.F=Date.now(),qe(e),e.A=st(e.v);var n=e.A,r=e.R;Array.isArray(r)||(r=[String(r)]),Tt(n.i,"t",r),e.C=0,n=e.j.J,e.h=new Le,e.g=hn(e.j,n?t:null,!e.m),0<e.O&&(e.M=new se(c(e.Y,e,e.g),e.O)),t=e.U,n=e.g,r=e.ca;var i="readystatechange";Array.isArray(i)||(i&&(ae[0]=i.toString()),i=ae);for(var s=0;s<i.length;s++){var o=$(n,i[s],r||t.handleEvent,!1,t.h||t);if(!o)break;t.g[o.key]=o}t=e.H?w(e.H):{},e.m?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.A,e.u,e.m,t)):(e.u="GET",e.g.ea(e.A,e.u,null,t)),Te(),function(e,t,n,r,i,s){e.info(function(){if(e.g)if(s)for(var o="",a=s.split("&"),u=0;u<a.length;u++){var c=a[u].split("=");if(1<c.length){var l=c[0];c=c[1];var h=l.split("_");o=2<=h.length&&"type"==h[1]?o+(l+"=")+c+"&":o+(l+"=redacted&")}}else o=null;else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+t+"\n"+n+"\n"+o})}(e.i,e.u,e.A,e.l,e.R,e.m)}function Be(e){return!!e.g&&"GET"==e.u&&2!=e.L&&e.j.Ca}function je(e,t){var n=e.C,r=t.indexOf("\n",n);return-1==r?Ve:(n=Number(t.substring(n,r)),isNaN(n)?Me:(r+=1)+n>t.length?Ve:(t=t.slice(r,r+n),e.C=r+n,t))}function qe(e){e.S=Date.now()+e.I,ze(e,e.I)}function ze(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=ke(c(e.ba,e),t)}function Ke(e){e.B&&(i.clearTimeout(e.B),e.B=null)}function Ge(e){0==e.j.G||e.J||on(e.j,e)}function $e(e){Ke(e);var t=e.M;t&&"function"==typeof t.ma&&t.ma(),e.M=null,ue(e.U),e.g&&(t=e.g,e.g=null,t.abort(),t.ma())}function He(e,t){try{var n=e.j;if(0!=n.G&&(n.g==e||Xe(n.h,e)))if(!e.K&&Xe(n.h,e)&&3==n.G){try{var r=n.Da.g.parse(t)}catch(l){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){e:if(!n.u){if(n.g){if(!(n.g.F+3e3<e.F))break e;sn(n),Wt(n)}tn(n),Se(18)}}else n.za=i[1],0<n.za-n.T&&37500>i[2]&&n.F&&0==n.v&&!n.C&&(n.C=ke(c(n.Za,n),6e3));if(1>=Ye(n.h)&&n.ca){try{n.ca()}catch(l){}n.ca=void 0}}else un(n,11)}else if((e.K||n.g==e)&&sn(n),!p(t))for(i=n.Da.g.parse(t),t=0;t<i.length;t++){let c=i[t];if(n.T=c[0],c=c[1],2==n.G)if("c"==c[0]){n.K=c[1],n.ia=c[2];const t=c[3];null!=t&&(n.la=t,n.j.info("VER="+n.la));const i=c[4];null!=i&&(n.Aa=i,n.j.info("SVER="+n.Aa));const l=c[5];null!=l&&"number"==typeof l&&0<l&&(r=1.5*l,n.L=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=r.h;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(Ze(s,s.h),s.h=null))}if(r.D){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.ya=e,ct(r.I,r.D,e))}}n.G=3,n.l&&n.l.ua(),n.ba&&(n.R=Date.now()-e.F,n.j.info("Handshake RTT: "+n.R+"ms"));var o=e;if((r=n).qa=ln(r,r.J?r.ia:null,r.W),o.K){et(r.h,o);var a=o,u=r.L;u&&(a.I=u),a.B&&(Ke(a),qe(a)),r.g=o}else en(r);0<n.i.length&&Jt(n)}else"stop"!=c[0]&&"close"!=c[0]||un(n,7);else 3==n.G&&("stop"==c[0]||"close"==c[0]?"stop"==c[0]?un(n,7):Ht(n):"noop"!=c[0]&&n.l&&n.l.ta(c),n.v=0)}Te()}catch(l){}}Pe.prototype.ca=function(e){e=e.target;const t=this.M;t&&3==zt(e)?t.j():this.Y(e)},Pe.prototype.Y=function(e){try{if(e==this.g)e:{const d=zt(this.g);var t=this.g.Ba();if(this.g.Z(),!(3>d)&&(3!=d||this.g&&(this.h.h||this.g.oa()||Kt(this.g)))){this.J||4!=d||7==t||Te(),Ke(this);var n=this.g.Z();this.X=n;t:if(Be(this)){var r=Kt(this.g);e="";var s=r.length,o=4==zt(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){$e(this),Ge(this);var a="";break t}this.h.i=new i.TextDecoder}for(t=0;t<s;t++)this.h.h=!0,e+=this.h.i.decode(r[t],{stream:!(o&&t==s-1)});r.length=0,this.h.g+=e,this.C=0,a=this.h.g}else a=this.g.oa();if(this.o=200==n,function(e,t,n,r,i,s,o){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+s+" "+o})}(this.i,this.u,this.A,this.l,this.R,d,n),this.o){if(this.T&&!this.K){t:{if(this.g){var u,c=this.g;if((u=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!p(u)){var l=u;break t}}l=null}if(!(n=l)){this.o=!1,this.s=3,Se(12),$e(this),Ge(this);break e}Ne(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,He(this,n)}if(this.P){let e;for(n=!0;!this.J&&this.C<a.length;){if(e=je(this,a),e==Ve){4==d&&(this.s=4,Se(14),n=!1),Ne(this.i,this.l,null,"[Incomplete Response]");break}if(e==Me){this.s=4,Se(15),Ne(this.i,this.l,a,"[Invalid Chunk]"),n=!1;break}Ne(this.i,this.l,e,null),He(this,e)}if(Be(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=d||0!=a.length||this.h.h||(this.s=1,Se(16),n=!1),this.o=this.o&&n,n){if(0<a.length&&!this.W){this.W=!0;var h=this.j;h.g==this&&h.ba&&!h.M&&(h.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),nn(h),h.M=!0,Se(11))}}else Ne(this.i,this.l,a,"[Invalid Chunked Response]"),$e(this),Ge(this)}else Ne(this.i,this.l,a,null),He(this,a);4==d&&$e(this),this.o&&!this.J&&(4==d?on(this.j,this):(this.o=!1,qe(this)))}else(function(e){const t={};e=(e.g&&2<=zt(e)&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<e.length;r++){if(p(e[r]))continue;var n=b(e[r]);const i=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const s=t[i]||[];t[i]=s,s.push(n)}!function(e,t){for(const n in e)t.call(void 0,e[n],n,e)}(t,function(e){return e.join(", ")})})(this.g),400==n&&0<a.indexOf("Unknown SID")?(this.s=3,Se(12)):(this.s=0,Se(13)),$e(this),Ge(this)}}}catch(d){}},Pe.prototype.cancel=function(){this.J=!0,$e(this)},Pe.prototype.ba=function(){this.B=null;const e=Date.now();0<=e-this.S?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.A),2!=this.L&&(Te(),Se(17)),$e(this),this.s=2,Ge(this)):ze(this,this.S-e)};var We=class{constructor(e,t){this.g=e,this.map=t}};function Qe(e){this.l=e||10,e=i.PerformanceNavigationTiming?0<(e=i.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):!!(i.chrome&&i.chrome.loadTimes&&i.chrome.loadTimes()&&i.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Je(e){return!!e.h||!!e.g&&e.g.size>=e.j}function Ye(e){return e.h?1:e.g?e.g.size:0}function Xe(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function Ze(e,t){e.g?e.g.add(t):e.h=t}function et(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function tt(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.D);return t}return d(e.i)}function nt(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(s(e)||"string"==typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var n=function(e){if(e.na&&"function"==typeof e.na)return e.na();if(!e.V||"function"!=typeof e.V){if("undefined"!=typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!=typeof Set&&e instanceof Set)){if(s(e)||"string"==typeof e){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}t=[],n=0;for(const r in e)t[n++]=r;return t}}}(e),r=function(e){if(e.V&&"function"==typeof e.V)return e.V();if("undefined"!=typeof Map&&e instanceof Map||"undefined"!=typeof Set&&e instanceof Set)return Array.from(e.values());if("string"==typeof e)return e.split("");if(s(e)){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}for(r in t=[],n=0,e)t[n++]=e[r];return t}(e),i=r.length,o=0;o<i;o++)t.call(void 0,r[o],n&&n[o],e)}Qe.prototype.cancel=function(){if(this.i=tt(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var rt=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function it(e){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,e instanceof it){this.h=e.h,ot(this,e.j),this.o=e.o,this.g=e.g,at(this,e.s),this.l=e.l;var t=e.i,n=new wt;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),ut(this,n),this.m=e.m}else e&&(t=String(e).match(rt))?(this.h=!1,ot(this,t[1]||"",!0),this.o=ht(t[2]||""),this.g=ht(t[3]||"",!0),at(this,t[4]),this.l=ht(t[5]||"",!0),ut(this,t[6]||"",!0),this.m=ht(t[7]||"")):(this.h=!1,this.i=new wt(null,this.h))}function st(e){return new it(e)}function ot(e,t,n){e.j=n?ht(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function at(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.s=t}else e.s=null}function ut(e,t,n){t instanceof wt?(e.i=t,function(e,t){t&&!e.j&&(_t(e),e.i=null,e.g.forEach(function(e,t){var n=t.toLowerCase();t!=n&&(It(this,t),Tt(this,n,e))},e)),e.j=t}(e.i,e.h)):(n||(t=dt(t,yt)),e.i=new wt(t,e.h))}function ct(e,t,n){e.i.set(t,n)}function lt(e){return ct(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function ht(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function dt(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,ft),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function ft(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}it.prototype.toString=function(){var e=[],t=this.j;t&&e.push(dt(t,pt,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(dt(t,pt,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.s)&&e.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(dt(n,"/"==n.charAt(0)?gt:mt,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",dt(n,vt)),e.join("")};var pt=/[#\/\?@]/g,mt=/[#\?:]/g,gt=/[#\?]/g,yt=/[#\?@]/g,vt=/#/g;function wt(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function _t(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var r=e[n].indexOf("="),i=null;if(0<=r){var s=e[n].substring(0,r);i=e[n].substring(r+1)}else s=e[n];t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function It(e,t){_t(e),t=Et(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function bt(e,t){return _t(e),t=Et(e,t),e.g.has(t)}function Tt(e,t,n){It(e,t),0<n.length&&(e.i=null,e.g.set(Et(e,t),d(n)),e.h+=n.length)}function Et(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function St(e,t,n,r,i){try{i&&(i.onload=null,i.onerror=null,i.onabort=null,i.ontimeout=null),r(n)}catch(s){}}function Ct(){this.g=new de}function kt(e,t,n){const r=n||"";try{nt(e,function(e,n){let i=e;o(e)&&(i=le(e)),t.push(r+n+"="+encodeURIComponent(i))})}catch(i){throw t.push(r+"type="+encodeURIComponent("_badmap")),i}}function At(e){this.l=e.Ub||null,this.j=e.eb||!1}function Nt(e,t){ee.call(this),this.D=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function Dt(e){e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e))}function xt(e){e.readyState=4,e.l=null,e.j=null,e.v=null,Rt(e)}function Rt(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function Ot(e){let t="";return v(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function Pt(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=Ot(n),"string"==typeof e?null!=n&&encodeURIComponent(String(n)):ct(e,t,n))}function Lt(e){ee.call(this),this.headers=new Map,this.o=e||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}(e=wt.prototype).add=function(e,t){_t(this),this.i=null,e=Et(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){_t(this),this.g.forEach(function(n,r){n.forEach(function(n){e.call(t,n,r,this)},this)},this)},e.na=function(){_t(this);const e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let r=0;r<t.length;r++){const i=e[r];for(let e=0;e<i.length;e++)n.push(t[r])}return n},e.V=function(e){_t(this);let t=[];if("string"==typeof e)bt(this,e)&&(t=t.concat(this.g.get(Et(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t},e.set=function(e,t){return _t(this),this.i=null,bt(this,e=Et(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e&&0<(e=this.V(e)).length?String(e[0]):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var r=t[n];const s=encodeURIComponent(String(r)),o=this.V(r);for(r=0;r<o.length;r++){var i=s;""!==o[r]&&(i+="="+encodeURIComponent(String(o[r]))),e.push(i)}}return this.i=e.join("&")},h(At,fe),At.prototype.g=function(){return new Nt(this.l,this.j)},At.prototype.i=function(e){return function(){return e}}({}),h(Nt,ee),(e=Nt.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=e,this.A=t,this.readyState=1,Rt(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.u,method:this.B,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||i).fetch(new Request(this.A,t)).then(this.Sa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,xt(this)),this.readyState=0},e.Sa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,Rt(this)),this.g&&(this.readyState=3,Rt(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(void 0!==i.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Dt(this)}else e.text().then(this.Ra.bind(this),this.ga.bind(this))},e.Pa=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.v.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?xt(this):Rt(this),3==this.readyState&&Dt(this)}},e.Ra=function(e){this.g&&(this.response=this.responseText=e,xt(this))},e.Qa=function(e){this.g&&(this.response=e,xt(this))},e.ga=function(){this.g&&xt(this)},e.setRequestHeader=function(e,t){this.u.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(Nt.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),h(Lt,ee);var Mt=/^https?$/i,Vt=["POST","PUT"];function Ft(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.m=5,Ut(e),jt(e)}function Ut(e){e.A||(e.A=!0,te(e,"complete"),te(e,"error"))}function Bt(e){if(e.h&&void 0!==r&&(!e.v[1]||4!=zt(e)||2!=e.Z()))if(e.u&&4==zt(e))re(e.Ea,0,e);else if(te(e,"readystatechange"),4==zt(e)){e.h=!1;try{const r=e.Z();e:switch(r){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var s;if(s=0===r){var o=String(e.D).match(rt)[1]||null;!o&&i.self&&i.self.location&&(o=i.self.location.protocol.slice(0,-1)),s=!Mt.test(o?o.toLowerCase():"")}n=s}if(n)te(e,"complete"),te(e,"success");else{e.m=6;try{var a=2<zt(e)?e.g.statusText:""}catch(u){a=""}e.l=a+" ["+e.Z()+"]",Ut(e)}}finally{jt(e)}}}function jt(e,t){if(e.g){qt(e);const r=e.g,i=e.v[0]?()=>{}:null;e.g=null,e.v=null,t||te(e,"ready");try{r.onreadystatechange=i}catch(n){}}}function qt(e){e.I&&(i.clearTimeout(e.I),e.I=null)}function zt(e){return e.g?e.g.readyState:0}function Kt(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.H){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function Gt(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function $t(e){this.Aa=0,this.i=[],this.j=new Ae,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Gt("failFast",!1,e),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Gt("baseRetryDelayMs",5e3,e),this.cb=Gt("retryDelaySeedMs",1e4,e),this.Wa=Gt("forwardChannelMaxRetries",2,e),this.wa=Gt("forwardChannelRequestTimeoutMs",2e4,e),this.pa=e&&e.xmlHttpFactory||void 0,this.Xa=e&&e.Tb||void 0,this.Ca=e&&e.useFetchStreams||!1,this.L=void 0,this.J=e&&e.supportsCrossDomainXhr||!1,this.K="",this.h=new Qe(e&&e.concurrentRequestLimit),this.Da=new Ct,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=e&&e.Rb||!1,e&&e.xa&&this.j.xa(),e&&e.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&e&&e.detectBufferingProxy||!1,this.ja=void 0,e&&e.longPollingTimeout&&0<e.longPollingTimeout&&(this.ja=e.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function Ht(e){if(Qt(e),3==e.G){var t=e.U++,n=st(e.I);if(ct(n,"SID",e.K),ct(n,"RID",t),ct(n,"TYPE","terminate"),Xt(e,n),(t=new Pe(e,e.j,t)).L=2,t.v=lt(st(n)),n=!1,i.navigator&&i.navigator.sendBeacon)try{n=i.navigator.sendBeacon(t.v.toString(),"")}catch(r){}!n&&i.Image&&((new Image).src=t.v,n=!0),n||(t.g=hn(t.j,null),t.g.ea(t.v)),t.F=Date.now(),qe(t)}cn(e)}function Wt(e){e.g&&(nn(e),e.g.cancel(),e.g=null)}function Qt(e){Wt(e),e.u&&(i.clearTimeout(e.u),e.u=null),sn(e),e.h.cancel(),e.s&&("number"==typeof e.s&&i.clearTimeout(e.s),e.s=null)}function Jt(e){if(!Je(e.h)&&!e.s){e.s=!0;var t=e.Ga;k||D(),A||(k(),A=!0),N.add(t,e),e.B=0}}function Yt(e,t){var n;n=t?t.l:e.U++;const r=st(e.I);ct(r,"SID",e.K),ct(r,"RID",n),ct(r,"AID",e.T),Xt(e,r),e.m&&e.o&&Pt(r,e.m,e.o),n=new Pe(e,e.j,n,e.B+1),null===e.m&&(n.H=e.o),t&&(e.i=t.D.concat(e.i)),t=Zt(e,n,1e3),n.I=Math.round(.5*e.wa)+Math.round(.5*e.wa*Math.random()),Ze(e.h,n),Fe(n,r,t)}function Xt(e,t){e.H&&v(e.H,function(e,n){ct(t,n,e)}),e.l&&nt({},function(e,n){ct(t,n,e)})}function Zt(e,t,n){n=Math.min(e.i.length,n);var r=e.l?c(e.l.Na,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?0<n?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let o=!0;for(let a=0;a<n;a++){let n=i[a].g;const u=i[a].map;if(n-=t,0>n)t=Math.max(0,i[a].g-100),o=!1;else try{kt(u,e,"req"+n+"_")}catch(s){r&&r(u)}}if(o){r=e.join("&");break e}}}return e=e.i.splice(0,n),t.D=e,r}function en(e){if(!e.g&&!e.u){e.Y=1;var t=e.Fa;k||D(),A||(k(),A=!0),N.add(t,e),e.v=0}}function tn(e){return!(e.g||e.u||3<=e.v||(e.Y++,e.u=ke(c(e.Fa,e),an(e,e.v)),e.v++,0))}function nn(e){null!=e.A&&(i.clearTimeout(e.A),e.A=null)}function rn(e){e.g=new Pe(e,e.j,"rpc",e.Y),null===e.m&&(e.g.H=e.o),e.g.O=0;var t=st(e.qa);ct(t,"RID","rpc"),ct(t,"SID",e.K),ct(t,"AID",e.T),ct(t,"CI",e.F?"0":"1"),!e.F&&e.ja&&ct(t,"TO",e.ja),ct(t,"TYPE","xmlhttp"),Xt(e,t),e.m&&e.o&&Pt(t,e.m,e.o),e.L&&(e.g.I=e.L);var n=e.g;e=e.ia,n.L=1,n.v=lt(st(t)),n.m=null,n.P=!0,Ue(n,e)}function sn(e){null!=e.C&&(i.clearTimeout(e.C),e.C=null)}function on(e,t){var n=null;if(e.g==t){sn(e),nn(e),e.g=null;var r=2}else{if(!Xe(e.h,t))return;n=t.D,et(e.h,t),r=1}if(0!=e.G)if(t.o)if(1==r){n=t.m?t.m.length:0,t=Date.now()-t.F;var i=e.B;te(r=Ie(),new Ce(r,n)),Jt(e)}else en(e);else if(3==(i=t.s)||0==i&&0<t.X||!(1==r&&function(e,t){return!(Ye(e.h)>=e.h.j-(e.s?1:0)||(e.s?(e.i=t.D.concat(e.i),0):1==e.G||2==e.G||e.B>=(e.Va?0:e.Wa)||(e.s=ke(c(e.Ga,e,t),an(e,e.B)),e.B++,0)))}(e,t)||2==r&&tn(e)))switch(n&&0<n.length&&(t=e.h,t.i=t.i.concat(n)),i){case 1:un(e,5);break;case 4:un(e,10);break;case 3:un(e,6);break;default:un(e,2)}}function an(e,t){let n=e.Ta+Math.floor(Math.random()*e.cb);return e.isActive()||(n*=2),n*t}function un(e,t){if(e.j.info("Error code "+t),2==t){var n=c(e.fb,e),r=e.Xa;const t=!r;r=new it(r||"//www.google.com/images/cleardot.gif"),i.location&&"http"==i.location.protocol||ot(r,"https"),lt(r),t?function(e,t){const n=new Ae;if(i.Image){const r=new Image;r.onload=l(St,n,"TestLoadImage: loaded",!0,t,r),r.onerror=l(St,n,"TestLoadImage: error",!1,t,r),r.onabort=l(St,n,"TestLoadImage: abort",!1,t,r),r.ontimeout=l(St,n,"TestLoadImage: timeout",!1,t,r),i.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}(r.toString(),n):function(e,t){new Ae;const n=new AbortController,r=setTimeout(()=>{n.abort(),St(0,0,!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(r),e.ok?St(0,0,!0,t):St(0,0,!1,t)}).catch(()=>{clearTimeout(r),St(0,0,!1,t)})}(r.toString(),n)}else Se(2);e.G=0,e.l&&e.l.sa(t),cn(e),Qt(e)}function cn(e){if(e.G=0,e.ka=[],e.l){const t=tt(e.h);0==t.length&&0==e.i.length||(f(e.ka,t),f(e.ka,e.i),e.h.i.length=0,d(e.i),e.i.length=0),e.l.ra()}}function ln(e,t,n){var r=n instanceof it?st(n):new it(n);if(""!=r.g)t&&(r.g=t+"."+r.g),at(r,r.s);else{var s=i.location;r=s.protocol,t=t?t+"."+s.hostname:s.hostname,s=+s.port;var o=new it(null);r&&ot(o,r),t&&(o.g=t),s&&at(o,s),n&&(o.l=n),r=o}return n=e.D,t=e.ya,n&&t&&ct(r,n,t),ct(r,"VER",e.la),Xt(e,r),r}function hn(e,t,n){if(t&&!e.J)throw Error("Can't create secondary domain capable XhrIo object.");return(t=e.Ca&&!e.pa?new Lt(new At({eb:n})):new Lt(e.pa)).Ha(e.J),t}function dn(){}function fn(){}function pn(e,t){ee.call(this),this.g=new $t(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.va&&(e?e["X-WebChannel-Client-Profile"]=t.va:e={"X-WebChannel-Client-Profile":t.va}),this.g.S=e,(e=t&&t.Sb)&&!p(e)&&(this.g.m=e),this.v=t&&t.supportsCrossDomainXhr||!1,this.u=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!p(t)&&(this.g.D=t,null!==(e=this.h)&&t in e&&t in(e=this.h)&&delete e[t]),this.j=new yn(this)}function mn(e){ye.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function gn(){ve.call(this),this.status=1}function yn(e){this.g=e}(e=Lt.prototype).Ha=function(e){this.J=e},e.ea=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():De.g(),this.v=this.o?pe(this.o):pe(De),this.g.onreadystatechange=c(this.Ea,this);try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(o){return void Ft(this,o)}if(e=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var s in r)n.set(s,r[s]);else{if("function"!=typeof r.keys||"function"!=typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const e of r.keys())n.set(e,r.get(e))}r=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),s=i.FormData&&e instanceof i.FormData,!(0<=Array.prototype.indexOf.call(Vt,t,void 0))||r||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,a]of n)this.g.setRequestHeader(i,a);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{qt(this),this.u=!0,this.g.send(e),this.u=!1}catch(o){Ft(this,o)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=e||7,te(this,"complete"),te(this,"abort"),jt(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),jt(this,!0)),Lt.aa.N.call(this)},e.Ea=function(){this.s||(this.B||this.u||this.j?Bt(this):this.bb())},e.bb=function(){Bt(this)},e.isActive=function(){return!!this.g},e.Z=function(){try{return 2<zt(this)?this.g.status:-1}catch(ce){return-1}},e.oa=function(){try{return this.g?this.g.responseText:""}catch(ce){return""}},e.Oa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),he(t)}},e.Ba=function(){return this.m},e.Ka=function(){return"string"==typeof this.l?this.l:String(this.l)},(e=$t.prototype).la=8,e.G=1,e.connect=function(e,t,n,r){Se(0),this.W=e,this.H=t||{},n&&void 0!==r&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.I=ln(this,null,this.W),Jt(this)},e.Ga=function(e){if(this.s)if(this.s=null,1==this.G){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;const i=new Pe(this,this.j,e);let s=this.o;if(this.S&&(s?(s=w(s),I(s,this.S)):s=this.S),null!==this.m||this.O||(i.H=s,s=null),this.P)e:{for(var t=0,n=0;n<this.i.length;n++){var r=this.i[n];if(void 0===(r="__data__"in r.map&&"string"==typeof(r=r.map.__data__)?r.length:void 0))break;if(4096<(t+=r)){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=Zt(this,i,t),ct(n=st(this.I),"RID",e),ct(n,"CVER",22),this.D&&ct(n,"X-HTTP-Session-Id",this.D),Xt(this,n),s&&(this.O?t="headers="+encodeURIComponent(String(Ot(s)))+"&"+t:this.m&&Pt(n,this.m,s)),Ze(this.h,i),this.Ua&&ct(n,"TYPE","init"),this.P?(ct(n,"$req",t),ct(n,"SID","null"),i.T=!0,Fe(i,n,null)):Fe(i,n,t),this.G=2}}else 3==this.G&&(e?Yt(this,e):0==this.i.length||Je(this.h)||Yt(this))},e.Fa=function(){if(this.u=null,rn(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var e=2*this.R;this.j.info("BP detection timer enabled: "+e),this.A=ke(c(this.ab,this),e)}},e.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Se(10),Wt(this),rn(this))},e.Za=function(){null!=this.C&&(this.C=null,Wt(this),tn(this),Se(19))},e.fb=function(e){e?(this.j.info("Successfully pinged google.com"),Se(2)):(this.j.info("Failed to ping google.com"),Se(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},(e=dn.prototype).ua=function(){},e.ta=function(){},e.sa=function(){},e.ra=function(){},e.isActive=function(){return!0},e.Na=function(){},fn.prototype.g=function(e,t){return new pn(e,t)},h(pn,ee),pn.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},pn.prototype.close=function(){Ht(this.g)},pn.prototype.o=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.u&&((n={}).__data__=le(e),e=n);t.i.push(new We(t.Ya++,e)),3==t.G&&Jt(t)},pn.prototype.N=function(){this.g.l=null,delete this.j,Ht(this.g),delete this.g,pn.aa.N.call(this)},h(mn,ye),h(gn,ve),h(yn,dn),yn.prototype.ua=function(){te(this.g,"a")},yn.prototype.ta=function(e){te(this.g,new mn(e))},yn.prototype.sa=function(e){te(this.g,new gn)},yn.prototype.ra=function(){te(this.g,"b")},fn.prototype.createWebChannel=fn.prototype.g,pn.prototype.send=pn.prototype.o,pn.prototype.open=pn.prototype.m,pn.prototype.close=pn.prototype.close,wi=function(){return new fn},vi=function(){return Ie()},yi=we,gi={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},xe.NO_ERROR=0,xe.TIMEOUT=8,xe.HTTP_ERROR=6,mi=xe,Re.COMPLETE="complete",pi=Re,me.EventType=ge,ge.OPEN="a",ge.CLOSE="b",ge.ERROR="c",ge.MESSAGE="d",ee.prototype.listen=ee.prototype.K,fi=me,Lt.prototype.listenOnce=Lt.prototype.L,Lt.prototype.getLastError=Lt.prototype.Ka,Lt.prototype.getLastErrorCode=Lt.prototype.Ba,Lt.prototype.getStatus=Lt.prototype.Z,Lt.prototype.getResponseJson=Lt.prototype.Oa,Lt.prototype.getResponseText=Lt.prototype.oa,Lt.prototype.send=Lt.prototype.ea,Lt.prototype.setWithCredentials=Lt.prototype.Ha,di=Lt}).apply(void 0!==_i?_i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const Ii="@firebase/firestore";
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
 */class bi{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}bi.UNAUTHENTICATED=new bi(null),bi.GOOGLE_CREDENTIALS=new bi("google-credentials-uid"),bi.FIRST_PARTY=new bi("first-party-uid"),bi.MOCK_USER=new bi("mock-user");
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
let Ti="10.14.0";
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
 */const Ei=new $("@firebase/firestore");function Si(){return Ei.logLevel}function Ci(e,...t){if(Ei.logLevel<=B.DEBUG){const n=t.map(Ni);Ei.debug(`Firestore (${Ti}): ${e}`,...n)}}function ki(e,...t){if(Ei.logLevel<=B.ERROR){const n=t.map(Ni);Ei.error(`Firestore (${Ti}): ${e}`,...n)}}function Ai(e,...t){if(Ei.logLevel<=B.WARN){const n=t.map(Ni);Ei.warn(`Firestore (${Ti}): ${e}`,...n)}}function Ni(e){if("string"==typeof e)return e;try{
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
return t=e,JSON.stringify(t)}catch(n){return e}var t}
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
 */function Di(e="Unexpected state"){const t=`FIRESTORE (${Ti}) INTERNAL ASSERTION FAILED: `+e;throw ki(t),new Error(t)}function xi(e,t){e||Di()}function Ri(e,t){return e}
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
 */const Oi={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Pi extends S{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
 */class Li{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
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
 */class Mi{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Vi{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(bi.UNAUTHENTICATED))}shutdown(){}}class Fi{constructor(e){this.t=e,this.currentUser=bi.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){xi(void 0===this.o);let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let i=new Li;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Li,e.enqueueRetryable(()=>r(this.currentUser))};const s=()=>{const t=i;e.enqueueRetryable(()=>l(this,null,function*(){yield t.promise,yield r(this.currentUser)}))},o=e=>{Ci("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(Ci("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Li)}},0),s()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(Ci("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(xi("string"==typeof t.accessToken),new Mi(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return xi(null===e||"string"==typeof e),new bi(e)}}class Ui{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=bi.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Bi{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new Ui(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(bi.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ji{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class qi{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){xi(void 0===this.o);const n=e=>{null!=e.error&&Ci("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.R;return this.R=e.token,Ci("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{Ci("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.A.getImmediate({optional:!0});e?r(e):Ci("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(xi("string"==typeof e.token),this.R=e.token,new ji(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
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
 */function zi(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}
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
 */class Ki{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const n=zi(40);for(let r=0;r<n.length;++r)t.length<20&&n[r]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return t}}function Gi(e,t){return e<t?-1:e>t?1:0}function $i(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}function Hi(e){return e+"\0"}
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
 */class Wi{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new Pi(Oi.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new Pi(Oi.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new Pi(Oi.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Pi(Oi.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Wi.fromMillis(Date.now())}static fromDate(e){return Wi.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new Wi(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Gi(this.nanoseconds,e.nanoseconds):Gi(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
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
 */class Qi{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Qi(e)}static min(){return new Qi(new Wi(0,0))}static max(){return new Qi(new Wi(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
 */class Ji{constructor(e,t,n){void 0===t?t=0:t>e.length&&Di(),void 0===n?n=e.length-t:n>e.length-t&&Di(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===Ji.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ji?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.get(r),i=t.get(r);if(n<i)return-1;if(n>i)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Yi extends Ji{construct(e,t,n){return new Yi(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new Pi(Oi.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new Yi(t)}static emptyPath(){return new Yi([])}}const Xi=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Zi extends Ji{construct(e,t,n){return new Zi(e,t,n)}static isValidIdentifier(e){return Xi.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Zi.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new Zi(["__name__"])}static fromServerFormat(e){const t=[];let n="",r=0;const i=()=>{if(0===n.length)throw new Pi(Oi.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let s=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new Pi(Oi.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new Pi(Oi.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(s=!s,r++):"."!==t||s?(n+=t,r++):(i(),r++)}if(i(),s)throw new Pi(Oi.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Zi(t)}static emptyPath(){return new Zi([])}}
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
 */class es{constructor(e){this.path=e}static fromPath(e){return new es(Yi.fromString(e))}static fromName(e){return new es(Yi.fromString(e).popFirst(5))}static empty(){return new es(Yi.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===Yi.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return Yi.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new es(new Yi(e.slice()))}}
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
 */class ts{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}function ns(e){return e.fields.find(e=>2===e.kind)}function rs(e){return e.fields.filter(e=>2!==e.kind)}ts.UNKNOWN_ID=-1;class is{constructor(e,t){this.fieldPath=e,this.kind=t}}class ss{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new ss(0,as.min())}}function os(e){return new as(e.readTime,e.key,-1)}class as{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new as(Qi.min(),es.empty(),-1)}static max(){return new as(Qi.max(),es.empty(),-1)}}function us(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=es.comparator(e.documentKey,t.documentKey),0!==n?n:Gi(e.largestBatchId,t.largestBatchId)
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
 */)}const cs="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ls{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
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
 */function hs(e){return l(this,null,function*(){if(e.code!==Oi.FAILED_PRECONDITION||e.message!==cs)throw e;Ci("LocalStore","Unexpectedly lost primary lease")})}
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
 */class ds{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Di(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new ds((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof ds?t:ds.resolve(t)}catch(t){return ds.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):ds.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):ds.reject(t)}static resolve(e){return new ds((t,n)=>{t(e)})}static reject(e){return new ds((t,n)=>{n(e)})}static waitFor(e){return new ds((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=ds.resolve(!1);for(const n of e)t=t.next(e=>e?ds.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new ds((n,r)=>{const i=e.length,s=new Array(i);let o=0;for(let a=0;a<i;a++){const u=a;t(e[u]).next(e=>{s[u]=e,++o,o===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new ds((n,r)=>{const i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}
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
 */class fs{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new Li,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new ys(e,t.error)):this.V.resolve()},this.transaction.onerror=t=>{const n=bs(t.target.error);this.V.reject(new ys(e,n))}}static open(e,t,n,r){try{return new fs(t,e.transaction(r,n))}catch(i){throw new ys(t,i)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(Ci("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){const t=this.transaction.objectStore(e);return new ws(t)}}class ps{constructor(e,t,n){this.name=e,this.version=t,this.p=n,12.2===ps.S(b())&&ki("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return Ci("SimpleDb","Removing database:",e),_s(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!E())return!1;if(ps.v())return!0;const e=b(),t=ps.S(e),n=0<t&&t<10,r=ms(e),i=0<r&&r<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static v(){var e;return"undefined"!=typeof process&&"YES"===(null===(e=process.__PRIVATE_env)||void 0===e?void 0:e.C)}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}M(e){return l(this,null,function*(){return this.db||(Ci("SimpleDb","Opening database:",this.name),this.db=yield new Promise((t,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=e=>{const n=e.target.result;t(n)},r.onblocked=()=>{n(new ys(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=t=>{const r=t.target.error;"VersionError"===r.name?n(new Pi(Oi.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===r.name?n(new Pi(Oi.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+r)):n(new ys(e,r))},r.onupgradeneeded=e=>{Ci("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);const t=e.target.result;this.p.O(t,r.transaction,e.oldVersion,this.version).next(()=>{Ci("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=e=>this.N(e)),this.db})}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}runTransaction(e,t,n,r){return l(this,null,function*(){const i="readonly"===t;let s=0;for(;;){++s;try{this.db=yield this.M(e);const t=fs.open(this.db,e,i?"readonly":"readwrite",n),s=r(t).next(e=>(t.g(),e)).catch(e=>(t.abort(e),ds.reject(e))).toPromise();return s.catch(()=>{}),yield t.m,s}catch(o){const e=o,t="FirebaseError"!==e.name&&s<3;if(Ci("SimpleDb","Transaction failed with error:",e.message,"Retrying:",t),this.close(),!t)return Promise.reject(e)}}})}close(){this.db&&this.db.close(),this.db=void 0}}function ms(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}class gs{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return _s(this.B.delete())}}class ys extends Pi{constructor(e,t){super(Oi.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function vs(e){return"IndexedDbTransactionError"===e.name}class ws{constructor(e){this.store=e}put(e,t){let n;return void 0!==t?(Ci("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(Ci("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),_s(n)}add(e){return Ci("SimpleDb","ADD",this.store.name,e,e),_s(this.store.add(e))}get(e){return _s(this.store.get(e)).next(t=>(void 0===t&&(t=null),Ci("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return Ci("SimpleDb","DELETE",this.store.name,e),_s(this.store.delete(e))}count(){return Ci("SimpleDb","COUNT",this.store.name),_s(this.store.count())}U(e,t){const n=this.options(e,t),r=n.index?this.store.index(n.index):this.store;if("function"==typeof r.getAll){const e=r.getAll(n.range);return new ds((t,n)=>{e.onerror=e=>{n(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{const e=this.cursor(n),t=[];return this.W(e,(e,n)=>{t.push(n)}).next(()=>t)}}G(e,t){const n=this.store.getAll(e,null===t?void 0:t);return new ds((e,t)=>{n.onerror=e=>{t(e.target.error)},n.onsuccess=t=>{e(t.target.result)}})}j(e,t){Ci("SimpleDb","DELETE ALL",this.store.name);const n=this.options(e,t);n.H=!1;const r=this.cursor(n);return this.W(r,(e,t,n)=>n.delete())}J(e,t){let n;t?n=e:(n={},t=e);const r=this.cursor(n);return this.W(r,t)}Y(e){const t=this.cursor({});return new ds((n,r)=>{t.onerror=e=>{const t=bs(e.target.error);r(t)},t.onsuccess=t=>{const r=t.target.result;r?e(r.primaryKey,r.value).next(e=>{e?r.continue():n()}):n()}})}W(e,t){const n=[];return new ds((r,i)=>{e.onerror=e=>{i(e.target.error)},e.onsuccess=e=>{const i=e.target.result;if(!i)return void r();const s=new gs(i),o=t(i.primaryKey,i.value,s);if(o instanceof ds){const e=o.catch(e=>(s.done(),ds.reject(e)));n.push(e)}s.isDone?r():null===s.K?i.continue():i.continue(s.K)}}).next(()=>ds.waitFor(n))}options(e,t){let n;return void 0!==e&&("string"==typeof e?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.H?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function _s(e){return new ds((t,n)=>{e.onsuccess=e=>{const n=e.target.result;t(n)},e.onerror=e=>{const t=bs(e.target.error);n(t)}})}let Is=!1;function bs(e){const t=ps.S(b());if(t>=12.2&&t<13){const t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){const e=new Pi("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Is||(Is=!0,setTimeout(()=>{throw e},0)),e}}return e}class Ts{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}X(e){Ci("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,()=>l(this,null,function*(){this.task=null;try{Ci("IndexBackfiller",`Documents written: ${yield this.Z.ee()}`)}catch(e){vs(e)?Ci("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",e):yield hs(e)}yield this.X(6e4)}))}}class Es{constructor(e,t){this.localStore=e,this.persistence=t}ee(e=50){return l(this,null,function*(){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))})}te(e,t){const n=new Set;let r=t,i=!0;return ds.doWhile(()=>!0===i&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!n.has(t))return Ci("IndexBackfiller",`Processing collection: ${t}`),this.ne(e,t,r).next(e=>{r-=e,n.add(t)});i=!1})).next(()=>t-r)}ne(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(r=>this.localStore.localDocuments.getNextDocuments(e,t,r,n).next(n=>{const i=n.changes;return this.localStore.indexManager.updateIndexEntries(e,i).next(()=>this.re(r,n)).next(n=>(Ci("IndexBackfiller",`Updating offset: ${n}`),this.localStore.indexManager.updateCollectionGroup(e,t,n))).next(()=>i.size)}))}re(e,t){let n=e;return t.changes.forEach((e,t)=>{const r=os(t);us(r,n)>0&&(n=r)}),new as(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}
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
 */class Ss{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ie(e),this.se=e=>t.writeSequenceNumber(e))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}function Cs(e){return null==e}function ks(e){return 0===e&&1/e==-1/0}
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
function As(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=Ds(t)),t=Ns(e.get(n),t);return Ds(t)}function Ns(e,t){let n=t;const r=e.length;for(let i=0;i<r;i++){const t=e.charAt(i);switch(t){case"\0":n+="";break;case"":n+="";break;default:n+=t}}return n}function Ds(e){return e+""}function xs(e){const t=e.length;if(xi(t>=2),2===t)return xi(""===e.charAt(0)&&""===e.charAt(1)),Yi.emptyPath();const n=t-2,r=[];let i="";for(let s=0;s<t;){const t=e.indexOf("",s);switch((t<0||t>n)&&Di(),e.charAt(t+1)){case"":const n=e.substring(s,t);let o;0===i.length?o=n:(i+=n,o=i,i=""),r.push(o);break;case"":i+=e.substring(s,t),i+="\0";break;case"":i+=e.substring(s,t+1);break;default:Di()}s=t+2}return new Yi(r)}
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
 */Ss.oe=-1;const Rs=["userId","batchId"];
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
 */function Os(e,t){return[e,As(t)]}function Ps(e,t,n){return[e,As(t),n]}const Ls={},Ms=["prefixPath","collectionGroup","readTime","documentId"],Vs=["prefixPath","collectionGroup","documentId"],Fs=["collectionGroup","readTime","prefixPath","documentId"],Us=["canonicalId","targetId"],Bs=["targetId","path"],js=["path","targetId"],qs=["collectionId","parent"],zs=["indexId","uid"],Ks=["uid","sequenceNumber"],Gs=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],$s=["indexId","uid","orderedDocumentKey"],Hs=["userId","collectionPath","documentId"],Ws=["userId","collectionPath","largestBatchId"],Qs=["userId","collectionGroup","largestBatchId"],Js=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],Ys=[...Js,"documentOverlays"],Xs=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Zs=Xs,eo=[...Zs,"indexConfiguration","indexState","indexEntries"],to=eo,no=[...eo,"globals"];
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
 */class ro extends ls{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function io(e,t){const n=Ri(e);return ps.F(n._e,t)}
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
 */function so(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function oo(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function ao(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
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
 */class uo{constructor(e,t){this.comparator=e,this.root=t||lo.EMPTY}insert(e,t){return new uo(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,lo.BLACK,null,null))}remove(e){return new uo(this.comparator,this.root.remove(e,this.comparator).copy(null,null,lo.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new co(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new co(this.root,e,this.comparator,!1)}getReverseIterator(){return new co(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new co(this.root,e,this.comparator,!0)}}class co{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class lo{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:lo.RED,this.left=null!=r?r:lo.EMPTY,this.right=null!=i?i:lo.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new lo(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return lo.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return lo.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,lo.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,lo.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Di();if(this.right.isRed())throw Di();const e=this.left.check();if(e!==this.right.check())throw Di();return e+(this.isRed()?0:1)}}lo.EMPTY=null,lo.RED=!0,lo.BLACK=!1,lo.EMPTY=new class{constructor(){this.size=0}get key(){throw Di()}get value(){throw Di()}get color(){throw Di()}get left(){throw Di()}get right(){throw Di()}copy(e,t,n,r,i){return this}insert(e,t,n){return new lo(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class ho{constructor(e){this.comparator=e,this.data=new uo(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new fo(this.data.getIterator())}getIteratorFrom(e){return new fo(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof ho))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ho(this.comparator);return t.data=e,t}}class fo{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function po(e){return e.hasNext()?e.getNext():void 0}
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
 */class mo{constructor(e){this.fields=e,e.sort(Zi.comparator)}static empty(){return new mo([])}unionWith(e){let t=new ho(Zi.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new mo(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return $i(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
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
 */class go extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
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
 */class yo{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(t){throw"undefined"!=typeof DOMException&&t instanceof DOMException?new go("Invalid base64 string: "+t):t}}(e);return new yo(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new yo(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Gi(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}yo.EMPTY_BYTE_STRING=new yo("");const vo=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function wo(e){if(xi(!!e),"string"==typeof e){let t=0;const n=vo.exec(e);if(xi(!!n),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:_o(e.seconds),nanos:_o(e.nanos)}}function _o(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Io(e){return"string"==typeof e?yo.fromBase64String(e):yo.fromUint8Array(e)}
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
 */function bo(e){var t,n;return"server_timestamp"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function To(e){const t=e.mapValue.fields.__previous_value__;return bo(t)?To(t):t}function Eo(e){const t=wo(e.mapValue.fields.__local_write_time__.timestampValue);return new Wi(t.seconds,t.nanos)}
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
 */class So{constructor(e,t,n,r,i,s,o,a,u){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=u}}class Co{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Co("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof Co&&e.projectId===this.projectId&&e.database===this.database}}
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
 */const ko={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},Ao={nullValue:"NULL_VALUE"};function No(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?bo(e)?4:Go(e)?9007199254740991:zo(e)?10:11:Di()}function Do(e,t){if(e===t)return!0;const n=No(e);if(n!==No(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Eo(e).isEqual(Eo(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=wo(e.timestampValue),r=wo(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return r=t,Io(e.bytesValue).isEqual(Io(r.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return _o(e.geoPointValue.latitude)===_o(t.geoPointValue.latitude)&&_o(e.geoPointValue.longitude)===_o(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return _o(e.integerValue)===_o(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=_o(e.doubleValue),r=_o(t.doubleValue);return n===r?ks(n)===ks(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return $i(e.arrayValue.values||[],t.arrayValue.values||[],Do);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(so(n)!==so(r))return!1;for(const i in n)if(n.hasOwnProperty(i)&&(void 0===r[i]||!Do(n[i],r[i])))return!1;return!0}(e,t);default:return Di()}var r}function xo(e,t){return void 0!==(e.values||[]).find(e=>Do(e,t))}function Ro(e,t){if(e===t)return 0;const n=No(e),r=No(t);if(n!==r)return Gi(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Gi(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=_o(e.integerValue||e.doubleValue),r=_o(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return Oo(e.timestampValue,t.timestampValue);case 4:return Oo(Eo(e),Eo(t));case 5:return Gi(e.stringValue,t.stringValue);case 6:return function(e,t){const n=Io(e),r=Io(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let i=0;i<n.length&&i<r.length;i++){const e=Gi(n[i],r[i]);if(0!==e)return e}return Gi(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=Gi(_o(e.latitude),_o(t.latitude));return 0!==n?n:Gi(_o(e.longitude),_o(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return Po(e.arrayValue,t.arrayValue);case 10:return function(e,t){var n,r,i,s;const o=e.fields||{},a=t.fields||{},u=null===(n=o.value)||void 0===n?void 0:n.arrayValue,c=null===(r=a.value)||void 0===r?void 0:r.arrayValue,l=Gi((null===(i=null==u?void 0:u.values)||void 0===i?void 0:i.length)||0,(null===(s=null==c?void 0:c.values)||void 0===s?void 0:s.length)||0);return 0!==l?l:Po(u,c)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===ko.mapValue&&t===ko.mapValue)return 0;if(e===ko.mapValue)return 1;if(t===ko.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let o=0;o<r.length&&o<s.length;++o){const e=Gi(r[o],s[o]);if(0!==e)return e;const t=Ro(n[r[o]],i[s[o]]);if(0!==t)return t}return Gi(r.length,s.length)}(e.mapValue,t.mapValue);default:throw Di()}}function Oo(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return Gi(e,t);const n=wo(e),r=wo(t),i=Gi(n.seconds,r.seconds);return 0!==i?i:Gi(n.nanos,r.nanos)}function Po(e,t){const n=e.values||[],r=t.values||[];for(let i=0;i<n.length&&i<r.length;++i){const e=Ro(n[i],r[i]);if(e)return e}return Gi(n.length,r.length)}function Lo(e){return Mo(e)}function Mo(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=wo(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?Io(e.bytesValue).toBase64():"referenceValue"in e?(t=e.referenceValue,es.fromName(t).toString()):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=Mo(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const i of t)r?r=!1:n+=",",n+=`${i}:${Mo(e.fields[i])}`;return n+"}"}(e.mapValue):Di();var t}function Vo(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function Fo(e){return!!e&&"integerValue"in e}function Uo(e){return!!e&&"arrayValue"in e}function Bo(e){return!!e&&"nullValue"in e}function jo(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function qo(e){return!!e&&"mapValue"in e}function zo(e){var t,n;return"__vector__"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function Ko(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return oo(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=Ko(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=Ko(e.arrayValue.values[n]);return t}return Object.assign({},e)}function Go(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}const $o={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function Ho(e){return"nullValue"in e?Ao:"booleanValue"in e?{booleanValue:!1}:"integerValue"in e||"doubleValue"in e?{doubleValue:NaN}:"timestampValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in e?{stringValue:""}:"bytesValue"in e?{bytesValue:""}:"referenceValue"in e?Vo(Co.empty(),es.empty()):"geoPointValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in e?{arrayValue:{}}:"mapValue"in e?zo(e)?$o:{mapValue:{}}:Di()}function Wo(e){return"nullValue"in e?{booleanValue:!1}:"booleanValue"in e?{doubleValue:NaN}:"integerValue"in e||"doubleValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in e?{stringValue:""}:"stringValue"in e?{bytesValue:""}:"bytesValue"in e?Vo(Co.empty(),es.empty()):"referenceValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in e?{arrayValue:{}}:"arrayValue"in e?$o:"mapValue"in e?zo(e)?{mapValue:{}}:ko:Di()}function Qo(e,t){const n=Ro(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function Jo(e,t){const n=Ro(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}
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
 */class Yo{constructor(e){this.value=e}static empty(){return new Yo({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!qo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ko(t)}setAll(e){let t=Zi.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=Ko(e):r.push(i.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){const t=this.field(e.popLast());qo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Do(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];qo(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){oo(t,(t,n)=>e[t]=n);for(const r of n)delete e[r]}clone(){return new Yo(Ko(this.value))}}function Xo(e){const t=[];return oo(e.fields,(e,n)=>{const r=new Zi([e]);if(qo(n)){const e=Xo(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new mo(t)
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
 */}class Zo{constructor(e,t,n,r,i,s,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=o}static newInvalidDocument(e){return new Zo(e,0,Qi.min(),Qi.min(),Qi.min(),Yo.empty(),0)}static newFoundDocument(e,t,n,r){return new Zo(e,1,t,Qi.min(),n,r,0)}static newNoDocument(e,t){return new Zo(e,2,t,Qi.min(),Qi.min(),Yo.empty(),0)}static newUnknownDocument(e,t){return new Zo(e,3,t,Qi.min(),Qi.min(),Yo.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Qi.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Yo.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Yo.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Qi.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof Zo&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Zo(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class ea{constructor(e,t){this.position=e,this.inclusive=t}}function ta(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){const s=t[i],o=e.position[i];if(r=s.field.isKeyField()?es.comparator(es.fromName(o.referenceValue),n.key):Ro(o,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function na(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!Do(e.position[n],t.position[n]))return!1;return!0}
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
 */class ra{constructor(e,t="asc"){this.field=e,this.dir=t}}function ia(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
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
 */class sa{}class oa extends sa{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new ga(e,t,n):"array-contains"===t?new _a(e,n):"in"===t?new Ia(e,n):"not-in"===t?new ba(e,n):"array-contains-any"===t?new Ta(e,n):new oa(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new ya(e,n):new va(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&this.matchesComparison(Ro(t,this.value)):null!==t&&No(this.value)===No(t)&&this.matchesComparison(Ro(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return Di()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class aa extends sa{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new aa(e,t)}matches(e){return ua(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.ae||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function ua(e){return"and"===e.op}function ca(e){return"or"===e.op}function la(e){return ha(e)&&ua(e)}function ha(e){for(const t of e.filters)if(t instanceof aa)return!1;return!0}function da(e){if(e instanceof oa)return e.field.canonicalString()+e.op.toString()+Lo(e.value);if(la(e))return e.filters.map(e=>da(e)).join(",");{const t=e.filters.map(e=>da(e)).join(",");return`${e.op}(${t})`}}function fa(e,t){return e instanceof oa?(n=e,(r=t)instanceof oa&&n.op===r.op&&n.field.isEqual(r.field)&&Do(n.value,r.value)):e instanceof aa?function(e,t){return t instanceof aa&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,r)=>e&&fa(n,t.filters[r]),!0)}(e,t):void Di();var n,r}function pa(e,t){const n=e.filters.concat(t);return aa.create(n,e.op)}function ma(e){return e instanceof oa?`${(t=e).field.canonicalString()} ${t.op} ${Lo(t.value)}`:e instanceof aa?function(e){return e.op.toString()+" {"+e.getFilters().map(ma).join(" ,")+"}"}(e):"Filter";var t}class ga extends oa{constructor(e,t,n){super(e,t,n),this.key=es.fromName(n.referenceValue)}matches(e){const t=es.comparator(e.key,this.key);return this.matchesComparison(t)}}class ya extends oa{constructor(e,t){super(e,"in",t),this.keys=wa(0,t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class va extends oa{constructor(e,t){super(e,"not-in",t),this.keys=wa(0,t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function wa(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map(e=>es.fromName(e.referenceValue))}class _a extends oa{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Uo(t)&&xo(t.arrayValue,this.value)}}class Ia extends oa{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&xo(this.value.arrayValue,t)}}class ba extends oa{constructor(e,t){super(e,"not-in",t)}matches(e){if(xo(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&!xo(this.value.arrayValue,t)}}class Ta extends oa{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Uo(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>xo(this.value.arrayValue,e))}}
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
 */class Ea{constructor(e,t=null,n=[],r=[],i=null,s=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=o,this.ue=null}}function Sa(e,t=null,n=[],r=[],i=null,s=null,o=null){return new Ea(e,t,n,r,i,s,o)}function Ca(e){const t=Ri(e);if(null===t.ue){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>da(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>{return(t=e).field.canonicalString()+t.dir;var t}).join(","),Cs(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>Lo(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>Lo(e)).join(",")),t.ue=e}return t.ue}function ka(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!ia(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!fa(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!na(e.startAt,t.startAt)&&na(e.endAt,t.endAt)}function Aa(e){return es.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function Na(e,t){return e.filters.filter(e=>e instanceof oa&&e.field.isEqual(t))}function Da(e,t,n){let r=Ao,i=!0;for(const s of Na(e,t)){let e=Ao,t=!0;switch(s.op){case"<":case"<=":e=Ho(s.value);break;case"==":case"in":case">=":e=s.value;break;case">":e=s.value,t=!1;break;case"!=":case"not-in":e=Ao}Qo({value:r,inclusive:i},{value:e,inclusive:t})<0&&(r=e,i=t)}if(null!==n)for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){const e=n.position[s];Qo({value:r,inclusive:i},{value:e,inclusive:n.inclusive})<0&&(r=e,i=n.inclusive);break}return{value:r,inclusive:i}}function xa(e,t,n){let r=ko,i=!0;for(const s of Na(e,t)){let e=ko,t=!0;switch(s.op){case">=":case">":e=Wo(s.value),t=!1;break;case"==":case"in":case"<=":e=s.value;break;case"<":e=s.value,t=!1;break;case"!=":case"not-in":e=ko}Jo({value:r,inclusive:i},{value:e,inclusive:t})>0&&(r=e,i=t)}if(null!==n)for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){const e=n.position[s];Jo({value:r,inclusive:i},{value:e,inclusive:n.inclusive})>0&&(r=e,i=n.inclusive);break}return{value:r,inclusive:i}}
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
 */class Ra{constructor(e,t=null,n=[],r=[],i=null,s="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=o,this.endAt=a,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Oa(e){return new Ra(e)}function Pa(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function La(e){return null!==e.collectionGroup}function Ma(e){const t=Ri(e);if(null===t.ce){t.ce=[];const e=new Set;for(const r of t.explicitOrderBy)t.ce.push(r),e.add(r.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(e){let t=new ho(Zi.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t})(t).forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.ce.push(new ra(r,n))}),e.has(Zi.keyField().canonicalString())||t.ce.push(new ra(Zi.keyField(),n))}return t.ce}function Va(e){const t=Ri(e);return t.le||(t.le=function(e,t){if("F"===e.limitType)return Sa(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new ra(e.field,t)});const n=e.endAt?new ea(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new ea(e.startAt.position,e.startAt.inclusive):null;return Sa(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}(t,Ma(e))),t.le}function Fa(e,t){const n=e.filters.concat([t]);return new Ra(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function Ua(e,t,n){return new Ra(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function Ba(e,t){return ka(Va(e),Va(t))&&e.limitType===t.limitType}function ja(e){return`${Ca(Va(e))}|lt:${e.limitType}`}function qa(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>ma(e)).join(", ")}]`),Cs(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>{return`${(t=e).field.canonicalString()} (${t.dir})`;var t}).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>Lo(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>Lo(e)).join(",")),`Target(${t})`}(Va(e))}; limitType=${e.limitType})`}function za(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):es.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of Ma(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(r=t,!((n=e).startAt&&!function(e,t,n){const r=ta(e,t,n);return e.inclusive?r<=0:r<0}(n.startAt,Ma(n),r)||n.endAt&&!function(e,t,n){const r=ta(e,t,n);return e.inclusive?r>=0:r>0}(n.endAt,Ma(n),r)));var n,r}function Ka(e){return(t,n)=>{let r=!1;for(const i of Ma(e)){const e=Ga(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}function Ga(e,t,n){const r=e.field.isKeyField()?es.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?Ro(r,i):Di()}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return Di()}}
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
 */class $a{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[r,i]of n)if(this.equalsFn(r,e))return i}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){oo(this.inner,(t,n)=>{for(const[r,i]of n)e(r,i)})}isEmpty(){return ao(this.inner)}size(){return this.innerSize}}
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
 */const Ha=new uo(es.comparator);function Wa(){return Ha}const Qa=new uo(es.comparator);function Ja(...e){let t=Qa;for(const n of e)t=t.insert(n.key,n);return t}function Ya(e){let t=Qa;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Xa(){return eu()}function Za(){return eu()}function eu(){return new $a(e=>e.toString(),(e,t)=>e.isEqual(t))}const tu=new uo(es.comparator),nu=new ho(es.comparator);function ru(...e){let t=nu;for(const n of e)t=t.add(n);return t}const iu=new ho(Gi);
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
function su(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ks(t)?"-0":t}}function ou(e){return{integerValue:""+e}}
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
class au{constructor(){this._=void 0}}function uu(e,t,n){return e instanceof hu?function(e,t){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&bo(t)&&(t=To(t)),t&&(n.fields.__previous_value__=t),{mapValue:n}}(n,t):e instanceof du?fu(e,t):e instanceof pu?mu(e,t):function(e,t){const n=lu(e,t),r=yu(n)+yu(e.Pe);return Fo(n)&&Fo(e.Pe)?ou(r):su(e.serializer,r)}(e,t)}function cu(e,t,n){return e instanceof du?fu(e,t):e instanceof pu?mu(e,t):n}function lu(e,t){return e instanceof gu?Fo(n=t)||(r=n)&&"doubleValue"in r?t:{integerValue:0}:null;var n,r}class hu extends au{}class du extends au{constructor(e){super(),this.elements=e}}function fu(e,t){const n=vu(t);for(const r of e.elements)n.some(e=>Do(e,r))||n.push(r);return{arrayValue:{values:n}}}class pu extends au{constructor(e){super(),this.elements=e}}function mu(e,t){let n=vu(t);for(const r of e.elements)n=n.filter(e=>!Do(e,r));return{arrayValue:{values:n}}}class gu extends au{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function yu(e){return _o(e.integerValue||e.doubleValue)}function vu(e){return Uo(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
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
 */class wu{constructor(e,t){this.field=e,this.transform=t}}class _u{constructor(e,t){this.version=e,this.transformResults=t}}class Iu{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Iu}static exists(e){return new Iu(void 0,e)}static updateTime(e){return new Iu(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function bu(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Tu{}function Eu(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new Pu(e.key,Iu.none()):new Nu(e.key,e.data,Iu.none());{const n=e.data,r=Yo.empty();let i=new ho(Zi.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new Du(e.key,r,new mo(i.toArray()),Iu.none())}}function Su(e,t,n){var r;e instanceof Nu?function(e,t,n){const r=e.value.clone(),i=Ru(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof Du?function(e,t,n){if(!bu(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=Ru(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(xu(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):(r=n,t.convertToNoDocument(r.version).setHasCommittedMutations())}function Cu(e,t,n,r){return e instanceof Nu?function(e,t,n,r){if(!bu(e.precondition,t))return n;const i=e.value.clone(),s=Ou(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof Du?function(e,t,n,r){if(!bu(e.precondition,t))return n;const i=Ou(e.fieldTransforms,r,t),s=t.data;return s.setAll(xu(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):(i=t,s=n,bu(e.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):s);var i,s}function ku(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),i=lu(r.transform,e||null);null!=i&&(null===n&&(n=Yo.empty()),n.set(r.field,i))}return n||null}function Au(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,r=t.fieldTransforms,!!(void 0===n&&void 0===r||n&&r&&$i(n,r,(e,t)=>function(e,t){return e.field.isEqual(t.field)&&(n=e.transform,r=t.transform,n instanceof du&&r instanceof du||n instanceof pu&&r instanceof pu?$i(n.elements,r.elements,Do):n instanceof gu&&r instanceof gu?Do(n.Pe,r.Pe):n instanceof hu&&r instanceof hu);var n,r}(e,t)))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask)));var n,r}class Nu extends Tu{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Du extends Tu{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function xu(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function Ru(e,t,n){const r=new Map;xi(e.length===n.length);for(let i=0;i<n.length;i++){const s=e[i],o=s.transform,a=t.data.field(s.field);r.set(s.field,cu(o,a,n[i]))}return r}function Ou(e,t,n){const r=new Map;for(const i of e){const e=i.transform,s=n.data.field(i.field);r.set(i.field,uu(e,s,t))}return r}class Pu extends Tu{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Lu extends Tu{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
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
 */class Mu{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const t=this.mutations[r];t.key.isEqual(e.key)&&Su(t,e,n[r])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Cu(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Cu(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Za();return this.mutations.forEach(r=>{const i=e.get(r.key),s=i.overlayedDocument;let o=this.applyToLocalView(s,i.mutatedFields);o=t.has(r.key)?null:o;const a=Eu(s,o);null!==a&&n.set(r.key,a),s.isValidDocument()||s.convertToNoDocument(Qi.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),ru())}isEqual(e){return this.batchId===e.batchId&&$i(this.mutations,e.mutations,(e,t)=>Au(e,t))&&$i(this.baseMutations,e.baseMutations,(e,t)=>Au(e,t))}}class Vu{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){xi(e.mutations.length===n.length);let r=function(){return tu}();const i=e.mutations;for(let s=0;s<i.length;s++)r=r.insert(i[s].key,n[s].version);return new Vu(e,t,n,r)}}
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
 */class Fu{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
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
 */class Uu{constructor(e,t){this.count=e,this.unchangedNames=t}}
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
 */var Bu,ju;function qu(e){if(void 0===e)return ki("GRPC error has no .code"),Oi.UNKNOWN;switch(e){case Bu.OK:return Oi.OK;case Bu.CANCELLED:return Oi.CANCELLED;case Bu.UNKNOWN:return Oi.UNKNOWN;case Bu.DEADLINE_EXCEEDED:return Oi.DEADLINE_EXCEEDED;case Bu.RESOURCE_EXHAUSTED:return Oi.RESOURCE_EXHAUSTED;case Bu.INTERNAL:return Oi.INTERNAL;case Bu.UNAVAILABLE:return Oi.UNAVAILABLE;case Bu.UNAUTHENTICATED:return Oi.UNAUTHENTICATED;case Bu.INVALID_ARGUMENT:return Oi.INVALID_ARGUMENT;case Bu.NOT_FOUND:return Oi.NOT_FOUND;case Bu.ALREADY_EXISTS:return Oi.ALREADY_EXISTS;case Bu.PERMISSION_DENIED:return Oi.PERMISSION_DENIED;case Bu.FAILED_PRECONDITION:return Oi.FAILED_PRECONDITION;case Bu.ABORTED:return Oi.ABORTED;case Bu.OUT_OF_RANGE:return Oi.OUT_OF_RANGE;case Bu.UNIMPLEMENTED:return Oi.UNIMPLEMENTED;case Bu.DATA_LOSS:return Oi.DATA_LOSS;default:return Di()}}(ju=Bu||(Bu={}))[ju.OK=0]="OK",ju[ju.CANCELLED=1]="CANCELLED",ju[ju.UNKNOWN=2]="UNKNOWN",ju[ju.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ju[ju.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ju[ju.NOT_FOUND=5]="NOT_FOUND",ju[ju.ALREADY_EXISTS=6]="ALREADY_EXISTS",ju[ju.PERMISSION_DENIED=7]="PERMISSION_DENIED",ju[ju.UNAUTHENTICATED=16]="UNAUTHENTICATED",ju[ju.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ju[ju.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ju[ju.ABORTED=10]="ABORTED",ju[ju.OUT_OF_RANGE=11]="OUT_OF_RANGE",ju[ju.UNIMPLEMENTED=12]="UNIMPLEMENTED",ju[ju.INTERNAL=13]="INTERNAL",ju[ju.UNAVAILABLE=14]="UNAVAILABLE",ju[ju.DATA_LOSS=15]="DATA_LOSS";
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
const zu=new ci([4294967295,4294967295],0);function Ku(e){const t=(new TextEncoder).encode(e),n=new li;return n.update(t),new Uint8Array(n.digest())}function Gu(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),s=t.getUint32(12,!0);return[new ci([n,r],0),new ci([i,s],0)]}class $u{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Hu(`Invalid padding: ${t}`);if(n<0)throw new Hu(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new Hu(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new Hu(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=ci.fromNumber(this.Ie)}Ee(e,t,n){let r=e.add(t.multiply(ci.fromNumber(n)));return 1===r.compare(zu)&&(r=new ci([r.getBits(0),r.getBits(1)],0)),r.modulo(this.Te).toNumber()}de(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.Ie)return!1;const t=Ku(e),[n,r]=Gu(t);for(let i=0;i<this.hashCount;i++){const e=this.Ee(n,r,i);if(!this.de(e))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),s=new $u(i,r,t);return n.forEach(e=>s.insert(e)),s}insert(e){if(0===this.Ie)return;const t=Ku(e),[n,r]=Gu(t);for(let i=0;i<this.hashCount;i++){const e=this.Ee(n,r,i);this.Ae(e)}}Ae(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Hu extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
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
 */class Wu{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,Qu.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Wu(Qi.min(),r,new uo(Gi),Wa(),ru())}}class Qu{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Qu(n,t,ru(),ru(),ru())}}
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
 */class Ju{constructor(e,t,n,r){this.Re=e,this.removedTargetIds=t,this.key=n,this.Ve=r}}class Yu{constructor(e,t){this.targetId=e,this.me=t}}class Xu{constructor(e,t,n=yo.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class Zu{constructor(){this.fe=0,this.ge=nc(),this.pe=yo.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return 0!==this.fe}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=ru(),t=ru(),n=ru();return this.ge.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:Di()}}),new Qu(this.pe,this.ye,e,t,n)}Ce(){this.we=!1,this.ge=nc()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,xi(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class ec{constructor(e){this.Le=e,this.Be=new Map,this.ke=Wa(),this.qe=tc(),this.Qe=new uo(Gi)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const n=this.Ge(t);switch(e.state){case 0:this.ze(t)&&n.De(e.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(e.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(n.Ne(),n.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),n.De(e.resumeToken));break;default:Di()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((e,n)=>{this.ze(n)&&t(n)})}He(e){const t=e.targetId,n=e.me.count,r=this.Je(t);if(r){const i=r.target;if(Aa(i))if(0===n){const e=new es(i.path);this.Ue(t,e,Zo.newNoDocument(e,Qi.min()))}else xi(1===n);else{const r=this.Ye(t);if(r!==n){const n=this.Ze(e),i=n?this.Xe(n,e,r):1;if(0!==i){this.je(t);const e=2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,e)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:i=0}=t;let s,o;try{s=Io(n).toUint8Array()}catch(a){if(a instanceof go)return Ai("Decoding the base64 bloom filter in existence filter failed ("+a.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw a}try{o=new $u(s,r,i)}catch(a){return Ai(a instanceof Hu?"BloomFilter error: ":"Applying bloom filter failed: ",a),null}return 0===o.Ie?null:o}Xe(e,t,n){return t.me.count===n-this.nt(e,t.targetId)?0:2}nt(e,t){const n=this.Le.getRemoteKeysForTarget(t);let r=0;return n.forEach(n=>{const i=this.Le.tt(),s=`projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;e.mightContain(s)||(this.Ue(t,n,null),r++)}),r}rt(e){const t=new Map;this.Be.forEach((n,r)=>{const i=this.Je(r);if(i){if(n.current&&Aa(i.target)){const t=new es(i.target.path);null!==this.ke.get(t)||this.it(r,t)||this.Ue(r,t,Zo.newNoDocument(t,e))}n.be&&(t.set(r,n.ve()),n.Ce())}});let n=ru();this.qe.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.Je(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.ke.forEach((t,n)=>n.setReadTime(e));const r=new Wu(e,t,this.Qe,this.ke,n);return this.ke=Wa(),this.qe=tc(),this.Qe=new uo(Gi),r}$e(e,t){if(!this.ze(e))return;const n=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,n),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,n){if(!this.ze(e))return;const r=this.Ge(e);this.it(e,t)?r.Fe(t,1):r.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),n&&(this.ke=this.ke.insert(t,n))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Zu,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new ho(Gi),this.qe=this.qe.insert(e,t)),t}ze(e){const t=null!==this.Je(e);return t||Ci("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Zu),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function tc(){return new uo(es.comparator)}function nc(){return new uo(es.comparator)}const rc=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),ic=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),sc=(()=>({and:"AND",or:"OR"}))();class oc{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ac(e,t){return e.useProto3Json||Cs(t)?t:{value:t}}function uc(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function cc(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function lc(e,t){return uc(e,t.toTimestamp())}function hc(e){return xi(!!e),Qi.fromTimestamp(function(e){const t=wo(e);return new Wi(t.seconds,t.nanos)}(e))}function dc(e,t){return fc(e,t).canonicalString()}function fc(e,t){const n=(r=e,new Yi(["projects",r.projectId,"databases",r.database])).child("documents");var r;return void 0===t?n:n.child(t)}function pc(e){const t=Yi.fromString(e);return xi(Lc(t)),t}function mc(e,t){return dc(e.databaseId,t.path)}function gc(e,t){const n=pc(t);if(n.get(1)!==e.databaseId.projectId)throw new Pi(Oi.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new Pi(Oi.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new es(_c(n))}function yc(e,t){return dc(e.databaseId,t)}function vc(e){const t=pc(e);return 4===t.length?Yi.emptyPath():_c(t)}function wc(e){return new Yi(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function _c(e){return xi(e.length>4&&"documents"===e.get(4)),e.popFirst(5)}function Ic(e,t,n){return{name:mc(e,t),fields:n.value.mapValue.fields}}function bc(e,t){let n;if(t instanceof Nu)n={update:Ic(e,t.key,t.value)};else if(t instanceof Pu)n={delete:mc(e,t.key)};else if(t instanceof Du)n={update:Ic(e,t.key,t.data),updateMask:Pc(t.fieldMask)};else{if(!(t instanceof Lu))return Di();n={verify:mc(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof hu)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof du)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof pu)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof gu)return{fieldPath:t.field.canonicalString(),increment:n.Pe};throw Di()}(0,e))),t.precondition.isNone||(n.currentDocument=(r=e,void 0!==(i=t.precondition).updateTime?{updateTime:lc(r,i.updateTime)}:void 0!==i.exists?{exists:i.exists}:Di())),n;var r,i}function Tc(e,t){const n=t.currentDocument?void 0!==(i=t.currentDocument).updateTime?Iu.updateTime(hc(i.updateTime)):void 0!==i.exists?Iu.exists(i.exists):Iu.none():Iu.none(),r=t.updateTransforms?t.updateTransforms.map(t=>function(e,t){let n=null;if("setToServerValue"in t)xi("REQUEST_TIME"===t.setToServerValue),n=new hu;else if("appendMissingElements"in t){const e=t.appendMissingElements.values||[];n=new du(e)}else if("removeAllFromArray"in t){const e=t.removeAllFromArray.values||[];n=new pu(e)}else"increment"in t?n=new gu(e,t.increment):Di();const r=Zi.fromServerFormat(t.fieldPath);return new wu(r,n)}(e,t)):[];var i;if(t.update){t.update.name;const i=gc(e,t.update.name),s=new Yo({mapValue:{fields:t.update.fields}});if(t.updateMask){const e=function(e){const t=e.fieldPaths||[];return new mo(t.map(e=>Zi.fromServerFormat(e)))}(t.updateMask);return new Du(i,s,e,n,r)}return new Nu(i,s,n,r)}if(t.delete){const r=gc(e,t.delete);return new Pu(r,n)}if(t.verify){const r=gc(e,t.verify);return new Lu(r,n)}return Di()}function Ec(e,t){return{documents:[yc(e,t.path)]}}function Sc(e,t){const n={structuredQuery:{}},r=t.path;let i;null!==t.collectionGroup?(i=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=yc(e,i);const s=function(e){if(0!==e.length)return Oc(aa.create(e,"and"))}(t.filters);s&&(n.structuredQuery.where=s);const o=function(e){if(0!==e.length)return e.map(e=>{return{field:xc((t=e).field),direction:Ac(t.dir)};var t})}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=ac(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt={before:(u=t.startAt).inclusive,values:u.position}),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{_t:n,parent:i};var u}function Cc(e){let t=vc(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){xi(1===r);const e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let s=[];n.where&&(s=function(e){const t=kc(e);return t instanceof aa&&la(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(e=>{return new ra(Rc((t=e).field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(t.direction));var t}));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,Cs(t)?null:t}(n.limit));let u=null;n.startAt&&(u=function(e){const t=!!e.before,n=e.values||[];return new ea(n,t)}(n.startAt));let c=null;return n.endAt&&(c=function(e){const t=!e.before,n=e.values||[];return new ea(n,t)}(n.endAt)),function(e,t,n,r,i,s,o,a){return new Ra(e,t,n,r,i,"F",o,a)}(t,i,o,s,a,0,u,c)}function kc(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=Rc(e.unaryFilter.field);return oa.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=Rc(e.unaryFilter.field);return oa.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Rc(e.unaryFilter.field);return oa.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Rc(e.unaryFilter.field);return oa.create(i,"!=",{nullValue:"NULL_VALUE"});default:return Di()}}(e):void 0!==e.fieldFilter?(t=e,oa.create(Rc(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return Di()}}(t.fieldFilter.op),t.fieldFilter.value)):void 0!==e.compositeFilter?function(e){return aa.create(e.compositeFilter.filters.map(e=>kc(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return Di()}}(e.compositeFilter.op))}(e):Di();var t}function Ac(e){return rc[e]}function Nc(e){return ic[e]}function Dc(e){return sc[e]}function xc(e){return{fieldPath:e.canonicalString()}}function Rc(e){return Zi.fromServerFormat(e.fieldPath)}function Oc(e){return e instanceof oa?function(e){if("=="===e.op){if(jo(e.value))return{unaryFilter:{field:xc(e.field),op:"IS_NAN"}};if(Bo(e.value))return{unaryFilter:{field:xc(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(jo(e.value))return{unaryFilter:{field:xc(e.field),op:"IS_NOT_NAN"}};if(Bo(e.value))return{unaryFilter:{field:xc(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:xc(e.field),op:Nc(e.op),value:e.value}}}(e):e instanceof aa?function(e){const t=e.getFilters().map(e=>Oc(e));return 1===t.length?t[0]:{compositeFilter:{op:Dc(e.op),filters:t}}}(e):Di()}function Pc(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Lc(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
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
 */class Mc{constructor(e,t,n,r,i=Qi.min(),s=Qi.min(),o=yo.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new Mc(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Mc(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Mc(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Mc(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
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
 */class Vc{constructor(e){this.ct=e}}function Fc(e,t){const n=t.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:Uc(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())r.document={name:mc(i=e.ct,(s=t).key),fields:s.data.value.mapValue.fields,updateTime:uc(i,s.version.toTimestamp()),createTime:uc(i,s.createTime.toTimestamp())};else if(t.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:Bc(t.version)};else{if(!t.isUnknownDocument())return Di();r.unknownDocument={path:n.path.toArray(),version:Bc(t.version)}}var i,s;return r}function Uc(e){const t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function Bc(e){const t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function jc(e){const t=new Wi(e.seconds,e.nanoseconds);return Qi.fromTimestamp(t)}function qc(e,t){const n=(t.baseMutations||[]).map(t=>Tc(e.ct,t));for(let s=0;s<t.mutations.length-1;++s){const e=t.mutations[s];if(s+1<t.mutations.length&&void 0!==t.mutations[s+1].transform){const n=t.mutations[s+1];e.updateTransforms=n.transform.fieldTransforms,t.mutations.splice(s+1,1),++s}}const r=t.mutations.map(t=>Tc(e.ct,t)),i=Wi.fromMillis(t.localWriteTimeMs);return new Mu(t.batchId,i,n,r)}function zc(e){const t=jc(e.readTime),n=void 0!==e.lastLimboFreeSnapshotVersion?jc(e.lastLimboFreeSnapshotVersion):Qi.min();let r;return r=void 0!==e.query.documents?(xi(1===(i=e.query).documents.length),Va(Oa(vc(i.documents[0])))):function(e){return Va(Cc(e))}(e.query),new Mc(r,e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,t,n,yo.fromBase64String(e.resumeToken));var i}function Kc(e,t){const n=Bc(t.snapshotVersion),r=Bc(t.lastLimboFreeSnapshotVersion);let i;i=Aa(t.target)?Ec(e.ct,t.target):Sc(e.ct,t.target)._t;const s=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:Ca(t.target),readTime:n,resumeToken:s,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function Gc(e){const t=Cc({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Ua(t,t.limit,"L"):t}function $c(e,t){return new Fu(t.largestBatchId,Tc(e.ct,t.overlayMutation))}function Hc(e,t){const n=t.path.lastSegment();return[e,As(t.path.popLast()),n]}function Wc(e,t,n,r){return{indexId:e,uid:t,sequenceNumber:n,readTime:Bc(r.readTime),documentKey:As(r.documentKey.path),largestBatchId:r.largestBatchId}}
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
 */class Qc{getBundleMetadata(e,t){return Jc(e).get(t).next(e=>{if(e)return{id:(t=e).bundleId,createTime:jc(t.createTime),version:t.version};var t})}saveBundleMetadata(e,t){return Jc(e).put({bundleId:(n=t).id,createTime:Bc(hc(n.createTime)),version:n.version});var n}getNamedQuery(e,t){return Yc(e).get(t).next(e=>{if(e)return{name:(t=e).name,query:Gc(t.bundledQuery),readTime:jc(t.readTime)};var t})}saveNamedQuery(e,t){return Yc(e).put({name:(n=t).name,readTime:Bc(hc(n.readTime)),bundledQuery:n.bundledQuery});var n}}function Jc(e){return io(e,"bundles")}function Yc(e){return io(e,"namedQueries")}
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
 */class Xc{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const n=t.uid||"";return new Xc(e,n)}getOverlay(e,t){return Zc(e).get(Hc(this.userId,t)).next(e=>e?$c(this.serializer,e):null)}getOverlays(e,t){const n=Xa();return ds.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){const r=[];return n.forEach((n,i)=>{const s=new Fu(t,i);r.push(this.ht(e,s))}),ds.waitFor(r)}removeOverlaysForBatchId(e,t,n){const r=new Set;t.forEach(e=>r.add(As(e.getCollectionPath())));const i=[];return r.forEach(t=>{const r=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,n+1],!1,!0);i.push(Zc(e).j("collectionPathOverlayIndex",r))}),ds.waitFor(i)}getOverlaysForCollection(e,t,n){const r=Xa(),i=As(t),s=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Zc(e).U("collectionPathOverlayIndex",s).next(e=>{for(const t of e){const e=$c(this.serializer,t);r.set(e.getKey(),e)}return r})}getOverlaysForCollectionGroup(e,t,n,r){const i=Xa();let s;const o=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Zc(e).J({index:"collectionGroupOverlayIndex",range:o},(e,t,n)=>{const o=$c(this.serializer,t);i.size()<r||o.largestBatchId===s?(i.set(o.getKey(),o),s=o.largestBatchId):n.done()}).next(()=>i)}ht(e,t){return Zc(e).put(function(e,t,n){const[r,i,s]=Hc(t,n.mutation.key);return{userId:t,collectionPath:i,documentId:s,collectionGroup:n.mutation.key.getCollectionGroup(),largestBatchId:n.largestBatchId,overlayMutation:bc(e.ct,n.mutation)}}(this.serializer,this.userId,t))}}function Zc(e){return io(e,"documentOverlays")}
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
 */class el{Pt(e){return io(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next(e=>{const t=null==e?void 0:e.value;return t?yo.fromUint8Array(t):yo.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}
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
 */class tl{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(_o(e.integerValue));else if("doubleValue"in e){const n=_o(e.doubleValue);isNaN(n)?this.dt(t,13):(this.dt(t,15),ks(n)?t.At(0):t.At(n))}else if("timestampValue"in e){let n=e.timestampValue;this.dt(t,20),"string"==typeof n&&(n=wo(n)),t.Rt(`${n.seconds||""}`),t.At(n.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(Io(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.dt(t,45),t.At(n.latitude||0),t.At(n.longitude||0)}else"mapValue"in e?Go(e)?this.dt(t,Number.MAX_SAFE_INTEGER):zo(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):Di()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const n=e.fields||{};this.dt(t,55);for(const r of Object.keys(n))this.Vt(r,t),this.Tt(n[r],t)}wt(e,t){var n,r;const i=e.fields||{};this.dt(t,53);const s="value",o=(null===(r=null===(n=i[s].arrayValue)||void 0===n?void 0:n.values)||void 0===r?void 0:r.length)||0;this.dt(t,15),t.At(_o(o)),this.Vt(s,t),this.Tt(i[s],t)}bt(e,t){const n=e.values||[];this.dt(t,50);for(const r of n)this.Tt(r,t)}yt(e,t){this.dt(t,37),es.fromName(e).path.forEach(e=>{this.dt(t,60),this.Dt(e,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}}function nl(e){if(0===e)return 8;let t=0;return!(e>>4)&&(t+=4,e<<=4),!(e>>6)&&(t+=2,e<<=2),!(e>>7)&&(t+=1),t}function rl(e){const t=64-function(e){let t=0;for(let n=0;n<8;++n){const r=nl(255&e[n]);if(t+=r,8!==r)break}return t}(e);return Math.ceil(t/8)}tl.vt=new tl;class il{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ft(n.value),n=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ot(n.value),n=t.next();this.Nt()}Lt(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Ft(e);else if(e<2048)this.Ft(960|e>>>6),this.Ft(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Ft(480|e>>>12),this.Ft(128|63&e>>>6),this.Ft(128|63&e);else{const e=t.codePointAt(0);this.Ft(240|e>>>18),this.Ft(128|63&e>>>12),this.Ft(128|63&e>>>6),this.Ft(128|63&e)}}this.Mt()}Bt(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Ot(e);else if(e<2048)this.Ot(960|e>>>6),this.Ot(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Ot(480|e>>>12),this.Ot(128|63&e>>>6),this.Ot(128|63&e);else{const e=t.codePointAt(0);this.Ot(240|e>>>18),this.Ot(128|63&e>>>12),this.Ot(128|63&e>>>6),this.Ot(128|63&e)}}this.Nt()}kt(e){const t=this.qt(e),n=rl(t);this.Qt(1+n),this.buffer[this.position++]=255&n;for(let r=t.length-n;r<t.length;++r)this.buffer[this.position++]=255&t[r]}Kt(e){const t=this.qt(e),n=rl(t);this.Qt(1+n),this.buffer[this.position++]=~(255&n);for(let r=t.length-n;r<t.length;++r)this.buffer[this.position++]=~(255&t[r])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=function(e){const t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let r=1;r<t.length;++r)t[r]^=n?255:0;return t}Ft(e){const t=255&e;0===t?(this.Ut(0),this.Ut(255)):255===t?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;0===t?(this.Gt(0),this.Gt(255)):255===t?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const r=new Uint8Array(n);r.set(this.buffer),this.buffer=r}}class sl{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class ol{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class al{constructor(){this.jt=new il,this.Ht=new sl(this.jt),this.Jt=new ol(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return 0===e?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}
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
 */class ul{constructor(e,t,n,r){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=r}Zt(){const e=this.directionalValue.length,t=0===e||255===this.directionalValue[e-1]?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new ul(this.indexId,this.documentKey,this.arrayValue,n)}}function cl(e,t){let n=e.indexId-t.indexId;return 0!==n?n:(n=ll(e.arrayValue,t.arrayValue),0!==n?n:(n=ll(e.directionalValue,t.directionalValue),0!==n?n:es.comparator(e.documentKey,t.documentKey)))}function ll(e,t){for(let n=0;n<e.length&&n<t.length;++n){const r=e[n]-t[n];if(0!==r)return r}return e.length-t.length}
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
 */class hl{constructor(e){this.Xt=new ho((e,t)=>Zi.comparator(e.field,t.field)),this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const e=t;e.isInequality()?this.Xt=this.Xt.add(e):this.tn.push(e)}}get nn(){return this.Xt.size>1}rn(e){if(xi(e.collectionGroup===this.collectionId),this.nn)return!1;const t=ns(e);if(void 0!==t&&!this.sn(t))return!1;const n=rs(e);let r=new Set,i=0,s=0;for(;i<n.length&&this.sn(n[i]);++i)r=r.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Xt.size>0){const e=this.Xt.getIterator().getNext();if(!r.has(e.field.canonicalString())){const t=n[i];if(!this.on(e,t)||!this._n(this.en[s++],t))return!1}++i}for(;i<n.length;++i){const e=n[i];if(s>=this.en.length||!this._n(this.en[s++],e))return!1}return!0}an(){if(this.nn)return null;let e=new ho(Zi.comparator);const t=[];for(const n of this.tn)if(!n.field.isKeyField())if("array-contains"===n.op||"array-contains-any"===n.op)t.push(new is(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new is(n.field,0))}for(const n of this.en)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new is(n.field,"asc"===n.dir?0:1)));return new ts(ts.UNKNOWN_ID,this.collectionId,t,ss.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;const n="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===n}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}
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
 */function dl(e){var t,n;if(xi(e instanceof oa||e instanceof aa),e instanceof oa){if(e instanceof Ia){const r=(null===(n=null===(t=e.value.arrayValue)||void 0===t?void 0:t.values)||void 0===n?void 0:n.map(t=>oa.create(e.field,"==",t)))||[];return aa.create(r,"or")}return e}const r=e.filters.map(e=>dl(e));return aa.create(r,e.op)}function fl(e){if(0===e.getFilters().length)return[];const t=yl(dl(e));return xi(gl(t)),pl(t)||ml(t)?[t]:t.getFilters()}function pl(e){return e instanceof oa}function ml(e){return e instanceof aa&&la(e)}function gl(e){return pl(e)||ml(e)||function(e){if(e instanceof aa&&ca(e)){for(const t of e.getFilters())if(!pl(t)&&!ml(t))return!1;return!0}return!1}(e)}function yl(e){if(xi(e instanceof oa||e instanceof aa),e instanceof oa)return e;if(1===e.filters.length)return yl(e.filters[0]);const t=e.filters.map(e=>yl(e));let n=aa.create(t,e.op);return n=_l(n),gl(n)?n:(xi(n instanceof aa),xi(ua(n)),xi(n.filters.length>1),n.filters.reduce((e,t)=>vl(e,t)))}function vl(e,t){let n;return xi(e instanceof oa||e instanceof aa),xi(t instanceof oa||t instanceof aa),n=e instanceof oa?t instanceof oa?(r=e,i=t,aa.create([r,i],"and")):wl(e,t):t instanceof oa?wl(t,e):function(e,t){if(xi(e.filters.length>0&&t.filters.length>0),ua(e)&&ua(t))return pa(e,t.getFilters());const n=ca(e)?e:t,r=ca(e)?t:e,i=n.filters.map(e=>vl(e,r));return aa.create(i,"or")}(e,t),_l(n);var r,i}function wl(e,t){if(ua(t))return pa(t,e.getFilters());{const n=t.filters.map(t=>vl(e,t));return aa.create(n,"or")}}function _l(e){if(xi(e instanceof oa||e instanceof aa),e instanceof oa)return e;const t=e.getFilters();if(1===t.length)return _l(t[0]);if(ha(e))return e;const n=t.map(e=>_l(e)),r=[];return n.forEach(t=>{t instanceof oa?r.push(t):t instanceof aa&&(t.op===e.op?r.push(...t.filters):r.push(t))}),1===r.length?r[0]:aa.create(r,e.op)
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
 */}class Il{constructor(){this.un=new bl}addToCollectionParentIndex(e,t){return this.un.add(t),ds.resolve()}getCollectionParents(e,t){return ds.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return ds.resolve()}deleteFieldIndex(e,t){return ds.resolve()}deleteAllFieldIndexes(e){return ds.resolve()}createTargetIndexes(e,t){return ds.resolve()}getDocumentsMatchingTarget(e,t){return ds.resolve(null)}getIndexType(e,t){return ds.resolve(0)}getFieldIndexes(e,t){return ds.resolve([])}getNextCollectionGroupToUpdate(e){return ds.resolve(null)}getMinOffset(e,t){return ds.resolve(as.min())}getMinOffsetFromCollectionGroup(e,t){return ds.resolve(as.min())}updateCollectionGroup(e,t,n){return ds.resolve()}updateIndexEntries(e,t){return ds.resolve()}}class bl{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new ho(Yi.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new ho(Yi.comparator)).toArray()}}
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
 */const Tl=new Uint8Array(0);class El{constructor(e,t){this.databaseId=t,this.cn=new bl,this.ln=new $a(e=>Ca(e),(e,t)=>ka(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const n=t.lastSegment(),r=t.popLast();e.addOnCommittedListener(()=>{this.cn.add(t)});const i={collectionId:n,parent:As(r)};return Sl(e).put(i)}return ds.resolve()}getCollectionParents(e,t){const n=[],r=IDBKeyRange.bound([t,""],[Hi(t),""],!1,!0);return Sl(e).U(r).next(e=>{for(const r of e){if(r.collectionId!==t)break;n.push(xs(r.parent))}return n})}addFieldIndex(e,t){const n=kl(e),r={indexId:(i=t).indexId,collectionGroup:i.collectionGroup,fields:i.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])};var i;delete r.indexId;const s=n.add(r);if(t.indexState){const n=Al(e);return s.next(e=>{n.put(Wc(e,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const n=kl(e),r=Al(e),i=Cl(e);return n.delete(t.indexId).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=kl(e),n=Cl(e),r=Al(e);return t.j().next(()=>n.j()).next(()=>r.j())}createTargetIndexes(e,t){return ds.forEach(this.hn(t),t=>this.getIndexType(e,t).next(n=>{if(0===n||1===n){const n=new hl(t).an();if(null!=n)return this.addFieldIndex(e,n)}}))}getDocumentsMatchingTarget(e,t){const n=Cl(e);let r=!0;const i=new Map;return ds.forEach(this.hn(t),t=>this.Pn(e,t).next(e=>{r&&(r=!!e),i.set(t,e)})).next(()=>{if(r){let e=ru();const r=[];return ds.forEach(i,(i,s)=>{var o;Ci("IndexedDbIndexManager",`Using index ${o=i,`id=${o.indexId}|cg=${o.collectionGroup}|f=${o.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")}`} to execute ${Ca(t)}`);const a=function(e,t){const n=ns(t);if(void 0===n)return null;for(const r of Na(e,n.fieldPath))switch(r.op){case"array-contains-any":return r.value.arrayValue.values||[];case"array-contains":return[r.value]}return null}(s,i),u=function(e,t){const n=new Map;for(const r of rs(t))for(const t of Na(e,r.fieldPath))switch(t.op){case"==":case"in":n.set(r.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return n.set(r.fieldPath.canonicalString(),t.value),Array.from(n.values())}return null}(s,i),c=function(e,t){const n=[];let r=!0;for(const i of rs(t)){const t=0===i.kind?Da(e,i.fieldPath,e.startAt):xa(e,i.fieldPath,e.startAt);n.push(t.value),r&&(r=t.inclusive)}return new ea(n,r)}(s,i),l=function(e,t){const n=[];let r=!0;for(const i of rs(t)){const t=0===i.kind?xa(e,i.fieldPath,e.endAt):Da(e,i.fieldPath,e.endAt);n.push(t.value),r&&(r=t.inclusive)}return new ea(n,r)}(s,i),h=this.In(i,s,c),d=this.In(i,s,l),f=this.Tn(i,s,u),p=this.En(i.indexId,a,h,c.inclusive,d,l.inclusive,f);return ds.forEach(p,i=>n.G(i,t.limit).next(t=>{t.forEach(t=>{const n=es.fromSegments(t.documentKey);e.has(n)||(e=e.add(n),r.push(n))})}))}).next(()=>r)}return ds.resolve(null)})}hn(e){let t=this.ln.get(e);return t||(t=0===e.filters.length?[e]:fl(aa.create(e.filters,"and")).map(t=>Sa(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt)),this.ln.set(e,t),t)}En(e,t,n,r,i,s,o){const a=(null!=t?t.length:1)*Math.max(n.length,i.length),u=a/(null!=t?t.length:1),c=[];for(let l=0;l<a;++l){const a=t?this.dn(t[l/u]):Tl,h=this.An(e,a,n[l%u],r),d=this.Rn(e,a,i[l%u],s),f=o.map(t=>this.An(e,a,t,!0));c.push(...this.createRange(h,d,f))}return c}An(e,t,n,r){const i=new ul(e,es.empty(),t,n);return r?i:i.Zt()}Rn(e,t,n,r){const i=new ul(e,es.empty(),t,n);return r?i.Zt():i}Pn(e,t){const n=new hl(t),r=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,r).next(e=>{let t=null;for(const r of e)n.rn(r)&&(!t||r.fields.length>t.fields.length)&&(t=r);return t})}getIndexType(e,t){let n=2;const r=this.hn(t);return ds.forEach(r,t=>this.Pn(e,t).next(e=>{e?0!==n&&e.fields.length<function(e){let t=new ho(Zi.comparator),n=!1;for(const r of e.filters)for(const e of r.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?n=!0:t=t.add(e.field));for(const r of e.orderBy)r.field.isKeyField()||(t=t.add(r.field));return t.size+(n?1:0)}(t)&&(n=1):n=0})).next(()=>null!==t.limit&&r.length>1&&2===n?1:n)}Vn(e,t){const n=new al;for(const r of rs(e)){const e=t.data.field(r.fieldPath);if(null==e)return null;const i=n.Yt(r.kind);tl.vt.It(e,i)}return n.zt()}dn(e){const t=new al;return tl.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const n=new al;return tl.vt.It(Vo(this.databaseId,t),n.Yt(function(e){const t=rs(e);return 0===t.length?0:t[t.length-1].kind}(e))),n.zt()}Tn(e,t,n){if(null===n)return[];let r=[];r.push(new al);let i=0;for(const s of rs(e)){const e=n[i++];for(const n of r)if(this.fn(t,s.fieldPath)&&Uo(e))r=this.gn(r,s,e);else{const t=n.Yt(s.kind);tl.vt.It(e,t)}}return this.pn(r)}In(e,t,n){return this.Tn(e,t,n.position)}pn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].zt();return t}gn(e,t,n){const r=[...e],i=[];for(const s of n.arrayValue.values||[])for(const e of r){const n=new al;n.seed(e.zt()),tl.vt.It(s,n.Yt(t.kind)),i.push(n)}return i}fn(e,t){return!!e.filters.find(e=>e instanceof oa&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){const n=kl(e),r=Al(e);return(t?n.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.U()).next(e=>{const t=[];return ds.forEach(e,e=>r.get([e.indexId,this.uid]).next(n=>{t.push(function(e,t){const n=t?new ss(t.sequenceNumber,new as(jc(t.readTime),new es(xs(t.documentKey)),t.largestBatchId)):ss.empty(),r=e.fields.map(([e,t])=>new is(Zi.fromServerFormat(e),t));return new ts(e.indexId,e.collectionGroup,r,n)}(e,n))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{const n=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==n?n:Gi(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,n){const r=kl(e),i=Al(e);return this.yn(e).next(e=>r.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(t=>ds.forEach(t,t=>i.put(Wc(t.indexId,this.uid,e,n)))))}updateIndexEntries(e,t){const n=new Map;return ds.forEach(t,(t,r)=>{const i=n.get(t.collectionGroup);return(i?ds.resolve(i):this.getFieldIndexes(e,t.collectionGroup)).next(i=>(n.set(t.collectionGroup,i),ds.forEach(i,n=>this.wn(e,t,n).next(t=>{const i=this.Sn(r,n);return t.isEqual(i)?ds.resolve():this.bn(e,r,n,t,i)}))))})}Dn(e,t,n,r){return Cl(e).put({indexId:r.indexId,uid:this.uid,arrayValue:r.arrayValue,directionalValue:r.directionalValue,orderedDocumentKey:this.mn(n,t.key),documentKey:t.key.path.toArray()})}vn(e,t,n,r){return Cl(e).delete([r.indexId,this.uid,r.arrayValue,r.directionalValue,this.mn(n,t.key),t.key.path.toArray()])}wn(e,t,n){const r=Cl(e);let i=new ho(cl);return r.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.mn(n,t)])},(e,r)=>{i=i.add(new ul(n.indexId,t,r.arrayValue,r.directionalValue))}).next(()=>i)}Sn(e,t){let n=new ho(cl);const r=this.Vn(t,e);if(null==r)return n;const i=ns(t);if(null!=i){const s=e.data.field(i.fieldPath);if(Uo(s))for(const i of s.arrayValue.values||[])n=n.add(new ul(t.indexId,e.key,this.dn(i),r))}else n=n.add(new ul(t.indexId,e.key,Tl,r));return n}bn(e,t,n,r,i){Ci("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const s=[];return function(e,t,n,r,i){const s=e.getIterator(),o=t.getIterator();let a=po(s),u=po(o);for(;a||u;){let e=!1,t=!1;if(a&&u){const r=n(a,u);r<0?t=!0:r>0&&(e=!0)}else null!=a?t=!0:e=!0;e?(r(u),u=po(o)):t?(i(a),a=po(s)):(a=po(s),u=po(o))}}(r,i,cl,r=>{s.push(this.Dn(e,t,n,r))},r=>{s.push(this.vn(e,t,n,r))}),ds.waitFor(s)}yn(e){let t=1;return Al(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,n,r)=>{r.done(),t=n.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((e,t)=>cl(e,t)).filter((e,t,n)=>!t||0!==cl(e,n[t-1]));const r=[];r.push(e);for(const s of n){const n=cl(s,e),i=cl(s,t);if(0===n)r[0]=e.Zt();else if(n>0&&i<0)r.push(s),r.push(s.Zt());else if(i>0)break}r.push(t);const i=[];for(let s=0;s<r.length;s+=2){if(this.Cn(r[s],r[s+1]))return[];const e=[r[s].indexId,this.uid,r[s].arrayValue,r[s].directionalValue,Tl,[]],t=[r[s+1].indexId,this.uid,r[s+1].arrayValue,r[s+1].directionalValue,Tl,[]];i.push(IDBKeyRange.bound(e,t))}return i}Cn(e,t){return cl(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Nl)}getMinOffset(e,t){return ds.mapArray(this.hn(t),t=>this.Pn(e,t).next(e=>e||Di())).next(Nl)}}function Sl(e){return io(e,"collectionParents")}function Cl(e){return io(e,"indexEntries")}function kl(e){return io(e,"indexConfiguration")}function Al(e){return io(e,"indexState")}function Nl(e){xi(0!==e.length);let t=e[0].indexState.offset,n=t.largestBatchId;for(let r=1;r<e.length;r++){const i=e[r].indexState.offset;us(i,t)<0&&(t=i),n<i.largestBatchId&&(n=i.largestBatchId)}return new as(t.readTime,t.documentKey,n)}
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
 */const Dl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class xl{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new xl(e,xl.DEFAULT_COLLECTION_PERCENTILE,xl.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
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
 */function Rl(e,t,n){const r=e.store("mutations"),i=e.store("documentMutations"),s=[],o=IDBKeyRange.only(n.batchId);let a=0;const u=r.J({range:o},(e,t,n)=>(a++,n.delete()));s.push(u.next(()=>{xi(1===a)}));const c=[];for(const l of n.mutations){const e=Ps(t,l.key.path,n.batchId);s.push(i.delete(e)),c.push(l.key)}return ds.waitFor(s).next(()=>c)}function Ol(e){if(!e)return 0;let t;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw Di();t=e.noDocument}return JSON.stringify(t).length}
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
 */xl.DEFAULT_COLLECTION_PERCENTILE=10,xl.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,xl.DEFAULT=new xl(41943040,xl.DEFAULT_COLLECTION_PERCENTILE,xl.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),xl.DISABLED=new xl(-1,0,0);class Pl{constructor(e,t,n,r){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=r,this.Fn={}}static lt(e,t,n,r){xi(""!==e.uid);const i=e.isAuthenticated()?e.uid:"";return new Pl(i,t,n,r)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Ml(e).J({index:"userMutationsIndex",range:n},(e,n,r)=>{t=!1,r.done()}).next(()=>t)}addMutationBatch(e,t,n,r){const i=Vl(e),s=Ml(e);return s.add({}).next(o=>{xi("number"==typeof o);const a=new Mu(o,t,n,r),u=function(e,t,n){const r=n.baseMutations.map(t=>bc(e.ct,t)),i=n.mutations.map(t=>bc(e.ct,t));return{userId:t,batchId:n.batchId,localWriteTimeMs:n.localWriteTime.toMillis(),baseMutations:r,mutations:i}}(this.serializer,this.userId,a),c=[];let l=new ho((e,t)=>Gi(e.canonicalString(),t.canonicalString()));for(const e of r){const t=Ps(this.userId,e.key.path,o);l=l.add(e.key.path.popLast()),c.push(s.put(u)),c.push(i.put(t,Ls))}return l.forEach(t=>{c.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.Fn[o]=a.keys()}),ds.waitFor(c).next(()=>a)})}lookupMutationBatch(e,t){return Ml(e).get(t).next(e=>e?(xi(e.userId===this.userId),qc(this.serializer,e)):null)}Mn(e,t){return this.Fn[t]?ds.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){const n=e.keys();return this.Fn[t]=n,n}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Ml(e).J({index:"userMutationsIndex",range:r},(e,t,r)=>{t.userId===this.userId&&(xi(t.batchId>=n),i=qc(this.serializer,t)),r.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return Ml(e).J({index:"userMutationsIndex",range:t,reverse:!0},(e,t,r)=>{n=t.batchId,r.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return Ml(e).U("userMutationsIndex",t).next(e=>e.map(e=>qc(this.serializer,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=Os(this.userId,t.path),r=IDBKeyRange.lowerBound(n),i=[];return Vl(e).J({range:r},(n,r,s)=>{const[o,a,u]=n,c=xs(a);if(o===this.userId&&t.path.isEqual(c))return Ml(e).get(u).next(e=>{if(!e)throw Di();xi(e.userId===this.userId),i.push(qc(this.serializer,e))});s.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ho(Gi);const r=[];return t.forEach(t=>{const i=Os(this.userId,t.path),s=IDBKeyRange.lowerBound(i),o=Vl(e).J({range:s},(e,r,i)=>{const[s,o,a]=e,u=xs(o);s===this.userId&&t.path.isEqual(u)?n=n.add(a):i.done()});r.push(o)}),ds.waitFor(r).next(()=>this.xn(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1,i=Os(this.userId,n),s=IDBKeyRange.lowerBound(i);let o=new ho(Gi);return Vl(e).J({range:s},(e,t,i)=>{const[s,a,u]=e,c=xs(a);s===this.userId&&n.isPrefixOf(c)?c.length===r&&(o=o.add(u)):i.done()}).next(()=>this.xn(e,o))}xn(e,t){const n=[],r=[];return t.forEach(t=>{r.push(Ml(e).get(t).next(e=>{if(null===e)throw Di();xi(e.userId===this.userId),n.push(qc(this.serializer,e))}))}),ds.waitFor(r).next(()=>n)}removeMutationBatch(e,t){return Rl(e._e,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.On(t.batchId)}),ds.forEach(n,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return ds.resolve();const n=IDBKeyRange.lowerBound(function(e){return[e]}(this.userId)),r=[];return Vl(e).J({range:n},(e,t,n)=>{if(e[0]===this.userId){const t=xs(e[1]);r.push(t)}else n.done()}).next(()=>{xi(0===r.length)})})}containsKey(e,t){return Ll(e,this.userId,t)}Nn(e){return Fl(e).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function Ll(e,t,n){const r=Os(t,n.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return Vl(e).J({range:s,H:!0},(e,n,r)=>{const[s,a,u]=e;s===t&&a===i&&(o=!0),r.done()}).next(()=>o)}function Ml(e){return io(e,"mutations")}function Vl(e){return io(e,"documentMutations")}function Fl(e){return io(e,"mutationQueues")}
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
 */class Ul{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Ul(0)}static kn(){return new Ul(-1)}}
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
 */class Bl{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next(t=>{const n=new Ul(t.highestTargetId);return t.highestTargetId=n.next(),this.Qn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.qn(e).next(e=>Qi.fromTimestamp(new Wi(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.qn(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.qn(e).next(r=>(r.highestListenSequenceNumber=t,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),t>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=t),this.Qn(e,r)))}addTargetData(e,t){return this.Kn(e,t).next(()=>this.qn(e).next(n=>(n.targetCount+=1,this.$n(t,n),this.Qn(e,n))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>jl(e).delete(t.targetId)).next(()=>this.qn(e)).next(t=>(xi(t.targetCount>0),t.targetCount-=1,this.Qn(e,t)))}removeTargets(e,t,n){let r=0;const i=[];return jl(e).J((s,o)=>{const a=zc(o);a.sequenceNumber<=t&&null===n.get(a.targetId)&&(r++,i.push(this.removeTargetData(e,a)))}).next(()=>ds.waitFor(i)).next(()=>r)}forEachTarget(e,t){return jl(e).J((e,n)=>{const r=zc(n);t(r)})}qn(e){return ql(e).get("targetGlobalKey").next(e=>(xi(null!==e),e))}Qn(e,t){return ql(e).put("targetGlobalKey",t)}Kn(e,t){return jl(e).put(Kc(this.serializer,t))}$n(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.qn(e).next(e=>e.targetCount)}getTargetData(e,t){const n=Ca(t),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return jl(e).J({range:r,index:"queryTargetsIndex"},(e,n,r)=>{const s=zc(n);ka(t,s.target)&&(i=s,r.done())}).next(()=>i)}addMatchingKeys(e,t,n){const r=[],i=zl(e);return t.forEach(t=>{const s=As(t.path);r.push(i.put({targetId:n,path:s})),r.push(this.referenceDelegate.addReference(e,n,t))}),ds.waitFor(r)}removeMatchingKeys(e,t,n){const r=zl(e);return ds.forEach(t,t=>{const i=As(t.path);return ds.waitFor([r.delete([n,i]),this.referenceDelegate.removeReference(e,n,t)])})}removeMatchingKeysForTargetId(e,t){const n=zl(e),r=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),r=zl(e);let i=ru();return r.J({range:n,H:!0},(e,t,n)=>{const r=xs(e[1]),s=new es(r);i=i.add(s)}).next(()=>i)}containsKey(e,t){const n=As(t.path),r=IDBKeyRange.bound([n],[Hi(n)],!1,!0);let i=0;return zl(e).J({index:"documentTargetsIndex",H:!0,range:r},([e,t],n,r)=>{0!==e&&(i++,r.done())}).next(()=>i>0)}ot(e,t){return jl(e).get(t).next(e=>e?zc(e):null)}}function jl(e){return io(e,"targets")}function ql(e){return io(e,"targetGlobal")}function zl(e){return io(e,"targetDocuments")}
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
 */function Kl([e,t],[n,r]){const i=Gi(e,n);return 0===i?Gi(t,r):i}class Gl{constructor(e){this.Un=e,this.buffer=new ho(Kl),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();Kl(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class $l{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.jn=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return null!==this.jn}Hn(e){Ci("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,()=>l(this,null,function*(){this.jn=null;try{yield this.localStore.collectGarbage(this.garbageCollector)}catch(e){vs(e)?Ci("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",e):yield hs(e)}yield this.Hn(3e5)}))}}class Hl{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return ds.resolve(Ss.oe);const n=new Gl(t);return this.Jn.forEachTarget(e,e=>n.zn(e.sequenceNumber)).next(()=>this.Jn.Zn(e,e=>n.zn(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Jn.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(Ci("LruGarbageCollector","Garbage collection skipped; disabled"),ds.resolve(Dl)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(Ci("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Dl):this.Xn(e,t))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let n,r,i,s,o,a,u;const c=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(Ci("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,s=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(e,n,t))).next(t=>(i=t,a=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(u=Date.now(),Si()<=B.DEBUG&&Ci("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${s-c}ms\n\tDetermined least recently used ${r} in `+(o-s)+`ms\n\tRemoved ${i} targets in `+(a-o)+`ms\n\tRemoved ${e} documents in `+(u-a)+`ms\nTotal Duration: ${u-c}ms`),ds.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:e})))}}
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
class Wl{constructor(e,t){this.db=e,this.garbageCollector=function(e,t){return new Hl(e,t)}(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}er(e){let t=0;return this.Zn(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,(e,n)=>t(n))}addReference(e,t,n){return Ql(e,n)}removeReference(e,t,n){return Ql(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Ql(e,t)}nr(e,t){return function(e,t){let n=!1;return Fl(e).Y(r=>Ll(e,r,t).next(e=>(e&&(n=!0),ds.resolve(!e)))).next(()=>n)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let i=0;return this.tr(e,(s,o)=>{if(o<=t){const t=this.nr(e,s).next(t=>{if(!t)return i++,n.getEntry(e,s).next(()=>(n.removeEntry(s,Qi.min()),zl(e).delete([0,As(s.path)])))});r.push(t)}}).next(()=>ds.waitFor(r)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Ql(e,t)}tr(e,t){const n=zl(e);let r,i=Ss.oe;return n.J({index:"documentTargetsIndex"},([e,n],{path:s,sequenceNumber:o})=>{0===e?(i!==Ss.oe&&t(new es(xs(r)),i),i=o,r=s):i=Ss.oe}).next(()=>{i!==Ss.oe&&t(new es(xs(r)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Ql(e,t){return zl(e).put((n=t,r=e.currentSequenceNumber,{targetId:0,path:As(n.path),sequenceNumber:r}));var n,r}
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
 */class Jl{constructor(){this.changes=new $a(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Zo.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?ds.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
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
 */class Yl{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return th(e).put(n)}removeEntry(e,t,n){return th(e).delete(function(e,t){const n=e.path.toArray();return[n.slice(0,n.length-2),n[n.length-2],Uc(t),n[n.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.rr(e,n)))}getEntry(e,t){let n=Zo.newInvalidDocument(t);return th(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(nh(t))},(e,r)=>{n=this.ir(t,r)}).next(()=>n)}sr(e,t){let n={size:0,document:Zo.newInvalidDocument(t)};return th(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(nh(t))},(e,r)=>{n={document:this.ir(t,r),size:Ol(r)}}).next(()=>n)}getEntries(e,t){let n=Wa();return this._r(e,t,(e,t)=>{const r=this.ir(e,t);n=n.insert(e,r)}).next(()=>n)}ar(e,t){let n=Wa(),r=new uo(es.comparator);return this._r(e,t,(e,t)=>{const i=this.ir(e,t);n=n.insert(e,i),r=r.insert(e,Ol(t))}).next(()=>({documents:n,ur:r}))}_r(e,t,n){if(t.isEmpty())return ds.resolve();let r=new ho(ih);t.forEach(e=>r=r.add(e));const i=IDBKeyRange.bound(nh(r.first()),nh(r.last())),s=r.getIterator();let o=s.getNext();return th(e).J({index:"documentKeyIndex",range:i},(e,t,r)=>{const i=es.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;o&&ih(o,i)<0;)n(o,null),o=s.getNext();o&&o.isEqual(i)&&(n(o,t),o=s.hasNext()?s.getNext():null),o?r.$(nh(o)):r.done()}).next(()=>{for(;o;)n(o,null),o=s.hasNext()?s.getNext():null})}getDocumentsMatchingQuery(e,t,n,r,i){const s=t.path,o=[s.popLast().toArray(),s.lastSegment(),Uc(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],a=[s.popLast().toArray(),s.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return th(e).U(IDBKeyRange.bound(o,a,!0)).next(e=>{null==i||i.incrementDocumentReadCount(e.length);let n=Wa();for(const i of e){const e=this.ir(es.fromSegments(i.prefixPath.concat(i.collectionGroup,i.documentId)),i);e.isFoundDocument()&&(za(t,e)||r.has(e.key))&&(n=n.insert(e.key,e))}return n})}getAllFromCollectionGroup(e,t,n,r){let i=Wa();const s=rh(t,n),o=rh(t,as.max());return th(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(s,o,!0)},(e,t,n)=>{const s=this.ir(es.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);i=i.insert(s.key,s),i.size===r&&n.done()}).next(()=>i)}newChangeBuffer(e){return new Zl(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return eh(e).get("remoteDocumentGlobalKey").next(e=>(xi(!!e),e))}rr(e,t){return eh(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const e=function(e,t){let n;if(t.document)n=function(e,t,n){const r=gc(e,t.name),i=hc(t.updateTime),s=t.createTime?hc(t.createTime):Qi.min(),o=new Yo({mapValue:{fields:t.fields}}),a=Zo.newFoundDocument(r,i,s,o);return n&&a.setHasCommittedMutations(),n?a.setHasCommittedMutations():a}(e.ct,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const e=es.fromSegments(t.noDocument.path),r=jc(t.noDocument.readTime);n=Zo.newNoDocument(e,r),t.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!t.unknownDocument)return Di();{const e=es.fromSegments(t.unknownDocument.path),r=jc(t.unknownDocument.version);n=Zo.newUnknownDocument(e,r)}}return t.readTime&&n.setReadTime(function(e){const t=new Wi(e[0],e[1]);return Qi.fromTimestamp(t)}(t.readTime)),n}(this.serializer,t);if(!e.isNoDocument()||!e.version.isEqual(Qi.min()))return e}return Zo.newInvalidDocument(e)}}function Xl(e){return new Yl(e)}class Zl extends Jl{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new $a(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){const t=[];let n=0,r=new ho((e,t)=>Gi(e.canonicalString(),t.canonicalString()));return this.changes.forEach((i,s)=>{const o=this.lr.get(i);if(t.push(this.cr.removeEntry(e,i,o.readTime)),s.isValidDocument()){const a=Fc(this.cr.serializer,s);r=r.add(i.path.popLast());const u=Ol(a);n+=u-o.size,t.push(this.cr.addEntry(e,i,a))}else if(n-=o.size,this.trackRemovals){const n=Fc(this.cr.serializer,s.convertToNoDocument(Qi.min()));t.push(this.cr.addEntry(e,i,n))}}),r.forEach(n=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,n))}),t.push(this.cr.updateMetadata(e,n)),ds.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next(e=>(this.lr.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.cr.ar(e,t).next(({documents:e,ur:t})=>(t.forEach((t,n)=>{this.lr.set(t,{size:n,readTime:e.get(t).readTime})}),e))}}function eh(e){return io(e,"remoteDocumentGlobal")}function th(e){return io(e,"remoteDocumentsV14")}function nh(e){const t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function rh(e,t){const n=t.documentKey.path.toArray();return[e,Uc(t.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function ih(e,t){const n=e.path.toArray(),r=t.path.toArray();let i=0;for(let s=0;s<n.length-2&&s<r.length-2;++s)if(i=Gi(n[s],r[s]),i)return i;return i=Gi(n.length,r.length),i||(i=Gi(n[n.length-2],r[r.length-2]),i||Gi(n[n.length-1],r[r.length-1])
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
 */)}class sh{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
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
 */class oh{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&Cu(n.mutation,e,mo.empty(),Wi.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,ru()).next(()=>t))}getLocalViewOfDocuments(e,t,n=ru()){const r=Xa();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=Ja();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=Xa();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,ru()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=Wa();const s=eu(),o=eu();return t.forEach((e,t)=>{const o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof Du)?i=i.insert(t.key,t):void 0!==o?(s.set(t.key,o.mutation.getFieldMask()),Cu(o.mutation,t,o.mutation.getFieldMask(),Wi.now())):s.set(t.key,mo.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>{var n;return o.set(e,new sh(t,null!==(n=s.get(e))&&void 0!==n?n:null))}),o))}recalculateAndSaveOverlays(e,t){const n=eu();let r=new uo((e,t)=>e-t),i=ru();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const i of e)i.keys().forEach(e=>{const s=t.get(e);if(null===s)return;let o=n.get(e)||mo.empty();o=i.applyToLocalView(s,o),n.set(e,o);const a=(r.get(i.batchId)||ru()).add(e);r=r.insert(i.batchId,a)})}).next(()=>{const s=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,u=r.value,c=Za();u.forEach(e=>{if(!i.has(e)){const r=Eu(t.get(e),n.get(e));null!==r&&c.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,a,c))}return ds.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return i=t,es.isDocumentKey(i.path)&&null===i.collectionGroup&&0===i.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):La(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r);var i}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{const s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):ds.resolve(Xa());let o=-1,a=i;return s.next(t=>ds.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),i.get(t)?ds.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,a,t,ru())).next(e=>({batchId:o,changes:Ya(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new es(t)).next(e=>{let t=Ja();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const i=t.collectionGroup;let s=Ja();return this.indexManager.getCollectionParents(e,i).next(o=>ds.forEach(o,o=>{const a=(u=t,c=o.child(i),new Ra(c,null,u.explicitOrderBy.slice(),u.filters.slice(),u.limit,u.limitType,u.startAt,u.endAt));var u,c;return this.getDocumentsMatchingCollectionQuery(e,a,n,r).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,n,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,r))).next(e=>{i.forEach((t,n)=>{const r=n.getKey();null===e.get(r)&&(e=e.insert(r,Zo.newInvalidDocument(r)))});let n=Ja();return e.forEach((e,r)=>{const s=i.get(e);void 0!==s&&Cu(s.mutation,r,mo.empty(),Wi.now()),za(t,r)&&(n=n.insert(e,r))}),n})}}
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
 */class ah{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return ds.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,{id:(n=t).id,version:n.version,createTime:hc(n.createTime)}),ds.resolve();var n}getNamedQuery(e,t){return ds.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,{name:(n=t).name,query:Gc(n.bundledQuery),readTime:hc(n.readTime)}),ds.resolve();var n}}
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
 */class uh{constructor(){this.overlays=new uo(es.comparator),this.Ir=new Map}getOverlay(e,t){return ds.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Xa();return ds.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.ht(e,t,r)}),ds.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.Ir.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.Ir.delete(n)),ds.resolve()}getOverlaysForCollection(e,t,n){const r=Xa(),i=t.length+1,s=new es(t.child("")),o=this.overlays.getIteratorFrom(s);for(;o.hasNext();){const e=o.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return ds.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new uo((e,t)=>e-t);const s=this.overlays.getIterator();for(;s.hasNext();){const e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=Xa(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=Xa(),a=i.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=r)););return ds.resolve(o)}ht(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.Ir.get(r.largestBatchId).delete(n.key);this.Ir.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new Fu(t,n));let i=this.Ir.get(t);void 0===i&&(i=ru(),this.Ir.set(t,i)),this.Ir.set(t,i.add(n.key))}}
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
 */class ch{constructor(){this.sessionToken=yo.EMPTY_BYTE_STRING}getSessionToken(e){return ds.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,ds.resolve()}}
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
 */class lh{constructor(){this.Tr=new ho(hh.Er),this.dr=new ho(hh.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const n=new hh(e,t);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Vr(new hh(e,t))}mr(e,t){e.forEach(e=>this.removeReference(e,t))}gr(e){const t=new es(new Yi([])),n=new hh(t,e),r=new hh(t,e+1),i=[];return this.dr.forEachInRange([n,r],e=>{this.Vr(e),i.push(e.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new es(new Yi([])),n=new hh(t,e),r=new hh(t,e+1);let i=ru();return this.dr.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){const t=new hh(e,0),n=this.Tr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class hh{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return es.comparator(e.key,t.key)||Gi(e.wr,t.wr)}static Ar(e,t){return Gi(e.wr,t.wr)||es.comparator(e.key,t.key)}}
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
 */class dh{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ho(hh.Er)}checkEmpty(e){return ds.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const s=new Mu(i,t,n,r);this.mutationQueue.push(s);for(const o of r)this.br=this.br.add(new hh(o.key,i)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return ds.resolve(s)}lookupMutationBatch(e,t){return ds.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.vr(n),i=r<0?0:r;return ds.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return ds.resolve(0===this.mutationQueue.length?-1:this.Sr-1)}getAllMutationBatches(e){return ds.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new hh(t,0),r=new hh(t,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([n,r],e=>{const t=this.Dr(e.wr);i.push(t)}),ds.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ho(Gi);return t.forEach(e=>{const t=new hh(e,0),r=new hh(e,Number.POSITIVE_INFINITY);this.br.forEachInRange([t,r],e=>{n=n.add(e.wr)})}),ds.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let i=n;es.isDocumentKey(i)||(i=i.child(""));const s=new hh(new es(i),0);let o=new ho(Gi);return this.br.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.wr)),!0)},s),ds.resolve(this.Cr(o))}Cr(e){const t=[];return e.forEach(e=>{const n=this.Dr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){xi(0===this.Fr(t.batchId,"removed")),this.mutationQueue.shift();let n=this.br;return ds.forEach(t.mutations,r=>{const i=new hh(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.br=n})}On(e){}containsKey(e,t){const n=new hh(t,0),r=this.br.firstAfterOrEqual(n);return ds.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,ds.resolve()}Fr(e,t){return this.vr(e)}vr(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
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
 */class fh{constructor(e){this.Mr=e,this.docs=new uo(es.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.Mr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return ds.resolve(n?n.document.mutableCopy():Zo.newInvalidDocument(t))}getEntries(e,t){let n=Wa();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():Zo.newInvalidDocument(e))}),ds.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=Wa();const s=t.path,o=new es(s.child("")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||us(os(o),n)<=0||(r.has(o.key)||za(t,o))&&(i=i.insert(o.key,o.mutableCopy()))}return ds.resolve(i)}getAllFromCollectionGroup(e,t,n,r){Di()}Or(e,t){return ds.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new ph(this)}getSize(e){return ds.resolve(this.size)}}class ph extends Jl{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.cr.addEntry(e,r)):this.cr.removeEntry(n)}),ds.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}
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
 */class mh{constructor(e){this.persistence=e,this.Nr=new $a(e=>Ca(e),ka),this.lastRemoteSnapshotVersion=Qi.min(),this.highestTargetId=0,this.Lr=0,this.Br=new lh,this.targetCount=0,this.kr=Ul.Bn()}forEachTarget(e,t){return this.Nr.forEach((e,n)=>t(n)),ds.resolve()}getLastRemoteSnapshotVersion(e){return ds.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return ds.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),ds.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Lr&&(this.Lr=t),ds.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new Ul(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,ds.resolve()}updateTargetData(e,t){return this.Kn(t),ds.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,ds.resolve()}removeTargets(e,t,n){let r=0;const i=[];return this.Nr.forEach((s,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.Nr.delete(s),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),ds.waitFor(i).next(()=>r)}getTargetCount(e){return ds.resolve(this.targetCount)}getTargetData(e,t){const n=this.Nr.get(t)||null;return ds.resolve(n)}addMatchingKeys(e,t,n){return this.Br.Rr(t,n),ds.resolve()}removeMatchingKeys(e,t,n){this.Br.mr(t,n);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),ds.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),ds.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Br.yr(t);return ds.resolve(n)}containsKey(e,t){return ds.resolve(this.Br.containsKey(t))}}
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
 */class gh{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Ss(0),this.Kr=!1,this.Kr=!0,this.$r=new ch,this.referenceDelegate=e(this),this.Ur=new mh(this),this.indexManager=new Il,this.remoteDocumentCache=new fh(e=>this.referenceDelegate.Wr(e)),this.serializer=new Vc(t),this.Gr=new ah(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new uh,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.qr[e.toKey()];return n||(n=new dh(t,this.referenceDelegate),this.qr[e.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,n){Ci("MemoryPersistence","Starting transaction:",e);const r=new yh(this.Qr.next());return this.referenceDelegate.zr(),n(r).next(e=>this.referenceDelegate.jr(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Hr(e,t){return ds.or(Object.values(this.qr).map(n=>()=>n.containsKey(e,t)))}}class yh extends ls{constructor(e){super(),this.currentSequenceNumber=e}}class vh{constructor(e){this.persistence=e,this.Jr=new lh,this.Yr=null}static Zr(e){return new vh(e)}get Xr(){if(this.Yr)return this.Yr;throw Di()}addReference(e,t,n){return this.Jr.addReference(n,t),this.Xr.delete(n.toString()),ds.resolve()}removeReference(e,t,n){return this.Jr.removeReference(n,t),this.Xr.add(n.toString()),ds.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),ds.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(e=>this.Xr.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.Xr.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return ds.forEach(this.Xr,n=>{const r=es.fromPath(n);return this.ei(e,r).next(e=>{e||t.removeEntry(r,Qi.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(e=>{e?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return ds.or([()=>ds.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}
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
 */class wh{constructor(e){this.serializer=e}O(e,t,n,r){const i=new fs("createOrUpgrade",t);var s;n<1&&r>=1&&(e.createObjectStore("owner"),(s=e).createObjectStore("mutationQueues",{keyPath:"userId"}),s.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Rs,{unique:!0}),s.createObjectStore("documentMutations"),_h(e),function(e){e.createObjectStore("remoteDocuments")}(e));let o=ds.resolve();return n<3&&r>=3&&(0!==n&&(function(e){e.deleteObjectStore("targetDocuments"),e.deleteObjectStore("targets"),e.deleteObjectStore("targetGlobal")}(e),_h(e)),o=o.next(()=>function(e){const t=e.store("targetGlobal"),n={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:Qi.min().toTimestamp(),targetCount:0};return t.put("targetGlobalKey",n)}(i))),n<4&&r>=4&&(0!==n&&(o=o.next(()=>function(e,t){return t.store("mutations").U().next(n=>{e.deleteObjectStore("mutations"),e.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Rs,{unique:!0});const r=t.store("mutations"),i=n.map(e=>r.put(e));return ds.waitFor(i)})}(e,i))),o=o.next(()=>{!function(e){e.createObjectStore("clientMetadata",{keyPath:"clientId"})}(e)})),n<5&&r>=5&&(o=o.next(()=>this.ni(i))),n<6&&r>=6&&(o=o.next(()=>(function(e){e.createObjectStore("remoteDocumentGlobal")}(e),this.ri(i)))),n<7&&r>=7&&(o=o.next(()=>this.ii(i))),n<8&&r>=8&&(o=o.next(()=>this.si(e,i))),n<9&&r>=9&&(o=o.next(()=>{!function(e){e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")}(e)})),n<10&&r>=10&&(o=o.next(()=>this.oi(i))),n<11&&r>=11&&(o=o.next(()=>{!function(e){e.createObjectStore("bundles",{keyPath:"bundleId"})}(e),function(e){e.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),n<12&&r>=12&&(o=o.next(()=>{!function(e){const t=e.createObjectStore("documentOverlays",{keyPath:Hs});t.createIndex("collectionPathOverlayIndex",Ws,{unique:!1}),t.createIndex("collectionGroupOverlayIndex",Qs,{unique:!1})}(e)})),n<13&&r>=13&&(o=o.next(()=>function(e){const t=e.createObjectStore("remoteDocumentsV14",{keyPath:Ms});t.createIndex("documentKeyIndex",Vs),t.createIndex("collectionGroupIndex",Fs)}(e)).next(()=>this._i(e,i)).next(()=>e.deleteObjectStore("remoteDocuments"))),n<14&&r>=14&&(o=o.next(()=>this.ai(e,i))),n<15&&r>=15&&(o=o.next(()=>function(e){e.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),e.createObjectStore("indexState",{keyPath:zs}).createIndex("sequenceNumberIndex",Ks,{unique:!1}),e.createObjectStore("indexEntries",{keyPath:Gs}).createIndex("documentKeyIndex",$s,{unique:!1})}(e))),n<16&&r>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),n<17&&r>=17&&(o=o.next(()=>{!function(e){e.createObjectStore("globals",{keyPath:"name"})}(e)})),o}ri(e){let t=0;return e.store("remoteDocuments").J((e,n)=>{t+=Ol(n)}).next(()=>{const n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)})}ni(e){const t=e.store("mutationQueues"),n=e.store("mutations");return t.U().next(t=>ds.forEach(t,t=>{const r=IDBKeyRange.bound([t.userId,-1],[t.userId,t.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",r).next(n=>ds.forEach(n,n=>{xi(n.userId===t.userId);const r=qc(this.serializer,n);return Rl(e,t.userId,r).next(()=>{})}))}))}ii(e){const t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(e=>{const r=[];return n.J((n,i)=>{const s=new Yi(n),o=[0,As(s)];r.push(t.get(o).next(n=>{return n?ds.resolve():(r=s,t.put({targetId:0,path:As(r),sequenceNumber:e.highestListenSequenceNumber}));var r}))}).next(()=>ds.waitFor(r))})}si(e,t){e.createObjectStore("collectionParents",{keyPath:qs});const n=t.store("collectionParents"),r=new bl,i=e=>{if(r.add(e)){const t=e.lastSegment(),r=e.popLast();return n.put({collectionId:t,parent:As(r)})}};return t.store("remoteDocuments").J({H:!0},(e,t)=>{const n=new Yi(e);return i(n.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([e,t,n],r)=>{const s=xs(t);return i(s.popLast())}))}oi(e){const t=e.store("targets");return t.J((e,n)=>{const r=zc(n),i=Kc(this.serializer,r);return t.put(i)})}_i(e,t){const n=t.store("remoteDocuments"),r=[];return n.J((e,n)=>{const i=t.store("remoteDocumentsV14"),s=(a=n,a.document?new es(Yi.fromString(a.document.name).popFirst(5)):a.noDocument?es.fromSegments(a.noDocument.path):a.unknownDocument?es.fromSegments(a.unknownDocument.path):Di()).path.toArray(),o={prefixPath:s.slice(0,s.length-2),collectionGroup:s[s.length-2],documentId:s[s.length-1],readTime:n.readTime||[0,0],unknownDocument:n.unknownDocument,noDocument:n.noDocument,document:n.document,hasCommittedMutations:!!n.hasCommittedMutations};var a;r.push(i.put(o))}).next(()=>ds.waitFor(r))}ai(e,t){const n=t.store("mutations"),r=Xl(this.serializer),i=new gh(vh.Zr,this.serializer.ct);return n.U().next(e=>{const n=new Map;return e.forEach(e=>{var t;let r=null!==(t=n.get(e.userId))&&void 0!==t?t:ru();qc(this.serializer,e).keys().forEach(e=>r=r.add(e)),n.set(e.userId,r)}),ds.forEach(n,(e,n)=>{const s=new bi(n),o=Xc.lt(this.serializer,s),a=i.getIndexManager(s),u=Pl.lt(s,this.serializer,a,i.referenceDelegate);return new oh(r,u,o,a).recalculateAndSaveOverlaysForDocumentKeys(new ro(t,Ss.oe),e).next()})})}}function _h(e){e.createObjectStore("targetDocuments",{keyPath:Bs}).createIndex("documentTargetsIndex",js,{unique:!0}),e.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",Us,{unique:!0}),e.createObjectStore("targetGlobal")}const Ih="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class bh{constructor(e,t,n,r,i,s,o,a,u,c,l=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.ui=i,this.window=s,this.document=o,this.ci=u,this.li=c,this.hi=l,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=e=>Promise.resolve(),!bh.D())throw new Pi(Oi.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Wl(this,r),this.Ai=t+"main",this.serializer=new Vc(a),this.Ri=new ps(this.Ai,this.hi,new wh(this.serializer)),this.$r=new el,this.Ur=new Bl(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Xl(this.serializer),this.Gr=new Qc,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,!1===c&&ki("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new Pi(Oi.FAILED_PRECONDITION,Ih);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ur.getHighestSequenceNumber(e))}).then(e=>{this.Qr=new Ss(e,this.ci)}).then(()=>{this.Kr=!0}).catch(e=>(this.Ri&&this.Ri.close(),Promise.reject(e)))}yi(e){return this.di=t=>l(this,null,function*(){if(this.started)return e(t)}),e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L(t=>l(this,null,function*(){null===t.newVersion&&(yield e())}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget(()=>l(this,null,function*(){this.started&&(yield this.mi())})))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Eh(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(e).next(e=>{e||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(e)).next(t=>this.isPrimary&&!t?this.bi(e).next(()=>!1):!!t&&this.Di(e).next(()=>!0))).catch(e=>{if(vs(e))return Ci("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return Ci("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ui.enqueueRetryable(()=>this.di(e)),this.isPrimary=e})}wi(e){return Th(e).get("owner").next(e=>ds.resolve(this.vi(e)))}Ci(e){return Eh(e).delete(this.clientId)}Fi(){return l(this,null,function*(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=yield this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const t=io(e,"clientMetadata");return t.U().next(e=>{const n=this.xi(e,18e5),r=e.filter(e=>-1===n.indexOf(e));return ds.forEach(r,e=>t.delete(e.clientId)).next(()=>r)})}).catch(()=>[]);if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}})}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?ds.resolve(!0):Th(e).get("owner").next(t=>{if(null!==t&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new Pi(Oi.FAILED_PRECONDITION,Ih);return!1}}return!(!this.networkEnabled||!this.inForeground)||Eh(e).U().next(e=>void 0===this.xi(e,5e3).find(e=>{if(this.clientId!==e.clientId){const t=!this.networkEnabled&&e.networkEnabled,n=!this.inForeground&&e.inForeground,r=this.networkEnabled===e.networkEnabled;if(t||n&&r)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&Ci("IndexedDbPersistence",`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}shutdown(){return l(this,null,function*(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),yield this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const t=new ro(e,Ss.oe);return this.bi(t).next(()=>this.Ci(t))}),this.Ri.close(),this.qi()})}xi(e,t){return e.filter(e=>this.Mi(e.updateTimeMs,t)&&!this.Ni(e.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",e=>Eh(e).U().next(e=>this.xi(e,18e5).map(e=>e.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return Pl.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new El(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return Xc.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,n){Ci("IndexedDbPersistence","Starting transaction:",e);const r="readonly"===t?"readonly":"readwrite",i=17===(s=this.hi)?no:16===s?to:15===s?eo:14===s?Zs:13===s?Xs:12===s?Ys:11===s?Js:void Di();var s;let o;return this.Ri.runTransaction(e,r,i,r=>(o=new ro(r,this.Qr?this.Qr.next():Ss.oe),"readwrite-primary"===t?this.wi(o).next(e=>!!e||this.Si(o)).next(t=>{if(!t)throw ki(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new Pi(Oi.FAILED_PRECONDITION,cs);return n(o)}).next(e=>this.Di(o).next(()=>e)):this.Ki(o).next(()=>n(o)))).then(e=>(o.raiseOnCommittedEvent(),e))}Ki(e){return Th(e).get("owner").next(e=>{if(null!==e&&this.Mi(e.leaseTimestampMs,5e3)&&!this.Ni(e.ownerId)&&!this.vi(e)&&!(this.li||this.allowTabSynchronization&&e.allowTabSynchronization))throw new Pi(Oi.FAILED_PRECONDITION,Ih)})}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Th(e).put("owner",t)}static D(){return ps.D()}bi(e){const t=Th(e);return t.get("owner").next(e=>this.vi(e)?(Ci("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):ds.resolve())}Mi(e,t){const n=Date.now();return!(e<n-t||e>n&&(ki(`Detected an update time that is in the future: ${e} > ${n}`),1))}fi(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground="visible"===this.document.visibilityState)}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;"function"==typeof(null===(e=this.window)||void 0===e?void 0:e.addEventListener)&&(this.Pi=()=>{this.Li();const e=/(?:Version|Mobile)\/1[456]/;T()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const n=null!==(null===(t=this.Vi)||void 0===t?void 0:t.getItem(this.Oi(e)));return Ci("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return ki("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){ki("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch(e){}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Th(e){return io(e,"owner")}function Eh(e){return io(e,"clientMetadata")}
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
class Sh{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.$i=n,this.Ui=r}static Wi(e,t){let n=ru(),r=ru();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Sh(e,t.fromCache,n,r)}}
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
 */class Ch{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
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
 */class kh{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=T()?8:ms(b())>0?6:4}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,n,r){const i={result:null};return this.Yi(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.Zi(e,t,r,n).next(e=>{i.result=e})}).next(()=>{if(i.result)return;const n=new Ch;return this.Xi(e,t,n).next(r=>{if(i.result=r,this.zi)return this.es(e,t,n,r.size)})}).next(()=>i.result)}es(e,t,n,r){return n.documentReadCount<this.ji?(Si()<=B.DEBUG&&Ci("QueryEngine","SDK will not create cache indexes for query:",qa(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),ds.resolve()):(Si()<=B.DEBUG&&Ci("QueryEngine","Query:",qa(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.Hi*r?(Si()<=B.DEBUG&&Ci("QueryEngine","The SDK decides to create cache indexes for query:",qa(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Va(t))):ds.resolve())}Yi(e,t){if(Pa(t))return ds.resolve(null);let n=Va(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=Ua(t,null,"F"),n=Va(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const i=ru(...r);return this.Ji.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{const s=this.ts(t,r);return this.ns(t,s,i,n.readTime)?this.Yi(e,Ua(t,null,"F")):this.rs(e,s,t,n)}))})))}Zi(e,t,n,r){return Pa(t)||r.isEqual(Qi.min())?ds.resolve(null):this.Ji.getDocuments(e,n).next(i=>{const s=this.ts(t,i);return this.ns(t,s,n,r)?ds.resolve(null):(Si()<=B.DEBUG&&Ci("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),qa(t)),this.rs(e,s,t,function(e){const t=e.toTimestamp().seconds,n=e.toTimestamp().nanoseconds+1,r=Qi.fromTimestamp(1e9===n?new Wi(t+1,0):new Wi(t,n));return new as(r,es.empty(),-1)}(r)).next(e=>e))})}ts(e,t){let n=new ho(Ka(e));return t.forEach((t,r)=>{za(e,r)&&(n=n.add(r))}),n}ns(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Xi(e,t,n){return Si()<=B.DEBUG&&Ci("QueryEngine","Using full collection scan to execute query:",qa(t)),this.Ji.getDocumentsMatchingQuery(e,t,as.min(),n)}rs(e,t,n,r){return this.Ji.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
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
 */class Ah{constructor(e,t,n,r){this.persistence=e,this.ss=t,this.serializer=r,this.os=new uo(Gi),this._s=new $a(e=>Ca(e),ka),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(n)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new oh(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function Nh(e,t,n,r){return new Ah(e,t,n,r)}function Dh(e,t){return l(this,null,function*(){const n=Ri(e);return yield n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(i=>(r=i,n.ls(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const i=[],s=[];let o=ru();for(const e of r){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({hs:e,removedBatchIds:i,addedBatchIds:s}))})})})}function xh(e){const t=Ri(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Ur.getLastRemoteSnapshotVersion(e))}function Rh(e,t){const n=Ri(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}function Oh(e,t,n){return l(this,null,function*(){const r=Ri(e),i=r.os.get(t),s=n?"readwrite":"readwrite-primary";try{n||(yield r.persistence.runTransaction("Release target",s,e=>r.persistence.referenceDelegate.removeTarget(e,i)))}catch(o){if(!vs(o))throw o;Ci("LocalStore",`Failed to update sequence numbers for target ${t}: ${o}`)}r.os=r.os.remove(t),r._s.delete(i.target)})}function Ph(e,t,n){const r=Ri(e);let i=Qi.min(),s=ru();return r.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const r=Ri(e),i=r._s.get(n);return void 0!==i?ds.resolve(r.os.get(i)):r.Ur.getTargetData(t,n)}(r,e,Va(t)).next(t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(e,t.targetId).next(e=>{s=e})}).next(()=>r.ss.getDocumentsMatchingQuery(e,t,n?i:Qi.min(),n?s:ru())).next(e=>(function(e,t,n){let r=e.us.get(t)||Qi.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.us.set(t,r)}(r,function(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}(t),e),{documents:e,Ts:s})))}class Lh{constructor(){this.activeTargetIds=iu}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Mh{constructor(){this.so=new Lh,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,n){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Lh,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
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
 */class Vh{_o(e){}shutdown(){}}
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
 */class Fh{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){Ci("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){Ci("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
 */let Uh=null;function Bh(){return null===Uh?Uh=268435456+Math.round(2147483648*Math.random()):Uh++,"0x"+Uh.toString(16)
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
 */}const jh={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};
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
 */class qh{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}
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
 */const zh="WebChannelConnection";class Kh extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Do=t+"://"+e.host,this.vo=`projects/${n}/databases/${r}`,this.Co="(default)"===this.databaseId.database?`project_id=${n}`:`project_id=${n}&database_id=${r}`}get Fo(){return!1}Mo(e,t,n,r,i){const s=Bh(),o=this.xo(e,t.toUriEncodedString());Ci("RestConnection",`Sending RPC '${e}' ${s}:`,o,n);const a={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(a,r,i),this.No(e,o,a,n).then(t=>(Ci("RestConnection",`Received RPC '${e}' ${s}: `,t),t),t=>{throw Ai("RestConnection",`RPC '${e}' ${s} failed with error: `,t,"url: ",o,"request:",n),t})}Lo(e,t,n,r,i,s){return this.Mo(e,t,n,r,i)}Oo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+Ti,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}xo(e,t){const n=jh[e];return`${this.Do}/v1/${t}:${n}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,n,r){const i=Bh();return new Promise((s,o)=>{const a=new di;a.setWithCredentials(!0),a.listenOnce(pi.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case mi.NO_ERROR:const t=a.getResponseJson();Ci(zh,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case mi.TIMEOUT:Ci(zh,`RPC '${e}' ${i} timed out`),o(new Pi(Oi.DEADLINE_EXCEEDED,"Request time out"));break;case mi.HTTP_ERROR:const n=a.getStatus();if(Ci(zh,`RPC '${e}' ${i} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=null==e?void 0:e.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(Oi).indexOf(t)>=0?t:Oi.UNKNOWN}(t.status);o(new Pi(e,t.message))}else o(new Pi(Oi.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new Pi(Oi.UNAVAILABLE,"Connection failed."));break;default:Di()}}finally{Ci(zh,`RPC '${e}' ${i} completed.`)}});const u=JSON.stringify(r);Ci(zh,`RPC '${e}' ${i} sending request:`,r),a.send(t,"POST",u,n,15)})}Bo(e,t,n){const r=Bh(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=wi(),o=vi(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;void 0!==u&&(a.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(a.useFetchStreams=!0),this.Oo(a.initMessageHeaders,t,n),a.encodeInitMessageHeaders=!0;const c=i.join("");Ci(zh,`Creating RPC '${e}' stream ${r}: ${c}`,a);const l=s.createWebChannel(c,a);let h=!1,d=!1;const f=new qh({Io:t=>{d?Ci(zh,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(h||(Ci(zh,`Opening RPC '${e}' stream ${r} transport.`),l.open(),h=!0),Ci(zh,`RPC '${e}' stream ${r} sending:`,t),l.send(t))},To:()=>l.close()}),p=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(t){setTimeout(()=>{throw t},0)}})};return p(l,fi.EventType.OPEN,()=>{d||(Ci(zh,`RPC '${e}' stream ${r} transport opened.`),f.yo())}),p(l,fi.EventType.CLOSE,()=>{d||(d=!0,Ci(zh,`RPC '${e}' stream ${r} transport closed`),f.So())}),p(l,fi.EventType.ERROR,t=>{d||(d=!0,Ai(zh,`RPC '${e}' stream ${r} transport errored:`,t),f.So(new Pi(Oi.UNAVAILABLE,"The operation could not be completed")))}),p(l,fi.EventType.MESSAGE,t=>{var n;if(!d){const i=t.data[0];xi(!!i);const s=i,o=s.error||(null===(n=s[0])||void 0===n?void 0:n.error);if(o){Ci(zh,`RPC '${e}' stream ${r} received error:`,o);const t=o.status;let n=function(e){const t=Bu[e];if(void 0!==t)return qu(t)}(t),i=o.message;void 0===n&&(n=Oi.INTERNAL,i="Unknown error status: "+t+" with message "+o.message),d=!0,f.So(new Pi(n,i)),l.close()}else Ci(zh,`RPC '${e}' stream ${r} received:`,i),f.bo(i)}}),p(o,yi.STAT_EVENT,t=>{t.stat===gi.PROXY?Ci(zh,`RPC '${e}' stream ${r} detected buffering proxy`):t.stat===gi.NOPROXY&&Ci(zh,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{f.wo()},0),f}}
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
 */function Gh(){return"undefined"!=typeof document?document:null}
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
 */function $h(e){return new oc(e,!0)}
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
 */class Hh{constructor(e,t,n=1e3,r=1.5,i=6e4){this.ui=e,this.timerId=t,this.ko=n,this.qo=r,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),r=Math.max(0,t-n);r>0&&Ci("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,r,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){null!==this.$o&&(this.$o.skipDelay(),this.$o=null)}cancel(){null!==this.$o&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}
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
 */class Wh{constructor(e,t,n,r,i,s,o,a){this.ui=e,this.Ho=n,this.Jo=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Hh(e,t)}n_(){return 1===this.state||5===this.state||this.r_()}r_(){return 2===this.state||3===this.state}start(){this.e_=0,4!==this.state?this.auth():this.i_()}stop(){return l(this,null,function*(){this.n_()&&(yield this.close(0))})}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&null===this.Zo&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}__(){return l(this,null,function*(){if(this.r_())return this.close(0)})}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}close(e,t){return l(this,null,function*(){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,4!==e?this.t_.reset():t&&t.code===Oi.RESOURCE_EXHAUSTED?(ki(t.toString()),ki("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===Oi.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,yield this.listener.mo(t)})}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.Yo===t&&this.P_(e,n)},t=>{e(()=>{const e=new Pi(Oi.UNKNOWN,"Fetching auth token failed: "+t.message);return this.I_(e)})})}P_(e,t){const n=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{n(()=>this.listener.Eo())}),this.stream.Ro(()=>{n(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(e=>{n(()=>this.I_(e))}),this.stream.onMessage(e=>{n(()=>1==++this.e_?this.E_(e):this.onNext(e))})}i_(){this.state=5,this.t_.Go(()=>l(this,null,function*(){this.state=0,this.start()}))}I_(e){return Ci("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(Ci("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Qh extends Wh{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const i="NO_CHANGE"===(r=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:Di(),s=t.targetChange.targetIds||[],o=function(e,t){return e.useProto3Json?(xi(void 0===t||"string"==typeof t),yo.fromBase64String(t||"")):(xi(void 0===t||t instanceof Buffer||t instanceof Uint8Array),yo.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&function(e){const t=void 0===e.code?Oi.UNKNOWN:qu(e.code);return new Pi(t,e.message||"")}(a);n=new Xu(i,s,o,u||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=gc(e,r.document.name),s=hc(r.document.updateTime),o=r.document.createTime?hc(r.document.createTime):Qi.min(),a=new Yo({mapValue:{fields:r.document.fields}}),u=Zo.newFoundDocument(i,s,o,a),c=r.targetIds||[],l=r.removedTargetIds||[];n=new Ju(c,l,u.key,u)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=gc(e,r.document),s=r.readTime?hc(r.readTime):Qi.min(),o=Zo.newNoDocument(i,s),a=r.removedTargetIds||[];n=new Ju([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=gc(e,r.document),s=r.removedTargetIds||[];n=new Ju([],s,i,null)}else{if(!("filter"in t))return Di();{t.filter;const e=t.filter;e.targetId;const{count:r=0,unchangedNames:i}=e,s=new Uu(r,i),o=e.targetId;n=new Yu(o,s)}}var r;return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return Qi.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?Qi.min():t.readTime?hc(t.readTime):Qi.min()}(e);return this.listener.d_(t,n)}A_(e){const t={};t.database=wc(this.serializer),t.addTarget=function(e,t){let n;const r=t.target;if(n=Aa(r)?{documents:Ec(e,r)}:{query:Sc(e,r)._t},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=cc(e,t.resumeToken);const r=ac(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(Qi.min())>0){n.readTime=uc(e,t.snapshotVersion.toTimestamp());const r=ac(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);const n=function(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Di()}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.a_(t)}R_(e){const t={};t.database=wc(this.serializer),t.removeTarget=e,this.a_(t)}}class Jh extends Wh{constructor(e,t,n,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return xi(!!e.streamToken),this.lastStreamToken=e.streamToken,xi(!e.writeResults||0===e.writeResults.length),this.listener.f_()}onNext(e){xi(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=function(e,t){return e&&e.length>0?(xi(void 0!==t),e.map(e=>function(e,t){let n=e.updateTime?hc(e.updateTime):hc(t);return n.isEqual(Qi.min())&&(n=hc(t)),new _u(n,e.transformResults||[])}(e,t))):[]}(e.writeResults,e.commitTime),n=hc(e.commitTime);return this.listener.g_(n,t)}p_(){const e={};e.database=wc(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>bc(this.serializer,e))};this.a_(t)}}
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
 */class Yh extends class{}{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.y_=!1}w_(){if(this.y_)throw new Pi(Oi.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,n,r){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Mo(e,fc(t,n),r,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===Oi.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new Pi(Oi.UNKNOWN,e.toString())})}Lo(e,t,n,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Lo(e,fc(t,n),r,s,o,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===Oi.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new Pi(Oi.UNKNOWN,e.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class Xh{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){0===this.S_&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){"Online"===this.state?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,"Online"===e&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(ki(t),this.D_=!1):Ci("OnlineStateTracker",t)}x_(){null!==this.b_&&(this.b_.cancel(),this.b_=null)}}
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
 */class Zh{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(e=>{n.enqueueAndForget(()=>l(this,null,function*(){ud(this)&&(Ci("RemoteStore","Restarting streams for network reachability change."),yield function(e){return l(this,null,function*(){const t=Ri(e);t.L_.add(4),yield td(t),t.q_.set("Unknown"),t.L_.delete(4),yield ed(t)})}(this))}))}),this.q_=new Xh(n,r)}}function ed(e){return l(this,null,function*(){if(ud(e))for(const t of e.B_)yield t(!0)})}function td(e){return l(this,null,function*(){for(const t of e.B_)yield t(!1)})}function nd(e,t){const n=Ri(e);n.N_.has(t.targetId)||(n.N_.set(t.targetId,t),ad(n)?od(n):Cd(n).r_()&&id(n,t))}function rd(e,t){const n=Ri(e),r=Cd(n);n.N_.delete(t),r.r_()&&sd(n,t),0===n.N_.size&&(r.r_()?r.o_():ud(n)&&n.q_.set("Unknown"))}function id(e,t){if(e.Q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(Qi.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Cd(e).A_(t)}function sd(e,t){e.Q_.xe(t),Cd(e).R_(t)}function od(e){e.Q_=new ec({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>e.N_.get(t)||null,tt:()=>e.datastore.serializer.databaseId}),Cd(e).start(),e.q_.v_()}function ad(e){return ud(e)&&!Cd(e).n_()&&e.N_.size>0}function ud(e){return 0===Ri(e).L_.size}function cd(e){e.Q_=void 0}function ld(e){return l(this,null,function*(){e.q_.set("Online")})}function hd(e){return l(this,null,function*(){e.N_.forEach((t,n)=>{id(e,t)})})}function dd(e,t){return l(this,null,function*(){cd(e),ad(e)?(e.q_.M_(t),od(e)):e.q_.set("Unknown")})}function fd(e,t,n){return l(this,null,function*(){if(e.q_.set("Online"),t instanceof Xu&&2===t.state&&t.cause)try{yield function(e,t){return l(this,null,function*(){const n=t.cause;for(const r of t.targetIds)e.N_.has(r)&&(yield e.remoteSyncer.rejectListen(r,n),e.N_.delete(r),e.Q_.removeTarget(r))})}(e,t)}catch(r){Ci("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),yield pd(e,r)}else if(t instanceof Ju?e.Q_.Ke(t):t instanceof Yu?e.Q_.He(t):e.Q_.We(t),!n.isEqual(Qi.min()))try{const t=yield xh(e.localStore);n.compareTo(t)>=0&&(yield function(e,t){const n=e.Q_.rt(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const i=e.N_.get(r);i&&e.N_.set(r,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const r=e.N_.get(t);if(!r)return;e.N_.set(t,r.withResumeToken(yo.EMPTY_BYTE_STRING,r.snapshotVersion)),sd(e,t);const i=new Mc(r.target,t,n,r.sequenceNumber);id(e,i)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n))}catch(i){Ci("RemoteStore","Failed to raise snapshot:",i),yield pd(e,i)}})}function pd(e,t,n){return l(this,null,function*(){if(!vs(t))throw t;e.L_.add(1),yield td(e),e.q_.set("Offline"),n||(n=()=>xh(e.localStore)),e.asyncQueue.enqueueRetryable(()=>l(this,null,function*(){Ci("RemoteStore","Retrying IndexedDB access"),yield n(),e.L_.delete(1),yield ed(e)}))})}function md(e,t){return t().catch(n=>pd(e,n,t))}function gd(e){return l(this,null,function*(){const t=Ri(e),n=kd(t);let r=t.O_.length>0?t.O_[t.O_.length-1].batchId:-1;for(;yd(t);)try{const e=yield Rh(t.localStore,r);if(null===e){0===t.O_.length&&n.o_();break}r=e.batchId,vd(t,e)}catch(i){yield pd(t,i)}wd(t)&&_d(t)})}function yd(e){return ud(e)&&e.O_.length<10}function vd(e,t){e.O_.push(t);const n=kd(e);n.r_()&&n.V_&&n.m_(t.mutations)}function wd(e){return ud(e)&&!kd(e).n_()&&e.O_.length>0}function _d(e){kd(e).start()}function Id(e){return l(this,null,function*(){kd(e).p_()})}function bd(e){return l(this,null,function*(){const t=kd(e);for(const n of e.O_)t.m_(n.mutations)})}function Td(e,t,n){return l(this,null,function*(){const r=e.O_.shift(),i=Vu.from(r,t,n);yield md(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),yield gd(e)})}function Ed(e,t){return l(this,null,function*(){t&&kd(e).V_&&(yield function(e,t){return l(this,null,function*(){if(function(e){switch(e){default:return Di();case Oi.CANCELLED:case Oi.UNKNOWN:case Oi.DEADLINE_EXCEEDED:case Oi.RESOURCE_EXHAUSTED:case Oi.INTERNAL:case Oi.UNAVAILABLE:case Oi.UNAUTHENTICATED:return!1;case Oi.INVALID_ARGUMENT:case Oi.NOT_FOUND:case Oi.ALREADY_EXISTS:case Oi.PERMISSION_DENIED:case Oi.FAILED_PRECONDITION:case Oi.ABORTED:case Oi.OUT_OF_RANGE:case Oi.UNIMPLEMENTED:case Oi.DATA_LOSS:return!0}}(n=t.code)&&n!==Oi.ABORTED){const n=e.O_.shift();kd(e).s_(),yield md(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),yield gd(e)}var n})}(e,t)),wd(e)&&_d(e)})}function Sd(e,t){return l(this,null,function*(){const n=Ri(e);n.asyncQueue.verifyOperationInProgress(),Ci("RemoteStore","RemoteStore received new credentials");const r=ud(n);n.L_.add(3),yield td(n),r&&n.q_.set("Unknown"),yield n.remoteSyncer.handleCredentialChange(t),n.L_.delete(3),yield ed(n)})}function Cd(e){return e.K_||(e.K_=function(e,t,n){const r=Ri(e);return r.w_(),new Qh(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Eo:ld.bind(null,e),Ro:hd.bind(null,e),mo:dd.bind(null,e),d_:fd.bind(null,e)}),e.B_.push(t=>l(this,null,function*(){t?(e.K_.s_(),ad(e)?od(e):e.q_.set("Unknown")):(yield e.K_.stop(),cd(e))}))),e.K_}function kd(e){return e.U_||(e.U_=function(e,t,n){const r=Ri(e);return r.w_(),new Jh(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Eo:()=>Promise.resolve(),Ro:Id.bind(null,e),mo:Ed.bind(null,e),f_:bd.bind(null,e),g_:Td.bind(null,e)}),e.B_.push(t=>l(this,null,function*(){t?(e.U_.s_(),yield gd(e)):(yield e.U_.stop(),e.O_.length>0&&(Ci("RemoteStore",`Stopping write stream with ${e.O_.length} pending writes`),e.O_=[]))}))),e.U_
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
 */}class Ad{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new Li,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,i){const s=Date.now()+n,o=new Ad(e,t,s,r,i);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Pi(Oi.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Nd(e,t){if(ki("AsyncQueue",`${t}: ${e}`),vs(e))return new Pi(Oi.UNAVAILABLE,`${t}: ${e}`);throw e}
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
 */class Dd{constructor(e){this.comparator=e?(t,n)=>e(t,n)||es.comparator(t.key,n.key):(e,t)=>es.comparator(e.key,t.key),this.keyedMap=Ja(),this.sortedSet=new uo(this.comparator)}static emptySet(e){return new Dd(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Dd))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new Dd;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
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
 */class xd{constructor(){this.W_=new uo(es.comparator)}track(e){const t=e.doc.key,n=this.W_.get(t);n?0!==e.type&&3===n.type?this.W_=this.W_.insert(t,e):3===e.type&&1!==n.type?this.W_=this.W_.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.W_=this.W_.remove(t):1===e.type&&2===n.type?this.W_=this.W_.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):Di():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,n)=>{e.push(n)}),e}}class Rd{constructor(e,t,n,r,i,s,o,a,u){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=u}static fromInitialDocuments(e,t,n,r,i){const s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new Rd(e,t,Dd.emptySet(t),s,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ba(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==n[r].type||!t[r].doc.isEqual(n[r].doc))return!1;return!0}}
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
 */class Od{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class Pd{constructor(){this.queries=Ld(),this.onlineState="Unknown",this.Y_=new Set}terminate(){!function(e,t){const n=Ri(e),r=n.queries;n.queries=Ld(),r.forEach((e,n)=>{for(const r of n.j_)r.onError(t)})}(this,new Pi(Oi.ABORTED,"Firestore shutting down"))}}function Ld(){return new $a(e=>ja(e),Ba)}function Md(e,t){return l(this,null,function*(){const n=Ri(e);let r=3;const i=t.query;let s=n.queries.get(i);s?!s.H_()&&t.J_()&&(r=2):(s=new Od,r=t.J_()?0:1);try{switch(r){case 0:s.z_=yield n.onListen(i,!0);break;case 1:s.z_=yield n.onListen(i,!1);break;case 2:yield n.onFirstRemoteStoreListen(i)}}catch(o){const e=Nd(o,`Initialization of query '${qa(t.query)}' failed`);return void t.onError(e)}n.queries.set(i,s),s.j_.push(t),t.Z_(n.onlineState),s.z_&&t.X_(s.z_)&&Bd(n)})}function Vd(e,t){return l(this,null,function*(){const n=Ri(e),r=t.query;let i=3;const s=n.queries.get(r);if(s){const e=s.j_.indexOf(t);e>=0&&(s.j_.splice(e,1),0===s.j_.length?i=t.J_()?0:1:!s.H_()&&t.J_()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}})}function Fd(e,t){const n=Ri(e);let r=!1;for(const i of t){const e=i.query,t=n.queries.get(e);if(t){for(const e of t.j_)e.X_(i)&&(r=!0);t.z_=i}}r&&Bd(n)}function Ud(e,t,n){const r=Ri(e),i=r.queries.get(t);if(i)for(const s of i.j_)s.onError(n);r.queries.delete(t)}function Bd(e){e.Y_.forEach(e=>{e.next()})}var jd,qd;(qd=jd||(jd={})).ea="default",qd.Cache="cache";class zd{constructor(e,t,n){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new Rd(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache)return!0;if(!this.J_())return!0;const n="Offline"!==t;return(!this.options._a||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}oa(e){e=Rd.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==jd.Cache}}
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
 */class Kd{constructor(e){this.key=e}}class Gd{constructor(e){this.key=e}}class $d{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=ru(),this.mutatedKeys=ru(),this.Aa=Ka(e),this.Ra=new Dd(this.Aa)}get Va(){return this.Ta}ma(e,t){const n=t?t.fa:new xd,r=t?t.Ra:this.Ra;let i=t?t.mutatedKeys:this.mutatedKeys,s=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,u="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{const c=r.get(e),l=za(this.query,t)?t:null,h=!!c&&this.mutatedKeys.has(c.key),d=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let f=!1;c&&l?c.data.isEqual(l.data)?h!==d&&(n.track({type:3,doc:l}),f=!0):this.ga(c,l)||(n.track({type:2,doc:l}),f=!0,(a&&this.Aa(l,a)>0||u&&this.Aa(l,u)<0)&&(o=!0)):!c&&l?(n.track({type:0,doc:l}),f=!0):c&&!l&&(n.track({type:1,doc:c}),f=!0,(a||u)&&(o=!0)),f&&(l?(s=s.add(l),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){const e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{Ra:s,fa:n,ns:o,mutatedKeys:i}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const s=e.fa.G_();s.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Di()}};return n(e)-n(t)}(e.type,t.type)||this.Aa(e.doc,t.doc)),this.pa(n),r=null!=r&&r;const o=t&&!r?this.ya():[],a=0===this.da.size&&this.current&&!r?1:0,u=a!==this.Ea;return this.Ea=a,0!==s.length||u?{snapshot:new Rd(this.query,e.Ra,i,s,e.mutatedKeys,0===a,u,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:o}:{wa:o}}Z_(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new xd,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(e=>this.Ta=this.Ta.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ta=this.Ta.delete(e)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=ru(),this.Ra.forEach(e=>{this.Sa(e.key)&&(this.da=this.da.add(e.key))});const t=[];return e.forEach(e=>{this.da.has(e)||t.push(new Gd(e))}),this.da.forEach(n=>{e.has(n)||t.push(new Kd(n))}),t}ba(e){this.Ta=e.Ts,this.da=ru();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Rd.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,0===this.Ea,this.hasCachedResults)}}class Hd{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Wd{constructor(e){this.key=e,this.va=!1}}class Qd{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Ca={},this.Fa=new $a(e=>ja(e),Ba),this.Ma=new Map,this.xa=new Set,this.Oa=new uo(es.comparator),this.Na=new Map,this.La=new lh,this.Ba={},this.ka=new Map,this.qa=Ul.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return!0===this.Qa}}function Jd(e,t,n=!0){return l(this,null,function*(){const r=yf(e);let i;const s=r.Fa.get(t);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=yield Xd(r,t,n,!0),i})}function Yd(e,t){return l(this,null,function*(){const n=yf(e);yield Xd(n,t,!0,!1)})}function Xd(e,t,n,r){return l(this,null,function*(){const i=yield function(e,t){const n=Ri(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.Ur.getTargetData(e,t).next(i=>i?(r=i,ds.resolve(r)):n.Ur.allocateTargetId(e).next(i=>(r=new Mc(t,i,"TargetPurposeListen",e.currentSequenceNumber),n.Ur.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.os.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.os=n.os.insert(e.targetId,e),n._s.set(t,e.targetId)),e})}(e.localStore,Va(t)),s=i.targetId,o=e.sharedClientState.addLocalQueryTarget(s,n);let a;return r&&(a=yield function(e,t,n,r,i){return l(this,null,function*(){e.Ka=(t,n,r)=>function(e,t,n,r){return l(this,null,function*(){let i=t.view.ma(n);i.ns&&(i=yield Ph(e.localStore,t.query,!1).then(({documents:e})=>t.view.ma(e,i)));const s=r&&r.targetChanges.get(t.targetId),o=r&&null!=r.targetMismatches.get(t.targetId),a=t.view.applyChanges(i,e.isPrimaryClient,s,o);return hf(e,t.targetId,a.wa),a.snapshot})}(e,t,n,r);const s=yield Ph(e.localStore,t,!0),o=new $d(t,s.Ts),a=o.ma(s.documents),u=Qu.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),c=o.applyChanges(a,e.isPrimaryClient,u);hf(e,n,c.wa);const h=new Hd(t,n,o);return e.Fa.set(t,h),e.Ma.has(n)?e.Ma.get(n).push(t):e.Ma.set(n,[t]),c.snapshot})}(e,t,s,"current"===o,i.resumeToken)),e.isPrimaryClient&&n&&nd(e.remoteStore,i),a})}function Zd(e,t,n){return l(this,null,function*(){const r=Ri(e),i=r.Fa.get(t),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(e=>!Ba(e,t))),void r.Fa.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||(yield Oh(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&rd(r.remoteStore,i.targetId),cf(r,i.targetId)}).catch(hs))):(cf(r,i.targetId),yield Oh(r.localStore,i.targetId,!0))})}function ef(e,t){return l(this,null,function*(){const n=Ri(e),r=n.Fa.get(t),i=n.Ma.get(r.targetId);n.isPrimaryClient&&1===i.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),rd(n.remoteStore,r.targetId))})}function tf(e,t){return l(this,null,function*(){const n=Ri(e);try{const e=yield function(e,t){const n=Ri(e),r=t.snapshotVersion;let i=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const s=n.cs.newChangeBuffer({trackRemovals:!0});i=n.os;const o=[];t.targetChanges.forEach((s,a)=>{const u=i.get(a);if(!u)return;o.push(n.Ur.removeMatchingKeys(e,s.removedDocuments,a).next(()=>n.Ur.addMatchingKeys(e,s.addedDocuments,a)));let c=u.withSequenceNumber(e.currentSequenceNumber);var l,h,d;null!==t.targetMismatches.get(a)?c=c.withResumeToken(yo.EMPTY_BYTE_STRING,Qi.min()).withLastLimboFreeSnapshotVersion(Qi.min()):s.resumeToken.approximateByteSize()>0&&(c=c.withResumeToken(s.resumeToken,r)),i=i.insert(a,c),h=c,d=s,(0===(l=u).resumeToken.approximateByteSize()||h.snapshotVersion.toMicroseconds()-l.snapshotVersion.toMicroseconds()>=3e8||d.addedDocuments.size+d.modifiedDocuments.size+d.removedDocuments.size>0)&&o.push(n.Ur.updateTargetData(e,c))});let a=Wa(),u=ru();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),o.push(function(e,t,n){let r=ru(),i=ru();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=Wa();return n.forEach((n,s)=>{const o=e.get(n);s.isFoundDocument()!==o.isFoundDocument()&&(i=i.add(n)),s.isNoDocument()&&s.version.isEqual(Qi.min())?(t.removeEntry(n,s.readTime),r=r.insert(n,s)):!o.isValidDocument()||s.version.compareTo(o.version)>0||0===s.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(s),r=r.insert(n,s)):Ci("LocalStore","Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",s.version)}),{Ps:r,Is:i}})}(e,s,t.documentUpdates).next(e=>{a=e.Ps,u=e.Is})),!r.isEqual(Qi.min())){const t=n.Ur.getLastRemoteSnapshotVersion(e).next(t=>n.Ur.setTargetsMetadata(e,e.currentSequenceNumber,r));o.push(t)}return ds.waitFor(o).next(()=>s.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,u)).next(()=>a)}).then(e=>(n.os=i,e))}(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.Na.get(t);r&&(xi(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1),e.addedDocuments.size>0?r.va=!0:e.modifiedDocuments.size>0?xi(r.va):e.removedDocuments.size>0&&(xi(r.va),r.va=!1))}),yield pf(n,e,t)}catch(r){yield hs(r)}})}function nf(e,t,n){const r=Ri(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.Fa.forEach((n,r)=>{const i=r.view.Z_(t);i.snapshot&&e.push(i.snapshot)}),function(e,t){const n=Ri(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const i of n.j_)i.Z_(t)&&(r=!0)}),r&&Bd(n)}(r.eventManager,t),e.length&&r.Ca.d_(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}function rf(e,t,n){return l(this,null,function*(){const r=Ri(e);r.sharedClientState.updateQueryState(t,"rejected",n);const i=r.Na.get(t),s=i&&i.key;if(s){let e=new uo(es.comparator);e=e.insert(s,Zo.newNoDocument(s,Qi.min()));const n=ru().add(s),i=new Wu(Qi.min(),new Map,new uo(Gi),e,n);yield tf(r,i),r.Oa=r.Oa.remove(s),r.Na.delete(t),ff(r)}else yield Oh(r.localStore,t,!1).then(()=>cf(r,t,n)).catch(hs)})}function sf(e,t){return l(this,null,function*(){const n=Ri(e),r=t.batch.batchId;try{const e=yield function(e,t){const n=Ri(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const i=n.batch,s=i.keys();let o=ds.resolve();return s.forEach(e=>{o=o.next(()=>r.getEntry(t,e)).next(t=>{const s=n.docVersions.get(e);xi(null!==s),t.version.compareTo(s)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,i))}(n,e,t,i).next(()=>i.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=ru();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}(n.localStore,t);uf(n,r,null),af(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),yield pf(n,e)}catch(i){yield hs(i)}})}function of(e,t,n){return l(this,null,function*(){const r=Ri(e);try{const e=yield function(e,t){const n=Ri(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(xi(null!==t),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);uf(r,t,n),af(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),yield pf(r,e)}catch(i){yield hs(i)}})}function af(e,t){(e.ka.get(t)||[]).forEach(e=>{e.resolve()}),e.ka.delete(t)}function uf(e,t,n){const r=Ri(e);let i=r.Ba[r.currentUser.toKey()];if(i){const e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),r.Ba[r.currentUser.toKey()]=i}}function cf(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Ma.get(t))e.Fa.delete(r),n&&e.Ca.$a(r,n);e.Ma.delete(t),e.isPrimaryClient&&e.La.gr(t).forEach(t=>{e.La.containsKey(t)||lf(e,t)})}function lf(e,t){e.xa.delete(t.path.canonicalString());const n=e.Oa.get(t);null!==n&&(rd(e.remoteStore,n),e.Oa=e.Oa.remove(t),e.Na.delete(n),ff(e))}function hf(e,t,n){for(const r of n)r instanceof Kd?(e.La.addReference(r.key,t),df(e,r)):r instanceof Gd?(Ci("SyncEngine","Document no longer in limbo: "+r.key),e.La.removeReference(r.key,t),e.La.containsKey(r.key)||lf(e,r.key)):Di()}function df(e,t){const n=t.key,r=n.path.canonicalString();e.Oa.get(n)||e.xa.has(r)||(Ci("SyncEngine","New document in limbo: "+n),e.xa.add(r),ff(e))}function ff(e){for(;e.xa.size>0&&e.Oa.size<e.maxConcurrentLimboResolutions;){const t=e.xa.values().next().value;e.xa.delete(t);const n=new es(Yi.fromString(t)),r=e.qa.next();e.Na.set(r,new Wd(n)),e.Oa=e.Oa.insert(n,r),nd(e.remoteStore,new Mc(Va(Oa(n.path)),r,"TargetPurposeLimboResolution",Ss.oe))}}function pf(e,t,n){return l(this,null,function*(){const r=Ri(e),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((e,a)=>{o.push(r.Ka(a,t,n).then(e=>{var t;if((e||n)&&r.isPrimaryClient){const i=e?!e.fromCache:null===(t=null==n?void 0:n.targetChanges.get(a.targetId))||void 0===t?void 0:t.current;r.sharedClientState.updateQueryState(a.targetId,i?"current":"not-current")}if(e){i.push(e);const t=Sh.Wi(a.targetId,e);s.push(t)}}))}),yield Promise.all(o),r.Ca.d_(i),yield function(e,t){return l(this,null,function*(){const n=Ri(e);try{yield n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>ds.forEach(t,t=>ds.forEach(t.$i,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>ds.forEach(t.Ui,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(r){if(!vs(r))throw r;Ci("LocalStore","Failed to update sequence numbers: "+r)}for(const e of t){const t=e.targetId;if(!e.fromCache){const e=n.os.get(t),r=e.snapshotVersion,i=e.withLastLimboFreeSnapshotVersion(r);n.os=n.os.insert(t,i)}}})}(r.localStore,s))})}function mf(e,t){return l(this,null,function*(){const n=Ri(e);if(!n.currentUser.isEqual(t)){Ci("SyncEngine","User change. New user:",t.toKey());const e=yield Dh(n.localStore,t);n.currentUser=t,(r=n).ka.forEach(e=>{e.forEach(e=>{e.reject(new Pi(Oi.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),r.ka.clear(),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),yield pf(n,e.hs)}var r})}function gf(e,t){const n=Ri(e),r=n.Na.get(t);if(r&&r.va)return ru().add(r.key);{let e=ru();const r=n.Ma.get(t);if(!r)return e;for(const t of r){const r=n.Fa.get(t);e=e.unionWith(r.view.Va)}return e}}function yf(e){const t=Ri(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=tf.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=gf.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=rf.bind(null,t),t.Ca.d_=Fd.bind(null,t.eventManager),t.Ca.$a=Ud.bind(null,t.eventManager),t}function vf(e){const t=Ri(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=sf.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=of.bind(null,t),t}class wf{constructor(){this.kind="memory",this.synchronizeTabs=!1}initialize(e){return l(this,null,function*(){this.serializer=$h(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),yield this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)})}ja(e,t){return null}Ha(e,t){return null}za(e){return Nh(this.persistence,new kh,e.initialUser,this.serializer)}Ga(e){return new gh(vh.Zr,this.serializer)}Wa(e){return new Mh}terminate(){return l(this,null,function*(){var e,t;null===(e=this.gcScheduler)||void 0===e||e.stop(),null===(t=this.indexBackfillerScheduler)||void 0===t||t.stop(),this.sharedClientState.shutdown(),yield this.persistence.shutdown()})}}wf.provider={build:()=>new wf};class _f extends wf{constructor(e,t,n){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}initialize(e){return l(this,null,function*(){yield c(_f.prototype,this,"initialize").call(this,e),yield this.Ja.initialize(this,e),yield vf(this.Ja.syncEngine),yield gd(this.Ja.remoteStore),yield this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))})}za(e){return Nh(this.persistence,new kh,e.initialUser,this.serializer)}ja(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new $l(n,e.asyncQueue,t)}Ha(e,t){const n=new Es(t,this.persistence);return new Ts(e.asyncQueue,n)}Ga(e){const t=function(e,t){let n=e.projectId;return e.isDefaultDatabase||(n+="."+e.database),"firestore/"+t+"/"+n+"/"}(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?xl.withCacheSize(this.cacheSizeBytes):xl.DEFAULT;return new bh(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,"undefined"!=typeof window?window:null,Gh(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new Mh}}class If{initialize(e,t){return l(this,null,function*(){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>nf(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=mf.bind(null,this.syncEngine),yield function(e,t){return l(this,null,function*(){const n=Ri(e);t?(n.L_.delete(2),yield ed(n)):t||(n.L_.add(2),yield td(n),n.q_.set("Unknown"))})}(this.remoteStore,this.syncEngine.isPrimaryClient))})}createEventManager(e){return new Pd}createDatastore(e){const t=$h(e.databaseInfo.databaseId),n=(r=e.databaseInfo,new Kh(r));var r;return function(e,t,n,r){return new Yh(e,t,n,r)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return t=this.localStore,n=this.datastore,r=e.asyncQueue,i=e=>nf(this.syncEngine,e,0),s=Fh.D()?new Fh:new Vh,new Zh(t,n,r,i,s);var t,n,r,i,s}createSyncEngine(e,t){return function(e,t,n,r,i,s,o){const a=new Qd(e,t,n,r,i,s);return o&&(a.Qa=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return l(this,null,function*(){var e,t;yield function(e){return l(this,null,function*(){const t=Ri(e);Ci("RemoteStore","RemoteStore shutting down."),t.L_.add(5),yield td(t),t.k_.shutdown(),t.q_.set("Unknown")})}(this.remoteStore),null===(e=this.datastore)||void 0===e||e.terminate(),null===(t=this.eventManager)||void 0===t||t.terminate()})}}If.provider={build:()=>new If};
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
class bf{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):ki("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
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
 */class Tf{constructor(e,t,n,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=bi.UNAUTHENTICATED,this.clientId=Ki.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,e=>l(this,null,function*(){Ci("FirestoreClient","Received user=",e.uid),yield this.authCredentialListener(e),this.user=e})),this.appCheckCredentials.start(n,e=>(Ci("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Li;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(()=>l(this,null,function*(){try{this._onlineComponents&&(yield this._onlineComponents.terminate()),this._offlineComponents&&(yield this._offlineComponents.terminate()),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Nd(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}function Ef(e,t){return l(this,null,function*(){e.asyncQueue.verifyOperationInProgress(),Ci("FirestoreClient","Initializing OfflineComponentProvider");const n=e.configuration;yield t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(e=>l(this,null,function*(){r.isEqual(e)||(yield Dh(t.localStore,e),r=e)})),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t})}function Sf(e,t){return l(this,null,function*(){e.asyncQueue.verifyOperationInProgress();const n=yield function(e){return l(this,null,function*(){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){Ci("FirestoreClient","Using user provided OfflineComponentProvider");try{yield Ef(e,e._uninitializedComponentsProvider._offline)}catch(t){const i=t;if(!("FirebaseError"===(n=i).name?n.code===Oi.FAILED_PRECONDITION||n.code===Oi.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&n instanceof DOMException)||22===n.code||20===n.code||11===n.code))throw i;Ai("Error using user provided cache. Falling back to memory cache: "+i),yield Ef(e,new wf)}}else Ci("FirestoreClient","Using default OfflineComponentProvider"),yield Ef(e,new wf);var n;return e._offlineComponents})}(e);Ci("FirestoreClient","Initializing OnlineComponentProvider"),yield t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>Sd(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>Sd(t.remoteStore,n)),e._onlineComponents=t})}function Cf(e){return l(this,null,function*(){return e._onlineComponents||(e._uninitializedComponentsProvider?(Ci("FirestoreClient","Using user provided OnlineComponentProvider"),yield Sf(e,e._uninitializedComponentsProvider._online)):(Ci("FirestoreClient","Using default OnlineComponentProvider"),yield Sf(e,new If))),e._onlineComponents})}function kf(e){return l(this,null,function*(){const t=yield Cf(e),n=t.eventManager;return n.onListen=Jd.bind(null,t.syncEngine),n.onUnlisten=Zd.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=Yd.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=ef.bind(null,t.syncEngine),n})}
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
function Af(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
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
 */}const Nf=new Map;
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
 */function Df(e,t,n){if(!n)throw new Pi(Oi.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function xf(e){if(!es.isDocumentKey(e))throw new Pi(Oi.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function Rf(e){if(es.isDocumentKey(e))throw new Pi(Oi.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function Of(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var t;return"function"==typeof e?"a function":Di()}function Pf(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new Pi(Oi.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Of(e);throw new Pi(Oi.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}
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
 */class Lf{constructor(e){var t,n;if(void 0===e.host){if(void 0!==e.ssl)throw new Pi(Oi.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new Pi(Oi.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,n,r){if(!0===t&&!0===r)throw new Pi(Oi.INVALID_ARGUMENT,"experimentalForceLongPolling and experimentalAutoDetectLongPolling cannot be used together.")})(0,e.experimentalForceLongPolling,0,e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Af(null!==(n=e.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new Pi(Oi.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new Pi(Oi.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new Pi(Oi.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,n=e.experimentalLongPollingOptions,t.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var t,n}}class Mf{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Lf({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Pi(Oi.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new Pi(Oi.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Lf(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new Vi;switch(e.type){case"firstParty":return new Bi(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new Pi(Oi.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}_restart(){return l(this,null,function*(){"notTerminated"===this._terminateTask?yield this._terminate():this._terminateTask="notTerminated"})}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Nf.get(e);t&&(Ci("ComponentProvider","Removing Datastore"),Nf.delete(e),t.terminate())}(this),Promise.resolve()}}
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
 */class Vf{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Vf(this.firestore,e,this._query)}}class Ff{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Uf(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ff(this.firestore,e,this._key)}}class Uf extends Vf{constructor(e,t,n){super(e,t,Oa(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ff(this.firestore,null,new es(e))}withConverter(e){return new Uf(this.firestore,e,this._path)}}function Bf(e,t,...n){if(e=L(e),Df("collection","path",t),e instanceof Mf){const r=Yi.fromString(t,...n);return Rf(r),new Uf(e,null,r)}{if(!(e instanceof Ff||e instanceof Uf))throw new Pi(Oi.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Yi.fromString(t,...n));return Rf(r),new Uf(e.firestore,null,r)}}function jf(e,t,...n){if(e=L(e),1===arguments.length&&(t=Ki.newId()),Df("doc","path",t),e instanceof Mf){const r=Yi.fromString(t,...n);return xf(r),new Ff(e,null,new es(r))}{if(!(e instanceof Ff||e instanceof Uf))throw new Pi(Oi.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Yi.fromString(t,...n));return xf(r),new Ff(e.firestore,e instanceof Uf?e.converter:null,new es(r))}}
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
 */class qf{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Hh(this,"async_queue_retry"),this.Vu=()=>{const e=Gh();e&&Ci("AsyncQueue","Visibility state changed to "+e.visibilityState),this.t_.jo()},this.mu=e;const t=Gh();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=Gh();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new Li;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}pu(){return l(this,null,function*(){if(0!==this.Pu.length){try{yield this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!vs(e))throw e;Ci("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}})}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(e=>{throw this.Eu=e,this.du=!1,ki("INTERNAL UNHANDLED ERROR: ",function(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}(e)),e}).then(e=>(this.du=!1,e))));return this.mu=t,t}enqueueAfterDelay(e,t,n){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const r=Ad.createAndSchedule(this,e,t,n,e=>this.yu(e));return this.Tu.push(r),r}fu(){this.Eu&&Di()}verifyOperationInProgress(){}wu(){return l(this,null,function*(){let e;do{e=this.mu,yield e}while(e!==this.mu)})}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function zf(e){return function(e){if("object"!=typeof e||null===e)return!1;const t=e;for(const n of["next","error","complete"])if(n in t&&"function"==typeof t[n])return!0;return!1}(e)}class Kf extends Mf{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new qf,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}_terminate(){return l(this,null,function*(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new qf(e),this._firestoreClient=void 0,yield e}})}}function Gf(e,t,n){n||(n="(default)");const r=He(e,"firestore");if(r.isInitialized(n)){const e=r.getImmediate({identifier:n});if(A(r.getOptions(n),t))return e;throw new Pi(Oi.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(void 0!==t.cacheSizeBytes&&void 0!==t.localCache)throw new Pi(Oi.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(void 0!==t.cacheSizeBytes&&-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new Pi(Oi.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:t,instanceIdentifier:n})}function $f(e){if(e._terminated)throw new Pi(Oi.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||Hf(e),e._firestoreClient}function Hf(e){var t,n,r;const i=e._freezeSettings(),s=(o=e._databaseId,a=(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",u=e._persistenceKey,new So(o,a,u,(c=i).host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,Af(c.experimentalLongPollingOptions),c.useFetchStreams));var o,a,u,c;e._componentsProvider||(null===(n=i.localCache)||void 0===n?void 0:n._offlineComponentProvider)&&(null===(r=i.localCache)||void 0===r?void 0:r._onlineComponentProvider)&&(e._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),e._firestoreClient=new Tf(e._authCredentials,e._appCheckCredentials,e._queue,s,e._componentsProvider&&function(e){const t=null==e?void 0:e._online.build();return{_offline:null==e?void 0:e._offline.build(t),_online:t}}(e._componentsProvider))}function Wf(e,t){Ai("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const n=e._freezeSettings();return function(e,t,n){if((e=Pf(e,Kf))._firestoreClient||e._terminated)throw new Pi(Oi.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(e._componentsProvider||e._getSettings().localCache)throw new Pi(Oi.FAILED_PRECONDITION,"SDK cache is already specified.");e._componentsProvider={_online:t,_offline:n},Hf(e)}
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
 */(e,If.provider,{build:e=>new _f(e,n.cacheSizeBytes,void 0)}),Promise.resolve()}class Qf{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Qf(yo.fromBase64String(e))}catch(t){throw new Pi(Oi.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Qf(yo.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}
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
 */class Jf{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new Pi(Oi.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Zi(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
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
 */class Yf{constructor(e){this._methodName=e}}
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
 */class Xf{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new Pi(Oi.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new Pi(Oi.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Gi(this._lat,e._lat)||Gi(this._long,e._long)}}
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
 */class Zf{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}}
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
 */const ep=/^__.*__$/;class tp{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new Du(e,this.data,this.fieldMask,t,this.fieldTransforms):new Nu(e,this.data,t,this.fieldTransforms)}}class np{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Du(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function rp(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Di()}}class ip{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new ip(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.Fu({path:n,xu:!1});return r.Ou(e),r}Nu(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.Fu({path:n,xu:!1});return r.vu(),r}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return vp(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(0===e.length)throw this.Bu("Document fields must not be empty");if(rp(this.Cu)&&ep.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class sp{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||$h(e)}Qu(e,t,n,r=!1){return new ip({Cu:e,methodName:t,qu:n,path:Zi.emptyPath(),xu:!1,ku:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function op(e){const t=e._freezeSettings(),n=$h(e._databaseId);return new sp(e._databaseId,!!t.ignoreUndefinedProperties,n)}function ap(e,t,n,r,i,s={}){const o=e.Qu(s.merge||s.mergeFields?2:0,t,n,i);pp("Data must be an object, but it was:",o,r);const a=dp(r,o);let u,c;if(s.merge)u=new mo(o.fieldMask),c=o.fieldTransforms;else if(s.mergeFields){const e=[];for(const r of s.mergeFields){const i=mp(t,r,n);if(!o.contains(i))throw new Pi(Oi.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);wp(e,i)||e.push(i)}u=new mo(e),c=o.fieldTransforms.filter(e=>u.covers(e.field))}else u=null,c=o.fieldTransforms;return new tp(new Yo(a),u,c)}class up extends Yf{_toFieldTransform(e){if(2!==e.Cu)throw 1===e.Cu?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof up}}function cp(e,t,n,r){const i=e.Qu(1,t,n);pp("Data must be an object, but it was:",i,r);const s=[],o=Yo.empty();oo(r,(e,r)=>{const a=yp(t,e,n);r=L(r);const u=i.Nu(a);if(r instanceof up)s.push(a);else{const e=hp(r,u);null!=e&&(s.push(a),o.set(a,e))}});const a=new mo(s);return new np(o,a,i.fieldTransforms)}function lp(e,t,n,r,i,s){const o=e.Qu(1,t,n),a=[mp(t,r,n)],u=[i];if(s.length%2!=0)throw new Pi(Oi.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<s.length;d+=2)a.push(mp(t,s[d])),u.push(s[d+1]);const c=[],l=Yo.empty();for(let d=a.length-1;d>=0;--d)if(!wp(c,a[d])){const e=a[d];let t=u[d];t=L(t);const n=o.Nu(e);if(t instanceof up)c.push(e);else{const r=hp(t,n);null!=r&&(c.push(e),l.set(e,r))}}const h=new mo(c);return new np(l,h,o.fieldTransforms)}function hp(e,t){if(fp(e=L(e)))return pp("Unsupported field value:",t,e),dp(e,t);if(e instanceof Yf)return function(e,t){if(!rp(t.Cu))throw t.Bu(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Bu(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.xu&&4!==t.Cu)throw t.Bu("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const i of e){let e=hp(i,t.Lu(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=L(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return function(e,t){return function(e){return"number"==typeof e&&Number.isInteger(e)&&!ks(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}(t)?ou(t):su(e,t)}(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=Wi.fromDate(e);return{timestampValue:uc(t.serializer,n)}}if(e instanceof Wi){const n=new Wi(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:uc(t.serializer,n)}}if(e instanceof Xf)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Qf)return{bytesValue:cc(t.serializer,e._byteString)};if(e instanceof Ff){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.Bu(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:dc(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof Zf)return n=t,{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:e.toArray().map(e=>{if("number"!=typeof e)throw n.Bu("VectorValues must only contain numeric values.");return su(n.serializer,e)})}}}}};var n;throw t.Bu(`Unsupported field value: ${Of(e)}`)}(e,t)}function dp(e,t){const n={};return ao(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):oo(e,(e,r)=>{const i=hp(r,t.Mu(e));null!=i&&(n[e]=i)}),{mapValue:{fields:n}}}function fp(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof Wi||e instanceof Xf||e instanceof Qf||e instanceof Ff||e instanceof Yf||e instanceof Zf)}function pp(e,t,n){if(!fp(n)||"object"!=typeof(r=n)||null===r||Object.getPrototypeOf(r)!==Object.prototype&&null!==Object.getPrototypeOf(r)){const r=Of(n);throw"an object"===r?t.Bu(e+" a custom object"):t.Bu(e+" "+r)}var r}function mp(e,t,n){if((t=L(t))instanceof Jf)return t._internalPath;if("string"==typeof t)return yp(e,t);throw vp("Field path arguments must be of type string or ",e,!1,void 0,n)}const gp=new RegExp("[~\\*/\\[\\]]");function yp(e,t,n){if(t.search(gp)>=0)throw vp(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Jf(...t.split("."))._internalPath}catch(r){throw vp(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function vp(e,t,n,r,i){const s=r&&!r.isEmpty(),o=void 0!==i;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new Pi(Oi.INVALID_ARGUMENT,a+e+u)}function wp(e,t){return e.some(e=>e.isEqual(t))}
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
 */class _p{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ff(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new Ip(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(bp("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class Ip extends _p{data(){return super.data()}}function bp(e,t){return"string"==typeof t?yp(e,t):t instanceof Jf?t._internalPath:t._delegate._internalPath}
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
 */function Tp(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new Pi(Oi.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ep{}class Sp extends Ep{}function Cp(e,t,...n){let r=[];t instanceof Ep&&r.push(t),r=r.concat(n),function(e){const t=e.filter(e=>e instanceof Np).length,n=e.filter(e=>e instanceof kp).length;if(t>1||t>0&&n>0)throw new Pi(Oi.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)e=i._apply(e);return e}class kp extends Sp{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new kp(e,t,n)}_apply(e){const t=this._parse(e);return Pp(e._query,t),new Vf(e.firestore,e.converter,Fa(e._query,t))}_parse(e){const t=op(e.firestore),n=function(e,t,n,r,i,s,o){let a;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new Pi(Oi.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){Op(o,s);const t=[];for(const n of o)t.push(Rp(r,e,n));a={arrayValue:{values:t}}}else a=Rp(r,e,o)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||Op(o,s),a=function(e,t,n,r=!1){return hp(n,e.Qu(r?4:3,t))}(n,"where",o,"in"===s||"not-in"===s);return oa.create(i,s,a)}(e._query,0,t,e.firestore._databaseId,this._field,this._op,this._value);return n}}function Ap(e,t,n){const r=t,i=bp("where",e);return kp._create(i,r,n)}class Np extends Ep{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Np(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:aa.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const r=t.getFlattenedFilters();for(const i of r)Pp(n,i),n=Fa(n,i)}(e._query,t),new Vf(e.firestore,e.converter,Fa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class Dp extends Sp{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Dp(e,t)}_apply(e){const t=function(e,t,n){if(null!==e.startAt)throw new Pi(Oi.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new Pi(Oi.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ra(t,n)}(e._query,this._field,this._direction);return new Vf(e.firestore,e.converter,function(e,t){const n=e.explicitOrderBy.concat([t]);return new Ra(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function xp(e,t="asc"){const n=t,r=bp("orderBy",e);return Dp._create(r,n)}function Rp(e,t,n){if("string"==typeof(n=L(n))){if(""===n)throw new Pi(Oi.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!La(t)&&-1!==n.indexOf("/"))throw new Pi(Oi.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=t.path.child(Yi.fromString(n));if(!es.isDocumentKey(r))throw new Pi(Oi.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Vo(e,new es(r))}if(n instanceof Ff)return Vo(e,n._key);throw new Pi(Oi.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Of(n)}.`)}function Op(e,t){if(!Array.isArray(e)||0===e.length)throw new Pi(Oi.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Pp(e,t){const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new Pi(Oi.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new Pi(Oi.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}class Lp{convertValue(e,t="none"){switch(No(e)){case 0:return null;case 1:return e.booleanValue;case 2:return _o(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Io(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw Di()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return oo(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){var t,n,r;const i=null===(r=null===(n=null===(t=e.fields)||void 0===t?void 0:t.value.arrayValue)||void 0===n?void 0:n.values)||void 0===r?void 0:r.map(e=>_o(e.doubleValue));return new Zf(i)}convertGeoPoint(e){return new Xf(_o(e.latitude),_o(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=To(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Eo(e));default:return null}}convertTimestamp(e){const t=wo(e);return new Wi(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=Yi.fromString(e);xi(Lc(n));const r=new Co(n.get(1),n.get(3)),i=new es(n.popFirst(5));return r.isEqual(t)||ki(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}
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
 */function Mp(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r
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
 */}class Vp{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Fp extends _p{constructor(e,t,n,r,i,s){super(e,t,n,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Up(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(bp("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class Up extends Fp{data(e={}){return super.data(e)}}class Bp{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Vp(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Up(this._firestore,this._userDataWriter,n.key,n,new Vp(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new Pi(Oi.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const r=new Up(e._firestore,e._userDataWriter,n.doc.key,n.doc,new Vp(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const r=new Up(e._firestore,e._userDataWriter,t.doc.key,t.doc,new Vp(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let i=-1,s=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),s=n.indexOf(t.doc.key)),{type:jp(t.type),doc:r,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function jp(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Di()}}class qp extends Lp{constructor(e){super(),this.firestore=e}convertBytes(e){return new Qf(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ff(this.firestore,null,t)}}function zp(e){e=Pf(e,Vf);const t=Pf(e.firestore,Kf),n=$f(t),r=new qp(t);return Tp(e._query),function(e,t,n={}){const r=new Li;return e.asyncQueue.enqueueAndForget(()=>l(this,null,function*(){return function(e,t,n,r,i){const s=new bf({next:n=>{s.Za(),t.enqueueAndForget(()=>Vd(e,o)),n.fromCache&&"server"===r.source?i.reject(new Pi(Oi.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),o=new zd(n,s,{includeMetadataChanges:!0,_a:!0});return Md(e,o)}(yield kf(e),e.asyncQueue,t,n,r)})),r.promise}(n,e._query).then(n=>new Bp(t,r,e,n))}function Kp(e,t,n){e=Pf(e,Ff);const r=Pf(e.firestore,Kf),i=Mp(e.converter,t,n);return Qp(r,[ap(op(r),"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,Iu.none())])}function Gp(e,t,n,...r){e=Pf(e,Ff);const i=Pf(e.firestore,Kf),s=op(i);let o;return o="string"==typeof(t=L(t))||t instanceof Jf?lp(s,"updateDoc",e._key,t,n,r):cp(s,"updateDoc",e._key,t),Qp(i,[o.toMutation(e._key,Iu.exists(!0))])}function $p(e){return Qp(Pf(e.firestore,Kf),[new Pu(e._key,Iu.none())])}function Hp(e,t){const n=Pf(e.firestore,Kf),r=jf(e),i=Mp(e.converter,t);return Qp(n,[ap(op(e.firestore),"addDoc",r._key,i,null!==e.converter,{}).toMutation(r._key,Iu.exists(!1))]).then(()=>r)}function Wp(e,...t){var n,r,i;e=L(e);let s={includeMetadataChanges:!1,source:"default"},o=0;"object"!=typeof t[o]||zf(t[o])||(s=t[o],o++);const a={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(zf(t[o])){const e=t[o];t[o]=null===(n=e.next)||void 0===n?void 0:n.bind(e),t[o+1]=null===(r=e.error)||void 0===r?void 0:r.bind(e),t[o+2]=null===(i=e.complete)||void 0===i?void 0:i.bind(e)}let u,c,h;if(e instanceof Ff)c=Pf(e.firestore,Kf),h=Oa(e._key.path),u={next:n=>{t[o]&&t[o](function(e,t,n){const r=n.docs.get(t._key),i=new qp(e);return new Fp(e,i,t._key,r,new Vp(n.hasPendingWrites,n.fromCache),t.converter)}
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
 */(c,e,n))},error:t[o+1],complete:t[o+2]};else{const n=Pf(e,Vf);c=Pf(n.firestore,Kf),h=n._query;const r=new qp(c);u={next:e=>{t[o]&&t[o](new Bp(c,r,n,e))},error:t[o+1],complete:t[o+2]},Tp(e._query)}return function(e,t,n,r){const i=new bf(r),s=new zd(t,i,n);return e.asyncQueue.enqueueAndForget(()=>l(this,null,function*(){return Md(yield kf(e),s)})),()=>{i.Za(),e.asyncQueue.enqueueAndForget(()=>l(this,null,function*(){return Vd(yield kf(e),s)}))}}($f(c),h,a,u)}function Qp(e,t){return function(e,t){const n=new Li;return e.asyncQueue.enqueueAndForget(()=>l(this,null,function*(){return function(t,n,r){return l(this,null,function*(){const i=vf(t);try{const e=yield function(e,t){const n=Ri(e),r=Wi.now(),i=t.reduce((e,t)=>e.add(t.key),ru());let s,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=Wa(),u=ru();return n.cs.getEntries(e,i).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(u=u.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(i=>{s=i;const o=[];for(const e of t){const t=ku(e,s.get(e.key).overlayedDocument);null!=t&&o.push(new Du(e.key,t,Xo(t.value.mapValue),Iu.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)}).next(t=>{o=t;const r=t.applyToLocalDocumentSet(s,u);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:o.batchId,changes:Ya(s)}))}(i.localStore,n);i.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.Ba[e.currentUser.toKey()];r||(r=new uo(Gi)),r=r.insert(t,n),e.Ba[e.currentUser.toKey()]=r}(i,e.batchId,r),yield pf(i,e.changes),yield gd(i.remoteStore)}catch(e){const n=Nd(e,"Failed to persist write");r.reject(n)}})}(yield function(e){return Cf(e).then(e=>e.syncEngine)}(e),t,n)})),n.promise}($f(e),t)}class Jp{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=op(e)}set(e,t,n){this._verifyNotCommitted();const r=Yp(e,this._firestore),i=Mp(r.converter,t,n),s=ap(this._dataReader,"WriteBatch.set",r._key,i,null!==r.converter,n);return this._mutations.push(s.toMutation(r._key,Iu.none())),this}update(e,t,n,...r){this._verifyNotCommitted();const i=Yp(e,this._firestore);let s;return s="string"==typeof(t=L(t))||t instanceof Jf?lp(this._dataReader,"WriteBatch.update",i._key,t,n,r):cp(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(s.toMutation(i._key,Iu.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Yp(e,this._firestore);return this._mutations=this._mutations.concat(new Pu(t._key,Iu.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new Pi(Oi.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Yp(e,t){if((e=L(e)).firestore!==t)throw new Pi(Oi.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}
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
 */function Xp(e){return $f(e=Pf(e,Kf)),new Jp(e,t=>Qp(e,t))}!function(e,t=!0){Ti=Ye,$e(new M("firestore",(e,{instanceIdentifier:n,options:r})=>{const i=e.getProvider("app").getImmediate(),s=new Kf(new Fi(e.getProvider("auth-internal")),new qi(e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new Pi(Oi.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Co(e.options.projectId,t)}(i,n),i);return r=Object.assign({useFetchStreams:t},r),s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),tt(Ii,"4.7.3",e),tt(Ii,"4.7.3","esm2017")}();
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
const Zp="firebasestorage.googleapis.com";
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
class em extends S{constructor(e,t,n=0){super(sm(e),`Firebase Storage: ${t} (${sm(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,em.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return sm(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var tm,nm,rm,im;function sm(e){return"storage/"+e}function om(e){return new em(tm.INVALID_ARGUMENT,e)}function am(){return new em(tm.APP_DELETED,"The Firebase app was deleted.")}(nm=tm||(tm={})).UNKNOWN="unknown",nm.OBJECT_NOT_FOUND="object-not-found",nm.BUCKET_NOT_FOUND="bucket-not-found",nm.PROJECT_NOT_FOUND="project-not-found",nm.QUOTA_EXCEEDED="quota-exceeded",nm.UNAUTHENTICATED="unauthenticated",nm.UNAUTHORIZED="unauthorized",nm.UNAUTHORIZED_APP="unauthorized-app",nm.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",nm.INVALID_CHECKSUM="invalid-checksum",nm.CANCELED="canceled",nm.INVALID_EVENT_NAME="invalid-event-name",nm.INVALID_URL="invalid-url",nm.INVALID_DEFAULT_BUCKET="invalid-default-bucket",nm.NO_DEFAULT_BUCKET="no-default-bucket",nm.CANNOT_SLICE_BLOB="cannot-slice-blob",nm.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",nm.NO_DOWNLOAD_URL="no-download-url",nm.INVALID_ARGUMENT="invalid-argument",nm.INVALID_ARGUMENT_COUNT="invalid-argument-count",nm.APP_DELETED="app-deleted",nm.INVALID_ROOT_OPERATION="invalid-root-operation",nm.INVALID_FORMAT="invalid-format",nm.INTERNAL_ERROR="internal-error",nm.UNSUPPORTED_ENVIRONMENT="unsupported-environment";
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
class um{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=um.makeFromUrl(e,t)}catch(i){return new um(e,"")}if(""===n.path)return n;throw r=e,new em(tm.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.");var r}static makeFromUrl(e,t){let n=null;const r="([A-Za-z0-9.\\-_]+)",i=new RegExp("^gs://"+r+"(/(.*))?$","i");function s(e){e.path_=decodeURIComponent(e.path)}const o=t.replace(/[.]/g,"\\."),a=[{regex:i,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${o}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:s},{regex:new RegExp(`^https?://${t===Zp?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:s}];for(let u=0;u<a.length;u++){const t=a[u],r=t.regex.exec(e);if(r){const e=r[t.indices.bucket];let i=r[t.indices.path];i||(i=""),n=new um(e,i),t.postModify(n);break}}if(null==n)throw function(e){return new em(tm.INVALID_URL,"Invalid URL '"+e+"'.")}(e);return n}}class cm{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}
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
 */function lm(e,t,n,r){if(r<t)throw om(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw om(`Invalid value for '${e}'. Expected ${n} or less.`)}(im=rm||(rm={}))[im.NO_ERROR=0]="NO_ERROR",im[im.NETWORK_ERROR=1]="NETWORK_ERROR",im[im.ABORT=2]="ABORT";
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
class hm{constructor(e,t,n,r,i,s,o,a,u,c,l,h=!0){this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=s,this.callback_=o,this.errorCallback_=a,this.timeout_=u,this.progressCallback_=c,this.connectionFactory_=l,this.retry=h,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){const e=(e,t)=>{const n=this.resolve_,r=this.reject_,i=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(i,i.getResponse());void 0===e?n():n(e)}catch(s){r(s)}else if(null!==i){const e=new em(tm.UNKNOWN,"An unknown error occurred, please check the error payload for server response.");e.serverResponse=i.getErrorText(),this.errorCallback_?r(this.errorCallback_(i,e)):r(e)}else t.canceled?r(this.appDelete_?am():new em(tm.CANCELED,"User canceled the upload/download.")):r(new em(tm.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again."))};this.canceled_?e(0,new dm(!1,null,!0)):this.backoffId_=function(e,t,n){let r=1,i=null,s=null,o=!1,a=0;function u(){return 2===a}let c=!1;function l(...e){c||(c=!0,t.apply(null,e))}function h(t){i=setTimeout(()=>{i=null,e(f,u())},t)}function d(){s&&clearTimeout(s)}function f(e,...t){if(c)return void d();if(e)return d(),void l.call(null,e,...t);if(u()||o)return d(),void l.call(null,e,...t);let n;r<64&&(r*=2),1===a?(a=2,n=0):n=1e3*(r+Math.random()),h(n)}let p=!1;function m(e){p||(p=!0,d(),c||(null!==i?(e||(a=2),clearTimeout(i),h(0)):e||(a=1)))}return h(0),s=setTimeout(()=>{o=!0,m(!0)},n),m}((e,t)=>{if(t)return void e(!1,new dm(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const r=e=>{const t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const t=n.getErrorCode()===rm.NO_ERROR,i=n.getStatus();if(!t||
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
function(e,t){const n=e>=500&&e<600,r=-1!==[408,429].indexOf(e),i=-1!==t.indexOf(e);return n||r||i}(i,this.additionalRetryCodes_)&&this.retry){const t=n.getErrorCode()===rm.ABORT;return void e(!1,new dm(!1,null,t))}const s=-1!==this.successCodes_.indexOf(i);e(!0,new dm(s,n))})},e,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class dm{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}
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
 */
class fm{constructor(e,t){this._service=e,this._location=t instanceof um?t:um.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new fm(e,t)}get root(){const e=new um(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return function(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}(this._location.path)}get storage(){return this._service}get parent(){const e=
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
function(e){if(0===e.length)return null;const t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;const t=new um(this._location.bucket,e);return new fm(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw function(e){return new em(tm.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(e)}}function pm(e,t){const n=null==t?void 0:t.storageBucket;return null==n?null:um.makeFromBucketSpec(n,e)}class mm{constructor(e,t,n,r,i){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=i,this._bucket=null,this._host=Zp,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=r?um.makeFromBucketSpec(r,this._host):pm(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=um.makeFromBucketSpec(this._url,e):this._bucket=pm(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){lm("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){lm("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}_getAuthToken(){return l(this,null,function*(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=yield e.getToken();if(null!==t)return t.accessToken}return null})}_getAppCheckToken(){return l(this,null,function*(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(yield e.getToken()).token:null})}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new fm(this,e)}_makeRequest(e,t,n,r,i=!0){if(this._deleted)return new cm(am());{const s=function(e,t,n,r,i,s,o=!0){const a=function(e){const t=encodeURIComponent;let n="?";for(const r in e)e.hasOwnProperty(r)&&(n=n+(t(r)+"=")+t(e[r])+"&");return n=n.slice(0,-1),n}(e.urlParams),u=e.url+a,c=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(c,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(c,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(null!=t?t:"AppManager")}(c,s),function(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}(c,r),new hm(u,e.method,c,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,o)}(e,this._appId,n,r,t,this._firebaseVersion,i);return this._requests.add(s),s.getPromise().then(()=>this._requests.delete(s),()=>this._requests.delete(s)),s}}makeRequestWithTokens(e,t){return l(this,null,function*(){const[n,r]=yield Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()})}}const gm="@firebase/storage",ym="0.13.2",vm="storage";function wm(e=Ze(),t){const n=He(e=L(e),vm).getImmediate({identifier:t}),r=(()=>{const e=v("storage");if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return"["===e[0]?[e.substring(1,t-1),n]:[e.substring(0,t),n]})();return r&&function(e,t,n,r={}){!function(e,t,n,r={}){e.host=`${t}:${n}`,e._protocol="http";const{mockUserToken:i}=r;i&&(e._overrideAuthToken="string"==typeof i?i:function(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[m(JSON.stringify({alg:"none",type:"JWT"})),m(JSON.stringify(s)),""].join(".")}(i,e.app.options.projectId))}(e,t,n,r)}(n,...r),n}$e(new M(vm,function(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return new mm(n,r,i,t,Ye)},"PUBLIC").setMultipleInstances(!0)),tt(gm,ym,""),tt(gm,ym,"esm2017");export{qn as G,Ze as a,ai as b,Gf as c,wm as d,Wf as e,jf as f,et as g,$p as h,Xe as i,Bf as j,zp as k,Xp as l,Wp as m,Hp as n,xp as o,tr as p,Cp as q,Dr as r,Kp as s,Xn as t,Gp as u,er as v,Ap as w,Zn as x};
