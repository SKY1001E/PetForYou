using Microsoft.EntityFrameworkCore;
using Pet4YouAPI.DBContext;
using Pet4YouAPI.DI;
using Pet4YouAPI.Models;
using ProjectHiveAPI.Models;

namespace Pet4YouAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly Pet4YouContext context;
        private readonly IUserService userService;

        public AuthService(Pet4YouContext context, IUserService userService)
        {
            this.context = context;
            this.userService = userService;
        }

        public async Task<User?> Login(AuthModel userLogin)
        {
            User? user = null;

            if(userLogin.Login != "")
            {
                user = await context.Users.Include(u => u.UserInfo).FirstOrDefaultAsync(u => u.Login == userLogin.Login);
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

            if (user != null && VerifyPassword(userLogin.Password, user.PasswordHash))
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

            userService?.AddUser(user);

            return RegistrationResult.Success;
        }

        private bool VerifyPassword(string enteredPassword, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(enteredPassword, hashedPassword);
        }
    }
}
