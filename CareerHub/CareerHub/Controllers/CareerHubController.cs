using CareerHub.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CareerHub.Controllers
{
    public class CareerHubController : Controller
    {
        private CareerHubDbContext _context; // = new ApplicationDbContext();

        public CareerHubController(CareerHubDbContext context)
        {
            this._context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        /*
        [HttpGet]
        public IActionResult GetAll()
        {
            return new JsonResult( new { Result = "Success" } );
        }
        */
    }
}
