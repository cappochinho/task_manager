using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TaskManagementSystem.Models
{
    public class TaskItem
    {
        public Guid Id { get; set; }
        
        [Required]
        [JsonPropertyName("title")]
        public required string Title { get; set; }
        
        [JsonPropertyName("description")]
        public string? Description { get; set; }
        
        private DateTime _dueDate;
    
        [Required]
        [JsonPropertyName("dueDate")]
        public DateTime DueDate
        {
            get => _dueDate;
            set => _dueDate = value.Kind == DateTimeKind.Unspecified 
                ? DateTime.SpecifyKind(value, DateTimeKind.Utc)
                : value.ToUniversalTime();
        }
        
        [Required]
        [JsonPropertyName("status")]
        public required string Status { get; set; }
        
        [JsonIgnore]
        public Guid CreatedByUserId { get; set; }
    }
}