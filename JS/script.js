let data = [];
let links = document.querySelectorAll(".nav-link");


getData("pizza")

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (e) {
    var meal = e.target.innerHTML;
    getData(meal)
  })
}

function getData(meal) {
  let myhttp = new XMLHttpRequest()
  myhttp.open("GET", `https://forkify-api.herokuapp.com/api/search?q=${meal}`);
  myhttp.send();
  myhttp.addEventListener("readystatechange", function () {
    if (this.readyState == 4) {
      data = JSON.parse(this.response).recipes;
      displayData()
      console.log(data);
    }
  })
}

function displayData() {
  let cartona = '';
  for (let i = 0; i < data.length; i++) {
    cartona += `
    <div class="col-lg-4 col-md-6">
    <div class="card bg-danger-subtle text-center rounded-5 h-100 p-2">
      <img src="${data[i].image_url}" class="w-100 rounded-5 " height=250 alt="">
      <div class="card-body">
        <h3 class="py-3 h4 card-subtitle card-title">${data[i].title}</h3>
        <span class="pb-1"><a class="btn btn-warning w-100 mx-auto p-2 rounded-5" target="_blank"
            href="${data[i].source_url}">See recipe</a></span>
        <p class="card-footer">" ${data[i].publisher} "</p>
      </div>
    </div>
  </div>
    `
  }
  document.getElementById("data").innerHTML = cartona;
}