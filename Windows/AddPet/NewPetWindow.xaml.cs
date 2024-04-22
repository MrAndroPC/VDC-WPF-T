using Microsoft.Win32;
using System;
using System.Collections.ObjectModel;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using VDC_WPF_T.Windows;


namespace VDC_WPF_T
{
    /// <summary>
    /// Логика взаимодействия для NewPetWindow.xaml
    /// </summary>
    public partial class NewPetWindow : Window
    {
        /*        private Uri _mediaUri;

                public Uri MediaUri
                {
                    get { return _mediaUri; }
                    set
                    {
                        _mediaUri = value;
                        OnPropertyChanged(nameof(MediaUri)); // Notify property change
                    }
                }

                public event PropertyChangedEventHandler PropertyChanged;

                protected virtual void OnPropertyChanged(string propertyName)
                {
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
                }
        */
        private Pet pet = new Pet();
        public NewPetWindow()
        {
            //            test_pet.PicSource = @"C:\Users\sared\Downloads\pepefrg-44.gif";
            DataContext = pet;
            InitializeComponent();
        }

        private void gif_MediaEnded(object sender, RoutedEventArgs e)
        {
            ((MediaElement)sender).Position = new TimeSpan(0, 0, 1);
            ((MediaElement)sender).Play();
        }



        private void Button_Click_1(object sender, RoutedEventArgs e)
        {

        }

        private void AddNewPet_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button)
            {

                MessageBox.Show(pet.Name + pet.Contacts + pet.Type + pet.Sex + pet.Age + pet.Breed + pet.Weight + pet.History + pet.HealthState + pet.Diagnostic + pet.TreatmentPlan + pet.Num_mic);
                Close();
            }
        }

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {

        }

        private void AddPic_MouseUp(object sender, MouseButtonEventArgs e)
        {
            OpenFileDialog openFile = new OpenFileDialog();
            openFile.Filter = "Изображения|*.jpg;*.jpeg;*.png;*.gif;*.bmp";
            if (openFile.ShowDialog() == true)
                pet.PicSource = new Uri(openFile.FileName, UriKind.Absolute);

        }

        private void Button_Click_3(object sender, RoutedEventArgs e)
        {
            EditPatientInfoWindow npw = new EditPatientInfoWindow(new ObservableCollection<string> { pet.Name, pet.Contacts, pet.Type, pet.Sex, pet.Age, pet.Breed, pet.Weight, pet.Num_mic } );
            npw.ShowDialog();
            if (npw.DialogResult == true)
            {


                ObservableCollection<string> resultData = npw.ResultData;
                pet.Name = resultData[0];
                pet.Contacts = resultData[1];
                pet.Type = resultData[2];
                pet.Sex = resultData[3];
                pet.Age = resultData[4];
                pet.Breed = resultData[5];
                pet.Weight = resultData[6];
                pet.Num_mic = resultData[7];
            }
        }

        private void EditHistory_Click(object sender, RoutedEventArgs e)
        {
            TextBoxForEditInfo npw = new TextBoxForEditInfo("История здоровья", pet.History);
            npw.ShowDialog();
            if (npw.DialogResult == true)
            {

                string resultData = npw.ResultData;
                pet.History = resultData;
            }
        }

        private void EditHealthState_Click(object sender, RoutedEventArgs e)
        {
            TextBoxForEditInfo npw = new TextBoxForEditInfo("Текущее состояние здоровья", pet.HealthState);
            npw.ShowDialog();
            if (npw.DialogResult == true)
            {

                string resultData = npw.ResultData;
                pet.HealthState = resultData;
            }
        }

        private void EditDiagnostic_Click(object sender, RoutedEventArgs e)
        {
            TextBoxForEditInfo npw = new TextBoxForEditInfo("Диагностические данные", pet.Diagnostic);
            npw.ShowDialog();
            if (npw.DialogResult == true)
            {

                string resultData = npw.ResultData;
                pet.Diagnostic = resultData;
            }
        }

        private void EditTreatmentPlan_Click(object sender, RoutedEventArgs e)
        {
            TextBoxForEditInfo npw = new TextBoxForEditInfo("План лечения", pet.TreatmentPlan);
            npw.ShowDialog();
            if (npw.DialogResult == true)
            {

                string resultData = npw.ResultData;
                pet.TreatmentPlan = resultData;
   

    }
        }
    }
}
