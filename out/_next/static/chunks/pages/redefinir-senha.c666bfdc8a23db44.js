(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4199],{91359:function(e,r,o){"use strict";o.d(r,{Z:function(){return v}});var s=o(87462),n=o(63366),t=o(67294),i=o(86010),a=o(94780),d=o(67074),l=o(78884),u=o(1588),c=o(34867);function w(e){return(0,c.Z)("MuiCardContent",e)}(0,u.Z)("MuiCardContent",["root"]);var m=o(85893);let f=["className","component"],h=e=>{let{classes:r}=e;return(0,a.Z)({root:["root"]},w,r)},x=(0,d.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,r)=>r.root})(()=>({padding:16,"&:last-child":{paddingBottom:24}})),p=t.forwardRef(function(e,r){let o=(0,l.Z)({props:e,name:"MuiCardContent"}),{className:t,component:a="div"}=o,d=(0,n.Z)(o,f),u=(0,s.Z)({},o,{component:a}),c=h(u);return(0,m.jsx)(x,(0,s.Z)({as:a,className:(0,i.Z)(c.root,t),ownerState:u,ref:r},d))});var v=p},49837:function(e,r,o){"use strict";o.d(r,{Z:function(){return Z}});var s=o(87462),n=o(63366),t=o(67294),i=o(86010),a=o(94780),d=o(67074),l=o(78884),u=o(70918),c=o(1588),w=o(34867);function m(e){return(0,w.Z)("MuiCard",e)}(0,c.Z)("MuiCard",["root"]);var f=o(85893);let h=["className","raised"],x=e=>{let{classes:r}=e;return(0,a.Z)({root:["root"]},m,r)},p=(0,d.ZP)(u.Z,{name:"MuiCard",slot:"Root",overridesResolver:(e,r)=>r.root})(()=>({overflow:"hidden"})),v=t.forwardRef(function(e,r){let o=(0,l.Z)({props:e,name:"MuiCard"}),{className:t,raised:a=!1}=o,d=(0,n.Z)(o,h),u=(0,s.Z)({},o,{raised:a}),c=x(u);return(0,f.jsx)(p,(0,s.Z)({className:(0,i.Z)(c.root,t),elevation:a?8:void 0,ref:r,ownerState:u},d))});var Z=v},19261:function(e,r,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/redefinir-senha",function(){return o(47791)}])},47791:function(e,r,o){"use strict";o.r(r);var s=o(85893),n=o(67294),t=o(41664),i=o.n(t),a=o(60664),d=o(61953),l=o(54225),u=o(29630),c=o(58316),w=o(80562),m=o(91359),f=o(55343),h=o(39063),x=o(67074),p=o(62097),v=o(49837),Z=o(9041),g=o(39976),j=o(21609);o(30152);var P=o(88942),N=o(32414),C=o(41099),b=o(87536),y=o(11163),S=o.n(y),D=o(86501);let I=(0,x.ZP)(v.Z)(e=>{let{theme:r}=e;return{[r.breakpoints.up("sm")]:{width:"28rem"}}}),_=()=>{var e,r,o,t,x,v,P,y;let[_,k]=(0,n.useState)({showNewPassword:!1,showConfirmNewPassword:!1}),M=S(),R=M.query.type,{createNewNotification:A}=(0,n.useContext)(g.u);(0,p.Z)();let E=()=>{k({..._,showNewPassword:!_.showNewPassword})},q=e=>{e.preventDefault()},z=()=>{k({..._,showConfirmNewPassword:!_.showConfirmNewPassword})},W=e=>{e.preventDefault()},F=(0,b.cI)({}),G=e=>{let r=M.query.userId,o={senha:e.newPassword,usuarioID:r},s={titulo:"Redefini\xe7\xe3o de senha",descricao:"Sua senha senha foi redefinida com sucesso.",url:null,urlID:null,tipoNotificacaoID:2,usuarioGeradorID:null,usuarioID:o.usuarioID,papelID:1};a.h.post("/esqueceuSenha/newPassword",{data:o}).then(e=>{200===e.status?(D.Am.success("Senha redefinida com sucesso!"),M.push("login"===R?"/login":"/fornecedor"),A(s)):D.Am.error("Erro ao redefinir senha!")})};return(0,s.jsxs)(d.Z,{className:"content-center",children:[(0,s.jsx)(I,{sx:{zIndex:1},children:(0,s.jsxs)(m.Z,{sx:{p:e=>"".concat(e.spacing(15.5,7,8)," !important")},children:[(0,s.jsx)(d.Z,{sx:{mb:8,display:"flex",alignItems:"center",justifyContent:"center"},children:(0,s.jsx)(C.Z,{})}),(0,s.jsxs)(d.Z,{sx:{mb:6},children:[(0,s.jsx)(u.Z,{variant:"h5",sx:{mb:1.5,letterSpacing:"0.18px",fontWeight:600},children:"Redefinir senha \uD83D\uDD12"}),(0,s.jsx)(u.Z,{variant:"body2",children:"Sua nova senha deve ser diferente das senhas usadas anteriormente"})]}),(0,s.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:handleSubmit(G),children:[(0,s.jsxs)(f.Z,{fullWidth:!0,sx:{mb:4},children:[(0,s.jsx)(c.Z,{htmlFor:"auth-reset-password-new-password",color:(null===(e=F.formState)||void 0===e?void 0:null===(r=e.errors)||void 0===r?void 0:r.newPassword)?"error":"",children:"Nova senha"}),(0,s.jsx)(h.Z,{autoFocus:!0,label:"New Password",name:"newPassword",id:"auth-reset-password-new-password",type:_.showNewPassword?"text":"password",...F.register("newPassword",{required:!0,validate:e=>e.length>=4||"A senha deve conter no m\xednimo 4 d\xedgitos."}),error:null===(o=F.formState)||void 0===o?void 0:o.errors.newPassword,endAdornment:(0,s.jsx)(Z.Z,{position:"end",children:(0,s.jsx)(w.Z,{edge:"end",onClick:E,"aria-label":"toggle password visibility",onMouseDown:q,children:(0,s.jsx)(j.Z,{icon:_.showNewPassword?"mdi:eye-outline":"mdi:eye-off-outline"})})})}),(null===(t=F.formState)||void 0===t?void 0:t.errors.newPassword)&&(0,s.jsx)(u.Z,{variant:"caption",color:"error",children:null===(x=F.formState)||void 0===x?void 0:x.errors.newPassword.message})]}),(0,s.jsxs)(f.Z,{fullWidth:!0,sx:{mb:4},children:[(0,s.jsx)(c.Z,{htmlFor:"input-confirmNewPassword",color:(null==errors?void 0:errors.confirmNewPassword)?"error":"",children:"Confirme a senha"}),(0,s.jsx)(h.Z,{label:"Confirm Password",name:"confirmNewPassword",id:"auth-reset-password-confirm-password",type:_.showConfirmNewPassword?"text":"password",...register("confirmNewPassword",{required:!0,validate:{matchesPassword:e=>e===watch("newPassword")||"As senhas n\xe3o conferem.",minLength:e=>e.length>=4||"A senha deve conter no m\xednimo 4 d\xedgitos."}}),error:null===(v=F.formState)||void 0===v?void 0:v.errors.confirmNewPassword,endAdornment:(0,s.jsx)(Z.Z,{position:"end",children:(0,s.jsx)(w.Z,{edge:"end","aria-label":"toggle password visibility",onClick:z,onMouseDown:W,children:(0,s.jsx)(j.Z,{icon:_.showConfirmNewPassword?"mdi:eye-outline":"mdi:eye-off-outline"})})})}),(null===(P=F.formState)||void 0===P?void 0:P.errors.confirmNewPassword)&&(0,s.jsx)(u.Z,{variant:"caption",color:"error",children:null===(y=F.formState)||void 0===y?void 0:y.errors.confirmNewPassword.message})]}),(0,s.jsx)(l.Z,{fullWidth:!0,size:"large",type:"submit",variant:"contained",sx:{mb:5.25},children:"Definir nova senha"}),(0,s.jsx)(d.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:(0,s.jsxs)(u.Z,{component:i(),href:"login"===R?"/login":"/fornecedor",sx:{display:"flex","& svg":{mr:1.5},alignItems:"center",color:"primary.main",textDecoration:"none",justifyContent:"center"},children:[(0,s.jsx)(j.Z,{icon:"mdi:chevron-left",fontSize:"2rem"}),(0,s.jsx)("span",{children:"Volte ao login"})]})})]})]})}),(0,s.jsx)(N.Z,{})]})};_.getLayout=e=>(0,s.jsx)(P.Z,{children:e}),_.guestGuard=!0,r.default=_},32414:function(e,r,o){"use strict";var s=o(85893),n=o(61225),t=o(67074),i=o(62097);let a=(0,t.ZP)("img")(e=>{let{theme:r}=e;return{zIndex:-1,bottom:"7%",width:"100%",position:"absolute",[r.breakpoints.down("lg")]:{bottom:"10%"}}}),d=e=>{let{image:r}=e,o=(0,i.Z)(),t=(0,n.Z)(o.breakpoints.down("md")),d=r||"/images/pages/auth-v1-login-mask-".concat(o.palette.mode,".png");return t?null:(0,s.jsx)(a,{alt:"mask",src:d})};r.Z=d}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=19261)}),_N_E=e.O()}]);