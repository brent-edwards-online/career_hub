namespace CareerHub.Entities
{
    using Microsoft.EntityFrameworkCore;

    public class CareerHubDbContext : DbContext
    {
        public CareerHubDbContext(DbContextOptions<CareerHubDbContext> options) : base(options)
        {

        }

        public DbSet<UserImage> UserImages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<UserImage>().ToTable("UserImages");
        }
    }
}
