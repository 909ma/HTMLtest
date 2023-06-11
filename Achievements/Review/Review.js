// JSON 데이터를 비동기적으로 가져오기
fetch("../data/data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    var selectElement = document.getElementById("achievementSelect");

    // 선택 가능한 옵션 추가
    jsonData.achievementsList.forEach((achievement) => {
      var option = document.createElement("option");
      option.value = achievement.title;
      option.text = achievement.title;
      selectElement.add(option);
    });

    // radarOptions 데이터 가져오기
    var chartData = jsonData.chartData;
    var radarOptions = {
      scale: {
        ticks: {
          beginAtZero: chartData.beginAtZero,
          min: chartData.min,
          max: chartData.max,
          stepSize: chartData.stepSize,
          fontSize: 24, // 원하는 폰트 크기로 설정 (예: 60) 스텝 크기
        },
        pointLabels: {
          fontSize: 24, // 원하는 폰트 크기로 설정 (예: 24) 라벨 크기
        },
      },
    };

    // 레이더 차트 생성
    var radarData = {
      labels: [],
      datasets: [
        {
          label: "데이터셋",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(75, 192, 192, 1)",
          data: [],
        },
      ],
    };

    var ctx = document.getElementById("radarChart").getContext("2d");
    var radarChart = new Chart(ctx, {
      type: "radar",
      data: radarData,
      options: radarOptions,
    });

    // 업적 선택 시 해당 업적의 내용 로드
    function loadAchievementContent() {
      var selectedTitle = selectElement.value;

      // 선택된 업적에 해당하는 데이터 찾기
      var selectedAchievement = jsonData.achievementsList.find(
        (achievement) => achievement.title === selectedTitle
      );

      // 선택된 업적의 제목과 내용 표시
      var titleElement = document.getElementById("achievementTitle");
      var contentElement = document.getElementById("achievementContent");
      var screenshotElement = document.getElementById("screenshot");

      titleElement.textContent = selectedAchievement.title;
      contentElement.innerHTML = ""; // 기존 내용 초기화

      // 선택된 업적의 내용 순회
      selectedAchievement.content.forEach((content) => {
        if (content.type === "text") {
          var textElement = document.createElement("p");
          textElement.textContent = content.value;
          contentElement.appendChild(textElement);
        } else if (content.type === "image") {
          var imageElement = document.createElement("img");
          imageElement.src = "./Screenshot/" + content.value;
          contentElement.appendChild(imageElement);
        }
      });

      // 레이더 차트 데이터 업데이트
      radarChart.data.labels = selectedAchievement.labels.map(
        (label) => label.name
      );
      radarChart.data.datasets[0].data = selectedAchievement.labels.map(
        (label) => label.value
      );
      radarChart.update();
    }

    // 업적 선택 시 loadAchievementContent() 함수 호출
    selectElement.addEventListener("change", loadAchievementContent);

    // 초기 업적 내용 로드
    loadAchievementContent();
  })
  .catch((error) => {
    console.error("JSON 데이터를 가져오는 동안 오류가 발생했습니다:", error);
  });
