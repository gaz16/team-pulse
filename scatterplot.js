google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

var hide = false;

function drawChart() {
  var url = "https://measure-team-pulse.firebaseio.com/plot.json";
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE) {
      if(request.status === 200) {
        var dataRows = [];
        console.log(request.repsponse);
        var dataArray = JSON.parse(request.response);
        console.log(dataArray);
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('number', 'Actions');
        dataTable.addColumn('number', 'Words');
        dataTable.addColumn({'type': 'string', 'role': 'style'});
        console.log(Object.keys(dataArray));
        var keys = Object.keys(dataArray);
        for (var i=0; i < keys.length; i++) {
          var val = dataArray[keys[i]];
          var row = [];
          console.log(val);
          var color = getColor(val.type);
          console.log("color: " + color);
          row.push(parseInt(val.points[0]));
          row.push(parseInt(val.points[1]));
          row.push(color);
          dataRows.push(row);
        }
        console.log(dataRows);
        dataTable.addRows(dataRows);
        //dataArray.unshift(['Actions', 'Words']);
        console.log(dataTable);
        //var data = google.visualization.arrayToDataTable(dataArray);
  
        var options = {
          title: 'Negativity of Actions vs. Negativity of Words',
          hAxis: {title: 'Negativity of Actions', minValue: 0, maxValue: 9},
          vAxis: {title: 'Negativity of Words', minValue: 0, maxValue: 9},
          legend: 'none' 
        };
  
        var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
  
        chart.draw(dataTable, options);
      }
    }
  };
  request.open('GET', url);
  request.send();
}

function getColor(type) {
  if (type == "race") {
    return 'point {fill-color: blue}';
  }
  if (type == "sex") {
    return 'point {fill-color: green}';
  }
  if (type == "age") {
    return 'point {fill-color: red}';
  }
  if (type == "other") {
    return 'point {fill-color: purple}';
  }
}

document.getElementById("showChart").onclick = function() {
  if (hide) {
    document.getElementById("chart_div").style.display = 'none';
    document.getElementById("chart_legend").style.display = 'none';
    hide = !hide;
  } else {
    document.getElementById("chart_div").style.display = 'block';
    document.getElementById("chart_legend").style.display = 'block';
    drawChart();
    hide = !hide;
  }
}

