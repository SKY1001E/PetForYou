using System;
using System.Collections.Generic;

namespace Pet4YouAPI.Models;

public partial class UserInfo
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? PatronymicName { get; set; }

    public string? ProfileImageSource { get; set; }

    public string? Sex { get; set; }

    public string? Biography { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public virtual User IdNavigation { get; set; } = null!;
}
