(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3672],{79840:function(e,l,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/formularios/limpeza/Tabs/NaoConformidade/List",function(){return i(7113)}])},84220:function(e,l,i){"use strict";var o=i(85893),t=i(79072),a=i(55343),n=i(35966),s=i(67836),r=i(70918),d=i(53934),c=i(62097),m=i(51514),u=i(67294);let p=e=>{let{xs:l,md:i,title:p,options:x,name:f,limitTags:h,required:j,disabled:v,multiple:g,onChange:Z,className:b,createNew:z,helpText:N,alertRequired:C,helpTextPosition:y,opacity:I,form:P}=e,{setValue:_,getValues:w,setError:M,clearErrors:k,formState:{errors:L}}=P,S=(0,c.Z)(),{settings:T}=(0,m.r)(),D=z?[{nome:"-- Novo --"},...null!=x?x:[]]:x,E=g?D.filter(e=>{var l;return!(null===(l=w(f))||void 0===l?void 0:l.some(l=>l.nome===e.nome))}):D,O=(e,l)=>{if(l&&"-- Novo --"===e.target.innerText)z();else{if(g){let i=Array.from(new Set(l.map(e=>e.nome))).map(e=>l.find(l=>l.nome===e));_(f,i),Z&&Z(i)}else _(f,l),Z&&Z(l);j&&(!l||g&&0===l.length)?M(f,{type:"required",message:"".concat(p," \xe9 obrigat\xf3rio")}):k(f)}},R=()=>{1===D.length&&(_(f,D[0]),Z&&Z(D[0]))};return(0,u.useEffect)(()=>{R()},[]),(0,o.jsx)(t.ZP,{item:!0,xs:l,md:i,sx:{my:1},className:b,children:(0,o.jsxs)("div",{className:"relative",children:[(0,o.jsx)(a.Z,{fullWidth:!0,children:(0,o.jsx)(n.Z,{multiple:g,limitTags:h,size:"small",options:E,getOptionLabel:e=>(null==e?void 0:e.nome)||"",value:g?w(f)||[]:z||1!==E.length?w(f)||null:E[0],disabled:v,onChange:O,renderInput(e){var l,i,t;return(0,o.jsx)(s.Z,{...e,label:p,placeholder:p,sx:{opacity:I?.4:1,"& .MuiInputBase-input":{padding:"4px 14px !important"},...(j||C)&&(g?!(null===(l=w(f))||void 0===l?void 0:l.id)||(null===(i=w(f))||void 0===i?void 0:i.length)===0:!(null===(t=w(f))||void 0===t?void 0:t.id))&&{"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:S.palette.error.main},"&:hover fieldset":{borderColor:S.palette.error.main},"&.Mui-focused fieldset":{borderColor:S.palette.error.main}},"& .MuiInputLabel-root":{color:S.palette.error.main},"& .MuiInputLabel-root.Mui-focused":{color:S.palette.error.main}}}})},PaperComponent(e){let{children:l}=e;return(0,o.jsx)(r.Z,{sx:{"& ul":{border:"dark"===T.mode?"1px solid rgba(".concat(S.palette.customColors.main,", 0.32)"):"null",borderRadius:"8px"}},children:l})},noOptionsText:"Sem op\xe7\xf5es"})}),N&&(0,o.jsx)("div",{className:"absolute right-[60px] top-[12px]",children:(0,o.jsx)(d.Z,{text:N,position:null!=y?y:"top"})})]})})};l.Z=p},12073:function(e,l,i){"use strict";var o=i(85893),t=i(79072),a=i(17575),n=i(11163),s=i(67294),r=i(21609),d=i(7071),c=i(40039),m=i(83830);let u=e=>{let{data:l}=e;if(!l)return;console.log("\uD83D\uDE80 ~ LimpezaInfo:",l);let i=(0,n.useRouter)(),{user:u}=(0,s.useContext)(c.V),{setId:p}=(0,s.useContext)(m.X),x=()=>{p(l.limpeza.id),i.push("/formularios/limpeza/")};return(0,o.jsxs)(t.ZP,{container:!0,spacing:4,children:[(0,o.jsxs)(t.ZP,{item:!0,xs:12,md:3,children:[(0,o.jsx)("label",{className:"opacity-60",children:"Per\xedodo da limpeza"}),(0,o.jsxs)("div",{className:"flex items-center gap-2",children:[(0,o.jsx)(r.Z,{icon:"tabler:calendar-check"}),(0,o.jsx)("p",{children:"".concat(l.limpeza.dataInicio," a ").concat(l.limpeza.dataFim)})]})]}),(0,o.jsxs)(t.ZP,{item:!0,xs:12,md:4,children:[(0,o.jsx)("label",{className:"opacity-60",children:"Setor"}),(0,o.jsxs)("div",{className:"flex items-center gap-2",children:[(0,o.jsx)(r.Z,{icon:"fluent-mdl2:map-pin-12"}),(0,o.jsx)("p",{children:l.limpeza.setor})]})]}),(0,o.jsxs)(t.ZP,{item:!0,xs:12,md:3,children:[(0,o.jsx)("label",{className:"opacity-60",children:"Modelo"}),(0,o.jsxs)("div",{className:"flex items-center gap-2 ",children:[(0,o.jsx)(r.Z,{icon:"clarity:form-line"}),(0,o.jsx)("p",{children:l.limpeza.modelo})]})]}),(0,o.jsxs)(t.ZP,{item:!0,xs:12,md:2,children:[(0,o.jsx)("label",{className:"opacity-60",children:"Limpeza"}),(0,o.jsxs)("div",{className:"flex items-center gap-2",children:[(0,o.jsx)(d.Z,{skin:"light",label:l.limpeza.status.label,color:l.limpeza.status.color,sx:{height:28,fontSize:"0.75rem"}}),(2!=u.papelID||l.fornecedorAcessaRecebimento)&&(0,o.jsx)(a.Z,{title:"Acessar Limpeza e Higieniza\xe7\xe3o",placement:"top",children:(0,o.jsx)("div",{className:"cursor-pointer",children:(0,o.jsx)(r.Z,{icon:"ci:external-link",onClick:x})})})]})]})]})};l.Z=u},51239:function(e,l,i){"use strict";var o=i(85893),t=i(79072),a=i(12073),n=i(67294),s=i(60664),r=i(40039),d=i(84220);let c=e=>{let{form:l,type:i,data:c}=e,{loggedUnity:m}=(0,n.useContext)(r.V),[u,p]=(0,n.useState)(null),[x,f]=(0,n.useState)(null),h=async()=>{try{let e=await s.h.post("/formularios/limpeza/nao-conformidade/getModels",{unidadeID:m.unidadeID});p(e.data)}catch(l){console.log(l)}},j=async()=>{try{let e=await s.h.post("/formularios/limpeza/nao-conformidade/getLimpezaNC",{unidadeID:m.unidadeID});f(e.data)}catch(l){console.log(l)}};return(0,n.useEffect)(()=>{h(),j()},[c]),(0,o.jsxs)("div",{className:"flex flex-col gap-8",children:["form"===i&&(0,o.jsx)(a.Z,{data:c}),(0,o.jsxs)(t.ZP,{container:!0,spacing:4,children:["list"===i&&(0,o.jsx)(d.Z,{xs:12,md:6,title:"Limpeza",name:"new.limpeza",required:!0,options:null!=x?x:[],helpText:"Selecione a limpeza e higieniza\xe7\xe3o para lan\xe7ar uma nova n\xe3o conformidade",form:l}),u&&(0,o.jsx)(d.Z,{xs:12,md:"form"===i?12:6,title:"Modelo de formul\xe1rio",name:"new.modelo",required:!0,options:null!=u?u:[],value:(null==c?void 0:c.modelo)||(null==u?void 0:u.length)===1?u[0]:{nome:""},helpText:"Selecione um modelo de formul\xe1rio para o preenchimento desta n\xe3o conformidade para este Recebimento de MP",form:l})]})]})};l.Z=c},41088:function(e,l,i){"use strict";var o=i(67294),t=i(83830);let a=()=>{let{isLoading:e,setIsLoading:l}=(0,o.useContext)(t.X),i=()=>{l(!0)},a=()=>{setTimeout(()=>{l(!1)},500)};return{isLoading:e,startLoading:i,stopLoading:a}};l.Z=a}},function(e){e.O(0,[4738,5206,8428,7113,9774,2888,179],function(){return e(e.s=79840)}),_N_E=e.O()}]);