using buzplan.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace buzplan.Controllers
{
    public class PlanController : Controller
    {
        // GET: Plan

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
                        db.PlanItems.AddRange(plan.Select(c => new PlanItems
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
    }
}