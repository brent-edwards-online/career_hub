
namespace CareerHub.Repository
{
    using global::CareerHub.Entities;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;


    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {

        protected readonly DbContext _context;
        /// <summary>
        /// The data set.
        /// </summary>
        protected readonly DbSet<T> _dataset;

        /// <summary>
        /// Initializes a new instance of the <see cref="GenericRepository{T}"/> class.
        /// </summary>
        /// <param name="factory">The database factory.</param>
        public GenericRepository(DbContext context)
        {
            this._context = context;
            this._dataset = this._context.Set<T>();
        }

        /// <summary>The get all.</summary>
        /// <returns>The <see cref="IEnumerable{T}"/>.</returns>
        public virtual IEnumerable<T> GetAll()
        {
            return this._dataset;
        }

        /// <summary>The get by id.</summary>
        /// <param name="id">The id.</param>
        /// <returns>The <see cref="T"/> entity or null.</returns>
        public virtual T GetById(object id)
        {
            return this._dataset.Find(id);
        }

        /// <summary>
        /// Inserts the entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        public virtual void Insert(T entity)
        {
            var entityEntry = this._context.Entry(entity);
            if (entityEntry.State != EntityState.Detached)
            {
                entityEntry.State = EntityState.Added;
            }
            else
            {
                this._dataset.Add(entity);
            }
        }

        /// <summary>The delete.</summary>
        /// <param name="id">The id.</param>
        public virtual void Delete(object id)
        {
            T entityToDelete = this._dataset.Find(id);
            this.Delete(entityToDelete);
        }

        /// <summary>
        /// The update.
        /// </summary>
        /// <param name="entityToUpdate">The entity to update.</param>
        public virtual void Update(T entityToUpdate)
        {
            var entityEntry = this._context.Entry(entityToUpdate);
            if (entityEntry.State == EntityState.Detached)
            {
                this._dataset.Attach(entityToUpdate);
            }

            entityEntry.State = EntityState.Modified;
        }

        /// <summary>
        /// The delete.
        /// </summary>
        /// <param name="entity">The entity to delete.</param>
        public virtual void Delete(T entity)
        {
            var entityEntry = this._context.Entry(entity);
            if (entityEntry.State != EntityState.Deleted)
            {
                entityEntry.State = EntityState.Deleted;
            }
            else
            {
                this._dataset.Attach(entity);
                this._dataset.Remove(entity);
            }
        }
    }
}
