using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using buzplan.Models;

namespace buzplan.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult GetKad(string keyword)
        {
            using(var db=new businessPlanEntities())
            {
                var result = db.bp_kad.Where(c => c.id.StartsWith(keyword)||c.title.Contains(keyword)).OrderBy(c => c.id).Take(10).ToList();
                return Json(result);
            }
        }
        
    }
}