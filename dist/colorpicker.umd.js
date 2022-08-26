!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("vue")):"function"==typeof define&&define.amd?define(["vue"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).ColorPicker=t(e.Vue)}(this,(function(e){"use strict";let t={hsb2rgb(e){var t={},l=Math.round(e.h),o=Math.round(255*e.s/100),n=Math.round(255*e.b/100);if(0==o)t.r=t.g=t.b=n;else{var r=n,a=(255-o)*n/255,i=l%60*(r-a)/60;360==l&&(l=0),l<60?(t.r=r,t.b=a,t.g=a+i):l<120?(t.g=r,t.b=a,t.r=r-i):l<180?(t.g=r,t.r=a,t.b=a+i):l<240?(t.b=r,t.r=a,t.g=r-i):l<300?(t.b=r,t.g=a,t.r=a+i):l<360?(t.r=r,t.g=a,t.b=r-i):(t.r=0,t.g=0,t.b=0)}return{r:Math.round(t.r),g:Math.round(t.g),b:Math.round(t.b),a:e.a}},hsba2rgba(e){const t=this.hsb2rgb(e);return`rgba(${t.r},${t.g},${t.b},${t.a})`},rgb2hex(e){var t=[e.r.toString(16),e.g.toString(16),e.b.toString(16)];return t.map((function(e,l){1==e.length&&(t[l]="0"+e)})),t.join("")},hex2rgb(e){let t=parseInt(e.indexOf("#")>-1?e.substring(1):e,16);return{r:t>>16,g:(65280&t)>>8,b:255&t}},hex2hsb(e){const t=this.hex2rgb(e);return t.a=1,this.rgba2hsba(t)},rgba2hsba(e){var t={h:0,s:0,b:0,a:e.a},l=Math.min(e.r,e.g,e.b),o=Math.max(e.r,e.g,e.b),n=o-l;return t.b=o,t.s=0!=o?255*n/o:0,0!=t.s?e.r==o?t.h=(e.g-e.b)/n:e.g==o?t.h=2+(e.b-e.r)/n:t.h=4+(e.r-e.g)/n:t.h=-1,t.h*=60,t.h<0&&(t.h+=360),t.s*=100/255,t.b*=100/255,t}};var l="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAA0VXHyAAAAM0lEQVQ4EWM8cuTIfwY8wMbGhhGPNAMTPkli5EYNYBgEgYg3jkHRSCidjEbjYIhGimMBAKIWB2rXs92IAAAAAElFTkSuQmCC",o=(e,t)=>{const l=e.__vccOpts||e;for(const[o,n]of t)l[o]=n;return l};const n=t=>(e.pushScopeId("data-v-0ada883e"),t=t(),e.popScopeId(),t),r={onselectstart:"return false"},a=["onContextmenu"],i={class:"activeMode-wrapper"},s=["onClick"],c=["onClick","onMousedown"],u=["onClick"],d={style:{"font-size":"10px",width:"36px","padding-left":"8px"}},p={class:"palette-wrapper"},v=["onClick"],f=n((()=>e.createElementVNode("div",{class:"white"},null,-1))),h=n((()=>e.createElementVNode("div",{class:"black"},null,-1))),g={class:"huebar-wrapper"},b={class:"bar-wrapper"},A=["onClick"],m=["onClick"],y=["onClick"],k={class:"preview-wrapper"},w={name:"vue3-colorpicker"};return o(Object.assign(w,{props:{mode:{type:String,required:!1,default:"solid"},degree:{type:Number,required:!1,default:90},color:{type:Object,required:!1,default:()=>({r:0,g:0,b:0,a:1})},gradients:{type:Object,required:!1,default:()=>[{percent:0,color:{r:255,g:255,b:255,a:1}},{percent:100,color:{r:0,g:0,b:0,a:1}}]},supportedModes:{type:Array,required:!1,default:()=>["solid","linear","radial"]},showOpacityPicker:{type:Boolean,required:!1,default:!0},showPanelOnly:{type:Boolean,required:!1,default:!1}},emits:["colorChanged"],setup(o,{expose:n,emit:w}){const E=o,M=e.ref(null),x=e.ref(null),C=e.ref(null),B=e.ref(null),N=e.ref(null),V=e.ref(null),$=e.ref(null),S=e.ref(null),P=e.ref(null),L=e.ref(null),O=e.ref(null),_=e.ref(!1),T=e.ref(0),I=e.ref(""),Y=e.ref(""),z=e.ref(""),j=e.ref(!0),q=e.reactive(t.rgba2hsba(E.color)),Q=e.ref(E.degree),X=e.ref(E.mode);let D=[];const G=e.ref(D);E.gradients.forEach(((e,l)=>{D.push({id:l,percent:e.percent,color:t.rgba2hsba(e.color)})})),G.value=D,D.length>0&&G.value[G.value.length-1].id;let R=!1,K=138,H=0,W=null;function F(e){if(X.value=e,"solid"!==X.value){G.value.forEach(((e,t)=>{P.value.children[t].style.left=1.41*e.percent-3+"px"})),function(){const e=10,t=4;let l=Q.value;l-360<0&&(l-=360);const o=-(l-90)*(Math.PI/180);O.value.style.left=Math.cos(o)*e+t+1+"px",O.value.style.top=-Math.sin(o)*e+t+1+"px"}();const e=G.value[T.value].color;q.h=e.h,q.s=e.s,q.b=e.b,q.a=e.a}de(),re(),ae()}async function U(){if(!W)return!1;W.open().then((e=>{const l=t.hex2hsb(e.sRGBHex);q.h=l.h,q.s=l.s,q.b=l.b,q.a=l.a,de()})).catch((e=>{}))}function J(){return!1}function Z(){var t,l,o;27==(null==(t=null==window?void 0:window.event)?void 0:t.keyCode)?_.value=!1:32!=(null==(l=null==window?void 0:window.event)?void 0:l.keyCode)&&8!=(null==(o=null==window?void 0:window.event)?void 0:o.keyCode)||G.value.length>2&&(G.value.splice(T.value,1),T.value=G.value.length-1,e.nextTick((()=>ae())))}function ee(e){let t=e.getBoundingClientRect(),l=e.ownerDocument,o=l.body,n=l.documentElement,r=n.clientTop||o.clientTop||0,a=n.clientLeft||o.clientLeft||0;return{top:t.top+(self.pageYOffset||n.scrollTop||o.scrollTop)-r,left:t.left+(self.pageXOffset||n.scrollLeft||o.scrollLeft)-a}}function te(){let e=0,t=0,l=window.event;return l.pageX?(e=l.pageX,t=l.pageY):(e=l.clientX+document.body.scrollLeft-document.body.clientLeft,t=l.clientY+document.body.scrollTop-document.body.clientTop),{x:e,y:t}}function le(){if(R)return R=!1,!1;function e(e){const t=ee(e),l=te();return!(l.x>t.left+e.offsetWidth||l.x<t.left||l.y>t.top+e.offsetHeight||l.y<t.top)}e(x.value)||e(M.value)||(_.value=!1)}function oe(e,t,l){function o(){R=!0,t(e,l)}document.addEventListener("mousemove",o,!1),document.addEventListener("mouseup",(function e(){document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",e)}),!1)}function ne(e,t){const l=ee(P.value),o=te();let n=Math.max(-3,Math.min(138,o.x-l.left-6));e.style.left=n+"px",G.value[t].percent=(n+3)/141*100,T.value=t;const r=G.value[t].color;q.h=r.h,q.s=r.s,q.b=r.b,q.a=r.a,de(),re(),ae()}function re(){"solid"!==X.value&&(G.value[T.value].color.a=q.a,G.value[T.value].color.h=q.h,G.value[T.value].color.s=q.s,G.value[T.value].color.b=q.b)}function ae(){const e=t.hsb2rgb(q);I.value=`rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`,Y.value=I.value;let o="",n="",r=[...G.value],a=[];r.sort(((e,t)=>e.percent-t.percent)),r.forEach((e=>{o+=","+t.hsba2rgba(e.color)+" "+e.percent+"%",a.push({percent:e.percent,color:t.hsb2rgb(e.color)})}));const i={};switch(i.mode=X.value,X.value){case"solid":i.color=t.hsb2rgb(q),i.css=`background-color:${t.hsba2rgba(q)}`;break;case"linear":z.value=`linear-gradient(to right,${o.slice(1)}),url('${l}')`,Y.value=`linear-gradient(${Q.value}deg${o}),url('${l}')`,n=`background-image:linear-gradient(${Q.value}deg${o})`,i.degree=Q.value,i.color=a,i.css=n;break;case"radial":z.value=`linear-gradient(to right,${o.slice(1)}),url('${l}')`,Y.value=`radial-gradient(${o.slice(1)}),url('${l}')`,n=`background-image:radial-gradient(${o.slice(1)})`,i.color=a,i.css=n}w("colorChanged",i)}function ie(){const e=ee(L.value),t=te(),l=Math.atan2(e.top+10-t.y,t.x-e.left-10);O.value.style.left=10*Math.cos(l)+4+1+"px",O.value.style.top=10*-Math.sin(l)+4+1+"px";let o=90-Math.floor(180*l/Math.PI);o<0&&(o+=360),Q.value=o,re(),ae()}function se(){const e=ee(C.value),t=te(),l=Math.max(-6,Math.min(t.x-e.left-6,210)),o=Math.max(-6,Math.min(t.y-e.top-6,132));B.value.style.left=l+"px",B.value.style.top=o+"px",q.s=100*(l+6)/216,q.b=100*(K-o-6)/K}function ce(){const e=ee($.value),l=te(),o=Math.max(-3,Math.min(l.x-e.left-6,138));N.value.style.left=o+"px",q.h=360*(o+3)/141;const n=t.hsb2rgb({h:q.h,s:100,b:100,a:q.a});C.value.style.background=`rgb(${n.r},${n.g},${n.b},1)`}function ue(){const e=ee(S.value),t=te(),l=Math.max(-3,Math.min(138,t.x-e.left-6));V.value.style.left=l+"px",q.a=(l+3)/141}function de(){const e=t.hsb2rgb({h:q.h,s:100,b:100,a:q.a});C.value.style.background=`rgb(${e.r},${e.g},${e.b},1)`,B.value.style.left=2.16*q.s-6+"px",B.value.style.top=K-1.38*q.b-6+"px",N.value.style.left=141/360*q.h-3+"px",E.showOpacityPicker.value&&(V.value.style.left=141*q.a-3+"px")}function pe(){_.value=!_.value}return"EyeDropper"in window?W=new EyeDropper:j.value=!1,e.onMounted((()=>{F(X.value),re(),ae()})),e.watch(q,(()=>{re(),ae()})),e.watch(_,(()=>{_.value?(document.addEventListener("click",le,!0),document.addEventListener("keyup",Z,!1)):(document.removeEventListener("click",le,!0),document.removeEventListener("keyup",Z,!1))})),n({openPanel:function(){_.value=!0},closePanel:function(){_.value=!1},togglePanel:pe}),(t,l)=>(e.openBlock(),e.createElementBlock("div",r,[o.showPanelOnly?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock("div",{key:0,class:"cbtn",onClick:pe,ref_key:"cbtnEl",ref:M},[e.createElementVNode("div",{class:"cbtn-inner",style:e.normalizeStyle({background:Y.value})},null,4)],512)),e.withDirectives(e.createElementVNode("div",{class:"panel",ref_key:"panelEl",ref:x,onContextmenu:e.withModifiers(J,["prevent"])},[e.createElementVNode("div",i,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.supportedModes,(t=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["btn-activeMode",[t,{gray:X.value!==t}]]),onClick:e.withModifiers((e=>F(t)),["stop"])},null,10,s)))),256))]),e.createElementVNode("div",{class:"grad-wrapper",style:e.normalizeStyle("solid"===X.value?"display:none":"")},[e.createElementVNode("div",{class:"grad-bar",ref_key:"gradBarEl",ref:P,style:e.normalizeStyle({backgroundImage:z.value}),onClick:l[0]||(l[0]=e.withModifiers((t=>function(){if(G.value.length<10){const t=JSON.parse(JSON.stringify(G.value[T.value]));t.id=H++,G.value.push(t),T.value=G.value.length-1,e.nextTick((()=>ne(P.value.children[T.value],T.value)))}}()),["stop"]))},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(G.value,((t,l)=>(e.openBlock(),e.createElementBlock("div",{key:t.id,style:{top:"-1px"},class:e.normalizeClass(["picker",l==T.value?"on":""]),onClick:e.withModifiers((e=>ne(e.target,l)),["stop"]),onMousedown:e.withModifiers((e=>oe(e.target,ne,l)),["stop"])},null,42,c)))),128))],4),e.createElementVNode("div",{class:"flex-row",style:e.normalizeStyle("linear"===X.value?"":"visibility:hidden")},[e.createElementVNode("div",{class:"degree",ref_key:"degreeEl",ref:L,onClick:e.withModifiers(ie,["stop"]),onMousedown:l[2]||(l[2]=e.withModifiers((e=>oe(e,ie)),["stop"]))},[e.createElementVNode("div",{class:"picker-deg",ref_key:"degreePickerEl",ref:O,onMousedown:l[1]||(l[1]=e.withModifiers((e=>oe(e,ie)),["stop"]))},null,544)],40,u),e.createElementVNode("div",d,e.toDisplayString(Q.value)+"°",1)],4)],4),e.createElementVNode("div",p,[e.createElementVNode("div",{class:"palette",ref_key:"paletteEl",ref:C,onClick:e.withModifiers(se,["stop"]),onMousedown:l[4]||(l[4]=e.withModifiers((e=>oe(e,se)),["stop"]))},[f,h,e.createElementVNode("div",{class:"picker",ref_key:"palettePickerEl",ref:B,onMousedown:l[3]||(l[3]=e.withModifiers((e=>oe(e,se)),["stop"]))},null,544)],40,v)]),e.createElementVNode("div",g,[e.createElementVNode("div",{class:"dropper",onClick:U,style:e.normalizeStyle([{cursor:"pointer"},j.value?"":"opacity: 50%;cursor:default"])},null,4),e.createElementVNode("div",b,[e.createElementVNode("div",{class:"hue-bar",ref_key:"hueBarEl",ref:$,onClick:e.withModifiers(ce,["stop"]),onMousedown:l[6]||(l[6]=e.withModifiers((e=>oe(e,ce)),["stop"]))},[e.createElementVNode("div",{class:"picker",ref_key:"huePickerEl",ref:N,style:{top:"-1px"},onMousedown:l[5]||(l[5]=e.withModifiers((e=>oe(e,ce)),["stop"]))},null,544)],40,A),o.showOpacityPicker?(e.openBlock(),e.createElementBlock("div",{key:0,class:"opacity-bar",ref_key:"opactiyBarEl",ref:S,onClick:e.withModifiers(ue,["stop"]),onMousedown:l[8]||(l[8]=e.withModifiers((e=>oe(e,ue)),["stop"]))},[e.createElementVNode("div",{class:"picker",ref_key:"opacityPickerEl",ref:V,style:{top:"-1px"},onClick:e.withModifiers(ue,["stop"]),onMousedown:l[7]||(l[7]=e.withModifiers((e=>oe(e,ue)),["stop"]))},null,40,y)],40,m)):e.createCommentVNode("",!0)]),e.createElementVNode("div",k,[e.createElementVNode("div",{class:"preview-color",style:e.normalizeStyle({background:I.value})},null,4)])])],40,a),[[e.vShow,o.showPanelOnly||_.value]])]))}}),[["__scopeId","data-v-0ada883e"]])}));
