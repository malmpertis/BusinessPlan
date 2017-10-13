(function () {
    'use strict';

    var Base64 = {
        // private property
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        // public method for encoding
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = Base64._utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
        },
        // public method for decoding
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = Base64._utf8_decode(output);
            return output;
        },
        // private method for UTF-8 encoding
        _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },
        // private method for UTF-8 decoding
        _utf8_decode: function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }

    function Download(Data, contType, filename) {
        $("<a download='" + filename + "'>").attr("href", "data:" + contType + ";base64," + Base64.encode(Data))[0].click();
    }


    angular
        .module('app', ['chart.js', 'ngMaterial', 'ui.router', 'textAngular'])
        .config(['$stateProvider', '$urlRouterProvider', '$mdDateLocaleProvider', '$provide', function ($stateProvider, $urlRouterProvider, $mdDateLocaleProvider, $provide) {
            $mdDateLocaleProvider.formatDate = function (date) {
                return date ? moment(date).format('DD-MM-YYYY') : null;
            };
            $mdDateLocaleProvider.parseDate = function (dateString) {
                var m = null;
                if (dateString.indexOf("/") != -1)
                    m = moment(dateString, 'DD/MM/YYYY', true);
                else if (dateString.indexOf("-") != -1)
                    m = moment(dateString, 'DD-MM-YYYY', true);
                return m.isValid() ? m.toDate() : new Date(NaN);
            };
            $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function (taRegisterTool, taOptions) { // $delegate is the taOptions we are decorating
                taOptions.toolbar = [
                    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
                    ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
                    [
                        //'html', 'insertImage', 'insertLink', 'insertVideo',
                        'wordcount', 'charcount'
                    ]
                ];
                return taOptions;
            }]);

            //	$urlRouterProvider.otherwise('/');

            //	$stateProvider
            //		.state('intro', {
            //			url: ('/intro'),
            //			templateUrl: 'intro.html',
            //			controller: 'controller'
            //		})
            //		.state('general', {
            //			url: ('/general'),
            //			templateUrl: 'general.html',
            //			controller: 'controller'
            //		})
        }])
        .controller('controller', ['$location', '$scope', '$http', '$timeout', '$mdSidenav', '$mdDialog', controller])



    function controller($location, $scope, $http, $timeout, $mdSidenav, $mdDialog) {
        //Setting Controller's Name
        var vm = this;
        vm.title = 'controller';

        vm.data = {};
        //vm.data.educationLevels = {};

        //Geo From db

        //Initializing $scop for $watch
        $scope.vm = this;
        //Watches changes on Incomes Table (icomes_expenses.html)
        $scope.$watch("vm.data.incomes", function (n, o) {
            if (vm.data.incomes && n !== o) {
                vm.data.sumIncomesFirstYear = 0;
                vm.data.sumIncomesSecondYear = 0;
                vm.data.sumIncomesThirdYear = 0;
                for (var i = 0; i < vm.data.incomes.length; i++) {
                    vm.data.incomes[i].incomesFirstYear = vm.data.incomes[i].value * vm.data.incomes[i].predictionFirst;
                    vm.data.sumIncomesFirstYear += vm.data.incomes[i].incomesFirstYear;

                    vm.data.incomes[i].incomesSecondYear = vm.data.incomes[i].value * vm.data.incomes[i].predictionSecond;
                    vm.data.sumIncomesSecondYear += vm.data.incomes[i].incomesSecondYear;

                    vm.data.incomes[i].incomesThirdYear = vm.data.incomes[i].value * vm.data.incomes[i].predictionThird;
                    vm.data.sumIncomesThirdYear += vm.data.incomes[i].incomesThirdYear;

                }
            }
        }, true);
        //Watches changes on Expenses Table (icomes_expenses.html)
        $scope.$watch("vm.data.expenses", function (n, o) {
            if (vm.data.expenses && n !== o) {
                vm.data.sumExpensesFirstYear = 0;
                vm.data.sumExpensesSecondYear = 0;
                vm.data.sumExpensesThirdYear = 0;
                for (var i = 0; i < vm.data.expenses.length; i++) {
                    vm.data.sumExpensesFirstYear += vm.data.expenses[i].expensesFirst || 0;

                    vm.data.sumExpensesSecondYear += vm.data.expenses[i].expensesSecond || 0;

                    vm.data.sumExpensesThirdYear += vm.data.expenses[i].expensesThird || 0;

                }
            }
        }, true);
        //Watches changes on Total Partners (partners.html)
        $scope.$watch("vm.total", function (n, o) {
            if (vm.total > 100) {
                vm.showAlert(27);
            }
        });

        var oldData = {};

        function dataSender() {
            var k = Object.keys(vm.data);
            var sentData = {};
            for (var i = 0; i < k.length; i++) {
                if (vm.data[k[i]] && !angular.equals(vm.data[k[i]], oldData[k[i]])) {
                    sentData[k[i]] = angular.toJson(vm.data[k[i]]);
                }

            }
            if (Object.keys(sentData).length) {
                $http.post('/Plan/Set', { Plan: sentData }).then(function (r) {
                    var d = Object.keys(sentData);
                    for (var i = 0; i < d.length; i++) {
                        oldData[d[i]] = angular.fromJson(r.data[d[i]]);
                    }
                });
            }
        }


        var saveTimeout = null;

        var transform = function (data) {
            return $.param(data);
        }
        vm.downloadPdf = function () {
            $http.post("/Plan/Pdf", null, {
                headers: { 'Content-Type': 'application/octet-stream' },
                transformRequest: transform
            }).then(function (r) {
                Download(r.data, r.headers("content-type"), "BusinessPlan.pdf");
            })
        }

        //Alert Popup Window
        function debounce(func, wait, context) {
            var timer;

            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function () {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        function buildDelayedToggler(navID) {
            return debounce(function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
            }, 200);
        }
        function buildToggler(navID) {
            return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
            };
        }
        vm.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
        };
        vm.status = '  ';
        vm.customFullscreen = false;
        vm.showAlert = function (pos) {
            alert = $mdDialog.alert({
                title: 'Βοηθεια',
                textContent: vm.helpers[pos],
                ok: 'Κλεισιμο'
            });

            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
        };

        //Active Sections
        vm.class = "";
        vm.activeSection = 1;
        vm.changeActive = function (id) {
            vm.activeSection = id;
        }

        //Menu toggle
        vm.toggleLeft = buildDelayedToggler('left');
        vm.toggleRight = buildToggler('right');
        vm.isOpenRight = function () {
            return $mdSidenav('right').isOpen();
        };
        vm.openLeftMenu = function () {
            $mdSidenav('right').toggle();
        };

        //General Function
        vm.add = function (Array, o) {
            if (!vm.data[Array]) vm.data[Array] = [];
            vm.data[Array].push(o || {});
        }
        vm.generate = function (year) {
            vm.data.educationLevels.years = []
            for (var i = 0; i < 3; i++) {
                vm.data.educationLevels.years.push({ year: year - i });
            }
        }
        vm.addYearData = function (i) {
            if (!vm.data.educationLevels.years[i].yearData) vm.data.educationLevels.years[i].yearData = []
            vm.data.educationLevels.years[i].yearData.push({});
        }
        vm.remove = function (Array, index) {
            Array.splice(index, 1);
        }
        vm.uploadImage = function () {

            var form = $('<form id="imgposter" action="/ok" method="post"></form>');
            var imgInput = $('<input id="imgInput" type="file" accept="image/*" />');
            imgInput.change(function () {
                var fd = new FormData();
                fd.append('file', imgInput[0].files[0]);
                $.ajax({ type: 'post', url: '/Plan/setImg', data: fd, processData: false, contentType: false }).then(function (r) {
                    vm.data.company.logo = r.url;
                    $scope.$apply();
                });
            });
            imgInput[0].click();
        }


        vm.total = 0;
        //vm.data.partners = []
        vm.getTotal = function () {
            if (vm.data.partners) {
                vm.total = vm.data.partners.filter(function (c) {
                    return c.percentage && (typeof c.percentage === "number");
                }).reduce(function (s, i) {
                    return s + i.percentage;
                }, 0);
                return vm.total;
            }
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
            if (ok)
                vm.afmMess = "Έγκυρο ΑΦΜ";
            else
                vm.afmMess = " Το ΑΦΜ δεν είναι έγκυρο";
        }

        //Creates the rows for economicSituation.html Table
        vm.createRows = function (y, k) {
            vm.startYear = y - parseInt(k);
            vm.data.xronia = [];
            for (var i = parseInt(k); i > 0; i--)
                vm.data.xronia.push(y - i);
            for (let x of vm.data.totals) {
                x.values = [];
                for (var i = 0; i < parseInt(k); i++) {
                    x.values.push(null);
                }
            }
            if (vm.data.xronia.length >= 1) {
                vm.clicked = true;
            }
            else {
                vm.showAlert(28)
            }
        }

        //KAD
        var lastSearchKad = null;
        vm.kaad = null;
        vm.getKaad = function (search) {
            if (search && search != lastSearchKad) {
                $http.post("/home/GetKad", { keyword: search }).then(function (r) {
                    vm.kaad = r.data;
                    lastSearchKad = search;
                });
            }
        };
        vm.searchTimeout = null;
        vm.onSearchKad = function (search, i) {
            vm.tempIndex = i;
            if (vm.searchTimeout) $timeout.cancel(vm.searchTimeout);
            $timeout(function () {
                vm.getKaad(search);
            }, 500);

        };
        vm.selectKad = function (k, kad) {
            kad.title = k.title;
            kad.id = k.id;
            vm.kaad = null;
            vm.searchInput = null;
        };

        //Data
        vm.helpers = [
            "Σύντομο ιστορικό και στόχοι - όραμα της επιχείρησης / Εισαγωγή σχεικά με τη γέννηση της επιχειρηματικής ιδέας και του οράματος του/των δυνητικού/ων επιχειρηματία/ων (πχ. ποια είναι η επιχειρηματική ευκαιρία και ποιες ανάγκες της αγοράς καλύπτει)",
            "Σύντομη περιγραφή της υφιστάμενης ή μελλοντικής έδρας και τυχόν παραρτημάτων της επιχείρησης (λ.χ. περιγραφή των κτιριακών υποδομών, της γεωγραφικής περιοχής και των πλεονεκτημάτων της [π.χ. πυκνό συγκοινωνιακό δίκτυο, εγγύτητα με εμπορικό κέντρο, κλπ.])",
            "Περιγραφή του/των εταίρου / εταίρων (σπουδές, εμπειρία, τεχνογνωσία για να τεκμηριώνεται η συνάφεια με τις υπηρεσίες/παραγόμενα προϊόντα της επιχείρησης, ιστορικό τυχούσας προϋπάρχουσας συνεργασίας των εταίρων και ρόλος του κάθε εταίρου στην επιχείρηση. Αναφέρετε το υφιστάμενο ή μελλοντικό προσωπικό της επιχείρησης και τον ρόλο του στην Επιχείρηση. Τέλος αναφέρετε την κεφαλαιακή δομή και το οργανόγραμμα της εταιρίας",
            "Περιγράψτε αναλυτικά και με κατανοητό τρόπο τα προϊόντα/υπηρεσίες σας, τις ανάγκες που καλύπτουν, την ιδιαιτερότητα-πλεονεκτήματα τους σε σχέση με αυτά του ανταγωνισμού. Αναφέρετε εάν υπάρχουν τυχόν νέα προϊόντα / υπηρεσίες που πρόκειται να λανσάρετε στο άμεσο μέλλον και εάν έχετε εξασφαλίσει ήδη συμβάσεις / προσύμφωνα συνεργασίας με πελάτες για αυτά.",
            "Αναφέρετε στοιχεία και τάσεις της τοπικής, εθνικής και διεθνούς αγοράς (στην οποία στοχεύετε) σχετικά με τη ζήτηση και την κατανάλωση των προϊόντων/ υπηρεσιών της επιχείρησης (π.χ.ανοδική πορεία της κατανάλωσης των προϊόντων της επιχείρησης) αναφέροντας επίσημα στοιχεία (λ.χ.από ΕΛΣΤΑΤ και μελέτες έγκριτων οργανισμών, π.χ.ICAP) και τους υφιστάμενους – δυνητικούς πελάτες των προϊόντων / υπηρεσιών της επιχείρησης (λ.χ.επιχειρήσεις & οργανισμοί του Ιδιωτικού ή Δημοσίου Τομέα, ιδιώτες - τελικοί καταναλωτές).Αναφέρετε τα ιδιαίτερα χαρακτηριστικά π.χ.ηλικιακές ομάδες, φύλο, lifestyle, μορφωτικό και κοινωνικό επίπεδο, αγοραστική δύναμη, κλπ.των υφιστάμενων ή δυνητικών πελατών – καταναλωτών της επιχείρησης.Αναφέρετε τυχόν ιδιαίτερα χαρακτηριστικά π.χ.οικονομικός κλάδος, μέγεθος, αρ.εργαζομένων, κλπ.των υφιστάμενων ή δυνητικών πελατών – νομικών προσώπων της επιχείρησης.Τέλος, μπορείτε να αναφέρετε το μέγεθος των δυνητικών πελατών σας με βάση πραγματικά στοιχεία της τοπικής, εθνικής, διεθνούς αγοράς που τυχόν στοχεύετε.",
            "Αναφέρετε τους βασικούς ανταγωνιστές της επιχείρησης σε τοπικό, εθνικό και διεθνές επίπεδο (αναλόγως της / των αγορών στην οποία/ες στοχεύετε) και τυχόν ανταγωνιστικά πλεονεκτήματα των προϊόντων / υπηρεσιών της επιχείρησης σε σχέση με αυτά των ανταγωνιστών της",
            "Με βάση την ανάλυση του ανταγωνισμού, της αγοράς στόχου και των χαρακτηριστικών των δυνητικών πελατών σας και της ανάλυσης SWOT που προηγήθηκε αναφέρετε τους βασικούς στόχους σας στους οποίους θα βασιστούν οι ενέργειες marketing. Κατόπιν αναφέρετε με ποιες ενέργειες θα επιδιώξετε την επίτευξη των στόχων αυτών, λ.χ. μέσω της υλοποίησης ραδιοφωνικής καμπάνιας, της δημιουργίας ιστοσελίδας και της υλοποίησης καμπάνιας στα social media. Επίσης, αναφέρετε εάν διαθέτει ή πρόκειται να διαθέτει η επιχείρηση Εμπορικό Σήμα? Επίσης, αναφέρετε εάν η επιχείρηση προβάλει ή πρόκειται να προβάλλει τα προϊόντα / υπηρεσίες της οργανωμένα σε επαγγελματικούς οδηγούς, μηχανές αναζήτησης, κ.α.",
            "Σύμφωνα με τον Kotler «Τοποθέτηση είναι η διαδικασία σχεδιασμού της εταιρικής προσφοράς και εικόνας έτσι ώστε να κατακτήσει η μάρκα ένα ξεχωριστό μέρος στο μυαλό του κοινού- στόχος. Το τελικό αποτέλεσμα της τοποθέτησης είναι η επιτυχημένη δημιουργία μιας πελατοκεντρικής πρότασης αξίας (proposition value), μιας συγκεκριμένης αιτίας να αγοράσει το κοινό- στόχος το προϊόν». http://ba.uom.gr/mkt/eap/Andro/OSS-1/1h_OSS/6-Positioning.pdf. Στο σημείο αυτό αναφέρετε την «δήλωση τοποθέτησης – positioning statement» της επιχείρησής σας, η οποία προσδιορίζει το σημαντικότερο ανταγωνιστικό της πλεονέκτημα σε σχέση με τον ανταγωνισμό.",
            "Στο σημείο αυτό αναφέρετε ποια θα είναι η στρατηγική και τα κανάλια διανομής των προϊόντων / υπηρεσιών σας. Με βάση τα χαρακτηριστικά και τις καταναλωτικές συνήθειες των δυνητικών αγοραστών των προϊόντων / υπηρεσιών σας αναφέρετε εάν θα πουλάτε τα προϊόντα / υπηρεσίες σας απευθείας στους πελάτες σας ή μέσω τρίτων (λ.χ. εμπόρων λιανικής, εμπορικών αντιπροσώπων, franchisees, κλπ.) ή εάν θα ακολουθήσετε ένα μεικτό τρόπο διανομής συνδυάζοντας περισσότερα από ένα κανάλια. Είναι σύνηθες οι επιχειρήσεις να αξιοποιούν περισσότερα από ένα κανάλια διανομής λ.χ. ηλεκτρονικές πωλήσεις μέσω της εταιρικής ιστοσελίδας, πωλήσεις μέσω καταστήματος και συνεργασία με άλλα καταστήματα λιανικής πώλησης εγκατεστημένα σε άλλες γεωγραφικές περιοχές, κλπ.",
            "Αναφέρετε τις προγραμματισμένες επενδύσεις της επιχείρησης για το άμεσο μέλλον (εντός του επόμενου 12μηνου) οι οποίες σχετίζονται με τον αναπτυξιακό της σχεδιασμό. Λ.χ. στην περίπτωση που σχεδιάζετε να λανσάρετε ένα νέο καινοτόμο προϊόν αναφέρετε τις δαπάνες και τις επενδύσεις που θέλετε να κάνετε και σχετίζονται με αυτό το προϊόν",
            "Αναφέρετε εάν η εταιρία ή ο (δυνητικός) επιχειρηματίας διαθέτει κάποια διεθνή / ευρωπαϊκή / εθνική πατέντα ή κάποια πατέντα υπό έκδοση για κάποιο/α προϊόν/υπηρεσία. Αναφέρετε εάν η επιχείρηση αξιοποιεί ή πρόκειται να υιοθετήσει αυτόματα συστήματα παραγγελιοληψίας (remote, κ.α.), εξειδικευμένα Λογισμικά (ERP, CRM, Logistics, κ.α.) ή/ και ηλεκτρονικές πωλήσεις. Αναφέρετε εάν η εταιρία ή ο (δυνητικός) επιχειρηματίας έχει βραβευτεί σε κάποιον Ευρωπαϊκό ή διεθνή διαγωνισμό. Αναφέρετε εάν η εταιρία ή ο (δυνητικός) επιχειρηματίας έχει απλώς συμμετάσχει σε Ευρωπαϊκό ή διεθνή διαγωνισμό.",
            "Αναφέρετε εάν η εταιρία διαθέτει ή πρόκειται να διαθέτει συστήματα ή υποδομές προσβασιμότητας από ΑΜΕΑ",
            "Νεκρό σημείο: είναι το ποσό εκείνο των πωλήσεων (κύκλου εργασιών), με το οποίο μια επιχείρηση καλύπτει ακριβώς τόσο τα σταθερά όσο και τα μεταβλητά της έξοδα, χωρίς να πραγματοποιεί ούτε κέρδος ούτε ζημιά. Η βασική αρχή, πάνω στην οποία στηρίζεται η ανάλυση του «νεκρού σημείου» (break even point), είναι η συμπεριφορά του κόστους.Αυτό συμβαίνει γιατί ένα μέρος του κόστους είναι μεταβλητό και ανάλογο των πωλήσεων, ενώ ένα άλλο είναι σταθερό, τουλάχιστον για ένα μεγάλο εύρος πωλήσεων.",
            "Οι σταθερές δαπάνες αποτελούνται από τις δαπάνες εκείνες που παραμένουν αμετάβλητες και ανεξάρτητες από το ύψος των πωλήσεων. Τέτοιες δαπάνες αποτελούν τα έξοδα διοικήσεως, οι αποσβέσεις, τα ενοίκια γραφείων μηχανών, τα χρηματοοικονομικά έξοδα κ.λ.π.Ωστόσο, οι σταθερές δαπάνες μπορεί να μεταβάλλονται, αλλά η μεταβολή τους να οφείλεται σε άλλες αιτίες ανεξάρτητες από το μέγεθος της δραστηριότητας της επιχείρησης.Επίσης, είναι δυνατόν ορισμένες δαπάνες να παραμένουν σταθερές μέχρι ενός ορισμένου ύψους πωλήσεων, πέραν του οποίου απαιτούνται πρόσθετες δαπάνες.",
            "Οι μεταβλητές δαπάνες είναι ανάλογες προς το ύψος των πωλήσεων ή του κύκλου εργασιών μιας επιχείρησης και τέτοιες είναι οι αμοιβές προσωπικού, οι υπερωρίες κ.α.",
            "O φορολογικός νόμος, ορίζοντας σαν βάση της φορολογίας το έτος, εννοεί εκείνο που στη λογιστική πρακτική καλείται «διαχείριση» ή «χρήση», δηλαδή, το χρονικό διάστημα που περικλείεται ανάμεσα σε δύο διαδοχικές απογραφές (ή ισολογισμούς), το οποίο, κατά κανόνα, είναι ετήσιο, ακριβώς δε, αυτής της ετήσιας περιόδου τα κέρδη προτίθεται να φορολογήσει. Η διαχειριστική χρήση δεν μπορεί να περιλαμβάνει περισσότερους από δώδεκα (12) μήνες. Σε εξαιρετικές περιπτώσεις, η πρώτη διαχειριστική χρήση μπορεί να ορίζεται για χρονικό διάστημα μέχρι είκοσι τέσσερις (24) μήνες.",
            "Ο ορισμός των ΜΜΕ κάνει διάκριση μεταξύ τριών διαφορετικών κατηγοριών επιχειρήσεων. Κάθε κατηγορία αντιστοιχεί σε ένα είδος σχέσης που η επιχείρηση θα μπορούσε να έχει με μια άλλη επιχείρηση. Αυτή η διάκριση είναι αναγκαία προκειμένου να υπάρχει σαφής εικόνα της οικονομικής κατάστασης της επιχείρησης και να αποκλείει εκείνες που δεν είναι πραγματικά ΜΜΕ. Οι κατηγορίες είναι: α / Αυτόνομη επιχείρηση: αν η επιχείρηση είναι είτε πλήρως ανεξάρτητη είτε έχει μία ή περισσότερες μειοψηφικές εταιρικές σχέσεις (σε ποσοστό μικρότερο του 25 % η καθεμιά) με άλλες επιχειρήσεις. β / Συνεργαζόμενη επιχείρηση: αν η εταιρική συμμετοχή σε άλλες επιχειρήσεις ανέρχεται σε τουλάχιστον 25 % αλλά όχι παραπάνω από 50 %, η σχέση θεωρείται ότι υφίσταται μεταξύ συνεργαζόμενων επιχειρήσεων. γ / Συνδεδεμένη επιχείρηση: εάν η εταιρική συμμετοχή σε άλλες επιχειρήσεις ξεπερνά το όριο του 50 %, αυτές θεωρούνται ",
            "Τα πεδία στα δεξιά συμπληρώνονται σύμφωνα με τις αντίστοιχες καταχωρήσεις από τον Ισολογισμό και την Κατάσταση Αποτελεσμάτων Χρήσης της επιχείρησης (ΚΑΧ) για κάθε έτος σε περίπτωση εταιρίας με βιβλία Γ΄τάξης. Σε περίπτωση βιβλίων Β΄τάξης συμπληρώστε μόνο τα πεδία που αντιστοιχούν στην επιχείρηση σας βάσει του Ε3. Σε κάθε περίπτωση αν κάποιο πεδίο δεν απαιτείται για την επιχείρηση σας, συμπληρώστε το σύμβολο « - » ή αφήστε το κενό.",
            "Ο δείκτης αυτός είναι σημαντικός διότι παρέχει ένα μέτρο αξιολόγησης της αποδοτικότητας της επιχείρησης. Μια επιχείρηση θεωρείται επιτυχημένη, όταν έχει μεγάλο καθαρό μικτό κέρδος σε σχέση με τις πωλήσεις και τα ίδια κεφάλαια που απασχολεί",
            "Ο δείκτης αυτός είναι σημαντικός διότι παρέχει ένα μέτρο αξιολόγησης της αποδοτικότητας τους. Μια επιχείρηση θεωρείται επιτυχημένη, όταν έχει μεγάλο ποσοστό μικτού κέρδους, που να της επιτρέπει να καλύπτει τα λειτουργικά και άλλα έξοδα της και συγχρόνως της αφήνει ικανοποιητικό καθαρό κέρδος σε σχέση με τις πωλήσεις και τα ίδια κεφάλαια που απασχολεί.Ένας υψηλός δείκτης δείχνει την ικανότητα της διοίκησης να επιτυγχάνει φθηνές αγορές και να πουλάει σε υψηλές τιμές ενώ ένας χαμηλός δείκτης δείχνει το αντίθετο.",
            "Ο δείκτης αυτός δείχνει την σχέση του κόστους των πωληθέντων προϊόντων ή εμπορευμάτων με τις πωλήσεις , και μετρά την αποτελεσματικότητα ελέγχου του κόστους πωληθέντων.",
            "Ο δείκτης αυτός εκτιμά την εντατικότητα με την οποία χρησιμοποιεί η επιχείρηση τα περιουσιακά της στοιχεία για να επιτύχει τους στόχους πωλήσεων της.Ένας υψηλός δείκτης εκμετάλλευσης ενεργητικού σημαίνει ότι η επιχείρηση χρησιμοποιεί εντατικά τα περιουσιακάτης στοιχεία προκειμένου να πραγματοποιεί τις πωλήσεις της.Ένας χαμηλός δείκτης αποτελεί ένδειξη όχι εντατικής χρησιμοποίησης των περιουσιακών της στοιχείων.Ο δείκτηςαυτός στην ουσία μας δείχνει εάν υπάρχει υπερεπένδυση κεφαλαίων στην επιχείρηση σε σχέση με το ύψος των πωλήσεων της.",
            "Ο αριθμοδείκτης αυτός δείχνει το μέτρο ρευστότητας μιας επιχείρησης και το περιθώριο ασφαλείας, ώστε αυτή να είναι σε θέση να ανταποκριθεί στην πληρωμή των καθημερινών απαιτητών υποχρεώσεων. Οσο πιο προβλέψιμες είναι οι εισροές χρημάτων μιας επιχείρησης τόσο είναι γενικότερα αποδεκτός ένας πιο χαμηλός δείκτης, αν και αυτό είναι συνάρτηση κυρίως του κλάδου στον οποίο ανήκει η επιχείρηση.",
            "Ο συγκεκριμένος δείκτης καταδεικνύει αν οι απαιτήσεις μιας επιχείρησης είναι πολύ μεγάλες σε σύγκριση με τις πωλήσεις της. Ανάλογος με την ταχύτητα είσπραξης των απαιτήσεων είναι ο χρόνος δέσμευσης των απαιτήσεων. Μεγάλη ταχύτητα στην είσπραξη των απαιτήσεων σημαίνει μικρότερη πιθανότητα ζημιών από επισφαλείς πελάτες. Η παρακολούθηση της τάσης είναι διαχρονικά χρήσιμη για την αξιολόγηση της ποιότητας και της ρευστότητας των απαιτήσεων.",
            "Με τον εν λόγω δείκτη παρατηρούμε την επίδραση που ασκεί η χρησιμοποίηση των δανειακών κεφαλαίων στην αποδοτικότητα των ιδίων κεφαλαίων της εταιρείας. Ανάλογα με το επίπεδο του δείκτη ­ μεγαλύτερος, ίσος ή μικρότερος της μονάδας ­ η επίδραση από τη χρήση ξένων κεφαλαίων στα κέρδη της επιχεόρησης είναι αντίστοιχα θετική και επωφελής, μηδενική ή αρνητική.",
            "Ο αριθμοδείκτης αυτός απεικονίζει την κερδοφόρα δυναμικότητα μιας επιχείρησης και παρέχει ένδειξη του κατά πόσο επιτεύχθηκε ο στόχος πραγματοποίησης ενός ικανοποιητικού αποτελέσματος από τη χρήση των κεφαλαίων του μετόχου. Με άλλα λόγια, μετρά την αποτελεσματικότητα με την οποία τα κεφάλαια των φορέων της επιχείρησης απασχολούνται σε αυτήν. Αποτελεί τον βασικό δείκτη τον οποίο η διοίκηση μιας εταιρείας σε περίπτωση θετικού αποτελέσματος τείνει να προβάλει με τον πιο επιφανή τρόπο στον ετήσιο απολογισμό χρήσης.",
            "Ο συγκεκριμένος αριθμοδείκτης μετράει την απόδοση των συνολικών περιουσιακών στοιχείων μιας επιχείρησης και επιτρέπει την αξιολόγηση της αποτελεσματικότητας της λειτουργίας της. Ο δείκτης φανερώνει την ικανότητά της να μπορεί να επιζήσει οικονομικά και να προσελκύσει κεφάλαια που προσφέρονται για επένδυση, «ανταμείβοντάς» τα ανάλογα.",
            "Το ποσοστό των μετόχων δεν μπορεί να υπερβαίνει το 100%.",
            "Δεν έχετε εισάγει Έτος ή Αριθμό Κλεισμένων Διαχειρηστικών Χρήσεων στα Γενικα Στοιχεία Επιχείρησης",
            "Αναφέρετε εάν η επιχείρηση εφαρμόζει ή πρόκειται να εφαρμόσει: - Σύστημα / τα Διασφάλισης Ποιότητας - Συστήματα αυτοματοποίησης της παραγωγής, αυτοματοποίησης της παρακολούθησης και του ελέγχου της παραγωγικής διαδικασίας",
            "Αναφέρετε ένα σύντομο ιστορικό, το όραμα της εταιρίας/ δυνητικού επιχειρηματία, έδρα της επιχείρησης/ υπό σύσταση επιχείρησης",
            "Περιγραφή των προϊόντων, Περιγραφή των υπηρεσιών, Κρίσιμα χαρακτηριστικά αυτών",
            "Αναφέρετε την αγορά που στοχεύετε, Αναφέρετε την ομάδα στόχου, Λόγους εστίασης και διαφοροποίησης από τον ανταγωνισμό",
            "Αναφορά στη γενική οικονομική κατάσταση έως σήμερα,, πρόβλεψη οικονομικής πορείας της επιχείρησης σε βάθος τριετίας & επενδύσεις, αναφορά στις χρηματοδοτικές ανάγκες της εταιρίας (ποσό, τρόπος που θα αξιοποιηθεί και πλάνο αποπληρωμής)"

        ];

        vm.educationLevel = ["Phd", "MSc", "Τριτοβάθμια", "Δευτεροβάθμια", "Υποχρεωτική"];
        vm.specialty = ["Διοικητικό Προσωπικού", "Υπάλληλος Μηχανογράφησης", "Υπάλληλος Λογιστηρίου", "Υπάλληλος Αποθήκης", "Υπάλληλος Παραγωγής / Ποιότητας και Διανομής", "Εξωτερικός Συνεργάτης", "Εξειδικευμένο Στέλεχος", "Άλλο"];
        vm.partnerType = ["ΦΥΣΙΚΟ ΠΡΟΣΩΠΟ", "ΝΟΜΙΚΟ ΠΡΟΣΩΠΟ"];
        vm.sections = [
            {
                id: 1,
                src: "intro.html",
                desc: "ΕΠΙΧΕΙΡΗΜΑΤΙΚΟ ΣΧΕΔΙΟ"
            },
            {
                id: 2,
                src: "general.html",
                desc: "ΓΕΝΙΚΑ ΣΤΟΙΧΕΙΑ ΕΠΙΧΕΙΡΗΣΗΣ"
            },
            {
                id: 3,
                src: "companyId.html",
                desc: "ΣΤΟΙΧΕΙΑ ΤΑΥΤΟΤΗΤΑΣ ΕΠΙΧΕΙΡΗΣΗΣ"
            },
            {
                id: 4,
                src: "owner.html",
                desc: "ΣΤΟΙΧΕΙΑ ΕΚΠΡΟΣΩΠΟΥ"
            },
            {
                id: 5,
                src: "kad.html",
                desc: "ΚΩΔΙΚΟΙ ΑΡΙΘΜΟΙ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ"
            },
            {
                id: 6,
                src: "partners.html",
                desc: "ΣΤΟΙΧΕΙΑ ΕΤΑΙΡΩΝ/ΜΕΤΟΧΩΝ"
            },
            {
                id: 7,
                src: "basic_info.html",
                desc: "ΠΕΡΙΓΡΑΦΗ ΤΗΣ ΕΠΙΧΕΙΡΗΣΗΣ"
            },
            {
                id: 8,
                src: "marketing.html",
                desc: "ΔΙΑΦΗΜΙΣΗ ΚΑΙ MARKETING"
            },
            {
                id: 9,
                src: "economicSituation.html",
                desc: "ΑΝΑΛΥΣΗ ΟΙΚΟΝΟΜΙΚΗΣ ΚΑΤΑΣΤΑΣΗΣ",
                isDisabled: function () {
                    return !vm.data.company || vm.data.company.businessType == 'Επιχείρηση Υπό Σύσταση';
                }
            },
            {
                id: 10,
                src: "incomes_expenses.html",
                desc: "ΑΝΑΛΥΣΗ ΣΕ ΒΑΘΟΣ ΤΡΙΕΤΙΑΣ"
            },
            {
                id: 11,
                src: "deadspot.html",
                desc: "ΥΠΟΛΟΓΙΣΜΟΣ ΝΕΚΡΟΥ ΣΗΜΕΙΟΥ",
                isDisabled: function () {
                    return !vm.data.company || vm.data.company.businessType == 'Υφιστάμενη Επιχείρηση';
                }
            },
            {
                id: 12,
                src: "elevator_pitch.html",
                desc: "ΣΥΝΤΟΜΟ ΕΠΙΧΕΙΡΗΜΑΤΙΚΟ ΣΧΕΔΙΟ"
            }
        ];

        vm.taxes = [
            {
                name: "15%",
                percentage: 0.15
            },
            {
                name: "22%",
                percentage: 0.22
            },
            {
                name: "25%",
                percentage: 0.25
            },
            {
                name: "29%",
                percentage: 0.29
            },
            {
                name: "35%",
                percentage: 0.35
            },
            {
                name: "37%",
                percentage: 0.37
            }
        ];


        vm.doy = ["Α΄ ΑΘΗΝΩΝ", "Α΄ ΘΕΣΣΑΛΟΝΙΚΗΣ", "Α΄ ΛΑΡΙΣΑΣ", "Α΄ ΠΑΤΡΩΝ", "Α΄ ΠΕΡΙΣΤΕΡΙΟΥ", "Α΄ΠΕΙΡΑΙΑ", "ΑΓΙΟΥ ΔΗΜΗΤΡΙΟΥ", "ΑΓΙΟΥ ΝΙΚΟΛΑΟΥ", "ΑΓΙΩΝ ΑΝΑΡΓΥΡΩΝ", "ΑΓΡΙΝΙΟΥ", "ΑΙΓΑΛΕΩ", "ΑΙΓΙΟΥ", "ΑΛΕΞΑΝΔΡΟΥΠΟΛΗΣ", "ΑΜΑΛΙΑΔΑΣ", "ΑΜΑΡΟΥΣΙΟΥ", "ΑΜΠΕΛΟΚΗΠΩΝ", "ΑΜΦΙΣΣΑΣ", "ΑΡΓΟΣΤΟΛΙΟΥ", "ΑΡΓΟΥΣ", "ΑΡΤΑΣ", "ΑΧΑΡΝΩΝ", "Β΄ ΠΕΡΙΣΤΕΡΙΟΥ", "Β΄ΛΑΡΙΣΑΣ", "ΒΕΡΟΙΑΣ", "ΒΟΛΟΥ", "ΒΥΡΩΝΟΣ", "Γ΄ ΠΑΤΡΩΝ", "Γ΄ ΠΕΙΡΑΙΑ", "ΓΑΛΑΤΣΙΟΥ", "ΓΙΑΝΝΙΤΣΩΝ", "ΓΛΥΦΑΔΑΣ", "ΓΡΕΒΕΝΩΝ", "Δ΄ ΑΘΗΝΩΝ", "Δ΄ ΘΕΣΣΑΛΟΝΙΚΗΣ", "Δ΄ ΠΕΙΡΑΙΑ", "ΔΡΑΜΑΣ", "Ε΄ ΘΕΣΣΑΛΟΝΙΚΗΣ", "Ε΄ ΠΕΙΡΑΙΑ", "ΕΔΕΣΣΑΣ", "ΕΛΕΥΣΙΝΑΣ", "Ζ΄ ΘΕΣΣΑΛΟΝΙΚΗΣ", "ΖΑΚΥΝΘΟΥ", "Η΄ ΘΕΣΣΑΛΟΝΙΚΗΣ", "ΗΓΟΥΜΕΝΙΤΣΑΣ", "ΗΛΙΟΥΠΟΛΗΣ", "ΗΡΑΚΛΕΙΟΥ", "ΘΗΒΩΝ", "ΘΗΡΑΣ", "ΙΒ΄ ΑΘΗΝΩΝ", "ΙΓ΄ ΑΘΗΝΩΝ", "ΙΔ΄ ΑΘΗΝΩΝ", "ΙΖ ΑΘΗΝΩΝ", "ΙΩΑΝΝΙΝΩΝ", "ΙΩΝΙΑΣ ΘΕΣΣΑΛΟΝΙΚΗΣ", "ΚΑΒΑΛΑΣ", "ΚΑΛΑΜΑΡΙΑΣ", "ΚΑΛΑΜΑΤΑΣ", "ΚΑΛΛΙΘΕΑΣ", "ΚΑΡΔΙΤΣΑΣ", "ΚΑΡΠΕΝΗΣΙΟΥ", "ΚΑΣΤΟΡΙΑΣ", "ΚΑΤΕΡΙΝΗΣ", "ΚΑΤΟΙΚΩΝ ΕΞΩΤΕΡΙΚΟΥ", "ΚΕΝΤΡΟ ΕΛΕΓΧΟΥ ΜΕΓΑΛΩΝ ΕΠΙΧΕΙΡΗΣΕΩΝ", "ΚΕΡΚΥΡΑΣ", "ΚΗΦΙΣΙΑΣ", "ΚΙΛΚΙΣ", "ΚΟΖΑΝΗΣ", "ΚΟΜΟΤΗΝΗΣ", "ΚΟΡΙΝΘΟΥ", "ΚΟΡΩΠΙΟΥ", "ΚΥΜΗΣ", "ΚΩ", "ΛΑΓΚΑΔΑ", "ΛΑΜΙΑΣ", "ΛΕΥΚΑΔΑΣ", "ΛΙΒΑΔΕΙΑΣ", "ΜΕΣΟΛΟΓΓΙΟΥ", "ΜΟΣΧΑΤΟΥ", "ΜΥΚΟΝΟΥ", "ΜΥΤΙΛΗΝΗΣ", "Ν.ΗΡΑΚΛΕΙΟΥ", "Ν.ΙΩΝΙΑΣ ΒΟΛΟΥ", "ΝΑΞΟΥ", "ΝΑΥΠΛΙΟΥ", "ΝΕΑΣ ΙΩΝΙΑΣ", "ΝΕΑΣ ΣΜΥΡΝΗΣ", "ΝΕΩΝ ΜΟΥΔΑΝΙΩΝ", "ΝΙΚΑΙΑΣ", "ΞΑΝΘΗΣ", "ΟΡΕΣΤΙΑΔΑΣ", "ΠΑΛΑΙΟΥ ΦΑΛΗΡΟΥ", "ΠΑΛΛΗΝΗΣ", "ΠΑΡΟΥ", "ΠΛΟΙΩΝ ΠΕΙΡΑΙΑ", "ΠΟΛΥΓΥΡΟΥ", "ΠΡΕΒΕΖΑΣ", "ΠΤΟΛΕΜΑΙΔΑΣ", "ΠΥΡΓΟΥ", "ΡΕΘΥΜΝΟΥ", "ΡΟΔΟΥ", "ΣΑΜΟΥ", "ΣΕΡΡΩΝ", "ΣΠΑΡΤΗΣ", "ΣΤ΄ ΑΘΗΝΩΝ", "ΣΤ΄ ΘΕΣΣΑΛΟΝΙΚΗΣ", "ΣΥΡΟΥ", "ΤΡΙΚΑΛΩΝ", "ΤΡΙΠΟΛΗΣ", "ΥΠΗΡΕΣΙΑ ΕΣΩΤΕΡΙΚΗΣ ΕΠΑΝΕΞΕΤΑΣΗΣ", "Φ.Α.Ε.ΑΘΗΝΩΝ", "ΦΑΕ ΘΕΣΣΑΛΟΝΙΚΗΣ", "ΦΑΕ ΠΕΙΡΑΙΑ", "ΦΛΩΡΙΝΑΣ", "ΧΑΛΑΝΔΡΙΟΥ", "ΧΑΛΚΙΔΑΣ", "ΧΑΝΙΩΝ", "ΧΙΟΥ", "ΧΟΛΑΡΓΟΥ", "ΨΥΧΙΚΟΥ"];

        vm.companySize = ["Πολύ Μικρή", "Μικρή", "Μεσαία", "Μεγάλη"];
        vm.businessTypes = ["Επιχείρηση Υπό Σύσταση", "Υφιστάμενη Επιχείρηση"];
        vm.legalForms = ["Ατομική", "ΙΚΕ", "Ο.Ε.", "Ε.Ε.", "Α.Ε.", "ΕΠΕ", "Μη Κερδοσκοπική Επιχείρηση", "Κοινωνική Επιχείρηση", "Συνεταιρισμός", "Άλλο"];
        vm.contents = ["ΓΕΝΙΚΑ ΣΤΟΙΧΕΙΑ ΕΠΙΧΕΙΡΗΣΗΣ", "ΣΤΟΙΧΕΙΑ ΤΑΥΤΟΤΗΤΑΣ ΕΠΙΧΕΙΡΗΣΗΣ", "ΣΤΟΙΧΕΙΑ ΝΟΜΙΜΟΥ ΕΚΠΡΟΣΩΠΟΥ – ΣΤΟΙΧΕΙΑ ΔΥΝΗΤΙΚΟΥ ΕΠΙΧΕΙΡΗΜΑΤΙΑ", "ΚΩΔΙΚΟΙ ΑΡΙΘΜΟΙ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ (Κ.Α.Δ.) ΤΗΣ ΕΠΙΧΕΙΡΗΣΗΣ", "ΚΩΔΙΚΟΙ ΑΡΙΘΜΟΙ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ (Κ.Α.Δ.) ΤΗΣ ΥΠΟ ΣΥΣΤΑΣΗ ΕΠΙΧΕΙΡΗΣΗ", "ΣΤΟΙΧΕΙΑ ΕΤΑΙΡΩΝ/ΜΕΤΟΧΩΝ", "ΠΕΡΙΓΡΑΦΗ ΤΗΣ ΕΠΙΧΕΙΡΗΣΗΣ", "ΒΑΣΙΚΑ ΣΤΟΙΧΕΙΑ", "ΕΔΡΑ ΤΗΣ ΕΠΙΧΕΙΡΗΣΗΣ", "ΜΕΤΟΧΙΚΗ ΣΥΝΘΕΣΗ ΚΑΙ ΠΡΟΣΩΠΙΚΟ", "ΠΕΡΙΓΡΑΦΗ ΠΑΡΑΓΟΜΕΝΩΝ ΠΡΟΪΟΝΤΩΝ /ΥΠΗΡΕΣΙΩΝ", "ΣΥΝΟΠΤΙΚΗ ΠΑΡΟΥΣΙΑΣΗ ΤΗΣ ΠΑΡΑΓΩΓΙΚΗΣ ΔΙΑΔΙΚΑΣΙΑΣ", "Η ΑΓΟΡΑ ΣΤΟΧΟΣ", "ΑΝΑΛΥΣΗ ΑΝΤΑΓΩΝΙΣΜΟΥ", "ΑΝΑΛΥΣΗ SWOT", "ΣΧΕΔΙΑΖΟΜΕΝΕΣ ΕΝΕΡΓΕΙΕΣ ΔΙΑΦΗΜΙΣΗΣ ΚΑΙ MARKETING", "ΠΡΟΓΡΑΜΜΑΤΙΣΜΕΝΕΣ ΕΠΕΝΔΥΣΕΙΣ / ΔΑΠΑΝΕΣ ΤΗΣ ΕΠΙΧΕΙΡΗΣΗΣ ΠΟΥ ΣΧΕΤΙΖΟΝΤΑΙ ΜΕ ΤΟΥΣ ΣΤΟΧΟΥΣ ΚΑΙ ΤΟΝ ΑΝΑΠΤΥΞΙΑΚΟ ΣΧΕΔΙΑΣΜΟ ΤΗΣ", "ΚΑΙΝΟΤΟΜΙΕΣ ΠΟΥ ΔΙΑΘΕΤΕΙ Η ΕΠΙΧΕΙΡΗΣΗ", "ΠΡΑΣΙΝΕΣ ΔΙΑΔΙΚΑΣΙΕΣ ΚΑΙ ΠΟΛΙΤΙΚΕΣ ΠΟΥ ΕΧΟΥΝ ΤΥΧΟΝ ΥΙΟΘΕΤΗΘΕΙ Η ΠΡΟΚΕΙΤΑΙ ΝΑ ΥΙΟΘΕΤΗΘΟΥΝ", "ΥΠΟΔΟΜΕΣ – ΕΞΟΠΛΙΣΜΟΣ ΠΟΥ ΕΞΑΣΦΑΛΙΖΕΙ ΤΗΝ ΠΡΟΣΒΑΣΙΜΟΤΗΤΑ ΤΩΝ ΑΜΕΑ", "ΑΝΑΛΥΣΗ ΥΦΙΣΤΑΜΕΝΗΣ ΟΙΚΟΝΟΜΙΚΗΣ ΚΑΤΑΣΤΑΣΗΣ", "ΑΝΑΛΥΣΗ ΠΩΛΗΣΕΩΝ-ΕΣΟΔΩΝ ΚΑΙ ΕΞΟΔΩΝ ΣΕ ΒΑΘΟΣ ΤΡΙΕΤΙΑΣ", "ΥΠΟΛΟΓΙΣΜΟΣ ΝΕΚΡΟΥ ΣΗΜΕΙΟΥ", "Σύντομο Επιχειρηματικό Σχέδιο – Elevator Pitch"];
        vm.books = ["Β κατηγορίας", "Γ κατηγορίας"];
        vm.katDapanes = {
            "Κτιριακές δαπάνες": ["Αγορά ακινήτων, γηπέδων, κτιρίων", "Κτιριακές Παρεμβάσεις", "Χωματουργικά", "Υδραυλικά, Ηλεκτρολογικά", "Άλλα"],
            "Εξοπλισμός": ["Μηχανολογικός εξοπλισμός / άλλος παραγωγικός εξοπλισμός", "Hardware - Software", "Εξοπλισμός γραφείου (π.χ. φωτοτυπικό μηχάνημα, τηλεφ. κέντρο, κλπ.)", "Έπιπλα γραφείου", "Άλλο"],
            "Μισθοδοσία": ["Υφιστάμενο προσωπικό", "Νέο προσωπικό"],
            "Λειτουργικές δαπάνες": ["Ενοίκιο", "Ασφαλιστικές εισφορές επιχειρηματία", "Δαπάνες ηλεκτρισμού", "Δαπάνες ύδρευσης", "Δαπάνες σταθερής & κινητής τηλεφωνίας", "Δαπάνες κοινοχρήστων", "Δαπάνες θέρμανσης", "Άλλο"],
            "Δαπάνες για αμοιβές τρίτων ": ["Λογιστική υποστήριξη", "Εκπαίδευση προσωπικού", "Νομική υποστήριξη", "Συμβουλευτική υποστήριξη", "Υπηρεσίες καθαριότητας", "Υπηρεσίες φύλαξης", "Άλλο"],
            "Δαπάνες προβολής και δικτύωσης": ["Διαφημιστικά έντυπα", "Επαγγελματικές κάρτες", "Δημιουργία, φιλοξενία και συντήρηση εταιρικής ιστοσελίδας", "Προβολή στα Social Media ", "Διαφήμιση στο Internet", "Διαφήμιση στο ραδιόφωνο", "Διαφήμιση στην τηλεόραση", "Συμμετοχή σε εκθέσεις", "Άλλο"],
            "Μεταφορικά μέσα": ["Επαγγελματικά", "Φορτηγά και μεταγωγικά οχήματα", "Άλλα"],
            "Αναλώσιμα": ["Γραφική ύλη", "Είδη καθαριότητας", "Άλλο"],
            "Άλλα έξοδα": ["Έξοδα επαγγελματικών ταξιδιών του προσωπικού", "Άλλο"],
            "Κόστος Πωληθέντων": ["Κόστος Πωληθεντων"]
        };

        vm.totals = [
            { title: 'Συνολικός Κύκλος Εργασιών', values: [] },
            { title: 'Σύνολο Ενεργητικού', values: [] },
            { title: 'Κέρδη Προ Φόρων και Αποσβέσεων', values: [] },
            { title: 'Καθαρά Κέρδη', values: [] },
            { title: 'Κόστος Πωληθέντων', values: [] },
            { title: 'Ξένα Κεφάλαια', values: [] },
            { title: 'Ίδια Κεφάλαια', values: [] },
            { title: 'Απαιτήσεις', values: [] },
            { title: 'Διαθέσιμα', values: [] },
            { title: 'Βραχυπρόθεσμες Υποχρεώσεις', values: [] },
            { title: 'Κυκλοφορούν Ενεργητικό', values: [] },
            { title: 'Μικτά Κέρδη(€)', hint: 18, values: [], formula: function (i, j) { return vm.data.totals[j].values[i] = vm.data.totals[0].values[i] - vm.data.totals[4].values[i] } },
            { title: 'Δείκτης Μικτού Κέρδους(%)', hint: 19, values: [], formula: function (i, j) { return vm.data.totals[j].values[i] = ((vm.data.totals[0].values[i] - vm.data.totals[4].values[i]) / vm.data.totals[0].values[i]) * 100 } },
            { title: 'Κόστος Πωληθέντων(%)', hint: 20, values: [], formula: function (i, j) { return vm.data.totals[j].values[i] = (vm.data.totals[4].values[i] / vm.data.totals[0].values[i]) * 100 } },
            { title: 'Δείκτης ταχύτητας κυκλοφορίας ενεργητικού', hint: 21, values: [], formula: function (i, j) { return vm.data.totals[j].values[i] = (vm.data.totals[0].values[i] / vm.data.totals[1].values[i]) * 100 } },
            { title: 'Δείκτης γενικής ρευστότητας', hint: 22, values: [], formula: function (i, j) { return vm.data.totals[j].values[i] = (vm.data.totals[10].values[i] / vm.data.totals[9].values[i]) * 100 } },
            { title: 'Δείκτης ταχύτητας είσπραξης απαιτήσεων', hint: 23, values: [], formula: function (i, j) { return vm.data.totals[j].values[i] = (vm.data.totals[0].values[i] / vm.data.totals[7].values[i]) * 100 } },
            { title: 'Δείκτης οικονομικής μοχλεύσεως', values: [], hint: 24, formula: function (i, j) { return vm.data.totals[j].values[i] = vm.data.totals[2].values[i] / vm.data.totals[6].values[i] } },
            { title: 'Δείκτης αποδοτικότητας ιδίων κεφαλαίων', hint: 25, values: [], formula: function (i, j) { return vm.data.totals[j].values[i] = vm.data.totals[2].values[i] / vm.data.totals[6].values[i] } },
            { title: 'Δείκτης αποδοτικότητας ενεργητικού', hint: 26, values: [], formula: function (i, j) { return vm.data.totals[j].values[i] = (vm.data.totals[3].values[i] / vm.data.totals[1].values[i]) * 100 } }
        ];

        if (vm.data.totals) {
            for (var i = 0; i < vm.data.totals.length; i++) {
                var t = vm.data.totals[i];
                t.formula = vm.totals[i].formula;
            }
        }

        if (!vm.data.totals) {
            vm.data.totals = vm.totals;
        }

        vm.geo1 = [
            { "Place": "Aνατολική Μακεδονία, Θράκη", "Parent": "Ελλάδα" },
            { "Place": "Aττική", "Parent": "Ελλάδα" },
            { "Place": "Βόρειο Αιγαίο", "Parent": "Ελλάδα" },
            { "Place": "Δυτική Ελλάδα", "Parent": "Ελλάδα" },
            { "Place": "Δυτική Μακεδονία", "Parent": "Ελλάδα" },
            { "Place": "Ήπειρος", "Parent": "Ελλάδα" },
            { "Place": "Θεσσαλία", "Parent": "Ελλάδα" },
            { "Place": "Ιόνια Νησιά", "Parent": "Ελλάδα" },
            { "Place": "Κεντρική Μακεδονία", "Parent": "Ελλάδα" },
            { "Place": "Κρήτη", "Parent": "Ελλάδα" },
            { "Place": "Νότιο Αιγαίο", "Parent": "Ελλάδα" },
            { "Place": "Πελοπόννησος", "Parent": "Ελλάδα" },
            { "Place": "Στερεά Ελλάδα", "Parent": "Ελλάδα" }
        ];

        vm.geo2 = [
            { "Place": "Aττική", "Parent": "Aττική" },
            { "Place": "Αιτωλοακαρνανία", "Parent": "Δυτική Ελλάδα" },
            { "Place": "Αργολίδα", "Parent": "Πελοπόννησος" },
            { "Place": "Αρκαδία", "Parent": "Πελοπόννησος" },
            { "Place": "Άρτα", "Parent": "Ήπειρος" },
            { "Place": "Αχαΐα", "Parent": "Δυτική Ελλάδα" },
            { "Place": "Βοιωτία", "Parent": "Στερεά Ελλάδα" },
            { "Place": "Γρεβενά", "Parent": "Δυτική Μακεδονία" },
            { "Place": "Δράμα", "Parent": "Aνατολική Μακεδονία, Θράκη" },
            { "Place": "Δωδεκάνησος", "Parent": "Νότιο Αιγαίο" },
            { "Place": "Έβρος", "Parent": "Aνατολική Μακεδονία, Θράκη" },
            { "Place": "Εύβοια", "Parent": "Στερεά Ελλάδα" },
            { "Place": "Ευρυτανία", "Parent": "Στερεά Ελλάδα" },
            { "Place": "Ζάκυνθος", "Parent": "Ιόνια Νησιά" },
            { "Place": "Ηλεία", "Parent": "Δυτική Ελλάδα" },
            { "Place": "Ημαθία", "Parent": "Κεντρική Μακεδονία" },
            { "Place": "Ηράκλειο", "Parent": "Κρήτη" },
            { "Place": "Θεσπρωτία", "Parent": "Ήπειρος" },
            { "Place": "Θεσσαλονίκη", "Parent": "Κεντρική Μακεδονία" },
            { "Place": "Ιωάννινα", "Parent": "Ήπειρος" },
            { "Place": "Καβάλα", "Parent": "Aνατολική Μακεδονία, Θράκη" },
            { "Place": "Καρδίτσα", "Parent": "Θεσσαλία" },
            { "Place": "Καστοριά", "Parent": "Δυτική Μακεδονία" },
            { "Place": "Κέρκυρα", "Parent": "Ιόνια Νησιά" },
            { "Place": "Κεφαλληνία", "Parent": "Ιόνια Νησιά" },
            { "Place": "Κιλκίς", "Parent": "Κεντρική Μακεδονία" },
            { "Place": "Κοζάνη", "Parent": "Δυτική Μακεδονία" },
            { "Place": "Κορινθία", "Parent": "Πελοπόννησος" },
            { "Place": "Κυκλάδες", "Parent": "Νότιο Αιγαίο" },
            { "Place": "Λακωνία", "Parent": "Πελοπόννησος" },
            { "Place": "Λάρισα", "Parent": "Θεσσαλία" },
            { "Place": "Λασίθι", "Parent": "Κρήτη" },
            { "Place": "Λέσβος", "Parent": "Βόρειο Αιγαίο" },
            { "Place": "Λευκάδα", "Parent": "Ιόνια Νησιά" },
            { "Place": "Μαγνησία", "Parent": "Θεσσαλία" },
            { "Place": "Μεσσηνία", "Parent": "Πελοπόννησος" },
            { "Place": "Ξάνθη", "Parent": "Aνατολική Μακεδονία, Θράκη" },
            { "Place": "Πέλλα", "Parent": "Κεντρική Μακεδονία" },
            { "Place": "Πιερία", "Parent": "Κεντρική Μακεδονία" },
            { "Place": "Πρέβεζα", "Parent": "Ήπειρος" },
            { "Place": "Ρεθύμνη", "Parent": "Κρήτη" },
            { "Place": "Ροδόπη", "Parent": "Aνατολική Μακεδονία, Θράκη" },
            { "Place": "Σάμος", "Parent": "Βόρειο Αιγαίο" },
            { "Place": "Σέρρες", "Parent": "Κεντρική Μακεδονία" },
            { "Place": "Τρίκαλα", "Parent": "Θεσσαλία" },
            { "Place": "Φθιώτιδα", "Parent": "Στερεά Ελλάδα" },
            { "Place": "Φλώρινα", "Parent": "Δυτική Μακεδονία" },
            { "Place": "Φωκίδα", "Parent": "Στερεά Ελλάδα" },
            { "Place": "Χαλκιδική", "Parent": "Κεντρική Μακεδονία" },
            { "Place": "Χανιά", "Parent": "Κρήτη" },
            { "Place": "Χίος", "Parent": "Βόρειο Αιγαίο" }
        ];

        vm.geo3 = [
            { "Place": "Αβδήρων", "Parent": "Ξάνθη" },
            { "Place": "Αγαθονησίου", "Parent": "Δωδεκάνησος" },
            { "Place": "Αγιάς", "Parent": "Λάρισα" },
            { "Place": "Αγίας Βαρβάρας", "Parent": "Aττική" },
            { "Place": "Αγίας Παρασκευής", "Parent": "Aττική" },
            { "Place": "Αγίου Βασιλείου", "Parent": "Ρεθύμνη" },
            { "Place": "Αγίου Δημητρίου", "Parent": "Aττική" },
            { "Place": "Αγίου Ευστρατίου", "Parent": "Λέσβος" },
            { "Place": "Αγίου Νικολάου", "Parent": "Λασίθι" },
            { "Place": "Αγίων Αναργύρων - Καματερού", "Parent": "Aττική" },
            { "Place": "Αγκιστρίου", "Parent": "Aττική" },
            { "Place": "Αγράφων", "Parent": "Ευρυτανία" },
            { "Place": "Αγρινίου", "Parent": "Αιτωλοακαρνανία" },
            { "Place": "Αθηναίων", "Parent": "Aττική" },
            { "Place": "Αιγάλεω", "Parent": "Aττική" },
            { "Place": "Αιγιαλείας", "Parent": "Αχαΐα" },
            { "Place": "Αίγινας", "Parent": "Aττική" },
            { "Place": "Άκτιου - Βόνιτσας", "Parent": "Αιτωλοακαρνανία" },
            { "Place": "Αλεξάνδρειας", "Parent": "Ημαθία" },
            { "Place": "Αλεξανδρούπολης", "Parent": "Έβρος" },
            { "Place": "Αλιάρτου - Θεσπιέων", "Parent": "Βοιωτία" },
            { "Place": "Αλίμου", "Parent": "Aττική" },
            { "Place": "Αλμυρού", "Parent": "Μαγνησία" },
            { "Place": "Αλμωπίας", "Parent": "Πέλλα" },
            { "Place": "Αλοννήσου", "Parent": "Μαγνησία" },
            { "Place": "Αμαρίου", "Parent": "Ρεθύμνη" },
            { "Place": "Αμαρουσίου", "Parent": "Aττική" },
            { "Place": "Αμοργού", "Parent": "Κυκλάδες" },
            { "Place": "Αμπελοκήπων - Μενεμένης", "Parent": "Θεσσαλονίκη" },
            { "Place": "Αμυνταίου", "Parent": "Φλώρινα" },
            { "Place": "Αμφίκλειας - Ελάτειας", "Parent": "Φθιώτιδα" },
            { "Place": "Αμφιλοχίας", "Parent": "Αιτωλοακαρνανία" },
            { "Place": "Αμφίπολης", "Parent": "Σέρρες" },
            { "Place": "Ανατολικής Μάνης", "Parent": "Λακωνία" },
            { "Place": "Ανάφης", "Parent": "Κυκλάδες" },
            { "Place": "Ανδραβίδας - Κυλλήνης", "Parent": "Ηλεία" },
            { "Place": "Ανδρίτσαινας - Κρεστένων", "Parent": "Ηλεία" },
            { "Place": "Άνδρου", "Parent": "Κυκλάδες" },
            { "Place": "Αντιπάρου", "Parent": "Κυκλάδες" },
            { "Place": "Ανωγείων", "Parent": "Ρεθύμνη" },
            { "Place": "Αποκορώνου", "Parent": "Χανιά" },
            { "Place": "Αργιθέας", "Parent": "Καρδίτσα" },
            { "Place": "Άργους - Μυκηνών", "Parent": "Αργολίδα" },
            { "Place": "Αριστοτέλη", "Parent": "Χαλκιδική" },
            { "Place": "Αρριανών", "Parent": "Ροδόπη" },
            { "Place": "Αρταίων", "Parent": "Άρτα" },
            { "Place": "Αρχαίας Ολυμπίας", "Parent": "Ηλεία" },
            { "Place": "Αρχανών - Αστερουσίων", "Parent": "Ηράκλειο" },
            { "Place": "Ασπροπύργου", "Parent": "Aττική" },
            { "Place": "Αστυπάλαιας", "Parent": "Δωδεκάνησος" },
            { "Place": "Αχαρνών", "Parent": "Aττική" },
            { "Place": "Βάρης - Βούλας - Βουλιαγμένης", "Parent": "Aττική" },
            { "Place": "Βέλου - Βόχας", "Parent": "Κορινθία" },
            { "Place": "Βέροιας", "Parent": "Ημαθία" },
            { "Place": "Βιάννου", "Parent": "Ηράκλειο" },
            { "Place": "Βισαλτίας", "Parent": "Σέρρες" },
            { "Place": "Βοΐου", "Parent": "Κοζάνη" },
            { "Place": "Βόλβης", "Parent": "Θεσσαλονίκη" },
            { "Place": "Βόλου", "Parent": "Μαγνησία" },
            { "Place": "Βόρειας Κυνουρίας", "Parent": "Αρκαδία" },
            { "Place": "Βορείων Τζουμέρκων", "Parent": "Ιωάννινα" },
            { "Place": "Βριλησσίων", "Parent": "Aττική" },
            { "Place": "Βύρωνος", "Parent": "Aττική" },
            { "Place": "Γαλατσίου", "Parent": "Aττική" },
            { "Place": "Γαύδου", "Parent": "Χανιά" },
            { "Place": "Γεωργίου Καραϊσκάκη", "Parent": "Άρτα" },
            { "Place": "Γλυφάδας", "Parent": "Aττική" },
            { "Place": "Γόρτυνας", "Parent": "Ηράκλειο" },
            { "Place": "Γορτυνίας", "Parent": "Αρκαδία" },
            { "Place": "Γρεβενών", "Parent": "Γρεβενά" },
            { "Place": "Δάφνης - Υμηττού", "Parent": "Aττική" },
            { "Place": "Δέλτα", "Parent": "Θεσσαλονίκη" },
            { "Place": "Δελφών", "Parent": "Φωκίδα" },
            { "Place": "Δεσκάτης", "Parent": "Γρεβενά" },
            { "Place": "Διδυμοτείχου", "Parent": "Έβρος" },
            { "Place": "Διονύσου", "Parent": "Aττική" },
            { "Place": "Δίου - Ολύμπου", "Parent": "Πιερία" },
            { "Place": "Διρφύων - Μεσσαπίων", "Parent": "Εύβοια" },
            { "Place": "Διστόμου - Αράχοβας - Αντίκυρας", "Parent": "Βοιωτία" },
            { "Place": "Δομοκού", "Parent": "Φθιώτιδα" },
            { "Place": "Δοξάτου", "Parent": "Δράμα" },
            { "Place": "Δράμας", "Parent": "Δράμα" },
            { "Place": "Δυτικής Αχαΐας", "Parent": "Αχαΐα" },
            { "Place": "Δυτικής Μάνης", "Parent": "Μεσσηνία" },
            { "Place": "Δωδώνης", "Parent": "Ιωάννινα" },
            { "Place": "Δωρίδος", "Parent": "Φωκίδα" },
            { "Place": "Έδεσσας", "Parent": "Πέλλα" },
            { "Place": "Ελασσόνας", "Parent": "Λάρισα" },
            { "Place": "Ελαφονήσου", "Parent": "Λακωνία" },
            { "Place": "Ελευσίνας", "Parent": "Aττική" },
            { "Place": "Ελληνικού - Αργυρούπολης", "Parent": "Aττική" },
            { "Place": "Εμμανουήλ Παππά", "Parent": "Σέρρες" },
            { "Place": "Εορδαίας", "Parent": "Κοζάνη" },
            { "Place": "Επιδαύρου", "Parent": "Αργολίδα" },
            { "Place": "Ερέτριας", "Parent": "Εύβοια" },
            { "Place": "Ερμιονίδας", "Parent": "Αργολίδα" },
            { "Place": "Ερυμάνθου", "Parent": "Αχαΐα" },
            { "Place": "Ευρώτα", "Parent": "Λακωνία" },
            { "Place": "Ζαγοράς - Μουρεσίου", "Parent": "Μαγνησία" },
            { "Place": "Ζαγορίου", "Parent": "Ιωάννινα" },
            { "Place": "Ζακύνθου", "Parent": "Ζάκυνθος" },
            { "Place": "Ζαχάρως", "Parent": "Ηλεία" },
            { "Place": "Ζηρού", "Parent": "Πρέβεζα" },
            { "Place": "Ζίτσας", "Parent": "Ιωάννινα" },
            { "Place": "Ζωγράφου", "Parent": "Aττική" },
            { "Place": "Ηγουμενίτσας", "Parent": "Θεσπρωτία" },
            { "Place": "Ήλιδας", "Parent": "Ηλεία" },
            { "Place": "Ηλιουπόλεως", "Parent": "Aττική" },
            { "Place": "Ηρακλείας", "Parent": "Σέρρες" },
            { "Place": "Ηρακλείου", "Parent": "Ηράκλειο" },
            { "Place": "Ηρακλείου Αττικής", "Parent": "Aττική" },
            { "Place": "Θάσου", "Parent": "Καβάλα" },
            { "Place": "Θερμαϊκού", "Parent": "Θεσσαλονίκη" },
            { "Place": "Θέρμης", "Parent": "Θεσσαλονίκη" },
            { "Place": "Θέρμου", "Parent": "Αιτωλοακαρνανία" },
            { "Place": "Θεσσαλονίκης", "Parent": "Θεσσαλονίκη" },
            { "Place": "Θηβαίων", "Parent": "Βοιωτία" },
            { "Place": "Θήρας", "Parent": "Κυκλάδες" },
            { "Place": "Ιάσμου", "Parent": "Ροδόπη" },
            { "Place": "Ιεράπετρας", "Parent": "Λασίθι" },
            { "Place": "Ιεράς Πόλης Μεσολογγίου", "Parent": "Αιτωλοακαρνανία" },
            { "Place": "Ιητών", "Parent": "Κυκλάδες" },
            { "Place": "Ιθάκης", "Parent": "Κεφαλληνία" },
            { "Place": "Ικαρίας", "Parent": "Σάμος" },
            { "Place": "Ιλίου", "Parent": "Aττική" },
            { "Place": "Ιστιαίας - Αιδηψού", "Parent": "Εύβοια" },
            { "Place": "Ιωαννιτών", "Parent": "Ιωάννινα" },
            { "Place": "Καβάλας", "Parent": "Καβάλα" },
            { "Place": "Καισαριανής", "Parent": "Aττική" },
            { "Place": "Καλαβρύτων", "Parent": "Αχαΐα" },
            { "Place": "Καλαμαριάς", "Parent": "Θεσσαλονίκη" },
            { "Place": "Καλαμάτας", "Parent": "Μεσσηνία" },
            { "Place": "Καλαμπάκας", "Parent": "Τρίκαλα" },
            { "Place": "Καλλιθέας", "Parent": "Aττική" },
            { "Place": "Καλυμνίων", "Parent": "Δωδεκάνησος" },
            { "Place": "Καντάνου - Σελίνου", "Parent": "Χανιά" },
            { "Place": "Καρδίτσας", "Parent": "Καρδίτσα" },
            { "Place": "Καρπάθου", "Parent": "Δωδεκάνησος" },
            { "Place": "Καρπενησίου", "Parent": "Ευρυτανία" },
            { "Place": "Καρύστου", "Parent": "Εύβοια" },
            { "Place": "Κάσου", "Parent": "Δωδεκάνησος" },
            { "Place": "Κασσάνδρας", "Parent": "Χαλκιδική" },
            { "Place": "Καστοριάς", "Parent": "Καστοριά" },
            { "Place": "Κατερίνης", "Parent": "Πιερία" },
            { "Place": "Κάτω Νευροκοπίου", "Parent": "Δράμα" },
            { "Place": "Κέας", "Parent": "Κυκλάδες" },
            { "Place": "Κεντρικών Τζουμέρκων", "Parent": "Άρτα" },
            { "Place": "Κερατσινίου - Δραπετσώνας", "Parent": "Aττική" },
            { "Place": "Κέρκυρας", "Parent": "Κέρκυρα" },
            { "Place": "Κεφαλονιάς", "Parent": "Κεφαλληνία" },
            { "Place": "Κηφισιάς", "Parent": "Aττική" },
            { "Place": "Κιλελέρ", "Parent": "Λάρισα" },
            { "Place": "Κιλκίς", "Parent": "Κιλκίς" },
            { "Place": "Κιμώλου", "Parent": "Κυκλάδες" },
            { "Place": "Κισσάμου", "Parent": "Χανιά" },
            { "Place": "Κοζάνης", "Parent": "Κοζάνη" },
            { "Place": "Κομοτηνής", "Parent": "Ροδόπη" },
            { "Place": "Κόνιτσας", "Parent": "Ιωάννινα" },
            { "Place": "Κορδελιού - Ευόσμου", "Parent": "Θεσσαλονίκη" },
            { "Place": "Κορινθίων", "Parent": "Κορινθία" },
            { "Place": "Κορυδαλλού", "Parent": "Aττική" },
            { "Place": "Κρωπίας", "Parent": "Aττική" },
            { "Place": "Κυθήρων", "Parent": "Aττική" },
            { "Place": "Κύθνου", "Parent": "Κυκλάδες" },
            { "Place": "Κύμης - Αλιβερίου", "Parent": "Εύβοια" },
            { "Place": "Κω", "Parent": "Δωδεκάνησος" },
            { "Place": "Λαγκαδά", "Parent": "Θεσσαλονίκη" },
            { "Place": "Λαμιέων", "Parent": "Φθιώτιδα" },
            { "Place": "Λαρισαίων", "Parent": "Λάρισα" },
            { "Place": "Λαυρεωτικής", "Parent": "Aττική" },
            { "Place": "Λεβαδέων", "Parent": "Βοιωτία" },
            { "Place": "Λειψών", "Parent": "Δωδεκάνησος" },
            { "Place": "Λέρου", "Parent": "Δωδεκάνησος" },
            { "Place": "Λέσβου", "Parent": "Λέσβος" },
            { "Place": "Λευκάδας", "Parent": "Λευκάδα" },
            { "Place": "Λήμνου", "Parent": "Λέσβος" },
            { "Place": "Λίμνης Πλαστήρα", "Parent": "Καρδίτσα" },
            { "Place": "Λοκρών", "Parent": "Φθιώτιδα" },
            { "Place": "Λουτρακίου - Αγίων Θεοδώρων", "Parent": "Κορινθία" },
            { "Place": "Λυκόβρυσης - Πεύκης", "Parent": "Aττική" },
            { "Place": "Μακρακώμης", "Parent": "Φθιώτιδα" },
            { "Place": "Μαλεβιζίου", "Parent": "Ηράκλειο" },
            { "Place": "Μάνδρας - Ειδυλλίας", "Parent": "Aττική" },
            { "Place": "Μαντουδίου - Λίμνης - Αγίας Άννας", "Parent": "Εύβοια" },
            { "Place": "Μαραθώνος", "Parent": "Aττική" },
            { "Place": "Μαρκοπούλου Μεσογαίας", "Parent": "Aττική" },
            { "Place": "Μαρωνείας - Σαπών", "Parent": "Ροδόπη" },
            { "Place": "Μεγαλόπολης", "Parent": "Αρκαδία" },
            { "Place": "Μεγανησίου", "Parent": "Λευκάδα" },
            { "Place": "Μεγαρέων", "Parent": "Aττική" },
            { "Place": "Μεγίστης", "Parent": "Δωδεκάνησος" },
            { "Place": "Μεσσήνης", "Parent": "Μεσσηνία" },
            { "Place": "Μεταμορφώσεως", "Parent": "Aττική" },
            { "Place": "Μετσόβου", "Parent": "Ιωάννινα" },
            { "Place": "Μήλου", "Parent": "Κυκλάδες" },
            { "Place": "Μινώα Πεδιάδας", "Parent": "Ηράκλειο" },
            { "Place": "Μονεμβασιάς", "Parent": "Λακωνία" },
            { "Place": "Μοσχάτου - Ταύρου", "Parent": "Aττική" },
            { "Place": "Μουζακίου", "Parent": "Καρδίτσα" },
            { "Place": "Μύκης", "Parent": "Ξάνθη" },
            { "Place": "Μυκόνου", "Parent": "Κυκλάδες" },
            { "Place": "Μυλοποτάμου", "Parent": "Ρεθύμνη" },
            { "Place": "Μώλου - Αγίου Κωνσταντίνου", "Parent": "Φθιώτιδα" },
            { "Place": "Νάξου & Μικρών Κυκλάδων", "Parent": "Κυκλάδες" },
            { "Place": "Νάουσας", "Parent": "Ημαθία" },
            { "Place": "Ναυπακτίας", "Parent": "Αιτωλοακαρνανία" },
            { "Place": "Ναυπλιέων", "Parent": "Αργολίδα" },
            { "Place": "Νεάπολης - Συκεών", "Parent": "Θεσσαλονίκη" },
            { "Place": "Νεας Ζίχνης", "Parent": "Σέρρες" },
            { "Place": "Νέας Ιωνίας", "Parent": "Aττική" },
            { "Place": "Νέας Προποντίδας", "Parent": "Χαλκιδική" },
            { "Place": "Νέας Σμύρνης", "Parent": "Aττική" },
            { "Place": "Νεμέας", "Parent": "Κορινθία" },
            { "Place": "Νεστορίου", "Parent": "Καστοριά" },
            { "Place": "Νέστου", "Parent": "Καβάλα" },
            { "Place": "Νίκαιας - Αγίου Ιωάννη Ρέντη", "Parent": "Aττική" },
            { "Place": "Νικολάου Σκουφά", "Parent": "Άρτα" },
            { "Place": "Νισύρου", "Parent": "Δωδεκάνησος" },
            { "Place": "Νότιας Κυνουρίας", "Parent": "Αρκαδία" },
            { "Place": "Νοτίου Πηλίου", "Parent": "Μαγνησία" },
            { "Place": "Ξάνθης", "Parent": "Ξάνθη" },
            { "Place": "Ξηρομέρου", "Parent": "Αιτωλοακαρνανία" },
            { "Place": "Ξυλοκάστρου - Ευρωστίνης", "Parent": "Κορινθία" },
            { "Place": "Οινουσσών", "Parent": "Χίος" },
            { "Place": "Οιχαλίας", "Parent": "Μεσσηνία" },
            { "Place": "Ορεστιάδας", "Parent": "Έβρος" },
            { "Place": "Ορεστίδος", "Parent": "Καστοριά" },
            { "Place": "Οροπεδίου Λασιθίου", "Parent": "Λασίθι" },
            { "Place": "Ορχομενού", "Parent": "Βοιωτία" },
            { "Place": "Παγγαίου", "Parent": "Καβάλα" },
            { "Place": "Παιανίας", "Parent": "Aττική" },
            { "Place": "Παιονίας", "Parent": "Κιλκίς" },
            { "Place": "Παλαιού Φαλήρου", "Parent": "Aττική" },
            { "Place": "Παλαμά", "Parent": "Καρδίτσα" },
            { "Place": "Παλλήνης", "Parent": "Aττική" },
            { "Place": "Παξών", "Parent": "Κέρκυρα" },
            { "Place": "Παπάγου - Χολαργού", "Parent": "Aττική" },
            { "Place": "Παρανεστίου", "Parent": "Δράμα" },
            { "Place": "Πάργας", "Parent": "Πρέβεζα" },
            { "Place": "Πάρου", "Parent": "Κυκλάδες" },
            { "Place": "Πάτμου", "Parent": "Δωδεκάνησος" },
            { "Place": "Πατρέων", "Parent": "Αχαΐα" },
            { "Place": "Παύλου Μελά", "Parent": "Θεσσαλονίκη" },
            { "Place": "Πειραιώς", "Parent": "Aττική" },
            { "Place": "Πέλλας", "Parent": "Πέλλα" },
            { "Place": "Πεντέλης", "Parent": "Aττική" },
            { "Place": "Περάματος", "Parent": "Aττική" },
            { "Place": "Περιστερίου", "Parent": "Aττική" },
            { "Place": "Πετρούπολης", "Parent": "Aττική" },
            { "Place": "Πηνειού", "Parent": "Ηλεία" },
            { "Place": "Πλατανιά", "Parent": "Χανιά" },
            { "Place": "Πολυγύρου", "Parent": "Χαλκιδική" },
            { "Place": "Πόρου", "Parent": "Aττική" },
            { "Place": "Πρέβεζας", "Parent": "Πρέβεζα" },
            { "Place": "Πρεσπών", "Parent": "Φλώρινα" },
            { "Place": "Προσοτσάνης", "Parent": "Δράμα" },
            { "Place": "Πύδνας - Κολινδρού", "Parent": "Πιερία" },
            { "Place": "Πυλαίας - Χορτιάτη", "Parent": "Θεσσαλονίκη" },
            { "Place": "Πύλης", "Parent": "Τρίκαλα" },
            { "Place": "Πύλου - Νέστορος", "Parent": "Μεσσηνία" },
            { "Place": "Πύργου", "Parent": "Ηλεία" },
            { "Place": "Πωγωνίου", "Parent": "Ιωάννινα" },
            { "Place": "Ραφήνας - Πικερμίου", "Parent": "Aττική" },
            { "Place": "Ρεθύμνης", "Parent": "Ρεθύμνη" },
            { "Place": "Ρήγα Φερραίου", "Parent": "Μαγνησία" },
            { "Place": "Ρόδου", "Parent": "Δωδεκάνησος" },
            { "Place": "Σαλαμίνας", "Parent": "Aττική" },
            { "Place": "Σαμοθράκης", "Parent": "Έβρος" },
            { "Place": "Σάμου", "Parent": "Σάμος" },
            { "Place": "Σαρωνικού", "Parent": "Aττική" },
            { "Place": "Σερβίων - Βελβεντού", "Parent": "Κοζάνη" },
            { "Place": "Σερίφου", "Parent": "Κυκλάδες" },
            { "Place": "Σερρών", "Parent": "Σέρρες" },
            { "Place": "Σητείας", "Parent": "Λασίθι" },
            { "Place": "Σιθωνίας", "Parent": "Χαλκιδική" },
            { "Place": "Σικίνου", "Parent": "Κυκλάδες" },
            { "Place": "Σικυωνίων", "Parent": "Κορινθία" },
            { "Place": "Σιντικής", "Parent": "Σέρρες" },
            { "Place": "Σίφνου", "Parent": "Κυκλάδες" },
            { "Place": "Σκιάθου", "Parent": "Μαγνησία" },
            { "Place": "Σκοπέλου", "Parent": "Μαγνησία" },
            { "Place": "Σκύδρας", "Parent": "Πέλλα" },
            { "Place": "Σκύρου", "Parent": "Εύβοια" },
            { "Place": "Σουλίου", "Parent": "Θεσπρωτία" },
            { "Place": "Σουφλίου", "Parent": "Έβρος" },
            { "Place": "Σοφάδων", "Parent": "Καρδίτσα" },
            { "Place": "Σπάρτης", "Parent": "Λακωνία" },
            { "Place": "Σπάτων - Αρτέμιδος", "Parent": "Aττική" },
            { "Place": "Σπετσών", "Parent": "Aττική" },
            { "Place": "Στυλίδας", "Parent": "Φθιώτιδα" },
            { "Place": "Σύμης", "Parent": "Δωδεκάνησος" },
            { "Place": "Σύρου - Ερμούπολης", "Parent": "Κυκλάδες" },
            { "Place": "Σφακίων", "Parent": "Χανιά" },
            { "Place": "Τανάγρας", "Parent": "Βοιωτία" },
            { "Place": "Τεμπών", "Parent": "Λάρισα" },
            { "Place": "Τήλου", "Parent": "Δωδεκάνησος" },
            { "Place": "Τήνου", "Parent": "Κυκλάδες" },
            { "Place": "Τοπείρου", "Parent": "Ξάνθη" },
            { "Place": "Τρικκαίων", "Parent": "Τρίκαλα" },
            { "Place": "Τρίπολης", "Parent": "Αρκαδία" },
            { "Place": "Τριφυλίας", "Parent": "Μεσσηνία" },
            { "Place": "Τροιζηνίας", "Parent": "Aττική" },
            { "Place": "Τυρνάβου", "Parent": "Λάρισα" },
            { "Place": "Ύδρας", "Parent": "Aττική" },
            { "Place": "Φαιστού", "Parent": "Ηράκλειο" },
            { "Place": "Φαρκαδόνας", "Parent": "Τρίκαλα" },
            { "Place": "Φαρσάλων", "Parent": "Λάρισα" },
            { "Place": "Φιλαδελφείας - Χαλκηδόνος", "Parent": "Aττική" },
            { "Place": "Φιλιατών", "Parent": "Θεσπρωτία" },
            { "Place": "Φιλοθέης - Ψυχικού", "Parent": "Aττική" },
            { "Place": "Φλώρινας", "Parent": "Φλώρινα" },
            { "Place": "Φολεγάνδρου", "Parent": "Κυκλάδες" },
            { "Place": "Φούρνων Κορσεών", "Parent": "Σάμος" },
            { "Place": "Φυλής", "Parent": "Aττική" },
            { "Place": "Χαϊδαρίου", "Parent": "Aττική" },
            { "Place": "Χαλανδρίου", "Parent": "Aττική" },
            { "Place": "Χαλκηδόνος", "Parent": "Θεσσαλονίκη" },
            { "Place": "Χάλκης", "Parent": "Δωδεκάνησος" },
            { "Place": "Χαλκιδέων", "Parent": "Εύβοια" },
            { "Place": "Χανίων", "Parent": "Χανιά" },
            { "Place": "Χερσονήσου", "Parent": "Ηράκλειο" },
            { "Place": "Χίου", "Parent": "Χίος" },
            { "Place": "Ψαρών", "Parent": "Χίος" },
            { "Place": "Ωραιοκάστρου", "Parent": "Θεσσαλονίκη" },
            { "Place": "Ωρωπού", "Parent": "Aττική" }
        ];



        vm.numbers = [
            {
                label: "0",
                value: 1
            },
            {
                label: "1",
                value: 1.1
            },
            {
                label: "2",
                value: 2
            },
            {
                label: "3",
                value: 3.1
            },
            {
                label: "4",
                value: 3.2
            },
            {
                label: "5",
                value: 5.1
            },
            {
                label: "6",
                value: 5.2
            },
            {
                label: "7",
                value: 7.1
            },
            {
                label: "8",
                value: 7.2
            },
            {
                label: "9",
                value: 7.3
            },
            {
                label: "10",
                value: 7.4
            },
            {
                label: "Άνω των 10",
                value: 7.5
            }
        ];

        $http.post('/Plan/Get').then(function (r) {
            var k = Object.keys(r.data);
            vm.data = {};
            vm.data.educationLevels = {};
            for (var i = 0; i < k.length; i++) {
                try {
                    vm.data[k[i]] = JSON.parse(r.data[k[i]]);
                }
                catch (e) {
                    console.log(e);
                }
            }
            if (vm.data.totals) {
                for (var i = 0; i < vm.data.totals.length; i++) {
                    var t = vm.data.totals[i];
                    t.formula = vm.totals[i].formula;
                }
            }
            if (!vm.data.totals) {
                vm.data.totals = vm.totals;
            }
            $scope.$watch("vm.data", function (n, o) {
                if (saveTimeout)
                    $timeout.cancel(saveTimeout);
                saveTimeout = $timeout(dataSender, 1000);
            }, true);
        });

    }

})();

