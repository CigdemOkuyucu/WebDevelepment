using System.Text.Json;
using System.IO;

namespace Services
{
  public interface IStorageService
  {
    void Register(Person person);
    IEnumerable<StoragePerson> GetAll();
    
    //To delete the persons
    void Delete(Guid id);
  }
  public class Person
  {
    public string Name { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
  }

//ADDED A CLASS FOR THE STORAGE
  public class StorageAddress
  {
    public Guid Id { get; set; }
    public string City { get; set; }
    public string Street { get; set; }
    public int HouseNumber { get; set; }
  }

  public class StoragePerson  : Person
  {
    public Guid Id { get; set; }
    //ADDED
    public StorageAddress[] Addresses { get; set; }
  }
  public class StorageService : IStorageService
  {
    private const string storagePath = "./storage";
    public StorageService()
    {

    }

    public void Register(Person person)
    {
      var r = new Random();
      var newPerson = new StoragePerson
      {
        Id = Guid.NewGuid(),
        Age = person.Age,
        LastName = person.LastName,
        Name = person.Name,
        //ADDED
        Addresses = new StorageAddress [] { }
      };
      var serializedPerson = JsonSerializer.Serialize(newPerson);
      if (!Directory.Exists(storagePath))
      {
        Directory.CreateDirectory(storagePath);
      }
      File.WriteAllText($"{storagePath}/person-{newPerson.Id}.json", serializedPerson);
    }

    public IEnumerable<StoragePerson> GetAll()
    {
      var people = new List<StoragePerson>();
      if (Directory.Exists(storagePath))
      {
        var files = Directory.EnumerateFiles(storagePath);
        foreach (var file in files)
        {
          var serializedPerson = File.ReadAllText(file);
          var person = JsonSerializer.Deserialize<StoragePerson>(serializedPerson);
          if (person != null)
            people.Add(person);
        }
      }
      return 
        people
        .ToArray();
    }

    public void Delete(Guid id)
    {
      if (Directory.Exists(storagePath))
      {
        var record = 
          Directory.EnumerateFiles(storagePath).FirstOrDefault(file => file.Contains(id.ToString()));
        if (record != null)
        {
          File.Delete(record);
        }
      }
    }
  }
}