(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4666],{64167:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return n(75369)}])},82747:function(e,t,n){"use strict";function r(e){if(!e||14!==(e=null==e?void 0:e.replace(/[^\d]+/g,"")).length||/^(\d)\1+$/.test(e))return!1;let t=e.length-2,n=e.substring(0,t),r=e.substring(t),s=0,o=t-7;for(let i=t;i>=1;i--)s+=n.charAt(t-i)*o--,o<2&&(o=9);let a=s%11<2?0:11-s%11;if(a!=r.charAt(0))return!1;t+=1,n=e.substring(0,t),s=0,o=t-7;for(let l=t;l>=1;l--)s+=n.charAt(t-l)*o--,o<2&&(o=9);return(a=s%11<2?0:11-s%11)==r.charAt(1)}function s(e){let t;if(!e||11!==(e=e.replace(/[^\d]+/g,"")).length||/^(\d)\1+$/.test(e))return!1;let n=0;for(let r=1;r<=9;r++)n+=parseInt(e.substring(r-1,r))*(11-r);if((10==(t=10*n%11)||11===t)&&(t=0),t!==parseInt(e.substring(9,10)))return!1;n=0;for(let s=1;s<=10;s++)n+=parseInt(e.substring(s-1,s))*(12-s);return(10==(t=10*n%11)||11===t)&&(t=0),t===parseInt(e.substring(10,11))}function o(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}n.d(t,{dI:function(){return o},sw:function(){return s},zk:function(){return r}})},41088:function(e,t,n){"use strict";var r=n(67294),s=n(83830);let o=()=>{let{isLoading:e,setIsLoading:t}=(0,r.useContext)(s.X),n=()=>{t(!0)},o=()=>{setTimeout(()=>{t(!1)},500)};return{isLoading:e,startLoading:n,stopLoading:o}};t.Z=o},75369:function(e,t,n){"use strict";n.r(t);var r=n(85893),s=n(67294),o=n(11163),i=n.n(o),a=n(41664),l=n.n(a),d=n(54225),u=n(75158),c=n(67836),p=n(80562),m=n(61953),x=n(55343),h=n(61225),f=n(67074),g=n(62097),b=n(32631),Z=n(9041),v=n(29630),j=n(22841),y=n(34175),w=n(82747),C=n(83830),k=n(21609),S=n(74231),I=n(87536),P=n(47533),D=n(17288),_=n(40039),F=n(19550),W=n(51514),z=n(30152),E=n(88942);n(34361);var N=n(66341),A=n(86501),B=n(41099);n(41088),(0,f.ZP)(m.Z)(e=>{let{theme:t}=e;return{padding:t.spacing(20),paddingRight:"0 !important",[t.breakpoints.down("lg")]:{padding:t.spacing(10)}}}),(0,f.ZP)("img")(e=>{let{theme:t}=e;return{maxWidth:"48rem",[t.breakpoints.down("xl")]:{maxWidth:"38rem"},[t.breakpoints.down("lg")]:{maxWidth:"30rem"}}});let L=(0,f.ZP)(m.Z)(e=>{let{theme:t}=e;return{width:"100%",[t.breakpoints.up("md")]:{maxWidth:400},[t.breakpoints.up("lg")]:{maxWidth:450}}}),q=(0,f.ZP)(m.Z)(e=>{let{theme:t}=e;return{width:"100%",[t.breakpoints.down("md")]:{maxWidth:400}}}),O=(0,f.ZP)(v.Z)(e=>{let{theme:t}=e;return{fontWeight:600,letterSpacing:"0.18px",marginBottom:t.spacing(1.5),[t.breakpoints.down("md")]:{marginTop:t.spacing(8)}}}),X=(0,f.ZP)(j.Z)(e=>{let{theme:t}=e;return{"& .MuiFormControlLabel-label":{fontSize:"0.875rem",color:t.palette.text.secondary}}}),M=S.Ry().shape({cpf:S.Z_().min(14,"O CPF deve ser preenchido completamente").required("O CPF \xe9 obrigat\xf3rio").test("valida-cpf","CPF inv\xe1lido",e=>(0,w.sw)(e)),password:S.Z_().min(4,"A senha deve conter no m\xednimo 4 digitos").required("A senha \xe9 obrigat\xf3ria")}),T={password:"",cpf:""},U=e=>{var t,n,o;let{units:a}=e,[f,j]=(0,s.useState)(!0),[w,S]=(0,s.useState)(!1),{openModalSelectUnits:E,setOpenModalSelectUnits:U,unitsUser:V,userAux:$,setLoggedUnity:Q,getRoutes:R,getMenu:G}=(0,s.useContext)(_.V),[J,H]=(0,s.useState)(!1),[K,Y]=(0,s.useState)({}),{setId:ee}=(0,s.useContext)(C.X),[et,en]=(0,s.useState)(null);i();let er=(0,D.a)(),es=(0,g.Z)();(0,F.Z)();let{settings:eo}=(0,W.r)(),ei=(0,h.Z)(es.breakpoints.down("md")),{skin:ea}=eo,el=(0,I.cI)({defaultValues:T,mode:"onBlur",resolver:(0,P.X)(M)}),ed=e=>{let{cpf:t,password:n}=e;Y(e),ee(null),er.login({cpf:t,password:n,rememberMe:f,verifyUnits:!0},e=>{el.setError("cpf",{type:"manual",message:"CPF e/ou senha inv\xe1lidos!"}),e&&e.response&&401===e.response.status&&A.Am.error("CPF e/ou senha inv\xe1lidos!")})},eu=()=>{H(!1),U(null)},ec=()=>{let{cpf:e,password:t}=K;H(!1),ee(null),Q(et),localStorage.setItem("loggedUnity",JSON.stringify(et)),G(et.papelID),R($.usuarioID,et.unidadeID,$.admin,et.papelID),er.login({cpf:e,password:t,rememberMe:f,verifyUnits:!1,selectedUnit:et},()=>{el.setError("cpf",{type:"manual",message:"CPF e/ou senha inv\xe1lidos!"})})};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(m.Z,{className:"content-right",children:[ei?null:(0,r.jsxs)(m.Z,{sx:{flex:1,display:"flex",position:"relative",alignItems:"center",justifyContent:"center"},children:[(0,r.jsx)("img",{src:"/images/storyset/login.svg",style:{height:"100vh"}}),(0,r.jsx)("img",{alt:"mask",src:"https://demos.pixinvent.com/materialize-nextjs-admin-template/demo-3/images/pages/misc-mask-light.png",className:"css-84vgca",style:{position:"absolute",zIndex:"-1",bottom:"0",left:"0",width:"100%"}})]}),(0,r.jsx)(L,{sx:"bordered"!==ea||ei?{}:{borderLeft:"1px solid ".concat(es.palette.divider)},children:(0,r.jsx)(m.Z,{sx:{p:7,height:"100%",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"background.paper"},children:(0,r.jsxs)(q,{children:[(0,r.jsx)(m.Z,{sx:{top:30,left:40,display:"flex",position:"absolute",alignItems:"center",justifyContent:"center"},children:(0,r.jsx)(B.Z,{})}),(0,r.jsxs)(m.Z,{sx:{mb:6},children:[(0,r.jsx)(O,{variant:"h6",sx:{fontWeight:600},children:"Bem-vindo ao ".concat(z.Z.templateName,"! \uD83D\uDC4B\uD83C\uDFFB")}),(0,r.jsx)(v.Z,{variant:"body2",children:"Digite seu CPF e senha para come\xe7ar"})]}),(0,r.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:el.handleSubmit(ed),children:[(0,r.jsxs)(x.Z,{fullWidth:!0,sx:{mb:4},children:[(0,r.jsx)(I.Qr,{name:"cpf",control:el.control,rules:{required:!0},render(e){var t;let{field:{value:n,onChange:s,onBlur:o}}=e;return(0,r.jsx)(c.Z,{autoFocus:!0,label:"CPF",value:(0,y.VL)(null!=n?n:""),onBlur:o,size:"small",onChange:s,error:Boolean(null===(t=el.formState)||void 0===t?void 0:t.errors.cpf),placeholder:"000.000.000-00",inputProps:{maxLength:14,type:"tel",inputMode:"numeric"}})}}),(null===(t=el.formState)||void 0===t?void 0:t.errors.cpf)&&(0,r.jsx)(b.Z,{sx:{color:"error.main"},children:null===(n=el.formState)||void 0===n?void 0:n.errors.cpf.message})]}),(0,r.jsxs)(x.Z,{fullWidth:!0,children:[(0,r.jsx)(I.Qr,{name:"password",control:el.control,rules:{required:!0},render(e){var t;let{field:n}=e;return(0,r.jsx)(c.Z,{...n,label:"Senha",variant:"outlined",size:"small",id:"auth-login-v2-password",error:Boolean(null===(t=el.formState)||void 0===t?void 0:t.errors.password),type:w?"text":"password",InputProps:{endAdornment:(0,r.jsx)(Z.Z,{position:"end",children:(0,r.jsx)(p.Z,{edge:"end",onMouseDown:e=>e.preventDefault(),onClick:()=>S(!w),children:(0,r.jsx)(k.Z,{icon:w?"mdi:eye-outline":"mdi:eye-off-outline",fontSize:20})})})}})}}),(null===(o=el.formState)||void 0===o?void 0:o.errors.password)&&(0,r.jsx)(b.Z,{sx:{color:"error.main"},id:"",children:"Campo obrigat\xf3rio"})]}),(0,r.jsxs)(m.Z,{sx:{mb:4,display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"space-between"},children:[(0,r.jsx)(X,{label:"Lembrar-me",control:(0,r.jsx)(u.Z,{checked:f,onChange:e=>j(e.target.checked)})}),(0,r.jsx)(v.Z,{variant:"body2",component:l(),href:"/esqueceu-sua-senha?type=login",sx:{color:"primary.main",textDecoration:"none"},children:"Esqueceu sua senha?"})]}),(0,r.jsx)(d.Z,{fullWidth:!0,size:"large",type:"submit",variant:"contained",sx:{mb:7},children:"Entrar"})]}),(0,r.jsxs)(m.Z,{sx:{display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"center"},children:[(0,r.jsx)(v.Z,{sx:{mr:2,color:"text.secondary"},children:"\xc9 um fornecedor?"}),(0,r.jsx)(v.Z,{href:"/fornecedor",component:l(),sx:{color:"primary.main",textDecoration:"none"},children:"Login"})]})]})})})]}),E&&(0,r.jsx)(N.Z,{openModal:E,handleClose:eu,handleSubmit:ec,unidades:V,setSelectedUnit:en})]})};U.getLayout=e=>(0,r.jsx)(E.Z,{children:e}),U.guestGuard=!0,t.default=U},34361:function(e,t,n){"use strict";n(85893),(0,n(67074).ZP)("img")(e=>{let{theme:t}=e;return{zIndex:-1,bottom:"7%",width:"100%",position:"absolute",[t.breakpoints.down("lg")]:{bottom:"17.5%"}}})}},function(e){e.O(0,[9491,9774,2888,179],function(){return e(e.s=64167)}),_N_E=e.O()}]);