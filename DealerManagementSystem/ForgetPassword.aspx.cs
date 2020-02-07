using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Banking_System.AppCode;
using System.Data;
using System.Globalization;
namespace HRPayroll
{
    public partial class ForgetPassword : System.Web.UI.Page
    {
        string UserId = string.Empty;
        string EmailId = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            //string UserId = DbSecurity.Decrypt(Request.QueryString["Id"]);
            //ViewState["UserId"] = UserId;

            if (!Page.IsPostBack)
            {
                string UserId = DbSecurity.Decrypt(Request.QueryString["Id"]);
                ViewState["UserId"] = UserId;

            }

                
            
        }
        protected void btnProceed_Click(object sender, EventArgs e)
        {
            //string Password = string.Empty;
            //string pass = string.Empty;
            //string passkey = string.Empty;

            //CommonManger CommonManger = new CommonManger();
            //try
            //{
            //    if (txtPassword.Value != "" && txtConfrmpassword.Value != "")
            //    {
            //        if (txtPassword.Value == txtConfrmpassword.Value)
            //        {
            //            if (txtPassword.Value.Length >= 4)
            //            {
            //                Password = DbSecurity.Encrypt(txtPassword.Value, ref passkey);

            //                DataSet ds = CommonManger.FillDatasetWithParam("DMS_Login", "@QueryType", "@Password","@PasswordKey","@UserId", "UpdatePassword", Password,passkey, ViewState["UserId"].ToString());
            //                if (ds.Tables[0].Rows.Count > 0)
            //                {
            //                    lblpopmsg.InnerText = "Password Updated Successfuly !!";
            //                    ScriptManager.RegisterStartupScript(this, typeof(Page), "msg", "alert('password has been changed Successfuly !!')", true);
            //                    txtPassword.Value = "";
            //                    txtPassword.Value = "";

            //                }
            //                else
            //                {
            //                    lblpopmsg.InnerText = "Password not Updated Successfuly !!";
            //                    //Response.Write("<script>Showpop();</script>");
            //                    ScriptManager.RegisterStartupScript(this, typeof(Page), " Showpop", " Showpop();", true);
            //                  // ScriptManager.RegisterStartupScript(this, typeof(Page), "msg", "alert('Password Updated Unsuccessfuly !!')", true);
            //                }
            //            }
            //            else
            //            {
            //                lblDispMessage.Visible = true;
            //                lblDispMessage.Text = "Minimum Length Of Password Is 4";
            //                // ScriptManager.RegisterStartupScript(this, typeof(Page), "msg", "alert('Minimum Length Of Password Is 4 !!')", true);
            //                txtPassword.Value = "";
            //                txtPassword.Value = "";
            //                // popup1.Visible = true;
            //            }
            //        }
            //        else
            //        {
            //            lblDispMessage.Visible = true;
            //            lblDispMessage.Text = "New Password Doesn't Match To Confirm Password";
            //            //  Response.Write("<script>alert('New Password Doesn't Match To Confirm Password !!');</script>");
            //            txtPassword.Value = "";
            //            txtPassword.Value = "";
            //            //  popup1.Visible = true;
            //        }
            //    }
            //    else
            //    {
            //        lblDispMessage.Visible = true;
            //        lblDispMessage.Text = "Please enter password";
            //        //   ScriptManager.RegisterStartupScript(this, typeof(Page), "msg", "alert('Please enter password !!')", true);

            //        txtPassword.Value = "";
            //        txtPassword.Value = "";
            //    }
            }
            //catch (Exception ex)
            //{

            //    throw;
            //}

       // }
    }
}