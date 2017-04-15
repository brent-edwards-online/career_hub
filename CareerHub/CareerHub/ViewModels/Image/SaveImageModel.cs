namespace CareerHub.ViewModels.Image
{
    using System.ComponentModel.DataAnnotations;

    public class SaveImageModel
    {
        [Required]
        public bool IsLiked { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        [MaxLength(1000)]
        public string ImageUrls { get; set; }

        [Required]
        [MaxLength(1500)]
        public string ImageUser { get; set; }
    }
}
