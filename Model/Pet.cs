using System;
using System.ComponentModel;

public class Pet : INotifyPropertyChanged
{
    private int id;
    private string name;
    private string contacts;
    private string type;
    private string sex;
    private string age;
    private string breed;
    private string weight;
    private Uri picSource;
    private string history;
    private string healthState;
    private string diagnostic;
    private string treatmentPlan;
    private string num_mic;


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

    public string Age
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

    public string Weight
    {
        get { return weight; }
        set
        {
            if (weight != value)
            {
                weight = value;
                OnPropertyChanged(nameof(Weight));
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

    public string History
    {
        get { return history; }
        set {
            if (history != value)
            {
                history = value;
                OnPropertyChanged(nameof(History));
            }
        }
    }

    public string HealthState
    {
        get { return healthState; }
        set
        {
            if (healthState != value)
            {
                healthState = value;
                OnPropertyChanged(nameof(HealthState));
            }
        }
    }
    public string Diagnostic
    {
        get { return diagnostic; }
        set
        {
            if (diagnostic != value)
            {
                diagnostic = value;
                OnPropertyChanged(nameof(Diagnostic));
            }
        }
    }
    public string TreatmentPlan
    {
        get { return treatmentPlan; }
        set
        {
            if (treatmentPlan != value)
            {
                treatmentPlan = value;
                OnPropertyChanged(nameof(TreatmentPlan));
            }
        }
    }

    public string Num_mic
    {
        get { return num_mic; }
        set
        {
            if (num_mic != value)
            {
                num_mic = value;
                OnPropertyChanged(nameof(Num_mic));
            }
        }
    }

    public event PropertyChangedEventHandler PropertyChanged;

    protected virtual void OnPropertyChanged(string propertyName)
    {
      
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));

    }

}
