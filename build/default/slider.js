var wordSlider = document.getElementById("wordsNeg");
var actionSlider = document.getElementById("actionsNeg");

var wordOutput = document.getElementById("wordsVal");
var actionOutput = document.getElementById("actionsVal");

wordOutput.innerHTML = "Value: " + wordSlider.value;
actionOutput.innerHTML = "Value: " + actionSlider.value;

wordSlider.oninput = function() {
  wordOutput.innerHTML = "Value: " + this.value;
}

actionSlider.oninput = function() {
  actionOutput.innerHTML = "Value: " + this.value;
}

var yesTextbox = document.getElementById("yes");
var noTextbox = document.getElementById("no");
var textbox = document.getElementById("textbox");

yesTextbox.onclick = function() {
  textbox.style.display = 'block';
}

noTextbox.onclick = function() {
  textbox.style.display = 'none';
}

var warning = document.getElementById("warning");

document.getElementById("submit").onclick = function() {
  var type = document.querySelector('input[name="type"]:checked');
  var description = getCheckedBoxes("description");
  var who = getCheckedBoxes("who");
  var wordsNeg = wordSlider.value;
  var actionsNeg = actionSlider.value;
  var details = document.querySelector('input[name="details"]:checked');
  var detailText = textbox.value;
  if (type == null || description == null || who == null || details == null || (details == "yes" && detailText == null)) {
    warning.style.color = "red";
  } else {
    console.log(description);
    console.log(who);
    console.log(detailText);
    var incident = {
      "type":type.value,
      "description": description,
      "who": who,
      "wordsNeg":wordsNeg,
      "actionsNeg":actionsNeg,
      "details":details.value,
      "detailText":detailText
    };
    incident = JSON.stringify(incident);
    console.log(incident);
    var url = "https://measure-team-pulse.firebaseio.com/incidents.json";
    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-ww-form-urlencoded");

    request.onreadystatechange = function() {
      if(request.readyState == 4 && request.status == 200) {
          console.log(request.responseText);
      }
    }
    request.send(incident);

    var chart = {
      "points":[parseInt(actionsNeg), parseInt(wordsNeg)],
      "type":type.value
    }
    chart = JSON.stringify(chart);

    var url = "https://measure-team-pulse.firebaseio.com/plot.json";
    var request2 = new XMLHttpRequest();
    request2.open("POST", url, true);
    request2.setRequestHeader("Content-type", "application/x-ww-form-urlencoded");

    request2.onreadystatechange = function() {
      if(request2.readyState == 4 && request2.status == 200) {
          console.log(request2.responseText);
          location.reload();
          alert("Your incident report has been successfully submitted.");
      }
    }
    request2.send(chart);
  }
}

function getCheckedBoxes(chkboxName) {
  var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    for (var i=0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
      }
    }
  return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}
