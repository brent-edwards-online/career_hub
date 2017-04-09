namespace CareerHub.Service
{
    using Entities;
    using System.Collections.Generic;

    public interface IImageService
    {
        IEnumerable<UserImage> GetImagesByUser(string userid);
        bool InsertImage(string userid, string urls, string imageuser, bool isLiked);
        void RemoveImage(string userImageId);
    }
}
