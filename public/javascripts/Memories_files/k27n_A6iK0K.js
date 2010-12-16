/*1291152607,176832697*/

if (window.CavalryLogger) { CavalryLogger.start_js(["js\/dea8o13f1bcoogos.pkg.js"]); }

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
 */function BuddyListDataSource(a){this.parent.construct(this,a);}BuddyListDataSource.extend('DataSource');BuddyListDataSource.prototype={init:function(){this.parent.init();var a=Arbiter.subscribe(ChatBuddyList.AVAILABILITY_CHANGED,this._availableListChanged.bind(this));onleaveRegister(function(){Arbiter.unsubscribe(a);});},_availableListChanged:function(){var b=this.value,a=this.flatValue;this.dirty();this.addEntries(Chat.getAvailableIds().map(function(c){return {uid:c,text:ChatUserInfos[c].name,photo:ChatUserInfos[c].thumbSrc,type:Chat.getAvailability(c).i?'idle':'active'};}));if(b)this.respond(b,this.buildUids(a),true);},refreshData:function(){Chat.updateAvailability();},onunloadRegister:function(){Chat.updateAvailability();},fetch:bagofholding};
add_properties('TypeaheadRenderers',{buddylist:function(b,d){var f=htmlize(b.text),e=b.photo,a='',c=[];if(e)c=['<img src="',e,'" alt="" />'];if(b.type)a=' class="'+b.type+'"';return ['<li',a,'>',c.join(''),'<span class="text">'+f+'</span>','<i class="'+b.type+'">','</i>','</li>'];}});
var ChatOnlineFriends={chatFriends:{},chatStatuses:['chatOnline','chatIdle','chatOffline'],init:function(e,a,f,b,d,c){this.maxElements=e;this.dynCounter=0;this.facepile=d.firstChild;this._faceTmpl=c;this.chatFriends=a;this.initToken=Arbiter.subscribe(ChatBuddyList.BUDDY_LIST_INITIALIZED,this.buddyListInitialized.bind(this));this.listChangedToken=Arbiter.subscribe(ChatBuddyList.AVAILABILITY_CHANGED,function(h,g){if(g.haveFullList)this.availableListChanged();}.bind(this));this.visibilityChangedToken=Arbiter.subscribe(ChatOptions.VISIBILITY_CHANGED,this.visibilityChanged.bind(this));Event.listen(d,'click',this.clickHandler.bind(this));onleaveRegister(this.onunload.bind(this));this.initTypeahead(f,DOM.find(b,'div.fbFriendsOnlineFacepile'),DOM.find(b,'div.chatTypeaheadNoResults'));},clickHandler:function(event){var c=event.getTarget();var b=Parent.byClass(c,'uiListItem');if(b){var a=this.chatFriends[b.id];if(chatOptions.visibility){Chat.openTab(a.user_id,a.name,'friend');}else goURI(a.uri);return false;}},onunload:function(){Arbiter.unsubscribe(this.initToken);Arbiter.unsubscribe(this.listChangedToken);Arbiter.unsubscribe(this.visibilityChangedToken);Chat.keepCorrectPresenceInfo(false);},buddyListInitialized:function(){Chat.keepCorrectPresenceInfo(true);},visibilityChanged:function(){var a=ge('chatFriendsOnline');if(a)CSS.conditionClass(a,'isOffline',!chatOptions.visibility);this.availableListChanged();},availableListChanged:function(){var d=0;var b={};for(var e in this.chatFriends){var n=this.chatFriends[e].user_id;var f=ge(e);if(f){var l,c;c=Chat.getAvailability(n);if(c&&chatOptions.visibility&&d<this.maxElements){l=c.i?'chatIdle':'chatOnline';b[n]=l;d++;}else l='chatOffline';for(var h=0;h<this.chatStatuses.length;h++){var m=this.chatStatuses[h];if(l!=m)CSS.removeClass(f,m);}CSS.addClass(f,l);}}if(d<this.maxElements&&chatOptions.visibility){all_ids=Chat.getAvailableIds();for(var k=0;d<this.maxElements&&k<all_ids.length;k++)if(!b[all_ids[k]]&&ChatUserInfos[all_ids[k]]){availability=Chat.getAvailability(all_ids[k]);var g=this._faceTmpl.render();g.id="chat_facepile_extra_"+this.dynCounter;var a=XHPTemplate.getNode(g,'anchor');CSS.addClass(a,availability.i?'chatIdle':'chatOnline');var j=ChatUserInfos[all_ids[k]];var i=XHPTemplate.getNode(g,'img');i.setAttribute('src',j.thumbSrc);TooltipLink.setTooltipText(a,j.name);this.dynCounter++;this.chatFriends[g.id]={user_id:all_ids[k]};this.facepile.appendChild(g);d++;}}},initTypeahead:function(c,a,b){c.subscribe('focus',function(){c.getData().refreshData();});c.subscribe('reset',function(){CSS.show(a);CSS.hide(b);});c.subscribe('query',function(d,e){if(e.value){CSS.hide(a);e.results.length?CSS.hide(b):CSS.show(b);}else CSS.show(a);});c.subscribe('select',function(d,e){chatDisplay.focusTab(e.selected.uid,true);});}};
onloadRegister(function(){Event.listen(document.documentElement,'submit',function(b){var a=b.getTarget().getElementsByTagName('*');for(var c=0;c<a.length;c++)if(a[c].getAttribute('required')&&Input.isEmpty(a[c])){a[c].focus();return false;}},Event.Priority.URGENT);});
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
 */add_properties('TypeaheadRenderers',{basic:function(b,d){var f=b.markup||htmlize(b.text);var e=htmlize(b.subtext);var c=b.icon;var a='';if(b.type)a=' class="'+b.type+'"';return ['<li',a,'>',(c?'<img src="'+c+'" alt=""/>':''),(f?'<span class="text">'+f+'</span>':''),(e?'<span class="subtext">'+e+'</span>':''),'</li>'];}});

if (window.Bootloader) { Bootloader.done(["js\/dea8o13f1bcoogos.pkg.js"]); }