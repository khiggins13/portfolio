function drawGraph() {
  if (localStorage.getItem("tbRecords") ===
    null) {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  } else {
    setupCanvas();

    var BMIarr = new Array();
    var Datearr = new Array();
    getBMIhistory(BMIarr, Datearr);

    //var BMILower = new Array(2);
    //var BMIUpper = new Array(2);
    //getBMIbounds(BMILower, BMIUpper);

    drawLines(BMIarr, 
      Datearr)
    labelAxes();
  }
}

function setupCanvas() {

  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, 500, 500);

}

function getBMIhistory(BMIarr, Datearr) {
  var tbRecords = JSON.parse(localStorage.getItem(
    "tbRecords"));

  tbRecords.sort(compareDates);

  for (var i = 0; i < tbRecords.length; i++) {
    var date = new Date(tbRecords[i].Date);

    /*These methods start at 0, must increment
     * by one to compensate
     */
    var m = date.getMonth() + 1;
    var d = date.getDate() ;

    //The x-axis label
    Datearr[i] = (m + "/" + d);

    //The point to plot
    BMIarr[i] = parseFloat(tbRecords[i].BMI);
  }
}

/*function getBMIbounds(BMILower, BMIUpper) {
  //Get users cancer stage
  var user = JSON.parse(localStorage.getItem(
    "user"));
  var BMILevel = user.BMIRange;

  /*These lines show upper and lower bounds
   * of acceptable BMI levels (for each
   * stage)
   
  if (BMILevel == "StageA") {
    BMIUpper[0] = BMIUpper[1] = 0.1;
    BMILower[0] = BMILower[1] = 0.01;
  } else if (BMILevel == "StageB") {
    BMIUpper[0] = BMIUpper[1] = 0.5;
    BMILower[0] = BMILower[1] = 0.1;
  } else {
    BMIUpper[0] = BMIUpper[1] = 2.0;
    BMILower[0] = BMILower[1] = 0.35;
  }
}
*/

function drawLines(BMIarr,
  Datearr) {
  var BMIline = new RGraph.Line("GraphCanvas",
      BMIarr)
    .Set("labels", Datearr)
    .Set("colors", ["blue", "green", "red"])
    .Set("shadow", true)
    .Set("shadow.offsetx", 1)
    .Set("shadow.offsety", 1)
    .Set("linewidth", 1)
    .Set("numyticks", 20)
    .Set("scale.decimals", 2)
    .Set("xaxispos", "bottom")
    .Set("ymax", 30)
    .Set("gutter.left", 40)
    .Set("tickmarks", "filledcircle")
    .Set("ticksize", 5)
    .Set("chart.labels.ingraph", [, , ["BMI",
      "blue", "yellow", 1, 80
    ], , ])
    .Set("chart.title", "BMI")
    .Draw();
}

function labelAxes() {
  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");
  ctx.font = "11px Georgia";
  ctx.fillStyle = "green";
  ctx.fillText("Date(MM/DD)", 400, 470);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText("BMI Value", -250, 10);
}