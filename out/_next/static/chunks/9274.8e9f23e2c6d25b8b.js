"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9274],{29274:function(e,t,a){var n=a(85893),r=a(11163),s=a.n(r),i=a(67294),l=a(60664),o=a(49837),d=a(91359),c=a(79072),u=a(80562),m=a(54225),x=a(87536),p=a(86501),h=a(45061),f=a(65698),g=a(71798),j=a(60565),v=a(83830),Z=a(40039),b=a(29308);a(50287);var D=a(41088),y=a(21609),C=a(67569),I=a(84220);let S=e=>{var t;let{id:a}=e,[r,S]=(0,i.useState)(!1),[w,q]=(0,i.useState)(null),{setId:P}=(0,i.useContext)(v.X),k=s(),N=a&&a>0?"edit":"new",F=k.pathname,{title:E}=(0,i.useContext)(j.f),{loggedUnity:T,user:M,setUser:O}=(0,i.useContext)(Z.V),{startLoading:A,stopLoading:z}=(0,D.Z)(),[_,V]=(0,i.useState)([]);new Date().toISOString().substring(0,10);let L=(0,x.cI)({mode:"onChange"}),U=async e=>{let t={...e,usuarioID:M.usuarioID,unidadeID:T.unidadeID};if(!R(e)){p.ZP.error("N\xe3o \xe9 permitido repetir equipamento ativo em um setor!");return}try{"new"===N?await l.h.post("cadastros/setor/new/insertData",t).then(e=>{k.push("".concat((0,g.g_)(F))),P(e.data.id),p.ZP.success(g.OD.successNew)}):"edit"===N&&(await l.h.post("".concat(F,"/updateData/").concat(a),t),p.ZP.success(g.OD.successUpdate))}catch(n){n.response&&409===n.response.status?p.ZP.error(g.OD.errorRepeated):console.log(n)}finally{z()}},R=e=>{let t=!0;return e.fields.equipamentos.length>1&&e.fields.equipamentos.map((a,n)=>{e.fields.equipamentos.map((e,r)=>{n===r||a.equipamento.id!==e.equipamento.id||a.dataFim||e.dataFim||(t=!1)})}),t},W=async()=>{try{await l.h.delete("".concat(F,"/").concat(a,"/").concat(M.usuarioID,"/").concat(T.unidadeID)),P(null),S(!1),p.ZP.success(g.OD.successDelete)}catch(e){e.response&&409===e.response.status?(p.ZP.error(g.OD.pendingDelete),S(!1)):console.log(e)}},Y=async()=>{try{if("edit"===N){let e=await l.h.post("".concat(F,"/getData/").concat(a),{id:a});q(e.data),L.reset(e.data)}else q({fields:{nome:"",status:1,equipamentos:[]}}),L.reset({...w,fields:{...w.fields}})}catch(t){console.log(t)}},$=async()=>{let e=await l.h.post("/cadastros/equipamento/getEquipamentos",{unidadeID:T.unidadeID});V(e.data)};(0,i.useEffect)(()=>{Y(),$(),setTimeout(()=>{L.trigger()},300)},[a]);let{fields:B,append:H,remove:K}=(0,x.Dq)({control:L.control,name:"fields.equipamentos"});return(0,n.jsxs)(n.Fragment,{children:[w&&(0,n.jsxs)("form",{onSubmit:L.handleSubmit(U),children:[(0,n.jsx)(f.Z,{btnCancel:!0,btnNew:!0,btnSave:!0,handleSubmit:()=>L.handleSubmit(U),btnDelete:"edit"===N,onclickDelete:()=>S(!0),type:N}),(0,n.jsx)(o.Z,{children:(0,n.jsx)(d.Z,{children:(0,n.jsxs)(c.ZP,{container:!0,spacing:5,children:[(0,n.jsx)(b.Z,{xs:12,md:11,title:"Nome",name:"fields.nome",required:!0,form:L}),(0,n.jsx)(C.Z,{xs:1,md:1,title:"Ativo",name:"fields.status",value:null==w?void 0:null===(t=w.fields)||void 0===t?void 0:t.status,typePage:N,form:L}),(0,n.jsx)(c.ZP,{item:!0,xs:12,children:(0,n.jsxs)("div",{className:"flex items-center gap-2 pb-1 pt-2",children:[(0,n.jsx)("div",{className:"",children:(0,n.jsx)(y.Z,{icon:"game-icons:manual-meat-grinder",className:"text-3xl"})}),(0,n.jsx)("div",{className:"flex flex-col gap-0",children:(0,n.jsx)("p",{className:"text-xl",children:"Equipamentos"})})]})}),B.map((e,t)=>{var a,r,s;return(0,n.jsxs)(i.Fragment,{children:[(0,n.jsx)("input",{type:"hidden",name:"fields.equipamentos[".concat(t,"].id"),value:e.id}),(0,n.jsx)(I.Z,{xs:12,md:11,title:"Equipamento",name:"fields.equipamentos[".concat(t,"].equipamento"),value:null==w?void 0:null===(a=w.fields)||void 0===a?void 0:null===(r=a.equipamentos)||void 0===r?void 0:null===(s=r[t])||void 0===s?void 0:s.equipamento,required:!0,options:null!=_?_:[],form:L,opacity:0===e.status}),(0,n.jsx)(c.ZP,{item:!0,xs:12,md:1,className:"flex items-center",children:(0,n.jsx)(u.Z,{color:"error",size:"small",onClick:()=>K(t),children:(0,n.jsx)(y.Z,{icon:"tabler:trash-filled"})})})]},e.id)}),(0,n.jsx)(c.ZP,{item:!0,xs:12,children:(0,n.jsx)(m.Z,{variant:"outlined",color:"primary",onClick(){H({id:null,dataInicio:new Date}),L.trigger()},startIcon:(0,n.jsx)(y.Z,{icon:"material-symbols:add-circle-outline-rounded"}),children:"Inserir Equipamento"})})]})})})]}),(0,n.jsx)(h.Z,{text:"Tem certeza que deseja excluir?",title:"Excluir "+E.title,openModal:r,handleClose:()=>S(!1),handleSubmit:W,btnCancel:!0,btnConfirm:!0})]})};t.Z=S},45061:function(e,t,a){var n=a(85893),r=a(54225),s=a(1890),i=a(77745),l=a(95398),o=a(76779),d=a(44642);a(21609);var c=a(19604),u=a(29630),m=a(55343),x=a(67836),p=a(67294),h=a(82747);a(84220),a(29308),a(67569),a(3893),a(88475);let f=e=>{let{title:t,text:a,handleClose:f,openModal:g,handleSubmit:j,cnpj:v,nomeFornecedor:Z,gruposAnexo:b,email:D,setEmail:y,inputEmail:C,btnCancel:I,btnConfirm:S,grupoAnexosFornecedor:w,btnCancelColor:q,btnConfirmColor:P,closeAfterSave:k,listErrors:N}=e,[F,E]=(0,p.useState)(!1);return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(s.Z,{open:g,"aria-labelledby":"form-dialog-title",disableEscapeKeyDown:!0,onClose(e,t){"backdropClick"!==t&&f()},children:[(0,n.jsx)(i.Z,{id:"form-dialog-title",children:t}),(0,n.jsxs)(l.Z,{children:[(0,n.jsxs)(d.Z,{sx:{mb:3},children:[(0,n.jsx)("div",{dangerouslySetInnerHTML:{__html:a}}),N&&N.status&&(0,n.jsxs)(c.Z,{variant:"outlined",severity:"error",sx:{mt:2},children:["Por favor, verifique os campos abaixo:",(0,n.jsx)(u.Z,{variant:"subtitle1",color:"error",sx:{mt:2},children:N.errors.map((e,t)=>(0,n.jsxs)(u.Z,{variant:"body2",color:"error",children:["- ",e]},t))})]})]}),C&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(m.Z,{sx:{mt:2},fullWidth:!0,children:[(0,n.jsx)(x.Z,{defaultValue:"",type:"email",label:"E-mail do Fornecedor (opcional)",placeholder:"E-mail do Fornecedor (opcional)","aria-describedby":"validation-schema-nome",name:"email",error:(null==D?void 0:D.length)>0&&F,inputProps:{onChange(e){y(e.target.value),E(!(0,h.dI)(e.target.value))}}}),(null==D?void 0:D.length)>0&&F&&(0,n.jsx)(u.Z,{variant:"body2",color:"error",children:"Por favor, insira um e-mail v\xe1lido!"})]}),(0,n.jsx)(c.Z,{severity:"info",sx:{mt:2},children:"Se o e-mail for preenchido, o mesmo receber\xe1 as instru\xe7\xf5es de cadastro e preenchimento do formul\xe1rio no e-mail."})]})]}),(0,n.jsxs)(o.Z,{className:"dialog-actions-dense",children:[I&&(0,n.jsx)(r.Z,{variant:"outlined",color:"primary",onClick:f,children:"Cancelar"}),S&&(0,n.jsx)(r.Z,{variant:"contained",disabled:C&&(null==D?void 0:D.length)>0&&F||N&&N.status,color:P||"error",onClick:C&&v?()=>{j(v,Z,b,D),k&&f()}:C&&!v?()=>{j(D),k&&f()}:()=>{j(),k&&f()},children:"Confirmar"})]})]})})};t.Z=f},67569:function(e,t,a){var n=a(85893),r=a(79072),s=a(61953),i=a(29630),l=a(22841),o=a(75158),d=a(53934);let c=e=>{let{form:t,xs:a,md:c,title:u,index:m,name:x,typePage:p,value:h,edit:f,className:g,helpText:j}=e;return(0,n.jsxs)(r.ZP,{item:!0,xs:a,md:c,className:g,children:[(0,n.jsxs)(s.Z,{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[(0,n.jsx)(i.Z,{variant:"caption",children:m&&0!=m?"":u}),(0,n.jsx)(l.Z,{control:(0,n.jsx)(o.Z,{size:"small",sx:{ml:4},...t.register(x),defaultChecked:!0==h||1==h||"new"==p,onChange(e){f&&t.setValue(f,!0)}})})]}),j&&(0,n.jsx)("div",{children:(0,n.jsx)(d.Z,{text:j,position:"top"})})]})};t.Z=c},3893:function(e,t,a){var n=a(85893),r=a(79072),s=a(61953),i=a(22841),l=a(75158),o=a(53934),d=a(67294);let c=e=>{let{form:t,xs:a,md:c,title:u,name:m,value:x,disabled:p,onClick:h,helpText:f,helpTextPosition:g}=e;return(0,d.useEffect)(()=>{p&&t.setValue(m,x)},[p,x,t,m]),(0,n.jsx)(r.ZP,{item:!0,xs:null!=a?a:"12",md:null!=c?c:"12",children:(0,n.jsx)(s.Z,{display:"flex",alignItems:"center",justifyContent:"start",sx:{gap:0},children:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.Z,{control:(0,n.jsx)(l.Z,{name:m,onClick:h,...t.register(m),defaultChecked:x,disabled:p}),label:u,size:"small",sx:{marginRight:"4px","&:hover":{"& .MuiFormControlLabel-label":{color:"primary.main"}}}}),f&&(0,n.jsx)(o.Z,{text:f,position:null!=g?g:"top",className:"relative top-[2px]"})]})})})};t.Z=c},50287:function(e,t,a){var n=a(85893),r=a(79072),s=a(55343),i=a(67836),l=a(62097),o=a(67294),d=a(87536),c=a(71798);let u=e=>{let{form:t,xs:a,md:u,title:m,required:x,disabled:p,type:h,value:f,name:g,typeValidation:j,alertRequired:v,opacity:Z,className:b}=e,D=(0,l.Z)(),[y,C]=(0,o.useState)({}),[I,S]=(0,o.useState)(null),w=Boolean((0,d.U2)(t.formState.errors,g));(0,o.useEffect)(()=>{j&&f&&q(j,g,f)},[j,f,g]);let q=(e,t,a,n)=>{let r=new Date(a+"T00:00:00"),s=(0,c.HD)(e,r,n);C(e=>({...e,[t]:s}))},P=e=>{let t=new Date,a=new Date(e+"T00:00:00");return"dataAtual"===j&&a.toDateString()!==t.toDateString()?"A data deve ser a data atual":"dataPassado"===j&&a>=t?"A data deve ser do passado":"dataFutura"===j&&a<=t?"A data deve ser do futuro":null},k=async e=>{let a=e.target.value,n=P(a);S(n),!n&&(t.setValue(g,a),j&&q(j,g,a)),await t.trigger(g)};return(0,n.jsx)(r.ZP,{item:!0,xs:a,md:u,sx:{my:1},children:(0,n.jsx)("div",{className:b,children:(0,n.jsx)(s.Z,{fullWidth:!0,sx:{position:"relative"},children:(0,n.jsx)(i.Z,{type:null!=h?h:"date",size:"small",label:m,disabled:p,defaultValue:f?(e=>{let t=new Date(e+"T00:00:00"),a=t.getUTCDate().toString().padStart(2,"0"),n=(t.getUTCMonth()+1).toString().padStart(2,"0"),r=t.getUTCFullYear();return"".concat(r,"-").concat(n,"-").concat(a)})(f):"",error:w||!!I,helperText:I,onChange:k,variant:"outlined",fullWidth:!0,InputLabelProps:{shrink:!0},inputProps:{min:"dataFutura"===j?new Date().toISOString().split("T")[0]:void 0,max:"dataPassado"===j?new Date().toISOString().split("T")[0]:new Date(new Date().setFullYear(new Date().getFullYear()+50)).toISOString().split("T")[0]},sx:{opacity:Z?.4:1,"& .MuiInputBase-input":{padding:"10px 14px"},...(x||v)&&(w||!!I)&&{"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:D.palette.error.main},"&:hover fieldset":{borderColor:D.palette.error.main},"&.Mui-focused fieldset":{borderColor:D.palette.error.main}},"& .MuiInputLabel-root":{color:D.palette.error.main},"& .MuiInputLabel-root.Mui-focused":{color:D.palette.error.main}}},...t.register(g,{required:x})})})})})};t.Z=u},88475:function(e,t,a){var n=a(85893),r=a(79072),s=a(61953),i=a(29630),l=a(17575),o=a(80562),d=a(21609);let c=e=>{let{xs:t,md:a,icon:c,color:u,title:m,removeItem:x,item:p,pending:h,index:f,textSuccess:g,textError:j}=e;return g=g||"Remover este item",j=j||"Este item n\xe3o pode ser removido pois possui cadastros vinculados a ele",(0,n.jsx)(r.ZP,{item:!0,xs:t,md:a,children:(0,n.jsxs)(s.Z,{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[(0,n.jsx)(i.Z,{variant:"caption",children:m}),(0,n.jsx)(l.Z,{title:1==h?j:g,children:(0,n.jsx)(o.Z,{color:null!=u?u:"error",size:"small",onClick(){1!=h&&x(p,f)},sx:{opacity:1==h?.5:1,cursor:1==h?"default":"pointer"},children:(0,n.jsx)(d.Z,{icon:null!=c?c:"tabler:trash-filled"})})})]})})};t.Z=c},82747:function(e,t,a){function n(e){if(!e||14!==(e=null==e?void 0:e.replace(/[^\d]+/g,"")).length||/^(\d)\1+$/.test(e))return!1;let t=e.length-2,a=e.substring(0,t),n=e.substring(t),r=0,s=t-7;for(let i=t;i>=1;i--)r+=a.charAt(t-i)*s--,s<2&&(s=9);let l=r%11<2?0:11-r%11;if(l!=n.charAt(0))return!1;t+=1,a=e.substring(0,t),r=0,s=t-7;for(let o=t;o>=1;o--)r+=a.charAt(t-o)*s--,s<2&&(s=9);return(l=r%11<2?0:11-r%11)==n.charAt(1)}function r(e){let t;if(!e||11!==(e=e.replace(/[^\d]+/g,"")).length||/^(\d)\1+$/.test(e))return!1;let a=0;for(let n=1;n<=9;n++)a+=parseInt(e.substring(n-1,n))*(11-n);if((10==(t=10*a%11)||11===t)&&(t=0),t!==parseInt(e.substring(9,10)))return!1;a=0;for(let r=1;r<=10;r++)a+=parseInt(e.substring(r-1,r))*(12-r);return(10==(t=10*a%11)||11===t)&&(t=0),t===parseInt(e.substring(10,11))}function s(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}a.d(t,{dI:function(){return s},sw:function(){return r},zk:function(){return n}})}}]);