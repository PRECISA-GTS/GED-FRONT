"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6194],{62094:function(e,o,a){var t=a(85893),n=a(11163),s=a.n(n),l=a(67294),i=a(60664),r=a(49837),d=a(91359),c=a(79072),u=a(87536),m=a(86501),p=a(45061),x=a(64165),h=a(86887),f=a(47842),v=a(60565),g=a(83830),D=a(29308),b=a(67569),j=a(41088),I=a(40039);let Z=e=>{var o;let{id:a,btnClose:n,handleModalClose:Z,setNewChange:C,newChange:y,outsideID:S,handleConfirmNew:w,manualUrl:P}=e,[F,E]=(0,l.useState)(!1),[N,M]=(0,l.useState)(null),{setId:A}=(0,l.useContext)(g.X),V=s(),k=a&&a>0?"edit":"new",O=V.pathname,{title:H}=(0,l.useContext)(v.f),{startLoading:R,stopLoading:_}=(0,j.Z)(),{user:z,loggedUnity:q}=(0,l.useContext)(I.V),{trigger:T,handleSubmit:U,reset:B,control:G,formState:{errors:W},register:L}=(0,u.cI)({mode:"onChange"}),X=async e=>{let o={...e,usuarioID:z.usuarioID,unidadeID:q.unidadeID};R();try{"new"===k?await i.h.post("cadastros/tipo-veiculo/new/insertData",o).then(e=>{S?(A(S),w(e.data.value)):(V.push("".concat((0,x.g_)(O))),A(e.data.id)),m.ZP.success(x.OD.successNew)}):"edit"===k&&(await i.h.post("".concat(O,"/updateData/").concat(a),o),m.ZP.success(x.OD.successUpdate))}catch(t){t.response&&409===t.response.status?m.ZP.error(x.OD.errorRepeated):console.log(t)}finally{_()}},J=async()=>{try{await i.h.delete("".concat(O,"/").concat(a,"/").concat(z.usuarioID,"/").concat(q.unidadeID)),A(null),E(!1),m.ZP.success(x.OD.successDelete)}catch(e){e.response&&409===e.response.status?(m.ZP.error(x.OD.pendingDelete),E(!1)):console.log(e)}},K=async()=>{try{"edit"===k?await i.h.post("".concat(O,"/getData/").concat(a),{id:a}).then(e=>{M(e.data),B(e.data)}):M({fields:{nome:"",status:1}})}catch(e){console.log(e)}};return(0,l.useEffect)(()=>{K(),setTimeout(()=>{T()},300)},[a]),(0,t.jsxs)(t.Fragment,{children:[!N&&(0,t.jsx)(f.Z,{}),N&&(0,t.jsxs)("form",{onSubmit:U(X),children:[(0,t.jsx)(h.Z,{btnCancel:!0,btnNew:!w,btnSave:!0,manualUrl:P,btnClose:n,handleModalClose:Z,handleSubmit:()=>U(X),btnDelete:"edit"===k,onclickDelete:()=>E(!0),type:k,outsideID:S}),(0,t.jsx)(r.Z,{children:(0,t.jsx)(d.Z,{children:(0,t.jsxs)(c.ZP,{container:!0,spacing:5,children:[(0,t.jsx)(D.Z,{xs:11,md:11,title:"Nome",name:"fields.nome",required:!0,control:G,errors:null==W?void 0:null===(o=W.fields)||void 0===o?void 0:o.nome}),(0,t.jsx)(b.Z,{xs:1,md:1,title:"Ativo",name:"fields.status",value:null==N?void 0:N.fields.status,typePage:k,register:L})]})})})]}),(0,t.jsx)(p.Z,{text:"Tem certeza que deseja excluir?",title:"Excluir "+H.title,openModal:F,handleClose:()=>E(!1),handleSubmit:J,btnCancel:!0,btnConfirm:!0})]})};o.Z=Z},76904:function(e,o,a){var t=a(85893),n=a(11163),s=a.n(n),l=a(67294),i=a(60664),r=a(49837),d=a(91359),c=a(79072),u=a(87536),m=a(86501),p=a(45061),x=a(86887),h=a(64165),f=a(60565),v=a(83830),g=a(40039),D=a(29308),b=a(67569),j=a(41088);let I=e=>{var o;let{id:a,btnClose:n,handleModalClose:I,setNewChange:Z,newChange:C,outsideID:y,handleConfirmNew:S,manualUrl:w}=e,[P,F]=(0,l.useState)(!1),[E,N]=(0,l.useState)(null),{setId:M}=(0,l.useContext)(v.X),A=s(),V=a&&a>0?"edit":"new",k=A.pathname,{title:O}=(0,l.useContext)(f.f),{loggedUnity:H,user:R}=(0,l.useContext)(g.V),{startLoading:_,stopLoading:z}=(0,j.Z)(),{trigger:q,handleSubmit:T,reset:U,control:B,formState:{errors:G},register:W}=(0,u.cI)({mode:"onChange"}),L=async e=>{let o={...e,usuarioID:R.usuarioID,unidadeID:H.unidadeID};try{"new"===V?await i.h.post("cadastros/transportador/new/insertData",o).then(e=>{y?(M(y),S(e.data.value)):(A.push("".concat((0,h.g_)(k))),M(e.data.id)),m.ZP.success(h.OD.successNew)}):"edit"===V&&(await i.h.post("".concat(k,"/updateData/").concat(a),o),m.ZP.success(h.OD.successUpdate))}catch(t){t.response&&409===t.response.status?m.ZP.error(h.OD.errorRepeated):console.log(t)}finally{z()}},X=async()=>{try{await i.h.delete("".concat(k,"/").concat(a,"/").concat(R.usuarioID,"/").concat(H.unidadeID)),M(null),F(!1),m.ZP.success(h.OD.successDelete)}catch(e){e.response&&409===e.response.status?(m.ZP.error(h.OD.pendingDelete),F(!1)):console.log(e)}},J=async()=>{try{"edit"===V?await i.h.post("".concat(k,"/getData/").concat(a),{id:a}).then(e=>{N(e.data),U(e.data)}):N({fields:{nome:"",status:1}})}catch(e){console.log(e)}};return(0,l.useEffect)(()=>{J(),setTimeout(()=>{q()},300)},[a]),(0,t.jsxs)(t.Fragment,{children:[E&&(0,t.jsxs)("form",{onSubmit:T(L),children:[(0,t.jsx)(x.Z,{btnCancel:!0,btnNew:!S,btnSave:!0,manualUrl:w,btnClose:n,handleModalClose:I,handleSubmit:()=>T(L),btnDelete:"edit"===V,onclickDelete:()=>F(!0),type:V,outsideID:y}),(0,t.jsx)(r.Z,{children:(0,t.jsx)(d.Z,{children:(0,t.jsxs)(c.ZP,{container:!0,spacing:5,children:[(0,t.jsx)(D.Z,{xs:11,md:11,title:"Nome",name:"fields.nome",required:!0,control:B,errors:null==G?void 0:null===(o=G.fields)||void 0===o?void 0:o.nome}),(0,t.jsx)(b.Z,{xs:1,md:1,title:"Ativo",name:"fields.status",value:null==E?void 0:E.fields.status,typePage:V,register:W})]})})})]}),(0,t.jsx)(p.Z,{text:"Tem certeza que deseja excluir?",title:"Excluir "+O.title,openModal:P,handleClose:()=>F(!1),handleSubmit:X,btnCancel:!0,btnConfirm:!0})]})};o.Z=I},47842:function(e,o,a){var t=a(85893),n=a(70754);let s=e=>{let{show:o,title:a,customTextProps:s,...l}=e;return o&&(0,t.jsx)("div",{className:"fixed inset-0 flex items-center justify-center rounded-lg z-50",children:(0,t.jsxs)("div",{className:"flex flex-col justify-center items-center gap-2 ",children:[(0,t.jsx)(n.Z,{color:"primary",...l}),(0,t.jsx)("p",{className:"opacity-80 text-sm ".concat(s),children:null!=a?a:"Carregando..."})]})})};o.Z=s},36194:function(e,o,a){a.d(o,{Z:function(){return K}});var t=a(85893),n=a(67294),s=a(87536),l=a(99734),i=a(34282),r=a(29308),d=a(23895),c=a(7071),u=a(61953),m=a(49837),p=a(91359),x=a(29630),h=a(79072),f=a(55343),v=a(11163),g=a.n(v),D=a(64165),b=a(60664),j=a(86887),I=a(83830),Z=a(40039),C=a(39976),y=a(86501),S=a(66136),w=a(80377),P=a(44373),F=a(56531),E=a(50287),N=a(84220),M=a(44731);let A=e=>{var o,a,s;let{value:l}=e,{settings:i}=(0,n.useContext)(S.J6);return(0,t.jsx)(m.Z,{style:{height:"100%"},children:(0,t.jsx)(p.Z,{sx:{textAlign:"center"},children:(0,t.jsx)("div",{className:"flex flex-col items-center gap-1",children:(null==l?void 0:l.nome_)?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"flex justify-center",children:(0,t.jsx)(M.Z,{variant:"rounded",sx:{width:70,height:70},className:"p-1 ".concat("dark"===i.mode?"!bg-[#e0e0e0]":"!bg-[#f5f5f5]"),children:(0,t.jsx)("img",{src:null!==(o=null==l?void 0:l.foto)&&void 0!==o?o:"/imageDefault/factory.svg",alt:"Imagem da logo da f\xe1brica"})})}),(0,t.jsx)(x.Z,{variant:"subtitle1",sx:{fontWeight:600},children:null==l?void 0:l.nome_}),(0,t.jsx)(x.Z,{variant:"subtitle2",children:null==l?void 0:l.cnpj_}),l.email?(0,t.jsx)(x.Z,{variant:"subtitle2",children:null==l?void 0:l.email}):(0,t.jsx)(x.Z,{variant:"subtitle2",color:"error",sx:{textTransform:"italic"},children:"E-mail n\xe3o informado"}),(null==l?void 0:l.telefone)&&(0,t.jsx)(x.Z,{variant:"subtitle2",children:null!==(a=null==l?void 0:l.telefone)&&void 0!==a?a:"--"}),(null==l?void 0:l.cidade)&&(0,t.jsx)(x.Z,{variant:"subtitle2",children:null!==(s=null==l?void 0:l.cidade)&&void 0!==s?s:"--"})]}):(0,t.jsx)(x.Z,{variant:"subtitle1",children:"-- Selecione um fornecedor --"})})})})};var V=a(22841),k=a(75158);a(3893);var O=a(21609);let H=e=>{var o,a,n,s,l,i,d,c,u,m;let{value:p,index:x,apresentacoes:h,setValue:f,register:v,control:g,errors:D,disabled:b}=e;return console.log("\uD83D\uDE80 ~ value:",p),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.Z,{xs:12,md:2,title:"Quantidade",name:"produtos[".concat(x,"].quantidade"),register:v,control:g,errors:null==D?void 0:null===(o=D.produtos)||void 0===o?void 0:null===(a=o[x])||void 0===a?void 0:a.quantidade,disabled:b,mask:"fractioned3"}),(0,t.jsx)(E.Z,{xs:12,md:2,title:"Data da fabrica\xe7\xe3o",value:p.dataFabricacao,name:"produtos[".concat(x,"].dataFabricacao"),control:g,errors:null==D?void 0:null===(n=D.produtos)||void 0===n?void 0:null===(s=n[x])||void 0===s?void 0:s.dataFabricacao,disabled:b,typeValidation:"dataPassado"}),(0,t.jsx)(r.Z,{xs:12,md:2,title:"N\xba Lote",name:"produtos[".concat(x,"].lote"),register:v,control:g,errors:null==D?void 0:null===(l=D.produtos)||void 0===l?void 0:null===(i=l[x])||void 0===i?void 0:i.lote,disabled:b}),(0,t.jsx)(N.Z,{xs:12,md:4,title:"Apresenta\xe7\xe3o",name:"produtos[".concat(x,"].apresentacao"),type:"string",options:null!=h?h:[],register:v,setValue:f,control:g,errors:null==D?void 0:null===(d=D.produtos)||void 0===d?void 0:null===(c=d[x])||void 0===c?void 0:c.apresentacao,disabled:b}),(0,t.jsx)(E.Z,{xs:12,md:2,title:"Data de validade",value:p.dataValidade,name:"produtos[".concat(x,"].dataValidade"),control:g,errors:null==D?void 0:null===(u=D.produtos)||void 0===u?void 0:null===(m=u[x])||void 0===m?void 0:m.dataValidade,disabled:b})]})},R=e=>{let{index:o,produto:a,setProdutos:s,handleCheck:l,getValues:i,setValue:r,register:d,control:c,errors:m,disabled:p}=e;console.log("\uD83D\uDE80 ~ produto:",a);let[f,v]=(0,n.useState)([]),g=async()=>{try{let e=await b.h.get("/cadastros/apresentacao");v(e.data)}catch(o){console.log("\uD83D\uDE80 ~ error:",o)}};return(0,n.useEffect)(()=>{g()},[]),(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)(h.ZP,{container:!0,spacing:4,sx:{pb:2},children:[(0,t.jsx)("input",{type:"hidden",value:a.produtoID,name:"produtos[".concat(o,"].produtoID"),...d("produtos[".concat(o,"].produtoID"))}),(0,t.jsx)(h.ZP,{item:!0,xs:12,md:4,children:(0,t.jsx)(V.Z,{control:(0,t.jsx)(k.Z,{onClick:e=>l(e,o),checked:!!a.checked_,disabled:p}),label:a.nome,size:"small",sx:{marginRight:"4px","&:hover":{"& .MuiFormControlLabel-label":{color:"primary.main"}}}})}),(0,t.jsx)(h.ZP,{item:!0,xs:12,md:8,children:(0,t.jsx)(u.Z,{display:"flex",alignItems:"center",justifyContent:"end",sx:{gap:4,mt:3},children:(0,t.jsxs)(x.Z,{variant:"body2",children:["\xdaltima avalia\xe7\xe3o: ",a.ultimaAvaliacao]})})}),a.checked_&&(0,t.jsx)(H,{value:a,apresentacoes:f,index:o,setValue:r,register:d,control:c,errors:m,disabled:p},a.produtoID)]})})};var _=a(22991);let z=e=>{var o,a,s,l,i,d;let{recebimentoMpID:c,modelo:f,values:v,fields:g,disabled:D,register:j,errors:I,getValues:C,setValue:y,control:S,getAddressByCep:w,nameSelected:M,setNameSelected:V,columnSelected:k,setColumnSelected:H,openModalNew:z,setOpenModalNew:q,newChange:T,setNewChange:U,setProdutos:B,produtos:G}=e,{user:W,loggedUnity:L}=(0,n.useContext)(Z.V),[X,J]=(0,n.useState)([]),[K,Q]=(0,n.useState)([]),[Y,$]=(0,n.useState)(null),ee=async()=>{let e=await b.h.post("/cadastros/setor/getProfissionaisSetoresAssinatura",{formularioID:2,modeloID:f.id,unidadeID:L.unidadeID});J(e.data.preenche),ea(e.data.preenche)},eo=async()=>{let e=await b.h.post("/formularios/fornecedor/getFornecedoresAprovados",{unidadeID:L.unidadeID,recebimentoMpID:c,modelo:f});Q(e.data),et(v.fornecedor,e.data)},ea=e=>{let o=W.profissionalID,a=e.find(e=>e.id===o);a&&a.id>0&&y("fieldsHeader.profissional",a)},et=(e,o)=>{var a,t;if(!e){$(null),B([]);return}let n=G.filter(e=>!0===e.checked_).map(e=>e.produtoID),s=null===(a=o.find(o=>o.id===e.id))||void 0===a?void 0:null===(t=a.produtos)||void 0===t?void 0:t.map(e=>n.includes(e.produtoID)?{...e,checked_:!0}:e);B(s),y("produtos",s)},en=(e,o)=>{let{checked:a}=e.target;y("produtos[".concat(o,"].checked_"),a);let t=G.map((e,t)=>t===o?{...e,checked_:a}:e);B(t)};return(0,n.useEffect)(()=>{eo(),ee()},[v]),(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(m.Z,{style:{height:"100%"},children:(0,t.jsxs)(p.Z,{children:[(0,t.jsxs)(h.ZP,{container:!0,alignItems:"stretch",spacing:6,children:[(0,t.jsx)(h.ZP,{item:!0,xs:12,sx:{textAlign:"right"},children:(0,t.jsx)(_.Z,{data:null!==(i=null==v?void 0:v.setores)&&void 0!==i?i:[]})}),(0,t.jsx)(h.ZP,{item:!0,xs:12,md:10,children:(0,t.jsxs)(h.ZP,{container:!0,spacing:4,children:[(0,t.jsx)(E.Z,{xs:12,md:2,title:"Data do recebimento",name:"fieldsHeader.data",type:"date",value:null!==(d=null==v?void 0:v.data)&&void 0!==d?d:new Date,disabled:D,register:j,control:S,typeValidation:"dataPassado",daysValidation:365,errors:null==I?void 0:null===(o=I.fieldsHeader)||void 0===o?void 0:o.data,alertRequired:!0}),(0,t.jsx)(r.Z,{xs:12,md:2,title:"Hora do recebimento",name:"fieldsHeader.hora",type:"time",disabled:D,register:j,control:S,errors:null==I?void 0:null===(a=I.fieldsHeader)||void 0===a?void 0:a.hora,alertRequired:!0}),(0,t.jsx)(N.Z,{xs:12,md:4,title:"Profissional preenchimento",name:"fieldsHeader.profissional",type:"string",options:X,disabled:D,register:j,setValue:y,control:S,errors:null==I?void 0:null===(s=I.fieldsHeader)||void 0===s?void 0:s.profissional,alertRequired:!0}),(0,t.jsx)(F.Z,{register:j,errors:I,setValue:y,control:S,fields:g,values:g,getAddressByCep:w,disabled:D,nameSelected:M,setNameSelected:V,getValues:C,columnSelected:k,setColumnSelected:H,openModalNew:z,setOpenModalNew:q,newChange:T,setNewChange:U}),(0,t.jsx)(N.Z,{xs:12,md:12,title:"Fornecedor",name:"fieldsHeader.fornecedor",type:"string",options:null!=K?K:[],onChange:e=>et(e,K),value:null==v?void 0:v.fornecedor,disabled:D,register:j,setValue:y,control:S,errors:null==I?void 0:null===(l=I.fieldsHeader)||void 0===l?void 0:l.fornecedor,alertRequired:!0})]})}),(0,t.jsx)(h.ZP,{item:!0,xs:12,md:2,children:(0,t.jsx)(A,{value:Y})})]}),(0,t.jsxs)(h.ZP,{container:!0,alignItems:"stretch",spacing:6,sx:{mt:2},children:[(0,t.jsxs)(h.ZP,{item:!0,xs:12,children:[(0,t.jsx)(x.Z,{color:"primary",variant:"subtitle1",sx:{fontWeight:700},children:"Produtos aprovados do fornecedor"}),G&&0==G.length&&(0,t.jsx)(x.Z,{color:"warning",variant:"subtitle1",className:"italic",children:(0,t.jsxs)(u.Z,{display:"flex",alignItems:"center",sx:{gap:1},children:[(0,t.jsx)(O.Z,{icon:"typcn:warning",color:"#FFC107"}),(0,t.jsx)("p",{children:"Nenhum fornecedor selecionado!"})]})})]}),(0,t.jsx)(h.ZP,{item:!0,xs:12,children:G&&G.map((e,o)=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(R,{index:o,produto:e,setProdutos:B,handleCheck:en,getValues:C,setValue:y,register:j,control:S,errors:I,disabled:D},o),o<G.length-1&&(0,t.jsx)(P.Z,{})]}))})]})]})})})};var q=a(41088),T=a(92629),U=a(1503),B=a(76904),G=a(1322),W=a(62094),L=a(934),X=a(91757);let J=e=>{var o,a,v;let P;let{id:F,model:E}=e,{menu:N,user:M,hasPermission:A,loggedUnity:V,hasSectorPermission:k}=(0,n.useContext)(Z.V),[O,H]=(0,n.useState)(!1),[R,_]=(0,n.useState)(!1),[J,K]=(0,n.useState)(!1),[Q,Y]=(0,n.useState)(!1),[$,ee]=(0,n.useState)(!1),[eo,ea]=(0,n.useState)(!1),[et,en]=(0,n.useState)(null),[es,el]=(0,n.useState)(!0),[ei,er]=(0,n.useState)(null),[ed,ec]=(0,n.useState)([]),[eu,em]=(0,n.useState)([]),[ep,ex]=(0,n.useState)(null),{createNewNotification:eh}=(0,n.useContext)(C.u),[ef,ev]=(0,n.useState)(!1),[eg,eD]=(0,n.useState)([]),[eb,ej]=(0,n.useState)([]),[eI,eZ]=(0,n.useState)([]),[eC,ey]=(0,n.useState)(null),[eS,ew]=(0,n.useState)([]),[eP,eF]=(0,n.useState)(null),[eE,eN]=(0,n.useState)(""),[eM,eA]=(0,n.useState)(!1),[eV,ek]=(0,n.useState)(!1),[eO,eH]=(0,n.useState)({status:!1,errors:[]}),[eR,e_]=(0,n.useState)(null),{settings:ez}=(0,n.useContext)(S.J6),{setId:eq}=(0,n.useContext)(I.X),{isLoading:eT,startLoading:eU,stopLoading:eB}=(0,q.Z)(),[eG,eW]=(0,n.useState)(!1),{setReportParameters:eL,sendPdfToServer:eX}=(0,U.Gc)(),[eJ,eK]=(0,n.useState)(!1),[eQ,eY]=(0,n.useState)(!1),[e$,e0]=(0,n.useState)(null),[e1,e3]=(0,n.useState)(null),[e2,e6]=(0,n.useState)({status:!1,message:"Voc\xea n\xe3o tem permiss\xf5es",messageType:"info"}),e8=g(),e4=F&&F>0?"edit":"new",e7="edit"==e4?e8.pathname:(0,D.g_)(e8.pathname),{reset:e9,register:e5,getValues:oe,setValue:oo,control:oa,watch:ot,handleSubmit:on,clearErrors:os,setError:ol,formState:{errors:oi}}=(0,s.cI)(),or=()=>{eq(ei.modelo.id),e8.push("/configuracoes/formularios/recebimento-mp/")},od=async e=>{let o={status:30,observacao:null==e?void 0:e.obs,auth:{usuarioID:M.usuarioID,papelID:M.papelID,unidadeID:V.unidadeID}};try{ee(!0),await b.h.post("".concat(e7,"/changeFormStatus/").concat(F),o).then(e=>{y.ZP.success(D.OD.successUpdate),ee(!1),oI(ep,null,null)})}catch(a){console.log(a)}finally{H(!O)}},oc={id:1,name:"Reabrir formul\xe1rio",description:"Reabrir formul\xe1rio para preenchimento.",component:(0,t.jsx)(X.Z,{}),disabled:!!eo||!A(e8.pathname,"editar"),route:null,type:null,action:od,modal:!0,size:"sm",icon:"heroicons:lock-open",identification:null},ou=[];1==M.papelID&&eE.status>=40&&ou.push(oc),1==M.papelID&&(P=!1,N.map(e=>{e.menu.map(e=>{e.submenu&&e.submenu.length>0&&e.submenu.map(e=>{"/configuracoes/formularios"==e.rota&&(P=!0)})})}),P)&&ou.push({id:2,name:"Configura\xe7\xf5es do formul\xe1rio",description:"Alterar as configura\xe7\xf5es do modelo de formul\xe1rio.",route:null,type:null,action:or,modal:!1,icon:"bi:gear",identification:null});let om=async()=>{},op=()=>{eU();try{b.h.post("".concat(e7,"/getData"),{id:null!=F?F:0,type:e4,profissionalID:M.profissionalID,unidadeID:V.unidadeID,modeloID:null!=E?E:0}).then(e=>{var o,a,t,n;console.log("getData: ",e.data),eD(e.data.fieldsHeader),ej(e.data.fieldsFooter),eZ(e.data.fields),ec(e.data.produtos),ew(e.data.blocos),em(e.data.grupoAnexo),eN(e.data.info),er(e.data.unidade),ey(e.data.link),eF(e.data.ultimaMovimentacao),ob(e.data.blocos),en(e.data.naoConformidade) //! Seta não conformidades
,e9(e.data);let s=D.WR[null==e?void 0:null===(o=e.data)||void 0===o?void 0:null===(a=o.info)||void 0===a?void 0:a.status];ex(s),e6({status:!!(1==M.papelID&&e.data.info.status<40&&k(null!==(n=null===(t=e.data.fieldsHeader)||void 0===t?void 0:t.setores)&&void 0!==n?n:[])),message:e.data.info.status>40?"Esse formul\xe1rio j\xe1 foi conclu\xeddo, n\xe3o \xe9 mais poss\xedvel alterar as informa\xe7\xf5es!":e.data.info.status<40?"Formul\xe1rio aberto para preenchimento!":40==e.data.info.status?"Este formul\xe1rio est\xe1 aguardando aprova\xe7\xe3o!":null,messageType:"info"}),om()}).catch(e=>{console.log("\uD83D\uDE80 ~ error:",e)})}catch(e){console.log("\uD83D\uDE80 ~ error:",e)}finally{eB()}},ox=!1,oh=[],of=(e,o)=>{ol(e,{type:"manual",message:"Campo obrigat\xf3rio"}),oh.push(o),ox=!0},ov=()=>{os(),oe("fieldsHeader.data")||of("fieldsHeader.data","Data da avalia\xe7\xe3o"),oe("fieldsHeader.hora")||of("fieldsHeader.hora","Hora da avalia\xe7\xe3o"),null==eI||eI.forEach((e,o)=>{let a=e.tabela?"fields[".concat(o,"].").concat(e.tabela):"fields[".concat(o,"].").concat(e.nomeColuna),t=oe(a);1!==e.obrigatorio||t||of(a,null==e?void 0:e.nomeCampo)}),ed&&ed.length>0&&ed.forEach((e,o)=>{e.produtoAnexosDescricao&&e.produtoAnexosDescricao.forEach((a,t)=>{1===a.obrigatorio&&0==a.anexos.length&&(ol("produtos[".concat(o,"].produtoAnexosDescricao[").concat(t,"].anexos"),{type:"manual",message:"Campo obrigat\xf3rio"}),oh.push("Anexo: ".concat(null==e?void 0:e.nome," / ").concat(null==a?void 0:a.nome)),ox=!0)})}),eS.forEach((e,o)=>{e.itens.forEach((e,a)=>{let t=oe("blocos[".concat(o,"].itens[").concat(a,"].resposta"));(null==e?void 0:e.obrigatorio)!==1||t||(ol("blocos[".concat(o,"].itens[").concat(a,"].resposta"),{type:"manual",message:"Campo obrigat\xe1rio"}),oh.push(null==e?void 0:e.nome),ox=!0),e.respostaConfig&&1==e.respostaConfig.anexo&&e.respostaConfig.anexosSolicitados.length>0&&e.respostaConfig.anexosSolicitados.forEach((t,n)=>{1==t.obrigatorio&&t.anexos&&0==t.anexos.length&&(ol("blocos[".concat(o,"].itens[").concat(a,"].respostaConfig.anexosSolicitados[").concat(n,"].anexos"),{type:"manual",message:"Campo obrigat\xe1rio"}),oh.push("Anexo: ".concat(null==e?void 0:e.nome," / ").concat(null==t?void 0:t.nome)),ox=!0)})})}),eu&&eu.length>0&&eu.forEach((e,o)=>{e.itens.forEach((a,t)=>{1===a.obrigatorio&&0==a.anexos.length&&(ol("grupoAnexo[".concat(o,"].itens[").concat(t,"].anexos"),{type:"manual",message:"Campo obrigat\xe1rio"}),oh.push("Anexo: ".concat(null==e?void 0:e.nome," / ").concat(null==a?void 0:a.nome)),ox=!0)})}),eH({status:ox,errors:oh})},og=async e=>{if(9===e.length){let o=e.replace(/[^0-9]/g,"");try{let a=await b.h.get("https://viacep.com.br/ws/".concat(o,"/json/"));a.data.localidade?(eI.forEach(async(e,o)=>{("logradouro"===e.nomeColuna||"bairro"===e.nomeColuna||"cidade"===e.nomeColuna||"estado"===e.nomeColuna)&&(await oo("fields[".concat(o,"].logradouro"),a.data.logradouro),await oo("fields[".concat(o,"].bairro"),a.data.bairro),await oo("fields[".concat(o,"].cidade"),a.data.localidade),await oo("fields[".concat(o,"].estado"),a.data.uf))}),y.ZP.success("Endere\xe7o encontrado!")):y.ZP.error("Endere\xe7o n\xe3o encontrado!")}catch(t){console.error(t)}}},oD=e=>{e_(e),ov(),eA(!0)},ob=e=>{let o=!0;e.forEach(e=>{e.itens.forEach(e=>{e.respostaConfig&&1==e.respostaConfig.bloqueiaFormulario&&(o=!1)})}),el(o)},oj=async e=>{e.conclusion=!0,await on(oZ)(e)},oI=(e,o,a)=>{let t=30==e?"Em preenchimento":40==e?"Conclu\xeddo":50==e?"Reprovado":60==e?"Aprovado parcialmente":70==e?"Aprovado":"Pendente",n={titulo:"Formul\xe1rio de Fornecedor ".concat(t),descricao:"O formul\xe1rio de Fornecedor #".concat(F," est\xe1 ").concat(t,"."),url:"/formularios/fornecedor/",urlID:F,tipoNotificacaoID:6,usuarioGeradorID:M.usuarioID,usuarioID:0,unidadeID:V.unidadeID,papelID:1};if(n&&(eh(n),o)){let s={titulo:"Fornecedor gerado",descricao:"O formul\xe1rio de Fornecedor #".concat(F," est\xe1 ").concat(t," e gerou uma n\xe3o conformidade."),url:"/formularios/fornecedor/nao-conformidade/",urlID:a,tipoNotificacaoID:5,usuarioGeradorID:M.usuarioID,usuarioID:0,unidadeID:V.unidadeID,papelID:1};eh(s)}},oZ=async function(e){var o,a;let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];!0===t.conclusion&&(e.concluiForm=!0,e.info.status=null!==(o=t.status)&&void 0!==o?o:eE.status,e.obsConclusao=t.obsConclusao);let n={form:e,auth:{usuarioID:M.usuarioID,profissionalID:null!==(a=M.profissionalID)&&void 0!==a?a:0,papelID:M.papelID,unidadeID:V.unidadeID}};if(!0!=F){eA(!1);try{"edit"==e4?await b.h.post("".concat(e7,"/updateData/").concat(F),n).then(o=>{y.ZP.success(D.OD.successUpdate),oI(e.status,e.naoConformidade,null)}):"new"==e4?await b.h.post("".concat(e7,"/insertData"),n).then(e=>{eq(e.data.recebimentoMpID),e8.push("".concat(e7)),y.ZP.success(D.OD.successNew)}):y.ZP.error(D.OD.error)}catch(s){console.log("erro da fun\xe7\xe3o update/email",s)}finally{H(!O)}}},oC=async(e,o)=>{_(!0);let a=e.target.files;if(a&&a.length>0){var t;let n=new FormData;for(let s=0;s<a.length;s++)n.append("files[]",a[s]);n.append("usuarioID",M.usuarioID),n.append("unidadeID",V.unidadeID),n.append("grupoAnexoItemID",null!==(t=o.grupoAnexoItemID)&&void 0!==t?t:null),await b.h.post("".concat(e7,"/saveAnexo/").concat(F,"/grupo-anexo/").concat(M.usuarioID,"/").concat(ei.unidadeID),n).then(e=>{let o=oe();oZ(o)}).catch(e=>{var o,a,t;y.ZP.error(null!==(t=null===(o=e.response)||void 0===o?void 0:null===(a=o.data)||void 0===a?void 0:a.message)&&void 0!==t?t:"Erro ao atualizar anexo, tente novamente!")}).finally(()=>{_(!1),H(!O)})}},oy=async(e,o)=>{Y(!0);let a=e.target.files;if(a&&a.length>0){var t,n;let s=new FormData;for(let l=0;l<a.length;l++)s.append("files[]",a[l]);s.append("usuarioID",M.usuarioID),s.append("unidadeID",V.unidadeID),s.append("parRecebimentoMpModeloBlocoID",null!==(t=o.parRecebimentoMpModeloBlocoID)&&void 0!==t?t:null),s.append("itemOpcaoAnexoID",null!==(n=o.itemOpcaoAnexoID)&&void 0!==n?n:null),await b.h.post("".concat(e7,"/saveAnexo/").concat(F,"/item/").concat(M.usuarioID,"/").concat(ei.unidadeID),s).then(e=>{let o=oe();oZ(o)}).catch(e=>{var o,a,t;y.ZP.error(null!==(t=null===(o=e.response)||void 0===o?void 0:null===(a=o.data)||void 0===a?void 0:a.message)&&void 0!==t?t:"Erro ao atualizar anexo, tente novamente!!!!")}).finally(()=>{Y(!1),H(!O)})}},oS=async e=>{e&&await b.h.delete("".concat(e7,"/deleteAnexo/").concat(F,"/").concat(e.anexoID,"/").concat(ei.unidadeID,"/").concat(M.usuarioID,"/item")).then(e=>{let o=oe();oZ(o)}).catch(e=>{var o,a,t;y.ZP.error(null!==(t=null===(o=e.response)||void 0===o?void 0:null===(a=o.data)||void 0===a?void 0:a.message)&&void 0!==t?t:"Erro ao remover anexo, tente novamente!")}).finally(()=>{op()})},ow=e=>{e.preventDefault();let o=oe();oZ(o)};(0,n.useEffect)(()=>{op()},[F,O]),(0,n.useEffect)(()=>{ov()},[eT]);let oP=async e=>{eY(!1)};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("form",{onSubmit:e=>ow(e),children:[(0,t.jsx)(j.Z,{btnCancel:!0,btnSave:!eE.concluido,btnSend:1==M.papelID&&eE.status>=30&&!eE.concluido,btnPrint:"edit"==e4,btnDelete:eE.status<40,onclickDelete:()=>eW(!0),actionsData:ou,actions:!0,handleSubmit:()=>on(oZ),handleSend:oD,iconConclusion:"mdi:check-bold",titleConclusion:"Concluir Formul\xe1rio",title:"Recebimento de MP",btnStatus:1==M.papelID&&"edit"==e4,handleBtnStatus:()=>ev(!0),type:e4,status:ep,setores:null!==(v=null==eb?void 0:eb.setores)&&void 0!==v?v:[]}),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"flex gap-2 mb-2",children:[ep&&(0,t.jsx)(c.Z,{size:"small",skin:"light",color:ep.color,label:ep.title,sx:{"& .MuiChip-label":{textTransform:"capitalize"}}}),ei&&ei.modelo&&(0,t.jsx)(c.Z,{size:"small",HeaderFiel:!0,skin:"light",label:ei.modelo.nome,sx:{"& .MuiChip-label":{textTransform:"capitalize"}}})]}),(0,t.jsxs)(u.Z,{display:"flex",flexDirection:"column",sx:{gap:6},children:[eE&&""!=eE.cabecalhoModelo&&(0,t.jsx)(m.Z,{children:(0,t.jsx)(p.Z,{children:(0,t.jsx)(x.Z,{variant:"subtitle1",children:eE.cabecalhoModelo})})}),ei&&(0,t.jsx)(z,{nameSelected:e1,setNameSelected:e3,columnSelected:e$,setColumnSelected:e0,openModalNew:eQ,setOpenModalNew:eY,newChange:eJ,setNewChange:eK,recebimentoMpID:F,modelo:ei.modelo,values:eg,fields:eI,getValues:oe,disabled:!e2.status,register:e5,errors:oi,setValue:oo,control:oa,getAddressByCep:og,setProdutos:ec,produtos:ed},ei.unidadeID),eS&&eS.map((e,o)=>(0,t.jsx)(l.Z,{index:o,bloco:e,blockKey:"parRecebimentoMpModeloBlocoID",setBlocos:ew,setValue:oo,blocos:eS,getValues:oe,register:e5,control:oa,disabled:eo,errors:null==oi?void 0:oi.blocos,handleFileSelect:oy,handleRemoveAnexoItem:oS,status:eE.status})),eu&&eu.map((e,o)=>(0,t.jsx)(d.Z,{values:{grupo:e,loadingFile:R,indexGrupo:o,handleFileSelect:oC,handleRemove:handleRemoveAnexoGroup,folder:"grupo-anexo",disabled:!e2.status,error:oi}},o)),eE&&(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(m.Z,{children:(0,t.jsx)(p.Z,{children:(0,t.jsx)(h.ZP,{container:!0,spacing:4,children:(0,t.jsx)(h.ZP,{item:!0,xs:12,md:12,children:(0,t.jsxs)(f.Z,{fullWidth:!0,children:[(0,t.jsx)(x.Z,{variant:"subtitle1",sx:{fontWeight:600,mb:2},children:"Observa\xe7\xf5es (campo de uso exclusivo da validadora)"}),(0,t.jsx)(r.Z,{title:"Observa\xe7\xe3o (opcional)",name:"info.obs",multiline:!0,rows:4,value:eE.obs,disabled:!e2.status,control:oa})]})})})})})}),eb&&eb.concluded&&(null===(o=eb.conclusion)||void 0===o?void 0:o.profissional)&&(0,t.jsx)(x.Z,{variant:"caption",children:"Conclu\xeddo por ".concat(eb.conclusion.profissional.nome," em ").concat(eb.conclusion.dataFim," ").concat(eb.conclusion.horaFim,".")}),(0,t.jsx)(L.Z,{id:F,parFormularioID:2},O),ef&&(0,t.jsx)(i.Z,{title:"Hist\xf3rico do Formul\xe1rio",text:"Listagem do hist\xf3rico das movimenta\xe7\xf5es do formul\xe1rio ".concat(F," do Recebimento de MP."),id:F,parFormularioID:2,formStatus:eE.status,hasFormPending:eo,canChangeStatus:!1,openModal:ef,handleClose:()=>ev(!1),btnCancel:!0,btnConfirm:!0,handleSubmit:!1}),(0,t.jsx)(w.Z,{openModal:eM,handleClose(){eA(!1),ov()},title:"Concluir Formul\xe1rio",text:"Deseja realmente concluir este formul\xe1rio?",info:eE,canChange:!eo,register:e5,setValue:oo,getValues:oe,control:oa,btnCancel:!0,btnConfirm:!0,btnConfirmColor:"primary",conclusionForm:oj,listErrors:eO,canApprove:es,hasNaoConformidade:!0,type:"recebimentoMp",unity:ei,values:eb,formularioID:2,errors:oi,modeloID:null==ei?void 0:null===(a=ei.modelo)||void 0===a?void 0:a.id}),(0,t.jsx)(T.Z,{title:"Excluir Formul\xe1rio",description:"Tem certeza que deseja exluir o formulario?",params:{route:"formularios/recebimento-mp/delete/".concat(F),messageSucceded:"Formul\xe1rio exclu\xeddo com sucesso!",MessageError:"Dado possui pend\xeancia!"},open:eG,handleClose:()=>eW(!1)})]})]})]}),(0,t.jsx)(G.Z,{title:"transportadorID"==e$?"Novo transportador":"tipoVeiculoID"==e$?"Novo tipo de veiculo":"",size:"md",openModal:eQ,setOpenModal:eY,children:"transportadorID"==e$?(0,t.jsx)(B.Z,{btnClose:!0,handleModalClose:()=>eY(!1),setNewChange:eK,newChange:eJ,outsideID:!0,handleConfirmNew:oP,manualUrl:"/cadastros/transportador"}):"tipoVeiculoID"==e$?(0,t.jsx)(W.Z,{btnClose:!0,handleModalClose:()=>eY(!1),setNewChange:eK,newChange:eJ,outsideID:!0,handleConfirmNew:oP,manualUrl:"/cadastros/tipo-veiculo"}):null})]})};var K=J}}]);