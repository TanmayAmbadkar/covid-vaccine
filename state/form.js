var form = document.querySelector('form');

form.onsubmit = function() {
  // Populate hidden form on submit
	document.getElementById('details').innerHTML = '';
	
	var state = document.querySelector('select[name=state]').value;
	var district = document.querySelector('select[name=district]').value;
	var fdate = document.querySelector('input[name=fdate]').value;
	fdate = fdate.split('-').reverse().join('-');
	let url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+district_data[district]+"&date="+fdate;
	console.log(url);
	fetch(url).then(function(response){

		return response.json();

	}).then(function(jsondata){

		formatData(jsondata);

	});
	
	return false;
};

function formatData(data)
{	
	
	console.log(data);
	document.getElementById('details').innerHTML = '';
	data['sessions'].forEach(present);
	
	if(data['sessions'].length==0)
		document.getElementById('details').innerHTML = "No Data available!";
	
	else
	{
		console.log(document.getElementsByTagName("main").offsetHeight +'px');
		//document.body.style.height = document.getElementsByTagName("main").Height +'px';
		document.getElementsByTagName("main").height="100%";
	}
}


function present(item, index)
{	
	//let div = document.createElement('div').setAttribute("id", "list"+index);
	var listele = document.createElement("li");
	var node = document.createElement("ul");
	// Create a <li> node
	var node1 = document.createElement("li");
	let name = document.createTextNode("Name: "+ item['name']+"\n");
	
	var node2 = document.createElement("li");
	let pincode = document.createTextNode("Pincode: "+ item['pincode']+"\n");
	
	var node3 = document.createElement("li");
	let date = document.createTextNode("Date: "+ item['date']+"\n");
	
	var node4 = document.createElement("li");
	let cap = document.createTextNode("Available Capacity: "+ item['available_capacity']+"\n");
	
	var node5 = document.createElement("li");
	let vacc = document.createTextNode("Vaccine: "+ item['vaccine']+"\n");
	
	var node6 = document.createElement("li");
	let fee = document.createTextNode("Fee: "+ item['fee_type']+"\n");
	
	var node7 = document.createElement("li");
	let age = document.createTextNode("Minimum age limit: "+ item['min_age_limit']+"\n");
	
	var node8 = document.createElement("li");
	let time = document.createTextNode("From: "+ item['from']+" To: "+ item['to']);
	
	node1.appendChild(name);
	node2.appendChild(pincode);
	node3.appendChild(date);
	node4.appendChild(cap);
	node5.appendChild(vacc);
	node6.appendChild(fee);
	node7.appendChild(age);
	node8.appendChild(time);
	node.appendChild(node1);
	node.appendChild(node2);
	node.appendChild(node3);
	node.appendChild(node4);
	node.appendChild(node5);
	node.appendChild(node6);
	node.appendChild(node7);
	node.appendChild(node8);
	listele.append(node);
	document.getElementById("details").appendChild(listele);   
	
}
