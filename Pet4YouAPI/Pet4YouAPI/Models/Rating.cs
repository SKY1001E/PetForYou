using System;
using System.Collections.Generic;

namespace Pet4YouAPI.Models;

public partial class Rating
{
    public int Id { get; set; }

    public int? RaterUserId { get; set; }

    public int? RecipientUserId { get; set; }

    public short? Score { get; set; }

    public string? Comment { get; set; }

    public DateTime? RatingDate { get; set; }

    public virtual User? RaterUser { get; set; }

    public virtual User? RecipientUser { get; set; }
}
