(function () {
	const example = document.getElementById('example');
	const cw1     = document.getElementById('cw1');
	const form    = document.querySelector("#postData");

	example.addEventListener("click", function () {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then(response => response.json())
			.then(array => {
				console.log(array);
				answer.innerHTML = JSON.stringify(array);
			});
	});

	cw1.addEventListener("click", function () {
		answer.innerHTML = "";
	});

	async function getCountryData(capital) {
		let result = "NORESPONSE";
		const data = await fetch(`https://restcountries.com/v3.1/capital/${capital}`)
			.then(response => response.json())
			.then(data => {
			 	console.log(data[0]);
			 	result = data[0];
		});
		return result;
	}

	form.addEventListener("submit", async (ev) => {

		ev.preventDefault();
		answer.innerHTML = "";
		
		const capital = document.getElementById("capitalTextBox").value;
		const countryData = await getCountryData(capital);
		if (typeof(countryData) !== "object") {
			answer.innerHTML = `<span>Error: No data for ${capital}.</span>`;
			return;
		}

		let tableHtml = `
			<table id="countryTable">
				<thead>
					<tr>
						<th>Name</th>
						<th>Capital</th>
						<th>Population</th>
						<th>Region</th>
						<th>Subregion</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>${countryData.name.common}</td>
						<td>${countryData.capital[0]}</td>
						<td>${countryData.population}</td>
						<td>${countryData.region}</td>
						<td>${countryData.subregion}</td>
					</tr>
				</tbody>
			</table>
		`;

		answer.innerHTML = tableHtml;

	});

})();
