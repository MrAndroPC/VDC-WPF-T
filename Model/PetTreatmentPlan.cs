using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

    public class PetTreatmentPlan : Pet, INotifyPropertyChanged
{
    private ObservableCollection<TreatmentRecord> treatmentRecords = new ObservableCollection<TreatmentRecord>();
        public ObservableCollection<TreatmentRecord> TreatmentRecords
        {
            get { return treatmentRecords; }
            set
            {
                if (treatmentRecords != value)
                {
                    treatmentRecords = value;
                    OnPropertyChanged(nameof(TreatmentRecords));
                }
            }
        }



        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged(string propertyName)
        {

            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));

        }
    }