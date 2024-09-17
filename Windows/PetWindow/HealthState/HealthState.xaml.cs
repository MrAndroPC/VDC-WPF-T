using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Shapes;
using System.Xml.Linq;
using VDC_WPF_T.Utilities;
using VDC_WPF_T.Windows.PetWindow.Diagnostic;
using VDC_WPF_T.Model;

namespace VDC_WPF_T.Windows.PetWindow.HealthState
{
    /// <summary>
    /// Логика взаимодействия для HealthState.xaml
    /// </summary>
    public partial class HealthState : Window
    {
        public Pet _pet { get; set; } = new Pet();

        PetHealthState _petHealthState { get; set; }  = new PetHealthState();

        ObservableCollection<string> _vaccinationRecords = new ObservableCollection<string> { "Прививка от паразитов №1: 21.09.21", "Прививка от паразитов №2: 21.09.22" };
        ObservableCollection<string> _medicationHistory = new ObservableCollection<string> { "Лекарство №1:  Пилюли общего действия", "Период с 21.09.21 по 25.09.211"};
        ObservableCollection<string> _surgicalInterventions = new ObservableCollection<string> {"Хирургические вмешательства: отсутсвуют" };
        ObservableCollection<string> _allergies = new ObservableCollection<string> {  "Аллергии: не выявлены"};
        ObservableCollection<string> _lastVisit = new ObservableCollection<string> { "Последний прием 21.21.21"};
        
        
        public HealthState(Pet pet)
        {
            InitializeComponent();
            _pet = pet;
            _petHealthState = new PetHealthState
            {
                Id = _pet.Id,
                Name = _pet.Name,
                Contacts = _pet.Contacts,
                Type = _pet.Type,
                Sex = _pet.Sex,
                Age = _pet.Age,
                Breed = _pet.Breed,
                Weight = _pet.Weight,
                PicSource = _pet.PicSource,
                History = _pet.History,
                HealthState = _pet.HealthState,
                Diagnostic = _pet.Diagnostic,
                TreatmentPlan = _pet.TreatmentPlan,
                Num_mic = _pet.Num_mic,
                VaccinationRecords = _vaccinationRecords,
                MedicationHistory = _medicationHistory,
                Allergies = _allergies,
                SurgicalInterventions = _surgicalInterventions,
                LastVisit = _lastVisit
            };

            this.DataContext = _petHealthState;
        }
        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
         
        }
        private void VaccinationRecordsEditClick(object sender, RoutedEventArgs e)
        {
            StringConverter converter = new StringConverter();
            string result = converter.ConvertToString(_petHealthState.VaccinationRecords);
            TextBoxForEditInfo npw = new TextBoxForEditInfo("История здоровья", result);
            npw.ShowDialog();
            if (npw.DialogResult == true)
            {

                string resultData = npw.ResultData;
                _petHealthState.VaccinationRecords = converter.ConvertToObservableCollection(resultData);
            }
        }
        private async void CopyToClipboard(object sender, RoutedEventArgs e)
        {
            var hyperlink = sender as Hyperlink;
            if (hyperlink != null)
            {
                var email = hyperlink.Inlines.FirstInline as Run;
                if (email != null)
                {
                    Clipboard.SetText(email.Text);
                    popup.IsOpen = true;
                    await Task.Delay(2000); 
                    popup.IsOpen = false;
                }
            }
        }
    }
}
