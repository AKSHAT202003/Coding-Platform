"use strict";(self.webpackChunkoj_client=self.webpackChunkoj_client||[]).push([[415],{1415:function(e,t,n){n.r(t),n.d(t,{default:function(){return z}});var r=n(74165),i=n(15861),o=n(93433),s=n(29439),a=n(72791),c=n(59434),u=n(36151),l=n(68870),d=n(49877),f=n(35527),p=n(3710),m=n(71917),g=n(90917),x=n(1235),h=n(54261),Z=n(91608),j=n(88446),v=n(7091),k=n(80184),y=function(e,t){var n=(0,c.v9)((function(e){return e.auth}));(0,a.useEffect)((function(){if(n.isAdmin){var r=(0,Z.ZP)(j.p,{query:{id:(0,h.Z)()}});return r.on("logger-new-log",(function(t){e((function(e){return[].concat((0,o.Z)(e),[{msg:t,id:(0,h.Z)()}])}))})),r.on("logger-new-error",(function(e){t((function(t){return[].concat((0,o.Z)(t),[{msg:e,id:(0,h.Z)()}])}))})),function(){return r.close()}}}),[n.username,n.isAdmin,e,t])},T=function(e,t,n,o,s){(0,a.useEffect)((function(){e(!0),t(void 0),fetch("".concat(j.p,"/api/experimental/logs?pageNo=").concat(s),{headers:{"Content-Type":"application/json"},method:"GET",credentials:"include"}).then(function(){var e=(0,i.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.ok){e.next=2;break}return e.abrupt("return",t.json());case 2:return e.next=4,t.json();case 4:return n=e.sent,e.next=7,Promise.reject(n);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(e){o(e.stdoutTxt.trim().split("\n").map((function(e){return{msg:e,id:(0,h.Z)()}}))),n(e.stderrTxt.trim().split("\n").map((function(e){return{msg:e,id:(0,h.Z)()}})))})).catch(t).finally((function(){return e(!1)}))}),[e,t,n,o,s])},E=function(e){(0,a.useEffect)((function(){var e=setTimeout((function(){var e=document.getElementById("out-pre");e&&(0,o.Z)(e.childNodes).every((function(e){return"ok"!==e.getAttribute("tokenized")&&(e.innerHTML=w(e.innerHTML),e.setAttribute("tokenized","ok"),!0)}))}),10);return function(){return clearTimeout(e)}}),e)},b=[["GET","get","g"],["POST","post","g"],["PUT","put","g"],["DELETE","delete","g"],["Unlinked","unlinked","g"],["PORT","port","g"],["Database","database","g"],["Production","production","g"],["Note:","note","g"],["Add Note","addnote","g"],["Edit Note","editnote","g"],["Delete Note","deletenote","g"],["Containers","containers","g"],["Deleted","deleted","g"],["Error","error","g"],["failed","failed","g"],["LOG","log","g"]],w=function(e){b.forEach((function(t){return e=e.replace(new RegExp(t[0],t[2]),"<span class='token token-".concat(t[1],"'>").concat(t[0],"</span>"))}));var t=e.match("[0-9]+/[0-9]+/[0-9]+, [0-9]+:[0-9]+:[0-9]+ [a-zA-Z][a-zA-Z]");return t&&(e=e.replace(t[0],"<span class='token-time'>".concat(t[0],"</span>"))),e},N=function(e){var t=e.setIsOut,n=e.isOut,r=e.endRef,i=e.setPageNo,o=e.pageNo;return(0,k.jsxs)(a.Fragment,{children:[(0,k.jsx)(u.Z,{variant:"contained",color:"success",onClick:function(){return t((function(e){return!e}))},sx:{position:"fixed",top:"5em",right:"1em",textTransform:"capitalize",opacity:"0.9"},startIcon:(0,k.jsx)(p.Z,{}),children:n?"show stderr":"show stdout"}),(0,k.jsxs)(l.Z,{sx:{position:"fixed",display:"flex",top:"8em",right:"1em",opacity:"0.9"},children:[(0,k.jsx)(d.Z,{onClick:function(){return i((function(e){return 1===e?1:e-1}))},size:"small",color:"primary","aria-label":"add",children:(0,k.jsx)(m.Z,{})}),(0,k.jsx)(f.Z,{elevation:3,sx:{width:"35px",height:"35px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2em",margin:"0 0.2em"},children:o}),(0,k.jsx)(d.Z,{onClick:function(){return i((function(e){return e+1}))},size:"small",color:"primary","aria-label":"add",children:(0,k.jsx)(g.Z,{})})]}),(0,k.jsx)(d.Z,{onClick:function(){r.current&&r.current.scrollIntoView()},style:{position:"fixed",bottom:"4.5em",right:"1em",opacity:"0.9"},size:"small",color:"primary","aria-label":"add",children:(0,k.jsx)(x.Z,{})})]})},z=function(){var e=(0,a.useState)(!0),t=(0,s.Z)(e,2),n=t[0],r=t[1],i=(0,a.useState)(void 0),c=(0,s.Z)(i,2),u=c[0],l=c[1],d=(0,a.useState)({}),f=(0,s.Z)(d,2),p=f[0],m=f[1],g=(0,a.useState)({}),x=(0,s.Z)(g,2),h=x[0],Z=x[1],j=(0,a.useState)(!0),b=(0,s.Z)(j,2),w=b[0],z=b[1],S=(0,a.useRef)(null),C=(0,a.useState)(1),O=(0,s.Z)(C,2),P=O[0],A=O[1];return T(r,l,Z,m,P),y(m,Z),E([w,h,p]),(0,k.jsxs)(a.Fragment,{children:[(0,k.jsx)(N,{endRef:S,isOut:w,pageNo:P,setIsOut:z,setPageNo:A}),n&&(0,k.jsx)(v.Z,{}),!n&&u&&(0,k.jsxs)("div",{className:"errorTemplate",style:{width:"70vw"},children:[(0,k.jsxs)("div",{children:[(0,k.jsx)("span",{children:"Msg : "}),u.msg]}),u&&(0,k.jsxs)("div",{children:[(0,k.jsx)("span",{children:"Error : "}),JSON.stringify(u.error)]})]}),!n&&!u&&(0,k.jsxs)(a.Fragment,{children:[(0,k.jsx)("pre",{id:"out-pre",style:{display:"flex",flexDirection:"column",alignItems:"flex-start",margin:"6rem 1rem",fontSize:"0.6rem"},children:w?(0,o.Z)(p).reverse().map((function(e){return(0,k.jsx)("div",{children:e.msg},e.id)})):h.map((function(e){return(0,k.jsx)("div",{children:e.msg},e.id)}))}),(0,k.jsx)("div",{ref:S,"aria-hidden":!0})]})]})}}}]);
//# sourceMappingURL=415.4666dfa7.chunk.js.map