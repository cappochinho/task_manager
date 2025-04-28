using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Models
{
    public class TaskItem
    {
        public Guid Id { get; set; }
        
        [Required]
        public required string Title { get; set; }
        
        public string? Description { get; set; }
        
        [Required]
        public required DateTime DueDate { get; set; }
        
        [Required]
        public required string Status { get; set; }
        
        [Required]
        public required Guid CreatedByUserId { get; set; }
        
        public User? CreatedByUser { get; set; }
    }
}
