"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9993],{19993:function(e,t,i){var a=i(85893),s=i(11163),n=i.n(s),r=i(67294),l=i(60664),o=i(49837),d=i(91359),c=i(79072),u=i(80562),m=i(54225),p=i(87536),f=i(86501),x=i(45061),h=i(65698),v=i(71798),g=i(60565),j=i(83830),Z=i(40039),D=i(29308),b=i(50287),I=i(41088),y=i(21609),S=i(67569),C=i(84220);let w=e=>{var t,i;let{id:s}=e,[w,P]=(0,r.useState)(!1),[F,N]=(0,r.useState)(null),{setId:k}=(0,r.useContext)(j.X),T=n(),O=s&&s>0?"edit":"new",A=T.pathname,{title:E}=(0,r.useContext)(g.f),{loggedUnity:M,user:_,setUser:q}=(0,r.useContext)(Z.V),{startLoading:z,stopLoading:U}=(0,I.Z)(),[V,L]=(0,r.useState)([]),W=new Date().toISOString().substring(0,10),Y=(0,p.cI)({mode:"onChange"}),$=e=>{let t=!!e.fields.profissionais.find(e=>e.profissional.id===_.profissionalID&&(!e.dataFim||""==e.dataFim||null==e.dataFim||"0000-00-00"==e.dataFim)),i=!!_.departamentos.find(e=>e.id===s);t&&!i?(q({..._,departamentos:[..._.departamentos,{id:e.fields.departamentoID,nome:e.fields.nome}]}),localStorage.setItem("userData",JSON.stringify({..._,departamentos:[..._.departamentos,{id:e.fields.departamentoID,nome:e.fields.nome}]}))):!t&&i&&(q({..._,departamentos:_.departamentos.filter(e=>e.id!==s)}),localStorage.setItem("userData",JSON.stringify({..._,departamentos:_.departamentos.filter(e=>e.id!==s)})))},B=async e=>{let t={...e,usuarioID:_.usuarioID,unidadeID:M.unidadeID};if(!H(e)){f.ZP.error("N\xe3o \xe9 permitido repetir profissional ativo em um departamento!");return}$(t);try{"new"===O?await l.h.post("cadastros/departamento/new/insertData",t).then(e=>{T.push("".concat((0,v.g_)(A))),k(e.data.id),f.ZP.success(v.OD.successNew)}):"edit"===O&&(await l.h.post("".concat(A,"/updateData/").concat(s),t),f.ZP.success(v.OD.successUpdate))}catch(i){i.response&&409===i.response.status?f.ZP.error(v.OD.errorRepeated):console.log(i)}finally{U()}},H=e=>{let t=!0;return e.fields.profissionais.length>1&&e.fields.profissionais.map((i,a)=>{e.fields.profissionais.map((e,s)=>{a===s||i.profissional.id!==e.profissional.id||i.dataFim||e.dataFim||(t=!1)})}),t},J=async()=>{try{await l.h.delete("".concat(A,"/").concat(s,"/").concat(_.usuarioID,"/").concat(M.unidadeID)),k(null),P(!1),f.ZP.success(v.OD.successDelete)}catch(e){e.response&&409===e.response.status?(f.ZP.error(v.OD.pendingDelete),P(!1)):console.log(e)}},R=async()=>{try{if("edit"===O){let e=await l.h.post("".concat(A,"/getData/").concat(s),{id:s});N(e.data),Y.reset(e.data)}else N({fields:{nome:"",status:1,profissionais:[]}}),Y.reset({...F,fields:{...F.fields}})}catch(t){console.log(t)}},K=async()=>{let e=await l.h.get("/cadastros/profissional?unidadeID=".concat(M.unidadeID,"&papelID=").concat(M.papelID)),t=e.data.filter(e=>1===e.statusID);L(t)};(0,r.useEffect)(()=>{R(),K(),setTimeout(()=>{Y.trigger()},300)},[s]);let{fields:X,append:G,remove:Q}=(0,p.Dq)({control:Y.control,name:"fields.profissionais"});return(0,a.jsxs)(a.Fragment,{children:[F&&(0,a.jsxs)("form",{onSubmit:Y.handleSubmit(B),children:[(0,a.jsx)(h.Z,{btnCancel:!0,btnNew:!0,btnSave:!0,handleSubmit:()=>Y.handleSubmit(B),btnDelete:"edit"===O,onclickDelete:()=>P(!0),type:O}),(0,a.jsx)(o.Z,{children:(0,a.jsx)(d.Z,{children:(0,a.jsxs)(c.ZP,{container:!0,spacing:5,children:[(0,a.jsx)(D.Z,{xs:12,md:11,title:"Nome",name:"fields.nome",required:!0,form:Y}),(0,a.jsx)(S.Z,{xs:1,md:1,title:"Ativo",name:"fields.status",value:null==F?void 0:null===(t=F.fields)||void 0===t?void 0:t.status,typePage:O,form:Y}),(0,a.jsx)(c.ZP,{item:!0,xs:12,children:(0,a.jsxs)("div",{className:"flex items-center gap-2 pb-1 pt-2",children:[(0,a.jsx)("div",{className:"",children:(0,a.jsx)(y.Z,{icon:"material-symbols:person-check-outline",className:"text-3xl"})}),(0,a.jsx)("div",{className:"flex flex-col gap-0",children:(0,a.jsx)("p",{className:"text-xl",children:"Profissionais"})})]})}),X.map((e,t)=>{var s,n,l,o,d,m,p,f,x;return(0,a.jsxs)(r.Fragment,{children:[(0,a.jsx)("input",{type:"hidden",name:"fields.profissionais[".concat(t,"].id"),value:e.id}),(0,a.jsx)(C.Z,{xs:12,md:7,title:"Profissional",name:"fields.profissionais[".concat(t,"].profissional"),value:null==F?void 0:null===(s=F.fields)||void 0===s?void 0:null===(n=s.profissionais)||void 0===n?void 0:null===(l=n[t])||void 0===l?void 0:l.profissional,required:!0,options:null!=V?V:[],form:Y,opacity:0===e.status}),(0,a.jsx)(b.Z,{xs:12,md:2,title:"Data In\xedcio",name:"fields.profissionais[".concat(t,"].dataInicio"),value:null!==(i=null==F?void 0:null===(o=F.fields)||void 0===o?void 0:null===(d=o.profissionais)||void 0===d?void 0:null===(m=d[t])||void 0===m?void 0:m.dataInicio)&&void 0!==i?i:W,required:!0,opacity:0===e.status,form:Y}),(0,a.jsx)(b.Z,{xs:12,md:2,title:"Data Fim",name:"fields.profissionais[".concat(t,"].dataFim"),value:null==F?void 0:null===(p=F.fields)||void 0===p?void 0:null===(f=p.profissionais)||void 0===f?void 0:null===(x=f[t])||void 0===x?void 0:x.dataFim,opacity:0===e.status,form:Y}),(0,a.jsx)(c.ZP,{item:!0,xs:12,md:1,className:"flex items-center",children:(0,a.jsx)(u.Z,{color:"error",size:"small",onClick:()=>Q(t),children:(0,a.jsx)(y.Z,{icon:"tabler:trash-filled"})})})]},e.id)}),(0,a.jsx)(c.ZP,{item:!0,xs:12,children:(0,a.jsx)(m.Z,{variant:"outlined",color:"primary",onClick(){G({id:null,dataInicio:new Date}),Y.trigger()},startIcon:(0,a.jsx)(y.Z,{icon:"material-symbols:add-circle-outline-rounded"}),children:"Inserir Profissional"})})]})})})]}),(0,a.jsx)(x.Z,{text:"Tem certeza que deseja excluir?",title:"Excluir "+E.title,openModal:w,handleClose:()=>P(!1),handleSubmit:J,btnCancel:!0,btnConfirm:!0})]})};t.Z=w},45061:function(e,t,i){var a=i(85893),s=i(54225),n=i(1890),r=i(77745),l=i(95398),o=i(76779),d=i(44642);i(21609);var c=i(19604),u=i(29630),m=i(55343),p=i(67836),f=i(67294),x=i(82747);i(84220),i(29308),i(67569),i(3893),i(88475);let h=e=>{let{title:t,text:i,handleClose:h,openModal:v,handleSubmit:g,cnpj:j,nomeFornecedor:Z,gruposAnexo:D,email:b,setEmail:I,inputEmail:y,btnCancel:S,btnConfirm:C,grupoAnexosFornecedor:w,btnCancelColor:P,btnConfirmColor:F,closeAfterSave:N,listErrors:k}=e,[T,O]=(0,f.useState)(!1);return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(n.Z,{open:v,"aria-labelledby":"form-dialog-title",disableEscapeKeyDown:!0,onClose(e,t){"backdropClick"!==t&&h()},children:[(0,a.jsx)(r.Z,{id:"form-dialog-title",children:t}),(0,a.jsxs)(l.Z,{children:[(0,a.jsxs)(d.Z,{sx:{mb:3},children:[(0,a.jsx)("div",{dangerouslySetInnerHTML:{__html:i}}),k&&k.status&&(0,a.jsxs)(c.Z,{variant:"outlined",severity:"error",sx:{mt:2},children:["Por favor, verifique os campos abaixo:",(0,a.jsx)(u.Z,{variant:"subtitle1",color:"error",sx:{mt:2},children:k.errors.map((e,t)=>(0,a.jsxs)(u.Z,{variant:"body2",color:"error",children:["- ",e]},t))})]})]}),y&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(m.Z,{sx:{mt:2},fullWidth:!0,children:[(0,a.jsx)(p.Z,{defaultValue:"",type:"email",label:"E-mail do Fornecedor (opcional)",placeholder:"E-mail do Fornecedor (opcional)","aria-describedby":"validation-schema-nome",name:"email",error:(null==b?void 0:b.length)>0&&T,inputProps:{onChange(e){I(e.target.value),O(!(0,x.dI)(e.target.value))}}}),(null==b?void 0:b.length)>0&&T&&(0,a.jsx)(u.Z,{variant:"body2",color:"error",children:"Por favor, insira um e-mail v\xe1lido!"})]}),(0,a.jsx)(c.Z,{severity:"info",sx:{mt:2},children:"Se o e-mail for preenchido, o mesmo receber\xe1 as instru\xe7\xf5es de cadastro e preenchimento do formul\xe1rio no e-mail."})]})]}),(0,a.jsxs)(o.Z,{className:"dialog-actions-dense",children:[S&&(0,a.jsx)(s.Z,{variant:"outlined",color:"primary",onClick:h,children:"Cancelar"}),C&&(0,a.jsx)(s.Z,{variant:"contained",disabled:y&&(null==b?void 0:b.length)>0&&T||k&&k.status,color:F||"error",onClick:y&&j?()=>{g(j,Z,D,b),N&&h()}:y&&!j?()=>{g(b),N&&h()}:()=>{g(),N&&h()},children:"Confirmar"})]})]})})};t.Z=h},67569:function(e,t,i){var a=i(85893),s=i(79072),n=i(61953),r=i(29630),l=i(22841),o=i(75158),d=i(53934);let c=e=>{let{form:t,xs:i,md:c,title:u,index:m,name:p,typePage:f,value:x,edit:h,className:v,helpText:g}=e;return(0,a.jsxs)(s.ZP,{item:!0,xs:i,md:c,className:v,children:[(0,a.jsxs)(n.Z,{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[(0,a.jsx)(r.Z,{variant:"caption",children:m&&0!=m?"":u}),(0,a.jsx)(l.Z,{control:(0,a.jsx)(o.Z,{size:"small",sx:{ml:4},...t.register(p),defaultChecked:!0==x||1==x||"new"==f,onChange(e){h&&t.setValue(h,!0)}})})]}),g&&(0,a.jsx)("div",{children:(0,a.jsx)(d.Z,{text:g,position:"top"})})]})};t.Z=c},50287:function(e,t,i){var a=i(85893),s=i(79072),n=i(55343),r=i(67836),l=i(62097),o=i(67294),d=i(87536),c=i(71798);let u=e=>{let{form:t,xs:i,md:u,title:m,required:p,disabled:f,type:x,value:h,name:v,typeValidation:g,alertRequired:j,opacity:Z,className:D}=e,b=(0,l.Z)(),[I,y]=(0,o.useState)({}),[S,C]=(0,o.useState)(null),w=Boolean((0,d.U2)(t.formState.errors,v));(0,o.useEffect)(()=>{g&&h&&P(g,v,h)},[g,h,v]);let P=(e,t,i,a)=>{let s=new Date(i+"T00:00:00"),n=(0,c.HD)(e,s,a);y(e=>({...e,[t]:n}))},F=e=>{let t=new Date,i=new Date(e+"T00:00:00");return"dataAtual"===g&&i.toDateString()!==t.toDateString()?"A data deve ser a data atual":"dataPassado"===g&&i>=t?"A data deve ser do passado":"dataFutura"===g&&i<=t?"A data deve ser do futuro":null},N=async e=>{let i=e.target.value,a=F(i);C(a),!a&&(t.setValue(v,i),g&&P(g,v,i)),await t.trigger(v)};return(0,a.jsx)(s.ZP,{item:!0,xs:i,md:u,sx:{my:1},children:(0,a.jsx)("div",{className:D,children:(0,a.jsx)(n.Z,{fullWidth:!0,sx:{position:"relative"},children:(0,a.jsx)(r.Z,{type:null!=x?x:"date",size:"small",label:m,disabled:f,defaultValue:h?(e=>{let t=new Date(e+"T00:00:00"),i=t.getUTCDate().toString().padStart(2,"0"),a=(t.getUTCMonth()+1).toString().padStart(2,"0"),s=t.getUTCFullYear();return"".concat(s,"-").concat(a,"-").concat(i)})(h):"",error:w||!!S,helperText:S,onChange:N,variant:"outlined",fullWidth:!0,InputLabelProps:{shrink:!0},inputProps:{min:"dataFutura"===g?new Date().toISOString().split("T")[0]:void 0,max:"dataPassado"===g?new Date().toISOString().split("T")[0]:new Date(new Date().setFullYear(new Date().getFullYear()+50)).toISOString().split("T")[0]},sx:{opacity:Z?.4:1,"& .MuiInputBase-input":{padding:"10px 14px"},...(p||j)&&(w||!!S)&&{"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:b.palette.error.main},"&:hover fieldset":{borderColor:b.palette.error.main},"&.Mui-focused fieldset":{borderColor:b.palette.error.main}},"& .MuiInputLabel-root":{color:b.palette.error.main},"& .MuiInputLabel-root.Mui-focused":{color:b.palette.error.main}}},...t.register(v,{required:p})})})})})};t.Z=u},88475:function(e,t,i){var a=i(85893),s=i(79072),n=i(61953),r=i(29630),l=i(17575),o=i(80562),d=i(21609);let c=e=>{let{xs:t,md:i,icon:c,color:u,title:m,removeItem:p,item:f,pending:x,index:h,textSuccess:v,textError:g}=e;return v=v||"Remover este item",g=g||"Este item n\xe3o pode ser removido pois possui cadastros vinculados a ele",(0,a.jsx)(s.ZP,{item:!0,xs:t,md:i,children:(0,a.jsxs)(n.Z,{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[(0,a.jsx)(r.Z,{variant:"caption",children:m}),(0,a.jsx)(l.Z,{title:1==x?g:v,children:(0,a.jsx)(o.Z,{color:null!=u?u:"error",size:"small",onClick(){1!=x&&p(f,h)},sx:{opacity:1==x?.5:1,cursor:1==x?"default":"pointer"},children:(0,a.jsx)(d.Z,{icon:null!=c?c:"tabler:trash-filled"})})})]})})};t.Z=c},82747:function(e,t,i){function a(e){if(!e||14!==(e=null==e?void 0:e.replace(/[^\d]+/g,"")).length||/^(\d)\1+$/.test(e))return!1;let t=e.length-2,i=e.substring(0,t),a=e.substring(t),s=0,n=t-7;for(let r=t;r>=1;r--)s+=i.charAt(t-r)*n--,n<2&&(n=9);let l=s%11<2?0:11-s%11;if(l!=a.charAt(0))return!1;t+=1,i=e.substring(0,t),s=0,n=t-7;for(let o=t;o>=1;o--)s+=i.charAt(t-o)*n--,n<2&&(n=9);return(l=s%11<2?0:11-s%11)==a.charAt(1)}function s(e){let t;if(!e||11!==(e=e.replace(/[^\d]+/g,"")).length||/^(\d)\1+$/.test(e))return!1;let i=0;for(let a=1;a<=9;a++)i+=parseInt(e.substring(a-1,a))*(11-a);if((10==(t=10*i%11)||11===t)&&(t=0),t!==parseInt(e.substring(9,10)))return!1;i=0;for(let s=1;s<=10;s++)i+=parseInt(e.substring(s-1,s))*(12-s);return(10==(t=10*i%11)||11===t)&&(t=0),t===parseInt(e.substring(10,11))}function n(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}i.d(t,{dI:function(){return n},sw:function(){return s},zk:function(){return a}})}}]);