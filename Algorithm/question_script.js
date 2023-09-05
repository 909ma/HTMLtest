function copyCode(id) {
  const codeElement = document.querySelector(`#code${id}`);
  const textArea = document.createElement("textarea");
  textArea.value = codeElement.innerText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  alert("코드가 복사되었습니다.");
}

// 뒤로 가기 함수
function goBack() {
  window.history.back();
}
