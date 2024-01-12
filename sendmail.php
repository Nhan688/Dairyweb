<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
phpinfo();

require __DIR__ . '/vendor/autoload.php';


// Kiểm tra xem có dữ liệu được gửi từ form không
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ form
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Tạo một đối tượng PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Cấu hình SMTP
        $mail->isSMTP();
        $mail->Host       = 'kd132176@st.kobedenshi.ac.jp';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'kd132176@st.kobedenshi.ac.jp'; // Thay thế bằng địa chỉ email của bạn
        $mail->Password   = 'Thanhnhan68'; // Thay thế bằng mật khẩu của bạn
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Cấu hình người gửi và người nhận
        $mail->setFrom($email, $name);
        $mail->addAddress('kd1325176@st.kobedenshi.ac.jp' ,'Recipient Name'); // Thay thế bằng địa chỉ email của bạn

        // Thiết lập nội dung email
        $mail->isHTML(true);
        $mail->Subject = 'お問い合わせフォームからのメッセージ';
        $mail->Body    = "お名前: $name<br>メールアドレス: $email<br>お問い合わせ内容:<br>$message";

        // Gửi email
        $mail->send();
        
        echo 'success';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo 'Invalid request';
}
?>
