using Pet4YouAPI.DTO;
using Pet4YouAPI.Models;

namespace Pet4YouAPI.DI
{
    public interface IAuthService
    {
        public Task<User?> Login(AuthModel login);

        public Task<RegistrationResult> Register(User user);
    }
}
