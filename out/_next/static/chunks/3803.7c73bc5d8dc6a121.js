"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3803],{23803:function(e,o,n){n.d(o,{Z:function(){return E}});var a=n(85893),i=n(67294),t=n(87536),l=n(49837),s=n(91359),r=n(79072),d=n(85214),c=n(29630),m=n(61953),u=n(54225),x=n(83830),v=n(11163),h=n.n(v),p=n(60664),j=n(86887),Z=n(40039),b=n(86501),f=n(64165),g=n(47842),C=n(21609),k=n(84220),I=n(29308),S=n(67569),D=n(3893),P=n(17575),y=n(80562),w=n(88475),N=n(1948),M=n(1322);let q=e=>{var o;let{blocks:n,errors:i,control:t,register:d,getValues:x,removeItem:v,addItem:h,removeBlock:p,setValue:j,watch:Z,allOptions:b,openModalConfirmScore:f,setOpenModalConfirmScore:g,itemScore:D,setItemScore:M,createNew:q,viewItem:O}=e;return(0,a.jsx)(a.Fragment,{children:x("blocks")&&n&&x("blocks").map((e,b)=>{var A,B,E,F,V,z,T,W,R;return(0,a.jsx)(l.Z,{md:12,sx:{mt:4},children:(0,a.jsxs)(s.Z,{children:[(0,a.jsxs)(r.ZP,{container:!0,spacing:4,children:[(0,a.jsx)(I.Z,{className:"order-1",xs:10,md:1,title:"Sequ\xeancia",name:"blocks.[".concat(b,"].dados.ordem"),value:e.dados.ordem,required:!0,control:t,errors:null==i?void 0:null===(A=i.blocks)||void 0===A?void 0:null===(B=A[b])||void 0===B?void 0:null===(E=B.dados)||void 0===E?void 0:E.ordem}),(0,a.jsx)(I.Z,{className:"order-3 md:order-2",xs:10,md:9,title:"Nome do Bloco",name:"blocks.[".concat(b,"].dados.nome"),value:e.dados.nome,required:!0,control:t,errors:null==i?void 0:null===(F=i.blocks)||void 0===F?void 0:null===(V=F[b])||void 0===V?void 0:null===(z=V.dados)||void 0===z?void 0:z.nome}),(0,a.jsx)(S.Z,{className:"order-2 md:order-3",xs:2,md:1,title:"Ativo",name:"blocks.[".concat(b,"].dados.status"),value:null===(T=n[b])||void 0===T?void 0:null===(W=T.dados)||void 0===W?void 0:W.status,register:d}),(0,a.jsx)(S.Z,{className:"order-4 ",xs:2,md:1,title:"Observa\xe7\xe3o",name:"blocks.[".concat(b,"].dados.obs"),value:null===(R=n[b])||void 0===R?void 0:R.dados.obs,register:d})]}),(0,a.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600,mt:4},children:"Itens"}),e.itens&&e.itens.map((e,l)=>{var s,u,h,p,f,g,D,N,M,A,B,E,F,V,z,T,W,R,_,U;return(0,a.jsxs)(r.ZP,{id:"item-".concat(b,"-").concat(l),container:!0,spacing:2,sx:{my:1},children:[(0,a.jsx)(I.Z,{xs:12,md:1,title:"Sequ\xeancia",name:"blocks.[".concat(b,"].itens.[").concat(l,"].ordem"),value:e.ordem,required:!0,control:t,errors:null==i?void 0:null===(s=i.blocks)||void 0===s?void 0:null===(u=s[b])||void 0===u?void 0:null===(h=u.itens)||void 0===h?void 0:null===(p=h[l])||void 0===p?void 0:p.ordem}),(0,a.jsx)(k.Z,{xs:12,md:7,createNew:()=>q(b,l),title:(null===(g=null===(f=n[b])||void 0===f?void 0:f.itens[l])||void 0===g?void 0:g.itemID)?"Item [".concat(null===(N=null===(D=n[b])||void 0===D?void 0:D.itens[l])||void 0===N?void 0:N.itemID,"]"):"Item",name:"blocks.[".concat(b,"].itens.[").concat(l,"].item"),value:null!==(o=null===(A=null===(M=n[b])||void 0===M?void 0:M.itens[l])||void 0===A?void 0:A.item)&&void 0!==o?o:null,required:!0,disabled:1==e.hasPending,options:null===(B=n[b])||void 0===B?void 0:null===(E=B.optionsBlock)||void 0===E?void 0:E.itens,register:d,setValue:j,control:t,errors:null==i?void 0:null===(F=i.blocks)||void 0===F?void 0:null===(V=F[b])||void 0===V?void 0:null===(z=V.itens)||void 0===z?void 0:null===(T=z[l])||void 0===T?void 0:T.item}),(0,a.jsx)(r.ZP,{item:!0,xs:12,md:1,children:(0,a.jsxs)(m.Z,{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[0==l&&(0,a.jsx)(c.Z,{variant:"caption",children:"Detalhes"}),(0,a.jsx)(P.Z,{title:Z("blocks.[".concat(b,"].itens.[").concat(l,"].item"))?"Ver mais detalhes do item selecionado":"Selecione o item",children:(0,a.jsx)(y.Z,{color:"primary",size:"small",onClick(){Z("blocks.[".concat(b,"].itens.[").concat(l,"].item"))&&O(x("blocks.[".concat(b,"].itens.[").concat(l,"].item")))},sx:{opacity:Z("blocks.[".concat(b,"].itens.[").concat(l,"].item"))?1:.5,disabled:!Z("blocks.[".concat(b,"].itens.[").concat(l,"].item"))},children:(0,a.jsx)(C.Z,{icon:"octicon:info-16",width:"18"})})})]})}),(0,a.jsx)(S.Z,{xs:2,md:1,title:"Ativo",index:l,name:"blocks.[".concat(b,"].itens.[").concat(l,"].status"),value:null===(R=null===(W=n[b])||void 0===W?void 0:W.itens[l])||void 0===R?void 0:R.status,register:d}),(0,a.jsx)(S.Z,{xs:2,md:1,title:"Obrigat\xf3rio",index:l,name:"blocks.[".concat(b,"].itens.[").concat(l,"].obrigatorio"),value:null===(U=null===(_=n[b])||void 0===_?void 0:_.itens[l])||void 0===U?void 0:U.obrigatorio,register:d}),(0,a.jsx)(w.Z,{xs:2,md:1,title:0==l?"Remover":"",index:b,removeItem:()=>v(e,b,l),item:e,pending:e.hasPending,textSuccess:"Remover este item",textError:"Este item n\xe3o pode mais ser removido pois j\xe1 foi respondido em um formul\xe1rio"})]},l)}),f&&D&&(0,a.jsx)(N.Z,{openModal:f,setOpenModalConfirmScore:g,itemScore:D,setItemScore:M}),(0,a.jsx)(r.ZP,{container:!0,spacing:4,sx:{mt:4},children:(0,a.jsxs)(r.ZP,{item:!0,xs:12,md:12,children:[(0,a.jsx)(u.Z,{variant:"outlined",color:"primary",startIcon:(0,a.jsx)(C.Z,{icon:"material-symbols:add-circle-outline-rounded"}),onClick(){h(b)},children:"Inserir Item"}),(0,a.jsx)(u.Z,{variant:"outlined",color:"error",startIcon:(0,a.jsx)(C.Z,{icon:"tabler:trash-filled"}),onClick(){p(e,b)},sx:{ml:2},children:"Remover Bloco"})]})})]})},b)})})};var O=n(82350);n(53934);var A=n(92629);let B=e=>{var o,n,v;let{id:P}=e,{setId:y}=(0,i.useContext)(x.X),{loggedUnity:w,user:N}=(0,i.useContext)(Z.V),[B,E]=(0,i.useState)(),[F,V]=(0,i.useState)(),[z,T]=(0,i.useState)(null),[W,R]=(0,i.useState)(null),[_,U]=(0,i.useState)(),[H,X]=(0,i.useState)(),[L,G]=(0,i.useState)(!1),[J,K]=(0,i.useState)(),[Q,Y]=(0,i.useState)(!1),[$,ee]=(0,i.useState)([]),[eo,en]=(0,i.useState)([]),[ea,ei]=(0,i.useState)(!1),[et,el]=(0,i.useState)(!1),[es,er]=(0,i.useState)(!1),[ed,ec]=(0,i.useState)(null),[em,eu]=(0,i.useState)(!1),[ex,ev]=(0,i.useState)(null),[eh,ep]=(0,i.useState)(null),[ej,eZ]=(0,i.useState)(!1),eb=(e,o)=>{el(!0),ev(e),ep(o)},ef=e=>{e&&e.id>0&&(ec(e.id),er(!0))},eg=e=>{el(!1),eI("blocks.[".concat(ex,"].itens.[").concat(eh,"].item"),e)},eC=h(),ek=P&&P>0?"edit":"new";eC.pathname;let{setValue:eI,trigger:eS,register:eD,handleSubmit:eP,reset:ey,getValues:ew,control:eN,watch:eM,formState:{errors:eq}}=(0,t.cI)({mode:"onChange"}),eO=async e=>{var o,n,a;let i={id:null!=P?P:null,unidadeID:w.unidadeID,usuarioID:N.usuarioID,model:e.model,header:null!==(o=e.header)&&void 0!==o?o:null,blocks:null!==(n=e.blocks)&&void 0!==n?n:[],arrRemovedBlocks:null!=eo?eo:[],arrRemovedItems:null!=$?$:[],orientacoes:null!==(a=e.orientations)&&void 0!==a?a:null};console.log("\uD83D\uDE80 ~ onSubmit: ",i),V(null);try{"new"===ek?await p.h.put("/configuracoes/formularios/recebimentomp-naoconformidade/insertData",i).then(e=>{b.ZP.success(f.OD.successUpdate),eC.push("/configuracoes/formularios/recebimentomp-naoconformidade/"),setTimeout(()=>{y(e.data.id)},1e3)}):await p.h.put("/configuracoes/formularios/recebimentomp-naoconformidade/updateData",i).then(e=>{b.ZP.success(f.OD.successUpdate),Y(!Q),et&&setOutsideLink(!0)})}catch(t){console.log(t)}},eA=(e,o,n,a)=>{let i=a.itens;i=i.filter(o=>{let n=e.itens.some(e=>e.item&&o.id===e.item.id);return!n});let t=[...n];t[o].optionsBlock.itens=i,U(t)},eB=e=>{var o;let n=[..._];n[e].itens.push({ordem:(null===(o=n[e].itens)||void 0===o?void 0:o.length)+1,obs:1,status:1,obrigatorio:1}),U(n),eI("blocks.[".concat(e,"].itens.[").concat(n[e].itens.length-1,"].new"),!0),eA(n[e],e,_,z)},eE=(e,o,n)=>{if(1===_[o].itens.length){b.ZP.error("Voc\xea deve ter ao menos um item!");return}let a=[...$];a.push(e),ee(a);let i=[...ew("blocks")];i[o].itens.splice(n,1),eI("blocks",i),U(i),eA(_[o],o,_,z),ei(!ea)};console.log("allOptions:",z);let eF=(e,o)=>{let n=!0;if(e&&e.itens.map(e=>{1==e.hasPending&&(n=!1)}),!n){b.ZP.error("Este bloco n\xe3o pode ser removido pois possui itens respondidos em um formul\xe1rio");return}let a=[...eo];a.push(e.dados.parRecebimentoMpNaoConformidadeModeloBlocoID),en(a);let i=[..._];i.splice(o,1),U(i),eI("blocks",i),b.ZP.success("Bloco pr\xe9-removido. Salve para concluir!")},eV=()=>{let e=[...ew("blocks")];e.push({dados:{ordem:e.length+1,nome:"",status:1},categorias:[],atividades:[],optionsBlock:{itens:[...z.itens]},itens:[{parFormularioID:3,new:!0,ordem:"1",nome:"",status:1,item:null}]}),eI("blocks",e),U(e)},ez=async e=>{let o=await p.h.post("/cadastros/profissional/getProfissionaisAssinatura",{formularioID:3,modeloID:P}),n={...e};n.profissionaisPreenchem=o.data.preenche,n.profissionaisAprovam=o.data.aprova,console.log("\uD83D\uDE80 ~ updatedModel:",n),ey({...ew(),model:n})},eT=()=>{console.log("buscar dados no backend....");try{"new"===ek?E({nome:"",ciclo:"",cabecalho:"",status:1}):p.h.post("/configuracoes/formularios/recebimentomp-naoconformidade/getData/".concat(P),{unidadeID:w.unidadeID}).then(e=>{var o,n;console.log("\uD83D\uDE80 ~ getData: ",e.data),E(e.data.model),V(e.data.header),U(e.data.blocks),T({itens:null===(o=e.data.options)||void 0===o?void 0:o.itens}),R(null===(n=e.data.options)||void 0===n?void 0:n.profissionais),X(e.data.orientations),ey(e.data),ez(e.data.model),setTimeout(()=>{e.data.blocks&&e.data.blocks.map((o,n)=>{eA(o,n,e.data.blocks,e.data.options)})},3e3)})}catch(e){console.log(e)}};(0,i.useEffect)(()=>{eT(),setTimeout(()=>{eS()},300)},[P,Q]);let eW=async e=>{eu(!0),eT(),el(!1)};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(g.Z,{show:!B}),(0,a.jsxs)("form",{onSubmit:eP(eO),children:[(0,a.jsx)(j.Z,{partialRoute:!0,btnCancel:!0,btnSave:!0,handleSubmit:()=>eP(eO),type:ek,btnDelete:!0,onclickDelete:()=>eZ(!0)}),(0,a.jsx)(A.Z,{title:"Excluir Formul\xe1rio",description:"Tem certeza que deseja exluir o formulario?",params:{route:"/configuracoes/formularios/recebimentomp-naoconformidade/delete/".concat(P),messageSucceded:"Formul\xe1rio exclu\xeddo com sucesso!",MessageError:"Dado possui pend\xeancia!"},open:ej,handleClose:()=>eZ(!1)}),B&&(0,a.jsx)(l.Z,{children:(0,a.jsx)(s.Z,{children:(0,a.jsxs)(r.ZP,{container:!0,spacing:4,children:[(0,a.jsx)(I.Z,{className:"order-1",xs:12,md:11,title:"Modelo",name:"model.nome",value:B.nome,required:!0,control:eN,errors:null==eq?void 0:null===(o=eq.model)||void 0===o?void 0:o.nome}),(0,a.jsx)(S.Z,{className:"order-2 md:order-3",xs:2,md:1,title:"Ativo",name:"model.status",value:B.status,register:eD}),(0,a.jsx)(I.Z,{xs:12,md:12,className:"order-4",title:"Cabe\xe7alho",name:"model.cabecalho",required:!1,value:B.cabecalho,multiline:!0,rows:4,control:eN,helpText:"Texto que ser\xe1 exibido no cabe\xe7alho do formul\xe1rio. Adicione aqui instru\xe7\xf5es e orienta\xe7\xf5es para auxiliar o preenchimento do formul\xe1rio."}),W&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(k.Z,{xs:12,md:6,className:"order-5",multiple:!0,title:"Profissionais que preenchem",name:"model.profissionaisPreenchem",options:null!=W?W:[],value:null!==(n=B.profissionaisPreenchem)&&void 0!==n?n:[],register:eD,setValue:eI,control:eN}),(0,a.jsx)(k.Z,{xs:12,md:6,className:"order-5",multiple:!0,title:"Profissionais que aprovam",name:"model.profissionaisAprovam",options:null!=W?W:[],value:null!==(v=B.profissionaisAprovam)&&void 0!==v?v:[],register:eD,setValue:eI,control:eN})]})]})})}),F&&(0,a.jsx)(l.Z,{sx:{mt:4},children:(0,a.jsx)(s.Z,{children:(0,a.jsx)(d.Z,{component:"nav","aria-label":"main mailbox",children:(0,a.jsxs)(r.ZP,{container:!0,spacing:2,children:[(0,a.jsx)(r.ZP,{item:!0,md:6,children:(0,a.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Nome do Campo"})}),(0,a.jsx)(r.ZP,{item:!0,md:2,children:(0,a.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Mostra"})}),(0,a.jsx)(r.ZP,{item:!0,md:2,children:(0,a.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Obrigat\xf3rio"})}),(0,a.jsx)(r.ZP,{item:!0,md:2,children:(0,a.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Ordem"})}),ew("header").map((e,o)=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.ZP,{item:!0,md:6,children:(0,a.jsx)(m.Z,{display:"flex",alignItems:"center",sx:{gap:2},children:(0,a.jsx)("p",{children:e.nomeCampo})})}),(0,a.jsx)(D.Z,{xs:"12",md:"2",title:"",name:"header.[".concat(o,"].mostra"),value:"cnpj"==e.nomeColuna||"razaoSocial"==e.nomeColuna||"nome"==e.nomeColuna||"dataAvaliacao"==e.nomeColuna||"responsavel"==e.nomeColuna||e.mostra,register:eD,helpText:"cnpj"==e.nomeColuna||"razaoSocial"==e.nomeColuna||"nome"==e.nomeColuna||"dataAvaliacao"==e.nomeColuna||"responsavel"==e.nomeColuna?"Campo obrigat\xf3rio":null}),(0,a.jsx)(D.Z,{xs:"12",md:"2",title:"",name:"header.[".concat(o,"].obrigatorio"),value:"cnpj"==e.nomeColuna||"razaoSocial"==e.nomeColuna||"nome"==e.nomeColuna||"dataAvaliacao"==e.nomeColuna||"responsavel"==e.nomeColuna||e.obrigatorio,register:eD,helpText:"cnpj"==e.nomeColuna||"razaoSocial"==e.nomeColuna||"nome"==e.nomeColuna||"dataAvaliacao"==e.nomeColuna||"responsavel"==e.nomeColuna?"Campo obrigat\xf3rio":null}),(0,a.jsx)(I.Z,{xs:"12",md:"2",title:"",name:"header.[".concat(o,"].ordem"),value:e.ordem,register:eD,control:eN,type:"number"})]}))]})})})}),!_&&(0,a.jsx)(g.Z,{}),_&&(0,a.jsx)(q,{blocks:_,errors:eq,control:eN,register:eD,watch:eM,removeItem:eE,addItem:eB,getValues:ew,removeBlock:eF,setValue:eI,allOptions:z,openModalConfirmScore:L,setOpenModalConfirmScore:G,itemScore:J,setItemScore:!0,createNew:eb,viewItem:ef},ea),"edit"===ek&&B&&(0,a.jsx)(r.ZP,{item:!0,xs:12,md:12,sx:{mt:4},children:(0,a.jsx)(u.Z,{variant:"outlined",color:"primary",startIcon:(0,a.jsx)(C.Z,{icon:"material-symbols:add-circle-outline-rounded"}),onClick(){eV()},children:"Inserir Bloco"})}),H&&(0,a.jsx)(l.Z,{md:12,sx:{mt:4},children:(0,a.jsx)(s.Z,{children:(0,a.jsx)(r.ZP,{container:!0,spacing:4,children:(0,a.jsx)(I.Z,{xs:12,md:12,title:"Orienta\xe7\xf5es",name:"orientations.obs",required:!1,value:null==H?void 0:H.obs,multiline:!0,rows:4,control:eN})})})})]}),(0,a.jsx)(M.Z,{title:"Novo item",size:"md",openModal:et,setOpenModal:el,handleSave:eW,children:(0,a.jsx)(O.Z,{btnClose:!0,handleModalClose:()=>el(!1),setNewChange:eu,newChange:em,outsideID:P,handleConfirmNew:eg,manualUrl:"/cadastros/item"})}),(0,a.jsx)(M.Z,{title:"Detalhes do Item",size:"md",openModal:es,setOpenModal:er,children:(0,a.jsx)(O.Z,{id:ed,btnClose:!0,handleModalClose:()=>er(!1)})})]})};var E=B},1948:function(e,o,n){var a=n(85893),i=n(54225),t=n(1890),l=n(77745),s=n(95398),r=n(76779),d=n(44642),c=n(60664),m=n(61953),u=n(22416),x=n(22841),v=n(16056),h=n(79072),p=n(55343),j=n(67836),Z=n(87536),b=n(86501);let f=e=>{let{openModal:o,setOpenModalConfirmScore:n,itemScore:f,setItemScore:g}=e,C=()=>{n(!1)},{handleSubmit:k,register:I}=(0,Z.cI)({}),S=e=>{let o={alternativaID:null==f?void 0:f.alternativaID,pontuacao:(null==e?void 0:e.pontuacao)?1:0,parFornecedorBlocoItemID:null==f?void 0:f.parFornecedorBlocoItemID,alternatives:null==f?void 0:f.alternatives.map((o,n)=>({alternativaItemID:null==o?void 0:o.alternativaItemID,score:e[null==o?void 0:o.nome]}))};c.h.post("/formularios/fornecedor/saveItemScore",{data:o}).then(e=>{n(!1),b.Am.success("Pontua\xe7\xe3o salva com sucesso!")})};return(0,a.jsx)(a.Fragment,{children:(null==f?void 0:f.alternatives)&&(0,a.jsx)(t.Z,{open:o,onClose:C,"aria-labelledby":"form-dialog-title",children:(0,a.jsxs)("form",{onSubmit:k(S),children:[(0,a.jsx)(l.Z,{id:"form-dialog-title",children:"Pontua\xe7\xe3o das respostas"}),(0,a.jsxs)(s.Z,{children:[(0,a.jsx)(d.Z,{sx:{mb:3},children:"Defina a pontua\xe7\xe3o para cada alternativa"}),(0,a.jsx)(m.Z,{sx:{mb:4},children:(0,a.jsx)(u.Z,{row:!0,children:(0,a.jsx)(x.Z,{label:"Habilitar pontua\xe7\xe3o",control:(0,a.jsx)(v.Z,{name:"pontuacao",...I("pontuacao"),checked:(null==f?void 0:f.pontuacao)==1,onChange(e){g({...f,pontuacao:e.target.checked?1:0})}})})})}),f&&(null==f?void 0:f.alternatives.map((e,o)=>(0,a.jsx)(h.ZP,{md:12,sx:{mb:4},children:(0,a.jsx)("grid",{item:!0,md:12,children:(0,a.jsx)(p.Z,{fullWidth:!0,children:(0,a.jsx)(j.Z,{disabled:1!=f.pontuacao,id:"outlined-basic",label:null==e?void 0:e.nome,...I("".concat(null==e?void 0:e.nome)),name:"".concat(null==e?void 0:e.nome),defaultValue:null==e?void 0:e.score,variant:"outlined",size:"small",type:"number",title:0!=f.pontuacao||"Habilite a pontua\xe7\xe3o para preencher"})})})},o)))]}),(0,a.jsxs)(r.Z,{className:"dialog-actions-dense",children:[(0,a.jsx)(i.Z,{variant:"outlined",color:"primary",onClick:C,children:"Cancelar"}),(0,a.jsx)(i.Z,{variant:"contained",color:"primary",onClick:k(S),children:"Confirmar"})]})]})})})};o.Z=f},92629:function(e,o,n){var a=n(85893),i=n(54225),t=n(1890),l=n(77745),s=n(95398),r=n(76779),d=n(29630),c=n(60664),m=n(67294),u=n(83830),x=n(86501),v=n(40039);let h=e=>{let{title:o,description:n,open:h,handleClose:p,params:j}=e,{setId:Z}=(0,m.useContext)(u.X),{user:b,loggedUnity:f}=(0,m.useContext)(v.V),g=async()=>{try{await c.h.delete("".concat(j.route,"/").concat(b.usuarioID,"/").concat(f.unidadeID)),x.ZP.success(j.messageSucceded),Z(null)}catch(e){console.log(e),x.ZP.error(j.MessageError)}finally{p()}};return(0,a.jsxs)(t.Z,{open:h,children:[(0,a.jsx)(l.Z,{id:"form-dialog-title",children:o}),(0,a.jsx)(s.Z,{children:(0,a.jsx)(d.Z,{variant:"body1",children:n})}),(0,a.jsxs)(r.Z,{className:"dialog-actions-dense",children:[(0,a.jsx)(i.Z,{variant:"outlined",color:"secondary",onClick:p,children:"Cancelar"}),(0,a.jsx)(i.Z,{variant:"contained",color:"error",onClick:g,children:"Confirmar"})]})]})};o.Z=h},1322:function(e,o,n){var a=n(85893),i=n(95398),t=n(44642),l=n(1890),s=n(77745);n(67294);let r=e=>{let{title:o,setOpenModal:n,openModal:r,children:d,size:c}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(l.Z,{open:r,onClose:()=>n(!1),fullWidth:!!c,maxWidth:c||null,children:[(0,a.jsx)(s.Z,{id:"form-dialog-title",children:o}),(0,a.jsx)(i.Z,{children:(0,a.jsx)(t.Z,{children:d})})]})})};o.Z=r}}]);