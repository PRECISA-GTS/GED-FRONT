"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2477],{16247:function(e,n,t){var i=t(85893),o=t(54225),a=t(73812),l=t(86378),s=t(21609),r=t(72819),c=t(67294),d=t(60664);let m=e=>{let{anchorEl:n,open:t,handleClose:m,handleClick:p,actionsData:u,actionsNCData:x}=e,[h,b]=(0,c.useState)(!1),[f,j]=(0,c.useState)(null),v=e=>{if(e.status>=50){let n="".concat(d.Y,"uploads/").concat(e.unidadeID,"/").concat(e.module,"/relatorio/original/").concat(e.usuarioID,"-").concat(e.id,"-").concat(e.module,".pdf");window.open(n,"_blank")}else window.open("/relatorio/".concat(e.route),"_blank")},g=e=>!!e.ncPending&&!!x&&x.length>1;return(0,i.jsxs)("div",{className:"relative",children:[(0,i.jsxs)(o.Z,{type:"button",onClick:p,variant:"outlined",color:"primary",size:"medium",sx:{display:"flex",gap:2},children:[(0,i.jsx)(s.Z,{icon:"octicon:chevron-down-12"}),(0,i.jsx)("span",{className:"hidden sm:block",children:"A\xe7\xf5es"})]}),(0,i.jsx)(a.Z,{id:"basic-menu",anchorEl:n,open:t,onClose:m,MenuListProps:{"aria-labelledby":"basic-button"},PaperProps:{elevation:0,sx:{overflow:"visible",filter:"drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",mt:1.5,"& .MuiAvatar-root":{width:32,height:32,ml:-.5,mr:1}}},transformOrigin:{horizontal:"right",vertical:"top"},anchorOrigin:{horizontal:"right",vertical:"bottom"},children:null==u?void 0:u.map(e=>(0,i.jsxs)(l.Z,{onClick(){m()},disabled:!!(e.disabled||g(e)),style:{textAlign:"left",display:"flex",alignItems:"center",gap:"4px"},children:[e.identification?(0,i.jsxs)("span",{style:{padding:"0 7px"},children:[(0,i.jsx)("span",{children:e.identification})," -"]}):(0,i.jsx)(s.Z,{icon:e.icon}),"report"==e.type?(0,i.jsx)("a",{onClick:()=>v(e),children:e.name}):(0,i.jsx)("p",{onClick:e.modal?()=>{b(!0),j(e)}:e.action,children:e.name})]},e.id))}),f&&(0,i.jsx)(r.Z,{title:f.name,handleConclusion:f.action,size:f.size,setOpenModal:b,openModal:h,fullHeight:f.fullHeight,clone:!0,children:f.component})]})};n.Z=m},92477:function(e,n,t){t.d(n,{Z:function(){return z}});var i=t(85893),o=t(11163),a=t.n(o),l=t(67294),s=t(21609),r=t(71798),c=t(40039),d=t(83830);t(7071);var m=t(61225),p=t(16247),u=t(54225),x=t(41664),h=t.n(x),b=t(41088),f=t(82555);let j=e=>{let{btnSend:n,btnSave:t,btnNew:o,btnNext:r,disabled:d,disabledSend:m,disabledSubmit:p,handleSubmit:x,handleSend:j,iconConclusion:v,titleConclusion:g,btnNewModal:Z,handleNewModal:y}=e,C=a(),{isLoading:k}=(0,b.Z)(),{data:N}=(0,f.O)(),{hasPermission:w}=(0,l.useContext)(c.V);return(0,i.jsxs)("div",{className:"flex items-center gap-2",children:[o&&w(C.pathname,"inserir")&&(0,i.jsx)(h(),{href:"".concat(C.pathname,"/novo"),children:(0,i.jsxs)(u.Z,{type:"button",variant:"outlined",color:"primary",size:"medium",sx:{display:"flex",gap:2},children:[(0,i.jsx)(s.Z,{icon:"ic:outline-plus"}),(0,i.jsx)("span",{className:"hidden sm:block",children:"Novo"})]})}),Z&&w(C.pathname,"inserir")&&(0,i.jsxs)(u.Z,{type:"button",variant:"outlined",color:"primary",size:"medium",sx:{display:"flex",gap:2},onClick:y,children:[(0,i.jsx)(s.Z,{icon:"ic:outline-plus"}),(0,i.jsx)("span",{className:"hidden sm:block",children:"Novo"})]}),n&&N&&w(C.pathname,"editar")&&(0,i.jsxs)(u.Z,{onClick:j,type:"button",variant:"contained",size:"medium",color:"primary",readOnly:!0,disabled:d||m,sx:{display:"flex",gap:2},children:[(0,i.jsx)(s.Z,{icon:null!=v?v:"carbon:send-filled"}),(0,i.jsx)("span",{className:"hidden sm:block",children:g})]}),t&&w(C.pathname,"editar")&&(0,i.jsxs)(u.Z,{onClick:x,type:"submit",variant:"contained",size:"medium",disabled:d||p,sx:{display:"flex",gap:2},children:[(0,i.jsx)(s.Z,{icon:"mdi:check-bold"}),(0,i.jsx)("span",{className:"hidden sm:block",children:"Salvar"})]}),r&&(0,i.jsxs)(u.Z,{onClick:x,type:"submit",variant:"outlined",size:"medium",color:k?"secondary":"primary",disabled:d||k,children:[(0,i.jsx)(s.Z,{icon:"grommet-icons:form-next-link"}),(0,i.jsx)("span",{className:"hidden sm:block",children:"Avan\xe7ar"})]})]})};var v=t(17575);let g=e=>{let{routes:n,currentUrl:t,btnCancel:o,btnDelete:a,btnInactivate:r,btnStatus:d,btnClose:m,handleModalClose:p,handleBtnStatus:x,status:h,setId:b,router:f,type:j,onclickDelete:g,onClickInactivate:Z,btnActivate:y,onClickActivate:C}=e,{hasPermission:k}=(0,l.useContext)(c.V),N="".concat(f.pathname).concat(f.query.aba?"?aba=".concat(f.query.aba):""),w=e=>e.includes("/novo")?e.replace("/novo",""):e;return(0,i.jsxs)("div",{className:"flex gap-2",children:[o&&!m&&k(f.pathname,"ler")&&(0,i.jsx)(v.Z,{title:"Voltar p\xe1gina",placement:"top",children:(0,i.jsx)(u.Z,{onClick(){b(null),f.push(w(N))},type:"button",variant:"outlined",color:"primary",size:"medium",children:(0,i.jsx)(s.Z,{icon:"grommet-icons:form-previous-link"})})}),a&&k(f.pathname,"excluir")&&(0,i.jsx)(v.Z,{title:"Excluir cadastro",placement:"top",children:(0,i.jsx)(u.Z,{type:"button",onClick:g,variant:"outlined",color:"error",size:"medium",sx:{display:"flex",gap:2},children:(0,i.jsx)(s.Z,{icon:"solar:trash-bin-minimalistic-2-outline"})})}),r&&k(f.pathname,"excluir")&&(0,i.jsx)(v.Z,{title:"Inativar cadastro",placement:"top",children:(0,i.jsx)(u.Z,{type:"button",onClick:Z,variant:"outlined",color:"error",size:"medium",sx:{display:"flex",gap:2},children:(0,i.jsx)(s.Z,{icon:"tabler:ban"})})}),y&&k(f.pathname,"excluir")&&(0,i.jsx)(v.Z,{title:"Ativar cadastro",placement:"top",children:(0,i.jsx)(u.Z,{type:"button",onClick:C,variant:"outlined",color:"primary",size:"medium",sx:{display:"flex",gap:2},children:(0,i.jsx)(s.Z,{icon:"tabler:check"})})}),m&&(0,i.jsx)(u.Z,{type:"button",onClick:p,variant:"outlined",color:"primary",size:"medium",sx:{display:"flex",gap:2},children:(0,i.jsx)("span",{className:"hidden sm:block",children:"Fechar"})})]})};var Z=t(66136),y=t(73812),C=t(86378),k=t(72819),N=t(60664);let w=e=>{let{anchorEl:n,open:t,handleClose:o,handleClick:a,actionsData:r}=e,[c,d]=(0,l.useState)(!1),[m,p]=(0,l.useState)(null),x=e=>{if(e.status>=50){let n="".concat(N.Y,"uploads/").concat(e.unidadeID,"/").concat(e.module,"/relatorio/original/").concat(e.usuarioID,"-").concat(e.id,"-").concat(e.module,".pdf");window.open(n,"_blank")}else window.open("/relatorio/".concat(e.route),"_blank")};return(0,i.jsxs)("div",{className:"relative",children:[(0,i.jsxs)(u.Z,{type:"button",onClick:a,variant:"outlined",color:"warning",size:"medium",sx:{display:"flex",alignItems:"end",gap:2},children:[(0,i.jsx)(s.Z,{icon:"octicon:chevron-down-12"}),(0,i.jsx)("span",{className:"hidden sm:block",children:"N\xe3o Conformidade"})]}),(0,i.jsx)(y.Z,{id:"basic-menu",anchorEl:n,open:t,onClose:o,MenuListProps:{"aria-labelledby":"basic-button"},PaperProps:{elevation:0,sx:{overflow:"visible",filter:"drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",mt:1.5,"& .MuiAvatar-root":{width:32,height:32,ml:-.5,mr:1}}},transformOrigin:{horizontal:"right",vertical:"top"},anchorOrigin:{horizontal:"right",vertical:"bottom"},children:r&&r.length>0&&(null==r?void 0:r.map(e=>e?(0,i.jsxs)(C.Z,{onClick(){o()},disabled:!!e.disabled,sx:{textAlign:"left",display:"flex",alignItems:"center",gap:"4px"},children:[(null==e?void 0:e.identification)?(0,i.jsxs)("span",{style:{padding:"0 7px"},children:[(0,i.jsx)("span",{children:e.identification})," -"]}):(0,i.jsx)(s.Z,{icon:e.icon,className:e.iconClass}),"report"==e.type?(0,i.jsx)("a",{onClick:()=>x(e),children:e.name}):(0,i.jsx)("p",{onClick:e.modal?()=>{d(!0),p(e)}:e.action,children:e.name})]},e.id):null))}),m&&(0,i.jsx)(k.Z,{title:m.name,handleConclusion:m.action,size:m.size,setOpenModal:d,openModal:c,fullHeight:m.fullHeight,children:m.component})]})};var M=t(78432),P=t(87536);let S=e=>{let{id:n,btnCancel:t,btnInactivate:o,btnSave:u,btnSend:x,btnNext:h,btnStatus:f,handleSubmit:v,manualUrl:y,btnNew:C,btnClose:k,handleModalClose:S,disabledSubmit:z,handleSend:I,componentSaveReport:D,iconConclusion:R,titleConclusion:E,disabledSend:O,handleBtnStatus:A,onclickDelete:_,onClickInactivate:L,btnDelete:T,btnPrint:F,disabledPrint:V,disabled:q,actions:B,actionsData:H,type:U,module:X,status:Y,partialRoute:J,outsideID:W,btnNewModal:G,handleNewModal:K,actionsNC:Q,btnActivate:$,onClickActivate:ee}=e,en=a(),{routes:et,user:ei}=(0,l.useContext)(c.V),{setId:eo,setModelID:ea,setRecebimentoMpID:el}=(0,l.useContext)(d.X),[es,er]=(0,l.useState)(!1),[ec,ed]=(0,l.useState)(null),[em,ep]=(0,l.useState)(null),{isLoading:eu}=(0,b.Z)(),{settings:ex}=(0,l.useContext)(Z.J6),[eh,eb]=(0,l.useState)(null),ef=(0,P.cI)({mode:"onChange"}),ej=(0,m.Z)("(min-width:640px)"),ev=Boolean(ec),eg=Boolean(em),eZ=e=>{ed(e.currentTarget)},ey=e=>{ep(e.currentTarget)},eC=()=>{ed(null)},ek=()=>{ep(null)},eN="new"===U&&J?(0,r.g_)((0,r.g_)(en.pathname)):"new"===U||J?(0,r.g_)(en.pathname):en.pathname;Object.keys(en.query).length>0&&(eN+="?".concat(new URLSearchParams(en.query).toString())),s.Z,s.Z,s.Z;//! Não Conformidades
let ew=()=>{if("recebimentoMp"===X){let e=ef.getValues("new");el(n),ea(e.modelo.id),en.push("/formularios/recebimento-mp/novo/?aba=nao-conformidade")}},eM=(e,n)=>{eo(e),en.push(n)},eP=async()=>{try{let e=null;"recebimentoMp"===X&&(e={endpoint:"formularios/recebimento-mp/nao-conformidade/getNCRecebimentoMp",route:"/formularios/recebimento-mp/?aba=nao-conformidade",componentNewNC:(0,i.jsx)(M.Z,{type:"form",data:null,form:ef})});let t=await N.h.post(e.endpoint,{id:n}),o={icon:"icons8:plus",name:"Nova N\xe3o Conformidade",modal:!0,component:e.componentNewNC,action:ew,size:"sm",disabled:!1},a=t.data.map(n=>{if(1===ei.papelID||n.fornecedorPreenche)return{icon:"typcn:warning-outline",name:n.nome,iconClass:"text-yellow-600",action:()=>eM(n.id,e.route),disabled:!1}}),l=1===ei.papelID?[o,...a]:a;eb(l)}catch(s){console.log(s)}};return(0,l.useEffect)(()=>{let e=()=>{er(!1),window.scrollY>0?er(!0):er(!1)};return eP(),window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]),(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"sticky ".concat(W?"-top-[4.5rem] px-4 bg-transparent":"top-[4.5rem]","  pb-2 mb-2 z-50 ").concat("dark"==ex.mode?"bg-[#161c24]":"bg-[#F7F7F9]"),children:(0,i.jsxs)("div",{className:"flex items-center justify-between w-full ",style:{zIndex:1e3},children:[(0,i.jsx)(g,{routes:et,currentUrl:eN,btnCancel:t,btnInactivate:o,btnDelete:T,btnStatus:f,btnClose:k,handleModalClose:S,status:Y,handleBtnStatus:A,onclickDelete:_,onClickInactivate:L,setId:eo,router:en,type:U,btnActivate:$,onClickActivate:ee}),(0,i.jsxs)("div",{className:"flex items-center gap-2",children:[Q&&eh&&(0,i.jsx)(w,{anchorEl:em,open:eg,handleClose:ek,handleClick:ey,disabled:q,disabledPrint:V,btnPrint:F,actionsData:eh,matches:ej}),B&&(0,i.jsx)(p.Z,{anchorEl:ec,open:ev,handleClose:eC,handleClick:eZ,disabled:q,disabledPrint:V,btnPrint:F,actionsData:H,actionsNCData:eh,matches:ej}),(0,i.jsx)(j,{btnSave:u,btnNew:C,btnSend:x,btnNext:h,manualUrl:y,routes:et,currentUrl:eN,handleSubmit:v,disabled:q,disabledSend:O,disabledSubmit:z,handleSend:I,iconConclusion:R,titleConclusion:E,btnNewModal:G,handleNewModal:K})]})]})})})};var z=S},84220:function(e,n,t){var i=t(85893),o=t(79072),a=t(55343),l=t(35966),s=t(67836),r=t(70918),c=t(53934),d=t(62097),m=t(51514),p=t(67294);let u=e=>{let{xs:n,md:t,title:u,options:x,name:h,limitTags:b,required:f,disabled:j,multiple:v,onChange:g,className:Z,createNew:y,helpText:C,alertRequired:k,helpTextPosition:N,opacity:w,form:M}=e,{setValue:P,getValues:S,setError:z,clearErrors:I,formState:{errors:D}}=M,R=(0,d.Z)(),{settings:E}=(0,m.r)(),O=y?[{nome:"-- Novo --"},...null!=x?x:[]]:x,A=(e,n)=>{n&&"-- Novo --"==e.target.innerText?y():(P(h,n),g&&g(n),f&&(!n||v&&0===n.length)?z(h,{type:"required",message:"".concat(u," \xe9 obrigat\xf3rio")}):I(h))},_=()=>{1===O.length&&(P(h,O[0]),g&&g(O[0]))};return(0,p.useEffect)(()=>{_()},[]),(0,i.jsx)(o.ZP,{item:!0,xs:n,md:t,sx:{my:1},className:Z,children:(0,i.jsxs)("div",{className:"relative",children:[(0,i.jsx)(a.Z,{fullWidth:!0,children:(0,i.jsx)(l.Z,{multiple:v,limitTags:b,size:"small",options:O,getOptionLabel:e=>(null==e?void 0:e.nome)||"",value:v?S(h)||[]:S(h)||null,disabled:j,onChange:A,renderInput:e=>(0,i.jsx)(s.Z,{...e,label:u,placeholder:u,sx:{opacity:w?.4:1,"& .MuiInputBase-input":{padding:"4px 14px !important"},...(f||k)&&!S(h)&&{"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:R.palette.error.main},"&:hover fieldset":{borderColor:R.palette.error.main},"&.Mui-focused fieldset":{borderColor:R.palette.error.main}},"& .MuiInputLabel-root":{color:R.palette.error.main},"& .MuiInputLabel-root.Mui-focused":{color:R.palette.error.main}}}}),PaperComponent(e){let{children:n}=e;return(0,i.jsx)(r.Z,{sx:{"& ul":{border:"dark"===E.mode?"1px solid rgba(".concat(R.palette.customColors.main,", 0.32)"):"null",borderRadius:"8px"}},children:n})},noOptionsText:"Sem op\xe7\xf5es"})}),C&&(0,i.jsx)("div",{className:"absolute right-[60px] top-[12px]",children:(0,i.jsx)(c.Z,{text:C,position:null!=N?N:"top"})})]})})};n.Z=u},78432:function(e,n,t){var i=t(85893),o=t(79072),a=t(18194),l=t(67294),s=t(60664),r=t(40039),c=t(84220);let d=e=>{let{form:n,type:t,data:d}=e,{loggedUnity:m}=(0,l.useContext)(r.V),[p,u]=(0,l.useState)(null),[x,h]=(0,l.useState)(null),b=async()=>{try{let e=await s.h.post("/formularios/recebimento-mp/nao-conformidade/getModels",{unidadeID:m.unidadeID});u(e.data)}catch(n){console.log(n)}},f=async()=>{try{let e=await s.h.post("/formularios/recebimento-mp/nao-conformidade/getRecebimentoMPNC",{unidadeID:m.unidadeID});h(e.data)}catch(n){console.log(n)}};return(0,l.useEffect)(()=>{b(),f()},[d]),(0,i.jsxs)("div",{className:"flex flex-col gap-8",children:["form"===t&&(0,i.jsx)(a.Z,{data:d}),(0,i.jsxs)(o.ZP,{container:!0,spacing:4,children:["list"===t&&(0,i.jsx)(c.Z,{xs:12,md:6,title:"Recebimento de MP",name:"new.recebimento",options:null!=x?x:[],helpText:"Selecione o Recebimento de MP para lan\xe7ar uma nova n\xe3o conformidade",form:n}),p&&(0,i.jsx)(c.Z,{xs:12,md:"form"===t?12:6,title:"Modelo de formul\xe1rio",name:"new.modelo",options:null!=p?p:[],value:(null==d?void 0:d.modelo)||(null==p?void 0:p.length)===1?p[0]:{nome:""},helpText:"Selecione um modelo de formul\xe1rio para o preenchimento desta n\xe3o conformidade para este Recebimento de MP",form:n})]})]})};n.Z=d},18194:function(e,n,t){var i=t(85893),o=t(79072),a=t(17575),l=t(11163),s=t(67294),r=t(21609),c=t(7071),d=t(40039),m=t(83830);let p=e=>{var n;let{data:t}=e;if(!t)return;let p=(0,l.useRouter)(),{user:u}=(0,s.useContext)(d.V),{setId:x}=(0,s.useContext)(m.X),h=()=>{x(t.recebimento.id),p.push("/formularios/recebimento-mp/")};return(0,i.jsxs)(o.ZP,{container:!0,spacing:4,children:[(0,i.jsxs)(o.ZP,{item:!0,xs:12,md:4,children:[(0,i.jsx)("label",{className:"opacity-60",children:"Fornecedor"}),(0,i.jsxs)("div",{className:"flex items-center gap-2",children:[(0,i.jsx)(r.Z,{icon:"mdi:truck-fast-outline"}),(0,i.jsx)("p",{children:t.recebimento.fornecedor})]})]}),(0,i.jsxs)(o.ZP,{item:!0,xs:12,md:3,children:[(0,i.jsx)("label",{className:"opacity-60",children:"Data e hora do recebimento"}),(0,i.jsxs)("div",{className:"flex items-center gap-2",children:[(0,i.jsx)(r.Z,{icon:"tabler:calendar-check"}),(0,i.jsx)("p",{children:"".concat(t.recebimento.dataRecebimentoMp," ").concat(t.recebimento.horaRecebimentoMp)})]})]}),(0,i.jsxs)(o.ZP,{item:!0,xs:12,md:3,children:[(0,i.jsx)("label",{className:"opacity-60",children:"NF"}),(0,i.jsxs)("div",{className:"flex items-center gap-2 ",children:[(0,i.jsx)(r.Z,{icon:"ion:document-text-outline"}),(0,i.jsx)("p",{children:null!==(n=t.recebimento.nfRecebimentoMp)&&void 0!==n?n:"--"})]})]}),(0,i.jsxs)(o.ZP,{item:!0,xs:12,md:2,children:[(0,i.jsx)("label",{className:"opacity-60",children:"Recebimento"}),(0,i.jsxs)("div",{className:"flex items-center gap-2",children:[(0,i.jsx)(c.Z,{skin:"light",label:t.recebimento.status.label,color:t.recebimento.status.color,sx:{height:28,fontSize:"0.75rem"}}),(2!=u.papelID||t.fornecedorAcessaRecebimento)&&(0,i.jsx)(a.Z,{title:"Acessar Recebimento de MP",placement:"top",children:(0,i.jsx)("div",{className:"cursor-pointer",children:(0,i.jsx)(r.Z,{icon:"ci:external-link",onClick:h})})})]})]})]})};n.Z=p},41088:function(e,n,t){var i=t(67294),o=t(83830);let a=()=>{let{isLoading:e,setIsLoading:n}=(0,i.useContext)(o.X),t=()=>{n(!0)},a=()=>{setTimeout(()=>{n(!1)},500)};return{isLoading:e,startLoading:t,stopLoading:a}};n.Z=a}}]);