namespace CareerHub.Service
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using Entities;
    using Repository;

    public class ImageService : IImageService
    {
        private IUserImageRepository _userImageRepository;
        private IUnitOfWork _unitOfWork;

        public ImageService(IUserImageRepository userImageRepository, IUnitOfWork unitOfWork)
        {
            this._userImageRepository = userImageRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<UserImage> GetImagesByUser(string userid)
        {
            return this._userImageRepository.GetAll().Where(i => i.UserId == userid);
        }

        public bool InsertImage(string userid, string urls, string imageuser, bool isLiked)
        {
            try
            {
                UserImage userImage = new UserImage() { UserId = userid, ImageUrls = urls, ImageUser = imageuser, IsLiked = isLiked };
                this._userImageRepository.Insert(userImage);
                this._unitOfWork.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public void RemoveImage(string userImageId)
        {
            int id = Int32.Parse(userImageId);
            this._userImageRepository.Delete(id);
            this._unitOfWork.SaveChanges();
        }
    }
}
