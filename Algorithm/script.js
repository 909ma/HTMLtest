const filterButtons = document.querySelectorAll(".filter-button");
const algorithms = document.querySelectorAll(".algorithm");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const language = this.getAttribute("data-language");

    algorithms.forEach((algorithm) => {
      algorithm.style.animation = "";
      algorithm.style.display = "none";
    });

    if (language === "all") {
      algorithms.forEach((algorithm) => {
        algorithm.style.animation = "fadeIn 0.5s ease-in-out";
        algorithm.style.display = "block";
      });
    } else {
      const filteredAlgorithms = document.querySelectorAll(
        `.algorithm[data-language="${language}"]`
      );
      filteredAlgorithms.forEach((algorithm) => {
        algorithm.style.animation = "fadeIn 0.5s ease-in-out";
        algorithm.style.display = "block";
      });
    }

    filterButtons.forEach((button) => {
      button.classList.remove("active");
    });
    this.classList.add("active");
  });
});
