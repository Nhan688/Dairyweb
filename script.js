// 通知ボタンをクリックしたときに通知を表示する
document.getElementById("notificationButton").addEventListener("click", function() {
    // ブラウザが通知をサポートしているかを確認
    if ("Notification" in window) {
      // ユーザーの許可を取得する
      Notification.requestPermission()
        .then(function(permission) {
          if (permission === "granted") {
            // 通知を作成して表示
            new Notification("お知らせ", {
              body: "新しい情報があります。",
              icon: "notification-icon.png"
            });
          }
        })
        .catch(function(error) {
          console.error("通知の許可を取得できませんでした:", error);
        });
    } else {
      console.error("ブラウザが通知をサポートしていません。");
    }
  });
  


  
  // Enter
  // カレンダーの表示


// メモの表示
// メモの表示
function showMemo(dateString) {
  const memoDate = new Date(dateString);
  const memo = localStorage.getItem(dateString);

  let memoHTML = `<h2>${memoDate.toLocaleDateString()}</h2>`;

  if (memo) {
    memoHTML += `<p>${memo}</p>`;
  } else {
    memoHTML += `<p>No memo found for this date.</p>`;
  }

  memoHTML += `
    <textarea id="memoText" placeholder="Enter memo" rows="4" cols="50">${memo || ''}</textarea>
    <button onclick="saveMemo('${dateString}')">Save</button>
    <button onclick="editMemo('${dateString}')">Edit</button>
    <button onclick="deleteMemo('${dateString}')">Delete</button>
  `;

  const calendarDiv = document.getElementById('calendar');
  calendarDiv.innerHTML = memoHTML;
}

// メモの保存
function saveMemo(dateString) {
  const memoText = document.getElementById('memoText').value;
  localStorage.setItem(dateString, memoText);
  showMemo(dateString);
}

// メモの編集
function editMemo(dateString) {
  const memoText = localStorage.getItem(dateString);
  document.getElementById('memoText').value = memoText || '';
}

// メモの削除
function deleteMemo(dateString) {
  localStorage.removeItem(dateString);
  showMemo(dateString);
}

//note.html
const diaryForm = document.getElementById("diaryForm");
const diaryEntries = document.getElementById("diaryEntries");

diaryForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const dateInput = document.getElementById("date");
  const contentInput = document.getElementById("content");

  const date = dateInput.value;
  const content = contentInput.value;

  addDiaryEntry(date, content);

  dateInput.value = "";
  contentInput.value = "";
});

function addDiaryEntry(date, content) {
  const entry = document.createElement("div");
  entry.classList.add("diary-entry");

  const dateElement = document.createElement("div");
  dateElement.classList.add("date");
  dateElement.textContent = formatDate(date);

  const contentElement = document.createElement("div");
  contentElement.classList.add("content");
  contentElement.textContent = content;

  entry.appendChild(dateElement);
  entry.appendChild(contentElement);

  diaryEntries.appendChild(entry);
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", options);
}

