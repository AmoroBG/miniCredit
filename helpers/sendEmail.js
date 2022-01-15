const  sendgridApiKey  = require("../config").sendGridApiKey;
const sendGridMail = require("@sendgrid/mail");
sendGridMail.setApiKey(sendgridApiKey);
const sendEmail = async (
  to = "",
  from = "",
  subject = "",
  html = "",
  text = ""
) => {
  //Construct message
  const message = {
    to,
    from,
    subject,
    text,
    html,
  };
  //Send email
  try {
    await sendGridMail.send(message);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
}

module.exports = sendEmail