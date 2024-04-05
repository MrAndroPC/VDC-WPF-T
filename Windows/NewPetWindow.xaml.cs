using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.ComponentModel;
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
using System.Windows.Shapes;
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
        private Pet pet = new Pet() 
        { 
            PicSource = new Uri(@"C:\Users\sared\Downloads\Ellipse 1.png", UriKind.Absolute)
        };
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


        private void Button_Click()
        {

        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {

        }

        private void AddNewPet_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button)
            {
                NewPetWindow npw = new NewPetWindow();
                npw.ShowDialog();
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
            EditPatientInfoWindow editWindow = new EditPatientInfoWindow(); 
            editWindow.Show();
        }

        private void EditHistory_Click(object sender, RoutedEventArgs e)
        {
            TextBoxForEditInfo npw = new TextBoxForEditInfo();
            npw.EditHeader("История здоровья");
            npw.ShowDialog();
        }

        private void EditHealthState_Click(object sender, RoutedEventArgs e)
        {
            TextBoxForEditInfo npw = new TextBoxForEditInfo();
            npw.EditHeader("Текущее состояние здоровья");
            npw.ShowDialog();
        }
    }
}
