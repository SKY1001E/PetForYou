using System;
using System.Collections.Generic;

namespace Pet4YouAPI.Models;

public partial class AdvertisementLocation
{
    public int Id { get; set; }

    public string? Country { get; set; }

    public string? City { get; set; }

    public string? Region { get; set; }

    public virtual Advertisement IdNavigation { get; set; } = null!;
}
