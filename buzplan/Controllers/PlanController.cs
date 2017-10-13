using buzplan.Models;
using buzplan.ObjectClasses;
using Microsoft.AspNet.Identity;
using Rotativa.MVC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace buzplan.Controllers
{
    [Authorize]
    public class PlanController : Controller
    {
        public ActionResult Get(string UserId)
        {
            UserId = User.Identity.GetUserId();
            using (var db = new businessPlanEntities())
            {
                return Json((from c in db.PlanItems
                             where c.UserId == UserId
                             select c).ToDictionary(c => c.Item, c => c.Data));
            }
        }

        public ActionResult setImg(HttpPostedFileBase file)
        {
            string UserId = User.Identity.GetUserId();
            string userImage = UserId + "." + file.FileName.Split('.').Last();
            file.SaveAs(AppDomain.CurrentDomain.BaseDirectory + userImage);
            return Json(new
            {
                url = "/" + userImage
            });
        }

        public ActionResult Set(Dictionary<string, string> plan, string UserId)
        {
            string[] reject = { "action", "page", "controller" };
            UserId = User.Identity.GetUserId();
            using (var db = new businessPlanEntities())
            {
                using (var tran = db.Database.BeginTransaction())
                {
                    try
                    {
                        var q = db.PlanItems.Where(c => c.UserId == UserId && plan.Keys.Contains(c.Item)).ToList();
                        if (q.Count > 0)
                        {
                            db.PlanItems.RemoveRange(q);
                            db.SaveChanges();
                        }
                        db.PlanItems.AddRange(plan.Where(c=> !reject.Contains(c.Key)).Select(c => new PlanItems
                        {
                            UserId = UserId,
                            Data = c.Value,
                            Item = c.Key
                        }));
                        db.SaveChanges();
                        tran.Commit();
                        return Json(plan);
                    }
                    catch (Exception e)
                    {
                        tran.Rollback();
                        Response.StatusCode = 500;
                        return Json(e.Message);
                    }
                }

            }

        }

        [AllowAnonymous]
        public ActionResult createDiag1(string UserId)
        {
            using (var db = new businessPlanEntities())
            {
                var returned = Plan.GetPlan(UserId, db);
                return View(returned);
            }
        }

        [AllowAnonymous]
        public ActionResult createDiag2(string UserId)
        {
            using (var db = new businessPlanEntities())
            {
                var returned = Plan.GetPlan(UserId, db);
                return View(returned);
            }
        }

        [AllowAnonymous]
        public ActionResult createDiag3(string UserId)
        {
            using (var db = new businessPlanEntities())
            {
                var returned = Plan.GetPlan(UserId, db);
                return View(returned);
            }
        }

        [AllowAnonymous]
        public ActionResult createDiag4(string UserId)
        {
            using (var db = new businessPlanEntities())
            {
                var returned = Plan.GetPlan(UserId, db);
                return View(returned);
            }
        }

        [AllowAnonymous]
        public ActionResult createDiag5(string UserId)
        {
            using (var db = new businessPlanEntities())
            {

                var returned = Plan.GetPlan(UserId, db);
                return View(returned);
            }
        }

        [AllowAnonymous]
        public ActionResult createDiag6(string UserId)
        {
            using (var db = new businessPlanEntities())
            {

                var returned = Plan.GetPlan(UserId, db);
                return View(returned);
            }
        }

        public ActionResult Pdftest()
        {
            string UserId = User.Identity.GetUserId();
            using (var db = new businessPlanEntities())
            {
                var returned = Plan.GetPlan(UserId, db);
                return View("Pdf", returned);
            }

        }

        public ActionResult Pdf()
        {
            



            string UserId = User.Identity.GetUserId();
            ViewBag.UserId = UserId;
            using (var db = new businessPlanEntities())
            {
                var returned = Plan.GetPlan(UserId, db);
                
                if (returned == null)
                {
                    Response.StatusCode = 500;
                    return null;
                }
                string customSwitches = string.Format(
                 //"--print-media-type " +
                 //"--allow \"{0}\" \"{1}\" " +
                 "--header-html \"{0}\" " +
                 "--footer-html \"{1}\" " +
                 "--load-error-handling ignore " +
                 "--header-spacing \"10\" " +
                 "--footer-spacing \"10\" " +
                 "--footer-font-size \"10\" " +
                 "--header-font-size \"10\" " +
                 //"--footer-left \"Εμπιστευτικό – Να μην διανεμηθεί\" " +
                 //"--footer-center \"[page]/[toPage]\"" +
                 "",
                 //" --load-error-handling ignore",
                 Url.Action("Header", "Pdf", new { titlos = returned.company.title }, "http"),
                 Url.Action("Footer", "Pdf", new { }, "http")
             );
                Response.Headers.Add("Content-Disposition:", "attachment; filename=\"BusinessPlan.pdf\"");
                return new ViewAsPdf(returned)
                {
                    RotativaOptions = new Rotativa.Core.DriverOptions { CustomSwitches = customSwitches }
                    
                }; 
            }

        }
    }
}