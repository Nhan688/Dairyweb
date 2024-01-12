// nav.js
document.addEventListener('DOMContentLoaded', function () {
    // Gọi hàm để cập nhật avatar trong thanh điều hướng khi trang tải
    updateNavAvatar();
  
    // Nghe sự kiện avatarChange và cập nhật avatar tương ứng
    document.addEventListener('avatarChange', function (event) {
      const newAvatar = event.detail.avatarSrc;
      updateNavAvatar(newAvatar);
    });
  });
  
  function updateNavAvatar(newAvatar) {
    // Lấy nguồn avatar đã lưu từ localStorage nếu không có nguồn được cung cấp
    const savedAvatar = newAvatar || localStorage.getItem('avatarSrc');
  
    // Cập nhật avatar trong thanh điều hướng nếu có nguồn đã lưu
    if (savedAvatar) {
      const navAvatar = document.querySelector('.profile-toggle');
      if (navAvatar) {
        navAvatar.style.backgroundImage = `url(${savedAvatar})`;
      }
    }
  }
  