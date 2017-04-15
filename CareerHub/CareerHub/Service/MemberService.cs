namespace CareerHub.Service
{
    using System;
    using System.Collections.Generic;
    using Entities;
    using Repository;
    using System.Linq;

    public class MemberService : IMemberService
    {
        private IMemberRepository _memberRepository;
        private IUnitOfWork _unitOfWork;

        public MemberService(IMemberRepository memberRepository, IUnitOfWork unitOfWork)
        {
            this._memberRepository = memberRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<Member> GetMembers(string memberId = null, string firstName = null, string lastName = null, string email = null, string phone = null)
        {
            if(memberId != null)
            {
                return _memberRepository.GetAll().Where(m => m.MemberId.ToString() == memberId);
            }
            else if (firstName == null && lastName == null && email == null && phone == null)
            {
                return _memberRepository.GetAll();
            }
            else
            {
                return _memberRepository.GetAll().Where(m => firstName != null && m.FirstName.ToLower().IndexOf(firstName.ToLower().ToString()) > -1  ||
                    lastName != null && m.LastName.ToLower().IndexOf(lastName.ToLower().ToString()) > -1 ||
                    email != null && m.Email.ToLower().IndexOf(email.ToLower().ToString()) > -1 ||
                    phone != null && m.Phone.ToLower().IndexOf(phone.ToLower().ToString()) > -1
                );
            }
        }
    }
}
