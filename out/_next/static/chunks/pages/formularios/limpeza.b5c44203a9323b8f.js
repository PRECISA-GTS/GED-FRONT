(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1132],{94156:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/formularios/limpeza",function(){return a(6530)}])},30025:function(e,t,a){"use strict";a.r(t);var n=a(85893),i=a(67294),s=a(60664),u=a(93250),l=a(60565),d=a(40039),r=a(47842),o=a(11163),c=a(71798),f=a(30944),m=a(13529);let p=()=>{let{user:e,loggedUnity:t}=(0,i.useContext)(d.V),a=(0,o.useRouter)(),p=a.pathname,{setTitle:h}=(0,i.useContext)(l.f),{startFilter:x,setFilteredDataRecebimentoMP:D,filteredDataRecebimentoMP:I,setDataRecebimentoMP:_}=(0,f.L0)(),[z,N]=(0,i.useState)({module:"limpeza",type:"open"}),w=async()=>{await s.hi.post("".concat(p,"/getList"),{unidadeID:t.unidadeID,papelID:e.papelID,usuarioID:e.usuarioID,status:z}).then(e=>{D(e.data),_(e.data),h({icon:"carbon:clean",title:"Limpeza e Higieniza\xe7\xe3o",subtitle:{id:null,count:e.data.length,new:!1}})})};(0,i.useEffect)(()=>{w(),x((0,n.jsx)(m.default,{}),!1)},[a.query,z]);let j=(0,c.OL)(p,[{headerName:"ID",field:"id",size:.4,variant:"naoConformidade"},{headerName:"Data Inicial",field:"dataInicio",size:.4,type:"date"},{headerName:"Data Final",field:"dataFim",size:.4,type:"date"},{headerName:"Departamento",field:"departamento",size:1},{headerName:"Setor",field:"setor",size:1},{headerName:"Status",field:{name:"status",cor:"cor"},size:.5,type:"statusSteps"}]);return(0,n.jsx)(n.Fragment,{children:I?(0,n.jsx)(u.Z,{result:I,columns:j,status:z,setStatus:N},I):(0,n.jsx)(r.Z,{show:!0})})};t.default=p},6530:function(e,t,a){"use strict";a.r(t);var n=a(85893),i=a(67294),s=a(83830),u=a(83097),l=a(28871),d=a(30025);let r=()=>{let{id:e,idNc:t}=(0,i.useContext)(s.X);return(0,n.jsx)(n.Fragment,{children:e&&t?(0,n.jsx)(u.Z,{id:t,limpezaID:e,modelID:null}):e&&!t?(0,n.jsx)(l.Z,{modelID:null}):(0,n.jsx)(d.default,{})})};t.default=r}},function(e){e.O(0,[4738,4186,1445,1111,5999,172,2187,137,5698,3005,8449,1509,5217,3097,8871,9774,2888,179],function(){return e(e.s=94156)}),_N_E=e.O()}]);