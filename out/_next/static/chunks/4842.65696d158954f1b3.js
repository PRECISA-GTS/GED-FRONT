"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4842],{6624:function(e,a,o){o.d(a,{Z:function(){return E}});var n=o(85893),t=o(11163),r=o.n(t),l=o(54225),i=o(1890),s=o(77745),d=o(95398),c=o(76779),u=o(44642),m=o(40039),x=o(79072),p=o(19604),h=o(29630),f=o(67294),j=o(48432),v=o(99070),b=o(82555),g=o(74811),C=o(55334),Z=o(62813),y=o(83542);o(50287);var P=o(29308);o(84220),o(60664);var q=o(44373),D=o(21609);o(67569);var k=o(42222);let A=e=>{var a,o,t;let{data:r,form:l,setValidParams:i}=e;console.log("\uD83D\uDE80 ~ modal data:",r);let[s,d]=(0,f.useState)(null),{user:c}=(0,f.useContext)(m.V),u=()=>{if(!r)return;let e=r.sort((e,a)=>e.checked_&&!a.checked_?-1:!e.checked_&&a.checked_?1:0);d(e),e.map((e,a)=>{p(e.quantidade,e.quantidadeEntrada,a)})},p=(e,a,o)=>{if(!e||!a)return"--";let n=(0,k.JK)(e),t=(0,k.JK)(a),r=(0,k.Qp)(n-t);l.setValue("productsConclude.".concat(o,".diff"),r)};return(0,f.useEffect)(()=>{u()},[r]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(h.Z,{variant:"body1",color:"primary",sx:{fontWeight:600,mt:6},className:"flex items-center gap-1",children:[(0,n.jsx)(D.Z,{icon:"ph:plant",className:"text-primary"}),"Confer\xeancia dos produtos do Recebimento de MP"]}),s&&s.length>0&&s.map((e,r)=>{var d;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(x.ZP,{container:!0,spacing:4,sx:{mt:4},className:"items-center",children:[(0,n.jsx)(x.ZP,{item:!0,md:12,children:(0,n.jsx)(h.Z,{variant:"body2",sx:{fontWeight:600},children:"".concat(e.nome," ").concat(e.lote?" - Lote: ".concat(e.lote):" - Lote n\xe3o informado")})}),(0,n.jsxs)(x.ZP,{item:!0,md:2,children:[(0,n.jsx)("p",{className:"text-xs opacity-50",children:"Qtd. Recebimento"}),(0,n.jsx)("p",{children:e.quantidade})]}),e.checked_?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("input",{type:"hidden",name:"productsConclude.".concat(r,".recebimentoMpProdutoID"),value:e.recebimentoMpProdutoID,...l.register("productsConclude.".concat(r,".recebimentoMpProdutoID"))}),(0,n.jsx)("input",{type:"hidden",name:"productsConclude.".concat(r,".quantidade"),value:e.quantidade,...l.register("productsConclude.".concat(r,".quantidade"))}),(0,n.jsx)(P.Z,{md:2,title:"Qtd. Entrada",name:"productsConclude.".concat(r,".novaQuantidade"),defaultValue:e.quantidadeEntrada,helpText:"Quantidade recebida",required:!0,disabled:1!=c.papelID,form:l,mask:"fractioned3",onChange(a){(0,k.JK)(l.getValues("productsConclude[".concat(r,"].novaQuantidade")))>(0,k.JK)(e.quantidade)?i(!1):i(!0),p(e.quantidade,a,r)},errorText:(0,k.JK)(l.getValues("productsConclude[".concat(r,"].novaQuantidade")))>(0,k.JK)(e.quantidade)?"Quantidade excedida":null})]}):(0,n.jsxs)(x.ZP,{item:!0,md:2,children:[(0,n.jsx)("p",{className:"text-xs opacity-50",children:"Qtd. Entrada"}),(0,n.jsx)("p",{children:e.quantidadeEntrada})]}),(0,n.jsxs)(x.ZP,{item:!0,md:2,children:[(0,n.jsx)("p",{className:"text-xs opacity-50",children:"Diferen\xe7a"}),(0,n.jsx)("p",{children:l.watch("productsConclude.".concat(r,".diff"))})]}),(0,n.jsxs)(x.ZP,{item:!0,md:2,children:[(0,n.jsx)("p",{className:"text-xs opacity-50",children:"Data Fabrica\xe7\xe3o"}),(0,n.jsx)("p",{children:null!==(a=e.dataFabricacao)&&void 0!==a?a:"--"})]}),(0,n.jsxs)(x.ZP,{item:!0,md:2,children:[(0,n.jsx)("p",{className:"text-xs opacity-50",children:"Apresenta\xe7\xe3o"}),(0,n.jsx)("p",{children:null!==(o=null===(d=e.apresentacao)||void 0===d?void 0:d.nome)&&void 0!==o?o:"--"})]}),(0,n.jsxs)(x.ZP,{item:!0,md:2,children:[(0,n.jsx)("p",{className:"text-xs opacity-50",children:"Data Validade"}),(0,n.jsx)("p",{children:null!==(t=e.dataValidade)&&void 0!==t?t:"--"})]})]}),r<s.length-1&&(0,n.jsx)(q.Z,{sx:{pt:4}})]})})]})},N=e=>{var a,o;let{form:t,title:P,text:q,handleClose:D,openModal:k,conclusionForm:N,status:E,canChange:V,btnCancel:F,btnConfirm:I,listErrors:Q,hasNaoConformidade:_,handleSend:w,type:K,unity:R,values:S,formularioID:J,modeloID:B,produtos:M,departamentos:z}=e;if(!B)return null;let[W,T]=(0,f.useState)(!0),{user:L,loggedUnity:O,hasSectorPermission:H}=(0,f.useContext)(m.V),[U,G]=(0,f.useState)({}),{data:X}=(0,b.O)(),Y=r(),$=Y.pathname.split("/")[2],ee=()=>(0,n.jsx)(v.BB,{children:(0,n.jsx)(v.T3,{size:"A4",style:{paddingHorizontal:25},children:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g.Z,{data:X}),"fornecedor"===$&&(0,n.jsx)(C.default,{values:X},X),(0,n.jsx)(Z.Z,{})]})})});return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(i.Z,{fullWidth:!0,maxWidth:"lg",open:k,"aria-labelledby":"form-dialog-title",disableEscapeKeyDown:!0,onClose(e,a){"backdropClick"!==a&&D()},children:[(0,n.jsx)(s.Z,{id:"form-dialog-title",children:(0,n.jsxs)(x.ZP,{container:!0,spacing:6,children:[(0,n.jsx)(x.ZP,{item:!0,xs:12,md:6,children:P}),1===L.papelID&&(0,n.jsx)(x.ZP,{item:!0,xs:12,md:6,sx:{textAlign:"right"},children:(0,n.jsx)(y.Z,{data:null!=z?z:[]})})]})}),(0,n.jsx)(d.Z,{children:(0,n.jsxs)(u.Z,{sx:{mb:3},children:[!H(null!==(a=null==S?void 0:S.departamentos)&&void 0!==a?a:[])&&(0,n.jsx)(p.Z,{severity:"warning",sx:{mb:4},children:(0,n.jsx)(h.Z,{variant:"body2",children:"Seu departamento n\xe3o est\xe1 habilitado para concluir este formul\xe1rio!"})}),E<=40&&(0,n.jsxs)(n.Fragment,{children:[Q&&Q.status&&(0,n.jsxs)(p.Z,{variant:"outlined",severity:"error",sx:{mt:2},children:["Por favor, verifique os campos abaixo:",(0,n.jsx)(h.Z,{variant:"subtitle1",color:"error",sx:{mt:2},children:Q.errors.map((e,a)=>(0,n.jsxs)(h.Z,{variant:"body2",color:"error",children:["- ",e]},a))})]}),Q&&2==L.papelID&&!Q.status&&(0,n.jsx)(p.Z,{severity:"info",sx:{mt:2},children:2==R.quemPreenche&&"fornecedor"==K?"Ap\xf3s concluir o formul\xe1rio, o mesmo ser\xe1 enviado para an\xe1lise e conclus\xe3o da empresa ".concat(null==R?void 0:R.nomeFantasia,"!"):"Ap\xf3s concluir o formul\xe1rio, o mesmo n\xe3o poder\xe1 mais ser alterado!"}),1==L.papelID&&(0,n.jsx)(x.ZP,{container:!0,spacing:4,sx:{mt:4},children:(0,n.jsx)(x.ZP,{item:!0,xs:12,children:(0,n.jsx)(j.Z,{title:1==L.papelID?"Avalia\xe7\xe3o final da n\xe3o conformidade:":"Observa\xe7\xe3o",name:"status",value:U,form:t,setResult:G,papelID:L.papelID,hasNaoConformidade:_,options:[{value:80,color:"success",label:"Aceite"},{value:90,color:"error",label:"N\xe3o Aceite"}]})})}),"recebimentoMpNaoConformidade"==K&&(0,n.jsx)(A,{data:M,form:t,setValidParams:T})]}),E>=40&&(0,n.jsx)(h.Z,{variant:"body1",sx:{mt:2},children:"Concluir n\xe3o conformidades do formul\xe1rio? Ap\xf3s concluir, o mesmo n\xe3o poder\xe1 mais ser alterado!"})]})}),(0,n.jsx)(c.Z,{className:"dialog-actions-dense",children:(0,n.jsxs)("div",{className:"flex items-center gap-2 p-2",children:[F&&(0,n.jsx)(l.Z,{variant:"outlined",color:"primary",onClick:D,children:"Fechar"}),I&&V&&(0,n.jsx)(v.z6,{document:(0,n.jsx)(ee,{}),children(e){let{blob:a,url:t,loading:r,error:i}=e;return(0,n.jsx)(l.Z,{variant:"contained",disabled:!W||!H(null!==(o=null==S?void 0:S.departamentos)&&void 0!==o?o:[])||E<40&&(Q&&Q.status||1==L.papelID&&!U.status),color:"primary",onClick(){N(U,a)},children:"Concluir"})}})]})})]})})};var E=N},12570:function(e,a,o){var n=o(85893),t=o(29308),r=o(84220),l=o(50287);let i=e=>{let{form:a,fields:o,disabled:i,getAddressByCep:s}=e,d=e=>{switch(e){case"telefone":case"telefone1":case"telefone2":return"telefone";case"cep":return"cep";case"cnpj":return"cnpj";default:return null}},c=e=>!!i&&i.length>0&&i.includes(e);return o&&o.map((e,o)=>{var u,m,x;return(0,n.jsxs)(n.Fragment,{children:[e&&"int"===e.tipo&&e.tabela&&(0,n.jsx)(r.Z,{xs:12,md:4,title:e.nomeCampo,name:"header.fields[".concat(o,"].").concat(e.tabela),type:e.tabela,options:e.options,value:null==e?void 0:e[e.tabela],mask:e.tabela,disabled:i||c(e.nomeColuna),alertRequired:1===e.obrigatorio,form:a},"select-".concat(o)),e&&"date"==e.tipo&&(0,n.jsx)(l.Z,{xs:12,md:4,title:"Data da avalia\xe7\xe3o",disabled:i||c(e.nomeColuna),value:null!==(u=null==e?void 0:e[e.nomeColuna])&&void 0!==u?u:new Date,type:e.nomeColuna,name:"header.fields[".concat(o,"].").concat(e.nomeColuna),typeValidation:"dataPassado",daysValidation:365,alertRequired:1===e.obrigatorio,form:a},"datefield-".concat(o)),e&&"string"==e.tipo&&(0,n.jsx)(t.Z,{xs:12,md:4,title:e.nomeCampo,name:"header.fields[".concat(o,"].").concat(e.nomeColuna),value:null!==(m=null==e?void 0:e[e.nomeColuna])&&void 0!==m?m:"",type:e.nomeColuna,getAddressByCep:s,mask:d(e.nomeColuna),disabled:!!(i||c(e.nomeColuna))||"cnpj"==e.nomeColuna,required:1===e.obrigatorio,alertRequired:1===e.obrigatorio,form:a},"input-".concat(o)),e&&"text"==e.tipo&&(0,n.jsx)(t.Z,{xs:12,md:12,multiline:!0,rows:3,title:e.nomeCampo,name:"header.fields[".concat(o,"].").concat(e.nomeColuna),value:null!==(x=null==e?void 0:e[e.nomeColuna])&&void 0!==x?x:"",type:e.nomeColuna,getAddressByCep:s,mask:d(e.nomeColuna),disabled:!!(i||c(e.nomeColuna))||"cnpj"==e.nomeColuna,required:1===e.obrigatorio,alertRequired:1===e.obrigatorio,form:a},"input-".concat(o))]})})};a.Z=i},46099:function(e,a,o){o.d(a,{FU:function(){return i},IB:function(){return l},lz:function(){return r},n9:function(){return t}});let n=(e,a,o,n)=>{e.setError(a,{type:"manual",message:"Campo obrigat\xf3rio"}),n.errors.includes(o)||(n.errors.push(o),n.status=!0)},t=(e,a,o,t)=>{let r=e.getValues(a);r||n(e,a,o,t)},r=(e,a,o)=>{a&&Array.isArray(a)&&a.forEach((a,t)=>{let r=a.tabela?"header.fields[".concat(t,"].").concat(a.tabela):"header.fields[".concat(t,"].").concat(a.nomeColuna),l=e.getValues(r);1!==a.obrigatorio||l||n(e,r,a.nomeCampo,o)})},l=(e,a,o)=>{a&&Array.isArray(a)&&a.forEach((a,t)=>{a.itens.forEach((a,r)=>{var l;let i="blocos[".concat(t,"].itens[").concat(r,"].resposta"),s=e.getValues(i);(null==a?void 0:a.obrigatorio)!==1||s||n(e,i,null==a?void 0:a.nome,o);let d=null==a?void 0:a.resposta;(null==d?void 0:d.anexo)===1&&(null==d?void 0:null===(l=d.anexosSolicitados)||void 0===l?void 0:l.length)>0&&d.anexosSolicitados.forEach((l,i)=>{let s="blocos[".concat(t,"].itens[").concat(r,"].resposta.anexosSolicitados[").concat(i,"].anexos"),d=e.getValues(s)||[];1!==l.obrigatorio||d&&0!==d.length||n(e,s,"Anexo: ".concat(null==a?void 0:a.nome," / ").concat(null==l?void 0:l.nome),o)})})})},i=e=>({status:e.status,errors:[...e.errors]})}}]);