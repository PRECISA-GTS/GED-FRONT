"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9028],{39028:function(e,o,t){t.d(o,{Z:function(){return O}});var a=t(85893),s=t(67294),n=t(87536),i=t(49837),l=t(91359),r=t(79072),d=t(85214),c=t(29630),m=t(61953),u=t(54225),x=t(83830),h=t(11163),p=t.n(h),v=t(60664),j=t(65698),f=t(40039),Z=t(86501),b=t(71798),g=t(47842),k=t(21609),I=t(84220),D=t(29308),S=t(67569),C=t(3893),P=t(17575),y=t(80562),w=t(88475),N=t(1948);let V=e=>{var o,t;let{form:s,blocks:n,removeItem:d,addItem:x,removeBlock:h,openModalConfirmScore:p,setOpenModalConfirmScore:v,itemScore:j,setItemScore:f,createNew:Z,viewItem:b,departamentos:g}=e;return(0,a.jsx)(a.Fragment,{children:s.getValues("blocks")&&n&&s.getValues("blocks").map((e,C)=>{var V,q,M;return(0,a.jsx)(i.Z,{md:12,sx:{mt:4},children:(0,a.jsxs)(l.Z,{children:[(0,a.jsxs)(r.ZP,{container:!0,spacing:4,children:[(0,a.jsx)(D.Z,{className:"order-1",xs:10,md:1,title:"Sequ\xeancia",name:"blocks.[".concat(C,"].dados.ordem"),value:e.dados.ordem,required:!0,form:s}),(0,a.jsx)(D.Z,{className:"order-3 md:order-2",xs:10,md:5,title:"Nome do Bloco",name:"blocks.[".concat(C,"].dados.nome"),value:e.dados.nome,required:!0,form:s}),(0,a.jsx)(I.Z,{xs:12,md:4,className:"order-5 md:order-3",multiple:!0,title:"Departamentos que preenchem",name:"blocks.[".concat(C,"].dados.departamentos"),options:null!=g?g:[],value:null!==(o=e.dados.departamentos)&&void 0!==o?o:[],form:s,helpText:"Nenhum departamento selecionado significa que o sistema n\xe3o far\xe1 o controle de permiss\xe3o por departamentos"}),(0,a.jsx)(S.Z,{className:"order-2 md:order-3",xs:2,md:1,title:"Ativo",name:"blocks.[".concat(C,"].dados.status"),value:null===(V=n[C])||void 0===V?void 0:null===(q=V.dados)||void 0===q?void 0:q.status,form:s}),(0,a.jsx)(S.Z,{className:"order-4 ",xs:2,md:1,title:"Observa\xe7\xe3o",name:"blocks.[".concat(C,"].dados.obs"),value:null===(M=n[C])||void 0===M?void 0:M.dados.obs,form:s})]}),(0,a.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600,mt:4},children:"Itens"}),e.itens&&e.itens.map((o,i)=>{var l,u,x,h,p,v,j,f,g,N,V,q;return(0,a.jsxs)(r.ZP,{id:"item-".concat(C,"-").concat(i),container:!0,spacing:2,sx:{my:1},children:[(0,a.jsx)(D.Z,{xs:12,md:1,title:"Sequ\xeancia",name:"blocks.[".concat(C,"].itens.[").concat(i,"].ordem"),value:o.ordem,required:!0,form:s}),(0,a.jsx)(I.Z,{xs:12,md:7,createNew:()=>Z(C,i),title:(null===(u=null===(l=n[C])||void 0===l?void 0:l.itens[i])||void 0===u?void 0:u.itemID)?"Item [".concat(null===(h=null===(x=n[C])||void 0===x?void 0:x.itens[i])||void 0===h?void 0:h.itemID,"]"):"Item",name:"blocks.[".concat(C,"].itens.[").concat(i,"].item"),value:null!==(t=null===(v=null===(p=n[C])||void 0===p?void 0:p.itens[i])||void 0===v?void 0:v.item)&&void 0!==t?t:null,required:!0,disabled:1==o.hasPending,options:null===(j=n[C])||void 0===j?void 0:null===(f=j.optionsBlock)||void 0===f?void 0:f.itens,form:s}),(0,a.jsx)(r.ZP,{item:!0,xs:12,md:1,children:(0,a.jsxs)(m.Z,{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[0==i&&(0,a.jsx)(c.Z,{variant:"caption",children:"Detalhes"}),(0,a.jsx)(P.Z,{title:s.watch("blocks.[".concat(C,"].itens.[").concat(i,"].item"))?"Ver mais detalhes do item selecionado":"Selecione o item",children:(0,a.jsx)(y.Z,{color:"primary",size:"small",onClick(){s.watch("blocks.[".concat(C,"].itens.[").concat(i,"].item"))&&b(s.getValues("blocks.[".concat(C,"].itens.[").concat(i,"].item")))},sx:{opacity:s.watch("blocks.[".concat(C,"].itens.[").concat(i,"].item"))?1:.5,disabled:!s.watch("blocks.[".concat(C,"].itens.[").concat(i,"].item"))},children:(0,a.jsx)(k.Z,{icon:"octicon:info-16",width:"18"})})})]})}),(0,a.jsx)(S.Z,{xs:2,md:1,title:"Ativo",index:i,name:"blocks.[".concat(C,"].itens.[").concat(i,"].status"),value:null===(N=null===(g=n[C])||void 0===g?void 0:g.itens[i])||void 0===N?void 0:N.status,form:s}),(0,a.jsx)(S.Z,{xs:2,md:1,title:"Obrigat\xf3rio",index:i,name:"blocks.[".concat(C,"].itens.[").concat(i,"].obrigatorio"),value:null===(q=null===(V=n[C])||void 0===V?void 0:V.itens[i])||void 0===q?void 0:q.obrigatorio,form:s}),(0,a.jsx)(w.Z,{xs:2,md:1,title:0==i?"Remover":"",index:C,removeItem:()=>d(C,i,e.itens),item:o,pending:o.hasPending,textSuccess:"Remover este item",textError:"Este item n\xe3o pode mais ser removido pois j\xe1 foi respondido em um formul\xe1rio"})]},i)}),p&&j&&(0,a.jsx)(N.Z,{openModal:p,setOpenModalConfirmScore:v,itemScore:j,setItemScore:f}),(0,a.jsx)(r.ZP,{container:!0,spacing:4,sx:{mt:4},children:(0,a.jsxs)(r.ZP,{item:!0,xs:12,md:12,children:[(0,a.jsx)(u.Z,{variant:"outlined",color:"primary",startIcon:(0,a.jsx)(k.Z,{icon:"material-symbols:add-circle-outline-rounded"}),onClick(){x(C)},children:"Inserir Item"}),(0,a.jsx)(u.Z,{variant:"outlined",color:"error",startIcon:(0,a.jsx)(k.Z,{icon:"tabler:trash-filled"}),onClick(){h(e,C)},sx:{ml:2},children:"Remover Bloco"})]})})]})},C)})})};var q=t(1322),M=t(17340);t(53934);var z=t(92629);let B=e=>{var o,t;let{id:h}=e,{setId:P}=(0,s.useContext)(x.X),{loggedUnity:y,user:w}=(0,s.useContext)(f.V),[N,B]=(0,s.useState)(),[O,E]=(0,s.useState)(),[F,T]=(0,s.useState)(null),[W,A]=(0,s.useState)(null),[R,_]=(0,s.useState)(),[L,U]=(0,s.useState)(),[H,X]=(0,s.useState)(!1),[G,J]=(0,s.useState)(),[K,Q]=(0,s.useState)(!1),[Y,$]=(0,s.useState)([]),[ee,eo]=(0,s.useState)([]),[et,ea]=(0,s.useState)(!1),[es,en]=(0,s.useState)(!1),[ei,el]=(0,s.useState)(!1),[er,ed]=(0,s.useState)(null),[ec,em]=(0,s.useState)(!1),[eu,ex]=(0,s.useState)(null),[eh,ep]=(0,s.useState)(null),[ev,ej]=(0,s.useState)(!1),[ef,eZ]=(0,s.useState)([]),eb=(e,o)=>{en(!0),ex(e),ep(o)},eg=e=>{e&&e.id>0&&(ed(e.id),el(!0))},ek=e=>{en(!1),eS.setValue("blocks.[".concat(eu,"].itens.[").concat(eh,"].item"),e)},eI=p(),eD=h&&h>0?"edit":"new";eI.pathname;let eS=(0,n.cI)({mode:"onChange"}),eC=async e=>{var o,t,a;let s={id:null!=h?h:null,unidadeID:y.unidadeID,usuarioID:w.usuarioID,model:e.model,header:null!==(o=e.header)&&void 0!==o?o:null,blocks:null!==(t=e.blocks)&&void 0!==t?t:[],arrRemovedBlocks:null!=ee?ee:[],arrRemovedItems:null!=Y?Y:[],orientacoes:null!==(a=e.orientations)&&void 0!==a?a:null};console.log("\uD83D\uDE80 ~ onSubmit: ",s),E(null);try{"new"===eD?await v.h.put("/configuracoes/formularios/limpeza/insertData",s).then(e=>{Z.ZP.success(b.OD.successUpdate),eI.push("/configuracoes/formularios/limpeza/"),setTimeout(()=>{P(e.data.id)},1e3)}):await v.h.put("/configuracoes/formularios/limpeza/updateData",s).then(e=>{Z.ZP.success(b.OD.successUpdate),Q(!K),es&&setOutsideLink(!0)})}catch(n){console.log(n)}},eP=(e,o,t,a)=>{let s=a.itens;s=s.filter(o=>{let t=e.itens.some(e=>e.item&&o.id===e.item.id);return!t});let n=[...t];n[o].optionsBlock.itens=s,_(n)},ey=e=>{var o;let t=[...R];t[e].itens.push({ordem:(null===(o=t[e].itens)||void 0===o?void 0:o.length)+1,obs:1,status:1,obrigatorio:1}),_(t),eS.setValue("blocks.[".concat(e,"].itens.[").concat(t[e].itens.length-1,"].new"),!0),eP(t[e],e,R,F)},ew=(e,o,t)=>{if(1==R[e].itens.length){Z.ZP.error("Voc\xea deve ter ao menos um item!");return}let a=eS.getValues("blocks"),s=t.filter((e,t)=>t!==o);a[e].itens=s,_(a),eS.setValue("blocks.[".concat(e,"].itens"),s);let n=[...Y];n.push(t[o].parLimpezaModeloBlocoItemID),$(n),eP(a[e],e,a,F),ea(!et)},eN=(e,o)=>{if(1==R.length){Z.ZP.error("Voc\xea deve ter ao menos um bloco!");return}let t=!0;if(e&&e.itens.map(e=>{1==e.hasPending&&(t=!1)}),!t){Z.ZP.error("Este bloco n\xe3o pode ser removido pois possui itens respondidos em um formul\xe1rio");return}let a=[...ee];a.push(e.dados.parLimpezaModeloBlocoID),eo(a);let s=[...R];s.splice(o,1),_(s),eS.setValue("blocks",s),Z.ZP.success("Bloco pr\xe9-removido. Salve para concluir!")},eV=()=>{let e=[...eS.getValues("blocks")];e.push({dados:{ordem:e.length+1,nome:"",status:1},categorias:[],atividades:[],optionsBlock:{itens:[...F.itens]},itens:[{parFormularioID:2,new:!0,ordem:"1",nome:"",status:1,item:null}]}),eS.setValue("blocks",e),_(e)},eq=async()=>{if(y)try{let e=await v.h.post("/cadastros/departamento",{unidadeID:y.unidadeID});eZ(e.data)}catch(o){console.log(o)}},eM=async e=>{let o=await v.h.post("/cadastros/departamento/getDepartamentosAssinatura",{formularioID:4,modeloID:h}),t={...e};t.departamentosPreenchem=o.data.preenche,t.departamentosConcluem=o.data.conclui,eS.reset({...eS.getValues(),model:t})},ez=()=>{try{"new"===eD?B({nome:"",ciclo:"",cabecalho:"",status:1}):v.h.post("/configuracoes/formularios/limpeza/getData/".concat(h),{unidadeID:y.unidadeID}).then(e=>{var o,t;console.log("\uD83D\uDE80 ~ getData: ",e.data),B(e.data.model),E(e.data.header),_(e.data.blocks),T({itens:null===(o=e.data.options)||void 0===o?void 0:o.itens}),A(null===(t=e.data.options)||void 0===t?void 0:t.profissionais),U(e.data.orientations),eS.reset(e.data),eM(e.data.model),setTimeout(()=>{e.data.blocks&&e.data.blocks.map((o,t)=>{eP(o,t,e.data.blocks,e.data.options)})},3e3)})}catch(e){console.log(e)}};(0,s.useEffect)(()=>{ez(),eq(),setTimeout(()=>{eS.trigger()},300)},[h,w,K]);let eB=async e=>{em(!0),ez(),en(!1)};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(g.Z,{show:!N}),(0,a.jsxs)("form",{onSubmit:eS.handleSubmit(eC),children:[(0,a.jsx)(j.Z,{partialRoute:!0,btnCancel:!0,btnSave:!0,handleSubmit:()=>eS.handleSubmit(eC),type:eD,btnDelete:!0,onclickDelete:()=>ej(!0)}),(0,a.jsx)(z.Z,{title:"Excluir Formul\xe1rio",description:"Tem certeza que deseja exluir o formulario?",params:{route:"/configuracoes/formularios/limpeza/delete/".concat(h),messageSucceded:"Formul\xe1rio exclu\xeddo com sucesso!",MessageError:"Dado possui pend\xeancia!"},open:ev,handleClose:()=>ej(!1)}),(0,a.jsx)(i.Z,{children:(0,a.jsxs)(l.Z,{children:[N&&(0,a.jsxs)(r.ZP,{container:!0,spacing:4,children:[(0,a.jsx)(D.Z,{className:"order-1",xs:12,md:8,title:"Modelo",name:"model.nome",value:N.nome,required:!0,form:eS}),(0,a.jsx)(D.Z,{className:"order-1",xs:12,md:3,type:"number",title:"Ciclo (dias)",name:"model.ciclo",value:N.ciclo,required:!0,helpText:"Ciclo de vencimento deste formul\xe1rio. Caso n\xe3o tenha ciclo, use dias igual a 0 (zero)",form:eS}),(0,a.jsx)(S.Z,{className:"order-2 md:order-3",xs:2,md:1,title:"Ativo",name:"model.status",value:N.status,form:eS}),ef&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(I.Z,{xs:12,md:6,className:"order-5",multiple:!0,title:"Departamentos que preenchem cabe\xe7alho",name:"model.departamentosPreenchem",options:null!=ef?ef:[],value:null!==(o=null==N?void 0:N.departamentosPreenchem)&&void 0!==o?o:[],form:eS,helpText:"Profissionais deste departamento ter\xe3o permiss\xe3o para preencher o formul\xe1rio. Se nenhum profissional for selecionado, o sistema n\xe3o far\xe1 o controle de permiss\xe3o para este formul\xe1rio"}),(0,a.jsx)(I.Z,{xs:12,md:6,className:"order-5",multiple:!0,title:"Departamentos que concluem o formul\xe1rio",name:"model.departamentosConcluem",options:null!=ef?ef:[],value:null!==(t=null==N?void 0:N.departamentosConcluem)&&void 0!==t?t:[],form:eS,helpText:"Profissionais deste departamento ter\xe3o permiss\xe3o para concluir/aprovar o formul\xe1rio. Se nenhum profissional for selecionado, o sistema n\xe3o far\xe1 o controle de permiss\xe3o para este formul\xe1rio"})]}),(0,a.jsx)(D.Z,{xs:12,md:12,className:"order-6",title:"Cabe\xe7alho",name:"model.cabecalho",required:!1,value:N.cabecalho,multiline:!0,rows:3,form:eS,helpText:"Texto que ser\xe1 exibido no cabe\xe7alho do formul\xe1rio. Adicione aqui instru\xe7\xf5es e orienta\xe7\xf5es para auxiliar o preenchimento do formul\xe1rio."})]}),O&&(0,a.jsx)(d.Z,{component:"nav","aria-label":"main mailbox",children:(0,a.jsxs)(r.ZP,{container:!0,spacing:2,children:[(0,a.jsx)(r.ZP,{item:!0,md:6,children:(0,a.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Nome do Campo"})}),(0,a.jsx)(r.ZP,{item:!0,md:2,children:(0,a.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Mostra"})}),(0,a.jsx)(r.ZP,{item:!0,md:2,children:(0,a.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Obrigat\xf3rio"})}),(0,a.jsx)(r.ZP,{item:!0,md:2,children:(0,a.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Ordem"})}),eS.getValues("header").map((e,o)=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.ZP,{item:!0,md:6,children:(0,a.jsx)(m.Z,{display:"flex",alignItems:"center",sx:{gap:2},children:(0,a.jsx)("p",{children:e.nomeCampo})})}),(0,a.jsx)(C.Z,{xs:"12",md:"2",title:"",name:"header.[".concat(o,"].mostra"),value:e.mostra,form:eS}),(0,a.jsx)(C.Z,{xs:"12",md:"2",title:"",name:"header.[".concat(o,"].obrigatorio"),value:e.obrigatorio,form:eS}),(0,a.jsx)(D.Z,{xs:"12",md:"2",title:"",name:"header.[".concat(o,"].ordem"),value:e.ordem,type:"number",form:eS})]}))]})})]})}),!R&&(0,a.jsx)(g.Z,{}),R&&(0,a.jsx)(V,{form:eS,blocks:R,removeItem:ew,addItem:ey,removeBlock:eN,allOptions:F,openModalConfirmScore:H,setOpenModalConfirmScore:X,itemScore:G,setItemScore:!0,createNew:eb,viewItem:eg,departamentos:ef},et),"edit"===eD&&N&&(0,a.jsx)(r.ZP,{item:!0,xs:12,md:12,sx:{mt:4},children:(0,a.jsx)(u.Z,{variant:"outlined",color:"primary",startIcon:(0,a.jsx)(k.Z,{icon:"material-symbols:add-circle-outline-rounded"}),onClick(){eV()},children:"Inserir Bloco"})}),L&&(0,a.jsx)(i.Z,{md:12,sx:{mt:4},children:(0,a.jsx)(l.Z,{children:(0,a.jsx)(r.ZP,{container:!0,spacing:4,children:(0,a.jsx)(D.Z,{xs:12,md:12,title:"Orienta\xe7\xf5es",name:"orientations.obs",required:!1,value:null==L?void 0:L.obs,multiline:!0,rows:3,form:eS})})})})]}),(0,a.jsx)(q.Z,{title:"Novo item",size:"md",openModal:es,setOpenModal:en,handleSave:eB,children:(0,a.jsx)(M.Z,{btnClose:!0,handleModalClose:()=>en(!1),setNewChange:em,newChange:ec,outsideID:h,handleConfirmNew:ek,manualUrl:"/cadastros/item"})}),(0,a.jsx)(q.Z,{title:"Detalhes do Item",size:"md",openModal:ei,setOpenModal:el,children:(0,a.jsx)(M.Z,{id:er,btnClose:!0,handleModalClose:()=>el(!1),modal:!0})})]})};var O=B},1948:function(e,o,t){var a=t(85893),s=t(54225),n=t(1890),i=t(77745),l=t(95398),r=t(76779),d=t(44642),c=t(60664),m=t(61953),u=t(22416),x=t(22841),h=t(16056),p=t(79072),v=t(55343),j=t(67836),f=t(87536),Z=t(86501);let b=e=>{let{openModal:o,setOpenModalConfirmScore:t,itemScore:b,setItemScore:g}=e,k=()=>{t(!1)},I=(0,f.cI)({}),D=e=>{let o={alternativaID:null==b?void 0:b.alternativaID,pontuacao:(null==e?void 0:e.pontuacao)?1:0,parFornecedorBlocoItemID:null==b?void 0:b.parFornecedorBlocoItemID,alternatives:null==b?void 0:b.alternatives.map((o,t)=>({alternativaItemID:null==o?void 0:o.alternativaItemID,score:e[null==o?void 0:o.nome]}))};c.h.post("/formularios/fornecedor/saveItemScore",{data:o}).then(e=>{t(!1),Z.Am.success("Pontua\xe7\xe3o salva com sucesso!")})};return(0,a.jsx)(a.Fragment,{children:(null==b?void 0:b.alternatives)&&(0,a.jsx)(n.Z,{open:o,onClose:k,"aria-labelledby":"form-dialog-title",children:(0,a.jsxs)("form",{onSubmit:I.handleSubmit(D),children:[(0,a.jsx)(i.Z,{id:"form-dialog-title",children:"Pontua\xe7\xe3o das respostas"}),(0,a.jsxs)(l.Z,{children:[(0,a.jsx)(d.Z,{sx:{mb:3},children:"Defina a pontua\xe7\xe3o para cada alternativa"}),(0,a.jsx)(m.Z,{sx:{mb:4},children:(0,a.jsx)(u.Z,{row:!0,children:(0,a.jsx)(x.Z,{label:"Habilitar pontua\xe7\xe3o",control:(0,a.jsx)(h.Z,{name:"pontuacao",...register("pontuacao"),checked:(null==b?void 0:b.pontuacao)==1,onChange(e){g({...b,pontuacao:e.target.checked?1:0})}})})})}),b&&(null==b?void 0:b.alternatives.map((e,o)=>(0,a.jsx)(p.ZP,{md:12,sx:{mb:4},children:(0,a.jsx)("grid",{item:!0,md:12,children:(0,a.jsx)(v.Z,{fullWidth:!0,children:(0,a.jsx)(j.Z,{disabled:1!=b.pontuacao,id:"outlined-basic",label:null==e?void 0:e.nome,...register("".concat(null==e?void 0:e.nome)),name:"".concat(null==e?void 0:e.nome),defaultValue:null==e?void 0:e.score,variant:"outlined",size:"small",type:"number",title:0!=b.pontuacao||"Habilite a pontua\xe7\xe3o para preencher"})})})},o)))]}),(0,a.jsxs)(r.Z,{className:"dialog-actions-dense",children:[(0,a.jsx)(s.Z,{variant:"outlined",color:"primary",onClick:k,children:"Cancelar"}),(0,a.jsx)(s.Z,{variant:"contained",color:"primary",onClick:I.handleSubmit(D),children:"Confirmar"})]})]})})})};o.Z=b},92629:function(e,o,t){var a=t(85893),s=t(54225),n=t(1890),i=t(77745),l=t(95398),r=t(76779),d=t(29630),c=t(60664),m=t(67294),u=t(83830),x=t(86501),h=t(40039);let p=e=>{let{title:o,description:t,open:p,handleClose:v,params:j}=e,{setId:f}=(0,m.useContext)(u.X),{user:Z,loggedUnity:b}=(0,m.useContext)(h.V),g=async()=>{try{await c.h.delete("".concat(j.route,"/").concat(Z.usuarioID,"/").concat(b.unidadeID)),x.ZP.success(j.messageSucceded),f(null)}catch(e){console.log(e),x.ZP.error(j.MessageError)}finally{v()}};return(0,a.jsxs)(n.Z,{open:p,children:[(0,a.jsx)(i.Z,{id:"form-dialog-title",children:o}),(0,a.jsx)(l.Z,{children:(0,a.jsx)(d.Z,{variant:"body1",children:t})}),(0,a.jsxs)(r.Z,{className:"dialog-actions-dense",children:[(0,a.jsx)(s.Z,{variant:"outlined",color:"secondary",onClick:v,children:"Cancelar"}),(0,a.jsx)(s.Z,{variant:"contained",color:"error",onClick:g,children:"Confirmar"})]})]})};o.Z=p},1322:function(e,o,t){var a=t(85893),s=t(95398),n=t(44642),i=t(1890),l=t(77745);t(67294);let r=e=>{let{title:o,setOpenModal:t,openModal:r,children:d,size:c}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(i.Z,{open:r,onClose:()=>t(!1),fullWidth:!!c,maxWidth:c||null,children:[(0,a.jsx)(l.Z,{id:"form-dialog-title",children:o}),(0,a.jsx)(s.Z,{children:(0,a.jsx)(n.Z,{children:d})})]})})};o.Z=r}}]);