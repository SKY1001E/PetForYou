using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Pet4YouAPI.Models;

public partial class User
{
    public int Id { get; set; }

    public string Login { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public DateTime RegistrationDate { get; set; }

    public bool Admin { get; set; }

    public bool Banned { get; set; }

    public bool Deleted { get; set; }

    // public virtual ICollection<AdvertisementDeleting> AdvertisementDeletings { get; set; } = new List<AdvertisementDeleting>();

    [JsonIgnore]
    public virtual ICollection<Advertisement> Advertisements { get; set; } = new List<Advertisement>();

    [JsonIgnore]
    public virtual ICollection<OrderRequest> OrderRequests { get; set; } = new List<OrderRequest>();

    [JsonIgnore]
    public virtual ICollection<Rating> RatingRaterUsers { get; set; } = new List<Rating>();

    [JsonIgnore]
    public virtual ICollection<Rating> RatingRecipientUsers { get; set; } = new List<Rating>();

    public virtual UserInfo? UserInfo { get; set; }
}
