(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3298],{37866:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/formularios/limpeza copy/Tabs/NaoConformidade/List",function(){return t(95769)}])},92024:function(e,a,t){"use strict";var o=t(85893),l=t(67294),i=t(44731),s=t(62097),n=t(41796),r=t(19550);let d=(0,l.forwardRef)((e,a)=>{let{sx:t,src:l,skin:d,color:c}=e,u=(0,s.Z)(),m=(0,r.Z)(),x=(e,a)=>"light"===e?{...m["".concat(a,"Light")]}:"light-static"===e?{color:m["".concat(a,"Light")].color,backgroundColor:(0,n.$n)(u.palette[a].main,.88)}:{...m["".concat(a,"Filled")]},p={primary:x(d,"primary"),secondary:x(d,"secondary"),success:x(d,"success"),error:x(d,"error"),warning:x(d,"warning"),info:x(d,"info")};return(0,o.jsx)(i.Z,{ref:a,...e,sx:!l&&d&&c?Object.assign(p[c],t):t})});d.defaultProps={skin:"filled",color:"primary"},a.Z=d},93250:function(e,a,t){"use strict";var o=t(85893),l=t(49837),i=t(91359),s=t(69175);let n=e=>{let{result:a,columns:t,btnNew:n=!0,btnPrint:r=!0,btnBack:d,openModal:c,modalLog:u,btnNewModal:m,handleNewModal:x,status:p,setStatus:h}=e;return(0,o.jsx)(l.Z,{className:"h-full",children:(0,o.jsx)(i.Z,{sx:{pt:"0",height:"100%"},children:(0,o.jsx)(s.Z,{rows:a,columns:t,modalLog:u,buttonsHeader:{btnNew:n,btnPrint:r,btnBack:d,openModal:c,btnNewModal:m,handleNewModal:x,status:p,setStatus:h}})})})};a.Z=n},46905:function(e,a,t){"use strict";var o=t(85893),l=t(87536),i=t(79072),s=t(55343),n=t(67836);let r=e=>{let{xs:a,md:t,title:r,name:d,disabled:c,required:u,form:m,onChange:x}=e;return(0,o.jsx)(i.ZP,{item:!0,xs:a,md:t,children:(0,o.jsx)("div",{children:(0,o.jsx)(s.Z,{fullWidth:!0,children:(0,o.jsx)(l.Qr,{name:d,control:m.control,rules:{required:u},render(e){let{field:a}=e;return(0,o.jsx)(n.Z,{label:r,value:null==a?void 0:a.value,placeholder:r,type:"date",size:"small","aria-describedby":"validation-schema-nome",disabled:c,error:!!m.formState.errors[d],onChange(e){let t=e.target.value;a.onChange(t),x&&x(t)},InputLabelProps:{shrink:!0},inputProps:{min:"1900-01-01",max:"2100-01-01"}})}})})})})};a.Z=r},55148:function(e,a,t){"use strict";var o=t(85893),l=t(79072),i=t(55343),s=t(35966),n=t(67836),r=t(87536),d=t(53934),c=t(30944);let u=e=>{let{xs:a,md:t,title:u,options:m,form:x,name:p,limitTags:h,value:f,required:g,disabled:j,multiple:v,onChange:Z,className:b,keyProps:N,createNew:y,helpText:w,helpTextPosition:z}=e,C=y?[{id:null,name:"-- Novo --"},...null!=m?m:[]]:m,{key:I}=(0,c.L0)();return(0,o.jsx)(l.ZP,{item:!0,xs:a,md:t,sx:{my:1},className:b,children:(0,o.jsxs)("div",{className:"relative",children:[(0,o.jsx)(i.Z,{fullWidth:!0,children:(0,o.jsx)(r.Qr,{name:p,control:x.control,rules:{required:g},render(e){var a;let{field:t}=e;return(0,o.jsx)(s.Z,{options:C.map(e=>e.name),value:null!=f?f:null===(a=x.getValues(p))||void 0===a?void 0:a.name,onChange(e,a){let t=C.find(e=>e.name===a);x.setValue(p,null!=t?t:null),Z&&Z(a)},renderInput(e){var a;return(0,o.jsx)(n.Z,{...e,id:"customSelect",size:"small",label:u,placeholder:u,error:!!x.formState.errors[p],helperText:null===(a=x.formState.errors[p])||void 0===a?void 0:a.message})}},N||I)}})}),w&&(0,o.jsx)("div",{className:"absolute right-[60px] top-[12px] ",children:(0,o.jsx)(d.Z,{text:w,position:null!=z?z:"top"})})]})})};a.Z=u},84220:function(e,a,t){"use strict";var o=t(85893),l=t(79072),i=t(55343),s=t(35966),n=t(67836),r=t(70918),d=t(53934),c=t(62097),u=t(51514),m=t(67294);let x=e=>{let{xs:a,md:t,title:x,options:p,name:h,limitTags:f,required:g,disabled:j,multiple:v,onChange:Z,className:b,createNew:N,helpText:y,alertRequired:w,helpTextPosition:z,opacity:C,form:I}=e,{setValue:P,getValues:S,setError:D,clearErrors:L,formState:{errors:M}}=I,k=(0,c.Z)(),{settings:E}=(0,u.r)(),T=N?[{nome:"-- Novo --"},...null!=p?p:[]]:p,_=v?T.filter(e=>{var a;return!(null===(a=S(h))||void 0===a?void 0:a.some(a=>a.nome===e.nome))}):T,O=(e,a)=>{if(a&&"-- Novo --"===e.target.innerText)N();else{if(v){let t=Array.from(new Set(a.map(e=>e.nome))).map(e=>a.find(a=>a.nome===e));P(h,t),Z&&Z(t)}else P(h,a),Z&&Z(a);g&&(!a||v&&0===a.length)?D(h,{type:"required",message:"".concat(x," \xe9 obrigat\xf3rio")}):L(h)}},q=()=>{1===T.length&&(P(h,T[0]),Z&&Z(T[0]))},F=()=>{g&&!S(h)?D(h,{type:"required",message:"".concat(x," \xe9 obrigat\xf3rio")}):L(h)};return(0,m.useEffect)(()=>{q(),F()},[]),(0,o.jsx)(l.ZP,{item:!0,xs:a,md:t,sx:{my:1},className:b,children:(0,o.jsxs)("div",{className:"relative",children:[(0,o.jsx)(i.Z,{fullWidth:!0,children:(0,o.jsx)(s.Z,{multiple:v,limitTags:f,size:"small",options:_,getOptionLabel:e=>(null==e?void 0:e.nome)||"",value:v?S(h)||[]:N||1!==_.length?S(h)||null:_[0],disabled:j,onChange:O,renderInput(e){var a,t,l;return(0,o.jsx)(n.Z,{...e,label:x,placeholder:x,sx:{opacity:C?.4:1,"& .MuiInputBase-input":{padding:"4px 14px !important"},...(g||w)&&(v?!(null===(a=S(h))||void 0===a?void 0:a.id)||(null===(t=S(h))||void 0===t?void 0:t.length)===0:!(null===(l=S(h))||void 0===l?void 0:l.id))&&{"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:k.palette.error.main},"&:hover fieldset":{borderColor:k.palette.error.main},"&.Mui-focused fieldset":{borderColor:k.palette.error.main}},"& .MuiInputLabel-root":{color:k.palette.error.main},"& .MuiInputLabel-root.Mui-focused":{color:k.palette.error.main}}}})},PaperComponent(e){let{children:a}=e;return(0,o.jsx)(r.Z,{sx:{"& ul":{border:"dark"===E.mode?"1px solid rgba(".concat(k.palette.customColors.main,", 0.32)"):"null",borderRadius:"8px"}},children:a})},noOptionsText:"Sem op\xe7\xf5es"})}),y&&(0,o.jsx)("div",{className:"absolute right-[60px] top-[12px]",children:(0,o.jsx)(d.Z,{text:y,position:null!=z?z:"top"})})]})})};a.Z=x},12073:function(e,a,t){"use strict";var o=t(85893),l=t(79072),i=t(17575),s=t(11163),n=t(67294),r=t(21609),d=t(7071),c=t(40039),u=t(83830);let m=e=>{let{data:a}=e;if(!a)return;console.log("\uD83D\uDE80 ~ LimpezaInfo:",a);let t=(0,s.useRouter)(),{user:m}=(0,n.useContext)(c.V),{setId:x}=(0,n.useContext)(u.X),p=()=>{x(a.limpeza.id),t.push("/formularios/limpeza/")};return(0,o.jsxs)(l.ZP,{container:!0,spacing:4,children:[(0,o.jsxs)(l.ZP,{item:!0,xs:12,md:3,children:[(0,o.jsx)("label",{className:"opacity-60",children:"Per\xedodo da limpeza"}),(0,o.jsxs)("div",{className:"flex items-center gap-2",children:[(0,o.jsx)(r.Z,{icon:"tabler:calendar-check"}),(0,o.jsx)("p",{children:"".concat(a.limpeza.dataInicio," a ").concat(a.limpeza.dataFim)})]})]}),(0,o.jsxs)(l.ZP,{item:!0,xs:12,md:4,children:[(0,o.jsx)("label",{className:"opacity-60",children:"Setor"}),(0,o.jsxs)("div",{className:"flex items-center gap-2",children:[(0,o.jsx)(r.Z,{icon:"fluent-mdl2:map-pin-12"}),(0,o.jsx)("p",{children:a.limpeza.setor})]})]}),(0,o.jsxs)(l.ZP,{item:!0,xs:12,md:3,children:[(0,o.jsx)("label",{className:"opacity-60",children:"Modelo"}),(0,o.jsxs)("div",{className:"flex items-center gap-2 ",children:[(0,o.jsx)(r.Z,{icon:"clarity:form-line"}),(0,o.jsx)("p",{children:a.limpeza.modelo})]})]}),(0,o.jsxs)(l.ZP,{item:!0,xs:12,md:2,children:[(0,o.jsx)("label",{className:"opacity-60",children:"Limpeza"}),(0,o.jsxs)("div",{className:"flex items-center gap-2",children:[(0,o.jsx)(d.Z,{skin:"light",label:a.limpeza.status.label,color:a.limpeza.status.color,sx:{height:28,fontSize:"0.75rem"}}),(2!=m.papelID||a.fornecedorAcessaRecebimento)&&(0,o.jsx)(i.Z,{title:"Acessar Limpeza e Higieniza\xe7\xe3o",placement:"top",children:(0,o.jsx)("div",{className:"cursor-pointer",children:(0,o.jsx)(r.Z,{icon:"ci:external-link",onClick:p})})})]})]})]})};a.Z=m},51239:function(e,a,t){"use strict";var o=t(85893),l=t(79072),i=t(12073),s=t(67294),n=t(60664),r=t(40039),d=t(84220);let c=e=>{let{form:a,type:t,data:c}=e,{loggedUnity:u}=(0,s.useContext)(r.V),[m,x]=(0,s.useState)(null),[p,h]=(0,s.useState)(null),f=async()=>{try{let e=await n.h.post("/formularios/limpeza/nao-conformidade/getModels",{unidadeID:u.unidadeID});x(e.data)}catch(a){console.log(a)}},g=async()=>{try{let e=await n.h.post("/formularios/limpeza/nao-conformidade/getLimpezaNC",{unidadeID:u.unidadeID});h(e.data)}catch(a){console.log(a)}};return(0,s.useEffect)(()=>{f(),g()},[c]),(0,o.jsxs)("div",{className:"flex flex-col gap-8",children:["form"===t&&(0,o.jsx)(i.Z,{data:c}),(0,o.jsxs)(l.ZP,{container:!0,spacing:4,children:["list"===t&&(0,o.jsx)(d.Z,{xs:12,md:6,title:"Limpeza",name:"new.limpeza",required:!0,options:null!=p?p:[],helpText:"Selecione a limpeza e higieniza\xe7\xe3o para lan\xe7ar uma nova n\xe3o conformidade",form:a}),m&&(0,o.jsx)(d.Z,{xs:12,md:"form"===t?12:6,title:"Modelo de formul\xe1rio",name:"new.modelo",required:!0,options:null!=m?m:[],value:(null==c?void 0:c.modelo)||(null==m?void 0:m.length)===1?m[0]:{nome:""},helpText:"Selecione um modelo de formul\xe1rio para o preenchimento desta n\xe3o conformidade para este Recebimento de MP",form:a})]})]})};a.Z=c},41088:function(e,a,t){"use strict";var o=t(67294),l=t(83830);let i=()=>{let{isLoading:e,setIsLoading:a}=(0,o.useContext)(l.X),t=()=>{a(!0)},i=()=>{setTimeout(()=>{a(!1)},500)};return{isLoading:e,startLoading:t,stopLoading:i}};a.Z=i},48836:function(e,a,t){"use strict";t.r(a);var o=t(85893),l=t(67294),i=t(46905),s=t(55148),n=t(51570),r=t(30944);let d=()=>{var e,a,t;let{form:d,setNames:c,filterDate:u,SelectFilterByName:m,data:x,setFilteredData:p,handleSearch:h,key:f}=(0,r.L0)(),{commonData:g}=(0,n.Lq)(),j=x,v=async()=>{p(j=await m(j=await m(j=await m(j=await u(j=await h(j)),"status"),"profissional"),"modelo"))};return(0,l.useEffect)(()=>{v()},[f]),(0,l.useEffect)(()=>{c(["dataInicio","dataFim","status","profissional","modelo"])},[]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.Z,{xs:12,md:6,title:"Data inicio da avaliac\xe3o",name:"dataInicio",form:d}),(0,o.jsx)(i.Z,{xs:12,md:6,title:"Data Fim da avalia\xe7\xe3o",name:"dataFim",form:d}),(0,o.jsx)(s.Z,{xs:12,md:6,title:"Status",name:"status",form:d,options:g.status,value:null===(e=d.getValues("status"))||void 0===e?void 0:e.name}),(0,o.jsx)(s.Z,{xs:12,md:6,title:"Profissional",name:"profissional",form:d,options:g.professional,value:null===(a=d.getValues("profissional"))||void 0===a?void 0:a.name}),(0,o.jsx)(s.Z,{xs:12,md:6,title:"Modelo",name:"modelo",value:null===(t=d.getValues("modelo"))||void 0===t?void 0:t.name,form:d,options:g.limpezaModel})]})};a.default=d},95769:function(e,a,t){"use strict";t.r(a);var o=t(85893),l=t(67294),i=t(60664),s=t(93250),n=t(60565),r=t(40039),d=t(47842),c=t(11163),u=t(71798),m=t(30944),x=t(48836),p=t(72819),h=t(51239),f=t(87536),g=t(83830);let j=()=>{let{user:e,loggedUnity:a}=(0,l.useContext)(r.V),t=(0,c.useRouter)(),{setModelID:j,setLimpezaID:v}=(0,l.useContext)(g.X),Z=t.pathname,{setTitle:b}=(0,l.useContext)(n.f),{startFilter:N,setFilteredDataLimpeza:y,filteredDataLimpeza:w,setDataLimpeza:z}=(0,m.L0)(),[C,I]=(0,l.useState)(!1),[P,S]=(0,l.useState)({module:"limpeza-nao-conformidade",type:"open"}),D=(0,f.cI)({mode:"onChange"}),L=async()=>{await i.h.post("/formularios/limpeza/nao-conformidade/getList",{unidadeID:a.unidadeID,papelID:e.papelID,usuarioID:e.usuarioID,status:P}).then(e=>{y(e.data),z(e.data),b({title:"N\xe3o Conformidades da Limpeza e Higieniza\xe7\xe3o",icon:"typcn:warning-outline",subtitle:{id:null,count:e.data.length,new:!1}})})},M=e=>{v(e.new.limpeza.id),j(e.new.modelo.id),t.push("/formularios/limpeza/novo/?aba=nao-conformidade")};(0,l.useEffect)(()=>{L(),N((0,o.jsx)(x.default,{}),!1)},[t.query,P]);let k=(0,u.OL)(Z,[{headerName:"ID",field:"id",size:.1},{headerName:"Data",field:"data",size:.7,type:"date"},{headerName:"Limpeza e Higieniza\xe7\xe3o",field:"limpezaID",size:1},{headerName:"Equipamentos",field:"equipamentos",size:1},{headerName:"Status",field:{name:"status",cor:"cor"},size:1,type:"statusSteps"}]);return(0,o.jsxs)(o.Fragment,{children:[w?(0,o.jsx)(s.Z,{result:w,columns:k,btnNew:!1,btnNewModal:1===e.papelID,handleNewModal:()=>I(!0),status:P,setStatus:S},w):(0,o.jsx)(d.Z,{show:!0}),(0,o.jsx)(p.Z,{title:"Nova N\xe3o Conformidade",handleConclusion:M,size:"lg",setOpenModal:I,openModal:C,form:D,children:(0,o.jsx)(h.Z,{form:D,type:"list",data:null})})]})};a.default=j},69175:function(e,a,t){"use strict";t.d(a,{Z:function(){return w}});var o=t(85893),l=t(67294),i=t(3693),s=t(75680),n=t(87653),r=t(83830),d=t(1890),c=t(60664),u=t(11163),m=t(77745),x=t(29630),p=t(95398),h=t(79072),f=t(21609),g=t(80562),j=t(40039),v=t(66136),Z=t(92024);let b=e=>{let{open:a,handleClose:t,row:i}=e,s=(0,u.useRouter)(),[n,r]=(0,l.useState)(null),{loggedUnity:b}=(0,l.useContext)(j.V),N=s.pathname,{settings:y}=(0,l.useContext)(v.J6),w=y.mode,z=async()=>{let e=await c.h.get("".concat(N,"/getData/").concat(b.unidadeID,"/").concat(i.id));r(e.data)};return(0,l.useEffect)(()=>{i&&z()},[i]),i&&n&&(0,o.jsxs)(d.Z,{open:a,onClose:t,scroll:"paper",maxWidth:"md",fullWidth:!0,children:[(0,o.jsxs)(m.Z,{id:"customized-dialog-title",sx:{textAlign:"center"},children:[(0,o.jsx)(x.Z,{variant:"h5",component:"span",children:i.nome}),(0,o.jsx)(x.Z,{variant:"body2",children:"Este log #".concat(i.id," gerou um total de ").concat(n.length," ").concat(1==n.length?"script":"scripts")}),(0,o.jsx)(g.Z,{"aria-label":"close",onClick:t,sx:{top:10,right:10,position:"absolute",color:"grey.500"},children:(0,o.jsx)(f.Z,{icon:"mdi:close"})})]}),(0,o.jsxs)(p.Z,{sx:{p:10,mt:8},children:[(0,o.jsxs)(h.ZP,{container:!0,spacing:8,children:[(0,o.jsxs)(h.ZP,{item:!0,md:4,sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,o.jsx)(f.Z,{icon:"fluent-mdl2:date-time-mirrored",className:"text-5xl"}),(0,o.jsx)("span",{children:i.dataHora})]}),(0,o.jsxs)(h.ZP,{item:!0,md:4,sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,o.jsx)(f.Z,{icon:"majesticons:user-line",className:"text-5xl"}),(0,o.jsx)("span",{children:i.usuario})]}),(0,o.jsxs)(h.ZP,{item:!0,md:4,sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,o.jsx)(f.Z,{icon:"material-symbols-light:bring-your-own-ip",className:"text-5xl"}),(0,o.jsx)("span",{children:i.ip})]})]}),(0,o.jsx)("div",{className:"flex flex-col gap-4 mt-8",children:n.map(e=>(0,o.jsxs)("div",{className:"border ".concat("dark"==w?"border-white/20":"border-black/20","   rounded-xl p-4 space-y-4 h-auto"),children:[(0,o.jsxs)("div",{className:"flex items-center justify-between",children:[(0,o.jsxs)("div",{className:"flex items-center gap-1",children:[(0,o.jsx)(Z.Z,{skin:"light",color:"insert"==e.operacao?"success":"update"==e.operacao?"warning":"delete"==e.operacao?"error":(e.operacao,"info"),variant:"rounded",sx:{mr:3,width:48,height:48},children:(0,o.jsx)(f.Z,{icon:"insert"==e.operacao?"dashicons:insert":"update"==e.operacao?"akar-icons:edit":"delete"==e.operacao?"mingcute:delete-line":"login"==e.operacao?"ic:round-login":"email"==e.operacao?"mynaui:send":"ic:round-logout"})}),(0,o.jsx)(x.Z,{sx:{color:"text.secondary",marginTop:"-4px"},children:"insert"==e.operacao?"Inclus\xe3o":"update"==e.operacao?"Altera\xe7\xe3o":"delete"==e.operacao?"Exclus\xe3o":"login"==e.operacao?"Login efetuado":"email"==e.operacao?"Envio de E-mail":"Logout efetuado"})]}),(0,o.jsx)("div",{children:(0,o.jsxs)("div",{className:"flex flex-col justify-end ",children:[(0,o.jsx)(x.Z,{variant:"caption",sx:{color:"text.disabled",textAlign:"right"},children:"Tabela"}),(0,o.jsx)(x.Z,{sx:{color:"text.secondary",marginTop:"-4px"},children:e.tabela})]})})]}),(0,o.jsx)("div",{className:"".concat("dark"===w?"bg-[#212b36]":"bg-[#f7f7f9]"," p-2 rounded-lg"),children:(0,o.jsx)("pre",{children:function(e,a){try{let t=JSON.parse(e),l=JSON.stringify(t,null,2);return l=l.replace(/(\"alterado\": true)/g,'<span style="background-color: #ce9728; padding: 2px 1px; border-radius: 4px">$1</span>'),(0,o.jsx)("pre",{dangerouslySetInnerHTML:{__html:l}})}catch(i){return e}}(e.alteracao,e.operacao)})})]}))}),(0,o.jsx)("div",{})]})]})};var N=t(30944);let y=e=>{let{rows:a,columns:t,buttonsHeader:d,modalLog:c}=e,{pageSize:u,setPageSize:m,data:x}=(0,N.L0)(),{setId:p}=(0,l.useContext)(r.X),[h,f]=(0,l.useState)(null),[g,j]=(0,l.useState)(!1);function v(e){let a=e.split("/");return"".concat(a[2],"-").concat(a[1],"-").concat(a[0])}x.slice().sort((e,a)=>"Inativo"===e.status&&"Inativo"!==a.status?1:"Inativo"!==e.status&&"Inativo"===a.status?-1:0),t.map(e=>{"date"===e.type&&(e.sortComparator=(e,a)=>{let t=v(e),o=v(a);return t.localeCompare(o)})});let Z=e=>{c?(f(e),j(!0)):p(e.id)};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i._,{localeText:s.F.components.MuiDataGrid.defaultProps.localeText,autoHeight:!0,columns:t,pageSize:u,rowsPerPageOptions:[10,20,30,40,50,100],components:{Toolbar:n.Z},rows:a,onCellClick(e,a){Z(e.row)},onPageSizeChange:e=>m(e),sx:{"& .MuiDataGrid-cell":{cursor:"pointer",overflow:"scroll"}},componentsProps:{toolbar:{buttonsHeader:d,rows:a}}}),(0,o.jsx)(b,{open:g,handleClose:()=>j(!1),row:h})]})};var w=y}},function(e){e.O(0,[4738,172,3005,9774,2888,179],function(){return e(e.s=37866)}),_N_E=e.O()}]);