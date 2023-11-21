using Pet4YouAPI.Models;

namespace Pet4YouAPI.DTO
{
    public class AdvertisementFilterModel
    {
        public string AdvertisementType { get; set; } = "sell";
        public List<string>? PetTypes { get; set; } = new List<string>();
        public List<string>? PetBreeds { get; set; } = new List<string>();
        public AdvertisementLocation? Location { get; set; }
        public string? Gender { get; set; }

        public int? MinAge { get; set; }
        public int? MaxAge { get; set; }

        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
    }
}
