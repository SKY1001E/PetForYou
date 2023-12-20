using Pet4YouAPI.DTO;
using Pet4YouAPI.Models;

namespace Pet4YouAPI.DI
{
    public interface IUserService
    {
        public Task<User> AddUser(User user);

        public Task<User?> GetUserById(int Id);

        public Task<User?> GetUserByLogin(string login);

        public Task<bool> UpdateUserInfo(UpdateUserModel user);

        public Task<ChangePasswordResult> ChangePassword(int userId, string oldPassword, string newPassword);

        public Task<bool> AddPhotoToUser(int userId, string photoPath);

        public Task<DeletingResult> DeleteUser(int userId);

        public Task<bool> BanUser(int userId);

    }
}
