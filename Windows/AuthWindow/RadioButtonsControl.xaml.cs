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

namespace VDC_WPF_T.Windows.AuthWindow
{
    /// <summary>
    /// Логика взаимодействия для UserControl1.xaml
    /// </summary>
    public partial class RadioButtonsControl : UserControl
    {
        public RadioButtonsControl()
        {
            InitializeComponent();
            RadioButtons = new ObservableCollection<CustomRadioButton>();
            DataContext = this;
        }

        public static readonly DependencyProperty RadioButtonsProperty =
            DependencyProperty.Register("RadioButtons", typeof(ObservableCollection<CustomRadioButton>), typeof(RadioButtonsControl), new PropertyMetadata(new ObservableCollection<CustomRadioButton>()));

        public ObservableCollection<CustomRadioButton> RadioButtons
        {
            get { return (ObservableCollection<CustomRadioButton>)GetValue(RadioButtonsProperty); }
            set { SetValue(RadioButtonsProperty, value); }
        }

        public static readonly DependencyProperty SelectedOutputProperty =
            DependencyProperty.Register("SelectedOutput", typeof(object), typeof(RadioButtonsControl), new PropertyMetadata(null));

        public object SelectedOutput
        {
            get { return GetValue(SelectedOutputProperty); }
            set { SetValue(SelectedOutputProperty, value); }
        }
    }
}