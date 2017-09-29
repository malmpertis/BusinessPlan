using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using buzplan.Models;

namespace buzplan.Controllers
{
    public class GeoController : Controller
    {
        // GET: Geo
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GetByPid(long? pid)
        {
            using (var db = new businessPlanEntities())
            {
                if (pid != null)
                {
                    var result = db.GeoCodes.Where(c => c.ParentId == pid.Value).ToList().Select(c => new {
                        c.Descr,
                        c.Id,
                    });
                    return Json(result);
                }
                else
                {
                    var result = db.GeoCodes.Where(c => c.Level == 3).ToList().Select(c => new {
                        c.Descr,
                        c.Id,
                    });
                    return Json(result);
                }
            }
        }
        public ActionResult GetById(long id)
        {
            using (var db = new businessPlanEntities())
            {
                var result = db.GeoCodes.Find(id);
                return Json(result);
            }
        }

        public ActionResult Resolve(long Id)
        {
            using (var db = new businessPlanEntities())
            {
                var curr = db.GeoCodes.Find(Id);
                List<Object> ret = new List<object>();
                while (curr != null && curr.Level >= 3)
                {
                    ret.Add(new
                    {
                        curr.Id,
                        curr.Descr
                    });
                    curr = db.GeoCodes.Find(curr.ParentId);
                }
                ret.Reverse();
                return Json(ret);
            }
        }
    }
}