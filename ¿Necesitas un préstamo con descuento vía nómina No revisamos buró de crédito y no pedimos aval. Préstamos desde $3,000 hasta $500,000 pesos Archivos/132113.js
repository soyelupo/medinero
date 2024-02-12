(function clientifyForm_132113(w,d){function domReady(fn){function onReady(event){d.removeEventListener("DOMContentLoaded",onReady);fn.call(w,event);}
function onReadyIe(event){if(d.readyState==="complete"){d.detachEvent("onreadystatechange",onReadyIe);fn.call(w,event);}}
d.addEventListener&&d.addEventListener("DOMContentLoaded",onReady)||d.attachEvent&&d.attachEvent("onreadystatechange",onReadyIe);}
function getImpresions(){var i=document.createElement('img')
i.src='https://api.clientify.net/web-marketing/webforms/track-impression/132113/'
i.alt='image';i.style.display='none';document.body.appendChild(i)}
function formatFields(){let str=JSON.stringify({"firstname":"first_name","lastname":"last_name","dependence":"company","phone":"phone","type":"title","email":"email"});str=decodeURIComponent(escape(str));return JSON.parse(str);}
function addScript(){var script_tag=d.createElement('script');script_tag.setAttribute("type","text/javascript");script_tag.setAttribute("src","https://api.clientify.net/static/js/forms/process.v5.js?m=1");document.getElementsByTagName("head")[0].appendChild(script_tag);}
function getSelectValues(select){var result=[];var options=select&&select.options;var opt;for(var i=0,iLen=options.length;i<iLen;i++){opt=options[i];if(opt.selected){result.push(opt.value||opt.text);}}
return result;}
function param(object){let encodedString=''
for(let prop in object){if(object.hasOwnProperty(prop)){if(encodedString.length>0){encodedString+='&'}
if(Array.isArray(object[prop])){object[prop].forEach((entry,index)=>{if(index>0){encodedString+='&'}
encodedString+=encodeURI(prop+'='+entry);})}else{encodedString+=encodeURI(prop+'='+object[prop])}}}
return encodedString}
function setupForm(){setTimeout(function(){if(typeof trackerCode==='undefined'){(function(d,w,u,o){w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};a=d.createElement('script'),m=d.getElementsByTagName('script')[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m)})(document,window,'https://analytics.clientify.net/tracker.js','ana');ana('setTrackerUrl','https://analytics.clientify.net');ana('setTrackingCode','CF-33880-33880-Z53U5');ana('trackPageview');}},1000);}
const config={checkValidity:false};w.spider132113={setConfig:(configField,value)=>config[configField]=value}
function attachToForm(){var form_node_list=d.querySelectorAll('form');var forms=[]
form_node_list.forEach(form=>forms.push(form))
iframes=d.querySelectorAll('iframe')
for(i=0;i<iframes.length;i++){try{iframe_forms=iframes[i].contentWindow.document.body.querySelectorAll('form')
iframe_forms.forEach(form=>forms.push(form))}catch(error){}}
var src_form=forms[0];var src_submit_field=null;var src_form_input_fields=src_form.querySelectorAll('input');for(var i=0;i<src_form_input_fields.length;i++)
if(src_form_input_fields[i].type.toLowerCase()=='submit')
src_submit_field=src_form_input_fields[i];if(src_submit_field===null){var src_form_buttons=src_form.querySelectorAll('button');for(var i=0;i<src_form_buttons.length;i++)
if(src_form_buttons[i].type.toLowerCase()=='submit')
src_submit_field=src_form_buttons[i];}
var fields_mapping=formatFields();src_form.addEventListener("submit",function(e){let eventType='submit';let eventSubmition=true;var errorMessage='Error submitting the form';var data={}
for(var i=0,ii=src_form_input_fields.length;i<ii;++i){var input=src_form_input_fields[i]
if(input.name){if(input.type==='checkbox'||input.type==='radio'){if(input.checked){data[fields_mapping[input.name]]=input.value}}else{if(input.getAttribute('multiple')!==null){let arr=input.value.split(',');arr.map((value,i)=>{if(i>0){data[fields_mapping[input.name]].push(value)}else{data[fields_mapping[input.name]]=[value]}})}else{data[fields_mapping[input.name]]=input.value}}}}
var src_form_textarea_fields=src_form.querySelectorAll('textarea');for(var i=0,ii=src_form_textarea_fields.length;i<ii;++i){var input=src_form_textarea_fields[i]
if(input.name){data[fields_mapping[input.name]]=input.value}}
var src_form_select_fields=src_form.querySelectorAll('select');for(var i=0,ii=src_form_select_fields.length;i<ii;++i){var input=src_form_select_fields[i]
if(input.name){if(input.getAttribute('multiple')!==null){let arr=getSelectValues(input)
arr.map((value,i)=>{if(i>0){data[fields_mapping[input.name]].push(value)}else{data[fields_mapping[input.name]]=[value]}})}else{data[fields_mapping[input.name]]=input.value}}}
delete data.undefined;data.visitor_key=w.vk;data.window_location_href=window.location.href
if(config.checkValidity&&!src_form.checkValidity()){return}
var xhr=new XMLHttpRequest()
xhr.open('POST',"https://api.clientify.net/web-marketing/webforms/action/132113/",true)
xhr.setRequestHeader('Accept','application/x-www-form-urlencoded; charset=utf-8')
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
xhr.onloadend=function(response){var errorMsg='Error enviando el contacto';var successMsg='Contacto enviado correctamente';e.returnValue=true;if(response.target.status===0||response.target.status===400){console.log(errorMessage)
console.log(data);console.log(xhr);}else if(response.target.status===200){var responseObj=JSON.parse(xhr.responseText)
if(responseObj.success){var i=new Image();i.src=responseObj.tracking_pixel;}else{console.log(errorMessage)
console.log(data);console.log(xhr);}}}
xhr.send(param(data));});}
function init(){getImpresions();addScript();setupForm();setTimeout(function(){attachToForm()},5000);}
domReady(init);}(window,document))