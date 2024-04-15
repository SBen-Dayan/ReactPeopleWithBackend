using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeopleReactWithBackend.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }

        public Person GetPerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }

        public void Insert(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void Update(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Entry(person).State = EntityState.Modified;
            context.SaveChanges();
        }

        public void Delete(int personId)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {personId}");
        }

        public void Delete(List<int> personIds)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.RemoveRange(personIds.Select(id => new Person { Id = id }));
            context.SaveChanges();
            //context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id IN {Values(personIds)}");
        }

        //private string Values(List<int> values)
        //{
        //    string result = "(";
        //    for (int i = 0; i < values.Count; i++)
        //    {
        //        result += values[i];
        //        if (i < values.Count - 1)
        //        {
        //            result += ", ";
        //        }
        //    }
        //    return result + ")";
        //}
    }
}
