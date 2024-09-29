using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Collections.ObjectModel;

namespace VDC_WPF_T.Model
{
    public class Vet : INotifyPropertyChanged
    {
        private int id;
        private string name;
        private string surname;
        private string patronymic;
        private string email;
        private string phone;
        private string role;
        private string hospital;
        private Uri picSource;


        public int Id
        {
            get { return id; }
            set
            {
                if (id != value)
                {
                    id = value;
                    OnPropertyChanged(nameof(Id));
                }
            }
        }
        public string Name
        {
            get { return name; }
            set
            {
                if (name != value)
                {
                    name = value;
                    OnPropertyChanged(nameof(Name));
                }
            }
        }
        public string Surname
        {
            get { return surname; }
            set
            {
                if (surname != value)
                {
                    surname = value;
                    OnPropertyChanged(nameof(Surname));
                }
            }
        }
        public string Patronymic
        {
            get { return patronymic; }
            set
            {
                if (patronymic != value)
                {
                    patronymic = value;
                    OnPropertyChanged(nameof(Patronymic));
                }
            }
        }
        public string Email
        {
            get { return email; }
            set
            {
                if (email != value)
                {
                    email = value;
                    OnPropertyChanged(nameof(Email));
                }
            }
        }
        public string Phone
        {
            get { return phone; }
            set
            {
                if (phone != value)
                {
                    phone = value;
                    OnPropertyChanged(nameof(Phone));
                }
            }
        }

        public string Role
        {
            get { return role; }
            set
            {
                if (role!= value)
                {
                    role = value;
                    OnPropertyChanged(nameof(Role));
                }
            }
        }
        public string Hospital
        {
            get { return hospital; }
            set
            {
                if (hospital!= value)
                {
                    hospital = value;
                    OnPropertyChanged(nameof(Hospital));
                }
            }
        }

        public Uri PicSource
        {
            get { return picSource; }
            set
            {
                if (picSource != value)
                {
                    picSource = value;
                    OnPropertyChanged(nameof(PicSource));
                }
            }
        }


        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged(string propertyName)
        {

            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));

        }
    }
}
