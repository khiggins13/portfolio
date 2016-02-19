//copy this file in to p5 when finished
function advicePage() {
  if (localStorage.getItem("tbRecords") ===
    null) {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  } else {

    var user = JSON.parse(localStorage.getItem(
      "user"));
    var BMILevel = user.BMIRange;

    var tbRecords = JSON.parse(localStorage.getItem(
      "tbRecords"));
    tbRecords.sort(compareDates);
    var i = tbRecords.length - 1;
    var BMI = tbRecords[i].BMI;

    var c = document.getElementById(
      "AdviceCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0, 0, 550, 550);
    ctx.font = "22px Arial";
    drawAdviceCanvas(ctx, BMILevel, BMI);

  }
}

function drawAdviceCanvas(ctx, BMILevel, BMI) {
  ctx.font = "22px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Your current BMI is " + BMI +
    ".", 25, 320);

    ctx.fillText(
      "Your target BMI range is: 18.5-25",
      25, 350);
    levelCwrite(ctx, BMI);
    levelCMeter(ctx, BMI);
  
}

//For deciding what to write for given values of BMI level A


function levelCwrite(ctx, BMI) {
  if ((BMI >= 18.5) && (BMI <= 24.9)) {
    writeAdvice(ctx, "green");
  } else if ((BMI > 16.01) && (BMI <= 18.49)) {
    writeAdvice(ctx, "yellow");
  } else if ((BMI >= 24.91) && (BMI < 24.9)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
}

function writeAdvice(ctx, level) {
  var adviceLine1 = "";
  var adviceLine2 = "";

  if (level == "red") {
    adviceLine1 =
      "Please consult with your family";
    adviceLine2 = "physician urgently.";
  } else if (level == "yellow") {
    adviceLine1 =
      "Contact family physician and recheck bloodwork";
    adviceLine2 = "in 6-8 weeks.";
  } else if (level = "green") {
    adviceLine1 =
      "Repeat bloodwork in 3-6 months.";
  }
  ctx.fillText("Your BMI-level is " + level +
    ".", 25, 380);
  ctx.fillText(adviceLine1, 25, 410);
  ctx.fillText(adviceLine2, 25, 440);
}



function levelCMeter(ctx, BMI) {
  
    var ccg = new RGraph.CornerGauge(
        "AdviceCanvas", 10, 35, BMI
        )
      .Set("chart.colors.ranges", [
        [10.01, 16, "red"],
        [16.01, 18.49, "yellow"],
        [18.5, 24.9, "#0f0"],
        [24.91, 29.9, "yellow"],
        [30,35, "red"]
      ]);
  
  drawMeter(ccg);
}

// Meter properties
function drawMeter(g) {
  g.Set("chart.value.text.units.post", " BMI")
    .Set("chart.value.text.boxed", false)
    .Set("chart.value.text.size", 14)
    .Set("chart.value.text.font", "Verdana")
    .Set("chart.value.text.bold", true)
    .Set("chart.value.text.decimals", 2)
    .Set("chart.shadow.offsetx", 5)
    .Set("chart.shadow.offsety", 5)
    .Set("chart.scale.decimals", 2)
    .Set("chart.title", "BMI LEVEL")
    .Set("chart.radius", 250)
    .Set("chart.centerx", 50)
    .Set("chart.centery", 250)
    .Draw();
}