"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9028],{39028:function(e,o,t){t.d(o,{Z:function(){return V}});var s=t(85893),l=t(67294),i=t(87536),n=t(49837),a=t(91359),r=t(79072),d=t(85214),c=t(29630),u=t(61953),m=t(54225),x=t(83830),v=t(11163),h=t.n(v),p=t(60664),j=t(86887),Z=t(40039),b=t(86501),f=t(64165),g=t(47842),k=t(21609),I=t(84220),S=t(29308),C=t(67569),D=t(3893),P=t(17575),y=t(80562),w=t(88475),N=t(1948);let q=e=>{var o,t;let{blocks:l,errors:i,control:d,register:x,getValues:v,removeItem:h,addItem:p,removeBlock:j,setValue:Z,watch:b,allOptions:f,openModalConfirmScore:g,setOpenModalConfirmScore:D,itemScore:q,setItemScore:M,createNew:z,viewItem:B,setores:O}=e;return(0,s.jsx)(s.Fragment,{children:v("blocks")&&l&&v("blocks").map((e,f)=>{var V,E,F,T,W,A,R,_,L;return(0,s.jsx)(n.Z,{md:12,sx:{mt:4},children:(0,s.jsxs)(a.Z,{children:[(0,s.jsxs)(r.ZP,{container:!0,spacing:4,children:[(0,s.jsx)(S.Z,{className:"order-1",xs:10,md:1,title:"Sequ\xeancia",name:"blocks.[".concat(f,"].dados.ordem"),value:e.dados.ordem,required:!0,control:d,errors:null==i?void 0:null===(V=i.blocks)||void 0===V?void 0:null===(E=V[f])||void 0===E?void 0:null===(F=E.dados)||void 0===F?void 0:F.ordem}),(0,s.jsx)(S.Z,{className:"order-3 md:order-2",xs:10,md:5,title:"Nome do Bloco",name:"blocks.[".concat(f,"].dados.nome"),value:e.dados.nome,required:!0,control:d,errors:null==i?void 0:null===(T=i.blocks)||void 0===T?void 0:null===(W=T[f])||void 0===W?void 0:null===(A=W.dados)||void 0===A?void 0:A.nome}),(0,s.jsx)(I.Z,{xs:12,md:4,className:"order-5 md:order-3",multiple:!0,title:"Setores que preenchem",name:"blocks.[".concat(f,"].dados.setores"),options:null!=O?O:[],value:null!==(o=e.dados.setores)&&void 0!==o?o:[],register:x,setValue:Z,control:d,helpText:"Nenhum setor selecionado significa que o sistema n\xe3o far\xe1 o controle de permiss\xe3o por setores"}),(0,s.jsx)(C.Z,{className:"order-2 md:order-3",xs:2,md:1,title:"Ativo",name:"blocks.[".concat(f,"].dados.status"),value:null===(R=l[f])||void 0===R?void 0:null===(_=R.dados)||void 0===_?void 0:_.status,register:x}),(0,s.jsx)(C.Z,{className:"order-4 ",xs:2,md:1,title:"Observa\xe7\xe3o",name:"blocks.[".concat(f,"].dados.obs"),value:null===(L=l[f])||void 0===L?void 0:L.dados.obs,register:x})]}),(0,s.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600,mt:4},children:"Itens"}),e.itens&&e.itens.map((o,n)=>{var a,m,p,j,g,D,N,q,M,O,V,E,F,T,W,A,R,_,L,U;return(0,s.jsxs)(r.ZP,{id:"item-".concat(f,"-").concat(n),container:!0,spacing:2,sx:{my:1},children:[(0,s.jsx)(S.Z,{xs:12,md:1,title:"Sequ\xeancia",name:"blocks.[".concat(f,"].itens.[").concat(n,"].ordem"),value:o.ordem,required:!0,control:d,errors:null==i?void 0:null===(a=i.blocks)||void 0===a?void 0:null===(m=a[f])||void 0===m?void 0:null===(p=m.itens)||void 0===p?void 0:null===(j=p[n])||void 0===j?void 0:j.ordem}),(0,s.jsx)(I.Z,{xs:12,md:7,createNew:()=>z(f,n),title:(null===(D=null===(g=l[f])||void 0===g?void 0:g.itens[n])||void 0===D?void 0:D.itemID)?"Item [".concat(null===(q=null===(N=l[f])||void 0===N?void 0:N.itens[n])||void 0===q?void 0:q.itemID,"]"):"Item",name:"blocks.[".concat(f,"].itens.[").concat(n,"].item"),value:null!==(t=null===(O=null===(M=l[f])||void 0===M?void 0:M.itens[n])||void 0===O?void 0:O.item)&&void 0!==t?t:null,required:!0,disabled:1==o.hasPending,options:null===(V=l[f])||void 0===V?void 0:null===(E=V.optionsBlock)||void 0===E?void 0:E.itens,register:x,setValue:Z,control:d,errors:null==i?void 0:null===(F=i.blocks)||void 0===F?void 0:null===(T=F[f])||void 0===T?void 0:null===(W=T.itens)||void 0===W?void 0:null===(A=W[n])||void 0===A?void 0:A.item}),(0,s.jsx)(r.ZP,{item:!0,xs:12,md:1,children:(0,s.jsxs)(u.Z,{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",children:[0==n&&(0,s.jsx)(c.Z,{variant:"caption",children:"Detalhes"}),(0,s.jsx)(P.Z,{title:b("blocks.[".concat(f,"].itens.[").concat(n,"].item"))?"Ver mais detalhes do item selecionado":"Selecione o item",children:(0,s.jsx)(y.Z,{color:"primary",size:"small",onClick(){b("blocks.[".concat(f,"].itens.[").concat(n,"].item"))&&B(v("blocks.[".concat(f,"].itens.[").concat(n,"].item")))},sx:{opacity:b("blocks.[".concat(f,"].itens.[").concat(n,"].item"))?1:.5,disabled:!b("blocks.[".concat(f,"].itens.[").concat(n,"].item"))},children:(0,s.jsx)(k.Z,{icon:"octicon:info-16",width:"18"})})})]})}),(0,s.jsx)(C.Z,{xs:2,md:1,title:"Ativo",index:n,name:"blocks.[".concat(f,"].itens.[").concat(n,"].status"),value:null===(_=null===(R=l[f])||void 0===R?void 0:R.itens[n])||void 0===_?void 0:_.status,register:x}),(0,s.jsx)(C.Z,{xs:2,md:1,title:"Obrigat\xf3rio",index:n,name:"blocks.[".concat(f,"].itens.[").concat(n,"].obrigatorio"),value:null===(U=null===(L=l[f])||void 0===L?void 0:L.itens[n])||void 0===U?void 0:U.obrigatorio,register:x}),(0,s.jsx)(w.Z,{xs:2,md:1,title:0==n?"Remover":"",index:f,removeItem:()=>h(f,n,e.itens),item:o,pending:o.hasPending,textSuccess:"Remover este item",textError:"Este item n\xe3o pode mais ser removido pois j\xe1 foi respondido em um formul\xe1rio"})]},n)}),g&&q&&(0,s.jsx)(N.Z,{openModal:g,setOpenModalConfirmScore:D,itemScore:q,setItemScore:M}),(0,s.jsx)(r.ZP,{container:!0,spacing:4,sx:{mt:4},children:(0,s.jsxs)(r.ZP,{item:!0,xs:12,md:12,children:[(0,s.jsx)(m.Z,{variant:"outlined",color:"primary",startIcon:(0,s.jsx)(k.Z,{icon:"material-symbols:add-circle-outline-rounded"}),onClick(){p(f)},children:"Inserir Item"}),(0,s.jsx)(m.Z,{variant:"outlined",color:"error",startIcon:(0,s.jsx)(k.Z,{icon:"tabler:trash-filled"}),onClick(){j(e,f)},sx:{ml:2},children:"Remover Bloco"})]})})]})},f)})})};var M=t(1322),z=t(82350);t(53934);var B=t(92629);let O=e=>{var o,t,v,P;let{id:y}=e,{setId:w}=(0,l.useContext)(x.X),{loggedUnity:N,user:O}=(0,l.useContext)(Z.V),[V,E]=(0,l.useState)(),[F,T]=(0,l.useState)(),[W,A]=(0,l.useState)(null),[R,_]=(0,l.useState)(null),[L,U]=(0,l.useState)(),[H,X]=(0,l.useState)(),[G,J]=(0,l.useState)(!1),[K,Q]=(0,l.useState)(),[Y,$]=(0,l.useState)(!1),[ee,eo]=(0,l.useState)([]),[et,es]=(0,l.useState)([]),[el,ei]=(0,l.useState)(!1),[en,ea]=(0,l.useState)(!1),[er,ed]=(0,l.useState)(!1),[ec,eu]=(0,l.useState)(null),[em,ex]=(0,l.useState)(!1),[ev,eh]=(0,l.useState)(null),[ep,ej]=(0,l.useState)(null),[eZ,eb]=(0,l.useState)(!1),[ef,eg]=(0,l.useState)([]),ek=(e,o)=>{ea(!0),eh(e),ej(o)},eI=e=>{e&&e.id>0&&(eu(e.id),ed(!0))},eS=e=>{ea(!1),eP("blocks.[".concat(ev,"].itens.[").concat(ep,"].item"),e)},eC=h(),eD=y&&y>0?"edit":"new";eC.pathname;let{setValue:eP,register:ey,handleSubmit:ew,reset:eN,trigger:eq,getValues:eM,control:ez,watch:eB,formState:{errors:eO}}=(0,i.cI)({mode:"onChange"}),eV=async e=>{var o,t,s;let l={id:null!=y?y:null,unidadeID:N.unidadeID,usuarioID:O.usuarioID,model:e.model,header:null!==(o=e.header)&&void 0!==o?o:null,blocks:null!==(t=e.blocks)&&void 0!==t?t:[],arrRemovedBlocks:null!=et?et:[],arrRemovedItems:null!=ee?ee:[],orientacoes:null!==(s=e.orientations)&&void 0!==s?s:null};console.log("\uD83D\uDE80 ~ onSubmit: ",l),T(null);try{"new"===eD?await p.h.put("/configuracoes/formularios/limpeza/insertData",l).then(e=>{b.ZP.success(f.OD.successUpdate),eC.push("/configuracoes/formularios/limpeza/"),setTimeout(()=>{w(e.data.id)},1e3)}):await p.h.put("/configuracoes/formularios/limpeza/updateData",l).then(e=>{b.ZP.success(f.OD.successUpdate),$(!Y),en&&setOutsideLink(!0)})}catch(i){console.log(i)}},eE=(e,o,t,s)=>{let l=s.itens;l=l.filter(o=>{let t=e.itens.some(e=>e.item&&o.id===e.item.id);return!t});let i=[...t];i[o].optionsBlock.itens=l,U(i)},eF=e=>{var o;let t=[...L];t[e].itens.push({ordem:(null===(o=t[e].itens)||void 0===o?void 0:o.length)+1,obs:1,status:1,obrigatorio:1}),U(t),eP("blocks.[".concat(e,"].itens.[").concat(t[e].itens.length-1,"].new"),!0),eE(t[e],e,L,W)},eT=(e,o,t)=>{if(1==L[e].itens.length){b.ZP.error("Voc\xea deve ter ao menos um item!");return}let s=eM("blocks"),l=t.filter((e,t)=>t!==o);s[e].itens=l,U(s),eP("blocks.[".concat(e,"].itens"),l);let i=[...ee];i.push(t[o].parLimpezaModeloBlocoItemID),eo(i),eE(s[e],e,s,W),ei(!el)},eW=(e,o)=>{if(1==L.length){b.ZP.error("Voc\xea deve ter ao menos um bloco!");return}let t=!0;if(e&&e.itens.map(e=>{1==e.hasPending&&(t=!1)}),!t){b.ZP.error("Este bloco n\xe3o pode ser removido pois possui itens respondidos em um formul\xe1rio");return}let s=[...et];s.push(e.dados.parLimpezaModeloBlocoID),es(s);let l=[...L];l.splice(o,1),U(l),eP("blocks",l),b.ZP.success("Bloco pr\xe9-removido. Salve para concluir!")},eA=()=>{let e=[...eM("blocks")];e.push({dados:{ordem:e.length+1,nome:"",status:1},categorias:[],atividades:[],optionsBlock:{itens:[...W.itens]},itens:[{parFormularioID:2,new:!0,ordem:"1",nome:"",status:1,item:null}]}),eP("blocks",e),U(e)},eR=async()=>{if(N)try{let e=await p.h.post("/cadastros/setor",{unidadeID:N.unidadeID});eg(e.data)}catch(o){console.log(o)}},e_=async e=>{let o=await p.h.post("/cadastros/setor/getSetoresAssinatura",{formularioID:4,modeloID:y}),t={...e};t.setoresPreenchem=o.data.preenche,t.setoresConcluem=o.data.conclui,eN({...eM(),model:t})},eL=()=>{try{"new"===eD?E({nome:"",ciclo:"",cabecalho:"",status:1}):p.h.post("/configuracoes/formularios/limpeza/getData/".concat(y),{unidadeID:N.unidadeID}).then(e=>{var o,t;console.log("\uD83D\uDE80 ~ getData: ",e.data),E(e.data.model),T(e.data.header),U(e.data.blocks),A({itens:null===(o=e.data.options)||void 0===o?void 0:o.itens}),_(null===(t=e.data.options)||void 0===t?void 0:t.profissionais),X(e.data.orientations),eN(e.data),e_(e.data.model),setTimeout(()=>{e.data.blocks&&e.data.blocks.map((o,t)=>{eE(o,t,e.data.blocks,e.data.options)})},3e3)})}catch(e){console.log(e)}};(0,l.useEffect)(()=>{eL(),eR(),setTimeout(()=>{eq()},300)},[y,O,Y]);let eU=async e=>{ex(!0),eL(),ea(!1)};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(g.Z,{show:!V}),(0,s.jsxs)("form",{onSubmit:ew(eV),children:[(0,s.jsx)(j.Z,{partialRoute:!0,btnCancel:!0,btnSave:!0,handleSubmit:()=>ew(eV),type:eD,btnDelete:!0,onclickDelete:()=>eb(!0)}),(0,s.jsx)(B.Z,{title:"Excluir Formul\xe1rio",description:"Tem certeza que deseja exluir o formulario?",params:{route:"/configuracoes/formularios/limpeza/delete/".concat(y),messageSucceded:"Formul\xe1rio exclu\xeddo com sucesso!",MessageError:"Dado possui pend\xeancia!"},open:eZ,handleClose:()=>eb(!1)}),(0,s.jsx)(n.Z,{children:(0,s.jsxs)(a.Z,{children:[V&&(0,s.jsxs)(r.ZP,{container:!0,spacing:4,children:[(0,s.jsx)(S.Z,{className:"order-1",xs:12,md:8,title:"Modelo",name:"model.nome",value:V.nome,required:!0,control:ez,errors:null==eO?void 0:null===(o=eO.model)||void 0===o?void 0:o.nome}),(0,s.jsx)(S.Z,{className:"order-1",xs:12,md:3,type:"number",title:"Ciclo (dias)",name:"model.ciclo",value:V.ciclo,required:!0,control:ez,helpText:"Ciclo de vencimento deste formul\xe1rio. Caso n\xe3o tenha ciclo, use dias igual a 0 (zero)",errors:null==eO?void 0:null===(t=eO.model)||void 0===t?void 0:t.ciclo}),(0,s.jsx)(C.Z,{className:"order-2 md:order-3",xs:2,md:1,title:"Ativo",name:"model.status",value:V.status,register:ey}),ef&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(I.Z,{xs:12,md:6,className:"order-5",multiple:!0,title:"Setores que preenchem cabe\xe7alho",name:"model.setoresPreenchem",options:null!=ef?ef:[],value:null!==(v=null==V?void 0:V.setoresPreenchem)&&void 0!==v?v:[],register:ey,setValue:eP,control:ez,helpText:"Profissionais deste setor ter\xe3o permiss\xe3o para preencher o formul\xe1rio. Se nenhum profissional for selecionado, o sistema n\xe3o far\xe1 o controle de permiss\xe3o para este formul\xe1rio"}),(0,s.jsx)(I.Z,{xs:12,md:6,className:"order-5",multiple:!0,title:"Setores que concluem o formul\xe1rio",name:"model.setoresConcluem",options:null!=ef?ef:[],value:null!==(P=null==V?void 0:V.setoresConcluem)&&void 0!==P?P:[],register:ey,setValue:eP,control:ez,helpText:"Profissionais deste setor ter\xe3o permiss\xe3o para concluir/aprovar o formul\xe1rio. Se nenhum profissional for selecionado, o sistema n\xe3o far\xe1 o controle de permiss\xe3o para este formul\xe1rio"})]}),(0,s.jsx)(S.Z,{xs:12,md:12,className:"order-6",title:"Cabe\xe7alho",name:"model.cabecalho",required:!1,value:V.cabecalho,multiline:!0,rows:4,control:ez,helpText:"Texto que ser\xe1 exibido no cabe\xe7alho do formul\xe1rio. Adicione aqui instru\xe7\xf5es e orienta\xe7\xf5es para auxiliar o preenchimento do formul\xe1rio."})]}),F&&(0,s.jsx)(d.Z,{component:"nav","aria-label":"main mailbox",children:(0,s.jsxs)(r.ZP,{container:!0,spacing:2,children:[(0,s.jsx)(r.ZP,{item:!0,md:6,children:(0,s.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Nome do Campo"})}),(0,s.jsx)(r.ZP,{item:!0,md:2,children:(0,s.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Mostra"})}),(0,s.jsx)(r.ZP,{item:!0,md:2,children:(0,s.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Obrigat\xf3rio"})}),(0,s.jsx)(r.ZP,{item:!0,md:2,children:(0,s.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:600},children:"Ordem"})}),eM("header").map((e,o)=>(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.ZP,{item:!0,md:6,children:(0,s.jsx)(u.Z,{display:"flex",alignItems:"center",sx:{gap:2},children:(0,s.jsx)("p",{children:e.nomeCampo})})}),(0,s.jsx)(D.Z,{xs:"12",md:"2",title:"",name:"header.[".concat(o,"].mostra"),value:e.mostra,register:ey}),(0,s.jsx)(D.Z,{xs:"12",md:"2",title:"",name:"header.[".concat(o,"].obrigatorio"),value:e.obrigatorio,register:ey}),(0,s.jsx)(S.Z,{xs:"12",md:"2",title:"",name:"header.[".concat(o,"].ordem"),value:e.ordem,register:ey,control:ez,type:"number"})]}))]})})]})}),!L&&(0,s.jsx)(g.Z,{}),L&&(0,s.jsx)(q,{blocks:L,errors:eO,control:ez,register:ey,watch:eB,removeItem:eT,addItem:eF,getValues:eM,removeBlock:eW,setValue:eP,allOptions:W,openModalConfirmScore:G,setOpenModalConfirmScore:J,itemScore:K,setItemScore:!0,createNew:ek,viewItem:eI,setores:ef},el),"edit"===eD&&V&&(0,s.jsx)(r.ZP,{item:!0,xs:12,md:12,sx:{mt:4},children:(0,s.jsx)(m.Z,{variant:"outlined",color:"primary",startIcon:(0,s.jsx)(k.Z,{icon:"material-symbols:add-circle-outline-rounded"}),onClick(){eA()},children:"Inserir Bloco"})}),H&&(0,s.jsx)(n.Z,{md:12,sx:{mt:4},children:(0,s.jsx)(a.Z,{children:(0,s.jsx)(r.ZP,{container:!0,spacing:4,children:(0,s.jsx)(S.Z,{xs:12,md:12,title:"Orienta\xe7\xf5es",name:"orientations.obs",required:!1,value:null==H?void 0:H.obs,multiline:!0,rows:4,control:ez})})})})]}),(0,s.jsx)(M.Z,{title:"Novo item",size:"md",openModal:en,setOpenModal:ea,handleSave:eU,children:(0,s.jsx)(z.Z,{btnClose:!0,handleModalClose:()=>ea(!1),setNewChange:ex,newChange:em,outsideID:y,handleConfirmNew:eS,manualUrl:"/cadastros/item"})}),(0,s.jsx)(M.Z,{title:"Detalhes do Item",size:"md",openModal:er,setOpenModal:ed,children:(0,s.jsx)(z.Z,{id:ec,btnClose:!0,handleModalClose:()=>ed(!1)})})]})};var V=O},1948:function(e,o,t){var s=t(85893),l=t(54225),i=t(1890),n=t(77745),a=t(95398),r=t(76779),d=t(44642),c=t(60664),u=t(61953),m=t(22416),x=t(22841),v=t(16056),h=t(79072),p=t(55343),j=t(67836),Z=t(87536),b=t(86501);let f=e=>{let{openModal:o,setOpenModalConfirmScore:t,itemScore:f,setItemScore:g}=e,k=()=>{t(!1)},{handleSubmit:I,register:S}=(0,Z.cI)({}),C=e=>{let o={alternativaID:null==f?void 0:f.alternativaID,pontuacao:(null==e?void 0:e.pontuacao)?1:0,parFornecedorBlocoItemID:null==f?void 0:f.parFornecedorBlocoItemID,alternatives:null==f?void 0:f.alternatives.map((o,t)=>({alternativaItemID:null==o?void 0:o.alternativaItemID,score:e[null==o?void 0:o.nome]}))};c.h.post("/formularios/fornecedor/saveItemScore",{data:o}).then(e=>{t(!1),b.Am.success("Pontua\xe7\xe3o salva com sucesso!")})};return(0,s.jsx)(s.Fragment,{children:(null==f?void 0:f.alternatives)&&(0,s.jsx)(i.Z,{open:o,onClose:k,"aria-labelledby":"form-dialog-title",children:(0,s.jsxs)("form",{onSubmit:I(C),children:[(0,s.jsx)(n.Z,{id:"form-dialog-title",children:"Pontua\xe7\xe3o das respostas"}),(0,s.jsxs)(a.Z,{children:[(0,s.jsx)(d.Z,{sx:{mb:3},children:"Defina a pontua\xe7\xe3o para cada alternativa"}),(0,s.jsx)(u.Z,{sx:{mb:4},children:(0,s.jsx)(m.Z,{row:!0,children:(0,s.jsx)(x.Z,{label:"Habilitar pontua\xe7\xe3o",control:(0,s.jsx)(v.Z,{name:"pontuacao",...S("pontuacao"),checked:(null==f?void 0:f.pontuacao)==1,onChange(e){g({...f,pontuacao:e.target.checked?1:0})}})})})}),f&&(null==f?void 0:f.alternatives.map((e,o)=>(0,s.jsx)(h.ZP,{md:12,sx:{mb:4},children:(0,s.jsx)("grid",{item:!0,md:12,children:(0,s.jsx)(p.Z,{fullWidth:!0,children:(0,s.jsx)(j.Z,{disabled:1!=f.pontuacao,id:"outlined-basic",label:null==e?void 0:e.nome,...S("".concat(null==e?void 0:e.nome)),name:"".concat(null==e?void 0:e.nome),defaultValue:null==e?void 0:e.score,variant:"outlined",size:"small",type:"number",title:0!=f.pontuacao||"Habilite a pontua\xe7\xe3o para preencher"})})})},o)))]}),(0,s.jsxs)(r.Z,{className:"dialog-actions-dense",children:[(0,s.jsx)(l.Z,{variant:"outlined",color:"primary",onClick:k,children:"Cancelar"}),(0,s.jsx)(l.Z,{variant:"contained",color:"primary",onClick:I(C),children:"Confirmar"})]})]})})})};o.Z=f},92629:function(e,o,t){var s=t(85893),l=t(54225),i=t(1890),n=t(77745),a=t(95398),r=t(76779),d=t(29630),c=t(60664),u=t(67294),m=t(83830),x=t(86501),v=t(40039);let h=e=>{let{title:o,description:t,open:h,handleClose:p,params:j}=e,{setId:Z}=(0,u.useContext)(m.X),{user:b,loggedUnity:f}=(0,u.useContext)(v.V),g=async()=>{try{await c.h.delete("".concat(j.route,"/").concat(b.usuarioID,"/").concat(f.unidadeID)),x.ZP.success(j.messageSucceded),Z(null)}catch(e){console.log(e),x.ZP.error(j.MessageError)}finally{p()}};return(0,s.jsxs)(i.Z,{open:h,children:[(0,s.jsx)(n.Z,{id:"form-dialog-title",children:o}),(0,s.jsx)(a.Z,{children:(0,s.jsx)(d.Z,{variant:"body1",children:t})}),(0,s.jsxs)(r.Z,{className:"dialog-actions-dense",children:[(0,s.jsx)(l.Z,{variant:"outlined",color:"secondary",onClick:p,children:"Cancelar"}),(0,s.jsx)(l.Z,{variant:"contained",color:"error",onClick:g,children:"Confirmar"})]})]})};o.Z=h},1322:function(e,o,t){var s=t(85893),l=t(95398),i=t(44642),n=t(1890),a=t(77745);t(67294);let r=e=>{let{title:o,setOpenModal:t,openModal:r,children:d,size:c}=e;return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(n.Z,{open:r,onClose:()=>t(!1),fullWidth:!!c,maxWidth:c||null,children:[(0,s.jsx)(a.Z,{id:"form-dialog-title",children:o}),(0,s.jsx)(l.Z,{children:(0,s.jsx)(i.Z,{children:d})})]})})};o.Z=r}}]);