using Microsoft.AspNetCore.Mvc;
using Services;

namespace frontend.Controllers
{
  [Route("api/storage")]
  public class StorageController : Controller
  {
    private readonly IStorageService RegistrationService;
    public StorageController(IStorageService registrationService)
    {
      RegistrationService = registrationService;
    }

    [HttpPost]
    public IActionResult Register([FromBody] Person person)
    {
      RegistrationService.Register(person);
      return Ok();
    }

    [HttpGet("all")]
    public IActionResult GetAll()
    {
      var people = RegistrationService.GetAll();
      return Ok(people);
    }

    [HttpDelete]
    public IActionResult Delete([FromQuery] Guid id)
    {
      RegistrationService.Delete(id);
      return Ok();
    }
  }
}