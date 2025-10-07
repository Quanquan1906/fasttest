// testOrderEmail.js
const { sendOrderStatusEmail } = require('./emailService');

(async () => {
  try {
    await sendOrderStatusEmail(
      'huy9998930@gmail.com', // email nhận
      'ORD123456789',         // orderId
      'Accepted',             // status: Accepted | Picked Up | Delivered
      'John Doe'              // tên shipper
    );
    console.log('✅ Test email sent successfully!');
  } catch (err) {
    console.error('❌ Test email failed:', err);
  }
})();
