(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9288],{12504:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/cadastros/atividade",function(){return n(68043)}])},97415:function(e,t,n){"use strict";var s=n(85893),a=n(11163),l=n.n(a),r=n(67294),o=n(60664),i=n(49837),u=n(91359),c=n(79072),d=n(87536),m=n(86501),x=n(47842),h=n(45061),f=n(46749),p=n(86887),v=n(60565),j=n(83830),Z=n(29308),g=n(67569),D=n(41088),w=n(40039);let b=e=>{var t,n;let{id:a}=e,{title:b}=(0,r.useContext)(v.f),{setId:P}=(0,r.useContext)(j.X),[N,_]=(0,r.useState)(!1),[y,C]=(0,r.useState)(null),S=l(),E=a&&a>0?"edit":"new",I=S.pathname,{loggedUnity:O,user:k}=(0,r.useContext)(w.V),{startLoading:F,stopLoading:L}=(0,D.Z)(),{trigger:q,handleSubmit:z,reset:T,register:V,control:X,formState:{errors:Q}}=(0,d.cI)(),A=async e=>{let t={...e,usuarioID:k.usuarioID,unidadeID:O.unidadeID};F();try{"new"===E?await o.h.post("".concat((0,f.g_)(I),"/new/insertData"),t).then(e=>{S.push("".concat((0,f.g_)(I))),P(e.data),m.ZP.success(f.OD.successNew)}):"edit"===E&&(await o.h.post("".concat(I,"/updateData/").concat(a),t),m.ZP.success(f.OD.successUpdate))}catch(n){n.response&&409===n.response.status?m.ZP.error(f.OD.errorRepeated):console.log(n)}finally{L()}},M=async()=>{try{await o.h.delete("".concat(I,"/").concat(a,"/").concat(k.usuarioID,"/").concat(O.unidadeID)),P(null),_(!1),m.ZP.success(f.OD.successDelete)}catch(e){e.response&&409===e.response.status?(m.ZP.error(f.OD.pendingDelete),_(!1)):console.log(e)}},R=async()=>{"new"==E&&C({fields:{nome:"",status:1}});try{let e="new"===E?"".concat((0,f.g_)(I),"/new/getData"):"".concat(I,"/getData/").concat(a);("new"===E||a>0)&&await o.h.post(e).then(e=>{C(e.data),console.log("\uD83D\uDE80 ~ response.data:",e.data),T(e.data)})}catch(t){console.log(t)}};return(0,r.useEffect)(()=>{console.log("getData: ",a),R(),"new"===E&&setTimeout(()=>{q()},300)},[a]),(0,s.jsxs)(s.Fragment,{children:[!y&&(0,s.jsx)(x.Z,{}),y&&(0,s.jsxs)("form",{onSubmit:z(A),children:[(0,s.jsx)(p.Z,{btnCancel:!0,btnSave:!0,btnNew:!0,handleSubmit:()=>z(A),btnDelete:"edit"===E,onclickDelete:()=>_(!0),type:E}),(0,s.jsx)(i.Z,{children:(0,s.jsxs)(u.Z,{children:[(0,s.jsx)("h1",{children:"hellloooooo"}),(0,s.jsxs)(c.ZP,{container:!0,spacing:5,children:[(0,s.jsx)(Z.Z,{xs:11,md:11,title:"Nome",name:"fields.nome",required:!0,control:X,errors:null==Q?void 0:null===(t=Q.fields)||void 0===t?void 0:t.nome}),(0,s.jsx)(g.Z,{xs:1,md:1,title:"Ativo",name:"fields.status",value:null==y?void 0:null===(n=y.fields)||void 0===n?void 0:n.status,typePage:E,register:V})]})]})})]}),(0,s.jsx)(h.Z,{text:"Tem certeza que deseja excluir?",title:"Excluir "+b.title,openModal:N,handleClose:()=>_(!1),handleSubmit:M,btnCancel:!0,btnConfirm:!0})]})};t.Z=b},93250:function(e,t,n){"use strict";var s=n(85893),a=n(49837),l=n(91359),r=n(69175);let o=e=>{let{result:t,columns:n,btnNew:o=!0,btnPrint:i=!0,btnBack:u,openModal:c,modalLog:d}=e;return(0,s.jsx)(a.Z,{children:(0,s.jsx)(l.Z,{sx:{pt:"0"},children:(0,s.jsx)(r.Z,{rows:t,columns:n,modalLog:d,buttonsHeader:{btnNew:o,btnPrint:i,btnBack:u,openModal:c}})})})};t.Z=o},46905:function(e,t,n){"use strict";var s=n(85893),a=n(87536),l=n(79072),r=n(55343),o=n(67836);let i=e=>{let{xs:t,md:n,title:i,name:u,disabled:c,required:d,form:m,onChange:x}=e;return(0,s.jsx)(l.ZP,{item:!0,xs:t,md:n,children:(0,s.jsx)("div",{children:(0,s.jsx)(r.Z,{fullWidth:!0,children:(0,s.jsx)(a.Qr,{name:u,control:m.control,rules:{required:d},render(e){let{field:t}=e;return(0,s.jsx)(o.Z,{label:i,value:null==t?void 0:t.value,placeholder:i,type:"date",size:"small","aria-describedby":"validation-schema-nome",disabled:c,error:!!m.formState.errors[u],onChange(e){let n=e.target.value;t.onChange(n),x&&x(n)},InputLabelProps:{shrink:!0},inputProps:{min:"1900-01-01",max:"2100-01-01"}})}})})})})};t.Z=i},55148:function(e,t,n){"use strict";var s=n(85893),a=n(79072),l=n(55343),r=n(35966),o=n(67836),i=n(87536),u=n(53934),c=n(30944);let d=e=>{let{xs:t,md:n,title:d,options:m,form:x,name:h,limitTags:f,value:p,required:v,disabled:j,multiple:Z,onChange:g,className:D,keyProps:w,createNew:b,helpText:P,helpTextPosition:N}=e,_=b?[{id:null,name:"-- Novo --"},...null!=m?m:[]]:m,{key:y}=(0,c.L0)();return(0,s.jsx)(a.ZP,{item:!0,xs:t,md:n,sx:{my:1},className:D,children:(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)(l.Z,{fullWidth:!0,children:(0,s.jsx)(i.Qr,{name:h,control:x.control,rules:{required:v},render(e){let{field:t}=e;return(0,s.jsx)(r.Z,{options:_.map(e=>e.name),value:p,onChange(e,t){let n=_.find(e=>e.name===t);x.setValue(h,null!=n?n:null)},renderInput(e){var t;return(0,s.jsx)(o.Z,{...e,id:"customSelect",size:"small",label:d,placeholder:d,error:!!x.formState.errors[h],helperText:null===(t=x.formState.errors[h])||void 0===t?void 0:t.message})}},w||y)}})}),P&&(0,s.jsx)("div",{className:"absolute right-[60px] top-[12px] ",children:(0,s.jsx)(u.Z,{text:P,position:null!=N?N:"top"})})]})})};t.Z=d},57674:function(e,t,n){"use strict";n.r(t);var s=n(85893),a=n(67294),l=n(46905),r=n(55148),o=n(51570),i=n(30944);let u=()=>{var e,t;let{form:n,setNames:u,filterDate:c,SelectFilterByName:d,data:m,setFilteredData:x,handleSearch:h,key:f,searchText:p}=(0,i.L0)(),{commonData:v}=(0,o.Lq)(),j=m,Z=async()=>{x(j=await h(j))};return(0,a.useEffect)(()=>{Z()},[f]),(0,a.useEffect)(()=>{u([])},[]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l.Z,{xs:12,md:6,title:"Data inicio da avaliac\xe3o",name:"dataInicio",form:n}),(0,s.jsx)(l.Z,{xs:12,md:6,title:"Data Fim da avalia\xe7\xe3o",name:"dataFim",form:n}),(0,s.jsx)(r.Z,{xs:12,md:6,title:"Quem preencheu",name:"quemPreenche",value:null===(e=n.getValues("quemPreenche"))||void 0===e?void 0:e.name,form:n,options:[{id:"1",name:"F\xe1brica"},{id:"2",name:"Fornecedor"}]}),(0,s.jsx)(r.Z,{xs:12,md:6,title:"Status",name:"status",form:n,options:v.status,value:null===(t=n.getValues("status"))||void 0===t?void 0:t.name})]})};t.default=u},68043:function(e,t,n){"use strict";n.r(t);var s=n(85893),a=n(67294),l=n(60664),r=n(93250),o=n(60565),i=n(83830),u=n(97415),c=n(47842),d=n(11163),m=n(46749),x=n(30944),h=n(57674);let f=()=>{let e=(0,d.useRouter)(),t=e.pathname,{setTitle:n}=(0,a.useContext)(o.f),{id:f}=(0,a.useContext)(i.X),{filteredData:p,setFilteredData:v,setData:j,startFilter:Z}=(0,x.L0)(),g=async()=>{await l.h.get(t).then(e=>{v(e.data),j(e.data),n({title:"Atividade",subtitle:{id:f,count:e.data.length,new:!1}})})};(0,a.useEffect)(()=>{g(),Z((0,s.jsx)(h.default,{}))},[f]);let D=(0,m.OL)(t,[{title:"ID",field:"id",size:.1},{title:"Nome",field:"nome",size:.8},{headerName:"Status",field:{name:"status",cor:"cor"},size:.1}]);return(0,s.jsx)(s.Fragment,{children:p?f&&f>0?(0,s.jsx)(u.Z,{id:f}):(0,s.jsx)(r.Z,{result:p,columns:D}):(0,s.jsx)(c.Z,{})})};t.default=f}},function(e){e.O(0,[4738,8371,5061,9525,9774,2888,179],function(){return e(e.s=12504)}),_N_E=e.O()}]);