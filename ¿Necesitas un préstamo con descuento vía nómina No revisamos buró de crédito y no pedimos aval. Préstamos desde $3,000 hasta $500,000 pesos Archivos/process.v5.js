/*!
* Bowser - a browser detector
* https://github.com/ded/bowser
* MIT License | (c) Dustin Diaz 2015
*/!(function(root,name,definition){if(typeof module!='undefined'&&module.exports)
module.exports=definition()
else if(typeof define=='function'&&define.amd)define(name,definition)
else root[name]=definition()})(this,'bowser',function(){var t=true
function detect(ua){function getFirstMatch(regex){var match=ua.match(regex)
return(match&&match.length>1&&match[1])||''}
function getSecondMatch(regex){var match=ua.match(regex)
return(match&&match.length>1&&match[2])||''}
var iosdevice=getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase(),likeAndroid=/like android/i.test(ua),android=!likeAndroid&&/android/i.test(ua),nexusMobile=/nexus\s*[0-6]\s*/i.test(ua),nexusTablet=!nexusMobile&&/nexus\s*[0-9]+/i.test(ua),chromeos=/CrOS/.test(ua),silk=/silk/i.test(ua),sailfish=/sailfish/i.test(ua),tizen=/tizen/i.test(ua),webos=/(web|hpw)os/i.test(ua),windowsphone=/windows phone/i.test(ua),samsungBrowser=/SamsungBrowser/i.test(ua),windows=!windowsphone&&/windows/i.test(ua),mac=!iosdevice&&!silk&&/macintosh/i.test(ua),linux=!android&&!sailfish&&!tizen&&!webos&&/linux/i.test(ua),edgeVersion=getFirstMatch(/edge\/(\d+(\.\d+)?)/i),versionIdentifier=getFirstMatch(/version\/(\d+(\.\d+)?)/i),tablet=/tablet/i.test(ua)&&!/tablet pc/i.test(ua),mobile=!tablet&&/[^-]mobi/i.test(ua),xbox=/xbox/i.test(ua),result
if(/opera/i.test(ua)){result={name:'Opera',opera:t,version:versionIdentifier||getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)}}else if(/opr\/|opios/i.test(ua)){result={name:'Opera',opera:t,version:getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i)||versionIdentifier}}else if(/SamsungBrowser/i.test(ua)){result={name:'Samsung Internet for Android',samsungBrowser:t,version:versionIdentifier||getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)}}else if(/coast/i.test(ua)){result={name:'Opera Coast',coast:t,version:versionIdentifier||getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)}}else if(/yabrowser/i.test(ua)){result={name:'Yandex Browser',yandexbrowser:t,version:versionIdentifier||getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)}}else if(/ucbrowser/i.test(ua)){result={name:'UC Browser',ucbrowser:t,version:getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)}}else if(/mxios/i.test(ua)){result={name:'Maxthon',maxthon:t,version:getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)}}else if(/epiphany/i.test(ua)){result={name:'Epiphany',epiphany:t,version:getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)}}else if(/puffin/i.test(ua)){result={name:'Puffin',puffin:t,version:getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)}}else if(/sleipnir/i.test(ua)){result={name:'Sleipnir',sleipnir:t,version:getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)}}else if(/k-meleon/i.test(ua)){result={name:'K-Meleon',kMeleon:t,version:getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)}}else if(windowsphone){result={name:'Windows Phone',osname:'Windows Phone',windowsphone:t}
if(edgeVersion){result.msedge=t
result.version=edgeVersion}else{result.msie=t
result.version=getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)}}else if(/msie|trident/i.test(ua)){result={name:'Internet Explorer',msie:t,version:getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)}}else if(chromeos){result={name:'Chrome',osname:'Chrome OS',chromeos:t,chromeBook:t,chrome:t,version:getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}}else if(/chrome.+? edge/i.test(ua)){result={name:'Microsoft Edge',msedge:t,version:edgeVersion}}else if(/vivaldi/i.test(ua)){result={name:'Vivaldi',vivaldi:t,version:getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i)||versionIdentifier}}else if(sailfish){result={name:'Sailfish',osname:'Sailfish OS',sailfish:t,version:getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)}}else if(/seamonkey\//i.test(ua)){result={name:'SeaMonkey',seamonkey:t,version:getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)}}else if(/firefox|iceweasel|fxios/i.test(ua)){result={name:'Firefox',firefox:t,version:getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)}
if(/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)){result.firefoxos=t
result.osname='Firefox OS'}}else if(silk){result={name:'Amazon Silk',silk:t,version:getFirstMatch(/silk\/(\d+(\.\d+)?)/i)}}else if(/phantom/i.test(ua)){result={name:'PhantomJS',phantom:t,version:getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)}}else if(/slimerjs/i.test(ua)){result={name:'SlimerJS',slimer:t,version:getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)}}else if(/blackberry|\bbb\d+/i.test(ua)||/rim\stablet/i.test(ua)){result={name:'BlackBerry',osname:'BlackBerry OS',blackberry:t,version:versionIdentifier||getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)}}else if(webos){result={name:'WebOS',osname:'WebOS',webos:t,version:versionIdentifier||getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)};/touchpad\//i.test(ua)&&(result.touchpad=t)}else if(/bada/i.test(ua)){result={name:'Bada',osname:'Bada',bada:t,version:getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)}}else if(tizen){result={name:'Tizen',osname:'Tizen',tizen:t,version:getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i)||versionIdentifier}}else if(/qupzilla/i.test(ua)){result={name:'QupZilla',qupzilla:t,version:getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i)||versionIdentifier}}else if(/chromium/i.test(ua)){result={name:'Chromium',chromium:t,version:getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i)||versionIdentifier}}else if(/chrome|crios|crmo/i.test(ua)){result={name:'Chrome',chrome:t,version:getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}}else if(android){result={name:'Android',version:versionIdentifier}}else if(/safari|applewebkit/i.test(ua)){result={name:'Safari',safari:t}
if(versionIdentifier){result.version=versionIdentifier}}else if(iosdevice){result={name:iosdevice=='iphone'?'iPhone':iosdevice=='ipad'?'iPad':'iPod'}
if(versionIdentifier){result.version=versionIdentifier}}else if(/googlebot/i.test(ua)){result={name:'Googlebot',googlebot:t,version:getFirstMatch(/googlebot\/(\d+(\.\d+))/i)||versionIdentifier}}else{result={name:getFirstMatch(/^(.*)\/(.*) /),version:getSecondMatch(/^(.*)\/(.*) /)}}
if(!result.msedge&&/(apple)?webkit/i.test(ua)){if(/(apple)?webkit\/537\.36/i.test(ua)){result.name=result.name||'Blink'
result.blink=t}else{result.name=result.name||'Webkit'
result.webkit=t}
if(!result.version&&versionIdentifier){result.version=versionIdentifier}}else if(!result.opera&&/gecko\//i.test(ua)){result.name=result.name||'Gecko'
result.gecko=t
result.version=result.version||getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)}
if(!result.windowsphone&&!result.msedge&&(android||result.silk)){result.android=t
result.osname='Android'}else if(!result.windowsphone&&!result.msedge&&iosdevice){result[iosdevice]=t
result.ios=t
result.osname='iOS'}else if(mac){result.mac=t
result.osname='macOS'}else if(xbox){result.xbox=t
result.osname='Xbox'}else if(windows){result.windows=t
result.osname='Windows'}else if(linux){result.linux=t
result.osname='Linux'}
function getWindowsVersion(s){switch(s){case 'NT':return 'NT'
case 'XP':return 'XP'
case 'NT 5.0':return '2000'
case 'NT 5.1':return 'XP'
case 'NT 5.2':return '2003'
case 'NT 6.0':return 'Vista'
case 'NT 6.1':return '7'
case 'NT 6.2':return '8'
case 'NT 6.3':return '8.1'
case 'NT 10.0':return '10'
default:return undefined}}
var osVersion=''
if(result.windows){osVersion=getWindowsVersion(getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i))}else if(result.windowsphone){osVersion=getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i)}else if(result.mac){osVersion=getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i)
osVersion=osVersion.replace(/[_\s]/g,'.')}else if(iosdevice){osVersion=getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i)
osVersion=osVersion.replace(/[_\s]/g,'.')}else if(android){osVersion=getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i)}else if(result.webos){osVersion=getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i)}else if(result.blackberry){osVersion=getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i)}else if(result.bada){osVersion=getFirstMatch(/bada\/(\d+(\.\d+)*)/i)}else if(result.tizen){osVersion=getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i)}
if(osVersion){result.osversion=osVersion}
var osMajorVersion=!result.windows&&osVersion.split('.')[0]
if(tablet||nexusTablet||iosdevice=='ipad'||(android&&(osMajorVersion==3||(osMajorVersion>=4&&!mobile)))||result.silk){result.tablet=t}else if(mobile||iosdevice=='iphone'||iosdevice=='ipod'||android||nexusMobile||result.blackberry||result.webos||result.bada){result.mobile=t}
if(result.msedge||(result.msie&&result.version>=10)||(result.yandexbrowser&&result.version>=15)||(result.vivaldi&&result.version>=1.0)||(result.chrome&&result.version>=20)||(result.samsungBrowser&&result.version>=4)||(result.firefox&&result.version>=20.0)||(result.safari&&result.version>=6)||(result.opera&&result.version>=10.0)||(result.ios&&result.osversion&&result.osversion.split('.')[0]>=6)||(result.blackberry&&result.version>=10.1)||(result.chromium&&result.version>=20)){result.a=t}else if((result.msie&&result.version<10)||(result.chrome&&result.version<20)||(result.firefox&&result.version<20.0)||(result.safari&&result.version<6)||(result.opera&&result.version<10.0)||(result.ios&&result.osversion&&result.osversion.split('.')[0]<6)||(result.chromium&&result.version<20)){result.c=t}else result.x=t
return result}
var bowser=detect(typeof navigator!=='undefined'?navigator.userAgent||'':'')
bowser.test=function(browserList){for(var i=0;i<browserList.length;++i){var browserItem=browserList[i]
if(typeof browserItem==='string'){if(browserItem in bowser){return true}}}
return false}
function getVersionPrecision(version){return version.split('.').length}
function map(arr,iterator){var result=[],i
if(Array.prototype.map){return Array.prototype.map.call(arr,iterator)}
for(i=0;i<arr.length;i++){result.push(iterator(arr[i]))}
return result}
function compareVersions(versions){var precision=Math.max(getVersionPrecision(versions[0]),getVersionPrecision(versions[1]))
var chunks=map(versions,function(version){var delta=precision-getVersionPrecision(version)
version=version+new Array(delta+1).join('.0')
return map(version.split('.'),function(chunk){return new Array(20-chunk.length).join('0')+chunk}).reverse()})
while(--precision>=0){if(chunks[0][precision]>chunks[1][precision]){return 1}else if(chunks[0][precision]===chunks[1][precision]){if(precision===0){return 0}}else{return-1}}}
function isUnsupportedBrowser(minVersions,strictMode,ua){var _bowser=bowser
if(typeof strictMode==='string'){ua=strictMode
strictMode=void 0}
if(strictMode===void 0){strictMode=false}
if(ua){_bowser=detect(ua)}
var version=''+_bowser.version
for(var browser in minVersions){if(minVersions.hasOwnProperty(browser)){if(_bowser[browser]){if(typeof minVersions[browser]!=='string'){throw new Error('Browser version in the minVersion map should be a string: '+
browser+
': '+
String(minVersions))}
return compareVersions([version,minVersions[browser]])<0}}}
return strictMode}
function check(minVersions,strictMode,ua){return!isUnsupportedBrowser(minVersions,strictMode,ua)}
bowser.isUnsupportedBrowser=isUnsupportedBrowser
bowser.compareVersions=compareVersions
bowser.check=check
bowser._detect=detect
return bowser});(function(root,factory){if(typeof define==='function'&&define.amd){define(function(){return factory(root,document,{})})}else if(typeof exports!=='undefined'){if(global&&global.testEnv){factory(global.testEnv,global.testEnv.document,exports)}else{factory(root,document,exports)}}else{root.Bounceback=factory(root,document,{})}})(window,function(root,doc,Bounceback){var addEvent=function(elm,evt,cb){if(elm.attachEvent){elm.attachEvent('on'+evt,cb)}else{elm.addEventListener(evt,cb,false)}}
var oldBounceback=root.Bounceback
Bounceback.noConflict=function(){root.Bounceback=oldBounceback
return this}
Bounceback.version='1.0.0'
Bounceback.options={distance:100,maxDisplay:1,method:'auto',sensitivity:10,cookieLife:365,scrollDelay:500,aggressive:false,checkReferrer:true,storeName:'bounceback-visited',onBounce:function(){return Bounceback}}
Bounceback.data={get:function(key){if(root.localStorage){return root.localStorage.getItem(key)||''}else{var cookies=doc.cookie.split(';')
var i=-1,data=[],cVal='',cName='',length=cookies.length
while(++i<length){data=cookies[i].split('=')
if(data[0]==key){data.shift()
return data.join('=')}}
return ''}},set:function(key,value){if(root.localStorage){root.localStorage.setItem(key,value)}else{var dt=new Date()
dt.setDate(dt.getDate()+Bounceback.options.cookieLife)
doc.cookie=key+'='+value+'; expires='+dt.toUTCString()+';path=/;'}
return this}}
var shown=0
Bounceback.onBounce=function(){shown++
if(!this.options.maxDisplay||shown<=this.options.maxDisplay){this.options.onBounce()}}
Bounceback.isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(root.navigator.userAgent)
Bounceback.disabled=false
Bounceback.activated=false
Bounceback.disable=function(){this.disabled=true
return this}
Bounceback.enable=function(){this.disabled=false
return this}
Bounceback.activate=function(method){if(method=='history'){if('replaceState'in root.history){root.history.replaceState({isBouncing:true},root.title)
root.history.pushState(null,root.title)
addEvent(root,'popstate',function(e){if(root.history.state&&root.history.state.isBouncing){Bounceback.onBounce()}})}else if('onhashchange'in root){root.location.replace('#bht')
root.location.hash=''
addEvent(root,'hashchange',function(){if(root.location.hash.substr(-3)==='bht'){Bounceback.onBounce()}})}}else{var timer=null,movements=[],scrolling=false
addEvent(doc,'mousemove',function(e){movements.unshift({x:e.clientX,y:e.clientY})
movements=movements.slice(0,10)})
addEvent(doc,'mouseout',function(e){if(!Bounceback.disabled){var from=e.relatedTarget||e.toElement
if((!from||from.nodeName=='HTML')&&e.clientY<=Bounceback.options.distance&&movements.length==10&&movements[0].y<movements[9].y&&movements[9].y-movements[0].y>Bounceback.options.sensitivity){Bounceback.onBounce()}}})
if(this.options.scrollDelay){addEvent(root,'scroll',function(e){if(!Bounceback.disabled){Bounceback.disabled=true
clearTimeout(timer)
timer=setTimeout(function(){Bounceback.disabled=false},Bounceback.options.scrollDelay)}})}}}
Bounceback.init=function(options){options=options||{}
var key
for(key in this.options){if(this.options.hasOwnProperty(key)&&!options.hasOwnProperty(key)){options[key]=this.options[key]}}
this.options=options
if(options.checkReferrer&&doc.referrer){var a=doc.createElement('a')
a.href=doc.referrer
if(a.host==root.location.host){this.data.set(options.storeName,'1')}}
if(!this.activated&&(options.aggressive||!this.data.get(options.storeName))){this.activated=true
if(options.method==='history'||(options.method==='auto'&&this.isMobile)){this.activate('history')}else{this.activate('mouse')}
this.data.set(options.storeName,'1')}
return this}
return Bounceback})
function getScrollPercent(){var h=document.documentElement,b=document.body,st='scrollTop',sh='scrollHeight'
return((h[st]||b[st])/((h[sh]||b[sh])-h.clientHeight))*100}
function displayPopup(){if(typeof bowser.mobile!=='undefined'&&document.querySelector('[hide-mobile="true"]')){return}
if(typeof bowser.tablet!=='undefined'&&document.querySelector('[hide-tablet="true"]')){return}
window.POPUP_COOKIE_NAME_CLOSE=window.UNIQUE_FORM_ID+'-close'
if(!checkC(window.POPUP_COOKIE_NAME_CLOSE)){document.querySelector('[data-popup=popup]').style.display='block'}}
function closePopup(forDays){if(forDays===0){forDays=0.02}
setCDays(window.POPUP_COOKIE_NAME_CLOSE,true,forDays)
document.querySelector('[data-popup=popup]').style.display='none'}
function C(k){return(document.cookie.match('(^|; )'+k+'=([^;]*)')||0)[2]}
function param(object){var encodedString=''
for(var prop in object){if(object.hasOwnProperty(prop)){if(encodedString.length>0){encodedString+='&'}
encodedString+=encodeURI(prop+'='+object[prop])}}
return encodedString}
function getSelectValues(select){var result=[];var options=select&&select.options;var opt;for(var i=0,iLen=options.length;i<iLen;i++){opt=options[i];if(opt.selected){result.push(opt.value||opt.text);}}
return result;}
var form
var formIsReady=false
window.PROCESS_LIB_LOADED=false
function setupForm(){let global_i=0
form=document.querySelectorAll('#f25a5fab_id')
console.log('Setting up form...')
var errorMessage='Error submitting the form'
for(let i=0;i<form.length;i++){form[i].setAttribute('action',document.querySelectorAll('input[name="form_action"]')[i].value)}
for(let i=0;i<form.length;i++){form[i].onsubmit=function(e){e.preventDefault()
var data=[],data_submit={}
for(let k=0;k<form.length;k++){let form_temp=form[k]
for(let j=0;j<form_temp.length;++j){let input;input=form_temp[j];if(input.name){if(input.type==='checkbox'){if(input.checked){data_submit[input.name]=input.value}}else if(input.type==='select-multiple'){let multipleValues=getSelectValues(input);data_submit[input.name]=multipleValues}else if(input.name==='telephone'){let itiSelectedFlag=form_temp.getElementsByClassName('iti__selected-flag');if(itiSelectedFlag.length>0){let prefixArray=itiSelectedFlag[itiSelectedFlag.length-1].getAttribute('title').split(' ');if(prefixArray){let prefix=prefixArray[prefixArray.length-1];data_submit['phone']=prefix+input.value}else{data_submit['phone']=input.value}}else{data_submit['phone']=input.value}}else{data_submit[input.name]=input.value.replace(';',',')}}}
if(vk){data_submit.visitor_key=vk}
data_submit.window_location_href=window.location.href
data.push(data_submit)
data_submit={}}
var xhr=new XMLHttpRequest()
xhr.open('POST',document.querySelectorAll('input[name="form_action"]')
[i].value.toString(),true)
xhr.setRequestHeader('Accept','application/x-www-form-urlencoded; charset=utf-8')
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
xhr.send(param(data[i]))
global_i=i
xhr.onloadend=function(response){var errorMsg=document.querySelectorAll('#form_error_id')[global_i]
var successMsg=document.querySelectorAll('#form_success_id')[global_i]
var formType='form'
if(document.querySelector('[data-view=form]')!==null){formType='popup'}
document.querySelectorAll('#f25a5fab_id')[global_i].style.opacity=1
if(response.target.status===0||response.target.status===400){if(formType==='form'){errorMsg.innerText=errorMessage
errorMsg.style.display='block'
successMsg.style.display='none'}else{alert(errorMessage)}}else if(response.target.status===200){var responseObj=JSON.parse(xhr.responseText)
if(responseObj.success){if(responseObj.tracking_pixel){var i=document.createElement('img');i.src=responseObj.tracking_pixel;i.alt='image';i.style.display='none';document.body.appendChild(i)}
form[global_i].reset()
if(formType==='form'){errorMsg.style.display='none'
if(responseObj.success_option==='message'){successMsg.innerText=responseObj.success_text
successMsg.style.display='block'}else if(responseObj.success_option==='redirection'||responseObj.success_option==='landingpage'){document.location=responseObj.success_text}}else{if(responseObj.success_option==='redirection'||responseObj.success_option==='landingpage'){document.location=responseObj.success_text}else{document.querySelectorAll('[data-view=form]')[global_i].style.display='none'
document.querySelectorAll('[data-view=success]')[global_i].style.display='block'}}}else{if(formType==='form'){errorMsg.innerText=errorMessage
errorMsg.style.display='block'
successMsg.style.display='none'}else{alert(errorMessage)}}}}}}
formIsReady=true
window.PROCESS_LIB_LOADED=true}