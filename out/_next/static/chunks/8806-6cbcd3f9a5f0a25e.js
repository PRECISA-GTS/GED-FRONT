"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8806],{59742:function(e,o,r){r.d(o,{Z:function(){return y}});var a=r(63366),s=r(87462),t=r(67294),i=r(86010),l=r(94780),n=r(29630),d=r(78884),c=r(67074),u=r(1588),m=r(34867);function x(e){return(0,m.Z)("MuiCardHeader",e)}let f=(0,u.Z)("MuiCardHeader",["root","avatar","action","content","title","subheader"]);var p=r(85893);let h=["action","avatar","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"],v=e=>{let{classes:o}=e;return(0,l.Z)({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},x,o)},g=(0,c.ZP)("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:(e,o)=>(0,s.Z)({[`& .${f.title}`]:o.title,[`& .${f.subheader}`]:o.subheader},o.root)})({display:"flex",alignItems:"center",padding:16}),Z=(0,c.ZP)("div",{name:"MuiCardHeader",slot:"Avatar",overridesResolver:(e,o)=>o.avatar})({display:"flex",flex:"0 0 auto",marginRight:16}),j=(0,c.ZP)("div",{name:"MuiCardHeader",slot:"Action",overridesResolver:(e,o)=>o.action})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),w=(0,c.ZP)("div",{name:"MuiCardHeader",slot:"Content",overridesResolver:(e,o)=>o.content})({flex:"1 1 auto"}),b=t.forwardRef(function(e,o){let r=(0,d.Z)({props:e,name:"MuiCardHeader"}),{action:t,avatar:l,className:c,component:u="div",disableTypography:m=!1,subheader:x,subheaderTypographyProps:f,title:b,titleTypographyProps:y}=r,P=(0,a.Z)(r,h),C=(0,s.Z)({},r,{component:u,disableTypography:m}),D=v(C),S=b;null==S||S.type===n.Z||m||(S=(0,p.jsx)(n.Z,(0,s.Z)({variant:l?"body2":"h5",className:D.title,component:"span",display:"block"},y,{children:S})));let I=x;return null==I||I.type===n.Z||m||(I=(0,p.jsx)(n.Z,(0,s.Z)({variant:l?"body2":"body1",className:D.subheader,color:"text.secondary",component:"span",display:"block"},f,{children:I}))),(0,p.jsxs)(g,(0,s.Z)({className:(0,i.Z)(D.root,c),as:u,ref:o,ownerState:C},P,{children:[l&&(0,p.jsx)(Z,{className:D.avatar,ownerState:C,children:l}),(0,p.jsxs)(w,{className:D.content,ownerState:C,children:[S,I]}),t&&(0,p.jsx)(j,{className:D.action,ownerState:C,children:t})]}))});var y=b},48806:function(e,o,r){r.d(o,{Z:function(){return z}});var a=r(85893),s=r(11163),t=r.n(s),i=r(67294),l=r(60664);r(60565);var n=r(66136),d=r(83830),c=r(49837),u=r(91359),m=r(79072),x=r(17575),f=r(80562),p=r(55343),h=r(44731),v=r(59742),g=r(29630),Z=r(21609),j=r(87536),w=r(47842),b=r(86501);r(45061);var y=r(86887),P=r(46749),C=r(49540),D=r(40039),S=r(29308),I=r(84220),q=r(3893),F=r(82747);r(53934);var k=r(9041),R=r(54225),N=r(67836);let T=e=>{let{register:o,errors:r,setShowNewPassword:s,showNewPassword:t,watch:l}=e,[n,d]=(0,i.useState)({showPassword:!1,showConfirmPassword:!1}),c=()=>{d({...n,showPassword:!n.showPassword})},u=e=>{e.preventDefault()},x=()=>{d({...n,showConfirmPassword:!n.showConfirmPassword})},h=e=>{e.preventDefault()};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(m.ZP,{item:!0,xs:6,md:4,children:(0,a.jsx)(p.Z,{fullWidth:!0,children:(0,a.jsx)(R.Z,{variant:"outlined",size:"large",startIcon:(0,a.jsx)(Z.Z,{icon:"uil:padlock"}),onClick:()=>s(!t),children:"Alterar senha"})})}),t&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(m.ZP,{item:!0,xs:6,sm:4,children:(0,a.jsx)(N.Z,{fullWidth:!0,label:"Nova senha",id:"input-password",variant:"outlined",size:"small",type:n.showPassword?"text":"password",name:"senha",error:!!r.senha,helperText:r.senha&&r.senha.message,InputProps:{endAdornment:(0,a.jsx)(k.Z,{position:"end",children:(0,a.jsx)(f.Z,{edge:"end",onClick:c,onMouseDown:u,children:(0,a.jsx)(Z.Z,{icon:n.showPassword?"mdi:eye-outline":"mdi:eye-off-outline"})})})},...o("senha",{minLength:{value:4,message:"Senha deve ter pelo menos 4 caracteres"}})})}),(0,a.jsx)(m.ZP,{item:!0,xs:6,sm:4,children:(0,a.jsx)(N.Z,{fullWidth:!0,label:"Confirmar nova senha",id:"input-confirm-password",variant:"outlined",size:"small",type:n.showConfirmPassword?"text":"password",name:"confirmaSenha",error:!!r.confirmaSenha,helperText:r.confirmaSenha&&r.confirmaSenha.message,InputProps:{endAdornment:(0,a.jsx)(k.Z,{position:"end",children:(0,a.jsx)(f.Z,{edge:"end",onClick:x,onMouseDown:h,children:(0,a.jsx)(Z.Z,{icon:n.showConfirmPassword?"mdi:eye-outline":"mdi:eye-off-outline"})})})},onChange(e){setLenghtPassword(e.target.value)},...o("confirmaSenha",{validate:e=>e===l("senha")||"As senhas n\xe3o coincidem"})})})]})]})};var E=r(92629);let M=e=>{var o,r,s,k,R,N,M,z,A,O,H,J,U,_,B,Y;let{id:W}=e,{user:L,setUser:Q,loggedUnity:V,setLoggedUnity:$}=(0,i.useContext)(D.V),{setId:X}=(0,i.useContext)(d.X);W=1===L.papelID?W:V.unidadeID;let[G,K]=(0,i.useState)(!1),[ee,eo]=(0,i.useState)(),[er,ea]=(0,i.useState)(),[es,et]=(0,i.useState)(!1),[ei,el]=(0,i.useState)(!1),[en,ed]=(0,i.useState)(),[ec,eu]=(0,i.useState)(null),[em,ex]=(0,i.useState)(!1),ef=t(),ep=W&&W>0?"edit":"new",eh=1===L.papelID?ef.pathname:"/configuracoes/unidade",ev=(0,i.useRef)(null),{settings:eg}=(0,i.useContext)(n.J6),eZ=eg.mode,{trigger:ej,handleSubmit:ew,setValue:eb,getValues:ey,setError:eP,reset:eC,control:eD,watch:eS,formState:{errors:eI},register:eq}=(0,j.cI)(),eF=async e=>{if(9==e.length){let o=e.replace(/\D/g,"");l.h.get("https://viacep.com.br/ws/"+o+"/json/").then(e=>{e.data.localidade?(eb("fields.logradouro",e.data.logradouro),eb("fields.bairro",e.data.bairro),eb("fields.cidade",e.data.localidade),eb("fields.uf",e.data.uf),b.ZP.success("Endere\xe7o encontrado!")):b.ZP.error("Endere\xe7o n\xe3o encontrado!")})}};console.log("erross",eI);let ek=async e=>{let o=(0,F.zk)(e.fields.cnpj);if(!o){eP("fields.cnpj",{type:"required",message:"CNPJ inv\xe1lido"});return}let r={...e,usuarioID:L.usuarioID,unidadeID:V.unidadeID,fields:{...e.fields,dataCadastro:new Date().toISOString().substring(0,10)}};delete r.cabecalhoRelatorioTitle,delete r.cabecalhoRelatorio;try{"new"===ep?await l.h.post("".concat((0,P.g_)(eh),"/new/insertData"),r).then(e=>{ef.push("".concat((0,P.g_)(eh))),X(e.data),b.ZP.success(P.OD.successNew)}):"edit"===ep&&(await l.h.post("".concat(eh,"/updateData/").concat(W),r),b.ZP.success(P.OD.successUpdate),et(!1),eN()),2===L.papelID&&$({...V,nomeFantasia:e.fields.nomeFantasia,complemento:e.fields.complemento,razaoSocial:e.fields.razaoSocial,responsavel:e.fields.responsavel,email:e.fields.email,telefone1:e.fields.telefone1,telefone2:e.fields.telefone2,cep:e.fields.cep,logradouro:e.fields.logradouro,numero:e.fields.numero,complemento:e.fields.complemento,bairro:e.fields.bairro,cidade:e.fields.cidade,uf:e.fields.uf})}catch(a){a.response&&409===a.response.status?b.ZP.error(P.OD.errorRepeated):console.log(a)}finally{eR()}},eR=async()=>{localStorage.removeItem("loggedUnity"),localStorage.setItem("loggedUnity",JSON.stringify(V))},eN=async()=>{if("edit"==ep)try{var e,o;let r=await l.h.get("".concat(eh,"/").concat(W));eC(r.data),console.log("\uD83D\uDE80 ~ response:",r.data),eo(r.data),ed(r.data.fields.cabecalhoRelatorioTitle),eu(null===(e=r.data)||void 0===e?void 0:null===(o=e.fields)||void 0===o?void 0:o.cabecalhoRelatorio)}catch(a){console.log(a)}else eo({}),eC({fields:{logradouro:"--",bairro:"--",cidade:"--",uf:"--"}})};(0,i.useEffect)(()=>{eN()},[W]);//! Crud imagem cabeçalho relatórios
let eT=()=>{ev.current.click()},eE=async e=>{let o=e.target.files[0];if(o){let r=new FormData;r.append("files[]",o),r.append("usuarioID",L.usuarioID);let a=o.type.includes("image");if(!a){b.ZP.error("O arquivo selecionado n\xe3o \xe9 uma imagem!");return}await l.h.post("".concat(eh,"/updateData/report/").concat(W,"/").concat(L.usuarioID,"/").concat(V.unidadeID),r).then(e=>{eu(e.data),b.ZP.success("Foto atualizada com sucesso!");let o=JSON.parse(localStorage.getItem("userData"));o.imagem=e.data,localStorage.setItem("userData",JSON.stringify(o)),Q(o)}).catch(e=>{var o,r,a;b.ZP.error(null!==(a=null===(o=e.response)||void 0===o?void 0:null===(r=o.data)||void 0===r?void 0:r.message)&&void 0!==a?a:"Erro ao atualizar foto de perfil, tente novamente!")})}},eM=async()=>{try{await l.h.delete("".concat(eh,"/fileReport/").concat(W,"/").concat(L.usuarioID,"/").concat(V.unidadeID)),eu(null),b.ZP.success("Foto removida com sucesso!")}catch(e){console.log(e),b.ZP.error("Erro ao remover foto, tente novamente!")}};return(0,a.jsxs)(a.Fragment,{children:[!ee&&(0,a.jsx)(w.Z,{}),ee&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("form",{onSubmit:ew(ek),children:[(0,a.jsx)(y.Z,{btnCancel:1===L.papelID,btnSave:!0,handleSubmit:()=>ew(ek),btnDelete:"edit"===ep&&1===L.papelID,onclickDelete:()=>ex(!0),type:ep}),(0,a.jsxs)(c.Z,{children:[(0,a.jsx)(E.Z,{title:"Excluir Unidade",description:"Tem certeza que deseja exluir a unidade?",params:{route:"configuracoes/unidade/".concat(W),messageSucceded:"Unidade exclu\xedda com sucesso!",MessageError:"Dado possui pend\xeancia!"},open:em,handleClose:()=>ex(!1)}),(0,a.jsx)(u.Z,{children:(0,a.jsxs)(m.ZP,{container:!0,spacing:4,children:["edit"==ep&&(0,a.jsx)(m.ZP,{item:!0,xs:12,md:2,children:(0,a.jsxs)(m.ZP,{item:!0,xs:12,md:12,sx:{display:"flex",justifyContent:"center",alignItems:"center",height:"140px",position:"relative",border:"".concat("dark"===eZ?"1px solid #65656E":"1px solid #C5C6CD"),borderRadius:"8px"},children:[ec&&(0,a.jsx)(x.Z,{title:"Apagar foto do perfil",placement:"top",children:(0,a.jsx)(f.Z,{size:"small",sx:{position:"absolute",top:"8px",right:"8px",zIndex:"20",color:"white",opacity:"0.8",backgroundColor:"#FF4D49","&:hover":{backgroundColor:"#FF4D49",opacity:"1"}},onClick:eM,children:(0,a.jsx)(Z.Z,{icon:"material-symbols:delete-outline"})})}),(0,a.jsx)(x.Z,{title:ec?"Alterar foto":"Inserir foto",placement:"top",children:(0,a.jsxs)(p.Z,{sx:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",width:"100%"},children:[(0,a.jsx)("input",{type:"file",ref:ev,style:{display:"none"},onChange:eE}),(0,a.jsx)(h.Z,{variant:"rounded",alt:"Imagem do cabe\xe7alho do relat\xf3rio",sx:{width:"100%",height:"100%",cursor:"pointer"},onClick:eT,src:null!=ec?ec:"https://gedagro.com.br/images/report.png"})]})})]})}),(0,a.jsx)(m.ZP,{item:!0,xs:12,md:"new"==ep?12:10,children:(0,a.jsxs)(m.ZP,{container:!0,spacing:4,children:[(0,a.jsx)(S.Z,{xs:12,md:4,title:"Nome Fantasia",name:"fields.nomeFantasia",required:!0,register:eq,control:eD,errors:null==eI?void 0:null===(o=eI.fields)||void 0===o?void 0:o.nomeFantasia}),(0,a.jsx)(S.Z,{xs:12,md:4,title:"Raz\xe3o Social",name:"fields.razaoSocial",required:!0,register:eq,control:eD,errors:null==eI?void 0:null===(r=eI.fields)||void 0===r?void 0:r.razaoSocial}),(0,a.jsx)(S.Z,{xs:12,md:4,title:"CNPJ",name:"fields.cnpj",mask:"cnpj",required:!0,register:eq,control:eD,errors:null==eI?void 0:null===(s=eI.fields)||void 0===s?void 0:s.cnpj}),(0,a.jsx)(S.Z,{xs:12,md:4,title:"Respons\xe1vel",name:"fields.responsavel",required:!0,register:eq,control:eD,errors:null==eI?void 0:null===(k=eI.fields)||void 0===k?void 0:k.responsavel}),(0,a.jsx)(S.Z,{xs:12,md:4,title:"E-mail",name:"fields.email",type:"email",required:!0,register:eq,control:eD,errors:null==eI?void 0:null===(R=eI.fields)||void 0===R?void 0:R.email}),(0,a.jsx)(S.Z,{xs:12,md:4,title:"Telefone 1",name:"fields.telefone1",mask:"telefone",required:!1,register:eq,control:eD,errors:null==eI?void 0:null===(N=eI.fields)||void 0===N?void 0:N.telefone1}),(0,a.jsx)(S.Z,{xs:12,md:4,title:"Telefone 2",name:"fields.telefone2",mask:"telefone",required:!1,register:eq,control:eD,errors:null==eI?void 0:null===(M=eI.fields)||void 0===M?void 0:M.telefone2}),(0,a.jsx)(S.Z,{xs:12,md:4,title:"CEP",name:"fields.cep",getAddressByCep:eF,mask:"cep",required:!1,register:eq,control:eD,errors:null==eI?void 0:null===(z=eI.fields)||void 0===z?void 0:z.cep}),(0,a.jsx)(S.Z,{xs:12,md:4,title:"Rua",name:"fields.logradouro",required:!1,register:eq,control:eD,errors:null==eI?void 0:null===(A=eI.fields)||void 0===A?void 0:A.logradouro}),(0,a.jsx)(S.Z,{xs:12,md:4,title:"N\xfamero",name:"fields.numero",required:!1,register:eq,control:eD,errors:null==eI?void 0:null===(O=eI.fields)||void 0===O?void 0:O.numero}),(0,a.jsx)(S.Z,{xs:12,md:4,title:"Complemento",name:"fields.complemento",required:!1,register:eq,control:eD,errors:null==eI?void 0:null===(H=eI.fields)||void 0===H?void 0:H.complemento}),(0,a.jsx)(S.Z,{xs:12,md:4,title:"Bairro",name:"fields.bairro",required:!1,register:eq,control:eD,errors:null==eI?void 0:null===(J=eI.fields)||void 0===J?void 0:J.bairro}),(0,a.jsx)(S.Z,{xs:12,md:8,title:"Cidade",name:"fields.cidade",required:!1,register:eq,control:eD,errors:null==eI?void 0:null===(U=eI.fields)||void 0===U?void 0:U.cidade}),(0,a.jsx)(S.Z,{xs:12,md:4,title:"UF",name:"fields.uf",mask:"estado",required:!1,register:eq,control:eD,errors:null==eI?void 0:null===(_=eI.fields)||void 0===_?void 0:_.uf}),"edit"==ep&&2==L.papelID&&(0,a.jsx)(T,{register:eq,errors:eI,showNewPassword:es,setShowNewPassword:et,watch:eS})]})})]})})]})]}),"edit"==ep&&1==L.papelID&&(0,a.jsxs)(c.Z,{sx:{mt:4},children:[(0,a.jsx)(v.Z,{title:"Par\xe2metros"}),(0,a.jsx)(u.Z,{children:(0,a.jsx)(m.ZP,{container:!0,spacing:8,children:(0,a.jsxs)(m.ZP,{item:!0,xs:12,md:12,children:[(0,a.jsxs)(m.ZP,{container:!0,spacing:4,children:[(0,a.jsx)(S.Z,{xs:12,md:12,title:"T\xedtulo do relat\xf3rio",name:"fields.tituloRelatorio",required:!1,register:eq,control:eD,errors:null==eI?void 0:null===(B=eI.fields)||void 0===B?void 0:B.tituloRelatorio,helpText:"T\xedtulo que aparecer\xe1 no cabe\xe7alho dos relat\xf3rios"}),(0,a.jsx)(I.Z,{xs:12,md:8,multiple:!0,title:"Extens\xf5es de Arquivos Permitidas",name:"fields.extensoes",options:ee.fields.allExtensions,value:ee.fields.extensoes,register:eq,setValue:eb,control:eD}),(0,a.jsx)(S.Z,{xs:12,md:4,title:"Tamanho m\xe1ximo dos anexos (MB)",name:"fields.anexosTamanhoMaximo",required:!0,register:eq,control:eD,errors:null==eI?void 0:null===(Y=eI.fields)||void 0===Y?void 0:Y.anexosTamanhoMaximo}),(0,a.jsx)(q.Z,{title:"Obrigat\xf3rio o produto no formul\xe1rio de qualifica\xe7\xe3o do fornecedor",name:"fields.obrigatorioProdutoFornecedor",value:ee.fields.obrigatorioProdutoFornecedor,register:eq,helpText:"Com esta op\xe7\xe3o marcada, ser\xe1 obrigat\xf3rio selecionar um ou mais produtos no formul\xe1rio de qualifica\xe7\xe3o do fornecedor."})]}),(0,a.jsx)(m.ZP,{container:!0,spacing:4,children:(0,a.jsx)(m.ZP,{item:!0,xs:12,md:12,children:(0,a.jsx)(q.Z,{title:"Habilita quem preenche o formul\xe1rio de qualifica\xe7\xe3o do fornecedor (F\xe1brica ou Fornecedor)",name:"fields.habilitaQuemPreencheFormFornecedor",value:ee.fields.habilitaQuemPreencheFormFornecedor,register:eq,helpText:"Com esta op\xe7\xe3o marcada, ser\xe1 definido quem preenche o formul\xe1rio de qualifica\xe7\xe3o do fornecedor na cria\xe7\xe3o de um novo formul\xe1rio, caso contr\xe1rio somente o fornecedor poder\xe1 preencher."})})})]})})})]}),"edit"===ep&&ee&&(0,a.jsxs)(g.Z,{variant:"caption",sx:{display:"flex",justifyContent:"end",p:4},children:["Data de cadastro:",(0,C.p6)(ee.fields.dataCadastro,"DD/MM/YYYY")]})]})]})};var z=M}}]);