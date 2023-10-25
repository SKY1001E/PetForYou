using System;
using System.Collections.Generic;

namespace Pet4YouAPI.Models;

public partial class OrderRequest
{
    public int Id { get; set; }

    public int? AdvertisementId { get; set; }

    public int? UserId { get; set; }

    public string? Message { get; set; }

    public string? Status { get; set; }

    public virtual Advertisement? Advertisement { get; set; }

    public virtual User? User { get; set; }
}
