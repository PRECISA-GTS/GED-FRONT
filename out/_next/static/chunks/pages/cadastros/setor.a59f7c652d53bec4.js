(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4988],{61556:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/cadastros/setor",function(){return a(34241)}])},92024:function(e,t,a){"use strict";var n=a(85893),s=a(67294),r=a(44731),o=a(62097),l=a(41796),i=a(19550);let c=(0,s.forwardRef)((e,t)=>{let{sx:a,src:s,skin:c,color:d}=e,u=(0,o.Z)(),x=(0,i.Z)(),m=(e,t)=>"light"===e?{...x["".concat(t,"Light")]}:"light-static"===e?{color:x["".concat(t,"Light")].color,backgroundColor:(0,l.$n)(u.palette[t].main,.88)}:{...x["".concat(t,"Filled")]},p={primary:m(c,"primary"),secondary:m(c,"secondary"),success:m(c,"success"),error:m(c,"error"),warning:m(c,"warning"),info:m(c,"info")};return(0,n.jsx)(r.Z,{ref:t,...e,sx:!s&&c&&d?Object.assign(p[d],a):a})});c.defaultProps={skin:"filled",color:"primary"},t.Z=c},93250:function(e,t,a){"use strict";var n=a(85893),s=a(49837),r=a(91359),o=a(69175);let l=e=>{let{result:t,columns:a,btnNew:l=!0,btnPrint:i=!0,btnBack:c,openModal:d,modalLog:u,btnNewModal:x,handleNewModal:m}=e;return(0,n.jsx)(s.Z,{children:(0,n.jsx)(r.Z,{sx:{pt:"0"},children:(0,n.jsx)(o.Z,{rows:t,columns:a,modalLog:u,buttonsHeader:{btnNew:l,btnPrint:i,btnBack:c,openModal:d,btnNewModal:x,handleNewModal:m}})})})};t.Z=l},46905:function(e,t,a){"use strict";var n=a(85893),s=a(87536),r=a(79072),o=a(55343),l=a(67836);let i=e=>{let{xs:t,md:a,title:i,name:c,disabled:d,required:u,form:x,onChange:m}=e;return(0,n.jsx)(r.ZP,{item:!0,xs:t,md:a,children:(0,n.jsx)("div",{children:(0,n.jsx)(o.Z,{fullWidth:!0,children:(0,n.jsx)(s.Qr,{name:c,control:x.control,rules:{required:u},render(e){let{field:t}=e;return(0,n.jsx)(l.Z,{label:i,value:null==t?void 0:t.value,placeholder:i,type:"date",size:"small","aria-describedby":"validation-schema-nome",disabled:d,error:!!x.formState.errors[c],onChange(e){let a=e.target.value;t.onChange(a),m&&m(a)},InputLabelProps:{shrink:!0},inputProps:{min:"1900-01-01",max:"2100-01-01"}})}})})})})};t.Z=i},55148:function(e,t,a){"use strict";var n=a(85893),s=a(79072),r=a(55343),o=a(35966),l=a(67836),i=a(87536),c=a(53934),d=a(30944);let u=e=>{let{xs:t,md:a,title:u,options:x,form:m,name:p,limitTags:h,value:f,required:g,disabled:j,multiple:v,onChange:Z,className:b,keyProps:y,createNew:w,helpText:N,helpTextPosition:C}=e,P=w?[{id:null,name:"-- Novo --"},...null!=x?x:[]]:x,{key:k}=(0,d.L0)();return(0,n.jsx)(s.ZP,{item:!0,xs:t,md:a,sx:{my:1},className:b,children:(0,n.jsxs)("div",{className:"relative",children:[(0,n.jsx)(r.Z,{fullWidth:!0,children:(0,n.jsx)(i.Qr,{name:p,control:m.control,rules:{required:g},render(e){var t;let{field:a}=e;return(0,n.jsx)(o.Z,{options:P.map(e=>e.name),value:null!=f?f:null===(t=m.getValues(p))||void 0===t?void 0:t.name,onChange(e,t){let a=P.find(e=>e.name===t);m.setValue(p,null!=a?a:null),Z&&Z(t)},renderInput(e){var t;return(0,n.jsx)(l.Z,{...e,id:"customSelect",size:"small",label:u,placeholder:u,error:!!m.formState.errors[p],helperText:null===(t=m.formState.errors[p])||void 0===t?void 0:t.message})}},y||k)}})}),N&&(0,n.jsx)("div",{className:"absolute right-[60px] top-[12px] ",children:(0,n.jsx)(c.Z,{text:N,position:null!=C?C:"top"})})]})})};t.Z=u},80045:function(e,t,a){"use strict";a.r(t);var n=a(85893),s=a(67294),r=a(46905),o=a(55148),l=a(51570),i=a(30944);let c=()=>{var e;let{form:t,setNames:a,filterDate:c,SelectFilterByName:d,data:u,setFilteredData:x,handleSearch:m,key:p,searchText:h}=(0,i.L0)(),{commonData:f}=(0,l.Lq)(),g=u,j=async()=>{x(g=await m(g))};return(0,s.useEffect)(()=>{j()},[p]),(0,s.useEffect)(()=>{a([])},[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.Z,{xs:12,md:6,title:"Data inicio da avaliac\xe3o",name:"dataInicio",form:t}),(0,n.jsx)(r.Z,{xs:12,md:6,title:"Data Fim da avalia\xe7\xe3o",name:"dataFim",form:t}),(0,n.jsx)(o.Z,{xs:12,md:6,title:"Status",name:"status",form:t,options:f.status,value:null===(e=t.getValues("status"))||void 0===e?void 0:e.name})]})};t.default=c},34241:function(e,t,a){"use strict";a.r(t);var n=a(85893),s=a(67294),r=a(60664),o=a(93250),l=a(83830),i=a(60565),c=a(40039),d=a(47842),u=a(11163),x=a(71798),m=a(30944),p=a(80045),h=a(29274);let f=()=>{let e=(0,u.useRouter)(),{id:t}=(0,s.useContext)(l.X),a=e.pathname,{setTitle:f}=(0,s.useContext)(i.f),{loggedUnity:g}=(0,s.useContext)(c.V),{filteredData:j,setFilteredData:v,setData:Z,startFilter:b}=(0,m.L0)(),y=async()=>{await r.h.post(a,{unidadeID:g.unidadeID}).then(e=>{v(e.data),Z(e.data),f({icon:"fluent-mdl2:map-pin-12",title:"Setor",subtitle:{id:t,count:e.data.length,new:!1}})})};(0,s.useEffect)(()=>{y(),b((0,n.jsx)(p.default,{}))},[t]);let w=(0,x.OL)(a,[{title:"ID",field:"id",size:.1},{title:"Nome",field:"nome",size:.3},{title:"Equipamentos",field:"equipamentos",size:.5},{headerName:"Status",field:{name:"status",cor:"cor"},size:.1}]);return(0,n.jsx)(n.Fragment,{children:j?t&&t>0?(0,n.jsx)(h.Z,{id:t}):(0,n.jsx)(o.Z,{result:j,columns:w}):(0,n.jsx)(d.Z,{})})};t.default=f},69175:function(e,t,a){"use strict";a.d(t,{Z:function(){return N}});var n=a(85893),s=a(67294),r=a(18104),o=a(75680),l=a(78082),i=a(83830),c=a(1890),d=a(60664),u=a(11163),x=a(77745),m=a(29630),p=a(95398),h=a(79072),f=a(21609),g=a(80562),j=a(40039),v=a(66136),Z=a(92024);let b=e=>{let{open:t,handleClose:a,row:r}=e,o=(0,u.useRouter)(),[l,i]=(0,s.useState)(null),{loggedUnity:b}=(0,s.useContext)(j.V),y=o.pathname,{settings:w}=(0,s.useContext)(v.J6),N=w.mode,C=async()=>{let e=await d.h.get("".concat(y,"/getData/").concat(b.unidadeID,"/").concat(r.id));i(e.data)};return(0,s.useEffect)(()=>{r&&C()},[r]),r&&l&&(0,n.jsxs)(c.Z,{open:t,onClose:a,scroll:"paper",maxWidth:"md",fullWidth:!0,children:[(0,n.jsxs)(x.Z,{id:"customized-dialog-title",sx:{textAlign:"center"},children:[(0,n.jsx)(m.Z,{variant:"h5",component:"span",children:r.nome}),(0,n.jsx)(m.Z,{variant:"body2",children:"Este log #".concat(r.id," gerou um total de ").concat(l.length," ").concat(1==l.length?"script":"scripts")}),(0,n.jsx)(g.Z,{"aria-label":"close",onClick:a,sx:{top:10,right:10,position:"absolute",color:"grey.500"},children:(0,n.jsx)(f.Z,{icon:"mdi:close"})})]}),(0,n.jsxs)(p.Z,{sx:{p:10,mt:8},children:[(0,n.jsxs)(h.ZP,{container:!0,spacing:8,children:[(0,n.jsxs)(h.ZP,{item:!0,md:4,sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,n.jsx)(f.Z,{icon:"fluent-mdl2:date-time-mirrored",className:"text-5xl"}),(0,n.jsx)("span",{children:r.dataHora})]}),(0,n.jsxs)(h.ZP,{item:!0,md:4,sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,n.jsx)(f.Z,{icon:"majesticons:user-line",className:"text-5xl"}),(0,n.jsx)("span",{children:r.usuario})]}),(0,n.jsxs)(h.ZP,{item:!0,md:4,sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,n.jsx)(f.Z,{icon:"material-symbols-light:bring-your-own-ip",className:"text-5xl"}),(0,n.jsx)("span",{children:r.ip})]})]}),(0,n.jsx)("div",{className:"flex flex-col gap-4 mt-8",children:l.map(e=>(0,n.jsxs)("div",{className:"border ".concat("dark"==N?"border-white/20":"border-black/20","   rounded-xl p-4 space-y-4 h-auto"),children:[(0,n.jsxs)("div",{className:"flex items-center justify-between",children:[(0,n.jsxs)("div",{className:"flex items-center gap-1",children:[(0,n.jsx)(Z.Z,{skin:"light",color:"insert"==e.operacao?"success":"update"==e.operacao?"warning":"delete"==e.operacao?"error":(e.operacao,"info"),variant:"rounded",sx:{mr:3,width:48,height:48},children:(0,n.jsx)(f.Z,{icon:"insert"==e.operacao?"dashicons:insert":"update"==e.operacao?"akar-icons:edit":"delete"==e.operacao?"mingcute:delete-line":"login"==e.operacao?"ic:round-login":"email"==e.operacao?"mynaui:send":"ic:round-logout"})}),(0,n.jsx)(m.Z,{sx:{color:"text.secondary",marginTop:"-4px"},children:"insert"==e.operacao?"Inclus\xe3o":"update"==e.operacao?"Altera\xe7\xe3o":"delete"==e.operacao?"Exclus\xe3o":"login"==e.operacao?"Login efetuado":"email"==e.operacao?"Envio de E-mail":"Logout efetuado"})]}),(0,n.jsx)("div",{children:(0,n.jsxs)("div",{className:"flex flex-col justify-end ",children:[(0,n.jsx)(m.Z,{variant:"caption",sx:{color:"text.disabled",textAlign:"right"},children:"Tabela"}),(0,n.jsx)(m.Z,{sx:{color:"text.secondary",marginTop:"-4px"},children:e.tabela})]})})]}),(0,n.jsx)("div",{className:"".concat("dark"===N?"bg-[#212b36]":"bg-[#f7f7f9]"," p-2 rounded-lg"),children:(0,n.jsx)("pre",{children:function(e,t){try{let a=JSON.parse(e),s=JSON.stringify(a,null,2);return s=s.replace(/(\"alterado\": true)/g,'<span style="background-color: #ce9728; padding: 2px 1px; border-radius: 4px">$1</span>'),(0,n.jsx)("pre",{dangerouslySetInnerHTML:{__html:s}})}catch(r){return e}}(e.alteracao,e.operacao)})})]}))}),(0,n.jsx)("div",{})]})]})};var y=a(30944);let w=e=>{let{rows:t,columns:a,buttonsHeader:c,modalLog:d}=e,{pageSize:u,setPageSize:x,data:m}=(0,y.L0)(),{setId:p}=(0,s.useContext)(i.X),[h,f]=(0,s.useState)(null),[g,j]=(0,s.useState)(!1);function v(e){let t=e.split("/");return"".concat(t[2],"-").concat(t[1],"-").concat(t[0])}m.slice().sort((e,t)=>"Inativo"===e.status&&"Inativo"!==t.status?1:"Inativo"!==e.status&&"Inativo"===t.status?-1:0),a.map(e=>{"date"===e.type&&(e.sortComparator=(e,t)=>{let a=v(e),n=v(t);return a.localeCompare(n)})});let Z=e=>{d?(f(e),j(!0)):p(e.id)};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r._,{localeText:o.F.components.MuiDataGrid.defaultProps.localeText,autoHeight:!0,columns:a,pageSize:u,rowsPerPageOptions:[10,20,30,40,50,100],components:{Toolbar:l.Z},rows:t,onCellClick(e,t){Z(e.row)},onPageSizeChange:e=>x(e),sx:{"& .MuiDataGrid-cell":{cursor:"pointer",overflow:"scroll"}},componentsProps:{toolbar:{buttonsHeader:c,rows:t}},className:"min-h-[85vh]"}),(0,n.jsx)(b,{open:g,handleClose:()=>j(!1),row:h})]})};var N=w}},function(e){e.O(0,[4738,5206,5698,8428,9274,9774,2888,179],function(){return e(e.s=61556)}),_N_E=e.O()}]);