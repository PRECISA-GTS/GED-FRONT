(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8080],{64531:function(e,o,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/registro/sections/SectionTwo",function(){return n(29342)}])},53934:function(e,o,n){"use strict";var l=n(85893),r=n(67294),t=n(17575),i=n(32046),d=n(67074),c=n(21609),a=n(29630);let u=e=>{let{text:o,position:n}=e,u=(0,d.ZP)(e=>{let{className:o,...n}=e;return(0,l.jsx)(t.Z,{...n,classes:{popper:o},arrow:!0})})(e=>{let{theme:o}=e;return{["& .".concat(i.Z.tooltip)]:{border:"1px solid #65656E"}}});return(0,l.jsx)(u,{title:(0,l.jsx)(r.Fragment,{children:(0,l.jsx)(a.Z,{color:"inherit",children:o})}),placement:n||"top",children:(0,l.jsx)("p",{children:(0,l.jsx)(c.Z,{icon:"clarity:help-solid",className:"cursor-pointer text-base"})})})};o.Z=u},29308:function(e,o,n){"use strict";var l=n(85893),r=n(87536),t=n(79072),i=n(55343),d=n(67836),c=n(9041),a=n(80562),u=n(34175),s=n(62097),p=n(21609),v=n(53934);let m=e=>{let{xs:o,md:n,title:m,name:f,rows:x,value:h,type:g,mask:j,getAddressByCep:Z,multiline:$,disabled:w,required:b,control:T,errors:C,onChange:y,className:L,help:k,clearField:N,helpText:P,helpTextPosition:V,alertRequired:_,...I}=e,B=(0,s.Z)();return"telefone"==j&&console.log("value: ",h,j,(0,u.Bk)(h)),(0,l.jsx)(t.ZP,{item:!0,xs:o,md:n,sx:{my:1},className:L,children:(0,l.jsxs)("div",{className:"relative",children:[(0,l.jsx)(i.Z,{fullWidth:!0,sx:{position:"relative"},children:(0,l.jsx)(r.Qr,{name:f,control:T,rules:{required:b},render(e){let{field:o}=e;return(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(d.Z,{...I,multiline:$,value:null==o?void 0:o.value,label:m,placeholder:m,rows:x,type:null!=g?g:"text",size:"small",disabled:w,"aria-describedby":"validation-schema-nome",error:C,onChange(e){let n=e.target.value;"cnpj"===j?n=(0,u.PK)(n):"cep"===j?Z(n=(0,u.Tc)(n)):"cep2"===j?n=(0,u.Tc)(n):"telefone"===j?n=(0,u.Bk)(n):"estado"===j?n=(0,u.CL)(n):"cpf"===j?n=(0,u.VL)(n):"rg"===j?n=(0,u.cH)(n):"currency"===j?n=(0,u.Pu)(n):"fractioned3"===j&&(n=(0,u.Vo)(n)),o.onChange(n),y&&y(n)},InputLabelProps:{shrink:!0},inputProps:"cnpj"===j?{maxLength:18,type:"tel",inputMode:"numeric"}:"cep"===j||"cep2"===j?{maxLength:9,type:"tel",inputMode:"numeric"}:"telefone"===j?{maxLength:15}:"cpf"===j?{maxLength:14}:"rg"===j?{maxLength:11}:"estado"===j?{maxLength:2}:{},InputProps:{endAdornment:N&&(0,l.jsx)(c.Z,{position:"end",children:(0,l.jsx)(a.Z,{onClick:N,children:(0,l.jsx)(p.Z,{icon:"clarity:close-line",fontSize:20})})})},sx:{"& .MuiInputBase-input":{padding:"10px 14px"},..._&&!(null==o?void 0:o.value)&&{"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:B.palette.error.main},"&:hover fieldset":{borderColor:B.palette.error.main},"&.Mui-focused fieldset":{borderColor:B.palette.error.main}},"& .MuiInputLabel-root":{color:B.palette.error.main},"& .MuiInputLabel-root.Mui-focused":{color:B.palette.error.main}}}})})}})}),P&&(0,l.jsx)("div",{className:"absolute ".concat("number"==g?"right-10":"right-4","  top-[12px]"),children:(0,l.jsx)(v.Z,{text:P,position:null!=V?V:"top"})})]})})};o.Z=m},34175:function(e,o,n){"use strict";function l(e){return e&&(e=(e=(e=(e=(e=e.replace(/\D/g,"")).replace(/^(\d{2})(\d)/,"$1.$2")).replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")).replace(/\.(\d{3})(\d)/,".$1/$2")).replace(/(\d{4})(\d)/,"$1-$2")),e}function r(e){return e&&(e=(e=(e=(e=e.replace(/\D/g,"")).replace(/(\d{3})(\d)/,"$1.$2")).replace(/(\d{3})(\d)/,"$1.$2")).replace(/(\d{3})(\d{1,2})$/,"$1-$2")),e}function t(e){return e&&(e=(e=(e=(e=e.replace(/\D/g,"")).replace(/(\d{2})(\d)/,"$1.$2")).replace(/(\d{3})(\d)/,"$1.$2")).replace(/(\d{3})(\d)/,"$1-$2")),e}function i(e){return e?e=(e=(e=(e=e.replace(/\D/g,"")).replace(/^(\d{2})(\d)/g,"($1) $2")).replace(/(\d)(\d{4})$/,"$1-$2")).replace(/\)-/,")"):e}function d(e){return e=(e=e.replace(/\D/g,"")).replace(/^(\d{5})(\d)/,"$1-$2")}function c(e){return e=(e=e.toUpperCase()).replace(/[^A-Z]/g,"")}n.d(o,{Bk:function(){return i},CL:function(){return c},PK:function(){return l},Pu:function(){return a},Tc:function(){return d},VL:function(){return r},Vo:function(){return u},cH:function(){return t}});let a=e=>{let o=e.replace(/\D/g,""),n=parseFloat(o);return isNaN(n)?"R$ 0,00":(n/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})},u=e=>{let o=e.replace(/\D/g,""),n=parseFloat(o);if(isNaN(n))return"0,000";let l=(n/1e3).toFixed(3),[r,t]=l.split("."),i=r.replace(/\B(?=(\d{3})+(?!\d))/g,".");return"".concat(i,",").concat(t)}},29342:function(e,o,n){"use strict";n.r(o);var l=n(85893),r=n(61953),t=n(79072),i=n(54225),d=n(29630),c=n(87536),a=n(60664),u=n(21609),s=n(29308),p=n(67294);let v=e=>{var o,n,v,m,f,x,h,g;let{handleNext:j,handlePrev:Z,setDataGlobal:$,dataGlobal:w}=e,{control:b,handleSubmit:T,setValue:C,formState:{errors:y}}=(0,c.cI)({}),L=e=>{$({...w,sectionTwo:{...w.sectionTwo,...e}}),j()},k=async e=>{9===e.length&&a.h.get("https://viacep.com.br/ws/".concat(e,"/json/")).then(e=>{N(e.data)})},N=e=>{C("logradouro",null==e?void 0:e.logradouro),C("bairro",null==e?void 0:e.bairro),C("cidade",null==e?void 0:e.localidade),C("uf",null==e?void 0:e.uf)};return(0,p.useEffect)(()=>{var e,o,n,l,r,t,i,d;C("telefone",null==w?void 0:null===(e=w.sectionTwo)||void 0===e?void 0:e.telefone),C("cep",null==w?void 0:null===(o=w.sectionTwo)||void 0===o?void 0:o.cep),C("logradouro",null==w?void 0:null===(n=w.sectionTwo)||void 0===n?void 0:n.logradouro),C("numero",null==w?void 0:null===(l=w.sectionTwo)||void 0===l?void 0:l.numero),C("complemento",null==w?void 0:null===(r=w.sectionTwo)||void 0===r?void 0:r.complemento),C("bairro",null==w?void 0:null===(t=w.sectionTwo)||void 0===t?void 0:t.bairro),C("cidade",null==w?void 0:null===(i=w.sectionTwo)||void 0===i?void 0:i.cidade),C("uf",null==w?void 0:null===(d=w.sectionTwo)||void 0===d?void 0:d.uf)},[]),w&&(0,l.jsxs)("form",{onSubmit:T(L),children:[(0,l.jsxs)(r.Z,{sx:{mb:4},children:[(0,l.jsx)(d.Z,{variant:"h5",children:"Informa\xe7\xf5es opcionais"}),(0,l.jsx)(d.Z,{sx:{color:"text.secondary"},children:"Insira as informa\xe7\xf5es opcionais"})]}),(0,l.jsxs)(t.ZP,{container:!0,spacing:5,children:[(0,l.jsx)(s.Z,{xs:12,md:6,title:"Telefone",name:"telefone",defaultValue:null==w?void 0:null===(o=w.sectionTwo)||void 0===o?void 0:o.telefone,mask:"telefone",control:b,errors:null==y?void 0:y.telefone}),(0,l.jsx)(s.Z,{xs:12,md:6,title:"Cep",name:"cep",defaultValue:null==w?void 0:null===(n=w.sectionTwo)||void 0===n?void 0:n.cep,mask:"cep2",control:b,errors:null==y?void 0:y.cnpj,onChange:e=>k(e)}),(0,l.jsx)(s.Z,{xs:12,md:6,title:"Rua",name:"logradouro",defaultValue:null==w?void 0:null===(v=w.sectionTwo)||void 0===v?void 0:v.logradouro,control:b,errors:null==y?void 0:y.logradouro}),(0,l.jsx)(s.Z,{xs:12,md:6,title:"N\xfamero",name:"numero",defaultValue:null==w?void 0:null===(m=w.sectionTwo)||void 0===m?void 0:m.numero,control:b,errors:null==y?void 0:y.numero}),(0,l.jsx)(s.Z,{xs:12,md:6,title:"Complemento",name:"complemento",defaultValue:null==w?void 0:null===(f=w.sectionTwo)||void 0===f?void 0:f.complemento,control:b,errors:null==y?void 0:y.complemento}),(0,l.jsx)(s.Z,{xs:12,md:6,title:"Bairro",name:"bairro",defaultValue:null==w?void 0:null===(x=w.sectionTwo)||void 0===x?void 0:x.bairro,control:b,errors:null==y?void 0:y.bairro}),(0,l.jsx)(s.Z,{xs:12,md:6,title:"Cidade",name:"cidade",defaultValue:null==w?void 0:null===(h=w.sectionTwo)||void 0===h?void 0:h.cidade,control:b,errors:null==y?void 0:y.cidade}),(0,l.jsx)(s.Z,{xs:12,md:6,title:"Estado",name:"uf",defaultValue:null==w?void 0:null===(g=w.sectionTwo)||void 0===g?void 0:g.uf,control:b,errors:null==y?void 0:y.uf,mask:"estado"}),(0,l.jsx)(t.ZP,{item:!0,xs:12,children:(0,l.jsxs)(r.Z,{sx:{display:"flex",justifyContent:"space-between"},children:[(0,l.jsx)(i.Z,{color:"secondary",variant:"contained",onClick:Z,startIcon:(0,l.jsx)(u.Z,{icon:"mdi:chevron-left",fontSize:20}),children:"Anterior"}),(0,l.jsx)(i.Z,{type:"submit",variant:"contained",onClick:T,endIcon:(0,l.jsx)(u.Z,{icon:"mdi:chevron-right",fontSize:20}),children:"Proximo"})]})})]})]})};o.default=v}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=64531)}),_N_E=e.O()}]);