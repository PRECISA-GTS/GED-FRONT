"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5455],{65455:function(e,o,t){t.d(o,{Z:function(){return E}});var n=t(85893),a=t(67294),l=t(87536),s=t(49837),i=t(91359),r=t(79072),d=t(85214),c=t(29630),m=t(61953),u=t(54225),x=t(83830),v=t(11163),h=t.n(v),p=t(60664),j=t(86887),Z=t(40039),b=t(86501),f=t(64165),g=t(47842),C=t(21609),k=t(84220),I=t(29308),S=t(67569),D=t(3893),P=t(17575),y=t(80562),w=t(88475),N=t(1948);let M=e=>{var o,t;let{blocks:a,errors:l,control:d,register:x,getValues:v,removeItem:h,addItem:p,removeBlock:j,setValue:Z,watch:b,openModalConfirmScore:f,setOpenModalConfirmScore:g,itemScore:D,setItemScore:M,createNew:q,viewItem:B,setores:O}=e;return(0,n.jsx)(n.Fragment,{children:v("blocks")&&a&&v("blocks").map((e,V)=>{var E,F,T,A,z,R,W,_,U;return(0,n.jsx)(s.Z,{md:12,sx:{mt:4},children:(0,n.jsxs)(i.Z,{children:[(0,n.jsxs)(r.ZP,{container:!0,spacing:4,children:[(0,n.jsx)(I.Z,{className:"order-1",xs:10,md:1,title:"Sequ\xeancia",name:"blocks.[".concat(V,"].dados.ordem"),value:e.dados.ordem,required:!0,control:d,errors:null==l?void 0:null===(E=l.blocks)||void 0===E?void 0:null===(F=E[V])||void 0===F?void 0:null===(T=F.dados)||void 0===T?void 0:T.ordem}),(0,n.jsx)(I.Z,{className:"order-3 md:order-2",xs:10,md:5,title:"Nome do Bloco",name:"blocks.[".concat(V,"].dados.nome"),value:e.dados.nome,required:!0,control:d,errors:null==l?void 0:null===(A=l.blocks)||void 0===A?void 0:null===(z=A[V])||void 0===z?void 0:null===(R=z.dados)||void 0===R?void 0:R.nome}),(0,n.jsx)(k.Z,{xs:12,md:4,className:"order-5 md:order-3",multiple:!0,title:"Setores que preenchem",name:"blocks.[".concat(V,"].dados.setores"),options:null!=O?O:[],value:null!==(o=e.dados.setores)&&void 0!==o?o:[],register:x,setValue:Z,control:d,helpText:"Nenhum setor selecionado significa que o sistema n\xe3o far\xe1 o controle de permiss\xe3o por setores"}),(0,n.jsx)(S.Z,{className:"order-2 md:order-4",xs:2,md:1,title:"Ativo",name:"blocks.[".concat(V,"].dados.status"),value:null===(W=a[V])||void 0===W?void 0:null===(_=W.dados)||void 0===_?void 0:_.status,register:x}),(0,n.jsx)(S.Z,{className:"order-4 ",xs:2,md:1,title:"Observa\xe7\xe3o",name:"blocks.[".concat(V,"].dados.obs"),value:null===(U=a[V])||void 0===U?void 0:U.dados.obs,register:x})]}),(0,n.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600,mt:4},children:"Itens"}),e.itens&&e.itens.map((o,s)=>{var i,u,p,j,f,g,D,N,M,O,E,F,T,A,z,R,W,_,U,H;return(0,n.jsxs)(r.ZP,{id:"item-".concat(V,"-").concat(s),container:!0,spacing:2,sx:{my:1},children:[(0,n.jsx)(I.Z,{xs:12,md:1,title:"Sequ\xeancia",name:"blocks.[".concat(V,"].itens.[").concat(s,"].ordem"),value:o.ordem,required:!0,control:d,errors:null==l?void 0:null===(i=l.blocks)||void 0===i?void 0:null===(u=i[V])||void 0===u?void 0:null===(p=u.itens)||void 0===p?void 0:null===(j=p[s])||void 0===j?void 0:j.ordem}),(0,n.jsx)(k.Z,{xs:12,md:7,createNew:()=>q(V,s),title:(null===(g=null===(f=a[V])||void 0===f?void 0:f.itens[s])||void 0===g?void 0:g.itemID)?"Item [".concat(null===(N=null===(D=a[V])||void 0===D?void 0:D.itens[s])||void 0===N?void 0:N.itemID,"]"):"Item",name:"blocks.[".concat(V,"].itens.[").concat(s,"].item"),value:null!==(t=null===(O=null===(M=a[V])||void 0===M?void 0:M.itens[s])||void 0===O?void 0:O.item)&&void 0!==t?t:null,required:!0,disabled:1==o.hasPending,options:null===(E=a[V])||void 0===E?void 0:null===(F=E.optionsBlock)||void 0===F?void 0:F.itens,register:x,setValue:Z,control:d,errors:null==l?void 0:null===(T=l.blocks)||void 0===T?void 0:null===(A=T[V])||void 0===A?void 0:null===(z=A.itens)||void 0===z?void 0:null===(R=z[s])||void 0===R?void 0:R.item}),(0,n.jsx)(r.ZP,{item:!0,xs:12,md:1,children:(0,n.jsxs)(m.Z,{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[0==s&&(0,n.jsx)(c.Z,{variant:"caption",children:"Detalhes"}),(0,n.jsx)(P.Z,{title:b("blocks.[".concat(V,"].itens.[").concat(s,"].item"))?"Ver mais detalhes do item selecionado":"Selecione o item",children:(0,n.jsx)(y.Z,{color:"primary",size:"small",onClick(){b("blocks.[".concat(V,"].itens.[").concat(s,"].item"))&&B(v("blocks.[".concat(V,"].itens.[").concat(s,"].item")))},sx:{opacity:b("blocks.[".concat(V,"].itens.[").concat(s,"].item"))?1:.5,disabled:!b("blocks.[".concat(V,"].itens.[").concat(s,"].item"))},children:(0,n.jsx)(C.Z,{icon:"octicon:info-16",width:"18"})})})]})}),(0,n.jsx)(S.Z,{xs:2,md:1,title:"Ativo",index:s,name:"blocks.[".concat(V,"].itens.[").concat(s,"].status"),value:null===(_=null===(W=a[V])||void 0===W?void 0:W.itens[s])||void 0===_?void 0:_.status,register:x}),(0,n.jsx)(S.Z,{xs:2,md:1,title:"Obrigat\xf3rio",index:s,name:"blocks.[".concat(V,"].itens.[").concat(s,"].obrigatorio"),value:null===(H=null===(U=a[V])||void 0===U?void 0:U.itens[s])||void 0===H?void 0:H.obrigatorio,register:x}),(0,n.jsx)(w.Z,{xs:2,md:1,title:0==s?"Remover":"",index:V,removeItem:()=>h(V,s,e.itens),item:o,pending:o.hasPending,textSuccess:"Remover este item",textError:"Este item n\xe3o pode mais ser removido pois j\xe1 foi respondido em um formul\xe1rio"})]},s)}),f&&D&&(0,n.jsx)(N.Z,{openModal:f,setOpenModalConfirmScore:g,itemScore:D,setItemScore:M}),(0,n.jsx)(r.ZP,{container:!0,spacing:4,sx:{mt:4},children:(0,n.jsxs)(r.ZP,{item:!0,xs:12,md:12,children:[(0,n.jsx)(u.Z,{variant:"outlined",color:"primary",startIcon:(0,n.jsx)(C.Z,{icon:"material-symbols:add-circle-outline-rounded"}),onClick(){p(V)},children:"Inserir Item"}),(0,n.jsx)(u.Z,{variant:"outlined",color:"error",startIcon:(0,n.jsx)(C.Z,{icon:"tabler:trash-filled"}),onClick(){j(e,V)},sx:{ml:2},children:"Remover Bloco"})]})})]})},V)})})};var q=t(1322),B=t(82350);t(53934);var O=t(92629);let V=e=>{var o,t,v;let{id:P}=e,{setId:y}=(0,a.useContext)(x.X),{loggedUnity:w,user:N}=(0,a.useContext)(Z.V),[V,E]=(0,a.useState)(),[F,T]=(0,a.useState)(),[A,z]=(0,a.useState)(null),[R,W]=(0,a.useState)(),[_,U]=(0,a.useState)(),[H,X]=(0,a.useState)(!1),[L,G]=(0,a.useState)(),[J,K]=(0,a.useState)(!1),[Q,Y]=(0,a.useState)([]),[$,ee]=(0,a.useState)([]),[eo,et]=(0,a.useState)(!1),[en,ea]=(0,a.useState)(!1),[el,es]=(0,a.useState)(!1),[ei,er]=(0,a.useState)(null),[ed,ec]=(0,a.useState)(!1),[em,eu]=(0,a.useState)(null),[ex,ev]=(0,a.useState)(null),[eh,ep]=(0,a.useState)(!1),[ej,eZ]=(0,a.useState)([]),eb=(e,o)=>{ea(!0),eu(e),ev(o)},ef=e=>{e&&e.id>0&&(er(e.id),es(!0))},eg=e=>{ea(!1),eI("blocks.[".concat(em,"].itens.[").concat(ex,"].item"),e)},eC=h(),ek=P&&P>0?"edit":"new";eC.pathname;let{setValue:eI,register:eS,handleSubmit:eD,reset:eP,trigger:ey,getValues:ew,control:eN,watch:eM,formState:{errors:eq}}=(0,l.cI)({mode:"onChange"}),eB=async e=>{var o,t,n;let a={id:null!=P?P:null,unidadeID:w.unidadeID,usuarioID:N.usuarioID,model:e.model,header:null!==(o=e.header)&&void 0!==o?o:null,blocks:null!==(t=e.blocks)&&void 0!==t?t:[],arrRemovedBlocks:null!=$?$:[],arrRemovedItems:null!=Q?Q:[],orientacoes:null!==(n=e.orientations)&&void 0!==n?n:null};console.log("\uD83D\uDE80 ~ onSubmit: ",a),T(null);try{"new"===ek?await p.h.put("/configuracoes/formularios/recebimento-mp/insertData",a).then(e=>{b.ZP.success(f.OD.successUpdate),eC.push("/configuracoes/formularios/recebimento-mp/"),setTimeout(()=>{y(e.data.id)},1e3)}):await p.h.put("/configuracoes/formularios/recebimento-mp/updateData",a).then(e=>{b.ZP.success(f.OD.successUpdate),K(!J),en&&setOutsideLink(!0)})}catch(l){console.log(l)}},eO=(e,o,t,n)=>{let a=n.itens;a=a.filter(o=>{let t=e.itens.some(e=>e.item&&o.id===e.item.id);return!t});let l=[...t];l[o].optionsBlock.itens=a,W(l)},eV=e=>{var o;let t=[...R];t[e].itens.push({ordem:(null===(o=t[e].itens)||void 0===o?void 0:o.length)+1,obs:1,status:1,obrigatorio:1}),W(t),eI("blocks.[".concat(e,"].itens.[").concat(t[e].itens.length-1,"].new"),!0),eO(t[e],e,R,A)},eE=(e,o,t)=>{if(1==R[e].itens.length){b.ZP.error("Voc\xea deve ter ao menos um item!");return}let n=ew("blocks"),a=t.filter((e,t)=>t!==o);n[e].itens=a,W(n),eI("blocks.[".concat(e,"].itens"),a);let l=[...Q];l.push(t[o].parRecebimentoMpModeloBlocoItemID),Y(l),eO(n[e],e,n,A),et(!eo)},eF=(e,o)=>{if(1==R.length){b.ZP.error("Voc\xea deve ter ao menos um bloco!");return}let t=!0;if(e&&e.itens.map(e=>{1==e.hasPending&&(t=!1)}),!t){b.ZP.error("Este bloco n\xe3o pode ser removido pois possui itens respondidos em um formul\xe1rio");return}let n=[...$];n.push(e.dados.parRecebimentoMpModeloBlocoID),ee(n);let a=[...R];a.splice(o,1),W(a),eI("blocks",a),b.ZP.success("Bloco pr\xe9-removido. Salve para concluir!")},eT=()=>{let e=[...ew("blocks")];e.push({dados:{ordem:e.length+1,nome:"",status:1},categorias:[],atividades:[],optionsBlock:{itens:[...A.itens]},itens:[{parFormularioID:2,new:!0,ordem:"1",nome:"",status:1,item:null}]}),eI("blocks",e),W(e)},eA=async()=>{if(w)try{let e=await p.h.post("/cadastros/setor",{unidadeID:w.unidadeID});eZ(e.data)}catch(o){console.log(o)}},ez=async e=>{let o=await p.h.post("/cadastros/setor/getSetoresAssinatura",{formularioID:2,modeloID:P}),t={...e};t.setoresPreenchem=o.data.preenche,t.setoresConcluem=o.data.conclui,eP({...ew(),model:t})},eR=()=>{try{"new"===ek?E({nome:"",ciclo:"",cabecalho:"",status:1}):p.h.post("/configuracoes/formularios/recebimento-mp/getData/".concat(P),{unidadeID:w.unidadeID}).then(e=>{var o;console.log("\uD83D\uDE80 ~ getData: ",e.data),E(e.data.model),T(e.data.header),W(e.data.blocks),z({itens:null===(o=e.data.options)||void 0===o?void 0:o.itens}),U(e.data.orientations),eP(e.data),ez(e.data.model),setTimeout(()=>{e.data.blocks&&e.data.blocks.map((o,t)=>{eO(o,t,e.data.blocks,e.data.options)})},3e3)})}catch(e){console.log(e)}};(0,a.useEffect)(()=>{eR(),eA(),setTimeout(()=>{ey()},300)},[P,N,J]);let eW=async e=>{ec(!0),eR(),ea(!1)};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g.Z,{show:!V}),(0,n.jsxs)("form",{onSubmit:eD(eB),children:[(0,n.jsx)(j.Z,{partialRoute:!0,btnCancel:!0,btnSave:!0,handleSubmit:()=>eD(eB),type:ek,btnDelete:!0,onclickDelete:()=>ep(!0)}),(0,n.jsx)(O.Z,{title:"Excluir Formul\xe1rio",description:"Tem certeza que deseja exluir o formulario?",params:{route:"/configuracoes/formularios/recebimento-mp/delete/".concat(P),messageSucceded:"Formul\xe1rio exclu\xeddo com sucesso!",MessageError:"Dado possui pend\xeancia!"},open:eh,handleClose:()=>ep(!1)}),(0,n.jsx)(s.Z,{children:(0,n.jsxs)(i.Z,{children:[V&&(0,n.jsxs)(r.ZP,{container:!0,spacing:4,children:[(0,n.jsx)(I.Z,{className:"order-1",xs:12,md:11,title:"Modelo",name:"model.nome",value:V.nome,required:!0,control:eN,errors:null==eq?void 0:null===(o=eq.model)||void 0===o?void 0:o.nome}),(0,n.jsx)(S.Z,{className:"order-2 md:order-3",xs:2,md:1,title:"Ativo",name:"model.status",value:V.status,register:eS}),ej&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(k.Z,{xs:12,md:6,className:"order-5",multiple:!0,title:"Setores que preenchem cabe\xe7alho",name:"model.setoresPreenchem",options:null!=ej?ej:[],value:null!==(t=null==V?void 0:V.setoresPreenchem)&&void 0!==t?t:[],register:eS,setValue:eI,control:eN,helpText:"Profissionais deste setor ter\xe3o permiss\xe3o para preencher o formul\xe1rio. Se nenhum profissional for selecionado, o sistema n\xe3o far\xe1 o controle de permiss\xe3o para este formul\xe1rio"}),(0,n.jsx)(k.Z,{xs:12,md:6,className:"order-5",multiple:!0,title:"Setores que concluem o formul\xe1rio",name:"model.setoresConcluem",options:null!=ej?ej:[],value:null!==(v=null==V?void 0:V.setoresConcluem)&&void 0!==v?v:[],register:eS,setValue:eI,control:eN,helpText:"Profissionais deste setor ter\xe3o permiss\xe3o para concluir/aprovar o formul\xe1rio. Se nenhum profissional for selecionado, o sistema n\xe3o far\xe1 o controle de permiss\xe3o para este formul\xe1rio"})]}),(0,n.jsx)(I.Z,{xs:12,md:12,className:"order-6",title:"Cabe\xe7alho",name:"model.cabecalho",required:!1,value:V.cabecalho,multiline:!0,rows:4,control:eN,helpText:"Texto que ser\xe1 exibido no cabe\xe7alho do formul\xe1rio. Adicione aqui instru\xe7\xf5es e orienta\xe7\xf5es para auxiliar o preenchimento do formul\xe1rio."})]}),F&&(0,n.jsx)(d.Z,{component:"nav","aria-label":"main mailbox",children:(0,n.jsxs)(r.ZP,{container:!0,spacing:2,children:[(0,n.jsx)(r.ZP,{item:!0,md:6,children:(0,n.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Nome do Campo"})}),(0,n.jsx)(r.ZP,{item:!0,md:2,children:(0,n.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Mostra"})}),(0,n.jsx)(r.ZP,{item:!0,md:2,children:(0,n.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Obrigat\xf3rio"})}),(0,n.jsx)(r.ZP,{item:!0,md:2,children:(0,n.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Ordem"})}),ew("header").map((e,o)=>(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.ZP,{item:!0,md:6,children:(0,n.jsx)(m.Z,{display:"flex",alignItems:"center",sx:{gap:2},children:(0,n.jsx)("p",{children:e.nomeCampo})})}),(0,n.jsx)(D.Z,{xs:"12",md:"2",title:"",name:"header.[".concat(o,"].mostra"),value:"cnpj"==e.nomeColuna||"razaoSocial"==e.nomeColuna||"nome"==e.nomeColuna||"dataAvaliacao"==e.nomeColuna||"responsavel"==e.nomeColuna||e.mostra,register:eS,helpText:"cnpj"==e.nomeColuna||"razaoSocial"==e.nomeColuna||"nome"==e.nomeColuna||"dataAvaliacao"==e.nomeColuna||"responsavel"==e.nomeColuna?"Campo obrigat\xf3rio":null}),(0,n.jsx)(D.Z,{xs:"12",md:"2",title:"",name:"header.[".concat(o,"].obrigatorio"),value:"cnpj"==e.nomeColuna||"razaoSocial"==e.nomeColuna||"nome"==e.nomeColuna||"dataAvaliacao"==e.nomeColuna||"responsavel"==e.nomeColuna||e.obrigatorio,register:eS,helpText:"cnpj"==e.nomeColuna||"razaoSocial"==e.nomeColuna||"nome"==e.nomeColuna||"dataAvaliacao"==e.nomeColuna||"responsavel"==e.nomeColuna?"Campo obrigat\xf3rio":null}),(0,n.jsx)(I.Z,{xs:"12",md:"2",title:"",name:"header.[".concat(o,"].ordem"),value:e.ordem,register:eS,control:eN,type:"number"})]}))]})})]})}),!R&&(0,n.jsx)(g.Z,{}),R&&(0,n.jsx)(M,{blocks:R,errors:eq,control:eN,register:eS,watch:eM,removeItem:eE,addItem:eV,getValues:ew,removeBlock:eF,setValue:eI,allOptions:A,openModalConfirmScore:H,setOpenModalConfirmScore:X,itemScore:L,setItemScore:!0,createNew:eb,viewItem:ef,setores:ej},eo),"edit"===ek&&V&&(0,n.jsx)(r.ZP,{item:!0,xs:12,md:12,sx:{mt:4},children:(0,n.jsx)(u.Z,{variant:"outlined",color:"primary",startIcon:(0,n.jsx)(C.Z,{icon:"material-symbols:add-circle-outline-rounded"}),onClick(){eT()},children:"Inserir Bloco"})}),_&&(0,n.jsx)(s.Z,{md:12,sx:{mt:4},children:(0,n.jsx)(i.Z,{children:(0,n.jsx)(r.ZP,{container:!0,spacing:4,children:(0,n.jsx)(I.Z,{xs:12,md:12,title:"Orienta\xe7\xf5es",name:"orientations.obs",required:!1,value:null==_?void 0:_.obs,multiline:!0,rows:4,control:eN})})})})]}),(0,n.jsx)(q.Z,{title:"Novo item",size:"md",openModal:en,setOpenModal:ea,handleSave:eW,children:(0,n.jsx)(B.Z,{btnClose:!0,handleModalClose:()=>ea(!1),setNewChange:ec,newChange:ed,outsideID:P,handleConfirmNew:eg,manualUrl:"/cadastros/item"})}),(0,n.jsx)(q.Z,{title:"Detalhes do Item",size:"md",openModal:el,setOpenModal:es,children:(0,n.jsx)(B.Z,{id:ei,btnClose:!0,handleModalClose:()=>es(!1)})})]})};var E=V},1948:function(e,o,t){var n=t(85893),a=t(54225),l=t(1890),s=t(77745),i=t(95398),r=t(76779),d=t(44642),c=t(60664),m=t(61953),u=t(22416),x=t(22841),v=t(16056),h=t(79072),p=t(55343),j=t(67836),Z=t(87536),b=t(86501);let f=e=>{let{openModal:o,setOpenModalConfirmScore:t,itemScore:f,setItemScore:g}=e,C=()=>{t(!1)},{handleSubmit:k,register:I}=(0,Z.cI)({}),S=e=>{let o={alternativaID:null==f?void 0:f.alternativaID,pontuacao:(null==e?void 0:e.pontuacao)?1:0,parFornecedorBlocoItemID:null==f?void 0:f.parFornecedorBlocoItemID,alternatives:null==f?void 0:f.alternatives.map((o,t)=>({alternativaItemID:null==o?void 0:o.alternativaItemID,score:e[null==o?void 0:o.nome]}))};c.h.post("/formularios/fornecedor/saveItemScore",{data:o}).then(e=>{t(!1),b.Am.success("Pontua\xe7\xe3o salva com sucesso!")})};return(0,n.jsx)(n.Fragment,{children:(null==f?void 0:f.alternatives)&&(0,n.jsx)(l.Z,{open:o,onClose:C,"aria-labelledby":"form-dialog-title",children:(0,n.jsxs)("form",{onSubmit:k(S),children:[(0,n.jsx)(s.Z,{id:"form-dialog-title",children:"Pontua\xe7\xe3o das respostas"}),(0,n.jsxs)(i.Z,{children:[(0,n.jsx)(d.Z,{sx:{mb:3},children:"Defina a pontua\xe7\xe3o para cada alternativa"}),(0,n.jsx)(m.Z,{sx:{mb:4},children:(0,n.jsx)(u.Z,{row:!0,children:(0,n.jsx)(x.Z,{label:"Habilitar pontua\xe7\xe3o",control:(0,n.jsx)(v.Z,{name:"pontuacao",...I("pontuacao"),checked:(null==f?void 0:f.pontuacao)==1,onChange(e){g({...f,pontuacao:e.target.checked?1:0})}})})})}),f&&(null==f?void 0:f.alternatives.map((e,o)=>(0,n.jsx)(h.ZP,{md:12,sx:{mb:4},children:(0,n.jsx)("grid",{item:!0,md:12,children:(0,n.jsx)(p.Z,{fullWidth:!0,children:(0,n.jsx)(j.Z,{disabled:1!=f.pontuacao,id:"outlined-basic",label:null==e?void 0:e.nome,...I("".concat(null==e?void 0:e.nome)),name:"".concat(null==e?void 0:e.nome),defaultValue:null==e?void 0:e.score,variant:"outlined",size:"small",type:"number",title:0!=f.pontuacao||"Habilite a pontua\xe7\xe3o para preencher"})})})},o)))]}),(0,n.jsxs)(r.Z,{className:"dialog-actions-dense",children:[(0,n.jsx)(a.Z,{variant:"outlined",color:"primary",onClick:C,children:"Cancelar"}),(0,n.jsx)(a.Z,{variant:"contained",color:"primary",onClick:k(S),children:"Confirmar"})]})]})})})};o.Z=f},92629:function(e,o,t){var n=t(85893),a=t(54225),l=t(1890),s=t(77745),i=t(95398),r=t(76779),d=t(29630),c=t(60664),m=t(67294),u=t(83830),x=t(86501),v=t(40039);let h=e=>{let{title:o,description:t,open:h,handleClose:p,params:j}=e,{setId:Z}=(0,m.useContext)(u.X),{user:b,loggedUnity:f}=(0,m.useContext)(v.V),g=async()=>{try{await c.h.delete("".concat(j.route,"/").concat(b.usuarioID,"/").concat(f.unidadeID)),x.ZP.success(j.messageSucceded),Z(null)}catch(e){console.log(e),x.ZP.error(j.MessageError)}finally{p()}};return(0,n.jsxs)(l.Z,{open:h,children:[(0,n.jsx)(s.Z,{id:"form-dialog-title",children:o}),(0,n.jsx)(i.Z,{children:(0,n.jsx)(d.Z,{variant:"body1",children:t})}),(0,n.jsxs)(r.Z,{className:"dialog-actions-dense",children:[(0,n.jsx)(a.Z,{variant:"outlined",color:"secondary",onClick:p,children:"Cancelar"}),(0,n.jsx)(a.Z,{variant:"contained",color:"error",onClick:g,children:"Confirmar"})]})]})};o.Z=h},1322:function(e,o,t){var n=t(85893),a=t(95398),l=t(44642),s=t(1890),i=t(77745);t(67294);let r=e=>{let{title:o,setOpenModal:t,openModal:r,children:d,size:c}=e;return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(s.Z,{open:r,onClose:()=>t(!1),fullWidth:!!c,maxWidth:c||null,children:[(0,n.jsx)(i.Z,{id:"form-dialog-title",children:o}),(0,n.jsx)(a.Z,{children:(0,n.jsx)(l.Z,{children:d})})]})})};o.Z=r}}]);