using System;

public class TreatmentRecord
{
    public DateTime Date { get; set; }
    public string Type { get; set; }
    public string Description { get; set; }

    public TreatmentRecord(DateTime date, string type, string description)
    {
        Date = date;
        Type = type;
        Description = description;
    }
    
    // Override ToString() if you want to format it in a specific way for debugging or quick display purposes
    public override string ToString()
    {
        return $"{Date.ToShortDateString()} - {Type}: {Description}";
    }
}
