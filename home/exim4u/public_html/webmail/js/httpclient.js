function HTTPClient(){}HTTPClient.prototype={url:null,request:null,callInProgress:false,userhandler:null,init:function(A){this.url=A;try{this.request=new XMLHttpRequest()}catch(D){var C=["MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];var E=false;for(var B=0;B<C.length&&!E;B++){try{this.request=new ActiveXObject(C[B]);E=true}catch(D){}}if(!E){throw"Unable to create XMLHttpRequest."}}},asyncGET:function(B){if(!this.request){return false}if(this.callInProgress){throw"Call in progress"}this.callInProgress=true;this.userhandler=B;this.request.open("GET",this.url,true);var A=this;this.request.onreadystatechange=function(){A.stateChangeCallback(A)};this.request.send(null)},stateChangeCallback:function(B){switch(B.request.readyState){case 1:try{B.userhandler.onInit()}catch(C){}break;case 2:try{status=B.request.status;if(status!=200){B.userhandler.onError(status,B.request.statusText);B.request.abort();B.callInProgress=false}}catch(C){}break;case 3:try{var A;try{A=B.request.getResponseHeader("Content-Length")}catch(C){A=NaN}B.userhandler.onProgress(B.request.responseText,A)}catch(C){}break;case 4:try{B.userhandler.onLoad(B.request.responseText)}catch(C){}finally{B.callInProgress=false}break}}};