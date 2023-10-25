using System;
using System.Collections.Generic;

namespace Pet4YouAPI.Models;

public partial class AdvertisementCriterion
{
    public int Id { get; set; }

    public int? CriteriaId { get; set; }

    public int? AdvertisementId { get; set; }

    public string? Value { get; set; }

    public virtual Advertisement? Advertisement { get; set; }

    public virtual Criteria? Criteria { get; set; }
}
