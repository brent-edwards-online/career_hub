using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CareerHub.Controllers
{
    using Service;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using ViewModels.Image;
    using System;

    [Route("api/[controller]")]
    [Authorize]
    public class MemberController : Controller
    {
        private IMemberService _memberService;

        public MemberController(IMemberService memberService)
        {
            this._memberService = memberService;
        }

        [HttpGet]
        public IActionResult Get(string memberId = null, string firstName = null, string lastName = null, string email = null, string phone = null)
        {
            return new JsonResult(new { Result = this._memberService.GetMembers(memberId, firstName, lastName, email, phone) });
        }
    }
}
