"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5061],{45061:function(e,r,l){var t=l(85893),n=l(54225),i=l(1890),o=l(77745),s=l(95398),a=l(76779),d=l(44642);l(21609);var c=l(19604),u=l(29630),x=l(55343),m=l(67836),p=l(67294),h=l(82747);l(84220),l(29308),l(67569),l(3893),l(88475);let f=e=>{let{title:r,text:l,handleClose:f,openModal:v,handleSubmit:j,cnpj:g,nomeFornecedor:Z,gruposAnexo:b,email:C,setEmail:y,inputEmail:k,btnCancel:I,btnConfirm:N,grupoAnexosFornecedor:P,btnCancelColor:E,btnConfirmColor:M,closeAfterSave:D,listErrors:F}=e,[w,z]=(0,p.useState)(!1);return(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)(i.Z,{open:v,"aria-labelledby":"form-dialog-title",disableEscapeKeyDown:!0,onClose(e,r){"backdropClick"!==r&&f()},children:[(0,t.jsx)(o.Z,{id:"form-dialog-title",children:r}),(0,t.jsxs)(s.Z,{children:[(0,t.jsxs)(d.Z,{sx:{mb:3},children:[l,F&&F.status&&(0,t.jsxs)(c.Z,{variant:"outlined",severity:"error",sx:{mt:2},children:["Por favor, verifique os campos abaixo:",(0,t.jsx)(u.Z,{variant:"subtitle1",color:"error",sx:{mt:2},children:F.errors.map((e,r)=>(0,t.jsxs)(u.Z,{variant:"body2",color:"error",children:["- ",e]},r))})]})]}),k&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(x.Z,{sx:{mt:2},fullWidth:!0,children:[(0,t.jsx)(m.Z,{defaultValue:"",type:"email",label:"E-mail do Fornecedor (opcional)",placeholder:"E-mail do Fornecedor (opcional)","aria-describedby":"validation-schema-nome",name:"email",error:(null==C?void 0:C.length)>0&&w,inputProps:{onChange(e){y(e.target.value),z(!(0,h.dI)(e.target.value))}}}),(null==C?void 0:C.length)>0&&w&&(0,t.jsx)(u.Z,{variant:"body2",color:"error",children:"Por favor, insira um e-mail v\xe1lido!"})]}),(0,t.jsx)(c.Z,{severity:"info",sx:{mt:2},children:"Se o e-mail for preenchido, o mesmo receber\xe1 as instru\xe7\xf5es de cadastro e preenchimento do formul\xe1rio no e-mail."})]})]}),(0,t.jsxs)(a.Z,{className:"dialog-actions-dense",children:[I&&(0,t.jsx)(n.Z,{variant:"outlined",color:"primary",onClick:f,children:"Cancelar"}),N&&(0,t.jsx)(n.Z,{variant:"contained",disabled:k&&(null==C?void 0:C.length)>0&&w||F&&F.status,color:M||"error",onClick:k&&g?()=>{j(g,Z,b,C),D&&f()}:k&&!g?()=>{j(C),D&&f()}:()=>{j(),D&&f()},children:"Confirmar"})]})]})})};r.Z=f},67569:function(e,r,l){var t=l(85893),n=l(79072),i=l(61953),o=l(29630),s=l(22841),a=l(75158);let d=e=>{let{xs:r,md:l,title:d,index:c,name:u,typePage:x,value:m,edit:p,register:h,setValue:f,className:v}=e;return(0,t.jsx)(n.ZP,{item:!0,xs:r,md:l,className:v,children:(0,t.jsxs)(i.Z,{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[(0,t.jsx)(o.Z,{variant:"caption",children:c&&0!=c?"":d}),(0,t.jsx)(s.Z,{control:(0,t.jsx)(a.Z,{size:"small",sx:{ml:4},...h(u),defaultChecked:!0==m||1==m||"new"==x,onChange(e){p&&f(p,!0)}})})]})})};r.Z=d},3893:function(e,r,l){var t=l(85893),n=l(79072),i=l(61953),o=l(22841),s=l(75158),a=l(53934);let d=e=>{let{xs:r,md:l,title:d,index:c,name:u,typePage:x,value:m,disabled:p,register:h,onClick:f,helpText:v,helpTextPosition:j}=e;return console.log("\uD83D\uDE80 ~ CheckLabel:",m),(0,t.jsx)(n.ZP,{item:!0,xs:null!=r?r:"12",md:null!=l?l:"12",children:(0,t.jsx)(i.Z,{display:"flex",alignItems:"center",justifyContent:"start",sx:{gap:0},children:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.Z,{control:(0,t.jsx)(s.Z,{name:u,onClick:f,...h(u),defaultChecked:m,disabled:p}),label:d,size:"small",sx:{marginRight:"4px","&:hover":{"& .MuiFormControlLabel-label":{color:"primary.main"}}}}),v&&(0,t.jsx)(a.Z,{text:v,position:null!=j?j:"top"})]})})})};r.Z=d},88475:function(e,r,l){var t=l(85893),n=l(79072),i=l(61953),o=l(29630),s=l(17575),a=l(80562),d=l(21609);let c=e=>{let{xs:r,md:l,icon:c,color:u,title:x,removeItem:m,item:p,pending:h,index:f,textSuccess:v,textError:j}=e;return v=v||"Remover este item",j=j||"Este item n\xe3o pode ser removido pois possui cadastros vinculados a ele",(0,t.jsx)(n.ZP,{item:!0,xs:r,md:l,children:(0,t.jsxs)(i.Z,{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[(0,t.jsx)(o.Z,{variant:"caption",children:x}),(0,t.jsx)(s.Z,{title:1==h?j:v,children:(0,t.jsx)(a.Z,{color:null!=u?u:"error",size:"small",onClick(){1!=h&&m(p,f)},sx:{opacity:1==h?.5:1,cursor:1==h?"default":"pointer"},children:(0,t.jsx)(d.Z,{icon:null!=c?c:"tabler:trash-filled"})})})]})})};r.Z=c},84220:function(e,r,l){var t=l(85893),n=l(79072),i=l(55343),o=l(35966),s=l(67836),a=l(70918),d=l(87536),c=l(53934),u=l(62097),x=l(51514);let m=e=>{var r;let{xs:l,md:m,title:p,options:h,name:f,type:v,limitTags:j,value:g,required:Z,control:b,disabled:C,multiple:y,setValue:k,errors:I,onChange:N,className:P,createNew:E,handleRegistroEstabelecimento:M,helpText:D,alertRequired:F,helpTextPosition:w}=e,z=(0,u.Z)(),{settings:L}=(0,x.r)(),{mode:A}=L,_=E?[{nome:"-- Novo --"},...null!=h?h:[]]:h;return(0,t.jsx)(n.ZP,{item:!0,xs:l,md:m,sx:{my:1},className:P,children:(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(i.Z,{fullWidth:!0,children:(0,t.jsx)(d.Qr,{name:f,control:b,defaultValue:g,rules:{required:Z},render(e){let{field:l}=e;return(0,t.jsx)(o.Z,{...l,multiple:y,limitTags:j,size:"small",options:_,getOptionLabel:e=>null==e?void 0:e.nome,value:y&&l.value&&l.value.length>0?l.value.map(e=>h.find(r=>r.id===e.id)):null!==(r=l.value)&&void 0!==r?r:{nome:""},disabled:C,onChange(e,r){r&&"-- Novo --"==e.target.innerText?E():(N&&N(r),k(f,r))},renderInput:e=>(0,t.jsx)(s.Z,{...e,label:p,placeholder:p,error:!!I,sx:{"& .MuiInputBase-input":{padding:"8px 14px"},...F&&!(null==l?void 0:l.value)&&{"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:z.palette.error.main},"&:hover fieldset":{borderColor:z.palette.error.main},"&.Mui-focused fieldset":{borderColor:z.palette.error.main}},"& .MuiInputLabel-root":{color:z.palette.error.main},"& .MuiInputLabel-root.Mui-focused":{color:z.palette.error.main}}}}),PaperComponent(e){let{children:r}=e;return(0,t.jsx)(a.Z,{sx:{"& ul":{border:"dark"==L.mode?"1px solid rgba(".concat(z.palette.customColors.main,", 0.32)"):"null",borderRadius:"8px"}},children:r})},noOptionsText:"Sem op\xe7\xf5es"})}})}),D&&(0,t.jsx)("div",{className:"absolute right-[60px] top-[12px] ",children:(0,t.jsx)(c.Z,{text:D,position:null!=w?w:"top"})})]})})};r.Z=m},82747:function(e,r,l){function t(e){if(14!==(e=null==e?void 0:e.replace(/[^\d]+/g,"")).length||/^(\d)\1+$/.test(e))return!1;let r=e.length-2,l=e.substring(0,r),t=e.substring(r),n=0,i=r-7;for(let o=r;o>=1;o--)n+=l.charAt(r-o)*i--,i<2&&(i=9);let s=n%11<2?0:11-n%11;if(s!=t.charAt(0))return!1;r+=1,l=e.substring(0,r),n=0,i=r-7;for(let a=r;a>=1;a--)n+=l.charAt(r-a)*i--,i<2&&(i=9);return(s=n%11<2?0:11-n%11)==t.charAt(1)}function n(e){let r;if(11!==(e=e.replace(/[^\d]+/g,"")).length||/^(\d)\1+$/.test(e))return!1;let l=0;for(let t=1;t<=9;t++)l+=parseInt(e.substring(t-1,t))*(11-t);if((10==(r=10*l%11)||11===r)&&(r=0),r!==parseInt(e.substring(9,10)))return!1;l=0;for(let n=1;n<=10;n++)l+=parseInt(e.substring(n-1,n))*(12-n);return(10==(r=10*l%11)||11===r)&&(r=0),r===parseInt(e.substring(10,11))}function i(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}l.d(r,{dI:function(){return i},sw:function(){return n},zk:function(){return t}})}}]);