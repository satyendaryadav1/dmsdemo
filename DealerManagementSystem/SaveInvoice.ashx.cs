using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

using System.Data;
using System.Net;

namespace DealerManagementSystem
{
    /// <summary>
    /// Summary description for SaveInvoice
    /// </summary>
    //public class SaveInvoice : IHttpHandler
    public class SaveInvoice
    {

        public void ProcessRequest(HttpContext context)
        {
        //    string FinalJson = "";
        //    string AttachFlag = "";
        //    string AttachJson = "[";
        //    string UserId = "";
        //    CommonManger CommonManger = new CommonManger();
        //     string InVoiceNo = context.Request.QueryString["InVoiceNo"];
        //     string Itemdata = context.Request.QueryString["Itemdata"];
        //     string InvoiceData = context.Request.QueryString["InvoiceData"];
        //     UserId = context.Request.QueryString["UserId"];
        //     context.Response.ContentType = "text/html";
        //    if (context.Request.Files.Count > 0)
        //    {
        //        string path = context.Server.MapPath("~/InvoiceAttachment/" + InVoiceNo);
        //        string DbPath = "";
        //        if (Directory.Exists(path))
        //        {
        //        }
        //        else
        //        {
        //            Directory.CreateDirectory(path);
        //        }

        //        HttpFileCollection files = context.Request.Files;
        //        for (int i = 0; i < files.Count; i++)
        //        {
        //            HttpPostedFile file = files[i];
        //            string fname = path +@"\" + file.FileName;
        //            DbPath = @"..\InvoiceAttachment\" + InVoiceNo + @"\" + file.FileName;
        //            AttachJson +="{"+'"'+"AttachFile"+'"'+':'+'"'+DbPath+'"'+"},";
        //            file.SaveAs(fname);
        //            AttachFlag = "1";
        //        }
               
        //         FinalJson=  AttachJson.Remove(AttachJson.Length - 1);
        //        AttachJson=FinalJson+"]";
        //    }
        //    if (AttachFlag == "")
        //    {
        //        AttachJson = "";
        //    }
           
        //    DataTable dt= CommonManger.FillDatatableWithParam("DMS_SaleInvoice", "@QueryType", "@Invoicedatajson", "@ItemDataJson", "@AttachFileJson", "@userId", "SaveInvoice", InvoiceData, Itemdata, AttachJson, UserId);
        //    if (Convert.ToString(dt.Rows[0]["response"])== "1")
        //    {
        //        context.Response.ContentType = "text/plain";
        //        context.Response.Write("1");
        //        context.Response.StatusCode = (int)HttpStatusCode.OK;
        //    }
        //    else {
        //        context.Response.Write("fail");
        //        context.Response.StatusCode = (int)HttpStatusCode.NoContent;
        //    }
        //}

        //public bool IsReusable
        //{
        //    get
        //    {
        //        return false;
        //    }
        }
    }
}