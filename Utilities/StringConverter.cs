using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VDC_WPF_T.Utilities
{
    class StringConverter
    {
        public string ConvertToString(ObservableCollection<string> collection)
        {
            return string.Join("\n", collection); // Конвертируем ObservableCollection в строку с новыми строками
        }

        public ObservableCollection<string> ConvertToObservableCollection(string input)
        {
            string[] lines = input.Split(new[] { "\n", "\r\n" }, StringSplitOptions.None); // Разбиваем входную строку на массив строк
            ObservableCollection<string> collection = new ObservableCollection<string>(lines); // Создаем ObservableCollection из массива строк
            return collection;
        }
    }
}
