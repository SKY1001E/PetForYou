using Microsoft.EntityFrameworkCore;
using Pet4YouAPI.DBContext;
using Pet4YouAPI.DI;
using Pet4YouAPI.Models;
using Pet4YouAPI.DTO;

namespace Pet4YouAPI.Services
{
    public class UserService : IUserService
    {
        private readonly Pet4YouContext _context;
        private readonly IHashService _hashService;

        public UserService(Pet4YouContext context, IHashService hashService)
        {
            this._context = context;
            this._hashService = hashService;
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

        public async Task<DeletingResult> DeleteUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return DeletingResult.ItemNotFound;

            if (user.Deleted == true)
                return DeletingResult.ItemNotFound;

            user.Deleted = true;
            await _context.SaveChangesAsync();
            
            return DeletingResult.Success;
        }

        public async Task<User?> GetUserByLogin(string login)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Login == login);
            return user;
        }

        public async Task<User?> GetUserById(int Id)
        {
            var user = await _context.Users.Include(u => u.UserInfo).FirstOrDefaultAsync(u => u.Id == Id);
            return user;
        }

        public async Task<bool> UpdateUserInfo(UpdateUserModel newInfo)
        {
            var existingUser = await _context.Users.FindAsync(newInfo.Id);
            var existingUserInfo = await _context.UserInfos.FindAsync(newInfo.Id);
            if (existingUser == null || existingUserInfo == null)
                return false;

            existingUser.Login = newInfo.Login;

            existingUserInfo.Sex = newInfo.Sex;
            existingUserInfo.Email = newInfo.Email;
            existingUserInfo.Phone = newInfo.Phone;
            existingUserInfo.DateOfBirth = newInfo.DateOfBirth;
            existingUserInfo.Biography = newInfo.Biography;
            existingUserInfo.FirstName = newInfo.FirstName;
            existingUserInfo.LastName = newInfo.LastName;
            existingUserInfo.PatronymicName = newInfo.PatronymicName;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ChangePasswordResult> ChangePassword(int userId, string oldPassword, string newPassword)
        {
            var existringUser = await _context.Users.FindAsync(userId);
            if (existringUser == null)
                return ChangePasswordResult.UserNotFound;
            bool isPasswordCorrect = _hashService.VerifyPassword(oldPassword, existringUser.PasswordHash);
            if (!isPasswordCorrect)
                return ChangePasswordResult.IncorrectOldPassword;
            bool isPasswordsEquals = _hashService.VerifyPassword(newPassword, existringUser.PasswordHash);
            if (isPasswordsEquals)
                return ChangePasswordResult.NewPasswordEqualsOld;

            existringUser.PasswordHash = _hashService.HashPassword(newPassword);
            await _context.SaveChangesAsync();
            return ChangePasswordResult.Success;

        }

        public Task<bool> AddPhotoToUser(int userId, string photoPath)
        {
            throw new NotImplementedException();
        }
    }
}
