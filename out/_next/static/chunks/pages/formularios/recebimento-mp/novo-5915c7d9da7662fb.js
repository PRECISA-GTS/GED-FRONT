(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1421],{5071:function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/formularios/recebimento-mp/novo",function(){return o(7224)}])},7224:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return j}});var n=o(85893);o(73113);var i=o(61953),r=o(54225),l=o(79072),a=o(86501),s=o(47842);o(84220);var c=o(83830),u=o(40039);o(86887);var d=o(66136),m=o(87536),f=o(21609),p=o(67294),h=o(60664),x=o(11163),b=o.n(x),g=o(24527);let _=()=>{let{user:e,loggedUnity:t}=(0,p.useContext)(u.V),{setId:o}=(0,p.useContext)(c.X),[x,_]=(0,p.useState)([]),[v,w]=(0,p.useState)(null),[j,D]=(0,p.useState)(!1),y=b(),{settings:C}=(0,p.useContext)(d.J6);C.mode;let{reset:I,register:k,getValues:E,setValue:Z,control:N,watch:P,handleSubmit:S,clearErrors:M,setError:X,formState:{errors:O}}=(0,m.cI)(),T=async n=>{try{let i={model:n.model,profissionalID:e.profissionalID,usuarioID:e.usuarioID,unidadeID:t.unidadeID},r=await h.h.post("/formularios/recebimento-mp/insertData",i);r&&(a.ZP.success("Novo formul\xe1rio criado!"),o(r.data.recebimentoMpID),y.push("/formularios/recebimento-mp/"))}catch(l){console.log(l)}},z=async()=>{try{D(!0);let e=await h.h.get("/formularios/recebimento-mp/getModels/".concat(t.unidadeID));console.log(e.data),1===e.data.length?T({model:e.data[0]}):(_(e.data),D(!1))}catch(o){console.log(o)}},F=async e=>{try{T({model:{id:e}})}catch(t){console.log(t)}};return(0,p.useEffect)(()=>{z()},[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.Z,{show:j}),(0,n.jsx)("form",{onSubmit:S(T),children:(0,n.jsxs)(i.Z,{display:"flex",flexDirection:"column",sx:{gap:4},children:[(0,n.jsx)("div",{children:(0,n.jsx)(r.Z,{onClick(){o(null),y.push("/formularios/recebimento-mp/")},type:"button",variant:"outlined",color:"primary",size:"medium",children:(0,n.jsx)(f.Z,{icon:"grommet-icons:form-previous-link"})})}),(0,n.jsx)(l.ZP,{container:!0,spacing:4,children:x&&x.length>1&&x.map((e,t)=>(0,n.jsx)(g.Z,{xs:12,md:3,icon:"fluent:form-multiple-48-regular",title:e.nome,action:"new",subtitle:"Ciclo de ".concat(e.ciclo," dias"),handleClick:()=>F(e.id)},t))})]})})]})};var v=o(60565);let w=()=>{let{setTitle:e}=(0,p.useContext)(v.f);return(0,p.useEffect)(()=>{e({title:"Recebimento de Mat\xe9ria Prima",subtitle:{id:null,count:null,new:!0}})},[]),(0,n.jsx)(_,{})};var j=w}},function(e){e.O(0,[1515,7842,7425,9937,2479,3859,3113,9774,2888,179],function(){return e(e.s=5071)}),_N_E=e.O()}]);