using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CareerHub.Entities;
using Microsoft.EntityFrameworkCore;

namespace CareerHub.Repository
{
    public class UserImageRepository : IUserImageRepository
    {
        DbContext _context;

        public UserImageRepository(CareerHubDbContext context)
        {
            this._context = context;
        }

        public void Delete(object id)
        {
            throw new NotImplementedException();
        }

        public void Delete(UserImage entityToDelete)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<UserImage> GetAll()
        {
            throw new NotImplementedException();
        }

        public UserImage GetById(object id)
        {
            throw new NotImplementedException();
        }

        public void Insert(UserImage entity)
        {
            throw new NotImplementedException();
        }

        public void Update(UserImage entityToUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
