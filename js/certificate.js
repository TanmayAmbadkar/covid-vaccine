var form_cert = document.getElementById('form4');
var txnId = "";
var otp = "";
var auth = "";

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}


form_cert.onsubmit = function() {
	
	document.getElementById('details').innerHTML = '';
	var mobile = document.querySelector('input[name=mobile]').value;
	console.log(mobile);
	
	var url='https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP';
	
	var data = JSON.stringify({"mobile": mobile});
	fetch(url, {
		method: "POST", 
		body:data, 
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	}).then(function(response){

		return response.json();

	}).then(function(jsondata){
	
		txnId = jsondata['txnId'];
		changeForm();
		
	}).catch(() => {
		
		document.getElementById('errors').innerHTML = "Error";
	
	});
	return false;
};

function changeForm(){
	
	document.getElementById('form4').style.display = "none";
	document.getElementById('form5').style.display = "block";

}	

var form_otp = document.getElementById('form5');
form_otp.onsubmit = function() {
	
	document.getElementById('details').innerHTML = '';
	var otp = document.querySelector('input[name=otp]').value;
	
	sha256(otp).then((value)=>{
		sendOTP(value);
	});	
	return false;
}

function sendOTP(value){
	
	otp = value;
	var url='https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP';
	
	var data = JSON.stringify({"otp": value, "txnId": txnId});
	fetch(url, {
		method: "POST", 
		body:data, 
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	}).then(function(response){

		return response.json();

	}).then(function(jsondata){
	
		token = jsondata['token'];
		
		auth = token;
		changeForm2();
		
	}).catch(() => {
		
		document.getElementById('errors').innerHTML = "Error";
	
	});
}

function changeForm2()
{
	document.getElementById('form5').style.display = "none";
	document.getElementById('form6').style.display = "block";
}

var cert_form = document.getElementById('form6');

cert_form.onsubmit = function(){
	
	document.getElementById('details').innerHTML = '';
	var bearer = document.querySelector('input[name=bearer]').value;
	var url = 'https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id='+bearer;
	var header = {"Authorization": "Bearer "+auth, "accept": "application/pdf"};
	
	fetch(url, {
		method: "GET", 
		headers: header;
	}).then(async res => ({
        filename: fnGetFileNameFromContentDispostionHeader(res.headers.get('content-disposition')),
        blob: await res.blob()
    }))
    .then(resObj => {
        // It is necessary to create a new blob object with mime-type explicitly set for all browsers except Chrome, but it works for Chrome too.
        const newBlob = new Blob([resObj.blob], { type: 'application/pdf' });

        // MS Edge and IE don't allow using a blob object directly as link href, instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
        } else {
            // For other browsers: create a link pointing to the ObjectURL containing the blob.
            const objUrl = window.URL.createObjectURL(newBlob);

            let link = document.createElement('a');
            link.href = objUrl;
            link.download = resObj.filename;
            link.click();

            // For Firefox it is necessary to delay revoking the ObjectURL.
            setTimeout(() => { window.URL.revokeObjectURL(objUrl); }, 250);
        }
    })
    .catch((error) => {
        console.log('DOWNLOAD ERROR', error);
    });
	

	
}