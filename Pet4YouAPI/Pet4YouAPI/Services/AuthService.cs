using Microsoft.EntityFrameworkCore;
using Pet4YouAPI.DBContext;
using Pet4YouAPI.DI;
using Pet4YouAPI.DTO;
using Pet4YouAPI.Models;

namespace Pet4YouAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly Pet4YouContext context;
        private readonly IUserService _userService;
        private readonly IHashService _hashService;

        public AuthService(Pet4YouContext context, IUserService userService, IHashService hashService)
        {
            this.context = context;
            this._userService = userService;
            this._hashService = hashService;
        }

        public async Task<User?> Login(AuthModel userLogin)
        {
            User? user = null;

            if(userLogin.Email != "")
            {
                user = await context.Users.Include(u => u.UserInfo).FirstOrDefaultAsync(u => u.Login == userLogin.Email);
            }

            if (user == null)
            {
                if (userLogin.Email != "")
                {
                    var userInfo = await context.UserInfos.Include(u => u.User).FirstOrDefaultAsync(u => u.Email == userLogin.Email);
                    if (userInfo != null)
                        user = userInfo.User;
                }
            }

            if (user != null && _hashService.VerifyPassword(userLogin.Password, user.PasswordHash) && user.Deleted == false)
            {
                return user;
            }

            return null;
        }

        public async Task<RegistrationResult> Register(User user)
        {
            if (user.UserInfo == null)
                return RegistrationResult.OtherError;

            var isLoginExists = await context.Users.AnyAsync(u => u.Login == user.Login);
            var isEmailExists = await context.UserInfos.AnyAsync(u => u.Email == user.UserInfo.Email);

            if (isLoginExists)
                return RegistrationResult.LoginExists;
            
            if(isEmailExists)
                return RegistrationResult.EmailExists;

            await _userService.AddUser(user);

            return RegistrationResult.Success;
        }
    }
}
