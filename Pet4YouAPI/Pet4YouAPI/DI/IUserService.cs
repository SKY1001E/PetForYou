using Pet4YouAPI.Models;

namespace Pet4YouAPI.DI
{
    public interface IUserService
    {
        public Task<User> AddUser(User user);
    }
}
