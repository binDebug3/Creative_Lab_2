document.getElementById("spellSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("spellInput").value.toLowerCase();
    let sendIt = false;
    if (value === "")
      sendIt = true;
    console.log(value);
    let spells = "";
    let count = 0;
    for (let page = 1; page < 18; page++) {
        const url = "https://api.open5e.com/spells/?page=" + page;
        fetch(url)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log(json.results.length)
                // console.log(json)
                for (let i = 0; i < json.results.length; i++) {
                    if (sendIt || json.results[i].name.toLowerCase().indexOf(value) !== -1) {
                        if (!document.getElementById("checkDeep").checked ||
                            (document.getElementById("checkDeep").checked && 
                            json.results[i].document__title !== "Deep Magic for 5th Edition")) {
                                spells += '<div class="spell spell' + i +'">';
                                spells += '<h2 class="name">' + json.results[i].name + '</h2>';
                                spells += '<p class="level">' + json.results[i].level + '</p>';
                                spells += '<p class="school">' + json.results[i].school + '</p>';
                                let castingTime = json.results[i].casting_time;
                                if (castingTime.includes(',')) {
                                    const splitOn = castingTime.indexOf(',');
                                    castingTime = castingTime.substr(0, splitOn)
                                }
                                spells += '<p class="casting_time">' + castingTime + '</p>';
                                spells += '<p class="duration">' + json.results[i].duration + '</p>';
                                spells += '<p class="range">' + json.results[i].range + '</p>';
                                spells += '<p class="components">' + json.results[i].components + '</p>';
                                spells += '<p class="concentration">' + json.results[i].concentration + '</p>';
                                spells += '<p class="dnd_class">' + json.results[i].dnd_class + '</p>';
                                spells += '<p class="source">' + json.results[i].document__title + '</p>';
                                spells += '<p class="description">' + json.results[i].desc + '</p>';
                                spells += '</div>'
                                count++;
                                console.log("count " + count)
                            }
                    }
                }
                document.getElementById("spellResults").innerHTML = spells;
            });
    }
    reset();
});

function reset() {
  var checkBox = document.getElementById("myCheck");
  checkBox.checked = false;
//   var desc = document.getElementsByClassName("description");
//   for (let i = 0; i < desc.length; i++) {
    // if (checkBox.checked == true){
    //   desc[i].style.display = "block";
    // } else {
    //   desc[i].style.display = "none";
    // }
//   }
}
