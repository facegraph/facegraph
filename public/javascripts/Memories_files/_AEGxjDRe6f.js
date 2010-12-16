/*
HTTP Host: b.static.ak.fbcdn.net
Generated: November 15th 2010 12:15:33 PM PDT
Machine: 10.30.146.197
*/

if (window.CavalryLogger) { CavalryLogger.start_js(["js\/9gm3k6dxt1wc80w4.pkg.js"]); }

/**
 * Modified version of http://www.java.com/js/deployJava.txt for
 * reliably testing JRE version. Unneeded code commented out.
 *
 * version 20101108
 *
 * @option preserve-header
 * @requires dom ua
 * @provides java-deploy
 *
 * Copyright (c) 2006, Oracle and/or its affiliates. All rights reserved.
 * ORACLE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   - Neither the name of Oracle nor the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */var XD={_callbacks:[],_opts:{autoResize:false,allowShrink:true,channelUrl:null,hideOverflow:false,newResizeMethod:false,resizeTimeout:100,resizeWidth:false,expectResizeAck:false},init:function(a){this._opts=copy_properties(copy_properties({},this._opts),a);if(this._opts.autoResize)this._startResizeMonitor();Arbiter.subscribe('Connect.Unsafe.resize.ack',function(){this._opts.gotResizeAck=true;}.bind(this),Arbiter.BEHAVIOUR_PERSISTANT);},send:function(b,a){a=a||this._opts.channelUrl;if(!a)return;if(a.substr(0,4)!='http')return;var h=a+'&'+URI.implodeQuery(b),d='f'+(Math.random()*(1<<30)).toString(16).replace('.',''),c=document.body.appendChild(document.createElement('div')),g=false;c.style.position='absolute';c.style.top='-10000px';c.style.width='1px';c.style.height='1px';XD._callbacks[d]=function(){if(g){(function(){c.parentNode.removeChild(c);}).defer(3000);delete XD._callbacks[d];}};if(ua.ie()){var e=('<iframe '+' src="'+h+'"'+' onload="XD._callbacks.'+d+'()"'+'></iframe>');c.innerHTML='<iframe src="javascript:false"></iframe>';g=true;(function(){c.innerHTML=e;}).defer();}else{var f=document.createElement('iframe');f.onload=XD._callbacks[d];c.appendChild(f);g=true;f.src=h;}},_computeSize:function(){var a=document.body,e=document.documentElement,h=0,f;if(this._opts.newResizeMethod){f=Math.max(Math.max(a.offsetHeight,a.scrollHeight)+a.offsetTop,Math.max(e.offsetHeight,e.scrollHeight)+e.offsetTop);}else{if(ua.ie()){f=Math.max(a.offsetHeight,a.scrollHeight)+a.offsetTop;}else f=e.offsetHeight+e.offsetTop;if(window.Dialog)f=Math.max(f,Dialog.max_bottom);}if(this._opts.resizeWidth){if(a.offsetWidth<a.scrollWidth){h=a.scrollWidth+a.offsetLeft;}else{var d=a.childNodes;for(var g=0;g<d.length;g++){var b=d[g];var c=b.offsetWidth+b.offsetLeft;if(c>h)h=c;}}if(XD.forced_min_width)h=Math.max(h,XD.forced_min_width);if(e.clientLeft>0)h+=(e.clientLeft*2);if(e.clientTop>0)f+=(e.clientTop*2);}return {width:h,height:f};},_startResizeMonitor:function(){var b,a=document.documentElement;if(this._opts.hideOverflow)a.style.overflow='hidden';(function(){var e=this._computeSize();if(!b||(this._opts.expectResizeAck&&!this._opts.gotResizeAck)||(this._opts.allowShrink&&b.width!=e.width)||(!this._opts.allowShrink&&b.width<e.width)||(this._opts.allowShrink&&b.height!=e.height)||(!this._opts.allowShrink&&b.height<e.height)){b=e;var d={type:'resize',height:e.height};if(e.width&&e.width!=0)d.width=e.width;try{if(URI(document.referrer).isFacebookURI()&&window.parent!=window&&window.name&&window.parent.location&&URI(window.parent.location).isFacebookURI()){var iframes=window.parent.document.getElementsByTagName('iframe');for(var i in iframes)if(iframes[i].name==window.name){if(this._opts.resizeWidth)iframes[i].style.width=d.width+'px';iframes[i].style.height=d.height+'px';}}this.send(d);}catch(c){this.send(d);}}}).bind(this).recur(this._opts.resizeTimeout);}};var UnverifiedXD=copy_properties({},XD);
