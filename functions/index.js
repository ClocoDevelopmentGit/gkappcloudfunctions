const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");
const admin = require("firebase-admin");
require("dotenv").config();
const sendgridApiKey = process.env.SENDGRID_API_KEY;
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const collectionName = "users";
const fieldNameToUpdate = "otp";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

sgMail.setApiKey(sendgridApiKey);

exports.sendOtpEmail = functions.https.onCall(async (data, context) => {
  try {
    var otpcode = generateOtp();
    try {
      // Reference to the specific document
      const documentRef = admin
        .firestore()
        .collection(collectionName)
        .doc(data.email);

      // Get the current data of the document
      const documentSnapshot = await documentRef.get();
      if (!documentSnapshot.exists) {
        console.error("Document not found!");
        return;
      }

      // Update the specific field in the document data
      const updatedData = { [fieldNameToUpdate]: otpcode }; // Replace with the new value
      await documentRef.update(updatedData);

      console.log("Document field updated successfully.");
    } catch (error) {
      console.error("Error updating document field:", error);
    }

    const msg = {
      to: data.email,
      from: "hello@growkindly.com.au",
      replyto: "hello@growkindly.com.au",
      subject: "Grow Kindly Password Reset",
      html: `
      <div style=" width: 70%; text-align: left;">
      <p style="font-size: 1.1em">Hi,</p>
      <p>Thank you for choosing Grow kindly. Use the following one-time passcode to change your password</p>
      <h2 style="background: #9BAEAC; margin: 40 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px; display: inline-block;">${otpcode}</h2>
  </div>
  <div style="text-align: left;">
    <img src="https://firebasestorage.googleapis.com/v0/b/growkindly-fec64.appspot.com/o/for_email%2Fgk_logo.png?alt=media&token=dd629d22-c428-4baf-9da6-20698bb20652" width="200" height="20" style="margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
  </div>
    `,
    };

    await sgMail.send(msg);

    return { success: true, message: "OTP sent successfully." };
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new functions.https.HttpsError("internal", "Error sending OTP.");
  }
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.sendCouponEmail = functions.https.onCall(async (data, context) => {
  try {
    console.log("Data ----", data);
    try {
      // Reference to the specific document
      const documentRef = admin
        .firestore()
        .collection(collectionName)
        .doc(data.email);
      console.log("Data ----", data.email);
      // Get the current data of the document
      const documentSnapshot = await documentRef.get();
      if (!documentSnapshot.exists) {
        console.error("Document not found!");
        return;
      }
      // Update the specific field in the document data
      const currentDate = new Date();
      const updatedData = { ["offer_mail_sent_on"]: currentDate }; // Replace with the new value
      await documentRef.update(updatedData);
      console.log("Document field updated successfully.");
    } catch (error) {
      console.error("Error updating document field:", error);
    }

    const msg = {
      to: data.email,
      from: "hello@growkindly.com.au",
      replyto: "hello@growkindly.com.au",
      subject: "Grow Kindly Coupon Code",
      html: `<!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
      <head>
      <title>
      </title>
      <!--[if !mso]><!-->
      <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
      <!--<![endif]-->
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
      <meta content="width=device-width, initial-scale=1" name="viewport"/>
      <!--[if mso]>
      <noscript>
      <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
      </xml>
      </noscript>
      <![endif]-->
      <!--[if lte mso 11]>
      <style type="text/css" data-inliner="ignore">
      .mj-outlook-group-fix { width:100% !important; }
      </style>
      <![endif]-->
      <!--[if !mso]><!--><!--<![endif]-->
      <style>a:link {color:#223746;font-weight:normal;text-decoration:underline;font-style:normal}
      a:visited {color:#223746;font-weight:normal;text-decoration:underline;font-style:normal}
      a:active {color:#223746;font-weight:normal;text-decoration:underline;font-style:normal}
      a:hover {color:#223746;font-weight:normal;text-decoration:underline;font-style:normal}</style><style>@import url(https://static-forms.klaviyo.com/fonts/api/v1/TkR42M/custom_fonts.css);
      #outlook a {
      padding: 0
      }
      body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%
      }
      table, td {
      border-collapse: collapse;
      mso-table-lspace: 0;
      mso-table-rspace: 0
      }
      img {
      border: 0;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic
      }
      p {
      display: block;
      margin: 13px 0
      }
      @media only screen and (min-width: 480px) {
      .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%
      }
      }
      .moz-text-html .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%
      }
      @media only screen and (max-width: 480px) {
      div.kl-row.colstack div.kl-column {
      display: block !important;
      width: 100% !important
      }
      }
      @media only screen and (max-width: 480px) {
      .kl-text {
      padding-right: 18px !important;
      padding-left: 18px !important
      }
      }
      @media only screen and (max-width: 480px) {
      .component-wrapper .mob-no-spc {
      padding-left: 0 !important;
      padding-right: 0 !important
      }
      }
      .hlb-subblk td {
      word-break: normal
      }
      @media only screen and (max-width: 480px) {
      .hlb-wrapper .hlb-block-settings-content {
      padding: 9px !important
      }
      .hlb-logo {
      padding-bottom: 9px !important
      }
      .r2-tbl {
      width: 100%
      }
      .r2-tbl .lnk {
      width: 100%
      }
      .r2-tbl .hlb-subblk:last-child {
      padding-right: 0 !important
      }
      .r2-tbl .hlb-subblk {
      padding-right: 10px !important
      }
      .kl-hlb-stack {
      display: block !important;
      width: 100% !important;
      padding-right: 0 !important
      }
      .kl-hlb-stack.vspc {
      margin-bottom: 9px
      }
      .kl-hlb-wrap {
      display: inline-block !important;
      width: auto !important
      }
      .kl-hlb-no-wrap {
      display: table-cell !important
      }
      .kl-hlb-wrap.nospc.nospc {
      padding-right: 0 !important
      }
      }
      @media only screen and (max-width: 480px) {
      td.kl-img-base-auto-width {
      width: 100% !important
      }
      }
      .kl-button a {
      display: block !important
      }
      @media screen and (max-width: 480px) {
      .kl-sl-stk {
      display: block !important;
      width: 100% !important;
      padding: 0 0 9px !important;
      text-align: center !important
      }
      .kl-sl-stk.lbls {
      padding: 0 !important
      }
      .kl-sl-stk.spcblk {
      display: none !important
      }
      }
      img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      max-width: 100%
      }
      .root-container {
      background-repeat: repeat !important;
      background-size: auto !important;
      background-position: left top !important
      }
      .root-container-spacing {
      padding-top: 50px !important;
      padding-bottom: 20px !important;
      font-size: 0 !important
      }
      .content-padding {
      padding-left: 0 !important;
      padding-right: 0 !important
      }
      .content-padding.first {
      padding-top: 0 !important
      }
      .content-padding.last {
      padding-bottom: 0 !important
      }
      @media only screen and (max-width: 480px) {
      td.mobile-only {
      display: table-cell !important
      }
      div.mobile-only {
      display: block !important
      }
      table.mobile-only {
      display: table !important
      }
      .desktop-only {
      display: none !important
      }
      }
      @media only screen and (max-width: 480px) {
      .table-mobile-only {
      display: table-cell !important;
      max-height: none !important
      }
      .table-mobile-only.block {
      display: block !important
      }
      .table-mobile-only.inline-block {
      display: inline-block !important
      }
      .table-desktop-only {
      max-height: 0 !important;
      display: none !important;
      mso-hide: all !important;
      overflow: hidden !important
      }
      }
      p {
      margin-left: 0;
      margin-right: 0;
      margin-top: 0;
      margin-bottom: 0;
      padding-bottom: 1em
      }
      @media only screen and (max-width: 480px) {
      .kl-text > div, .kl-table-subblock div, .kl-split-subblock > div {
      font-size: 15px !important;
      line-height: 1.3 !important
      }
      }
      h1 {
      color: #5E718B;
      font-family: "Cabin", "Lucida Sans", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      font-size: 28px;
      font-style: Normal;
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: 0;
      margin: 0;
      margin-bottom: 20px;
      text-align: center
      }
      @media only screen and (max-width: 480px) {
      h1 {
      font-size: 28px !important;
      line-height: 1.1 !important
      }
      }
      h2 {
      color: #455873;
      font-family: "Cabin", "Lucida Sans", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      font-size: 24px;
      font-style: Normal;
      font-weight: 600;
      line-height: 1.1;
      letter-spacing: 0;
      margin: 0;
      margin-bottom: 20px;
      text-align: center
      }
      @media only screen and (max-width: 480px) {
      h2 {
      font-size: 24px !important;
      line-height: 1.1 !important
      }
      }
      h3 {
      color: #455873;
      font-family: "Cabin", "Lucida Sans", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      font-size: 18px;
      font-style: Normal;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: 0;
      margin: 0;
      margin-bottom: 20px;
      text-align: center
      }
      @media only screen and (max-width: 480px) {
      h3 {
      font-size: 18px !important;
      line-height: 1.1 !important
      }
      }
      h4 {
      color: #231F20;
      font-family: "Cabin", "Lucida Sans", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      font-size: 16px;
      font-style: Normal;
      font-weight: 600;
      line-height: 1.1;
      letter-spacing: 0;
      margin: 0;
      margin-bottom: 12px;
      text-align: center
      }
      @media only screen and (max-width: 480px) {
      h4 {
      font-size: 16px !important;
      line-height: 1.1 !important
      }
      }
      @media only screen and (max-width: 480px) {
      .root-container {
      width: 100% !important
      }
      .root-container-spacing {
      padding: 10px !important
      }
      .content-padding {
      padding-left: 0 !important;
      padding-right: 0 !important
      }
      .content-padding.first {
      padding-top: 0 !important
      }
      .content-padding.last {
      padding-bottom: 0 !important
      }
      .component-wrapper {
      padding-left: 0 !important;
      padding-right: 0 !important
      }
      }</style></head>
      <body style="word-spacing:normal;background-color:#FDFCFB;">
      <div class="root-container" id="bodyTable" style="background-color:#FDFCFB;">
      <div class="root-container-spacing">
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="width:100%;">
      <tbody>
      <tr>
      <td>
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#FDFCFB" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="background:#FDFCFB;background-color:#FDFCFB;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FDFCFB;background-color:#FDFCFB;width:100%;border-radius:0px 0px 0px 0px;">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
      <div class="content-padding first">
      <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
      <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
      <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
      <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="mob-no-spc" style="background-color:#F1EEE9;vertical-align:top;padding-top:9px;padding-right:18px;padding-bottom:9px;padding-left:18px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
      <div style="font-family:'Inter-Klaviyo-Hosted', Helvetica, Arial, sans-serif;font-size:15px;font-style:Normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#231F20;"><div style="text-align: center;"><span style="font-family: Inter, Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 12px;">Receive 15% off your first order using code: <span style="font-family: Inter-Klaviyo-Hosted, Helvetica, Arial, sans-serif; font-weight: bold; font-style: normal;">grow15*</span></span></div></div>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td style="font-size:0px;word-break:break-word;">
      <div style="height:20px;line-height:20px;"> </div>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper hlb-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="hlb-block-settings-content" style="background-color:#FDFCFB;vertical-align:top;padding-top:16px;padding-right:20px;padding-bottom:16px;padding-left:20px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="top" class="kl-header-link-bar" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
      <table border="0" cellpadding="0" cellspacing="0" style="color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;border:0;" width="100%">
      <tbody>
      <tr>
      <td align="center" class="hlb-logo" style="display:table-cell;width:100%;padding-bottom:10px;">
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">
      <tbody>
      <tr>
      <!--[if true]><td style="width:250px;" bgcolor="transparent"><![endif]-->
      <!--[if !true]><!--><td style="width:250px;"><!--<![endif]-->
      <img src="https://d3k81ch9hvuctc.cloudfront.net/company/TkR42M/images/d62280b4-96fc-4be4-bfbc-313c35d41e6b.png" style="display:block;outline:none;text-decoration:none;height:auto;width:100%;background-color:transparent;" width="250"/>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      <tr>
      <td>
      <table align="center" cellpadding="0" cellspacing="0" class="r2-tbl" style="table-layout:fixed;">
      <tr style="text-align:center;">
      <td align="center" class="kl-hlb-wrap inline-block nospc hlb-subblk" style="display:inline-block;padding-right:8px;" valign="middle">
      <table border="0" cellpadding="0" cellspacing="0" class="lnk" style="border-collapse:separate;line-height:100%;">
      <tr>
      <td align="center" bgcolor="transparent" role="presentation" style="border:none;border-radius:5px;cursor:auto;font-style:Normal;mso-padding-alt:10px 10px 10px 10px;background:transparent;" valign="middle">
      <a href="https://growkindly.com.au/collections/shop-all-collection" style='color:#223746; font-style:Normal; font-weight:700; text-decoration:none; display:inline-block; background:transparent; font-family:"Cabin", "Lucida Sans", "Lucida Sans Unicode", Geneva, Verdana, sans-serif; font-size:14px; line-height:100%; letter-spacing:0; margin:0; text-transform:none; padding:10px 10px 10px 10px; mso-padding-alt:0; border-radius:5px' target="_blank">
      Shop All
      </a>
      </td>
      </tr>
      </table>
      </td>
      <td align="center" class="kl-hlb-wrap inline-block nospc hlb-subblk" style="display:inline-block;padding-right:8px;" valign="middle">
      <table border="0" cellpadding="0" cellspacing="0" class="lnk" style="border-collapse:separate;line-height:100%;">
      <tr>
      <td align="center" bgcolor="transparent" role="presentation" style="border:none;border-radius:5px;cursor:auto;font-style:Normal;mso-padding-alt:10px 10px 10px 10px;background:transparent;" valign="middle">
      <a href="https://growkindly.com.au/collections/newborn-sleep" style='color:#223746; font-style:Normal; font-weight:700; text-decoration:none; display:inline-block; background:transparent; font-family:"Cabin", "Lucida Sans", "Lucida Sans Unicode", Geneva, Verdana, sans-serif; font-size:14px; line-height:100%; letter-spacing:0; margin:0; text-transform:none; padding:10px 10px 10px 10px; mso-padding-alt:0; border-radius:5px' target="_blank">
      Newborn
      </a>
      </td>
      </tr>
      </table>
      </td>
      <td align="center" class="kl-hlb-wrap inline-block nospc hlb-subblk" style="display:inline-block;padding-right:8px;" valign="middle">
      <table border="0" cellpadding="0" cellspacing="0" class="lnk" style="border-collapse:separate;line-height:100%;">
      <tr>
      <td align="center" bgcolor="transparent" role="presentation" style="border:none;border-radius:5px;cursor:auto;font-style:Normal;mso-padding-alt:10px 10px 10px 10px;background:transparent;" valign="middle">
      <a href="https://growkindly.com.au/collections/baby-sleep" style='color:#223746; font-style:Normal; font-weight:700; text-decoration:none; display:inline-block; background:transparent; font-family:"Cabin", "Lucida Sans", "Lucida Sans Unicode", Geneva, Verdana, sans-serif; font-size:14px; line-height:100%; letter-spacing:0; margin:0; text-transform:none; padding:10px 10px 10px 10px; mso-padding-alt:0; border-radius:5px' target="_blank">
      Baby
      </a>
      </td>
      </tr>
      </table>
      </td>
      <td align="center" class="kl-hlb-wrap inline-block nospc hlb-subblk" style="display:inline-block;padding-right:8px;" valign="middle">
      <table border="0" cellpadding="0" cellspacing="0" class="lnk" style="border-collapse:separate;line-height:100%;">
      <tr>
      <td align="center" bgcolor="transparent" role="presentation" style="border:none;border-radius:5px;cursor:auto;font-style:Normal;mso-padding-alt:10px 10px 10px 10px;background:transparent;" valign="middle">
      <a href="https://growkindly.com.au/collections/toddler-sleep" style='color:#223746; font-style:Normal; font-weight:700; text-decoration:none; display:inline-block; background:transparent; font-family:"Cabin", "Lucida Sans", "Lucida Sans Unicode", Geneva, Verdana, sans-serif; font-size:14px; line-height:100%; letter-spacing:0; margin:0; text-transform:none; padding:10px 10px 10px 10px; mso-padding-alt:0; border-radius:5px' target="_blank">
      Toddler
      </a>
      </td>
      </tr>
      </table>
      </td>
      <td align="center" class="kl-hlb-wrap inline-block nospc hlb-subblk" style="display:inline-block;padding-right:8px;" valign="middle">
      <table border="0" cellpadding="0" cellspacing="0" class="lnk" style="border-collapse:separate;line-height:100%;">
      <tr>
      <td align="center" bgcolor="transparent" role="presentation" style="border:none;border-radius:5px;cursor:auto;font-style:Normal;mso-padding-alt:10px 10px 10px 10px;background:transparent;" valign="middle">
      <a href="https://growkindly.com.au/collections/shop-all-collection" style='color:#223746; font-style:Normal; font-weight:700; text-decoration:none; display:inline-block; background:transparent; font-family:"Cabin", "Lucida Sans", "Lucida Sans Unicode", Geneva, Verdana, sans-serif; font-size:14px; line-height:100%; letter-spacing:0; margin:0; text-transform:none; padding:10px 10px 10px 10px; mso-padding-alt:0; border-radius:5px' target="_blank">
      Shop All Products
      </a>
      </td>
      </tr>
      </table>
      </td>
      <td align="center" class="kl-hlb-wrap inline-block nospc hlb-subblk" style="display:inline-block;" valign="middle">
      <table border="0" cellpadding="0" cellspacing="0" class="lnk" style="border-collapse:separate;line-height:100%;">
      <tr>
      <td align="center" bgcolor="transparent" role="presentation" style="border:none;border-radius:5px;cursor:auto;font-style:Normal;mso-padding-alt:10px 10px 10px 10px;background:transparent;" valign="middle">
      <a href="https://growkindly.com.au/collections/shop-by-temperature" style='color:#223746; font-style:Normal; font-weight:700; text-decoration:none; display:inline-block; background:transparent; font-family:"Cabin", "Lucida Sans", "Lucida Sans Unicode", Geneva, Verdana, sans-serif; font-size:14px; line-height:100%; letter-spacing:0; margin:0; text-transform:none; padding:10px 10px 10px 10px; mso-padding-alt:0; border-radius:5px' target="_blank">
      Shop by TOG
      </a>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      <!--[if true]></td><![endif]-->
      </div>
      <!--[if true]></tr></table><![endif]-->
      </div>
      <!--[if mso | IE]></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if mso | IE]></td></tr></table></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="width:100%;">
      <tbody>
      <tr>
      <td>
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#FDFCFB" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="background:#FDFCFB;background-color:#FDFCFB;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FDFCFB;background-color:#FDFCFB;width:100%;border-radius:0px 0px 0px 0px;">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
      <div class="content-padding">
      <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
      <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
      <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
      <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" class="kl-image" style="font-size:0px;word-break:break-word;">
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">
      <tbody>
      <tr>
      <td class="kl-img-base-auto-width" style="border:0;padding:0px 0px 0px 0px;width:600px;" valign="top">
      <a href="https://www.growkindly.com.au/" style="color:#223746; font-style:normal; font-weight:normal; text-decoration:underline">
      <img alt="Thank you for signing up with us" src="https://d3k81ch9hvuctc.cloudfront.net/company/TkR42M/images/b0712512-85a8-43d5-8993-0f6fa69891a8.png" style="display:block;outline:none;text-decoration:none;height:auto;font-size:13px;width:100%;" title="Thank you for signing up with us" width="600"/>
      </a>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" class="kl-image" style="font-size:0px;word-break:break-word;">
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">
      <tbody>
      <tr>
      <td class="kl-img-base-auto-width" style="border:0;padding:0px 0px 0px 0px;width:600px;" valign="top">
      <a href="https://www.growkindly.com.au/" style="color:#223746; font-style:normal; font-weight:normal; text-decoration:underline">
      <img alt="How we Grow Kindly" src="https://d3k81ch9hvuctc.cloudfront.net/company/TkR42M/images/14f51069-6aed-46d5-9522-4fa65d8077cd.png" style="display:block;outline:none;text-decoration:none;height:auto;font-size:13px;width:100%;" title="How we Grow Kindly" width="600"/>
      </a>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="mob-no-spc" style="vertical-align:top;padding-top:32px;padding-right:0px;padding-bottom:32px;padding-left:0px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
      <div style="font-family:'Inter-Klaviyo-Hosted', Helvetica, Arial, sans-serif;font-size:15px;font-style:Normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#231F20;"><h1><span style="font-size: 30px;">Thank you for signing up to Grow Kindly. </span></h1>
      <h1><span style="color: rgb(208, 147, 42);">Use code <span style="color: rgb(158, 174, 174);">GROW15</span> for 15% off your first purchase*</span></h1>
      <div style="text-align: center;">Hello! We are Grow Kindly, a place where your baby's safety &amp; comfort meets consciousness 🌱.</div>
      <div style="text-align: center;"> Our <span style="font-weight: bold;">TOG rated</span> premium sleepwear is crafted with care from <span style="font-weight: bold;">sustainably sourced</span>, eco-friendly fabrics derived from <span style="font-weight: bold;">natural</span> wood fibre that’s grown in renewable plantations, resulting to the <span style="font-weight: bold;">SOFTEST sleepwear</span> you'll ever touch.</div>
      <div style="text-align: center;"> </div>
      <div style="text-align: center;">Our swaddles, sleeping bags, and pyjamas are designed to support your baby to sleep safely, offering a range of TOGs for all seasons, all while nurturing the planet they'll one day inherit 🤍</div>
      <div style="text-align: center;"> </div>
      <div style="text-align: center;"><span style="font-size: 10px;">*Conditions apply, discount code can't be used with any other offer and/or promotion, only applicable to full priced items and can only be used for your first purchase. See our <a href="http://www.growkindly.com.au/pages/terms-conditions" style="color:#223746; font-style:normal; font-weight:normal; text-decoration:underline">terms &amp; conditions</a> page for more details. </span></div></div>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:18px;padding-right:18px;padding-bottom:18px;padding-left:18px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
      <p style="padding-bottom:0; border-top:solid 1px #CCC; font-size:1px; margin:0 auto; width:100%">
      </p>
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #CCCCCC;font-size:1px;margin:0px auto;width:564px;" role="presentation" width="564px" ><tr><td style="height:0;line-height:0;"> &nbsp;
      </td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" class="kl-image" style="font-size:0px;word-break:break-word;">
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">
      <tbody>
      <tr>
      <td class="kl-img-base-auto-width" style="border:0;padding:0px 0px 0px 0px;width:600px;" valign="top">
      <a href="http://www.growkindly.com.au/pages/baby-sleep-tog-temperature-guide-app" style="color:#223746; font-style:normal; font-weight:normal; text-decoration:underline">
      <img src="https://d3k81ch9hvuctc.cloudfront.net/company/TkR42M/images/1da5f499-7634-4ec9-9757-dfbe2673e628.png" style="display:block;outline:none;text-decoration:none;height:auto;font-size:13px;width:100%;" width="600"/>
      </a>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:18px;padding-right:18px;padding-bottom:18px;padding-left:18px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
      <p style="padding-bottom:0; border-top:solid 1px #CCC; font-size:1px; margin:0 auto; width:100%">
      </p>
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #CCCCCC;font-size:1px;margin:0px auto;width:564px;" role="presentation" width="564px" ><tr><td style="height:0;line-height:0;"> &nbsp;
      </td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" class="kl-image" style="font-size:0px;word-break:break-word;">
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">
      <tbody>
      <tr>
      <td class="kl-img-base-auto-width" style="border:0;padding:0px 0px 0px 0px;width:600px;" valign="top">
      <a href="http://www.growkindly.com.au" style="color:#223746; font-style:normal; font-weight:normal; text-decoration:underline">
      <img src="https://d3k81ch9hvuctc.cloudfront.net/company/TkR42M/images/d792437a-1388-43ce-9265-c1591ff9b97a.png" style="display:block;outline:none;text-decoration:none;height:auto;font-size:13px;width:100%;" width="600"/>
      </a>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:18px;padding-right:18px;padding-bottom:18px;padding-left:18px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
      <p style="padding-bottom:0; border-top:solid 1px #CCC; font-size:1px; margin:0 auto; width:100%">
      </p>
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #CCCCCC;font-size:1px;margin:0px auto;width:564px;" role="presentation" width="564px" ><tr><td style="height:0;line-height:0;"> &nbsp;
      </td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      <!--[if true]></td><![endif]-->
      </div>
      <!--[if true]></tr></table><![endif]-->
      </div>
      <!--[if mso | IE]></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if mso | IE]></td></tr></table></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="width:100%;">
      <tbody>
      <tr>
      <td>
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#FDFCFB" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="background:#FDFCFB;background-color:#FDFCFB;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FDFCFB;background-color:#FDFCFB;width:100%;border-radius:0px 0px 0px 0px;">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
      <div class="content-padding">
      <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
      <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
      <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
      <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" class="kl-image" style="font-size:0px;word-break:break-word;">
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">
      <tbody>
      <tr>
      <td class="kl-img-base-auto-width" style="border:0;padding:0px 0px 0px 0px;width:600px;" valign="top">
      <a href="http://www.growkindly.com.au" style="color:#223746; font-style:normal; font-weight:normal; text-decoration:underline">
      <img src="https://d3k81ch9hvuctc.cloudfront.net/company/TkR42M/images/e3cfc42a-d100-424a-90b5-c51b3924d5c4.png" style="display:block;outline:none;text-decoration:none;height:auto;font-size:13px;width:100%;" width="600"/>
      </a>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:18px;padding-right:18px;padding-bottom:18px;padding-left:18px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
      <p style="padding-bottom:0; border-top:solid 1px #CCC; font-size:1px; margin:0 auto; width:100%">
      </p>
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #CCCCCC;font-size:1px;margin:0px auto;width:564px;" role="presentation" width="564px" ><tr><td style="height:0;line-height:0;"> &nbsp;
      </td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="mob-no-spc" style="background-color:#E5E9E5;vertical-align:top;padding-top:9px;padding-right:24px;padding-bottom:9px;padding-left:24px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:24px;padding-right:0px;padding-bottom:24px;padding-left:0px;word-break:break-word;">
      <div style="font-family:'Inter-Klaviyo-Hosted', Helvetica, Arial, sans-serif;font-size:15px;font-style:Normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#231F20;"><h3>How we Grow Kindly 🌱</h3>
      <div>
      <div><span style="font-weight: bold;">Guilt-Free Comfort:</span> Wrap your baby effortlessly in the gentle touch of nature with Grow Kindly's luxuriously soft swaddles, sleeping bags, and pyjamas. Made from breathable, eco-friendly fabrics derived from natural wood fibre, each piece is thoughtfully crafted to provide unparalleled comfort without compromising on sustainability.</div>
      <div> </div>
      <div><span style="font-weight: bold;">Tailored Comfort for Every Season:</span> Choose from our range of swaddles and sleeping bags available in various TOGs (thermal overall grades) to suit all nursery temperatures. Whether it's a warm summer night or a chilly winter evening, Grow Kindly ensures your little one is snug and comfortable year-round.</div>
      <div> </div>
      <div><span style="font-weight: bold;">Expert Guidance with the Grow Kindly App:</span> For added peace of mind, download the Grow Kindly app, your ultimate companion for safe and sound sleep. Our app provides personalised recommendations to help guide parents on dressing their baby in the right TOGs for optimal sleep comfort and safety.</div>
      <div> </div>
      <div><span style="font-weight: bold;">Sustainable by Design: </span>We believe in doing our part to protect the planet for future generations. That's why Grow Kindly's eco-friendly fabrics are sourced from renewable plantations, minimising our environmental footprint while maximising sustainability.</div>
      <div><br/><span style="font-weight: bold;">Recyclable Packaging:</span> At Grow Kindly, sustainability extends beyond our products. All our packaging is recyclable, ensuring that every aspect of your purchase reflects our commitment to a greener future.</div>
      <div> </div>
      <div><span style="font-weight: bold;">Chic and Timeless Designs:</span> Elevate your baby's wardrobe with Grow Kindly's chic and timeless designs. From classic neutrals to playful prints, our swaddles, sleeping bags, and pyjamas (AKA Zippees) are as stylish as they are sustainable, ensuring your little one looks and feels their best every day.</div>
      <div> </div>
      <div><span style="font-weight: bold;">Easy Care:</span> Busy parents rejoice! Grow Kindly's eco-friendly baby essentials are designed for easy care and maintenance. Simply toss them in the washing machine for a quick refresh, so you can spend less time on laundry and more time making memories with your little one.</div>
      </div></div>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      <!--[if true]></td><![endif]-->
      </div>
      <!--[if true]></tr></table><![endif]-->
      </div>
      <!--[if mso | IE]></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if mso | IE]></td></tr></table></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="width:100%;">
      <tbody>
      <tr>
      <td>
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#FDFCFB" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="background:#FDFCFB;background-color:#FDFCFB;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FDFCFB;background-color:#FDFCFB;width:100%;border-radius:0px 0px 0px 0px;">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
      <div class="content-padding">
      <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
      <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
      <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
      <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:18px;padding-right:18px;padding-bottom:18px;padding-left:18px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
      <p style="padding-bottom:0; border-top:solid 1px #CCC; font-size:1px; margin:0 auto; width:100%">
      </p>
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #CCCCCC;font-size:1px;margin:0px auto;width:564px;" role="presentation" width="564px" ><tr><td style="height:0;line-height:0;"> &nbsp;
      </td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      <!--[if true]></td><![endif]-->
      </div>
      <!--[if true]></tr></table><![endif]-->
      </div>
      <!--[if mso | IE]></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if mso | IE]></td></tr></table></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="width:100%;">
      <tbody>
      <tr>
      <td>
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#FDFCFB" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="background:#FDFCFB;background-color:#FDFCFB;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FDFCFB;background-color:#FDFCFB;width:100%;border-radius:0px 0px 0px 0px;">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
      <div class="content-padding">
      <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
      <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
      <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
      <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:24px;padding-right:18px;padding-bottom:24px;padding-left:18px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" class="kl-button" style="font-size:0px;padding:0px;word-break:break-word;" vertical-align="middle">
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;line-height:100%;">
      <tr>
      <td align="center" bgcolor="#223746" role="presentation" style="border:none;border-radius:5px;cursor:auto;font-style:Normal;mso-padding-alt:14px 24px 14px 24px;background:#223746;" valign="middle">
      <a href="https://growkindly.com.au" style='color:#FFF; font-style:Normal; font-weight:700; text-decoration:none; display:inline-block; background:#223746; font-family:"Inter-Klaviyo-Hosted", Helvetica, Arial, sans-serif; font-size:14px; line-height:100%; letter-spacing:0; margin:0; text-transform:none; padding:14px 24px 14px 24px; mso-padding-alt:0; border-radius:5px' target="_blank">
      Shop Now
      </a>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      <!--[if true]></td><![endif]-->
      </div>
      <!--[if true]></tr></table><![endif]-->
      </div>
      <!--[if mso | IE]></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if mso | IE]></td></tr></table></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="width:100%;">
      <tbody>
      <tr>
      <td>
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#FDFCFB" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="background:#FDFCFB;background-color:#FDFCFB;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FDFCFB;background-color:#FDFCFB;width:100%;border-radius:0px 0px 0px 0px;">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
      <div class="content-padding">
      <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
      <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
      <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
      <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:32px;padding-right:0px;padding-bottom:32px;padding-left:0px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" class="kl-image" style="font-size:0px;word-break:break-word;">
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">
      <tbody>
      <tr>
      <td class="" style="border:0;padding:0px 0px 0px 0px;width:90px;" valign="top">
      <img src="https://d3k81ch9hvuctc.cloudfront.net/company/TkR42M/images/d30bbf0d-04c1-4962-8baf-746e8295d3a5.png" style="display:block;outline:none;text-decoration:none;height:auto;font-size:13px;width:100%;" width="90"/>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:9px;padding-right:18px;padding-bottom:9px;padding-left:18px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
      <div style="font-family:'Inter-Klaviyo-Hosted', Helvetica, Arial, sans-serif;font-size:15px;font-style:Normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#231F20;"><h2 style="text-align: center;"><span style="color: rgb(94, 113, 139); font-size: 30px;">New on Instagram</span></h2></div>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" class="kl-image" style="font-size:0px;word-break:break-word;">
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">
      <tbody>
      <tr>
      <td class="kl-img-base-auto-width" style="border:0;padding:0px 0px 0px 0px;width:600px;" valign="top">
      <img src="https://d3k81ch9hvuctc.cloudfront.net/company/TkR42M/images/59ca1ffb-04ba-4fdd-87c5-6cffc29bdf6e.jpeg" style="display:block;outline:none;text-decoration:none;height:auto;font-size:13px;width:100%;" width="600"/>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td style="font-size:0px;word-break:break-word;">
      <div style="height:50px;line-height:50px;"> </div>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      <!--[if true]></td><![endif]-->
      </div>
      <!--[if true]></tr></table><![endif]-->
      </div>
      <!--[if mso | IE]></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if mso | IE]></td></tr></table></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="width:100%;">
      <tbody>
      <tr>
      <td>
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#FDFCFB" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="background:#FDFCFB;background-color:#FDFCFB;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FDFCFB;background-color:#FDFCFB;width:100%;border-radius:0px 0px 0px 0px;">
      <tbody>
      <tr>
      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
      <div class="content-padding last">
      <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
      <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
      <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
      <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="background-color:#5E718B;vertical-align:top;padding-top:34px;padding-right:0px;padding-bottom:24px;padding-left:0px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" class="kl-image" style="font-size:0px;word-break:break-word;">
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">
      <tbody>
      <tr>
      <td class="" style="border:0;padding:0px 0px 0px 0px;width:150px;" valign="top">
      <img src="https://d3k81ch9hvuctc.cloudfront.net/company/TkR42M/images/4f4d4679-e333-461f-9205-1094c305f0ab.png" style="display:block;outline:none;text-decoration:none;height:auto;font-size:13px;width:100%;" width="150"/>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      <!--[if true]></td><![endif]-->
      </div>
      <!--[if true]></tr></table><![endif]-->
      <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
      <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
      <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
      <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="background-color:#5E718B;vertical-align:top;padding-top:9px;padding-right:9px;padding-bottom:9px;padding-left:9px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td>
      <div style="width:100%;text-align:center">
      <!--[if true]><table style="all:unset;opacity:0;" border="0" cellpadding="0" cellspacing="0" ><tr><![endif]-->
      <!--[if !true]><!--><div class="" style="display:inline-block;padding-right:10px;"><!--<![endif]-->
      <!--[if true]><td style="padding-right:10px;"><![endif]-->
      <div style="text-align: center;">
      <a href="https://www.facebook.com/growkindlybaby" style="color:#223746; font-style:normal; font-weight:normal; text-decoration:underline" target="_blank">
      <img alt="Twitter" src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/facebook_96.png" style="width:32px;" width="32"/>
      </a>
      </div>
      <!--[if true]></td><![endif]-->
      <!--[if !true]><!--></div><!--<![endif]-->
      <!--[if !true]><!--><div class="" style="display:inline-block;padding-right:10px;"><!--<![endif]-->
      <!--[if true]><td style="padding-right:10px;"><![endif]-->
      <div style="text-align: center;">
      <a href="https://www.pinterest.com.au/GrowKindlyBaby/" style="color:#223746; font-style:normal; font-weight:normal; text-decoration:underline" target="_blank">
      <img alt="Facebook" src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/pinterest_96.png" style="width:32px;" width="32"/>
      </a>
      </div>
      <!--[if true]></td><![endif]-->
      <!--[if !true]><!--></div><!--<![endif]-->
      <!--[if !true]><!--><div class="" style="display:inline-block;padding-right:10px;"><!--<![endif]-->
      <!--[if true]><td style="padding-right:10px;"><![endif]-->
      <div style="text-align: center;">
      <a href="https://www.instagram.com/growkindlybaby/" style="color:#223746; font-style:normal; font-weight:normal; text-decoration:underline" target="_blank">
      <img alt="Instagram" src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/instagram_96.png" style="width:32px;" width="32"/>
      </a>
      </div>
      <!--[if true]></td><![endif]-->
      <!--[if !true]><!--></div><!--<![endif]-->
      <!--[if !true]><!--><div class="" style="display:inline-block;padding-right:10px;"><!--<![endif]-->
      <!--[if true]><td style="padding-right:10px;"><![endif]-->
      <div style="text-align: center;">
      <a href="https://www.youtube.com/channel/UCEtxKJC6wU5Za-KRr0AZu9Q" style="color:#223746; font-style:normal; font-weight:normal; text-decoration:underline" target="_blank">
      <img alt="YouTube" src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/youtube_96.png" style="width:32px;" width="32"/>
      </a>
      </div>
      <!--[if true]></td><![endif]-->
      <!--[if !true]><!--></div><!--<![endif]-->
      <!--[if !true]><!--><div class="" style="display:inline-block;"><!--<![endif]-->
      <!--[if true]><td style=""><![endif]-->
      <div style="text-align: center;">
      <a href="https://www.tiktok.com/@growkindly?lang=en" style="color:#223746; font-style:normal; font-weight:normal; text-decoration:underline" target="_blank">
      <img alt="Tiktok" src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/tiktok_96.png" style="width:32px;" width="32"/>
      </a>
      </div>
      <!--[if true]></td><![endif]-->
      <!--[if !true]><!--></div><!--<![endif]-->
      <!--[if true]></tr></table><![endif]-->
      </div>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper kl-text-table-layout" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="background-color:#5E718B;vertical-align:top;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td align="center" class="kl-text" style="font-size:0px;padding:0px;padding-top:9px;padding-right:18px;padding-bottom:9px;padding-left:18px;word-break:break-word;">
      <div style="font-family:'Inter-Klaviyo-Hosted', Helvetica, Arial, sans-serif;font-size:12px;font-style:Normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:center;color:#727272;"><div style="line-height: 150%;"><span style="color: rgb(255, 255, 255); font-family: Cabin, 'Lucida Sans', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; font-weight: 400; font-style: normal;">No longer want to receive these emails? <a href="grow-kindly.cloco.com.au/unsubscribe?email=${data.email}">unsubscribe</a>.</span><br/><span style="color: rgb(255, 255, 255); font-family: Cabin, 'Lucida Sans', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; font-weight: 400; font-style: normal;">Grow Kindly 5B/8 Station St, Moorabbin VIC 3189, Moorabbin VIC 3189, Australia</span></div></div>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
      <tbody>
      <tr>
      <td class="" style="vertical-align:top;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
      <tbody>
      <tr>
      <td style="background:#5E718B;font-size:0px;word-break:break-word;">
      <div style="height:52px;line-height:52px;"> </div>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      <!--[if true]></td><![endif]-->
      </div>
      <!--[if true]></tr></table><![endif]-->
      </div>
      <!--[if mso | IE]></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if mso | IE]></td></tr></table></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      </body>
      </html>
        `,
    };

    await sgMail.send(msg);

    return { success: true, message: "Coupon sent successfully." };
  } catch (error) {
    console.error("Error sending Coupon:", error);
    throw new functions.https.HttpsError("internal", "Error sending Coupon.");
  }
});

exports.otpValidator = functions.https.onCall(async (data, context) => {
  const username = data.email; // Assuming 'email' is used as a username
  const inputOTP = data.otp;

  const usersCollection = admin.firestore().collection("users");

  try {
    const userDocRef = usersCollection.doc(username);
    const userDocSnapshot = await userDocRef.get();

    if (!userDocSnapshot.exists) {
      console.error("User not found!");
      return { result: "User not found" };
    }

    const storedOTP = userDocSnapshot.data().otp;

    if (inputOTP === storedOTP) {
      const pass = userDocSnapshot.data().password;
      return { result: "OTP verified", password: pass };
    } else {
      return { result: "OTP incorrect" };
    }
  } catch (error) {
    console.error("Error checking OTP:", error);
    return { result: "Error checking OTP" };
  }
});

exports.userDeletefromApp = functions.https.onCall(async (data, context) => {
  try {
    const emailOrPhoneNumber = data.email;
    console.log(emailOrPhoneNumber);
    const userRecord = await admin.auth().getUserByEmail(emailOrPhoneNumber);
    console.log(userRecord.uid);
    await admin.auth().deleteUser(userRecord.uid);
    console.log("Successfully deleted user");
    return { success: true };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Error fetching user data."
    );
  }
});
