(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6674],{44597:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/cadastros/profissao",function(){return a(37585)}])},46905:function(e,t,a){"use strict";var n=a(85893),s=a(87536),r=a(79072),l=a(55343),i=a(67836);let o=e=>{let{xs:t,md:a,title:o,name:u,disabled:d,required:c,form:m,onChange:x}=e;return(0,n.jsx)(r.ZP,{item:!0,xs:t,md:a,children:(0,n.jsx)("div",{children:(0,n.jsx)(l.Z,{fullWidth:!0,children:(0,n.jsx)(s.Qr,{name:u,control:m.control,rules:{required:c},render(e){let{field:t}=e;return(0,n.jsx)(i.Z,{label:o,value:null==t?void 0:t.value,placeholder:o,type:"date",size:"small","aria-describedby":"validation-schema-nome",disabled:d,error:!!m.formState.errors[u],onChange(e){let a=e.target.value;t.onChange(a),x&&x(a)},InputLabelProps:{shrink:!0},inputProps:{min:"1900-01-01",max:"2100-01-01"}})}})})})})};t.Z=o},55148:function(e,t,a){"use strict";var n=a(85893),s=a(79072),r=a(55343),l=a(35966),i=a(67836),o=a(87536),u=a(53934),d=a(30944);let c=e=>{let{xs:t,md:a,title:c,options:m,form:x,name:f,limitTags:h,value:v,required:p,disabled:j,multiple:Z,onChange:b,className:g,keyProps:N,createNew:_,helpText:w,helpTextPosition:P}=e,E=_?[{id:null,name:"-- Novo --"},...null!=m?m:[]]:m,{key:F}=(0,d.L0)();return(0,n.jsx)(s.ZP,{item:!0,xs:t,md:a,sx:{my:1},className:g,children:(0,n.jsxs)("div",{className:"relative",children:[(0,n.jsx)(r.Z,{fullWidth:!0,children:(0,n.jsx)(o.Qr,{name:f,control:x.control,rules:{required:p},render(e){let{field:t}=e;return(0,n.jsx)(l.Z,{options:E.map(e=>e.name),value:v,onChange(e,t){let a=E.find(e=>e.name===t);x.setValue(f,null!=a?a:null)},renderInput(e){var t;return(0,n.jsx)(i.Z,{...e,id:"customSelect",size:"small",label:c,placeholder:c,error:!!x.formState.errors[f],helperText:null===(t=x.formState.errors[f])||void 0===t?void 0:t.message})}},N||F)}})}),w&&(0,n.jsx)("div",{className:"absolute right-[60px] top-[12px] ",children:(0,n.jsx)(u.Z,{text:w,position:null!=P?P:"top"})})]})})};t.Z=c},92097:function(e,t,a){"use strict";a.r(t);var n=a(85893),s=a(67294),r=a(46905),l=a(55148),i=a(51570),o=a(30944);let u=()=>{var e,t;let{form:a,setNames:u,filterDate:d,SelectFilterByName:c,data:m,setFilteredData:x,handleSearch:f,key:h,searchText:v}=(0,o.L0)(),{commonData:p}=(0,i.Lq)(),j=m,Z=async()=>{x(j=await f(j))};return(0,s.useEffect)(()=>{Z()},[h]),(0,s.useEffect)(()=>{u([])},[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.Z,{xs:12,md:6,title:"Data inicio da avaliac\xe3o",name:"dataInicio",form:a}),(0,n.jsx)(r.Z,{xs:12,md:6,title:"Data Fim da avalia\xe7\xe3o",name:"dataFim",form:a}),(0,n.jsx)(l.Z,{xs:12,md:6,title:"Quem preencheu",name:"quemPreenche",value:null===(e=a.getValues("quemPreenche"))||void 0===e?void 0:e.name,form:a,options:[{id:"1",name:"F\xe1brica"},{id:"2",name:"Fornecedor"}]}),(0,n.jsx)(l.Z,{xs:12,md:6,title:"Status",name:"status",form:a,options:p.status,value:null===(t=a.getValues("status"))||void 0===t?void 0:t.name})]})};t.default=u},37585:function(e,t,a){"use strict";a.r(t);var n=a(85893),s=a(67294),r=a(60664),l=a(69175),i=a(91359),o=a(60565),u=a(47842),d=a(11163),c=a(46749),m=a(49837),x=a(30944),f=a(92097);let h=()=>{let e=(0,d.useRouter)(),t=e.pathname,{setTitle:a}=(0,s.useContext)(o.f),{filteredData:h,setFilteredData:v,setData:p,startFilter:j}=(0,x.L0)(),Z=async()=>{await r.h.get(t).then(e=>{v(e.data),p(e.data),a({title:"Profiss\xe3o",subtitle:{id:id,count:e.data.length,new:!1}})})};(0,s.useEffect)(()=>{Z(),j((0,n.jsx)(f.default,{}))},[id]);let b=(0,c.OL)(t,[{title:"ID",field:"id",size:.1},{title:"Nome",field:"nome",size:.8},{headerName:"Status",field:{name:"status",cor:"cor"},size:.1}]);return(0,n.jsxs)(n.Fragment,{children:[!h&&(0,n.jsx)(u.Z,{}),h&&(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(m.Z,{children:(0,n.jsx)(i.Z,{sx:{pt:"0"},children:(0,n.jsx)(l.Z,{rows:h,columns:b,buttonsHeader:{btnNew:!0,btnPrint:!0}})})})})]})};t.default=h}},function(e){e.O(0,[4738,8371,9525,9774,2888,179],function(){return e(e.s=44597)}),_N_E=e.O()}]);