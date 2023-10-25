using System;
using System.Collections.Generic;

namespace Pet4YouAPI.Models;

public partial class Criteria
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<AdvertisementCriterion> AdvertisementCriteria { get; set; } = new List<AdvertisementCriterion>();
}
