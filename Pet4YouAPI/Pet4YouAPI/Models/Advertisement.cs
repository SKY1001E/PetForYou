using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Pet4YouAPI.Models;

public partial class Advertisement
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Type { get; set; }

    public string? Description { get; set; }

    public string? PetType { get; set; }

    public DateTime? PublicationDate { get; set; }

    public int? UserId { get; set; }

    //public virtual ICollection<AdvertisementCriterion> AdvertisementCriteria { get; set; } = new List<AdvertisementCriterion>();

    [JsonIgnore]
    public virtual ICollection<AdvertisementDeleting> AdvertisementDeletings { get; set; } = new List<AdvertisementDeleting>();

    public virtual AdvertisementLocation? AdvertisementLocation { get; set; }

    [JsonIgnore]
    public virtual ICollection<OrderRequest> OrderRequests { get; set; } = new List<OrderRequest>();

    [JsonIgnore]
    public virtual User? User { get; set; }

    public AdvertisementInfo? AdvertisementInfo { get; set; }
}
