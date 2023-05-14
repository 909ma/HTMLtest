var jsonURL = "./data/AchievementsList.json";

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      var achievements = JSON.parse(xhr.responseText);
      createAchievementTable(achievements);
    } else {
      console.error("Failed to load JSON file");
    }
  }
};
xhr.open("GET", jsonURL, true);
xhr.send();

function createAchievementTable(achievements) {
  var table = document.getElementById("achievementTable");

  achievements.forEach(function (achievement) {
    var row = document.createElement("tr");

    var imageCell = document.createElement("td");
    var image = document.createElement("img");
    image.src = "./image/" + achievement["image name"];
    image.alt = "";
    imageCell.appendChild(image);
    row.appendChild(imageCell);

    var valueCell = document.createElement("td");
    var valueLines = achievement.value.split("\n");
    valueLines.forEach(function (line) {
      var lineBreak = document.createElement("br");
      valueCell.appendChild(document.createTextNode(line));
      valueCell.appendChild(lineBreak);
    });
    row.appendChild(valueCell);

    var progressCell = document.createElement("td");
    var progress = (achievement.now / achievement.max) * 100;
    progressCell.textContent = `${progress.toFixed(1)}%`;
    row.appendChild(progressCell);

    row.style.background = `-webkit-linear-gradient(90deg, #4caf50 ${progress}%, transparent ${progress}%)`;


    table.appendChild(row);
  });
}
