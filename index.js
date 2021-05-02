var form = document.querySelector('form');
form.onsubmit = function() {
  // Populate hidden form on submit
	var pincode = document.querySelector('input[name=pincode]');
	var date = document.querySelector('input[name=date]');

	let url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+pincode.value+"&date="+date.value;
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
	let date = document.createTextNode("Date: "+ item['date']+"\n");
	
	var node3 = document.createElement("li");
	let cap = document.createTextNode("Available Capacity: "+ item['available_capacity']+"\n");
	
	var node4 = document.createElement("li");
	let vacc = document.createTextNode("Vaccine: "+ item['vaccine']+"\n");
	
	var node5 = document.createElement("li");
	let fee = document.createTextNode("Fee: "+ item['fee_type']+"\n");
	
	node1.appendChild(name);
	node2.appendChild(date);
	node3.appendChild(cap);
	node4.appendChild(vacc);
	node5.appendChild(fee);
	node.appendChild(node1);
	node.appendChild(node2);
	node.appendChild(node3);
	node.appendChild(node4);
	node.appendChild(node5);
	listele.append(node);
	document.getElementById("details").appendChild(listele);   
	
}
