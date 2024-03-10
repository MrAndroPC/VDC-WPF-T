using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Shapes;

namespace VDC_WPF_T
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private static string filePath = $"{System.IO.Path.GetTempPath()}\\VDC\\pets.json";
        protected override void OnStartup(StartupEventArgs e)
        {
            if (!File.Exists(filePath))
            {
                Directory.CreateDirectory(System.IO.Path.GetDirectoryName(filePath));
                //File.Create(filePath).Close();
            }
            base.OnStartup(e);
        }
    }
}
