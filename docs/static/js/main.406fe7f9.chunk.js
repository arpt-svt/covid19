(this.webpackJsonpcovid=this.webpackJsonpcovid||[]).push([[0],{70:function(e,a,t){e.exports=t(86)},75:function(e,a,t){},76:function(e,a,t){},86:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(25),l=t.n(c),o=(t(75),t(56)),s=t(22),m=t(104),i=t(64),u=t(101),d=t(61),E=t(40),f=t(9),v=t(99),b=t(100),g=t(103),h=t(41),p=t(7),N=(t(76),[Object(v.a)({title:"Country",mapDataToValue:function(e){return e.Country}}),Object(b.a)({title:"Confirmed",mapDataToValue:function(e){return e.TotalConfirmed}}),Object(b.a)({title:"Recovered",mapDataToValue:function(e){return e.TotalRecovered}}),Object(b.a)({title:"Deceased",mapDataToValue:function(e){return e.TotalDeaths}})]);var w=function(){var e=Object(n.useState)([]),a=Object(s.a)(e,2),t=a[0],c=a[1],l=Object(n.useState)([]),v=Object(s.a)(l,2),b=v[0],w=v[1],j=Object(n.useState)(""),y=Object(s.a)(j,2),O=y[0],C=y[1],T=Object(n.useState)(!1),D=Object(s.a)(T,2),x=D[0],R=D[1],S=Object(p.b)(),k=Object(s.a)(S,1)[0],V=k({marginTop:"25px",marginBottom:"10px"}),B=k({marginTop:"6px"});Object(n.useEffect)((function(){var e=[];fetch("https://api.covid19api.com/summary").then((function(e){return e.json()})).then((function(a){console.log(a);var t,n=Object(o.a)(a.Countries);try{for(n.s();!(t=n.n()).done;){var r=t.value;""!==r.Country&&("india"===r.Slug&&(console.log(r),w(r)),e.push({id:r.Slug,data:r}))}}catch(s){n.e(s)}finally{n.f()}var l=i.a(a.Date);C(l),c(e)}),(function(e){R(!0)}))}),[]);var I=r.a.createElement(m.a,null),A=r.a.createElement("div",{className:k({justifyContent:"center",display:"flex"})},r.a.createElement(m.a,{size:"100px"}));return b.length!=={}&&(I=r.a.createElement("div",{className:k({width:"95vw",margin:"auto"})},r.a.createElement(f.d,{color:"green",className:B},"Last Updated about ",O),r.a.createElement(f.a,{className:V},r.a.createElement("span",{role:"img","aria-label":"flag"},"\ud83c\uddee\ud83c\uddf3"),"India"),r.a.createElement("div",{className:k({justifyContent:"space-between",display:"flex"})},r.a.createElement("div",null,r.a.createElement(f.b,{color:"red",className:B},"Confirmed"),r.a.createElement(f.b,{color:"red",className:B},b.TotalConfirmed),r.a.createElement(f.d,{color:"red",className:B},"[",b.NewConfirmed&&"+",b.NewConfirmed,"]")),r.a.createElement("div",null,r.a.createElement(f.b,{color:"green",className:B},"Recovered"),r.a.createElement(f.b,{color:"green",className:B},b.TotalRecovered),r.a.createElement(f.d,{color:"green",className:B},"[",b.NewRecovered&&"+",b.NewRecovered,"]")),r.a.createElement("div",null,r.a.createElement(f.b,{color:"gray",className:B},"Deceased"),r.a.createElement(f.b,{color:"gray",className:B},b.TotalDeaths),r.a.createElement(f.d,{color:"gray",className:B},"[",b.NewDeaths&&"+",b.NewDeaths,"]"))),r.a.createElement(f.a,{className:V},"All Countries"))),t.length>0&&(A=r.a.createElement("div",{className:k({height:"85vh"})},r.a.createElement(g.a,{columns:N,rows:t}))),r.a.createElement("div",null,r.a.createElement(u.a,null,r.a.createElement(d.b,{$align:E.a.center},r.a.createElement(d.a,null,r.a.createElement(h.a,{className:k({textDecoration:"None"}),href:"/"},"COVID-19 TRACKER")))),I,A,x&&r.a.createElement(f.b,{className:B},"Something went wrong. Please try again"),r.a.createElement("div",{className:k({justifyContent:"center",display:"flex",marginTop:"20px",marginBottom:"20px"})},"Powered by\xa0",r.a.createElement(h.a,{href:"http://netmusk.com",target:"_blank",color:"blue"},"NetMusk")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var j=t(63),y=t(16),O=t(102),C=t(87),T=new j.a;l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y.a,{value:T},r.a.createElement(O.a,{theme:C.a},r.a.createElement(w,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[70,1,2]]]);
//# sourceMappingURL=main.406fe7f9.chunk.js.map