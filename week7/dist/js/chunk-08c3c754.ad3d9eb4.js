(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-08c3c754"],{"1dde":function(e,t,a){var o=a("d039"),c=a("b622"),r=a("2d00"),n=c("species");e.exports=function(e){return r>=51||!o((function(){var t=[],a=t.constructor={};return a[n]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"62b3":function(e,t,a){"use strict";a.r(t);a("b0c0");var o=a("7a23"),c={class:"container my-5"},r={class:"text-end"},n={class:"table align-middle"},s=Object(o["createVNode"])("thead",null,[Object(o["createVNode"])("tr",null,[Object(o["createVNode"])("th"),Object(o["createVNode"])("th",null,"品名"),Object(o["createVNode"])("th",{style:{width:"150px"}},"數量/單位"),Object(o["createVNode"])("th",{class:"text-end"},"單價")])],-1),l={key:0,class:"fas fa-spinner fa-pulse"},i=Object(o["createTextVNode"])(" x "),d={class:"input-group input-group-sm"},u={class:"input-group mb-3"},b={class:"input-group-text",id:"basic_addon2"},m={class:"text-end"},f=Object(o["createVNode"])("td",{colspan:"3",class:"text-end"},"總計",-1),p={class:"text-end"},h={class:"my-5 row justify-content-center"},O={class:"mb-3"},j=Object(o["createVNode"])("label",{for:"email",class:"form-label"},"Email",-1),g={class:"mb-3"},V=Object(o["createVNode"])("label",{for:"name",class:"form-label"},"收件人姓名",-1),v={class:"mb-3"},N=Object(o["createVNode"])("label",{for:"tel",class:"form-label"},"收件人電話",-1),y={class:"mb-3"},x=Object(o["createVNode"])("label",{for:"address",class:"form-label"},"收件人地址",-1),C={class:"mb-3"},k=Object(o["createVNode"])("label",{for:"message",class:"form-label"},"留言",-1),w={class:"text-end"};function S(e,t,a,S,I,B){var $,q=Object(o["resolveComponent"])("loading"),T=Object(o["resolveComponent"])("Field"),L=Object(o["resolveComponent"])("ErrorMessage"),U=Object(o["resolveComponent"])("Form");return Object(o["openBlock"])(),Object(o["createBlock"])("div",c,[Object(o["createVNode"])(q,{active:I.isLoading},null,8,["active"]),Object(o["createVNode"])("div",r,[Object(o["createVNode"])("button",{class:"btn btn-outline-danger",type:"button",onClick:t[1]||(t[1]=function(){return B.deleteAllCart&&B.deleteAllCart.apply(B,arguments)}),disabled:0===(null===($=I.cart.carts)||void 0===$?void 0:$.length)}," 清空購物車 ",8,["disabled"])]),Object(o["createVNode"])("table",n,[s,Object(o["createVNode"])("tbody",null,[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(I.cart.carts,(function(e){return Object(o["openBlock"])(),Object(o["createBlock"])("tr",{key:e.id},[Object(o["createVNode"])("td",null,[Object(o["createVNode"])("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:function(t){return B.deleteCart(e)},disabled:I.loadingStatus.deleteItem===e.id},[I.loadingStatus.deleteItem===e.id?(Object(o["openBlock"])(),Object(o["createBlock"])("i",l)):Object(o["createCommentVNode"])("",!0),i],8,["onClick","disabled"])]),Object(o["createVNode"])("td",null,Object(o["toDisplayString"])(e.product.title),1),Object(o["createVNode"])("td",null,[Object(o["createVNode"])("div",d,[Object(o["createVNode"])("div",u,[Object(o["withDirectives"])(Object(o["createVNode"])("input",{type:"number",min:"1",onBlur:function(t){return B.updateCart(e)},"onUpdate:modelValue":function(t){return e.qty=t},disabled:I.loadingStatus.loadingItem===e.id,class:"form-control"},null,40,["onBlur","onUpdate:modelValue","disabled"]),[[o["vModelText"],e.qty,void 0,{number:!0}]]),Object(o["createVNode"])("span",b,Object(o["toDisplayString"])(e.product.unit),1)])])]),Object(o["createVNode"])("td",m,Object(o["toDisplayString"])(e.final_total),1)])})),128))]),Object(o["createVNode"])("tfoot",null,[Object(o["createVNode"])("tr",null,[f,Object(o["createVNode"])("td",p,Object(o["toDisplayString"])(I.cart.final_total),1)])])]),Object(o["createVNode"])("div",h,[Object(o["createVNode"])(U,{ref:"form",class:"col-md-6",onSubmit:B.submitOrder},{default:Object(o["withCtx"])((function(e){var a,c=e.errors;return[Object(o["createVNode"])("div",O,[j,Object(o["createVNode"])(T,{id:"email",name:"信箱",type:"email",class:["form-control",{"is-invalid":c["信箱"]}],placeholder:"請輸入Email",rules:"email|required",modelValue:I.form.user.email,"onUpdate:modelValue":t[2]||(t[2]=function(e){return I.form.user.email=e})},null,8,["class","modelValue"]),Object(o["createVNode"])(L,{name:"信箱",class:"invalid-feedback"})]),Object(o["createVNode"])("div",g,[V,Object(o["createVNode"])(T,{id:"name",name:"收件人姓名",type:"text",class:["form-control",{"is-invalid":c["收件人姓名"]}],placeholder:"請輸入收件人姓名",rules:"required",modelValue:I.form.user.name,"onUpdate:modelValue":t[3]||(t[3]=function(e){return I.form.user.name=e})},null,8,["class","modelValue"]),Object(o["createVNode"])(L,{name:"收件人姓名",class:"invalid-feedback"})]),Object(o["createVNode"])("div",v,[N,Object(o["createVNode"])(T,{id:"tel",name:"收件人電話",type:"tel",class:["form-control",{"is-invalid":c["收件人電話"]}],placeholder:"請輸入收件人電話",rules:"length:8|required",modelValue:I.form.user.tel,"onUpdate:modelValue":t[4]||(t[4]=function(e){return I.form.user.tel=e})},null,8,["class","modelValue"]),Object(o["createVNode"])(L,{name:"收件人電話",class:"invalid-feedback"})]),Object(o["createVNode"])("div",y,[x,Object(o["createVNode"])(T,{id:"address",name:"收件人地址",type:"text",class:["form-control",{"is-invalid":c["收件人地址"]}],placeholder:"請輸入收件人地址",rules:"required",modelValue:I.form.user.address,"onUpdate:modelValue":t[5]||(t[5]=function(e){return I.form.user.address=e})},null,8,["class","modelValue"]),Object(o["createVNode"])(L,{name:"收件人地址",class:"invalid-feedback"})]),Object(o["createVNode"])("div",C,[k,Object(o["withDirectives"])(Object(o["createVNode"])("textarea",{name:"",id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":t[6]||(t[6]=function(e){return I.form.message=e})},null,512),[[o["vModelText"],I.form.message]])]),Object(o["createVNode"])("div",w,[Object(o["createVNode"])("button",{type:"submit",class:"btn btn-danger",disabled:0===(null===(a=I.cart.carts)||void 0===a?void 0:a.length)}," 送出訂單 ",8,["disabled"])])]})),_:1},8,["onSubmit"])])])}a("99af");var I={data:function(){return{cart:{},form:{user:{},message:""},isLoading:!1,loadingStatus:{loadingItem:"",deleteItem:""}}},methods:{getCart:function(){var e=this;this.isLoading=!0;var t="".concat("https://vue3-course-api.hexschool.io","/api/").concat("ethan","/cart");this.$http.get(t).then((function(t){t.data.success&&(e.cart=t.data.data),e.isLoading=!1}))},updateCart:function(e){var t=this;if(e.qty>0){this.loadingStatus.loadingItem=e.id;var a="".concat("https://vue3-course-api.hexschool.io","/api/").concat("ethan","/cart/").concat(e.id),o={product_id:e.product.id,qty:e.qty};this.$http.put(a,{data:o}).then((function(e){t.loadingStatus.loadingItem="",e.data.success&&t.getCart()}))}else this.$moshaToast("數量不可以小於1",{type:"danger",showIcon:!0,position:"bottom-right"})},deleteCart:function(e){var t=this;this.loadingStatus.deleteItem=e.id;var a="".concat("https://vue3-course-api.hexschool.io","/api/").concat("ethan","/cart/").concat(e.id);this.$http.delete(a).then((function(e){t.loadingStatus.deleteItem="",e.data.success&&t.getCart()}))},deleteAllCart:function(){var e=this;this.isLoading=!0;var t="".concat("https://vue3-course-api.hexschool.io","/api/").concat("ethan","/carts");this.$http.delete(t).then((function(t){t.data.success?e.getCart():(e.$moshaToast(t.data.message,{type:"danger",showIcon:!0,position:"bottom-right"}),e.isLoading=!1)}))},submitOrder:function(){var e=this,t="".concat("https://vue3-course-api.hexschool.io","/api/").concat("ethan","/order"),a=this.form;this.isProcessing=!0,this.$http.post(t,{data:a}).then((function(t){e.isProcessing=!1,t.data.success?(e.$moshaToast(t.data.message,{type:"success",showIcon:!0,position:"bottom-right"}),e.$refs.form.resetForm(),e.getCart()):e.$moshaToast(t.data.message,{type:"danger",showIcon:!0,position:"bottom-right"})}))}},created:function(){this.getCart()}};I.render=S;t["default"]=I},8418:function(e,t,a){"use strict";var o=a("c04e"),c=a("9bf2"),r=a("5c6c");e.exports=function(e,t,a){var n=o(t);n in e?c.f(e,n,r(0,a)):e[n]=a}},"99af":function(e,t,a){"use strict";var o=a("23e7"),c=a("d039"),r=a("e8b5"),n=a("861d"),s=a("7b0b"),l=a("50c4"),i=a("8418"),d=a("65f0"),u=a("1dde"),b=a("b622"),m=a("2d00"),f=b("isConcatSpreadable"),p=9007199254740991,h="Maximum allowed index exceeded",O=m>=51||!c((function(){var e=[];return e[f]=!1,e.concat()[0]!==e})),j=u("concat"),g=function(e){if(!n(e))return!1;var t=e[f];return void 0!==t?!!t:r(e)},V=!O||!j;o({target:"Array",proto:!0,forced:V},{concat:function(e){var t,a,o,c,r,n=s(this),u=d(n,0),b=0;for(t=-1,o=arguments.length;t<o;t++)if(r=-1===t?n:arguments[t],g(r)){if(c=l(r.length),b+c>p)throw TypeError(h);for(a=0;a<c;a++,b++)a in r&&i(u,b,r[a])}else{if(b>=p)throw TypeError(h);i(u,b++,r)}return u.length=b,u}})},b0c0:function(e,t,a){var o=a("83ab"),c=a("9bf2").f,r=Function.prototype,n=r.toString,s=/^\s*function ([^ (]*)/,l="name";o&&!(l in r)&&c(r,l,{configurable:!0,get:function(){try{return n.call(this).match(s)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=chunk-08c3c754.ad3d9eb4.js.map