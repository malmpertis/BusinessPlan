using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.DataVisualization.Charting;

namespace buzplan.ObjectClasses
{


    public class Plan
    {
        public Educationlevels educationLevels { get; set; }
        public Company company { get; set; }
        public DateTime createDate { get; set; }
        public Deadspot deadspot { get; set; }
        public Description description { get; set; }
        public string disclaimer { get; set; }
        public Expens[] expenses { get; set; }
        public double IncomeMinusExpenseFirst { get; set; }
        public double IncomeMinusExpenseSecond { get; set; }
        public double IncomeMinusExpenseThird { get; set; }
        public Income[] incomes { get; set; }
        public Kad[] kads { get; set; }
        public Marketing marketing { get; set; }
        public ElevatorPitch elevatorPitch { get; set; }
        public Owner owner { get; set; }
        public Partner[] partners { get; set; }
        public double profitFirstYear { get; set; }
        public double profitSecondYear { get; set; }
        public double profitThirdYear { get; set; }
        public double sumExpensesFirstYear { get; set; }
        public double sumExpensesSecondYear { get; set; }
        public double sumExpensesThirdYear { get; set; }
        public double sumIncomesFirstYear { get; set; }
        public double sumIncomesSecondYear { get; set; }
        public double sumIncomesThirdYear { get; set; }
        public float tax { get; set; }
        public Total[] totals { get; set; }
        public double[] xronia { get; set; }
        public double yearSelectedForTable { get; set; }
        public string CompanyIsMemberOfOtherCompanies { get; set; }
        public Companyothercompany CompanyotherCompany { get; set; }






        //public static Plan GetPlan(string UserId, buzplan.Models.businessPlanEntities db)
        //{
        //    var q = db.PlanItems.Where(c => c.UserId == UserId).ToList().Select(c => "\"" + c.Item + "\":" + c.Data).ToList();
        //    var met = "{" + string.Join(",", q) + "}";
        //    return Newtonsoft.Json.JsonConvert.DeserializeObject<Plan>(met);
        //}
        public static Plan GetPlan(string UserId, buzplan.Models.businessPlanEntities db)
        {
            //string[] fields =
            //{
            //    "educationLevels",
            //    "company",
            //    "createDate",
            //    "deadspot",
            //    "description",
            //    "disclaimer",
            //    "expenses",
            //    "IncomeMinusExpenseFirst",
            //    "IncomeMinusExpenseSecond",
            //    "IncomeMinusExpenseThird",
            //    "incomes",
            //    "kads",
            //    "marketing",
            //    "owner",
            //    "partners",
            //    "profitFirstYear",
            //    "profitSecondYear",
            //    "profitThirdYear",
            //    "sumExpensesFirstYear",
            //    "sumExpensesSecondYear",
            //    "sumExpensesThirdYear",
            //    "sumIncomesFirstYear",
            //    "sumIncomesSecondYear",
            //    "sumIncomesThirdYear",
            //    "tax",
            //    "totals",
            //    "xronia",
            //    "yearSelectedForTable"
            //};
            var q2 = db.PlanItems.Where(c => c.UserId == UserId).ToList();
            var q4 = q2.SingleOrDefault(c => c.Item == "company");
            string[] required = { };
            if (q4 != null)
            {
                var q5 = Newtonsoft.Json.JsonConvert.DeserializeObject<Company>(q4.Data);
                if (q5.businessType == "Υφιστάμενη Επιχείρηση")
                {
                    required = new string[]
                        {
                            "educationLevels",
                            "company",
                            "createDate",
                            "description",
                            "disclaimer",
                            "expenses",
                            "IncomeMinusExpenseFirst",
                            "IncomeMinusExpenseSecond",
                            "IncomeMinusExpenseThird",
                            "incomes",
                            "kads",
                            "marketing",
                            "owner",
                            "partners",
                            "profitFirstYear",
                            "profitSecondYear",
                            "profitThirdYear",
                            "sumExpensesFirstYear",
                            "sumExpensesSecondYear",
                            "sumExpensesThirdYear",
                            "sumIncomesFirstYear",
                            "sumIncomesSecondYear",
                            "sumIncomesThirdYear",
                            "tax",
                            "totals",
                            "xronia",
                            "yearSelectedForTable",
                            "elevatorpitch"
                        };
                }
                else if (q5.businessType == "Επιχείρηση Υπό Σύσταση")
                {
                    required = new string[]
                        {
                            "company",
                            "description",
                            "disclaimer",
                            "kads",
                            "marketing",
                            "owner",
                            "partners",
                            "elevatorpitch"
                        };
                }
            }
            var q3 = q2.Select(c => c.Item).ToList();
            if (required.All(c => q3.Contains(c)))
            {
                var q = q2.Select(c => "\"" + c.Item + "\":" + c.Data).ToList();
                var met = "{" + string.Join(",", q) + "}";
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Plan>(met);
            }
            return null;
        }
    }

    public class Educationlevels
    {
        public string yearEdLvl { get; set; }
        public Year[] years { get; set; }
    }

    public class Year
    {
        public double year { get; set; }
        public Yeardata[] yearData { get; set; }
    }

    public class Yeardata
    {
        public double employeesCount { get; set; }
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
        public double nuberOfCompletedYears { get; set; }
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
        public float deadSpotMinimum { get; set; }
        public float salesNeeded { get; set; }
        public float ame { get; set; }
        public float avc { get; set; }
        public float afc { get; set; }
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

    public class ElevatorPitch
    {
        public string target { get; set; }
        public string sale { get; set; }
        public string saletarget { get; set; }
        public string sumeconomics { get; set; }
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
        public double expensesFirst { get; set; }
        public double expensesSecond { get; set; }
        public double expensesThird { get; set; }
        public string description_other { get; set; }
    }

    public class Income
    {
        public double value { get; set; }
        public double predictionFirst { get; set; }
        public double predictionSecond { get; set; }
        public double predictionThird { get; set; }
        public double incomesFirstYear { get; set; }
        public double incomesSecondYear { get; set; }
        public double incomesThirdYear { get; set; }
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
        public double percentage { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string isAbroad { get; set; }
        public string afmVat { get; set; }
        public string doy { get; set; }
        public string email { get; set; }
        public double dateOfEstablishment { get; set; }
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

    public class Companyothercompany
    {
        public string percentage { get; set; }
        public string nameOrTitle { get; set; }
        public string typeOfPerson { get; set; }
        public string Country { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string postalCode { get; set; }
        public string phone { get; set; }
        public string fax { get; set; }
        public string email { get; set; }
    }


    public class Total
    {
        public string title { get; set; }
        public float[] values { get; set; }
        public double hdouble { get; set; }
    }


}