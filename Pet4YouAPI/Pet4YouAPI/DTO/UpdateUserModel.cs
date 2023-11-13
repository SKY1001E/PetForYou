using Microsoft.EntityFrameworkCore;
using Pet4YouAPI.Models;

namespace Pet4YouAPI.DTO
{
    public class UpdateUserModel
    {
        public int Id { get; set; }
        public string? Login { get; set; } = "";
        public string? Sex { get; set; } = "";
        public string? Email { get; set; } = "";
        public string? Phone { get; set; } = "";
        public DateTime? DateOfBirth { get; set; }
        public string? Biography { get; set; } = "";
        public string? FirstName { get; set; } = "";
        public string? LastName { get; set; } = "";
        public string? PatronymicName { get; set; } = "";
    }
}
