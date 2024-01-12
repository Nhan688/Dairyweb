console.log("make by TUẤN AND NHÂN");
showStories();

let addNote = document.getElementById("addNote");

// If user adds a story, add it to the localStorage

const addBtn = document.getElementById("addBtn");
const editor = document.getElementById("editor");


addBtn.addEventListener('click', function () {
  
  const editor = document.getElementById("editor");
  const fontColor = document.getElementById("fontColor").value; // Lấy giá trị màu sắc chữ
  const formattedContent = `<div style="${getFormattedStyles()}">${editor.innerHTML}</div>`;
  const stories = JSON.parse(localStorage.getItem("stories")) || [];
  const today = new Date();
  const dateTime = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日 ${today.getHours()}時${today.getMinutes()}分`;

  stories.push(`${formattedContent}|${dateTime}`);
  localStorage.setItem("stories", JSON.stringify(stories));

  editor.innerHTML = ""; // Đặt lại nội dung của trình soạn thảo
  showStories();
});

// Thêm sự kiện để hiển thị văn bản đã chỉnh sửa
editor.addEventListener('input', function () {
  const formattedContent = `<div style="${getFormattedStyles()}">${editor.innerHTML}</div>`;
  editedText.innerHTML = formattedContent;
});

function showStories() {
  const stories = JSON.parse(localStorage.getItem("stories")) || [];
  const storiesElm = document.getElementById("stories");
  
  if (stories.length !== 0) {
    const html = stories.map((element, index) => {
      const [content, timestamp] = element.split("|");
      return `
        <div class="noteCard my-2 mx-2 card" style="width: 80rem;">
          <div class="card-body">
            <h5 class="card-title">${timestamp}</h5>
            <pre class="card-text">${content}</pre>
            <button id="${index}" onclick="deleteStory(${index})" class="btn btn-primary">削除</button>
          </div>
        </div>`;
    }).join('');
    
    storiesElm.innerHTML = html;
  } else {
    storiesElm.innerHTML = `日記がありません`;
  }
}

//   // Function to delete a story
function deleteStory(index) {
  //   console.log("I am deleting", index);

  let stories = localStorage.getItem("stories");
  if (stories == null) {
    storiesObj = [];
  } else {
    storiesObj = JSON.parse(stories);
  }

  storiesObj.splice(index, 1);
  localStorage.setItem("stories", JSON.stringify(storiesObj));
  showStories();
}

function saveEntry() {
  const editor = document.getElementById("editor");
  const content = editor.innerHTML;
  const fontColor = document.getElementById("fontColor").value;

  // Lưu nội dung vào Local Storage hoặc thực hiện các bước khác theo nhu cầu của bạn
  // Ví dụ: Lưu vào mảng stories và sau đó lưu mảng vào Local Storage
  const stories = JSON.parse(localStorage.getItem("stories")) || [];
  const today = new Date();
  const dateTime = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日 ${today.getHours()}時${today.getMinutes()}分`;
  stories.push(`${content}|${dateTime}`);
  localStorage.setItem("stories", JSON.stringify(stories));

  // Sau khi lưu, có thể làm sạch trình soạn thảo hoặc thực hiện các bước khác theo nhu cầu
  editor.innerHTML = "";

  // Hiển thị lại danh sách các entry
  showStories();
}

// Thêm mã JavaScript cho việc định dạng văn bản
document.getElementById("fontSize").addEventListener("change", applyFormatting);
document.getElementById("textAlign").addEventListener("change", applyFormatting);
document.getElementById("fontWeight").addEventListener("change", applyFormatting);
document.getElementById("fontStyle").addEventListener("change", applyFormatting);
document.getElementById("textDecoration").addEventListener("change", applyFormatting);
document.getElementById("fontColor").addEventListener("input", applyFormatting);


function applyFormatting() {
  const editor = document.getElementById("editor");
  const formattedStyles = getFormattedStyles();

  // Áp dụng kiểu định dạng vào văn bản trong trình soạn thảo
  editor.style.cssText = formattedStyles;
}

function getFormattedStyles() {
  const fontSize = document.getElementById("fontSize").value + "px";
  const textAlign = document.getElementById("textAlign").value;
  const fontWeight = document.getElementById("fontWeight").checked ? "bold" : "normal";
  const fontStyle = document.getElementById("fontStyle").checked ? "italic" : "normal";
  const textDecoration = document.getElementById("textDecoration").checked ? "underline" : "none";
  const fontColor = document.getElementById("fontColor").value;

  return `font-size: ${fontSize}; text-align: ${textAlign}; font-weight: ${fontWeight}; font-style: ${fontStyle}; text-decoration: ${textDecoration}; color: ${fontColor};`;
}
function showPreview(content) {
  const preview = document.getElementById("preview");
  preview.innerHTML = content;
  applyFormatting();
}

