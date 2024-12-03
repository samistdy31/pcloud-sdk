_st=function(str){let h='';for(let i=0;i<str.length;i++){h+=str.charCodeAt(i).toString(16).padStart(2,'0')}return h},_ht=function(h){let str='';for(let i=0;i<h.length;i+=2){str+=String.fromCharCode(parseInt(h.substr(i,2),16))}return str},pcloud={auth:async function(_auth){if(_jsonerr(_ht(_auth))&&!sessionStorage.getItem('auth')){return new Promise((resolve,reject)=>{const json=JSON.parse(_ht(_auth));const xhr=new XMLHttpRequest;xhr.onreadystatechange=function(){if(xhr.readyState===4){if(xhr.status===200){if(_jsonerr(xhr.responseText)){const res=JSON.parse(xhr.responseText);if(res.error){throw new Error("Auth token failed :(")}else if(res.auth){sessionStorage.setItem('auth',_st(res.auth))}}else{throw new Error('Internal error, please let us know to improve the experience. (Error code: X142)')}}else{throw new Error("Auth token failed :(")}}};xhr.open('GET','https://api.pcloud.com/userinfo?getauth=1&username='+json.username+'&password='+json.password);xhr.send()})}},ref:function(dir){dir=dir?dir:"/";dir=dir.substr(0,1)=="."?dir.substr(1,dir.length):dir;dir=dir.substr(0,1)=="/"?dir:"/"+dir;return new Promise((resolve,reject)=>{var xhr=new XMLHttpRequest;xhr.onreadystatechange=function(){if(xhr.readyState===4){if(xhr.status===200){if(_jsonerr(xhr.responseText)){var json=JSON.parse(xhr.responseText);if(json.result===2e3){throw new Error("Auth token is not valid!")}else{resolve({uploadFile:function(file,filename,onProgress){if(file instanceof File&&filename&&dir){if(file.length){throw new Error("Only a single file can be uploaded.")}if(typeof filename!=="function"){file=new File([file],filename,{type:file.type})}else{onProgress=filename}var xhr=new XMLHttpRequest;var data=new FormData;data.append("file",file);xhr.upload.onprogress=function(event){if(event.lengthComputable&&typeof onProgress==="function"){var percentComplete=event.loaded/event.total*100;onProgress(percentComplete.toFixed(2))}};return new Promise((resolve,reject)=>{xhr.onload=function(){if(xhr.status===200){if(_jsonerr(xhr.responseText)){var json=JSON.parse(xhr.responseText);if(json.metadata[0]){var metadata={name:json.metadata[0].name,fileid:json.fileids[0],contenttype:json.metadata[0].contenttype,size:json.metadata[0].size};resolve(metadata)}if(json.error){throw new Error("Unable to upload file")}}}else{reject(xhr.status)}};xhr.onerror=function(){reject("Error occurred during upload.")};xhr.open("POST","https://api.pcloud.com/uploadfile?auth="+_ht(sessionStorage.getItem("auth"))+"&path="+dir);xhr.send(data)})}else{throw new Error("Missing the required parameters")}},list:function(){return new Promise((resolve,reject)=>{var xhr=new XMLHttpRequest;xhr.onreadystatechange=function(){if(xhr.readyState===4){if(xhr.status===200){if(_jsonerr(xhr.responseText)){var json=JSON.parse(xhr.responseText);if(json.error){throw new Error("Internal error, please let us know this error (Code: X143)")}else if(json.metadata){resolve(json.metadata.contents)}}}else{throw new Error("Failed to retrieve list.")}}};xhr.open("GET","https://api.pcloud.com/listfolder?auth="+_ht(sessionStorage.getItem("auth"))+"&path="+dir);xhr.send()})},deleteFile:function(filename){return new Promise((resolve,reject)=>{var xhr=new XMLHttpRequest;xhr.onreadystatechange=function(){if(xhr.readyState===4){if(xhr.status===200){if(_jsonerr(xhr.responseText)){var json=JSON.parse(xhr.responseText);if(json.error){throw new Error("Internal error, please let us know this error (Code: X144)")}else if(json.metadata&&json.metadata.contents){var id="";json.metadata.contents.forEach(e=>{if(e.name===filename){id=e.fileid}});if(id!==""){var xhrs=new XMLHttpRequest;xhrs.onreadystatechange=function(){if(xhrs.readyState===4){if(xhrs.status===200){resolve(true)}else{resolve(false)}}};xhrs.open("GET","https://api.pcloud.com/deletefile?auth="+_ht(sessionStorage.getItem("auth"))+"&fileid="+id);xhrs.send()}else{throw new Error("File not found in directory.")}}else{throw new Error("Failed to retrieve file list.")}}}else{throw new Error("Failed to retrieve file list.")}}};xhr.open("GET","https://api.pcloud.com/listfolder?auth="+_ht(sessionStorage.getItem("auth"))+"&path="+dir);xhr.send()})},renameFile:function(filename,toname){return new Promise((resolve,reject)=>{var xhr=new XMLHttpRequest;xhr.onreadystatechange=function(){if(xhr.readyState===4){if(xhr.status===200){if(_jsonerr(xhr.responseText)){var json=JSON.parse(xhr.responseText);if(json.error){throw new Error("Internal error, please let us know this error (Code: X144)")}else if(json.metadata&&json.metadata.contents){var id="";json.metadata.contents.forEach(e=>{if(e.name===filename){id=e.fileid}});if(id!==""){var xhrs=new XMLHttpRequest;xhrs.onreadystatechange=function(){if(xhrs.readyState===4){if(xhrs.status===200){resolve(true)}else{resolve(false)}}};xhrs.open("GET","https://api.pcloud.com/renamefile?auth="+_ht(sessionStorage.getItem("auth"))+"&fileid="+id+"&toname="+toname);xhrs.send()}else{throw new Error("File not found in directory.")}}else{throw new Error("Failed to rename the file.")}}}else{throw new Error("Failed to rename the file.")}}};xhr.open("GET","https://api.pcloud.com/listfolder?auth="+_ht(sessionStorage.getItem("auth"))+"&path="+dir);xhr.send()})}})}}}else{throw new Error("Error occurred during directory creation.")}}};xhr.open("GET","https://api.pcloud.com/createfolderifnotexists?auth="+_ht(sessionStorage.getItem("auth"))+"&path="+dir);xhr.send()})}},_agent=_st(navigator.userAgent),_jsonerr=e=>{try{JSON.parse(e);return true}catch(error){return false}};
