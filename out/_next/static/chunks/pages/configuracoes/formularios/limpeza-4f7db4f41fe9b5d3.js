(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5596],{29295:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/configuracoes/formularios/limpeza",function(){return n(58669)}])},24527:function(e,t,n){"use strict";var s=n(85893),l=n(79072),i=n(49837),r=n(91359),a=n(61953),o=n(29630),c=n(21609),d=n(62097);let u=e=>{let{xs:t,md:n,icon:u,id:x,title:m,subtitle:f,action:h,handleClick:j,linkedsForms:p}=e,v=(0,d.Z)();return(0,s.jsx)(l.ZP,{item:!0,xs:t,md:n,children:(0,s.jsx)(i.Z,{sx:{"&:hover":{backgroundColor:"".concat(v.palette.action.hover)},height:"100%",display:"flex",flexDirection:"column"},onClick:j,className:"cursor-pointer shadow-xl transition-all",children:(0,s.jsx)(r.Z,{className:"text-center",sx:{flexGrow:1,display:"flex",flexDirection:"column",justifyContent:"center"},children:(0,s.jsxs)(a.Z,{display:"flex",flexDirection:"column",alignItems:"center",sx:{gap:3,padding:6},children:[(0,s.jsx)(c.Z,{icon:u,width:38,className:"text-[#F8D552]"}),(0,s.jsx)(o.Z,{variant:"h6",className:"!font-extrabold",children:m}),(0,s.jsx)(o.Z,{variant:"subtitle2",children:f}),(0,s.jsxs)("div",{className:"flex items-center gap-1",children:[(0,s.jsx)(c.Z,{icon:"new"==h?"icon-park-solid:add-one":"edit"==h?"grommet-icons:form-next-link":"tabler:select",width:16}),(0,s.jsx)(o.Z,{variant:"body2",color:"primary",children:"new"==h?"Criar novo":"edit"==h?"Acessar":"Selecionar"})]}),(e=>{if(!p)return;let t=p.find(t=>t===e);return!t})(x)&&(0,s.jsx)(o.Z,{variant:"body2",color:"error",children:"Formul\xe1rio n\xe3o vinculado"})]})})})})};t.Z=u},93250:function(e,t,n){"use strict";var s=n(85893),l=n(49837),i=n(91359),r=n(69175);let a=e=>{let{result:t,columns:n,btnNew:a=!0,btnPrint:o=!0,btnBack:c,openModal:d,modalLog:u}=e;return(0,s.jsx)(l.Z,{children:(0,s.jsx)(i.Z,{sx:{pt:"0"},children:(0,s.jsx)(r.Z,{rows:t,columns:n,modalLog:u,buttonsHeader:{btnNew:a,btnPrint:o,btnBack:c,openModal:d}})})})};t.Z=a},97245:function(e,t,n){"use strict";n.r(t);var s=n(85893),l=n(43816);let i=()=>(0,s.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,s.jsx)(l.Z,{btnBack:!0,btnNew:!0,type:"new"}),(0,s.jsxs)("div",{className:"flex flex-col items-center justify-center h-[80vh]",children:[(0,s.jsx)("p",{className:"text-3xl font-bold",children:"Nenhum formul\xe1rio cadastrado"}),(0,s.jsx)("p",{className:"opacity-50",children:"Clique no bot\xe3o novo para cadastrar o primeiro formul\xe1rio"}),(0,s.jsx)("img",{src:"/empty.svg",alt:"Nenhum formul\xe1rio cadastrado",className:"w-1/2 md:w-1/4"})]})]});t.default=i},49186:function(e,t,n){"use strict";n.r(t);var s=n(85893),l=n(79072);n(86501),n(47842),n(84220);var i=n(83830),r=n(40039);n(86887);var a=n(66136);n(21609);var o=n(67294);n(60664);var c=n(11163),d=n.n(c),u=n(24527),x=n(43816);let m=e=>{let{values:t}=e,{user:n,loggedUnity:c}=(0,o.useContext)(r.V),{setId:m}=(0,o.useContext)(i.X),[f,h]=(0,o.useState)([]),[j,p]=(0,o.useState)(null),[v,g]=(0,o.useState)(!1);d();let{settings:w}=(0,o.useContext)(a.J6);w.mode;let Z=e=>{m(e)};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(x.Z,{btnBack:!0,btnNew:!0,type:"new",partialRoute:!1}),(0,s.jsx)(l.ZP,{container:!0,spacing:4,children:t&&t.map((e,t)=>(0,s.jsx)(u.Z,{xs:12,md:3,icon:"fluent:form-multiple-48-regular",title:e.nome,subtitle:"Ciclo de ".concat(e.ciclo," dias"),action:"edit",handleClick:()=>Z(e.id)},t))})]})};t.default=m},58669:function(e,t,n){"use strict";n.r(t);var s=n(85893),l=n(67294),i=n(60664);n(93250);var r=n(60565),a=n(83830),o=n(39028),c=n(47842),d=n(11163),u=n(64165),x=n(40039),m=n(49186),f=n(97245);let h=()=>{let[e,t]=(0,l.useState)(null),n=(0,d.useRouter)(),h=n.pathname,{setTitle:j}=(0,l.useContext)(r.f),{id:p,setId:v}=(0,l.useContext)(a.X),{loggedUnity:g}=(0,l.useContext)(x.V);return(0,l.useEffect)(()=>{let e=async()=>{console.log("getList"),await i.h.get("".concat(h,"/getList/").concat(g.unidadeID)).then(e=>{t(e.data),j({title:"Formul\xe1rios de Limpeza",subtitle:{id:p,count:e.data.length,new:!1}})})};e()},[p]),(0,u.OL)(h,[{title:"ID",field:"id",size:.2},{title:"Nome",field:"nome",size:.8}]),(0,s.jsx)(s.Fragment,{children:e?p&&p>0?(0,s.jsx)(o.Z,{id:p}):(0,s.jsxs)(s.Fragment,{children:[e&&e.length>0&&(0,s.jsx)(m.default,{values:e}),e&&0===e.length&&(0,s.jsx)(f.default,{})]}):(0,s.jsx)(c.Z,{show:!0})})};t.default=h}},function(e){e.O(0,[4738,8371,6887,5061,9525,2350,9028,9774,2888,179],function(){return e(e.s=29295)}),_N_E=e.O()}]);