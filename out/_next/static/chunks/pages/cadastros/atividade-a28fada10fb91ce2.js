(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9288],{12504:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/cadastros/atividade",function(){return n(68043)}])},97415:function(e,t,n){"use strict";var s=n(85893),a=n(11163),o=n.n(a),c=n(67294),l=n(60664),i=n(49837),u=n(91359),r=n(79072),d=n(87536),h=n(86501),x=n(47842),f=n(45061),m=n(46749),p=n(86887),w=n(60565),D=n(83830),Z=n(29308),g=n(67569),j=n(41088),b=n(40039);let v=e=>{var t,n;let{id:a}=e,{title:v}=(0,c.useContext)(w.f),{setId:_}=(0,c.useContext)(D.X),[C,N]=(0,c.useState)(!1),[y,P]=(0,c.useState)(null),E=o(),S=a&&a>0?"edit":"new",I=E.pathname,{loggedUnity:O,user:k}=(0,c.useContext)(b.V),{startLoading:z,stopLoading:T}=(0,j.Z)(),{trigger:X,handleSubmit:q,reset:A,register:F,control:L,formState:{errors:M}}=(0,d.cI)(),R=async e=>{let t={...e,usuarioID:k.usuarioID,unidadeID:O.unidadeID};z();try{"new"===S?await l.h.post("".concat((0,m.g_)(I),"/new/insertData"),t).then(e=>{E.push("".concat((0,m.g_)(I))),_(e.data),h.ZP.success(m.OD.successNew)}):"edit"===S&&(await l.h.post("".concat(I,"/updateData/").concat(a),t),h.ZP.success(m.OD.successUpdate))}catch(n){n.response&&409===n.response.status?h.ZP.error(m.OD.errorRepeated):console.log(n)}finally{T()}},B=async()=>{try{await l.h.delete("".concat(I,"/").concat(a,"/").concat(k.usuarioID,"/").concat(O.unidadeID)),_(null),N(!1),h.ZP.success(m.OD.successDelete)}catch(e){e.response&&409===e.response.status?(h.ZP.error(m.OD.pendingDelete),N(!1)):console.log(e)}},H=async()=>{"new"==S&&P({fields:{nome:"",status:1}});try{let e="new"===S?"".concat((0,m.g_)(I),"/new/getData"):"".concat(I,"/getData/").concat(a);("new"===S||a>0)&&await l.h.post(e).then(e=>{P(e.data),console.log("\uD83D\uDE80 ~ response.data:",e.data),A(e.data)})}catch(t){console.log(t)}};return(0,c.useEffect)(()=>{console.log("getData: ",a),H(),"new"===S&&setTimeout(()=>{X()},300)},[a]),(0,s.jsxs)(s.Fragment,{children:[!y&&(0,s.jsx)(x.Z,{}),y&&(0,s.jsxs)("form",{onSubmit:q(R),children:[(0,s.jsx)(p.Z,{btnCancel:!0,btnSave:!0,btnNew:!0,handleSubmit:()=>q(R),btnDelete:"edit"===S,onclickDelete:()=>N(!0),type:S}),(0,s.jsx)(i.Z,{children:(0,s.jsxs)(u.Z,{children:[(0,s.jsx)("h1",{children:"hellloooooo"}),(0,s.jsxs)(r.ZP,{container:!0,spacing:5,children:[(0,s.jsx)(Z.Z,{xs:11,md:11,title:"Nome",name:"fields.nome",required:!0,control:L,errors:null==M?void 0:null===(t=M.fields)||void 0===t?void 0:t.nome}),(0,s.jsx)(g.Z,{xs:1,md:1,title:"Ativo",name:"fields.status",value:null==y?void 0:null===(n=y.fields)||void 0===n?void 0:n.status,typePage:S,register:F})]})]})})]}),(0,s.jsx)(f.Z,{text:"Tem certeza que deseja excluir?",title:"Excluir "+v.title,openModal:C,handleClose:()=>N(!1),handleSubmit:B,btnCancel:!0,btnConfirm:!0})]})};t.Z=v},93250:function(e,t,n){"use strict";var s=n(85893),a=n(49837),o=n(91359),c=n(69175);let l=e=>{let{result:t,columns:n,btnNew:l=!0,btnPrint:i=!0,btnBack:u,openModal:r,modaLog:d}=e;return(0,s.jsx)(a.Z,{children:(0,s.jsx)(o.Z,{sx:{pt:"0"},children:(0,s.jsx)(c.Z,{rows:t,columns:n,modaLog:d,buttonsHeader:{btnNew:l,btnPrint:i,btnBack:u,openModal:r}})})})};t.Z=l},68043:function(e,t,n){"use strict";n.r(t);var s=n(85893),a=n(67294),o=n(60664),c=n(93250),l=n(60565),i=n(83830),u=n(97415),r=n(47842),d=n(11163),h=n(46749);let x=()=>{let[e,t]=(0,a.useState)(null),n=(0,d.useRouter)(),x=n.pathname,{setTitle:f}=(0,a.useContext)(l.f),{id:m}=(0,a.useContext)(i.X);(0,a.useEffect)(()=>{let e=async()=>{await o.h.get(x).then(e=>{t(e.data),f({title:"Atividade",subtitle:{id:m,count:e.data.length,new:!1}})})};e()},[m]);let p=(0,h.OL)(x,[{title:"ID",field:"id",size:.1},{title:"Nome",field:"nome",size:.8},{headerName:"Status",field:{name:"status",cor:"cor"},size:.1}]);return(0,s.jsx)(s.Fragment,{children:e?m&&m>0?(0,s.jsx)(u.Z,{id:m}):(0,s.jsx)(c.Z,{result:e,columns:p}):(0,s.jsx)(r.Z,{})})};t.default=x}},function(e){e.O(0,[1797,5061,9525,9774,2888,179],function(){return e(e.s=12504)}),_N_E=e.O()}]);