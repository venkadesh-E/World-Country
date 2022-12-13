var bodyContainer = document.createElement("div");
bodyContainer.className = "container";
document.body.append(bodyContainer);

var searchArea = document.createElement("div");
searchArea.className = "searchArea";
bodyContainer.append(searchArea);

var searchInput = document.createElement("input");
searchInput.className = "searchInput";
searchInput.placeholder = "Search...";
searchArea.append(searchInput);

var searchBtn = document.createElement("button");
searchBtn.className = "submitBtn";
searchBtn.innerText = "Submit";
searchArea.append(searchBtn);

var result = document.createElement("div");
result.className = "result";
bodyContainer.append(result);

var fetchDataBtn = document.createElement("button");
fetchDataBtn.innerText = "Fetch";
fetchDataBtn.className = "fetchDataBtn";
bodyContainer.append(fetchDataBtn);

fetchDataBtn.addEventListener("click", async () => {
  try {
    const response = await fetch("https://api.census.gov/data/2021/pep/population");
    const jsonData = await response.json();
    console.log(jsonData);

    for (let i = 0; i < jsonData.length; i++) {
      let brewData = document.createElement("div");
      brewData.innerHTML = `
            <div class = "card">
                <div class = "card-body">
                    <h3 class = "card-title">${jsonData[i].name}</h5>
                    <h6 class = "card-text">Brewery Type: ${jsonData[i].type}<br><br>
                    Phone: ${jsonData[i].phone}<br><br>
                    Addres:${jsonData[i].address}, ${jsonData[i].street}, ${jsonData[i].city}, ${jsonData[i].state}<br><br>
                    <a href = "${jsonData[i].website_url}" target = "_blank" >${jsonData[i].website_url}</a>
            `;
      result.appendChild(brewData);
    }
  } catch (error) {
    result.innerHTML = error;
  }
});

searchBtn.addEventListener("click", async () => {
  let searchTerm = document.querySelector(".searchInput").value;
  const response = await fetch("https://api.census.gov/data/2021/pep/population");
  const jsonData = await response.json();
  let filtered_arr = [];
  for (let i = 0; i < jsonData.length; i++) {
    if (jsonData[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
      filtered_arr.push(jsonData[i]);
    }
  }
  const emptyResult = document.querySelector(".result");
  emptyResult.innerHTML = "";
  for (let i = 0; i < filtered_arr.length; i++) {
    let brewData = document.createElement("div");
    brewData.innerHTML = `
            <div class = "card">
                <div class = "card-body">
                    <h3 class = "card-title">${jsonData[i].name}</h5>
                    <h6 class = "card-text">Brewery Type: ${jsonData[i].type}<br><br>
                    Phone: ${jsonData[i].phone}<br><br>
                    Addres:${jsonData[i].address}, ${jsonData[i].street}, ${jsonData[i].city}, ${jsonData[i].state}<br><br>
                    <a href = "${jsonData[i].website_url}" target = "_blank" >${jsonData[i].website_url}</a>
            `;
    result.appendChild(brewData);
  }
});
