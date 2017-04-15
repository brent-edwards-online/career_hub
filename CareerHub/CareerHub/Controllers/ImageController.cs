namespace CareerHub.Controllers
{
    using Service;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using ViewModels.Image;
    using System;

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
        public IActionResult GetAll(string userId)
        {
            return new JsonResult( new { Result = this._imageService.GetImagesByUser(userId) } );
        }

        [HttpDelete]
        public IActionResult Remove(string userImageId)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    this._imageService.RemoveImage(userImageId);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(new { ErrorMessage = ex.Message });
                }
            }
            else
            {
                return BadRequest(new { ErrorMessage = "Model state was invalid" });
            }
        }

        [HttpPost]
        public IActionResult SaveImage(SaveImageModel image)
        {
            if(ModelState.IsValid)
            {
                try
                {
                    this._imageService.InsertImage(image.UserId, image.ImageUrls, image.ImageUser, image.IsLiked);
                    return Ok();
                }
                catch(Exception ex)
                {
                    return BadRequest(new { ErrorMessage = ex.Message });
                }
            }
            else
            {
                return BadRequest(new { ErrorMessage = "Model state was invalid" });
            }
            
        }
    }
}
