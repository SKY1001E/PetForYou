namespace Pet4YouAPI.DI
{
    public interface IHashService
    {
        public bool VerifyPassword(string enteredPassword, string hashedPassword);

        public string HashPassword(string password);
    }
}
