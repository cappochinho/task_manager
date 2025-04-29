using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using TaskManagementSystem.Models;
using TaskManagementSystem.Data;
using System.Security.Claims;

namespace TaskManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TaskItemsController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        private Guid GetUserId()
        {
            var userIdString = (User.FindFirst(ClaimTypes.NameIdentifier)?.Value) ?? throw new UnauthorizedAccessException("User ID not found in token.");
            return Guid.Parse(userIdString);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTaskItems()
        {
            var userId = GetUserId();
            var tasks = await _context.TaskItems
                .Where(t => t.CreatedByUserId == userId)
                .ToListAsync();

            return tasks;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTaskItem(Guid id)
        {
            var userId = GetUserId();
            var taskItem = await _context.TaskItems
                .FirstOrDefaultAsync(t => t.Id == id && t.CreatedByUserId == userId);

            if (taskItem == null)
                return NotFound();

            return taskItem;
        }

        [HttpPost]
        public async Task<ActionResult<TaskItem>> PostTaskItem(TaskItem taskItem)
        {
            var userId = GetUserId();

            taskItem.Id = Guid.NewGuid();
            taskItem.CreatedByUserId = userId;

            _context.TaskItems.Add(taskItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTaskItem), new { id = taskItem.Id }, taskItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskItem(Guid id, TaskItem taskItem)
        {
            var userId = GetUserId();

            if (id != taskItem.Id)
                return BadRequest();

            var existingTask = await _context.TaskItems
                .FirstOrDefaultAsync(t => t.Id == id && t.CreatedByUserId == userId);

            if (existingTask == null)
                return NotFound();

            existingTask.Title = taskItem.Title;
            existingTask.Description = taskItem.Description;
            existingTask.DueDate = taskItem.DueDate;
            existingTask.Status = taskItem.Status;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskItem(Guid id)
        {
            var userId = GetUserId();

            var taskItem = await _context.TaskItems
                .FirstOrDefaultAsync(t => t.Id == id && t.CreatedByUserId == userId);

            if (taskItem == null)
                return NotFound();

            _context.TaskItems.Remove(taskItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
