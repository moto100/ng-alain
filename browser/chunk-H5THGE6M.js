import{c as Y,g as tt,o as nt,p as et,q as it}from"./chunk-JKNMULNH.js";import{$b as K,Ab as A,Fa as r,Ga as b,Ha as E,Ja as P,La as M,Ld as W,Mb as $,Oa as c,Pa as z,Qa as u,Ve as J,W as F,Wf as Q,Xa as l,Zb as H,_b as B,a as v,aa as L,ab as s,ac as U,ae as q,b as D,bb as p,bc as G,cb as d,da as I,db as N,dc as X,eb as T,ec as Z,fa as x,gb as y,k as w,ka as h,kb as _,la as C,mb as m,rb as V,sa as R,xa as O,yd as k,zb as j}from"./chunk-TGI3ELU4.js";function ot(i,o){i&1&&d(0,"span",17)}function at(i,o){i&1&&d(0,"span",18)}function ct(i,o){i&1&&d(0,"span",19)}function rt(i,o){i&1&&d(0,"span",20)}function st(i,o){if(i&1&&(N(0),d(1,"div",21),T()),i&2){let a=m(2);r(1),c("innerHTML",a.instance.title,O)}}function pt(i,o){if(i&1&&(N(0),d(1,"div",21),T()),i&2){let a=m(2);r(1),c("innerHTML",a.instance.content,O)}}function lt(i,o){}var ft=i=>({$implicit:i});function mt(i,o){if(i&1&&(s(0,"span",22),l(1,lt,0,0,"ng-template",23),p()),i&2){let a=o.ngIf,n=m(2);r(1),c("ngTemplateOutlet",a)("ngTemplateOutletContext",j(2,ft,n))}}function dt(i,o){if(i&1&&(s(0,"div",7)(1,"div",7)(2,"div"),N(3,8),l(4,ot,1,0,"span",9)(5,at,1,0,"span",10)(6,ct,1,0,"span",11)(7,rt,1,0,"span",12),T(),s(8,"div",13),l(9,st,2,1,"ng-container",14),p(),s(10,"div",15),l(11,pt,2,1,"ng-container",14),p(),l(12,mt,2,4,"span",16),p()()()),i&2){let a=m();r(2),u("ant-notification-notice-with-icon",a.instance.type!=="blank"),r(1),c("ngSwitch",a.instance.type),r(1),c("ngSwitchCase","success"),r(1),c("ngSwitchCase","info"),r(1),c("ngSwitchCase","warning"),r(1),c("ngSwitchCase","error"),r(2),c("nzStringTemplateOutlet",a.instance.title),r(2),c("nzStringTemplateOutlet",a.instance.content),r(1),c("ngIf",a.instance.options==null?null:a.instance.options.nzButton)}}function _t(i,o){}function ut(i,o){if(i&1&&(N(0),d(1,"span",24),T()),i&2){let a=o.$implicit;r(1),c("nzType",a)}}function gt(i,o){if(i&1&&(N(0),l(1,ut,2,1,"ng-container",14),T()),i&2){let a=m();r(1),c("nzStringTemplateOutlet",a.instance.options==null?null:a.instance.options.nzCloseIcon)}}function ht(i,o){i&1&&d(0,"span",25)}var Ct=(i,o)=>({$implicit:i,data:o});function zt(i,o){if(i&1){let a=y();s(0,"nz-notification",7),_("destroyed",function(t){h(a);let e=m();return C(e.remove(t.id,t.userAction))}),p()}if(i&2){let a=o.$implicit;c("instance",a)("placement","topLeft")}}function yt(i,o){if(i&1){let a=y();s(0,"nz-notification",7),_("destroyed",function(t){h(a);let e=m();return C(e.remove(t.id,t.userAction))}),p()}if(i&2){let a=o.$implicit;c("instance",a)("placement","topRight")}}function vt(i,o){if(i&1){let a=y();s(0,"nz-notification",7),_("destroyed",function(t){h(a);let e=m();return C(e.remove(t.id,t.userAction))}),p()}if(i&2){let a=o.$implicit;c("instance",a)("placement","bottomLeft")}}function Nt(i,o){if(i&1){let a=y();s(0,"nz-notification",7),_("destroyed",function(t){h(a);let e=m();return C(e.remove(t.id,t.userAction))}),p()}if(i&2){let a=o.$implicit;c("instance",a)("placement","bottomRight")}}function Tt(i,o){if(i&1){let a=y();s(0,"nz-notification",7),_("destroyed",function(t){h(a);let e=m();return C(e.remove(t.id,t.userAction))}),p()}if(i&2){let a=o.$implicit;c("instance",a)("placement","top")}}function It(i,o){if(i&1){let a=y();s(0,"nz-notification",7),_("destroyed",function(t){h(a);let e=m();return C(e.remove(t.id,t.userAction))}),p()}if(i&2){let a=o.$implicit;c("instance",a)("placement","bottom")}}var bt=(()=>{let o=class o extends it{constructor(n){super(n),this.destroyed=new P}ngOnDestroy(){super.ngOnDestroy(),this.instance.onClick.complete()}onClick(n){this.instance.onClick.next(n)}close(){this.destroy(!0)}get state(){if(this.instance.state==="enter")switch(this.placement){case"topLeft":case"bottomLeft":return"enterLeft";case"topRight":case"bottomRight":return"enterRight";case"top":return"enterTop";case"bottom":return"enterBottom";default:return"enterRight"}else return this.instance.state}};o.\u0275fac=function(t){return new(t||o)(b(E))},o.\u0275cmp=x({type:o,selectors:[["nz-notification"]],inputs:{instance:"instance",index:"index",placement:"placement"},outputs:{destroyed:"destroyed"},exportAs:["nzNotification"],features:[M],decls:8,vars:12,consts:[[1,"ant-notification-notice","ant-notification-notice-closable",3,"ngStyle","ngClass","click","mouseenter","mouseleave"],["class","ant-notification-notice-content",4,"ngIf"],[3,"ngIf","ngTemplateOutlet","ngTemplateOutletContext"],["tabindex","0",1,"ant-notification-notice-close",3,"click"],[1,"ant-notification-notice-close-x"],[4,"ngIf","ngIfElse"],["iconTpl",""],[1,"ant-notification-notice-content"],[3,"ngSwitch"],["nz-icon","","nzType","check-circle","class","ant-notification-notice-icon ant-notification-notice-icon-success",4,"ngSwitchCase"],["nz-icon","","nzType","info-circle","class","ant-notification-notice-icon ant-notification-notice-icon-info",4,"ngSwitchCase"],["nz-icon","","nzType","exclamation-circle","class","ant-notification-notice-icon ant-notification-notice-icon-warning",4,"ngSwitchCase"],["nz-icon","","nzType","close-circle","class","ant-notification-notice-icon ant-notification-notice-icon-error",4,"ngSwitchCase"],[1,"ant-notification-notice-message"],[4,"nzStringTemplateOutlet"],[1,"ant-notification-notice-description"],["class","ant-notification-notice-btn",4,"ngIf"],["nz-icon","","nzType","check-circle",1,"ant-notification-notice-icon","ant-notification-notice-icon-success"],["nz-icon","","nzType","info-circle",1,"ant-notification-notice-icon","ant-notification-notice-icon-info"],["nz-icon","","nzType","exclamation-circle",1,"ant-notification-notice-icon","ant-notification-notice-icon-warning"],["nz-icon","","nzType","close-circle",1,"ant-notification-notice-icon","ant-notification-notice-icon-error"],[3,"innerHTML"],[1,"ant-notification-notice-btn"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["nz-icon","",3,"nzType"],["nz-icon","","nzType","close",1,"ant-notification-close-icon"]],template:function(t,e){if(t&1&&(s(0,"div",0),_("@notificationMotion.done",function(g){return e.animationStateChanged.next(g)})("click",function(g){return e.onClick(g)})("mouseenter",function(){return e.onEnter()})("mouseleave",function(){return e.onLeave()}),l(1,dt,13,10,"div",1)(2,_t,0,0,"ng-template",2),s(3,"a",3),_("click",function(){return e.close()}),s(4,"span",4),l(5,gt,2,1,"ng-container",5)(6,ht,1,0,"ng-template",null,6,$),p()()()),t&2){let f=V(7);c("ngStyle",(e.instance.options==null?null:e.instance.options.nzStyle)||null)("ngClass",(e.instance.options==null?null:e.instance.options.nzClass)||"")("@notificationMotion",e.state),r(1),c("ngIf",!e.instance.template),r(1),c("ngIf",e.instance.template)("ngTemplateOutlet",e.instance.template)("ngTemplateOutletContext",A(9,Ct,e,e.instance.options==null?null:e.instance.options.nzData)),r(3),c("ngIf",e.instance.options==null?null:e.instance.options.nzCloseIcon)("ngIfElse",f)}},dependencies:[H,K,Z,X,U,G,Q,J],encapsulation:2,data:{animation:[Y]}});let i=o;return i})(),S="notification",St={nzTop:"24px",nzBottom:"24px",nzPlacement:"topRight",nzDuration:4500,nzMaxStack:7,nzPauseOnHover:!0,nzAnimate:!0,nzDirection:"ltr"},wt=(()=>{let o=class o extends et{constructor(n,t){super(n,t),this.dir="ltr",this.instances=[],this.topLeftInstances=[],this.topRightInstances=[],this.bottomLeftInstances=[],this.bottomRightInstances=[],this.topInstances=[],this.bottomInstances=[];let e=this.nzConfigService.getConfigForComponent(S);this.dir=e?.nzDirection||"ltr"}create(n){let t=this.onCreate(n),e=t.options.nzKey,f=this.instances.find(g=>g.options.nzKey===n.options.nzKey);return e&&f?this.replaceNotification(f,t):(this.instances.length>=this.config.nzMaxStack&&(this.instances=this.instances.slice(1)),this.instances=[...this.instances,t]),this.readyInstances(),t}onCreate(n){return n.options=this.mergeOptions(n.options),n.onClose=new w,n.onClick=new w,n}subscribeConfigChange(){this.nzConfigService.getConfigChangeEventForComponent(S).pipe(F(this.destroy$)).subscribe(()=>{this.updateConfig();let n=this.nzConfigService.getConfigForComponent(S);if(n){let{nzDirection:t}=n;this.dir=t||this.dir}})}updateConfig(){this.config=v(v(v({},St),this.config),this.nzConfigService.getConfigForComponent(S)),this.top=k(this.config.nzTop),this.bottom=k(this.config.nzBottom),this.cdr.markForCheck()}replaceNotification(n,t){n.title=t.title,n.content=t.content,n.template=t.template,n.type=t.type,n.options=t.options}readyInstances(){let n={topLeft:[],topRight:[],bottomLeft:[],bottomRight:[],top:[],bottom:[]};this.instances.forEach(t=>{switch(t.options.nzPlacement){case"topLeft":n.topLeft.push(t);break;case"topRight":n.topRight.push(t);break;case"bottomLeft":n.bottomLeft.push(t);break;case"bottomRight":n.bottomRight.push(t);break;case"top":n.top.push(t);break;case"bottom":n.bottom.push(t);break;default:n.topRight.push(t)}}),this.topLeftInstances=n.topLeft,this.topRightInstances=n.topRight,this.bottomLeftInstances=n.bottomLeft,this.bottomRightInstances=n.bottomRight,this.topInstances=n.top,this.bottomInstances=n.bottom,this.cdr.detectChanges()}mergeOptions(n){let{nzDuration:t,nzAnimate:e,nzPauseOnHover:f,nzPlacement:g}=this.config;return v({nzDuration:t,nzAnimate:e,nzPauseOnHover:f,nzPlacement:g},n)}};o.\u0275fac=function(t){return new(t||o)(b(E),b(W))},o.\u0275cmp=x({type:o,selectors:[["nz-notification-container"]],exportAs:["nzNotificationContainer"],features:[M],decls:12,vars:46,consts:[[1,"ant-notification","ant-notification-topLeft"],[3,"instance","placement","destroyed",4,"ngFor","ngForOf"],[1,"ant-notification","ant-notification-topRight"],[1,"ant-notification","ant-notification-bottomLeft"],[1,"ant-notification","ant-notification-bottomRight"],[1,"ant-notification","ant-notification-top"],[1,"ant-notification","ant-notification-bottom"],[3,"instance","placement","destroyed"]],template:function(t,e){t&1&&(s(0,"div",0),l(1,zt,1,2,"nz-notification",1),p(),s(2,"div",2),l(3,yt,1,2,"nz-notification",1),p(),s(4,"div",3),l(5,vt,1,2,"nz-notification",1),p(),s(6,"div",4),l(7,Nt,1,2,"nz-notification",1),p(),s(8,"div",5),l(9,Tt,1,2,"nz-notification",1),p(),s(10,"div",6),l(11,It,1,2,"nz-notification",1),p()),t&2&&(z("top",e.top)("left","0px"),u("ant-notification-rtl",e.dir==="rtl"),r(1),c("ngForOf",e.topLeftInstances),r(1),z("top",e.top)("right","0px"),u("ant-notification-rtl",e.dir==="rtl"),r(1),c("ngForOf",e.topRightInstances),r(1),z("bottom",e.bottom)("left","0px"),u("ant-notification-rtl",e.dir==="rtl"),r(1),c("ngForOf",e.bottomLeftInstances),r(1),z("bottom",e.bottom)("right","0px"),u("ant-notification-rtl",e.dir==="rtl"),r(1),c("ngForOf",e.bottomRightInstances),r(1),z("top",e.top)("left","50%")("transform","translateX(-50%)"),u("ant-notification-rtl",e.dir==="rtl"),r(1),c("ngForOf",e.topInstances),r(1),z("bottom",e.bottom)("left","50%")("transform","translateX(-50%)"),u("ant-notification-rtl",e.dir==="rtl"),r(1),c("ngForOf",e.bottomInstances))},dependencies:[B,bt],encapsulation:2,changeDetection:0});let i=o;return i})();var xt=0,Jt=(()=>{let o=class o extends nt{constructor(n,t,e){super(n,t,e),this.componentPrefix="notification-"}success(n,t,e){return this.create("success",n,t,e)}error(n,t,e){return this.create("error",n,t,e)}info(n,t,e){return this.create("info",n,t,e)}warning(n,t,e){return this.create("warning",n,t,e)}blank(n,t,e){return this.create("blank",n,t,e)}create(n,t,e,f){return this.createInstance({type:n,title:t,content:e},f)}template(n,t){return this.createInstance({template:n},t)}generateMessageId(){return`${this.componentPrefix}-${xt++}`}createInstance(n,t){return this.container=this.withContainer(wt),this.container.create(D(v({},n),{createdAt:new Date,messageId:t?.nzKey||this.generateMessageId(),options:t}))}};o.\u0275fac=function(t){return new(t||o)(I(tt),I(q),I(R))},o.\u0275prov=L({token:o,factory:o.\u0275fac,providedIn:"root"});let i=o;return i})();export{Jt as a};
