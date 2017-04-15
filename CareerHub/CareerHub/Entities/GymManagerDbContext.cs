namespace CareerHub.Entities
{
    using Microsoft.EntityFrameworkCore;

    public class GymManagerDbContext : DbContext
    {
        public GymManagerDbContext(DbContextOptions<GymManagerDbContext> options) : base(options)
        {

        }

        public DbSet<Member> Members { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Member>().ToTable("Members");
        }
    }
}
