using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Models
{
    public class User
    {
        public Guid Id { get; set; }
        
        [Required]
        public required string Username { get; set; }
        
        [Required]
        public required string PasswordHash { get; set; }

        [Required]
        public required string PasswordSalt { get; set; }
    }
}

