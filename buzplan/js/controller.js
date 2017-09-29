(function () {
    'use strict';

    angular
        .module('app', ['chart.js','ngMaterial'])
        .controller('controller', ['$location','$scope','$http', controller]);


    function controller($location, $scope, $http) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'controller';
        vm.data = {};
        vm.doy = ["Α ΠΕΙΡΑΙΑ", "Β ΠΕΙΡΑΙΑ", "Γ ΠΕΙΡΑΙΑ"]
        vm.companySize = ["Πολύ Μικρή", "Μικρή", "Μεσαία", "Μεγάλη"]
        vm.businessTypes = ["Επιχείρηση Υπό Σύσταση", "Υφιστάμενη Επιχείρηση"];
        vm.legalForms = ["Ατομική", "ΙΚΕ", "Ο.Ε.", "Ε.Ε.", "Α.Ε.", "ΕΠΕ", "Μη Κερδοσκοπική Επιχείρηση", "Κοινωνική Επιχείρηση", "Συνεταιρισμός", "Άλλο"];
        vm.contents = ["ΓΕΝΙΚΑ ΣΤΟΙΧΕΙΑ ΕΠΙΧΕΙΡΗΣΗΣ", "ΣΤΟΙΧΕΙΑ ΤΑΥΤΟΤΗΤΑΣ ΕΠΙΧΕΙΡΗΣΗΣ", "ΣΤΟΙΧΕΙΑ ΝΟΜΙΜΟΥ ΕΚΠΡΟΣΩΠΟΥ – ΣΤΟΙΧΕΙΑ ΔΥΝΗΤΙΚΟΥ ΕΠΙΧΕΙΡΗΜΑΤΙΑ", "ΚΩΔΙΚΟΙ ΑΡΙΘΜΟΙ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ (Κ.Α.Δ.) ΤΗΣ ΕΠΙΧΕΙΡΗΣΗΣ", "ΚΩΔΙΚΟΙ ΑΡΙΘΜΟΙ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ (Κ.Α.Δ.) ΤΗΣ ΥΠΟ ΣΥΣΤΑΣΗ ΕΠΙΧΕΙΡΗΣΗ", "ΣΤΟΙΧΕΙΑ ΕΤΑΙΡΩΝ/ΜΕΤΟΧΩΝ", "ΠΕΡΙΓΡΑΦΗ ΤΗΣ ΕΠΙΧΕΙΡΗΣΗΣ", "ΒΑΣΙΚΑ ΣΤΟΙΧΕΙΑ", "ΕΔΡΑ ΤΗΣ ΕΠΙΧΕΙΡΗΣΗΣ", "ΜΕΤΟΧΙΚΗ ΣΥΝΘΕΣΗ ΚΑΙ ΠΡΟΣΩΠΙΚΟ", "ΠΕΡΙΓΡΑΦΗ ΠΑΡΑΓΟΜΕΝΩΝ ΠΡΟΪΟΝΤΩΝ /ΥΠΗΡΕΣΙΩΝ", "ΣΥΝΟΠΤΙΚΗ ΠΑΡΟΥΣΙΑΣΗ ΤΗΣ ΠΑΡΑΓΩΓΙΚΗΣ ΔΙΑΔΙΚΑΣΙΑΣ", "Η ΑΓΟΡΑ ΣΤΟΧΟΣ", "ΑΝΑΛΥΣΗ ΑΝΤΑΓΩΝΙΣΜΟΥ", "ΑΝΑΛΥΣΗ SWOT", "ΣΧΕΔΙΑΖΟΜΕΝΕΣ ΕΝΕΡΓΕΙΕΣ ΔΙΑΦΗΜΙΣΗΣ ΚΑΙ MARKETING", "ΠΡΟΓΡΑΜΜΑΤΙΣΜΕΝΕΣ ΕΠΕΝΔΥΣΕΙΣ / ΔΑΠΑΝΕΣ ΤΗΣ ΕΠΙΧΕΙΡΗΣΗΣ ΠΟΥ ΣΧΕΤΙΖΟΝΤΑΙ ΜΕ ΤΟΥΣ ΣΤΟΧΟΥΣ ΚΑΙ ΤΟΝ ΑΝΑΠΤΥΞΙΑΚΟ ΣΧΕΔΙΑΣΜΟ ΤΗΣ", "ΚΑΙΝΟΤΟΜΙΕΣ ΠΟΥ ΔΙΑΘΕΤΕΙ Η ΕΠΙΧΕΙΡΗΣΗ", "ΠΡΑΣΙΝΕΣ ΔΙΑΔΙΚΑΣΙΕΣ ΚΑΙ ΠΟΛΙΤΙΚΕΣ ΠΟΥ ΕΧΟΥΝ ΤΥΧΟΝ ΥΙΟΘΕΤΗΘΕΙ Η ΠΡΟΚΕΙΤΑΙ ΝΑ ΥΙΟΘΕΤΗΘΟΥΝ", "ΥΠΟΔΟΜΕΣ – ΕΞΟΠΛΙΣΜΟΣ ΠΟΥ ΕΞΑΣΦΑΛΙΖΕΙ ΤΗΝ ΠΡΟΣΒΑΣΙΜΟΤΗΤΑ ΤΩΝ ΑΜΕΑ", "ΑΝΑΛΥΣΗ ΥΦΙΣΤΑΜΕΝΗΣ ΟΙΚΟΝΟΜΙΚΗΣ ΚΑΤΑΣΤΑΣΗΣ", "ΑΝΑΛΥΣΗ ΠΩΛΗΣΕΩΝ-ΕΣΟΔΩΝ ΚΑΙ ΕΞΟΔΩΝ ΣΕ ΒΑΘΟΣ ΤΡΙΕΤΙΑΣ", "ΥΠΟΛΟΓΙΣΜΟΣ ΝΕΚΡΟΥ ΣΗΜΕΙΟΥ", "Σύντομο Επιχειρηματικό Σχέδιο – Elevator Pitch"];
        vm.books = ["Β κατηγορίας", "Γ κατηγορίας"];
        vm.numbers = [
            {
                label: "0",
                value: 1
            },
            {
                label: "1",
                value: 1
            },
            {
                label: "2",
                value: 2
            },
            {
                label: "3",
                value: 2
            },
            {
                label: "4",
                value: 2
            },
            {
                label: "5",
                value: 5
            },
            {
                label: "6",
                value: 5
            },
            {
                label: "7",
                value: 7
            },
            {
                label: "8",
                value: 7
            },
            {
                label: "9",
                value: 7
            },
            {
                label: "10",
                value: 7
            },
            {
                label: "Άνω των 10",
                value: 7
            }
        ];
        vm.chart = {
            labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
            data: [vm.data.incomesfirstYear, vm.data.incomessecondYear, vm.data.incomesthirdYear]
        }
        vm.add = function (Array) {
            if (!vm.data[Array]) vm.data[Array] = [];
            vm.data[Array].push({});
        }
        vm.metoxSum = 0;
        vm.SumMetox = function () {
            vm.metoxSum = vm.metoxos && vm.metoxos.filter(function (c) { return !!c.pc }).reduce(function (a, b) {
                return a + parseFloat(b.pc);
            }, 0) || 0;
            return vm.metoxSum;
        }
        vm.remove = function (Array, index) {
            Array.splice(index, 1);
        }
        vm.checkAFM = function (a) {
            var iDigit = 0;
            var Num1 = 0;
            for (iDigit = 1; iDigit <= 8; iDigit++) {
                Num1 += parseInt(a.substr(iDigit - 1, 1)) * Math.pow(2, (9 - iDigit));
            }
            var res = Num1 % 11;
            if (res == 10) { res = 0; }
            var ok = (res == a.substr(a.length - 1, 1)) ? true : false;
            if(ok)
                vm.afmMess = "";
            else
                vm.afmMess="error";
        }
        vm.katDapanes = [
            { name: "Κτιριακές δαπάνες", values: ["Αγορά", "Κτιριακές Παρεμβάσεις"] },
            { name: "Εξοπλισμός", values: ["Μηχανολογικός εξοπλισμός / άλλος παραγωγικός εξοπλισμός", "Hardware - Software", "Εξοπλισμός γραφείου (π.χ. φωτοτυπικό μηχάνημα, τηλεφ. κέντρο, κλπ.)", "Έπιπλα γραφείου", "Άλλο"] },
            { name: "Μισθοδοσία", values: ["Κόστος πωληθέντων "] },
            { name: "Λειτουργικές δαπάνες", values: ["Ενοίκιο", "Ασφαλιστικές εισφορές επιχειρηματία", "Δαπάνες ηλεκτρισμού", "Δαπάνες ύδρευσης", "Δαπάνες σταθερής & κινητής τηλεφωνίας", "Δαπάνες κοινοχρήστων", "Δαπάνες θέρμανσης", "Άλλο"] },
            { name: "Δαπάνες για αμοιβές τρίτων ", values: ["Λογιστική υποστήριξη", "Εκπαίδευση προσωπικού", "Νομική υποστήριξη", "Συμβουλευτική υποστήριξη", "Υπηρεσίες καθαριότητας", "Υπηρεσίες φύλαξης", "Άλλο"] },
            { name: "Δαπάνες προβολής και δικτύωσης", values: ["Διαφημιστικά έντυπα", "Επαγγελματικές κάρτες", "Δημιουργία, φιλοξενία και συντήρηση εταιρικής ιστοσελίδας", "Προβολή στα Social Media ", "Διαφήμιση στο Internet", "Διαφήμιση στο ραδιόφωνο", "Διαφήμιση στην τηλεόραση", "Συμμετοχή σε εκθέσεις", "Άλλο"] },
            { name: "Μεταφορικά μέσα", values: [] },
            { name: "Αναλώσιμα", values: ["Γραφική ύλη", "Είδη καθαριότητας", "Άλλο"] },
            { name: "Άλλα έξοδα", values: ["Έξοδα επαγγελματικών ταξιδιών του προσωπικού", "Άλλο"] },
        ]
        vm.data.totals = [
            { title: 'ΣΥΝΟΛΙΚΟΣ ΚΥΚΛΟΣ ΕΡΓΑΣΙΩΝ (ΣΕ €)', values: [] },
            { title: 'ΣΥΝΟΛΟ ΕΝΕΡΓΗΤΙΚΟΥ', values: [] },
            { title: 'Κέρδη Προ Φόρων και Αποσβέσεων', values: [] },
            { title: 'Καθαρά Κέρδη', values: [] },
            { title: 'Κόστος Πωληθέντων', values: [] },
            { title: 'Ξένα Κεφάλαια', values: [] },
            { title: 'Ίδια Κεφάλαια', values: [] },
            { title: 'Απαιτήσεις', values: [] },
            { title: 'Διαθέσιμα', values: [] },
            { title: 'Βραχυπρόθεσμες Υποχρεώσεις', values: [] },
            { title: 'Μικτά Κέρδη (€)', values: [], formula: function (i) { return vm.data.totals[2].values[i] + vm.data.totals[3].values[i] } },
            { title: 'Μικτά Κέρδη (%)', values: [], formula: function (i) { return vm.data.totals[2].values[i] + vm.data.totals[3].values[i] } },
            { title: 'Δείκτης ταχύτητας κυκλοφορίας ενεργητικού', values: [], formula: function (i) { return vm.data.totals[2].values[i] + vm.data.totals[3].values[i] } },
            { title: 'Δείκτης γενικής ρευστότητας:', values: [], formula: function (i) { return vm.data.totals[2].values[i] + vm.data.totals[3].values[i] } },
            { title: 'Δείκτης ταχύτητας είσπραξης απαιτήσεων', values: [], formula: function (i) { return vm.data.totals[2].values[i] + vm.data.totals[3].values[i] } },
            { title: 'Δείκτης οικονομικής μοχλεύσεως', values: [], formula: function (i) { return vm.data.totals[2].values[i] + vm.data.totals[3].values[i] } },
            { title: 'Δείκτης αποδοτικότητας ιδίων κεφαλαίων', values: [], formula: function (i) { return vm.data.totals[2].values[i] + vm.data.totals[3].values[i] } },
            { title: 'Δείκτης αποδοτικότητας ενεργητικού', values: [], formula: function (i) { return vm.data.totals[2].values[i] + vm.data.totals[3].values[i] } },
            { title: 'Δείκτης μεικτού κέρδους', values: [], formula: function (i) { return vm.data.totals[2].values[i] + vm.data.totals[3].values[i] } },
            { title: 'Δείκτης καθαρού κέρδους', values: [], formula: function (i) { return vm.data.totals[2].values[i] + vm.data.totals[3].values[i] } }
        ]
        vm.createRows = function (y, k) {
            vm.startYear = y - parseInt(k);
            vm.data.xronia = [];

            for (var i = k; i > 0; i--)
                vm.data.xronia.push(y - i + 1);
            for (let x of vm.data.totals) {
                x.values = [];
                for (var i = 0; i < k; i++) {
                    x.values.push(null);
                }
            }
        }
        vm.kaad = null;
        vm.getKaad = function (search) {
            if (search) {
                $http.post("/home/GetKad", { keyword: search }).then(function (r) {
                    vm.kaad = r.data;
                });
            }
        }
    }
})();
