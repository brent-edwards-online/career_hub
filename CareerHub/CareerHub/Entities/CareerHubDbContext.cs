using Microsoft.EntityFrameworkCore;

namespace CareerHub.Entities
{
    public class CareerHubDbContext : DbContext
    {

        public CareerHubDbContext(DbContextOptions<CareerHubDbContext> options) : base(options)
        {

        }

        //public DbSet<QualificationProvider> QualificationProviders { get; set; }
        //public DbSet<Qualification> Qualifications { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //builder.Entity<Qualification>().ToTable("Qualifications");
            //builder.Entity<QualificationProvider>().ToTable("QualificationProviders");
        }
    }
}
