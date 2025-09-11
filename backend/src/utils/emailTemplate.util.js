export const generateEmailTemplate = ({ user, date, startTime, service, price, type = "confirmed" }) => {
  const isCancelled = type === "cancelled";
  const title = isCancelled ? "Appointment Cancelled" : "Appointment Confirmation";
  const msg = isCancelled ?
    `Hi <span style="color:#FF2056;">${user}</span>, your appointment has been cancelled.`
    : `Thank you <span style="color:#FF2056;">${user}</span>, for booking with us.`
  const priceRow = !isCancelled ?
    `<tr>
    <td style="font-size: 16px; border: 1px solid #E2E8F0; border-radius: 5px; padding: 2px 8px; width:100%;">
                <span>💰</span> <span style="text-transform: capitalize;"> ${price}</span>
              </td>
    </tr>` : "";

  return `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>

  <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />
  <link
    href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Playfair+Display:wght@400..900&display=swap"
    rel="stylesheet">
</head>

<body style="font-family: 'Nunito', sans-serif; font-size: 16px; line-height: 1.6;">
  <div style="color: #0F172B; max-width: 600px; margin: 0 auto; padding: 0; background-color: #fff;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%"
      style="background-color: #F8FAFC; border-radius: 8px; overflow: hidden; border: 1px solid #E2E8F0; padding: 32px;">
      <tr>
        <td style="font-family: 'Playfair Display', serif; color: #FF2056; text-align: left;">
          <p style="font-size: 30px; text-transform: capitalize;">${title}</p>
        </td>
      </tr>

      <tr>
        <td style="color: #314158;">
          <p style="font-size: 18px; margin-bottom: 25px;">${msg}</p>

          <table cellpadding="15" cellspacing="0" border="0" width="100%" style="margin-bottom: 25px;">
            <tr>
              <td style="font-size: 16px; border: 1px solid #E2E8F0; border-radius: 5px; padding: 2px 8px; width:100%;">
                <span>📅</span> <span>${date}</span>
              </td>
               </tr>
              <tr>
                            <td style="font-size: 16px; border: 1px solid #E2E8F0; border-radius: 5px; padding: 2px 8px; width:100%;">
                <span>🕒</span> <span>${startTime}</span>
              </td>
             
              </tr>
          </table>

          <p style="font-size: 16px; margin-top: 30px;">
            If you need to reschedule, please contact us as soon as possible.
          </p>

          <p>
            Email us at
            <a href="mailto" style="color: #FF2056;"> salon@email.com</a>
            or give us a call at
            <a href="tel" style="color: #FF2056;"> 053 569 6159</a>
          </p>
        </td>
      </tr>

      <tr>
        <td style="background-color: #FF2056; padding: 20px; text-align: center; font-size: 14px; border-radius: 5px;">
          <p style="margin: 0 0 10px; color: #fff;">
            <span style="font-family:'Playfair Display'">SALON</span> | 567 East Cedar Street Some City Isreal
          </p>
        </td>
      </tr>

    </table>
  </div>
</body>

</html>
    `

              // <tr>
              //               <td style="font-size: 16px; border: 1px solid #E2E8F0; border-radius: 5px; padding: 2px 8px; width:100%;">
              //   <span>💇</span> <span style="text-transform: capitalize;"> ${service}</span>
              // </td>
              // </tr>
};

