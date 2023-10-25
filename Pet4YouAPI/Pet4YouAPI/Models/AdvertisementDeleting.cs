using System;
using System.Collections.Generic;

namespace Pet4YouAPI.Models;

public partial class AdvertisementDeleting
{
    public int Id { get; set; }

    public int? AdminUserId { get; set; }

    public int? AdvertisementId { get; set; }

    public DateTime? DeleteDate { get; set; }

    public string? Reason { get; set; }

    public virtual User? AdminUser { get; set; }

    public virtual Advertisement? Advertisement { get; set; }
}
