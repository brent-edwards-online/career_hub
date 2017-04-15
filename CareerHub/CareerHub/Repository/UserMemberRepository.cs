using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CareerHub.Entities;
using Microsoft.EntityFrameworkCore;

namespace CareerHub.Repository
{
    public class MemberRepository : GenericRepository<Member>, IMemberRepository
    {
        public MemberRepository(GymManagerDbContext context) : base(context)
        {
        }
    }
}
