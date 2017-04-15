namespace CareerHub.ViewModels.Member
{
    using System.ComponentModel.DataAnnotations;

    public class MemberSearchModel
    {
        [Required]
        public string MemberId { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Phone { get; set; }
    }
}
