namespace CareerHub.Service
{
    using Entities;
    using System.Collections.Generic;

    public interface IMemberService
    {
        IEnumerable<Member> GetMembers(string memberId = null, string firstName = null, string lastName = null, string email = null, string phone = null);
    }
}