var Base64=(function(){var c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';function d(e){e=(e.charCodeAt(0)<<16)|(e.charCodeAt(1)<<8)|e.charCodeAt(2);return String.fromCharCode(c.charCodeAt(e>>>18),c.charCodeAt((e>>>12)&63),c.charCodeAt((e>>>6)&63),c.charCodeAt(e&63));}var a='>___?456789:;<=_______'+'\0\1\2\3\4\5\6\7\b\t\n\13\f\r\16\17\20\21\22\23\24\25\26\27\30\31'+'______\32\33\34\35\36\37 !"#$%&\'()*+,-./0123';function b(e){e=(a.charCodeAt(e.charCodeAt(0)-43)<<18)|(a.charCodeAt(e.charCodeAt(1)-43)<<12)|(a.charCodeAt(e.charCodeAt(2)-43)<<6)|a.charCodeAt(e.charCodeAt(3)-43);return String.fromCharCode(e>>>16,(e>>>8)&255,e&255);}return {encode:function(f){f=unescape(encodeURI(f));var e=(f.length+2)%3;f=(f+'\0\0'.slice(e)).replace(/[\s\S]{3}/g,d);return f.slice(0,f.length+e-2)+'=='.slice(e);},decode:function(g){g=g.replace(/[^A-Za-z0-9+\/]/g,'');var f=(g.length+3)&3,e;g=(g+'AAA'.slice(f)).replace(/..../g,b);g=g.slice(0,g.length+f-3);try{return decodeURIComponent(escape(g));}catch(e){throw new Error('Not valid UTF-8');}},encodeObject:function(e){return Base64.encode(JSON.encode(e));},decodeObject:function(e){return JSON.decode(Base64.decode(e));},encodeNums:function(e){return String.fromCharCode.apply(String,e.map(function(f){return c.charCodeAt((f|-(f>63))&-(f>0)&63);}));}};})();
function ContextualDialog(b){var a=new Dialog();copy_properties(a,ContextualDialog.prototype);a._setFromModel(b);return a;}ContextualDialog.prototype={setContext:function(a){this._context=a;this._dirty();return this;},_buildDialogContent:function(){Bootloader.loadComponents('contextual-dialog-css',function(){CSS.addClass(this._obj,'contextual_dialog');this._content=this._frame=$N('div',{className:'contextual_dialog_content'});this._arrow=$N('div',{className:'arrow'});DOM.setContent(this._popup,[this._content,this._arrow]);}.bind(this));},_resetDialogObj:function(){if(!this._context)return;var a=Vector2.getElementPosition(this._context);var c=this._context.offsetWidth,b=this._context.offsetHeight;var d=a.x,e=a.y+b;if(c<64)d+=c/2-32;new Vector2(d,e,'document').setElementPosition(this._popup);},_renderDialog:function(a){if(window!=top)this._auto_focus=false;Dialog.prototype._renderDialog.call(this,a);}};
/**
 * Modified version of http://www.java.com/js/deployJava.txt for
 * reliably testing JRE version. Unneeded code commented out.
 *
 * version 20101108
 *
 * @option preserve-header
 * @requires dom ua
 * @provides java-deploy
 *
 * Copyright (c) 2006, Oracle and/or its affiliates. All rights reserved.
 * ORACLE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   - Neither the name of Oracle nor the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */function CreditsBalanceUpdater(){}CreditsBalanceUpdater.UPDATE='creditsBalance/update';CreditsBalanceUpdater.negBalance='negativeBalance';CreditsBalanceUpdater.repay='needsRepayment';CreditsBalanceUpdater.prototype={init:function(b,a){this.root=b;this.targetBalance=DOM.find(this.root,'span.creditsBalance');Arbiter.inform(CreditsBalanceUpdater.UPDATE,a,Arbiter.BEHAVIOR_STATE);Arbiter.subscribe(CreditsBalanceUpdater.UPDATE,this.oninform.bind(this),Arbiter.SUBSCRIBE_NEW);new LiveMessageReceiver('update_canvas_balance').setHandler(this.oninform_livemessage.bind(this)).register();},oninform_livemessage:function(a){this.oninform(CreditsBalanceUpdater.UPDATE,a);},oninform:function(c,b){if(c==CreditsBalanceUpdater.UPDATE){var a=ge('get_more_link');if(b>=0){CSS.removeClass(this.root,CreditsBalanceUpdater.negBalance);a&&CSS.removeClass(a,CreditsBalanceUpdater.repay);}else{CSS.addClass(this.root,CreditsBalanceUpdater.negBalance);a&&CSS.addClass(a,CreditsBalanceUpdater.repay);}DOM.setContent(this.targetBalance,b);}}};
WidgetArbiter={_findSiblings:function(){if(WidgetArbiter._siblings)return;WidgetArbiter._siblings=[];for(var b=parent.frames.length-1;b>=0;b--)try{if(parent.frames[b]&&parent.frames[b].Arbiter&&parent.frames[b].Arbiter.inform)WidgetArbiter._siblings.push(parent.frames[b].Arbiter);}catch(a){}},inform:function(){WidgetArbiter._findSiblings();var a=$A(arguments);WidgetArbiter._siblings.each(function(b){b.inform.apply(b,a);});}};

if (window.Bootloader) { Bootloader.done(["js\/9gm3k6dxt1wc80w4.pkg.js"]); }