using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CareerHub.Entities
{
    public class UserImage
    {
        public int UserImageId { get; set; }
        public int UserId { get; set; }
        public string ImageUrl { get; set; }
        public bool IsLiked { get; set; }
    }
}
