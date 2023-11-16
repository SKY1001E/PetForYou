using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Pet4YouAPI.Models;

public partial class AdvertisementLocation
{
    public int Id { get; set; }

    public string? Country { get; set; }

    public string? City { get; set; }

    public string? Region { get; set; }

    [JsonIgnore]
    public virtual Advertisement? IdNavigation { get; set; }
}
