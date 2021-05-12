function displayStateData(data)
{
	var states = "<option value=\"\" disabled selected>Select</option>";
	for(let i=0;i<data.length;i++) 
	{
		state_data[data[i]["state_name"]] = data[i]["state_id"];
		states += "<option>" + data[i]["state_name"] + "</option>";
	}
	document.getElementById("statecal").innerHTML = states;
}


function changeDistrictData(data) 
{
	var districts = "<option value=\"\" disabled selected>Select</option>";
	
	for(let i=0;i<data.length;i++) 
	{
		district_data[data[i]["district_name"]] = data[i]["district_id"];
		districts += "<option>" + data[i]["district_name"] + "</option>";
	}
	document.getElementById("districtcal").innerHTML = districts;
}

var form_cal = document.getElementById('form3');

form_cal.onsubmit = function() {
	
	document.getElementById('details').innerHTML = '';
	var state = document.querySelector('select[name=statecal]').value;
	var district = document.querySelector('select[name=districtcal]').value;
	var fdate = document.querySelector('input[name=datecal]').value;
	fdate = fdate.split('-').reverse().join('-');
	let url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+district_data[district]+"&date="+fdate;
	fetch(url).then(function(response){

		return response.json();

	}).then(function(jsondata){

		formatDataCal(jsondata);

	});
	return false;
};

function formatDataCal(data)
{	
	data['centers'].forEach(presentDistCal);
	
	if(data['centers'].length==0)
		document.getElementById('details').innerHTML = "No Data available!";	
}

function presentDistCal(item, index)
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
	let address = document.createTextNode("Address: "+ item['address']+"\n");
	
	//var node4 = document.createElement("li");
	//let cap = document.createTextNode("Available Capacity: "+ item['available_capacity']+"\n");
	
	var node5 = document.createElement("li");
	let vacc = document.createTextNode("Vaccine: "+ item['sessions'][0]['vaccine']+"\n");
	
	var node6 = document.createElement("li");
	let fee = document.createTextNode("Fee: "+ item['fee_type']+"\n");
	
	//var node7 = document.createElement("li");
	//let age = document.createTextNode("Minimum age limit: "+ item['min_age_limit']+"\n");
	
	//var node8 = document.createElement("li");
	//let time = document.createTextNode("From: "+ item['from']+" To: "+ item['to']);
	
	node1.appendChild(name);
	node2.appendChild(pincode);
	node3.appendChild(address);
	//node4.appendChild(cap);
	node5.appendChild(vacc);
	node6.appendChild(fee);
	//node7.appendChild(age);
	//node8.appendChild(time);
	node.appendChild(node1);
	node.appendChild(node2);
	node.appendChild(node3);
	//node.appendChild(node4);
	node.appendChild(node5);
	node.appendChild(node6);
	//node.appendChild(node7);
	//node.appendChild(node8);
	listele.append(node);
	document.getElementById("details").appendChild(listele);  
}