using System;
using System.Collections.Generic;

namespace Pet4YouAPI.Models;

public partial class Advertisement
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Type { get; set; }

    public DateTime? PublicationDate { get; set; }

    public int? UserId { get; set; }

    public virtual ICollection<AdvertisementCriterion> AdvertisementCriteria { get; set; } = new List<AdvertisementCriterion>();

    public virtual ICollection<AdvertisementDeleting> AdvertisementDeletings { get; set; } = new List<AdvertisementDeleting>();

    public virtual AdvertisementLocation? AdvertisementLocation { get; set; }

    public virtual ICollection<OrderRequest> OrderRequests { get; set; } = new List<OrderRequest>();

    public virtual User? User { get; set; }
}
