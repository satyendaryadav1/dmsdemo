<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="dms.login" %>

<!DOCTYPE html >

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login</title>
<meta name="viewport" content= "width=device-width, initial-scale=1.0"> 
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<%--<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>--%>
<%--<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>--%>
 <script>     var jquery_min_p = jQuery.noConflict();</script>
    <style>
        .err{    font-size: 11px;}
        body 
        {
                font-family:  sans-serif !important;
    background-image: url(../assets/img/loginnn2.png);
    /*background-position: center;*/
    background-size: cover;
    background-repeat: no-repeat;

}
.form-control{    font-size: 12px;}
    .loginContent{color:#fff;font-size:12px;padding:20px 0;}
    .login-container{
     padding-top: 8%;
    padding-bottom: 8%;
}
.login-form-1{
    padding: 5%;
    background: #fff;
    border-radius: 0 10px 10px 0;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-1 h3{
    text-align: center;
    color: #333;
}
.login-form-2{
    padding: 5%;
        border-radius: 10px 0 0 10px;
   background-image: linear-gradient(to right, #233B59, #151514)!important;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-2 h3{
    text-align: center;
    color: #fff;
}
.login-container form{
    padding: 10%;
}
.btnSubmit
{
    width: 50%;
    border-radius: 1rem;
    padding: 1.5%;
    border: none;
    cursor: pointer;
}
.login-form-1 .btnSubmit{
    font-weight: 600;
    color: #fff;
        height: 35px;
    background-color: #2D4D76!important;
}

.login-form-2 .ForgetPwd{
    color: #003974!important;
    font-weight: 600;
    text-decoration: none;
}
.login-form-1 .ForgetPwd{
    color: #2D4D76!important;
    font-weight: 600;
        text-decoration: underline;
    font-size: 13px;
}
.login-form-1 .btnSubmit:hover{      background-color: #ffffff !important;
    transition: .8s;
    color: #2D4D76;
    border: 1px solid #333;}
.login-form-1 .ForgetPwd:hover{color: #333 !important;    transition: .8s;}
.mainlogidiv{    width: 75%;    padding-top: 30px;
    margin: 0 auto;}
    .mainlogidiv h4{color:#fff;}
    
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) 
{
   .login-form-2,.login-form-1{    margin: 0 2%;} 
    } 


    </style>
    <script type="text/javascript" language="javascript">

        jquery_min_p(document).ready(function () {
            jquery_min_p('#txtUserName').keypress(function () {
                if (jquery_min_p('#txtUserName').val() == '') {
                    jquery_min_p("#txtUserName").removeClass('validate');
                    jquery_min_p('#lblDispMessage').text('');
                    
                }

            });



            jquery_min_p('#txtpassword').keypress(function () {
                if (jquery_min_p('#txtpassword').val() == '') {
                    jquery_min_p("#txtpassword").removeClass('validate');
                    jquery_min_p('#lblDispMessage').text('');
                    
                }

            });
        });

        function checkValidations() {
            var Validation = false;
            if (document.getElementById("<%=txtUserName.ClientID%>").value == '') {
               
                $("#txtUserName").addClass("validate");
               
                document.getElementById('txtUserName').focus();
                Validation = true;
            }

            if (document.getElementById("<%=txtpassword.ClientID%>").value == '') {
                //  alert('Please Enter Password');
                $("#txtpassword").addClass("validate");
                document.getElementById('txtpassword').focus();

                Validation = true;
            }
            SetDefaultValue();
            if (Validation == true) {
                return false;
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "Login.aspx/Encryptdata",
                    data: "{'password':'" + $('#txtpassword').val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        $('#txtpassword').val(msg.d);
                    }
                });
                return true;

            }
        }

        function Emailvali() {
            var re = /\S+@\S+\.\S+/;
            if ($("#txtEmail").val() == '') {
                alert('Please enter your email address');

                $("#txtEmail").focus();
                return false;
            }
            else if (!re.test($("#txtEmail").val())) {
                alert('Please enter valid email address');
                $("#txtEmail").val('');
                return false;
            }
            else {
             
                return true;
            }
        }
        function SetDefaultValue() {
             
        }
       
       
   </script>
   <script type="text/javascript">
       history.pushState(null, null, document.URL);
      
       function Encrypt() {

           $.ajax({
               type: "POST",
               url: "Login.aspx/Encryptdata",
               data: "{'password':'" + $('#txtpassword').val() + "'}",
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               success: function (msg) {
                   $('#txtpassword').val(msg.d);
               }
           });
           return false;
       }

</script>

</head>
<body>
    <form id="form1" runat="server">
    <div>
    <div class="container login-container">
            <div class="row mainlogidiv">
             <div class="col-md-6 login-form-2">
             <div class="text-center mb-2"><img src="../assets/img/logo.png" height="65px" width="65px"></div>
                    <h4>Dealer Management System </h4>
                    <div class="loginContent">
                    <p>Lorem Ipsum is simply dummy text text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                  
                    </div>
                 
                </div>
                <div class="col-md-6 login-form-1">
                    <h3>Login </h3>
                    <form>
                        <div class="form-group">
                            <input type="text" id="txtUserName" runat="server" class="form-control" placeholder="Your Email *" value="" />
                        </div>
                        <div class="form-group">
                            <input type="password" id="txtpassword" runat="server" class="form-control" placeholder="Your Password *" value="" />
                        </div>
                        <div class="form-group">
                           <input type="submit" class="btnSubmit" id="btnSubmit" runat="server" OnClientClick="return checkValidations();" onserverclick="btnSubmit_Click" value="Login"/>
                              </div>
                                   <div class="form-group">
                            <asp:Label ID="lblDispMessage" runat="server"  Visible="false"
                                                CssClass="err"></asp:Label>
                                              </div>
                                         <div class="form-group">        
    <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
                        </div>
                        <div class="form-group">
                            <a href="resetPassword.aspx" class="ForgetPwd">Forget Password?</a>
                        </div>
                    </form>
                </div>
               
            </div>
        </div>
    </div>
    
    </form>
</body>
</html>
