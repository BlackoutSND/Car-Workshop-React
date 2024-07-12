using System.ComponentModel.DataAnnotations;

namespace AutoVadeProReact.Server.Models
{
    public class Car
    {
        [Key]
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string RegistrationId { get; set; }

    }
}
