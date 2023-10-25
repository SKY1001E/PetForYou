using Microsoft.EntityFrameworkCore;
using Pet4YouAPI.DBContext;
using Pet4YouAPI.DI;
using Pet4YouAPI.Models;

namespace Pet4YouAPI.Services
{
    public class UserService : IUserService
    {
        private readonly Pet4YouContext _context;

        public UserService(Pet4YouContext context)
        {
            _context = context;
        }

        public async Task<User> AddUser(User user)
        {
            if(user.UserInfo != null)
            {
                _context.Users.Add(user);
                _context.UserInfos.Add(user.UserInfo);
            }
            await _context.SaveChangesAsync();

            return user;
        }
    }
}
