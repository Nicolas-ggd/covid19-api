const nodeMailer = require('nodemailer');

const sendContactInfo = async (email, contactType, text) => {
    const emailTransporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    });

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Contact email",
        html: contactTemplate(contactType, email, text)
    }

    let response;

    await emailTransporter.sendMail(mailOptions).catch(() => {
        response = false;
    })
    response = true;

    return response;
};

const contactTemplate = (contactType, email, text) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Email Verification</title>
      </head>
      <body>
        <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color: #fff; border-collapse: collapse;">
          <tr>
            <td style="padding: 20px;">
              <h1 style="text-align:center;">Welcome to ${process.env.COMPANY_NAME}</h1>
              <p><b>Sender: ${email}</b></p>
              <p><b>Contact Type: ${contactType}</b></p>
              <p><b>${text}</b></p>
              <p>If you have any issues or didn't sign up for an account, please contact us at <a href="mailto:${process.env.COMPANY_EMAIL}">${process.env.COMPANY_EMAIL}</a></p>
              <p><b>If you haven't signup with us, please disregard this email and do not click on the verify button. We apologize for any inconvenience this may have caused.</b></p>
            </td>
          </tr>
        </table>
      </body>
      </html>  
      `;
}

module.exports = {
    sendContactInfo
};