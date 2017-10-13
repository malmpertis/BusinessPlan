using buzplan.Models;
using buzplan.ObjectClasses;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace buzplan.Controllers
{
    public class PdfController : Controller
    {

        public ActionResult Header(string titlos)
        {
            ViewBag.titlos = titlos;
            return View();

        }
        public ActionResult Footer()
        {
            string UserId = User.Identity.GetUserId();
            using (var db = new businessPlanEntities())
            {
                var returned = Plan.GetPlan(UserId, db);
                return View(returned);
            }
        }
    }
}