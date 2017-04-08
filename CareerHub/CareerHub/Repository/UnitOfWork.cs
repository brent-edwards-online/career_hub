namespace CareerHub.Repository
{
    using Entities;
    
    public class UnitOfWork : IUnitOfWork
    {
        private CareerHubDbContext _context;

        public UnitOfWork(CareerHubDbContext context)
        {
            this._context = context;
        }

        public void RollBack()
        {
          
        }

        public void SaveChanges()
        {
            this._context.SaveChanges();
        }
    }
}
