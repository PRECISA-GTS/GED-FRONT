(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9946],{91359:function(e,t,n){"use strict";n.d(t,{Z:function(){return h}});var a=n(87462),s=n(63366),o=n(67294),r=n(86010),c=n(94780),i=n(67074),l=n(78884),u=n(1588),d=n(34867);function f(e){return(0,d.Z)("MuiCardContent",e)}(0,u.Z)("MuiCardContent",["root"]);var Z=n(85893);let m=["className","component"],p=e=>{let{classes:t}=e;return(0,c.Z)({root:["root"]},f,t)},v=(0,i.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})(()=>({padding:16,"&:last-child":{paddingBottom:24}})),x=o.forwardRef(function(e,t){let n=(0,l.Z)({props:e,name:"MuiCardContent"}),{className:o,component:c="div"}=n,i=(0,s.Z)(n,m),u=(0,a.Z)({},n,{component:c}),d=p(u);return(0,Z.jsx)(v,(0,a.Z)({as:c,className:(0,r.Z)(d.root,o),ownerState:u,ref:t},i))});var h=x},49837:function(e,t,n){"use strict";n.d(t,{Z:function(){return w}});var a=n(87462),s=n(63366),o=n(67294),r=n(86010),c=n(94780),i=n(67074),l=n(78884),u=n(70918),d=n(1588),f=n(34867);function Z(e){return(0,f.Z)("MuiCard",e)}(0,d.Z)("MuiCard",["root"]);var m=n(85893);let p=["className","raised"],v=e=>{let{classes:t}=e;return(0,c.Z)({root:["root"]},Z,t)},x=(0,i.ZP)(u.Z,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})(()=>({overflow:"hidden"})),h=o.forwardRef(function(e,t){let n=(0,l.Z)({props:e,name:"MuiCard"}),{className:o,raised:c=!1}=n,i=(0,s.Z)(n,p),u=(0,a.Z)({},n,{raised:c}),d=v(u);return(0,m.jsx)(x,(0,a.Z)({className:(0,r.Z)(d.root,o),elevation:c?8:void 0,ref:t,ownerState:u},i))});var w=h},58620:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/cadastros/transportador/novo",function(){return n(45182)}])},76904:function(e,t,n){"use strict";var a=n(85893),s=n(11163),o=n.n(s),r=n(67294),c=n(60664),i=n(49837),l=n(91359),u=n(79072),d=n(87536),f=n(86501),Z=n(45061),m=n(46749),p=n(86887);n(47842);var v=n(60565),x=n(83830),h=n(40039),w=n(29308),C=n(67569),D=n(41088);let j=e=>{var t;let{id:n,btnClose:s,handleModalClose:j,setNewChange:g,newChange:N,outsideID:_,handleConfirmNew:b,manualUrl:y}=e,[M,P]=(0,r.useState)(!1),[S,E]=(0,r.useState)(null),{setId:I}=(0,r.useContext)(x.X),O=o(),R=n&&n>0?"edit":"new",k=O.pathname,{title:T}=(0,r.useContext)(v.f),{loggedUnity:X,user:q}=(0,r.useContext)(h.V),{startLoading:z,stopLoading:U}=(0,D.Z)(),{trigger:A,handleSubmit:B,reset:F,control:V,formState:{errors:G},register:H}=(0,d.cI)(),J=async e=>{let t={...e,usuarioID:q.usuarioID,unidadeID:X.unidadeID};try{"new"===R?await c.h.post("cadastros/transportador/new/insertData",t).then(e=>{_?(I(_),b(e.data.value)):(O.push("".concat((0,m.g_)(k))),I(e.data.id)),f.ZP.success(m.OD.successNew)}):"edit"===R&&(await c.h.post("".concat(k,"/updateData/").concat(n),t),f.ZP.success(m.OD.successUpdate))}catch(a){a.response&&409===a.response.status?f.ZP.error(m.OD.errorRepeated):console.log(a)}finally{U()}},K=async()=>{try{await c.h.delete("".concat(k,"/").concat(n,"/").concat(q.usuarioID,"/").concat(X.unidadeID)),I(null),P(!1),f.ZP.success(m.OD.successDelete)}catch(e){e.response&&409===e.response.status?(f.ZP.error(m.OD.pendingDelete),P(!1)):console.log(e)}},L=async()=>{"new"==R&&E({fields:{nome:"",unidadeMedida:"",status:1}});try{let e="new"===R?"".concat((0,m.g_)(k),"/new/getData"):"".concat(k,"/getData/").concat(n);await c.h.post(e,{id:n}).then(e=>{E(e.data),F(e.data)})}catch(t){console.log(t)}};return(0,r.useEffect)(()=>{L(),"new"===R&&setTimeout(()=>{A()},300)},[n]),(0,a.jsxs)(a.Fragment,{children:[S&&(0,a.jsxs)("form",{onSubmit:B(J),children:[(0,a.jsx)(p.Z,{btnCancel:!0,btnClose:!0,handleModalClose:j,btnSave:!0,btnNew:!_,handleSubmit:()=>B(J),btnDelete:"edit"===R,onclickDelete:()=>P(!0),type:R,manualUrl:y,outsideID:_}),(0,a.jsx)(i.Z,{children:(0,a.jsx)(l.Z,{children:(0,a.jsxs)(u.ZP,{container:!0,spacing:5,children:[(0,a.jsx)(w.Z,{xs:11,md:11,title:"Nome",name:"fields.nome",required:!0,control:V,errors:null==G?void 0:null===(t=G.fields)||void 0===t?void 0:t.nome}),(0,a.jsx)(C.Z,{xs:1,md:1,title:"Ativo",name:"fields.status",value:null==S?void 0:S.fields.status,typePage:R,register:H})]})})})]}),(0,a.jsx)(Z.Z,{text:"Tem certeza que deseja excluir?",title:"Excluir "+T.title,openModal:M,handleClose:()=>P(!1),handleSubmit:K,btnCancel:!0,btnConfirm:!0})]})};t.Z=j},47842:function(e,t,n){"use strict";var a=n(85893),s=n(70754);let o=e=>{let{show:t,title:n,customTextProps:o,...r}=e;return t&&(0,a.jsx)("div",{className:"fixed inset-0 flex items-center justify-center rounded-lg z-50",children:(0,a.jsxs)("div",{className:"flex flex-col justify-center items-center gap-2 ",children:[(0,a.jsx)(s.Z,{color:"primary",...r}),(0,a.jsx)("p",{className:"opacity-80 text-sm ".concat(o),children:null!=n?n:"Carregando..."})]})})};t.Z=o},45182:function(e,t,n){"use strict";n.r(t);var a=n(85893),s=n(76904),o=n(60565),r=n(67294);let c=()=>{let{setTitle:e}=(0,r.useContext)(o.f);return(0,r.useEffect)(()=>{e({title:"Transportador",subtitle:{id:null,count:null,new:!0}})},[]),(0,a.jsx)(s.Z,{})};t.default=c}},function(e){e.O(0,[5061,9774,2888,179],function(){return e(e.s=58620)}),_N_E=e.O()}]);