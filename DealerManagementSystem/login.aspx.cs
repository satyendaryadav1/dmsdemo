using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.IO;
using System.Text;
using System.Net.Mail;
using System.Configuration;
using System.Data.SqlClient;
using DealerManagementSystem.Entity;
using Banking_System.AppCode;


namespace dms
{
    public partial class login : System.Web.UI.Page
       
    {
        DMSEntities context = new DMSEntities();
        //CommonManger CommonManger = new CommonManger();
        [System.Web.Services.WebMethod()]
        [System.Web.Script.Services.ScriptMethod()]

        public static string Encryptdata(string password)
        {
            string strmsg = string.Empty;
            byte[] encode = new byte[password.Length];
            encode = Encoding.UTF8.GetBytes(password);
           return strmsg;
        }
        //   [System.Web.Services.WebMethod]
        public string Decryptdata(string encryptpwd)
        {
            string decryptpwd = string.Empty;
            UTF8Encoding encodepwd = new UTF8Encoding();
            Decoder Decode = encodepwd.GetDecoder();
            byte[] todecode_byte = Convert.FromBase64String(encryptpwd);
            int charCount = Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
            char[] decoded_char = new char[charCount];
            Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
            decryptpwd = new String(decoded_char);
            return decryptpwd;
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
               
            }
        }


        protected void btnSubmit_Click(object sender, EventArgs e)
        {

            
        //    try
        //    {

        //        lblDispMessage.Text = "";
        //        lblDispMessage.Visible = false;
        //        string strErrMessage = string.Empty;
        //        if (txtUserName.Value == "" && txtpassword.Value == "")
        //        {


        //            lblDispMessage.Text = "Please enter a user name and valid password";
        //            lblDispMessage.Style.Add("color", "red");
        //            lblDispMessage.Visible = true;
        //            return;
        //        }
        //        else
        //        {

        //            lblDispMessage.Text = "";
        //            lblDispMessage.Visible = false;
        //        }

        //        if (txtUserName.Value == "")
        //        {
                   
                    
        //        lblDispMessage.Text = "Please enter a user name";
        //        lblDispMessage.Style.Add("color", "red");
        //        lblDispMessage.Visible = true;
        //        return;
        //        }
        //        else
        //        {

        //            lblDispMessage.Text = "";
        //            lblDispMessage.Visible = false;
        //        }


        //        if (txtpassword.Value == "")
        //        {

        //            lblDispMessage.Text = "Please enter Password";
        //            lblDispMessage.Style.Add("color", "red");
        //            lblDispMessage.Visible = true;
        //            return ;
        //        }
        //        else
        //        {

        //            lblDispMessage.Text = "";
        //            lblDispMessage.Visible = false;
        //        }

        //        if (txtpassword.Value!="" && txtUserName.Value!="")
        //        {
        //            DataSet dsUser = new DataSet();
        //            dsUser = Iace.User.User.GetUser(txtUserName.Value);
        //            if (dsUser != null && dsUser.Tables.Count>0 && dsUser.Tables[0].Rows.Count>0)
        //            {
        //                if (Convert.ToString(dsUser.Tables[0].Rows[0]["EmailId"]) == "0")
        //                {
        //                    lblDispMessage.Text = "User is InActive!!";
        //                    lblDispMessage.Style.Add("color", "red");
        //                    lblDispMessage.Visible = true;
        //                }
        //                else
        //                {
        //                    if (Convert.ToString(dsUser.Tables[0].Rows[0]["EmailId"]) == "-1")
        //                    {
        //                        lblDispMessage.Text = "Invalid User!!";
        //                        lblDispMessage.Style.Add("color", "red");
        //                        lblDispMessage.Visible = true;
        //                    }
        //                    else
        //                    {
        //                        string strDbPassword = DbSecurity.Decrypt(Convert.ToString(dsUser.Tables[0].Rows[0]["Password"]), Convert.ToString(dsUser.Tables[0].Rows[0]["PasswordKey"]));
        //                        if (strDbPassword != txtpassword.Value.Trim())
        //                        {
        //                            lblDispMessage.Text = "Wrong  Password!!";
        //                            lblDispMessage.Style.Add("color", "red");
        //                            lblDispMessage.Visible = true;
        //                        }
        //                        else
        //                        {
        //                            if (Convert.ToString(dsUser.Tables[0].Rows[0]["UserType"]) == "2")
        //                            {
        //                                Session["UserId"] = Convert.ToString(dsUser.Tables[0].Rows[0]["UserId"]);
        //                                Session["EmailId"] = Convert.ToString(dsUser.Tables[0].Rows[0]["EmailId"]);
        //                                Session["UserName"] = Convert.ToString(dsUser.Tables[0].Rows[0]["UserName"]);
        //                                Session["WareHouseId"] = Convert.ToString(dsUser.Tables[0].Rows[0]["WareHouseId"]);
        //                                Session["AccountNo"] = Convert.ToString(dsUser.Tables[0].Rows[0]["AccountNo"]);
                                        
        //                                ScriptManager.RegisterStartupScript(this, GetType(), "showalert", "alert('Only alert Message');", true);
        //                                txtpassword.Value = "";
        //                                txtUserName.Value = "";
        //                                Response.Redirect("\\Home\\Dashboard.aspx");
        //                            }
        //                            else
        //                            {
        //                                //code for Dealer Dashboard
        //                            }
        //                        }
        //                    }
        //                }
        //            }
        //            else
        //            {
        //                txtUserName.Value = "";
        //                lblDispMessage.Text = "Invalid User!!";
        //                lblDispMessage.Style.Add("color", "red");
        //                lblDispMessage.Visible = true;
        //            }
        //        }

        //    }
        //    catch (Exception ex)
        //    {

        //    }
        }



    }
}