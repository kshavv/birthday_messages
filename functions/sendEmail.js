const nodemailer =require('nodemailer');

let testAccount;
const newTestAccount=async ()=>{
    testAccount=await nodemailer.createTestAccount();
}

newTestAccount();


let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "mandeep845960@outlook.com", // generated ethereal user
      pass: "Zxcv@123456", // generated ethereal password
    },
});



const sendEmail= async (name,email)=>{

    let info = await transporter.sendMail({
        from: '"Mandeep Daksh" <mandeep845960@outlook.com>', // sender address
        to: email, // list of receivers
        subject: "Birthday greetings", // Subject line
        html:`<div class="es-wrapper-color">
        <table class="es-wrapper"  cellspacing="0" cellpadding="0" >
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">

                        <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure" esd-general-paddings-checked="false" style="background-color: #43285f;" bgcolor="#43285f" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-image" align="center" style="font-size:0"><img class="adapt-img" src="https://tlr.stripocdn.email/content/guids/CABINET_18b9b37a94ea92e75434475b4360dcd0/images/36441502442545607.jpg" alt="Happy Birthday!" title="Happy Birthday!" width="1100"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p30b" esd-general-paddings-checked="false" style="background-color: #43285f;" bgcolor="#43285f" align="left">
                                                        <!--[if mso]><table width="600" cellpadding="0" cellspacing="0"><tr><td width="207"><![endif]-->
                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p0r es-m-p20b esd-container-frame" width="187" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr class="es-hidden">
                                                                                    <td class="esd-block-image" align="left" style="font-size:0"><a target="_blank"><img src="https://tlr.stripocdn.email/content/guids/CABINET_18b9b37a94ea92e75434475b4360dcd0/images/27021502445622301.jpg" alt="Very lovely balloon" title="Very lovely balloon" width="126"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td class="es-hidden" width="20"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="187"><![endif]-->
                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p20b esd-container-frame" width="680" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-text es-p15t" align="center">
                                                                                        <p style="line-height: 150%; color: #ffffff;"><span style="font-size:90px;"><span style="font-family: Brush Script MT, Brush Script Std, cursive;"><span style="line-height: 150%;">${name}</span></span></span></p>
                                                                                    </td>
                                                                                </tr>

                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="186"><![endif]-->
                                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="186" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr class="es-hidden">
                                                                                    <td class="esd-block-image" align="right" style="font-size:0"><a target="_blank"><img src="https://tlr.stripocdn.email/content/guids/CABINET_18b9b37a94ea92e75434475b4360dcd0/images/77061502445629778.jpg" alt="Very lovely balloon" title="Very lovely balloon" width="126"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
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
    </div>`
      });

}


module.exports=sendEmail;