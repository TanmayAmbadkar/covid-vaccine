let state_data = {};
let district_data = {};


function getStates()
{
	let url =
        'https://cdn-api.co-vin.in/api/v2/admin/location/states';

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsondata) {
            displayStates(jsondata['states']);
        });
}

function displayStates(data)
{
	var states = "<option value=\"\" disabled selected>Select</option>";
	for(let i=0;i<data.length;i++) 
	{
		state_data[data[i]["state_name"]] = data[i]["state_id"];
		states += "<option>" + data[i]["state_name"] + "</option>";
	}
	document.getElementById("state").innerHTML = states;
}

getStates();

function displayDistrict(value)
{
	let url =
        'https://cdn-api.co-vin.in/api/v2/admin/location/districts/'+state_data[value];

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsondata) {
            changeDistrict(jsondata['districts']);
        });
}

function changeDistrict(data) 
{
	var districts = "<option value=\"\" disabled selected>Select</option>";
	
	for(let i=0;i<data.length;i++) 
	{
		district_data[data[i]["district_name"]] = data[i]["district_id"];
		districts += "<option>" + data[i]["district_name"] + "</option>";
	}
	document.getElementById("district").innerHTML = districts;
}

function getDistrict(value)
{
	console.log(value);

}
