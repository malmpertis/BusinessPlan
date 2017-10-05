using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace buzplan.ObjectClasses
{


    public class Rootobject
    {
        public Educationlevels educationLevels { get; set; }
        public Company company { get; set; }
        public DateTime createDate { get; set; }
        public Deadspot deadspot { get; set; }
        public Description description { get; set; }
        public string disclaimer { get; set; }
        public Expens[] expenses { get; set; }
        public int IncomeMinusExpenseFirst { get; set; }
        public int IncomeMinusExpenseSecond { get; set; }
        public int IncomeMinusExpenseThird { get; set; }
        public Income[] incomes { get; set; }
        public Kad[] kads { get; set; }
        public Marketing marketing { get; set; }
        public Owner owner { get; set; }
        public Partner[] partners { get; set; }
        public int profitFirstYear { get; set; }
        public int profitSecondYear { get; set; }
        public int profitThirdYear { get; set; }
        public int sumExpensesFirstYear { get; set; }
        public int sumExpensesSecondYear { get; set; }
        public int sumExpensesThirdYear { get; set; }
        public int sumIncomesFirstYear { get; set; }
        public int sumIncomesSecondYear { get; set; }
        public int sumIncomesThirdYear { get; set; }
        public float tax { get; set; }
        public Total[] totals { get; set; }
        public int[] xronia { get; set; }
        public int yearSelectedForTable { get; set; }
    }

    public class Educationlevels
    {
        public string yearEdLvl { get; set; }
        public Year[] years { get; set; }
    }

    public class Year
    {
        public int year { get; set; }
        public Yeardata[] yearData { get; set; }
    }

    public class Yeardata
    {
        public int employeesCount { get; set; }
        public string employeesEducation { get; set; }
        public string employeesSpecialization { get; set; }
    }

    public class Company
    {
        public string businessType { get; set; }
        public string District { get; set; }
        public string RegionalUnity { get; set; }
        public string Commune { get; set; }
        public string MunicipalDistrict { get; set; }
        public string logo { get; set; }
        public DateTime creationDate { get; set; }
        public string name { get; set; }
        public string title { get; set; }
        public string afm { get; set; }
        public string legalForm { get; set; }
        public string doy { get; set; }
        public string booksType { get; set; }
        public string size { get; set; }
        public int nuberOfCompletedYears { get; set; }
        public string activity { get; set; }
        public string Adress { get; set; }
        public string Location { get; set; }
        public string PostalCode { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Website { get; set; }
        public string Email { get; set; }
    }

    public class Deadspot
    {
        public int deadSpotMinimum { get; set; }
        public int salesNeeded { get; set; }
        public int ame { get; set; }
        public int avc { get; set; }
        public int afc { get; set; }
    }

    public class Description
    {
        public string manufacturingProcess { get; set; }
        public string basicInfo { get; set; }
        public string locationInfo { get; set; }
        public string shareholderInfo { get; set; }
        public string productsInfo { get; set; }
        public string targetsInfo { get; set; }
        public string competitionAnalysis { get; set; }
        public Swot swot { get; set; }
    }

    public class Swot
    {
        public string strengths { get; set; }
        public string weaknesses { get; set; }
        public string opportunities { get; set; }
        public string threats { get; set; }
    }

    public class Marketing
    {
        public string marketingPlanAnalysis { get; set; }
        public string positioningAnalysis { get; set; }
        public string promotionAnalysis { get; set; }
        public string investmentAnalysis { get; set; }
        public string innovationAnalysis { get; set; }
        public string greenAnalysis { get; set; }
        public string equipmentAnalysis { get; set; }
    }

    public class Owner
    {
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public string afm { get; set; }
        public string County { get; set; }
        public string Street { get; set; }
        public string StreetNumber { get; set; }
        public string Ciy { get; set; }
        public string PostalCode { get; set; }
        public string Phone { get; set; }
        public string MobilePhone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
    }

    public class Expens
    {
        public string category { get; set; }
        public string description { get; set; }
        public int expensesFirst { get; set; }
        public int expensesSecond { get; set; }
        public int expensesThird { get; set; }
    }

    public class Income
    {
        public int value { get; set; }
        public int predictionFirst { get; set; }
        public int predictionSecond { get; set; }
        public int predictionThird { get; set; }
        public int incomesFirstYear { get; set; }
        public int incomesSecondYear { get; set; }
        public int incomesThirdYear { get; set; }
        public string name { get; set; }
        public string description { get; set; }
    }

    public class Kad
    {
        public string title { get; set; }
        public string id { get; set; }
        public string isPrimary { get; set; }
        public DateTime date { get; set; }
    }

    public class Partner
    {
        public int percentage { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string isAbroad { get; set; }
        public string afmVat { get; set; }
        public string doy { get; set; }
        public string email { get; set; }
        public int dateOfEstablishment { get; set; }
        public string position { get; set; }
        public string isMemberOtherCompanies { get; set; }
        public Othercompany otherCompany { get; set; }
        public string afm { get; set; }
    }

    public class Othercompany
    {
        public string typeOfPerson { get; set; }
        public string percentage { get; set; }
        public string nameOrTitle { get; set; }
        public string Country { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string postalCode { get; set; }
        public string phone { get; set; }
        public string fax { get; set; }
        public string email { get; set; }
        public string partnersPosition { get; set; }
    }

    public class Total
    {
        public string title { get; set; }
        public float[] values { get; set; }
        public int hint { get; set; }
    }


}