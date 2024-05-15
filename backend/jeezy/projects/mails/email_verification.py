def main(otp):
    return f"""
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">
    <tr>
        <td align="center">
            <table style="border:1px solid #eaeaea;border-radius:5px;margin:40px 0;" width="600" border="0" cellspacing="0" cellpadding="40">
                <tr>
                    <td align="center">
                        <div style="font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;text-align:left;width:465px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">
                                <tr>
                                    <td align="center">
                                        <div>
                                            <img src="https://assets.vercel.com/email/vercel.png" width="40" height="37" alt="Vercel" />
                                        </div>
                                        <h1 style="color:#000;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:24px;font-weight:normal;margin:30px 0;padding:0;">
                                           This is your verification code:
                                        </h1>
                                    </td>
                                </tr>
                            </table>
                            <br />
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">
                                <tr>
                                    <td align="center">
                                        <div>
                                            <div style="background-color:#000;border-radius:5px;color:#fff;display:inline-block;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:40px;font-weight:500;line-height:50px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;">
                                                {otp}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <br />
                        </div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
"""
