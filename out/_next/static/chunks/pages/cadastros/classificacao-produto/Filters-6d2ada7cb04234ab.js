(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8675],{65250:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/cadastros/classificacao-produto/Filters",function(){return r(70414)}])},53934:function(e,t,r){"use strict";var l=r(85893),n=r(67294),a=r(17575),s=r(32046),i=r(67074),o=r(21609),u=r(29630);let c=e=>{let{text:t,position:r}=e,c=(0,i.ZP)(e=>{let{className:t,...r}=e;return(0,l.jsx)(a.Z,{...r,classes:{popper:t},arrow:!0})})(e=>{let{theme:t}=e;return{["& .".concat(s.Z.tooltip)]:{border:"1px solid #65656E"}}});return(0,l.jsx)(c,{title:(0,l.jsx)(n.Fragment,{children:(0,l.jsx)(u.Z,{color:"inherit",children:t})}),placement:r||"top",children:(0,l.jsx)("p",{children:(0,l.jsx)(o.Z,{icon:"clarity:help-solid",className:"cursor-pointer text-base"})})})};t.Z=c},46905:function(e,t,r){"use strict";var l=r(85893),n=r(87536),a=r(79072),s=r(55343),i=r(67836);let o=e=>{let{xs:t,md:r,title:o,name:u,disabled:c,required:d,form:m,onChange:x}=e;return(0,l.jsx)(a.ZP,{item:!0,xs:t,md:r,children:(0,l.jsx)("div",{children:(0,l.jsx)(s.Z,{fullWidth:!0,children:(0,l.jsx)(n.Qr,{name:u,control:m.control,rules:{required:d},render(e){let{field:t}=e;return(0,l.jsx)(i.Z,{label:o,value:null==t?void 0:t.value,placeholder:o,type:"date",size:"small","aria-describedby":"validation-schema-nome",disabled:c,error:!!m.formState.errors[u],onChange(e){let r=e.target.value;t.onChange(r),x&&x(r)},InputLabelProps:{shrink:!0},inputProps:{min:"1900-01-01",max:"2100-01-01"}})}})})})})};t.Z=o},55148:function(e,t,r){"use strict";var l=r(85893),n=r(79072),a=r(55343),s=r(35966),i=r(67836),o=r(87536),u=r(53934),c=r(30944);let d=e=>{let{xs:t,md:r,title:d,options:m,form:x,name:p,limitTags:h,value:v,required:f,disabled:j,multiple:Z,onChange:b,className:_,keyProps:g,createNew:N,helpText:P,helpTextPosition:w}=e,E=N?[{id:null,name:"-- Novo --"},...null!=m?m:[]]:m,{key:F}=(0,c.L0)();return(0,l.jsx)(n.ZP,{item:!0,xs:t,md:r,sx:{my:1},className:_,children:(0,l.jsxs)("div",{className:"relative",children:[(0,l.jsx)(a.Z,{fullWidth:!0,children:(0,l.jsx)(o.Qr,{name:p,control:x.control,rules:{required:f},render(e){var t;let{field:r}=e;return(0,l.jsx)(s.Z,{options:E.map(e=>e.name),value:null!=v?v:null===(t=x.getValues(p))||void 0===t?void 0:t.name,onChange(e,t){let r=E.find(e=>e.name===t);x.setValue(p,null!=r?r:null),b&&b(t)},renderInput(e){var t;return(0,l.jsx)(i.Z,{...e,id:"customSelect",size:"small",label:d,placeholder:d,error:!!x.formState.errors[p],helperText:null===(t=x.formState.errors[p])||void 0===t?void 0:t.message})}},g||F)}})}),P&&(0,l.jsx)("div",{className:"absolute right-[60px] top-[12px] ",children:(0,l.jsx)(u.Z,{text:P,position:null!=w?w:"top"})})]})})};t.Z=d},70414:function(e,t,r){"use strict";r.r(t);var l=r(85893),n=r(67294),a=r(46905),s=r(55148),i=r(51570),o=r(30944);let u=()=>{var e,t;let{form:r,setNames:u,filterDate:c,SelectFilterByName:d,data:m,setFilteredData:x,handleSearch:p,key:h,searchText:v}=(0,o.L0)(),{commonData:f}=(0,i.Lq)(),j=m,Z=async()=>{x(j=await p(j))};return(0,n.useEffect)(()=>{Z()},[h]),(0,n.useEffect)(()=>{u([])},[]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(a.Z,{xs:12,md:6,title:"Data inicio da avaliac\xe3o",name:"dataInicio",form:r}),(0,l.jsx)(a.Z,{xs:12,md:6,title:"Data Fim da avalia\xe7\xe3o",name:"dataFim",form:r}),(0,l.jsx)(s.Z,{xs:12,md:6,title:"Quem preencheu",name:"quemPreenche",value:null===(e=r.getValues("quemPreenche"))||void 0===e?void 0:e.name,form:r,options:[{id:"1",name:"F\xe1brica"},{id:"2",name:"Fornecedor"}]}),(0,l.jsx)(s.Z,{xs:12,md:6,title:"Status",name:"status",form:r,options:f.status,value:null===(t=r.getValues("status"))||void 0===t?void 0:t.name})]})};t.default=u}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=65250)}),_N_E=e.O()}]);