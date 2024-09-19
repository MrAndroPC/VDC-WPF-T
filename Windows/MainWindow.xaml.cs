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
using System.Windows.Navigation;
using System.Windows.Shapes;
using VDC_WPF_T.Utilities;
using VDC_WPF_T.Windows;


namespace VDC_WPF_T
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    /// 


    public partial class MainWindow : Window
    {

        internal ObservableCollection<Pet> Pets { get; set; }

        internal ObservableCollection<Pet> FilteredPets {  get; set; }


        public MainWindow()
        {
            DataContext = this;
            InitializeComponent();

            

            Pets = new ObservableCollection<Pet>
        {
            new Pet { Id = 1, Name = "Я на паре", Contacts = "123-456-7890", Type = "Cat", Sex = "Male", Age = "3", Breed = "X3", PicSource = new Uri("https://cataas.com/cat") },
            new Pet { Id = 2, Name = "Чипи чипи чапа чапа", Contacts = "123-456-7890", Type = "Cat", Sex = "Male", Age = "3", Breed = "X3", PicSource = new Uri("https://cataas.com/cat?type=square")},
            new Pet { Id = 3, Name = "А???", Contacts = "123-456-7890", Type = "Cat", Sex = "Male", Age = "3", Breed = "X3", PicSource = new Uri("https://cataas.com/cat") },
            new Pet { Id = 4, Name = "Я, когда преподу не передали автоматы", Contacts = "456-789-0123", Type = "Cat", Sex = "Male", Age = "5", Breed = "Siamese", PicSource = new Uri("https://cataas.com/cat?type=square") },
            new Pet { Id = 5, Name = "Bob", Contacts = "123-456-7890", Type = "Dog", Sex = "Male", Age = "3", Breed = "Labrador", Weight="20кг", PicSource = new Uri("https://cataas.com/cat"), History = "history", Diagnostic = "diag", HealthState = "health", TreatmentPlan = "rmkler", Num_mic="1" },
            new Pet { Id = 6, Name = "Bob", Contacts = "123-456-7890", Type = "Dog", Sex = "Male", Age = "3", Breed = "Labrador", Weight="20кг", PicSource = new Uri("https://cataas.com/cat?type=square"), History = "history", Diagnostic = "diag", HealthState = "health", TreatmentPlan = "rmkler", Num_mic="1" },
            new Pet { Id = 7, Name = "Jim", Contacts = "456-789-0123", Type = "Cat", Sex = "Male", Age = "5", Breed = "Siamese", Weight="20кг", PicSource = new Uri("https://cataas.com/cat"), History = "history", Diagnostic = "diag", HealthState = "health", TreatmentPlan = "rmkler", Num_mic="1" },
            new Pet { Id = 8, Name = "Bob", Contacts = "123-456-7890", Type = "Dog", Sex = "Male", Age = "3", Breed = "Labrador", Weight="20кг", PicSource = new Uri("https://cataas.com/cat?type=square"), History = "history", Diagnostic = "diag", HealthState = "health", TreatmentPlan = "rmkler", Num_mic="1" },
            new Pet {Id = 9, Name = "Bob", Contacts = "123-456-7890", Type = "Dog", Sex = "Male", Age = "3", Breed = "Labrador", Weight="20кг", PicSource = new Uri("https://cataas.com/cat"), History = "history", Diagnostic = "diag", HealthState = "health", TreatmentPlan = "rmkler", Num_mic="1"},
            new Pet { Id = 11, Name = "Jim", Contacts = "456-789-0123", Type = "Cat", Sex = "Male", Age = "5", Breed = "Siamese", Weight="20кг", PicSource = new Uri("https://cataas.com/cat?type=square"), History = "history", Diagnostic = "diag", HealthState = "health", TreatmentPlan = "rmkler", Num_mic="1" },
        };

            // Set the ItemsSource of the ListBox to the Pets collection
           

            LocalStorage.SaveAll(Pets.ToList());
            Pets.Clear();
            Pets = new ObservableCollection<Pet>(LocalStorage.LoadAll());

            TestList.ItemsSource = Pets;

        }
        private void gif_MediaEnded(object sender, RoutedEventArgs e)
        {
            ((MediaElement)sender).Position = new TimeSpan(0, 0, 1);
            ((MediaElement)sender).Play();
        }



        private void SearchPet_Click(object sender, RoutedEventArgs e)
        {
            string searching = SearchTermTextBox.Text;
            TestList.ItemsSource = FilterPets(searching);

        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            if (sender is Button button && button.DataContext is Pet pet)
            {
                PetWindow pw = new PetWindow(pet);
                pw.ShowDialog();
            }

            /*            if (sender is Button)
                        {
                            var id = ((Button)sender).Tag;
                            PetWindow pw = new PetWindow();
                            pw.ShowDialog();
                        }
            */
        }

        private void AddNewPet_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button)
            {

                NewPetWindow npw = new NewPetWindow();
                npw.ShowDialog();
            }
        }

        private ObservableCollection<Pet> FilterPets(string SearchTerm)
        {
            if (SearchTerm == "Введите имя пациента")
            {
                FilteredPets = Pets;
                return FilteredPets;
            }
            else
            {
                string searchTermLower = SearchTerm.ToLower();
                FilteredPets = new ObservableCollection<Pet>(Pets.Where(p => p.Name.ToLower().Contains(searchTermLower)));
                return FilteredPets;
            }
            
        }
    }

}
