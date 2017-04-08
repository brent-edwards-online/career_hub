namespace CareerHub.Repository
{
    public interface IUnitOfWork
    {
        void RollBack();

        void SaveChanges();
    }
}
