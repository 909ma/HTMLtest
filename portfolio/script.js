const filterButtons = document.querySelectorAll(".filter-button");
const projects = document.querySelectorAll(".project");

// 필터 버튼 클릭 시 이벤트 처리
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const language = this.getAttribute("data-language");

    // 모든 프로젝트 애니메이션 제거 후 숨기기
    projects.forEach((project) => {
      project.style.animation = "";
      project.style.display = "none";
    });

    // 선택한 언어에 해당하는 프로젝트 표시
    if (language === "all") {
      projects.forEach((project) => {
        project.style.animation = "fadeIn 0.5s ease-in-out";
        project.style.display = "block";
      });
    } else {
      const filteredProjects = document.querySelectorAll(
        `.project[data-language="${language}"]`
      );
      filteredProjects.forEach((project) => {
        project.style.animation = "fadeIn 0.5s ease-in-out";
        project.style.display = "block";
      });
    }

    // 선택한 필터 버튼 활성화
    filterButtons.forEach((button) => {
      button.classList.remove("active");
    });
    this.classList.add("active");
  });
});
