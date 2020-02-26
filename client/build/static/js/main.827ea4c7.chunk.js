(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{127:function(e,t){},131:function(e,t,a){},132:function(e,t,a){},133:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),c=a(32),r=a.n(c),o=a(35),l=a(18),i=a(70),m=a(1),u="LOGIN",d="CHECK_LOGGED",p="LOGOUT",h="SOCKET_ID",g=a(16),f=a.n(g),v="".concat(window.location.protocol,"/api/v1/"),E="".concat(window.location.host),N=function(e,t){f.a.post(v+"register-user",e).then((function(e){t(e)}))},_=function(e,t){f.a.post(v+"login",e).then((function(e){t(e)}))},b=a(34),k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.localStorage.getItem("token"),t={};if(e){var a=e;t.token=a;(a=(a=a.replace("Bearer ","")).split("."))[0];var s=a[1];a[2];s=JSON.parse(b.Base64.decode(s)),t.userId=s.userId,t.firstName=s.firstName,t.lastName=s.lastName,t.email=s.email,f.a.defaults.headers.common.Authorization=e,t.logged=!0,localStorage.setItem("token",e)}return t},O={login:function(e,t){var a=this;return function(s){_({email:e,password:t},(function(e){var t=k(e.data);s(a.loginRequest(Object(m.a)({type:u},t)))}))}},loginRequest:function(e){return e},checkLogged:function(){var e=k();return Object(m.a)({type:d},e)},logout:function(){return{type:p}}},j={logged:!1,token:void 0,userId:"",firstName:"",lastName:"",email:""};var I={socketId:""};var y=Object(l.c)({auth:function(e,t){if("undefined"===typeof e)return j;switch(t.type){case u:e=Object(m.a)({},t);break;case d:t.token?e=Object(m.a)({},t):(e.token=void 0,e.logged=!1);break;case p:window.localStorage.removeItem("token"),f.a.defaults.headers.common.Authorization="",e.token=void 0,e.logged=!1}return e},s_socket:function(e,t){if("undefined"===typeof e)return I;switch(t.type){case h:e.socketId=t.socketId}return e}}),w={writeSocketId:function(e){return{type:h,socketId:e}}},S=Object(m.a)({},O,{},w),M=function(e){return Object(m.a)({},e)},C=Object(m.a)({},S),P=function(e){return Object(o.b)(M,C)(e)},x=a(13),L=a(12);var q=P((function(e){var t=Object(x.f)(),a=e.auth.logged;return n.a.createElement("div",{className:"header"},n.a.createElement("div",{className:"logo"},"Chatick"),a?n.a.createElement("div",{className:"actions"},n.a.createElement("a",{href:"#",onClick:function(a){a.preventDefault(),e.logout(),t.push("/")}},"Logout")):n.a.createElement("div",{className:"actions"},n.a.createElement(L.b,{to:"/registration"},"Sign Up")))})),G=a(4),F=a(6);var H=P((function(e){var t=Object(x.f)();Object(s.useEffect)((function(){e.auth.logged&&t.push("/chat")}),[e.auth.logged]);var a=Object(s.useState)({email:"",password:""}),c=Object(F.a)(a,2),r=c[0],o=c[1],l=function(e){o(Object(m.a)({},r,Object(G.a)({},e.target.name,e.target.value)))};return n.a.createElement("div",{className:"page-wrapper sign-in form"},n.a.createElement("div",{className:"form"},n.a.createElement("div",{className:"form__title"},"LOGIN"),n.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.login(r.email,r.password)}},n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"email"},"Email address"),n.a.createElement("input",{type:"email",className:"form-control",name:"email",id:"email",autoComplete:"username",placeholder:"Enter email",value:r.email,onChange:l}),n.a.createElement("small",{id:"emailHelp",className:"form-text text-muted"},"We'll never share your email with anyone else.")),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"password"},"Password"),n.a.createElement("input",{type:"password",className:"form-control",name:"password",id:"password",autoComplete:"current-password",placeholder:"Password",value:r.password,onChange:l})),n.a.createElement("div",{className:"form__buttons"},n.a.createElement("button",{type:"submit",className:"btn btn-primary w-100"},"Login")))))})),z=a(72);var D=P((function(e){var t=Object(x.f)(),a=Object(z.a)(),c=a.register,r=a.handleSubmit,o=(a.watch,a.errors,Object(s.useState)({firstName:"",lastName:"",email:"",password:""})),l=Object(F.a)(o,2),i=l[0],u=l[1],d=function(e){u(Object(m.a)({},i,Object(G.a)({},e.target.name,e.target.value)))};return n.a.createElement("div",{className:"page-wrapper sign-up"},n.a.createElement("div",{className:"form"},n.a.createElement("div",{className:"form__title"},"Registration"),n.a.createElement("form",{onSubmit:r((function(){N(i,(function(e){console.log(e)}))}))},n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"firstName"},"First Name"),n.a.createElement("input",{type:"text",className:"form-control",id:"firstName",name:"firstName",placeholder:"First Name",ref:c({required:!0}),onChange:d,value:i.firstName})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"lastName"},"Last Name"),n.a.createElement("input",{type:"text",className:"form-control",id:"lastName",name:"lastName",placeholder:"Last Name",onChange:d,value:i.lastName})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"email"},"Email address"),n.a.createElement("input",{type:"email",className:"form-control",id:"email",name:"email",autoComplete:"username",placeholder:"Enter email",onChange:d,value:i.email})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"password"},"Password"),n.a.createElement("input",{type:"password",className:"form-control",id:"password",name:"password",placeholder:"Password",autoComplete:"current-password",onChange:d,value:i.password})),n.a.createElement("div",{className:"form__buttons"},n.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Registration"),n.a.createElement("button",{onClick:function(){t.push("/")},className:"btn btn-dark"},"Cancel")))))})),R=a(5),T=a(20),U=a(21),B=a(23),J=a(22),K=a(24);var W={addSize:function(){document.querySelector("#app");var e=document.querySelector(".header"),t=document.querySelector(".chat__send-area"),a=document.querySelector(".page-wrapper"),s=document.querySelector(".chat .messages"),n=document.querySelector(".chat .chat__header");function c(){if(e&&t&&a&&s&&n){var c=e.clientHeight,r=t.clientHeight,o=n.clientHeight;a.style.paddingTop="".concat(c,"px"),s.style.height="calc(100% - ".concat(r+o,"px)")}}c(),window.addEventListener("resize",(function(){c()}))},scrollMessage:function(){var e=document.querySelector(".chat .messages");e&&(e.scrollTop=e.scrollHeight)}},A=a(17),V=a.n(A),Q=function(e){function t(){return Object(T.a)(this,t),Object(B.a)(this,Object(J.a)(t).apply(this,arguments))}return Object(K.a)(t,e),Object(U.a)(t,[{key:"render",value:function(){var e=this,t=this.props.messages.map((function(t,a){var s=!1;return s=t.userId===e.props.auth.userId,n.a.createElement("div",{key:a,className:s?"messages__item messages__item--my-message":"messages__item"},n.a.createElement("div",{className:"messages__photo"},n.a.createElement("img",{src:V.a,alt:""}),n.a.createElement("div",{className:"user-status user-status--online"})),n.a.createElement("div",{className:"messages__block"},n.a.createElement("div",{className:"messages__author"},t.firstName+" "+t.lastName,n.a.createElement("span",{className:"messages__time"},"8min")),n.a.createElement("div",{className:"messages__text"},t.message,n.a.createElement("div",{className:"messages__read-message"},n.a.createElement("i",{className:"icofont-check-alt"})))))}));return n.a.createElement("div",{className:"chat"},n.a.createElement("div",{className:"chat__header"},n.a.createElement("div",{className:"chat__head-text"},"@General chat"),n.a.createElement("div",{className:"chat__close"},n.a.createElement("i",{className:"icofont-close-line"}))),n.a.createElement("div",{className:"messages"},t),n.a.createElement("div",{className:"chat__send-area"},n.a.createElement("div",{className:"chat__typing"},n.a.createElement("span",null,"Petya and Valera are typing")),n.a.createElement("div",{className:"chat__textarea-wrap"},n.a.createElement("div",{className:"chat__expressionless"},n.a.createElement("i",{className:"icofont-expressionless"})),n.a.createElement("input",{type:"text",className:"chat__input-message",placeholder:"Enter your message",onChange:this.props.handleChange,value:this.props.state.messageInput,onKeyPress:this.props.keyPressed})),n.a.createElement("div",{className:"chat__send-message",onClick:function(){e.props.sendMessage()}},n.a.createElement("i",{className:"icofont-paper-plane"}))))}}]),t}(s.Component),X=P(function(e){function t(e){var a;return Object(T.a)(this,t),(a=Object(B.a)(this,Object(J.a)(t).call(this,e)))._isMounted=!1,a.keyPressed=function(e){"Enter"===e.key&&a.sendMessage()},a.handleChange=function(e){var t=a.state;t.messageInput=e.target.value.replace(/\n/g,""),a.setState(Object(m.a)({},t))},a.state={socketIdPrev:"",messageInput:"",messages:[]},a.props.socket.on("connect",(function(){})),a}return Object(K.a)(t,e),Object(U.a)(t,[{key:"componentDidMount",value:function(){var e=this;W.addSize(),this.props.auth.logged&&(this._isMounted=!0,this.props.socket.on("message",(function(t){var a=e.state;a.messages=[].concat(Object(R.a)(a.messages),[{message:t.messageInput,userId:t.userId,firstName:t.firstName,lastName:t.lastName}]),e._isMounted&&e.setState(Object(m.a)({},a)),W.scrollMessage()})),this.props.socket.id!==this.state.socketIdPrev&&this.props.socket.emit("getGeneralMessage"),this.props.socket.on("getGeneralMessage",(function(t){if(e.props.socket.id!==e.state.socketIdPrev){var a=e.state;a.socketIdPrev=e.props.socket.id,a.messages=t,e._isMounted&&e.setState(Object(m.a)({},a)),W.scrollMessage()}})))}},{key:"componentWillUnmount",value:function(e){this._isMounted=!1}},{key:"sendMessage",value:function(){if(""!==this.state.messageInput){this.props.socket.emit("message",{messageInput:this.state.messageInput,userId:this.props.auth.userId,firstName:this.props.auth.firstName,lastName:this.props.auth.lastName});var e=this.state;e.messageInput="",this.setState(Object(m.a)({},e))}}},{key:"render",value:function(){return n.a.createElement(Q,{messages:this.state.messages,state:this.state,auth:this.props.auth,handleChange:this.handleChange,keyPressed:this.keyPressed,sendMessage:this.sendMessage})}}]),t}(s.Component));var Y=P((function(e){var t=Object(s.useState)({users:[],usersOnline:[],socketId:"",socketIdPrev:""}),a=Object(F.a)(t,2),c=a[0],r=a[1];Object(s.useEffect)((function(){e.auth.logged&&(console.log(e.s_socket.socketId),e.socket.on("userConnect",(function(e){var t=c;t.usersOnline=[].concat(Object(R.a)(t.usersOnline),[{userId:e.userId,userSocketId:e.userSocketId}]),t.users=e.users,r(Object(m.a)({},t))})))}),[e.auth.logged,e.s_socket.socketId]);var o=c.users.map((function(e,t){return n.a.createElement(L.b,{key:t,to:"/chat/".concat(e._id,"/").concat(e.userSocketId)},n.a.createElement("div",{className:"users__item"},n.a.createElement("div",{className:"users__photo"},n.a.createElement("img",{src:V.a,alt:""}),n.a.createElement("div",{className:"user-status user-status--online"})),n.a.createElement("div",{className:"users__info"},n.a.createElement("div",{className:"users__name"},e.firstName," ",e.lastName,n.a.createElement("span",{className:"users__time"},"8min")),n.a.createElement("div",{className:"users__last-message"},"Hey last, can"))))}));return n.a.createElement("div",{className:"users"},n.a.createElement("div",{className:"users__profile"},n.a.createElement("div",{className:"users__item"},n.a.createElement("div",{className:"users__photo"},n.a.createElement("img",{src:V.a,alt:""}),n.a.createElement("div",{className:"user-status user-status--online"})),n.a.createElement("div",{className:"users__info"},n.a.createElement("div",{className:"users__name"},"Petya Maiko"),n.a.createElement("div",{className:"users__status-text"},"Status")),n.a.createElement("div",{className:"users__notification"},n.a.createElement("i",{className:"icofont-notification"})))),n.a.createElement("div",{className:"users__search"},n.a.createElement("input",{type:"text",className:"users__search-input",placeholder:"Search"})),o)})),Z=a(73),$=a.n(Z),ee=function(e){function t(e){var a;return Object(T.a)(this,t),(a=Object(B.a)(this,Object(J.a)(t).call(this,e)))._isMounted=!1,a.keyPressed=function(e){"Enter"===e.key&&a.sendMessage()},a.handleChange=function(e){var t=a.state;t.messageInput=e.target.value.replace(/\n/g,""),a.setState(Object(m.a)({},t))},a.state={socketIdPrev:"",messageInput:"",messages:[]},console.log(e.match.params.userId),a}return Object(K.a)(t,e),Object(U.a)(t,[{key:"componentDidMount",value:function(){var e=this;W.addSize(),this.props.auth.logged&&(this._isMounted=!0,this.props.socket.on("message",(function(t){var a=e.state;a.messages=[].concat(Object(R.a)(a.messages),[{message:t.messageInput,userId:t.userId,firstName:t.firstName,lastName:t.lastName}]),e._isMounted&&e.setState(Object(m.a)({},a)),W.scrollMessage()})),this.props.socket.id!==this.state.socketIdPrev&&this.props.socket.emit("getGeneralMessage"),this.props.socket.on("getGeneralMessage",(function(t){if(e.props.socket.id!==e.state.socketIdPrev){var a=e.state;a.socketIdPrev=e.props.socket.id,a.messages=t,e._isMounted&&e.setState(Object(m.a)({},a)),W.scrollMessage()}})))}},{key:"componentWillUnmount",value:function(e){this._isMounted=!1}},{key:"sendMessage",value:function(){if(""!==this.state.messageInput){this.props.socket.emit("message",{messageInput:this.state.messageInput,userId:this.props.auth.userId,firstName:this.props.auth.firstName,lastName:this.props.auth.lastName});var e=this.state;e.messageInput="",this.setState(Object(m.a)({},e))}}},{key:"render",value:function(){return n.a.createElement("div",null,"asd1")}}]),t}(s.Component),te=P(Object(x.h)(ee));var ae=P((function(e){var t=Object(x.f)(),a=Object(s.useState)({socket:void 0}),c=Object(F.a)(a,2),r=c[0],o=c[1];return Object(s.useEffect)((function(){if(e.auth.logged){var a=r;a.socket=$.a.connect(E),a.socket.on("connect",(function(){e.writeSocketId(a.socket.id)})),o(Object(m.a)({},a))}else t.push("/")}),[e.auth.logged]),void 0!==r.socket?n.a.createElement("div",{className:"page-wrapper chat-wrapper"},n.a.createElement("div",{className:"container-fluid h-100"},n.a.createElement("div",{className:"row h-100"},n.a.createElement("div",{className:"col-md-3 h-100 px-0"},n.a.createElement(Y,{socket:r.socket})),n.a.createElement("div",{className:"col-md-6 h-100 px-0"},n.a.createElement(x.c,null,n.a.createElement(x.a,{path:"/chat/:userId"},n.a.createElement(te,{socket:r.socket,useParams:x.g})),n.a.createElement(x.a,{path:"/chat"},n.a.createElement(X,{socket:r.socket})))),n.a.createElement("div",{className:"col-md-3 h-100 px-0"},n.a.createElement("div",{className:"details"}))))):n.a.createElement("div",null,"loading")}));var se=P((function(e){return Object(s.useEffect)((function(){e.checkLogged()}),[]),n.a.createElement(L.a,null,n.a.createElement(q,null),n.a.createElement(x.c,null,n.a.createElement(x.a,{path:"/chat",component:ae}),n.a.createElement(x.a,{path:"/registration",component:D}),n.a.createElement(x.a,{path:"/",component:H})))})),ne=(a(130),a(131),a(132),Object(l.d)(y,Object(l.a)(i.a)));r.a.render(n.a.createElement(o.a,{store:ne},n.a.createElement(se,null)),document.getElementById("app"))},17:function(e,t,a){e.exports=a.p+"static/media/ava.e4c49134.png"},74:function(e,t,a){e.exports=a(133)}},[[74,1,2]]]);
//# sourceMappingURL=main.827ea4c7.chunk.js.map