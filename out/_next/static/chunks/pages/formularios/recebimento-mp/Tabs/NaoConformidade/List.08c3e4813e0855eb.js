(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5842],{63674:function(e,o,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/formularios/recebimento-mp/Tabs/NaoConformidade/List",function(){return n(41284)}])},84220:function(e,o,n){"use strict";var t=n(85893),i=n(79072),r=n(55343),l=n(35966),s=n(67836),a=n(9041),c=n(61953),d=n(17575),m=n(80562),u=n(70918),p=n(53934),x=n(62097),f=n(51514),h=n(67294),b=n(21609),j=n(83830),v=n(11163);let g=e=>{let{xs:o,md:n,title:g,options:Z,name:N,limitTags:C,required:P,disabled:y,multiple:M,onChange:I,className:R,createNew:k,helpText:_,alertRequired:w,helpTextPosition:S,opacity:T,link:E,form:A}=e,{setValue:D,getValues:O,setError:X,clearErrors:q,formState:{errors:L}}=A,z=(0,x.Z)(),{settings:F}=(0,f.r)(),{setId:V}=(0,h.useContext)(j.X),B=(0,v.useRouter)(),[W,G]=(0,h.useState)(""),H=k?[{nome:"-- Novo --"},...null!=Z?Z:[]]:Z,J=M?H.filter(e=>{var o;return!(null===(o=O(N))||void 0===o?void 0:o.some(o=>o.nome===e.nome))}):H,K=(e,o)=>{if(o&&"-- Novo --"===e.target.innerText)k();else{if(M){let n=Array.from(new Set(o.map(e=>e.nome))).map(e=>o.find(o=>o.nome===e));D(N,n),I&&I(n)}else D(N,o),I&&I(o);P&&(!o||M&&0===o.length)?X(N,{type:"required",message:"".concat(g," \xe9 obrigat\xf3rio")}):q(N)}},Q=()=>{1===H.length&&(D(N,H[0]),I&&I(H[0]))},U=()=>{P&&!O(N)?X(N,{type:"required",message:"".concat(g," \xe9 obrigat\xf3rio")}):q(N)},Y=()=>{if(E){var e;V(null===(e=O(N))||void 0===e?void 0:e.id),B.push(E)}};return(0,h.useEffect)(()=>{Q(),U()},[]),(0,t.jsx)(i.ZP,{item:!0,xs:o,md:n,sx:{my:1},className:R,children:(0,t.jsx)(r.Z,{fullWidth:!0,children:(0,t.jsx)(l.Z,{multiple:M,limitTags:C,size:"small",options:J,getOptionLabel:e=>(null==e?void 0:e.nome)||"",value:M?O(N)||[]:k||1!==J.length?O(N)||null:J[0],inputValue:W,onInputChange(e,o){G(o)},disabled:y,onChange:K,renderInput(e){var o,n,i,r;return(0,t.jsx)(s.Z,{...e,label:g,placeholder:g,sx:{opacity:T?.4:1,"& .MuiInputBase-input":{padding:"4px 14px !important"},...(P||w)&&(M?!(null===(o=O(N))||void 0===o?void 0:o.id)||(null===(n=O(N))||void 0===n?void 0:n.length)===0:!(null===(i=O(N))||void 0===i?void 0:i.id))&&{"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:z.palette.error.main},"&:hover fieldset":{borderColor:z.palette.error.main},"&.Mui-focused fieldset":{borderColor:z.palette.error.main}},"& .MuiInputLabel-root":{color:z.palette.error.main},"& .MuiInputLabel-root.Mui-focused":{color:z.palette.error.main}}},InputProps:{...e.InputProps,endAdornment:(0,t.jsxs)(t.Fragment,{children:[e.InputProps.endAdornment,(0,t.jsx)(a.Z,{position:"end",children:(0,t.jsxs)(c.Z,{sx:{display:"flex",gap:1,alignItems:"center"},children:[_&&(0,t.jsx)(p.Z,{text:_,position:null!=S?S:"top"}),E&&(null===(r=O(N))||void 0===r?void 0:r.id)>0&&(0,t.jsx)(d.Z,{title:"Acessar cadastro",placement:"top",children:(0,t.jsx)(m.Z,{onClick:Y,sx:{color:z.palette.secondary.main},className:"opacity-70",children:(0,t.jsx)(b.Z,{icon:"heroicons-outline:external-link",fontSize:16})})})]})})]})}})},PaperComponent(e){let{children:o}=e;return(0,t.jsx)(u.Z,{sx:{"& ul":{border:"dark"===F.mode?"1px solid rgba(".concat(z.palette.customColors.main,", 0.32)"):"null",borderRadius:"8px"}},children:o})},noOptionsText:"Sem op\xe7\xf5es"})})})};o.Z=g},78432:function(e,o,n){"use strict";var t=n(85893),i=n(79072),r=n(18194),l=n(67294),s=n(60664),a=n(40039),c=n(84220);n(29308);let d=e=>{let{form:o,type:n,data:d}=e,{loggedUnity:m}=(0,l.useContext)(a.V),[u,p]=(0,l.useState)(null),[x,f]=(0,l.useState)(null),h=async()=>{try{let e=await s.h.post("/formularios/recebimento-mp/nao-conformidade/getModels",{unidadeID:m.unidadeID});p(e.data)}catch(o){console.log(o)}},b=async()=>{try{let e=await s.h.post("/formularios/recebimento-mp/nao-conformidade/getRecebimentoMPNC",{unidadeID:m.unidadeID});f(e.data)}catch(o){console.log(o)}};return(0,l.useEffect)(()=>{h(),b()},[d]),(0,t.jsxs)("div",{className:"flex flex-col gap-8",children:["form"===n&&(0,t.jsx)(r.Z,{data:d}),(0,t.jsxs)(i.ZP,{container:!0,spacing:4,children:["list"===n&&(0,t.jsx)(c.Z,{xs:12,md:6,title:"Recebimento de MP",name:"new.recebimento",options:null!=x?x:[],helpText:"Selecione o Recebimento de MP para lan\xe7ar uma nova n\xe3o conformidade",form:o,required:!0}),u&&(0,t.jsx)(c.Z,{xs:12,md:"form"===n?12:6,title:"Modelo de formul\xe1rio",name:"new.modelo",options:null!=u?u:[],value:(null==d?void 0:d.modelo)||(null==u?void 0:u.length)===1?u[0]:{nome:""},helpText:"Selecione um modelo de formul\xe1rio para o preenchimento desta n\xe3o conformidade para este Recebimento de MP",form:o,required:!0})]})]})};o.Z=d},18194:function(e,o,n){"use strict";var t=n(85893),i=n(79072),r=n(17575),l=n(11163),s=n(67294),a=n(21609),c=n(7071),d=n(40039),m=n(83830);let u=e=>{var o;let{data:n}=e;if(!n)return;let u=(0,l.useRouter)(),{user:p}=(0,s.useContext)(d.V),{setId:x}=(0,s.useContext)(m.X),f=()=>{x(n.recebimento.id),u.push("/formularios/recebimento-mp/")};return(0,t.jsxs)(i.ZP,{container:!0,spacing:4,children:[(0,t.jsxs)(i.ZP,{item:!0,xs:12,md:4,children:[(0,t.jsx)("label",{className:"opacity-60",children:"Fornecedor"}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(a.Z,{icon:"mdi:truck-fast-outline"}),(0,t.jsx)("p",{children:n.recebimento.fornecedor})]})]}),(0,t.jsxs)(i.ZP,{item:!0,xs:12,md:3,children:[(0,t.jsx)("label",{className:"opacity-60",children:"Data e hora do recebimento"}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(a.Z,{icon:"tabler:calendar-check"}),(0,t.jsx)("p",{children:"".concat(n.recebimento.dataRecebimentoMp," ").concat(n.recebimento.horaRecebimentoMp)})]})]}),(0,t.jsxs)(i.ZP,{item:!0,xs:12,md:3,children:[(0,t.jsx)("label",{className:"opacity-60",children:"NF"}),(0,t.jsxs)("div",{className:"flex items-center gap-2 ",children:[(0,t.jsx)(a.Z,{icon:"ion:document-text-outline"}),(0,t.jsx)("p",{children:null!==(o=n.recebimento.nfRecebimentoMp)&&void 0!==o?o:"--"})]})]}),(0,t.jsxs)(i.ZP,{item:!0,xs:12,md:2,children:[(0,t.jsx)("label",{className:"opacity-60",children:"Recebimento"}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(c.Z,{skin:"light",label:n.recebimento.status.label,color:n.recebimento.status.color,sx:{height:28,fontSize:"0.75rem"}}),(2!=p.papelID||n.fornecedorAcessaRecebimento)&&(0,t.jsx)(r.Z,{title:"Acessar Recebimento de MP",placement:"top",children:(0,t.jsx)("div",{className:"cursor-pointer",children:(0,t.jsx)(a.Z,{icon:"ci:external-link",onClick:f})})})]})]})]})};o.Z=u},41088:function(e,o,n){"use strict";var t=n(67294),i=n(83830);let r=()=>{let{isLoading:e,setIsLoading:o}=(0,t.useContext)(i.X),n=()=>{o(!0)},r=()=>{setTimeout(()=>{o(!1)},500)};return{isLoading:e,startLoading:n,stopLoading:r}};o.Z=r}},function(e){e.O(0,[4738,172,3005,1284,9774,2888,179],function(){return e(e.s=63674)}),_N_E=e.O()}]);