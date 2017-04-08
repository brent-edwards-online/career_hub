using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CareerHub.Entities;
using Microsoft.EntityFrameworkCore;

namespace CareerHub.Repository
{
    public class UserImageRepository : GenericRepository<UserImage>, IUserImageRepository
    {
        public UserImageRepository(CareerHubDbContext context) : base(context)
        {
        }
    }
}
