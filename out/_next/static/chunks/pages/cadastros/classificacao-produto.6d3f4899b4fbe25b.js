(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8585],{71379:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/cadastros/classificacao-produto",function(){return a(41354)}])},88771:function(e,t,a){"use strict";var s=a(85893),n=a(11163),l=a.n(n),o=a(67294),r=a(60664),i=a(49837),u=a(91359),c=a(79072),d=a(87536),m=a(86501),x=a(45061),h=a(47842),f=a(86887),p=a(64165),v=a(60565),j=a(83830),Z=a(29308),b=a(67569),g=a(41088),D=a(40039);let w=e=>{var t,a;let{id:n,newChange:w,manualUrl:C,handleModalClose:N,handleConfirmNew:P,btnClose:y,outsideID:I}=e,[S,_]=(0,o.useState)(!1),[E,O]=(0,o.useState)(null),k=l(),F=n&&n>0?"edit":"new",L=k.pathname,{title:q}=(0,o.useContext)(v.f),{setId:z}=(0,o.useContext)(j.X),{loggedUnity:V,user:T}=(0,o.useContext)(D.V),{startLoading:X,stopLoading:M}=(0,g.Z)(),{trigger:Q,handleSubmit:R,reset:U,register:W,control:A,formState:{errors:B}}=(0,d.cI)({mode:"onChange"}),H=async e=>{let t={...e,usuarioID:T.usuarioID,unidadeID:V.unidadeID};X();try{"new"===F?await r.h.post("/cadastros/classificacao-produto/new/insertData",t).then(e=>{I?P(e.data):(k.push("/cadastros/classificacao-produto"),z(e.data)),m.ZP.success(p.OD.successNew)}):"edit"===F&&(await r.h.post("/cadastros/classificacao-produto/updateData/".concat(n),t),m.ZP.success(p.OD.successUpdate))}catch(a){a.response&&409===a.response.status?m.ZP.error(p.OD.errorRepeated):console.log(a)}finally{M()}},G=async()=>{try{await r.h.delete("".concat(L,"/").concat(n,"/").concat(T.usuarioID,"/").concat(V.unidadeID)),z(null),_(!1),m.ZP.success(p.OD.successDelete)}catch(e){e.response&&409===e.response.status?(m.ZP.error(p.OD.pendingDelete),_(!1)):console.log(e)}},J=async()=>{try{"edit"===F?await r.h.post("".concat(L,"/getData/").concat(n),{id:n}).then(e=>{O(e.data),U(e.data)}):O({fields:{nome:"",status:1}})}catch(e){console.log(e)}};return(0,o.useEffect)(()=>{J(),setTimeout(()=>{Q()},300)},[n]),(0,s.jsxs)(s.Fragment,{children:[!E&&(0,s.jsx)(h.Z,{}),E&&(0,s.jsxs)("form",{onSubmit:R(H),id:"formItem",children:[(0,s.jsx)(f.Z,{btnCancel:!0,btnNew:!0,btnSave:!0,disabled:!1,manualUrl:C,btnClose:y,handleModalClose:N,handleSubmit:()=>R(H),btnDelete:"edit"===F,onclickDelete:()=>_(!0),type:F,outsideID:I}),(0,s.jsx)(i.Z,{children:(0,s.jsx)(u.Z,{children:(0,s.jsxs)(c.ZP,{container:!0,spacing:5,children:[(0,s.jsx)(Z.Z,{xs:11,md:11,title:"Nome",name:"fields.nome",required:!0,control:A,errors:null==B?void 0:null===(t=B.fields)||void 0===t?void 0:t.nome}),(0,s.jsx)(b.Z,{xs:1,md:1,title:"Ativo",name:"fields.status",value:null==E?void 0:null===(a=E.fields)||void 0===a?void 0:a.status,typePage:F,register:W})]})})})]}),(0,s.jsx)(x.Z,{text:"Tem certeza que deseja excluir?",title:"Excluir "+q.title,openModal:S,handleClose:()=>_(!1),handleSubmit:G,btnCancel:!0,btnConfirm:!0})]})};t.Z=w},93250:function(e,t,a){"use strict";var s=a(85893),n=a(49837),l=a(91359),o=a(69175);let r=e=>{let{result:t,columns:a,btnNew:r=!0,btnPrint:i=!0,btnBack:u,openModal:c,modalLog:d}=e;return(0,s.jsx)(n.Z,{children:(0,s.jsx)(l.Z,{sx:{pt:"0"},children:(0,s.jsx)(o.Z,{rows:t,columns:a,modalLog:d,buttonsHeader:{btnNew:r,btnPrint:i,btnBack:u,openModal:c}})})})};t.Z=r},46905:function(e,t,a){"use strict";var s=a(85893),n=a(87536),l=a(79072),o=a(55343),r=a(67836);let i=e=>{let{xs:t,md:a,title:i,name:u,disabled:c,required:d,form:m,onChange:x}=e;return(0,s.jsx)(l.ZP,{item:!0,xs:t,md:a,children:(0,s.jsx)("div",{children:(0,s.jsx)(o.Z,{fullWidth:!0,children:(0,s.jsx)(n.Qr,{name:u,control:m.control,rules:{required:d},render(e){let{field:t}=e;return(0,s.jsx)(r.Z,{label:i,value:null==t?void 0:t.value,placeholder:i,type:"date",size:"small","aria-describedby":"validation-schema-nome",disabled:c,error:!!m.formState.errors[u],onChange(e){let a=e.target.value;t.onChange(a),x&&x(a)},InputLabelProps:{shrink:!0},inputProps:{min:"1900-01-01",max:"2100-01-01"}})}})})})})};t.Z=i},55148:function(e,t,a){"use strict";var s=a(85893),n=a(79072),l=a(55343),o=a(35966),r=a(67836),i=a(87536),u=a(53934),c=a(30944);let d=e=>{let{xs:t,md:a,title:d,options:m,form:x,name:h,limitTags:f,value:p,required:v,disabled:j,multiple:Z,onChange:b,className:g,keyProps:D,createNew:w,helpText:C,helpTextPosition:N}=e,P=w?[{id:null,name:"-- Novo --"},...null!=m?m:[]]:m,{key:y}=(0,c.L0)();return(0,s.jsx)(n.ZP,{item:!0,xs:t,md:a,sx:{my:1},className:g,children:(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)(l.Z,{fullWidth:!0,children:(0,s.jsx)(i.Qr,{name:h,control:x.control,rules:{required:v},render(e){var t;let{field:a}=e;return(0,s.jsx)(o.Z,{options:P.map(e=>e.name),value:null!=p?p:null===(t=x.getValues(h))||void 0===t?void 0:t.name,onChange(e,t){let a=P.find(e=>e.name===t);x.setValue(h,null!=a?a:null),b&&b(t)},renderInput(e){var t;return(0,s.jsx)(r.Z,{...e,id:"customSelect",size:"small",label:d,placeholder:d,error:!!x.formState.errors[h],helperText:null===(t=x.formState.errors[h])||void 0===t?void 0:t.message})}},D||y)}})}),C&&(0,s.jsx)("div",{className:"absolute right-[60px] top-[12px] ",children:(0,s.jsx)(u.Z,{text:C,position:null!=N?N:"top"})})]})})};t.Z=d},70414:function(e,t,a){"use strict";a.r(t);var s=a(85893),n=a(67294),l=a(46905),o=a(55148),r=a(51570),i=a(30944);let u=()=>{var e,t;let{form:a,setNames:u,filterDate:c,SelectFilterByName:d,data:m,setFilteredData:x,handleSearch:h,key:f,searchText:p}=(0,i.L0)(),{commonData:v}=(0,r.Lq)(),j=m,Z=async()=>{x(j=await h(j))};return(0,n.useEffect)(()=>{Z()},[f]),(0,n.useEffect)(()=>{u([])},[]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l.Z,{xs:12,md:6,title:"Data inicio da avaliac\xe3o",name:"dataInicio",form:a}),(0,s.jsx)(l.Z,{xs:12,md:6,title:"Data Fim da avalia\xe7\xe3o",name:"dataFim",form:a}),(0,s.jsx)(o.Z,{xs:12,md:6,title:"Quem preencheu",name:"quemPreenche",value:null===(e=a.getValues("quemPreenche"))||void 0===e?void 0:e.name,form:a,options:[{id:"1",name:"F\xe1brica"},{id:"2",name:"Fornecedor"}]}),(0,s.jsx)(o.Z,{xs:12,md:6,title:"Status",name:"status",form:a,options:v.status,value:null===(t=a.getValues("status"))||void 0===t?void 0:t.name})]})};t.default=u},41354:function(e,t,a){"use strict";a.r(t);var s=a(85893),n=a(67294),l=a(60664),o=a(93250),r=a(60565),i=a(83830),u=a(47842),c=a(11163),d=a(64165),m=a(40039),x=a(30944),h=a(70414),f=a(88771);let p=()=>{let e=(0,c.useRouter)(),t=e.pathname,{setTitle:a}=(0,n.useContext)(r.f),{loggedUnity:p}=(0,n.useContext)(m.V),{id:v}=(0,n.useContext)(i.X),{filteredData:j,setFilteredData:Z,setData:b,startFilter:g}=(0,x.L0)(),D=async()=>{await l.h.get("".concat(t,"/").concat(p.unidadeID)).then(e=>{Z(e.data),b(e.data),a({title:"Classifica\xe7\xe3o de Produtos",subtitle:{id:v,count:e.data.length,new:!1}})})};(0,n.useEffect)(()=>{D(),g((0,s.jsx)(h.default,{}))},[v]);let w=(0,d.OL)(t,[{headerName:"ID",field:"id",size:.1},{headerName:"Nome",field:"nome",size:.6},{headerName:"Status",field:{name:"status",cor:"cor"},size:.1}]);return(0,s.jsx)(s.Fragment,{children:j?v&&v>0?(0,s.jsx)(f.Z,{id:v}):(0,s.jsx)(o.Z,{result:j,columns:w}):(0,s.jsx)(u.Z,{})})};t.default=p}},function(e){e.O(0,[4738,5206,6887,5061,9525,9774,2888,179],function(){return e(e.s=71379)}),_N_E=e.O()}]);