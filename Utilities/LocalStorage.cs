using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace VDC_WPF_T.Utilities
{
    

    public static class LocalStorage
    {
        private static string filePath = $"{Path.GetTempPath()}\\VDC\\pets.json"; 

        public static void Save(Pet pet)
        {
            List<Pet> pets = LoadAll() ?? new List<Pet>();
            pets.Add(pet);

            var json = JsonConvert.SerializeObject(pets, Formatting.Indented);
            File.WriteAllText(filePath, json);
        }

        public static void SaveAll(List<Pet> pets)
        {
            var json = JsonConvert.SerializeObject(pets, Formatting.Indented);
            File.WriteAllText(filePath, json);
        }

        public static Pet Load(int id)
        {
            List<Pet> pets = LoadAll();

            return pets?.FirstOrDefault(p => p.Id == id);
        }

        public static List<Pet> LoadAll()
        {
            if (!File.Exists(filePath)) return new List<Pet>(); 

            var json = File.ReadAllText(filePath);
            return JsonConvert.DeserializeObject<List<Pet>>(json);
        }


        public static void Update(Pet updatedPet)
        {
            List<Pet> pets = LoadAll();

            var petIndex = pets.FindIndex(p => p.Id == updatedPet.Id);
            if (petIndex != -1)
            {
                pets[petIndex] = updatedPet;

                var json = JsonConvert.SerializeObject(pets, Formatting.Indented);
                File.WriteAllText(filePath, json);
            }
        }


        public static void Delete(int id)
        {
            List<Pet> pets = LoadAll();

            var pet = pets.FirstOrDefault(p => p.Id == id);
            if (pet != null)
            {
                pets.Remove(pet);

                var json = JsonConvert.SerializeObject(pets, Formatting.Indented);
                File.WriteAllText(filePath, json);
            }
        }
    }

}
