using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleReactWithBackend.Data;
using PeopleReactWithBackend.Web.Models;

namespace PeopleReactWithBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("conStr");
        }

        [Route("getAll")]
        public List<Person> GetAll()
        {
            return new PeopleRepository(_connectionString).GetAll();
        }

        [Route("getPerson")]
        public Person GetPerson(int id)
        {
            return new PeopleRepository(_connectionString).GetPerson(id);
        }

        [Route("add")]
        [HttpPost]
        public void Insert(Person person)
        {
            new PeopleRepository(_connectionString).Insert(person);
        }

        [Route("update")]
        [HttpPost]
        public void Update(PersonModel personModel)
        {
            new PeopleRepository(_connectionString).Update(personModel.Person);
        }

        [Route("delete")]
        [HttpPost]
        public void Delete(PersonIdModel idModel)
        {
            new PeopleRepository(_connectionString).Delete(idModel.Id);
        }

        [Route("deletemany")]
        [HttpPost]
        public void Delete(PersonIdsModel idsModel)
        {
            new PeopleRepository(_connectionString).Delete(idsModel.Ids);
        }
    }
}
