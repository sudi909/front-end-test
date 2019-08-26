const kiosk = '{"vertical":"bottom", "horizontal": "right", "name":1, "phone":1, "email":0, "minimised": 0}';

layout();

function layout() {
	const data = JSON.parse(kiosk);
	if (data.minimised == 1) {
		maximised();
	} else {
		minimised()
	}
}

function minimised() {
	const data = JSON.parse(kiosk);
	const div = document.getElementById('widget');
	div.innerHTML = `
		<div class="test-float" onclick="maximised()" style="`+ data.vertical + `: 0;`+ data.horizontal + `: 0;">
		Click here to get a call-back
	</div>
	`;
	document.getElementById('widget').appendChild(div);
}

function maximised() {
	const data = JSON.parse(kiosk);
	const div = document.createElement('div');
	div.className = 'test ' + data.vertical + ' ' + data.horizontal;
	div.innerHTML = `
		<div id="container-close" onclick="minimised()">
			x
		</div>
		<h2 class="test-title">DO YOU WANT A CALLBACK?</h2>
		<h2 class="test-slogan">Please give us your details and we will get back to you</h2>
		<form>
		`;
	if (data.name == 1) {
		div.innerHTML += `<input type="text" name="" placeholder="Your Name" required>`;
	}
	if (data.phone == 1) {
		div.innerHTML += `<input type="text" id="phoneNumber" name="" placeholder="Phone Number" required>`;
	}
	div.innerHTML += `
			<select>
				<option>I'm interested in content</option>
				<option>I'm interested in Design</option>
			</select>`;
	if (data.email == 1) {
		div.innerHTML += `<input type="email" name="" placeholder="Email" required>`;
	}
	div.innerHTML += `
		</form>
		<div id="container-button">
			<input type="submit" name="" value="Call Now" onclick="submit()">
		</div>
	`;
	document.getElementById('widget').appendChild(div);
};

function submit() {
	document.getElementById("container-button").innerHTML = '<div class="loader"></div>';
	var accessKey = '5e9ac6a37b61434c1901c13704d9e811';
	var phoneNumber = document.getElementById("phoneNumber").value;
	var countryCode = 'ID';

	var http = new XMLHttpRequest();
	var url = 'http://apilayer.net/api/validate?access_key=' + accessKey + '&country_code=' + countryCode + '&number=' + phoneNumber;
	http.open('POST', url, true);

	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	http.onreadystatechange = function(json) {
		if(http.readyState == 4 && http.status == 200) {
			const data = JSON.parse(kiosk);
			const div = document.createElement('div');
			div.className = 'test ' + data.vertical + ' ' + data.horizontal;
			div.innerHTML = `
			<div id="container-close" onclick="minimised()">
				x
			</div>
			<h2 class="test-thanks">Thank You</h2>
			`;
			document.getElementById('widget').appendChild(div);
		} else {
			
		}
	}
	http.send(url);
}

function closeWidget() {

}