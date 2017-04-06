using CareerHub.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CareerHub.Controllers
{
    //[Route("api/[controller]")]
    //[Authorize]
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
