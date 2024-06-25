(()=>{"use strict";var n={958:(n,o,r)=>{r.d(o,{A:()=>s});var e=r(354),t=r.n(e),a=r(314),i=r.n(a)()(t());i.push([n.id,"@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap);"]),i.push([n.id,":root {\n  --primary-color: rgb(17, 86, 102);\n  --primary-color-darker: rgb(9, 48, 56);\n}\n\n* {\n  box-sizing: border-box;\n  outline: 0;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  background: var(--primary-color);\n  font-family: 'Open sans', sans-serif;\n  font-size: 1.3em;\n  line-height: 1.5em;\n}\n\n.container {\n  max-width: 640px;\n  margin: 50px auto;\n  background: #fff;\n  padding: 20px;\n  border-radius: 10px;\n}\nh1 {\n  text-align: center;\n  margin-bottom: 40px;\n}\n.resultado {\n  font-size: 2em;\n  color: var(--primary-color);\n  font-weight: bold;\n  margin-bottom: 40px;\n  text-align: center;\n  letter-spacing: 3px;\n}\n.gerarCPF {\n  width: 100%;\n  background-color: #4caf50; /* Cor de fundo do botão */\n  border-radius: 15px;\n  box-shadow: none;\n  text-shadow: none;\n  font-size: 17px;\n  border: 2px solid #4caf50; /* Borda do botão */\n  color: #fff;\n  cursor: pointer;\n  padding: 10px 0; /* Espaçamento interno do botão */\n  margin-top: 20px; /* Espaçamento superior do botão */\n}\n.gerarCPF:hover {\n  background-color: #45a049; /* Cor de fundo do botão ao passar o mouse */\n  border-color: #45a049; /* Cor da borda do botão ao passar o mouse */\n}\n\n","",{version:3,sources:["webpack://./src/assets/css/style.css"],names:[],mappings:"AACA;EACE,iCAAiC;EACjC,sCAAsC;AACxC;;AAEA;EACE,sBAAsB;EACtB,UAAU;AACZ;;AAEA;EACE,SAAS;EACT,UAAU;EACV,gCAAgC;EAChC,oCAAoC;EACpC,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,gBAAgB;EAChB,aAAa;EACb,mBAAmB;AACrB;AACA;EACE,kBAAkB;EAClB,mBAAmB;AACrB;AACA;EACE,cAAc;EACd,2BAA2B;EAC3B,iBAAiB;EACjB,mBAAmB;EACnB,kBAAkB;EAClB,mBAAmB;AACrB;AACA;EACE,WAAW;EACX,yBAAyB,EAAE,0BAA0B;EACrD,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,eAAe;EACf,yBAAyB,EAAE,mBAAmB;EAC9C,WAAW;EACX,eAAe;EACf,eAAe,EAAE,iCAAiC;EAClD,gBAAgB,EAAE,kCAAkC;AACtD;AACA;EACE,yBAAyB,EAAE,4CAA4C;EACvE,qBAAqB,EAAE,4CAA4C;AACrE",sourcesContent:["@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap');\n:root {\n  --primary-color: rgb(17, 86, 102);\n  --primary-color-darker: rgb(9, 48, 56);\n}\n\n* {\n  box-sizing: border-box;\n  outline: 0;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  background: var(--primary-color);\n  font-family: 'Open sans', sans-serif;\n  font-size: 1.3em;\n  line-height: 1.5em;\n}\n\n.container {\n  max-width: 640px;\n  margin: 50px auto;\n  background: #fff;\n  padding: 20px;\n  border-radius: 10px;\n}\nh1 {\n  text-align: center;\n  margin-bottom: 40px;\n}\n.resultado {\n  font-size: 2em;\n  color: var(--primary-color);\n  font-weight: bold;\n  margin-bottom: 40px;\n  text-align: center;\n  letter-spacing: 3px;\n}\n.gerarCPF {\n  width: 100%;\n  background-color: #4caf50; /* Cor de fundo do botão */\n  border-radius: 15px;\n  box-shadow: none;\n  text-shadow: none;\n  font-size: 17px;\n  border: 2px solid #4caf50; /* Borda do botão */\n  color: #fff;\n  cursor: pointer;\n  padding: 10px 0; /* Espaçamento interno do botão */\n  margin-top: 20px; /* Espaçamento superior do botão */\n}\n.gerarCPF:hover {\n  background-color: #45a049; /* Cor de fundo do botão ao passar o mouse */\n  border-color: #45a049; /* Cor da borda do botão ao passar o mouse */\n}\n\n"],sourceRoot:""}]);const s=i},314:n=>{n.exports=function(n){var o=[];return o.toString=function(){return this.map((function(o){var r="",e=void 0!==o[5];return o[4]&&(r+="@supports (".concat(o[4],") {")),o[2]&&(r+="@media ".concat(o[2]," {")),e&&(r+="@layer".concat(o[5].length>0?" ".concat(o[5]):""," {")),r+=n(o),e&&(r+="}"),o[2]&&(r+="}"),o[4]&&(r+="}"),r})).join("")},o.i=function(n,r,e,t,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(e)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var A=0;A<n.length;A++){var p=[].concat(n[A]);e&&i[p[0]]||(void 0!==a&&(void 0===p[5]||(p[1]="@layer".concat(p[5].length>0?" ".concat(p[5]):""," {").concat(p[1],"}")),p[5]=a),r&&(p[2]?(p[1]="@media ".concat(p[2]," {").concat(p[1],"}"),p[2]=r):p[2]=r),t&&(p[4]?(p[1]="@supports (".concat(p[4],") {").concat(p[1],"}"),p[4]=t):p[4]="".concat(t)),o.push(p))}},o}},354:n=>{n.exports=function(n){var o=n[1],r=n[3];if(!r)return o;if("function"==typeof btoa){var e=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),t="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(e),a="/*# ".concat(t," */");return[o].concat([a]).join("\n")}return[o].join("\n")}},72:n=>{var o=[];function r(n){for(var r=-1,e=0;e<o.length;e++)if(o[e].identifier===n){r=e;break}return r}function e(n,e){for(var a={},i=[],s=0;s<n.length;s++){var c=n[s],A=e.base?c[0]+e.base:c[0],p=a[A]||0,d="".concat(A," ").concat(p);a[A]=p+1;var l=r(d),u={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==l)o[l].references++,o[l].updater(u);else{var f=t(u,e);e.byIndex=s,o.splice(s,0,{identifier:d,updater:f,references:1})}i.push(d)}return i}function t(n,o){var r=o.domAPI(o);return r.update(n),function(o){if(o){if(o.css===n.css&&o.media===n.media&&o.sourceMap===n.sourceMap&&o.supports===n.supports&&o.layer===n.layer)return;r.update(n=o)}else r.remove()}}n.exports=function(n,t){var a=e(n=n||[],t=t||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var s=r(a[i]);o[s].references--}for(var c=e(n,t),A=0;A<a.length;A++){var p=r(a[A]);0===o[p].references&&(o[p].updater(),o.splice(p,1))}a=c}}},659:n=>{var o={};n.exports=function(n,r){var e=function(n){if(void 0===o[n]){var r=document.querySelector(n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(n){r=null}o[n]=r}return o[n]}(n);if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");e.appendChild(r)}},540:n=>{n.exports=function(n){var o=document.createElement("style");return n.setAttributes(o,n.attributes),n.insert(o,n.options),o}},56:(n,o,r)=>{n.exports=function(n){var o=r.nc;o&&n.setAttribute("nonce",o)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var o=n.insertStyleElement(n);return{update:function(r){!function(n,o,r){var e="";r.supports&&(e+="@supports (".concat(r.supports,") {")),r.media&&(e+="@media ".concat(r.media," {"));var t=void 0!==r.layer;t&&(e+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),e+=r.css,t&&(e+="}"),r.media&&(e+="}"),r.supports&&(e+="}");var a=r.sourceMap;a&&"undefined"!=typeof btoa&&(e+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),o.styleTagTransform(e,n,o.options)}(o,n,r)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(o)}}}},113:n=>{n.exports=function(n,o){if(o.styleSheet)o.styleSheet.cssText=n;else{for(;o.firstChild;)o.removeChild(o.firstChild);o.appendChild(document.createTextNode(n))}}}},o={};function r(e){var t=o[e];if(void 0!==t)return t.exports;var a=o[e]={id:e,exports:{}};return n[e](a,a.exports,r),a.exports}r.n=n=>{var o=n&&n.__esModule?()=>n.default:()=>n;return r.d(o,{a:o}),o},r.d=(n,o)=>{for(var e in o)r.o(o,e)&&!r.o(n,e)&&Object.defineProperty(n,e,{enumerable:!0,get:o[e]})},r.o=(n,o)=>Object.prototype.hasOwnProperty.call(n,o),r.nc=void 0;class e{constructor(n){Object.defineProperty(this,"limpaCpf",{writable:!1,enumerable:!0,configurable:!1,value:n.replace(/\D+/g,"")})}isSequência(){return this.limpaCpf.charAt(0).repeat(this.limpaCpf.length)===this.limpaCpf}geraNovoCpf(){var n=this.limpaCpf.slice(0,-2),o=e.geraDigito(n),r=e.geraDigito(n+o);this.novoCPF=n+o+r}static geraDigito(n){var o=0,r=n.length+1;for(var e of n)o+=r*Number(e),r--;var t=11-o%11;return t<=9?String(t):"0"}valida(){return!!this.limpaCpf&&"string"==typeof this.limpaCpf&&11===this.limpaCpf.length&&!this.isSequência()&&(this.geraNovoCpf(),this.novoCPF===this.limpaCpf)}}var t,a,i=r(72),s=r.n(i),c=r(825),A=r.n(c),p=r(659),d=r.n(p),l=r(56),u=r.n(l),f=r(540),m=r.n(f),C=r(113),g=r.n(C),h=r(958),b={};b.styleTagTransform=g(),b.setAttributes=u(),b.insert=d().bind(null,"head"),b.domAPI=A(),b.insertStyleElement=m(),s()(h.A,b),h.A&&h.A.locals&&h.A.locals,t=new class{rand(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e8,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:999999999;return String(Math.floor(Math.random()*(o-n)+n))}formataCpf(n){return"".concat(n.slice(0,3),".").concat(n.slice(3,6),".").concat(n.slice(6,9),"-").concat(n.slice(9,11))}geraNovoCpf(){var n=this.rand(),o=e.geraDigito(n),r=n+o+e.geraDigito(n+o);return this.formataCpf(r)}},a=document.querySelector(".resultado"),document.getElementById("gerarCPF").addEventListener("click",(()=>{a.textContent=t.geraNovoCpf()}))})();
//# sourceMappingURL=bundle.js.map