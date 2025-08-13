const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Auth-DQianlMW.js","assets/vendor-Be9Gvr8Z.js","assets/firebase-ChMdDr2b.js","assets/userService-D0VJv4Sa.js","assets/router-hF8yxhrd.js","assets/query-BCFsIYE1.js","assets/virtual-BJqExeNh.js","assets/utils-CkSu2hCt.js","assets/error-BaU7SGNY.js","assets/toast-DAwFn72h.js","assets/state-CH3XQ_Yu.js","assets/Chat-CKhaEU5G.js","assets/css/Chat-Bg_HZIxq.css","assets/ErrorFallback-Bk23SgLI.js","assets/WelcomeAnimation-Hp-9M4H1.js"])))=>i.map(i=>d[i]);
var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,s=(t,n,o)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[n]=o,a=(e,t)=>{for(var n in t||(t={}))i.call(t,n)&&s(e,n,t[n]);if(o)for(var n of o(t))r.call(t,n)&&s(e,n,t[n]);return e},c=(e,o)=>t(e,n(o)),d=(e,t,n)=>new Promise((o,i)=>{var r=e=>{try{a(n.next(e))}catch(t){i(t)}},s=e=>{try{a(n.throw(e))}catch(t){i(t)}},a=e=>e.done?o(e.value):Promise.resolve(e.value).then(r,s);a((n=n.apply(e,t)).next())});import{d as u,r as l,b as f}from"./vendor-Be9Gvr8Z.js";import{R as p,c as h,N as g}from"./router-hF8yxhrd.js";import{Q as m,a as y}from"./query-BCFsIYE1.js";import{E as v}from"./error-BaU7SGNY.js";import{V as w,O as b}from"./toast-DAwFn72h.js";import{p as S,c as k}from"./state-CH3XQ_Yu.js";import{g as I,i as C,a as j,b as T,G as E,c as A,p as O,d as x,e as P,f as _,u as N,h as D,j as M,q as R,w as L,k as K,l as U,o as $,m as q,s as z,n as F,r as B,_ as H,C as W,t as V,E as J,v as G,F as Y,x as Q,y as X,z as Z,A as ee,B as te}from"./firebase-ChMdDr2b.js";import"./virtual-BJqExeNh.js";import"./utils-CkSu2hCt.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)}).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var ne={},oe=u;ne.createRoot=oe.createRoot,ne.hydrateRoot=oe.hydrateRoot;const ie={},re=function(e,t,n){let o=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),n=(null==e?void 0:e.nonce)||(null==e?void 0:e.getAttribute("nonce"));o=Promise.allSettled(t.map(e=>{if((e=function(e){return"/"+e}(e))in ie)return;ie[e]=!0;const t=e.endsWith(".css"),o=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${o}`))return;const i=document.createElement("link");return i.rel=t?"stylesheet":"modulepreload",t||(i.as="script"),i.crossOrigin="",i.href=e,n&&i.setAttribute("nonce",n),document.head.appendChild(i),t?new Promise((t,n)=>{i.addEventListener("load",t),i.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${e}`)))}):void 0}))}function i(e){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(t=>{for(const e of t||[])"rejected"===e.status&&i(e.reason);return e().catch(i)})},se=e=>(t,n,o)=>(o.setState=(e,n,...o)=>{const i="function"==typeof e?S(e):e;return t(i,n,...o)},e(o.setState,n,o)),ae=e=>(t,n,o)=>{const i=o.subscribe;return o.subscribe=(e,t,n)=>{let r=e;if(t){const i=(null==n?void 0:n.equalityFn)||Object.is;let s=e(o.getState());r=n=>{const o=e(n);if(!i(s,o)){const e=s;t(s=o,e)}},(null==n?void 0:n.fireImmediately)&&t(s,s)}return i(r)},e(t,n,o)};function ce(e,t){let n;try{n=e()}catch(o){return}return{getItem:e=>{var t;const o=e=>null===e?null:JSON.parse(e,void 0),i=null!=(t=n.getItem(e))?t:null;return i instanceof Promise?i.then(o):o(i)},setItem:(e,t)=>n.setItem(e,JSON.stringify(t,void 0)),removeItem:e=>n.removeItem(e)}}const de=e=>t=>{try{const n=e(t);return n instanceof Promise?n:{then:e=>de(e)(n),catch(e){return this}}}catch(n){return{then(e){return this},catch:e=>de(e)(n)}}},ue={apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0,measurementId:void 0},le=Object.values({apiKey:ue.apiKey,authDomain:ue.authDomain,projectId:ue.projectId,storageBucket:ue.storageBucket,messagingSenderId:ue.messagingSenderId,appId:ue.appId}).every(Boolean)?ue:{apiKey:"AIzaSyDW3ze_OVVjr5I79e0zqDbvnOUi2YRnPFA",authDomain:"chat-changing.firebaseapp.com",projectId:"chat-changing",storageBucket:"chat-changing.appspot.com",messagingSenderId:"38586122759",appId:"1:38586122759:web:07e8309564df8ce71aa0a2",measurementId:"G-NTW1DN98K3"};let fe;fe=I().length?j():C(le);const pe=T(fe);pe.useDeviceLanguage();const he=new E,ge=A(fe,{localCache:O({tabManager:P()})}),me=x(fe),ye=k(ae((ve=se((e,t)=>({user:null,isAuthenticated:!1,users:[],contacts:[],searchResults:[],theme:"dark",sidebarOpen:!1,mobileMenuOpen:!1,chats:[],activeChat:null,unreadCount:0,messages:{},messageCache:{},notifications:[],notificationSettings:{sound:!0,vibration:!0,desktop:!0},performance:{lastRender:0,memoryUsage:0,networkStatus:"online"},errors:[],deviceInfo:{type:"desktop",orientation:"portrait",breakpoint:"lg",dimensions:{width:0,height:0},isTouch:!1,isRetina:!1,isLowBandwidth:!1},setUser:n=>{e(e=>{e.user=n,e.isAuthenticated=!!n}),n&&t().reloadContacts()},setUsers:t=>{e(e=>{e.users=t})},initializeTestUsers:()=>d(void 0,null,function*(){try{const n=M(ge,"users"),o=yield K(n),i=[];o.forEach(e=>{i.push(a({uid:e.id},e.data()))}),e(e=>{e.users=i}),q(n,t=>{const n=[];t.forEach(e=>{n.push(a({uid:e.id},e.data()))}),e(e=>{e.users=n})});const r=t().user;if(r){yield t().reloadContacts();const e=M(ge,"contacts"),n=R(e,L("addedBy","==",r.uid));q(n,e=>d(void 0,null,function*(){yield t().reloadContacts()}))}const s=M(ge,"chats"),c=yield K(s),u=[];c.forEach(e=>{u.push(a({id:e.id},e.data()))}),e(e=>{e.chats=u}),q(s,n=>d(void 0,null,function*(){const o=[];n.forEach(e=>{o.push(a({id:e.id},e.data()))}),e(e=>{e.chats=o}),t().user&&(yield t().reloadContacts())}))}catch(n){e(e=>{e.users=[{uid:"user1",displayName:"Alice Cyber",email:"alice@cyberpunk.com",photoURL:null},{uid:"user2",displayName:"Bob Neon",email:"bob@cyberpunk.com",photoURL:null},{uid:"user3",displayName:"Charlie Matrix",email:"charlie@cyberpunk.com",photoURL:null},{uid:"user4",displayName:"Diana Glitch",email:"diana@cyberpunk.com",photoURL:null}]})}}),addUser:n=>d(void 0,null,function*(){try{const e=t().user;if(n.uid===(null==e?void 0:e.uid))return;yield z(_(ge,"users",n.uid),{displayName:n.displayName||"Utilisateur",email:n.email,photoURL:n.photoURL,createdAt:Date.now()})}catch(o){e(e=>{e.users.find(e=>e.uid===n.uid)||e.users.push(c(a({},n),{displayName:n.displayName||"Utilisateur"}))})}}),setContacts:t=>{e(e=>{e.contacts=t})},addContact:n=>d(void 0,null,function*(){try{const e=t().user;if(n.uid===(null==e?void 0:e.uid))return void(window.showError&&window.showError("Vous ne pouvez pas vous ajouter vous-même"));yield z(_(ge,"contacts",`${n.uid}_${Date.now()}`),{uid:n.uid,displayName:n.displayName||"Utilisateur",email:n.email,photoURL:n.photoURL,addedAt:n.addedAt||Date.now(),addedBy:null==e?void 0:e.uid,autoAdded:n.autoAdded||!1}),window.showContactAdded&&window.showContactAdded(n.displayName)}catch(o){window.showError&&window.showError("Erreur lors de l'ajout du contact"),e(e=>{e.contacts.find(e=>e.uid===n.uid)||e.contacts.push(c(a({},n),{autoAdded:n.autoAdded||!1}))})}}),removeContact:t=>d(void 0,null,function*(){try{const e=M(ge,"contacts"),n=R(e,L("uid","==",t));(yield K(n)).forEach(e=>d(void 0,null,function*(){yield D(e.ref)}))}catch(n){e(e=>{e.contacts=e.contacts.filter(e=>e.uid!==t)})}}),setSearchResults:t=>{e(e=>{e.searchResults=t})},clearSearchResults:()=>{e(e=>{e.searchResults=[]})},createChat:t=>d(void 0,null,function*(){try{return(yield F(M(ge,"chats"),{participants:t,createdAt:Date.now(),lastMessage:null,unreadCount:0})).id}catch(n){const o=`chat_${Date.now()}`;return e(e=>{const n={id:o,participants:t,createdAt:Date.now(),lastMessage:null,unreadCount:0};e.chats.unshift(n)}),o}}),setTheme:t=>{e(e=>{e.theme=t,document.documentElement.setAttribute("data-theme",t)})},toggleSidebar:()=>{e(e=>{e.sidebarOpen=!e.sidebarOpen})},toggleMobileMenu:()=>{e(e=>{e.mobileMenuOpen=!e.mobileMenuOpen})},setChats:t=>{e(e=>{e.chats=t})},addChat:t=>{e(e=>{e.chats.unshift(t)})},updateChat:(t,n)=>{e(e=>{const o=e.chats.findIndex(e=>e.id===t);-1!==o&&(e.chats[o]=a(a({},e.chats[o]),n))})},removeChat:t=>{e(e=>{e.chats=e.chats.filter(e=>e.id!==t)})},setActiveChat:t=>{e(e=>{e.activeChat=t})},setUnreadCount:t=>{e(e=>{e.unreadCount=t})},addMessage:(n,o)=>d(void 0,null,function*(){try{const e={content:o.content,senderId:o.senderId,timestamp:o.timestamp,type:o.type||"text",status:"sent",edited:!1,replyTo:o.replyTo||null,attachments:o.attachments||[],reactions:o.reactions||[]};yield F(M(ge,"chats",n,"messages"),e),window.showMessageSent&&window.showMessageSent();const i=t().user,r=t().chats.find(e=>e.id===n);r&&i&&r.participants.filter(e=>e!==i.uid).forEach(e=>d(void 0,null,function*(){yield t().autoAddToContacts(e,n)}))}catch(i){e(e=>{e.messages[n]||(e.messages[n]=[]),e.messages[n].push(c(a({},o),{status:"sent",edited:!1,replyTo:o.replyTo||null,attachments:o.attachments||[],reactions:o.reactions||[]}));const t=e.chats.findIndex(e=>e.id===n);-1!==t&&(e.chats[t].lastMessage=o,e.chats[t].lastMessageTime=o.timestamp,e.chats[t].unreadCount=(e.chats[t].unreadCount||0)+1)})}}),reloadContacts:()=>d(void 0,null,function*(){try{const n=t().user;if(!n)return;const o=M(ge,"contacts"),i=R(o,L("addedBy","==",n.uid)),r=yield K(i),s=[];r.forEach(e=>{s.push({uid:e.data().uid,displayName:e.data().displayName||"Utilisateur",email:e.data().email,photoURL:e.data().photoURL,addedAt:e.data().addedAt,autoAdded:e.data().autoAdded||!1,source:"explicit"})});const c=M(ge,"chats"),d=R(c,L("participants","array-contains",n.uid)),u=yield K(d),l=[],f=M(ge,"users"),p=yield K(f),h=new Map;p.forEach(e=>{h.set(e.id,a({uid:e.id},e.data()))}),u.forEach(e=>{const t=e.data(),o=t.participants.find(e=>e!==n.uid);if(o&&h.has(o)){const n=h.get(o);l.push({uid:o,displayName:n.displayName||"Utilisateur",email:n.email,photoURL:n.photoURL,addedAt:t.createdAt||Date.now(),autoAdded:!1,source:"chat",chatId:e.id})}});const g=[...s,...l].reduce((e,t)=>{const n=e.find(e=>e.uid===t.uid);return n&&"explicit"!==t.source||(n&&(e=e.filter(e=>e.uid!==t.uid)),e.push(t)),e},[]);e(e=>{e.contacts=g})}catch(n){}}),autoAddToContacts:(e,n)=>d(void 0,null,function*(){try{const n=t().user;if(!n||e===n.uid)return;if(t().contacts.find(t=>t.uid===e))return;const o=yield K(R(M(ge,"users"),L("uid","==",e)));if(!o.empty){const t=o.docs[0].data();yield z(_(ge,"contacts",`${e}_${Date.now()}`),{uid:e,displayName:t.displayName||"Utilisateur",email:t.email,photoURL:t.photoURL,addedAt:Date.now(),addedBy:n.uid,autoAdded:!0}),window.showContactAutoAdded&&window.showContactAutoAdded(t.displayName)}}catch(n){window.showError&&window.showError("Erreur lors de l'ajout automatique aux contacts")}}),loadChatMessages:n=>d(void 0,null,function*(){try{const o=M(ge,"chats",n,"messages"),i=R(o,$("timestamp","asc")),r=yield K(i),s=[];r.forEach(e=>{s.push(a({id:e.id},e.data()))}),e(e=>{e.messages[n]=s}),q(i,o=>{const i=[];o.forEach(e=>{i.push(a({id:e.id},e.data()))}),e(e=>{e.messages[n]=i});const r=t().user;if(r&&i.length>0){const e=i[i.length-1];e.senderId!==r.uid&&t().autoAddToContacts(e.senderId,n).catch(e=>{})}})}catch(o){}}),markMessagesAsRead:t=>d(void 0,null,function*(){try{const n=M(ge,"chats",t,"messages"),o=R(n,L("status","==","delivered")),i=yield K(o),r=U(ge);i.forEach(e=>{r.update(e.ref,{status:"read"})}),yield r.commit(),e(e=>{e.messages[t]&&e.messages[t].forEach(e=>{"delivered"===e.status&&(e.status="read")});const n=e.chats.findIndex(e=>e.id===t);-1!==n&&(e.chats[n].unreadCount=0)})}catch(n){}}),editMessage:(t,n,o)=>d(void 0,null,function*(){try{const e=_(ge,"chats",t,"messages",n);yield N(e,{content:o,edited:!0,editedAt:Date.now()})}catch(i){e(e=>{if(e.messages[t]){const i=e.messages[t].findIndex(e=>e.id===n);-1!==i&&(e.messages[t][i].content=o,e.messages[t][i].edited=!0,e.messages[t][i].editedAt=Date.now())}})}}),deleteMessage:(t,n)=>d(void 0,null,function*(){try{yield D(_(ge,"chats",t,"messages",n))}catch(o){e(e=>{e.messages[t]&&(e.messages[t]=e.messages[t].filter(e=>e.id!==n))})}}),addReaction:(t,n,o)=>d(void 0,null,function*(){try{const e=_(ge,"chats",t,"messages",n);yield N(e,{[`reactions.${o.userId}`]:o.emoji})}catch(i){e(e=>{if(e.messages[t]){const i=e.messages[t].findIndex(e=>e.id===n);-1!==i&&(e.messages[t][i].reactions||(e.messages[t][i].reactions={}),e.messages[t][i].reactions[o.userId]=o.emoji)}})}}),updateMessage:(t,n,o)=>{e(e=>{if(e.messages[t]){const i=e.messages[t].findIndex(e=>e.id===n);-1!==i&&(e.messages[t][i]=a(a({},e.messages[t][i]),o))}})},removeMessage:(t,n)=>{e(e=>{e.messages[t]&&(e.messages[t]=e.messages[t].filter(e=>e.id!==n))})},setMessages:(t,n)=>{e(e=>{e.messages[t]=n})},addNotification:t=>{e(e=>{e.notifications.unshift(a({id:Date.now(),timestamp:Date.now()},t)),e.notifications.length>50&&(e.notifications=e.notifications.slice(0,50))})},removeNotification:t=>{e(e=>{e.notifications=e.notifications.filter(e=>e.id!==t)})},clearNotifications:()=>{e(e=>{e.notifications=[]})},updateNotificationSettings:t=>{e(e=>{e.notificationSettings=a(a({},e.notificationSettings),t)})},setPerformance:t=>{e(e=>{e.performance=a(a({},e.performance),t)})},setDeviceInfo:t=>{e(e=>{e.deviceInfo=a(a({},e.deviceInfo),t)})},addError:t=>{e(e=>{e.errors.unshift({id:Date.now(),message:t.message,stack:t.stack,timestamp:Date.now()}),e.errors.length>10&&(e.errors=e.errors.slice(0,10))})},clearErrors:()=>{e(e=>{e.errors=[]})},clearChatData:()=>{e(e=>{e.chats=[],e.messages={},e.activeChat=null,e.unreadCount=0})},logout:()=>{e(e=>{e.user=null,e.isAuthenticated=!1,e.chats=[],e.messages={},e.activeChat=null,e.unreadCount=0,e.notifications=[],e.errors=[]})},initializeApp:()=>d(void 0,null,function*(){try{const n=localStorage.getItem("theme")||"dark";e(e=>{e.theme=n});const o=localStorage.getItem("user");if(o)try{const t=JSON.parse(o);e(e=>{e.user=t,e.isAuthenticated=!!t})}catch(t){localStorage.removeItem("user")}return!0}catch(t){return!1}})})),"getStorage"in(we={name:"cirus-chat-store",storage:ce(()=>localStorage),partialize:e=>({theme:e.theme,notificationSettings:e.notificationSettings})})||"serialize"in we||"deserialize"in we?((e,t)=>(n,o,i)=>{let r=a({getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:e=>e,version:0,merge:(e,t)=>a(a({},t),e)},t),s=!1;const c=new Set,d=new Set;let u;try{u=r.getStorage()}catch(y){}if(!u)return e((...e)=>{n(...e)},o,i);const l=de(r.serialize),f=()=>{const e=r.partialize(a({},o()));let t;const n=l({state:e,version:r.version}).then(e=>u.setItem(r.name,e)).catch(e=>{t=e});if(t)throw t;return n},p=i.setState;i.setState=(e,t)=>{p(e,t),f()};const h=e((...e)=>{n(...e),f()},o,i);let g;const m=()=>{var e;if(!u)return;s=!1,c.forEach(e=>e(o()));const t=(null==(e=r.onRehydrateStorage)?void 0:e.call(r,o()))||void 0;return de(u.getItem.bind(u))(r.name).then(e=>{if(e)return r.deserialize(e)}).then(e=>{if(e){if("number"!=typeof e.version||e.version===r.version)return e.state;if(r.migrate)return r.migrate(e.state,e.version)}}).then(e=>{var t;return g=r.merge(e,null!=(t=o())?t:h),n(g,!0),f()}).then(()=>{null==t||t(g,void 0),s=!0,d.forEach(e=>e(g))}).catch(e=>{null==t||t(void 0,e)})};return i.persist={setOptions:e=>{r=a(a({},r),e),e.getStorage&&(u=e.getStorage())},clearStorage:()=>{null==u||u.removeItem(r.name)},getOptions:()=>r,rehydrate:()=>m(),hasHydrated:()=>s,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(d.add(e),()=>{d.delete(e)})},m(),g||h})(ve,we):((e,t)=>(n,o,i)=>{let r=a({storage:ce(()=>localStorage),partialize:e=>e,version:0,merge:(e,t)=>a(a({},t),e)},t),s=!1;const c=new Set,d=new Set;let u=r.storage;if(!u)return e((...e)=>{n(...e)},o,i);const l=()=>{const e=r.partialize(a({},o()));return u.setItem(r.name,{state:e,version:r.version})},f=i.setState;i.setState=(e,t)=>{f(e,t),l()};const p=e((...e)=>{n(...e),l()},o,i);let h;i.getInitialState=()=>p;const g=()=>{var e,t;if(!u)return;s=!1,c.forEach(e=>{var t;return e(null!=(t=o())?t:p)});const i=(null==(t=r.onRehydrateStorage)?void 0:t.call(r,null!=(e=o())?e:p))||void 0;return de(u.getItem.bind(u))(r.name).then(e=>{if(e){if("number"!=typeof e.version||e.version===r.version)return[!1,e.state];if(r.migrate)return[!0,r.migrate(e.state,e.version)]}return[!1,void 0]}).then(e=>{var t;const[i,s]=e;if(h=r.merge(s,null!=(t=o())?t:p),n(h,!0),i)return l()}).then(()=>{null==i||i(h,void 0),h=o(),s=!0,d.forEach(e=>e(h))}).catch(e=>{null==i||i(void 0,e)})};return i.persist={setOptions:e=>{r=a(a({},r),e),e.storage&&(u=e.storage)},clearStorage:()=>{null==u||u.removeItem(r.name)},getOptions:()=>r,rehydrate:()=>g(),hasHydrated:()=>s,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(d.add(e),()=>{d.delete(e)})},r.skipHydration||g(),h||p})(ve,we))));var ve,we;k(ae(se((e,t)=>({metrics:{fps:0,memory:0,domNodes:0,loadTime:0,renderTime:0},setMetrics:t=>{e(e=>{e.metrics=a(a({},e.metrics),t)})},updateFPS:t=>{e(e=>{e.metrics.fps=t})},updateMemory:t=>{e(e=>{e.metrics.memory=t})},updateDOMNodes:t=>{e(e=>{e.metrics.domNodes=t})},updateLoadTime:t=>{e(e=>{e.metrics.loadTime=t})},updateRenderTime:t=>{e(e=>{e.metrics.renderTime=t})},resetMetrics:()=>{e(e=>{e.metrics={fps:0,memory:0,domNodes:0,loadTime:0,renderTime:0}})}})))),k(ae(se((e,t)=>({securityStatus:{blocked:!1,reason:null,attempts:0,lastAttempt:0},setSecurityStatus:t=>{e(e=>{e.securityStatus=a(a({},e.securityStatus),t)})},incrementAttempts:()=>{e(e=>{e.securityStatus.attempts+=1,e.securityStatus.lastAttempt=Date.now()})},resetAttempts:()=>{e(e=>{e.securityStatus.attempts=0,e.securityStatus.lastAttempt=0})},blockUser:t=>{e(e=>{e.securityStatus.blocked=!0,e.securityStatus.reason=t})},unblockUser:()=>{e(e=>{e.securityStatus.blocked=!1,e.securityStatus.reason=null})}}))));var be={exports:{}},Se={},ke=l,Ie=Symbol.for("react.element"),Ce=Symbol.for("react.fragment"),je=Object.prototype.hasOwnProperty,Te=ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ee={key:!0,ref:!0,__self:!0,__source:!0};function Ae(e,t,n){var o,i={},r=null,s=null;for(o in void 0!==n&&(r=""+n),void 0!==t.key&&(r=""+t.key),void 0!==t.ref&&(s=t.ref),t)je.call(t,o)&&!Ee.hasOwnProperty(o)&&(i[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===i[o]&&(i[o]=t[o]);return{$$typeof:Ie,type:e,key:r,ref:s,props:i,_owner:Te.current}}Se.Fragment=Ce,Se.jsx=Ae,Se.jsxs=Ae,be.exports=Se;var Oe=be.exports;const xe=l.createContext(),Pe=({children:e})=>{const t=(e,t="default")=>{switch(t){case"success":w.success(e,{duration:4e3,style:{background:"#00d4ff",color:"#000",border:"1px solid #00d4ff",borderRadius:"8px",fontSize:"14px",fontWeight:"500"}});break;case"error":w.error(e,{duration:5e3,style:{background:"#ff4757",color:"#fff",border:"1px solid #ff4757",borderRadius:"8px",fontSize:"14px",fontWeight:"500"}});break;case"loading":w.loading(e,{style:{background:"#ffa502",color:"#000",border:"1px solid #ffa502",borderRadius:"8px",fontSize:"14px",fontWeight:"500"}});break;case"info":w(e,{duration:3e3,style:{background:"#3742fa",color:"#fff",border:"1px solid #3742fa",borderRadius:"8px",fontSize:"14px",fontWeight:"500"}});break;case"auto-added":w.success(e,{duration:6e3,icon:"✨",style:{background:"linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",color:"#fff",border:"1px solid #ff6b35",borderRadius:"8px",fontSize:"14px",fontWeight:"500",boxShadow:"0 4px 12px rgba(255, 107, 53, 0.3)"}});break;default:w(e,{duration:3e3,style:{background:"#2f3542",color:"#fff",border:"1px solid #2f3542",borderRadius:"8px",fontSize:"14px",fontWeight:"500"}})}},n={showToast:t,showContactAdded:e=>{t(`✅ ${e} ajouté à vos contacts`,"success")},showContactAutoAdded:e=>{t(`✨ ${e} ajouté automatiquement à vos contacts`,"auto-added")},showMessageSent:()=>{t("📤 Message envoyé","success")},showMessageReceived:e=>{t(`📥 Nouveau message de ${e}`,"info")},showError:e=>{t(`❌ ${e}`,"error")},showLoading:e=>{t(e,"loading")}};return Oe.jsx(xe.Provider,{value:n,children:e})},_e=()=>{const{showContactAdded:e,showContactAutoAdded:t,showMessageSent:n,showMessageReceived:o,showError:i,showLoading:r,showToast:s}=(()=>{const e=l.useContext(xe);if(!e)throw new Error("useToast must be used within a ToastProvider");return e})();return l.useEffect(()=>(window.showContactAdded=e,window.showContactAutoAdded=t,window.showMessageSent=n,window.showMessageReceived=o,window.showError=i,window.showLoading=r,window.showToast=s,()=>{delete window.showContactAdded,delete window.showContactAutoAdded,delete window.showMessageSent,delete window.showMessageReceived,delete window.showError,delete window.showLoading,delete window.showToast}),[e,t,n,o,i,r,s]),null},Ne="@firebase/installations",De="0.6.9",Me=`w:${De}`,Re="FIS_v2",Le=new J("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function Ke(e){return e instanceof Y&&e.code.includes("request-failed")}
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
 */function Ue({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function $e(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}function qe(e,t){return d(this,null,function*(){const n=(yield t.json()).error;return Le.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})})}function ze({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Fe(e){return d(this,null,function*(){const t=yield e();return t.status>=500&&t.status<600?e():t})}
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
function Be(e){return new Promise(t=>{setTimeout(t,e)})}
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
const He=/^[cdef][\w-]{21}$/;function We(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){var t;return(t=e,btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22)}
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
 */(e);return He.test(t)?t:""}catch(e){return""}}function Ve(e){return`${e.appName}!${e.appId}`}
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
 */const Je=new Map;function Ge(e,t){const n=Ve(e);Ye(n,t),function(e,t){const n=(!Qe&&"BroadcastChannel"in self&&(Qe=new BroadcastChannel("[Firebase] FID Change"),Qe.onmessage=e=>{Ye(e.data.key,e.data.fid)}),Qe);n&&n.postMessage({key:e,fid:t}),0===Je.size&&Qe&&(Qe.close(),Qe=null)}(n,t)}function Ye(e,t){const n=Je.get(e);if(n)for(const o of n)o(t)}let Qe=null;
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
const Xe="firebase-installations-store";let Ze=null;function et(){return Ze||(Ze=G("firebase-installations-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(Xe)}})),Ze}function tt(e,t){return d(this,null,function*(){const n=Ve(e),o=(yield et()).transaction(Xe,"readwrite"),i=o.objectStore(Xe),r=yield i.get(n);return yield i.put(t,n),yield o.done,r&&r.fid===t.fid||Ge(e,t.fid),t})}function nt(e){return d(this,null,function*(){const t=Ve(e),n=(yield et()).transaction(Xe,"readwrite");yield n.objectStore(Xe).delete(t),yield n.done})}function ot(e,t){return d(this,null,function*(){const n=Ve(e),o=(yield et()).transaction(Xe,"readwrite"),i=o.objectStore(Xe),r=yield i.get(n),s=t(r);return void 0===s?yield i.delete(n):yield i.put(s,n),yield o.done,!s||r&&r.fid===s.fid||Ge(e,s.fid),s})}
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
 */function it(e){return d(this,null,function*(){let t;const n=yield ot(e.appConfig,n=>{const o=function(e){return at(e||{fid:We(),registrationStatus:0})}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(Le.create("app-offline"))};const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},o=function(e,t){return d(this,null,function*(){try{const n=
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
 */yield function(e,t){return d(this,arguments,function*({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const o=Ue(e),i=ze(e),r=t.getImmediate({optional:!0});if(r){const e=yield r.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const s={fid:n,authVersion:Re,appId:e.appId,sdkVersion:Me},a={method:"POST",headers:i,body:JSON.stringify(s)},c=yield Fe(()=>fetch(o,a));if(c.ok){const e=yield c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:$e(e.authToken)}}throw yield qe("Create Installation",c)})}(e,t);return tt(e.appConfig,n)}catch(n){throw Ke(n)&&409===n.customData.serverCode?yield nt(e.appConfig):yield tt(e.appConfig,{fid:t.fid,registrationStatus:0}),n}})}(e,n);return{installationEntry:n,registrationPromise:o}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:rt(e)}:{installationEntry:t}}(e,o);return t=i.registrationPromise,i.installationEntry});return""===n.fid?{installationEntry:yield t}:{installationEntry:n,registrationPromise:t}})}function rt(e){return d(this,null,function*(){let t=yield st(e.appConfig);for(;1===t.registrationStatus;)yield Be(100),t=yield st(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=yield it(e);return n||t}return t})}function st(e){return ot(e,e=>{if(!e)throw Le.create("installation-not-found");return at(e)})}function at(e){return 1===(t=e).registrationStatus&&t.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
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
 */}function ct(e,t){return d(this,arguments,function*({appConfig:e,heartbeatServiceProvider:t},n){const o=function(e,{fid:t}){return`${Ue(e)}/${t}/authTokens:generate`}
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
 */(e,n),i=function(e,{refreshToken:t}){const n=ze(e);return n.append("Authorization",function(e){return`${Re} ${e}`}(t)),n}(e,n),r=t.getImmediate({optional:!0});if(r){const e=yield r.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const s={installation:{sdkVersion:Me,appId:e.appId}},a={method:"POST",headers:i,body:JSON.stringify(s)},c=yield Fe(()=>fetch(o,a));if(c.ok)return $e(yield c.json());throw yield qe("Generate Auth Token",c)})}function dt(e,t=!1){return d(this,null,function*(){let n;const o=yield ot(e.appConfig,o=>{if(!lt(o))throw Le.create("not-registered");const i=o.authToken;if(!t&&(2===(r=i).requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(r)))return o;var r;if(1===i.requestStatus)return n=function(e,t){return d(this,null,function*(){let n=yield ut(e.appConfig);for(;1===n.authToken.requestStatus;)yield Be(100),n=yield ut(e.appConfig);const o=n.authToken;return 0===o.requestStatus?dt(e,t):o})}(e,t),o;{if(!navigator.onLine)throw Le.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(o);return n=function(e,t){return d(this,null,function*(){try{const n=yield ct(e,t),o=Object.assign(Object.assign({},t),{authToken:n});return yield tt(e.appConfig,o),n}catch(n){if(!Ke(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});yield tt(e.appConfig,n)}else yield nt(e.appConfig);throw n}})}(e,t),t}});return n?yield n:o.authToken})}function ut(e){return ot(e,e=>{if(!lt(e))throw Le.create("not-registered");return 1===(t=e.authToken).requestStatus&&t.requestTime+1e4<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e;var t;
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
 */})}function lt(e){return void 0!==e&&2===e.registrationStatus}function ft(e){return Le.create("missing-app-config-values",{valueName:e})}
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
 */const pt="installations";H(new W(pt,e=>{const t=e.getProvider("app").getImmediate(),n=
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
function(e){if(!e||!e.options)throw ft("App Configuration");if(!e.name)throw ft("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw ft(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:V(t,"heartbeat"),_delete:()=>Promise.resolve()}},"PUBLIC")),H(new W("installations-internal",e=>{const t=e.getProvider("app").getImmediate(),n=V(t,pt).getImmediate();return{getId:()=>function(e){return d(this,null,function*(){const t=e,{installationEntry:n,registrationPromise:o}=yield it(t);return o?o.catch(console.error):dt(t).catch(console.error),n.fid})}
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
 */(n),getToken:e=>function(e,t=!1){return d(this,null,function*(){const n=e;return yield function(e){return d(this,null,function*(){const{registrationPromise:t}=yield it(e);t&&(yield t)})}(n),(yield dt(n,t)).token})}(n,e)}},"PRIVATE")),B(Ne,De),B(Ne,De,"esm2017");
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
const ht="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",gt="google.c.a.c_id";var mt,yt,vt;
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
function wt(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function bt(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),o=new Uint8Array(n.length);for(let i=0;i<n.length;++i)o[i]=n.charCodeAt(i);return o}
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
 */(yt=mt||(mt={}))[yt.DATA_MESSAGE=1]="DATA_MESSAGE",yt[yt.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION",function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(vt||(vt={}));const St="fcm_token_details_db",kt="fcm_token_object_Store",It="firebase-messaging-store";let Ct=null;function jt(){return Ct||(Ct=G("firebase-messaging-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(It)}})),Ct}function Tt(e,t){return d(this,null,function*(){const n=Et(e),o=(yield jt()).transaction(It,"readwrite");return yield o.objectStore(It).put(t,n),yield o.done,t})}function Et({appConfig:e}){return e.appId}
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
 */const At=new J("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});function Ot({projectId:e}){return`https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`}function xt(e){return d(this,arguments,function*({appConfig:e,installations:t}){const n=yield t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})})}function Pt({p256dh:e,auth:t,endpoint:n,vapidKey:o}){const i={web:{endpoint:n,auth:t,p256dh:e}};return o!==ht&&(i.web.applicationPubKey=o),i}
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
 */function _t(e){return d(this,null,function*(){const t=yield function(e,t){return d(this,null,function*(){return(yield e.pushManager.getSubscription())||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:bt(t)})})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:wt(t.getKey("auth")),p256dh:wt(t.getKey("p256dh"))},o=yield function(e){return d(this,null,function*(){const t=Et(e),n=yield jt(),o=yield n.transaction(It).objectStore(It).get(t);if(o)return o;{const t=yield function(e){return d(this,null,function*(){if("databases"in indexedDB&&!(yield indexedDB.databases()).map(e=>e.name).includes(St))return null;let t=null;return(yield G(St,5,{upgrade:(n,o,i,r)=>d(this,null,function*(){var i;if(o<2)return;if(!n.objectStoreNames.contains(kt))return;const s=r.objectStore(kt),a=yield s.index("fcmSenderId").get(e);if(yield s.clear(),a)if(2===o){const e=a;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:null!==(i=e.createTime)&&void 0!==i?i:Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:wt(e.vapidKey)}}}else if(3===o){const e=a;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:wt(e.auth),p256dh:wt(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:wt(e.vapidKey)}}}else if(4===o){const e=a;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:wt(e.auth),p256dh:wt(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:wt(e.vapidKey)}}}})})).close(),yield Q(St),yield Q("fcm_vapid_details_db"),yield Q("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}
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
 */(t)?t:null})}(e.appConfig.senderId);if(t)return yield Tt(e,t),t}})}(e.firebaseDependencies);if(o){if(function(e,t){const n=t.vapidKey===e.vapidKey,o=t.endpoint===e.endpoint,i=t.auth===e.auth,r=t.p256dh===e.p256dh;return n&&o&&i&&r}
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
 */(o.subscriptionOptions,n))return Date.now()>=o.createTime+6048e5?function(e,t){return d(this,null,function*(){try{const n=yield function(e,t){return d(this,null,function*(){const n=yield xt(e),o=Pt(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(o)};let r;try{const n=yield fetch(`${Ot(e.appConfig)}/${t.token}`,i);r=yield n.json()}catch(s){throw At.create("token-update-failed",{errorInfo:null==s?void 0:s.toString()})}if(r.error){const e=r.error.message;throw At.create("token-update-failed",{errorInfo:e})}if(!r.token)throw At.create("token-update-no-token");return r.token})}(e.firebaseDependencies,t),o=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return yield Tt(e.firebaseDependencies,o),n}catch(n){throw n}})}(e,{token:o.token,createTime:Date.now(),subscriptionOptions:n}):o.token;try{yield function(e,t){return d(this,null,function*(){const n={method:"DELETE",headers:yield xt(e)};try{const o=yield fetch(`${Ot(e.appConfig)}/${t}`,n),i=yield o.json();if(i.error){const e=i.error.message;throw At.create("token-unsubscribe-failed",{errorInfo:e})}}catch(o){throw At.create("token-unsubscribe-failed",{errorInfo:null==o?void 0:o.toString()})}})}(e.firebaseDependencies,o.token)}catch(i){}return Nt(e.firebaseDependencies,n)}return Nt(e.firebaseDependencies,n)})}function Nt(e,t){return d(this,null,function*(){const n=
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
 */yield function(e,t){return d(this,null,function*(){const n=yield xt(e),o=Pt(t),i={method:"POST",headers:n,body:JSON.stringify(o)};let r;try{const t=yield fetch(Ot(e.appConfig),i);r=yield t.json()}catch(s){throw At.create("token-subscribe-failed",{errorInfo:null==s?void 0:s.toString()})}if(r.error){const e=r.error.message;throw At.create("token-subscribe-failed",{errorInfo:e})}if(!r.token)throw At.create("token-subscribe-no-token");return r.token})}(e,t),o={token:n,createTime:Date.now(),subscriptionOptions:t};return yield Tt(e,o),o.token})}function Dt(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const o=t.notification.body;o&&(e.notification.body=o);const i=t.notification.image;i&&(e.notification.image=i);const r=t.notification.icon;r&&(e.notification.icon=r)}(t,e),function(e,t){t.data&&(e.data=t.data)}(t,e),function(e,t){var n,o,i,r,s;if(!t.fcmOptions&&!(null===(n=t.notification)||void 0===n?void 0:n.click_action))return;e.fcmOptions={};const a=null!==(i=null===(o=t.fcmOptions)||void 0===o?void 0:o.link)&&void 0!==i?i:null===(r=t.notification)||void 0===r?void 0:r.click_action;a&&(e.fcmOptions.link=a);const c=null===(s=t.fcmOptions)||void 0===s?void 0:s.analytics_label;c&&(e.fcmOptions.analyticsLabel=c)}
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
 */class Rt{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const o=
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
function(e){if(!e||!e.options)throw Mt("App Configuration Object");if(!e.name)throw Mt("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const o of t)if(!n[o])throw Mt(o);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:o,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}
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
function Lt(e,t){return d(this,null,function*(){if(!navigator)throw At.create("only-available-in-window");if("default"===Notification.permission&&(yield Notification.requestPermission()),"granted"!==Notification.permission)throw At.create("permission-blocked");
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
return yield function(e,t){return d(this,null,function*(){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=ht)})}(e,null==t?void 0:t.vapidKey),
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
 */yield function(e,t){return d(this,null,function*(){if(t||e.swRegistration||(yield function(e){return d(this,null,function*(){try{e.swRegistration=yield navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}),e.swRegistration.update().catch(()=>{})}catch(t){throw At.create("failed-service-worker-registration",{browserErrorMessage:null==t?void 0:t.message})}})}(e)),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw At.create("invalid-sw-registration");e.swRegistration=t}})}(e,null==t?void 0:t.serviceWorkerRegistration),_t(e)})}
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
function Kt(e,t){return d(this,null,function*(){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===vt.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(Dt(n)):e.onMessageHandler.next(Dt(n)));const o=n.data;var i;"object"==typeof(i=o)&&i&&gt in i&&"1"===o["google.c.a.e"]&&(yield function(e,t,n){return d(this,null,function*(){const o=function(e){switch(e){case vt.NOTIFICATION_CLICKED:return"notification_open";case vt.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}(t);(yield e.firebaseDependencies.analyticsProvider.get()).logEvent(o,{message_id:n[gt],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})})}(e,n.messageType,o))})}const Ut="@firebase/messaging",$t="0.12.12";
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
 */H(new W("messaging",e=>{const t=new Rt(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",e=>Kt(t,e)),t},"PUBLIC")),H(new W("messaging-internal",e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:e=>Lt(t,e)}},"PRIVATE")),B(Ut,$t),B(Ut,$t,"esm2017");const zt=e=>d(void 0,null,function*(){var e;if(!(yield qt()))return null;if("serviceWorker"in navigator){const t=yield navigator.serviceWorker.register("/firebase-messaging-sw.js");try{const n={apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0};Object.values(n).every(Boolean)&&(null==(e=t.active)||e.postMessage({type:"FIREBASE_CONFIG",payload:n}))}catch(n){}}const t=
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
function(e=j()){return qt().then(e=>{if(!e)throw At.create("unsupported-browser")},e=>{throw At.create("indexed-db-unsupported")}),V(te(e),"messaging").getImmediate()}(fe);try{if("granted"!==(yield Notification.requestPermission()))return null;const e=yield function(e,t){return d(this,null,function*(){return Lt(e=te(e),t)})}(t,{vapidKey:void 0});return function(e,t){(function(e,t){if(!navigator)throw At.create("only-available-in-window");e.onMessageHandler=t})(e=te(e),t)}(t,e=>{}),e}catch(n){return null}});var Ft=Object.defineProperty,Bt=Object.getOwnPropertySymbols,Ht=Object.prototype.hasOwnProperty,Wt=Object.prototype.propertyIsEnumerable,Vt=Math.pow,Jt=(e,t,n)=>t in e?Ft(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Gt=(e,t)=>{for(var n in t||(t={}))Ht.call(t,n)&&Jt(e,n,t[n]);if(Bt)for(var n of Bt(t))Wt.call(t,n)&&Jt(e,n,t[n]);return e};const Yt=l.lazy(()=>re(()=>import("./Auth-DQianlMW.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),Qt=l.lazy(()=>re(()=>import("./Chat-CKhaEU5G.js"),__vite__mapDeps([11,1,2,3,4,5,6,7,8,9,10,12]))),Xt=l.lazy(()=>re(()=>import("./ErrorFallback-Bk23SgLI.js"),__vite__mapDeps([13,1,4,5,6,7,8,9,10,2]))),Zt=l.lazy(()=>re(()=>import("./WelcomeAnimation-Hp-9M4H1.js"),__vite__mapDeps([14,1,4,5,6,7,8,9,10,2]))),en=new m({defaultOptions:{queries:{retry:3,retryDelay:e=>Math.min(1e3*Vt(2,e),3e4),staleTime:3e5,cacheTime:6e5,refetchOnWindowFocus:!1,refetchOnReconnect:!0},mutations:{retry:1,retryDelay:1e3}}}),tn=e=>{var t=e,{component:n}=t,o=((e,t)=>{var n={};for(var o in e)Ht.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&Bt)for(var o of Bt(e))t.indexOf(o)<0&&Wt.call(e,o)&&(n[o]=e[o]);return n})(t,["component"]);return Oe.jsx(l.Suspense,{fallback:Oe.jsxs("div",{className:"loading-container",children:[Oe.jsx("div",{className:"loading-spinner"}),Oe.jsx("p",{children:"Chargement..."})]}),children:Oe.jsx(n,Gt({},o))})},nn=({children:e})=>{const{isAuthenticated:t}=ye();return t?e:Oe.jsx(g,{to:"/login",replace:!0})},on=({children:e})=>{const{isAuthenticated:t}=ye();return t?Oe.jsx(g,{to:"/",replace:!0}):e},rn={duration:4e3,position:"top-right",style:{background:"#1a1a1a",color:"#ffffff",border:"1px solid #333333",borderRadius:"8px",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.15)"}};function sn(){const{initializeApp:e,setUser:t,setTheme:n,addError:o}=ye(),[i,r]=l.useState(()=>{try{return"1"!==localStorage.getItem("welcome_shown")}catch(e){return!0}});return l.useEffect(()=>{(()=>{return i=this,r=function*(){try{yield e();const o=localStorage.getItem("theme")||"dark";n(o);const i=pe.onAuthStateChanged(e=>{if(e){const n={uid:e.uid,email:e.email,displayName:e.displayName||"Utilisateur",photoURL:e.photoURL};t(n),localStorage.setItem("user",JSON.stringify(n)),zt().catch(()=>{})}else t(null),localStorage.removeItem("user")});return()=>i()}catch(i){o(i)}},new Promise((e,t)=>{var n=e=>{try{s(r.next(e))}catch(n){t(n)}},o=e=>{try{s(r.throw(e))}catch(n){t(n)}},s=t=>t.done?e(t.value):Promise.resolve(t.value).then(n,o);s((r=r.apply(i,null)).next())});var i,r})()},[e,n,t,o]),l.useEffect(()=>{const e=e=>{const t=e.error||new Error("Erreur inconnue");o(t)},t=e=>{const t=new Error(e.reason||"Promesse rejetée");o(t)};return window.addEventListener("error",e),window.addEventListener("unhandledrejection",t),()=>{window.removeEventListener("error",e),window.removeEventListener("unhandledrejection",t)}},[o]),Oe.jsx(y,{client:en,children:Oe.jsx(v,{FallbackComponent:Xt,onError:(e,t)=>{o(e)},children:Oe.jsxs(Pe,{children:[Oe.jsx(_e,{}),i&&Oe.jsx(tn,{component:()=>Oe.jsx(Zt,{onComplete:()=>{r(!1);try{localStorage.setItem("welcome_shown","1")}catch(e){}}})}),Oe.jsxs("div",{className:"app",children:[Oe.jsx(p,{router:l.useMemo(()=>h([{path:"/login",element:Oe.jsx(on,{children:Oe.jsx(tn,{component:Yt})})},{path:"/",element:Oe.jsx(nn,{children:Oe.jsx(tn,{component:Qt})})},{path:"*",element:Oe.jsx(g,{to:"/",replace:!0})}],{future:{v7_startTransition:!0,v7_relativeSplatPath:!0}}),[])}),Oe.jsx(b,Gt({},rn))]})]})})})}ne.createRoot(document.getElementById("root")).render(Oe.jsx(f.StrictMode,{children:Oe.jsx(sn,{})}));export{re as _,pe as a,ge as d,he as g,Oe as j,me as s,ye as u};
