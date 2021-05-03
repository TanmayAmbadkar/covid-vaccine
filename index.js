function addDays(currdate, days) {
    var date = new Date(currdate);
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = new Date(startDate);
	
    while (currentDate <= new Date(stopDate)) {
        dateArray.push(
            currentDate.getDate() +
                '-' +
                (currentDate.getUTCMonth() + 1) +
                '-' +
                currentDate.getUTCFullYear()
        );
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
}

var pincode = 'test';
var form = document.querySelector('form');

form.onsubmit = function() {
  // Populate hidden form on submit
	document.getElementById('details').innerHTML = '';
	
	pincode = document.querySelector('input[name=pincode]').value;
	var fdate = document.querySelector('input[name=fdate]').value;
	var tdate = document.querySelector('input[name=tdate]').value;
	if(tdate == "")
		tdate = fdate;
	console.log(tdate);
	console.log(fdate);
	var dateArray = getDates(fdate, tdate);
	dateArray.forEach(datefn);
 
  return false;
};

function datefn(date, index) {
    let url =
        'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=' +
        pincode +
        '&date=' +
        date;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsondata) {
            formatData(jsondata);
        });
}

function formatData(data) {
    console.log(data);

    if (data['sessions'].length == 0) {
        document.getElementById('details').innerHTML =
            'Data not updated. Please try another pincode/date or come back later.';
        return;
    }

    data['sessions'].forEach(present);
}

function present(item, index) {
    //let div = document.createElement('div').setAttribute("id", "list"+index);
    var listele = document.createElement('li');
    var node = document.createElement('ul');
    // Create a <li> node
    var node1 = document.createElement('li');
    let name = document.createTextNode('Name: ' + item['name'] + '\n');

    var node2 = document.createElement('li');
    let date = document.createTextNode('Date: ' + item['date'] + '\n');

    var node3 = document.createElement('li');
    let cap = document.createTextNode(
        'Available Capacity: ' + item['available_capacity'] + '\n'
    );

    var node4 = document.createElement('li');
    let vacc = document.createTextNode('Vaccine: ' + item['vaccine'] + '\n');

    var node5 = document.createElement('li');
    let fee = document.createTextNode('Fee: ' + item['fee_type'] + '\n');

    var node6 = document.createElement('li');
    let age = document.createTextNode(
        'Minimum age limit: ' + item['min_age_limit'] + '\n'
    );

    var node7 = document.createElement('li');
    let time = document.createTextNode(
        'From: ' + item['from'] + ' To: ' + item['to']
    );

    node1.appendChild(name);
    node2.appendChild(date);
    node3.appendChild(cap);
    node4.appendChild(vacc);
    node5.appendChild(fee);
    node6.appendChild(age);
    node7.appendChild(time);
    node.appendChild(node1);
    node.appendChild(node2);
    node.appendChild(node3);
    node.appendChild(node4);
    node.appendChild(node5);
    node.appendChild(node6);
    node.appendChild(node7);
    listele.append(node);
    document.getElementById('details').appendChild(listele);
}
