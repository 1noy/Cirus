const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Auth-DgwcdEmT.js","assets/vendor-Be9Gvr8Z.js","assets/firebase-DLJYeIMi.js","assets/router-WS_FqKV8.js","assets/query-BCFsIYE1.js","assets/virtual-BJqExeNh.js","assets/utils-CkSu2hCt.js","assets/error-BaU7SGNY.js","assets/toast-DAwFn72h.js","assets/state-CH3XQ_Yu.js","assets/ChatPage-CM3LJUdf.js","assets/ui-CVUBDUKm.js","assets/ErrorFallback-84H7zsU-.js","assets/WelcomeAnimation-BWX1jMPr.js"])))=>i.map(i=>d[i]);
var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,i=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,s=(t,n,i)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[n]=i,a=(e,t)=>{for(var n in t||(t={}))o.call(t,n)&&s(e,n,t[n]);if(i)for(var n of i(t))r.call(t,n)&&s(e,n,t[n]);return e},c=(e,i)=>t(e,n(i)),d=(e,t,n)=>new Promise((i,o)=>{var r=e=>{try{a(n.next(e))}catch(t){o(t)}},s=e=>{try{a(n.throw(e))}catch(t){o(t)}},a=e=>e.done?i(e.value):Promise.resolve(e.value).then(r,s);a((n=n.apply(e,t)).next())});import{d as u,r as l,b as f}from"./vendor-Be9Gvr8Z.js";import{R as p,c as h,N as m}from"./router-WS_FqKV8.js";import{Q as g,a as y}from"./query-BCFsIYE1.js";import{E as v}from"./error-BaU7SGNY.js";import{V as w,O as b}from"./toast-DAwFn72h.js";import{p as S,c as k}from"./state-CH3XQ_Yu.js";import{g as I,i as j,a as T,b as C,G as A,c as x,p as E,d as O,e as N,f as _,u as P,h as M,j as D,q as R,w as L,k as K,l as U,o as q,m as $,s as z,n as F,r as B,_ as H,C as W,t as V,E as J,v as G,F as Y,x as Q,y as X,z as Z,A as ee,B as te}from"./firebase-DLJYeIMi.js";import"./virtual-BJqExeNh.js";import"./utils-CkSu2hCt.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)}).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var ne={},ie=u;ne.createRoot=ie.createRoot,ne.hydrateRoot=ie.hydrateRoot;const oe={},re=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),n=(null==e?void 0:e.nonce)||(null==e?void 0:e.getAttribute("nonce"));i=Promise.allSettled(t.map(e=>{if((e=function(e){return"/"+e}(e))in oe)return;oe[e]=!0;const t=e.endsWith(".css"),i=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${i}`))return;const o=document.createElement("link");return o.rel=t?"stylesheet":"modulepreload",t||(o.as="script"),o.crossOrigin="",o.href=e,n&&o.setAttribute("nonce",n),document.head.appendChild(o),t?new Promise((t,n)=>{o.addEventListener("load",t),o.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${e}`)))}):void 0}))}function o(e){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return i.then(t=>{for(const e of t||[])"rejected"===e.status&&o(e.reason);return e().catch(o)})},se=e=>(t,n,i)=>(i.setState=(e,n,...i)=>{const o="function"==typeof e?S(e):e;return t(o,n,...i)},e(i.setState,n,i)),ae=e=>(t,n,i)=>{const o=i.subscribe;return i.subscribe=(e,t,n)=>{let r=e;if(t){const o=(null==n?void 0:n.equalityFn)||Object.is;let s=e(i.getState());r=n=>{const i=e(n);if(!o(s,i)){const e=s;t(s=i,e)}},(null==n?void 0:n.fireImmediately)&&t(s,s)}return o(r)},e(t,n,i)};function ce(e,t){let n;try{n=e()}catch(i){return}return{getItem:e=>{var t;const i=e=>null===e?null:JSON.parse(e,void 0),o=null!=(t=n.getItem(e))?t:null;return o instanceof Promise?o.then(i):i(o)},setItem:(e,t)=>n.setItem(e,JSON.stringify(t,void 0)),removeItem:e=>n.removeItem(e)}}const de=e=>t=>{try{const n=e(t);return n instanceof Promise?n:{then:e=>de(e)(n),catch(e){return this}}}catch(n){return{then(e){return this},catch:e=>de(e)(n)}}},ue={apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0,measurementId:void 0},le=Object.values({apiKey:ue.apiKey,authDomain:ue.authDomain,projectId:ue.projectId,storageBucket:ue.storageBucket,messagingSenderId:ue.messagingSenderId,appId:ue.appId}).every(Boolean)?ue:{apiKey:"AIzaSyDW3ze_OVVjr5I79e0zqDbvnOUi2YRnPFA",authDomain:"chat-changing.firebaseapp.com",projectId:"chat-changing",storageBucket:"chat-changing.appspot.com",messagingSenderId:"38586122759",appId:"1:38586122759:web:07e8309564df8ce71aa0a2",measurementId:"G-NTW1DN98K3"};let fe;fe=I().length?T():j(le);const pe=C(fe);pe.useDeviceLanguage();const he=new A,me=x(fe,{localCache:E({tabManager:N()})});O(fe);const ge=k(ae((ye=se((e,t)=>({user:null,isAuthenticated:!1,users:[],contacts:[],searchResults:[],theme:"dark",sidebarOpen:!1,mobileMenuOpen:!1,chats:[],activeChat:null,unreadCount:0,messages:{},messageCache:{},notifications:[],notificationSettings:{sound:!0,vibration:!0,desktop:!0},performance:{lastRender:0,memoryUsage:0,networkStatus:"online"},errors:[],deviceInfo:{type:"desktop",orientation:"portrait",breakpoint:"lg",dimensions:{width:0,height:0},isTouch:!1,isRetina:!1,isLowBandwidth:!1},setUser:n=>{e(e=>{e.user=n,e.isAuthenticated=!!n}),n&&t().reloadContacts()},setUsers:t=>{e(e=>{e.users=t})},initializeTestUsers:()=>d(void 0,null,function*(){try{const n=D(me,"users"),i=yield K(n),o=[];i.forEach(e=>{o.push(a({uid:e.id},e.data()))}),e(e=>{e.users=o}),$(n,t=>{const n=[];t.forEach(e=>{n.push(a({uid:e.id},e.data()))}),e(e=>{e.users=n})});const r=t().user;if(r){yield t().reloadContacts();const e=D(me,"contacts"),n=R(e,L("addedBy","==",r.uid));$(n,e=>d(void 0,null,function*(){yield t().reloadContacts()}))}const s=D(me,"chats"),c=yield K(s),u=[];c.forEach(e=>{u.push(a({id:e.id},e.data()))}),e(e=>{e.chats=u}),$(s,n=>d(void 0,null,function*(){const i=[];n.forEach(e=>{i.push(a({id:e.id},e.data()))}),e(e=>{e.chats=i}),t().user&&(yield t().reloadContacts())}))}catch(n){e(e=>{e.users=[{uid:"user1",displayName:"Alice Cyber",email:"alice@cyberpunk.com",photoURL:null},{uid:"user2",displayName:"Bob Neon",email:"bob@cyberpunk.com",photoURL:null},{uid:"user3",displayName:"Charlie Matrix",email:"charlie@cyberpunk.com",photoURL:null},{uid:"user4",displayName:"Diana Glitch",email:"diana@cyberpunk.com",photoURL:null}]})}}),addUser:n=>d(void 0,null,function*(){try{const e=t().user;if(n.uid===(null==e?void 0:e.uid))return;yield z(_(me,"users",n.uid),{displayName:n.displayName||"Utilisateur",email:n.email,photoURL:n.photoURL,createdAt:Date.now()})}catch(i){e(e=>{e.users.find(e=>e.uid===n.uid)||e.users.push(c(a({},n),{displayName:n.displayName||"Utilisateur"}))})}}),setContacts:t=>{e(e=>{e.contacts=t})},addContact:n=>d(void 0,null,function*(){try{const e=t().user;if(n.uid===(null==e?void 0:e.uid))return void(window.showError&&window.showError("Vous ne pouvez pas vous ajouter vous-même"));yield z(_(me,"contacts",`${n.uid}_${Date.now()}`),{uid:n.uid,displayName:n.displayName||"Utilisateur",email:n.email,photoURL:n.photoURL,addedAt:n.addedAt||Date.now(),addedBy:null==e?void 0:e.uid,autoAdded:n.autoAdded||!1}),window.showContactAdded&&window.showContactAdded(n.displayName)}catch(i){window.showError&&window.showError("Erreur lors de l'ajout du contact"),e(e=>{e.contacts.find(e=>e.uid===n.uid)||e.contacts.push(c(a({},n),{autoAdded:n.autoAdded||!1}))})}}),removeContact:t=>d(void 0,null,function*(){try{const e=D(me,"contacts"),n=R(e,L("uid","==",t));(yield K(n)).forEach(e=>d(void 0,null,function*(){yield M(e.ref)}))}catch(n){e(e=>{e.contacts=e.contacts.filter(e=>e.uid!==t)})}}),setSearchResults:t=>{e(e=>{e.searchResults=t})},clearSearchResults:()=>{e(e=>{e.searchResults=[]})},createChat:t=>d(void 0,null,function*(){try{return(yield F(D(me,"chats"),{participants:t,createdAt:Date.now(),lastMessage:null,unreadCount:0})).id}catch(n){const i=`chat_${Date.now()}`;return e(e=>{const n={id:i,participants:t,createdAt:Date.now(),lastMessage:null,unreadCount:0};e.chats.unshift(n)}),i}}),setTheme:t=>{e(e=>{e.theme=t,document.documentElement.setAttribute("data-theme",t)})},toggleSidebar:()=>{e(e=>{e.sidebarOpen=!e.sidebarOpen})},toggleMobileMenu:()=>{e(e=>{e.mobileMenuOpen=!e.mobileMenuOpen})},setChats:t=>{e(e=>{e.chats=t})},addChat:t=>{e(e=>{e.chats.unshift(t)})},updateChat:(t,n)=>{e(e=>{const i=e.chats.findIndex(e=>e.id===t);-1!==i&&(e.chats[i]=a(a({},e.chats[i]),n))})},removeChat:t=>{e(e=>{e.chats=e.chats.filter(e=>e.id!==t)})},setActiveChat:t=>{e(e=>{e.activeChat=t})},setUnreadCount:t=>{e(e=>{e.unreadCount=t})},addMessage:(n,i)=>d(void 0,null,function*(){try{const e={content:i.content,senderId:i.senderId,timestamp:i.timestamp,type:i.type||"text",status:"sent",edited:!1,replyTo:i.replyTo||null,attachments:i.attachments||[],reactions:i.reactions||[]};yield F(D(me,"chats",n,"messages"),e),window.showMessageSent&&window.showMessageSent();const o=t().user,r=t().chats.find(e=>e.id===n);r&&o&&r.participants.filter(e=>e!==o.uid).forEach(e=>d(void 0,null,function*(){yield t().autoAddToContacts(e,n)}))}catch(o){e(e=>{e.messages[n]||(e.messages[n]=[]),e.messages[n].push(c(a({},i),{status:"sent",edited:!1,replyTo:i.replyTo||null,attachments:i.attachments||[],reactions:i.reactions||[]}));const t=e.chats.findIndex(e=>e.id===n);-1!==t&&(e.chats[t].lastMessage=i,e.chats[t].lastMessageTime=i.timestamp,e.chats[t].unreadCount=(e.chats[t].unreadCount||0)+1)})}}),reloadContacts:()=>d(void 0,null,function*(){try{const n=t().user;if(!n)return;const i=D(me,"contacts"),o=R(i,L("addedBy","==",n.uid)),r=yield K(o),s=[];r.forEach(e=>{s.push({uid:e.data().uid,displayName:e.data().displayName||"Utilisateur",email:e.data().email,photoURL:e.data().photoURL,addedAt:e.data().addedAt,autoAdded:e.data().autoAdded||!1,source:"explicit"})});const c=D(me,"chats"),d=R(c,L("participants","array-contains",n.uid)),u=yield K(d),l=[],f=D(me,"users"),p=yield K(f),h=new Map;p.forEach(e=>{h.set(e.id,a({uid:e.id},e.data()))}),u.forEach(e=>{const t=e.data(),i=t.participants.find(e=>e!==n.uid);if(i&&h.has(i)){const n=h.get(i);l.push({uid:i,displayName:n.displayName||"Utilisateur",email:n.email,photoURL:n.photoURL,addedAt:t.createdAt||Date.now(),autoAdded:!1,source:"chat",chatId:e.id})}});const m=[...s,...l].reduce((e,t)=>{const n=e.find(e=>e.uid===t.uid);return n&&"explicit"!==t.source||(n&&(e=e.filter(e=>e.uid!==t.uid)),e.push(t)),e},[]);e(e=>{e.contacts=m})}catch(n){}}),autoAddToContacts:(e,n)=>d(void 0,null,function*(){try{const n=t().user;if(!n||e===n.uid)return;if(t().contacts.find(t=>t.uid===e))return;const i=yield K(R(D(me,"users"),L("uid","==",e)));if(!i.empty){const t=i.docs[0].data();yield z(_(me,"contacts",`${e}_${Date.now()}`),{uid:e,displayName:t.displayName||"Utilisateur",email:t.email,photoURL:t.photoURL,addedAt:Date.now(),addedBy:n.uid,autoAdded:!0}),window.showContactAutoAdded&&window.showContactAutoAdded(t.displayName)}}catch(n){window.showError&&window.showError("Erreur lors de l'ajout automatique aux contacts")}}),loadChatMessages:n=>d(void 0,null,function*(){try{const i=D(me,"chats",n,"messages"),o=R(i,q("timestamp","asc")),r=yield K(o),s=[];r.forEach(e=>{s.push(a({id:e.id},e.data()))}),e(e=>{e.messages[n]=s}),$(o,i=>{const o=[];i.forEach(e=>{o.push(a({id:e.id},e.data()))}),e(e=>{e.messages[n]=o});const r=t().user;if(r&&o.length>0){const e=o[o.length-1];e.senderId!==r.uid&&t().autoAddToContacts(e.senderId,n).catch(e=>{})}})}catch(i){}}),markMessagesAsRead:t=>d(void 0,null,function*(){try{const n=D(me,"chats",t,"messages"),i=R(n,L("status","==","delivered")),o=yield K(i),r=U(me);o.forEach(e=>{r.update(e.ref,{status:"read"})}),yield r.commit(),e(e=>{e.messages[t]&&e.messages[t].forEach(e=>{"delivered"===e.status&&(e.status="read")});const n=e.chats.findIndex(e=>e.id===t);-1!==n&&(e.chats[n].unreadCount=0)})}catch(n){}}),editMessage:(t,n,i)=>d(void 0,null,function*(){try{const e=_(me,"chats",t,"messages",n);yield P(e,{content:i,edited:!0,editedAt:Date.now()})}catch(o){e(e=>{if(e.messages[t]){const o=e.messages[t].findIndex(e=>e.id===n);-1!==o&&(e.messages[t][o].content=i,e.messages[t][o].edited=!0,e.messages[t][o].editedAt=Date.now())}})}}),deleteMessage:(t,n)=>d(void 0,null,function*(){try{yield M(_(me,"chats",t,"messages",n))}catch(i){e(e=>{e.messages[t]&&(e.messages[t]=e.messages[t].filter(e=>e.id!==n))})}}),addReaction:(t,n,i)=>d(void 0,null,function*(){try{const e=_(me,"chats",t,"messages",n);yield P(e,{[`reactions.${i.userId}`]:i.emoji})}catch(o){e(e=>{if(e.messages[t]){const o=e.messages[t].findIndex(e=>e.id===n);-1!==o&&(e.messages[t][o].reactions||(e.messages[t][o].reactions={}),e.messages[t][o].reactions[i.userId]=i.emoji)}})}}),updateMessage:(t,n,i)=>{e(e=>{if(e.messages[t]){const o=e.messages[t].findIndex(e=>e.id===n);-1!==o&&(e.messages[t][o]=a(a({},e.messages[t][o]),i))}})},removeMessage:(t,n)=>{e(e=>{e.messages[t]&&(e.messages[t]=e.messages[t].filter(e=>e.id!==n))})},setMessages:(t,n)=>{e(e=>{e.messages[t]=n})},addNotification:t=>{e(e=>{e.notifications.unshift(a({id:Date.now(),timestamp:Date.now()},t)),e.notifications.length>50&&(e.notifications=e.notifications.slice(0,50))})},removeNotification:t=>{e(e=>{e.notifications=e.notifications.filter(e=>e.id!==t)})},clearNotifications:()=>{e(e=>{e.notifications=[]})},updateNotificationSettings:t=>{e(e=>{e.notificationSettings=a(a({},e.notificationSettings),t)})},setPerformance:t=>{e(e=>{e.performance=a(a({},e.performance),t)})},setDeviceInfo:t=>{e(e=>{e.deviceInfo=a(a({},e.deviceInfo),t)})},addError:t=>{e(e=>{e.errors.unshift({id:Date.now(),message:t.message,stack:t.stack,timestamp:Date.now()}),e.errors.length>10&&(e.errors=e.errors.slice(0,10))})},clearErrors:()=>{e(e=>{e.errors=[]})},clearChatData:()=>{e(e=>{e.chats=[],e.messages={},e.activeChat=null,e.unreadCount=0})},logout:()=>{e(e=>{e.user=null,e.isAuthenticated=!1,e.chats=[],e.messages={},e.activeChat=null,e.unreadCount=0,e.notifications=[],e.errors=[]})},initializeApp:()=>d(void 0,null,function*(){try{const n=localStorage.getItem("theme")||"dark";e(e=>{e.theme=n});const i=localStorage.getItem("user");if(i)try{const t=JSON.parse(i);e(e=>{e.user=t,e.isAuthenticated=!!t})}catch(t){localStorage.removeItem("user")}return!0}catch(t){return!1}})})),"getStorage"in(ve={name:"cirus-chat-store",storage:ce(()=>localStorage),partialize:e=>({theme:e.theme,notificationSettings:e.notificationSettings})})||"serialize"in ve||"deserialize"in ve?((e,t)=>(n,i,o)=>{let r=a({getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:e=>e,version:0,merge:(e,t)=>a(a({},t),e)},t),s=!1;const c=new Set,d=new Set;let u;try{u=r.getStorage()}catch(y){}if(!u)return e((...e)=>{n(...e)},i,o);const l=de(r.serialize),f=()=>{const e=r.partialize(a({},i()));let t;const n=l({state:e,version:r.version}).then(e=>u.setItem(r.name,e)).catch(e=>{t=e});if(t)throw t;return n},p=o.setState;o.setState=(e,t)=>{p(e,t),f()};const h=e((...e)=>{n(...e),f()},i,o);let m;const g=()=>{var e;if(!u)return;s=!1,c.forEach(e=>e(i()));const t=(null==(e=r.onRehydrateStorage)?void 0:e.call(r,i()))||void 0;return de(u.getItem.bind(u))(r.name).then(e=>{if(e)return r.deserialize(e)}).then(e=>{if(e){if("number"!=typeof e.version||e.version===r.version)return e.state;if(r.migrate)return r.migrate(e.state,e.version)}}).then(e=>{var t;return m=r.merge(e,null!=(t=i())?t:h),n(m,!0),f()}).then(()=>{null==t||t(m,void 0),s=!0,d.forEach(e=>e(m))}).catch(e=>{null==t||t(void 0,e)})};return o.persist={setOptions:e=>{r=a(a({},r),e),e.getStorage&&(u=e.getStorage())},clearStorage:()=>{null==u||u.removeItem(r.name)},getOptions:()=>r,rehydrate:()=>g(),hasHydrated:()=>s,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(d.add(e),()=>{d.delete(e)})},g(),m||h})(ye,ve):((e,t)=>(n,i,o)=>{let r=a({storage:ce(()=>localStorage),partialize:e=>e,version:0,merge:(e,t)=>a(a({},t),e)},t),s=!1;const c=new Set,d=new Set;let u=r.storage;if(!u)return e((...e)=>{n(...e)},i,o);const l=()=>{const e=r.partialize(a({},i()));return u.setItem(r.name,{state:e,version:r.version})},f=o.setState;o.setState=(e,t)=>{f(e,t),l()};const p=e((...e)=>{n(...e),l()},i,o);let h;o.getInitialState=()=>p;const m=()=>{var e,t;if(!u)return;s=!1,c.forEach(e=>{var t;return e(null!=(t=i())?t:p)});const o=(null==(t=r.onRehydrateStorage)?void 0:t.call(r,null!=(e=i())?e:p))||void 0;return de(u.getItem.bind(u))(r.name).then(e=>{if(e){if("number"!=typeof e.version||e.version===r.version)return[!1,e.state];if(r.migrate)return[!0,r.migrate(e.state,e.version)]}return[!1,void 0]}).then(e=>{var t;const[o,s]=e;if(h=r.merge(s,null!=(t=i())?t:p),n(h,!0),o)return l()}).then(()=>{null==o||o(h,void 0),h=i(),s=!0,d.forEach(e=>e(h))}).catch(e=>{null==o||o(void 0,e)})};return o.persist={setOptions:e=>{r=a(a({},r),e),e.storage&&(u=e.storage)},clearStorage:()=>{null==u||u.removeItem(r.name)},getOptions:()=>r,rehydrate:()=>m(),hasHydrated:()=>s,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(d.add(e),()=>{d.delete(e)})},r.skipHydration||m(),h||p})(ye,ve))));var ye,ve;k(ae(se((e,t)=>({metrics:{fps:0,memory:0,domNodes:0,loadTime:0,renderTime:0},setMetrics:t=>{e(e=>{e.metrics=a(a({},e.metrics),t)})},updateFPS:t=>{e(e=>{e.metrics.fps=t})},updateMemory:t=>{e(e=>{e.metrics.memory=t})},updateDOMNodes:t=>{e(e=>{e.metrics.domNodes=t})},updateLoadTime:t=>{e(e=>{e.metrics.loadTime=t})},updateRenderTime:t=>{e(e=>{e.metrics.renderTime=t})},resetMetrics:()=>{e(e=>{e.metrics={fps:0,memory:0,domNodes:0,loadTime:0,renderTime:0}})}})))),k(ae(se((e,t)=>({securityStatus:{blocked:!1,reason:null,attempts:0,lastAttempt:0},setSecurityStatus:t=>{e(e=>{e.securityStatus=a(a({},e.securityStatus),t)})},incrementAttempts:()=>{e(e=>{e.securityStatus.attempts+=1,e.securityStatus.lastAttempt=Date.now()})},resetAttempts:()=>{e(e=>{e.securityStatus.attempts=0,e.securityStatus.lastAttempt=0})},blockUser:t=>{e(e=>{e.securityStatus.blocked=!0,e.securityStatus.reason=t})},unblockUser:()=>{e(e=>{e.securityStatus.blocked=!1,e.securityStatus.reason=null})}}))));var we={exports:{}},be={},Se=l,ke=Symbol.for("react.element"),Ie=Symbol.for("react.fragment"),je=Object.prototype.hasOwnProperty,Te=Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ce={key:!0,ref:!0,__self:!0,__source:!0};function Ae(e,t,n){var i,o={},r=null,s=null;for(i in void 0!==n&&(r=""+n),void 0!==t.key&&(r=""+t.key),void 0!==t.ref&&(s=t.ref),t)je.call(t,i)&&!Ce.hasOwnProperty(i)&&(o[i]=t[i]);if(e&&e.defaultProps)for(i in t=e.defaultProps)void 0===o[i]&&(o[i]=t[i]);return{$$typeof:ke,type:e,key:r,ref:s,props:o,_owner:Te.current}}be.Fragment=Ie,be.jsx=Ae,be.jsxs=Ae,we.exports=be;var xe=we.exports;const Ee=l.createContext(),Oe=({children:e})=>{const t=(e,t="default")=>{switch(t){case"success":w.success(e,{duration:4e3,style:{background:"#00d4ff",color:"#000",border:"1px solid #00d4ff",borderRadius:"8px",fontSize:"14px",fontWeight:"500"}});break;case"error":w.error(e,{duration:5e3,style:{background:"#ff4757",color:"#fff",border:"1px solid #ff4757",borderRadius:"8px",fontSize:"14px",fontWeight:"500"}});break;case"loading":w.loading(e,{style:{background:"#ffa502",color:"#000",border:"1px solid #ffa502",borderRadius:"8px",fontSize:"14px",fontWeight:"500"}});break;case"info":w(e,{duration:3e3,style:{background:"#3742fa",color:"#fff",border:"1px solid #3742fa",borderRadius:"8px",fontSize:"14px",fontWeight:"500"}});break;case"auto-added":w.success(e,{duration:6e3,icon:"✨",style:{background:"linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",color:"#fff",border:"1px solid #ff6b35",borderRadius:"8px",fontSize:"14px",fontWeight:"500",boxShadow:"0 4px 12px rgba(255, 107, 53, 0.3)"}});break;default:w(e,{duration:3e3,style:{background:"#2f3542",color:"#fff",border:"1px solid #2f3542",borderRadius:"8px",fontSize:"14px",fontWeight:"500"}})}},n={showToast:t,showContactAdded:e=>{t(`✅ ${e} ajouté à vos contacts`,"success")},showContactAutoAdded:e=>{t(`✨ ${e} ajouté automatiquement à vos contacts`,"auto-added")},showMessageSent:()=>{t("📤 Message envoyé","success")},showMessageReceived:e=>{t(`📥 Nouveau message de ${e}`,"info")},showError:e=>{t(`❌ ${e}`,"error")},showLoading:e=>{t(e,"loading")}};return xe.jsx(Ee.Provider,{value:n,children:e})},Ne=()=>{const{showContactAdded:e,showContactAutoAdded:t,showMessageSent:n,showMessageReceived:i,showError:o,showLoading:r,showToast:s}=(()=>{const e=l.useContext(Ee);if(!e)throw new Error("useToast must be used within a ToastProvider");return e})();return l.useEffect(()=>(window.showContactAdded=e,window.showContactAutoAdded=t,window.showMessageSent=n,window.showMessageReceived=i,window.showError=o,window.showLoading=r,window.showToast=s,()=>{delete window.showContactAdded,delete window.showContactAutoAdded,delete window.showMessageSent,delete window.showMessageReceived,delete window.showError,delete window.showLoading,delete window.showToast}),[e,t,n,i,o,r,s]),null},_e="@firebase/installations",Pe="0.6.9",Me=`w:${Pe}`,De="FIS_v2",Re=new J("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function Le(e){return e instanceof Y&&e.code.includes("request-failed")}
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
 */function Ke({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function Ue(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}function qe(e,t){return d(this,null,function*(){const n=(yield t.json()).error;return Re.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})})}function $e({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function ze(e){return d(this,null,function*(){const t=yield e();return t.status>=500&&t.status<600?e():t})}
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
function Fe(e){return new Promise(t=>{setTimeout(t,e)})}
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
const Be=/^[cdef][\w-]{21}$/;function He(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){var t;return(t=e,btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22)}
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
 */(e);return Be.test(t)?t:""}catch(e){return""}}function We(e){return`${e.appName}!${e.appId}`}
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
 */const Ve=new Map;function Je(e,t){const n=We(e);Ge(n,t),function(e,t){const n=(!Ye&&"BroadcastChannel"in self&&(Ye=new BroadcastChannel("[Firebase] FID Change"),Ye.onmessage=e=>{Ge(e.data.key,e.data.fid)}),Ye);n&&n.postMessage({key:e,fid:t}),0===Ve.size&&Ye&&(Ye.close(),Ye=null)}(n,t)}function Ge(e,t){const n=Ve.get(e);if(n)for(const i of n)i(t)}let Ye=null;
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
const Qe="firebase-installations-store";let Xe=null;function Ze(){return Xe||(Xe=G("firebase-installations-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(Qe)}})),Xe}function et(e,t){return d(this,null,function*(){const n=We(e),i=(yield Ze()).transaction(Qe,"readwrite"),o=i.objectStore(Qe),r=yield o.get(n);return yield o.put(t,n),yield i.done,r&&r.fid===t.fid||Je(e,t.fid),t})}function tt(e){return d(this,null,function*(){const t=We(e),n=(yield Ze()).transaction(Qe,"readwrite");yield n.objectStore(Qe).delete(t),yield n.done})}function nt(e,t){return d(this,null,function*(){const n=We(e),i=(yield Ze()).transaction(Qe,"readwrite"),o=i.objectStore(Qe),r=yield o.get(n),s=t(r);return void 0===s?yield o.delete(n):yield o.put(s,n),yield i.done,!s||r&&r.fid===s.fid||Je(e,s.fid),s})}
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
 */function it(e){return d(this,null,function*(){let t;const n=yield nt(e.appConfig,n=>{const i=function(e){return st(e||{fid:He(),registrationStatus:0})}(n),o=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(Re.create("app-offline"))};const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=function(e,t){return d(this,null,function*(){try{const n=
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
 */yield function(e,t){return d(this,arguments,function*({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const i=Ke(e),o=$e(e),r=t.getImmediate({optional:!0});if(r){const e=yield r.getHeartbeatsHeader();e&&o.append("x-firebase-client",e)}const s={fid:n,authVersion:De,appId:e.appId,sdkVersion:Me},a={method:"POST",headers:o,body:JSON.stringify(s)},c=yield ze(()=>fetch(i,a));if(c.ok){const e=yield c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:Ue(e.authToken)}}throw yield qe("Create Installation",c)})}(e,t);return et(e.appConfig,n)}catch(n){throw Le(n)&&409===n.customData.serverCode?yield tt(e.appConfig):yield et(e.appConfig,{fid:t.fid,registrationStatus:0}),n}})}(e,n);return{installationEntry:n,registrationPromise:i}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:ot(e)}:{installationEntry:t}}(e,i);return t=o.registrationPromise,o.installationEntry});return""===n.fid?{installationEntry:yield t}:{installationEntry:n,registrationPromise:t}})}function ot(e){return d(this,null,function*(){let t=yield rt(e.appConfig);for(;1===t.registrationStatus;)yield Fe(100),t=yield rt(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=yield it(e);return n||t}return t})}function rt(e){return nt(e,e=>{if(!e)throw Re.create("installation-not-found");return st(e)})}function st(e){return 1===(t=e).registrationStatus&&t.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
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
 */}function at(e,t){return d(this,arguments,function*({appConfig:e,heartbeatServiceProvider:t},n){const i=function(e,{fid:t}){return`${Ke(e)}/${t}/authTokens:generate`}
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
 */(e,n),o=function(e,{refreshToken:t}){const n=$e(e);return n.append("Authorization",function(e){return`${De} ${e}`}(t)),n}(e,n),r=t.getImmediate({optional:!0});if(r){const e=yield r.getHeartbeatsHeader();e&&o.append("x-firebase-client",e)}const s={installation:{sdkVersion:Me,appId:e.appId}},a={method:"POST",headers:o,body:JSON.stringify(s)},c=yield ze(()=>fetch(i,a));if(c.ok)return Ue(yield c.json());throw yield qe("Generate Auth Token",c)})}function ct(e,t=!1){return d(this,null,function*(){let n;const i=yield nt(e.appConfig,i=>{if(!ut(i))throw Re.create("not-registered");const o=i.authToken;if(!t&&(2===(r=o).requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(r)))return i;var r;if(1===o.requestStatus)return n=function(e,t){return d(this,null,function*(){let n=yield dt(e.appConfig);for(;1===n.authToken.requestStatus;)yield Fe(100),n=yield dt(e.appConfig);const i=n.authToken;return 0===i.requestStatus?ct(e,t):i})}(e,t),i;{if(!navigator.onLine)throw Re.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(i);return n=function(e,t){return d(this,null,function*(){try{const n=yield at(e,t),i=Object.assign(Object.assign({},t),{authToken:n});return yield et(e.appConfig,i),n}catch(n){if(!Le(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});yield et(e.appConfig,n)}else yield tt(e.appConfig);throw n}})}(e,t),t}});return n?yield n:i.authToken})}function dt(e){return nt(e,e=>{if(!ut(e))throw Re.create("not-registered");return 1===(t=e.authToken).requestStatus&&t.requestTime+1e4<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e;var t;
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
 */})}function ut(e){return void 0!==e&&2===e.registrationStatus}function lt(e){return Re.create("missing-app-config-values",{valueName:e})}
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
 */const ft="installations";H(new W(ft,e=>{const t=e.getProvider("app").getImmediate(),n=
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
function(e){if(!e||!e.options)throw lt("App Configuration");if(!e.name)throw lt("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw lt(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:V(t,"heartbeat"),_delete:()=>Promise.resolve()}},"PUBLIC")),H(new W("installations-internal",e=>{const t=e.getProvider("app").getImmediate(),n=V(t,ft).getImmediate();return{getId:()=>function(e){return d(this,null,function*(){const t=e,{installationEntry:n,registrationPromise:i}=yield it(t);return i?i.catch(console.error):ct(t).catch(console.error),n.fid})}
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
 */(n),getToken:e=>function(e,t=!1){return d(this,null,function*(){const n=e;return yield function(e){return d(this,null,function*(){const{registrationPromise:t}=yield it(e);t&&(yield t)})}(n),(yield ct(n,t)).token})}(n,e)}},"PRIVATE")),B(_e,Pe),B(_e,Pe,"esm2017");
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
const pt="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",ht="google.c.a.c_id";var mt,gt,yt;
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
function vt(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function wt(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),i=new Uint8Array(n.length);for(let o=0;o<n.length;++o)i[o]=n.charCodeAt(o);return i}
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
 */(gt=mt||(mt={}))[gt.DATA_MESSAGE=1]="DATA_MESSAGE",gt[gt.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION",function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(yt||(yt={}));const bt="fcm_token_details_db",St="fcm_token_object_Store",kt="firebase-messaging-store";let It=null;function jt(){return It||(It=G("firebase-messaging-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(kt)}})),It}function Tt(e,t){return d(this,null,function*(){const n=Ct(e),i=(yield jt()).transaction(kt,"readwrite");return yield i.objectStore(kt).put(t,n),yield i.done,t})}function Ct({appConfig:e}){return e.appId}
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
 */const At=new J("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});function xt({projectId:e}){return`https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`}function Et(e){return d(this,arguments,function*({appConfig:e,installations:t}){const n=yield t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})})}function Ot({p256dh:e,auth:t,endpoint:n,vapidKey:i}){const o={web:{endpoint:n,auth:t,p256dh:e}};return i!==pt&&(o.web.applicationPubKey=i),o}
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
 */function Nt(e){return d(this,null,function*(){const t=yield function(e,t){return d(this,null,function*(){return(yield e.pushManager.getSubscription())||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:wt(t)})})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:vt(t.getKey("auth")),p256dh:vt(t.getKey("p256dh"))},i=yield function(e){return d(this,null,function*(){const t=Ct(e),n=yield jt(),i=yield n.transaction(kt).objectStore(kt).get(t);if(i)return i;{const t=yield function(e){return d(this,null,function*(){if("databases"in indexedDB&&!(yield indexedDB.databases()).map(e=>e.name).includes(bt))return null;let t=null;return(yield G(bt,5,{upgrade:(n,i,o,r)=>d(this,null,function*(){var o;if(i<2)return;if(!n.objectStoreNames.contains(St))return;const s=r.objectStore(St),a=yield s.index("fcmSenderId").get(e);if(yield s.clear(),a)if(2===i){const e=a;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:null!==(o=e.createTime)&&void 0!==o?o:Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:vt(e.vapidKey)}}}else if(3===i){const e=a;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:vt(e.auth),p256dh:vt(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:vt(e.vapidKey)}}}else if(4===i){const e=a;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:vt(e.auth),p256dh:vt(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:vt(e.vapidKey)}}}})})).close(),yield Q(bt),yield Q("fcm_vapid_details_db"),yield Q("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}
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
 */(t)?t:null})}(e.appConfig.senderId);if(t)return yield Tt(e,t),t}})}(e.firebaseDependencies);if(i){if(function(e,t){const n=t.vapidKey===e.vapidKey,i=t.endpoint===e.endpoint,o=t.auth===e.auth,r=t.p256dh===e.p256dh;return n&&i&&o&&r}
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
 */(i.subscriptionOptions,n))return Date.now()>=i.createTime+6048e5?function(e,t){return d(this,null,function*(){try{const n=yield function(e,t){return d(this,null,function*(){const n=yield Et(e),i=Ot(t.subscriptionOptions),o={method:"PATCH",headers:n,body:JSON.stringify(i)};let r;try{const n=yield fetch(`${xt(e.appConfig)}/${t.token}`,o);r=yield n.json()}catch(s){throw At.create("token-update-failed",{errorInfo:null==s?void 0:s.toString()})}if(r.error){const e=r.error.message;throw At.create("token-update-failed",{errorInfo:e})}if(!r.token)throw At.create("token-update-no-token");return r.token})}(e.firebaseDependencies,t),i=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return yield Tt(e.firebaseDependencies,i),n}catch(n){throw n}})}(e,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{yield function(e,t){return d(this,null,function*(){const n={method:"DELETE",headers:yield Et(e)};try{const i=yield fetch(`${xt(e.appConfig)}/${t}`,n),o=yield i.json();if(o.error){const e=o.error.message;throw At.create("token-unsubscribe-failed",{errorInfo:e})}}catch(i){throw At.create("token-unsubscribe-failed",{errorInfo:null==i?void 0:i.toString()})}})}(e.firebaseDependencies,i.token)}catch(o){}return _t(e.firebaseDependencies,n)}return _t(e.firebaseDependencies,n)})}function _t(e,t){return d(this,null,function*(){const n=
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
 */yield function(e,t){return d(this,null,function*(){const n=yield Et(e),i=Ot(t),o={method:"POST",headers:n,body:JSON.stringify(i)};let r;try{const t=yield fetch(xt(e.appConfig),o);r=yield t.json()}catch(s){throw At.create("token-subscribe-failed",{errorInfo:null==s?void 0:s.toString()})}if(r.error){const e=r.error.message;throw At.create("token-subscribe-failed",{errorInfo:e})}if(!r.token)throw At.create("token-subscribe-no-token");return r.token})}(e,t),i={token:n,createTime:Date.now(),subscriptionOptions:t};return yield Tt(e,i),i.token})}function Pt(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const i=t.notification.body;i&&(e.notification.body=i);const o=t.notification.image;o&&(e.notification.image=o);const r=t.notification.icon;r&&(e.notification.icon=r)}(t,e),function(e,t){t.data&&(e.data=t.data)}(t,e),function(e,t){var n,i,o,r,s;if(!t.fcmOptions&&!(null===(n=t.notification)||void 0===n?void 0:n.click_action))return;e.fcmOptions={};const a=null!==(o=null===(i=t.fcmOptions)||void 0===i?void 0:i.link)&&void 0!==o?o:null===(r=t.notification)||void 0===r?void 0:r.click_action;a&&(e.fcmOptions.link=a);const c=null===(s=t.fcmOptions)||void 0===s?void 0:s.analytics_label;c&&(e.fcmOptions.analyticsLabel=c)}
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
 */(t,e),t}function Mt(e){return At.create("missing-app-config-values",{valueName:e})}
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
 */class Dt{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=
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
function(e){if(!e||!e.options)throw Mt("App Configuration Object");if(!e.name)throw Mt("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const i of t)if(!n[i])throw Mt(i);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:i,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}
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
function Rt(e,t){return d(this,null,function*(){if(!navigator)throw At.create("only-available-in-window");if("default"===Notification.permission&&(yield Notification.requestPermission()),"granted"!==Notification.permission)throw At.create("permission-blocked");
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
return yield function(e,t){return d(this,null,function*(){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=pt)})}(e,null==t?void 0:t.vapidKey),
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
 */yield function(e,t){return d(this,null,function*(){if(t||e.swRegistration||(yield function(e){return d(this,null,function*(){try{e.swRegistration=yield navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}),e.swRegistration.update().catch(()=>{})}catch(t){throw At.create("failed-service-worker-registration",{browserErrorMessage:null==t?void 0:t.message})}})}(e)),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw At.create("invalid-sw-registration");e.swRegistration=t}})}(e,null==t?void 0:t.serviceWorkerRegistration),Nt(e)})}
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
function Lt(e,t){return d(this,null,function*(){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===yt.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(Pt(n)):e.onMessageHandler.next(Pt(n)));const i=n.data;var o;"object"==typeof(o=i)&&o&&ht in o&&"1"===i["google.c.a.e"]&&(yield function(e,t,n){return d(this,null,function*(){const i=function(e){switch(e){case yt.NOTIFICATION_CLICKED:return"notification_open";case yt.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}(t);(yield e.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n[ht],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})})}(e,n.messageType,i))})}const Kt="@firebase/messaging",Ut="0.12.12";
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
function qt(){return d(this,null,function*(){try{yield X()}catch(e){return!1}return"undefined"!=typeof window&&Z()&&ee()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")})}
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
 */H(new W("messaging",e=>{const t=new Dt(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",e=>Lt(t,e)),t},"PUBLIC")),H(new W("messaging-internal",e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:e=>Rt(t,e)}},"PRIVATE")),B(Kt,Ut),B(Kt,Ut,"esm2017");const $t=e=>d(void 0,null,function*(){var e,t;if(!(yield qt()))return null;if("serviceWorker"in navigator){const t=yield navigator.serviceWorker.register("/firebase-messaging-sw.js");try{const n={apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0};Object.values(n).every(Boolean)&&(null==(e=t.active)||e.postMessage({type:"FIREBASE_CONFIG",payload:n}))}catch(i){}}const n=
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
function(e=T()){return qt().then(e=>{if(!e)throw At.create("unsupported-browser")},e=>{throw At.create("indexed-db-unsupported")}),V(te(e),"messaging").getImmediate()}(fe);try{const e="undefined"!=typeof globalThis&&"Notification"in globalThis&&"function"==typeof(null==(t=globalThis.Notification)?void 0:t.requestPermission);if("granted"!==(yield e?globalThis.Notification.requestPermission():Promise.resolve("denied")))return null;const i=yield function(e,t){return d(this,null,function*(){return Rt(e=te(e),t)})}(n,{vapidKey:void 0});return function(e,t){(function(e,t){if(!navigator)throw At.create("only-available-in-window");e.onMessageHandler=t})(e=te(e),t)}(n,e=>{}),i}catch(i){return null}});let zt=null;const Ft="sound_enabled";function Bt({frequency:e=440,durationMs:t=120,type:n="sine",gain:i=.03}){const o=function(){if(!zt){const e=window.AudioContext||window.webkitAudioContext;if(!e)return null;zt=new e}return"suspended"===zt.state&&zt.resume().catch(()=>{}),zt}();if(!o)return;const r=o.createOscillator(),s=o.createGain();r.type=n,r.frequency.setValueAtTime(e,o.currentTime),s.gain.setValueAtTime(i,o.currentTime),s.gain.exponentialRampToValueAtTime(1e-4,o.currentTime+t/1e3),r.connect(s).connect(o.destination),r.start(),r.stop(o.currentTime+t/1e3)}function Ht(){try{return"0"!==localStorage.getItem(Ft)}catch(e){return!0}}function Wt(e){if(Ht())switch(e){case"send":Bt({frequency:440,durationMs:80,type:"triangle",gain:.025}),setTimeout(()=>Bt({frequency:660,durationMs:80,type:"triangle",gain:.02}),60);break;case"receive":Bt({frequency:660,durationMs:90,type:"sine",gain:.02}),setTimeout(()=>Bt({frequency:420,durationMs:120,type:"sine",gain:.02}),70);break;case"reaction":Bt({frequency:880,durationMs:70,type:"square",gain:.02})}}const Vt=()=>{const{setTheme:e}=ge(),t=l.useMemo(()=>{try{return localStorage.getItem("theme")||"dark"}catch(e){return"dark"}},[]);return xe.jsx("header",{className:"topbar",children:xe.jsxs("div",{className:"topbar__inner",children:[xe.jsxs("div",{className:"brand",children:[xe.jsx("span",{className:"brand__dot"}),xe.jsx("span",{className:"brand__name",children:"CirusChat"})]}),xe.jsxs("nav",{className:"nav",children:[xe.jsxs("a",{className:"nav__link",href:"#",children:[xe.jsx("i",{className:"fas fa-comments"})," Chat"]}),xe.jsxs("a",{className:"nav__link",href:"#",children:[xe.jsx("i",{className:"fas fa-user"})," Profil"]}),xe.jsxs("a",{className:"nav__link",href:"#",children:[xe.jsx("i",{className:"fas fa-cog"})," Paramètres"]}),xe.jsxs("button",{type:"button",className:"nav__link",onClick:()=>{const n="dark"===(document.documentElement.getAttribute("data-theme")||t)?"light":"dark";try{localStorage.setItem("theme",n)}catch(i){}null==e||e(n),document.documentElement.setAttribute("data-theme",n)},"aria-label":"Basculer le thème",children:[xe.jsx("i",{className:"fas fa-moon"})," Thème"]}),xe.jsxs("button",{id:"sound-toggle",type:"button",className:"nav__link",onClick:()=>{const e=function(){const e=!Ht();return function(e){try{localStorage.setItem(Ft,e?"1":"0")}catch(t){}}(e),e}(),t=document.getElementById("sound-toggle");t&&(t.style.outline=e?"2px solid var(--accent)":"none",setTimeout(()=>{t.style.outline="none"},600))},"aria-label":"Activer/désactiver le son",children:[xe.jsx("i",{className:Ht()?"fas fa-volume-up":"fas fa-volume-mute"})," Son"]})]})]})})};var Jt=Object.defineProperty,Gt=Object.getOwnPropertySymbols,Yt=Object.prototype.hasOwnProperty,Qt=Object.prototype.propertyIsEnumerable,Xt=Math.pow,Zt=(e,t,n)=>t in e?Jt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,en=(e,t)=>{for(var n in t||(t={}))Yt.call(t,n)&&Zt(e,n,t[n]);if(Gt)for(var n of Gt(t))Qt.call(t,n)&&Zt(e,n,t[n]);return e};const tn=l.lazy(()=>re(()=>import("./Auth-DgwcdEmT.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9]))),nn=l.lazy(()=>re(()=>import("./ChatPage-CM3LJUdf.js"),__vite__mapDeps([10,1,11,3,4,5,6,7,8,9,2]))),on=l.lazy(()=>re(()=>import("./ErrorFallback-84H7zsU-.js"),__vite__mapDeps([12,1,3,4,5,6,7,8,9,2]))),rn=l.lazy(()=>re(()=>import("./WelcomeAnimation-BWX1jMPr.js"),__vite__mapDeps([13,1,3,4,5,6,7,8,9,2]))),sn=new g({defaultOptions:{queries:{retry:3,retryDelay:e=>Math.min(1e3*Xt(2,e),3e4),staleTime:3e5,cacheTime:6e5,refetchOnWindowFocus:!1,refetchOnReconnect:!0},mutations:{retry:1,retryDelay:1e3}}}),an=e=>{var t=e,{component:n}=t,i=((e,t)=>{var n={};for(var i in e)Yt.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&Gt)for(var i of Gt(e))t.indexOf(i)<0&&Qt.call(e,i)&&(n[i]=e[i]);return n})(t,["component"]);return xe.jsx(l.Suspense,{fallback:xe.jsxs("div",{className:"loading-container",children:[xe.jsx("div",{className:"loading-spinner"}),xe.jsx("p",{children:"Chargement..."})]}),children:xe.jsx(n,en({},i))})},cn=({children:e})=>{const{isAuthenticated:t}=ge();return t?e:xe.jsx(m,{to:"/login",replace:!0})},dn=({children:e})=>{const{isAuthenticated:t}=ge();return t?xe.jsx(m,{to:"/",replace:!0}):e},un={duration:4e3,position:"top-right",style:{background:"#1a1a1a",color:"#ffffff",border:"1px solid #333333",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.15)"}};function ln(){const{initializeApp:e,setUser:t,setTheme:n,addError:i}=ge(),[o,r]=l.useState(()=>{try{return"1"!==localStorage.getItem("welcome_shown")}catch(e){return!0}});return l.useEffect(()=>{(()=>{return o=this,r=function*(){try{yield e();const i=localStorage.getItem("theme")||"dark";n(i),document.documentElement.setAttribute("data-theme",i);const o=pe.onAuthStateChanged(e=>{if(e){const n={uid:e.uid,email:e.email,displayName:e.displayName||"Utilisateur",photoURL:e.photoURL};t(n),localStorage.setItem("user",JSON.stringify(n)),$t().catch(()=>{})}else t(null),localStorage.removeItem("user")});return()=>o()}catch(o){i(o)}},new Promise((e,t)=>{var n=e=>{try{s(r.next(e))}catch(n){t(n)}},i=e=>{try{s(r.throw(e))}catch(n){t(n)}},s=t=>t.done?e(t.value):Promise.resolve(t.value).then(n,i);s((r=r.apply(o,null)).next())});var o,r})()},[e,n,t,i]),l.useEffect(()=>{const e=e=>{const t=e.error||new Error("Erreur inconnue");i(t)},t=e=>{const t=new Error(e.reason||"Promesse rejetée");i(t)};return window.addEventListener("error",e),window.addEventListener("unhandledrejection",t),()=>{window.removeEventListener("error",e),window.removeEventListener("unhandledrejection",t)}},[i]),xe.jsx(y,{client:sn,children:xe.jsx(v,{FallbackComponent:on,onError:(e,t)=>{i(e)},children:xe.jsxs(Oe,{children:[xe.jsx(Ne,{}),xe.jsx(Vt,{}),o&&xe.jsx(an,{component:()=>xe.jsx(rn,{onComplete:()=>{r(!1);try{localStorage.setItem("welcome_shown","1")}catch(e){}}})}),xe.jsxs("div",{className:"app",children:[xe.jsx(p,{router:l.useMemo(()=>h([{path:"/login",element:xe.jsx(dn,{children:xe.jsx(an,{component:tn})})},{path:"/",element:xe.jsx(cn,{children:xe.jsx(an,{component:nn})})},{path:"*",element:xe.jsx(m,{to:"/",replace:!0})}],{future:{v7_startTransition:!0,v7_relativeSplatPath:!0}}),[])}),xe.jsx(b,en({},un))]})]})})})}ne.createRoot(document.getElementById("root")).render(xe.jsx(f.StrictMode,{children:xe.jsx(ln,{})}));export{pe as a,me as d,he as g,xe as j,Wt as p,ge as u};
