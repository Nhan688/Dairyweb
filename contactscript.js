$(document).ready(function() {
  $('#contactForm').submit(function(e) {
      e.preventDefault();

      // Gửi dữ liệu form đến process_form.php sử dụng AJAX
      $.ajax({
          type: 'POST',
          url: 'sendmail.php',
          data: $(this).serialize(),
          dataType: 'json',
          success: function(response) {
              if (response.success) {
                  alert('Email sent successfully!');
              } else {
                  alert('Error sending email. Please try again later.');
                  console.error(response.error);
              }
          },
          error: function() {
              alert('Error sending email. Please try again later.');
          }
      });
  });
});