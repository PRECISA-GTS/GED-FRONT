(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2752],{68374:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/formularios/recebimento-mp",function(){return t(75600)}])},86128:function(e,a,t){"use strict";t.d(a,{Z:function(){return d}});var n=t(85893),i=t(11163),s=t(67294);let o=(e,a)=>{a.push({pathname:a.pathname,query:{...null==a?void 0:a.query,aba:e}},void 0,{shallow:!0})},r=e=>{let{tabs:a,defaultTab:t}=e,r=(0,i.useRouter)(),[d,l]=(0,s.useState)(t),u=r.query.aba||t,c=e=>{l(e),o(e,r)};return(0,s.useEffect)(()=>{l(u)},[r.query.aba]),(0,n.jsxs)("div",{className:"flex flex-col w-full",children:[(0,n.jsx)("div",{className:"flex gap-2 mb-2",children:a.map(e=>(0,n.jsx)("button",{className:"py-4 px-20 border-b-2 ".concat(d===e.value?" border-[#4A8B57]":"border-transparent"),onClick:()=>c(e.value),children:(0,n.jsxs)("div",{className:"flex items-center gap-1 ",children:[e.icon&&(0,n.jsx)("div",{className:d===e.value?"text-[#4A8B57]":"",children:(0,n.jsx)(e.icon,{})}),(0,n.jsx)("p",{className:"text-[14px] ".concat(d===e.value?"text-[#4A8B57]":""," "),children:e.title})]})},e.value))}),(0,n.jsx)("div",{className:"tab-content",children:a.map(e=>(0,n.jsx)("div",{className:"tab-panel ".concat(d===e.value?"block":"hidden"),children:d===e.value&&e.content},e.value))})]})};var d=r},21196:function(e,a,t){"use strict";t.r(a);var n=t(85893),i=t(67294),s=t(60664),o=t(93250),r=t(60565),d=t(40039),l=t(47842),u=t(11163),c=t(71798),m=t(30944),f=t(63067);let p=()=>{let{user:e,loggedUnity:a}=(0,i.useContext)(d.V),t=(0,u.useRouter)(),p=t.pathname,{setTitle:h}=(0,i.useContext)(r.f),{startFilter:x,setFilteredDataRecebimentoMP:N,filteredDataRecebimentoMP:b,setDataRecebimentoMP:v}=(0,m.L0)(),[j,y]=(0,i.useState)({module:"recebimento-mp",type:"open"}),z=async()=>{await s.h.post("".concat(p,"/getList"),{unidadeID:a.unidadeID,papelID:e.papelID,usuarioID:e.usuarioID,status:j}).then(e=>{N(e.data),v(e.data),h({icon:"icon-park-outline:receive",title:"Recebimento de MP",subtitle:{id:null,count:e.data.length,new:!1}})})};(0,i.useEffect)(()=>{z(),x((0,n.jsx)(f.default,{}),!1)},[t.query,j]);let w=2==e.papelID?[{headerName:"ID",field:"id",size:.1,variant:"naoConformidade"},{headerName:"Data",field:"data",size:.1,type:"date"},{headerName:"F\xe1brica",field:"fabrica",size:.2},{headerName:"NF",field:"nf",size:1},{headerName:"Produtos",field:"produtos",size:1},{headerName:"Modelo",field:"modelo",size:.2},{headerName:"Status",field:{name:"status",cor:"cor"},size:.2,type:"statusSteps"}]:[{headerName:"ID",field:"id",size:.4,variant:"naoConformidade"},{headerName:"Data",field:"data",size:.4,type:"date"},{headerName:"Fornecedor",field:"fornecedor",size:1.5},{headerName:"NF",field:"nf",size:1},{headerName:"Produtos",field:"produtos",size:1},{headerName:"Modelo",field:"modelo",size:1},{headerName:"Status",field:{name:"status",cor:"cor"},size:1,type:"statusSteps"}],_=(0,c.OL)(p,w);return(0,n.jsx)(n.Fragment,{children:b?(0,n.jsx)(o.Z,{result:b,columns:_,status:j,setStatus:y},b):(0,n.jsx)(l.Z,{show:!0})})};a.default=p},75600:function(e,a,t){"use strict";t.r(a);var n=t(85893),i=t(67294),s=t(83830),o=t(41284),r=t(11163),d=t(21609),l=t(83197),u=t(86128),c=t(21196),m=t(73796);let f=()=>{let e=(0,r.useRouter)(),{id:a}=(0,i.useContext)(s.X),t=e.query.aba||"recebimento-mp",f=[{value:"recebimento-mp",title:"Recebimento de MP",icon:()=>(0,n.jsx)(d.Z,{icon:"icon-park-outline:receive"}),content:(0,n.jsx)(c.default,{})},{value:"nao-conformidade",title:"N\xe3o Conformidade",icon:()=>(0,n.jsx)(d.Z,{icon:"typcn:warning-outline"}),content:(0,n.jsx)(o.default,{})}];return(0,n.jsx)(n.Fragment,{children:a?(0,n.jsxs)(n.Fragment,{children:["recebimento-mp"===t&&(0,n.jsx)(m.Z,{id:a,model:null}),"nao-conformidade"===t&&(0,n.jsx)(l.Z,{id:a})]}):(0,n.jsx)(u.Z,{tabs:f,defaultTab:"recebimento-mp"})})};a.default=f}},function(e){e.O(0,[4738,4186,1445,1111,5999,172,2187,137,8163,5698,3005,3698,3545,7095,3796,3197,1284,9774,2888,179],function(){return e(e.s=68374)}),_N_E=e.O()}]);