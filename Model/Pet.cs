using System;
using System.ComponentModel;

public class Pet : INotifyPropertyChanged
{
    private int id;
    private string name;
    private string contacts;
    private string type;
    private string sex;
    private int age;
    private string breed;
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

    public string Contacts
    {
        get { return contacts; }
        set
        {
            if (contacts != value)
            {
                contacts = value;
                OnPropertyChanged(nameof(Contacts));
            }
        }
    }

    public string Type
    {
        get { return type; }
        set
        {
            if (type != value)
            {
                type = value;
                OnPropertyChanged(nameof(Type));
            }
        }
    }

    public string Sex
    {
        get { return sex; }
        set
        {
            if (sex != value)
            {
                sex = value;
                OnPropertyChanged(nameof(Sex));
            }
        }
    }

    public int Age
    {
        get { return age; }
        set
        {
            if (age != value)
            {
                age = value;
                OnPropertyChanged(nameof(Age));
            }
        }
    }

    public string Breed
    {
        get { return breed; }
        set
        {
            if (breed != value)
            {
                breed = value;
                OnPropertyChanged(nameof(Breed));
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
