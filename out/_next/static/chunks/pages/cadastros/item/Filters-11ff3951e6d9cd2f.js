(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8357],{23538:function(e,r,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/cadastros/item/Filters",function(){return l(50279)}])},46905:function(e,r,l){"use strict";var t=l(85893),n=l(87536),a=l(79072),s=l(55343),o=l(67836);let i=e=>{let{xs:r,md:l,title:i,name:u,disabled:d,required:c,form:m,onChange:f}=e;return(0,t.jsx)(a.ZP,{item:!0,xs:r,md:l,children:(0,t.jsx)("div",{children:(0,t.jsx)(s.Z,{fullWidth:!0,children:(0,t.jsx)(n.Qr,{name:u,control:m.control,rules:{required:c},render(e){let{field:r}=e;return(0,t.jsx)(o.Z,{label:i,value:null==r?void 0:r.value,placeholder:i,type:"date",size:"small","aria-describedby":"validation-schema-nome",disabled:d,error:!!m.formState.errors[u],onChange(e){let l=e.target.value;r.onChange(l),f&&f(l)},InputLabelProps:{shrink:!0},inputProps:{min:"1900-01-01",max:"2100-01-01"}})}})})})})};r.Z=i},55148:function(e,r,l){"use strict";var t=l(85893),n=l(79072),a=l(55343),s=l(35966),o=l(67836),i=l(87536),u=l(53934),d=l(30944);let c=e=>{let{xs:r,md:l,title:c,options:m,form:f,name:x,limitTags:h,value:p,required:v,disabled:j,multiple:_,onChange:Z,className:b,keyProps:N,createNew:g,helpText:w,helpTextPosition:E}=e,P=g?[{id:null,name:"-- Novo --"},...null!=m?m:[]]:m,{key:k}=(0,d.L0)();return(0,t.jsx)(n.ZP,{item:!0,xs:r,md:l,sx:{my:1},className:b,children:(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(a.Z,{fullWidth:!0,children:(0,t.jsx)(i.Qr,{name:x,control:f.control,rules:{required:v},render(e){let{field:r}=e;return(0,t.jsx)(s.Z,{options:P.map(e=>e.name),value:p,onChange(e,r){let l=P.find(e=>e.name===r);f.setValue(x,null!=l?l:null)},renderInput(e){var r;return(0,t.jsx)(o.Z,{...e,id:"customSelect",size:"small",label:c,placeholder:c,error:!!f.formState.errors[x],helperText:null===(r=f.formState.errors[x])||void 0===r?void 0:r.message})}},N||k)}})}),w&&(0,t.jsx)("div",{className:"absolute right-[60px] top-[12px] ",children:(0,t.jsx)(u.Z,{text:w,position:null!=E?E:"top"})})]})})};r.Z=c},50279:function(e,r,l){"use strict";l.r(r);var t=l(85893),n=l(67294);l(46905);var a=l(55148),s=l(51570),o=l(30944);let i=()=>{var e;let{form:r,setNames:l,filterDate:i,SelectFilterByName:u,data:d,setFilteredData:c,handleSearch:m,key:f}=(0,o.L0)(),{commonData:x}=(0,s.Lq)(),h=d,p=async()=>{c(h=await u(h=await m(h),"formulario"))};return(0,n.useEffect)(()=>{p()},[f]),(0,n.useEffect)(()=>{l(["formulario"])},[]),(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(a.Z,{xs:12,md:6,title:"Formulário",name:"formulario",form:r,options:x.typeFormulario,value:null===(e=r.getValues("formulario"))||void 0===e?void 0:e.name})})};r.default=i}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=23538)}),_N_E=e.O()}]);