"use strict";(self.webpackChunkng_alain=self.webpackChunkng_alain||[]).push([[722],{9722:(bt,T,a)=>{a.r(T),a.d(T,{PassportModule:()=>zt});var Q=a(9913),m=a(7955),t=a(5879),c=a(7776);let x=(()=>{var e;class o{constructor(n,r){this.socialService=n,this.settingsSrv=r,this.type=""}ngOnInit(){this.mockModel()}mockModel(){const n={token:"123456789",name:"cipchk",email:`${this.type}@${this.type}.com`,id:1e4,time:+new Date};this.settingsSrv.setUser({...this.settingsSrv.user,...n}),this.socialService.callback(n)}}return(e=o).\u0275fac=function(n){return new(n||e)(t.Y36(m.VK),t.Y36(c.gb))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-callback"]],inputs:{type:"type"},features:[t._Bn([m.VK])],decls:0,vars:0,template:function(n,r){},encapsulation:2}),o})();var s=a(95),u=a(2787),v=a(2840),_=a(855),b=a(1958),d=a(2920),h=a(824),g=a(3599),N=a(6928);let y=(()=>{var e;class o{get user(){return this.settings.user}constructor(n,r,l){this.tokenService=n,this.settings=r,this.router=l,this.f=new s.cw({password:new s.NI("",{nonNullable:!0,validators:[s.kI.required]})})}submit(){this.f.controls.password.markAsDirty(),this.f.controls.password.updateValueAndValidity(),this.f.valid&&(console.log("Valid!"),console.log(this.f.value),this.tokenService.set({token:"123"}),this.router.navigate(["dashboard"]))}}return(e=o).\u0275fac=function(n){return new(n||e)(t.Y36(m.T),t.Y36(c.gb),t.Y36(u.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["passport-lock"]],decls:15,vars:11,consts:[[1,"ant-card","width-lg",2,"margin","0 auto"],[1,"ant-card-body"],[1,"avatar"],["nzIcon","user","nzSize","large",3,"nzSrc"],["nz-form","","role","form",1,"mt-md",3,"formGroup","ngSubmit"],[3,"nzErrorTip"],["nzSuffixIcon","lock"],["type","password","nz-input","","formControlName","password"],["nzType","flex","nzAlign","middle"],[2,"text-align","right",3,"nzOffset","nzSpan"],["nz-button","","nzType","primary",3,"disabled"]],template:function(n,r){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"nz-avatar",3),t.qZA(),t.TgZ(4,"form",4),t.NdJ("ngSubmit",function(){return r.submit()}),t.TgZ(5,"nz-form-item")(6,"nz-form-control",5),t.ALo(7,"i18n"),t.TgZ(8,"nz-input-group",6),t._UZ(9,"input",7),t.qZA()()(),t.TgZ(10,"nz-row",8)(11,"nz-col",9)(12,"button",10),t._uU(13),t.ALo(14,"i18n"),t.qZA()()()()()()),2&n&&(t.xp6(3),t.Q6J("nzSrc",r.user.avatar),t.xp6(1),t.Q6J("formGroup",r.f),t.xp6(2),t.Q6J("nzErrorTip",t.lcZ(7,7,"validation.password.required")),t.xp6(5),t.Q6J("nzOffset",12)("nzSpan",12),t.xp6(1),t.Q6J("disabled",!r.f.valid),t.xp6(1),t.Oqu(t.lcZ(14,9,"app.lock")))},dependencies:[s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,v.ix,_.w,b.dQ,d.t3,d.SK,h.Zp,h.gB,g.Lr,g.Nx,g.Fd,N.Dz,c.Ck],styles:["[_nghost-%COMP%]     .ant-card-body{position:relative;margin-top:80px}[_nghost-%COMP%]     .avatar{position:absolute;top:-20px;left:50%;margin-left:-20px}"]}),o})();var A=a(9862),O=a(7016),P=a(5511),k=a(4716),q=a(8850),z=a(6814),M=a(2612),Y=a(6109),R=a(551),U=a(3903),S=a(9382);function B(e,o){if(1&e&&t._UZ(0,"nz-alert",27),2&e){const i=t.oxw();t.Q6J("nzType","error")("nzMessage",i.error)("nzShowIcon",!0)}}function V(e,o){1&e&&(t.ynx(0),t._uU(1),t.ALo(2,"i18n"),t.BQk()),2&e&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"validation.phone-number.required")," "))}function E(e,o){1&e&&(t.ynx(0),t._uU(1),t.ALo(2,"i18n"),t.BQk()),2&e&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"validation.phone-number.wrong-format")," "))}function $(e,o){if(1&e&&(t.YNc(0,V,3,3,"ng-container",28),t.YNc(1,E,3,3,"ng-container",28)),2&e){const i=o.$implicit;t.Q6J("ngIf",i.errors.required),t.xp6(1),t.Q6J("ngIf",i.errors.pattern)}}let w=(()=>{var e;class o{constructor(n,r,l,p,f,Z,C,vt,_t){this.fb=n,this.router=r,this.settingsService=l,this.socialService=p,this.reuseTabService=f,this.tokenService=Z,this.startupSrv=C,this.http=vt,this.cdr=_t,this.form=this.fb.nonNullable.group({userName:["",[s.kI.required,s.kI.pattern(/^(admin|user)$/)]],password:["",[s.kI.required,s.kI.pattern(/^(ng\-alain\.com)$/)]],mobile:["",[s.kI.required,s.kI.pattern(/^1\d{10}$/)]],captcha:["",[s.kI.required]],remember:[!0]}),this.error="",this.type=0,this.loading=!1,this.count=0}switch({index:n}){this.type=n}getCaptcha(){const n=this.form.controls.mobile;if(n.invalid)return n.markAsDirty({onlySelf:!0}),void n.updateValueAndValidity({onlySelf:!0});this.count=59,this.interval$=setInterval(()=>{this.count-=1,this.count<=0&&clearInterval(this.interval$)},1e3)}submit(){if(this.error="",0===this.type){const{userName:n,password:r}=this.form.controls;if(n.markAsDirty(),n.updateValueAndValidity(),r.markAsDirty(),r.updateValueAndValidity(),n.invalid||r.invalid)return}else{const{mobile:n,captcha:r}=this.form.controls;if(n.markAsDirty(),n.updateValueAndValidity(),r.markAsDirty(),r.updateValueAndValidity(),n.invalid||r.invalid)return}this.loading=!0,this.cdr.detectChanges(),this.http.post("/login/account",{type:this.type,userName:this.form.value.userName,password:this.form.value.password},null,{context:(new A.qT).set(m.kT,!0)}).pipe((0,k.x)(()=>{this.loading=!1,this.cdr.detectChanges()})).subscribe(n=>{if("ok"!==n.msg)return this.error=n.msg,void this.cdr.detectChanges();this.reuseTabService.clear(),n.user.expired=+new Date+3e5,this.tokenService.set(n.user),this.startupSrv.load().subscribe(()=>{let r=this.tokenService.referrer.url||"/";r.includes("/passport")&&(r="/"),this.router.navigateByUrl(r)})})}open(n,r="href"){let l="",p="";switch(p=P.environment.production?`https://ng-alain.github.io/ng-alain/#/passport/callback/${n}`:`http://localhost:4200/#/passport/callback/${n}`,n){case"auth0":l=`//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(p)}`;break;case"github":l=`//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(p)}`;break;case"weibo":l=`https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(p)}`}"window"===r?this.socialService.login(l,"/",{type:"window"}).subscribe(f=>{f&&(this.settingsService.setUser(f),this.router.navigateByUrl("/"))}):this.socialService.login(l,"/",{type:"href"})}ngOnDestroy(){this.interval$&&clearInterval(this.interval$)}}return(e=o).\u0275fac=function(n){return new(n||e)(t.Y36(s.qu),t.Y36(u.F0),t.Y36(c.gb),t.Y36(m.VK),t.Y36(O.Wu,8),t.Y36(m.T),t.Y36(q.HS),t.Y36(c.lP),t.Y36(t.sBO))},e.\u0275cmp=t.Xpm({type:e,selectors:[["passport-login"]],features:[t._Bn([m.VK])],decls:54,vars:39,consts:[["nz-form","","role","form",3,"formGroup","ngSubmit"],[1,"tabs",3,"nzAnimated","nzSelectChange"],[3,"nzTitle"],["class","mb-lg",3,"nzType","nzMessage","nzShowIcon",4,"ngIf"],["nzErrorTip","Please enter mobile number, muse be: admin or user"],["nzSize","large","nzPrefixIcon","user"],["nz-input","","formControlName","userName","placeholder","username: admin or user"],["nzErrorTip","Please enter password, muse be: ng-alain.com"],["nzSize","large","nzPrefixIcon","lock"],["nz-input","","type","password","formControlName","password","placeholder","password: ng-alain.com"],[3,"nzErrorTip"],["nz-input","","formControlName","mobile","placeholder","mobile number"],["mobileErrorTip",""],[3,"nzGutter"],[3,"nzSpan"],["nzSize","large","nzPrefixIcon","mail"],["nz-input","","formControlName","captcha","placeholder","captcha"],["type","button","nz-button","","nzSize","large","nzBlock","",3,"disabled","nzLoading","click"],["nz-checkbox","","formControlName","remember"],[1,"text-right",3,"nzSpan"],["routerLink","/passport/register",1,"forgot"],["nz-button","","type","submit","nzType","primary","nzSize","large","nzBlock","",3,"nzLoading"],[1,"other"],["nz-tooltip","","nzTooltipTitle","in fact Auth0 via window","nz-icon","","nzType","alipay-circle",1,"icon",3,"click"],["nz-tooltip","","nzTooltipTitle","in fact Github via redirect","nz-icon","","nzType","taobao-circle",1,"icon",3,"click"],["nz-icon","","nzType","weibo-circle",1,"icon",3,"click"],["routerLink","/passport/register",1,"register"],[1,"mb-lg",3,"nzType","nzMessage","nzShowIcon"],[4,"ngIf"]],template:function(n,r){if(1&n&&(t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return r.submit()}),t.TgZ(1,"nz-tabset",1),t.NdJ("nzSelectChange",function(p){return r.switch(p)}),t.TgZ(2,"nz-tab",2),t.ALo(3,"i18n"),t.YNc(4,B,1,3,"nz-alert",3),t.TgZ(5,"nz-form-item")(6,"nz-form-control",4)(7,"nz-input-group",5),t._UZ(8,"input",6),t.qZA()()(),t.TgZ(9,"nz-form-item")(10,"nz-form-control",7)(11,"nz-input-group",8),t._UZ(12,"input",9),t.qZA()()()(),t.TgZ(13,"nz-tab",2),t.ALo(14,"i18n"),t.TgZ(15,"nz-form-item")(16,"nz-form-control",10)(17,"nz-input-group",5),t._UZ(18,"input",11),t.qZA(),t.YNc(19,$,2,2,"ng-template",null,12,t.W1O),t.qZA()(),t.TgZ(21,"nz-form-item")(22,"nz-form-control",10),t.ALo(23,"i18n"),t.TgZ(24,"nz-row",13)(25,"nz-col",14)(26,"nz-input-group",15),t._UZ(27,"input",16),t.qZA()(),t.TgZ(28,"nz-col",14)(29,"button",17),t.NdJ("click",function(){return r.getCaptcha()}),t._uU(30),t.ALo(31,"i18n"),t.qZA()()()()()()(),t.TgZ(32,"nz-form-item")(33,"nz-col",14)(34,"label",18),t._uU(35),t.ALo(36,"i18n"),t.qZA()(),t.TgZ(37,"nz-col",19)(38,"a",20),t._uU(39),t.ALo(40,"i18n"),t.qZA()()(),t.TgZ(41,"nz-form-item")(42,"button",21),t._uU(43),t.ALo(44,"i18n"),t.qZA()()(),t.TgZ(45,"div",22),t._uU(46),t.ALo(47,"i18n"),t.TgZ(48,"i",23),t.NdJ("click",function(){return r.open("auth0","window")}),t.qZA(),t.TgZ(49,"i",24),t.NdJ("click",function(){return r.open("github")}),t.qZA(),t.TgZ(50,"i",25),t.NdJ("click",function(){return r.open("weibo","window")}),t.qZA(),t.TgZ(51,"a",26),t._uU(52),t.ALo(53,"i18n"),t.qZA()()),2&n){const l=t.MAs(20);t.Q6J("formGroup",r.form),t.xp6(1),t.Q6J("nzAnimated",!1),t.xp6(1),t.Q6J("nzTitle",t.lcZ(3,21,"app.login.tab-login-credentials")),t.xp6(2),t.Q6J("ngIf",r.error),t.xp6(9),t.Q6J("nzTitle",t.lcZ(14,23,"app.login.tab-login-mobile")),t.xp6(3),t.Q6J("nzErrorTip",l),t.xp6(6),t.Q6J("nzErrorTip",t.lcZ(23,25,"validation.verification-code.required")),t.xp6(2),t.Q6J("nzGutter",8),t.xp6(1),t.Q6J("nzSpan",16),t.xp6(3),t.Q6J("nzSpan",8),t.xp6(1),t.Q6J("disabled",r.count>=0)("nzLoading",r.loading),t.xp6(1),t.hij(" ",r.count?r.count+"s":t.lcZ(31,27,"app.register.get-verification-code")," "),t.xp6(3),t.Q6J("nzSpan",12),t.xp6(2),t.Oqu(t.lcZ(36,29,"app.login.remember-me")),t.xp6(2),t.Q6J("nzSpan",12),t.xp6(2),t.Oqu(t.lcZ(40,31,"app.login.forgot-password")),t.xp6(3),t.Q6J("nzLoading",r.loading),t.xp6(1),t.hij(" ",t.lcZ(44,33,"app.login.login")," "),t.xp6(3),t.hij(" ",t.lcZ(47,35,"app.login.sign-in-with")," "),t.xp6(6),t.Oqu(t.lcZ(53,37,"app.login.signup"))}},dependencies:[z.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,u.rH,v.ix,_.w,b.dQ,d.t3,d.SK,M.Ie,Y.SY,R.Ls,U.r,S.xH,S.xw,h.Zp,h.gB,g.Lr,g.Nx,g.Fd,c.Ck],styles:["[_nghost-%COMP%]{display:block;width:368px;margin:0 auto}[_nghost-%COMP%]     .ant-tabs .ant-tabs-bar{margin-bottom:24px;text-align:center;border-bottom:0}[_nghost-%COMP%]     .ant-tabs-tab{font-size:16px;line-height:24px}[_nghost-%COMP%]     .ant-input-affix-wrapper .ant-input:not(:first-child){padding-left:4px}[_nghost-%COMP%]     .icon{margin-left:16px;color:#0003;font-size:24px;vertical-align:middle;cursor:pointer;transition:color .3s}[_nghost-%COMP%]     .icon:hover{color:#1890ff}[_nghost-%COMP%]     .other{margin-top:24px;line-height:22px;text-align:left}[_nghost-%COMP%]     .other nz-tooltip{vertical-align:middle}[_nghost-%COMP%]     .other .register{float:right}[data-theme=dark]   [_nghost-%COMP%]     .icon{color:#fff3}[data-theme=dark]   [_nghost-%COMP%]     .icon:hover{color:#fff}"],changeDetection:0}),o})();function D(e,o){return i=>{const n=i.get(e),r=i.get(o);return r.errors&&!r.errors.matchControl||r.setErrors(n.value!==r.value?{matchControl:!0}:null),null}}var F=a(7417),L=a(9691),j=a(8128);function G(e,o){if(1&e&&t._UZ(0,"nz-alert",23),2&e){const i=t.oxw();t.Q6J("nzType","error")("nzMessage",i.error)("nzShowIcon",!0)}}function W(e,o){1&e&&(t.ynx(0),t._uU(1),t.ALo(2,"i18n"),t.BQk()),2&e&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"validation.email.required")))}function K(e,o){1&e&&(t.ynx(0),t._uU(1),t.ALo(2,"i18n"),t.BQk()),2&e&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"validation.email.wrong-format")))}function X(e,o){if(1&e&&(t.YNc(0,W,3,3,"ng-container",24),t.YNc(1,K,3,3,"ng-container",24)),2&e){const i=o.$implicit;t.Q6J("ngIf",null==i.errors?null:i.errors.required),t.xp6(1),t.Q6J("ngIf",null==i.errors?null:i.errors.email)}}function H(e,o){1&e&&(t.TgZ(0,"div",32),t._uU(1),t.ALo(2,"i18n"),t.qZA()),2&e&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"validation.password.strength.strong")))}function tt(e,o){1&e&&(t.TgZ(0,"div",33),t._uU(1),t.ALo(2,"i18n"),t.qZA()),2&e&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"validation.password.strength.medium")))}function et(e,o){1&e&&(t.TgZ(0,"div",34),t._uU(1),t.ALo(2,"i18n"),t.qZA()),2&e&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"validation.password.strength.short")))}function nt(e,o){if(1&e&&(t.TgZ(0,"div",25),t.ynx(1,26),t.YNc(2,H,3,3,"div",27),t.YNc(3,tt,3,3,"div",28),t.YNc(4,et,3,3,"div",29),t.BQk(),t.TgZ(5,"div"),t._UZ(6,"nz-progress",30),t.qZA(),t.TgZ(7,"p",31),t._uU(8),t.ALo(9,"i18n"),t.qZA()()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("ngSwitch",i.status),t.xp6(1),t.Q6J("ngSwitchCase","ok"),t.xp6(1),t.Q6J("ngSwitchCase","pass"),t.xp6(2),t.Gre("progress-",i.status,""),t.xp6(1),t.Q6J("nzPercent",i.progress)("nzStatus",i.passwordProgressMap[i.status])("nzStrokeWidth",6)("nzShowInfo",!1),t.xp6(2),t.Oqu(t.lcZ(9,11,"validation.password.strength.msg"))}}function rt(e,o){1&e&&(t.ynx(0),t._uU(1),t.ALo(2,"i18n"),t.BQk()),2&e&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"validation.confirm-password.required")))}function ot(e,o){1&e&&(t.ynx(0),t._uU(1),t.ALo(2,"i18n"),t.BQk()),2&e&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"validation.password.twice")))}function it(e,o){if(1&e&&(t.YNc(0,rt,3,3,"ng-container",24),t.YNc(1,ot,3,3,"ng-container",24)),2&e){const i=o.$implicit;t.Q6J("ngIf",null==i.errors?null:i.errors.required),t.xp6(1),t.Q6J("ngIf",null==i.errors?null:i.errors.matchControl)}}function st(e,o){1&e&&(t.TgZ(0,"nz-select",35),t._UZ(1,"nz-option",36)(2,"nz-option",36),t.qZA()),2&e&&(t.xp6(1),t.Q6J("nzLabel","+86")("nzValue","+86"),t.xp6(1),t.Q6J("nzLabel","+87")("nzValue","+87"))}function at(e,o){1&e&&(t.ynx(0),t._uU(1),t.ALo(2,"i18n"),t.BQk()),2&e&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"validation.phone-number.required")))}function lt(e,o){1&e&&(t.ynx(0),t._uU(1),t.ALo(2,"i18n"),t.BQk()),2&e&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"validation.phone-number.wrong-format")))}function pt(e,o){if(1&e&&(t.YNc(0,at,3,3,"ng-container",24),t.YNc(1,lt,3,3,"ng-container",24)),2&e){const i=o.$implicit;t.Q6J("ngIf",null==i.errors?null:i.errors.required),t.xp6(1),t.Q6J("ngIf",null==i.errors?null:i.errors.pattern)}}const ct=function(){return{"width.px":240}};let J=(()=>{var e;class o{constructor(n,r,l,p){this.fb=n,this.router=r,this.http=l,this.cdr=p,this.form=this.fb.nonNullable.group({mail:["",[s.kI.required,s.kI.email]],password:["",[s.kI.required,s.kI.minLength(6),o.checkPassword.bind(this)]],confirm:["",[s.kI.required,s.kI.minLength(6)]],mobilePrefix:["+86"],mobile:["",[s.kI.required,s.kI.pattern(/^1\d{10}$/)]],captcha:["",[s.kI.required]]},{validators:D("password","confirm")}),this.error="",this.type=0,this.loading=!1,this.visible=!1,this.status="pool",this.progress=0,this.passwordProgressMap={ok:"success",pass:"normal",pool:"exception"},this.count=0}static checkPassword(n){if(!n)return null;const r=this;r.visible=!!n.value,r.status=n.value&&n.value.length>9?"ok":n.value&&n.value.length>5?"pass":"pool",r.visible&&(r.progress=10*n.value.length>100?100:10*n.value.length)}getCaptcha(){const{mobile:n}=this.form.controls;if(n.invalid)return n.markAsDirty({onlySelf:!0}),void n.updateValueAndValidity({onlySelf:!0});this.count=59,this.cdr.detectChanges(),this.interval$=setInterval(()=>{this.count-=1,this.cdr.detectChanges(),this.count<=0&&clearInterval(this.interval$)},1e3)}submit(){if(this.error="",Object.keys(this.form.controls).forEach(r=>{const l=this.form.controls[r];l.markAsDirty(),l.updateValueAndValidity()}),this.form.invalid)return;const n=this.form.value;this.loading=!0,this.cdr.detectChanges(),this.http.post("/register",n,null,{context:(new A.qT).set(m.kT,!0)}).pipe((0,k.x)(()=>{this.loading=!1,this.cdr.detectChanges()})).subscribe(()=>{this.router.navigate(["passport","register-result"],{queryParams:{email:n.mail}})})}ngOnDestroy(){this.interval$&&clearInterval(this.interval$)}}return(e=o).\u0275fac=function(n){return new(n||e)(t.Y36(s.qu),t.Y36(u.F0),t.Y36(c.lP),t.Y36(t.sBO))},e.\u0275cmp=t.Xpm({type:e,selectors:[["passport-register"]],decls:50,vars:34,consts:[["nz-form","","role","form",3,"formGroup","ngSubmit"],["class","mb-lg",3,"nzType","nzMessage","nzShowIcon",4,"ngIf"],[3,"nzErrorTip"],["nzSize","large","nzAddonBeforeIcon","user"],["nz-input","","formControlName","mail","placeholder","Email"],["mailErrorTip",""],["nzSize","large","nzAddonBeforeIcon","lock","nz-popover","","nzPopoverPlacement","right","nzPopoverTrigger","focus","nzPopoverOverlayClassName","register-password-cdk",3,"nzPopoverVisible","nzPopoverOverlayStyle","nzPopoverContent","nzPopoverVisibleChange"],["nz-input","","type","password","formControlName","password","placeholder","Password"],["pwdCdkTpl",""],["nzSize","large","nzAddonBeforeIcon","lock"],["nz-input","","type","password","formControlName","confirm","placeholder","Confirm Password"],["confirmErrorTip",""],["nzSize","large",3,"nzAddOnBefore"],["addOnBeforeTemplate",""],["formControlName","mobile","nz-input","","placeholder","Phone number"],["mobileErrorTip",""],[3,"nzGutter"],[3,"nzSpan"],["nzSize","large","nzAddonBeforeIcon","mail"],["nz-input","","formControlName","captcha","placeholder","Captcha"],["type","button","nz-button","","nzSize","large","nzBlock","",3,"disabled","nzLoading","click"],["nz-button","","nzType","primary","nzSize","large","type","submit",1,"submit",3,"nzLoading"],["routerLink","/passport/login",1,"login"],[1,"mb-lg",3,"nzType","nzMessage","nzShowIcon"],[4,"ngIf"],[2,"padding","4px 0"],[3,"ngSwitch"],["class","success",4,"ngSwitchCase"],["class","warning",4,"ngSwitchCase"],["class","error",4,"ngSwitchDefault"],[3,"nzPercent","nzStatus","nzStrokeWidth","nzShowInfo"],[1,"mt-sm"],[1,"success"],[1,"warning"],[1,"error"],["formControlName","mobilePrefix",2,"width","100px"],[3,"nzLabel","nzValue"]],template:function(n,r){if(1&n&&(t.TgZ(0,"h3"),t._uU(1),t.ALo(2,"i18n"),t.qZA(),t.TgZ(3,"form",0),t.NdJ("ngSubmit",function(){return r.submit()}),t.YNc(4,G,1,3,"nz-alert",1),t.TgZ(5,"nz-form-item")(6,"nz-form-control",2)(7,"nz-input-group",3),t._UZ(8,"input",4),t.qZA(),t.YNc(9,X,2,2,"ng-template",null,5,t.W1O),t.qZA()(),t.TgZ(11,"nz-form-item")(12,"nz-form-control",2),t.ALo(13,"i18n"),t.TgZ(14,"nz-input-group",6),t.NdJ("nzPopoverVisibleChange",function(p){return r.visible=p}),t._UZ(15,"input",7),t.qZA(),t.YNc(16,nt,10,13,"ng-template",null,8,t.W1O),t.qZA()(),t.TgZ(18,"nz-form-item")(19,"nz-form-control",2)(20,"nz-input-group",9),t._UZ(21,"input",10),t.qZA(),t.YNc(22,it,2,2,"ng-template",null,11,t.W1O),t.qZA()(),t.TgZ(24,"nz-form-item")(25,"nz-form-control",2)(26,"nz-input-group",12),t.YNc(27,st,3,4,"ng-template",null,13,t.W1O),t._UZ(29,"input",14),t.qZA(),t.YNc(30,pt,2,2,"ng-template",null,15,t.W1O),t.qZA()(),t.TgZ(32,"nz-form-item")(33,"nz-form-control",2),t.ALo(34,"i18n"),t.TgZ(35,"nz-row",16)(36,"nz-col",17)(37,"nz-input-group",18),t._UZ(38,"input",19),t.qZA()(),t.TgZ(39,"nz-col",17)(40,"button",20),t.NdJ("click",function(){return r.getCaptcha()}),t._uU(41),t.ALo(42,"i18n"),t.qZA()()()()(),t.TgZ(43,"nz-form-item")(44,"button",21),t._uU(45),t.ALo(46,"i18n"),t.qZA(),t.TgZ(47,"a",22),t._uU(48),t.ALo(49,"i18n"),t.qZA()()()),2&n){const l=t.MAs(10),p=t.MAs(17),f=t.MAs(23),Z=t.MAs(28),C=t.MAs(31);t.xp6(1),t.Oqu(t.lcZ(2,21,"app.register.register")),t.xp6(2),t.Q6J("formGroup",r.form),t.xp6(1),t.Q6J("ngIf",r.error),t.xp6(2),t.Q6J("nzErrorTip",l),t.xp6(6),t.Q6J("nzErrorTip",t.lcZ(13,23,"validation.password.required")),t.xp6(2),t.Q6J("nzPopoverVisible",r.visible)("nzPopoverOverlayStyle",t.DdM(33,ct))("nzPopoverContent",p),t.xp6(5),t.Q6J("nzErrorTip",f),t.xp6(6),t.Q6J("nzErrorTip",C),t.xp6(1),t.Q6J("nzAddOnBefore",Z),t.xp6(7),t.Q6J("nzErrorTip",t.lcZ(34,25,"validation.verification-code.required")),t.xp6(2),t.Q6J("nzGutter",8),t.xp6(1),t.Q6J("nzSpan",16),t.xp6(3),t.Q6J("nzSpan",8),t.xp6(1),t.Q6J("disabled",r.count>0)("nzLoading",r.loading),t.xp6(1),t.hij(" ",r.count?r.count+"s":t.lcZ(42,27,"app.register.get-verification-code")," "),t.xp6(3),t.Q6J("nzLoading",r.loading),t.xp6(1),t.hij(" ",t.lcZ(46,29,"app.register.register")," "),t.xp6(3),t.Oqu(t.lcZ(49,31,"app.register.sign-in"))}},dependencies:[z.O5,z.RF,z.n9,z.ED,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,u.rH,v.ix,_.w,b.dQ,d.t3,d.SK,F.lU,L.Ip,L.Vq,U.r,h.Zp,h.gB,g.Lr,g.Nx,g.Fd,j.M,c.Ck],styles:["[_nghost-%COMP%]{display:block;width:368px;margin:0 auto}[_nghost-%COMP%]     h3{margin-bottom:20px;font-size:16px}[_nghost-%COMP%]     .submit{width:50%}[_nghost-%COMP%]     .login{float:right;line-height:40px}  .register-password-cdk .success,   .register-password-cdk .warning,   .register-password-cdk .error{transition:color .3s}  .register-password-cdk .success{color:#52c41a}  .register-password-cdk .warning{color:#faad14}  .register-password-cdk .error{color:#ff4d4f}  .register-password-cdk .progress-pass>.progress .ant-progress-bg{background-color:#faad14}"],changeDetection:0}),o})();var ut=a(3460),gt=a(562);function mt(e,o){if(1&e&&(t.TgZ(0,"div",4),t._uU(1),t.ALo(2,"i18n"),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.hij(" ",t.xi3(2,1,"app.register-result.msg",i.params)," ")}}let I=(()=>{var e;class o{constructor(n,r){this.msg=r,this.params={email:""},this.email="",this.params.email=this.email=n.snapshot.queryParams.email||"ng-alain@example.com"}}return(e=o).\u0275fac=function(n){return new(n||e)(t.Y36(u.gz),t.Y36(ut.dD))},e.\u0275cmp=t.Xpm({type:e,selectors:[["passport-register-result"]],decls:10,vars:11,consts:[["type","success",3,"title","description"],["title",""],["nz-button","","nzSize","large",3,"nzType","click"],["routerLink","/","nz-button","","nzSize","large"],[1,"title",2,"font-size","20px"]],template:function(n,r){if(1&n&&(t.TgZ(0,"result",0),t.ALo(1,"i18n"),t.YNc(2,mt,3,4,"ng-template",null,1,t.W1O),t.TgZ(4,"button",2),t.NdJ("click",function(){return r.msg.success("email")}),t._uU(5),t.ALo(6,"i18n"),t.qZA(),t.TgZ(7,"button",3),t._uU(8),t.ALo(9,"i18n"),t.qZA()()),2&n){const l=t.MAs(3);t.s9C("description",t.lcZ(1,5,"app.register-result.activation-email")),t.Q6J("title",l),t.xp6(4),t.Q6J("nzType","primary"),t.xp6(1),t.hij(" ",t.lcZ(6,7,"app.register-result.view-mailbox")," "),t.xp6(3),t.hij(" ",t.lcZ(9,9,"app.register-result.back-home")," ")}},dependencies:[u.rH,gt.N,v.ix,_.w,b.dQ,c.Ck],encapsulation:2}),o})();const ht=[{path:"passport",component:a(2133).W,children:[{path:"login",component:w,data:{title:"\u767b\u5f55",titleI18n:"app.login.login"}},{path:"register",component:J,data:{title:"\u6ce8\u518c",titleI18n:"app.register.register"}},{path:"register-result",component:I,data:{title:"\u6ce8\u518c\u7ed3\u679c",titleI18n:"app.register.register"}},{path:"lock",component:y,data:{title:"\u9501\u5c4f",titleI18n:"app.lock"}}]},{path:"passport/callback/:type",component:x}];let ft=(()=>{var e;class o{}return(e=o).\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[u.Bz.forChild(ht),u.Bz]}),o})(),zt=(()=>{var e;class o{}return(e=o).\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[Q.m8,ft]}),o})()}}]);