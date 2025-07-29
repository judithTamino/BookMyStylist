export const generateEmailTemplate = ({ user, date, startTime, endTime, service, notes, price, type = "confirmed" }) => {
  const isCancelled = type === "cancelled";
  const title = isCancelled ? "Appointment Cancelled" : "Appointment Confirmation";
  const msg = isCancelled ?
    `Hi <strong style="color: #615FFF;">${user}</strong>, your appointment has been <strong>cancelled</strong>.`
    : `Thank you <strong style="color: #615FFF;">${user}</strong>, for booking with us.`
  const priceRow = !isCancelled ?
    `<tr>
      <td style="font-size: 16px;">
        <strong> 💰 price:</strong> &#8362;${price}
      </td>
    </tr>` : "";


  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="background-color: #615FFF; text-align: center; color: #fff;">
                <p style="font-size: 54px; line-height: 54px; font-weight: 800;">${title}</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">                
                <p style="font-size: 16px; margin-bottom: 25px;">${msg}</p>
                
                <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f0f7ff; border-radius: 10px; margin-bottom: 25px;">
                    <tr>
                      <td style="font-size: 16px; border-bottom: 1px solid #8EC5FF;">
                        <strong>📅 Date:</strong> ${date}
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size: 16px; border-bottom: 1px solid #8EC5FF;">
                        <strong> 🕒 Time:</strong> ${startTime} - ${endTime}
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size: 16px; border-bottom: 1px solid #8EC5FF;">
                        <strong> 💇 Service:</strong> ${service}
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size: 16px; border-bottom: 1px solid #8EC5FF;">
                        <strong> 📝 Notes:</strong> ${notes}
                      </td>
                    </tr>
                  ${priceRow}
                </table>
                
                <p style="font-size: 16px; margin-top: 30px;">
                    Best regards,<br>
                    <strong>Book My Stylist Team</strong>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
                <p style="margin: 0 0 10px;">
                    Book My Stylist salon | 123 Main St, Anytown, AN 12345
                </p>
                <p style="margin: 0;">
                    <a href="#" style="color: #615FFF; text-decoration: none; margin: 0 10px;">Unsubscribe</a> | 
                    <a href="#" style="color: #615FFF; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                    <a href="#" style="color: #615FFF; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                </p>
            </td>
        </tr>
    </table>
</div>
`
};

