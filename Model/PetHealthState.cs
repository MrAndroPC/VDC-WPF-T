using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

    class PetHealthState : Pet
    {
        private ObservableCollection<string> vaccinationRecords;
        private ObservableCollection<string> medicationHistory;
        private ObservableCollection<string> allergies;
        private ObservableCollection<string> surgicalInterventions;
        private ObservableCollection<string> lastVisit;

        
        public PetHealthState() : base(){
            VaccinationRecords = vaccinationRecords;
            MedicationHistory = medicationHistory;
            Allergies = allergies;
            SurgicalInterventions = surgicalInterventions;
            LastVisit = lastVisit;
        }
        public ObservableCollection<string> VaccinationRecords
        {
            get { return vaccinationRecords; }
            set
            {
                if (vaccinationRecords != value)
                {
                    vaccinationRecords = value;
                    OnPropertyChanged(nameof(VaccinationRecords));
                }
            }
        }

        public ObservableCollection<string> MedicationHistory
        {
            get { return medicationHistory; }
            set
            {
                if (medicationHistory != value)
                {
                    medicationHistory = value;
                    OnPropertyChanged(nameof(MedicationHistory));
                }
            }
        }

        public ObservableCollection<string> Allergies
        {
            get { return allergies; }
            set
            {
                if (allergies != value)
                {
                    allergies = value;
                    OnPropertyChanged(nameof(Allergies));
                }
            }
        }

        public ObservableCollection<string> SurgicalInterventions
        {
            get { return surgicalInterventions; }
            set
            {
                if (surgicalInterventions != value)
                {
                    surgicalInterventions = value;
                    OnPropertyChanged(nameof(SurgicalInterventions));
                }
            }
        }

        public ObservableCollection<string> LastVisit
        {
            get { return lastVisit; }
            set
            {
                if (lastVisit != value)
                {
                    lastVisit = value;
                    OnPropertyChanged(nameof(LastVisit));
                }
            }
        }

        
        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged(string propertyName)
        {

            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));

        }
    }

