using System.Text.Json.Serialization;

namespace Pet4YouAPI.Models
{
    public class AdvertisementInfo
    {
        public int Id { get; set; }
        public string? Breed { get; set; }
        public int Age { get; set; }
        public decimal Price { get; set; }
        public string? Gender { get; set; }

        [JsonIgnore]
        public Advertisement? Advertisement { get; set; }
    }
}
