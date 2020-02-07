using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Data;
using System.Net;
using Ionic.Zip;
using System.Configuration;
namespace DealerManagementSystem
{
    /// <summary>
    /// Summary description for Downloadimage
    /// </summary>
    public class Downloadimage : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string InVoiceNo = context.Request.QueryString["InVoiceNo"];
            string attachments = context.Request.QueryString["Imagepath"];
            string[] Attachments = attachments.Split(',');
            
            //Path = ConfigurationManager.AppSettings["INV"].ToString() + "_" + InVoiceNo;
            using (ZipFile zip = new ZipFile())
            {
                zip.AlternateEncodingUsage = ZipOption.AsNecessary;
                zip.AddDirectoryByName(InVoiceNo);
                string path = context.Server.MapPath("~/InvoiceAttachment/" + InVoiceNo);
                string[] fileArray = Directory.GetFiles(path, "*");
                foreach(var file in fileArray)
                {
                    zip.AddFile(file, InVoiceNo);
                }
                context.Response.Clear();
                context.Response.BufferOutput = false;
                string zipName = String.Format("Zip_{0}.zip", (ConfigurationManager.AppSettings["INV"].ToString() + "_" + DateTime.Now.ToString("ddMMyyyy") + "_" + InVoiceNo));
              //  context.Response.ContentType = "application/zip";
              //  context.Response.AddHeader("content-disposition", "attachment; filename=" + zipName);
                //zip.Save(context.Response.OutputStream); // For direct create zip and  download 
                zip.Save(@"D:\Projects\NewDMS\NewDealerManagementSystem\" + zipName); // For  create zip and  save 
               // context.Response.End();
            }

            //string path = context.Server.MapPath("~/InvoiceAttachment/" + InVoiceNo);
            //using (ZipFile zip = new ZipFile())
            //{
            //    zip.AlternateEncodingUsage = ZipOption.AsNecessary;
            //    zip.AddDirectoryByName(InVoiceNo);
            //    zip.AddFile(path,"Image");
            //    context.Response.Clear();
            //    context.Response.BufferOutput = false;
            //    string zipName = String.Format("Zip_{0}.zip", DateTime.Now.ToString("yyyy-MMM-dd-HHmmss"));
            //    context.Response.ContentType = "application/zip";
            //    context.Response.AddHeader("content-disposition", "attachment; filename=" + zipName);
            //    zip.Save(context.Response.OutputStream);
            //    context.Response.End();
            //}











        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}