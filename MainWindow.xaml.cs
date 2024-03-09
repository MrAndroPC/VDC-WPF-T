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
            new Pet { Id = 1, Name = "Я на паре", Contacts = "123-456-7890", Type = "Cat", Sex = "Male", Age = 3, Breed = "X3", PicSource = new Uri("https://m.media-amazon.com/images/I/512UWQf8s9L._AC_UF1000,1000_QL80_.jpg") },
            new Pet { Id = 2, Name = "Чипи чипи чапа чапа", Contacts = "123-456-7890", Type = "Cat", Sex = "Male", Age = 3, Breed = "X3", PicSource = new Uri("https://media.mymemevideos.com/2023/12/Chipi-chipi-chapa-chapa-cat.mp4")},
            new Pet { Id = 3, Name = "А???", Contacts = "123-456-7890", Type = "Cat", Sex = "Male", Age = 3, Breed = "X3", PicSource = new Uri("https://media.mymemevideos.com/2023/10/7289868698381290754-6540a9d3d8f22.mp4") },
            new Pet { Id = 4, Name = "Я, когда преподу не передали автоматы", Contacts = "456-789-0123", Type = "Cat", Sex = "Male", Age = 5, Breed = "Siamese", PicSource = new Uri("https://media.mymemevideos.com/2023/12/Dramatic-Kitten-Meme-Template-Screaming-Cat-Meme.mp4") },
            new Pet { Id = 5, Name = "Bob", Contacts = "123-456-7890", Type = "Dog", Sex = "Male", Age = 3, Breed = "Labrador", PicSource = new Uri(@"C:\Users\sared\Downloads\pepefrg-44.gif\") },
            new Pet { Id = 6, Name = "Bob", Contacts = "123-456-7890", Type = "Dog", Sex = "Male", Age = 3, Breed = "Labrador", PicSource = new Uri(@"C:\Users\sared\Downloads\pepefrg-44.gif\") },
            new Pet { Id = 7, Name = "Jim", Contacts = "456-789-0123", Type = "Cat", Sex = "Male", Age = 5, Breed = "Siamese", PicSource = new Uri(@"C:\Users\sared\Downloads\pepefrg-44.gif\") },
            new Pet { Id = 8, Name = "Bob", Contacts = "123-456-7890", Type = "Dog", Sex = "Male", Age = 3, Breed = "Labrador", PicSource = new Uri(@"C:\Users\sared\Downloads\pepefrg-44.gif\") },
            new Pet { Id = 9, Name = "Bob", Contacts = "123-456-7890", Type = "Dog", Sex = "Male", Age = 3, Breed = "Labrador", PicSource = new Uri(@"C:\Users\sared\Downloads\pepefrg-44.gif\") },
            new Pet { Id = 11, Name = "Jim", Contacts = "456-789-0123", Type = "Cat", Sex = "Male", Age = 5, Breed = "Siamese", PicSource = new Uri(@"C:\Users\sared\Downloads\pepefrg-44.gif\") },
        };

            // Set the ItemsSource of the ListBox to the Pets collection
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
