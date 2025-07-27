var t=(t,e,n)=>new Promise((r,s)=>{var o=t=>{try{a(n.next(t))}catch(e){s(e)}},i=t=>{try{a(n.throw(t))}catch(e){s(e)}},a=t=>t.done?r(t.value):Promise.resolve(t.value).then(o,i);a((n=n.apply(t,e)).next())});import{a as e,g as n,_ as r,b as s,k as o,i,p as a,u,c as l,F as c,j as h,C as d,r as p,S as _}from"./firebase-auth-Dy6ffJkg.js";
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
 */const f="firebasestorage.googleapis.com",g="storageBucket";
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
class m extends c{constructor(t,e,n=0){super(E(t),`Firebase Storage: ${e} (${E(t)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,m.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return E(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var b,w,R,T;function E(t){return"storage/"+t}function k(){return new m(b.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function v(t){return new m(b.INVALID_ARGUMENT,t)}function y(){return new m(b.APP_DELETED,"The Firebase app was deleted.")}function O(t){throw new m(b.INTERNAL_ERROR,"Internal error: "+t)}
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
 */(w=b||(b={})).UNKNOWN="unknown",w.OBJECT_NOT_FOUND="object-not-found",w.BUCKET_NOT_FOUND="bucket-not-found",w.PROJECT_NOT_FOUND="project-not-found",w.QUOTA_EXCEEDED="quota-exceeded",w.UNAUTHENTICATED="unauthenticated",w.UNAUTHORIZED="unauthorized",w.UNAUTHORIZED_APP="unauthorized-app",w.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",w.INVALID_CHECKSUM="invalid-checksum",w.CANCELED="canceled",w.INVALID_EVENT_NAME="invalid-event-name",w.INVALID_URL="invalid-url",w.INVALID_DEFAULT_BUCKET="invalid-default-bucket",w.NO_DEFAULT_BUCKET="no-default-bucket",w.CANNOT_SLICE_BLOB="cannot-slice-blob",w.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",w.NO_DOWNLOAD_URL="no-download-url",w.INVALID_ARGUMENT="invalid-argument",w.INVALID_ARGUMENT_COUNT="invalid-argument-count",w.APP_DELETED="app-deleted",w.INVALID_ROOT_OPERATION="invalid-root-operation",w.INVALID_FORMAT="invalid-format",w.INTERNAL_ERROR="internal-error",w.UNSUPPORTED_ENVIRONMENT="unsupported-environment";class U{constructor(t,e){this.bucket=t,this.path_=e}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let n;try{n=U.makeFromUrl(t,e)}catch(s){return new U(t,"")}if(""===n.path)return n;throw r=t,new m(b.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.");var r}static makeFromUrl(t,e){let n=null;const r="([A-Za-z0-9.\\-_]+)",s=new RegExp("^gs://"+r+"(/(.*))?$","i");function o(t){t.path_=decodeURIComponent(t.path)}const i=e.replace(/[.]/g,"\\."),a=[{regex:s,indices:{bucket:1,path:3},postModify:function(t){"/"===t.path.charAt(t.path.length-1)&&(t.path_=t.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${i}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:o},{regex:new RegExp(`^https?://${e===f?"(?:storage.googleapis.com|storage.cloud.google.com)":e}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:o}];for(let u=0;u<a.length;u++){const e=a[u],r=e.regex.exec(t);if(r){const t=r[e.indices.bucket];let s=r[e.indices.path];s||(s=""),n=new U(t,s),e.postModify(n);break}}if(null==n)throw function(t){return new m(b.INVALID_URL,"Invalid URL '"+t+"'.")}(t);return n}}class C{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}
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
 */function I(t){return"string"==typeof t||t instanceof String}function N(t){return A()&&t instanceof Blob}function A(){return"undefined"!=typeof Blob}function x(t,e,n,r){if(r<e)throw v(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw v(`Invalid value for '${t}'. Expected ${n} or less.`)}
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
 */function D(t,e,n){let r=e;return null==n&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function P(t){const e=encodeURIComponent;let n="?";for(const r in t)t.hasOwnProperty(r)&&(n=n+(e(r)+"=")+e(t[r])+"&");return n=n.slice(0,-1),n}(T=R||(R={}))[T.NO_ERROR=0]="NO_ERROR",T[T.NETWORK_ERROR=1]="NETWORK_ERROR",T[T.ABORT=2]="ABORT";
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
class L{constructor(t,e,n,r,s,o,i,a,u,l,c,h=!0,d=!1){this.url_=t,this.method_=e,this.headers_=n,this.body_=r,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=i,this.errorCallback_=a,this.timeout_=u,this.progressCallback_=l,this.connectionFactory_=c,this.retry=h,this.isUsingEmulator=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((t,e)=>{this.resolve_=t,this.reject_=e,this.start_()})}start_(){const t=(t,e)=>{const n=this.resolve_,r=this.reject_,s=e.connection;if(e.wasSuccessCode)try{const t=this.callback_(s,s.getResponse());void 0!==t?n(t):n()}catch(o){r(o)}else if(null!==s){const t=k();t.serverResponse=s.getErrorText(),this.errorCallback_?r(this.errorCallback_(s,t)):r(t)}else e.canceled?r(this.appDelete_?y():new m(b.CANCELED,"User canceled the upload/download.")):r(new m(b.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again."))};this.canceled_?t(0,new S(!1,null,!0)):this.backoffId_=function(t,e,n){let r=1,s=null,o=null,i=!1,a=0;function u(){return 2===a}let l=!1;function c(...t){l||(l=!0,e.apply(null,t))}function h(e){s=setTimeout(()=>{s=null,t(p,u())},e)}function d(){o&&clearTimeout(o)}function p(t,...e){if(l)return void d();if(t)return d(),void c.call(null,t,...e);if(u()||i)return d(),void c.call(null,t,...e);let n;r<64&&(r*=2),1===a?(a=2,n=0):n=1e3*(r+Math.random()),h(n)}let _=!1;function f(t){_||(_=!0,d(),l||(null!==s?(t||(a=2),clearTimeout(s),h(0)):t||(a=1)))}return h(0),o=setTimeout(()=>{i=!0,f(!0)},n),f}((t,e)=>{if(e)return void t(!1,new S(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const r=t=>{const e=t.loaded,n=t.lengthComputable?t.total:-1;null!==this.progressCallback_&&this.progressCallback_(e,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const e=n.getErrorCode()===R.NO_ERROR,s=n.getStatus();if(!e||
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
function(t,e){const n=t>=500&&t<600,r=-1!==[408,429].indexOf(t),s=-1!==e.indexOf(t);return n||r||s}(s,this.additionalRetryCodes_)&&this.retry){const e=n.getErrorCode()===R.ABORT;return void t(!1,new S(!1,null,e))}const o=-1!==this.successCodes_.indexOf(s);t(!0,new S(o,n))})},t,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class S{constructor(t,e,n){this.wasSuccessCode=t,this.connection=e,this.canceled=!!n}}function B(...t){const e="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0;if(void 0!==e){const n=new e;for(let e=0;e<t.length;e++)n.append(t[e]);return n.getBlob()}if(A())return new Blob(t);throw new m(b.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}class F{constructor(t,e){this.data=t,this.contentType=e||null}}function M(t){const e=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);r<=127?e.push(r):r<=2047?e.push(192|r>>6,128|63&r):55296==(64512&r)?n<t.length-1&&56320==(64512&t.charCodeAt(n+1))?(r=65536|(1023&r)<<10|1023&t.charCodeAt(++n),e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)):e.push(239,191,189):56320==(64512&r)?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(e)}
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
class V{constructor(t,e){let n=0,r="";N(t)?(this.data_=t,n=t.size,r=t.type):t instanceof ArrayBuffer?(e?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),n=this.data_.length):t instanceof Uint8Array&&(e?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),n=t.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(t,e){if(N(this.data_)){const o=(r=t,s=e,(n=this.data_).webkitSlice?n.webkitSlice(r,s):n.mozSlice?n.mozSlice(r,s):n.slice?n.slice(r,s):null);return null===o?null:new V(o)}{const n=new Uint8Array(this.data_.buffer,t,e-t);return new V(n,!0)}var n,r,s;
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
 */}static getBlob(...t){if(A()){const e=t.map(t=>t instanceof V?t.data_:t);return new V(B.apply(null,e))}{const e=t.map(t=>{return I(t)?(e=t,new F(M(e))).data:t.data_;var e});let n=0;e.forEach(t=>{n+=t.byteLength});const r=new Uint8Array(n);let s=0;return e.forEach(t=>{for(let e=0;e<t.length;e++)r[s++]=t[e]}),new V(r,!0)}}uploadData(){return this.data_}}
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
 */function $(t){let e;try{e=JSON.parse(t)}catch(r){return null}return"object"!=typeof(n=e)||Array.isArray(n)?null:e;var n}
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
 */function j(t){const e=t.lastIndexOf("/",t.length-2);return-1===e?t:t.slice(e+1)}
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
 */function z(t,e){return e}class q{constructor(t,e,n,r){this.server=t,this.local=e||t,this.writable=!!n,this.xform=r||z}}let H=null;function K(){if(H)return H;const t=[];t.push(new q("bucket")),t.push(new q("generation")),t.push(new q("metageneration")),t.push(new q("name","fullPath",!0));const e=new q("name");e.xform=function(t,e){return function(t){return!I(t)||t.length<2?t:j(t)}(e)},t.push(e);const n=new q("size");return n.xform=function(t,e){return void 0!==e?Number(e):e},t.push(n),t.push(new q("timeCreated")),t.push(new q("updated")),t.push(new q("md5Hash",null,!0)),t.push(new q("cacheControl",null,!0)),t.push(new q("contentDisposition",null,!0)),t.push(new q("contentEncoding",null,!0)),t.push(new q("contentLanguage",null,!0)),t.push(new q("contentType",null,!0)),t.push(new q("metadata","customMetadata",!0)),H=t,H}function W(t,e,n){const r=$(e);return null===r?null:function(t,e,n){const r={type:"file"},s=n.length;for(let o=0;o<s;o++){const t=n[o];r[t.local]=t.xform(r,e[t.server])}return function(t,e){Object.defineProperty(t,"ref",{get:function(){const n=t.bucket,r=t.fullPath,s=new U(n,r);return e._makeStorageReference(s)}})}(r,t),r}(t,r,n)}class X{constructor(t,e,n,r){this.url=t,this.method=e,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}
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
 */function Z(t){if(!t)throw k()}function G(t){return function(e,n){let r;var s,o;return 401===e.getStatus()?r=e.getErrorText().includes("Firebase App Check token is invalid")?new m(b.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new m(b.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===e.getStatus()?(o=t.bucket,r=new m(b.QUOTA_EXCEEDED,"Quota for bucket '"+o+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===e.getStatus()?(s=t.path,r=new m(b.UNAUTHORIZED,"User does not have permission to access '"+s+"'.")):r=n,r.status=e.getStatus(),r.serverResponse=n.serverResponse,r}}class J{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=R.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=R.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=R.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,e,n,r,s){if(this.sent_)throw O("cannot .send() more than once");if(i(t)&&n&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(e,t,!0),void 0!==s)for(const o in s)s.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,s[o].toString());return void 0!==r?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw O("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw O("cannot .getStatus() before sending");try{return this.xhr_.status}catch(t){return-1}}getResponse(){if(!this.sent_)throw O("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw O("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",t)}}class Y extends J{initXhr(){this.xhr_.responseType="text"}}function Q(){return new Y}
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
 */class tt{constructor(t,e){this._service=t,this._location=e instanceof U?e:U.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new tt(t,e)}get root(){const t=new U(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return j(this._location.path)}get storage(){return this._service}get parent(){const t=function(t){if(0===t.length)return null;const e=t.lastIndexOf("/");return-1===e?"":t.slice(0,e)}(this._location.path);if(null===t)return null;const e=new U(this._location.bucket,t);return new tt(this._service,e)}_throwIfRoot(t){if(""===this._location.path)throw function(t){return new m(b.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(t)}}function et(t,e){if(t instanceof st){const n=t;if(null==n._bucket)throw new m(b.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+g+"' property when initializing the app?");const r=new tt(n,n._bucket);return null!=e?et(r,e):r}return void 0!==e?function(t,e){const n=function(t,e){const n=e.split("/").filter(t=>t.length>0).join("/");return 0===t.length?n:t+"/"+n}(t._location.path,e),r=new U(t._location.bucket,n);return new tt(t.storage,r)}
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
 */(t,e):t}function nt(t,e){if(e&&/^[A-Za-z]+:\/\//.test(e)){if(t instanceof st)return new tt(t,e);throw v("To use ref(service, url), the first argument must be a Storage instance.")}return et(t,e)}function rt(t,e){const n=null==e?void 0:e[g];return null==n?null:U.makeFromBucketSpec(n,t)}class st{constructor(t,e,n,r,s,o=!1){this.app=t,this._authProvider=e,this._appCheckProvider=n,this._url=r,this._firebaseVersion=s,this._isUsingEmulator=o,this._bucket=null,this._host=f,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=r?U.makeFromBucketSpec(r,this._host):rt(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,null!=this._url?this._bucket=U.makeFromBucketSpec(this._url,t):this._bucket=rt(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){x("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){x("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}_getAuthToken(){return t(this,null,function*(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const e=yield t.getToken();if(null!==e)return e.accessToken}return null})}_getAppCheckToken(){return t(this,null,function*(){if(o(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=this._appCheckProvider.getImmediate({optional:!0});return t?(yield t.getToken()).token:null})}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new tt(this,t)}_makeRequest(t,e,n,r,s=!0){if(this._deleted)return new C(y());{const o=function(t,e,n,r,s,o,i=!0,a=!1){const u=P(t.urlParams),l=t.url+u,c=Object.assign({},t.headers);return function(t,e){e&&(t["X-Firebase-GMPID"]=e)}(c,e),function(t,e){null!==e&&e.length>0&&(t.Authorization="Firebase "+e)}(c,n),function(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(null!=e?e:"AppManager")}(c,o),function(t,e){null!==e&&(t["X-Firebase-AppCheck"]=e)}(c,r),new L(l,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,i,a)}
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
 */(t,this._appId,n,r,e,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}makeRequestWithTokens(e,n){return t(this,null,function*(){const[t,r]=yield Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,t,r).getPromise()})}}const ot="@firebase/storage",it="0.14.0",at="storage";function ut(t,e,r){return function(t,e,n){t._throwIfRoot("uploadBytes");const r=function(t,e,n,r,s){const o=e.bucketOnlyServerUrl(),i={"X-Goog-Upload-Protocol":"multipart"},a=function(){let t="";for(let e=0;e<2;e++)t+=Math.random().toString().slice(2);return t}();i["Content-Type"]="multipart/related; boundary="+a;const u=function(t,e,n){const r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=function(t,e){return e&&e.type()||"application/octet-stream"}(0,e)),r}(e,r,s),l=function(t,e){const n={},r=e.length;for(let s=0;s<r;s++){const r=e[s];r.writable&&(n[r.server]=t[r.local])}return JSON.stringify(n)}(u,n),c="--"+a+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+l+"\r\n--"+a+"\r\nContent-Type: "+u.contentType+"\r\n\r\n",h="\r\n--"+a+"--",d=V.getBlob(c,r,h);if(null===d)throw new m(b.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.");const p={name:u.fullPath},_=D(o,t.host,t._protocol),f=t.maxUploadRetryTime,g=new X(_,"POST",function(t,e){return function(n,r){const s=W(t,r,e);return Z(null!==s),s}}(t,n),f);return g.urlParams=p,g.headers=i,g.body=d.uploadData(),g.errorHandler=G(e),g}(t.storage,t._location,K(),new V(e,!0),n);return t.storage.makeRequestWithTokens(r,Q).then(e=>({metadata:e,ref:t}))}(t=n(t),e,r)}function lt(t){return function(t){t._throwIfRoot("getDownloadURL");const e=function(t,e,n){const r=D(e.fullServerUrl(),t.host,t._protocol),s=t.maxOperationRetryTime,o=new X(r,"GET",function(t,e){return function(n,r){const s=W(t,r,e);return Z(null!==s),function(t,e,n,r){const s=$(e);if(null===s)return null;if(!I(s.downloadTokens))return null;const o=s.downloadTokens;if(0===o.length)return null;const i=encodeURIComponent;return o.split(",").map(e=>{const s=t.bucket,o=t.fullPath;return D("/b/"+i(s)+"/o/"+i(o),n,r)+P({alt:"media",token:e})})[0]}(s,r,t.host,t._protocol)}}(t,n),s);return o.errorHandler=function(t){const e=G(t);return function(n,r){let s=e(n,r);var o;return 404===n.getStatus()&&(o=t.path,s=new m(b.OBJECT_NOT_FOUND,"Object '"+o+"' does not exist.")),s.serverResponse=r.serverResponse,s}}(e),o}(t.storage,t._location,K());return t.storage.makeRequestWithTokens(e,Q).then(t=>{if(null===t)throw new m(b.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return t})}(t=n(t))}function ct(t,e){return nt(t=n(t),e)}function ht(t=e(),o){t=n(t);const c=r(t,at).getImmediate({identifier:o}),h=s("storage");return h&&function(t,e,n,r={}){!function(t,e,n,r={}){t.host=`${e}:${n}`;const s=i(e);s&&(a(`https://${t.host}/b`),u("Storage",!0)),t._isUsingEmulator=!0,t._protocol=s?"https":"http";const{mockUserToken:o}=r;o&&(t._overrideAuthToken="string"==typeof o?o:l(o,t.app.options.projectId))}(t,e,n,r)}(c,...h),c}h(new d(at,function(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new st(n,r,s,e,_)},"PUBLIC").setMultipleInstances(!0)),p(ot,it,""),p(ot,it,"esm2020");export{ht as a,lt as g,ct as r,ut as u};
