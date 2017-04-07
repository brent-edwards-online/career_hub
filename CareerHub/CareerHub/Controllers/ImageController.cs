namespace CareerHub.Controllers
{
    using Service;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [Authorize]
    public class ImageController : Controller
    {
        private IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            this._imageService = imageService;
        }

        
        [HttpGet]
        public IActionResult GetAll()
        {
            return new JsonResult( new { Result = this._imageService.GetMessage() } );
        }
    }
}
