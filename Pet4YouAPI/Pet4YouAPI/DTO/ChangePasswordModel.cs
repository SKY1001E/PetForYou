namespace Pet4YouAPI.DTO
{
    public class ChangePasswordModel
    {
        public int UserId { get; set; }
        public string OldPassword { get; set; } = "";
        public string NewPassword { get; set; } = "";
    }
}
